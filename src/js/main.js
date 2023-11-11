const closeBtnPromotion = document.querySelector(".close-btn");
const mobileTop = document.querySelector(".mobile-top");
const header = document.querySelector("header");
const selectBox = document.querySelector(".select-box");
const selectedLang = document.querySelector(".selected-lang");
const languages = selectBox.querySelectorAll("li");
const searchBtn = document.querySelector(".search-btn");
const closeSearchBtn = document.querySelector(".close-btn-search");
const searchSection = document.querySelector(".search-section");
const menuToggle = document.querySelector(".menu-toggle");
const body = document.querySelector("body");
const headerAdditions = document.querySelector(".header-additions");
const navbar = document.querySelector(".navbar");
const bgColor = document.querySelector(".bg-color");
const main = document.querySelector("main");
const modals = document.querySelector('.modals')
const modalItems = modals.querySelectorAll('.modal-item')
const modalClose = document.querySelector('.modal-close')
const container = document.querySelector('.card')
const image = document.querySelector('.card-img')
let prevScrollY = window.scrollY;

window.addEventListener('resize', centerImage);

centerImage();

function centerImage() {
  const containerWidth = container.offsetWidth;
  const offsetX = (containerWidth - 564)/2;
  image.style.left = offsetX + 'px';
}

modalClose.addEventListener('click', () => {
  modalItems.forEach((modalItem) => {
    if (modalItem.dataset.modal == "stories-modal") {
      modalItem.classList.remove('show');
    }
  });
  setTimeout(() => {
    modalItems.forEach((modalItem) => {
      if (!modalItem.classList.contains('show')) {
        modals.classList.remove('active');
      }
    });
  }, 200);
});

window.addEventListener('click',(e)=>{
  if(e.target==modals||e.target.dataset.modal=="stories-modal"){
    modalClose.click()
  }
})


window.addEventListener("scroll", () => {
  let currentScrollY = window.scrollY;
  if (currentScrollY > prevScrollY && currentScrollY > 10) {
    header.classList.add("fix-head");
  } else {
    header.classList.remove("fix-head");
  }
  if (window.scrollY > 10) {
    header.classList.add("add-bg");
  } else {
    header.classList.remove("add-bg");
  }
  prevScrollY = currentScrollY;
});

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open-adds");
  body.classList.toggle("o-hidden");
  headerAdditions.classList.toggle("show");
  navbar.classList.toggle("hide");
  bgColor.classList.toggle("show");
});

searchBtn.addEventListener("click", () => {
  searchSection.classList.add("show");
});
closeSearchBtn.addEventListener("click", () => {
  searchSection.classList.remove("show");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    if (sessionStorage.getItem("status") != "hide") {
      mobileTop.classList.add("show");
      header.style.paddingTop = "120px";
      main.style.paddingTop = "120px";
    }
  } else {
    mobileTop.classList.remove("show");
    header.style.paddingTop = "0px";
    main.style.paddingTop = "0px";
  }
});

if (sessionStorage.getItem("status") != "hide") {
  mobileTop.classList.add("show");
  header.style.paddingTop = "120px";
  main.style.paddingTop = "120px";
}

closeBtnPromotion.addEventListener("click", () => {
  mobileTop.classList.remove("show");
  header.style.paddingTop = "0px";
  main.style.paddingTop = "0px";
  sessionStorage.setItem("status", "hide");
});

selectedLang.addEventListener("click", (e) => {
  selectBox.classList.add("open-select");
});

languages.forEach((lang) => {
  lang.addEventListener("click", () => {
    selectBox.querySelector("li a.active").classList.remove("active");
    lang.firstElementChild.classList.add("active");
    selectedLang.textContent = lang.firstElementChild.textContent;
  });
});

window.addEventListener("click", (e) => {
  if (e.target != selectBox && e.target != selectedLang) {
    selectBox.classList.remove("open-select");
  }
});
