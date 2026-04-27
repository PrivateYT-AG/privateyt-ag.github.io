const SOLAR_RADIUS = 695700; // in km
const MAX_INPUT_VALUE = 10000;

const settings = {
  useDecimals: true,
  includeImperial: false,
  autoUpdateResult: false
}

function clearResult() {
  document.getElementById('result').textContent = '';
  document.getElementById('star-input').value = '';
  document.getElementById('result').classList.remove('show'); // prevent margin from messing
}

function formatNumber(num) {
  return num.toLocaleString(navigator.language, { 
    minFractionDigits: 0, 
    maxFractionDigits: 3
  });
}

function validateNumberInput(inputId, resultId) {
  const inputElement = document.getElementById(inputId);
  const resultElement = document.getElementById(resultId);

  const input = inputElement.value.trim();
  const numberRegex = /^\d+(\.\d+)?$/;
  const numberValue = Number(input);
  let errorMsg = '';

  if (!numberRegex.test(input)) {
    errorMsg = 'Invalid input. Please enter a valid number.';
  } else if (numberValue > MAX_INPUT_VALUE) {
    errorMsg = `Input value cannot be more than ${formatNumber(MAX_INPUT_VALUE)}.`;
  }

  if (errorMsg) {
    resultElement.textContent = errorMsg;
    resultElement.classList.add('show');
    resultElement.classList.add('error');
    return null;
  }

  resultElement.textContent = '';
  resultElement.classList.add('show');
  resultElement.classList.remove('error');
  return numberValue;
}

function calculateDiameter() {
  const result = document.getElementById('result');
  const starRadius = validateNumberInput('star-input', 'result');
  if (starRadius === null) return;

  let diameter = starRadius * SOLAR_RADIUS * 2;
  let text = `Diameter: ${formatNumber(diameter)} km`;

  if (!settings.useDecimals) {
    diameter = Math.round(diameter)
  }

  if (settings.includeImperial) {
    const miles = diameter * 0.621371;
    const milesFormatted = settings.useDecimals ? formatNumber(miles) : Math.round(miles);
    text += ` (${milesFormatted} mi)`;
  }

  result.textContent = text;
}

document.querySelectorAll('.calculator-button').forEach(button => {
  button.addEventListener('click', e => {
    const button = e.target;

    if (button.id === 'calculate') {
      calculateDiameter();
    } else if (button.id === 'clear') {
      clearResult();
    }
  });
});

// keyboard shortcuts, etc
document.addEventListener('keydown', function(event) {
  const key = event.key;
  if (key === 'Enter') {
    calculateDiameter()
  } else if (event.ctrlKey && key === 'Backspace') {
    clearResult()
  } else if (key === 'Escape') {
    clearResult()
  }
});

// toggle switches for the settings menu
document.getElementById('useDecimals').addEventListener('change', e => {
  settings.useDecimals = e.target.checked;
  calculateDiameter();
});

document.getElementById('includeImperial').addEventListener('change', e => {
  settings.includeImperial = e.target.checked;
  calculateDiameter();
});

document.getElementById('autoUpdateResult').addEventListener('change', e => {
  settings.autoUpdateResult = e.target.checked;
})