let currentPage = 1;
const productsPerPage = 8;
const totalProducts = 20;

// === Function to handle paginated product display ===
const printeazaProdusePaginate = (produseStoc, paginaCurenta) => {
    const _listaProduse = document.querySelector('.listaProduse');
    _listaProduse.innerHTML = ''; // Clear previous products

    const startIndex = (paginaCurenta - 1) * productsPerPage;
    const endIndex = paginaCurenta * productsPerPage;
    const produseDeAfisat = produseStoc.slice(startIndex, endIndex);
    printeazaToateProdusele(produseDeAfisat);

    // Update page blocks
    updatePageBlocks(paginaCurenta, produseStoc.length);

    // Show/Hide buttons based on the current page
    updatePaginationButtons(produseStoc.length);
    
    // Update breadcrumb
    updateBreadcrumb(paginaCurenta, productsPerPage, produseStoc.length); // Update breadcrumb here
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

// === Load previous page ===
function loadPreviousPage() {
    currentPage--;
    loadCurrentPageProducts();
}

// === Load next page ===
function loadNextPage() {
    currentPage++;
    loadCurrentPageProducts();
}

// === Load current page products ===
function loadCurrentPageProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Prevent going out of bounds
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    printeazaProdusePaginate(products, currentPage);
}

// === Update pagination buttons visibility ===
function updatePaginationButtons(totalProducts) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    // Hide the Previous button if on the first page
    document.querySelector('.prevPage').style.display = currentPage === 1 ? 'none' : 'inline-block';

    // Hide the Next button if on the last page
    document.querySelector('.nextPage').style.display = currentPage === totalPages ? 'none' : 'inline-block';
}

// === Update page blocks dynamically ===
function updatePageBlocks(currentPage, totalProducts) {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = ''; // Clear previous page blocks

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    // Calculate the range of page numbers to display
    let startPage = Math.max(currentPage - 1, 1);
    let endPage = Math.min(currentPage + 1, totalPages);

    // Adjust the start page if there are less than 3 pages
    if (endPage - startPage < 2) {
        if (startPage === 1) {
            endPage = Math.min(3, totalPages);
        } else {
            startPage = Math.max(endPage - 2, 1);
        }
    }

    // Create pagination buttons for the calculated range
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.classList.add('pageBlock');
        pageButton.setAttribute('data-page', i);
        pageButton.addEventListener('click', () => {
            currentPage = i;
            loadCurrentPageProducts();
        });
        paginationContainer.appendChild(pageButton);
    }
}

// === Event listeners for pagination buttons ===
document.querySelector('.prevPage').addEventListener('click', loadPreviousPage);
document.querySelector('.nextPage').addEventListener('click', loadNextPage);

// === Load the initial products when the page is ready ===
document.addEventListener('DOMContentLoaded', loadInitialProducts);

// === Update breadcrumb function ===
function updateBreadcrumb(currentPage, productsPerPage, totalProducts) {
    const start = (currentPage - 1) * productsPerPage + 1; // Calculate the starting index
    const end = Math.min(currentPage * productsPerPage, totalProducts); // Calculate the ending index

    const breadcrumbText = `Showing ${start}–${end} of ${totalProducts} results`;
    document.querySelector('.shop-breadcrumb').innerHTML = `<div>${breadcrumbText}</div>`;
}
