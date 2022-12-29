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

function chooseCard () {
let radioOne: HTMLButtonElement = document.getElementById("card") as HTMLButtonElement;
let cardForm = document.createElement("form") as HTMLFormElement;

radioOne.addEventListener("change",()=> {
  

cardForm.innerHTML = "";
cardForm.classList.add("forms");
let nameCard = document.createElement("input") as HTMLInputElement;
nameCard.required;
/* let nameLabelCard = document.createElement("label") as HTMLLabelElement;
nameLabelCard.innerHTML="Namn"; */
nameCard.setAttribute("placeholder", "Namn");

let surnameCard = document.createElement("input") as HTMLInputElement;
surnameCard.required;
/* let surnameCardLabel = document.createElement("label") as HTMLLabelElement;
surnameCardLabel.innerHTML="Efternamn"; */
surnameCard.setAttribute("placeholder", "Efternamn");
let numberCard = document.createElement("input") as HTMLInputElement;
numberCard.required;
/* let numberCardLabel = document.createElement("label") as HTMLLabelElement;
numberCardLabel.innerHTML= "Kortnummer"; */
numberCard.setAttribute("placeholder", "Kortnummer");
let dateCard = document.createElement("input") as HTMLInputElement;
dateCard.required;
/* let dateCardLabel = document.createElement("label") as HTMLLabelElement;
dateCardLabel.innerHTML = "MM/ÅÅ"; */
dateCard.setAttribute("placeholder", "MM/ÅÅ");
let cvcCard = document.createElement("input") as HTMLInputElement;
/* let cvcCardLabel = document.createElement("label") as HTMLLabelElement;
cvcCardLabel.innerHTML = "CVC"; */
cvcCard.setAttribute("placeholder", "CVC");
let submit = document.createElement("input") as HTMLInputElement;
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Slutför köp");
  submit.classList.add("submit-button");

let cardCont: HTMLDivElement = document.getElementById("cardCont") as HTMLDivElement;
cardCont.appendChild(cardForm);
//cardForm.appendChild(nameLabelCard);
cardForm.appendChild(nameCard);
//cardForm.appendChild(surnameCardLabel);
cardForm.appendChild(surnameCard);
//cardForm.appendChild(numberCardLabel);
cardForm.appendChild(numberCard);
//cardForm.appendChild(dateCardLabel);
cardForm.appendChild(dateCard);
//cardForm.appendChild(cvcCardLabel);
cardForm.appendChild(cvcCard);
cardForm.appendChild(submit);

submit.addEventListener("click", () => {
  doneHtml();
  console.log("tack för ditt köp");
});



});
};

function payBill() {

  let bill = document.getElementById("faktura") as HTMLDivElement;
  bill.addEventListener("change", () => {
    createForm();
    
    console.log("du klickade");
  });
}

payBill();

function createForm() {

  let cardForm: HTMLFormElement = document.querySelector("form") as HTMLFormElement;
  cardForm.innerHTML = "";
  let billCont: HTMLDivElement = document.getElementById("bill") as HTMLDivElement;
  let form = document.createElement("form") as HTMLFormElement;
  // form.setAttribute("method", "post");
  // form.setAttribute("action", "submit");
  //full name input
  let inputName = document.createElement("input") as HTMLInputElement;
  inputName.required;
  inputName.setAttribute("type", "text");
  inputName.setAttribute("name", "FullName");
  inputName.setAttribute("placeholder", "Förnamn och Efternamn");
  //pcode number
  let pCode = document.createElement("input") as HTMLInputElement;
  pCode.required;
  pCode.setAttribute("type", "number");
  pCode.setAttribute("number", "Personnummber");
  pCode.setAttribute("placeholder", "Person Nummer");
  //email
  let email = document.createElement("input") as HTMLInputElement;
  email.required;
  email.setAttribute("type", "email");
  email.setAttribute("text", "emailadress");
  email.setAttribute("placeholder", "Email Adress");
  //submit button
  let submit = document.createElement("input") as HTMLInputElement;
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Slutför köp");
  //styling
  form.classList.add("forms");
  inputName.classList.add("inputs");
  // pCode.classList.add("inputs");
  // email.classList.add("inputs");
  submit.classList.add("submit-button");
  //create HTML
  form.appendChild(inputName);
  form.appendChild(pCode);
  form.appendChild(email);
  form.appendChild(submit);
  billCont.appendChild(form);

  submit.addEventListener("click", () => {
    doneHtml();
    console.log("tack för ditt köp");
  });
}

function doneHtml() {
  let hTag = document.createElement("h3") as HTMLHeadingElement;
  hTag.innerText = "Tack för ditt köp!";
  document.body.appendChild(hTag);
}


chooseCard();
getListFromLS();
console.log("start");

