function e(e){let c=document.getElementById("shoppingcart-container");c.innerHTML="";let d=document.createElement("p");d.className="totalamount";let i=0,o=0;for(let d=0;d<e.length;d++){i+=e[d].amount*e[d].product.price,o+=e[d].amount;let l=document.createElement("div"),r=document.createElement("h3"),m=document.createElement("img"),s=document.createElement("div"),p=document.createElement("p"),u=document.createElement("i"),g=document.createElement("i"),h=document.createElement("p"),E=document.createElement("button");r.innerText=e[d].product.name,m.src=e[d].product.img,m.alt=e[d].product.name,E.innerHTML="ta bort",l.className="shoppingcart__item",s.className="shoppingcart__item__changecontainer",p.innerHTML=e[d].amount.toString(),u.classList.add("bi","bi-plus-square"),g.classList.add("bi","bi-dash-square"),u.addEventListener("click",(()=>{t(e[d],e)})),g.addEventListener("click",(()=>{n(e[d],e)})),E.classList.add("buttons"),E.addEventListener("click",(()=>{a(e[d],e)})),h.innerHTML=(e[d].amount*e[d].product.price).toString()+" sek",s.appendChild(g),s.appendChild(p),s.appendChild(u),l.appendChild(r),l.appendChild(m),l.appendChild(s),l.appendChild(h),l.appendChild(E),c.appendChild(l)}d.innerHTML="Totalt: "+i.toString()+" sek",c.appendChild(d),console.log(o);let l=document.getElementById("cart-total");o>0&&(l.innerHTML=o.toString(),l.classList.remove("displaynone")),o<1&&l.classList.add("displaynone")}function t(t,n){t.amount++,e(n),localStorage.setItem("cartItems",JSON.stringify(n))}function n(t,n){if(t.amount--,t.amount<1){let e=n.indexOf(t);n.splice(e,1)}e(n),localStorage.setItem("cartItems",JSON.stringify(n))}function a(t,n){t.amount;let a=n.indexOf(t);n.splice(a,1),localStorage.setItem("cartItems",JSON.stringify(n)),e(n)}document.getElementById("button-product").addEventListener("click",(()=>{location.href="./pages/products.html"})),document.getElementById("openCart").addEventListener("click",(()=>{document.getElementById("mySidebar").style.width="250px"})),document.getElementById("closeCart").addEventListener("click",(()=>{document.getElementById("mySidebar").style.width="0"})),document.getElementById("button-checkout").addEventListener("click",(()=>{location.href="/HolidayTree/pages/checkout.html"})),e(JSON.parse(localStorage.getItem("cartItems")||"[]")),console.log("start");
//# sourceMappingURL=index.947792f8.js.map
