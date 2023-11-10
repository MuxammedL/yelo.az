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
}); //1.15 375 350 1.08

function calculateSlidesPerView() {
  if (window.innerWidth < 375) {
    return 1;
  } else if (window.innerWidth < 480) {
    return 1.15;
  } else if (window.innerWidth < 768) {
    return 1.4;
  } else if (window.innerWidth < 992) {
    return 2.4;
  } else if (window.innerWidth < 1200) {
    return 2.85;
  } else if (window.innerWidth < 1400) {
    return 2.95;
  } else {
    return 2.9;
  }
}

var swiperStories = new Swiper(".stories", {
  slidesPerView: calculateSlidesPerView(),
});

window.addEventListener("resize", () => {
  var swiperStories = new Swiper(".stories", {
    slidesPerView: calculateSlidesPerView(),
  });
});
