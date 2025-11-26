import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./ContactUs.css";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
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

  const [formData, setFormData] = useState({
    from_email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        "service_jwticqi", // 🔁 Replace this
        "template_e4aqb8l", // 🔁 Replace this
        formData,
        "OC-kGvkcCmtGc2lrh" // 🔁 Replace this
      )
      .then(() => {
        alert(t('contact.form.success'));
        setFormData({ from_email: "", subject: "", message: "" });
      })
      .catch((error) => {
        console.error("❌ EmailJS Error:", error);
        alert(t('contact.form.error'));
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const contactInfo = [
    {
      title: t('contact.info.email.title'),
      value: "info@arkanaltafawuq.com",
      description: t('contact.info.email.description'),
      link: "mailto:info@arkanaltafawuq.com",
      action: "email"
    },
    {
      title: t('contact.info.phone.title'),
      value: "+966 54 947 2381",
      description: t('contact.info.phone.description'),
      link: "tel:+966549472381",
      action: "phone"
    },
    {
      title: t('contact.info.location.title'),
      value: t('contact.info.location.value'),
      description: t('contact.info.location.description'),
      link: "https://maps.app.goo.gl/zMjJ4NWnqta9pVMr7",
      action: "location"
    }
  ];

  return (
    <main className="contact-page">
      {/* Hero Section */}
      <section className="hero section" aria-label="Contact Hero">
        <div className="hero__bg-overlay" />
        <div className="hero__content container reveal">
          <div className="hero__badge">{t('contact.hero.badge')}</div>
          <h1 className="hero__title">
            <span className="hero__title-line">{t('contact.hero.titleLine1')}</span>
            <span className="hero__title-line hero__title-accent">{t('contact.hero.titleLine2')}</span>
          </h1>
          <p className="hero__subtitle">
            {t('contact.hero.subtitle')}
          </p>
          <div className="hero__description">
            <p>
              {t('contact.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info contact-info--beige section">
        <div className="container">
          <div className="section__header reveal">
            <span className="section__subtitle">{t('contact.info.subtitle')}</span>
            <h2 className="section__title">{t('contact.info.title')}</h2>
            <p className="section__description">
              {t('contact.info.description')}
            </p>
          </div>
          
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <a 
                key={index} 
                href={info.link}
                className="contact-info-card reveal"
                target={info.action === 'location' ? '_blank' : undefined}
                rel={info.action === 'location' ? 'noopener noreferrer' : undefined}
              >
                <div className="contact-info-icon">
                  <div className="icon-badge">{info.title.charAt(0)}</div>
                </div>
                <div className="contact-info-content">
                  <h3>{info.title}</h3>
                  <p className="contact-info-value">{info.value}</p>
                  {info.value2 && (
                    <p className="contact-info-value">{info.value2}</p>
                  )}
                  <p className="contact-info-description">{info.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section section">
        <div className="container">
          <div className="contact-form-container reveal">
            <div className="form-header">
              <span className="section__subtitle">{t('contact.form.subtitle')}</span>
              <h2 className="section__title">{t('contact.form.title')}</h2>
              <p className="section__description">
                {t('contact.form.description')}
              </p>
            </div>

        <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="from_email">{t('contact.form.fields.email')}</label>
          <input
            type="email"
            id="from_email"
            name="from_email"
            value={formData.from_email}
            onChange={handleChange}
                  placeholder={t('contact.form.fields.email')}
            required
          />
              </div>

              <div className="form-group">
          <label htmlFor="subject">{t('contact.form.fields.name')}</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
                  placeholder={t('contact.form.fields.name')}
            required
          />
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('contact.form.fields.message')}</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
                  placeholder={t('contact.form.fields.message')}
                  rows="6"
            required
          ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
          </button>
        </form>
      </div>
    </div>
      </section>

      {/* Additional Info Section */}
      <section className="additional-info section">
        <div className="container">
          <div className="info-grid reveal">
            <div className="info-card">
              <h3>{t('contact.additional.responseTime.title')}</h3>
              <p>{t('contact.additional.responseTime.description')}</p>
            </div>
            <div className="info-card">
              <h3>{t('contact.additional.consultation.title')}</h3>
              <p>{t('contact.additional.consultation.description')}</p>
            </div>
            <div className="info-card">
              <h3>{t('contact.additional.support.title')}</h3>
              <p>{t('contact.additional.support.description')}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;