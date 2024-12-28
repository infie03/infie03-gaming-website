document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    let productsToShow = getProductsToShow();
    const productList = document.querySelector('.main-image');
    const products = document.querySelectorAll('.headimg');

    function getProductsToShow() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1200) return 3;
        return 4;
    }

    function updateProductsPosition() {
        if (productList && products.length > 0) {
            const translateX = -currentIndex * (100 / productsToShow);
            productList.style.transform = `translateX(${translateX}%)`;
        }
    }

    // Initialize product positions
    updateProductsPosition();

    // Handle window resize
    window.addEventListener('resize', function() {
        const newProductsToShow = getProductsToShow();
        if (newProductsToShow !== productsToShow) {
            productsToShow = newProductsToShow;
            if (products.length > 0) {
                currentIndex = Math.min(currentIndex, products.length - productsToShow);
                updateProductsPosition();
            }
        }
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.headimg');
            const productName = product.querySelector('h6').textContent;
            
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = `${productName} added to cart!`;
            
            // Add notification styles
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = '#000';
            notification.style.color = '#fff';
            notification.style.padding = '15px 25px';
            notification.style.borderRadius = '5px';
            notification.style.zIndex = '1000';
            notification.style.animation = 'slideIn 0.5s ease-out';
            
            // Add animation keyframes
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
            `;
            document.head.appendChild(style);
            
            // Add notification to page
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'slideIn 0.5s ease-out reverse';
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }, 3000);
        });
    });
});