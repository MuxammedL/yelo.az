const cashbackItems = document.querySelector(".cashback_items");
const cashback_select_cat = document.querySelector("#cashback_select_cat");
const searchCategorys = document.querySelectorAll(".popular li a");
const cashbackMore = document.querySelector(".cashback_more");
const cashbackSearch = document.querySelector(".cashback_search");

async function getCashbacks() {
  try {
    const res = await fetch("http://localhost:4000/cashback");
    const data = await res.json();
    let cat_arr = [];
    data.forEach((card) => {
      cat_arr.push({ category: card.category, value: card.value });
    });

    function getCards(data, isIncrement) {
      let count = 31;

      let initialCount = 0,
        dataLength;
      dataLength = data.length;
      if (dataLength <= count) {
        count = dataLength;
        cashbackMore.classList.add("hide");
      } else {
        cashbackMore.classList.remove("hide");
      }
      function renderCards(card, isIncrement) {
        if (!isIncrement) {
          cashbackItems.innerHTML = "";
        }
        if (card.length == 0) {
          let item = `<h4 style="text-align:center;font-size:20px;">Axtarışa uyğun nəticə tapılmadı</h4>
                         `;

          cashbackItems.insertAdjacentHTML("beforeend", item);
        }

        for (let i = initialCount; i < count; i++) {
          let item = `<div class="cashback_item">
                     <div
                       class="cb_image"
                       style="background-image: url(${card[i].img})"
                     ></div>
                     <div class="cb_desc">
                       <b>${card[i].name}</b>
                       <p>${card[i].category}</p>
                       <div class="discount">${card[i].discount}<span>%</span></div>
                     </div>
                   </div>
                         `;

          cashbackItems.insertAdjacentHTML("beforeend", item);
        }
      }
      renderCards(data, isIncrement);
      cashbackMore.addEventListener("click", () => {
        initialCount = count;
        if (count + 31 > dataLength) {
          count = count + dataLength - count;
          cashbackMore.classList.add("hide");
        } else {
          count += 31;
        }
        renderCards(data, true);
      });
    }
    getCards(data, true);
    let newArray = data;
    cashback_select_cat.addEventListener("change", () => {
      const selectedValue = cashback_select_cat.value;
      const searchCategory = document.querySelector(".popular li a.active");
      searchCategory && searchCategory.classList.remove("active");
      if (selectedValue == "") {
        newArray = data;
      } else {
        newArray = data.filter((item) => {
          return item.value === selectedValue;
        });
      }
      if (!cashbackSearch.value == "") {
        const term = cashbackSearch.value;
        const arr = newArray.filter((item) => {
          return (
            item.category.toLowerCase().includes(term.toLowerCase()) ||
            item.name.toLowerCase().includes(term.toLowerCase())
          );
        });
        getCards(arr, false);
      } else {
        getCards(newArray, false);
      }
    });
    searchCategorys.forEach((category) => {
      category.addEventListener("click", () => {
        category.parentElement.parentElement.querySelector(".active") &&
          category.parentElement.parentElement
            .querySelector(".active")
            .classList.remove("active");
        category.classList.add("active");
        cashback_select_cat.value = category.dataset.cat;
        newArray = data.filter((item) => {
          return item.value === category.dataset.cat;
        });
        getCards(newArray, false);
      });
    });
    cashbackSearch.addEventListener("input", (e) => {
      const term = e.target.value;
      const newData = newArray.filter((item) => {
        return (
          item.category.toLowerCase().includes(term.toLowerCase()) ||
          item.name.toLowerCase().includes(term.toLowerCase())
        );
      });
      getCards(newData, false);
    });
    cat_arr.sort((a, b) => {
      return a.category.localeCompare(b.category, "az", {
        sensitivity: "base",
      });
    });
    function removeDuplicates(array, property) {
      const uniqueValues = new Set();
      const uniqueArray = array.filter((item) => {
        if (!uniqueValues.has(item[property])) {
          uniqueValues.add(item[property]);
          return true;
        }
        return false;
      });

      return uniqueArray;
    }

    let uniqueArray = removeDuplicates(cat_arr, "category");
    uniqueArray.forEach((item) => {
      let option = `<option value="${item.value}">${item.category}</option>`;
      cashback_select_cat.insertAdjacentHTML("beforeend", option);
    });
  } catch (error) {
    console.error("Error fetching or processing news:", error);
  }
}
getCashbacks();
