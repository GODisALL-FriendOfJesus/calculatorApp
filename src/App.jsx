import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  // Handle number and decimal clicks
  const handleNumber = (num) => {
    setDisplay(prev => (prev === '0' ? String(num) : prev + num));
  };

  // Handle operators (+, -, x, ÷)while checking for translation of devision and  multiplication
  const handleOperator = (op) => {
    // Convert visual 'x' and '÷' to JavaScript operators '*' and '/'
    const jsOp = op === 'x' ? '*' : op === '÷' ? '/' : op;
    setEquation(display + ' ' + jsOp + ' ');
    setDisplay('0');
  };

  // Clear everything (AC)
  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  // Calculate result (=)
  const handleCalculate = () => {
    try { 
      const fullExpression = equation + display;
      
      const result = eval(fullExpression);
      setDisplay(String(result));
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <div className="calculator">
      <div className="screen">{display}</div>
      <div className="keypad">
        <button onClick={handleClear} className="span-2">AC</button>
        <button onClick={() => handleOperator('÷')} className="operator">÷</button>
        <button onClick={() => handleOperator('x')} className="operator">x</button>

        <button onClick={() => handleNumber(7)}>7</button>
        <button onClick={() => handleNumber(8)}>8</button>
        <button onClick={() => handleNumber(9)}>9</button>
        <button onClick={() => handleOperator('-')} className="operator">-</button>

        <button onClick={() => handleNumber(4)}>4</button>
        <button onClick={() => handleNumber(5)}>5</button>
        <button onClick={() => handleNumber(6)}>6</button>
        <button onClick={() => handleOperator('+')} className="operator">+</button>

        <button onClick={() => handleNumber(1)}>1</button>
        <button onClick={() => handleNumber(2)}>2</button>
        <button onClick={() => handleNumber(3)}>3</button>
        <button onClick={handleCalculate} className="equal operator">=</button>

        <button onClick={() => handleNumber(0)} className="span-2">0</button>
        <button onClick={() => handleNumber('.')}>.</button>
      </div>
    </div>
  );
}

export default App;