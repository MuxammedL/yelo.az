const cards = document.querySelector(".cards");
async function getLoans() {
  try {
    const res = await fetch("http://localhost:4000/laons");
    const data = await res.json();
    data.forEach((card, index) => {
      let li = `
        <div class="card loan" style="background-image: url(../public/images/yelo_block.svg)">
          <div class="c_about">
            <div class="c_title">${card.name}</div>
            <div class="c_desc">${card.description}</div>
            <div class="c_spec">
              <div class="c_item">
                <p>${card.spec_title_1}</p>
                <b>${card.spec_title_1_desc}</b>
              </div>
              <div class="c_item">
                <p>${card.spec_title_2}</p>
                <b>${card.spec_title_2_desc}</b>
              </div>
              <div class="c_item">
                <p>${card.spec_title_3}</p>
                <b>${card.spec_title_3_desc}</b>
              </div>
            </div>
            <ul>
            ${
              card.isOrder
                ? `
                <li>
                    <a href="${card.url}" class="curved-btn ${card.form_class}"><span>Sifariş et</span></a>
                </li>`
                : ""
            }
              <li>
                <a href="#" class="more-details">
                  <span>Daha ətraflı</span>
                  <img src="../public/images/bl_arr_bttn.svg" alt="bl_arr_bttn" />
                </a>
              </li>
            </ul>
          </div>
          ${
            card.isTheCard
              ? `<div class="c_image">
              <div class="c_image_inner js-tilt">
                <img src="${card.img}" />
                <div class="shine"></div>
              </div>
            </div>`
              : `<div
              class="loan_c_image"
              style="
                background-image: url(${card.img});
              "
            ></div>`
          }
          
        </div>
        ${
          card.hasAForm
            ? `<div class="hidden_form" style="margin:30px auto;"></div>`
            : ""
        }
        
      `;
      cards.insertAdjacentHTML("beforeend", li);
    });
    const shortForm = `<form id="get_loan_form" class="consumption">
    <div class="f_inner">
      <div class="form_calc">
        <div class="lc_inputs">
          <div class="lc_salary lc_item">
            <p>Aylıq əməkhaqqı</p>
            <input
              name="salary"
              type="number"
              value="2500"
              class="range_salary range_result"
            />
            <div class="lc_c">AZN</div>
            <input
              type="range"
              min="350"
              max="5000"
              step="50"
              value="2500"
              style="--min: 350; --max: 5000; --val: 2500"
              class="range"
            />
          </div>
          <div class="lc_amount lc_item">
            <p>Kredit məbləği</p>
            <input
              name="credit"
              type="number"
              value="15000"
              class="range_credit range_result"
            />
            <div class="lc_c">AZN</div>
            <input
              type="range"
              min="400"
              max="50100"
              step="100"
              value="10000"
              style="--min: 400; --max: 50100; --val: 10000"
              class="range range_smart"
            />
            <span
              class="smart_plus"
              style="
                position: absolute;
                left: 85px;
                font-family: 'm';
                font-size: 26px;
                line-height: 26px;
                display: none;
              "
              >+</span
            >
          </div>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <input
            name="name"
            type="text"
            class="check_name check_i"
            placeholder="Ad"
          />
          <div class="form_error">Doldurulması vacibdir</div>
        </div>
        <div class="form_item">
          <input
            name="surname"
            type="text"
            class="check_name check_i"
            placeholder="Soyad"
          />
          <div class="form_error">Doldurulması vacibdir</div>
        </div>
      </div>

      <div class="form_line">
        <div class="form_item">
          <input
            name="work"
            type="text"
            class="check_work check_i"
            placeholder="İş yeri "
          />
          <div class="form_error">Doldurulması vacibdir</div>
        </div>
        <div class="form_item">
          <input
            type="text"
            name="phone"
            placeholder="Mobil nömrə"
            class="check_phone check_i"
          />
          <div class="form_error">Doldurulması vacibdir</div>
        </div>
      </div>
      <div class="f_bottom">
        <div class="info_text">
          <p
            style="
              background-image: url(../public/images/shield_gray_icon.svg);
            "
          >
            “Sifariş et” basmaqla Azərbaycan Kredit Bürosundan kredit
            tarixçəsi və Asan finansdan fərdi məlumatların alınmasına
            razılıq verirəm.
          </p>
        </div>
        <button class="yelo-btn s_form" type="submit">
          Sifariş et
        </button>
      </div>
    </div>
  </form>`;
    const longForm = `<form id="get_loan_form" class="consumption mortgage_form">
    <div class="f_inner">
      <div class="form_line">
        <div class="form_item">
          <select
            name="mortgage_type"
            style="background-image: url(../public/images/select.svg)"
            class="mortgage_type"
          >
            <option value="standart">Adi</option>
            <option value="pro">Güzəştli</option>
          </select>
        </div>
        <div class="form_item">
          <select
            name="specify"
            style="background-image: url(../public/images/select.svg)"
            class="loan_type"
          >
            <option value="standart">Zəmanətsiz</option>
            <option value="pro">Zəmanətli</option>
          </select>
        </div>
      </div>
      <div class="form_calc">
        <div class="lc_inputs">
          <div class="lc_salary lc_item">
            <p>Mənzilin dəyəri</p>
            <input
              name="home_price"
              type="number"
              value="250000"
              class="range_result"
            />
            <div class="lc_c">AZN</div>
            <input
              type="range"
              min="10000"
              max="500000"
              step="50"
              value="250000"
              style="--min: 10000; --max: 500000; --val: 250000"
              class="range rangeAmount"
            />
          </div>
          <div class="lc_amount lc_item">
            <p>İlkin ödəniş</p>
            <input
              name="first_price"
              type="number"
              data-percent="15"
              value="37500"
              class="range_result numberFirstPay"
            />
            <div class="lc_c">AZN</div>
            <input
              type="range"
              min="25000"
              max="250000"
              step="50"
              value="37500"
              style="--min: 25000; --max: 250000; --val: 37500"
              class="range rangeFirstPay"
            />
          </div>
          <div class="lc_term lc_item">
            <p>Müddət</p>
            <input
              name="month"
              type="number"
              data-max="300"
              value="150"
              class="range_result"
            />
            <div class="lc_c">Ay</div>
            <input
              type="range"
              min="6"
              max="300"
              step="1"
              value="150"
              style="--min: 6; --max: 300; --val: 150"
              class="range rangeTerm"
            />
          </div>
        </div>

        <div class="lc_self">
          <div class="lc_item">
            <p>Yekun məbləğ</p>
            <b id="my_year_pay">115 </b>
          </div>
          <div class="lc_item">
            <p>Aylıq ödəniş</p>
            <b id="my_month_pay">522 </b>
          </div>
          <div class="lc_item">
            <p>Illik Faiz</p>
            <b id="my_percent">8% </b>
          </div>
        </div>
      </div>

      <div class="form_group">
        <div class="form_item">
          <input type="text" class="check_name check_i" placeholder="Ad" />
          <div class="form_error">Doldurulması vacibdir</div>
        </div>
        <div class="form_item">
          <input type="text" class="check_name check_i" placeholder="Soyad" />
          <div class="form_error">Doldurulması vacibdir</div>
        </div>
      </div>
      <div class="form_line">
        <div class="form_item">
          <input
            type="text"
            placeholder="İş yeri"
            name="workPlace"
            class="check_i"
          />
          <div class="form_error">Doldurulması vacibdir</div>
        </div>
        <div class="form_item">
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Mobil nömrə"
              class="check_phone check_i"
            />
            <div class="form_error">Doldurulması vacibdir</div>
          </div>
        </div>
      </div>
      <div class="f_bottom">
        <div class="info_text">
          <p
            style="
              background-image: url(../public/images/shield_gray_icon.svg);
            "
          >
            Biz məlumatlarınızın təhlükəsizliyinə və təhlükəsizliyinə
            zəmanət veririk
          </p>
        </div>
        <button class="yelo-btn" type="submit">Next step</button>
      </div>
    </div>
  </form>`;

    const tiltedElements = document.querySelectorAll(".js-tilt");
    function tiltCards() {
      if (window.innerWidth > 991) {
        tiltedElements.forEach((tiltedElement) => {
          tiltedElement.addEventListener("mousemove", (event) => {
            const boundingRect = tiltedElement.getBoundingClientRect();
            const mouseX =
              event.clientX - boundingRect.left - boundingRect.width / 2;
            const mouseY =
              event.clientY - boundingRect.top - boundingRect.height / 2;
            const percentage = (mouseY + 165) / 360;
            let oppacity = percentage * 0.5;
            const tiltX = (30 / boundingRect.width) * mouseX;
            const tiltY = (50 / boundingRect.height) * mouseY;

            tiltedElement.style.transform = `rotateX(${tiltY}deg) rotateY(${-tiltX}deg) scale3d(1.07,1.07,1.07)`;
            const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
            tiltedElement.lastElementChild.style.backgroundImage = `linear-gradient(${
              angle - 90
            }deg, rgba(255, 255, 255, ${oppacity.toFixed(
              3
            )}) 0%, rgba(255, 255, 255, 0) 80%)`;
          });
          tiltedElement.addEventListener("mouseleave", () => {
            tiltedElement.style.transform =
              "rotateX(0) rotateY(0) scale3d(1,1,1)";
            tiltedElement.lastElementChild.style.backgroundImage = `linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 60%)`;
          });
        });
      }
    }
    window.addEventListener("resize", tiltCards);
    tiltCards();
    const callShortForm = document.querySelectorAll(".call_short_form");
    const callLongForm = document.querySelectorAll(".call_long_form");
    callLongForm.forEach((callBtn) => {
      let isClicked = false;
      const form =
        callBtn.parentElement.parentElement.parentElement.parentElement
          .nextElementSibling;
      callBtn.addEventListener("click", () => {
        isClicked = !isClicked;
        callShortForm.forEach((form) => {
          form.parentElement.parentElement.parentElement.parentElement.nextElementSibling.innerHTML =
            "";
        });
        callLongForm.forEach((form) => {
          form.parentElement.parentElement.parentElement.parentElement.nextElementSibling.innerHTML =
            "";
        });
        if (isClicked) {
          form.innerHTML = longForm;
          runInputCodes();
        } else {
          form.innerHTML = "";
        }
      });
    });
    callShortForm.forEach((callBtn) => {
      let isClicked = false;
      const form =
        callBtn.parentElement.parentElement.parentElement.parentElement
          .nextElementSibling;
      callBtn.addEventListener("click", () => {
        isClicked = !isClicked;
        callShortForm.forEach((form) => {
          form.parentElement.parentElement.parentElement.parentElement.nextElementSibling.innerHTML =
            "";
        });
        callLongForm.forEach((form) => {
          form.parentElement.parentElement.parentElement.parentElement.nextElementSibling.innerHTML =
            "";
        });
        if (isClicked) {
          form.innerHTML = shortForm;
          runInputCodes();
        } else {
          form.innerHTML = "";
        }
      });
    });
    runInputCodes();
    function runInputCodes() {
      const ranges = document.querySelectorAll('.lc_item input[type="range"]');
      const numberTerms = document.querySelectorAll(
        '.lc_item input[type="number"]'
      );
      ranges.forEach((range) => {
        range.addEventListener("input", () => {
          range.style.setProperty("--val", range.value);

          range.previousElementSibling.previousElementSibling.value =
            range.value;

          mortgageForm && clacMortgage();
        });
      });
      numberTerms.forEach((term) => {
        term.addEventListener("input", () => {
          term.nextElementSibling.nextElementSibling.value = term.value;
          term.nextElementSibling.nextElementSibling.style.setProperty(
            "--val",
            term.value
          );
          mortgageForm && clacMortgage();
        });
      });
      const mortgageForm = document.querySelector(".mortgage_form");
      const checkPhones = document.querySelectorAll(".check_phone");
      const checkNames = document.querySelectorAll(".check_name");
      const checkInputs = document.querySelectorAll(".check_i");
      const submitForm = document.querySelector("#get_loan_form");
      const mortgageType = document.querySelector(".mortgage_type");
      const myPercent = document.querySelector("#my_percent");
      const rangeTerm = document.querySelector(
        ".mortgage_form .lc_item .rangeTerm"
      );
      const rangeAmount = document.querySelector(
        ".mortgage_form .lc_item .rangeAmount"
      );
      const rangeFirstPay = document.querySelector(".rangeFirstPay");
      const numberFirstPay = document.querySelector(".numberFirstPay");
      let rangePercent = 8;
      if (mortgageForm) {
        rangeAmount.addEventListener("input", () => {
          rangeFirstPay.setAttribute("min", Math.round(rangeAmount.value / 10));
          rangeFirstPay.setAttribute("max", rangeAmount.value);
          rangeFirstPay.value = rangeAmount.value / 2;
          numberFirstPay.value = rangeAmount.value / 2;
          rangeFirstPay.style.setProperty("--val", rangeAmount.value / 2);
          rangeFirstPay.style.setProperty(
            "--min",
            Math.round(rangeAmount.value / 10)
          );
          rangeFirstPay.style.setProperty("--max", rangeAmount.value);
        });
        mortgageType.addEventListener("change", () => {
          if (mortgageType.value == "standart") {
            myPercent.innerHTML = "8%";
            rangePercent = 8;
          } else {
            myPercent.innerHTML = "4%";
            rangePercent = 4;
          }
          clacMortgage();
        });
        function clacMortgage() {
          var percent = parseFloat(rangePercent);
          var period = parseFloat(rangeTerm.value);
          var amount = parseFloat(rangeAmount.value - rangeFirstPay.value);
          const monthPay = document.querySelector("#my_month_pay");
          const myFullAmount = document.querySelector("#my_year_pay");
          var p = percent / 12 / 100;
          var p1 = Math.pow(1 + p, period);
          var p2 = Math.pow(1 + p, period);
          var monthAmount = (amount * (p * p1)) / (p2 - 1);
          var fullAmount = monthAmount * period;
          var arrMonthAmount = parseFloat(monthAmount).toFixed(2).split(".");
          var arrfullAmount = parseFloat(fullAmount).toFixed(2).split(".");
          monthPay.innerHTML = `${Math.floor(monthAmount)}<span> AZN</span>`;
          myFullAmount.innerHTML = `${Math.floor(fullAmount)}<span> AZN</span>`;
        }
        clacMortgage();
      }

      submitForm &&
        submitForm.addEventListener("submit", (e) => {
          e.preventDefault();
          checkInputs &&
            checkInputs.forEach((input) => {
              if (
                !input.value ||
                (input.classList.contains("check_phone") &&
                  input.value.length < 14)
              ) {
                input.nextElementSibling.classList.add("show");
              } else {
                input.nextElementSibling.classList.remove("show");
              }
            });
          let isValid = true;
          checkInputs.forEach((input) => {
            if (input.nextElementSibling.classList.contains("show")) {
              isValid = false;
              return;
            } 
          });
          if(isValid){
            window.location.href = "success.html";;
          }
        });
      function validatePhoneNumber(inputValue) {
        const phoneRegex = /^\+994\d{2} \d{3} \d{2} \d{2}$/;
        return phoneRegex.test(inputValue);
      }
      checkPhones &&
        checkPhones.forEach((checkPhone) => {
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
        });
      checkNames &&
        checkNames.forEach((checkName) => {
          checkName.addEventListener("input", () => {
            checkName.value = checkName.value.replace(/[^a-zA-Z]/g, "");
          });
        });
    }
  } catch (error) {
    console.error("Error fetching or processing news:", error);
  }
}
getLoans();
