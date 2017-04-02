import axios from 'axios/dist/axios';

let gallery = document.getElementById('gallery');
let checking = false;

export default function init() {
  if (gallery) {
    let currentPage = gallery.getAttribute('data-initial-page');

    getSign(currentPage);
    window.addEventListener('scroll', checkBottom);
  }
}

function getSign(page) {
  const url = `/get-signs?page=${page}`
  
  checking = true;
  axios.get(url)
    .then(response => { renderSigns(response.data); })
    .catch(error => { onError(error) });
}

function onError(error) {
  console.log(error);
  checking = false;
}

function renderSigns(signs) {
  checking = false;
  
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
  const offsetHeight = document.body.offsetHeight - 700;
  const scrollPosition = (innerHeight + scrollY);

  if ((scrollPosition >= offsetHeight) && !checking) {
    getSign(currentPage);
  }
}