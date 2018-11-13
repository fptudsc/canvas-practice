window.addEventListener("DOMContentLoaded", () => {
    function startLecture(e) {
        const overlayStart = document.querySelector('.overlay-start');
        overlayStart.style.cssText = 'transition: 1.4s ease; transform: translateY(-100%)';
    }

    function changeSlide(e) {
        const activeSlide = document.querySelector('.slide-active');
        const ds = this.dataset;
        const slide = ds.left ? 
                            activeSlide.previousElementSibling || slides[slides.length - 1] :
                            activeSlide.nextElementSibling || slides[0];
        document.querySelector('.slide-active').classList.remove('slide-active');
        slide.classList.add('slide-active');    
    }

    function showViewSlide(e) {
        document.querySelector('.lecture').classList.toggle('view-slide');
    }

    function pickSlide(e) {
        document.querySelector('.slide-active').classList.remove('slide-active');
        this.classList.add('slide-active');
        document.querySelector('.lecture').classList.remove('view-slide');
    }

    function removeArrow(e) {
        const className = slideState ? 'fas fa-angle-double-right' : 'fas fa-allergies';
        this.className = className;
        arrows.forEach(a => a.classList.toggle('arrow-active'));
        slideState = !slideState;
    }

    function showCanvas(e) {
        drawingState = !drawingState;
        if (drawingState) {
            tools.classList.add('open-tools');
            drawing.classList.add('drawing-active');
            onDrawing.classList.remove('on-drawing-active');
        } else {
            tools.classList.remove('open-tools');
            drawing.classList.remove('drawing-active');
        }
        removeArrow.call(disabledSlide, e);
    }

    function showTools(e) {
        tools.classList.toggle('open-tools');

        if (tools.classList.contains('open-tools') && !drawing.classList.contains('drawing-active'))
            onDrawing.classList.add('on-drawing-active');
        else
            onDrawing.classList.remove('on-drawing-active');
    }

    let slideState = true;
    let drawingState = false;
    const startBtn = document.querySelector('.start-btn');
    const slides = document.querySelectorAll('.slide');
    const arrows = document.querySelectorAll('.arrow');
    const viewSlide = document.querySelector('.enable-view-slide');
    const disabledSlide = document.querySelector('.disabled-slide');
    const openDrawing = document.querySelector('.open-drawing');
    const drawing = document.querySelector('.drawing');
    const openDrawingTools = document.querySelector('.open-drawing-tools');
    const tools = document.querySelector('.drawing-tools');
    const onDrawing = document.querySelector('.on-drawing');

    startBtn.addEventListener('click', startLecture);
    arrows.forEach(a => a.addEventListener('click', changeSlide));
    slides.forEach(s => s.addEventListener('click', pickSlide));

    viewSlide.addEventListener('click', showViewSlide);

    disabledSlide.addEventListener('click', removeArrow);

    openDrawing.addEventListener('click', showCanvas);

    openDrawingTools.addEventListener('click', showTools);
});