
// MOBILE MENU NAVIGATION

const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

if (menuOpenButton) {
  menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
  });
}

if (menuCloseButton) {
  menuCloseButton.addEventListener("click", () => menuOpenButton.click());
}

// SWIPER SLIDER FOR SWEET REVIEWS
if (document.querySelector('.slider-wrapper')) {
  new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 25,
    pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
}

const menuData = {
  'macaron': { name: 'Strawberry Macarons', priceNum: 30000, image: 'images/macaron.png', price: 'Rp 30.000' },
  'cupcake': { name: 'Blueberry Cupcake', priceNum: 15000, image: 'images/cupcake.png', price: 'Rp 15.000' },
  'cookie': { name: 'Classic Cookie', priceNum: 12000, image: 'images/cookies.png', price: 'Rp 12.000' },
  'pudding': { name: 'Caramel Glazed Pudding', priceNum: 11000, image: 'images/puding.png', price: 'Rp 11.000' },
  'tiramisu': { name: 'Soft Tiramisu Cake', priceNum: 45000, image: 'images/tiramisu.png', price: 'Rp 45.000' },
  'cheesecake': { name: 'Burst Cheesecake', priceNum: 35000, image: 'images/cheesecake.png', price: 'Rp 35.000' },
  'icescoop': { name: 'Choco Vanilla Cone', priceNum: 18000, image: 'images/icescoop.png', price: 'Rp 18.000' },
  'coffe': { name: 'Hot Coffee', priceNum: 20000, image: 'images/kopi.png', price: 'Rp 20.000' },
  'matchalatte': { name: 'Matcha Latte', priceNum: 20000, image: 'images/matchacup.png', price: 'Rp 20.000' },
  'aren': { name: 'Aren Latte', priceNum: 22000, image: 'images/kopicup.png', price: 'Rp 22.000' },
  'matchacup': { name: 'Matcha Mist', priceNum: 23000, image: 'images/matchacup.png', price: 'Rp 23.000' },
  'taro': { name: 'Taro Velvet', priceNum: 18000, image: 'images/taro.png', price: 'Rp 18.000' },
  'oreo': { name: 'Oreo Shake', priceNum: 25000, image: 'images/orea.png', price: 'Rp 25.000' },
  'strobericup': { name: 'Strawberry Milkshake', priceNum: 25000, image: 'images/strobeicup.png', price: 'Rp 25.000' },
  'chococup': { name: 'Choco Lava', priceNum: 15000, image: 'images/chococup.png', price: 'Rp 15.000' },
  'pancake': { name: 'Honey Berry Pancake', priceNum: 38000, image: 'images/piring1.png', price: 'Rp 38.000' },
  'croissant': { name: 'Berry Glazed Croissant', priceNum: 20000, image: 'images/piring2.png', price: 'Rp 20.000' },
  'toast': { name: 'Raspberry Velvet Toast', priceNum: 20000, image: 'images/piring3.png', price: 'Rp 20.000' },
  'macarons': { name: 'Pastel Macaron Collection', priceNum: 120000, image: 'images/box1.png', price: 'Rp 120.000' },
  'cupcakes': { name: 'Strawberry Cupcakes Pack', priceNum: 77000, image: 'images/box2.png', price: 'Rp 77.000' },
  'donuts': { name: 'Sweet Glaze Donuts Pack', priceNum: 105000, image: 'images/box3.png', price: 'Rp 105.000' },
};

