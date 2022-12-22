import { Product } from "./models/product_class";

export function addToCart(item: Product, cartItems: Product[]) {
  for (let i = 0; i < cartItems.length; i++) console.log(cartItems);
  if (item.amount < 1) {
    cartItems.push(item);
  }
  item.amount++;

  shoppingCartHtml(cartItems);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function reduceCart(item: Product, cartItems: Product[]) {
  item.amount--;
  if (item.amount < 1) {
    let listindex = cartItems.indexOf(item);
    cartItems.splice(listindex, 1);
  }
  shoppingCartHtml(cartItems);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function removeFromCart(item: Product, cartItems: Product[]) {
  let listindex = cartItems.indexOf(item);
  cartItems.splice(listindex, 1);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  shoppingCartHtml(cartItems);
}

function getListFromLS() {
  let cartItems: Product[] = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );
  shoppingCartHtml(cartItems);
}
export function shoppingCartHtml(cartItems: Product[]) {
  console.log("hello world");
  // elements for the hole cart

  let cartTag = document.getElementById("cart-container") as HTMLDivElement;
  cartTag.innerHTML = "";
  let totalAmountTag = document.createElement("p");
  totalAmountTag.className = "totalamount";

  // a variable to be able to count

  let sum: number = 0;
  for (let i = 0; i < cartItems.length; i++) {
    sum = sum + cartItems[i].amount * cartItems[i].price;

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

    titleTag.innerText = cartItems[i].name;

    imgTag.src = cartItems[i].img;
    imgTag.alt = cartItems[i].name;

    deleteBtn.innerHTML = "remove";
    containerTag.className = "cart__item";
    changeContainer.className = "cart__item__changecontainer";
    amountTag.innerHTML = cartItems[i].amount.toString();
    increaseBtn.classList.add("bi", "bi-plus-square");
    reduceBtn.classList.add("bi", "bi-dash-square");

    increaseBtn.addEventListener("click", () => {
      addToCart(cartItems[i], cartItems);
    });

    reduceBtn.addEventListener("click", () => {
      reduceCart(cartItems[i], cartItems);
    });

    deleteBtn.classList.add("buttons");
    deleteBtn.addEventListener("click", () => {
      removeFromCart(cartItems[i], cartItems);
    });
    priceTag.innerHTML =
      (cartItems[i].amount * cartItems[i].price).toString() + "sek";

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
}

getListFromLS();
