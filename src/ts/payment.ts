function payment() {
  let bill = document.getElementById("faktura") as HTMLDivElement;
  bill.addEventListener("click", () => {
    createForm();
    console.log("du klickade");
  });
}

payment();

function createForm() {
  let form = document.createElement("form") as HTMLFormElement;
  // form.setAttribute("method", "post");
  // form.setAttribute("action", "submit");
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
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Slutför köp");
  //styling
  form.classList.add("forms");
  inputName.classList.add("inputs");
  // pCode.classList.add("inputs");
  // email.classList.add("inputs");
  submit.classList.add("submit-button");
  //create HTML
  form.appendChild(inputName);
  form.appendChild(pCode);
  form.appendChild(email);
  form.appendChild(submit);
  document.body.appendChild(form);

  submit.addEventListener("click", () => {
    doneHtml();
    console.log("tack för ditt köp");
  });
}

function doneHtml() {
  let hTag = document.createElement("h3") as HTMLHeadingElement;
  hTag.innerText = "Tack för ditt köp!";
  document.body.appendChild(hTag);
}
