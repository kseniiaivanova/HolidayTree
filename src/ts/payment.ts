function payment() {
  let bill = document.getElementById("faktura") as HTMLDivElement;
  bill.addEventListener("click", () => {
    createForm();
    console.log("du klickade");
  });
}

payment();
let form = document.createElement("form") as HTMLFormElement;

function createForm() {
  // form.setAttribute("method", "post");
  form.setAttribute("action", "submit");
  //full name input
  let inputName = document.createElement("input") as HTMLInputElement;
  inputName.required;
  inputName.setAttribute("type", "text");
  inputName.setAttribute("name", "FullName");
  inputName.setAttribute("placeholder", "Förnamn och Efternamn");
  //pcode number
  let pCode = document.createElement("input") as HTMLInputElement;
  pCode.required;
  pCode.setAttribute("type", "number");
  pCode.setAttribute("number", "Personnummber");
  pCode.setAttribute("placeholder", "Person Nummer");
  //email
  let email = document.createElement("input") as HTMLInputElement;
  email.required;
  email.setAttribute("type", "email");
  email.setAttribute("text", "emailadress");
  email.setAttribute("placeholder", "Email Adress");
  //submit button
  let submit = document.createElement("input") as HTMLInputElement;
  submit.value;
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
  document.body.appendChild(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    doneHtml();
    clearInput();
    console.log("tack för ditt köp");
  });

  function clearInput() {
    form.reset();
  }
  // submit.addEventListener("submit", (event: SubmitEvent) => {
  //   event.preventDefault();
  //   // doneHtml();
  //   console.log("tack för ditt köp");
  // });

  // let button = document.createElement("button") as HTMLButtonElement;
  // document.body.appendChild(button);
  // button.innerText = "click here";

  // button.addEventListener("click", () => {
  //   doneHtml();
  // });
}

// (document.getElementById("searchForm") as HTMLFormElement).addEventListener(
//   "submit",
//   async (event: SubmitEvent) => {
//     event.preventDefault();

function doneHtml() {
  let hTag = document.createElement("h3") as HTMLHeadingElement;
  hTag.innerText = "Tack för ditt köp!";
  document.body.appendChild(hTag);
  console.log("tack för ditt köp");
}
