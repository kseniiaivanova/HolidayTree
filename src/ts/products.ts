import { Product } from "./models/product_class";
import { productcatalog } from "./models/productcatalog";

function createHTML(productlist: Product[]) {
  for (let i: number = 0; i < productlist.length; i++) {
    let container: HTMLDivElement = document.createElement("div");
    let imgTag: HTMLImageElement = document.createElement("img");
    let title: HTMLHeadingElement = document.createElement("h3");
    let descr: HTMLParagraphElement = document.createElement("p");
    let price: HTMLParagraphElement = document.createElement("p");
    imgTag.src = productlist[i].img;
    title.innerHTML = productlist[i].name;
    price.innerHTML = productlist[i].price.toString();
    descr.innerHTML = productlist[i].desc;

    container.appendChild(imgTag);
    container.appendChild(title);
    container.appendChild(price);
    container.appendChild(descr);
    document.body.appendChild(container);
  }
}

createHTML(productcatalog);
