import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./OurServices.css";
import fitoutHeroBg from "../../assets/brint2.jpeg";
import commercialHeroBg from "../../assets/brintc.jpeg";

const fitoutBedImages = Array.from(
  { length: 13 },
  (_, index) => `/bed${index + 1}.jpeg?v=20260311`
).filter((image) => !image.includes("/bed5.jpeg"));
const fitoutDiningImages = Array.from(
  { length: 9 },
  (_, index) => `/din${index + 1}.jpeg?v=20260311`
).filter((image) => !image.includes("/din2.jpeg"));
const fitoutDressingImages = Array.from(
  { length: 14 },
  (_, index) => `/dress${index + 1}.jpeg?v=20260311`
).filter(
  (image) => !image.includes("/dress7.jpeg") && !image.includes("/dress13.jpeg")
);
const fitoutKitchenImages = Array.from(
  { length: 8 },
  (_, index) => `/kit${index + 1}.jpeg?v=20260311`
).filter(
  (image) =>
    !image.includes("/kit2.jpeg") &&
    !image.includes("/kit4.jpeg") &&
    !image.includes("/kit8.jpeg")
);
const fitoutSofaImages = Array.from(
  { length: 9 },
  (_, index) => `/sofa${index + 1}.jpeg?v=20260311`
).filter(
  (image) => !image.includes("/sofa3.jpeg") && !image.includes("/sofa5.jpeg")
);
const fitoutTvImages = Array.from(
  { length: 8 },
  (_, index) => `/tv${index + 1}.jpeg?v=20260311`
).filter((image) => !image.includes("/tv3.jpeg") && !image.includes("/tv7.jpeg"));
const commercialOfficeImages = Array.from({ length: 15 }, (_, index) => {
  try {
    return require(`../../assets/office${index + 1}.jpeg`);
  } catch (error) {
    return null;
  }
}).filter(Boolean);

const residentialDeliverables = [
  "Bedrooms, living areas, kitchens, and dressing rooms",
  "Wall cladding, ceilings, TV units, and custom storage",
  "Joinery, marble/wood detailing, and decorative finishes",
  "Lighting coordination and smart-home ready execution",
];

const commercialDeliverables = [
  "Offices, clinics, retail, and hospitality fit-outs",
  "Reception counters, partitions, and workstation systems",
  "Branding elements, wayfinding, and feature walls",
  "Durable high-traffic finishes with efficient maintenance plans",
];

const residentialProcess = [
  "Concept review and technical drawings",
  "Material selection and samples approval",
  "Site execution with quality checkpoints",
  "Final snagging and handover",
];

const commercialProcess = [
  "Space planning aligned with operations",
  "Budget-focused BOQ and timeline control",
  "Fast-track execution by trade packages",
  "Testing, compliance checks, and launch support",
];

const residentialSections = [
  {
    id: "beds",
    enTitle: "Beds",
    arTitle: "غرف النوم",
    enText: "Custom bed backdrops, side units, and storage layouts that maximize comfort and spatial flow.",
    arText: "تصميم غرف نوم عملية مع خلفيات أسرّة ووحدات جانبية وحلول تخزين مريحة.",
    images: fitoutBedImages,
  },
  {
    id: "dressing-rooms",
    enTitle: "Dressing Rooms",
    arTitle: "غرف الملابس",
    enText: "Efficient wardrobe planning with premium finishes, lighting, and organized accessory zones.",
    arText: "تنظيم غرف الملابس بخطط تخزين ذكية وتشطيبات راقية وإضاءة عملية.",
    images: fitoutDressingImages,
  },
  {
    id: "sofas",
    enTitle: "Sofas",
    arTitle: "الكنب",
    enText: "Living seating arrangements aligned with circulation, comfort, and the overall interior style.",
    arText: "توزيع الكنب في المساحات المعيشية بما يحقق الراحة وسهولة الحركة وتناسق التصميم.",
    images: fitoutSofaImages,
  },
  {
    id: "dining-table",
    enTitle: "Dining Table",
    arTitle: "طاولة الطعام",
    enText: "Dining zone setup with balanced proportions, lighting focus, and coordinated material palette.",
    arText: "تنسيق منطقة طاولة الطعام بأبعاد متوازنة وإضاءة مناسبة وخامات متناغمة.",
    images: fitoutDiningImages,
  },
  {
    id: "tv-units",
    enTitle: "TV Units",
    arTitle: "وحدات التلفزيون",
    enText: "Built-in TV walls and media units that combine storage, clean detailing, and cable management.",
    arText: "تنفيذ وحدات تلفزيون مدمجة بتفاصيل أنيقة وحلول تخزين وتنظيم للأسلاك.",
    images: fitoutTvImages,
  },
  {
    id: "kitchen",
    enTitle: "Kitchen",
    arTitle: "المطبخ",
    enText: "Functional kitchen planning with durable surfaces, optimized workflow, and practical cabinetry.",
    arText: "تصميم مطابخ عملية بخامات متينة وتوزيع مدروس للحركة ووحدات تخزين فعالة.",
    images: fitoutKitchenImages,
  },
];

