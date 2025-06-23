(function(){
    const sliders = [...document.querySelectorAll('.slider__body')];
    const arrowNext = document.querySelector('#next');
    const arrowBefore = document.querySelector('#before');
    let value;
    let autoSlideInterval; // Variable para almacenar el ID del intervalo

    // Función para iniciar el pase automático
    function startAutoSlide() {
        // Limpia cualquier intervalo existente antes de iniciar uno nuevo
        clearInterval(autoSlideInterval); 
        autoSlideInterval = setInterval(() => {
            changePosition(1); // Pasa a la siguiente imagen automáticamente
        }, 5000); // Cambia cada 5 segundos (5000 milisegundos)
    }

    arrowNext.addEventListener('click', ()=>{
        changePosition(1);
        startAutoSlide();
    });

    arrowBefore.addEventListener('click', ()=>{
        changePosition(-1);
        startAutoSlide();
    });

    function changePosition(change){
        const currentElement = Number(document.querySelector('.slider__body--show').dataset.id);
        
        value = currentElement;
        value+= change;

        if(value === 0 || value == sliders.length+1){
            value = value === 0 ? sliders.length : 1;
        }

        // Remover la clase de la diapositiva actual
        sliders[currentElement-1].classList.remove('slider__body--show');
        // Añadir la clase a la nueva diapositiva
        sliders[value-1].classList.add('slider__body--show');

        // sliders[currentElement-1].classList.toggle('slider__body--show');
        // sliders[value-1].classList.toggle('slider__body--show');
    }

    startAutoSlide();
})()