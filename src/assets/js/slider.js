//used my slider https://codepen.io/aleksey-kaa/pen/bGdKapr
function Slider({
    slider,
    movingSlider = "fullWidth",
    btnNavigation = true,
    dotsNavigation = false
  }) {
    this.sl = document.querySelector(slider);
    this.slWrap = this.sl.querySelector(".slider-wrap");
    this.slCountItems = this.sl.querySelectorAll(".slider--item");
  
    this.buttonHandler = btnNavigation;
    this.dotsHandler = dotsNavigation;
  
    this.sliderWidth = parseInt(getComputedStyle(this.sl).width);
    this.itemWidth = parseInt(getComputedStyle(this.slCountItems[0]).width);
    this.maxVisibleItems = Math.floor(this.sliderWidth / this.itemWidth);
  
    const margins =
      (this.sliderWidth - this.itemWidth * this.maxVisibleItems) /
      this.maxVisibleItems;
    
    this.slideMoving = this.sliderWidth; // width of movement
    this.movingItemWidth = this.itemWidth + margins;
    this.handlerWidthSlider = movingSlider;
  
    const maxWindowWidth =   -Math.floor((this.slCountItems.length - 1) / this.maxVisibleItems) *
    this.sliderWidth

    const remainsItem = this.slCountItems.length % this.maxVisibleItems
    const validateRemains = remainsItem === 0 ? this.maxVisibleItems : remainsItem

    const elementBalance  = Math.floor(this.maxVisibleItems - validateRemains) * this.movingItemWidth

    this.position = {
      currentPosition: +this.slWrap.dataset.start || 0,
      min: 0,
      max:
        Math.floor(maxWindowWidth + elementBalance)
    };

    this.init();
  }

  Slider.prototype.init = function() {
    this.handlerWidth(this.handlerWidthSlider);
    if (this.buttonHandler) {
      this.buttonNav();
    }
    if (this.dotsHandler) {
      this.createDots();
    }
  };
  Slider.prototype.handlerWidth = function(handler) {
    switch (handler) {
      case "fullWidth":
        this.slideMoving = this.sliderWidth;
        break;
      case "itemWidth":
        this.slideMoving = this.movingItemWidth;
        break;
      default:
        this.slideMoving = this.sliderWidth;
    }
  };
  Slider.prototype.moveSlider = function(pos = 0) {
    this.position.currentPosition += Math.floor(pos);
    this.slWrap.style.transform = `translateX(${this.position.currentPosition}px)`;
    if(this.buttonHandler) {
      this.hiddenButton();
    }
  };
  
  Slider.prototype.createDots = function() {
    const countDots = this.slCountItems.length / this.maxVisibleItems;
    const dotsWrap = this.sl.querySelector(".slider--dots");
  
    for (let i = 0; i < countDots; i++) {
      let span = document.createElement("span");
      span.classList.add("dot");
      dotsWrap.append(span);
    }
    this.moveSlider();
    this.dotsNav();
  };
  
  Slider.prototype.dotsNav = function() {
    const dots = this.sl.querySelectorAll(".dot");
  
    dots.forEach((el, i) => {
      this.dotActive();
      el.addEventListener("click", () => {
        this.position.currentPosition = -this.sliderWidth * i;
        this.dotActive();
        this.slWrap.style.transform = `translateX(${this.position.currentPosition}px)`;
      });
    });
  };
  
  Slider.prototype.dotActive = function() {
    const { currentPosition } = this.position;
    const { sliderWidth } = this;
    let activeDot = Math.abs(currentPosition / sliderWidth);
    
    if (!(currentPosition % sliderWidth)) {
      
      const dots = this.sl.querySelectorAll(".dot");
      
      dots.forEach(dot => dot.classList.remove("active"));
      
      dots[activeDot].classList.add("active");
      
    }
    if (this.buttonHandler) {
      this.hiddenButton();
    }
  };
  Slider.prototype.hiddenButton = function() {
    const { currentPosition, min, max } = this.position;
    let btnPrev = this.sl.querySelector(".prev");
    let btnNext = this.sl.querySelector(".next");
    
    if (currentPosition >= min) {
      btnPrev.classList.add("hide");

      this.position.currentPosition = min

    } else if(currentPosition + this.movingItemWidth > min) {
      btnPrev.classList.add("hide");

      this.position.currentPosition = min

    } else {
      btnPrev.classList.remove("hide");
    }
    if (currentPosition <= max) {
      btnNext.classList.add("hide");
      this.position.currentPosition = max
    } else {
      btnNext.classList.remove("hide");
    }
  };
  
  Slider.prototype.buttonNav = function() {
    this.moveSlider();
    this.sl
      .querySelectorAll(".slider--button")
      .forEach(btn => (btn.onclick = this.buttonControl.bind(this)));
  };
  
  Slider.prototype.buttonControl = function(e) {
    const val = e.target.closest('.slider--button')
    
    const { currentPosition, min, max } = this.position;
    const { slideMoving, dotsHandler } = this;
    if (val.classList.contains("prev")) {
      if (currentPosition === min) return;
      this.moveSlider(slideMoving);
    }
    if (val.classList.contains("next")) {
      if (currentPosition === max) return;
      this.moveSlider(-slideMoving);
    }
  
    if (dotsHandler) {
      // active dots navigation
      this.dotActive();
    }
  };
  export default Slider;