import React, { useRef, useEffect } from 'react';
import { ChatMessagesProps } from '../interface/types';

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="mt-4">
      {messages
        .filter(msg => msg.role !== "system")
        .map((msg, index) => (
          <div key={index} className="text-white">
            <br></br>
            <p>{msg.content}</p>
          </div>
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;