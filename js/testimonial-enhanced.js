
document.addEventListener('DOMContentLoaded', function() {
  
    const commentTextarea = document.getElementById('testimonialComment');
    const maxLength = 500;
    
    if (commentTextarea) {
        const counter = document.createElement('div');
        counter.className = 'char-counter normal';
        counter.innerHTML = `<span id="charCount">0</span> / ${maxLength}`;
        commentTextarea.parentElement.style.position = 'relative';
        commentTextarea.parentElement.appendChild(counter);
        
        const charCountSpan = document.getElementById('charCount');
        
        commentTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCountSpan.textContent = currentLength;
            
            counter.classList.remove('normal', 'warning', 'danger');
            
            if (currentLength >= maxLength) {
                counter.classList.add('danger');
            } else if (currentLength >= maxLength * 0.8) {
                counter.classList.add('warning');
            } else {
                counter.classList.add('normal');
            }
        });
        
        if (commentTextarea.value.length > 0) {
            charCountSpan.textContent = commentTextarea.value.length;
            if (commentTextarea.value.length >= maxLength) {
                counter.classList.add('danger');
            } else if (commentTextarea.value.length >= maxLength * 0.8) {
                counter.classList.add('warning');
            } else {
                counter.classList.add('normal');
            }
        }
    }
    
    
    const ratingLabels = {
        1: 'سيء',
        2: 'عادي',
        3: 'جيد',
        4: 'ممتاز',
        5: 'مثالي'
    };
    
    const starButtons = document.querySelectorAll('.star-btn');
    const starRatingContainer = document.getElementById('starRating');
    
    if (starButtons.length > 0 && starRatingContainer) {
        const ratingLabel = document.createElement('p');
        ratingLabel.className = 'rating-label';
        ratingLabel.id = 'ratingLabel';
        starRatingContainer.parentElement.appendChild(ratingLabel);
        starButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                ratingLabel.textContent = ratingLabels[rating] || '';
                ratingLabel.classList.add('active');
            });
            
            button.addEventListener('mouseleave', function() {
                const selectedRating = document.getElementById('testimonialRating');
                const currentRating = selectedRating ? parseInt(selectedRating.value) : 0;
                if (currentRating > 0) {
                    ratingLabel.textContent = ratingLabels[currentRating] || '';
                    ratingLabel.classList.add('active');
                } else {
                    ratingLabel.textContent = '';
                    ratingLabel.classList.remove('active');
                }
            });
        });
    }
    
    // 
    
    const testimonialName = document.getElementById('testimonialName');
    const testimonialComment = document.getElementById('testimonialComment');
    
    if (testimonialName) {
        testimonialName.addEventListener('blur', function() {
            if (this.value.length > 0 && this.value.length < 2) {
                this.style.borderColor = '#ef4444';
                this.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.3)';
            } else if (this.value.length >= 2) {
                this.style.borderColor = '#10b981';
                this.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.3)';
            } else {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });
        
        testimonialName.addEventListener('focus', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    }
    
    if (testimonialComment) {
        testimonialComment.addEventListener('blur', function() {
            if (this.value.length > 0 && this.value.length < 10) {
                this.style.borderColor = '#ef4444';
                this.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.3)';
            } else if (this.value.length >= 10) {
                this.style.borderColor = '#10b981';
                this.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.3)';
            } else {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });
        
        testimonialComment.addEventListener('focus', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    }
});
