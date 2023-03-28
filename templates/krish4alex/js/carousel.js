const carousel = (mainCarousel) => {
  const track = mainCarousel.querySelector(".carousel-track");
  const slides = Array.from(track.children);

  // btns
  const prevBtn = mainCarousel.querySelector(".left-btn");
  const nextBtn = mainCarousel.querySelector(".right-btn");

  // dots
  const dotsNav = mainCarousel.querySelector(".carousel-nav");
  const dots = Array.from(dotsNav.children);

  const slideWidth = slides[0].getBoundingClientRect().width;

  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + "px";
  };

  slides.forEach(setSlidePosition);

  const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";
    currentSlide.classList.remove("show-slide");
    targetSlide.classList.add("show-slide");
  };

  const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("active");
    targetDot.classList.add("active");
  };

  const hideShowArrow = (slides, prevBtn, nextBtn, targetIndex) => {
    if (targetIndex === 0) {
      prevBtn.classList.add("hide-btn");
      nextBtn.classList.remove("hide-btn");
    } else if (targetIndex === slides.length - 1) {
      prevBtn.classList.remove("hide-btn");
      nextBtn.classList.add("hide-btn");
    } else {
      prevBtn.classList.remove("hide-btn");
      nextBtn.classList.remove("hide-btn");
    }
  };

  // click left
  prevBtn.addEventListener("click", (e) => {
    const currentSlide = track.querySelector(".show-slide");
    const prevSlide = currentSlide.previousElementSibling;

    moveToSlide(track, currentSlide, prevSlide);

    const currentDot = dotsNav.querySelector(".active");
    const prevDot = currentDot.previousElementSibling;
    updateDots(currentDot, prevDot);

    const prevIndex = slides.findIndex((slide) => slide === prevSlide);

    hideShowArrow(slides, prevBtn, nextBtn, prevIndex);
  });

  // click right
  nextBtn.addEventListener("click", (e) => {
    const currentSlide = track.querySelector(".show-slide");
    const nextSlide = currentSlide.nextElementSibling;

    moveToSlide(track, currentSlide, nextSlide);

    const currentDot = dotsNav.querySelector(".active");
    const nextDot = currentDot.nextElementSibling;
    updateDots(currentDot, nextDot);

    const nextIndex = slides.findIndex((slide) => slide === nextSlide);

    hideShowArrow(slides, prevBtn, nextBtn, nextIndex);
  });

  // dots update
  dotsNav.addEventListener("click", (e) => {
    const targetDot = e.target.closest("button");

    if (!targetDot) return;

    const currentSlide = track.querySelector(".show-slide");
    const currentDot = dotsNav.querySelector(".active");
    const targetIndex = dots.findIndex((dot) => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);

    updateDots(currentDot, targetDot);

    hideShowArrow(slides, prevBtn, nextBtn, targetIndex);
  });
};

const allCarousel = document.querySelectorAll(".carousel");

allCarousel.forEach((ele) => {
  carousel(ele);
});
