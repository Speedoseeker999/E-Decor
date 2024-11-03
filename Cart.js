// JavaScript: cart.js

const cartItemsContainer = document.getElementById('cart-items');
const totalItemsElement = document.getElementById('total-items');
const totalCostElement = document.getElementById('total-cost');
const deliveryCostElement = document.getElementById('delivery-cost');
const discountElement = document.getElementById('discount');
const finalCostElement = document.getElementById('final-cost');

const deliveryCost = 150;
const discountPercentage = 10; // Example discount percentage

// Function to load and display cart items
function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';
    let totalItems = 0;
    let totalCost = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Sold by: Vendor</p>
                <p>M.R.P: ₹${item.price.toLocaleString()}</p>
                <p>10% discount applied at checkout</p>
            </div>
            <div class="item-controls">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
        
        totalItems += item.quantity;
        totalCost += item.price * item.quantity;
    });

    // Calculate discount and final cost
    const discount = (totalCost * discountPercentage) / 100;
    const finalCost = totalCost + deliveryCost - discount;

    // Update bill summary
    totalItemsElement.innerText = `Total Items - ${totalItems}`;
    totalCostElement.innerText = `Total Cost - ₹${totalCost.toLocaleString()}`;
    discountElement.innerText = `Discount Applied - ₹${discount.toLocaleString()}`;
    finalCostElement.innerText = `Total Cost - ₹${finalCost.toLocaleString()}`;
}

// Function to update item quantity or remove item if quantity is 0
function updateQuantity(id, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        
        // Remove item if quantity is 0
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1); // Remove the item from the cart
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }
}

// Initial render
renderCartItems();
