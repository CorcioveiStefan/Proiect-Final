let currentPage = 1;
const productsPerPage = 8;
const totalProducts = 20;

const printeazaProdusePaginate = (produseStoc, paginaCurenta) => {
  const _listaProduse = document.querySelector(".listaProduse");
  _listaProduse.innerHTML = "";

  const startIndex = (paginaCurenta - 1) * productsPerPage;
  const endIndex = paginaCurenta * productsPerPage;
  const produseDeAfisat = produseStoc.slice(startIndex, endIndex);
  printeazaToateProdusele(produseDeAfisat);

  updatePageBlocks(paginaCurenta, produseStoc.length);

  updatePaginationButtons(produseStoc.length);

  updateBreadcrumb(paginaCurenta, productsPerPage, produseStoc.length);
};

const aduProduseleDeLaServer = async function () {
  try {
    const url = `https://fakestoreapi.com/products`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const produse = await response.json();
    localStorage.setItem("products", JSON.stringify(produse));
    printeazaProdusePaginate(produse, currentPage);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};

function loadInitialProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  if (products.length > 0) {
    printeazaProdusePaginate(products, currentPage);
  } else {
    aduProduseleDeLaServer();
  }
}

function loadPreviousPage() {
  currentPage--;
  loadCurrentPageProducts();
}

function loadNextPage() {
  currentPage++;
  loadCurrentPageProducts();
}

function loadCurrentPageProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const totalPages = Math.ceil(products.length / productsPerPage);

  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  printeazaProdusePaginate(products, currentPage);
}

function updatePaginationButtons(totalProducts) {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  document.querySelector(".prevPage").style.display =
    currentPage === 1 ? "none" : "inline-block";

  document.querySelector(".nextPage").style.display =
    currentPage === totalPages ? "none" : "inline-block";
}

function updatePageBlocks(currentPage, totalProducts) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  let startPage = Math.max(currentPage - 1, 1);
  let endPage = Math.min(currentPage + 1, totalPages);

  if (endPage - startPage < 2) {
    if (startPage === 1) {
      endPage = Math.min(3, totalPages);
    } else {
      startPage = Math.max(endPage - 2, 1);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.classList.add("pageBlock");
    pageButton.setAttribute("data-page", i);
    pageButton.addEventListener("click", () => {
      currentPage = i;
      loadCurrentPageProducts();
    });
    paginationContainer.appendChild(pageButton);
  }
}

document.querySelector(".prevPage").addEventListener("click", loadPreviousPage);
document.querySelector(".nextPage").addEventListener("click", loadNextPage);

document.addEventListener("DOMContentLoaded", loadInitialProducts);

function updateBreadcrumb(currentPage, productsPerPage, totalProducts) {
  const start = (currentPage - 1) * productsPerPage + 1;
  const end = Math.min(currentPage * productsPerPage, totalProducts);

  const breadcrumbText = `Showing ${start}–${end} of ${totalProducts} results`;
  document.querySelector(
    ".shop-breadcrumb"
  ).innerHTML = `<div>${breadcrumbText}</div>`;
}
