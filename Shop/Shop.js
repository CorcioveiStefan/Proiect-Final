let currentPage = 1;
let productsPerPage = 8;
let order = "asc";
let selectedCategory ="";

// Fetch products from localStorage or API
async function aduProduseleDeLaServer() {
  try {
    const url = selectedCategory 
      ? `https://fakestoreapi.com/products/category/${selectedCategory}?sort=${order}` 
      : `https://fakestoreapi.com/products?sort=${order}`; 

    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const produse = await response.json();
    localStorage.setItem("products", JSON.stringify(produse));
    loadCurrentPageProducts(); // Load the first page
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

// Display products for the current page
function printeazaProdusePaginate(paginaCurenta) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const startIndex = (paginaCurenta - 1) * productsPerPage;
  const endIndex = paginaCurenta * productsPerPage;
  const produseDeAfisat = products.slice(startIndex, endIndex);

  const _listaProduse = document.querySelector(".listaProduse");
  _listaProduse.innerHTML = ""; // Clear previous products
  printeazaToateProdusele(produseDeAfisat); // Call your function to print products
  updatePageBlocks(products.length); // Update pagination blocks
  updatePaginationButtons(products.length); // Show/hide buttons
  updateBreadcrumb(paginaCurenta, productsPerPage, products.length); // Update breadcrumb

  localStorage.setItem("currentProductsShop", JSON.stringify(produseDeAfisat));
}

window.printeazaProdusePaginate = printeazaProdusePaginate;

// Load the initial products
function loadInitialProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  if (products.length > 0) {
    printeazaProdusePaginate(currentPage);
  } else {
    aduProduseleDeLaServer();
  }
}

// Load the current page products
function loadCurrentPageProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Ensure currentPage stays within bounds
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  printeazaProdusePaginate(currentPage); // Display products for the current page
}

// Load previous page
function loadPreviousPage() {
  currentPage--; // Decrement page
  loadCurrentPageProducts(); // Load products for the new page
}

// Load next page
function loadNextPage() {
  currentPage++; // Increment page
  loadCurrentPageProducts(); // Load products for the new page
}

// Update pagination buttons visibility
function updatePaginationButtons(totalProducts) {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  document.querySelector(".prevPage").style.display = currentPage === 1 ? "none" : "inline-block";
  document.querySelector(".nextPage").style.display = currentPage === totalPages ? "none" : "inline-block";
}

// Update page blocks (page number buttons)
function updatePageBlocks(totalProducts) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(totalProducts / productsPerPage);
  let startPage = Math.max(currentPage - 1, 1);
  let endPage = Math.min(currentPage + 1, totalPages);

  

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.classList.add("pageBlock");

    if (i === currentPage) {
      pageButton.classList.add("active"); // Highlight current page
    }

    // Add event listener for page button
    pageButton.addEventListener("click", () => {
      currentPage = i; // Update currentPage
      loadCurrentPageProducts(); // Load products for the selected page
    });

    paginationContainer.appendChild(pageButton);
  }
}

// Set up event listeners for navigation buttons
document.querySelector(".prevPage").addEventListener("click", loadPreviousPage);
document.querySelector(".nextPage").addEventListener("click", loadNextPage);
document.addEventListener("DOMContentLoaded", loadInitialProducts);

// Update breadcrumb info
function updateBreadcrumb(currentPage, productsPerPage, totalProducts) {
  const start = (currentPage - 1) * productsPerPage + 1;
  const end = Math.min(currentPage * productsPerPage, totalProducts);
  const breadcrumbText = `Showing ${start}–${end} of ${totalProducts} results`;
  document.querySelector(".shop-breadcrumb").innerHTML = `<div>${breadcrumbText}</div>`;
}

const productPerPageElement = document.querySelector('#productPerPage');
productPerPageElement.addEventListener('change', function (event) {
  productsPerPage = +event.target.value;
  currentPage = 1;
  loadInitialProducts();
})

const orderElement = document.querySelector('#order'); 
orderElement.addEventListener('change', function (event) {
  order = event.target.value;
  aduProduseleDeLaServer();
})

const categoryElement = document.querySelector('#category');
categoryElement.addEventListener('change', function (event){
  selectedCategory = event.target.value;
  currentPage = 1;
  aduProduseleDeLaServer();
})

document.getElementById("toggleButtonFilters").addEventListener("click", function() {
  const buttonsDiv = document.querySelector(".buttonsMain-top");
  buttonsDiv.style.display = buttonsDiv.style.display === "none" ? "flex" : "none";
});
