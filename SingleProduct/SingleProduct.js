document.addEventListener("DOMContentLoaded", () => {
  const productData = JSON.parse(localStorage.getItem("selectedProduct"));

  if (productData) {
    const produsContainer = document.querySelector(".produs");

    produsContainer.innerHTML = `
          <div class="product-img">
            <div class="small-img">
              <img src="${productData.image}" alt="${productData.title}" />
              <img src="${productData.image}" alt="${productData.title}" />
              <img src="${productData.image}" alt="${productData.title}" />
              <img src="${productData.image}" alt="${productData.title}" />
            </div>
            <div class="big-img">
              <img src="${productData.image}" alt="${productData.title}" />
            </div>
          </div>
          <div class="product-details">
            <h2>${productData.title}</h2>
            <p class="pret">Price: $${productData.price}</p>
            <div class="rate"> 
              <img src="/Assets/Group 88.png" alt="Rate" height="20px">
              <div>5 Customer Review</div>
            </div>
            <p class= "description">${productData.description}</p>
            <div class = "size-color">
              <h4>Size :</h4>
              <div class = "butoane-size"><button>XL</button><button>L</button><button>XS</button></div>
              <h5>Color :</h5> 
              <div class = "butoane-color"><button></button> <button></button> <button></button> </div>
            </div>
            <div class = "controale" > 
              <div class = "butoane-cantitate">
                <button class="buttonMinusSP">-</button>
                <span class="productCount">1</span>
                <button class="buttonPlusSP">+</button>
              </div>
              <button class="buttonAddSP">Add to Cart</button>
            </div> 
          </div>
      `;
    const butonAdaugare = produsContainer.querySelector(".buttonAddSP");
    const productCountSpan = produsContainer.querySelector(".productCount");
    const buttonMinusSP = produsContainer.querySelector(".buttonMinusSP");
    const buttonPlusSP = produsContainer.querySelector(".buttonPlusSP");

    let count = 1;

    buttonPlusSP.addEventListener("click", function () {
      count++;
      productCountSpan.innerText = count;
    });

    buttonMinusSP.addEventListener("click", function () {
      if (count > 1) {
        count--;
        productCountSpan.innerText = count;
      }
    });

    butonAdaugare.addEventListener("click", function () {
      productData.count = count;
      adaugaInCos(productData);
    });
  } else {
    console.error("No product data found");
  }
  updateBreadcrumb();
});

function updateBreadcrumb() {
  const productData = JSON.parse(localStorage.getItem("selectedProduct"));

  if (productData && productData.title) {
    const breadcrumbTextProduct = `${productData.title}`;
    document.querySelector(
      ".Product-breadcrumb"
    ).innerHTML = `<span>Home</span> &gt; <span>Shop</span> &gt; <div></div><p>${breadcrumbTextProduct}</p>`;
  } else {
    document.querySelector(
      ".Product-breadcrumb"
    ).innerHTML = `<div>Product not found</div>`;
  }
}

function adaugaInCos(produs) {
  const cosDinLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cosDinLocalStorage.findIndex((item) => item.id === produs.id);

  if (index > -1) {
    cosDinLocalStorage[index].count += produs.count;
  } else {
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
      _buttonMinus.style.backgroundColor = "rgb(207, 207, 207)";
    } else if (produsPrintat.count > 1) {
      eliminareCantitateProdus(produsPrintat);
    }
  });

  _buttonPlus.addEventListener("click", function () {
    adaugareCantitateProdus(produsPrintat);
  });
}
