/**
 * Privacy Policy & Terms - Language Toggle Script
 * Handles bilingual switching between Arabic and English
 */

// Current language state
let currentLang = 'ar';

/**
 * Page Loader - Hide after page loads
 */
function initPageLoader() {
    const pageLoader = document.getElementById('pageLoader');
    
    if (pageLoader) {
        // Hide loader when page is fully loaded
        window.addEventListener('load', function() {
            setTimeout(function() {
                pageLoader.classList.add('fade-out');
                // Remove from DOM after animation completes
                setTimeout(function() {
                    pageLoader.style.display = 'none';
                }, 600);
            }, 500); // Show loader for at least 500ms
        });
        
        // Fallback: hide after DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                if (pageLoader && !pageLoader.classList.contains('fade-out')) {
                    pageLoader.classList.add('fade-out');
                    setTimeout(function() {
                        pageLoader.style.display = 'none';
                    }, 600);
                }
            }, 1000);
        });
    }
}

// Initialize page loader
initPageLoader();

/**
 * Initialize the language toggle functionality
 */
function initLanguageToggle() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('legalPageLang');
    if (savedLang) {
        setLanguage(savedLang, false);
    } else {
        // Default to Arabic for this site
        setLanguage('ar', false);
    }
}

/**
 * Set the language for the page
 * @param {string} lang - Language code ('ar' or 'en')
 * @param {boolean} save - Whether to save to localStorage (default: true)
 */
function setLanguage(lang, save = true) {
    if (lang !== 'ar' && lang !== 'en') {
        console.error('Invalid language code. Use "ar" or "en".');
        return;
    }

    currentLang = lang;

    // Update document direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // Update language toggle buttons
    updateLanguageButtons(lang);

    // Update all translatable elements
    updatePageContent(lang);

    // Save preference if requested
    if (save) {
        localStorage.setItem('legalPageLang', lang);
    }

    // Trigger custom event for any additional handling
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

/**
 * Update the language toggle buttons
 * @param {string} activeLang - The active language code
 */
function updateLanguageButtons(activeLang) {
    const buttons = document.querySelectorAll('.lang-btn');
    
    buttons.forEach(btn => {
        const btnLang = btn.getAttribute('data-lang');
        
        if (btnLang === activeLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/**
 * Update all page content based on selected language
 * @param {string} lang - The target language
 */
function updatePageContent(lang) {
    // Update elements with data-ar and data-en attributes
    const translatableElements = document.querySelectorAll('[data-ar][data-en]');
    
    translatableElements.forEach(element => {
        const translatedText = element.getAttribute(`data-${lang}`);
        
        if (translatedText) {
            // Add fade out effect
            element.classList.add('lang-transition', 'fade-out');
            
            setTimeout(() => {
                // Update text content
                element.textContent = translatedText;
                
                // Remove fade out and add fade in
                element.classList.remove('fade-out');
                element.classList.add('fade-in');
                
                // Remove fade-in class after animation
                setTimeout(() => {
                    element.classList.remove('fade-in');
                }, 300);
            }, 150);
        }
    });

    // Update document title
    const titleElement = document.querySelector('title');
    if (titleElement) {
        const titleText = titleElement.getAttribute(`data-${lang}`);
        if (titleText) {
            document.title = titleText;
        }
    }

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        if (lang === 'ar') {
            metaDesc.setAttribute('content', 'سياسة الخصوصية - ورشة ايور للنجارة');
        } else {
            metaDesc.setAttribute('content', 'Privacy Policy - Modern Carpentry Workshop');
        }
    }

    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);
}

/**
 * Get current language
 * @returns {string} Current language code
 */
function getCurrentLanguage() {
    return currentLang;
}

/**
 * Check if current language is Arabic
 * @returns {boolean}
 */
function isArabic() {
    return currentLang === 'ar';
}

/**
 * Check if current language is English
 * @returns {boolean}
 */
function isEnglish() {
    return currentLang === 'en';
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initLanguageToggle();
});

// Also initialize immediately in case DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageToggle);
} else {
    initLanguageToggle();
}

// Export functions for global use
window.setLanguage = setLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.isArabic = isArabic;
window.isEnglish = isEnglish;

/**
 * ================================================
 * SCROLL TO TOP BUTTON FUNCTIONALITY
 * ================================================
 */

// Initialize scroll to top button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) {
        return;
    }

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.remove('opacity-0', 'invisible');
            scrollToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'invisible');
            scrollToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });

    // Smooth scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initScrollToTop();
});

// Also initialize immediately in case DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollToTop);
} else {
    initScrollToTop();
}
