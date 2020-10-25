{
  'use script'
  
  function closeModalHandler() {
    const closeButtons = document.querySelectorAll('.popup-wrapper .close');
    const modalWrapper = document.querySelector('.popup-wrapper');
    
    for(var button of closeButtons) {
      button.addEventListener('click', function() {
        console.log('test');
        modalWrapper.classList.remove('active');
        const activeModal = document.querySelector('.popup-wrapper .active');
        activeModal.classList.remove('active');
      });
    }
  }

  closeModalHandler();

  function showModalHandler() {
    const modalButtons = document.querySelectorAll('.modal-button');

    for(let button of modalButtons) {
      button.addEventListener('click', function(event) {
        const modalId = event.target.getAttribute('href').replace('#', '');
        const popupWrapper = document.querySelector('.popup-wrapper');
        const activeModal = popupWrapper.querySelector('#' + modalId);
        popupWrapper.classList.add('active');
        activeModal.classList.add('active');
      })
    }
  }

  showModalHandler();

}