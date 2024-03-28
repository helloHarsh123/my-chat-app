import React, { useState, useEffect } from 'react';
import './App.css'; // Import styles

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async () => {
    if (!userInput) return;

    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput }),
      });

      const responseJson = await response.json();
      console.log(responseJson);
      setChatHistory([...chatHistory, { you: userInput }, { kld7: responseJson.response }]);
      setUserInput('');
    } catch (error) {
      console.error(error);
      alert('Error sending message');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Chat with KLD7</h1>
      <div className="chat-history overflow-y-auto h-80 border rounded-md px-4 py-2 bg-gray-100">
        {chatHistory.map((message, index) => (
          <p key={index} className={message.you ? 'text-right text-blue-500' : 'text-left text-gray-800'}>
            {message.you ? `You: ${message.you}` : `KLD7: ${message.kld7}`}
          </p>
        ))}
      </div>
      <div className="chat-input mt-4 flex">
        <input
          className="flex-grow rounded-md px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your message [Start with a Hi]"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-2" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default App;