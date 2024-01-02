const selects = document.querySelectorAll(".input label select");
const inputs = document.querySelectorAll(".input label input");
const checkPhone = document.querySelector(".mask_phone");
const checkNames = document.querySelectorAll(".mask_letter");
const notSymbols = document.querySelector(".not_symbols");
const textInput = document.getElementById("textInput");
const paymentMethod = document.querySelector(".payment_method");
const closeBtn = document.querySelector(".close");
const openFinModalBtn = document.querySelector(".hint");
const finModal = document.querySelector(".fin_modal");
const darkness = document.querySelector(".darkness");
const acquisition_form = document.querySelector(".acquisition_form");
const deliveryInputs = document.querySelectorAll(".delivery");
const branchInputs = document.querySelectorAll(".branch");

acquisition_form.addEventListener("change", () => {
  function addClass(elements) {
    elements.forEach((input) => {
      input.classList.add("show");
    });
  }
  function removeClass(elements) {
    elements.forEach((input) => {
      input.classList.remove("show");
    });
  }
  if (acquisition_form.value == "delivery") {
    addClass(deliveryInputs);
    removeClass(branchInputs);
  } else if (acquisition_form.value == "branch") {
    removeClass(deliveryInputs);
    addClass(branchInputs);
  } else {
    removeClass(deliveryInputs);
    removeClass(branchInputs);
  }
});

openFinModalBtn.addEventListener("click", () => {
  finModal.classList.add("show");
  darkness.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  finModal.classList.remove("show");
  darkness.classList.remove("show");
});

paymentMethod.addEventListener("change", () => {
  const element = document.querySelector(".payment_method_text").parentElement;
  if (paymentMethod.value == "postpayment") {
    element.classList.add("show");
  } else {
    element.classList.remove("show");
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
      checkPhone.nextElementSibling.classList.add("show");
    } else {
      checkPhone.classList.remove("alert");
      checkPhone.nextElementSibling.classList.remove("show");
    }
  }
});

checkNames.forEach((checkName) => {
  checkName.addEventListener("input", () => {
    checkName.value = checkName.value.replace(/[^a-zA-Z]/g, "");
  });
});

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
