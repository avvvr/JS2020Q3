class Calculator {
  constructor(previousOperandBlock, currentOperandBlock) {
    this.previousOperandBlock = previousOperandBlock; //хранит div
    this.currentOperandBlock = currentOperandBlock;
    this.readyToReset = false;
    //this.isPositive = true;
    this.clear();
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return; //если пытаются 2 раз поставить "."
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  getDisplayNumber(number) {
    return number.toString();
  }


  updateDisplay() {
    this.currentOperandBlock.innerText = this.getDisplayNumber(this.currentOperand);

    if (this.operation != null) {
      this.previousOperandBlock.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`; //выводит число и оператор
    } else {
      this.previousOperandBlock.innerText = '';
    }

  } //непосредственное обновление отображения

  chooseOperation(operation) {
    if (operation === '\u221A') {
      if (this.currentOperand < 0) {
        this.currentOperand = '';
        alert('error');
        return;
      }
      if (!this.currentOperand || this.currentOperand == '.') {
        return;
      }
      const current = parseFloat(this.currentOperand);

      this.currentOperand = Math.sqrt(current);
      currentOperandBlock.innerText = this.currentOperand;
      this.readyToReset = true;
      return;
    }
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') this.compute();
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(previous) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = (previous * 100000000 + current * 100000000) / 100000000;
        break;
      case '-':
        computation = (previous * 100000000 - current * 100000000) / 100000000;
        break;
      case '*':
        computation = ((previous * 100000) * (current * 100000)) / 10000000000;
        break;
      case '÷':
        computation = ((previous * 100000) / (current * 100000));
        break;
      case '^':
        computation = Math.pow(previous, current);
        break;
      default:
        return;
    }
    this.readyToReset = true;

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  clear() {
    this.currentOperand = ''; //хранит число из div
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(1);
  }

  makeNegative() {
    if (!this.currentOperand || this.currentOperand == '.') {
      return;
    }
    this.currentOperand = (-parseFloat(this.currentOperand)).toString();
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const clearAllButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const makeNegativeButon = document.querySelector('[data-negative]');
const previousOperandBlock = document.querySelector('[data-previous-operand]');
const currentOperandBlock = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandBlock, currentOperandBlock);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (calculator.previousOperand === '' &&
      calculator.currentOperand !== '' && calculator.readyToReset) {
      calculator.currentOperand = '';
      calculator.readyToReset = false;
    }
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

makeNegativeButon.addEventListener('click', button => {
  calculator.makeNegative();
  calculator.updateDisplay();
})

clearAllButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})