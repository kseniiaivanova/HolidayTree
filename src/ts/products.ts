import { CartItem } from "./models/CartItem";
import { Product } from "./models/Product";
import { productcatalog } from "./models/productcatalog";

function init() {
  OpenCart();
  closeCart();
  checkout();
  let cartItems: CartItem[] = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );
  createHTML(productcatalog, cartItems, "all");
  shoppingCartHtml(cartItems);
}

function createHTML(
  productlist: Product[],
  chosenProducts: CartItem[],
  type: string
) {
  let productDiv: HTMLDivElement = document.getElementById(
    "product_div"
  ) as HTMLDivElement;

  productDiv.innerHTML = "";

  for (let i: number = 0; i < productlist.length; i++) {
    if (productlist[i].type === type || type === "all") {
      let container: HTMLDivElement = document.createElement("div");
      let imgContainer: HTMLDivElement = document.createElement("div");
      let imgTag: HTMLImageElement = document.createElement("img");
      let title: HTMLHeadingElement = document.createElement("h3");
      let descr: HTMLParagraphElement = document.createElement("p");
      let price: HTMLParagraphElement = document.createElement("h4");
      let addButton: HTMLButtonElement = document.createElement("button");
      imgTag.src = productlist[i].img;
      imgTag.alt = productlist[i].name;
      container.className = "product-item";
      title.innerHTML = productlist[i].name;
      price.innerHTML = productlist[i].price.toString() + " SEK";
      descr.innerHTML = productlist[i].desc;
      addButton.innerHTML = "Lägg till";
      addButton.className = "buttons";

      imgTag.className = "prodImg";
      imgContainer.className = "img-container";

      imgTag.setAttribute("data-bs-toggle", "modal");
      imgTag.setAttribute("data-bs-target", "#exampleModal");

      imgTag.addEventListener("click", () => {
        handleClick(productlist[i], chosenProducts);
      });

      addButton.addEventListener("click", () => {
        addToCart(productlist[i], chosenProducts);
      });

      imgContainer.appendChild(imgTag);

      container.appendChild(imgContainer);
      container.appendChild(title);
      container.appendChild(price);
      container.appendChild(descr);
      container.appendChild(addButton);
      productDiv.appendChild(container);
    }
  }
  document.getElementById("red-spruce-btn")?.addEventListener("click", () => {
    let type: string = "rödgran";
    createHTML(productcatalog, chosenProducts, type);
  });
  document
    .getElementById("norway-spruce-btn")
    ?.addEventListener("click", () => {
      let type: string = "kungsgran";
      createHTML(productcatalog, chosenProducts, type);
    });
  document
    .getElementById("platic-spruce-btn")
    ?.addEventListener("click", () => {
      let type: string = "plastgran";
      createHTML(productcatalog, chosenProducts, type);
    });
  document.getElementById("all-spruce-btn")?.addEventListener("click", () => {
    createHTML(productcatalog, chosenProducts, "all");
  });
}

function handleClick(product: Product, chosenProducts: CartItem[]) {
  console.log("Du klickade på", product.id);
  let modalBody: HTMLDivElement = document.getElementById(
    "modal-body"
  ) as HTMLDivElement;
  modalBody.innerHTML = "";
  let modalTitle: HTMLHeadingElement = document.getElementById(
    "exampleModalLabel"
  ) as HTMLHeadingElement;
  let imgTag: HTMLImageElement = document.createElement("img");
  let detailDesc: HTMLParagraphElement = document.createElement("p");
  let price: HTMLParagraphElement = document.createElement("h4");
  let addButton: HTMLButtonElement = document.createElement("button");
  imgTag.className = "prodImgModal";
  imgTag.src = product.img;
  modalTitle.innerHTML = product.name;
  price.innerHTML = product.price.toString() + " SEK";
  detailDesc.innerHTML = product.detailedDesc;
  addButton.innerHTML = "Lägg till";
  addButton.className = "buttons";

  addButton.addEventListener("click", () => {
    addToCart(product, chosenProducts);
  });

  modalBody.appendChild(imgTag);
  modalBody.appendChild(detailDesc);
  modalBody.appendChild(price);
  modalBody.appendChild(addButton);
}

function OpenCart() {
  let startButton = document.getElementById("openCart") as HTMLButtonElement;
  startButton.addEventListener("click", () => {
    let openSidebar = document.getElementById("mySidebar") as HTMLDivElement;
    openSidebar.style.width = "250px";
    let openMain = document.getElementById("main") as HTMLDivElement;
    openMain.style.marginLeft = "250px";
  });
}

function closeCart() {
  let closeButton = document.getElementById("closeCart") as HTMLButtonElement;
  closeButton.addEventListener("click", () => {
    let closeSidebar = document.getElementById("mySidebar") as HTMLDivElement;
    closeSidebar.style.width = "0";
    let closeMain = document.getElementById("main") as HTMLDivElement;
    closeMain.style.marginLeft = "0";
  });
}

function checkout() {
  let checkoutButton = document.getElementById(
    "button-checkout"
  ) as HTMLButtonElement;
  checkoutButton.addEventListener("click", () => {
    location.href = "checkout.html";
  });
}

function addToCart(item: Product, cartItems: CartItem[]) {
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].product.id === item.id) {
      cartItems[i].amount++;
      shoppingCartHtml(cartItems);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return;
    }
  }

  let newCartItem: CartItem = new CartItem(item, 0);

  newCartItem.amount++;

  console.log(cartItems);
  cartItems.push(newCartItem);

  shoppingCartHtml(cartItems);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
  let listindex = cartItems.indexOf(item);
  cartItems.splice(listindex, 1);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  shoppingCartHtml(cartItems);
}

function shoppingCartHtml(cartItems: CartItem[]) {
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

  (document.getElementById("cart-total") as HTMLLIElement).value =
    itemsInCartTotal;
}

init();
