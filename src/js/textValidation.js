import { goToNextStep } from './form';

const textSubmit = document.getElementById('text-sign-submit');

// Bind file input
export default function bind() {
  const textInput = document.getElementById('text-sign');

  textInput && textInput.addEventListener('keyup', previewText);
  textSubmit && textSubmit.addEventListener('click', submitText);
}

let textForUpload = false;
let text = false;

// Text validation rules
function validateText(str) {
  return str.length > 0;
}

// Previews the text on change
function previewText(evt) {
  const preview = document.getElementById('text-sign-preview');

  text = evt.target.value;
  preview.innerHTML = text;
  if (validateText(text)) {
    textSubmit.classList.remove('disabled');
  } else {
    textSubmit.classList.add('disabled');
  }
}

// Submits text to the next step
function submitText() {
  goToNextStep(3);
  textForUpload = text;
}

// Returns text if the text has been validated, false if not
export function getTextForUpload() {
  return textForUpload;
}
