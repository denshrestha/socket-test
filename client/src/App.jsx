import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { MyForm } from './components/MyForm';
import { Events } from './components/Events';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      console.log('CONNECT')
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onEvent(value) {
      console.log(value);
      setEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('events', onEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('events', onEvent);
    };
  }, []);

  return (
    <div className="App flex justify-center items-center flex-col h-screen">
      <ConnectionState isConnected={ isConnected } />
      <Events events={ events } />
      <ConnectionManager />
      <MyForm />
    </div>
  );
}