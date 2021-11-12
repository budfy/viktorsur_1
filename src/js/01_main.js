const eventsTopSlider = new Swiper('.events-page__cards .swiper', {
  loop: true,
  spaceBetween: 30,
  pagination: {
    el: '.events-page__cards .swiper-pagination',
    clickable: true
  },
});

const eventsКуігдеSlider = new Swiper('.events-search-slider .swiper', {
  loop: true,
  spaceBetween: 30,
  pagination: {
    el: '.events-search-slider .swiper-pagination',
    clickable: true
  },
  breakpoints: {
    768: {
      slidesPerView: 2
    }
  }
});