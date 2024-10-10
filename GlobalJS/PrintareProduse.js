const arrayCosProduseSalvat = JSON.parse(localStorage.getItem('cart')) || [];
const arrayCosProduse = arrayCosProduseSalvat;

//=== functie ce printeaza un produs in lista produse ===//
const printeazaUnProdus = function (produs) {
  const _listaProduse = document.querySelector(".listaProduse");
  const _unProdus = document.createElement("div");
  _unProdus.classList.add('unProdus');
  _listaProduse.appendChild(_unProdus);

  _unProdus.innerHTML =
    `<button class="buttonAdd">Add to Cart</button>
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

  const butonAdaugare = _unProdus.querySelector('button');
  butonAdaugare.addEventListener('click', function () {
    adaugaInCos(produs);
  });

  // Select the image and button from the newly created _unProdus
  const image = _unProdus.querySelector('.unProdusImg');
  const overlay = _unProdus.querySelector('.ProdusOverlay')

  // Add mouseover event listener to show the button
  image.addEventListener('mouseover', () => {
    butonAdaugare.style.display = 'block'; // Show the button
    overlay.style.display = 'block';
  });

  // Add mouseout event listener to hide the button
  image.addEventListener('mouseout', () => {
    butonAdaugare.style.display = 'none'; // Hide the button
    overlay.style.display = 'none';
  });

  const unProdusInfo = _unProdus.querySelector('.unProdusInfo');
  unProdusInfo.addEventListener('click', () => {
    localStorage.setItem('selectedProduct', JSON.stringify(produs));
    window.location.href = '../SingleProduct/SingleProduct.html';
  });
};

// === Function to display all products (or a subset for pagination) ===
const printeazaToateProdusele = (produseStoc) => {
  const _listaProduse = document.querySelector(".listaProduse");
  produseStoc.forEach((produs) => printeazaUnProdus(produs));
};

function adaugaInCos(produs) {
  const cosDinLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cosDinLocalStorage.findIndex(item => item.id === produs.id);

  if (index > -1) {
    // Product already exists in the cart, increment the count
    cosDinLocalStorage[index].count = (cosDinLocalStorage[index].count || 1) + 1;
  } else {
    // New product, set count to 1
    produs.count = 1;
    cosDinLocalStorage.push(produs);
  }

  localStorage.setItem('cart', JSON.stringify(cosDinLocalStorage));
  produseInCos(cosDinLocalStorage);
}

function produsInCos(produsPrintat) {
  const _cosProduse = document.querySelector(".cosProduse");
  const _unProdusCos = document.createElement("div");
  _unProdusCos.classList.add('unProdusCos');
  _cosProduse.appendChild(_unProdusCos);

  _unProdusCos.innerHTML =
    `<div class="top-div">
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

  const _buttonMinus = _unProdusCos.querySelector('.buttonMinus');
  const _buttonPlus = _unProdusCos.querySelector('.buttonPlus');
  const _buttonSterge = _unProdusCos.querySelector('.stergeProdus');

  _buttonSterge.addEventListener('click', function () {
    const cosDinLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const cosActualizat = cosDinLocalStorage.filter(item => item.id !== produsPrintat.id);

    localStorage.setItem('cart', JSON.stringify(cosActualizat));
    produseInCos(cosActualizat);
  });

  _buttonMinus.addEventListener('click', function () {
    if (produsPrintat.count === 1) {
      _buttonMinus.style.backgroundColor = 'rgb(207, 207, 207)';
    } else if (produsPrintat.count > 1) {
      eliminareCantitateProdus(produsPrintat);
    }
  });

  _buttonPlus.addEventListener('click', function () {
    adaugareCantitateProdus(produsPrintat);
  });
}

function eliminareCantitateProdus(produs) {
  const cosDinLocalStorage = JSON.parse(localStorage.getItem('cart'));
  cosDinLocalStorage.forEach(item => {
    if (item.id === produs.id) {
      // Only decrement if count is greater than 1
      if (item.count > 1) {
        item.count--;
      }
    }
  });
  localStorage.setItem('cart', JSON.stringify(cosDinLocalStorage));
  produseInCos(cosDinLocalStorage);
}

function adaugareCantitateProdus(produs) {
  const cosDinLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
  cosDinLocalStorage.forEach(item => {
    if (item.id === produs.id) {
      // Increment the count
      item.count++;
    }
  });
  localStorage.setItem('cart', JSON.stringify(cosDinLocalStorage));
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

  // Attach the event listener immediately after creating the button
  const closeButton = _butonInchidere.querySelector("button");
  closeButton.addEventListener("click", () => {
    const cartDiv = document.getElementById('cartDiv'); // Assuming this is your cart div
    const cartOverlay = document.getElementById('overlay'); // Assuming this is your overlay
    cartDiv.style.display = 'none'; // Hide the cartDiv
    cartOverlay.style.display = 'none'; // Hide the overlay
  });

  _butonAchizitie.addEventListener("click", trimiteComanda);

  _optiuniCos.appendChild(_butonAchizitie);
  _optiuniCos.appendChild(_butonComparatie);
  _optiuniCos.appendChild(_butonInchidere);
}

function pretFinal(cumparaturi) {
  // Calculate the total price using the current count of each product
  return cumparaturi.reduce((suma, produsCurent) => {
    const count = produsCurent.count || 1; // Ensure count defaults to 1 if undefined
    return suma + (produsCurent.price * count);
  }, 0);
}

function trimiteComanda() {
  console.log("TrimiteComanda a fost apasat!");

  localStorage.removeItem('cart');
  arrayCosProduse.length = 0;
  produseInCos(arrayCosProduse);

  setTimeout(() => {
    alert('Comanda a fost trimisă cu succes!');
  }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
  produseInCos(arrayCosProduse);
});
