// Obține elementele pentru butonul de cart, cartDiv și overlay
const cartButton = document.getElementById('cartButton'); // Butonul pentru cart
const cartDiv = document.getElementById('cartDiv'); // Div-ul care conține produsele din cart
const cartOverlay = document.getElementById('overlay'); // Overlay-ul care acoperă restul paginii

// Funcție pentru a arăta cart-ul și overlay-ul
cartButton.addEventListener('click', (e) => {
  e.preventDefault(); // Previne comportamentul implicit al link-ului
  cartDiv.style.display = 'block'; // Afișează cart-ul
  cartOverlay.style.display = 'block'; // Afișează overlay-ul
});

// Funcție pentru a ascunde cart-ul și overlay-ul când overlay-ul este clicat
cartOverlay.addEventListener('click', () => {
  cartDiv.style.display = 'none'; // Ascunde cart-ul
  cartOverlay.style.display = 'none'; // Ascunde overlay-ul
});

