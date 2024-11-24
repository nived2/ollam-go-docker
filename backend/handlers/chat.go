package handlers

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

const OLLAMA_API = "http://ollama:11434/api/generate"

type ChatRequest struct {
	Model   string `json:"model"`
	Message string `json:"message"`
}

type ChatResponse struct {
	Response string `json:"response"`
	Error    string `json:"error,omitempty"`
}

type OllamaRequest struct {
	Model    string `json:"model"`
	Prompt   string `json:"prompt"`
	Stream   bool   `json:"stream"`
	Template string `json:"template,omitempty"`
}

type OllamaResponse struct {
	Response string `json:"response"`
	Done     bool   `json:"done"`
	Error    string `json:"error,omitempty"`
}

func HandleChat(c *gin.Context) {
	var req ChatRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ChatResponse{Error: "Invalid request body"})
		return
	}

	ollamaReq := OllamaRequest{
		Model:  req.Model,
		Prompt: req.Message,
		Stream: false,
	}

	ollamaBody, err := json.Marshal(ollamaReq)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ChatResponse{Error: "Failed to create request"})
		return
	}

	resp, err := http.Post(OLLAMA_API, "application/json", bytes.NewBuffer(ollamaBody))
	if err != nil {
		c.JSON(http.StatusInternalServerError, ChatResponse{Error: "Failed to communicate with LLM"})
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ChatResponse{Error: "Failed to read response"})
		return
	}

	var ollamaResp OllamaResponse
	if err := json.Unmarshal(body, &ollamaResp); err != nil {
		c.JSON(http.StatusInternalServerError, ChatResponse{Error: "Failed to parse response"})
		return
	}

	if ollamaResp.Error != "" {
		c.JSON(http.StatusInternalServerError, ChatResponse{Error: ollamaResp.Error})
		return
	}

	c.JSON(http.StatusOK, ChatResponse{Response: ollamaResp.Response})
}

func HandleWebSocket(ws *websocket.Conn) {
	defer ws.Close()

	for {
		var req ChatRequest
		err := ws.ReadJSON(&req)
		if err != nil {
			if err != io.EOF {
				log.Printf("Error reading message: %v", err)
			}
			break
		}

		ollamaReq := OllamaRequest{
			Model:  req.Model,
			Prompt: req.Message,
			Stream: true,
		}

		ollamaBody, err := json.Marshal(ollamaReq)
		if err != nil {
			ws.WriteJSON(ChatResponse{Error: "Failed to marshal request"})
			continue
		}

		resp, err := http.Post(OLLAMA_API, "application/json", bytes.NewBuffer(ollamaBody))
		if err != nil {
			ws.WriteJSON(ChatResponse{Error: "Failed to communicate with Ollama"})
			continue
		}

		decoder := json.NewDecoder(resp.Body)
		var fullResponse string

		for decoder.More() {
			var ollamaResp OllamaResponse
			if err := decoder.Decode(&ollamaResp); err != nil {
				ws.WriteJSON(ChatResponse{Error: "Failed to decode streaming response"})
				break
			}

			fullResponse += ollamaResp.Response
			if ollamaResp.Done {
				break
			}

			// Send partial response
			ws.WriteJSON(ChatResponse{Response: fullResponse})
		}

		resp.Body.Close()

		// Send final response
		ws.WriteJSON(ChatResponse{Response: fullResponse})
	}
}
