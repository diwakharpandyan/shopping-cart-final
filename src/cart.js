let cart = document.getElementById("cart");
let cartItems = JSON.parse(localStorage.getItem("data")) || [];
let confirmOrderButton = document.getElementById("confirm-order-button");
let cartFooter = document.getElementById(".cart-footer");

let cartCount = () => {
  let cartCount = document.getElementById("total-items-qty");
  if (basket.length !== 0) {
    cartCount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  } else {
    cartCount.innerHTML = 0;
  }
};

cartCount();

let totalAmount = () => {
  let totalAmount = document.getElementById("order-total-price");
  if (basket.length !== 0) {
    totalAmount.innerHTML =
      "$" +
      basket
        .map((x) => {
          let { id, item } = x;
          let search = productItemsData.find((y) => y.id === id) || [];
          let totalPrice = search.price * item;
          return totalPrice;
        })
        .reduce((x, y) => x + y, 0);
  } else {
    totalAmount.innerHTML = "$" + 0;
  }
};

totalAmount();

let generateCart = () => {
  if (basket.length !== 0) {
    return (cart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = productItemsData.find((y) => y.id === id) || [];
        let totalPrice = search.price * item;
        return `
<div class="cart-item">
  <div class="cart-item-text">
    <div class="name-qty-price">
      <div class="name">${search.name}</div>
      <div class="qty-price">
        <div class="qty">${item}x</div>
        <div class="unit-price">@ $${search.price}</div>
        <div class="total-price">$${totalPrice}</div>
      </div>
    </div>
  </div>
  <div class="cart-item-icon">
    <div class="icon">
      <i onclick="removeItem(${id})" class="bi bi-x-circle"></i>
    </div>
  </div>
</div>`;
      })
      .join(""));
  } else {
    cart.innerHTML = `<div class="empty-cart-illustration-container"><img src="./assets/images/illustration-empty-cart.svg" alt=""></div>
      <small>Your added items will appear here</small>`;
  }
};

generateCart();

let removeItem = (id) => {
  basket = basket.filter((x) => x.id !== id);
  cartCount();
  totalAmount();
  generateCart();
  generateProducts();
  ButtonState();
  localStorage.setItem("data", JSON.stringify(basket));
};

let confirmButtonState = () => {
  if (basket.length === 0) {
    confirmOrderButton.style.display = "none";
  } else {
    confirmOrderButton.style.display = "block";
  }
};
confirmButtonState();
confirmOrderButton.addEventListener("click", () => {
  totalOrderAmount();
  generateOrderedItems();
  document
    .getElementById("order-confirmation-container")
    .classList.add("order-confirmation-container-show");
});
