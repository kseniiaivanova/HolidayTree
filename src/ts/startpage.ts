import { CartItem } from "./models/CartItem";
import { Product } from "./models/Product";

function init() {
  let startButton = document.getElementById(
    "button-product"
  ) as HTMLButtonElement;
  startButton.addEventListener("click", () => {
    location.href = "products.html";
  });
}
let chosenProducts: CartItem[] = JSON.parse(
  localStorage.getItem("cartItems") || "[]"
);

init();

function OpenCart() {
  let startButton = document.getElementById("openCart") as HTMLButtonElement;
  startButton.addEventListener("click", () => {
    let openSidebar = document.getElementById("mySidebar") as HTMLDivElement;
    openSidebar.style.width = "250px";
    let openMain = document.getElementById("main") as HTMLDivElement;
    openMain.style.marginLeft = "250px";
  });
}

OpenCart();

function closeCart() {
  let closeButton = document.getElementById("closeCart") as HTMLButtonElement;
  closeButton.addEventListener("click", () => {
    let closeSidebar = document.getElementById("mySidebar") as HTMLDivElement;
    closeSidebar.style.width = "0";
    let closeMain = document.getElementById("main") as HTMLDivElement;
    closeMain.style.marginLeft = "0";
  });
}

closeCart();

function checkout() {
  let checkoutButton = document.getElementById(
    "button-checkout"
  ) as HTMLButtonElement;
  checkoutButton.addEventListener("click", () => {
    location.href = "checkout.html";
  });
}

checkout();

function addMoreToCart(item: CartItem, cartItems: CartItem[]) {
  item.amount++;

  shoppingCartHtml(cartItems);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function reduceCart(item: CartItem, cartItems: CartItem[]) {
  item.amount--;
  if (item.amount < 1) {
    let listindex = cartItems.indexOf(item);
    cartItems.splice(listindex, 1);
  }
  shoppingCartHtml(cartItems);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function removeFromCart(item: CartItem, cartItems: CartItem[]) {
  item.amount === 0;
  let listindex = cartItems.indexOf(item);
  cartItems.splice(listindex, 1);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  shoppingCartHtml(cartItems);
}

function getListFromLS() {
  let cartItems: CartItem[] = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );
  shoppingCartHtml(cartItems);
}

function shoppingCartHtml(cartItems: CartItem[]) {
  console.log("hello world");
  // elements for the hole cart

  let cartTag = document.getElementById(
    "shoppingcart-container"
  ) as HTMLDivElement;
  cartTag.innerHTML = "";
  let totalAmountTag = document.createElement("p");
  totalAmountTag.className = "totalamount";
  let itemsInCartTotal: number = 0;

  // a variable to be able to count

  let sum: number = 0;
  for (let i = 0; i < cartItems.length; i++) {
    sum = sum + cartItems[i].amount * cartItems[i].product.price;
    itemsInCartTotal = itemsInCartTotal + cartItems[i].amount;

    //create new element for each

    let containerTag = document.createElement("div");
    let titleTag = document.createElement("h3");
    let imgTag = document.createElement("img");
    let changeContainer = document.createElement("div");
    let amountTag = document.createElement("p");
    let increaseBtn = document.createElement("i");
    let reduceBtn = document.createElement("i");
    let priceTag = document.createElement("p");
    let deleteBtn = document.createElement("button");

    // innerhtml content

    titleTag.innerText = cartItems[i].product.name;

    imgTag.src = cartItems[i].product.img;
    imgTag.alt = cartItems[i].product.name;

    deleteBtn.innerHTML = "ta bort";
    containerTag.className = "shoppingcart__item";
    changeContainer.className = "shoppingcart__item__changecontainer";
    amountTag.innerHTML = cartItems[i].amount.toString();
    increaseBtn.classList.add("bi", "bi-plus-square");
    reduceBtn.classList.add("bi", "bi-dash-square");

    increaseBtn.addEventListener("click", () => {
      addMoreToCart(cartItems[i], cartItems);
    });

    reduceBtn.addEventListener("click", () => {
      reduceCart(cartItems[i], cartItems);
    });

    deleteBtn.classList.add("buttons");
    deleteBtn.addEventListener("click", () => {
      removeFromCart(cartItems[i], cartItems);
    });
    priceTag.innerHTML =
      (cartItems[i].amount * cartItems[i].product.price).toString() + " sek";

    //to display

    changeContainer.appendChild(reduceBtn);
    changeContainer.appendChild(amountTag);
    changeContainer.appendChild(increaseBtn);

    containerTag.appendChild(titleTag);
    containerTag.appendChild(imgTag);
    containerTag.appendChild(changeContainer);
    containerTag.appendChild(priceTag);
    containerTag.appendChild(deleteBtn);

    cartTag.appendChild(containerTag);
  }
  //to display total price
  totalAmountTag.innerHTML = "Totalt: " + sum.toString() + " sek";
  cartTag.appendChild(totalAmountTag);
  (document.getElementById("cart-total") as HTMLElement).innerHTML =
    itemsInCartTotal.toString();
}

getListFromLS();
console.log("start");
