import React, { useState } from 'react';
import { socket } from '../socket';

export function MyForm() {
  const [value, setValue] = useState('');

  function onSubmit(event) {
    event.preventDefault();

    socket.timeout(5000).emit('events', value);
  }

  return (
    <form
        className='flex flex-col justify-center items-center my-4 py-3 px-4 border rounded-lg shadow-lg'
     onSubmit={ onSubmit }
     >
      <input className='py-3 px-4 my-4 border rounded-lg outline-none' onChange={ e => setValue(e.target.value) } />

      <button className='py-3 px-4 border rounded-lg bg-blue-400 text-white' type="submit" >Submit</button>
    </form>
  );
}