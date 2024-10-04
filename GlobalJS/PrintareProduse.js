// PrintareProduse.js

// === Function to display a single product ===
export const printeazaUnProdus = function (produs) {
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
    <button>Adauga in Cos</button>`;

  const butonAdaugare = _unProdus.querySelector('button');
  butonAdaugare.addEventListener('click', function () {
    adaugaInCos(produs);
  });
};

// === Function to display all products (or a subset for pagination) ===
export const printeazaToateProdusele = (produseStoc) => {
  const _listaProduse = document.querySelector(".listaProduse");
  produseStoc.forEach((produs) => printeazaUnProdus(produs));
};
