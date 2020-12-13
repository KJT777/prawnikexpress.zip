class LawsuitForm {
  constructor() {
    this.updateContent();
  }

  initialBody(id) {
    return `
      <form>
        <div class="form-group">
          <textarea class="form-control" id="lawsuitTextarea" rows="10"></textarea>
          <p>Szanowni Państwo w celu usprawnienia naszej pracy prosimy o dołączenie dokumentów związanych ze sprawą oraz bardzo dokładne jej opisanie  (najlepiej chronologicznie – data-zdarzenie)</p>
        </div>
      </form>
      <form enctype="multipart/form-data" action="odev/upload.php" method="post" id="file-form">
      <label class="custom-file-upload">
        <input type="file" name="plik" id="plik" class="btn btn-primary">
        <div class="btn btn-primary">Wybierz plik.</div>
      </label>
          <input type="button" class="btn btn-primary" value="Wyślij" onclick="wyslijPlik('${id}')">
      </form>
      <div class="file-send-status">
        <h5>Postęp wysyłania</h5>
        <output id="status">Wybierz plik i naciśnij <i>Wyślij</i>.</output>
        <progress value="0" max="100" id="postep"></progress>
      </div>
    `;
  }

  getLawsuitData() {
    const lawsuit = window.orders[0];
    const text = document.querySelector('#lawsuitTextarea').value;
    window.lawsuit.push({
      title: lawsuit.title,
      fileId: lawsuit.id,
      text
    });
  }

  updateContent() {
    genericForm.updateWithContent(
      window.orders[0].title,
      this.initialBody(window.orders[0].id),
      'Zobacz kolejną sprawę',
      () => {
        this.getLawsuitData()
        window.orders.shift();

        if (window.orders.length) {
          this.updateContent();
        } else {

          this.sendMail();

          window.lawsuit = [];

          genericForm.updateWithContent(
            'Wszystko poszło sprawnie!',
            `<p>Szanowni Państwo po uregulowaniu wynagrodzenia, przystępujmy niezwłocznie do realizacji usługi w wybranym terminie i formie.<br> 
            Na wpłatę czekamy 7 dni roboczych. Jednak  jeśli zależy Państwu na czasie proponujemy jak najszybciej uregulować płatność (w TYTULE wpisując imię i nazwisko oraz opłacone pozycje spraw). Następnie wysłać potwierdzenie na adres mailowy.<br><br> 
            <b>Dane do wpłaty:</b><br>
            Suma do wpłaty: ${window.cost} zł<br><br>
            Wszystkie potrzebne dane do wpłaty otrzymacie Państwo<br>
            wraz z mailem zwrotnym wysłanym do Państwa przez naszych pracowników na podany adres mailowy.<br>
            Dziękujemy za zaufanie!<br><br>
            *za opłaconą usługę  uznajemy kwotę która zostanie zaksięgowana na naszym koncie.</p>`,
            'Zamknij popup',
            () => {
                genericForm.closeForm();
            }
          );

        }
      }
    );
  }

  sendMail() {

    console.log(window.clientData)

    let content = `
      <h4>Dane</h4>
      <b>Imie:</b> ${window.clientData.name}<br>
      <b>Nazwisko: </b> ${window.clientData.lastName}<br>
      <b>Mail: </b> ${window.clientData.mail}<br>
      <b>Adres: </b> ${window.clientData.fullAddress}<br>
      <b>Telefon: </b> ${window.clientData.phone}
    `;

    const topic = (el) => `<div>
      <h4>${el.title}</h4>
      <p>${el.text}</p>
      <span>Id pliku: ${el.fileId}</span>
    </div>`;

    for(let el of window.lawsuit) {
      content += topic(el);
    }

    const form = new FormData();

    form.append('message', content);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./odev/mail.php", true);
    xhr.send(form);
  }

}
