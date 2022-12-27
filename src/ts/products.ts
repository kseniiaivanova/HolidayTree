import { CartItem } from "./models/CartItem";
import { Product } from "./models/Product";
import { productcatalog } from "./models/productcatalog";

// let chosenProducts: CartItem[] = JSON.parse(
//   localStorage.getItem("cartItems") || "[]"
// );

function init() {
  OpenCart();
  closeCart();
  checkout();
  getListFromLS();
  console.log("start");

  // document.getElementById("price-btn")?.addEventListener("click", ()=>{sortByPrice(productcatalog);});
}

function sortByCategory(products: Product[]) {
  products.sort((a, b) => {
    let fa = a.type.toLowerCase(),
      fb = b.type.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  init();
}

// function sortByPrice(products:Product[]){

// };

function createHTML(productlist: Product[], chosenProducts: CartItem[]) {
  let productDiv: HTMLDivElement = document.getElementById(
    "product_div"
  ) as HTMLDivElement;

  productDiv.innerHTML = "";

  for (let i: number = 0; i < productlist.length; i++) {
    let container: HTMLDivElement = document.createElement("div");
    let imgTag: HTMLImageElement = document.createElement("img");
    let title: HTMLHeadingElement = document.createElement("h3");
    let descr: HTMLParagraphElement = document.createElement("p");
    let price: HTMLParagraphElement = document.createElement("h4");
    let addButton: HTMLButtonElement = document.createElement("button");
    imgTag.src = productlist[i].img;
    title.innerHTML = productlist[i].name;
    price.innerHTML = productlist[i].price.toString() + " SEK";
    descr.innerHTML = productlist[i].desc;
    addButton.innerHTML = "Lägg till";
    addButton.className = "buttons";

    imgTag.className = "prodImg";

    imgTag.setAttribute("data-bs-toggle", "modal");
    imgTag.setAttribute("data-bs-target", "#exampleModal");

    imgTag.addEventListener("click", () => {
      handleClick(productlist[i], chosenProducts);
    });

    addButton.addEventListener("click", () => {
      addToCart(productlist[i], chosenProducts);
    });

    container.appendChild(imgTag);
    container.appendChild(title);
    container.appendChild(price);
    container.appendChild(descr);
    container.appendChild(addButton);
    productDiv.appendChild(container);
  }
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
      // let setProducts = JSON.stringify(chosenProducts);
      // localStorage.setItem("cartItems", setProducts);
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

function getListFromLS() {
  let cartItems: CartItem[] = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );
  createHTML(productcatalog, cartItems);
  shoppingCartHtml(cartItems);
  document.getElementById("red-spruce-btn")?.addEventListener("click", () => {
    let type: string = "rödgran";
    createHTMLByCategory(productcatalog, cartItems, type);
  });
  document
    .getElementById("norway-spruce-btn")
    ?.addEventListener("click", () => {
      let type: string = "kungsgran";
      createHTMLByCategory(productcatalog, cartItems, type);
    });
  document
    .getElementById("platic-spruce-btn")
    ?.addEventListener("click", () => {
      let type: string = "plastgran";
      createHTMLByCategory(productcatalog, cartItems, type);
    });
  document.getElementById("all-spruce-btn")?.addEventListener("click", () => {
    createHTML(productcatalog, cartItems);
  });
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
}
init();

function createHTMLByCategory(
  productlist: Product[],
  chosenProducts: CartItem[],
  type: string
) {
  let productDiv: HTMLDivElement = document.getElementById(
    "product_div"
  ) as HTMLDivElement;

  productDiv.innerHTML = "";

  for (let i: number = 0; i < productlist.length; i++) {
    if (productlist[i].type === type) {
      let container: HTMLDivElement = document.createElement("div");
      let imgTag: HTMLImageElement = document.createElement("img");
      let title: HTMLHeadingElement = document.createElement("h3");
      let descr: HTMLParagraphElement = document.createElement("p");
      let price: HTMLParagraphElement = document.createElement("h4");
      let addButton: HTMLButtonElement = document.createElement("button");
      imgTag.src = productlist[i].img;
      title.innerHTML = productlist[i].name;
      price.innerHTML = productlist[i].price.toString() + " SEK";
      descr.innerHTML = productlist[i].desc;
      addButton.innerHTML = "Lägg till";
      addButton.className = "buttons";

      imgTag.className = "prodImg";

      imgTag.setAttribute("data-bs-toggle", "modal");
      imgTag.setAttribute("data-bs-target", "#exampleModal");

      imgTag.addEventListener("click", () => {
        handleClick(productlist[i], chosenProducts);
      });

      addButton.addEventListener("click", () => {
        addToCart(productlist[i], chosenProducts);
      });

      container.appendChild(imgTag);
      container.appendChild(title);
      container.appendChild(price);
      container.appendChild(descr);
      container.appendChild(addButton);
      productDiv.appendChild(container);
    }
  }
}
