import "../styles/carousel.css";
import img1 from "/imgs/img1.jpg";
import img2 from "/imgs/img2.jpg";
import img3 from "/imgs/img3.avif";
import img4 from "/imgs/img4.webp";
import img5 from "/imgs/img5.jpg";
import img6 from "/imgs/img6.jpg";
import img7 from "/imgs/img7.jpg";

const Carousel = () => {

    window.onload = function () {
        let slides = document.getElementsByClassName('carousel-item');

        function addActive(slide) {
            slide.classList.add('active');
        }

        function removeActive(slide) {
            slide.classList.remove('active');
        }

        addActive(slides[0]);
        setInterval(function () {
            for (let i = 0; i < slides.length; i++) {
                if (i + 1 == slides.length) {
                    addActive(slides[0]);
                    setTimeout(removeActive, 350, slides[i]);
                    break;
                }
                if (slides[i].classList.contains('active')) {
                    setTimeout(removeActive, 350, slides[i]);
                    addActive(slides[i + 1]);
                    break;
                }
            }
        }, 1500);
    };

    const images = [img1, img2, img3, img4, img5, img6, img7];

    return (
        <div className="carousel w-full rounded-md lg:w-6/12">
            {images.map((x, index) => (
                <div key={index} className="carousel-item">
                    <div className="slide-image"
                        style={{
                            backgroundImage: `url(${x})`
                        }}>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Carousel;