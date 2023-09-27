function scrollBackground() {
  var scrollPos = window.scrollY;
  var content = document.querySelector(".Section1");
  content.style.backgroundPosition = "center " + -scrollPos / 2 + "px";
}