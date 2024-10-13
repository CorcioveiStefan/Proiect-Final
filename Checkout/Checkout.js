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

let isFormComplete = false;

const billInfo = document.querySelector(".left-section form");
const inputs = billInfo.querySelectorAll("input");

function checkFormCompleteness() {
  isFormComplete = Array.from(inputs).every(
    (input) => input.value.trim() !== ""
  );
}

inputs.forEach((input) => {
  input.addEventListener("input", checkFormCompleteness);
});

checkFormCompleteness();

const sendComButton = document.querySelector(".butonCheckout button");
sendComButton.addEventListener("click", () => {
  const isCheckoutAllowed = JSON.parse(localStorage.getItem("isLoggedIn"));
  const cartData = JSON.parse(localStorage.getItem("checkoutProduct")) || [];

  if (isCheckoutAllowed & isFormComplete & (cartData.length > 0)) {
    trimiteComanda();
  } else if (!isCheckoutAllowed) {
    alert("Checkout is not allowed. Please login first.");
  } else if (!isFormComplete) {
    alert("Checkout is not allowed. Complete the form first.");
  } else if (cartData.length == 0) alert("Add products to order.");
});

async function trimiteComanda() {
  const cartData = JSON.parse(localStorage.getItem("checkoutProduct")) || [];

  const continutBody = JSON.stringify({
    order: cartData.map((produs) => produs.id),
  });

  try {
    const response = await fetch("https://paulghiran.com/messages/order.php", {
      headers: {
        "Content-Type": "application/json",
        userkey: "london",
      },
      method: "POST",
      body: continutBody,
    });

    if (response.ok) {
      alert("Order successfully placed!");
      localStorage.removeItem("checkoutProduct");
      localStorage.removeItem("cart");
      location.reload();
    } else {
      alert("Failed to place the order. Please try again.");
    }
  } catch (error) {
    alert("Error sending order. Please check your connection and try again.");
    console.error("Error sending order:", error);
  }
}
