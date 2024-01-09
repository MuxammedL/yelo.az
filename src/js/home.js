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
const rateBtn = document.querySelector(".active-rate");
const rates = document.querySelectorAll(".change-rates .select-box li a");
const selectCurrencyTo = document.querySelector('.s-currency[name="to"]');
const selectCurrencyFrom = document.querySelector('.s-currency[name="from"]');
const inputCurrency = document.querySelector(".selling-input");
const buyingPrice = document.querySelector(".c-buying");
const currencySelects = document.querySelectorAll(".c-line select");
const sectionConent = document.querySelector(".lastest-news .section-content");
let activeRate = 1,
  cash_buy,
  buy,
  cash_sell,
  sell;
rates.forEach((rate) => {
  rate.addEventListener("click", (e) => {
    e.preventDefault();
    rangeRatesSelectBox.querySelector("li a.active").classList.remove("active");
    const itemsSell = document.querySelectorAll(".cr-item-sell");
    const itemsBuy = document.querySelectorAll(".cr-item-buy");
    rate.classList.add("active");
    rateBtn.textContent = rate.textContent;
    activeRate = rangeRatesSelectBox.querySelector("li a.active").dataset.cash;
    if (
      rangeRatesSelectBox.querySelector("li a.active").textContent == "Nağd"
    ) {
      itemsSell[0].textContent = `${cash_sell}`;
      itemsBuy[0].textContent = `${cash_buy}`;
    } else {
      itemsSell[0].textContent = `${sell}`;
      itemsBuy[0].textContent = `${cash_sell}`;
    }
    if (!inputCurrency.value.length == 0) {
      getValute();
    }
  });
});
async function getNews() {
  try {
    const res = await fetch("http://localhost:4000/NEWS");
    const data = await res.json();
    for (let i = data.length - 1; i >= data.length - 3; i--) {
      let date = new Date(data[i].date);
      months = [
        "Yanvar",
        "Fevral",
        "Mart",
        "Aprel",
        "May",
        "İyun",
        "İyul",
        "Avqust",
        "Sentyabr",
        "Oktyabr",
        "Noyabr",
        "Dekabr",
      ];
      let month = months[date.getMonth()];
      let day = date.getDate();
      let year = date.getFullYear();
      let li = ` 
            <div class="col">
              <div class="col-content">
                <a href="#">
                  <div class="news-desc">
                    <b>${data[i].title}</b>
                    <div class="news-foot">
                      <span class="arr-btn"> Daha ətraflı </span>
                      <time>${day} ${month} ${year}</time>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          `;
      sectionConent.insertAdjacentHTML("beforeend", li);
    }
  } catch (error) {
    console.error("Error fetching or processing news:", error);
  }
}

getNews();

selectCurrencyFrom.addEventListener("change", () => {
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
  select.addEventListener("change", () => {
    if (inputCurrency.value == "") {
      buyingPrice.textContent = "Alıram";
    } else {
      getValute();
    }
  });
});

inputCurrency.addEventListener("input", () => {
  if (inputCurrency.value == "") {
    buyingPrice.textContent = "Alıram";
  } else {
    getValute();
  }
});

async function getValute() {
  try {
    const res = await fetch("http://localhost:4000/valute");
    const data = await res.json();
    cash_buy = data.bank.USD.cash_buy;
    buy = data.bank.USD.buy;
    cash_sell = data.bank.USD.cash_sell;
    sell = data.bank.USD.sell;
    switch (selectCurrencyFrom.value) {
      case "AZN":
        switch (selectCurrencyTo.value) {
          case "USD":
            calculate(
              1 /
                (activeRate == 1
                  ? +data.bank.USD.cash_sell
                  : +data.bank.USD.sell)
            );
            break;
          case "EUR":
            calculate(
              1 /
                (activeRate == 1
                  ? +data.bank.EUR.cash_sell
                  : +data.bank.EUR.sell)
            );
            break;
        }
        break;
      case "USD":
        calculate(
          activeRate == 1 ? +data.bank.USD.cash_buy : +data.bank.USD.buy
        );
        break;
      case "EUR":
        calculate(
          activeRate == 1 ? +data.bank.EUR.cash_buy : +data.bank.EUR.buy
        );
        break;
    }
    function calculate(value) {
      const times = parseFloat(inputCurrency.value);
      const conversionRate = value * times;
      buyingPrice.textContent = `${conversionRate.toFixed(2)}`;
    }
  } catch (error) {
    console.error("Error fetching or processing news:", error);
  }
}

rateBtn.addEventListener("click", () => {
  rangeRatesSelectBox.classList.add("open-select");
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
  if (e.target != rangeRatesSelectBox && e.target != rateBtn) {
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

if (window.innerWidth < 992) {
  centerImage();
}
function centerImage() {
  const containerWidth = container.offsetWidth;
  const offsetX = (containerWidth - 564) / 2;
  image.style.left = offsetX + "px";
}
