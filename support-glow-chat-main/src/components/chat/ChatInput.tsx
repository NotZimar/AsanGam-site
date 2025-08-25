import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-white/20">
      <div className="flex items-center gap-3 max-w-4xl mx-auto">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          className="chat-input flex-1 border"
        />
        <button
          onClick={handleSend}
          className="send-button hover-scale send-pulse"
          disabled={!message.trim()}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};