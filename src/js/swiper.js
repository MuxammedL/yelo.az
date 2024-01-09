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
  const item = document.querySelector(".modals .swiper-slide-active");
  if(item){
    const holder0 = document.querySelector(".index-0");
    const label = item.dataset.index;
    switch (+label) {
      case 1:
        holder0.style.animation = `fillBar 10.2s linear infinite`;
        break;
      case 2:
        const holder1 = document.querySelector(".index-1");
        holder1.style.animation = `fillBar 10.2s linear infinite`;
        break;
      case 3:
        const holder2 = document.querySelector(".index-2");
        holder2.style.animation = `fillBar 10.2s linear infinite`;
        break;
    }
  }
}
var swiper = new Swiper(".storiesSwiper", {
  cssMode: true,
  loop:true,
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
  thumbs: {
    swiper: swiperStories,
  },
  on: fillBars(),
});

swiper.on("slideChange", () => {
  const holders = document.querySelectorAll(".bar .holder");
  const item = document.querySelector(".modals .swiper-slide-active");
  holders.forEach((hold) => {
    hold.style.width = "0";
    hold.style.animation = ``;
  });
  fillBars()
});

const stories = document.querySelectorAll(".story a");

stories.forEach((story) => {
  story.addEventListener("click", () => {
    const slideNumber = +story.dataset.slide;
    
    const handleCommonActions = (slideLabel) => {
      modals.classList.add('active');
      setTimeout(() => {
        modalItems.forEach((modalItem) => {
          if (modalItem.dataset.modal === "stories-modal") {
            modalItem.classList.add('show');
          }
        });
      }, 200);
    };
    switch (slideNumber) {
      case 1:
        handleCommonActions('Go to slide 1');
        break;
      case 2:
        handleCommonActions('Go to slide 2');
        break;
      case 3:
        handleCommonActions('Go to slide 3');
        break;
    }
  });
});



