import {
  checkout,
  closeCart,
  openCart,
  shoppingCartHtml,
} from "./shoppingcart";
import { CartItem } from "./models/CartItem";
import { Product } from "./models/Product";
import { productcatalog } from "./models/productcatalog";

function init() {
  openCart();
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

init();
