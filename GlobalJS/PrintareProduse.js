const arrayCosProduseSalvat = JSON.parse(localStorage.getItem("cart")) || [];
const arrayCosProduse = arrayCosProduseSalvat;

const printeazaUnProdus = function (produs) {
  const _listaProduse = document.querySelector(".listaProduse");
  const _unProdus = document.createElement("div");
  _unProdus.classList.add("unProdus");
  _listaProduse.appendChild(_unProdus);

  _unProdus.innerHTML = `<button class="buttonAdd">Add to Cart</button>
     <div class="unProdusImg">
       <img src="${produs.image}" alt="${produs.title}" />
     </div>
     <div class="unProdusInfo">
       <div>
         <h4>${produs.title}</h4>
       </div>
       <div class="descriere">
         <p>${produs.description}</p>
       </div>
       <div class="pret">
         <p>Price: $${produs.price}</p>
       </div>
     </div>
     <div class="ProdusOverlay"></div>
     `;

  const butonAdaugare = _unProdus.querySelector("button");
  butonAdaugare.addEventListener("click", function () {
    adaugaInCos(produs);
  });

  const image = _unProdus.querySelector(".unProdusImg");
  const overlay = _unProdus.querySelector(".ProdusOverlay");

  image.addEventListener("mouseover", () => {
    butonAdaugare.style.display = "block";
    overlay.style.display = "block";
  });

  image.addEventListener("mouseout", () => {
    butonAdaugare.style.display = "none";
    overlay.style.display = "none";
  });

  const unProdusInfo = _unProdus.querySelector(".unProdusInfo");
  unProdusInfo.addEventListener("click", () => {
    localStorage.setItem("selectedProduct", JSON.stringify(produs));
    window.location.href = "../SingleProduct/SingleProduct.html";
  });
};

const printeazaToateProdusele = (produseStoc) => {
  const _listaProduse = document.querySelector(".listaProduse");
  produseStoc.forEach((produs) => printeazaUnProdus(produs));
};

function adaugaInCos(produs) {
  const cosDinLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cosDinLocalStorage.findIndex((item) => item.id === produs.id);

  if (index > -1) {
    cosDinLocalStorage[index].count =
      (cosDinLocalStorage[index].count || 1) + 1;
  } else {
    produs.count = 1;
    cosDinLocalStorage.push(produs);
  }

  localStorage.setItem("cart", JSON.stringify(cosDinLocalStorage));
  produseInCos(cosDinLocalStorage);
  updateCartDisplay();
}

function produsInCos(produsPrintat) {
  const _cosProduse = document.querySelector(".cosProduse");
  const _unProdusCos = document.createElement("div");
  _unProdusCos.classList.add("unProdusCos");
  _cosProduse.appendChild(_unProdusCos);

  _unProdusCos.innerHTML = `<div class="top-div">
  <div>
    <img src="${produsPrintat.image}" />
  </div>
  <div>
    <h4>${produsPrintat.title}</h4>
    <div class="modificariInCos">
      <button class="buttonMinus">-</button>
      <span>${produsPrintat.count}</span>
      <button class="buttonPlus">+</button>
    </div>
    <span>Price: $${produsPrintat.count * produsPrintat.price}</span> </br>
  </div>
  </div>
  <button class="stergeProdus">Delete</button>`;

  const _buttonMinus = _unProdusCos.querySelector(".buttonMinus");
  const _buttonPlus = _unProdusCos.querySelector(".buttonPlus");
  const _buttonSterge = _unProdusCos.querySelector(".stergeProdus");

  _buttonSterge.addEventListener("click", function () {
    const cosDinLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
    const cosActualizat = cosDinLocalStorage.filter(
      (item) => item.id !== produsPrintat.id
    );

    localStorage.setItem("cart", JSON.stringify(cosActualizat));
    produseInCos(cosActualizat);
    updateCartDisplay();
  });

  _buttonMinus.addEventListener("click", function () {
    if (produsPrintat.count === 1) {
      _buttonMinus.style.backgroundColor = "black";
    } else if (produsPrintat.count > 1) {
      eliminareCantitateProdus(produsPrintat);
    }
  });

  _buttonPlus.addEventListener("click", function () {
    if (produsPrintat.count < 20) {
      adaugareCantitateProdus(produsPrintat);
    } else if ((produsPrintat.count = 20)) {
      _buttonPlus.style.backgroundColor = "black";
      _buttonPlus.disabled = true;
    }
  });
}

