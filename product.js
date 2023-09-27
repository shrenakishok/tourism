//scroll to top function
let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let progressValue = document.getElementById("progress-value");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  scrollProgress.style.background = `conic-gradient(#23395B ${scrollValue}%, #7D98A1 ${scrollValue}%)`;
};
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

//function for the cart animation
document.querySelectorAll(".additem").forEach((additem) =>
    additem.addEventListener("click", (e) => {
        if (!additem.classList.contains("loading")) {
            additem.classList.add("loading");
            setTimeout(() => additem.classList.remove("loading"), 3000);
        }
        e.preventDefault();
    })
);

//function for saving cart details
function saveCartItems() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

//redirecting to checkout
function redirect() {
    // Check if at least one product is in the cart
  if (cartItems.length === 0) {
    alert("Please Add Item to Proceed");
  } else {
    saveCartItems();
    window.location.href = "checkout.html";
  }
}

//button functions
let openCart =  document.querySelector('.carticon');
let cart = document.querySelector('.cartdetails');
let container = document.querySelector('.container');
let closeCart = document.querySelector('.close');
let total = document.querySelector('.total');

openCart.onclick = () =>{
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
    } else {
        cart.style.right = '-100%';
    }
};

closeCart.onclick = () =>{
    cart.style.right = '-100%';
};

//Functionality of Add to Cart
const addToCartButtons = document.querySelectorAll('.additem');
const cartIcon = document.querySelector('.carticon');
const quantityElement = document.querySelector('.quantity');


let cartItems = [];

function increaseCartQuantity() {
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  quantityElement.textContent = totalQuantity;
}

function decreaseCartQuantity(){
  const currentQuantity = parseInt(quantityElement.textContent, 10);
  const totalQuantity = Math.max(0, currentQuantity - 1);
  quantityElement.textContent = totalQuantity;
};

function updateCartDetails() {
  const userCartElement = document.querySelector('.usercart');
  userCartElement.innerHTML = '';

  cartItems.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('item');

    cartItemElement.innerHTML = `
      <img src="${item.imgSrc}">
      <div class="content">
        <div class="name">${item.name}</div>
        <div class="price">LKR ${item.price} x ${item.quantity} products</div>
      </div>
      <div class="itemquantity">
        <button onclick="decreaseQuantity('${item.name}')">-</button>
        <span class="value">${item.quantity}</span>
        <button onclick="increaseQuantity('${item.name}')">+</button>
      </div>
    `;

    userCartElement.appendChild(cartItemElement);
  });

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalElement = document.querySelector('.total');
  totalElement.textContent = `Total: LKR ${totalPrice}`;
}

function addToCart(itemData) {
  const existingItem = cartItems.find(item => item.name === itemData.name);
  if (existingItem) {  //checking if the item already exists in the cart details
    existingItem.quantity++;
  } else {
    cartItems.push({ ...itemData, quantity: 1 });
  }

  increaseCartQuantity();
  updateCartDetails();
}

//Updating Cart Details 
function updateCartDetails() {
  const userCartElement = document.querySelector('.usercart');
  userCartElement.innerHTML = '';

  cartItems.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('item');

    cartItemElement.innerHTML = `
      <img src="${item.imgSrc}">
      <div class="content">
        <div class="name">${item.name}</div>
        <div class="price">LKR ${item.price} x ${item.quantity} products</div>
      </div>
      <div class="itemquantity">
        <button onclick="decreaseQuantity('${item.name}')">-</button>
        <span class="value">${item.quantity}</span>
        <button onclick="increaseQuantity('${item.name}')">+</button>
      </div>
    `;

    userCartElement.appendChild(cartItemElement);
  });

// Update the total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalElement = document.querySelector('.total');
  totalElement.textContent = `Total: LKR ${totalPrice}`;
}

function increaseQuantity(itemName) {
  const itemToUpdate = cartItems.find(item => item.name === itemName);
  if (itemToUpdate) {
    itemToUpdate.quantity++;
  }
  increaseCartQuantity();
  updateCartDetails();
}

function decreaseQuantity(itemName) {
  const itemToUpdate = cartItems.find(item => item.name === itemName);
  if (itemToUpdate) {
    itemToUpdate.quantity--;
    if (itemToUpdate.quantity <= 0) {
      // Remove the item from the cart if quantity is zero
      cartItems = cartItems.filter(item => item.name !== itemName);
    }
  }
  decreaseCartQuantity();
  updateCartDetails();
}

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const parentItem = button.closest('.item');
    const itemName = parentItem.getAttribute('data-name');
    const itemImage = parentItem.querySelector('img').getAttribute('src');
    const itemPrice = parseInt(parentItem.querySelector('.price').textContent.match(/\d+/)[0], 10);

    addToCart({ name: itemName, imgSrc: itemImage, price: itemPrice });
  });
});

cartIcon.addEventListener('click', () => {
  updateCartDetails(); // Update the cart details before showing the sidebar
  const cartDetails = document.querySelector('.cartdetails');
});

