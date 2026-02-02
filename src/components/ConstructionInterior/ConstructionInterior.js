import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaHardHat,
  FaPencilRuler,
  FaTools,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import "./ConstructionInterior.css";
import constructionHeroBg from "../../assets/arkan101.jpeg";

// Import interior assets
import int1 from "../../assets/int1.jpg";
import int2 from "../../assets/int2.jpg";
import int3 from "../../assets/int3.jpg";
import int4 from "../../assets/int4.jpg";
import int5 from "../../assets/int5.jpg";
import int6 from "../../assets/int6.jpg";
import int7 from "../../assets/int7.jpeg";
import int8 from "../../assets/int8.jpeg";
import int9 from "../../assets/int9.jpeg";
import int10 from "../../assets/int10.jpeg";
import int11 from "../../assets/int11.jpeg";
import int12 from "../../assets/int12.jpeg";
import int13 from "../../assets/int13.jpeg";
import int14 from "../../assets/int14.jpeg";
import int15 from "../../assets/int15.png";
import int16 from "../../assets/int16.png";
import int17 from "../../assets/int17.png";
import int18 from "../../assets/int18.jpeg";
import int19 from "../../assets/int19.jpeg";
import int20 from "../../assets/int20.jpeg";
import int21 from "../../assets/int21.png";
import int22 from "../../assets/int22.jpeg";
import int23 from "../../assets/int23.jpeg";
import int24 from "../../assets/int24.png";
import int25 from "../../assets/int25.jpeg";
import int26 from "../../assets/int26.jpeg";

const ConstructionInterior = () => {
  const { t } = useTranslation();

  const projects = [
    int1, int2, int3, int4, int5, int6, int7, int8, int9,
    int10, int11, int12, int13, int14, int15, int16, int17,
    int18, int19, int20, int21, int22, int23, int24, int25, int26
  ];

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Robust IntersectionObserver (for reveal sections only)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target); // important (prevents stuck cases)
          }
        });
      },
      { threshold: 0.08 }
    );

    // Safari-friendly: observe after paint
    requestAnimationFrame(() => {
      els.forEach((el) => observer.observe(el));
    });

    return () => observer.disconnect();
  }, []);

  const stats = [
    { id: "projects", value: "150+", label: t("construction.stats.projects") },
    { id: "experience", value: "2+ yrs", label: t("construction.stats.experience") },
    { id: "team", value: "30+", label: t("construction.stats.team") },
  ];

  const highlights = [
    {
      id: "design",
      icon: <FaPencilRuler />,
      title: t("construction.highlights.cards.design.title"),
      description: t("construction.highlights.cards.design.description"),
    },
    {
      id: "build",
      icon: <FaHardHat />,
      title: t("construction.highlights.cards.build.title"),
      description: t("construction.highlights.cards.build.description"),
    },
    {
      id: "renovation",
      icon: <FaTools />,
      title: t("construction.highlights.cards.renovation.title"),
      description: t("construction.highlights.cards.renovation.description"),
    },
  ];

  const openPopup = useCallback((index) => {
    setCurrentIndex(index);
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
    document.body.style.overflow = "";
  }, []);

  const showNextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const showPrevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isPopupOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closePopup();
      if (e.key === "ArrowRight") showNextImage();
      if (e.key === "ArrowLeft") showPrevImage();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPopupOpen, closePopup, showNextImage, showPrevImage]);

  // Cleanup overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <main className="construction-page">
      <section
        className="construction-hero section reveal"
        style={{ backgroundImage: `url(${constructionHeroBg})` }}
      >
        <div className="container">
          <p className="section-badge">{t("construction.hero.badge")}</p>
          <h1 className="hero-title">
            <span>{t("construction.hero.titleLine1")}</span>
            <span className="hero-title-accent">
              {t("construction.hero.titleLine2")}
            </span>
          </h1>
          <p className="section-description">
            {t("construction.hero.subtitle")}
          </p>
          <div className="hero-actions">
            <Link to="/ContactUs" className="btn primary">
              {t("construction.hero.ctaPrimary")}
            </Link>
            <Link to="/about" className="btn ghost">
              {t("construction.hero.ctaSecondary")}
            </Link>
          </div>

          <div className="hero-stats">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.id}>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="construction-highlights section reveal">
        <div className="container">
          <div className="section-heading">
            <p className="section-badge">{t("construction.highlights.badge")}</p>
            <h2>{t("construction.highlights.title")}</h2>
            <p className="section-description">
              {t("construction.highlights.description")}
            </p>
          </div>
          <div className="highlight-grid">
            {highlights.map((highlight) => (
              <div className="highlight-card" key={highlight.id}>
                <div className="highlight-icon">{highlight.icon}</div>
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPORTANT: Gallery section WITHOUT reveal (prevents images stuck hidden) */}
      <section className="construction-gallery section">
        <div className="container">
          <div className="section-heading">
            <p className="section-badge">{t("construction.gallery.badge")}</p>
            <h2>{t("construction.gallery.title")}</h2>
            <p className="section-description">
              {t("construction.gallery.description")}
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="projects-grid">
              {projects.map((image, index) => (
                <button
                  key={index}
                  className="project-card scan-card"
                  style={{ "--scan-img": `url(${image})` }}
                  onClick={() => openPopup(index)}
                  type="button"
                >
                  <img
                    src={image}
                    alt={`Construction Project ${index + 1}`}
                    className="project-image"
                    loading="eager"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          ) : (
            <p className="empty-message">{t("construction.gallery.empty")}</p>
          )}
        </div>
      </section>

      <section className="construction-cta section reveal">
        <div className="container">
          <h2>{t("construction.cta.title")}</h2>
          <p className="section-description">{t("construction.cta.description")}</p>
          <div className="cta-actions">
            <Link to="/ContactUs" className="btn primary">
              {t("construction.cta.primary")}
            </Link>
            <a href="tel:+966549472381" className="btn ghost">
              {t("construction.cta.secondary")}
            </a>
          </div>
        </div>
      </section>

      {isPopupOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="popup-close-button"
              onClick={closePopup}
              aria-label="Close gallery"
              type="button"
            >
              <FaTimes />
            </button>

            <button
              className="popup-prev-button"
              onClick={showPrevImage}
              aria-label="Previous image"
              type="button"
            >
              <FaChevronLeft />
            </button>

            <img
              src={projects[currentIndex]}
              alt={`Construction Project ${currentIndex + 1}`}
              className="popup-image"
              decoding="async"
            />

            <button
              className="popup-next-button"
              onClick={showNextImage}
              aria-label="Next image"
              type="button"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ConstructionInterior;
