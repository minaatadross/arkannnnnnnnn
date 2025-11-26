import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaDraftingCompass,
  FaCubes,
  FaTruckLoading,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import "./Design.css";

const importAll = (r) => {
  const images = {};
  r.keys().forEach((item) => {
    const resource = r(item);
    images[item.replace("./", "")] = resource?.default ?? resource;
  });
  return images;
};

let images = {};

try {
  images = importAll(
    require.context(
      "../../assets",
      false,
      /arkanpic\d+\.(jpg|jpeg|png|heic|webp)$/i
    )
  );
} catch (e) {
  try {
    images = importAll(
      require.context("../../assets", false, /DESIGN\d+\.(jpg|jpeg|png|heic)$/i)
    );
  } catch (e2) {
    console.log("No Exhibition Work images found");
  }
}

const Design = () => {
  const { t } = useTranslation();
  const projects = React.useMemo(() => {
    const getImageNumber = (key) => {
      const match = key.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };

    return Object.keys(images)
      .sort((a, b) => getImageNumber(a) - getImageNumber(b))
      .map((key) => images[key]);
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const stats = [
    { id: "projects", value: "500+", label: t("exhibition.stats.projects") },
    { id: "experience", value: "3+ yrs", label: t("exhibition.stats.experience") },
    { id: "cities", value: "12", label: t("exhibition.stats.cities") },
  ];

  const highlights = [
    {
      id: "concept",
      icon: <FaDraftingCompass />,
      title: t("exhibition.highlights.cards.concept.title"),
      description: t("exhibition.highlights.cards.concept.description"),
    },
    {
      id: "build",
      icon: <FaCubes />,
      title: t("exhibition.highlights.cards.build.title"),
      description: t("exhibition.highlights.cards.build.description"),
    },
    {
      id: "logistics",
      icon: <FaTruckLoading />,
      title: t("exhibition.highlights.cards.logistics.title"),
      description: t("exhibition.highlights.cards.logistics.description"),
    },
  ];

  const openPopup = (index) => {
    setCurrentIndex(index);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const showNextImage = () => {
    setCurrentIndex((currentIndex + 1) % projects.length);
  };

  const showPrevImage = () => {
    setCurrentIndex((currentIndex - 1 + projects.length) % projects.length);
  };

  return (
    <main className="exhibition-page">
      <section className="exhibition-hero section">
        <div className="container">
          <p className="section-badge">{t("exhibition.hero.badge")}</p>
          <h1 className="hero-title">
            <span>{t("exhibition.hero.titleLine1")}</span>
            <span className="hero-title-accent">
              {t("exhibition.hero.titleLine2")}
            </span>
          </h1>
          <p className="section-description">
            {t("exhibition.hero.subtitle")}
          </p>
          <div className="hero-actions">
            <Link to="/ContactUs" className="btn primary">
              {t("exhibition.hero.ctaPrimary")}
            </Link>
            <Link to="/production" className="btn ghost">
              {t("exhibition.hero.ctaSecondary")}
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

      <section className="exhibition-highlights section">
        <div className="container">
          <div className="section-heading">
            <p className="section-badge">{t("exhibition.highlights.badge")}</p>
            <h2>{t("exhibition.highlights.title")}</h2>
            <p className="section-description">
              {t("exhibition.highlights.description")}
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

      <section className="exhibition-gallery section">
        <div className="container">
          <div className="section-heading">
            <p className="section-badge">{t("exhibition.gallery.badge")}</p>
            <h2>{t("exhibition.gallery.title")}</h2>
            <p className="section-description">
              {t("exhibition.gallery.description")}
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="projects-grid">
              {projects.map((image, index) => (
                <button
                  key={index}
                  className="project-card"
                  onClick={() => openPopup(index)}
                >
                  <img
                    src={image}
                    alt={`Exhibition Project ${index + 1}`}
                    className="project-image"
                  />
                </button>
              ))}
            </div>
          ) : (
            <p className="empty-message">{t("exhibition.gallery.empty")}</p>
          )}
        </div>
      </section>

      <section className="exhibition-cta section">
        <div className="container">
          <h2>{t("exhibition.cta.title")}</h2>
          <p className="section-description">{t("exhibition.cta.description")}</p>
          <div className="cta-actions">
            <Link to="/ContactUs" className="btn primary">
              {t("exhibition.cta.primary")}
            </Link>
            <a href="tel:+966549472381" className="btn ghost">
              {t("exhibition.cta.secondary")}
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
            >
              <FaTimes />
            </button>
            <button
              className="popup-prev-button"
              onClick={showPrevImage}
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
            <img
              src={projects[currentIndex]}
              alt={`Exhibition Project ${currentIndex + 1}`}
              className="popup-image"
            />
            <button
              className="popup-next-button"
              onClick={showNextImage}
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Design;
