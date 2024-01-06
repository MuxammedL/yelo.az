let selects = document.querySelectorAll(".input label select");
let inputs = document.querySelectorAll(".input label input");
const checkPhone = document.querySelector(".mask_phone");
const checkNames = document.querySelectorAll(".mask_letter");
const notSymbols = document.querySelector(".not_symbols");
const textInput = document.getElementById("textInput");
const paymentMethod = document.querySelector(".payment_method");
const closeBtn = document.querySelector(".close");
const openFinModalBtn = document.querySelector(".hint");
const finModal = document.querySelector(".fin_modal");
const darkness = document.querySelector(".darkness");
const acquisition_method = document.querySelector(".acquisition_method");
const deliveryInputs = document.querySelectorAll(".delivery");
const branchInputs = document.querySelectorAll(".branch");
const cardOrderForm = document.querySelector("#cardOrderForm");
const oneCheck = document.querySelector(".one_check input");
const faqList = document.querySelectorAll(".faq_list article");
const slideButtons = document.querySelectorAll(".pagination_btns div");
const slider = document.querySelector(".services");
const servicesModal = document.querySelector(".services_modal");
const serviceModalItems = document.querySelectorAll(".service_modal_item");
const services = document.querySelectorAll(".services .service");
const serviceModalPaginations = document.querySelectorAll(".c_right ul li a");
const serviceModalCloseBtn = document.querySelector(".close_m");
const toFormBtn = document.querySelector(".to_form");


toFormBtn.addEventListener("click", () => {
  const element = document.querySelector(".form_container");
  const elementPosition = element.getBoundingClientRect().top + window.scrollY - 100;
  console.log(elementPosition)
  window.scrollTo({
    top: elementPosition,
    behavior: "smooth",
  });
});

serviceModalCloseBtn.addEventListener("click", () => {
  setTimeout(() => {
    servicesModal.classList.remove("active");
  }, 100);
  servicesModal.classList.remove("show");
  darkness.classList.remove("show");
  document.querySelector("body").classList.remove("o-hidden");
});

services.forEach((service) => {
  service.addEventListener("click", (e) => {
    e.stopPropagation();
    servicesModal.classList.add("active");
    document.querySelector("body").classList.add("o-hidden");
    setTimeout(() => {
      servicesModal.classList.add("show");
      darkness.classList.add("show");
    }, 100);
    serviceModalItems.forEach((item) => {
      if (item.dataset.serviceId == service.dataset.serviceId) {
        document
          .querySelector(".service_modal_item.active")
          .classList.remove("active");
        item.classList.add("active");
      }
    });
    serviceModalPaginations.forEach((pagination) => {
      if (service.dataset.serviceId == pagination.dataset.serviceId) {
        document
          .querySelector(".c_right ul li a.active")
          .classList.remove("active");
        pagination.classList.add("active");
      }
    });
  });
});

serviceModalPaginations.forEach((pagination) => {
  pagination.addEventListener("click", () => {
    document
      .querySelector(".c_right ul li a.active")
      .classList.remove("active");
    pagination.classList.add("active");
    serviceModalItems.forEach((item) => {
      if (item.dataset.serviceId == pagination.dataset.serviceId) {
        document
          .querySelector(".service_modal_item.active")
          .classList.remove("active");
        item.classList.add("active");
      }
    });
  });
});

slideButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const first_one = document.querySelector(".first_one");
    const direction = button.dataset.direction === "prev" ? -1 : 1;
    const scrollAmount =
      (first_one.clientWidth == 0
        ? 15
        : first_one.clientWidth < 300
        ? first_one.clientWidth + 15
        : first_one.clientWidth) * direction;
    slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
});

slider.addEventListener("scroll", () => {
  const first_one = document.querySelector(".first_one");
  if (slider.scrollLeft > 0) {
    first_one.classList.remove("first_one");
    slider.lastElementChild.classList.add("first_one");
  } else {
    first_one.classList.remove("first_one");
    slider.firstElementChild.classList.add("first_one");
  }
  let maxScrollLeft = slider.scrollWidth - slider.clientWidth - 10;
  slideButtons[0].style.opacity = slider.scrollLeft <= 0 ? "0" : "1";
  slideButtons[0].style.visibility =
    slider.scrollLeft <= 0 ? "hidden" : "visible";
  slideButtons[1].style.visibility =
    slider.scrollLeft >= maxScrollLeft ? "hidden" : "visible";
  slideButtons[1].style.opacity =
    slider.scrollLeft >= maxScrollLeft ? "0" : "1";
});

