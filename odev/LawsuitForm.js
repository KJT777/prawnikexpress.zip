class LawsuitForm {
  constructor() {
    this.updateContent();
  }

  initialBody(id) {
    return `
      <form>
        <div class="form-group">
          <textarea class="form-control" id="lawsuitTextarea" rows="10"></textarea>
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
            'Dziękujemy za złożenie zamówień. Po opłaceniu piniendzy zajmiemy się Twoją sprawą.</p>',
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

    let content = '';

    const topic = (el) => `<div>
      <h1>${el.title}</h1>
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
