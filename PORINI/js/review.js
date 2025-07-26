
    // Review functionality
    document.addEventListener('DOMContentLoaded', function() {
      // Initialize reviews from localStorage
      const reviews = JSON.parse(localStorage.getItem('poriniReviews')) || [];
      const reviewsGrid = document.getElementById('reviewsGrid');
      const noReviewsMessage = document.getElementById('noReviewsMessage');
      
      // Function to display reviews
      function displayReviews() {
        reviewsGrid.innerHTML = '';
        
        if (reviews.length === 0) {
          noReviewsMessage.style.display = 'block';
          return;
        }
        
        noReviewsMessage.style.display = 'none';
        
        // Sort reviews by date (newest first)
        const sortedReviews = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        sortedReviews.forEach(review => {
          const reviewCard = document.createElement('div');
          reviewCard.className = 'review-card';
          
          // Generate stars HTML
          let starsHTML = '';
          for (let i = 1; i <= 5; i++) {
            if (i <= review.rating) {
              starsHTML += '<i class="fas fa-star"></i>';
            } else {
              starsHTML += '<i class="far fa-star"></i>';
            }
          }
          
          // Format date
          const reviewDate = new Date(review.date);
          const formattedDate = reviewDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
          
          // Get initials for avatar
          const nameParts = review.name.split(' ');
          const initials = nameParts.length > 1 
            ? nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
            : nameParts[0].substring(0, 2);
          
          reviewCard.innerHTML = `
            <div class="review-header">
              <div class="review-avatar">${initials.toUpperCase()}</div>
              <div>
                <div class="review-author">${review.name}</div>
                <div class="review-date">${formattedDate}</div>
              </div>
            </div>
            <div class="review-rating">${starsHTML}</div>
            <h3 class="review-title">${review.title}</h3>
            <p class="review-content">${review.text}</p>
          `;
          
          reviewsGrid.appendChild(reviewCard);
        });
      }
      
      // Display existing reviews
      displayReviews();
      
      // Star rating functionality
      const ratingStars = document.querySelectorAll('.rating-star');
      const ratingValue = document.getElementById('ratingValue');
      
      ratingStars.forEach(star => {
        star.addEventListener('click', function() {
          const value = parseInt(this.getAttribute('data-value'));
          ratingValue.value = value;
          
          ratingStars.forEach(s => {
            if (parseInt(s.getAttribute('data-value')) <= value) {
              s.classList.remove('far');
              s.classList.add('fas', 'active');
            } else {
              s.classList.remove('fas', 'active');
              s.classList.add('far');
            }
          });
        });
      });
      
      // Review form submission
      const reviewForm = document.getElementById('reviewForm');
      
      reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('reviewerName').value.trim();
        const email = document.getElementById('reviewerEmail').value.trim();
        const title = document.getElementById('reviewTitle').value.trim();
        const text = document.getElementById('reviewText').value.trim();
        const rating = parseInt(ratingValue.value);
        
        // Basic validation
        if (!name || !email || !title || !text || rating === 0) {
          alert('Please fill in all fields and provide a rating');
          return;
        }
        
        // Create new review object
        const newReview = {
          name,
          email,
          title,
          text,
          rating,
          date: new Date().toISOString()
        };
        
        // Add to reviews array
        reviews.push(newReview);
        
        // Save to localStorage
        localStorage.setItem('poriniReviews', JSON.stringify(reviews));
        
        // Update display
        displayReviews();
        
        // Reset form
        reviewForm.reset();
        ratingValue.value = 0;
        ratingStars.forEach(star => {
          star.classList.remove('fas', 'active');
          star.classList.add('far');
        });
        
        // Show success message
        alert('Thank you for your review!');
      });
      
      // Add some sample reviews if none exist
      if (reviews.length === 0) {
        const sampleReviews = [
          {
            name: "Alex Johnson",
            email: "alex@example.com",
            title: "Unforgettable Experience!",
            text: "The Wellness Retreat was exactly what I needed. The yoga sessions at dawn with the African sunrise was magical. The team building activities were well organized and fun. Highly recommend!",
            rating: 5,
            date: "2025-05-15T12:00:00Z"
          },
          {
            name: "Sarah Williams",
            email: "sarah@example.com",
            title: "Perfect Weekend Getaway",
            text: "The Beach Life Experience was incredible! The luxury tents were comfortable and the sunset cocktail tour was breathtaking. The staff was attentive and made us feel special. Will definitely come back!",
            rating: 4,
            date: "2025-06-20T14:30:00Z"
          }
        ];
        
        // Add sample reviews to localStorage
        localStorage.setItem('poriniReviews', JSON.stringify(sampleReviews));
        displayReviews();
      }
    });