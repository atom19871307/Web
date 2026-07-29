// JavaScript source code
// Կալկուլյատորի վիճակը
let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetScreen = false;
let memory = 0;

// DOM էլեմենտներ
const display = document.getElementById('display');

// Հիմնական ֆունկցիաներ
function updateDisplay() {
    display.value = currentInput;
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    shouldResetScreen = false;
    updateDisplay();
}

function clearEntry() {
    currentInput = '0';
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function appendNumber(number) {
    if (shouldResetScreen) {
        currentInput = '';
        shouldResetScreen = false;
    }

    // Սահմանափակել մուտքագրման երկարությունը
    if (currentInput.length >= 15) return;

    // Միայն մեկ կետ
    if (number === '.' && currentInput.includes('.')) return;

    currentInput += number;
    updateDisplay();
}

function chooseOperation(op) {
    if (operation !== null && !shouldResetScreen) {
        calculate();
    }

    previousInput = currentInput;
    operation = op;
    shouldResetScreen = true;
}

function calculate() {
    if (operation === null || previousInput === '') return;

    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    let result = 0;

    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                currentInput = 'Ошибка: деление на 0';
                updateDisplay();
                return;
            }
            result = prev / curr;
            break;
        case '%':
            result = prev % curr;
            break;
        default:
            return;
    }

    // Կլորացում մինչև 15 նշան
    if (Number.isInteger(result)) {
        currentInput = result.toString();
    } else {
        currentInput = parseFloat(result.toFixed(12)).toString();
    }

    operation = null;
    previousInput = '';
    shouldResetScreen = true;
    updateDisplay();
}

// Լրացուցիչ ֆունկցիաներ
function sqrt() {
    const num = parseFloat(currentInput);
    if (isNaN(num) || num < 0) {
        currentInput = 'Ошибка: отрицательное число';
        updateDisplay();
        return;
    }
    currentInput = Math.sqrt(num).toString();
    shouldResetScreen = true;
    updateDisplay();
}

function reciprocal() {
    const num = parseFloat(currentInput);
    if (isNaN(num) || num === 0) {
        currentInput = 'Ошибка: деление на 0';
        updateDisplay();
        return;
    }
    currentInput = (1 / num).toString();
    shouldResetScreen = true;
    updateDisplay();
}

function toggleSign() {
    if (currentInput === '0') return;
    if (currentInput.startsWith('-')) {
        currentInput = currentInput.slice(1);
    } else {
        currentInput = '-' + currentInput;
    }
    updateDisplay();
}

function percent() {
    const num = parseFloat(currentInput);
    if (isNaN(num)) return;
    currentInput = (num / 100).toString();
    shouldResetScreen = true;
    updateDisplay();
}

// Հիշողության ֆունկցիաներ
function memoryClear() {
    memory = 0;
}

function memoryRecall() {
    currentInput = memory.toString();
    shouldResetScreen = true;
    updateDisplay();
}

function memorySave() {
    memory = parseFloat(currentInput) || 0;
    shouldResetScreen = true;
}

function memoryAdd() {
    memory += parseFloat(currentInput) || 0;
    shouldResetScreen = true;
}

// Event listeners-ների կարգավորում
document.addEventListener('DOMContentLoaded', function () {
    // Թվային կոճակներ
    document.querySelectorAll('.calc-buttons button:not(.operation-button):not(.memory-button):not(.clear-buttons button)').forEach(button => {
        if (['sqrt', '%', '1/x', '+/-'].includes(button.textContent.trim())) {
            return;
        }
        button.addEventListener('click', function () {
            if (this.textContent.trim() === '.') {
                appendNumber('.');
            } else {
                appendNumber(this.textContent.trim());
            }
        });
    });

    // Գործողությունների կոճակներ
    document.querySelectorAll('.operation-button').forEach(button => {
        button.addEventListener('click', function () {
            const op = this.textContent.trim();
            if (op === '=') {
                calculate();
            } else if (op === '+') {
                chooseOperation('+');
            } else if (op === '-') {
                chooseOperation('-');
            } else if (op === '*') {
                chooseOperation('*');
            } else if (op === '/') {
                chooseOperation('/');
            } else if (op === '%') {
                percent();
            }
        });
    });

    // sqrt կոճակ
    document.querySelectorAll('.calc-buttons button').forEach(button => {
        if (button.textContent.trim() === 'sqrt') {
            button.addEventListener('click', sqrt);
        }
        if (button.textContent.trim() === '1/x') {
            button.addEventListener('click', reciprocal);
        }
        if (button.textContent.trim() === '+/-') {
            button.addEventListener('click', toggleSign);
        }
    });

    // Մաքրման կոճակներ
    document.querySelector('.clear-buttons').querySelectorAll('button').forEach((button, index) => {
        button.addEventListener('click', function () {
            if (index === 0) { // Backspace
                deleteLast();
            } else if (index === 1) { // CE
                clearEntry();
            } else if (index === 2) { // C
                clearAll();
            }
        });
    });

    // Հիշողության կոճակներ
    document.querySelectorAll('.memory-button').forEach((button, index) => {
        button.addEventListener('click', function () {
            const text = this.textContent.trim();
            if (text === 'MC') memoryClear();
            else if (text === 'MR') memoryRecall();
            else if (text === 'MS') memorySave();
            else if (text === 'M+') memoryAdd();
        });
    });

    // Ստեղնաշարի աջակցություն
    document.addEventListener('keydown', function (e) {
        if (e.key >= '0' && e.key <= '9') {
            appendNumber(e.key);
        } else if (e.key === '.') {
            appendNumber('.');
        } else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            calculate();
        } else if (e.key === 'Backspace') {
            deleteLast();
        } else if (e.key === 'Escape') {
            clearAll();
        } else if (e.key === '+') {
            chooseOperation('+');
        } else if (e.key === '-') {
            chooseOperation('-');
        } else if (e.key === '*') {
            chooseOperation('*');
        } else if (e.key === '/') {
            e.preventDefault();
            chooseOperation('/');
        } else if (e.key === '%') {
            percent();
        }
    });
});

// Սկզբնական ցուցադրում
updateDisplay();