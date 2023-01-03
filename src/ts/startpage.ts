import { CartItem } from "./models/CartItem";

import {
  checkout,
  closeCart,
  openCart,
  shoppingCartHtml,
} from "./shoppingcart";

function init() {
  let startButton = document.getElementById(
    "button-product"
  ) as HTMLButtonElement;
  startButton.addEventListener("click", () => {
    location.href = "./pages/products.html";
  });
  openCart();
  closeCart();
  checkout();
  let chosenProducts: CartItem[] = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );
  shoppingCartHtml(chosenProducts);
}

init();

console.log("start");
