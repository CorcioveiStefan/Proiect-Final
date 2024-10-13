document.addEventListener("DOMContentLoaded", updateCheckoutDisplay);

const toggleButton = document.getElementById("toggleButton");

toggleButton.addEventListener("click", function () {
  toggleButton.classList.toggle("on");
});

function updateCheckoutDisplay() {
  const cartData = JSON.parse(localStorage.getItem("checkoutProduct")) || [];
  const productSection = document.querySelector(".cart-checkout .product-list");
  const subtotalList = document.querySelector(".cart-checkout .subtotal-list");
  let totalAmount = 0;

  productSection.innerHTML = "";
  subtotalList.innerHTML = "";

  cartData.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-item");
    productDiv.innerHTML = `
        <div class="product-title">${product.title}</div>
        <div class="product-count">x ${product.count}</div>
    `;
    productSection.appendChild(productDiv);

    const subtotalDiv = document.createElement("div");
    const subtotal = product.price * product.count;
    totalAmount += subtotal;
    subtotalDiv.classList.add("subtotal-item");
    subtotalDiv.textContent = `$${subtotal.toFixed(2)}`;
    subtotalList.appendChild(subtotalDiv);
  });

  document.querySelector(
    ".cart-checkout .total"
  ).textContent = `$${totalAmount.toFixed(2)}`;
  document.querySelector(
    ".cart-checkout .subtotal-calculated"
  ).textContent = `$${totalAmount.toFixed(2)}`;
}
