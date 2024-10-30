const favoriteButton = document.getElementById("favoriteButton");
const favoriteDiv = document.getElementById("favoriteDiv");
const favoriteOverlay = document.getElementById("favoriteoverlay");

favoriteButton.addEventListener("click", (e) => {
  e.preventDefault();
  favoriteDiv.style.display = "block";
  favoriteOverlay.style.display = "block";
});

favoriteOverlay.addEventListener("click", () => {
  favoriteDiv.style.display = "none";
  favoriteOverlay.style.display = "none";
});

function updateFavoriteDisplay() {
  let favoriteItemCount = document.getElementById("favoriteItemCount");

  if (!favoriteItemCount) {
    favoriteItemCount = document.createElement("span");
    favoriteItemCount.id = "favoriteItemCount";
    favoriteItemCount.style.position = "absolute";
    favoriteItemCount.style.top = "-9px";
    favoriteItemCount.style.right = "-10px";
    favoriteItemCount.style.backgroundColor = "red";
    favoriteItemCount.style.color = "white";
    favoriteItemCount.style.borderRadius = "50%";
    favoriteItemCount.style.fontSize = "10px";

    favoriteItemCount.style.alignSelf = "center";
    favoriteItemCount.style.padding = "0 6px";
    favoriteButton.appendChild(favoriteItemCount);
  }

  const favoriteItems = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favoriteItems.length > 0) {
    favoriteItemCount.textContent = favoriteItems.length;
    favoriteItemCount.style.display = "inline";
  } else {
    favoriteItemCount.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateFavoriteDisplay();
});