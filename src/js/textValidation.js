let textForUpload = false;
let text = false;

// Text validation rules
function validateText(str) {
  return str.length > 0;
}

// Previews the text on change
function previewText(evt) {
  const preview = document.getElementById('text-sign-preview');
  console.log(' is this working? ')

  text = evt.target.value;
  preview.innerHTML = text;
}

// validates Text
function validateText() {
  const isValid = validateText(text);

  if (isValid) {
    textForUpload = text;
    // go to the next step
  }
}

// Returns text if the text has been validated, false if not
export function getTextForUpload() {
  return textForUpload;
}

// Bind file input
export default function bind() {
  console.log('binding');
  const textInput = document.getElementById('text-sign');
  const textSubmit = document.getElementById('text-sign-submit');

  textInput && textInput.addEventListener('keyup', previewText);
  textSubmit && textSubmit.addEventListener('click', validateText);
}