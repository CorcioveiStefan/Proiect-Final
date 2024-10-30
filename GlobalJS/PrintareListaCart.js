const arrayCosProduseSalvat = JSON.parse(localStorage.getItem("cart")) || [];
const arrayCosProduse = arrayCosProduseSalvat;



function produsInCos(produsPrintat) {
  const _cosProduse = document.querySelector(".cosProduse");
  const _unProdusCos = document.createElement("div");
  _unProdusCos.classList.add("unProdusCos");
  _cosProduse.appendChild(_unProdusCos);

  _unProdusCos.innerHTML = `
  <div class="top-div">
    <div class="imgCart">
      <img src="${produsPrintat.image}" />
    </div>
    <div>
      <h4>${produsPrintat.title}</h4>
      <div class="modificariInCos">
        <button class="buttonMinus">-</button>
        <span>${produsPrintat.count}</span>
        <button class="buttonPlus">+</button>
      </div>
      <span class= "pretProdusCart">Price: $${(produsPrintat.count * produsPrintat.price).toFixed(2)}</span> </br>
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

    const currentPage = window.location.pathname;

  if (currentPage.includes("/Shop.html")) {
    loadCurrentPageProducts();
  } else if (currentPage.includes("/Checkout.html")) {
    const cartActualizatPtCheckout = JSON.parse(localStorage.getItem("cart"));
    localStorage.setItem("checkoutProduct", JSON.stringify(cartActualizatPtCheckout));
    updateCheckoutDisplay();
  }
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
  if (window.location.href.includes("Checkout.html")){
    updateCheckoutDisplay();
  }
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
  if (window.location.href.includes("Checkout.html")){
    updateCheckoutDisplay();
  }
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

function checkoutPage(url) {
  window.location.href = url;

const currentPageCheckout = window.location.pathname;

if (currentPageCheckout.includes("index.html")) {
  checkoutPage("Checkout/Checkout.html");
} else {
  checkoutPage("../Checkout/Checkout.html");
}
}