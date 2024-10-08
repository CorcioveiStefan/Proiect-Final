const arrayCosProduseSalvat = JSON.parse(localStorage.getItem('cart')) || [];
const arrayCosProduse = arrayCosProduseSalvat;

// === Function to display a single product ===
const printeazaUnProdus = function (produs) {
  const _listaProduse = document.querySelector(".listaProduse");
  const _unProdus = document.createElement("div");
  _unProdus.classList.add('unProdus');
  _listaProduse.appendChild(_unProdus);

  _unProdus.innerHTML =
      `<div class="unProdusImg">
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
      <button style="display: none;">Adauga in Cos</button>
      <div class="ProdusOverlay"><div>`; // Start with display: none

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
    cosDinLocalStorage[index].count = (cosDinLocalStorage[index].count || 1) + 1;
  } else {
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

  _buttonSterge.addEventListener('click', function (){
  const cosDinLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
  const cosActualizat = cosDinLocalStorage.filter(item => item.id !== produsPrintat.id);

  localStorage.setItem('cart', JSON.stringify(cosActualizat));
  produseInCos(cosActualizat);;
  })

  _buttonMinus.addEventListener('click', function () {
    if(produsPrintat.count == 1) {
      _buttonMinus.style.backgroundColor = 'rgb(207, 207, 207)';
    }
    else if (produsPrintat.count > 1) {
      eliminareCantitateProdus(produsPrintat);
    }
  });

  _buttonPlus.addEventListener('click', function () {
    adaugareCantitateProdus(produsPrintat);
  });
}


function eliminareCantitateProdus (produs) {
  const cosDinLocalStorage = JSON.parse(localStorage.getItem('cart'));
  cosDinLocalStorage.forEach(item => {
    if (item.id === produs.id) {
      item.count--;
    }
  });
  localStorage.setItem('cart', JSON.stringify(cosDinLocalStorage));
  produseInCos(cosDinLocalStorage);
}


function adaugareCantitateProdus(produs) {
  const cosDinLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];  
  cosDinLocalStorage.forEach(item => {
    if (item.id === produs.id) {
      item.count++;
    }
  });
  localStorage.setItem('cart', JSON.stringify(cosDinLocalStorage));
  produseInCos(cosDinLocalStorage);
}

function produseInCos(produsePrintate) {                          
  const _cosProduse = document.querySelector(".cosProduse");       
  _cosProduse.innerHTML = ""; 
  
  

  produsePrintate.forEach(produsInCos);   
  
  const _pretProduse = document.querySelector("#cartDiv");

  const _totalDiv = document.createElement("div");                 
  _totalDiv.textContent = `Subtotal: $${pretFinal(produsePrintate).toFixed(2)}`;   
  _totalDiv.className = "totalDiv";                                
  _pretProduse.appendChild(_totalDiv);                              

  const _butonAchizitie = document.createElement("button");        
  _butonAchizitie.className = "butonAchizitie";                    
  _butonAchizitie.innerHTML = "Place Order";                   
  _butonAchizitie.addEventListener("click", trimiteComanda);       
  _pretProduse.appendChild(_butonAchizitie);  
}

function pretFinal(cumparaturi) {
  return cumparaturi.reduce((suma, produsCurent) => suma + (produsCurent.price * (produsCurent.count || 1)), 0);
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