/* import { Product } from "./models/product_class";

let shoppingCartItems: Product[] = [
  new Product(
    "Rödgran",
    "En färgstark gran med ypperlig form och kådadoft synonym med jul.",
    399,
    "https://www.plantagen.se/dw/image/v2/BCMR_PRD/on/demandware.static/-/Sites-inriver-catalog/default/dwdfe75a40/images/large/527834-picea-abies-100-140cm-527834-5708145002297.jpg?sh=1236&sfrm=jpg",
    "rödgran"
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

  for (let i = 0; i < shoppingCartItems.length; i++) {
    let titleTag = document.createElement("h3");
    let amountTag = document.createElement("p");
    let increaseBtn = document.createElement("i");
    let reduceBtn = document.createElement("i");
    let containerTag = document.createElement("div");
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "remove";
    titleTag.innerText = shoppingCartItems[i].name;
    containerTag.className = "cart__item";
    containerTag.appendChild(titleTag);
    containerTag.appendChild(amountTag);
    containerTag.appendChild(deleteBtn);
    containerTag.appendChild(increaseBtn);
    containerTag.appendChild(reduceBtn);

    increaseBtn.classList.add("bi", "bi-plus-square");
    reduceBtn.classList.add("bi", "bi-dash-square");

    deleteBtn.classList.add("buttons");
    deleteBtn.addEventListener("click", () => {
      removeFromCart(shoppingCartItems[i]);
    });

    cartTag.appendChild(containerTag);
  }
}

shoppingCartHtml();
 */
