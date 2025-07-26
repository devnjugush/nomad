
        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Gallery Filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filter = button.getAttribute('data-filter');
                
                // Show/hide gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else if (filter === 'favorites') {
                        // Check if the item is favorited
                        const likeBtn = item.querySelector('.gallery-like');
                        if (likeBtn.classList.contains('liked')) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    } else {
                        if (item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
        
        // Lightbox functionality
        const lightbox = document.querySelector('.lightbox');
        const lightboxImg = lightbox.querySelector('img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        const lightboxPrev = lightbox.querySelector('.lightbox-prev');
        const lightboxNext = lightbox.querySelector('.lightbox-next');
        
        // Array of gallery images
        const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
        let currentImageIndex = 0;
        
        // Open lightbox
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                const imgAlt = item.querySelector('img').alt;
                const caption = item.querySelector('.gallery-overlay h3').textContent;
                const location = item.querySelector('.gallery-overlay p').textContent;
                
                lightboxImg.src = imgSrc;
                lightboxImg.alt = imgAlt;
                lightboxCaption.innerHTML = `<strong>${caption}</strong><br>${location}`;
                lightbox.classList.add('open');
                
                currentImageIndex = index;
            });
        });
        
        // Close lightbox
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('open');
        });
        
        // Click outside image to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('open');
            }
        });
        
        // Navigation
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightboxImage();
        });
        
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateLightboxImage();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('open')) return;
            
            if (e.key === 'Escape') {
                lightbox.classList.remove('open');
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                updateLightboxImage();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                updateLightboxImage();
            }
        });
        
        function updateLightboxImage() {
            const imgSrc = galleryImages[currentImageIndex].src;
            const imgAlt = galleryImages[currentImageIndex].alt;
            const galleryItem = galleryImages[currentImageIndex].closest('.gallery-item');
            const caption = galleryItem.querySelector('.gallery-overlay h3').textContent;
            const location = galleryItem.querySelector('.gallery-overlay p').textContent;
            
            lightboxImg.src = imgSrc;
            lightboxImg.alt = imgAlt;
            lightboxCaption.innerHTML = `<strong>${caption}</strong><br>${location}`;
        }
        
        // Video play buttons
        const videoPlayButtons = document.querySelectorAll('.video-play');
        videoPlayButtons.forEach(button => {
            button.addEventListener('click', () => {
                alert('Video playback would start here. In a real implementation, this would open a video player.');
            });
        });
        
        // Favorites functionality with localStorage
        const likeButtons = document.querySelectorAll('.gallery-like');
        const favoritesNotification = document.querySelector('.favorites-notification');
        
        // Initialize favorites from localStorage
        let favorites = JSON.parse(localStorage.getItem('poriniFavorites')) || [];
        
        // Set initial liked state for each image
        likeButtons.forEach(button => {
            const galleryItem = button.closest('.gallery-item');
            const imgSrc = galleryItem.querySelector('img').src;
            
            if (favorites.includes(imgSrc)) {
                button.classList.add('liked');
                button.innerHTML = '<i class="fas fa-heart"></i>';
            }
        });
        
        // Toggle like on click
        likeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering gallery item click
                const galleryItem = this.closest('.gallery-item');
                const imgSrc = galleryItem.querySelector('img').src;
                const likesCount = galleryItem.querySelector('.gallery-likes-count');
                let likes = parseInt(galleryItem.getAttribute('data-likes'));
                
                if (this.classList.contains('liked')) {
                    // Remove from favorites
                    this.classList.remove('liked');
                    this.innerHTML = '<i class="far fa-heart"></i>';
                    favorites = favorites.filter(src => src !== imgSrc);
                    likes--;
                } else {
                    // Add to favorites
                    this.classList.add('liked');
                    this.innerHTML = '<i class="fas fa-heart"></i>';
                    favorites.push(imgSrc);
                    likes++;
                    
                    // Show notification
                    favoritesNotification.classList.add('show');
                    setTimeout(() => {
                        favoritesNotification.classList.remove('show');
                    }, 3000);
                }
                
                // Update likes count
                galleryItem.setAttribute('data-likes', likes);
                likesCount.innerHTML = `<i class="fas fa-heart"></i> ${likes}`;
                
                // Save to localStorage
                localStorage.setItem('poriniFavorites', JSON.stringify(favorites));
            });
        });