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
const modals = document.querySelector(".modals");
const modalItems = modals.querySelectorAll(".modal-item");
const modalClose = document.querySelector(".modal-close");
const container = document.querySelector(".card");
const image = document.querySelector(".card-img");
const rangeAmount = document.querySelector('.loan-amount input[type="range"]');
const rangeTerm = document.querySelector('.loan-term input[type="range"]');
const rangePercent = document.querySelector(
  '.loan-percent input[type="range"]'
);
const numberAmount = document.querySelector(
  '.loan-amount input[type="number"]'
);
const numberTerm = document.querySelector('.loan-term input[type="number"]');
const numberPercent = document.querySelector(
  '.loan-percent input[type="text"]'
);
const loanInputs = document.querySelectorAll(".loan-item input");
const rangeRatesSelectBox = document.querySelector(".change-rates .select-box");
const activeRate = document.querySelector(".active-rate");
const rates = document.querySelectorAll(".change-rates .select-box li a");
const selectCurrencyTo = document.querySelector('.s-currency[name="to"]');
const selectCurrencyFrom = document.querySelector('.s-currency[name="from"]');
const inputCurrency = document.querySelector(".selling-input");
const buyingPrice = document.querySelector(".c-buying");
const currencySelects = document.querySelectorAll(".c-line select");

selectCurrencyFrom.addEventListener("click", () => {
  const options = selectCurrencyTo.querySelectorAll("option");
  if (selectCurrencyFrom.value != "AZN") {
    options.forEach((option) => {
      if (option.value != "AZN") {
        option.style.display = "none";
      } else {
        option.style.display = "block";
      }
    });
    selectCurrencyTo.value = options[0].value;
  } else {
    options.forEach((option) => {
      if (option.value != "AZN") {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    });
    selectCurrencyTo.value = options[1].value;
  }
});

currencySelects.forEach((select) => {
  select.addEventListener("click",()=>{
    if (inputCurrency.value == "") {
      buyingPrice.textContent = "Alıram";
    } else {
      // renderCurrency()
    }
  });
});

inputCurrency.addEventListener("input", () => {
  if (inputCurrency.value == "") {
    buyingPrice.textContent = "Alıram";
  } else {
    // renderCurrency()
  }
});

function renderCurrency(){
  fetch(
    `https://v6.exchangerate-api.com/v6/c654eaf35c8dbe28cc5de6a4/latest/${selectCurrencyFrom.value}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      const times = parseFloat(inputCurrency.value);
      const currency = selectCurrencyTo.value;
      const conversionRate = data.conversion_rates[currency] * times;
      
      buyingPrice.textContent = `${conversionRate.toFixed(2)}`;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}



activeRate.addEventListener("click", () => {
  rangeRatesSelectBox.classList.add("open-select");
});

rates.forEach((rate) => {
  rate.addEventListener("click", (e) => {
    e.preventDefault();
    rangeRatesSelectBox.querySelector("li a.active").classList.remove("active");
    const itemsSell = document.querySelectorAll('.cr-item-sell')
    const itemsBuy = document.querySelectorAll('.cr-item-buy')
    rate.classList.add("active");
    activeRate.textContent = rate.textContent;
    if(rangeRatesSelectBox.querySelector("li a.active").textContent == 'Nağd'){
      itemsSell[0].textContent = '1.7000'
      itemsBuy[0].textContent = '1.6900'
    }else{
      itemsSell[0].textContent = '1.7020'
      itemsBuy[0].textContent = '1.6950'
    }
  });
});

function handleRangeInput(rangeInput) {
  rangeInput.style.setProperty("--val", rangeInput.value);

  rangeInput.previousElementSibling.previousElementSibling.value =
    rangeInput.value;
}

function handleNumberInput(numberInput) {
  numberInput.nextElementSibling.nextElementSibling.value = numberInput.value;
  numberInput.nextElementSibling.nextElementSibling.style.setProperty(
    "--val",
    numberInput.value
  );
}

rangeAmount.addEventListener("input", () => handleRangeInput(rangeAmount));
rangeTerm.addEventListener("input", () => handleRangeInput(rangeTerm));
rangePercent.addEventListener("input", () => handleRangeInput(rangePercent));

numberAmount.addEventListener("input", () => handleNumberInput(numberAmount));
numberTerm.addEventListener("input", () => handleNumberInput(numberTerm));
numberPercent.addEventListener("input", () => handleNumberInput(numberPercent));

loanInputs.forEach((input) => {
  input.addEventListener("input", () => {
    var percent = parseFloat(rangePercent.value);
    var period = parseFloat(rangeTerm.value);
    var amount = parseFloat(rangeAmount.value);
    const monthPay = document.querySelector(".month-pay");
    var p = percent / 12 / 100;
    var p1 = Math.pow(1 + p, period);
    var p2 = Math.pow(1 + p, period);
    var monthAmount = (amount * (p * p1)) / (p2 - 1);
    var fullAmount = monthAmount * period;
    var arrMonthAmount = parseFloat(monthAmount).toFixed(2).split(".");
    var arrfullAmount = parseFloat(fullAmount).toFixed(2).split(".");
    monthPay.innerHTML = `${Math.floor(monthAmount)}<span> AZN</span>`;
  });
});

let prevScrollY = window.scrollY;

window.addEventListener("resize", () => {
  if (window.innerWidth < 992) {
    centerImage();
  } else {
    image.style.left = "auto";
    image.style.top = "30px";
  }
});

function centerImage() {
  const containerWidth = container.offsetWidth;
  const offsetX = (containerWidth - 564) / 2;
  image.style.left = offsetX + "px";
}

modalClose.addEventListener("click", () => {
  modalItems.forEach((modalItem) => {
    if (modalItem.dataset.modal == "stories-modal") {
      modalItem.classList.remove("show");
    }
  });
  setTimeout(() => {
    modalItems.forEach((modalItem) => {
      if (!modalItem.classList.contains("show")) {
        modals.classList.remove("active");
      }
    });
  }, 200);
});

window.addEventListener("click", (e) => {
  if (e.target == modals || e.target.dataset.modal == "stories-modal") {
    modalClose.click();
  }
});

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
  if (e.target != rangeRatesSelectBox && e.target != activeRate) {
    rangeRatesSelectBox.classList.remove("open-select");
  }
});
