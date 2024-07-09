import React from 'react';
import './ChatInterface.css';

const ChatInterface = ({ pdfText, chatMessages, setChatMessages }) => {
  const handleSendMessage = (message) => {
    // Simulate response
    const newMessage = { sender: 'user', text: message };
    const responseMessage = { sender: 'bot', text: `Simulated response to "${message}"` };
    
    setChatMessages([...chatMessages, newMessage, responseMessage]);
  };

  return (
    <div className="chat-interface">
      <div className="messages">
      <p>ChatPDF | Ask me anything ...</p>
        {chatMessages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input type="text" placeholder="Type a message..." onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage(e.target.value);
            e.target.value = '';
          }
        }} />
      </div>
    </div>
  );
};

export default ChatInterface;
