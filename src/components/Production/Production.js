import React, { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./Production.css";

import productionmain from "../../assets/productionmain.webp";
import eventImage1 from "../../assets/eventImage1.webp";

// Gallery images
import arkan11 from "../../assets/arkan11.jpeg";
import arkan22 from "../../assets/arkan22.jpeg";
import arkann1 from "../../assets/arkann1.jpeg";
import arkan44 from "../../assets/arkan44.jpeg";
import arkann2 from "../../assets/arkann2.jpeg";
import arkan66 from "../../assets/arkan66.jpeg";
import arkan77 from "../../assets/arkan77.jpeg";
import arkan88 from "../../assets/arkan88.jpeg";
import arkan99 from "../../assets/arkan99.jpeg";

import brandingBg from "../../assets/branding-bg.webp";


import production1 from "../../assets/production1.webp";
import production2 from "../../assets/production2.webp";
import production3 from "../../assets/production3.webp";
import production4 from "../../assets/production4.webp";
import production5 from "../../assets/production5.webp";
import production6 from "../../assets/production6.webp";
import production7 from "../../assets/production7.webp";
import production8 from "../../assets/production8.webp";

const Production = () => {
  const { t } = useTranslation();

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

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Gallery items
  const galleryItems = useMemo(() => [
    {
      image: arkan11,
      alt: t('production.gallery.items.1'),
      caption: t('production.gallery.items.1')
    },
    {
      image: arkan22,
      alt: t('production.gallery.items.2'),
      caption: t('production.gallery.items.2')
    },
    {
      image: arkann1,
      alt: t('production.gallery.items.3'),
      caption: t('production.gallery.items.3')
    },
    {
      image: arkan44,
      alt: t('production.gallery.items.4'),
      caption: t('production.gallery.items.4')
    },
    {
      image: arkann2,
      alt: t('production.gallery.items.5'),
      caption: t('production.gallery.items.5')
    },
    {
      image: arkan66,
      alt: t('production.gallery.items.6'),
      caption: t('production.gallery.items.6')
    },
    {
      image: arkan77,
      alt: t('production.gallery.items.7'),
      caption: t('production.gallery.items.7')
    },
    {
      image: arkan88,
      alt: t('production.gallery.items.8'),
      caption: t('production.gallery.items.8')
    },
    {
      image: arkan99,
      alt: t('production.gallery.items.9'),
      caption: t('production.gallery.items.9')
    }
  ], [t]);

  const ourWork = useMemo(
    () => [production1, production2, production3, production4, production5, production6, production7, production8],
    []
  );
 
  const railRef = useRef(null);
  const nudge = (dir = 1) => {
    const el = railRef.current;
    if (!el) return;
    const one = el.querySelector(".production-work-card");
    if (!one) return;
    const step = one.getBoundingClientRect().width + 16;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <main className="production-page">
      {/* Hero Section */}
      <section className="hero section" aria-label="Production Hero">
        <div className="hero__bg-overlay" />
        <div className="hero__content container reveal">
          <div className="hero__badge">{t('production.hero.badge')}</div>
          <h1 className="hero__title">
            <span className="hero__title-line">{t('production.hero.titleLine1')}</span>
            <span className="hero__title-line hero__title-accent">{t('production.hero.titleLine2')}</span>
            </h1>
          <p className="hero__subtitle">
            {t('production.hero.subtitle')}
          </p>
          <div className="hero__description">
            <p>
              {t('production.hero.description')}
            </p>
          </div>
            <a
              href="/files/productionportfolio.pdf"
              download="ProductionPortfolio.pdf"
            className="hero__cta"
            >
            {t('production.hero.cta')}
            </a>
        </div>
      </section>

      {/* Exhibition & Event Setup Section */}
      <section className="content-section section">
        <div className="container">
          <div className="section__header reveal">
            <span className="section__subtitle">{t('production.eventSetup.subtitle')}</span>
            <h2 className="section__title">{t('production.eventSetup.title')}</h2>
            <p className="section__description">
              {t('production.eventSetup.description')}
            </p>
          </div>
          
          <div className="content-grid reveal">
            <div className="content-visual">
              <img src={eventImage1} alt={t('production.eventSetup.subtitle')} />
            </div>
            <div className="content-text">
              <p>
              {t('production.eventSetup.content')}
            </p>
            </div>
          </div>
        </div>
        </section>

      {/* Mosaic Gallery */}
      {galleryItems.length > 0 && (
        <section className="gallery-section section">
          <div className="container">
            <div className="gallery-grid">
              {galleryItems.map((item, index) => (
                <div key={index} className="gallery-item reveal">
                  <img src={item.image} alt={item.alt} />
                  <div className="gallery-caption">{item.caption}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Branding Section */}
      <section className="branding-section section branding-section--beige">
        <div className="branding-bg" style={{ backgroundImage: `url(${brandingBg})` }} />
        <div className="container">
          <div className="branding-content reveal">
            <div className="branding-header">
              <span className="section__subtitle eyebrow">{t('production.branding.subtitle')}</span>
              <h2 className="section__title branding-title">{t('production.branding.title')}</h2>
            </div>
            <div className="branding-grid">
              <div className="branding-card">
                <h3>{t('production.branding.professional.title')}</h3>
                <p>
                {t('production.branding.professional.description')}
            </p>
              </div>
              <div className="branding-card">
                <h3>{t('production.branding.custom.title')}</h3>
                <p>
              {t('production.branding.custom.description')}
            </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Work Gallery */}
      <section className="work-section section">
        <div className="container">
          <div className="section__header reveal">
            <span className="section__subtitle">{t('production.portfolio.subtitle')}</span>
            <h2 className="section__title">{t('production.portfolio.title')}</h2>
            <p className="section__description">
              {t('production.portfolio.description')}
            </p>
    </div>

          <div className="work-rail" ref={railRef}>
    {ourWork.map((src, i) => (
      <img
        key={i}
        src={src}
                alt={`${t('production.portfolio.subtitle')} ${i + 1}`}
                className="production-work-card"
                tabIndex={0}
      />
    ))}
          </div>
  </div>
</section>

    </main>
  );
};

export default Production;