import axios from 'axios/dist/axios';

let gallery = document.getElementById('gallery');
let currentPage;
let checking = false;

export default function init() {
  const urlBtns = document.getElementsByClassName('get-url')

  addingShareToggle(urlBtns);
  if (gallery) {
    currentPage = gallery.getAttribute('data-initial-page') || 1;
    getSign(currentPage);
    window.addEventListener('scroll', checkBottom);
  }
}

function addingShareToggle(btnArray) {
  for (let btn of btnArray) {
    btn.addEventListener('click', () => {
      const after = btn.nextSibling;
      const urlField = after.nextSibling;

      urlField.classList.add('visible')
    })
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
  alert(error);
  checking = false;
}

function renderSigns(signs) {
  checking = false;

  if (signs.length > 0) {
    const signElements = document.createElement('div');

    currentPage++
    signElements.innerHTML = signs;
    gallery.append(signElements)
    addingShareToggle(signElements.getElementsByClassName('get-url'))
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