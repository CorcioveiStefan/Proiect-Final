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

function updateCartDisplay() {
  const cartButton = document.getElementById("cartButton");
  let cartItemCount = document.getElementById("cartItemCount");

  if (!cartItemCount) {
    cartItemCount = document.createElement("span");
    cartItemCount.id = "cartItemCount";
    cartItemCount.style.position = "absolute";
    cartItemCount.style.top = "-9px";
    cartItemCount.style.right = "-9px";
    cartItemCount.style.backgroundColor = "red";
    cartItemCount.style.color = "white";
    cartItemCount.style.borderRadius = "50%";
    cartItemCount.style.fontSize = "10px";

    cartItemCount.style.alignSelf = "center";
    cartItemCount.style.padding = "0 6px";
    cartButton.appendChild(cartItemCount);
  }

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartItems.length > 0) {
    cartItemCount.textContent = cartItems.length;
    cartItemCount.style.display = "inline";
  } else {
    cartItemCount.style.display = "none";
  }
}


function checkoutPage(url) {
  window.location.href = url;
}
const currentPageCheckout = window.location.pathname;

if (currentPageCheckout.includes("Home.html")) {
  checkoutPage("Checkout/Checkout.html");
} else {
  checkoutPage("../Checkout/Checkout.html");
}



document.addEventListener("DOMContentLoaded", () => {
  produseInCos(arrayCosProduse);
  updateCartDisplay();
});