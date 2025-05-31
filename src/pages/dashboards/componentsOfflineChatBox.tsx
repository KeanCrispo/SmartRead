// components/OfflineChatBox.tsx
import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

const OfflineChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: 'user', text: input }];

    const botResponse = getBotResponse(input);
    newMessages.push({ from: 'bot', text: botResponse });

    setMessages(newMessages);
    setInput('');
  };

  const getBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('lesson')) {
      return 'You can continue your lessons from the dashboard.';
    } else if (lowerInput.includes('achievement')) {
      return 'Check your achievements tab to see your progress.';
    } else if (lowerInput.includes('help')) {
      return 'Sure! Ask anything about your lessons or progress.';
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return 'Hello! How can I assist you today?';
    } else {
      return 'I’m here to help. Try asking about lessons, achievements, or dashboard.';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          className="bg-blue-600 p-3 rounded-full shadow-lg text-white hover:bg-blue-700"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare size={24} />
        </button>
      ) : (
        <div className="w-80 bg-white border shadow-xl rounded-xl overflow-hidden flex flex-col">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <span className="font-bold">Ask AI</span>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="p-3 h-64 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm p-2 rounded-lg max-w-xs ${
                  msg.from === 'user'
                    ? 'ml-auto bg-blue-100 text-right'
                    : 'mr-auto bg-gray-100 text-left'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex">
            <input
              type="text"
              className="flex-1 p-2 text-sm border rounded-l-md outline-none"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              className="bg-blue-600 text-white px-4 rounded-r-md"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfflineChatBox;
