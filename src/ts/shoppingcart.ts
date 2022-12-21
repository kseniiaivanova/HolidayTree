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
    1
  ),
];

let newItem: Product = new Product(
  "Kungsgran",
  "En tät och ståtlig gran med oöverträfflig livslängd och svag citrusdoft.",
  549,
  "https://svenskagranar.se/wp-content/uploads/2021/09/produkt_kungsgran-1024x683.webp",
  "kungsgran",
  "023",
  "lorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
  0
);

addToCart(newItem);

function addToCart(item: Product) {
  item.amount++;
  if (item.amount < 2) {
    shoppingCartItems.push(item);
  }
  shoppingCartHtml();
}

function removeFromCart(item: Product) {
  item.amount--;
  if (item.amount < 1) {
    let listindex = shoppingCartItems.indexOf(item);
    shoppingCartItems.splice(listindex, 1);
  }
  shoppingCartHtml();
}

function shoppingCartHtml() {
  console.log("hello world");
  // elements for the hole cart

  localStorage.setItem("cartlist", JSON.stringify(shoppingCartItems));
  let cartTag = document.getElementById("cart-container") as HTMLDivElement;
  cartTag.innerHTML = "";
  let totalAmountTag = document.createElement("p");
  totalAmountTag.className = "totalamount";

  // a variable to be able to count

  let sum: number = 0;
  for (let i = 0; i < shoppingCartItems.length; i++) {
    sum = sum + shoppingCartItems[i].amount * shoppingCartItems[i].price;

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

    titleTag.innerText = shoppingCartItems[i].name;

    imgTag.src = shoppingCartItems[i].img;
    imgTag.alt = shoppingCartItems[i].name;

    deleteBtn.innerHTML = "remove";
    containerTag.className = "cart__item";
    changeContainer.className = "cart__item__changecontainer";
    amountTag.innerHTML = shoppingCartItems[i].amount.toString();
    increaseBtn.classList.add("bi", "bi-plus-square");
    reduceBtn.classList.add("bi", "bi-dash-square");

    increaseBtn.addEventListener("click", () => {
      addToCart(shoppingCartItems[i]);
    });

    reduceBtn.addEventListener("click", () => {
      removeFromCart(shoppingCartItems[i]);
    });

    deleteBtn.classList.add("buttons");
    deleteBtn.addEventListener("click", () => {
      removeFromCart(shoppingCartItems[i]);
    });
    priceTag.innerHTML =
      (shoppingCartItems[i].amount * shoppingCartItems[i].price).toString() +
      "sek";

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

shoppingCartHtml();
