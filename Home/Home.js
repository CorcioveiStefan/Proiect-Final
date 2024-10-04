import { printeazaUnProdus, printeazaToateProdusele } from '../GlobalJS/PrintareProduse.js';

let currentPage = 1;
const productsPerPage = 8;

// === Function to handle paginated product display ===
const printeazaProdusePaginate = (produseStoc, paginaCurenta) => {
  const startIndex = (paginaCurenta - 1) * productsPerPage;
  const endIndex = paginaCurenta * productsPerPage;
  const produseDeAfisat = produseStoc.slice(startIndex, endIndex);
  printeazaToateProdusele(produseDeAfisat);
};

// === Fetch products from the server ===
const aduProduseleDeLaServer = async function () {
  try {
    const url = `https://fakestoreapi.com/products`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const produse = await response.json();
    localStorage.setItem('products', JSON.stringify(produse));
    printeazaProdusePaginate(produse, currentPage);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

// === Load products from local storage ===
function loadInitialProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  if (products.length > 0) {
    printeazaProdusePaginate(products, currentPage);
  } else {
    aduProduseleDeLaServer();
  }
}

// === Load more products when "Show More" button is clicked ===
function loadMoreProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  printeazaProdusePaginate(products, currentPage);
}

// === Event listener for the "Show More" button ===
const butonShowMore = document.querySelector('.buttonMain button');
butonShowMore.addEventListener('click', function () {
  currentPage++;
  loadMoreProducts();
});

// === Load the initial products when the page is ready ===
document.addEventListener('DOMContentLoaded', loadInitialProducts);
