import "https://unpkg.com/typed.js@2.0.132/dist/typed.umd.js";

const toggleBtn = document.querySelector(".navbar-toggler"),
    navbarNav = document.querySelector(".navbar-collapse");

toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("change"),navbarNav.classList.toggle("show")
})

let typed = new Typed(".auto-type", {
    strings: ['Bootstrap web developer', 'in psd to html', 'in wordpress'],
    typeSpeed: 100,
    loop: true,
})