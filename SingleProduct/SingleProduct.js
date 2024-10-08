document.addEventListener('DOMContentLoaded', () => {
  const productData = JSON.parse(localStorage.getItem('selectedProduct'));

  if (productData) {
      const produsContainer = document.querySelector('.produs');
      
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
            <p class= "description">${productData.description}</p>
            
          </div>
      `;
  } else {
      // Handle case where no product data is found (e.g., show an error message)
      console.error('No product data found');
  }
});