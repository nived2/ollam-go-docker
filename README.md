# Local LLM Chat System

A powerful, containerized chat application that runs Large Language Models locally using Go, React, and Ollama. This system provides a modern, responsive web interface for interacting with local LLMs while maintaining high performance and data privacy.

## 🌟 Features

- **Local LLM Integration**
  - Seamless integration with Ollama for local model inference
  - Support for multiple LLM models
  - No data sent to external servers
  - CPU and GPU support

- **High-Performance Backend**
  - Go-powered REST API using Gin framework
  - Real-time communication via WebSocket
  - Efficient streaming responses
  - Robust error handling

- **Modern Frontend**
  - React with TypeScript for type safety
  - Real-time chat interface
  - Markdown message rendering
  - Responsive design with Tailwind CSS
  - Model selection interface

- **DevOps Ready**
  - Full Docker containerization
  - Multi-stage builds for optimization
  - Nginx configuration for production
  - Easy deployment with Docker Compose

## 🚀 Quick Start

### Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Ollama](https://ollama.ai/download) installed on the host machine
- Git for version control

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd local-llm-chat
   ```

2. Start the application:
   ```bash
   docker-compose up --build
   ```

3. Access the web interface:
   - Open your browser and navigate to `http://localhost:3000`
   - The backend API will be available at `http://localhost:8080`

### Model Setup

1. Ensure Ollama is running on your system
2. Pull a model (e.g., TinyLlama):
   ```bash
   ollama pull tinyllama
   ```

## 🏗️ Architecture

### Backend (Go)

- **Framework**: Gin web framework
- **WebSocket**: Gorilla WebSocket for real-time communication
- **API Endpoints**:
  - `/api/chat`: REST endpoint for chat messages
  - `/ws`: WebSocket endpoint for streaming responses
  - `/health`: Health check endpoint

### Frontend (React)

- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Key Components**:
  - `ChatInput`: Message input interface
  - `ChatMessage`: Markdown-supported message display
  - `ModelSelector`: LLM model selection

### Container Structure

- **Frontend Container**: Nginx-served React application
- **Backend Container**: Go API server
- **Ollama Container**: Local LLM service

## 🛠️ Development

### Backend Development

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Go dependencies:
   ```bash
   go mod download
   ```

3. Run the server:
   ```bash
   go run main.go
   ```

### Frontend Development

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm start
   ```

## 📝 API Documentation

### REST Endpoints

#### POST /api/chat
- **Purpose**: Send a chat message
- **Body**:
  ```json
  {
    "message": "Your message here",
    "model": "tinyllama"
  }
  ```
- **Response**:
  ```json
  {
    "response": "Model's response"
  }
  ```

### WebSocket

- **Endpoint**: `/ws`
- **Protocol**: `ws://`
- **Message Format**:
  ```json
  {
    "message": "Your message",
    "model": "model_name"
  }
  ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Ollama](https://ollama.ai/) for the amazing local LLM runtime
- [Gin](https://gin-gonic.com/) for the web framework
- [React](https://reactjs.org/) for the frontend framework
- All contributors who help improve this project
