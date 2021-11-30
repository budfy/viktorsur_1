const eventsTopSlider = new Swiper('.events-page__cards .swiper', {
  loop: true,
  spaceBetween: 30,
  pagination: {
    el: '.events-page__cards .swiper-pagination',
    clickable: true
  },
});

const eventsResultSlider = new Swiper('.events-search-slider .swiper', {
  // loop: true,
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

function createRequestUrl() {
  const requestPageUrl = document.querySelector('[data-ajax-url]').dataset.ajaxUrl;
  let searchText = document.querySelector('[data-filter-input="search"]').value || '';
  let startDate = document.querySelector('[data-filter-input="time_start"]').value.split(' ')[0];
  let endDate = document.querySelector('[data-filter-input="time_end"]').value.split(' ')[0];
  let tagsString = '';
  document.querySelectorAll('[data-filter-switch]').forEach(el => {
    if (el.dataset.filterSwitch === 'true') {
      tagsString += `tags=${el.value}&`;
    }
  });

  return `${requestPageUrl}?timeStart=${startDate}&timeEnd=${endDate}&search=${searchText}&${tagsString}&is_ajax=Y`
};

let getSlides = async function () {
  let url = createRequestUrl();
  // console.log(url);
  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"
      },
      mode: 'no-cors'
    });
    let data = await response;
    responseData = data.text();
    return responseData;
  } catch (error) {
    console.error(error)
  }
};

function drawSlider() {
  getSlides().then(
    response => {
      const responseContainer = document.createElement('div');
      const slider = document.querySelector('.data-video-container .swiper-wrapper');
      const upcoming = document.querySelector('#upcoming>span');
      const past = document.querySelector('#past>span');
      responseContainer.classList.add('response');
      responseContainer.style.display = 'none';
      document.querySelector('body').appendChild(responseContainer);
      responseContainer.innerHTML = response.replace(/\s\s+/g, '');

      upcoming.innerText = responseContainer.querySelector('[value="upcoming"]>span').innerText;
      past.innerText = responseContainer.querySelector('[value="past"]>span').innerText;
      slider.innerHTML = responseContainer.querySelector('.swiper-wrapper').innerHTML;
      eventsResultSlider.update();

      document.querySelector('.response').remove();
    }
  )
}

function tagButtonsSwitcher() {
  const btns = document.querySelectorAll('[data-filter-switch]');
  btns.forEach(el => {
    el.addEventListener('click', toggle);
  });

  function toggle() {
    this.dataset.filterSwitch = this.dataset.filterSwitch === "true" ? "false" : "true";
  }
  drawSlider();
};
tagButtonsSwitcher();

function searchOnInput() {
  const inputs = document.querySelectorAll('[data-filter-input]');
  inputs.forEach(el => el.addEventListener('change', drawSlider));
  document.querySelector('.video-page__search-block form[data-video-filter]').addEventListener('submit', (e) => {
    e.preventDefault();
    drawSlider();
  });
};

searchOnInput();