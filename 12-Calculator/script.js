'use script';

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

const actions = ['c', '+/-', '%', '÷', '×', '−', '+', '.', '='];

let evalStr = '';

function safeEval(expr) {
  try {
    return Function('return ' + expr)();
  } catch (e) {
    return 'Error';
  }
}

buttons.forEach((el) =>
  el.addEventListener('click', (e) => {
    let rawValue = e.target.innerHTML;

    if (actions.includes(rawValue)) {
      switch (rawValue) {
        case 'c':
          display.value = '';
          evalStr = '';
          break;
        case '+/-':
          if (evalStr.startsWith('-')) evalStr = evalStr.slice(1);
          else evalStr = '-' + evalStr;
          break;

        case '%':
          evalStr = String(safeEval(evalStr) / 100);
          break;

        case '÷':
          evalStr += '/';
          break;

        case '×':
          evalStr += '*';
          break;

        case '−':
          evalStr += '-';
          break;

        case '=':
          const result = safeEval(evalStr);
          display.value = result;
          evalStr = String(result);
          return;

        default:
          evalStr += rawValue;
          break;
      }
    } else {
      evalStr += rawValue;
    }

    display.value = evalStr;
  })
);
