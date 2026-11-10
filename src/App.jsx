 import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  return (
    <div className="calculator">
      <div className="screen">{display}</div>
      <div className="keypad">
        <button  className="span-2">AC</button>
        <button  className="operator">÷</button>
        <button  className="operator">x</button>

        <button >7</button>
        <button >8</button>
        <button >9</button>
        <button className="operator">-</button>

        <button >4</button>
        <button >5</button>
        <button >6</button>
        <button  className="operator">+</button>

        <button >1</button>
        <button >2</button>
        <button >3</button>
        <button>=</button>

        <button className="span-2">0</button>
        <button >.</button>
      </div>
    </div>
  );
}

export default App;