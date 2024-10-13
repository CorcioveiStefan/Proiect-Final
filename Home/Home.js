let currentPage = 1;
const productsPerPage = 8;

const printeazaProdusePaginate = (produseStoc, paginaCurenta) => {
  const startIndex = (paginaCurenta - 1) * productsPerPage;
  const endIndex = paginaCurenta * productsPerPage;
  const produseDeAfisat = produseStoc.slice(startIndex, endIndex);
  printeazaToateProdusele(produseDeAfisat);
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

function loadMoreProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  printeazaProdusePaginate(products, currentPage);
}

const butonShowMore = document.querySelector(".buttonMain button");
butonShowMore.addEventListener("click", function () {
  currentPage++;
  loadMoreProducts();
});

document.addEventListener("DOMContentLoaded", loadInitialProducts);
