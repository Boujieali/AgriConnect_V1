document.addEventListener('DOMContentLoaded', function () {
    loadImages();
});

function loadImages() {
    const images = [
        'istockphoto-1419527743-612x612.jpg',
        'istockphoto-1999195067-612x612.jpg',
        'istockphoto-1999202199-612x612.jpg',
        'image4.jpg'
    ];
    const carouselContainer = document.getElementById('carousel');
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = `images/${image}`;
        imgElement.alt = 'Produce image';
        carouselContainer.appendChild(imgElement);
    });
}
