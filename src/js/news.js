const newsListTotal = document.querySelector(".news-list-total");
const moreNews = document.getElementById("more-news");
const textArea = document.querySelector("textarea");
const loader = document.querySelector(".loader");
const addNews = document.querySelector(".add-news");
const newsModal = document.querySelector(".news-modal");
const closeBtn = document.querySelector(".close-button");
const addBtn = document.querySelector(".add-button");
const form = document.querySelector("#addNewsForm");
let count = 15;
let initialCount = 0,
  dataLength;
let isUpdate = false,
  updatedId;
async function getNews() {
  try {
    const res = await fetch("http://localhost:3000/NEWS");
    const data = await res.json();
    dataLength = data.length;
    for (let i = dataLength - initialCount - 1; i >= dataLength - count; i--) {
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
                  <li>
                      <div class="news-item">
                        <a href="javascript:void(0)" >
                          <div class="news-desc">
                            <b>${data[i].title}</b>
                            <div class="news-foot">
                              <span class="arr-btn"> Daha ətraflı </span>
                              <time>${day} ${month} ${year}</time>
                            </div>
                          </div>
                          <div class="dropdown">
                        <button
                          class="toggle"
                          type="button"
                          style="background-image: url(images/ellipsis-vertical-solid.svg)"
                        ></button>
                        <ul class="menu">
                          <li class="delete" style="background-image: url(images/trash-can-solid.svg);" data-id="${data[i].id}">Delete</li>
                          <li class="edit" style="background-image: url(images/pen-to-square-regular.svg);" data-id="${data[i].id}">Edit</li>
                        </ul>
                      </div>
                        </a>
                      </div>
                  </li>
          `;
      newsListTotal.insertAdjacentHTML("beforeend", li);
    }
    const deleteBtns = document.querySelectorAll(".delete");
    const editBtns = document.querySelectorAll(".edit");

    deleteBtns.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(
            `http://localhost:3000/NEWS/${deleteBtn.dataset.id}`,
            {
              method: "DELETE",
            }
          );
        } catch (error) {
          console.error("Error deleting news:", error);
        }
        getNews();
      });
    });

    editBtns.forEach((editBtn) => {
      editBtn.addEventListener("click", (event) => {
        event.preventDefault();
        newsModal.classList.add("show");
        body.classList.add("o-hidden");
        newsModal.style.top = window.scrollY + "px";
        let text =
          editBtn.parentElement.parentElement.previousElementSibling.children[0]
            .textContent;
        textArea.value = text;
        updatedId = editBtn.dataset.id;
        isUpdate = true;
      });
    });

    loader.classList.add("hide");
    const showBtns = document.querySelectorAll(".dropdown button");
    showBtns.forEach((showBtn) => {
      showBtn.addEventListener("click", () => {
        const menuToShow = showBtn.nextElementSibling;
        const currentlyShownMenu = document.querySelector(".menu.show");

        currentlyShownMenu?.classList.remove("show");

        if (menuToShow !== currentlyShownMenu) {
          menuToShow.classList.add("show");
        } else {
          menuToShow.classList.remove("show");
        }
      });
    });

    window.addEventListener(
      "click",
      (e) => {
        if (
          !(
            e.target.classList.contains("toggle") ||
            e.target.classList.contains("edit") ||
            e.target.classList.contains("delete")
          )
        ) {
          document.querySelector(".menu.show") &&
            document.querySelector(".menu.show").classList.remove("show");
        }
      },
      true
    );
  } catch (error) {
    console.error("Error fetching or processing news:", error);
  }
}

getNews();

moreNews.addEventListener("click", () => {
  initialCount = count;
  console.log(initialCount);
  console.log(count);
  count += 15;
  if (count < dataLength) {
    loader.classList.remove("hide");
    getNews();
  } else if (count - dataLength >= 0 && initialCount < dataLength) {
    count = count + (dataLength % 15);
    getNews();
  }
  console.log(count);
});

textArea.addEventListener("input", (e) => {
  textArea.style.height = `auto`;
  textArea.style.height = `${e.target.scrollHeight}px`;
});

addNews.addEventListener("click", () => {
  textArea.value=''
  newsModal.classList.add("show");
  body.classList.add("o-hidden");
  newsModal.style.top = window.scrollY + "px";
});

closeBtn.addEventListener("click", () => {
  newsModal.classList.remove("show");
  body.classList.remove("o-hidden");
  newsModal.style.top = "0px";
  isUpdate = false;
});

addNewsForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let isNotNull = false;
  if (!isUpdate) {
    const formData = {};
    if (!textArea.value == "") {
      formData[textArea.name] = textArea.value;
      const currentDate = new Date();
      const isoDate = currentDate.toISOString();
      formData.date = isoDate;
      isNotNull = true;
    } else {
      textArea.style.borderColor = "red";
    }
    if (isNotNull) {
      fetch("http://localhost:3000/NEWS", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });
      setInterval(() => {
        getNews();
      }, 1000);
      addNews.classList.remove("show");
      body.classList.remove("o-hidden");
      newsModal.style.top = "0px";
    }
  } else {
    let data;
    if (!textArea.value == "") {
      data ={
        title:`${textArea.value}`
      }
      isNotNull = true;
    } else {
      textArea.style.borderColor = "red";
    }
    if (isNotNull) {
      fetch(`http://localhost:3000/NEWS/${updatedId}`, {
        method: "PACTH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      });
      setInterval(() => {
        getNews();
      }, 1000);
      addNews.classList.remove("show");
      body.classList.remove("o-hidden");
      newsModal.style.top = "0px";
    }
  }
  isUpdate = false;
});
