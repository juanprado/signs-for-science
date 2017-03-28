(function () {
'use strict';

function validateFile(file) {
  const maxLimit = 1024 * 1024 * 2; // 2 MB

  if (file === null) {
    alert('No file was selected');
    return false;
  }

  if (file.size > maxLimit) {
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
    showPreview(file);
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

function bind() {
  const element = document.getElementById('file');

  element && element.addEventListener('change', getFile);
}

bind();

console.log('we got us some javascript');

window.addEventListener("DOMContentLoaded", function () {

  var urlBtn = document.getElementsByClassName("get-url");

  for (var i = 0; i < urlBtn.length; i++) {
    urlBtn[i].addEventListener('click', function () {
      var after = this.nextSibling;
      var urlField = after.nextSibling;
      urlField.classList.add("visible");
    }, false);
  }

  if (document.getElementById("filter")) {
    var h = document.getElementById("filter");
    var stuck = false;
    var stickPoint = getDistance();

    function getDistance() {
      var topDist = h.parentNode.offsetTop;
      return topDist;
    }

    window.onscroll = function (e) {
      var distance = getDistance() - window.pageYOffset;
      var offset = window.pageYOffset;
      if (distance <= 0 && !stuck) {
        h.classList.add("sticky");
        stuck = true;
      } else if (stuck && offset <= stickPoint) {
        h.classList.remove("sticky");
        stuck = false;
      }
    };
  } else if (document.getElementById("file")) {
    document.getElementById("file").onchange = function () {
      var input = document.getElementById("file");
      var label = document.getElementById("file-name");
      var labelVal = label.innerHTML;
      var fileName = '';

      if (input.value) {
        fileName = input.value;
      }

      if (fileName) {
        label.innerHTML = fileName;
      } else {
        label.innerHTML = labelVal;
      }
    };
  }
}, false);

}());
