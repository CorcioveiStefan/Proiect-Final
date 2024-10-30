let currentPage = 1; // Pagina curenta
const productsPerPage = 8; // Numărul de produse pe pagină

// Funcția pentru a afișa produsele paginată
function printeazaProdusePaginateHome(produseStoc, paginaCurenta) {
  const startIndex = (paginaCurenta - 1) * productsPerPage; // Indexul de început pentru produse
  const endIndex = paginaCurenta * productsPerPage; // Indexul de sfârșit pentru produse
  const produseDeAfisat = produseStoc.slice(startIndex, endIndex); // Produsele de afișat pentru pagina curentă
  printeazaToateProdusele(produseDeAfisat); // Afișează produsele
};

// Funcția pentru a aduce produsele de la server
const aduProduseleDeLaServer = async function () {
  try {
    const url = `https://fakestoreapi.com/products`; // URL-ul de la care se obțin produsele
    const response = await fetch(url); // Face cererea fetch
    if (!response.ok) throw new Error("Network response was not ok"); // Verifică dacă răspunsul este ok
    const produse = await response.json(); // Transformă răspunsul în format JSON
    localStorage.setItem("productsHome", JSON.stringify(produse)); // Salvează produsele în localStorage
    printeazaProdusePaginateHome(produse, currentPage); // Afișează produsele paginată
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error); // Gestionează erorile
  }
};

// Funcția pentru a încărca produsele inițiale
function loadInitialProducts() {
  const products = JSON.parse(localStorage.getItem("productsHome")) || []; // Obține produsele din localStorage
  console.log(products);
  if (products.length > 0) {
    printeazaProdusePaginateHome(products, currentPage); // Afișează produsele din localStorage
  } else {
    aduProduseleDeLaServer(); // Aduce produsele de la server dacă nu sunt în localStorage
  }
}

// Funcția pentru a încărca mai multe produse
function loadMoreProducts() {
  const products = JSON.parse(localStorage.getItem("productsHome")) || []; // Obține produsele din localStorage
  printeazaProdusePaginateHome(products, currentPage); // Afișează produsele
}


// Selectează butonul "Show More" și adaugă un event listener
const butonShowMore = document.querySelector(".buttonMain button");
butonShowMore.addEventListener("click", function () {
  currentPage++; // Crește pagina curentă
  loadMoreProducts(); // Încarcă mai multe produse
});

// Așteaptă ca documentul să fie complet încărcat înainte de a încărca produsele inițiale
document.addEventListener("DOMContentLoaded", loadInitialProducts);
