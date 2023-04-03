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
})({"ts/shoppingcart.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkout = exports.closeCart = exports.shoppingCartHtml = exports.openCart = void 0;

function openCart() {
  var startButton = document.getElementById("openCart");
  startButton.addEventListener("click", function () {
    var openSidebar = document.getElementById("mySidebar");
    openSidebar.style.width = "250px";
  });
}

exports.openCart = openCart;

function shoppingCartHtml(cartItems) {
  var cartTag = document.getElementById("shoppingcart-container");
  cartTag.innerHTML = "";
  var totalAmountTag = document.createElement("p");
  totalAmountTag.className = "totalamount";
  var sum = 0;
  var itemsInCartTotal = 0;

  var _loop = function _loop(i) {
    sum = sum + cartItems[i].amount * cartItems[i].product.price;
    itemsInCartTotal = itemsInCartTotal + cartItems[i].amount;
    var containerTag = document.createElement("div");
    var titleTag = document.createElement("h3");
    var imgTag = document.createElement("img");
    var changeContainer = document.createElement("div");
    var amountTag = document.createElement("p");
    var increaseBtn = document.createElement("i");
    var reduceBtn = document.createElement("i");
    var priceTag = document.createElement("p");
    var deleteBtn = document.createElement("button");
    titleTag.innerText = cartItems[i].product.name;
    imgTag.src = cartItems[i].product.img;
    imgTag.alt = cartItems[i].product.name;
    deleteBtn.innerHTML = "ta bort";
    containerTag.className = "shoppingcart__item";
    changeContainer.className = "shoppingcart__item__changecontainer";
    amountTag.innerHTML = cartItems[i].amount.toString();
    increaseBtn.classList.add("bi", "bi-plus-square");
    reduceBtn.classList.add("bi", "bi-dash-square");
    increaseBtn.addEventListener("click", function () {
      addMoreToCart(cartItems[i], cartItems);
    });
    reduceBtn.addEventListener("click", function () {
      reduceCart(cartItems[i], cartItems);
    });
    deleteBtn.classList.add("buttons");
    deleteBtn.addEventListener("click", function () {
      removeFromCart(cartItems[i], cartItems);
    });
    priceTag.innerHTML = (cartItems[i].amount * cartItems[i].product.price).toString() + " sek";
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
  }

  totalAmountTag.innerHTML = "Totalt: " + sum.toString() + " sek";
  cartTag.appendChild(totalAmountTag);
  console.log(itemsInCartTotal);
  var iconTotal = document.getElementById("cart-total");

  if (itemsInCartTotal > 0) {
    iconTotal.innerHTML = itemsInCartTotal.toString();
    iconTotal.classList.remove("displaynone");
  }

  if (itemsInCartTotal < 1) {
    iconTotal.classList.add("displaynone");
  }
}

exports.shoppingCartHtml = shoppingCartHtml;

function addMoreToCart(item, cartItems) {
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

  shoppingCartHtml(cartItems);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function removeFromCart(item, cartItems) {
  item.amount === 0;
  var listIndex = cartItems.indexOf(item);
  cartItems.splice(listIndex, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  shoppingCartHtml(cartItems);
}

function closeCart() {
  var closeButton = document.getElementById("closeCart");
  closeButton.addEventListener("click", function () {
    var closeSidebar = document.getElementById("mySidebar");
    closeSidebar.style.width = "0";
  });
}

exports.closeCart = closeCart;

function checkout() {
  var checkoutButton = document.getElementById("button-checkout");
  checkoutButton.addEventListener("click", function () {
    location.href = "./../pages/checkout.html";
  });
}

exports.checkout = checkout;
},{}],"ts/models/CartItem.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CartItem = void 0;

var CartItem =
/*#__PURE__*/
_createClass(function CartItem(product, amount) {
  _classCallCheck(this, CartItem);

  this.product = product;
  this.amount = amount;
});

exports.CartItem = CartItem;
},{}],"ts/models/Product.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Product = void 0;

var Product =
/*#__PURE__*/
_createClass(function Product(name, desc, price, img, type, id, detailedDesc) {
  _classCallCheck(this, Product);

  this.name = name;
  this.desc = desc;
  this.price = price;
  this.img = img;
  this.type = type;
  this.id = id;
  this.detailedDesc = detailedDesc;
});

exports.Product = Product;
},{}],"ts/models/productcatalog.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productcatalog = void 0;

var Product_1 = require("./Product");

