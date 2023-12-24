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
                ? `<li>
                ${
                  card.hasAForm
                    ? `<a href="javascript:void(0)" class="curved-btn call_form"><span>Sifariş et</span></a>`
                    : `<a href="${card.url}" class="curved-btn"><span>Sifariş et</span></a>`
                }
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
    const callForm = document.querySelectorAll(".call_form");
    callForm.forEach((callBtn) => {
      const form =
        callBtn.parentElement.parentElement.parentElement.parentElement
          .nextElementSibling;
      callBtn.addEventListener("click", () => {});
    });
    const ranges = document.querySelectorAll('.lc_item input[type="range"]');
    ranges.forEach((range) => {
      range.addEventListener("input", () => {
        range.style.setProperty("--val", range.value);

        range.previousElementSibling.previousElementSibling.value = range.value;
      });
    });
    
  } catch (error) {
    console.error("Error fetching or processing news:", error);
  }
}
getLoans();
