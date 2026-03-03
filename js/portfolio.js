
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    const portfolioItems = document.querySelectorAll('.portfolio-enhanced-item');
    
    const noResultsMessage = document.getElementById('noResults');
    
    /**

     * @param {string} filter 
     * @description */
    function filterPortfolio(filter) {
        
        let visibleCount = 0;
        
        portfolioItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                item.style.animation = `fadeIn 0.5s ease ${index * 0.1}s both`;
                visibleCount++;
            } else {
                // Hide the item
                item.style.display = 'none';
            }
        });
        
        if (noResultsMessage) {
            if (visibleCount === 0) {
                noResultsMessage.classList.remove('hidden');
            } else {
                noResultsMessage.classList.add('hidden');
            }
        }
        
        // Log for debugging
        console.log(`Filter applied: ${filter}, Visible items: ${visibleCount}`);
    }
    
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('bg-white/10', 'text-white');
                btn.classList.remove('bg-accent', 'text-primary');
            });
            
            this.classList.remove('bg-white/10', 'text-white');
            this.classList.add('active', 'bg-accent', 'text-primary');
            
            filterPortfolio(filter);
        });
    });
    
  
    const style = document.createElement('style');
    style.textContent = `
        /* Fade in animation for portfolio items */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Smooth transition for filter button state changes */
        .filter-btn {
            transition: all 0.3s ease;
        }
        
        /* Smooth transition for portfolio items */
        .portfolio-item {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
        portfolioItems.forEach(item => {
        // Mouse enter - enhance the overlay
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        // Mouse leave - hide the overlay
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
    
 
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
    
    if ('IntersectionObserver' in window) {
        // Create observer for lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If image is in viewport
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Load the image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    // Stop observing once loaded
                    observer.unobserve(img);
                }
            });
        });
        
        // Observe all portfolio images
        const portfolioImages = document.querySelectorAll('.portfolio-item img');
        portfolioImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    /**
     * Search portfolio items by title
     * @param {string} searchTerm - The search query
     */
    function searchPortfolio(searchTerm) {
        const term = searchTerm.toLowerCase();
        let visibleCount = 0;
        
        portfolioItems.forEach((item, index) => {
            // Get title and description from the item
            const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = item.querySelector('p')?.textContent.toLowerCase() || '';
            
            // Check if search term matches title or description
            if (title.includes(term) || description.includes(term)) {
                item.style.display = 'block';
                item.style.animation = `fadeIn 0.5s ease ${index * 0.1}s both`;
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        if (noResultsMessage) {
            if (visibleCount === 0) {
                noResultsMessage.classList.remove('hidden');
            } else {
                noResultsMessage.classList.add('hidden');
            }
        }
    }
    
    // Expose search function to global scope for potential use
    window.searchPortfolio = searchPortfolio;
 
    /**
     * Get count of items per category
     * @returns {Object} Object with category counts
     */
    function getCategoryCounts() {
        const counts = {
            all: portfolioItems.length,
            kitchen: 0,
            bedroom: 0,
            living: 0,
            door: 0,
            decor: 0
        };
        
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (counts.hasOwnProperty(category)) {
                counts[category]++;
            }
        });
        
        return counts;
    }
    
    // Expose function to global scope
    window.getCategoryCounts = getCategoryCounts;
    
    // Log initialization
    console.log('Portfolio filtering initialized successfully');
    console.log('Category counts:', getCategoryCounts());
});



document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-enhanced-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3')?.textContent || 'Project';
            const category = this.getAttribute('data-category');
            
            console.log(`Portfolio item clicked: ${title} (Category: ${category})`);
           
        });
    });
});

function shufflePortfolioItems() {
    const gallery = document.getElementById('portfolioGallery');
    const items = Array.from(gallery.children);
    
    // Fisher-Yates shuffle algorithm
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
    
    // Re-append in new order
    items.forEach(item => gallery.appendChild(item));
}

/**
 * Sort portfolio items by category
 * @param {string} category - Category to sort by
 */
function sortByCategory(category) {
    const gallery = document.getElementById('portfolioGallery');
    const items = Array.from(gallery.children);
    
    // Sort items based on category
    items.sort((a, b) => {
        const aCategory = a.getAttribute('data-category');
        const bCategory = b.getAttribute('data-category');
        
        if (category === 'kitchen') {
            return aCategory === 'kitchen' ? -1 : 1;
        }
        return 0;
    });
    
    // Re-append in sorted order
    items.forEach(item => gallery.appendChild(item));
}
