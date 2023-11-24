import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3005");

function App() {
  const [username, setUsername] = useState('');
  const [chat, setChat] = useState('');

  const joinChat = () => {
    if (username !== '' && chat !== '') {
      socket.emit("join_chat", chat);
    }
  }

  return (
    <div className="App">
      <h3>Join the chat</h3>
      <input type='text' placeholder='Enter username...' onChange={(e) => {setUsername(e.target.value)}} />
      <input type='text' placeholder='Chat ID...' onChange={(e) => {setChat(e.target.value)}} />
      <button onClick={joinChat}>Join the chat</button>
    </div>
  );
}

export default App;
