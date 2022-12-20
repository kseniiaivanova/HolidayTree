function init() {
  let startButton = document.getElementById(
    "button-product"
  ) as HTMLButtonElement;
  startButton.addEventListener("click", () => {
    location.href = "products.html";
  });
}

init();
