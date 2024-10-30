const cartButton = document.getElementById("cartButton");  // selectam buton cart din nav , cart div si overley
const cartDiv = document.getElementById("cartDiv");
const cartOverlay = document.getElementById("overlay");

cartButton.addEventListener("click", (e) => {              // pe cart/nav punem event ce deschide cart si previne default
  e.preventDefault();
  cartDiv.style.display = "block";
  cartOverlay.style.display = "block";
  
});

cartOverlay.addEventListener("click", () => {             // pe overley punem event sa se inchida cart+overley din click
  cartDiv.style.display = "none";
  cartOverlay.style.display = "none";
});

function updateCartDisplay() {                            // functie pt breadcrumbul de la cart care indica cate produse sunt inauntru
  let cartItemCount = document.getElementById("cartItemCount");
                                                          // il selectam desi el nu se afla in html , el poate fi deja generat in alte sesiuni
  if (!cartItemCount) {                                   // daca nu este atunci se creaza dupa cerintele de mai jos
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
    cartButton.appendChild(cartItemCount);               // dupa ce primeste stiluri si id este atasat la cart din nav 
  }

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];     // se verifica daca cartul are goodies

  if (cartItems.length > 0) {                            // daca da breadcrumb devine display inline cu text content nr produse
    cartItemCount.textContent = cartItems.length;
    cartItemCount.style.display = "inline";
  } else {                                               // daca nu display none
    cartItemCount.style.display = "none";
  }
}


document.addEventListener("DOMContentLoaded", () => {   
  produseInCos(arrayCosProduse);
  updateCartDisplay();
});