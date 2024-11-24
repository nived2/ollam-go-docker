# Contributing to Local LLM Chat System

First off, thank you for considering contributing to the Local LLM Chat System! It's people like you that make it such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* Use a clear and descriptive title
* Provide a step-by-step description of the suggested enhancement
* Provide specific examples to demonstrate the steps
* Describe the current behavior and explain which behavior you expected to see instead
* Explain why this enhancement would be useful

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the coding style used throughout the project
* Include appropriate test cases
* Document new code
* End all files with a newline

## Development Process

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Setup

1. Install prerequisites:
   * Docker and Docker Compose
   * Go 1.21 or later
   * Node.js 18 or later
   * Ollama

2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/local-llm-chat.git
   cd local-llm-chat
   ```

3. Set up development environment:
   ```bash
   # Backend
   cd backend
   go mod download

   # Frontend
   cd ../frontend
   npm install
   ```

### Coding Style

* Go code should follow the standard Go formatting guidelines
* TypeScript/React code should follow the project's ESLint configuration
* Use meaningful variable and function names
* Comment your code when necessary
* Write self-documenting code when possible

### Testing

* Write unit tests for new features
* Ensure all tests pass before submitting PR
* Include integration tests when appropriate
* Test your changes in different environments if possible

## Community

* Join our discussions in GitHub issues
* Share your ideas and feedback
* Help others who have questions

Thank you for contributing!
