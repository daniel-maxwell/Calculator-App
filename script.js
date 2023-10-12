const nums = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operator]');
const equal = document.querySelector('[data-equal]');
const clear = document.querySelector('[data-clear]');
const sign = document.querySelector("[data-sign]");
const percentage = document.querySelector("[data-percentage]");
const memory = document.querySelectorAll("[data-memory]");
const display = document.getElementById("display");
const memoryActivated = document.getElementById('memory-up'); // memory indicator on display

let screenDisplay = []
let operand = '';
let previousNumber = '';
let newNumber = '';
let memoryPlus = [];
let memorySubstract = [];

// Event Listeners
nums.forEach(button => {
    button.addEventListener("click", () => {
        clear.innerText = "C";
        updateDisplay(addString(button.innerText));
    });
});

operators.forEach(button => {
    button.addEventListener("click", () => {
        if (operand !== '') {
            calculate(previousNumber, display.innerText, operand);
            operand = '';
        }
        operand = button.innerText;
        previousNumber = display.innerText;
        screenDisplay = [];
    });
});

equal.addEventListener("click", () => {
    calculate(previousNumber, display.innerText, operand);
});

clear.addEventListener("click", clearScreen);

percentage.addEventListener("click", () => {
    if (operand === '') {
        updateDisplay(Number(display.innerText) / 100);
    } else {
        updateDisplay(previousNumber * (display.innerText / 100));
    }

});

sign.addEventListener("click", () => {
    updateDisplay(Number(display.innerText) * -1);
});

memory.forEach(button => {
    button.addEventListener("click", () => {
        memorize(button.innerText);
    });
});

// Helper Functions
function clearScreen() {
    updateDisplay('0');
    screenDisplay = [];
    operand = '';
    previousNumber = '';
    newNumber = '';
    clear.innerText = "AC";
}

function addString(number) {
    if (number === '.' && display.innerText.includes('.')) {
        return screenDisplay.join('');
    } else if (display.innerText === '0' && number === '.') {
        screenDisplay.push('0');
        screenDisplay.push(number);
        return screenDisplay.join('');
    } else {
        screenDisplay.push(number);
        return screenDisplay.join('');
    }
}

function calculate(previousNumber, newNumber, operand) {
    switch (operand) {
        case '+':
            updateDisplay(parseFloat(Number(previousNumber) + Number(newNumber)).toFixed(3));
            break;
        case '−':
            updateDisplay(parseFloat(Number(previousNumber) - Number(newNumber)).toFixed(3));
            break;
        case '÷':
            updateDisplay(parseFloat(Number(previousNumber) / Number(newNumber)).toFixed(3));
            break;
        case '×':
            updateDisplay(parseFloat(Number(previousNumber) * Number(newNumber)).toFixed(3));
            break;
    }
}

function updateDisplay(string) {
    return display.innerText = Number(string);
}

function memorize(data) {
    switch (data) {
        case 'M+':
            if (display.innerText !== '0') {
                memoryActivated.innerHTML = 'M';
                calculate(previousNumber, display.innerText, operand);
                memoryPlus.push(Number(display.innerText));
                screenDisplay = [];
                operand = "";
            }
            break;
        case 'M−':
            if (display.innerText !== '0') {
                memoryActivated.innerHTML = 'M';
                calculate(previousNumber, display.innerText, operand);
                memorySubstract.push(Number(display.innerText));
                screenDisplay = [];
                operand = "";
            }
            break;
        case 'MR':
            if (memoryPlus.length !== 0 && memorySubstract.length !== 0) {
                updateDisplay(memoryPlus.reduce((a, b) => a + b) - memorySubstract.reduce((a, b) => a + b));
            }
            break;
        case 'MC':
            memoryActivated.innerHTML = '';
            memoryPlus = [];
            memorySubstract = [];
            clearScreen();
            break;
    }
}