const exchangeRates = document.querySelectorAll(".filter_exchange ul li a");
const selectCurrencyTo = document.querySelector('.e_curr[name="to"]');
const selectCurrencyFrom = document.querySelector('.e_curr[name="from"]');
const inputCurrency = document.querySelector(".i_sell");
const buyingPrice = document.querySelector(".i_result");
const currencySelects = document.querySelectorAll(".r_line select");
const changeSide = document.querySelector(".change_sides");
const f_container = document.querySelector("footer .container");
const table = document.querySelector(".e_tables .e_tables_inner table tbody");
let activeRate = 1;

async function getValute() {
  try {
    const res = await fetch("http://localhost:4000/valute");
    const data = await res.json();

    switch (selectCurrencyFrom.value) {
      case "AZN":
        switch (selectCurrencyTo.value) {
          case "USD":
            calculate(
              1 /
                (activeRate == 1 ? +data.bank.USD.cash_sell : +data.bank.USD.sell)
            );
            break;
          case "EUR":
            calculate(
              1 /
                (activeRate == 1 ? +data.bank.EUR.cash_sell : +data.bank.EUR.sell)
            );
            break;
          case "RUB":
            calculate(
              1 /
                (activeRate == 1 ? +data.bank.RUB.cash_sell : +data.bank.RUB.sell)
            );
            break;
          case "GBP":
            calculate(
              1 /
                (activeRate == 1 ? +data.bank.GBP.cash_sell : +data.bank.GBP.sell)
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
      case "RUB":
        calculate(
          activeRate == 1 ? +data.bank.RUB.cash_buy : +data.bank.RUB.buy
        );
        break;
      case "GBP":
        calculate(
          activeRate == 1 ? +data.bank.GBP.cash_buy : +data.bank.GBP.buy
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

async function getValuteTable() {
  const res = await fetch("http://localhost:4000/valute");
  const data = await res.json();

  const bankKeys = Object.keys(data.bank);
  const values = Object.values(data.bank);
  const mbValues = Object.values(data.mb);
  const iterableObject = {
    values,
    [Symbol.iterator]: function () {
      let index = 0;
      const values = this.values;

      return {
        next: function () {
          return {
            value: values[index++],
            done: index > values.length,
          };
        },
      };
    },
  };
  let i = 0;
  table.innerHTML = "";
  for (let item of iterableObject) {
    const tr = `<tr>
      <td>
        <div class="td_item">
          <div class="td_item_inner">${bankKeys[i]}</div>
        </div>
      </td>
      <td>
        <div class="td_item">
          <div class="td_item_inner">${
            activeRate == 1 ? item.cash_buy : item.buy
          }</div>
        </div>
      </td>
      <td>
        <div class="td_item">
          <div class="td_item_inner">${
            activeRate == 1 ? item.cash_sell : item.sell
          }</div>
        </div>
      </td>
      <td>
        <div class="td_item">
          <div class="td_item_inner">${mbValues[i].buy}</div>
        </div>
      </td>
    </tr>`;
    table.insertAdjacentHTML("beforeend", tr);
    i++;
  }
}

async function getText() {
  try {
    const res = await fetch("http://localhost:4000/valute_text");
    const data = await res.json();
    let isClicked = false;
    const text = data.text.slice(0, 766);
    const more = `<a class="more" href="javascript:void(0);">Daha çox</a>`;
    function renderText() {
      if (!isClicked) {
        f_container.insertAdjacentHTML("afterbegin", `${text}...${more}`);
      } else {
        f_container.firstElementChild.remove();
        f_container.insertAdjacentHTML("afterbegin", data.text);
      }
    }
    renderText();
    const addMore = document.querySelector(".more");
    addMore.addEventListener("click", () => {
      isClicked = true;
      renderText();
    });
  } catch (error) {
    console.error("Error fetching or processing news:", error);
  }
}

function changeRate() {
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
  if (!inputCurrency.value.length == 0) {
    getValute();
  }
}

getValuteTable();

getText();

exchangeRates.forEach((rate) => {
  rate.addEventListener("click", () => {
    document
      .querySelector(".filter_exchange ul li a.active")
      .classList.remove("active");
    rate.classList.add("active");
    activeRate = document.querySelector(".filter_exchange ul li a.active")
      .dataset.cash;
    if (!inputCurrency.value.length == 0) {
      getValute();
    }
    getValuteTable();
  });
});

changeSide.addEventListener("click", () => {
  let value = selectCurrencyFrom.value;
  selectCurrencyFrom.value = selectCurrencyTo.value;
  changeRate();
  selectCurrencyTo.value = value;
});

selectCurrencyFrom.addEventListener("change", () => {
  changeRate();
});

currencySelects.forEach((select) => {
  select.addEventListener("change", () => {
    if (inputCurrency.value.length == 0) {
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
