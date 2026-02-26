/**
 * ================================================
 * WARCHA - Portfolio Page JavaScript
 * Moroccan Carpentry Workshop
 * 
 * This file contains all JavaScript functionality
 * specific to the portfolio page including:
 * - Category filtering system
 * - Animation effects
 * - Gallery interactions
 * ================================================
 */

/**
 * Portfolio Filter Functionality
 * Handles filtering portfolio items by category
 * Categories: all, furniture, tables, doors, bedrooms
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // SELECT DOM ELEMENTS
    // Get references to filter buttons, portfolio items, and message elements
    // ============================================
    
    // All filter buttons in the filter container
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // All portfolio items in the gallery
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // No results message element
    const noResultsMessage = document.getElementById('noResults');
    
    // ============================================
    // FILTER FUNCTION
    // Main function to filter portfolio items by category
    // ============================================
    
    /**
     * Filter Portfolio Items by Category
     * @param {string} filter - The category to filter by ('all' shows everything)
     * @description This function loops through all portfolio items and shows/hides
     *               them based on their data-category attribute matching the filter
     */
    function filterPortfolio(filter) {
        // Counter for visible items
        let visibleCount = 0;
        
        // Loop through all portfolio items
        portfolioItems.forEach((item, index) => {
            // Get the category from data-category attribute
            const category = item.getAttribute('data-category');
            
            // Check if item matches the filter or if showing all items
            if (filter === 'all' || category === filter) {
                // Show the item with animation
                item.style.display = 'block';
                // Add staggered fade-in animation based on index
                item.style.animation = `fadeIn 0.5s ease ${index * 0.1}s both`;
                // Increment visible counter
                visibleCount++;
            } else {
                // Hide the item
                item.style.display = 'none';
            }
        });
        
        // Show/hide no results message based on visible count
        if (visibleCount === 0) {
            noResultsMessage.classList.remove('hidden');
        } else {
            noResultsMessage.classList.add('hidden');
        }
        
        // Log for debugging
        console.log(`Filter applied: ${filter}, Visible items: ${visibleCount}`);
    }
    
    // ============================================
    // FILTER BUTTON EVENT LISTENERS
    // Add click handlers to each filter button
    // ============================================
    
    filterButtons.forEach(button => {
        // Add click event listener to each button
        button.addEventListener('click', function() {
            // Get the filter value from data-filter attribute
            const filter = this.getAttribute('data-filter');
            
            // ============================================
            // UPDATE BUTTON ACTIVE STATE
            // Remove active class from all buttons, add to clicked one
            // ============================================
            
            // Remove active styling from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                // Add default inactive styling
                btn.classList.add('bg-white/10', 'text-white');
                // Remove active styling
                btn.classList.remove('bg-accent', 'text-primary');
            });
            
            // Add active styling to clicked button
            this.classList.remove('bg-white/10', 'text-white');
            this.classList.add('active', 'bg-accent', 'text-primary');
            
            // ============================================
            // APPLY THE FILTER
            // Call filter function with selected category
            // ============================================
            
            filterPortfolio(filter);
        });
    });
    
    // ============================================
    // ADD FADE IN ANIMATION KEYFRAMES
    // Dynamically create CSS animation for filtered items
    // ============================================
    
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
    
    // ============================================
    // PORTFOLIO ITEM HOVER EFFECTS
    // Add enhanced hover interactions
    // ============================================
    
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
    
    // ============================================
    // INITIALIZE AOS ANIMATIONS
    // Initialize scroll animations for portfolio items
    // ============================================
    
    // Check if AOS is available (from main.js)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
    
    // ============================================
    // LAZY LOADING FOR IMAGES
    // Improve performance by lazy loading images
    // ============================================
    
    // Check if IntersectionObserver is supported
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
    
    // ============================================
    // SEARCH FUNCTIONALITY (Optional Enhancement)
    // Filter by searching item titles
    // ============================================
    
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
        if (visibleCount === 0) {
            noResultsMessage.classList.remove('hidden');
        } else {
            noResultsMessage.classList.add('hidden');
        }
    }
    
    // Expose search function to global scope for potential use
    window.searchPortfolio = searchPortfolio;
    
    // ============================================
    // CATEGORY STATISTICS
    // Calculate and display category counts
    // ============================================
    
    /**
     * Get count of items per category
     * @returns {Object} Object with category counts
     */
    function getCategoryCounts() {
        const counts = {
            all: portfolioItems.length,
            furniture: 0,
            tables: 0,
            doors: 0,
            bedrooms: 0
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

/**
 * ================================================
 * PORTFOLIO ITEM CLICK HANDLER
 * Handle clicks on portfolio items (e.g., open modal)
 * ================================================
 */

// Add click event to portfolio items for potential modal/detailed view
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get item details
            const title = this.querySelector('h3')?.textContent || 'Project';
            const category = this.getAttribute('data-category');
            
            // Log for debugging (can be replaced with modal opening)
            console.log(`Portfolio item clicked: ${title} (Category: ${category})`);
            
            // Optional: You can add modal logic here
            // Example: openPortfolioModal(title, category);
        });
    });
});

/**
 * ================================================
 * UTILITY FUNCTIONS
 * Helper functions for portfolio functionality
 * ================================================
 */

/**
 * Shuffle portfolio items randomly
 * Useful for "Show All" to display items in random order
 */
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
        
        if (category === 'furniture') {
            return aCategory === 'furniture' ? -1 : 1;
        }
        return 0;
    });
    
    // Re-append in sorted order
    items.forEach(item => gallery.appendChild(item));
}
