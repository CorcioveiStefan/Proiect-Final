const cartButton = document.getElementById("cartButton");
const cartDiv = document.getElementById("cartDiv");
const cartOverlay = document.getElementById("overlay");

cartButton.addEventListener("click", (e) => {
  e.preventDefault();
  cartDiv.style.display = "block";
  cartOverlay.style.display = "block";
});

cartOverlay.addEventListener("click", () => {
  cartDiv.style.display = "none";
  cartOverlay.style.display = "none";
});
