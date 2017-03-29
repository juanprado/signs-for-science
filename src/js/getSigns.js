let currentPage = 1;
let gallery = document.getElementById('gallery');

export default function init() {
  if (gallery) {
    getSign(currentPage);
    window.addEventListener('scroll', checkBottom);
  }
}

function getSign(page) {
  const request = new XMLHttpRequest();
  const url = `/get-signs?page=${page}`
  
  request.open('GET', url, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      renderSigns(request.responseText)
    } else {
      console.log('error fetch more stuff');
    }
  }
  request.onerror = function() {
    console.log('error fetching stuff as well');
  }
  request.send();
}

function renderSigns(signs) {
  if (signs.length > 0) {
    const signElements = document.createElement('div');

    currentPage++
    signElements.innerHTML = signs;
    gallery.append(signElements)
  } else {
    window.removeEventListener('scroll', checkBottom);
  }
}

function checkBottom(evt) {
  const innerHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const offset = document.body.offsetHeight;

  if ((innerHeight + scrollY) >= offset) {
    getSign(currentPage);
  }
}