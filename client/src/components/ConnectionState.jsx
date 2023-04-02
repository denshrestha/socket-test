import React from 'react';

export function ConnectionState({ isConnected }) {
  return <p className='my-4 py-3 px-3 border rounded-lg'>State: { '' + isConnected }</p>;
}