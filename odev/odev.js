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


  function initAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    for (let button of addToCartButtons) {
      button.addEventListener("click", (event) =>
        this.handleAddToCart(event)
      );
    }
  }

  initAddToCartButtons();

  function handleAddToCart(event) {
    event.preventDefault();
    const clickedElement = event.target;

    window.orders.push({
      title: clickedElement.parentNode.querySelector("h5").innerText,
      id: Math.random().toString(36).substr(2, 9),
      price: parseInt(clickedElement.dataset.price),
    });
    this.showAlert();
  }

  function showAlert() {
    const alertElement = document.querySelector(".alert");
    alertElement.classList.add("active");
    setTimeout(function () {
      document.querySelector(".alert").classList.remove("active");
    }, 5000);
  }
  new Cart();
}


function wyslijPlik(fileId, callback, content) {
  var plik=document.getElementById("plik").files[0];
  console.log(fileId, plik);
	
	var formularz=new FormData(); //tworzymy nowy formularz do wysłania
  formularz.append('id', fileId);
  formularz.append("plik", plik); //dodajemy do formularza pole z naszym plikiem
  /* wysyłamy formularz za pomocą AJAX */
	var xhr=new XMLHttpRequest();
	xhr.upload.addEventListener("progress", postepWysylania, false);
	xhr.addEventListener("load", function(event) {
    zakonczenieWysylania(event, callback, content)
  }, false);
	xhr.addEventListener("error", bladWysylania, false);
	xhr.addEventListener("abort", przerwanieWysylania, false);
	xhr.open("POST", "./odev/upload.php", true);
	xhr.send(formularz);
}

function postepWysylania(event) {
	var procent=Math.round((event.loaded/event.total)*100);
	document.getElementById("status").innerHTML="Wysłano "+konwersjaBajtow(event.loaded)+" z "+konwersjaBajtow(event.total)+" ("+procent+"%)";
	document.getElementById("postep").value=procent;
}

function zakonczenieWysylania(event, callback, content) {
  document.getElementById("status").innerHTML=event.target.responseText;
  callback && callback(content);
}

function bladWysylania(event) {
	document.getElementById("status").innerHTML="Wysyłanie nie powiodło się";
}

function przerwanieWysylania(event) {
	document.getElementById("status").innerHTML="Wysyłanie zostało przerwane";
}

function konwersjaBajtow(bajty) {
	var kilobajt=1024;
	var megabajt=kilobajt*1024;
	var gigabajt=megabajt*1024;
	var terabajt=gigabajt*1024;
	
	if (bajty>=0 && bajty<kilobajt) return bajty+" B";
	else if(bajty>=kilobajt && bajty<megabajt) return Math.round(bajty/kilobajt)+" kB";
	else if(bajty>=megabajt && bajty<gigabajt) return Math.round(bajty/megabajt)+" MB";
	else if(bajty>=gigabajt && bajty<terabajt) return Math.round(bajty/gigabajt)+" GB";
	else if(bajty>=terabajt) return Math.round(bajty/terabajt)+" TB";
	else return bajty+" B";
}