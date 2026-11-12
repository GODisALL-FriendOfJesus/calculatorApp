export default function calculate(obj, buttonName) {
  if (buttonName === 'AC') {
    return {
      total: null,
      next: null,
      operation: null,
    };
  }

  // Handle numbers (0-9)
  if (/^[0-9]+$/.test(buttonName)) {
    if (buttonName === '0' && obj.next === '0') {
      return {};
    }
    if (obj.operation) {
      if (obj.next && obj.next !== '0') {
        return { ...obj, next: obj.next + buttonName };
      }
      return { ...obj, next: buttonName };
    }
    if (obj.next && obj.next !== '0') {
      return {
        next: obj.next + buttonName,
        total: null,
      };
    }
    return {
      next: buttonName,
      total: null,
    };
  }

  // Handle decimal point
  if (buttonName === '.') {
    if (obj.next) {
      if (obj.next.includes('.')) {
        return {};
      }
      return { ...obj, next: `${obj.next}.` };
    }
    if (obj.operation) {
      return { ...obj, next: '0.' };
    }
    if (obj.total) {
      if (obj.total.includes('.')) {
        return {};
      }
      return { ...obj, next: `${obj.total}.` };
    }
    return { ...obj, next: '0.' };
  }

  // Handle equals (=)
  if (buttonName === '=') {
    if (obj.next && obj.operation) {
      return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: null,
      };
    }
    return {};
  }

  // Handle +/- (negate)
  if (buttonName === '+/-') {
    if (obj.next) {
      return { ...obj, next: (-1 * parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      return { ...obj, total: (-1 * parseFloat(obj.total)).toString() };
    }
    return {};
  }

  // Handle % (percentage)
  if (buttonName === '%') {
    if (obj.next) {
      return { ...obj, next: (parseFloat(obj.next) / 100).toString() };
    }
    if (obj.total) {
      return { ...obj, total: (parseFloat(obj.total) / 100).toString() };
    }
    return {};
  }

  // User pressed an operation (+, -, x, ÷)
  // Case 1: Chaining operations (e.g., 9 + 9 + ...)
  if (obj.operation && obj.next) {
    return {
      total: operate(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName,
    };
  }

  // Case 2: Changing the operator before typing the second number
  if (obj.operation && !obj.next) {
    return { ...obj, operation: buttonName };
  }

  // Case 3: Pressing an operator right after '='
  if (!obj.next) {
    return { operation: buttonName };
  }

  // Case 4: Standard first operator press
  return {
    total: obj.next,
    next: null,
    operation: buttonName,
  };
}

function operate(numberOne, numberTwo, operation) {
  const one = parseFloat(numberOne || '0');
  const two = parseFloat(numberTwo || '0');

  switch (operation) {
    case '+':
      return (one + two).toString();
    case '-':
      return (one - two).toString();
    case 'x':
      return (one * two).toString();
    case '÷':
      return two === 0 ? 'Error' : (one / two).toString();
    default:
      return '0';
  }
}


 

