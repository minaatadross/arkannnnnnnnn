import React, { useState } from "react";
import "./Bathroom.css";
import BATHROOM1 from "../../assets/BATHROOM1.jpg";
import BATHROOM2 from "../../assets/BATHROOM2.jpg";
import BATHROOM3 from "../../assets/BATHROOM3.jpg";
import BATHROOM4 from "../../assets/BATHROOM4.jpg";
import BATHROOM5 from "../../assets/BATHROOM5.jpg";

const Bathroom = () => {
  const projects = [
    { image: BATHROOM1 },
    { image: BATHROOM2 },
    { image: BATHROOM3 },
    { image: BATHROOM4 },
    { image: BATHROOM5 },
  ];

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div>
      <main className="projects-container">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card"
            onClick={() => openPopup(index)}
          >
            <img
              src={project.image}
              alt={`Project ${index + 1}`}
              className="project-image"
            />
          </div>
        ))}
      </main>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close-button" onClick={closePopup}>
              ×
            </button>
            <button className="popup-prev-button" onClick={showPrevImage}>
              ‹
            </button>
            <img
              src={projects[currentIndex].image}
              alt={`Bathroom Project ${currentIndex + 1}`}
              className="popup-image"
            />
            <button className="popup-next-button" onClick={showNextImage}>
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bathroom;
