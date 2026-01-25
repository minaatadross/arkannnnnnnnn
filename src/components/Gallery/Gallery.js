import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import "./Gallery.css";

const Gallery = ({ images = [], title = "Our Work" }) => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateImage = useCallback((direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < images.length) {
      setCurrentIndex(newIndex);
      setSelectedImage(images[newIndex]);
    }
  }, [currentIndex, images]);

  // Close lightbox with escape key
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
        navigateImage(-1);
      } else if (e.key === 'ArrowRight') {
        navigateImage(1);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, navigateImage]);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  if (!images || images.length === 0) {
    return (
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-header">
            <h2 className="gallery-title">{title}</h2>
            <p className="gallery-subtitle">{t('gallery.noImages')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery-section">
      <div className="container">
        <div className="gallery-header reveal">
          <span className="section__subtitle">{t('gallery.subtitle')}</span>
          <h2 className="section__title">{title}</h2>
          <p className="section__description">
            {t('gallery.description')}
          </p>
        </div>

        <div className="gallery-grid">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item reveal"
              onClick={() => openLightbox(image, index)}
            >
              <div className="gallery-image-container">
                <img 
                  src={image.src} 
                  alt={image.alt || `${t('gallery.fallbackImageAlt')} ${index + 1}`}
                  className="gallery-image"
                />
                <div className="gallery-overlay">
                  <div className="gallery-overlay-content">
                    <svg className="zoom-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="gallery-caption">{image.caption || t('gallery.fallbackProject', { index: index + 1 })}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button 
              className="lightbox-nav lightbox-prev" 
              onClick={() => navigateImage(-1)}
              disabled={currentIndex === 0}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button 
              className="lightbox-nav lightbox-next" 
              onClick={() => navigateImage(1)}
              disabled={currentIndex === images.length - 1}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="lightbox-content">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt || t('gallery.fallbackImageAlt')}
                className="lightbox-image"
              />
              <div className="lightbox-info">
                <h3 className="lightbox-title">{selectedImage.title || t('gallery.fallbackTitle')}</h3>
                <p className="lightbox-description">
                  {selectedImage.description || t('gallery.fallbackDescription')}
                </p>
                <div className="lightbox-counter">
                  {currentIndex + 1} / {images.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;