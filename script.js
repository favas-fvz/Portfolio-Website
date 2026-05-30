// ==========================================
// Portfolio Data
// Easily update these arrays to add new works!
// ==========================================

// 1. DESIGN WORKS
const designWorks = [
    {
        id: 1,
        title: "Screenshot",
        category: "Brand Identity",
        image: "assets/Screenshot 2026-05-30 203640.png",
        link: "#" // Replace with a link to the project details if you have one
    },
    {
        id: 2,
        title: "Lumina Skincare",
        category: "Packaging Design",
        image: "assets/packaging.png",
        link: "#"
    },
    
];

// 2. VIDEO WORKS
const videoWorks = [
    {
        id: 1,
        title: "Nike - Motion Concept",
        category: "Motion Graphics",
        // You can use a GIF for videos, or a thumbnail image!
        image: "https://placehold.co/800x600/111/fff?text=Video+Thumbnail", 
        video: "assets/your-video-name.mp4", // <-- ADD YOUR VIDEO PATH HERE
        link: "#"
    },
    {
        id: 2,
        title: "Summer Festival Promo",
        category: "Video Editing",
        image: "https://placehold.co/800x600/222/fff?text=Promo+Video",
        video: "assets/your-other-video.mp4", // <-- ADD YOUR VIDEO PATH HERE
        link: "#"
    }
];

// ==========================================
// Render Portfolio Items
// ==========================================

function createItemHTML(work, index) {
    const delay = index * 100; // Staggered animation delay
    const videoAttr = work.video ? `data-video="${work.video}"` : '';
    return `
        <div class="portfolio-item" style="transition-delay: ${delay}ms; cursor: pointer;" data-image="${work.image}" ${videoAttr}>
            <div class="portfolio-img-wrapper">
                <img src="${work.image}" alt="${work.title}" class="portfolio-img" loading="lazy">
            </div>
            <div class="portfolio-info">
                <div class="portfolio-category">${work.category}</div>
                <h3 class="portfolio-title">${work.title}</h3>
            </div>
        </div>
    `;
}

function renderPortfolio() {
    const designGrid = document.getElementById('design-gallery');
    const videoGrid = document.getElementById('video-gallery');

    // Render Design Works
    designWorks.forEach((work, index) => {
        designGrid.insertAdjacentHTML('beforeend', createItemHTML(work, index));
    });

    // Render Video Works
    videoWorks.forEach((work, index) => {
        videoGrid.insertAdjacentHTML('beforeend', createItemHTML(work, index));
    });
}

// ==========================================
// Filter Logic
// ==========================================
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const designGallery = document.getElementById('design-gallery');
    const videoGallery = document.getElementById('video-gallery');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button styling
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show/Hide relevant gallery
            const filterValue = btn.getAttribute('data-filter');
            
            if (filterValue === 'design') {
                designGallery.style.display = 'grid';
                videoGallery.style.display = 'none';
            } else if (filterValue === 'video') {
                designGallery.style.display = 'none';
                videoGallery.style.display = 'grid';
            }

            // Small delay to ensure display:grid is applied before animating items
            setTimeout(() => {
                const visibleItems = document.querySelectorAll('.portfolio-item');
                // Remove visible class to re-trigger fade in
                visibleItems.forEach(item => {
                    item.classList.remove('visible');
                });
                
                // If scroll animations observer was set globally we wouldn't need to re-init,
                // but since it only observes once, we just trigger a small effect directly here
                // for the active gallery items
                const activeGallery = filterValue === 'design' ? designGallery : videoGallery;
                const activeItems = activeGallery.querySelectorAll('.portfolio-item');
                
                activeItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 100);
                });
            }, 50);
        });
    });
}

// ==========================================
// Scroll Animations (Intersection Observer)
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe portfolio items after they are rendered
    const items = document.querySelectorAll('.portfolio-item');
    items.forEach(item => {
        observer.observe(item);
    });
}

// ==========================================
// Lightbox Logic
// ==========================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = document.querySelector('.lightbox-close');

    // Add click event to the work section (event delegation)
    document.getElementById('work').addEventListener('click', (e) => {
        const item = e.target.closest('.portfolio-item');
        if (item) {
            e.preventDefault();
            const imageSrc = item.getAttribute('data-image');
            const videoSrc = item.getAttribute('data-video');
            
            if (videoSrc) {
                lightboxImg.style.display = 'none';
                lightboxVideo.style.display = 'block';
                lightboxVideo.src = videoSrc;
                lightbox.classList.add('active');
                lightboxVideo.play();
            } else if (imageSrc) {
                lightboxVideo.style.display = 'none';
                lightboxVideo.pause();
                lightboxImg.style.display = 'block';
                lightboxImg.src = imageSrc;
                lightbox.classList.add('active');
            }
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.src = "";
        }
    }

    // Close on click close button
    closeBtn.addEventListener('click', closeLightbox);

    // Close on click outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
    initFilters();
    initLightbox();
    
    // Give a small delay before initializing observer to ensure DOM is ready
    setTimeout(() => {
        initScrollAnimations();
    }, 100);
});

// ==========================================
// Navbar Scroll Effect
// ==========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
    }
});
