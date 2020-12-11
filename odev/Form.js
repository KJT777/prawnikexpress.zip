const sendGeneralForm = function(content) {
    const form = new FormData();

    form.append('message', content);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./odev/mail.php", true);
    xhr.send(form);
    document.getElementById("status").innerHTML="Wysyłanie formularza powiodło się";
}

const contactForm = function() {

    const form = document.querySelector('#page-footer form');
    const name = form.querySelector('#form-name').value;
    const lastName = form.querySelector('#form-lastname').value;
    const mail = form.querySelector('#form-mail').value;
    const phone = form.querySelector('#form-phone').value;
    const desc = form.querySelector('#form-description').value;
    const id = Math.random().toString(36).substr(2, 9);

    let content = `
        <h4>Dane</h4>
        <b>Imie:</b> ${name}<br>
        <b>Nazwisko: </b> ${lastName}<br>
        <b>Mail: </b> ${mail}<br>
        <b>Telefon: </b> ${phone}<br>
        <b>Opis: </b> ${desc}<br>
        <b>Id: </b> ${id}
    `;

    wyslijPlik(id, sendGeneralForm, content);
    
}

const form = document.querySelector('#page-footer form');
form.addEventListener('submit', event => {
    event.preventDefault();
    contactForm();
});