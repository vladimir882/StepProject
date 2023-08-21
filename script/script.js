document.addEventListener('DOMContentLoaded', function () {
    const tabLink = document.querySelectorAll('.our-service__nav-text');
    const tabItem = document.querySelectorAll('.our-service__info-card');
    const icon = document.querySelectorAll('.icon');

    for (let i = 1; i < icon.length; i++) {
        icon[i].style.display = 'none';
    }

    for (let i = 1; i < tabItem.length; i++) {
        tabItem[i].style.display = 'none';
    }

    tabLink.forEach(link => {
        link.addEventListener('click', () => {
            const tab = link.dataset.tab;

            tabItem.forEach(item => item.style.display = 'none');

            const selectedTabItem = document.getElementById(tab);
            selectedTabItem.style.display = 'flex';

            tabLink.forEach(link => link.classList.remove('active'));
            link.classList.add('active');

            tabLink.forEach(item => {
                const icon = item.querySelector('.icon');
                if (icon) {
                    icon.style.display = 'none';
                }
            });

            const selectedTabIcon = link.querySelector('.icon');
            if (selectedTabIcon) {
                selectedTabIcon.style.display = 'block';
            }
        });
    });


    const wrapper = document.querySelector(".wrapper");
    const carousel = document.querySelector(".carousel");
    const slideShowContainers = document.querySelectorAll(".about-ham__slide-show");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const carouselChildrens = [...carousel.children];

    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;


    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);


    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });


    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });


    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");


    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });


    function updateSlideShow(index) {
        slideShowContainers.forEach((container, i) => {
            if (i === index % slideShowContainers.length) {
                container.style.display = "block";
            } else {
                container.style.display = "none";
            }
        });
    }

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");

        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }

    const dragging = (e) => {
        if (!isDragging) return; // if isDragging is false return from here

        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    }

    const infiniteScroll = () => {

        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }

        else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }


    }


    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));



    carousel.addEventListener("scroll", () => {
        const index = Math.floor((carousel.scrollLeft + carousel.offsetWidth / 2) / firstCardWidth);
        updateSlideShow(index);
        infiniteScroll();
    });




});








