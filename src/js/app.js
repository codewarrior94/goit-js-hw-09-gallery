const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

/*
    ## Раздел ссылок на элементы
*/

const refs = {
  body: document.querySelector("body"),
  gallery: document.querySelector(".js-gallery"),
  modalMenu: document.querySelector(".js-lightbox"),
  modalMenuImg: document.querySelector(".lightbox__image"),
  modalOverlay: document.querySelector(".lightbox__overlay"),
  modalCloseBtn: document.querySelector(".lightbox__button"),
};

//  Генерация разметки
const generatedGalleryMarkup = createGalleryElementsMarkup(galleryItems);
refs.gallery.insertAdjacentHTML("beforeend", generatedGalleryMarkup);

/* 
    ## Раздел слушателей событий
*/

refs.gallery.addEventListener("click", onGalleryItemClick);

/* 
    ## Раздел функций
*/

function createGalleryElementsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }, index) => {
      return `<li class="gallery__item">
                <a class="gallery__link"
                  href="${original}"
                  >
                  <img class="gallery__image"
                    src="${preview}" 
                    data-source="${original}"
                    data-idx="${index}"
                    alt="${description}"
                  />
                </a>
               </li>`;
    })
    .join("");
}

function onGalleryItemClick(e) {
  const isGalleryImg = e.target.classList.contains("gallery__image");
  counter = e.target.dataset.idx;

  if (!isGalleryImg) {
    return;
  }

  e.preventDefault();
  openModalWindow(e);
}

function onModalCloseBtnClick(e) {
  closeModalOverlay();
}

function onModalOverlayClick(e) {
  closeModalOverlay();
}

function onModalOverlayKeydown(e) {
  if (e.code === "ArrowRight") {
    nextImg();
  }

  if (e.code === "ArrowLeft") {
    privImg();
  }

  if (e.code === "Enter") {
    e.preventDefault();
  }

  if (e.code !== "Escape") {
    return;
  }

  closeModalOverlay();
}

function closeModalOverlay() {
  refs.body.style.overflow = "scroll";
  refs.modalMenu.classList.remove("is-open");
  refs.modalMenuImg.src = "";
  refs.modalMenuImg.alt = "";
  refs.modalMenuImg.dataset.index = "";

  refs.modalCloseBtn.removeEventListener("click", onModalCloseBtnClick);
  refs.modalOverlay.removeEventListener("click", onModalOverlayClick);
  document.removeEventListener("keydown", onModalOverlayKeydown);
}

function openModalWindow(e) {
  refs.modalMenu.classList.add("is-open");
  refs.modalMenuImg.src = e.target.dataset.source;
  refs.modalMenuImg.alt = e.target.alt;

  refs.modalCloseBtn.addEventListener("click", onModalCloseBtnClick);
  refs.modalOverlay.addEventListener("click", onModalOverlayClick);
  document.addEventListener("keydown", onModalOverlayKeydown);
  document.querySelector("body").style.overflow = "hidden";
}

/* 
    ## Реализация слайдера по стрелкам
*/

const imgList = galleryItems.map((srcRef) => srcRef.original);

let counter = 0;

function nextImg() {
  if (counter < imgList.length - 1) {
    counter++;
    refs.modalMenuImg.src = `${imgList[counter]}`;
  } else {
    counter = 0;
    refs.modalMenuImg.src = `${imgList[counter]}`;
  }
}

function privImg() {
  if (counter > 0) {
    counter--;
    refs.modalMenuImg.src = `${imgList[counter]}`;
  } else {
    counter = imgList.length - 1;
    refs.modalMenuImg.src = `${imgList[counter]}`;
  }
}