const OurServices = () => {
  const { i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState("Residential");
  const [activeResidentialDetail, setActiveResidentialDetail] = useState(null);
  const [tappedResidentialDetail, setTappedResidentialDetail] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const detailSectionRef = useRef(null);

  const isArabic = i18n.language?.startsWith("ar");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    const elements = Array.from(document.querySelectorAll(".our-services-page .reveal"));
    requestAnimationFrame(() => {
      elements.forEach((el) => observer.observe(el));
    });

    return () => observer.disconnect();
  }, []);

  const handleResidentialCardClick = (sectionId) => {
    setActiveResidentialDetail(sectionId);
    setTappedResidentialDetail(sectionId);
    setTimeout(() => setTappedResidentialDetail(null), 260);
    requestAnimationFrame(() => {
      detailSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const openGallery = (images, index) => {
    setGalleryImages(images);
    setGalleryIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const showNextGalleryImage = () => {
    if (!galleryImages.length) return;
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const showPrevGalleryImage = () => {
    if (!galleryImages.length) return;
    setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  useEffect(() => {
    if (!isGalleryOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowRight") showNextGalleryImage();
      if (event.key === "ArrowLeft") showPrevGalleryImage();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isGalleryOpen, galleryImages.length]);

  return (
    <main className="our-services-page section">
      <header
        className="our-services-hero reveal"
        style={{
          backgroundImage: `url(${
            activeSection === "Commercial" ? commercialHeroBg : fitoutHeroBg
          })`,
        }}
      >
        <div className="our-services-hero-inner">
          <p className="section-badge">{isArabic ? "خدمات التشطيبات" : "Fit-Out Services"}</p>
          <h1 className="hero-title">
            {isArabic ? (
              <>
                <span>التشطيبات</span>
                <span className="hero-title-accent">والتجهيز</span>
              </>
            ) : (
              <>
                <span>Fit-Out</span>
                <span className="hero-title-accent">&amp; Finishing</span>
              </>
            )}
          </h1>
          <p className="section-description">
            {isArabic
              ? "حلول متكاملة للتشطيبات والتجهيز السكني والتجاري من الفكرة حتى التسليم."
              : "Your One-Stop-Shop"}
          </p>
          <div className="fitout-toggle" role="tablist" aria-label="Choose fit-out category">
            <button
              type="button"
              className={activeSection === "Residential" ? "is-active" : ""}
              onClick={() => setActiveSection("Residential")}
            >
              {isArabic ? "سكني" : "Residential"}
            </button>
            <button
              type="button"
              className={activeSection === "Commercial" ? "is-active" : ""}
              onClick={() => setActiveSection("Commercial")}
            >
              {isArabic ? "تجاري" : "Commercial"}
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        <section className="fitout-details-section reveal">
          <div className="fitout-columns">
            <div>
              <h3>{isArabic ? "ماذا ننفذ" : "What We Make"}</h3>
              <ul className="fitout-list">
                {(activeSection === "Residential"
                  ? residentialDeliverables
                  : commercialDeliverables
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{isArabic ? "آلية العمل" : "Execution Flow"}</h3>
              <ul className="fitout-list">
                {(activeSection === "Residential"
                  ? residentialProcess
                  : commercialProcess
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="fitout-split-section reveal">
          {activeSection === "Residential" && (
            <>
              <article className="fitout-block">
                <div className="fitout-block-head">
                  <p className="fitout-label">{isArabic ? "سكني" : "Residential Fit-Out"}</p>
                  <h2>{isArabic ? "التشطيبات السكنية" : "Residential"}</h2>
                  <p>
                    {isArabic
                      ? "ننفذ المساحات السكنية بتفاصيل عالية الجودة تجمع بين الجمال والوظيفة والراحة اليومية."
                      : "We deliver premium residential interiors with balanced aesthetics, functionality, and daily comfort."}
                  </p>
                </div>
              </article>

              <section className="fitout-room-sections reveal">
                <div className="fitout-room-grid">
                  {residentialSections.map((item) => (
                    <article
                      className={`fitout-room-card ${
                        activeResidentialDetail === item.id ? "is-selected" : ""
                      } ${tappedResidentialDetail === item.id ? "is-tapped" : ""}`}
                      key={item.id}
                      onClick={() => handleResidentialCardClick(item.id)}
                    >
                      <div className="fitout-room-thumb">
                        {item.images?.length > 0 ? (
                          <img
                            src={item.images[0]}
                            alt={isArabic ? item.arTitle : item.enTitle}
                            className="fitout-room-thumb-image"
                          />
                        ) : (
                          <div className="fitout-room-thumb-fallback" />
                        )}
                      </div>
                      <h3>{isArabic ? item.arTitle : item.enTitle}</h3>
                    </article>
                  ))}
                </div>
              </section>

              {activeResidentialDetail && (
                <section
                  key={activeResidentialDetail}
                  className="fitout-beds-section reveal in is-animated"
                  ref={detailSectionRef}
                >
                  {(() => {
                    const selectedSection = residentialSections.find(
                      (section) => section.id === activeResidentialDetail
                    );
                    if (!selectedSection) return null;

                    const sectionTitle = isArabic
                      ? `${selectedSection.arTitle}`
                      : `${selectedSection.enTitle} Section`;
                    const galleryImages =
                      selectedSection.id === "beds"
                        ? fitoutBedImages
                        : selectedSection.images || [];

                    return (
                      <>
                        <h3>{sectionTitle}</h3>
                        {galleryImages.length > 0 ? (
                          <div className="fitout-room-images">
                            {galleryImages.map((image, index) => (
                              <button
                                type="button"
                                key={`${selectedSection.id}-${index}`}
                                className="fitout-image-button"
                                onClick={() => openGallery(galleryImages, index)}
                              >
                                <img
                                  src={image}
                                  alt={`${selectedSection.enTitle} ${index + 1}`}
                                  className="fitout-room-image"
                                  loading="eager"
                                />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="fitout-empty-message">
                            {isArabic
                              ? "لا توجد صور مضافة لهذا القسم حالياً."
                              : "No images added for this section yet."}
                          </p>
                        )}
                      </>
                    );
                  })()}
                </section>
              )}
            </>
          )}

          {activeSection === "Commercial" && (
            <>
              <article className="fitout-block">
                <div className="fitout-block-head">
                  <p className="fitout-label">{isArabic ? "تجاري" : "Commercial Fit-Out"}</p>
                  <h2>{isArabic ? "التشطيبات التجارية" : "Commercial"}</h2>
                  <p>
                    {isArabic
                      ? "نحوّل المساحات التجارية إلى بيئات عمل واستقبال احترافية تدعم الأداء وتعكس هوية العلامة."
                      : "We transform commercial spaces into efficient, branded environments that support teams, customers, and growth."}
                  </p>
                </div>
                {commercialOfficeImages.length > 0 && (
                  <div className="fitout-room-images">
                    {commercialOfficeImages.map((image, index) => (
                      <button
                        type="button"
                        key={`office-${index}`}
                        className="fitout-image-button"
                        onClick={() => openGallery(commercialOfficeImages, index)}
                      >
                        <img
                          src={image}
                          alt={`${isArabic ? "مساحة تجارية" : "Commercial space"} ${index + 1}`}
                          className="fitout-room-image"
                          loading="eager"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </article>
            </>
          )}
        </section>
      </div>

      {isGalleryOpen && galleryImages.length > 0 && (
        <div className="fitout-popup-overlay" onClick={closeGallery} role="presentation">
          <div className="fitout-popup-content" onClick={(event) => event.stopPropagation()} role="presentation">
            <button
              type="button"
              className="fitout-popup-close"
              onClick={closeGallery}
              aria-label="Close gallery"
            >
              ×
            </button>
            <button
              type="button"
              className="fitout-popup-prev"
              onClick={showPrevGalleryImage}
              aria-label="Previous image"
            >
              ‹
            </button>
            <img
              src={galleryImages[galleryIndex]}
              alt={`Gallery image ${galleryIndex + 1}`}
              className="fitout-popup-image"
            />
            <button
              type="button"
              className="fitout-popup-next"
              onClick={showNextGalleryImage}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default OurServices;
