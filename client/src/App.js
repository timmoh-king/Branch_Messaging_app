import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import ChatSpace from './ChatSpace';

const socket = io.connect("http://localhost:3005");

function App() {
  const [agentId, setAgentId] = useState('');
  const [chatId, setChatId] = useState('');
  const [showChatSpace, setShowChatSpace] = useState(false);

  const joinChatSpace = () => {
    if (agentId !== '' && chatId !== '') {
      socket.emit("join_chat", chatId);
      setShowChatSpace(true);
    }
  }

  return (
    <div className="App">
      {!showChatSpace ? (
        <div className='joinChatContainer'>
          <h3>Join the chat</h3>
          <input type='text' placeholder='Enter agent id...' onChange={(e) => {setAgentId(e.target.value)}} />
          <input type='text' placeholder='Enter chat id...' onChange={(e) => {setChatId(e.target.value)}} />
          <button onClick={joinChatSpace}>Join the chat</button>
      </div>
      )
      : (
        <ChatSpace socket={socket} agentId={agentId} chatId={chatId} />
      )}
    </div>
  );
}

export default App;
