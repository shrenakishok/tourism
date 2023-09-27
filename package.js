//back to top function
let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
      scrollProgress.style.display = "grid";
    } else {
      scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
      document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#23395B ${scrollValue}%, #7D98A1 ${scrollValue}%)`;
  };
  window.onscroll = calcScrollValue;
  window.onload = calcScrollValue;

//package description viewing function
let prevContainer = document.querySelector('.preview');
let viewContainer = document.querySelectorAll('.view');

document.querySelectorAll('.package-container .box').forEach(box =>{
    box.onclick = () =>{
        prevContainer.style.display = 'flex';
        let name = box.getAttribute('data-name');
        viewContainer.forEach(view =>{
            let target = view.getAttribute('data-targets');
            if(name == target){
                view.classList.add('active');
            }
        });
    };
});

viewContainer.forEach(close =>{
 close.querySelector('.fa').onclick = () =>{
    close.classList.remove('active');
    prevContainer.style.display = 'none';
 };
});
