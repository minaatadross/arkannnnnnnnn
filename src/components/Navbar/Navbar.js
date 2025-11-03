import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Navbar.css";
import arkanlogo1 from "../../assets/arkanlogo1.webp"; // Logo Image
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

function Navbar() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const closeDropdown = () => {
    // Dropdown functionality removed for simplified navigation
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-left">
          <Link to="/">
            <img src={arkanlogo1} alt="Logo" className="navbar-logo" />
          </Link>
        </div>

        <div className="navbar-mobile-controls">
          <div className="navbar-mobile-lang-switcher">
            <LanguageSwitcher />
          </div>
          <div className="burger-icon" onClick={toggleMobileMenu}>
            ☰
          </div>
        </div>

        <div className="navbar-right">
          <ul className={`navbar-menu ${mobileMenuOpen ? "active" : ""}`}>
            <li>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                {t('navbar.home')}
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                {t('navbar.about')}
              </Link>
            </li>
            <li>
              <Link
                to="/production"
                onClick={() => {
                  closeDropdown();
                  setMobileMenuOpen(false);
                }}
              >
                {t('navbar.production')}
              </Link>
            </li> 
            <li>
              <Link
                to="/ContactUs"
                className="contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('navbar.contact')}
              </Link>
            </li>
            <li className="navbar-lang-switcher">
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      </nav>
      <div className="navbar-placeholder"></div>
    </>
  );
}

export default Navbar;
