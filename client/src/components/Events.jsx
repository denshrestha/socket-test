import React from 'react';

export function Events({ events }) {
  return (
    <ul className='w-full max-w-[300px] flex justify-center items-center flex-col border rounded-lg my-4 py-3 px-4'>
    {
      events.map((event, index) =>
        <li key={ index }>{ event }</li>
      )
    }
    </ul>
  );
}