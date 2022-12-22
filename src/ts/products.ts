import { Product } from "./models/product_class";
import { productcatalog } from "./models/productcatalog";
/* import { addToCart } from "./shoppingcart"; */
/* import { addToCart, shoppingCartItems } from "./shoppingcart"; */

//shoppingCartItems;

let chosenProducts: Product[] = [];

function createHTML(productlist: Product[]) {
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
    addButton.innerHTML = "Add to cart";
    addButton.className = "buttons";

    imgTag.className = "prodImg";

    container.setAttribute("data-bs-toggle", "modal");
    container.setAttribute("data-bs-target", "#exampleModal");

    imgTag.addEventListener("click", () => {
      handleClick(productlist[i]);
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

createHTML(productcatalog);

function handleClick(product: Product) {
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
  addButton.innerHTML = "Add to cart";
  addButton.className = "buttons";

  addButton.addEventListener("click", () => {
    addToCart(product, chosenProducts);
  });

  modalBody.appendChild(imgTag);
  modalBody.appendChild(detailDesc);
  modalBody.appendChild(price);
  modalBody.appendChild(addButton);
}

function addToCart(product: Product, chosenProducts: Product[]) {
  //for (let i: number = 0; i < chosenProducts.length; i++)

  if (product.amount < 1) {
    chosenProducts.push(product);

    for (let i: number = 0; i < chosenProducts.length; i++) {
      if (chosenProducts[i] === product) {
        chosenProducts[i].amount++;
      }
    }
  } else {
    for (let i: number = 0; i < chosenProducts.length; i++) {
      if (chosenProducts[i] === product) {
        chosenProducts[i].amount++;
      }
    }
  }

  console.log(product.name);

  /* if (cartItems !== null) {
    product.amount += 1;
    console.log(product.amount);
  } else {
    product.amount = 1;
    console.log("hej");
  } */
  let setProducts = JSON.stringify(chosenProducts);
  localStorage.setItem("cartItems", setProducts);
}
