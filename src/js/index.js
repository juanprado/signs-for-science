import imageValidation from './imageValidation';
import textValidation from './textValidation';
import form from './form';
import getSigns from './getSigns';

form();
textValidation();
imageValidation();
getSigns();

// Mobile Nav
var menu = document.getElementById("mobile-menu");
var closeIcon = document.getElementById("nav-close");
var hamburgerIcon = document.getElementById("mobile-hamburger");

closeIcon.addEventListener('click', function() {
  menu.classList.add("_hide");
}, false);

hamburgerIcon.addEventListener('click', function() {
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

//Scale sign font size
var slogan = document.getElementsByClassName('sign-slogan-container');

function setScaledFont() {
  for (var i = 0; i < slogan.length; i++) {
    var s = slogan[i].offsetWidth,
        fs = s * .45;

    slogan[i].style.fontSize = fs + '%';
  };
};

window.addEventListener("load", setScaledFont, false);
window.addEventListener("resize", setScaledFont, false);