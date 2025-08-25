import { useState, useRef, useEffect } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatFAQ } from './ChatFAQ';
import { ChatInput } from './ChatInput';

export interface Message {
  id: string;
  type: 'agent' | 'user';
  content: string;
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: 'If you have frequently asked questions, press the FAQ button below.',
      timestamp: new Date(),
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content: string, type: 'agent' | 'user' = 'user') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = (content: string) => {
    addMessage(content, 'user');
    
    // Simulate agent response after a delay
    setTimeout(() => {
      addMessage("Thank you for your message. Our support team will get back to you shortly.", 'agent');
    }, 1000);
  };

  const handleFAQClick = (faqText: string) => {
    addMessage(faqText, 'user');
    
    // Simulate agent response to FAQ
    setTimeout(() => {
      addMessage("I understand your question. Let me help you with that.", 'agent');
    }, 800);
  };

  return (
    <div className="flex flex-col h-screen bg-background chat-gradient">
      <ChatHeader />
      
      <div className="flex-1 flex flex-col min-h-0 px-4">
        <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />
        <ChatFAQ onFAQClick={handleFAQClick} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};