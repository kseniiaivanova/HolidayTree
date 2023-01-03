import { CartItem } from "./models/CartItem";

export function openCart() {
  let startButton = document.getElementById("openCart") as HTMLButtonElement;
  startButton.addEventListener("click", () => {
    let openSidebar = document.getElementById("mySidebar") as HTMLDivElement;
    openSidebar.style.width = "250px";
  });
}
export function shoppingCartHtml(cartItems: CartItem[]) {
  let cartTag = document.getElementById(
    "shoppingcart-container"
  ) as HTMLDivElement;
  cartTag.innerHTML = "";
  let totalAmountTag = document.createElement("p");
  totalAmountTag.className = "totalamount";

  let sum: number = 0;
  let itemsInCartTotal: number = 0;
  for (let i = 0; i < cartItems.length; i++) {
    sum = sum + cartItems[i].amount * cartItems[i].product.price;

    itemsInCartTotal = itemsInCartTotal + cartItems[i].amount;

    let containerTag = document.createElement("div");
    let titleTag = document.createElement("h3");
    let imgTag = document.createElement("img");
    let changeContainer = document.createElement("div");
    let amountTag = document.createElement("p");
    let increaseBtn = document.createElement("i");
    let reduceBtn = document.createElement("i");
    let priceTag = document.createElement("p");
    let deleteBtn = document.createElement("button");

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

  totalAmountTag.innerHTML = "Totalt: " + sum.toString() + " sek";
  cartTag.appendChild(totalAmountTag);
  console.log(itemsInCartTotal);
  let iconTotal = document.getElementById("cart-total") as HTMLElement;
  if (itemsInCartTotal > 0) {
    iconTotal.innerHTML = itemsInCartTotal.toString();
    iconTotal.classList.remove("displaynone");
  }
  if (itemsInCartTotal < 1) {
    iconTotal.classList.add("displaynone");
  }
}
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
  let listIndex = cartItems.indexOf(item);
  cartItems.splice(listIndex, 1);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  shoppingCartHtml(cartItems);
}
export function closeCart() {
  let closeButton = document.getElementById("closeCart") as HTMLButtonElement;
  closeButton.addEventListener("click", () => {
    let closeSidebar = document.getElementById("mySidebar") as HTMLDivElement;
    closeSidebar.style.width = "0";
  });
}
export function checkout() {
  let checkoutButton = document.getElementById(
    "button-checkout"
  ) as HTMLButtonElement;
  checkoutButton.addEventListener("click", () => {
    location.href = "./../pages/checkout.html";
  });
}
