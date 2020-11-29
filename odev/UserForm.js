class UserForm {
  constructor(nextStep) {
    this.nextStep = nextStep;
    window.clientData = {
      name: '',
      lastName: '',
      fullAddress: '',
      phone: '',
      mail: ''
    };
    this.validation = [];
    this.accept = null;
    this.update();
  }

  update() {
    this.bodyContainer = this.getBody();
    genericForm.updateWithContent(
      'Podaj swoje dane',
      this.bodyContainer,
      'Przejdź do formularza pierwszej sprawy',
      () => {
        this.fillClientData();
        this.validData();
        if(this.validation.length) {
          this.update();
        } else if(!this.accept) {
          this.accept = false;
          this.update();
        } else {
          this.nextStep();
        }
      }
    );
  }

  validData() {
    this.validation = [];
    for(let val of userFormSettings) {
      const value = window.clientData[val.id];
      
      const isValid = val.valid(value);
      if(!isValid) {
        this.validation.push(val.id)
      }
    }
  }

  getBody() {
    const content = document.createElement('form');
    userFormSettings.forEach((item) => {
      content.appendChild(this.getPreparedInputs(item));
    });

    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.innerHTML = `
    <input type="checkbox" id="accept-checkbox" name="accept" ${this.accept ? 'checked' : ''}>
    <label for="accept">Akceptuję Regulamin świadczenia usług i zapoznałem się z informacjami o danych osobowych</label>
    ${this.accept == false ? `
    <div class="invalid-feedback d-block">
      Akceptacja jest wymagana
    </div>
    ` : ''}
    `
    content.appendChild(checkboxWrapper);
    checkboxWrapper.addEventListener('click', () => {
      this.accept = !this.accept;
      this.update();
    })

    return content;
  }

  getPreparedInputs(params) {
    const element = document.createElement('div');

    const error = this.validation.includes(params.id)
      ? userFormSettings.find((setting) => setting.id == params.id).error
      : '';

    element.innerHTML = `
    <div>
      <div class="invalid-feedback d-block">
        ${error}
      </div>
      <div class="input-group mb-3">
          <input type="text" name="${params.id}" value="${window.clientData[params.id]}" class="form-control" placeholder="${params.name}" aria-label="${params.name}" aria-describedby="basic-addon1" required>
      </div>
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
