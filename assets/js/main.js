(function () {
'use strict';

// import imageUpload from './imageUpload';
// import getSigns from './getSigns';

// imageUpload();
// getSigns();

// Gallery URL Button

if (document.getElementById("gallery")) {
  var urlBtn = document.getElementsByClassName("get-url");

  for (var i = 0; i < urlBtn.length; i++) {
    urlBtn[i].addEventListener('click', function () {
      var after = this.nextSibling;
      var urlField = after.nextSibling;
      urlField.classList.add("visible");
    }, false);
  }
}

// Mobile Nav

var menu = document.getElementById("mobile-menu");
var closeIcon = document.getElementById("nav-close");
var hamburgerIcon = document.getElementById("mobile-hamburger");

closeIcon.addEventListener('click', function () {
  menu.classList.add("_hide");
}, false);

hamburgerIcon.addEventListener('click', function () {
  menu.classList.remove("_hide");
}, false);

// Sticky gallery filter

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
}

// Form file uploader

if (document.getElementById("file")) {
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

}());
