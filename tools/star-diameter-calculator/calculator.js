const SOLAR_RADIUS = 695700; // in km
const MAX_INPUT_VALUE = 10000;

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
    errorMsg = `Input value cannot be more than ${MAX_INPUT_VALUE}.`;
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
  const starRadius = validateNumberInput('star-input', 'result');
  if (starRadius === null) { return; }
  const diameter = starRadius * SOLAR_RADIUS * 2;
  document.getElementById('result').textContent = `Diameter: ${formatNumber(diameter)} km`;
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