import imageUpload from './imageUpload';
import getSigns from './getSigns';

imageUpload();
getSigns();


console.log('we got us some javascript');

window.addEventListener("DOMContentLoaded", function() {


var urlBtn = document.getElementsByClassName("get-url");

for (var i = 0; i < urlBtn.length; i++) {
    urlBtn[i].addEventListener('click', function() {
        var after = this.nextSibling;
        var urlField = after.nextSibling;
        urlField.classList.add("visible");
    }, false);
};

document.getElementById("nav-close").addEventListener('click', function() {
      document.getElementById("mobile-menu").classList.add("_hide");
  }, false);

document.getElementById("mobile-hamburger").addEventListener('click', function() {
      document.getElementById("mobile-menu").classList.remove("_hide");
  }, false);

if (document.getElementById("filter")) {
  var h = document.getElementById("filter");
  var stuck = false;
  var stickPoint = getDistance();

  function getDistance() {
    var topDist = h.parentNode.offsetTop;
    return topDist;
  }

  window.onscroll = function(e) {
    var distance = getDistance() - window.pageYOffset;
    var offset = window.pageYOffset;
    if ( (distance <= 0) && !stuck) {
      h.classList.add("sticky");
      stuck = true;
    } else if (stuck && (offset <= stickPoint)){
      h.classList.remove("sticky");
      stuck = false;
    }
  }
}
if(document.getElementById("file")) {
  document.getElementById("file").onchange = function () {
    var input = document.getElementById("file");
    var label  = document.getElementById("file-name");
    var labelVal = label.innerHTML;
    var fileName = '';

    if( input.value ) {
      fileName = input.value;
    }

    if( fileName ) {
      label.innerHTML = fileName;
    }
    else {
      label.innerHTML = labelVal;
    }
  }
}
}, false);