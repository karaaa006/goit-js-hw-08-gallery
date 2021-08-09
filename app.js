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

const galleryBlockRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");
const closeBtnRef = document.querySelector(
  "button[data-action='close-lightbox']"
);
const modalImgRef = document.querySelector(".lightbox__image");
const modalOverlay = document.querySelector(".lightbox__overlay");
const galleryElems = galleryItems.map((img) => {
  return `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${img.original}"
      >
        <img
          class="gallery__image"
          src="${img.preview}"
          data-source="${img.original}"
          alt="${img.description}"
        />
      </a>
    </li>
  `;
});

let currentEl;

galleryBlockRef.innerHTML = galleryElems.join("");

const galleryItemRef = document.querySelector(".gallery__item");

const openModal = (e) => {
  if (e.target.nodeName !== "IMG") {
    return;
  }

  e.preventDefault();
  modalRef.classList.add("is-open");
  modalImgRef.src = e.target.dataset.source;
  modalImgRef.alt = e.target.alt;
  currentEl = e.target.parentElement.parentElement;
  document.addEventListener("keydown", keyCheck);
  closeBtnRef.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);
};

const keyCheck = (e) => {
  switch (e.code) {
    case "Escape":
      closeModal();
      break;
    case "ArrowRight":
      nextPhoto();
      break;
    case "ArrowLeft":
      prevPhoto();
      break;
  }
};

const closeModal = () => {
  modalRef.classList.remove("is-open");
  modalImgRef.src = "";
  document.removeEventListener("keydown", keyCheck);
  closeBtnRef.removeEventListener("click", closeModal);
  modalOverlay.removeEventListener("click", closeModal);
};

const nextPhoto = () => {
  if (currentEl.nextElementSibling === null) {
    currentEl = currentEl.parentElement.firstElementChild;
  } else {
    currentEl = currentEl.nextElementSibling;
  }

  modalImgRef.src = currentEl.querySelector(".gallery__image").dataset.source;
  modalImgRef.alt = currentEl.querySelector(".gallery__image").alt;
};

const prevPhoto = () => {
  if (currentEl.previousElementSibling === null) {
    currentEl = currentEl.parentElement.lastElementChild;
  } else {
    currentEl = currentEl.previousElementSibling;
  }

  modalImgRef.src = currentEl.querySelector(".gallery__image").dataset.source;
  modalImgRef.alt = currentEl.querySelector(".gallery__image").alt;
};

galleryBlockRef.addEventListener("click", openModal);

// Переключение фотографии в зависимости от места клика на фото (в левой части пред. фото, в правой след. фото)
modalImgRef.addEventListener("click", (e) => {
  if (e.x > window.visualViewport.width / 2) {
    nextPhoto();
  } else {
    prevPhoto();
  }
});
