const f_container = document.querySelector("footer .container");
const cards = document.querySelector(".cards");

async function getText() {
  try {
    const res = await fetch("http://localhost:4000/cards_text");
    const data = await res.json();
    let isClicked = false;
    const text = data.text.slice(0, 768);
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
async function getCards() {
  try {
    const res = await fetch("http://localhost:4000/cards");
    const data = await res.json();
    data.forEach((card) => {
    let li = `
      <div class="card" style="background-image: url(../public/images/yelo_block.svg)">
        <div class="c_about">
          <div class="c_title">${card.name}</div>
          <div class="c_desc">${card.description}</div>
          <div class="c_spec">
            <div class="c_item">
              <p>Müddət</p>
              <b>${card.period}</b>
            </div>
            <div class="c_item">
              <p>Valyuta</p>
              <b>${card.currency}</b>
            </div>
            <div class="c_item">
              <p>${card.type}</p>
              <b>${card.typeText}</b>
            </div>
          </div>
          <ul>
            <li>
              <a href="${card.url}" class="curved-btn"><span>Sifariş et</span></a>
            </li>
            <li>
              <a href="${card.url}" class="more-details">
                <span>Daha ətraflı</span>
                <img src="../public/images/bl_arr_bttn.svg" alt="bl_arr_bttn" />
              </a>
            </li>
          </ul>
        </div>
        <div class="c_image">
          <div class="c_image_inner js-tilt">
            <img src="${card.img}" />
            <div class="shine"></div>
          </div>
        </div>
      </div>
    `;
      cards.insertAdjacentHTML("beforeend", li);
    });
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
  } catch (error) {
    console.error("Error fetching or processing news:", error);
  }
}
getCards();
getText();


