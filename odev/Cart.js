class Cart {
  constructor() {
    this.orders = [];
    this.initAllButtons();
  }

  initAllButtons() {
    

    // Add to cart
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    for (let button of addToCartButtons) {
      button.addEventListener("click", event => this.handleAddToCart(event, this));
    }

    // Show Cart
    document.querySelector('#show-cart').addEventListener('click', this.toggleCart);
    // Hide Cart
    document.querySelector('#cart .close').addEventListener('click', this.toggleCart);
  }

  handleAddToCart(event, thisCart) {
    event.preventDefault();
    const clickedElement = event.target;

    thisCart.orders.push({
      title: clickedElement.parentNode.querySelector('h5').innerText,
      id: Math.random().toString(36).substr(2, 9),
      cash: 20
    });
    thisCart.showAlert();
    thisCart.drawOrderList();
  }

  showAlert() {
    const alertElement = document.querySelector(".alert");
    alertElement.classList.add("active");
    setTimeout(function() {
      document.querySelector(".alert").classList.remove("active");
    }, 5000);
  }

  drawOrderList() {
    const thisCart = this;
    const baseTable = function(id, name, cash) {
      return `<tr>
      <th scope="row">`+ name +`</th>
      <td>`+cash+`</td>
      <td>
        <button type="button" class="btn btn-dark" data-id="`+id+`">X</button>
      </td>
      </tr>`;
    }

    const orderListElement = document.querySelector('#cart tbody');
    orderListElement.innerHTML = "";
    thisCart.orders.forEach(function(el){
      const row = baseTable(el.id, el.title, el.cash+`zł`);
      orderListElement.insertAdjacentHTML('beforeend', row);
    });

    const buttons = orderListElement.querySelectorAll('button');
    for(let button of buttons) {
      const buttonId = button.dataset.id;
      button.addEventListener('click', function() {
        thisCart.removeOrder(thisCart, buttonId);
      });
    }

  }

  removeOrder(thisCart, id) {
    thisCart.orders = thisCart.orders.filter(el => el.id != id);
    console.log('test')
    thisCart.drawOrderList();
  }

  toggleCart() {
    document.querySelector('#cart').classList.toggle('active');
  }

}
