(function () {
'use strict';

console.log('we got us some javascript');

window.addEventListener("DOMContentLoaded", function () {

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
