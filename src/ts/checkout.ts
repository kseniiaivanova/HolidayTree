import { CartItem } from "./models/CartItem";
import { Product } from "./models/Product";

export function addToCart(item: CartItem, cartItems: CartItem[]) {
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
  let listindex = cartItems.indexOf(item);
  cartItems.splice(listindex, 1);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  shoppingCartHtml(cartItems);
}

export function getListFromLS() {
  let cartItems: CartItem[] = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );
  shoppingCartHtml(cartItems);
}
export function shoppingCartHtml(cartItems: CartItem[]) {
  console.log("hello world");
  // elements for the hole cart

  let cartTag = document.getElementById("cart-container") as HTMLDivElement;
  cartTag.innerHTML = "";
  let totalAmountTag = document.createElement("p");
  totalAmountTag.className = "totalamount";

  // a variable to be able to count

  let sum: number = 0;
  for (let i = 0; i < cartItems.length; i++) {
    sum = sum + cartItems[i].amount * cartItems[i].product.price;

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
}

function choseCard () {
let radioOne: HTMLButtonElement = document.getElementById("card") as HTMLButtonElement;
let cardForm = document.createElement("form") as HTMLFormElement;
cardForm.innerHTML = "";
radioOne.addEventListener("change",()=> {

cardForm.innerHTML = "";
cardForm.classList.add("paycard");
let nameCard = document.createElement("input") as HTMLInputElement;
let nameLabelCard = document.createElement("label") as HTMLLabelElement;
nameLabelCard.innerHTML="Namn";
//nameCard.setAttribute("placeholder", "Namn");

let surnameCard = document.createElement("input") as HTMLInputElement;
let surnameCardLabel = document.createElement("label") as HTMLLabelElement;
surnameCardLabel.innerHTML="Efternamn";
//surnameCard.setAttribute("placeholder", "Efternamn");
let numberCard = document.createElement("input") as HTMLInputElement;
let numberCardLabel = document.createElement("label") as HTMLLabelElement;
numberCardLabel.innerHTML= "Kortnummer";
//numberCard.setAttribute("placeholder", "Kortnummer");
let dateCard = document.createElement("input") as HTMLInputElement;
let dateCardLabel = document.createElement("label") as HTMLLabelElement;
dateCardLabel.innerHTML = "MM/ÅÅ";
//dateCard.setAttribute("placeholder", "MM/ÅÅ");
let cvcCard = document.createElement("input") as HTMLInputElement;
let cvcCardLabel = document.createElement("label") as HTMLLabelElement;
cvcCardLabel.innerHTML = "CVC";
//cvcCard.setAttribute("placeholder", "CVC");
let cardCont: HTMLDivElement = document.getElementById("cardCont") as HTMLDivElement;
cardCont.appendChild(cardForm);
cardForm.appendChild(nameLabelCard);
cardForm.appendChild(nameCard);
cardForm.appendChild(surnameCardLabel);
cardForm.appendChild(surnameCard);
cardForm.appendChild(numberCardLabel);
cardForm.appendChild(numberCard);
cardForm.appendChild(dateCardLabel);
cardForm.appendChild(dateCard);
cardForm.appendChild(cvcCardLabel);
cardForm.appendChild(cvcCard);


});
};

choseCard();
getListFromLS();
console.log("start");

