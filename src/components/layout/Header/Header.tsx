import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, useLocale } from '../../../hooks';
import { Container } from '../Container';
import { Icon } from '../../ui';
import { ContactModal } from '../../domain';
import logoImg from '../../../assets/icon/logo.png';
import styles from './Header.module.css';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const { t, locale, toggleLocale, data } = useLocale();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navItems = [
    { href: '/', label: data.nav.home },
    { href: '/magazines', label: data.nav.magazine },
    { href: '/about', label: data.nav.about },
    { href: 'contact', label: data.nav.contact, isContact: true },
  ];

  const handleContactClick = () => {
    setIsMenuOpen(false);
    setIsContactModalOpen(true);
  };

  const sidebarVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      x: -20,
      transition: {
        type: 'tween' as const,
        duration: 0.25,
        ease: [0.4, 0, 1, 1] as const,
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: 'tween' as const,
        duration: 0.35,
        ease: [0, 0, 0.2, 1] as const,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: 30,
    },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.08,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    }),
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <Container>
          <nav className={styles.nav} aria-label="Main navigation">
            {/* Hamburger Button */}
            <button
              className={styles.hamburger}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t('a11y.menuClose') : t('a11y.menuOpen')}
              aria-expanded={isMenuOpen}
            >
              <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.active : ''}`} />
              <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.active : ''}`} />
              <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.active : ''}`} />
            </button>

            {/* Logo */}
            <Link to="/" className={styles.logo} aria-label="TravelWithPets Home">
              {/* <img src={logoImg} alt="" className={styles.logoImage} /> */}
              <span className={styles.logoText}>TravelWithPets</span>
            </Link>

            {/* Right Actions */}
            <div className={styles.actions}>
              <button
                className={styles.iconButton}
                onClick={toggleLocale}
                aria-label={t('a11y.toggleLanguage')}
              >
                <span className={styles.localeText}>
                  {locale === 'ko' ? 'EN' : 'KO'}
                </span>
              </button>

              <button
                className={styles.iconButton}
                onClick={toggleTheme}
                aria-label={t('a11y.toggleTheme')}
              >
                <Icon name={isDark ? 'sun' : 'moon'} size="md" />
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className={styles.overlay}
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              className={styles.sidebar}
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className={styles.sidebarContent}>
                {/* Sidebar Header */}
                <div className={styles.sidebarHeader}>
                  <Link
                    to="/"
                    className={styles.sidebarLogo}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <img src={logoImg} alt="" className={styles.sidebarLogoImage} />
                    <span>TravelWithPets</span>
                  </Link>
                </div>

                {/* Navigation Links */}
                <nav className={styles.sidebarNav}>
                  <ul className={styles.sidebarList}>
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.href}
                        custom={index}
                        variants={menuItemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        {item.isContact ? (
                          <button
                            type="button"
                            className={styles.sidebarLink}
                            onClick={handleContactClick}
                          >
                            <span className={styles.linkNumber}>
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className={styles.linkText}>{item.label}</span>
                          </button>
                        ) : (
                          <Link
                            to={item.href}
                            className={`${styles.sidebarLink} ${
                              location.pathname === item.href ? styles.active : ''
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span className={styles.linkNumber}>
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className={styles.linkText}>{item.label}</span>
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Sidebar Footer */}
                <motion.div
                  className={styles.sidebarFooter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.5 } }}
                  exit={{ opacity: 0 }}
                >
                  <div className={styles.socialLinks}>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                    >
                      <Icon name="instagram" size="md" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                    >
                      <Icon name="facebook" size="md" />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                    >
                      <Icon name="youtube" size="md" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
