import React, { useState } from 'react';
import FileUpload from './FileUpload';
import ChatInterface from './ChatInterface';
import './Home.css';

const Home = () => {
  const [pdfText, setPdfText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleFileChange = () => {
    setChatMessages([]); // Clear chat messages on new file upload
  };

  return (
    <div className="container">
      <FileUpload setPdfText={setPdfText} onFileChange={handleFileChange} />
      <ChatInterface pdfText={pdfText} chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </div>
  );
};

export default Home;
