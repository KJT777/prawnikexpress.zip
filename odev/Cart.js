class Cart {
  constructor() {
    window.orders = [];
    window.lawsuit = [];
    window.clientData = {};

    this.initialCartButton();
  }

  initialCartButton() {
    document.querySelector('button#show-cart')
      .addEventListener('click', () => this.showCart());
  }

  drawOrderList() {

    const tableWrapper = document.createElement('div');

    tableWrapper.innerHTML = `
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Wybrane pozycje</th>
            <th scope="col">Cena</th>
            <th scope="col">Usuń</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    `;
    
    const baseTable = function (id, name, price) {
      return (
        `<tr>
          <th scope="row">` + name + `</th>
          <td>` + price + `</td>
          <td><button type="button" class="btn btn-dark" data-id="` + id + `">X</button></td>
        </tr>`
      );
    };

    window.cost = 0;
    
    const orderListElement = tableWrapper.querySelector('tbody');
    orderListElement.innerHTML = "";
    window.orders.forEach(function (el) {
      window.cost += Number(el.price);
      const row = baseTable(el.id, el.title, el.price + `zł`);
      orderListElement.insertAdjacentHTML("beforeend", row);
    });

    const buttons = orderListElement.querySelectorAll("button");
    for (let button of buttons) {
      const buttonId = button.dataset.id;
      button.addEventListener("click", () => {
        this.removeOrder(buttonId);
      });
    }

    const sumElement = document.createElement('div');
    sumElement.innerHTML = `<b>Łącznie do zapłaty:</b> ${window.cost} zł`;

    tableWrapper.appendChild(sumElement);

    return tableWrapper;
  }

  removeOrder(id) {
    window.orders = window.orders.filter((el) => el.id != id);
    this.showCart();
  }

  closeCart() {
    document.querySelector("#generic-form").classList.remove("active");
  }

  showCart() {
    genericForm.showForm();
    if(window.orders.length) {
      genericForm.updateWithContent(
        'Koszyk',
        this.drawOrderList()
        ,
        'Wypełnij szczegóły spraw',
        () => {
          this.startUserForm();
        }
      );
    } else {
      genericForm.updateWithContent(
        'Koszyk',
        '(Twój koszyk jest pusty)'
        ,
        'Zamknij koszyk',
        () => {
          this.closeCart();
        }
      );
    }
    
  }

  startUserForm() {
    new UserForm(this.startLawsuitForm);
  }

  startLawsuitForm() {
    new LawsuitForm();
  }
}
