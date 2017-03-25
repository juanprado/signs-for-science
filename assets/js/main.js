(function () {
'use strict';

console.log('we got us some javascript');

var h = document.getElementById("filter");
var stuck = false;
var stickPoint = getDistance();

function getDistance() {
  var topDist = h.parentNode.parentNode.offsetTop;
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
}());
