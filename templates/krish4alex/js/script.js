const navToggleBtn = document.querySelector(".navbar-toggler");
const navbarNav = document.querySelector(".navbar-collapse");

navToggleBtn.addEventListener("click", () => {
  navToggleBtn.classList.toggle("change");
  navbarNav.classList.toggle("show");
});

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((element) => {
  element.addEventListener("click", function () {
    navLink.forEach((nav) => nav.classList.remove("active"));

    this.classList.add("active");
  });
});

const section = document.querySelectorAll("section");

function activeMenu() {
  let len = section.length;
  while (--len && window.scrollY + 97 < section[len].offsetTop) {}
  navLink.forEach((ele) => ele.classList.remove("active"));
  navLink[len].classList.add("active");
}
activeMenu();

const navbar = document.querySelector("nav.navbar");
window.addEventListener("scroll", function () {
  activeMenu();
  navbar.classList.toggle("sticky", window.scrollY > 50);
});
