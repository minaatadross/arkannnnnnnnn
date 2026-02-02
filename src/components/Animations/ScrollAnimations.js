import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Animations.css';

const ScrollAnimations = () => {
  const location = useLocation();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px 0px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const startObserving = () => {
      const animateElements = document.querySelectorAll('.animate-on-scroll');
      animateElements.forEach((el) => observer.observe(el));
    };

    // Run after paint so route content (e.g. Home service cards) is in the DOM
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        startObserving();
      });
    });

    // Re-observe when route changes so new .animate-on-scroll elements are picked up
    const timeoutId = setTimeout(startObserving, 300);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
};

export default ScrollAnimations;




