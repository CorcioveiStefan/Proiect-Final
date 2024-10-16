document.addEventListener("DOMContentLoaded", updateCheckoutDisplay); //apelez functia updateCheckoutDisplay() la incarcarea paginii

const toggleButton = document.getElementById("toggleButton");         //buton pentru a determina metoda de plata      

toggleButton.addEventListener("click", function () {
  toggleButton.classList.toggle("on");
});

function updateCheckoutDisplay() {
  const cartData = JSON.parse(localStorage.getItem("checkoutProduct")) || [];    //preia data trimisa de butonul checkout din cart unde se si creeaza LS ul pt checkoutProduct
  const productSection = document.querySelector(".cart-checkout .product-list"); //selectez linia titlu 
  const subtotalList = document.querySelector(".cart-checkout .subtotal-list");  //selectez linia pret
  let totalAmount = 0;                                                           //declar un total final in scope ul acestei functii                                 

  productSection.innerHTML = "";                                                 //golesc ca sa evit suprapopulare in cele 2 "tabele" ale checkout
  subtotalList.innerHTML = "";

  cartData.forEach((product) => {                                                //la fiecare obiect din cartData 
    const productDiv = document.createElement("div");                            //fac un div
    productDiv.classList.add("product-item");                                    //dau clasa si ii zic cum sa arata
    productDiv.innerHTML = `                                                     
        <div class="product-title">${product.title}</div>
        <div class="product-count">x ${product.count}</div>
    `;
    productSection.appendChild(productDiv);                                      //il bag in productSection din scopul mare

    const subtotalDiv = document.createElement("div");                           //repet la fiecare obiect fac un div
    subtotalDiv.classList.add("subtotal-item");                                  //dau o clasa
    const subtotal = product.price * product.count;                              // creez o var ce va fi pret*nr bucati date ce vin din cart
    subtotalDiv.textContent = `$${subtotal.toFixed(2)}`;                         //hotarasc continutul sa fie un text cu var de mai sus trimuita la 2 nr dupa virgula
    subtotalList.appendChild(subtotalDiv);                                       //il bag in subtotalList din scope ul mare

    totalAmount += subtotal;                                                     // am grija ca toate subtotalele din fiecare produs sa se adune la totalCount din scope ul mare
  });

  document.querySelector(
    ".cart-checkout .total"                                                     //urmatorul div se ocupa de sub total adica totalAmount
  ).textContent = `$${totalAmount.toFixed(2)}`;
  document.querySelector(
    ".cart-checkout .subtotal-calculated"                                      //si mai este unul pt total dar nu percep tva
  ).textContent = `$${totalAmount.toFixed(2)}`;
}

let isFormComplete = false;                                                   // formular completat variabila de check                          

const billInfo = document.querySelector(".left-section form");                //selectez formular 
const inputs = billInfo.querySelectorAll("input");                            //selectez input uri din formular

function checkFormCompleteness() {                                            //functie care verifica daca var de mai sus e truthy/falsy
  isFormComplete = Array.from(inputs).every((input) => input.value.trim() !== ""  );                             //var de mai sus este egala cu Array ul din imputs

}

inputs.forEach((input) => {
  input.addEventListener("input", checkFormCompleteness);
});


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