function eliminareCantitateProdus(produs) {
  const cosDinLocalStorage = JSON.parse(localStorage.getItem("cart"));
  cosDinLocalStorage.forEach((item) => {
    if (item.id === produs.id) {
      if (item.count > 1) {
        item.count--;
      }
    }
  });
  localStorage.setItem("cart", JSON.stringify(cosDinLocalStorage));
  produseInCos(cosDinLocalStorage);
}

function adaugareCantitateProdus(produs) {
  const cosDinLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
  cosDinLocalStorage.forEach((item) => {
    if (item.id === produs.id) {
      item.count++;
    }
  });
  localStorage.setItem("cart", JSON.stringify(cosDinLocalStorage));
  produseInCos(cosDinLocalStorage);
}

function produseInCos(produsePrintate) {
  const _cosProduse = document.querySelector(".cosProduse");
  _cosProduse.innerHTML = "";

  const _pretCart = document.querySelector(".pretCart");
  _pretCart.innerHTML = "";

  const _optiuniCos = document.querySelector(".optiuniCos");
  _optiuniCos.innerHTML = "";

  produsePrintate.forEach(produsInCos);

  const _totalDiv = document.createElement("div");
  _totalDiv.textContent = `Subtotal: $${pretFinal(produsePrintate).toFixed(2)}`;
  _totalDiv.className = "totalDiv";
  _pretCart.appendChild(_totalDiv);

  const _butonAchizitie = document.createElement("div");
  const _butonInchidere = document.createElement("div");
  const _butonComparatie = document.createElement("div");

  _butonAchizitie.className = "butonAchizitie";
  _butonInchidere.className = "butonInchidere";
  _butonComparatie.className = "butonComparatie";

  _butonAchizitie.innerHTML = `<button>Checkout</button>`;
  _butonInchidere.innerHTML = `<button>Close</button>`;
  _butonComparatie.innerHTML = `<button>Comparison</button>`;

  const closeButton = _butonInchidere.querySelector("button");
  closeButton.addEventListener("click", () => {
    const cartDiv = document.getElementById("cartDiv");
    const cartOverlay = document.getElementById("overlay");
    cartDiv.style.display = "none";
    cartOverlay.style.display = "none";
  });

  _butonAchizitie.addEventListener("click", checkoutPage);

  _optiuniCos.appendChild(_butonAchizitie);
  _optiuniCos.appendChild(_butonComparatie);
  _optiuniCos.appendChild(_butonInchidere);

  localStorage.setItem("checkoutProduct", JSON.stringify(produsePrintate));
}

function pretFinal(cumparaturi) {
  return cumparaturi.reduce((suma, produsCurent) => {
    const count = produsCurent.count || 1;
    return suma + produsCurent.price * count;
  }, 0);
}

function checkoutPage() {
  window.location.href = "../Checkout/Checkout.html";
}

function updateCartDisplay() {
  const cartButton = document.getElementById("cartButton");
  let cartItemCount = document.getElementById("cartItemCount");

  if (!cartItemCount) {
    cartItemCount = document.createElement("span");
    cartItemCount.id = "cartItemCount";
    cartItemCount.style.position = "absolute";
    cartItemCount.style.top = "-9px";
    cartItemCount.style.right = "-9px";
    cartItemCount.style.backgroundColor = "red";
    cartItemCount.style.color = "white";
    cartItemCount.style.borderRadius = "50%";
    cartItemCount.style.fontSize = "12px";

    cartItemCount.style.alignSelf = "center";
    cartItemCount.style.padding = "0 6px";
    cartButton.appendChild(cartItemCount);
  }

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartItems.length > 0) {
    cartItemCount.textContent = cartItems.length;
    cartItemCount.style.display = "inline";
  } else {
    cartItemCount.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  produseInCos(arrayCosProduse);
  updateCartDisplay();
});
