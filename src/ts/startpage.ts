function init() {
  let startButton = document.getElementById(
    "button-product"
  ) as HTMLButtonElement;
  startButton.addEventListener("click", () => {
    location.href = "products.html";
  });
}

init();

function OpenCart() {
  let startButton = document.getElementById("openCart") as HTMLButtonElement;
  startButton.addEventListener("click", () => {
    let openSidebar = document.getElementById("mySidebar") as HTMLDivElement;
    openSidebar.style.width = "250px";
    let openMain = document.getElementById("main") as HTMLDivElement;
    openMain.style.marginLeft = "250px";
  });
}

OpenCart();

function closeCart() {
  let closeButton = document.getElementById("closeCart") as HTMLButtonElement;
  closeButton.addEventListener("click", () => {
    let closeSidebar = document.getElementById("mySidebar") as HTMLDivElement;
    closeSidebar.style.width = "0";
    let closeMain = document.getElementById("main") as HTMLDivElement;
    closeMain.style.marginLeft = "0";
  });
}

closeCart();
