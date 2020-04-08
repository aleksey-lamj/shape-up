import Slider from './slider';
import '../../../node_modules/svgxuse/svgxuse';

(() => {
    const iframe = document.querySelector('.about-video iframe')
    const videoWrap = document.querySelector('.about-videos')
    const videoHome = document.querySelector('.about-video')
    videoHome.addEventListener('click', function () {
        if (this.classList.contains('poster')) {
            this.classList.remove('poster')
            return
        }
    })
    videoWrap.addEventListener('click', function (e) {
        if (!e.target.closest('img')) return

        if (videoHome.classList.contains('poster')) {
            videoHome.classList.remove('poster')
        }
        let iframeSrc = iframe.getAttribute('src')
        let videoSrc = e.target.getAttribute('data-videoSrc')

        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].classList.contains('video-wrap--active')) {
                this.children[i].classList.remove('video-wrap--active')
                break;
            }
        }
        let urlVideo = iframeSrc.replace(/[a-zA-Z0-9-.]*$/, videoSrc)
        iframe.setAttribute('src', urlVideo)
        e.target.classList.add('video-wrap--active')
    })
})()
const sliders = () => {
    const trainersSlider = new Slider({
        slider: '.trainers-slider',
        movingSlider: 'itemWidth'
    })
    const reviewsSlider = new Slider({
        slider: '.reviews-slider',
        btnNavigation: false,
        dotsNavigation: true
    })
    const asideSlider = new Slider({
        slider: '.aside-slider',
        movingSlider: 'itemWidth'
    })
    const sliderBlog = new Slider({
        slider: '.slider-blog',
        movingSlider: 'itemWidth'
    })
}
sliders()
const anchor = () => {
    const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
        animationTime = 300,
        framesCount = 30;
    anchors.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

            let scroller = setInterval(function () {
                let scrollBy = coordY / framesCount;

                if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                    window.scrollBy(0, scrollBy);
                } else {
                    window.scrollTo(0, coordY);
                    clearInterval(scroller);
                }
            }, animationTime / framesCount);
        });
    });
}
anchor()
document.querySelector('.btn-wrap').addEventListener('click', function () {
    this.classList.toggle('close')
    if (this.classList.contains('close')) {
        this.nextElementSibling.classList.add('active')
    } else {
        this.nextElementSibling.classList.remove('active')
    }
    this.nextElementSibling.onclick = () => {
        setTimeout(() => {
            this.nextElementSibling.classList.remove('active')
            this.classList.remove('close')
        }, 500);

    }
})

