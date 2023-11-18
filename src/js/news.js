const newsListTotal = document.querySelector(".news-list-total");

async function getNews(){
    const res =  await fetch("http://localhost:3000/NEWS")
    const data = await res.json()
    data.forEach((element) => {
      let date = new Date(element.date);
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
                      <a href="#">
                        <div class="news-desc">
                          <b>${element.title}</b>
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
                        <li style="background-image: url(images/trash-can-solid.svg);">Delete</li>
                        <li style="background-image: url(images/pen-to-square-regular.svg);">Edit</li>
                      </ul>
                    </div>
                      </a>
                    </div>
                </li>
        `;
      newsListTotal.insertAdjacentHTML("beforeend", li);
    });
    const showBtns = document.querySelectorAll('.dropdown button')
    showBtns.forEach(showBtn=>{
        showBtn.addEventListener('click',()=>{
            document.querySelector('.menu.show') && document.querySelector('.menu.show').classList.remove('show')
            showBtn.nextElementSibling.classList.add('show')
        })
    })

    window.addEventListener('click',(e)=>{
        if(e.target !=showBtns ){
            document.querySelector('.menu.show') && document.querySelector('.menu.show').classList.remove('show')
        }
    },true)
}
getNews()