let isDraging = false,
  startX,
  startScrollLeft;

const dragStrat = (e) => {
  isDraging = true;
  startX = e.pageX;
  startScrollLeft = slider.scrollLeft;
};

const draging = (e) => {
  const width = slider.lastElementChild.clientWidth;
  const first_one = document.querySelector(".first_one");
  if (!isDraging) {
    return;
  }
  let left = startScrollLeft - (e.pageX - startX);
  let direction = e.pageX - startX > 0 ? -1 : 1;
  slider.scrollBy({
    left:
      first_one.clientWidth < 300
        ? direction * (width * Math.ceil(e.pageX / width / 3) + 242)
        : direction * width * Math.ceil(e.pageX / width / 3),
    behavior: "smooth",
  });
};
const dragEnd = () => {
  isDraging = false;
};
slider.addEventListener("mousedown", dragStrat);
slider.addEventListener("mousemove", draging);
slider.addEventListener("mouseup", dragEnd);

faqList.forEach((item) => {
  item.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    if (document.querySelector(".faq_list article.active")) {
      document.querySelector("article.active .list_item_inner").style.height =
        "0px";
      document
        .querySelector(".faq_list article.active")
        .classList.remove("active");
    }

    if (!isActive) {
      item.classList.add("active");
      item.querySelector(".list_item_inner").style.height = `${
        item.querySelector(".list_item_inner").scrollHeight + 20
      }px`;
    }
  });
});

cardOrderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;
  selects.forEach((select) => {
    if (select.value == "") {
      select.classList.add("alert");
      isValid = false;
    } else {
      select.classList.remove("alert");
    }
  });
  inputs.forEach((input) => {
    if (input.value == "") {
      input.classList.add("alert");
      isValid = false;
    } else {
      input.classList.remove("alert");
    }
  });

  if (!oneCheck.checked) {
    oneCheck.nextElementSibling.nextElementSibling.classList.add("invalid");
    isValid = false;
  } else {
    oneCheck.nextElementSibling.nextElementSibling.classList.remove("invalid");
  }

  if (isValid) {
    const formData = {};
    for (const input of cardOrderForm.elements) {
      if (
        (input.tagName === "INPUT" || input.tagName === "SELECT") &&
        input.type !== "submit" &&
        input.type !== "checkbox"
      ) {
        if (input.type == "radio") {
          if (input.checked) {
            formData[input.name] = input.value;
          }
        } else {
          formData[input.name] = input.value;
        }
      }
    }
    fetch("http://localhost:4000/cardOrderers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formData),
    });
    console.log("Done");
  }
});

acquisition_method.addEventListener("change", () => {
  const branch = `<div class="input">
    <label
      ><select name="branch">
        <option
          value=""
          disabled="disabled"
          selected="selected"
        ></option>
        <option value="34">Masallı filialı</option>
        <option value="33">Tovuz filialı</option>
        <option value="3">28 may filialı</option>
        <option value="32">Xaçmaz filialı</option>
        <option value="36">Qəbələ filialı</option>
        <option value="4">Sumqayıt filialı</option>
        <option value="6">Baş ofis</option>
        <option value="10">Gəncə filialı</option>
        <option value="11">Xalqlar Dostluğu</option>
        <option value="12">Bərdə filialı</option>
        <option value="13">Lənkəran filialı</option>
        <option value="15">Sahil filialı</option>
        <option value="20">Mərkəz filialı</option>
        <option value="22">Nərimanov filialı</option>
        <option value="23">Elmlər Akademiyası filialı</option>
        <option value="28">Sədərək TM filialı</option>
        <option value="29">Mərdəkan filialı</option>
        <option value="30">Salyan filialı</option>
        <option value="31">Ağcabədi filialı</option>
      </select>
      <span>Filial</span></label
    >
  </div>`;
  const delivery = `<div class="input">
  <label
    ><select name="city">
      <option
        value=""
        disabled="disabled"
        selected="selected"
      ></option>
      <option value="Baki">Bakı</option>
    </select>
    <span>Şəhəri seçin</span></label
  >
</div>
<div class="input">
  <label
    ><input type="text" class="" name="delivery_address" />
    <span>Çatdırılma ünvanı</span></label
  >
</div>`;
  const conditionalInputs = document.querySelector(
    ".conditional_inputs_second"
  );
  function addInputs(element) {
    conditionalInputs.innerHTML = element;
  }
  function removeInputs() {
    conditionalInputs.innerHTML = null;
  }
  if (acquisition_method.value == "delivery") {
    removeInputs();
    addInputs(delivery);
  } else {
    removeInputs();
    addInputs(branch);
  }
  selects = document.querySelectorAll(".input label select");
  inputs = document.querySelectorAll(".input label input");
  checkValid();
});

