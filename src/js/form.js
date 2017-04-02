import { getFileForUpload } from './imageValidation';
import { getTextForUpload } from './textValidation';

// Kickstarts form validation with submit btn
export default function bind() {
  const submitBtn = document.getElementById('submitBtn');

  submitBtn && submitBtn.addEventListener('change', validateForm);
}

// Validates entire form
function validateForm(evt) {
  const name = validateName();
  const tagline = validateTagline();
  const website = validateURL();
  const sign = validateSign();

  evt.preventDefault();
  if (name && tagline && website && sign) {
    // let's upload some shit!!
  }
}

function validateSign() {
  const signType = getSignType();
  let sign;

  if (signType === 'text') {
    //validate text
    sign = getSignForUpload();
  } else {
    sign = getFileForUpload();
  } 

  return sign;
}

function validateName() {
  const name = document.getElementById('name').getAttribute('value');
  const isValid = isValidString(name) || name.length === 0;

  if (!isValid) {
    alert('The name does not seem to be a valid name, please enter a correct name')
  }

  return isValid;
}

function validateURL() {
  const website = document.getElementById('url').getAttribute('value');
  const isValid = isValidURL(website) || website.length === 0;

  if (!isValid) {
    alert('The website does not seem to be a correct url, please enter a valid URL')
  }

  return isValid;
}

function validateTagline() {
  const tagline = document.getElementById('tagline').getAttribute('value');
  const isValid = isValidString(tagline) || tagline.length === 0;

  if (!isValid) {
    alert('The tagline does not seem to be tagline, please enter a correct tagline')
  }

  return isValid;
}

function isValidString(str) {
  const pattern = /^[A-Za-z\d\s]+$/;

  return pattern.test(str);
}

function isValidURL(str) {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

  return pattern.test(str);
}