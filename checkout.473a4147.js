// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ts/checkout.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function init() {
  getListFromLS();
  console.log("start");
  choosePayment();
}

function addToCart(item, cartItems) {
  item.amount++;
  shoppingCartHtml(cartItems);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function reduceCart(item, cartItems) {
  item.amount--;

  if (item.amount < 1) {
    var listindex = cartItems.indexOf(item);
    cartItems.splice(listindex, 1);
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  getListFromLS();
}

function removeFromCart(item, cartItems) {
  var listindex = cartItems.indexOf(item);
  cartItems.splice(listindex, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  getListFromLS();
}

function getListFromLS() {
  var cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

  if (cartItems.length < 1) {
    var cartTag = document.getElementById("cart-container");
    cartTag.innerHTML = "Din varukorg är tom";
    var aTag = document.createElement("a");
    aTag.href = "products.html";
    aTag.innerHTML = " Tillbaka till produkter";
    cartTag.appendChild(aTag);
  } else {
    shoppingCartHtml(cartItems);
  }
}

function shoppingCartHtml(cartItems) {
  console.log("hello world"); // elements for the hole cart

  var cartTag = document.getElementById("cart-container");
  cartTag.innerHTML = "";
  var totalAmountTag = document.createElement("p");
  totalAmountTag.className = "totalamount"; // a variable to be able to count

  var sum = 0;

  var _loop = function _loop(i) {
    sum = sum + cartItems[i].amount * cartItems[i].product.price; //create new element for each

    var containerTag = document.createElement("div");
    var titleTag = document.createElement("h3");
    var imgTag = document.createElement("img");
    var changeContainer = document.createElement("div");
    var amountTag = document.createElement("p");
    var increaseBtn = document.createElement("i");
    var reduceBtn = document.createElement("i");
    var priceTag = document.createElement("p");
    var deleteBtn = document.createElement("button"); // innerhtml content

    titleTag.innerText = cartItems[i].product.name;
    imgTag.src = cartItems[i].product.img;
    imgTag.alt = cartItems[i].product.name;
    deleteBtn.innerHTML = "ta bort";
    containerTag.className = "cart__item";
    changeContainer.className = "cart__item__changecontainer";
    amountTag.innerHTML = cartItems[i].amount.toString();
    increaseBtn.classList.add("bi", "bi-plus-square");
    reduceBtn.classList.add("bi", "bi-dash-square");
    increaseBtn.addEventListener("click", function () {
      addToCart(cartItems[i], cartItems);
    });
    reduceBtn.addEventListener("click", function () {
      reduceCart(cartItems[i], cartItems);
    });
    deleteBtn.classList.add("buttons");
    deleteBtn.addEventListener("click", function () {
      removeFromCart(cartItems[i], cartItems);
    });
    priceTag.innerHTML = (cartItems[i].amount * cartItems[i].product.price).toString() + " sek"; //to display

    changeContainer.appendChild(reduceBtn);
    changeContainer.appendChild(amountTag);
    changeContainer.appendChild(increaseBtn);
    containerTag.appendChild(titleTag);
    containerTag.appendChild(imgTag);
    containerTag.appendChild(changeContainer);
    containerTag.appendChild(priceTag);
    containerTag.appendChild(deleteBtn);
    cartTag.appendChild(containerTag);
  };

  for (var i = 0; i < cartItems.length; i++) {
    _loop(i);
  } //to display total price


  totalAmountTag.innerHTML = "Totalt: " + sum.toString() + " sek";
  cartTag.appendChild(totalAmountTag);
}

function chooseCard() {
  var cardForm = document.createElement("form");
  var billCont = document.getElementById("bill");
  billCont.innerHTML = " ";
  cardForm.innerHTML = "";
  cardForm.classList.add("forms");
  var nameCard = document.createElement("input");
  nameCard.setAttribute("type", "text");
  nameCard.setAttribute("minlength", "4");
  nameCard.setAttribute("required", "true");
  nameCard.setAttribute("name", "FullName");
  nameCard.setAttribute("placeholder", "Förnamn och Efternamn");
  var numberCard = document.createElement("input");
  numberCard.setAttribute("type", "tel");
  numberCard.setAttribute("pattern", "[0-9]{16}");
  numberCard.setAttribute("title", "ange 16 siffror!");
  numberCard.setAttribute("required", "true");
  numberCard.setAttribute("name", "CardNum");
  numberCard.setAttribute("placeholder", "Kortnummer");
  var dateCard = document.createElement("input");
  dateCard.setAttribute("type", "text");
  dateCard.setAttribute("minlength", "5");
  dateCard.setAttribute("maxlength", "5");
  dateCard.setAttribute("required", "true");
  dateCard.setAttribute("name", "CardDate");
  dateCard.setAttribute("placeholder", "MM/ÅÅ");
  var cvcCard = document.createElement("input");
  cvcCard.setAttribute("placeholder", "CVC");
  cvcCard.setAttribute("type", "tel");
  cvcCard.setAttribute("pattern", "[0-9]{3}");
  cvcCard.setAttribute("title", "ange 3 siffror!");
  cvcCard.setAttribute("required", "true");
  cvcCard.setAttribute("name", "CardCvc");
  var submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Slutför köp");
  submit.classList.add("submit-button");
  nameCard.classList.add("inputs");
  numberCard.classList.add("inputs");
  dateCard.classList.add("inputs");
  cvcCard.classList.add("inputs");
  var cardCont = document.getElementById("cardCont");
  cardCont.appendChild(cardForm);
  cardForm.appendChild(nameCard);
  cardForm.appendChild(numberCard);
  cardForm.appendChild(dateCard);
  cardForm.appendChild(cvcCard);
  cardForm.appendChild(submit);
  cardForm.addEventListener("submit", function (e) {
    e.preventDefault();
    doneHtml();
    console.log("tack för ditt köp");
  });
}

function choosePayment() {
  var radioOne = document.getElementById("card");
  radioOne.addEventListener("change", function () {
    chooseCard();
  });
  var bill = document.getElementById("faktura");
  bill.addEventListener("change", function () {
    billForm();
    console.log("du klickade");
  });
}

function billForm() {
  var cardForm = document.getElementById("cardCont");
  cardForm.innerHTML = "";
  var billCont = document.getElementById("bill");
  billCont.innerHTML = "";
  var form = document.createElement("form");
  var inputName = document.createElement("input");
  inputName.setAttribute("type", "text");
  inputName.setAttribute("required", "true");
  inputName.setAttribute("name", "FullName");
  inputName.setAttribute("placeholder", "Förnamn och Efternamn"); //pcode number

  var pCode = document.createElement("input");
  pCode.setAttribute("type", "tel");
  pCode.setAttribute("required", "true");
  pCode.setAttribute("title", "ange 10 siffror!");
  pCode.setAttribute("number", "Personnummer");
  pCode.setAttribute("placeholder", "Personnummer");
  pCode.setAttribute("pattern", "[0-9]{10}"); //email

  var email = document.createElement("input");
  email.setAttribute("type", "email");
  email.setAttribute("required", "true");
  email.setAttribute("text", "");
  email.setAttribute("placeholder", "Email Adress"); //submit button

  var submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Slutför köp"); //styling

  form.classList.add("forms");
  inputName.classList.add("inputs");
  pCode.classList.add("inputs");
  email.classList.add("inputs");
  submit.classList.add("submit-button"); //create HTML

  form.appendChild(inputName);
  form.appendChild(pCode);
  form.appendChild(email);
  form.appendChild(submit);
  billCont.appendChild(form);
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    doneHtml();
    console.log("tack för ditt köp");
  });
}

function doneHtml() {
  var main = document.getElementById("main");
  main.innerHTML = "";
  var hTag = document.createElement("h3");
  hTag.innerText = "Tack för ditt köp!";
  localStorage.clear();
  main.appendChild(hTag);
}

init();
},{}],"C:/Users/ilmen/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65160" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/ilmen/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ts/checkout.ts"], null)
//# sourceMappingURL=/checkout.473a4147.js.map