exports.productcatalog = [new Product_1.Product("Kungsgran", "En tät och ståtlig gran med oöverträfflig livslängd och svag citrusdoft.", 549, "https://svenskagranar.se/wp-content/uploads/2021/09/produkt_kungsgran-1024x683.webp", "kungsgran", "023", "Kungsgranen är en ädelgran som ofta kallas ”Disneygranen” på grund av dess perfekta utseende. Denna julgran är mer allergivänlig och är ett alternativ för dig som inte vill att det luktar så mycket julgran."), new Product_1.Product("Rödgran", "En färgstark gran med ypperlig form och kådadoft synonym med jul.", 399, "https://smålandsgran.se/app/uploads/2013/10/Rodgran.png", "rödgran", "123", "Den klassiska rödgranen är den gran vi kallar för vanlig svensk julgran. Ungefär 80% av alla de 3 miljoner julgranar som säljs varje år är av arten rödgran."), new Product_1.Product("Quebec", "New Quebec julgran från Star Trading med en naturlig look med tjocka lager.", 1020, "https://royaldesign.se/image/1/star-trading-new-quebec-julgran-130x180-cm-0?w=1366&quality=80", "plastgran", "124", "Vacker naturtrogen julgran som är enkel att dekorera och som sprider härlig julstämning. Denna gran kan du justera grenvinkeln efter tycke och smak eftersom det inte finns något stopp på grenarna. "), new Product_1.Product("Colorado", "Frostiga grenar med kottar, 350 st led lampor i ståtlig höjd.", 2999, "https://www.bauhaus.se/media/catalog/product/cache/21699f94d6be91d029a9b3d1b5079673/6/1/6100561B.jpg", "plastgran", "125", "En härlig och tät julgran som ger en mysig julkänsla. Granen är 500cm hög och enskilda grupper hakas på stammen när granen monteras upp. Har du högt i tak är detta den perfekta granen för dig."), new Product_1.Product("Liten rödgran", "En färgstark gran med ypperlig form och kådadoft synonym med jul.", 399, "https://smålandsgran.se/app/uploads/2013/10/minigran-3-1.png", "rödgran", "126", "Den klassiska rödgranen är den gran vi kallar för vanlig svensk julgran.Här kommer den i ett miniformat. Ungefär 80% av alla de 3 miljoner julgranar som säljs varje år är av arten rödgran."), new Product_1.Product("Liten Kungsgran", "En tät och ståtlig gran med oöverträfflig livslängd och svag citrusdoft.", 549, "https://smålandsgran.se/app/uploads/2017/09/kungsgran-kruka-2-2.gif", "kungsgran", "127", "Kungsgranen är en ädelgran som ofta kallas ”Disneygranen” på grund av dess perfekta utseende. Denna julgran är i litet format och är ett mer allergivänligt alternativ för dig som inte vill att det luktar så mycket julgran.")];
},{"./Product":"ts/models/Product.ts"}],"ts/products.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var shoppingcart_1 = require("./shoppingcart");

var CartItem_1 = require("./models/CartItem");

var productcatalog_1 = require("./models/productcatalog");

function init() {
  (0, shoppingcart_1.openCart)();
  (0, shoppingcart_1.closeCart)();
  (0, shoppingcart_1.checkout)();
  var cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  createHTML(productcatalog_1.productcatalog, cartItems, "all");
  (0, shoppingcart_1.shoppingCartHtml)(cartItems);
}

function createHTML(productlist, chosenProducts, type) {
  var _a, _b, _c, _d;

  var productDiv = document.getElementById("product_div");
  productDiv.innerHTML = "";

  var _loop = function _loop(i) {
    if (productlist[i].type === type || type === "all") {
      var container = document.createElement("div");
      var imgContainer = document.createElement("div");
      var imgTag = document.createElement("img");
      var title = document.createElement("h3");
      var descr = document.createElement("p");
      var price = document.createElement("h4");
      var addButton = document.createElement("button");
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
      imgTag.addEventListener("click", function () {
        handleClick(productlist[i], chosenProducts);
      });
      addButton.addEventListener("click", function () {
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
  };

  for (var i = 0; i < productlist.length; i++) {
    _loop(i);
  }

  (_a = document.getElementById("red-spruce-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var type = "rödgran";
    createHTML(productcatalog_1.productcatalog, chosenProducts, type);
  });
  (_b = document.getElementById("norway-spruce-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    var type = "kungsgran";
    createHTML(productcatalog_1.productcatalog, chosenProducts, type);
  });
  (_c = document.getElementById("platic-spruce-btn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    var type = "plastgran";
    createHTML(productcatalog_1.productcatalog, chosenProducts, type);
  });
  (_d = document.getElementById("all-spruce-btn")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
    createHTML(productcatalog_1.productcatalog, chosenProducts, "all");
  });
}

function handleClick(product, chosenProducts) {
  console.log("Du klickade på", product.id);
  var modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = "";
  var modalTitle = document.getElementById("exampleModalLabel");
  var imgTag = document.createElement("img");
  var detailDesc = document.createElement("p");
  var price = document.createElement("h4");
  var addButton = document.createElement("button");
  imgTag.className = "prodImgModal";
  imgTag.src = product.img;
  modalTitle.innerHTML = product.name;
  price.innerHTML = product.price.toString() + " SEK";
  detailDesc.innerHTML = product.detailedDesc;
  addButton.innerHTML = "Lägg till";
  addButton.className = "buttons";
  addButton.addEventListener("click", function () {
    addToCart(product, chosenProducts);
  });
  modalBody.appendChild(imgTag);
  modalBody.appendChild(detailDesc);
  modalBody.appendChild(price);
  modalBody.appendChild(addButton);
}

function addToCart(item, cartItems) {
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].product.id === item.id) {
      cartItems[i].amount++;
      (0, shoppingcart_1.shoppingCartHtml)(cartItems);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return;
    }
  }

  var newCartItem = new CartItem_1.CartItem(item, 0);
  newCartItem.amount++;
  console.log(cartItems);
  cartItems.push(newCartItem);
  (0, shoppingcart_1.shoppingCartHtml)(cartItems);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

init();
},{"./shoppingcart":"ts/shoppingcart.ts","./models/CartItem":"ts/models/CartItem.ts","./models/productcatalog":"ts/models/productcatalog.ts"}],"C:/Users/ilmen/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["C:/Users/ilmen/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ts/products.ts"], null)
//# sourceMappingURL=/products.959a76e8.js.map