document.addEventListener("DOMContentLoaded", singleProductPrint);         // calculatorul spune am construit baza/scheletele e timpul sa adaugam functionalitati 
const productData = JSON.parse(localStorage.getItem("selectedProduct")); // extragem din LS produsul salvat in PrintareListaProduse pt a fi evaluat aici


function singleProductPrint() {
  let count = 1;
  productData.count = count;
  if (productData) {                                                       // il evaluam                                                          // ii dam un count setat la 1 
    

    const starCount = Math.floor(productData.rating.rate);                 //verificam numarul de stele intregi care va fi numarul dinainte de virgula
    const hasHalfStar = (productData.rating.rate * 10)%10;                 //verificam numarul care este dupa virgula
    console.log(hasHalfStar);

    let starsHtml = '';                                                    // se creaza o variabila pentru stocarea stelelor 
    for (let i = 0; i < starCount; i++) {                        
      starsHtml += `<img src="../Assets/Star.png" alt="Star" height="20px">`;          // in acest for se introduc stele intregi
    }
    if (hasHalfStar>=5) {
      starsHtml += `<img src="../Assets/HalfStar.png" alt="Half Star" height="20px">`; // dupa introducerea stelelor intregi se introduce si jumatate daca indeplineste conditia
    }

    const produsContainer = document.querySelector(".produs");             // se selecteaza containerul unde va fi printat produsul si se creaaza ui in concordanta cu datele produsului
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
              <span>${starsHtml}</span>
              <div>${productData.rating.count} Customer Review</div>
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

    buttonPlusSP.addEventListener("click", function () {                       // functie pt a creste countul de la inceput
      count++;
      productCountSpan.innerText = count;                                      // update counter pt client
      productData.count = count;                                               // salvare in obiect noul count
      
    });

    buttonMinusSP.addEventListener("click", function () {                      // lafel ca mai sus doar ca in scadere si extra o conditie care spune ca tre sa fie mai mare decat 1 pt a nu scadea sub 1 
      if (count > 1) {
        count--;
        productCountSpan.innerText = count;
        productData.count = count;
        
      }
    });

    butonAdaugare.addEventListener("click", function () {                      // functie setata pe buton pt a apela alta functie si a adauga in cos la final 
      adaugaInCosSP(productData);
      
      console.log(productData.count);
      
      count = 1;                                                               // de asemenea aceasta functie reseteaza counterul la 1 , atat in LS cat si in UI
      productData.count = count;
      productCountSpan.innerText = 1;

      console.log(productData.count);
    });

  } else {
    console.error("No product data found");                                    // retur daca nu merge citit LS ul
  }
  updateBreadcrumb();                                                          // aceast scope va fi apelat in dom loaded deci e bine sa apelam si functia de updateBreadcrumb pt a vedea sub nav numele produsului
}

function adaugaInCosSP(produs) {                                               // fata de adauga in cos clasic aceasta functie are in vedere si countul produsului deoarece adauga in cos clasic este din interfata home/shop unde countul nu e setat inca 
  const cosDinLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];   // se aduce array ul din LS
  const index = cosDinLocalStorage.findIndex((item) => item.id === produs.id); // index este o variabila ce verifica ce pozitie are produsul si daca e -1 nu exista in cart daca e de la 1 la inf exista
  
  if (index > -1) {                                                            // daca exista i se adauga countul existent la cel setat de butoanele -+
    cosDinLocalStorage[index].count =
      cosDinLocalStorage[index].count + produs.count;
  } else {                                                                     // in caz ca nu exista este inpins in LS impreuna cu un count setat in functia de printare
    cosDinLocalStorage.push(produs);
  }

  localStorage.setItem("cart", JSON.stringify(cosDinLocalStorage));            // arrayul este salvat din nou cu noua lui conditie 
  produseInCos(cosDinLocalStorage);                                            // dupa ce obiectul a fost adaugat in array cu un count potrivit se apeleaza functia care le printeaza in cos
  updateCartDisplay();                                                         // apoi se apeleaza functia care le updateaza indicele de cart/ nr articole
}


function updateBreadcrumb() {                                                  // functie ce are grija sa verifice de titlu si sa il afiseze sub nav pt un UI mai interactiv

  if (productData && productData.title) {
    const breadcrumbTextProduct = `${productData.title}`;
    document.querySelector(
      ".Product-breadcrumb"
    ).innerHTML = `<span>Home</span> &gt; <span>Shop</span> &gt; <div></div><p>${breadcrumbTextProduct}</p>`;
  } else {                                                                     // in caz ca lipseste va inlocui titlul din breadcrumb cu un scenariu general
    document.querySelector(
      ".Product-breadcrumb"
    ).innerHTML = `<div>Product not found</div>`;
  }
}
