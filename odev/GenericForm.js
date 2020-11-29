class GenericForm {
  constructor() {
    this.formElement = document.querySelector("#generic-form");
    this.headerContainer = document.querySelector(
      "#generic-form .modal-header"
    );
    this.bodyContainer = document.querySelector("#generic-form .modal-body");
    this.footerContainer = document.querySelector(
      "#generic-form .modal-footer"
    );
  }

  showForm() {
    this.formElement.classList.add("active");
  }

  closeForm() {
    this.formElement.classList.remove("active");
  }

  getHeader(headerText) {
    return `
            <h5 class="modal-title">${headerText}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        `;
  }

  getFooter(footerText) {
    return `<button type="button" class="btn btn-primary" id="fill-work">${footerText}</button>`;
  }

  updateWithContent(headerText, body, footerText, callback) {
    this.headerContainer.innerHTML = '';
    this.bodyContainer.innerHTML = '';
    this.footerContainer.innerHTML = '';

    this.headerContainer.innerHTML = this.getHeader(headerText);
    if (typeof body === "string") {
      this.bodyContainer.innerHTML = body;
    } else {
      this.bodyContainer.appendChild(body);
    }
    this.footerContainer.innerHTML = this.getFooter(footerText);
    this.initialButtons(callback);
  }

  initialButtons(callback) {
    this.footerContainer
      .querySelector("button")
      .addEventListener("click", () => {
        callback();
      });

    this.headerContainer
      .querySelector('button')
      .addEventListener('click', () => {
        this.closeForm()
      });
  }
}

const genericForm = new GenericForm();
