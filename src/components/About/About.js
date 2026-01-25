import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./About.css";
// import aboutMainImg from "../../assets/aboutmain.webp";

const About = () => {
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

  // Modern values without icons
  const values = [
    { label: t('about.values.items.collaboration.label'), description: t('about.values.items.collaboration.description') },
    { label: t('about.values.items.innovation.label'), description: t('about.values.items.innovation.description') },
    { label: t('about.values.items.ownership.label'), description: t('about.values.items.ownership.description') },
    { label: t('about.values.items.improvement.label'), description: t('about.values.items.improvement.description') },
    { label: t('about.values.items.quality.label'), description: t('about.values.items.quality.description') },
    { label: t('about.values.items.sustainable.label'), description: t('about.values.items.sustainable.description') },
  ];

  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="hero section" aria-label="About Hero">
        <div className="hero__bg-overlay" />
        <div className="hero__content container reveal">
          <div className="hero__badge">{t('about.hero.badge')}</div>
          <h1 className="hero__title">
            <span className="hero__title-line">{t('about.hero.titleLine1')}</span>
            <span className="hero__title-line hero__title-accent">{t('about.hero.titleLine2')}</span>
          </h1>
          <p className="hero__subtitle">
            {t('about.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="content-section section">
        <div className="container">
          <div className="content-grid reveal">
            <div className="content-card">
              <h3>{t('about.capabilities.title')}</h3>
              <p>
                {t('about.capabilities.description1')}
              </p>
              <p>
                {t('about.capabilities.description2')}
              </p>
            </div>

            <div className="content-card">
              <h3>{t('about.printServices.title')}</h3>
              <p>
                {t('about.printServices.description1')}
              </p>
              <p>
                {t('about.printServices.description2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision section">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card mission-card reveal">
              <div className="mv-header">
                <span className="mv-badge">{t('about.mission.badge')}</span>
                <h3>{t('about.mission.title')}</h3>
              </div>
              <div className="mv-content">
            <p>
              {t('about.mission.description1')}
            </p>
            <p>
              {t('about.mission.description2')}
            </p>
          </div>
            </div>

            <div className="mv-card vision-card reveal">
              <div className="mv-header">
                <span className="mv-badge">{t('about.vision.badge')}</span>
                <h3>{t('about.vision.title')}</h3>
              </div>
              <div className="mv-content">
                <p>
                  {t('about.vision.description1')}
            </p>
            <p>
              {t('about.vision.description2')}
            </p>
          </div>
            </div>
          </div>
      </div>
      </section>

      {/* Values Section */}
      <section className="values values--beige section values-section">
        <div className="container">
          <div className="values-header reveal">
            <span className="eyebrow">{t('about.values.subtitle')}</span>
            <h2 className="section__title">{t('about.values.title')}</h2>
            <p className="section__description subtitle">
              {t('about.values.description')}
            </p>
        </div>

        <div className="values-grid value-grid">
          {values.map((value, index) => (
              <div key={index} className="value-card reveal">
                <span className="value-badge label"><span className="value-icon"></span> {value.label}</span>
                <p className="value-description desc">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;