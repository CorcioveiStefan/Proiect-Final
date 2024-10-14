const arrayFavoriteSalvat = JSON.parse(localStorage.getItem("favorites")) || [];
const arrayFavorite = arrayFavoriteSalvat;

function produsInFavorite(produsPrintat) {
  const _cosFavorite = document.querySelector(".cosFavorite");
  const _unProdusFavorit = document.createElement("div");
  _unProdusFavorit.classList.add("unProdusFavorit");
  _cosFavorite.appendChild(_unProdusFavorit);

  _unProdusFavorit.innerHTML = `
    <div class ="top-div-favorite">
      <div class="imgFavorite">
        <img src="${produsPrintat.image}" />
      </div>
      <div class="textFavorite">
        <h4>${produsPrintat.title}</h4>
        <span class="pretProdusFavorite">Price: $${produsPrintat.price}</span>
        <button class="stergeFavorit">Delete</button>
        <button class="adaugaDinFavorite">Add to Cart</button>
      </div>
    </div>
    `;

  const _buttonSterge = _unProdusFavorit.querySelector(".stergeFavorit");
  const _buttonAdaugareDinFavorite =
    _unProdusFavorit.querySelector(".adaugaDinFavorite");

  _buttonSterge.addEventListener("click", function () {
    const cosDinLocalStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const cosActualizat = cosDinLocalStorage.filter(
      (item) => item.id !== produsPrintat.id
    );

    localStorage.setItem("favorites", JSON.stringify(cosActualizat));
    produseInFavorite(cosActualizat);
    updateFavoriteDisplay();
    loadCurrentPageProducts();
  });

  _buttonAdaugareDinFavorite.addEventListener("click", function () {
    adaugaInCos(produsPrintat); // Apelăm funcția adaugaInCos cu produsul curent
  });
}

function produseInFavorite(produsePrintate) {
  const _cosFavorite = document.querySelector(".cosFavorite");
  _cosFavorite.innerHTML = "";

  const _optiuniFavorite = document.querySelector(".optiuniFavorite");
  _optiuniFavorite.innerHTML = "";
  produsePrintate.forEach(produsInFavorite);

  const _butonInchidere = document.createElement("div");
  _butonInchidere.className = "butonInchidere";
  _butonInchidere.innerHTML = `<button>Close</button>`;

  const closeButton = _butonInchidere.querySelector("button");

  closeButton.addEventListener("click", () => {
    const favoriteDiv = document.getElementById("favoriteDiv");
    const favoriteOverlay = document.getElementById("favoriteoverlay");
    favoriteDiv.style.display = "none";
    favoriteOverlay.style.display = "none";
  });

  _optiuniFavorite.appendChild(_butonInchidere);

  localStorage.setItem("favorites", JSON.stringify(produsePrintate));
}

produseInFavorite(arrayFavorite);
