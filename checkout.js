window.onload = updateCart;

//redirecting to product page
function redirect() {
    window.location.href = "product.html";
  }

//toggling payment method
function togglePaymentFields() {
    const creditCardFields = document.getElementById('creditCardFields');
    const paypalFields = document.getElementById('paypalFields');
    const creditCardRadio = document.getElementById('creditCard');
    const paypalRadio = document.getElementById('paypal');

    if (creditCardRadio.checked) {
      creditCardFields.style.display = 'flex';
      paypalFields.style.display = 'none';
       document.getElementById('paypalEmail').removeAttribute('required');
        document.getElementById('paypalpw').removeAttribute('required');
    } else if (paypalRadio.checked) {
      creditCardFields.style.display = 'none';
      paypalFields.style.display = 'flex';
      document.getElementById('userName').removeAttribute('required');
      document.getElementById('cardNumber').removeAttribute('required');
      document.getElementById('expiry').removeAttribute('required');
      document.getElementById('cvvNumber').removeAttribute('required');
    }
  }

//Bringing Cart Details from Previous Page
function getCartItemsFromLocalStorage() {
    const cartItemsJSON = localStorage.getItem('cartItems');
    return cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
  }
  
  // Function to update the cart in the "Checkout" page
  function updateCart() {
    const userCartElement = document.querySelector('.userCart');
    userCartElement.innerHTML = '';
  
    const cartItems = getCartItemsFromLocalStorage();
    cartItems.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('item');
  
      cartItemElement.innerHTML = `
        <div class="image">
          <img src="${item.imgSrc}">
        </div>
        <div class="content"> 
          <div class="name">${item.name}</div>
          <div class="price">LKR ${item.price} x ${item.quantity} products</div>
            
        </div>
      `;
  
      userCartElement.appendChild(cartItemElement);
    });
  
    // Calculate and update the total price
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity) + 350, 0);
    const totalElement = document.querySelector('.paytotal');
    totalElement.textContent = `Total: LKR ${totalPrice}`;
  }
  

//Displaying User Information to User
const modal = document.getElementById("detailsModal");
const openModalBtn = document.getElementById("confirm");

function openModal() {
    const modal = document.getElementById("detailsModal");
    modal.style.display = "block";
}
function closeModal() {
    const modal = document.getElementById("detailsModal");
    modal.style.display = "none";
}

function showPopup() {
    displayUserDetails();
    setTimeout(function () {
        openModal();
    }, 500); 
    return false; 
}
const goBackBtn = document.getElementById("goBackBtn");
goBackBtn.addEventListener("click", closeModal);


function displayUserDetails() {
    // Get the user inputs from the form
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const product = document.querySelector(".name").innerText;

    // Update the modal content with the user inputs
    document.getElementById("modalFullName").textContent = fullName;
    document.getElementById("modalEmail").textContent = email;
    document.getElementById("modalContact").textContent = contact;
    document.getElementById("modalAddress").textContent = address;
}

//Order Confirmation and Redirecting
function redirectToProduct() {
  window.location.href = "product.html";
}

const payNowBtn = document.getElementById("payNowBtn");
payNowBtn.addEventListener("click", function () {
    detailsModal.style.display = "none";
    loadingScreen.style.display = "block";

    setTimeout(function () {
      loadingScreen.style.display = "none";
      window.print(); 
    }, 3000);
  });

window.onafterprint = function() {
    // Display "Order Successful"
    alert("Order Successful");
    redirectToProduct(); // Redirect to shopping page 
};