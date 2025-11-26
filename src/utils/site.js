/* ==========================================================
   Site Utilities - Arkan Al Tafawuq
   Loader, cursor, scroll reveals, and magnetic hovers
   ========================================================== */

class SiteUtils {
  constructor() {
    this.cursor = null;
    this.loader = null;
    this.observer = null;
    this.init();
  }

  init() {
    this.createLoader();
    // this.createCursor();
    this.setupScrollReveals();
    this.setupMagneticHovers();
    this.setupVideoBehavior();
    this.setupAccessibility();
    this.preloadCriticalAssets();
  }

  // ---------- Loader Implementation ---------- //
  createLoader() {
    // Create loader HTML
    const loaderHTML = `
      <div id="app-overlay" aria-hidden="true">
        <div class="loader-track">
          <span class="loader-bar" id="loader-bar"></span>
        </div>
        <span class="loader-pct" id="loader-pct">0%</span>
      </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);
    this.loader = document.getElementById('app-overlay');
    this.loaderBar = document.getElementById('loader-bar');
    this.loaderPct = document.getElementById('loader-pct');

    // Simulate loading progress
    this.simulateLoading();
  }

  simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) progress = 100;
      
      this.updateLoader(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => this.hideLoader(), 300);
      }
    }, 100);
  }

  updateLoader(progress) {
    this.loaderBar.style.width = `${progress}%`;
    this.loaderPct.textContent = `${Math.round(progress)}%`;
  }

  hideLoader() {
    this.loader.classList.add('hidden');
    setTimeout(() => {
      this.loader.remove();
    }, 600);
  }

  // ---------- Custom Cursor ---------- //
  createCursor() {
    // Create cursor HTML
    const cursorHTML = `<div id="cursor"></div>`;
    document.body.insertAdjacentHTML('afterbegin', cursorHTML);
    this.cursor = document.getElementById('cursor');

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      this.cursor.style.left = e.clientX + 'px';
      this.cursor.style.top = e.clientY + 'px';
    });

    // Handle cursor interactions
    this.setupCursorInteractions();
  }

  setupCursorInteractions() {
    const interactiveElements = 'a, button, [role="button"], input, textarea, select';
    
    document.addEventListener('mouseenter', (e) => {
      if (e.target.matches(interactiveElements)) {
        this.cursor.classList.add('hover');
      }
    }, true);

    document.addEventListener('mouseleave', (e) => {
      if (e.target.matches(interactiveElements)) {
        this.cursor.classList.remove('hover');
      }
    }, true);
  }

  // ---------- Scroll Reveals ---------- //
  setupScrollReveals() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          
          // Add stagger delay for multiple elements
          const siblings = Array.from(entry.target.parentNode.children);
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 100}ms`;
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
      this.observer.observe(el);
    });
  }

  // ---------- Magnetic Hovers ---------- //
  setupMagneticHovers() {
    document.querySelectorAll('.magnetic').forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ---------- Video Behavior ---------- //
  setupVideoBehavior() {
    const videos = document.querySelectorAll('.videoWrap video');
    
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(console.log);
        } else {
          video.pause();
        }
      });
    }, {
      threshold: 0.25
    });

    videos.forEach(video => {
      videoObserver.observe(video);
    });
  }

  // ---------- Preload Critical Assets ---------- //
  preloadCriticalAssets() {
    // Preload hero image
    const heroImg = new Image();
    heroImg.src = '/src/assets/arkanhero.webp';
    heroImg.onload = () => {
      heroImg.classList.add('loaded');
    };
    
    // Preload fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = '/src/fonts/DMSerifText-Regular.ttf';
    fontLink.as = 'font';
    fontLink.type = 'font/ttf';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);

    // Preload critical CSS
    const criticalCSS = document.createElement('link');
    criticalCSS.rel = 'preload';
    criticalCSS.href = '/src/index.css';
    criticalCSS.as = 'style';
    document.head.appendChild(criticalCSS);

    // Setup lazy loading for images
    this.setupLazyLoading();
  }

  // ---------- Lazy Loading Setup ---------- //
  setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px'
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => img.classList.add('loaded'));
    }
  }

  // ---------- Accessibility Enhancements ---------- //
  setupAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--accent);
      color: var(--bg);
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10000;
      transition: top 0.3s;
    `;
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add ARIA labels to interactive elements
    document.querySelectorAll('button, a').forEach(el => {
      if (!el.getAttribute('aria-label') && !el.textContent.trim()) {
        el.setAttribute('aria-label', 'Interactive element');
      }
    });

    // Ensure focus management
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  // ---------- Utility Methods ---------- //
  addRevealClass(selector) {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal');
    });
  }

  addMagneticClass(selector) {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('magnetic');
    });
  }

  wrapVideos() {
    document.querySelectorAll('video').forEach(video => {
      if (!video.closest('.videoWrap')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'videoWrap';
        video.parentNode.insertBefore(wrapper, video);
        wrapper.appendChild(video);
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.siteUtils = new SiteUtils();
});

// Export for module usage
export default SiteUtils;
