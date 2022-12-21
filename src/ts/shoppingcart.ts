import { Product } from "./models/product_class";

let shoppingCartItems: Product[] = [
  new Product(
    "Kungsgran",
    "En tät och ståtlig gran med oöverträfflig livslängd och svag citrusdoft.",
    549,
    "https://svenskagranar.se/wp-content/uploads/2021/09/produkt_kungsgran-1024x683.webp",
    "kungsgran",
    "023",
    "lorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    0
  ),
];

function addToCart(item: Product) {
  shoppingCartItems.push(item);
  shoppingCartHtml();
}

function removeFromCart(item: Product) {
  let listindex = shoppingCartItems.indexOf(item);
  shoppingCartItems.splice(listindex, 1);
  shoppingCartHtml();
}

function shoppingCartHtml() {
  console.log("hello world");

  localStorage.setItem("cartlist", JSON.stringify(shoppingCartItems));
  let cartTag = document.getElementById("cart-container") as HTMLDivElement;
  cartTag.innerHTML = "";
  let totalAmountTag = document.createElement("p");
  totalAmountTag.className = "totalamount";

  let sum: number = 0;

  for (let i = 0; i < shoppingCartItems.length; i++) {
    sum = sum + shoppingCartItems[i].price;

    let titleTag = document.createElement("h3");
    let amountTag = document.createElement("p");
    let increaseBtn = document.createElement("i");
    let reduceBtn = document.createElement("i");
    let containerTag = document.createElement("div");
    let changeContainer = document.createElement("div");
    let imgTag = document.createElement("img");
    let deleteBtn = document.createElement("button");

    imgTag.src = shoppingCartItems[i].img;
    deleteBtn.innerHTML = "remove";
    titleTag.innerText = shoppingCartItems[i].name;
    containerTag.className = "cart__item";
    changeContainer.className = "cart__item__changecontainer";
    amountTag.innerHTML = shoppingCartItems[i].amount.toString();
    changeContainer.appendChild(increaseBtn);
    changeContainer.appendChild(amountTag);
    changeContainer.appendChild(reduceBtn);
    containerTag.appendChild(titleTag);
    containerTag.appendChild(imgTag);
    containerTag.appendChild(changeContainer);
    containerTag.appendChild(deleteBtn);

    increaseBtn.classList.add("bi", "bi-plus-square");
    reduceBtn.classList.add("bi", "bi-dash-square");

    deleteBtn.classList.add("buttons");
    deleteBtn.addEventListener("click", () => {
      removeFromCart(shoppingCartItems[i]);
    });

    cartTag.appendChild(containerTag);
  }
  totalAmountTag.innerHTML = "Totalt: " + sum.toString() + " sek";
  cartTag.appendChild(totalAmountTag);
}

shoppingCartHtml();
