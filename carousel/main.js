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

  // ======== Dragging start ========
  let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    currentIndex = 0;

  slides.forEach((slide, index) => {
    // touch events
    slide.addEventListener("touchstart", touchStart(index));
    slide.addEventListener("touchmove", touchMove);
    slide.addEventListener("touchend", touchEnd);
  });

  function touchStart(index) {
    return function (event) {
      currentIndex = index;
      startPos = getPositionX(event);
      isDragging = true;
      animationID = requestAnimationFrame(animation);
    };
  }

  // ==========================
  function getPositionX(event) {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  }
  function animation() {
    if (isDragging) requestAnimationFrame(animation);
  }
  function setSliderPosition() {
    track.style.transform = `translateX(${currentTranslate}px)`;
  }
  // ==============================

  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  }
  function touchEnd() {
    isDragging = false;
  }
  // ======== Dragging stop ========

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

// window.oncontextmenu = function (event) {
//   event.preventDefault();
//   event.stopPropagation();
//   return false;
// };
