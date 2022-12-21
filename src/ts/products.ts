import { Product } from "./models/product_class";
import { productcatalog } from "./models/productcatalog";

function createHTML(productlist: Product[]) {
  for (let i: number = 0; i < productlist.length; i++) {
    let productDiv: HTMLDivElement = document.getElementById(
      "product_div"
    ) as HTMLDivElement;
    let container: HTMLDivElement = document.createElement("div");
    let imgTag: HTMLImageElement = document.createElement("img");
    let title: HTMLHeadingElement = document.createElement("h3");
    let descr: HTMLParagraphElement = document.createElement("p");
    let price: HTMLParagraphElement = document.createElement("p");
    let addButton: HTMLButtonElement = document.createElement("button");
    imgTag.src = productlist[i].img;
    title.innerHTML = productlist[i].name;
    price.innerHTML = productlist[i].price.toString();
    descr.innerHTML = productlist[i].desc;
    addButton.innerHTML = "Add to cart";

    container.appendChild(imgTag);
    container.appendChild(title);
    container.appendChild(price);
    container.appendChild(descr);
    container.appendChild(addButton);
    productDiv.appendChild(container);
  }
}

createHTML(productcatalog);

const handleClick = (product: Product) => {
  console.log("Du klickade på", product.id);
};
