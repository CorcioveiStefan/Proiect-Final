function printeazaUnProdus(produs) {
  const _listaProduse = document.querySelector(".listaProduse");
  const _unProdus = document.createElement("div");
  _unProdus.classList.add("unProdus");
  _listaProduse.appendChild(_unProdus);

  _unProdus.innerHTML = `
    <div class="unProdusImg">
      <img src="${produs.image}" alt="${produs.title}" />
      <div class="ProdusOverlay"></div>
      <div><button class="buttonAdd">Add to Cart</button></div>
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
    <div class="fav-icon"></div>
    <div class="cart-icon"></div>
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

  const cartProducts = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartProducts.some((cartProd) => cartProd.id === produs.id)) {
    const cartIcon = document.createElement("div");
    cartIcon.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';
    cartIcon.classList.add("icon");
    _unProdus.querySelector(".cart-icon").appendChild(cartIcon);
  }

  const favoriteProducts = JSON.parse(localStorage.getItem("favorites")) || [];

  const favoriteIcon = document.createElement("div");
  favoriteIcon.classList.add("icon");

  const isFavorite = favoriteProducts.some(
    (favProd) => favProd.id === produs.id
  );
  favoriteIcon.innerHTML = isFavorite
    ? '<i class="fa-solid fa-heart" style="color: red;"></i>'
    : '<i class="fa-regular fa-heart"></i>';
  _unProdus.querySelector(".fav-icon").appendChild(favoriteIcon);

  favoriteIcon.addEventListener("click", () => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorite = currentFavorites.some(
      (favProd) => favProd.id === produs.id
    );

    if (isFavorite) {
      const updatedFavorites = currentFavorites.filter(
        (favProd) => favProd.id !== produs.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      favoriteIcon.innerHTML = '<i class="fa-regular fa-heart"></i>'; // Change to regular heart
    } else {
      currentFavorites.push(produs);
      localStorage.setItem("favorites", JSON.stringify(currentFavorites));
      favoriteIcon.innerHTML =
        '<i class="fa-solid fa-heart" style="color: red;"></i>'; // Change to solid heart
    }
    updateFavoriteDisplay();
  });

  favoriteIcon.addEventListener("click", function () {
    const favoriteDupaSelect =
      JSON.parse(localStorage.getItem("favorites")) || [];
    produseInFavorite(favoriteDupaSelect);
  });
}

function printeazaToateProdusele(produseStoc) {
  const _listaProduse = document.querySelector(".listaProduse");
  produseStoc.forEach((produs) => printeazaUnProdus(produs));
}

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
  loadCurrentPageProducts();
}
