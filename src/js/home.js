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

window.addEventListener("click", (e) => {
  if (e.target != rangeRatesSelectBox && e.target != activeRate) {
    rangeRatesSelectBox.classList.remove("open-select");
  }
});

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