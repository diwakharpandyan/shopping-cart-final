let orderedItemsWrapper = document.getElementById("order-confirmation-main");

let generateOrderedItems = () => {
  return (orderedItemsWrapper.innerHTML = basket
    .map((x) => {
      let search = productItemsData.find((y) => y.id === x.id) || [];

      return `<div id="ordered-item" class="ordered-item">
  <div class="ordered-item-segment-1">
    <div class="ordered-item-image-thumbnail-container">
    
      <img src="${search.image.thumbnail}" alt="" />
    </div>
    <div class="ordered-item-name-qty-unit-price-container">
      <div class="ordered-item-name">${search.name}</div>
      <div class="ordered-item-qty-unit-price">
        <div class="ordered-item-qty">${x.item}x</div>
        <div class="ordered-item-unit-price">@ $${search.price}</div>
      </div>
    </div>
  </div>
  <div class="ordered-item-segment-2">
    <div class="ordered-item-total-price">$${x.item * search.price}</div>
  </div>
</div>`;
    })
    .join(""));
};
generateOrderedItems();

let totalOrderAmount = () => {
  let totalOrderAmount = document.getElementById(
    "order-confirmation-total-price"
  );
  if (basket.length !== 0) {
    totalOrderAmount.innerHTML =
      "$" +
      basket
        .map((x) => {
          let { id, item } = x;
          let search = productItemsData.find((y) => y.id === id) || [];
          let totalOrderCost = search.price * item;
          return totalOrderCost;
        })
        .reduce((x, y) => x + y, 0);
  } else {
    totalOrderAmount.innerHTML = "$" + 0;
  }
};

totalOrderAmount();

let startNewOrderButton = document.getElementById(
  "order-confirmation-start-new-button"
);
startNewOrderButton.addEventListener("click", () => {
  basket = [];
  document
    .getElementById("order-confirmation-container")
    .classList.remove("order-confirmation-container-show");
  generateOrderedItems();
  totalOrderAmount();
  cartCount();
  confirmButtonState();
  totalAmount();
  generateCart();
  localStorage.setItem("data", JSON.stringify(basket));
  location.reload();
});
