// Get the cart button, cartDiv, and overlay elements
const cartButton = document.getElementById('cartButton');
const cartDiv = document.getElementById('cartDiv');
const cartOverlay = document.getElementById('overlay');

// Function to show the cart and overlay
cartButton.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the default link behavior
  cartDiv.style.display = 'block'; // Show the cartDiv
  cartOverlay.style.display = 'block'; // Show the overlay
});

// Function to hide the cart and overlay when the overlay is clicked
cartOverlay.addEventListener('click', () => {
  cartDiv.style.display = 'none'; // Hide the cartDiv
  cartOverlay.style.display = 'none'; // Hide the overlay
});



