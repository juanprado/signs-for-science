import { goToNextStep } from './form';

const imageSubmit = document.getElementById('image-sign-submit');

let fileForUpload = false;

// Bind file input
export default function bind() {
  const fileInput = document.getElementById('file');

  imageSubmit && imageSubmit.addEventListener('click', nextStep);
  fileInput && fileInput.addEventListener('change', getFile);
}

// Image validation rules
function validateFile(file) {
  const maxLimit = 1024 * 1024 * 2; // 2 MB

  if (file === null) {
    alert('No file was selected');
    return false;
  }

  if (file.size > maxLimit ) {
    alert('file is too big, please upload something that is smaller than 2MB');
    return false;
  }

  if (file.type.split('/')[0] !== 'image') {
    alert('file is not an image');
    return false;
  }

  return true;
}

// Gets the file from the input after user has selected an image
function getFile(evt) {
  const file = evt.target.files[0];
  const isValid = validateFile(file);

  if (isValid) {
    styleLabel(file);
    showPreview(file);
    fileForUpload = file;
    imageSubmit.classList.remove('disabled');
  } else {
    imageSubmit.classList.add('disabled');
  }
}

// Gives label the name of the file
function styleLabel(file) {
  const label = document.getElementById("file-name");
  const fileName = file.name;

  if (fileName) {
    label.innerHTML = fileName;
  }
}

// Goes to the final step
function nextStep() {
  goToNextStep(3);
}

// Populates previews with file
function showPreview(file) {
  const reader = new FileReader();
  const previews = document.querySelectorAll('.create-image-preview');
  const rules = document.querySelector('.sign-slogan-rules');

  reader.addEventListener('load', () => {
    for (let preview of previews) {
      preview.src = reader.result;
    }
    rules.classList.add('_hide');
  });
  reader.readAsDataURL(file);
}

// Returns file if the file has been validated, false if not
export function getFileForUpload() {
  return fileForUpload;
}
