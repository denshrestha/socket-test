import React from 'react';
import { socket } from '../socket';

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <div className='flex justify-between items-center'>
      <button className='py-3 px-4 mx-4 text-white bg-green-500 rounded-lg w-[150px]' onClick={ connect }>Connect</button>
      <button className='py-3 px-4 mx-4 text-white bg-orange-500 rounded-lg w-[150px]' onClick={ disconnect }>Disconnect</button>
    </div>
  );
}