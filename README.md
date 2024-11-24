# Local LLM System

An optimized local LLM system using Go, React, and Ollama.

## Features
- Efficient local LLM inference using Ollama
- Fast Go backend with websocket support
- Modern React frontend with real-time chat interface
- Docker containerization for easy deployment
- Stream responses for better UX

## Prerequisites
- Docker and Docker Compose
- Ollama installed on the host machine

## Quick Start
1. Clone this repository
2. Run `docker-compose up --build`
3. Access the web interface at `http://localhost:3000`

## Architecture
- Backend (Go):
  - Gin web framework for REST API
  - Websocket support for streaming responses
  - Ollama client for LLM interaction
- Frontend (React):
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Real-time chat interface with streaming support
