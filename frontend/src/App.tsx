import React, { useState, useEffect, useRef } from 'react';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import ModelSelector from './components/ModelSelector';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedModel, setSelectedModel] = useState('llama2');
  const [isLoading, setIsLoading] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    wsRef.current = new WebSocket('ws://localhost:8080/ws');
    
    wsRef.current.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.error) {
        console.error(response.error);
        return;
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.response }]);
      setIsLoading(false);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        model: selectedModel,
        message: message
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto max-w-4xl p-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Local LLM Chat</h1>
          <ModelSelector
            selectedModel={selectedModel}
            onSelect={setSelectedModel}
          />
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-4 mb-4 max-h-[60vh] overflow-y-auto">
            {messages.map((msg, idx) => (
              <ChatMessage
                key={idx}
                role={msg.role}
                content={msg.content}
              />
            ))}
            {isLoading && (
              <div className="text-gray-500 animate-pulse">
                AI is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
