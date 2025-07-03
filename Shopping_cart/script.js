window.addEventListener("DOMContentLoaded", () => {
  
  const btnCart      = document.getElementById("cart-icon");
  const btnClose     = document.getElementById("cart-close");
  const cartSidebar  = document.querySelector(".cart");
  const cartContent  = document.querySelector(".cart-content");
  const shopContent  = document.querySelector(".shop-content");
  const badge        = document.querySelector(".cart-count");
  const totalPriceEl = document.querySelector(".total-price");

  
  btnCart.addEventListener("click", () => cartSidebar.classList.add("cart-active"));
  btnClose.addEventListener("click", () => cartSidebar.classList.remove("cart-active"));

  
  shopContent.addEventListener("click", (e) => {
    if (!e.target.classList.contains("add-cart")) return; 

    const card   = e.target.closest(".food-box");
    const title  = card.querySelector(".food-title").textContent.trim();
    const price  = parseFloat(card.querySelector(".food-price").textContent.replace("Rs.", ""));
    const imgSrc = card.querySelector(".food-img").src;

    
    const row = Array.from(cartContent.querySelectorAll(".cart-box")).find((box) =>
      box.querySelector(".cart-food-title").textContent.trim() === title
    );

    if (row) {
      
      const qtyInput = row.querySelector(".cart-quantity");
      qtyInput.value = parseInt(qtyInput.value) + 1;
    } else {
      
      const newRow = document.createElement("div");
      newRow.className = "cart-box";
      newRow.innerHTML = `
        <img src="${imgSrc}" class="cart-img" />
        <div class="detail-box">
          <div class="cart-food-title">${title}</div>
          <div class="price-box">
            <div class="cart-price" data-unit="${price}">Rs.${price}</div>
            <div class="cart-amt">Rs.${price}</div>
          </div>
          <input type="number" value="1" min="1" class="cart-quantity" />
        </div>
        <ion-icon name="trash" class="cart-remove"></ion-icon>`;
      cartContent.appendChild(newRow);
    }

    updateTotals();
  });

  
  cartContent.addEventListener("input", (e) => {
    if (!e.target.classList.contains("cart-quantity")) return;
    e.target.value = Math.max(1, parseInt(e.target.value) || 1);
    updateTotals();
  });

  
  cartContent.addEventListener("click", (e) => {
    if (!e.target.classList.contains("cart-remove")) return;
    e.target.closest(".cart-box").remove();
    updateTotals();
  });

  
  function updateTotals() {
    let grandTotal = 0;
    let count      = 0;

    cartContent.querySelectorAll(".cart-box").forEach((box) => {
      const priceBox = box.querySelector(".cart-price");
      
      let unit = parseFloat(priceBox.dataset.unit);
      if (isNaN(unit)) {
        unit = parseFloat(priceBox.textContent.replace("Rs.", ""));
        priceBox.dataset.unit = unit;
      }
      const qty  = parseInt(box.querySelector(".cart-quantity").value) || 0;

      const lineTotal = unit * qty;
      box.querySelector(".cart-amt").textContent = `Rs.${lineTotal}`;

      grandTotal += lineTotal;
      count      += qty;
    });

    totalPriceEl.textContent = `Rs.${grandTotal}`;
    badge.textContent        = count;
    badge.style.display      = count ? "block" : "none";
  }

  
  updateTotals();
});




