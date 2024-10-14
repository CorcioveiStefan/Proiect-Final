document.addEventListener("DOMContentLoaded", singleProductPrint);

function singleProductPrint() {
  const productData = JSON.parse(localStorage.getItem("selectedProduct"));

  if (productData) {
    let count = 1;
    productData.count = count;

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
            <p class="description">${productData.description}</p>
            <div class="size-color">
              <h4>Size :</h4>
              <div class="butoane-size"><button>XL</button><button>L</button><button>XS</button></div>
              <h5>Color :</h5> 
              <div class="butoane-color"><button></button> <button></button> <button></button> </div>
            </div>
            <div class="controale"> 
              <div class="butoane-cantitate">
                <button class="buttonMinusSP">-</button>
                <span class="productCount">${count}</span>
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

    buttonPlusSP.addEventListener("click", function () {
      count++;
      productCountSpan.innerText = count;
      productData.count = count;
      localStorage.setItem("selectedProduct", JSON.stringify(productData));
      console.log(productData.count);
    });

    buttonMinusSP.addEventListener("click", function () {
      if (count > 1) {
        count--;
        productCountSpan.innerText = count;
        productData.count = count;
        localStorage.setItem("selectedProduct", JSON.stringify(productData));
        console.log(productData.count);
      }
    });

    butonAdaugare.addEventListener("click", function () {
      adaugaInCosSP(productData);
      console.log(productData.count);
    });
  } else {
    console.error("No product data found");
  }
  updateBreadcrumb();
}

function adaugaInCosSP(produs) {
  const cosDinLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cosDinLocalStorage.findIndex((item) => item.id === produs.id);

  if (index > -1) {
    cosDinLocalStorage[index].count =
      cosDinLocalStorage[index].count + produs.count;
  } else {
    cosDinLocalStorage.push(produs);
  }

  localStorage.setItem("cart", JSON.stringify(cosDinLocalStorage));
  produseInCos(cosDinLocalStorage);
  updateCartDisplay();
}

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
