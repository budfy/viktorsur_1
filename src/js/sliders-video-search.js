'use strict';

window.videoSlidersReload = function () {

    if (window.matchMedia('(max-width: 767px)').matches) {

        var cards = document.querySelectorAll('[data-video="cards"]');

        if (cards.length === 0)
            return;

        cards.forEach(function (card) {

            var slider = card.querySelector('[data-video="slider"]');
            var dots   = card.querySelector('[data-video="dots"]');

            let owl = $(slider);

            owl.ready(function () {

                owl.owlCarousel({
                    items: 1,
                    nav: false,
                    dots: true,
                    dotsData: true,
                    dotsContainer: dots,
                    loop: false,
                    stagePadding: 0
                });

            });

            // $('.video-page__dot').click(function(){
            //     $('.slider-8-1').trigger('to.owl.carousel', [$(this).index(), 300]);
            // });

        });

    }

}

videoSlidersReload();