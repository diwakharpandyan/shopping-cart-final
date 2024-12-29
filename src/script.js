let products = document.getElementById("products");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateProducts = () => {
  return (products.innerHTML = productItemsData
    .map((x) => {
      let { id, image, name, category, price } = x;

      return `
    <div id=product-id-${id} class="item">
      <div class="image-button-container">
      <picture>

  <source srcset=${image.mobile} media="(max-width: 600px)">
  
  <source srcset=${image.tablet} media="(max-width: 850px)">

  <img id=image-${id} width="100%" src=${image.desktop} alt="">
</picture>
        
        <button onclick="ChangeButtonContent(${id})" onload="ButtonState(${id})" id="products-button-${id}" class="products-button-not-clicked ">
          <div class="icon"><i class="bi bi-cart-plus"></i></div>
          <div class="text">Add to Cart</div>
        </button>
      </div>
        <div class="details">
         <small class="category">${category}</small>
          <h4 class="name">${name}</h4>
          <h4 class="price">$${price}</h4>
        </div>
    </div>`;
    })
    .join(""));
};

generateProducts();

let ChangeButtonContent = (id) => {
  let search = basket.find((x) => x.id === id) || [];
  let button = document.getElementById(`products-button-${id}`);

  button.innerHTML = `
  <div onclick="decrement(${id})" class="icon"><i class="bi bi-dash-circle"></i></div>
  <div id=${id} class="quantity"> ${
    search.item === undefined ? 0 : search.item
  }</div>
  <div onclick="increment(${id})" class="icon"><i class="bi bi-plus-circle"></i></div>
  `;

  if (button.classList.contains("products-button-not-clicked")) {
    button.classList.remove("products-button-not-clicked");
    button.classList.add("products-button-clicked");
    localStorage.setItem("buttonState", "clicked");
  } else {
    return;
  }

  let image = document.getElementById(`image-${id}`);
  image.classList.add("image-clicked");
};

let ButtonState = () => {
  return basket
    .map((x) => {
      let button = document.getElementById(`products-button-${x.id}`);
      let savedState = localStorage.getItem("buttonState");
      if (savedState === "clicked") {
        button.classList.remove("products-button-not-clicked");
        button.classList.add("products-button-clicked");

        button.innerHTML = `
        <div onclick="decrement(${
          x.id
        })" class="icon"><i class="bi bi-dash-circle"></i></div>
        <div id=${x.id} class="quantity"> ${
          x.item === undefined ? 0 : x.item
        }</div>
        <div onclick="increment(${
          x.id
        })" class="icon"><i class="bi bi-plus-circle"></i></div>
        `;

        let image = document.getElementById(`image-${x.id}`);
        image.classList.add("image-clicked");
      } else {
        return;
      }
    })
    .join("");
};

ButtonState();

let increment = (id) => {
  let search = basket.find((x) => x.id === id);
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  cartCount();
  totalAmount();
  confirmButtonState();
  generateCart();
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let search = basket.find((x) => x.id === id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  cartCount();
  totalAmount();
  basket = basket.filter((x) => x.item !== 0);
  generateCart();
  confirmButtonState();
  localStorage.setItem("data", JSON.stringify(basket));
};
