class UserForm {
  constructor(nextStep) {
    window.clientData = {};
    this.bodyContainer = this.getBody();

    genericForm.updateWithContent(
      'Podaj swoje dane',
      this.bodyContainer,
      'Przejdź do spraw',
      () => {
        this.fillClientData();
        nextStep();
      }
    );
  }

  getBody() {
    const content = document.createElement('form');
    userFormSettings.forEach((item) => {
      content.appendChild(this.getPreparedInputs(item));
    });

    return content;
  }

  getPreparedInputs(params) {
    const element = document.createElement('div');
    element.innerHTML = `
      <div class="input-group mb-3">
          <input type="text" name="${params.id}" class="form-control" placeholder="${params.name}" aria-label="${params.name}" aria-describedby="basic-addon1">
      </div>
    `;
    return element.children[0];
  }

  fillClientData() {
    const inputs = this.bodyContainer.querySelectorAll("input");
    for (const input of inputs) {
      window.clientData[input.name] = input.value;
    }
  }
}