// INITIALIZE CART FROM LOCALSTORAGE
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// TOAST NOTIFICATION 
function showNotification(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// CORE FUNCTION: ADD TO CART ACTION 
function addToCart(itemName) {
  let itemData = menuData[itemName];

  if (!itemData) {
    const keyFound = Object.keys(menuData).find(key => menuData[key].name.toLowerCase() === itemName.toLowerCase());
    if (keyFound) itemData = menuData[keyFound];
  }

  if (!itemData) return;

  const itemExists = cart.find(item => (item.name === itemData.name || item.nama === itemData.name));

  if (itemExists) {
    if (itemExists.quantity !== undefined) itemExists.quantity += 1;
    else if (itemExists.jumlah !== undefined) itemExists.jumlah += 1;
    else itemExists.quantity = 2;
  } else {
    cart.push({
      name: itemData.name,
      priceNum: itemData.priceNum,
      quantity: 1,
      checked: true
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartBadge();
  displayCartItems();
  showNotification(`🍰 ${itemData.name} added to cart successfully!`);
}

// BACKWARD COMPATIBILITY FOR OLD HTML BUTTONS
function tambahKeKeranjang(itemName) {
  addToCart(itemName);
}

function updateCartBadge() {
  const cartBadge = document.getElementById('cart-count') || document.querySelector('.cart-badge');
  if (cartBadge) {
    const totalQty = cart.reduce((total, item) => total + (item.quantity || item.jumlah || 1), 0);
    cartBadge.innerText = totalQty;
  }
}

function increaseQuantity(name) {
  cart = cart.map(item => {
    if ((item.name || item.nama) === name) {
      if (item.quantity !== undefined) item.quantity += 1;
      else item.jumlah = (item.jumlah || 1) + 1;
    }
    return item;
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
  updateCartBadge();
}

function decreaseQuantity(name) {
  let shouldRemove = false;
  cart = cart.map(item => {
    if ((item.name || item.nama) === name) {
      let q = item.quantity || item.jumlah || 1;
      if (q > 1) {
        if (item.quantity !== undefined) item.quantity -= 1;
        if (item.jumlah !== undefined) item.jumlah -= 1;
      } else {
        shouldRemove = true;
      }
    }
    return item;
  });

  if (shouldRemove) {
    cart = cart.filter(item => (item.name || item.nama) !== name);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
  updateCartBadge();
}

function toggleItemCheckbox(name, checkedStatus) {
  cart = cart.map(item => {
    if ((item.name === name || item.nama === name)) item.checked = checkedStatus;
    return item;
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
  runCheckoutLogic();
}

function toggleSelectAll(masterCheckbox) {
  cart = cart.map(item => {
    item.checked = masterCheckbox.checked;
    return item;
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
  runCheckoutLogic();
}

function removeCartGroup(name) {
  cart = cart.filter(item => (item.name || item.nama) !== name);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
  updateCartBadge();
  runCheckoutLogic();
}

function clearAllCart() {
  if (confirm("Are you sure you want to empty your shopping cart?")) {
    cart = [];
    localStorage.removeItem('cart');
    displayCartItems();
    updateCartBadge();
    runCheckoutLogic();
  }
}

function displayCartItems() {
  const cartContainer = document.getElementById('cart-items-container');
  const subtotalElement = document.getElementById('summary-subtotal');
  const totalElement = document.getElementById('summary-total');
  const shippingEl = document.getElementById('summary-shipping');

  if (!cartContainer) return;
  cartContainer.innerHTML = '';

  let subtotalPrice = 0;
  const shippingFee = 10000;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div style="text-align: center; padding: 40px; color: #888; font-family: 'Poppins', sans-serif; width: 100%;">
         <p style="font-size: 1.1rem; margin-bottom: 10px;">Your shopping cart is empty...</p>
         <a href="index.html#menu" style="color: #800000; text-decoration: underline; font-weight:600;">Find your favorite treats!</a>
      </div>
    `;
    if (subtotalElement) subtotalElement.innerText = 'Rp 0';
    if (shippingEl) shippingEl.innerText = 'Rp 0';
    if (totalElement) totalElement.innerText = 'Rp 0';
    return;
  }

  const selectAllCb = document.getElementById('select-all-cart');
  if (selectAllCb) {
    selectAllCb.checked = cart.every(item => item.checked !== false);
  }

  cart.forEach(item => {
    const productName = item.name || item.nama || 'Product';
    const productPrice = item.priceNum || item.harga || 0;
    const productQty = item.quantity || item.jumlah || 1;
    const isChecked = item.checked !== false;

    if (isChecked) {
      subtotalPrice += productPrice * productQty;
    }

    let imgSource = 'images/default.png';
    const menuKey = Object.keys(menuData).find(key => menuData[key].name === productName);
    if (menuKey) imgSource = menuData[menuKey].image;

    const itemCard = document.createElement('div');
    itemCard.className = 'cart-item-card';

    itemCard.innerHTML = `
      <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleItemCheckbox('${productName}', this.checked)" style="transform: scale(1.3); margin-right: 15px; cursor: pointer; accent-color: #800000;">
      <img src="${imgSource}" alt="${productName}" onerror="this.src='images/default.png'">
      <div class="item-details">
        <h3>${productName}</h3>
        <span class="item-price">Rp ${productPrice.toLocaleString('id-ID')}</span>
      </div>
      <div class="item-quantity-controls">
        <button type="button" onclick="decreaseQuantity('${productName}')">-</button>
        <span style="font-weight: 600; color: #333; font-size: 16px; min-width: 20px; text-align: center;">${productQty}</span>
        <button type="button" onclick="increaseQuantity('${productName}')">+</button>
      </div>
      <button type="button" class="btn-remove-item" onclick="removeCartGroup('${productName}')">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;
    cartContainer.appendChild(itemCard);
  });

  const finalTotal = subtotalPrice > 0 ? subtotalPrice + shippingFee : 0;

  if (subtotalElement) subtotalElement.innerText = `Rp ${subtotalPrice.toLocaleString('id-ID')}`;
  if (shippingEl) shippingEl.innerText = subtotalPrice > 0 ? `Rp ${shippingFee.toLocaleString('id-ID')}` : 'Rp 0';
  if (totalElement) totalElement.innerText = `Rp ${finalTotal.toLocaleString('id-ID')}`;
}


// ORDER FORM / CHECKOUT LIVE DYNAMICS (order.html)

function updateProduct() {
  const productSelect = document.getElementById('product-select');
  const previewImg = document.getElementById('product-preview');
  const productName = document.getElementById('product-name');
  const productPrice = document.getElementById('product-price');
  const checkoutListContainer = document.getElementById('checkout-items-list');
  const shippingFee = 10000;

  if (!productSelect) return;
  const selectedKey = productSelect.value;
  const item = menuData[selectedKey];

  if (item) {
    if (productName) productName.innerText = item.name;
    if (productPrice) productPrice.innerText = item.price;
    if (previewImg) {
      previewImg.src = item.image;
      previewImg.alt = item.name;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const itemFromUrl = urlParams.get('item');
    const checkedItemsInCart = cart.filter(i => i.checked !== false);

    if (checkoutListContainer && (itemFromUrl || checkedItemsInCart.length === 0)) {
      checkoutListContainer.innerHTML = `
        <div style="background: #fdfbf7; padding: 15px; border-radius: 12px; border: 1px solid #f0e6e6; font-family: 'Poppins', sans-serif;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.95rem; color: #555;">
            <span>Subtotal</span>
            <span>Rp ${item.priceNum.toLocaleString('id-ID')}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem; color: #555;">
            <span>Shipping Fee</span>
            <span>Rp ${shippingFee.toLocaleString('id-ID')}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1rem; border-top: 1px dashed #e0dcd5; padding-top: 10px; color: #800000;">
            <span>Total</span>
            <span>Rp ${(item.priceNum + shippingFee).toLocaleString('id-ID')}</span>
          </div>
        </div>
      `;
    }
  }
}

function runCheckoutLogic() {
  const wrapper = document.getElementById('main-order-container');
  const summarySide = document.getElementById('checkout-summary-side');
  const checkoutListContainer = document.getElementById('checkout-items-list');
  const productSelect = document.getElementById('product-select');
  const shippingFee = 10000;

  const urlParams = new URLSearchParams(window.location.search);
  const itemFromUrl = urlParams.get('item');

  if (itemFromUrl) {
    if (productSelect) {
      const cleanName = decodeURIComponent(itemFromUrl).trim().toLowerCase();

      const keyFound = Object.keys(menuData).find(key =>
        key.toLowerCase() === cleanName ||
        menuData[key].name.toLowerCase() === cleanName
      );

      if (keyFound) {
        productSelect.value = keyFound;
      }
    }
    updateProduct();
  }
  else {
    const itemChecked = cart.filter(item => item.checked !== false);

    if (itemChecked.length === 0) {
      if (summarySide) summarySide.style.display = 'block';
      updateProduct();
      return;
    }

    if (summarySide) summarySide.style.display = 'none';
    if (wrapper) wrapper.style.maxWidth = "850px";

    if (!checkoutListContainer) return;
    checkoutListContainer.innerHTML = '';

    let cartSubtotal = 0;
    let productListHtml = '';

    itemChecked.forEach(item => {
      const productName = item.name || item.nama;
      const pricePerUnit = item.priceNum || item.harga || 0;
      const qty = item.quantity || item.jumlah || 1;
      const itemTotalPrice = pricePerUnit * qty;
      cartSubtotal += itemTotalPrice;

      let imgSource = 'images/default.png';
      const menuKey = Object.keys(menuData).find(key => menuData[key].name === productName);
      if (menuKey) imgSource = menuData[menuKey].image;

      productListHtml += `
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #fcf9f2; font-family: 'Poppins', sans-serif;">
          <img src="${imgSource}" style="width: 55px; height: 55px; object-fit: cover; border-radius: 8px; border: 1px solid #eee; flex-shrink: 0;" onerror="this.src='images/default.png'">
          <div style="flex: 1;">
            <h5 style="margin: 0; color: #333; font-size: 0.95rem; font-weight: 600;">${productName}</h5>
            <small style="color: #800000; font-weight: bold; font-size: 0.85rem;">Quantity: x${qty}</small>
          </div>
          <span style="font-size: 0.95rem; color: #444; font-weight: 500;">Rp ${itemTotalPrice.toLocaleString('id-ID')}</span>
        </div>
      `;
    });

    checkoutListContainer.innerHTML = `
      <div style="background: #fdfbf7; padding: 18px; border-radius: 15px; border: 1px solid #f0e6e6; font-family: 'Poppins', sans-serif;">
        <div style="max-height: 240px; overflow-y: auto; margin-bottom: 15px; padding-right: 5px;">
          ${productListHtml}
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 15px; margin-bottom: 8px; font-size: 0.95rem; color: #555; border-top: 1px solid #eee; padding-top: 12px;">
          <span>Subtotal</span>
          <span>Rp ${cartSubtotal.toLocaleString('id-ID')}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem; color: #555;">
          <span>Shipping Fee</span>
          <span>Rp ${shippingFee.toLocaleString('id-ID')}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.15rem; border-top: 1px dashed #e0dcd5; padding-top: 10px; color: #800000;">
          <span>Total Payment</span>
          <span>Rp ${(cartSubtotal + shippingFee).toLocaleString('id-ID')}</span>
        </div>
      </div>
    `;
  }
}


// WINDOW ONLOAD INITIALIZATION

window.onload = function () {
  displayCartItems();
  runCheckoutLogic();
  updateCartBadge();

  const productSelect = document.getElementById('product-select');
  if (productSelect) {
    productSelect.addEventListener('change', updateProduct);
  }
};


orderButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const item = {
      name: e.target.getAttribute("data-name"),
      image: e.target.getAttribute("data-image"),
      price: e.target.getAttribute("data-price"),
      qty: 1
    };
    localStorage.setItem("selectedItem", JSON.stringify(item));

  });
});





function updateProduct() {
  const productSelect = document.getElementById('product-select');
  const productQty = document.getElementById('product-qty');
  const productName = document.getElementById('product-name');
  const productPrice = document.getElementById('product-price');
  const previewImg = document.getElementById('product-preview');

  if (!productSelect || !productQty) return;

  const item = menuData[productSelect.value];
  const qty = parseInt(productQty.value) || 1;

  if (item) {
    if (productName) productName.innerText = item.name;
    if (productPrice) productPrice.innerText = "Rp " + (item.price * qty).toLocaleString('id-ID');
    if (previewImg) {
      previewImg.src = item.image;
    }
  }
}


window.addEventListener('DOMContentLoaded', () => {

  const itemKey = localStorage.getItem('pilihanMenu');
  const productSelect = document.getElementById('product-select');

  if (itemKey && productSelect) {
    productSelect.value = itemKey;
    updateProduct();

    localStorage.removeItem('pilihanMenu');
  }
});


const orderForm = document.getElementById('order-form');
if (orderForm) {
  orderForm.addEventListener('submit', function (e) {
    e.preventDefault();

  });
}