const f_container = document.querySelector("footer .container");
async function getText() {
  try {
    const res = await fetch("http://localhost:4000/foot_text");
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
getText();

const tiltedElement = document.querySelector(".js-tilt");
const shine = document.querySelector(".shine");

function handleMouseMove(event) {
  const boundingRect = tiltedElement.getBoundingClientRect();
  const mouseX = event.clientX - boundingRect.left - boundingRect.width / 2;
  const mouseY = event.clientY - boundingRect.top - boundingRect.height / 2;
  const percentage = (mouseY + 165) / 360;
  let oppacity = percentage * 0.5;
  const tiltX = (30 / boundingRect.width) * mouseX;
  const tiltY = (50 / boundingRect.height) * mouseY;

  tiltedElement.style.transform = `rotateX(${tiltY}deg) rotateY(${-tiltX}deg) scale3d(1.07,1.07,1.07)`;
  const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
  shine.style.backgroundImage = `linear-gradient(${
    angle - 90
  }deg, rgba(255, 255, 255, ${oppacity.toFixed(
    3
  )}) 0%, rgba(255, 255, 255, 0) 80%)`;
  console.log();
}

tiltedElement.addEventListener("mousemove", handleMouseMove);
tiltedElement.addEventListener("mouseleave", () => {
  tiltedElement.style.transform = "rotateX(0) rotateY(0) scale3d(1,1,1)";
  shine.style.backgroundImage = `linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 60%)`;
});
