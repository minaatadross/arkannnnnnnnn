import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FaPlay } from "react-icons/fa";
import "./Design3D.css";
import reelArkanVideo from "../../assets/reelarkan22.mp4";

// Import images helper
const importAll = (r) => {
  const images = {};
  r.keys().forEach((item) => {
    const resource = r(item);
    images[item.replace("./", "")] = resource?.default ?? resource;
  });
  return images;
};

// Load 3D design images
let images = {};
try {
  images = importAll(
    require.context("../../assets", false, /3ddesign\d+\.(jpg|jpeg|png|heic|webp)$/i)
  );
} catch (e) {
  console.log("3D Design images not found");
}

const galleryOrder = [
  "3ddesign1.jpeg",
  "3ddesign2.jpeg",
  "3ddesign3.jpeg",
  "3ddesign8.jpeg",
  "3ddesign9.jpeg",
  "3ddesign7.jpeg",
  "3ddesign4.jpeg",
  "3ddesign5.jpeg",
  "3ddesign6.jpeg",
];
const orderedProjects = galleryOrder.map((name) => images[name]).filter(Boolean);

const Design3D = () => {
  const { t } = useTranslation();
  const projects = orderedProjects.length ? orderedProjects : Object.values(images);

  // Video files with metadata
  const videos = useMemo(
    () => [
      {
        src: reelArkanVideo,
        title: t('design3d.videos.items.signature.title'),
        subtitle: t('design3d.videos.items.signature.subtitle'),
        tag: t('design3d.videos.items.signature.tag')
      }
    ],
    [t]
  );

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideo, setIsVideo] = useState(false);
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' or 'videos'

  const openPopup = (index, type = 'photo') => {
    setCurrentIndex(index);
    setIsVideo(type === 'video');
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const showNext = () => {
    if (isVideo) {
      setCurrentIndex((currentIndex + 1) % videos.length);
    } else {
      setCurrentIndex((currentIndex + 1) % projects.length);
    }
  };

  const showPrev = () => {
    if (isVideo) {
      setCurrentIndex((currentIndex - 1 + videos.length) % videos.length);
    } else {
      setCurrentIndex((currentIndex - 1 + projects.length) % projects.length);
    }
  };

  // Setup scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [activeTab]);

  return (
    <main className="design3d-page">
      {/* Hero Section */}
      <section className="hero section" aria-label="3D Design Hero">
        <div className="hero__bg-overlay" />
        <div className="hero__content container reveal">
          <div className="hero__badge">{t('design3d.hero.badge')}</div>
          <h1 className="hero__title">
            <span className="hero__title-line">{t('design3d.hero.titleLine1')}</span>
            {t('design3d.hero.titleLine2') && (
              <span className="hero__title-line hero__title-accent">{t('design3d.hero.titleLine2')}</span>
            )}
          </h1>
          <p className="hero__subtitle">
            {t('design3d.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="tabs-section section">
        <div className="container">
          <div className="tabs-container reveal">
            <button
              className={`tab-button ${activeTab === 'photos' ? 'active' : ''}`}
              onClick={() => setActiveTab('photos')}
            >
              {t('design3d.tabs.photos')}
            </button>
            <button
              className={`tab-button ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => setActiveTab('videos')}
            >
              {t('design3d.tabs.videos')}
            </button>
          </div>
        </div>
      </section>

      {/* Photos Gallery */}
      {activeTab === 'photos' && projects.length > 0 && (
        <section className="gallery-section section">
          <div className="container">
            <h2 className="section-title reveal">{t('design3d.gallery.title')}</h2>
            <div className="projects-container reveal">
              {projects.map((image, index) => (
                <div
                  key={index}
                  className="project-card"
                  onClick={() => openPopup(index, 'photo')}
                >
                  <img
                    src={image}
                    alt={`3D Design Project ${index + 1}`}
                    className="project-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Videos Gallery */}
      {activeTab === 'videos' && videos.length > 0 && (
        <section className="videos-section section">
          <div className="container">
            <h2 className="section-title reveal">{t('design3d.videos.title')}</h2>
            <div className="videos-container reveal">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="video-card"
                  onClick={() => openPopup(index, 'video')}
                >
                  <video
                    src={video.src}
                    className="video-thumbnail"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="video-gradient" />
                  <div className="video-info">
                    <span className="video-tag">{video.tag}</span>
                    <h3>{video.title}</h3>
                    <p>{video.subtitle}</p>
                  </div>
                  <div className="video-play-chip">
                    <FaPlay />
                    <span>{t('design3d.videos.watchReel')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {activeTab === 'photos' && projects.length === 0 && (
        <section className="empty-section section">
          <div className="container">
            <p className="empty-message">{t('design3d.empty.photos')}</p>
          </div>
        </section>
      )}

      {activeTab === 'videos' && videos.length === 0 && (
        <section className="empty-section section">
          <div className="container">
            <p className="empty-message">{t('design3d.empty.videos')}</p>
          </div>
        </section>
      )}

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close-button" onClick={closePopup}>
              ×
            </button>
            <button className="popup-prev-button" onClick={showPrev}>
              ‹
            </button>
            {isVideo ? (
              <video
                src={videos[currentIndex].src}
                className="popup-media"
                controls
                autoPlay
              />
            ) : (
              <img
                src={projects[currentIndex]}
                alt={`3D Design ${currentIndex + 1}`}
                className="popup-media"
              />
            )}
            <button className="popup-next-button" onClick={showNext}>
              ›
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Design3D;

