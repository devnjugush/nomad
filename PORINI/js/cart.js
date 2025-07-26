// cart.js
document.addEventListener('DOMContentLoaded', function() {
    // Quantity buttons
    const minusBtns = document.querySelectorAll('.quantity-btn.minus');
    const plusBtns = document.querySelectorAll('.quantity-btn.plus');
    const removeBtns = document.querySelectorAll('.remove-btn');
    
    // Update quantity
    function updateQuantity(input, change) {
        let newVal = parseInt(input.value) + change;
        if (newVal < 1) newVal = 1;
        input.value = newVal;
        updateCartTotal();
    }
    
    // Remove item
    function removeItem(item) {
        item.closest('.cart-item').remove();
        updateCartTotal();
        updateCartCount();
    }
    
    // Update cart total
    function updateCartTotal() {
        let subtotal = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.querySelector('.item-price').textContent.replace('$', ''));
            const quantity = parseInt(item.querySelector('.quantity').value);
            subtotal += price * quantity;
        });
        
        const tax = subtotal * 0.1; // 10% tax
        const serviceFee = 49.00;
        const total = subtotal + tax + serviceFee;
        
        document.querySelector('.summary-row:nth-child(1) span:last-child').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.summary-row:nth-child(2) span:last-child').textContent = `$${tax.toFixed(2)}`;
        document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = `$${serviceFee.toFixed(2)}`;
        document.querySelector('.summary-row.total span:last-child').textContent = `$${total.toFixed(2)}`;
    }
    
    // Update cart count in header
    function updateCartCount() {
        const count = document.querySelectorAll('.cart-item').length;
        document.querySelector('.cart-count').textContent = count;
    }
    
    // Event listeners for quantity buttons
    minusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            updateQuantity(input, -1);
        });
    });
    
    plusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            updateQuantity(input, 1);
        });
    });
    
    // Event listeners for remove buttons
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            removeItem(this);
        });
    });
    
    // Form submission
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your booking! Your adventure confirmation will be sent to your email.');
            // In a real implementation, you would process the payment here
        });
    }
    
    // Initialize cart
    updateCartTotal();
    updateCartCount();
});