openFinModalBtn.addEventListener("click", () => {
  finModal.classList.add("show");
  darkness.classList.add("show");
  document.querySelector("body").classList.add("o-hidden");
});

closeBtn.addEventListener("click", () => {
  finModal.classList.remove("show");
  darkness.classList.remove("show");
  document.querySelector("body").classList.remove("o-hidden");
});

paymentMethod.addEventListener("change", () => {
  const radioBtns = `<div class="form_items">
  <div class="form_item">
    <label class="radio_new">
      <input type="radio" name="duration" checked value="1 illik / 10₼" />
      <span>1 illik / 10₼</span>
    </label>
  </div>
  <div class="form_item">
    <label class="radio_new">
      <input type="radio" name="duration" value="3 illik / 15₼" />
      <span>3 illik / 15₼</span>
    </label>
  </div>
</div>`;
  const payment_method_text = `<div class="payment_method_text">
<p>
  300 AZN mədaxil edildikdə 3 illik kartı pulsuz təqdim
  edirik. Kartı əldə etdikdən sonra vəsaiti dərhal istifadə
  etmək mümkündür.
</p>
</div>`;
  const conditionalInputs = document.querySelector(".conditional_inputs_first");
  function addInputs(element) {
    conditionalInputs.innerHTML = element;
  }
  function removeInputs() {
    conditionalInputs.innerHTML = null;
  }

  if (paymentMethod.value == "postpayment") {
    removeInputs();
    addInputs(payment_method_text);
  } else {
    removeInputs();
    addInputs(radioBtns);
  }
});

notSymbols.addEventListener("input", () => {
  const inputValue = notSymbols.value;
  const cleanedValue = inputValue.replace(/[^\w\s]/gi, "");
  notSymbols.value = cleanedValue;
});

function validatePhoneNumber(inputValue) {
  const phoneRegex = /^\+994\d{2} \d{3} \d{2} \d{2}$/;
  return phoneRegex.test(inputValue);
}

checkPhone.addEventListener("focus", () => {
  const isValid = validatePhoneNumber(checkPhone.value);
  if (!isValid) {
    checkPhone.classList.add("alert");
    checkPhone.nextElementSibling.classList.add("show");
  } else {
    checkPhone.classList.remove("alert");
    checkPhone.nextElementSibling.classList.remove("show");
  }
  if (!checkPhone.value.startsWith("+994")) {
    checkPhone.value = "+994";
  }
});

checkPhone.addEventListener("input", function (event) {
  let input = event.target;
  let inputValue = input.value;
  if (inputValue.indexOf("+") !== inputValue.lastIndexOf("+")) {
    inputValue = inputValue.slice(0, -1);
  }
  if (!checkPhone.value.startsWith("+994")) {
    checkPhone.value = "+994";
  } else {
    let cleaned = inputValue.replace(/[^\d+]/g, "");

    if (cleaned.length > 13) {
      cleaned = cleaned.slice(0, 13);
    }
    let formatted = "";
    for (let i = 0; i < cleaned.length; i++) {
      if (i === 6 || i === 9 || i === 11) {
        formatted += " " + cleaned[i];
      } else {
        formatted += cleaned[i];
      }
    }

    input.value = formatted.trim();
    const isValid = validatePhoneNumber(input.value);
    if (!isValid) {
      checkPhone.classList.add("alert");
    } else {
      checkPhone.classList.remove("alert");
    }
  }
});

checkNames.forEach((checkName) => {
  checkName.addEventListener("input", () => {
    checkName.value = checkName.value.replace(/[^a-zA-Z]/g, "");
  });
});

checkValid();

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.classList.add("valid");
  });
  input.addEventListener("blur", () => {
    if (input.value == "") {
      input.classList.remove("valid");
    }
  });
});

selects.forEach((select) => {
  select.addEventListener("focus", () => {
    select.classList.add("valid");
  });
  select.addEventListener("blur", () => {
    if (select.value == "") {
      select.classList.remove("valid");
    }
  });
});

function checkValid() {
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.classList.add("valid");
    });
    input.addEventListener("blur", () => {
      if (input.value == "") {
        input.classList.remove("valid");
      }
    });
  });

  selects.forEach((select) => {
    select.addEventListener("focus", () => {
      select.classList.add("valid");
    });
    select.addEventListener("blur", () => {
      if (select.value == "") {
        select.classList.remove("valid");
      }
    });
  });
}
