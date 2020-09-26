class Calculator {
  constructor(previousOperandBlock, currentOperandBlock) {
    this.previousOperandBlock = previousOperandBlock; //хранит div
    this.currentOperandBlock = currentOperandBlock;

    this.clear();
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return; //если пытаются 2 раз поставить "."
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]); //целая часть
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay; //дробная часть

    if (isNaN(integerDigits)) {
      integerDisplay = ''; //если польз-ль ставит .1, отображается .1, а не 0.1
    } else {
      integerDisplay = integerDigits;
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else return integerDisplay;
  } //возвращает число в десятичном формате (?), с точкой при необходимости

  updateDisplay() {
    this.currentOperandBlock.innerText = this.getDisplayNumber(this.currentOperand);

    if (this.operation != null) {
      this.previousOperandBlock.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`; //выводит число и оператор
    } else {
      this.previousOperandBlock.innerText = '';
    }

  } //непосредственное обновление отображения

  chooseOperation(operation) {
    if (operation === 'x') {
      if (this.currentOperand < 0) {
        this.currentOperand = '';
        alert('error');
        return;
      }
      const current = parseFloat(this.currentOperand);

      this.currentOperand = Math.sqrt(current);
      currentOperandBlock.innerText = this.currentOperand;
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
        computation = previous + current;
        break;
      case '-':
        computation = previous - current;
        break;
      case '*':
        computation = previous * current;
        break;
      case '÷':
        computation = previous / current;
        break;
      case 'x^y':
        computation = Math.pow(previous, current);
        break;
      default:
        return;
    }

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
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const clearAllButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandBlock = document.querySelector('[data-previous-operand]');
const currentOperandBlock = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandBlock, currentOperandBlock);

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
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

clearAllButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})