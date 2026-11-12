import React from 'react';

export default function Display({ value }) {
  return (
    <div className="bg-[#858694] text-white text-right font-light text-5xl sm:text-6xl px-5 py-6 overflow-x-auto select-none">
      {value || '0'}
    </div>
  );
}

