var entranceSwiper = new Swiper(".entranceSwiper", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiperStories = new Swiper(".stories", {
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    375: {
      slidesPerView: 1.15,
    },
    425: {
      slidesPerView: 1.3,
    },
    480: {
      slidesPerView: 1.5,
    },
    576: {
      slidesPerView: 1.8,
    },
    768: {
      slidesPerView: 2.4,
    },
    1024: {
      slidesPerView: 2.65,
    },
    1200: {
      slidesPerView: 2.85,
    },
    1400: {
      slidesPerView: 2.9,
    },
  },
});

function fillBars() {
  const item = document.querySelector(".swiper-slide-active");
  const holder0 = document.querySelector(".index-0");
  const label = item.getAttribute("aria-label");
  switch (label) {
    case "1 / 4":
      holder0.style.animation = `fillBar 10.2s linear infinite`;
      break;
    case "3 / 3":
      holder0.style.animation = `fillBar 10.2s linear infinite`;
      break;
    case '1 / 3':
      const holder1 = document.querySelector(".index-1");
      holder1.style.animation = `fillBar 10.2s linear infinite`;
      break;
    case '2 / 3':
      const holder2 = document.querySelector(".index-2");
      holder2.style.animation = `fillBar 10.2s linear infinite`;
      break;
  }
}
var swiper = new Swiper(".storiesSwiper", {
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-stories-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: fillBars(),
});

swiper.on("slideChange", () => {
  const holders = document.querySelectorAll(".bar .holder");
  const item = document.querySelector(".swiper-slide-active");
  holders.forEach((hold) => {
    hold.style.width = "0";
    hold.style.animation = ``;
  });
  fillBars();
});
