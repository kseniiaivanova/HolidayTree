import { CartItem } from "./models/CartItem";
import { Product } from "./models/Product";

function init() {
  getListFromLS();
  console.log("start");
  choosePayment();
}

function addToCart(item: CartItem, cartItems: CartItem[]) {
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

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  getListFromLS();
}

function removeFromCart(item: CartItem, cartItems: CartItem[]) {
  let listindex = cartItems.indexOf(item);
  cartItems.splice(listindex, 1);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  getListFromLS();
}

function getListFromLS() {
  let cartItems: CartItem[] = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );
  if (cartItems.length < 1) {
    let cartTag = document.getElementById("cart-container") as HTMLDivElement;
    cartTag.innerHTML = "Din varukorg är tom";
    let aTag = document.createElement("a");

    aTag.href = "products.html";

    aTag.innerHTML = " Tillbaka till produkter";
    cartTag.appendChild(aTag);
  } else {
    shoppingCartHtml(cartItems);
  }
}
function shoppingCartHtml(cartItems: CartItem[]) {
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

    deleteBtn.innerHTML = "ta bort";
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

function chooseCard() {
  let cardForm = document.createElement("form") as HTMLFormElement;
  let billCont: HTMLDivElement = document.getElementById(
    "bill"
  ) as HTMLDivElement;
  billCont.innerHTML = " ";

  cardForm.innerHTML = "";
  cardForm.classList.add("forms");
  let nameCard = document.createElement("input") as HTMLInputElement;

  nameCard.setAttribute("type", "text");
  nameCard.setAttribute("minlength", "4");

  nameCard.setAttribute("required", "true");
  nameCard.setAttribute("name", "FullName");
  nameCard.setAttribute("placeholder", "Förnamn och Efternamn");

  let numberCard = document.createElement("input") as HTMLInputElement;

  numberCard.setAttribute("type", "tel");
  numberCard.setAttribute("pattern", "[0-9]{16}");
  numberCard.setAttribute("title", "ange 16 siffror!");
  numberCard.setAttribute("required", "true");
  numberCard.setAttribute("name", "CardNum");
  numberCard.setAttribute("placeholder", "Kortnummer");

  let dateCard = document.createElement("input") as HTMLInputElement;

  dateCard.setAttribute("type", "text");
  dateCard.setAttribute("minlength", "5");
  dateCard.setAttribute("maxlength", "5");
  dateCard.setAttribute("required", "true");
  dateCard.setAttribute("name", "CardDate");
  dateCard.setAttribute("placeholder", "MM/ÅÅ");

  let cvcCard = document.createElement("input") as HTMLInputElement;
  cvcCard.setAttribute("placeholder", "CVC");

  cvcCard.setAttribute("type", "tel");
  cvcCard.setAttribute("pattern", "[0-9]{3}");
  cvcCard.setAttribute("title", "ange 3 siffror!");
  cvcCard.setAttribute("required", "true");
  cvcCard.setAttribute("name", "CardCvc");

  let submit = document.createElement("input") as HTMLInputElement;
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Slutför köp");
  submit.classList.add("submit-button");
  nameCard.classList.add("inputs");
  numberCard.classList.add("inputs");
  dateCard.classList.add("inputs");
  cvcCard.classList.add("inputs");

  let cardCont: HTMLDivElement = document.getElementById(
    "cardCont"
  ) as HTMLDivElement;
  cardCont.appendChild(cardForm);

  cardForm.appendChild(nameCard);

  cardForm.appendChild(numberCard);

  cardForm.appendChild(dateCard);

  cardForm.appendChild(cvcCard);
  cardForm.appendChild(submit);

  cardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    doneHtml();
    console.log("tack för ditt köp");
  });
}

function choosePayment() {
  let radioOne: HTMLButtonElement = document.getElementById(
    "card"
  ) as HTMLButtonElement;
  radioOne.addEventListener("change", () => {
    chooseCard();
  });
  let bill = document.getElementById("faktura") as HTMLInputElement;
  bill.addEventListener("change", () => {
    billForm();

    console.log("du klickade");
  });
}

function billForm() {
  let cardForm: HTMLFormElement = document.getElementById(
    "cardCont"
  ) as HTMLFormElement;
  cardForm.innerHTML = "";
  let billCont: HTMLDivElement = document.getElementById(
    "bill"
  ) as HTMLDivElement;
  billCont.innerHTML = "";
  let form = document.createElement("form") as HTMLFormElement;
  let inputName = document.createElement("input") as HTMLInputElement;

  inputName.setAttribute("type", "text");
  inputName.setAttribute("required", "true");
  inputName.setAttribute("name", "FullName");
  inputName.setAttribute("placeholder", "Förnamn och Efternamn");
  //pcode number
  let pCode = document.createElement("input") as HTMLInputElement;

  pCode.setAttribute("type", "tel");
  pCode.setAttribute("required", "true");
  pCode.setAttribute("title", "ange 10 siffror!");
  pCode.setAttribute("number", "Personnummer");
  pCode.setAttribute("placeholder", "Personnummer");
  pCode.setAttribute("pattern", "[0-9]{10}");
  //email
  let email = document.createElement("input") as HTMLInputElement;

  email.setAttribute("type", "email");
  email.setAttribute("required", "true");
  email.setAttribute("text", "");
  email.setAttribute("placeholder", "Email Adress");
  //submit button
  let submit = document.createElement("input") as HTMLInputElement;
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Slutför köp");
  //styling
  form.classList.add("forms");
  inputName.classList.add("inputs");
  pCode.classList.add("inputs");
  email.classList.add("inputs");
  submit.classList.add("submit-button");
  //create HTML
  form.appendChild(inputName);
  form.appendChild(pCode);
  form.appendChild(email);
  form.appendChild(submit);
  billCont.appendChild(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    doneHtml();
    console.log("tack för ditt köp");
  });
}

function doneHtml() {
  let main = document.getElementById("main") as HTMLDivElement;
  main.innerHTML = "";
  let hTag = document.createElement("h3") as HTMLHeadingElement;
  hTag.innerText = "Tack för ditt köp!";
  localStorage.clear();
  main.appendChild(hTag);
}

init();
