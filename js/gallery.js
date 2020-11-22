import galleryItems from './gallery-items.js'

const galleryList = document.querySelector('.js-gallery')
const modalLightbox = document.querySelector('div.lightbox')
const battonClose = document.querySelector('[data-action="close-lightbox"]')
const imgLightbox = document.querySelector('.lightbox__image')
const imgGallery = document.querySelector('.gallery__image')
const overlayLightbox = document.querySelector('.lightbox__overlay')
const body = document.querySelector('body')
battonClose.addEventListener('click',modalIsClose)
galleryList.addEventListener('click', elementActivClick)
overlayLightbox.addEventListener('click',modalIsClose )
galleryList.addEventListener('keydown', closeModalEsc)
galleryList.addEventListener('keydown', turnImg )

/*------ ДОБАВИЛА ГАЛЕРЕЮ КАРТИНОК--------*/

const arrPicture = []
for (const element of galleryItems) {
  let index = galleryItems.indexOf(element)
    let tegLi = document.createElement('li');
    let { preview, original, description } = element;
    tegLi.insertAdjacentHTML('afterBegin', `<li class="gallery__item">
  <a class="gallery__link" href="${original}" >
    <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" data-index="${index}"/>
  </a>`)
    arrPicture.push(tegLi)
  }
galleryList.append(...arrPicture)


/*------ ОТКРЫТИЕ, ЗАКРЫТИЕ МОДАЛКИ--------*/

function modalIsOpen() {
  modalLightbox.classList.add('is-open')
 }

function modalIsClose() {
  modalLightbox.classList.remove('is-open') 
  imgLightbox.setAttribute('src', "")
}

function closeModalEsc(event) {
  if (event.code === "Escape")
    modalIsClose()
  }

function elementActivClick(event) {
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    modalIsOpen(event)
  }
  imgLightbox.setAttribute('src', event.target.dataset.source)
  imgLightbox.setAttribute('data-ind', event.target.dataset.index)
}


/*------ ПРОЛИСТЫВАНИЕ--------*/

function turnImg(event) {
  let nextIndex = Number(imgLightbox.getAttribute('data-ind'));
  if (event.code === "ArrowRight") {
    nextIndex += 1
    //console.log(nextIndex)
    if (nextIndex < arrPicture.length) {
        createNextImg(nextIndex)
    }   
  }
  else if (event.code === "ArrowLeft") {
    nextIndex -= 1
    //console.log(nextIndex)
    if (nextIndex >= 0) {
      createNextImg(nextIndex)
    }
  }
}

function createNextImg(nextIndex) {
  let nextPicture = document.querySelector(`[data-index="${nextIndex}"]`)
    //console.log(nextPicture)
    imgLightbox.setAttribute('src', nextPicture.dataset.source)
    imgLightbox.setAttribute('data-ind', nextPicture.dataset.index)
}






  



