import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import ChatSpace from './ChatSpace';

const socket = io.connect("http://localhost:3005");

function App() {
  const [agentId, setAgentId] = useState('');
  const [chatId, setChatId] = useState('');

  const joinChatSpace = () => {
    if (agentId !== '' && chatId !== '') {
      socket.emit("join_chat", chatId);
    }
  }

  return (
    <div className="App">
      <h3>Join the chat</h3>
      <input type='text' placeholder='Enter agentId...' onChange={(e) => {setAgentId(e.target.value)}} />
      <input type='text' placeholder='Enter chatId...' onChange={(e) => {setChatId(e.target.value)}} />
      <button onClick={joinChatSpace}>Join the chat</button>

      <ChatSpace socket={socket} agentId={agentId} chatId={chatId} />
    </div>
  );
}

export default App;
