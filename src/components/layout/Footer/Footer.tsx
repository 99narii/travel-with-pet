import { Link } from 'react-router-dom';
import { useLocale } from '../../../hooks';
import { useUIStore } from '../../../store';
import { Container } from '../Container';
import { Icon, Text } from '../../ui';
import logoImg from '../../../assets/icon/logo.png';
import styles from './Footer.module.css';

const socialLinks = [
  { name: 'instagram', href: 'https://instagram.com' },
  { name: 'facebook', href: 'https://facebook.com' },
  { name: 'youtube', href: 'https://youtube.com' },
];

export function Footer() {
  const { t } = useLocale();
  const openContactModal = useUIStore((state) => state.openContactModal);

  const footerLinks = {
    company: [
      { label: t('nav.about'), href: '/about' },
    ],
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <img src={logoImg} alt="" className={styles.logoImage} />
              <span>TravelWithPets</span>
            </Link>
            <Text variant="body-sm" color="secondary" className={styles.description}>
              {t('footer.description')}
            </Text>
            <div className={styles.social}>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`${link.name} ${t('a11y.externalLink')}`}
                >
                  <Icon name={link.name} size="md" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <Text variant="overline" className={styles.linkGroupTitle}>
                {t('footer.sections.company')}
              </Text>
              <ul className={styles.linkList}>
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    className={styles.link}
                    onClick={openContactModal}
                  >
                    {t('nav.contact')}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <Text variant="caption" color="tertiary">
            {t('footer.copyright')}
          </Text>
        </div>
      </Container>
    </footer>
  );
}
