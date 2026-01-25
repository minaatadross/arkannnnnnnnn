import React, { useState, useEffect } from "react";
import "./Services.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import BATHROOM1 from "../../assets/BATHROOM1.jpg";
import BEDROOM1 from "../../assets/BEDROOM1.jpg";
import DINNING1 from "../../assets/DINNING1.jpg";
import DRESSING1 from "../../assets/DRESSING1.jpg";
import KITCHEN1 from "../../assets/KITCHEN1.jpg";
import LIVING1 from "../../assets/LIVING1.jpg";
import CLINIC1 from "../../assets/CLINIC1.jpg";
import OFFICE1 from "../../assets/OFFICE1.jpg";
import RESTURANT1 from "../../assets/RESTURANT1.jpg";
import COMMERCIAL1 from "../../assets/COMMERCIAL1.jpg";
import RESIDENTIAL1 from "../../assets/RESIDENTIAL1.jpeg";
import DESIGN1 from "../../assets/DESIGN1.jpg";

const categories = ["Residential", "Commercial", "Our Projects"];

const allServices = [
  {
    title: "Living",
    category: "Residential",
    image: LIVING1,
    link: "/living",
  },
  {
    title: "Dinning",
    category: "Residential",
    image: DINNING1,
    link: "/dinning",
  },
  {
    title: "Bedroom",
    category: "Residential",
    image: BEDROOM1,
    link: "/bedroom",
  },

  {
    title: "Dressing",
    category: "Residential",
    image: DRESSING1,
    link: "/dressing",
  },
  {
    title: "Kitchen",
    category: "Residential",
    image: KITCHEN1,
    link: "/kitchen",
  },
  {
    title: "Bathroom",
    category: "Residential",
    image: BATHROOM1,
    link: "/bathroom",
  },
  {
    title: "Hospital & Clinic",
    category: "Commercial",
    image: CLINIC1,
    link: "/hospital",
  },
  {
    title: "Office",
    category: "Commercial",
    image: OFFICE1,
    link: "/office",
  },
  {
    title: "Restaurant",
    category: "Commercial",
    image: RESTURANT1,
    link: "/resturant",
  },
  {
    title: "Commercial",
    category: "Our Projects",
    image: COMMERCIAL1,
    link: "/Commercial",
  },
  {
    title: "Residential",
    category: "Our Projects",
    image: RESIDENTIAL1,
    link: "/Residential",
  },
  {
    title: "Design",
    category: "Our Projects",
    image: DESIGN1,
    link: "/Design",
  },
];

const Services = () => {
  const location = useLocation();
  const history = useHistory();

  const query = new URLSearchParams(location.search);
  const initialCategory = query.get("category") || "Residential";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filteredServices, setFilteredServices] = useState(
    allServices.filter((service) => service.category === initialCategory)
  );

  useEffect(() => {
    const filtered = allServices.filter(
      (service) => service.category === selectedCategory
    );
    setFilteredServices(filtered);

    history.replace(`?category=${selectedCategory}`);
  }, [selectedCategory, history]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="services-page">
      <div className="categories">
        <h2>Categories</h2>
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={selectedCategory === category ? "active" : ""}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="services">
        <h2> </h2>
        <div className="services-grid">
          {filteredServices.map((service, index) => (
            <div className="service-card" key={index}>
              <Link to={service.link} className="service-link">
                <img src={service.image} alt={service.title} />
                <h3>{service.title}</h3>
              </Link>
            </div>
          ))}
        </div>
        <div className="download-container">
          <a
            href="/files/Potfolio.pdf"
            download="Arkan-Al-Tafawuq-Potfolio.pdf"
            className="download-button"
          >
            Download our Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;