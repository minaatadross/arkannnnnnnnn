import React, { useEffect, useState, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import "./Home.css";
import Newsletter from "../Newsletter/Newsletter";
import Testimonials from "../Testimonials/Testimonials";
import Gallery from "../Gallery/Gallery";
import arkannImage from "../../assets/ARKANN.jpeg";

const Home = () => {
  const { t } = useTranslation();
  const [counts, setCounts] = useState({
    projects: 0,
    years: 0,
    satisfaction: 0
  });

  const statsRef = useRef(null);

  // Exhibition projects data - using translations
  const exhibitionProjects = useMemo(() => [
    {
      id: 1,
      src: arkannImage,
      alt: t('home.portfolio.items.1.alt'),
      title: t('home.portfolio.items.1.title'),
      caption: t('home.portfolio.items.1.caption'),
      description: t('home.portfolio.items.1.description')
    },
    {
      id: 2,
      src: "/images/WhatsApp Image 2025-09-29 at 14.02.04 copy.jpeg",
      alt: t('home.portfolio.items.2.alt'),
      title: t('home.portfolio.items.2.title'),
      caption: t('home.portfolio.items.2.caption'),
      description: t('home.portfolio.items.2.description')
    },
    {
      id: 3,
      src: "/images/WhatsApp Image 2025-09-29 at 14.01.53.jpeg",
      alt: t('home.portfolio.items.3.alt'),
      title: t('home.portfolio.items.3.title'),
      caption: t('home.portfolio.items.3.caption'),
      description: t('home.portfolio.items.3.description')
    },
    {
      id: 4,
      src: "/images/WhatsApp Image 2025-09-29 at 14.01.57.jpeg",
      alt: t('home.portfolio.items.4.alt'),
      title: t('home.portfolio.items.4.title'),
      caption: t('home.portfolio.items.4.caption'),
      description: t('home.portfolio.items.4.description')
    },
    {
      id: 5,
      src: "/images/WhatsApp Image 2025-09-29 at 14.02.01.jpeg",
      alt: t('home.portfolio.items.5.alt'),
      title: t('home.portfolio.items.5.title'),
      caption: t('home.portfolio.items.5.caption'),
      description: t('home.portfolio.items.5.description')
    },
    {
      id: 6,
      src: "/images/WhatsApp Image 2025-09-29 at 14.02.04.jpeg",
      alt: t('home.portfolio.items.6.alt'),
      title: t('home.portfolio.items.6.title'),
      caption: t('home.portfolio.items.6.caption'),
      description: t('home.portfolio.items.6.description')
    },
    {
      id: 7,
      src: "/images/WhatsApp Image 2025-09-29 at 14.02.04 copy.jpeg",
      alt: t('home.portfolio.items.7.alt'),
      title: t('home.portfolio.items.7.title'),
      caption: t('home.portfolio.items.7.caption'),
      description: t('home.portfolio.items.7.description')
    },
    {
      id: 8,
      src: "/images/WhatsApp Image 2025-10-05 at 13.17.06.jpeg",
      alt: t('home.portfolio.items.8.alt'),
      title: t('home.portfolio.items.8.title'),
      caption: t('home.portfolio.items.8.caption'),
      description: t('home.portfolio.items.8.description')
    },
    {
      id: 9,
      src: "/images/exhibition-project-11.jpg",
      alt: t('home.portfolio.items.9.alt'),
      title: t('home.portfolio.items.9.title'),
      caption: t('home.portfolio.items.9.caption'),
      description: t('home.portfolio.items.9.description')
    }
  ], [t]);

  // Animated counter function
  const animateCounter = (endValue, duration, callback) => {
    let startTime = null;
    const startValue = 0;
    
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentValue = Math.floor(progress * (endValue - startValue) + startValue);
      
      callback(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  // Setup scroll reveals and animated counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            
            // Trigger counter animation when stats section comes into view
            if (entry.target.classList.contains('stats-section')) {
              animateCounter(500, 2000, (value) => {
                setCounts(prev => ({ ...prev, projects: value }));
              });
              
              animateCounter(3, 1500, (value) => {
                setCounts(prev => ({ ...prev, years: value }));
              });
              
              animateCounter(98, 1000, (value) => {
                setCounts(prev => ({ ...prev, satisfaction: value }));
              });
            }
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

  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero section" aria-label="Home Hero">
        <div className="hero__bg-overlay" />
        <div className="hero__content container reveal">
          <div className="hero__badge">{t('home.hero.badge')}</div>
          <h1 className="hero__title">
            <span className="hero__title-line">
              {t('home.hero.titleLine1')} <span className="hero__title-accent">{t('home.hero.titleLine2')}</span>
            </span>
          </h1>
          <p className="hero__subtitle">
            {t('home.hero.subtitle')}
          </p>
          <div className="hero__description">
            <p>
              {t('home.hero.description')}
            </p>
          </div>
          <div className="hero__cta">
            <button 
              className="cta-primary"
              onClick={() => {
                window.location.href = '/ContactUs';
              }}
            >
              {t('home.hero.ctaPrimary')}
            </button>
            <button 
              className="cta-secondary"
              onClick={() => {
                document.querySelector('.exhibition-projects')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              {t('home.hero.ctaSecondary')}
            </button>
          </div>
          <div className="hero__stats stats-section reveal" ref={statsRef}>
            <div className="stat-item">
              <span className="stat-number">{counts.projects}+</span>
              <span className="stat-label">{t('home.stats.projects')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{counts.years}+</span>
              <span className="stat-label">{t('home.stats.years')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{counts.satisfaction}%</span>
              <span className="stat-label">{t('home.stats.satisfaction')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="services-overview section">
        <div className="container">
          <div className="section__header reveal in">
            <span className="section__subtitle">{t('home.services.subtitle')}</span>
            <h2 className="section__title">{t('home.services.title')}</h2>
            <p className="section__description">
              {t('home.services.description')}
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card animate-on-scroll delay-1">
              <div className="service-card__icon">
                <div className="icon-design">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                    <path d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z" fill="currentColor"/>
                    <path d="M5 15L5.5 17.5L8 18L5.5 18.5L5 21L4.5 18.5L2 18L4.5 17.5L5 15Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <div className="service-card__content">
                <h3>{t('home.services.design.title')}</h3>
                <p>
                  {t('home.services.design.description')}
                </p>
                <div className="service-card__features">
                  <span>{t('home.services.design.features.brand')}</span>
                  <span>{t('home.services.design.features.uiux')}</span>
                  <span>{t('home.services.design.features.visual')}</span>
                </div>
              </div>
            </div>

            <div className="service-card animate-on-scroll delay-1">
              <div className="service-card__icon">
                <div className="icon-production">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="service-card__content">
                <h3>{t('home.services.production.title')}</h3>
                <p>
                  {t('home.services.production.description')}
                </p>
                <div className="service-card__features">
                  <span>{t('home.services.production.features.quality')}</span>
                  <span>{t('home.services.production.features.technical')}</span>
                  <span>{t('home.services.production.features.delivery')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-preview about-preview--beige section">
        <div className="container">
          <div className="about-content reveal">
            <div className="about-content__text">
              <span className="section__subtitle">{t('home.aboutPreview.subtitle')}</span>
              <h2 className="section__title">{t('home.aboutPreview.title')}</h2>
              <p className="about-text">
                {t('home.aboutPreview.description')}
              </p>
              <div className="about-highlights">
                <div className="highlight-item">
                  <h4>{t('home.aboutPreview.highlights.leadership.title')}</h4>
                  <p>{t('home.aboutPreview.highlights.leadership.description')}</p>
                </div>
                <div className="highlight-item">
                  <h4>{t('home.aboutPreview.highlights.partnership.title')}</h4>
                  <p>{t('home.aboutPreview.highlights.partnership.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibition Projects Section */}
      <section className="exhibition-projects section">
        <div className="container">
          <Gallery 
            images={exhibitionProjects} 
            title={t('home.portfolio.title')}
          />
          
          <div className="exhibition-cta reveal">
            <div className="cta-content cta-content--beige">
              <h3>{t('home.portfolio.cta.title')}</h3>
              <p>{t('home.portfolio.cta.description')}</p>
              <div className="cta-buttons">
                <button 
                  className="cta-primary"
                  onClick={() => {
                    window.location.href = '/ContactUs';
                  }}
                >
                  {t('home.portfolio.cta.button1')}
                </button>
                <button 
                  className="cta-secondary"
                  onClick={() => {
                    window.location.href = '/production';
                  }}
                >
                  {t('home.portfolio.cta.button2')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter Section */}
      <Newsletter />
    </main>
  );
};

export default Home;
