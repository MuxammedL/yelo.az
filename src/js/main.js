const closeBtnPromotion = document.querySelector(".close-btn");
const mobileTop = document.querySelector(".mobile-top");
const header = document.querySelector('header');
const selectBox = document.querySelector('.select-box')
const selectedLang = document.querySelector('.selected-lang')
const languages = selectBox.querySelectorAll('li')
const searchBtn = document.querySelector('.search-btn')
const closeSearchBtn = document.querySelector('.close-btn-search')
const searchSection = document.querySelector('.search-section')
const menuToggle = document.querySelector('.menu-toggle')
const body = document.querySelector('body')
const headerAdditions = document.querySelector('.header-additions')
const navbar = document.querySelector('.navbar')
const bgColor = document.querySelector('.bg-color')





window.addEventListener('scroll',()=>{
  if(window.scrollY>10){
    header.classList.add('fix-head')
  }else{
    header.classList.remove('fix-head')
  }
})

menuToggle.addEventListener('click',()=>{
  menuToggle.classList.toggle('open-adds')
  body.classList.toggle('o-hidden')
  headerAdditions.classList.toggle('show')
  navbar.classList.toggle('hide')
  bgColor.classList.toggle('show')
})

searchBtn.addEventListener('click',()=>{
  searchSection.classList.add('show')
})
closeSearchBtn.addEventListener('click',()=>{
  searchSection.classList.remove('show')
})


window.addEventListener('resize',()=>{
  if(window.innerWidth>768){
    if (sessionStorage.getItem("status") != "hide") {
      mobileTop.classList.add("show");
      header.style.paddingTop = '120px'
    }
  }
})

closeBtnPromotion.addEventListener("click", () => {
  mobileTop.style.height = "0px";
  header.style.paddingTop = '0px'
  sessionStorage.setItem("status", "hide");
});

selectedLang.addEventListener('click',(e)=>{
  selectBox.classList.add('open-select')
})

languages.forEach(lang=>{
  lang.addEventListener('click',()=>{
    selectBox.querySelector('li a.active').classList.remove('active');
    lang.firstElementChild.classList.add('active')
    selectedLang.textContent = lang.firstElementChild.textContent;
  })
})

window.addEventListener('click',(e)=>{
  if(e.target != selectBox&&e.target != selectedLang){
    selectBox.classList.remove('open-select')
  }
})