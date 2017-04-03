import { getFileForUpload } from './imageValidation';
import { getTextForUpload } from './textValidation';
import axios from 'axios/dist/axios';

// Kickstarts form validation with submit btn
export default function bind() {
  const form = document.getElementById('create-sign-form');
  const imageType = document.getElementById('sign-type-image');
  const textType = document.getElementById('sign-type-text');
  // const backBtns = document.querySelectorAll('.back');

  // [...backBtns].forEach( btn => {
  //   btn && btn.addEventListener('click', goToPrevStep)
  // })
  imageType && imageType.addEventListener('change', stepTwo);
  textType && textType.addEventListener('change', stepTwo);
  form && form.addEventListener('submit', validateForm);
}

// Validates entire form
function validateForm(evt) {
  const name = validateName();
  const tagline = validateTagline();
  const website = validateURL();
  const sign = validateSign();

  evt.preventDefault();
  if (name && tagline && website && sign) {
    submitForm(evt, sign);
  }
}

// Form submission
function submitForm(evt, sign) {
  const type = getSignType();
  
  if (type === 'image') {
    getSignature(evt,sign);
  } else {
    evt.target.submit();
  }
}

// Get image Signature
function getSignature(evt, file) {
  const name = encodeURIComponent(file.name);
  const type = file.type;
  const url = `/sign-s3?file-name=${file.name}&file-type=${file.type}`
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        console.log(xhr.responseText);
        const response = JSON.parse(xhr.responseText);   
        console.log(response);
        uploadFile(file, response.signedRequest, response.url);
      }
      else{
        alert('Could not get signed URL for aws bucket.');
      }
    }
  };
  xhr.send();
}


//Upload image, on success upload form
// TODO fix this to use axios
function uploadFile(file, signedRequest, url, evt){
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        document.querySelector('input[name="image_url"]').value = url;
        evt.target.submit();
      }
      else{
        alert('Could not upload file.');
      }
    }
  };
  xhr.send(file);
}

// Go to step two when sign type has been selected
function stepTwo(evt) {
  const type = evt.target.value;
  const createText = document.querySelector('.create-text');
  const createDesign = document.querySelector('.create-design');
  const typeInput = document.querySelector('input[name="is_image"]');

  if (type === 'text') {
    createText.classList.remove('_hide');
    createDesign.classList.add('_hide');
    typeInput.value = false;
  } else if (type === 'image') {
    createText.classList.add('_hide');
    createDesign.classList.remove('_hide');
    typeInput.value = true;
  }

  goToNextStep(2);
}

// Goes to the next step provided
export function goToNextStep(num) {
  const prev = num - 1;
  const container = document.querySelector('.create-section-container');

  if (num > 1) {
    container.classList.remove(`_step-${prev}`);
    container.classList.add(`_step-${num}`);
  }
}

function goToPrevStep(evt) {
  const btn = evt.target;
  const num = parseInt(btn.getAttribute('data-step'));
  const container = document.querySelector('.create-section-container');
  const current = num + 1;

  container.classList.remove(`_step-${current}`);
  container.classList.add(`_step-${num}`);
}

// Return the sign that has been previously validated
function validateSign() {
  const signType = getSignType();
  let sign;

  if (signType === 'text') {
    sign = getTextForUpload();
  } else {
    sign = getFileForUpload();
  } 

  return sign;
}

// Returns the type of image selected
function getSignType() {
  return document.querySelector('input[name="sign-type"]:checked').value;
}

//Validates Name
function validateName() {
  const name = document.getElementById('name').value;
  const isValid = isValidString(name) || name.length === 0;

  if (!isValid) {
    alert('The name does not seem to be a valid name, please enter a correct name')
  }

  return isValid;
}

//Validates website
function validateURL() {
  const website = document.getElementById('url').value;
  const isValid = isValidURL(website) || website.length === 0;

  if (!isValid) {
    alert('The website does not seem to be a correct url, please enter a valid URL')
  }

  return isValid;
}

//Validates tagline
function validateTagline() {
  const tagline = document.getElementById('tagline').value;
  const isValid = isValidString(tagline) || tagline.length === 0;

  if (!isValid) {
    alert('The tagline does not seem to be tagline, please enter a correct tagline')
  }

  return isValid;
}

// Regex to validate string
function isValidString(str) {
  const pattern = /^[a-z ,.'-]+$/i;

  return pattern.test(str);
}

// Regex to validate url
function isValidURL(str) {
  const pattern = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i

  return pattern.test(str);
}