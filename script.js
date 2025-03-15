document.addEventListener('DOMContentLoaded', function() {
    // Opening Overlay
    const overlay = document.getElementById('overlay');
    const openInvitationBtn = document.getElementById('openInvitation');
    
    openInvitationBtn.addEventListener('click', function() {
        overlay.classList.add('slide-up');
        playBackgroundMusic();
    });

    // Navbar
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.classList.remove('active');
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - navbar.offsetHeight,
                behavior: 'smooth'
            });
        });
    });
    
    // Sticky navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Countdown Timer
    const weddingDate = new Date('June 15, 2026 08:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
        }
    }
    
    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);
    
    // RSVP Form
    const rsvpForm = document.getElementById('rsvpForm');
    
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const attendance = document.getElementById('attendance').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;
            
            // In real-world application, you would send this data to a server
            // For this example, we'll just show an alert
            alert(`Terima kasih, ${name}! RSVP Anda telah diterima.`);
            
            // Reset form
            rsvpForm.reset();
        });
    }
    
    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-clipboard');
            
            // Create a temporary input element
            const tempInput = document.createElement('input');
            tempInput.value = textToCopy;
            document.body.appendChild(tempInput);
            
            // Select and copy the text
            tempInput.select();
            document.execCommand('copy');
            
            // Remove the temporary element
            document.body.removeChild(tempInput);
            
            // Change button text temporarily
            const originalText = this.innerText;
            this.innerText = 'Tersalin!';
            
            setTimeout(() => {
                this.innerText = originalText;
            }, 2000);
        });
    });
    
    // Background Music
    let backgroundMusic;
    const playButton = document.getElementById('playButton');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    
    function playBackgroundMusic() {
        if (!backgroundMusic) {
            // In real scenario, replace with actual music URL
            backgroundMusic = new Audio('Wedding - Why Cant Love Always Turn To Sin.mp3');
            backgroundMusic.loop = true;
            backgroundMusic.volume = 0.5;
        }
        
        try {
            // We're catching this because browsers may block autoplay
            backgroundMusic.play().then(() => {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline-block';
            }).catch(err => {
                console.log('Autoplay prevented. User needs to interact with the page first.');
            });
        } catch (err) {
            console.log('Playback error:', err);
        }
    }
    
    playButton.addEventListener('click', function() {
        if (!backgroundMusic) {
            playBackgroundMusic();
            return;
        }
        
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline-block';
        } else {
            backgroundMusic.pause();
            playIcon.style.display = 'inline-block';
            pauseIcon.style.display = 'none';
        }
    });
    
    // Gallery Image Modal
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    if (galleryItems.length > 0) {
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img id="modal-image">
                <div class="modal-nav">
                    <button id="prev-image"><i class="fas fa-chevron-left"></i></button>
                    <button id="next-image"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add CSS for modal
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .image-modal {
                display: none;
                position: fixed;
                z-index: 1001;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.9);
            }
            .modal-content {
                position: relative;
                margin: auto;
                width: 90%;
                max-width: 800px;
                height: 90%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            #modal-image {
                max-width: 100%;
                max-height: 80vh;
                object-fit: contain;
            }
            .close-modal {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 40px;
                font-weight: bold;
                cursor: pointer;
            }
            .modal-nav {
                position: absolute;
                bottom: -40px;
                width: 100%;
                display: flex;
                justify-content: center;
                gap: 20px;
            }
            .modal-nav button {
                background: none;
                border: 2px solid white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                color: white;
                font-size: 18px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            .modal-nav button:hover {
                background-color: rgba(255,255,255,0.2);
            }
        `;
        document.head.appendChild(modalStyle);
        
        // Modal functionality
        const modalElement = document.querySelector('.image-modal');
        const modalImage = document.getElementById('modal-image');
        const closeModal = document.querySelector('.close-modal');
        const prevButton = document.getElementById('prev-image');
        const nextButton = document.getElementById('next-image');
        let currentImageIndex = 0;
        
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                modalElement.style.display = 'flex';
                modalImage.src = this.src;
                currentImageIndex = index;
            });
        });
        
        closeModal.addEventListener('click', function() {
            modalElement.style.display = 'none';
        });
        
        prevButton.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex === 0) ? galleryItems.length - 1 : currentImageIndex - 1;
            modalImage.src = galleryItems[currentImageIndex].src;
        });
        
        nextButton.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex === galleryItems.length - 1) ? 0 : currentImageIndex + 1;
            modalImage.src = galleryItems[currentImageIndex].src;
        });
        
        // Close modal when clicking outside the image
        modalElement.addEventListener('click', function(e) {
            if (e.target === modalElement) {
                modalElement.style.display = 'none';
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (modalElement.style.display === 'flex') {
                if (e.key === 'ArrowLeft') {
                    prevButton.click();
                } else if (e.key === 'ArrowRight') {
                    nextButton.click();
                } else if (e.key === 'Escape') {
                    closeModal.click();
                }
            }
        });
    }
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.section-title, .ornament, .couple-names, .person, .love-story, .event-card, .gallery-item');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // Add CSS for animations
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .section-title, .ornament, .couple-names, .person, .love-story, .event-card, .gallery-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Run checkScroll on load and scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
});