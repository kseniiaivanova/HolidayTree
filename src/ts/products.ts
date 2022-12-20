import { Product } from "./models/product_class";
import { productcatalog } from "./models/productcatalog";

function createHTML(productlist: Product[]) {
  for (let i: number = 0; i < productlist.length; i++) {
    let container: HTMLDivElement = document.createElement("div");
    let imgTag: HTMLImageElement = document.createElement("img");
    let price: HTMLParagraphElement = document.createElement("p");
    imgTag.src = productlist[i].img;
    price.innerHTML = productlist[i].price.toString();

    container.appendChild(imgTag);
    container.appendChild(price);
    document.body.appendChild(container);
  }
}

createHTML(productcatalog);
