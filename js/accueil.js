var windowWidth = window.innerWidth;


if (windowWidth >= 1024) {
    $('.carousel-container').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1
    });
} else {
    $('.carousel-container').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
}

function equalizeHeights() {
    const containerActivitesList = document.querySelectorAll('.container-activités');
    let maxHeight = 0;

    containerActivitesList.forEach((container) => {
        const height = container.offsetHeight;
        if (height > maxHeight) {
            maxHeight = height;
        }
    });


    containerActivitesList.forEach((container) => {
        container.style.height = maxHeight + 'px';
    });
}


window.addEventListener('load', equalizeHeights);
window.addEventListener('resize', equalizeHeights);