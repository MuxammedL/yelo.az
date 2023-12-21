const f_container = document.querySelector("footer .container");
async function getText() {
  try {
    const res = await fetch("http://localhost:4000/foot_text");
    const data = await res.json();
    let isClicked=false;
    const text =  data.text.slice(0,768)
    const more = `<a class="more" href="javascript:void(0);">Daha çox</a>`
    function renderText(){
        if(!isClicked){
            f_container.insertAdjacentHTML("afterbegin", `${text}...${more}`);
        }else{
            f_container.firstElementChild.remove()
            f_container.insertAdjacentHTML("afterbegin", data.text);
        }
    }
    renderText()
    const addMore =  document.querySelector('.more')
    addMore.addEventListener('click',()=>{
        isClicked=true
        renderText()
    })
  } catch (error) {
    console.error("Error fetching or processing news:", error);
  }
}
getText();
