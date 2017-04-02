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

function getFile(evt) {
  const file = evt.target.files[0];
  const isValid = validateFile(file);

  if (isValid) {
    styleLabel(file)
    showPreview(file);
  }
}

function styleLabel(file) {
  const label  = document.getElementById("file-name");
  const fileName = file.name;

  if (fileName) {
    label.innerHTML = fileName;
  }
}

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

export default function bind() {
  const element = document.getElementById('file');

  element && element.addEventListener('change', getFile);
}
