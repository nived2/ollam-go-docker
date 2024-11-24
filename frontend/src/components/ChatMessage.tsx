import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const isUser = role === 'user';

  const components: Components = {
    code: ({ inline, className, children, ...props }: CodeProps) => {
      return (
        <code
          className={`${className} ${
            inline
              ? 'bg-gray-200 rounded px-1'
              : 'block bg-gray-800 text-white p-2 rounded'
          }`}
          {...props}
        >
          {children}
        </code>
      );
    },
  };

  return (
    <div
      className={`flex ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        <ReactMarkdown
          className="prose prose-sm max-w-none"
          components={components}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
