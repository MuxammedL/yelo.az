const cards = document.querySelector(".cards");
const f_container = document.querySelector("footer .container");

async function getText() {
  try {
    const res = await fetch("http://localhost:4000/deposits_text");
    const data = await res.json();
    let isClicked = false;
    const text = data.text.slice(0, 750);
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
getText();
async function getLoans() {
  try {
    const res = await fetch("http://localhost:4000/deposits");
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
                <li>
                    <a href="${card.url}" class="curved-btn"><span>Əmanət sifariş et</span></a>
                </li>
                <li>
                  <a href="#" class="more-details">
                    <span>Daha ətraflı</span>
                    <img src="../public/images/bl_arr_bttn.svg" alt="bl_arr_bttn" />
                  </a>
                </li>
              </ul>
            </div>
            <div
                class="loan_c_image"
                style="
                  background-image: url(${card.img});
                "
              ></div>
          </div>

        `;
      cards.insertAdjacentHTML("beforeend", li);
    });
  } catch (error) {
    console.error("Error fetching or processing news:", error);
  }
}
getLoans();
