import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3005");

function App() {
  const [agentId, setAgentId] = useState('');
  const [chat, setChat] = useState('');

  const joinChat = () => {
    if (agentId !== '' && chat !== '') {
      socket.emit("join_chat", chat);
    }
  }

  return (
    <div className="App">
      <h3>Join the chat</h3>
      <input type='text' placeholder='Enter agentId...' onChange={(e) => {setAgentId(e.target.value)}} />
      <input type='text' placeholder='Chat ID...' onChange={(e) => {setChat(e.target.value)}} />
      <button onClick={joinChat}>Join the chat</button>
    </div>
  );
}

export default App;
