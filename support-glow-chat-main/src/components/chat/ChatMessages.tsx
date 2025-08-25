import { Avatar } from '@/components/ui/avatar';
import { Message } from './ChatInterface';

interface ChatMessagesProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatMessages = ({ messages, messagesEndRef }: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto py-6 space-y-4">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} message-enter`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {message.type === 'agent' && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">AI</span>
              </div>
              <div className="agent-bubble">
                <p className="text-sm leading-relaxed">{message.content}</p>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          )}
          
          {message.type === 'user' && (
            <div className="user-bubble">
              <p className="text-sm leading-relaxed">{message.content}</p>
              <div className="text-xs opacity-80 mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};