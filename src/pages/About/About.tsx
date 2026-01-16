import { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '../../components/layout';
import { useLocale } from '../../hooks';
import { useUIStore } from '../../store';
import styles from './About.module.css';

export function About() {
  const { data } = useLocale();
  const aboutData = data.about;
  const heroRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardTrackRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [showTrain, setShowTrain] = useState(false);
  const [showContactButton, setShowContactButton] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);
  const trainAnimationKey = useRef(0);
  const openContactModal = useUIStore((state) => state.openContactModal);

  // Hero text scroll animation
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  // Title appears on scroll, then fades out near end
  const heroTextY = useTransform(heroScrollProgress, [0, 0.15], ['100%', '0%']);
  const heroTextOpacity = useTransform(heroScrollProgress, [0, 0.15, 0.8, 0.95], [0, 1, 1, 0]);

  // Badge fades out when leaving hero section
  const heroBadgeOpacity = useTransform(heroScrollProgress, [0, 0.8, 0.95], [1, 1, 0]);

  // Background fades out when leaving hero section
  const heroBgOpacity = useTransform(heroScrollProgress, [0, 0.9, 1], [1, 1, 0]);

  // Process section scroll animation
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ['start start', 'end end'],
  });

  // Calculate exact scroll distance based on actual card track width
  useEffect(() => {
    const calculateScrollDistance = () => {
      const track = cardTrackRef.current;
      const container = cardContainerRef.current;
      if (!track || !container) return;

      const trackWidth = track.scrollWidth;
      const containerWidth = container.clientWidth;
      const distance = trackWidth - containerWidth;
      setScrollDistance(distance > 0 ? distance : 0);
    };

    // Wait for DOM to be ready
    const timer = setTimeout(calculateScrollDistance, 100);
    window.addEventListener('resize', calculateScrollDistance);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateScrollDistance);
    };
  }, [isTouchDevice]);

  // Buffer at start (0-10%) and end (90-100%), cards scroll between 10-90%
  const x = useTransform(scrollYProgress, [0.1, 0.9], [0, -scrollDistance]);

  useEffect(() => {
    // Check if it's a mobile device by screen width, not touch capability
    // Some PCs have touch screens but should still use scroll-based animation
    const checkMobile = () => {
      setIsTouchDevice(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const container = cardContainerRef.current;
    if (!container) return;

    const handleWheel = () => {
      // Wheel events are handled by framer-motion useScroll
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isTouchDevice]);

  // CTA Section - Train animation on enter
  useEffect(() => {
    const ctaSection = ctaSectionRef.current;
    if (!ctaSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset and start animation
            setShowContactButton(false);
            setShowTrain(false);
            trainAnimationKey.current += 1;

            // Small delay then show train
            setTimeout(() => {
              setShowTrain(true);
            }, 100);

            // After train animation (3s), show contact button
            setTimeout(() => {
              setShowTrain(false);
              setShowContactButton(true);
            }, 3200);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(ctaSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      <Helmet>
        <title>{aboutData.metaTitle}</title>
        <meta name="description" content={aboutData.metaDescription} />
        <link rel="canonical" href="https://travel-with-pet.vercel.app/about" />
        <meta property="og:title" content={aboutData.metaTitle} />
        <meta property="og:description" content={aboutData.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://travel-with-pet.vercel.app/about" />
        <meta property="og:image" content="https://travel-with-pet.vercel.app/share.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={aboutData.metaTitle} />
        <meta name="twitter:description" content={aboutData.metaDescription} />
        <meta name="twitter:image" content="https://travel-with-pet.vercel.app/share.jpg" />
      </Helmet>

      {/* Fixed Background Image - Outside hero for iOS Safari compatibility */}
      <motion.div className={styles.heroBackground} style={{ opacity: heroBgOpacity }}>
        <img
          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop"
          alt=""
          className={styles.heroImage}
        />
      </motion.div>

      {/* Hero Section - Fixed background with circular window */}
      <section ref={heroRef} className={styles.hero}>
        {/* Scrolling Overlay with Circle Cutout */}
        <div className={styles.heroOverlay}>
          <div className={styles.circleMask} />
        </div>

        {/* Hero heading - visible in hero section only */}
        <motion.h2
          className={styles.heroHeading}
          style={{ opacity: heroBadgeOpacity }}
        >
          {aboutData.hero.badge}
        </motion.h2>

        {/* Title & Description - appears on scroll, center aligned on PC */}
        <motion.div
          className={styles.heroTextContent}
          style={{ y: heroTextY, opacity: heroTextOpacity }}
        >
          <h1 className={styles.heroTitle}>
            {aboutData.hero.title.split('\n').map((line, i) => (
              <span key={i}>{line}{i < aboutData.hero.title.split('\n').length - 1 && <br />}</span>
            ))}
          </h1>
          <p className={styles.heroDescription}>
            {aboutData.hero.description.split('\n').map((line, i) => (
              <span key={i}>{line}{i < aboutData.hero.description.split('\n').length - 1 && <br />}</span>
            ))}
          </p>
        </motion.div>
      </section>

      {/* Company Info Section */}
      <section className={styles.companySection}>
        <Container>
          <div className={styles.companyContent}>
            <motion.div
              className={styles.yearBlock}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.bigNumber}>{aboutData.company.year}</span>
              <div className={styles.yearInfo}>
                <h2 className={styles.sectionTitle}>{aboutData.company.title}</h2>
                <p className={styles.sectionDescription}>
                  {aboutData.company.description}
                </p>
              </div>
            </motion.div>

            <div className={styles.teamGrid}>
              {aboutData.company.team.map((member, index) => (
                <motion.div
                  key={member.role}
                  className={styles.teamCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className={styles.teamRole}>{member.role}</span>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <p className={styles.teamDescription}>{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Process Section - Horizontal Scroll on Vertical Scroll */}
      <section ref={processRef} className={styles.processSection}>
        <div className={styles.processStickyContainer}>
          <Container>
            <div className={styles.processHeader}>
              <motion.span
                className={styles.processBigNumber}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                {aboutData.process.number}
              </motion.span>
            </div>
          </Container>

          <div className={`${styles.cardWrapper} ${isTouchDevice ? styles.cardWrapperMobile : ''}`} ref={cardContainerRef}>
            {isTouchDevice ? (
              /* Mobile: native horizontal scroll */
              <div className={styles.cardTrack}>
                <div className={styles.titleCard}>
                  <h2 className={styles.processTitle}>{aboutData.process.title}</h2>
                  <p className={styles.processSubtitle}>{aboutData.process.subtitle}</p>
                </div>
                {aboutData.process.steps.map((step) => (
                  <div key={step.number} className={styles.stepCard}>
                    <span className={styles.stepNumber}>{step.number}</span>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                    <div className={styles.stepLine} />
                  </div>
                ))}
              </div>
            ) : (
              /* Desktop: scroll-based horizontal animation */
              <motion.div
                ref={cardTrackRef}
                className={styles.cardTrack}
                style={{ x }}
              >
                <div className={styles.titleCard}>
                  <h2 className={styles.processTitle}>{aboutData.process.title}</h2>
                  <p className={styles.processSubtitle}>{aboutData.process.subtitle}</p>
                </div>
                {aboutData.process.steps.map((step) => (
                  <div key={step.number} className={styles.stepCard}>
                    <span className={styles.stepNumber}>{step.number}</span>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                    <div className={styles.stepLine} />
                  </div>
                ))}
                {/* Empty spacer for end buffer */}
                <div className={styles.cardSpacer} aria-hidden="true" />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaSectionRef} className={styles.ctaSection}>
        {/* Train Animation */}
        {showTrain && (
          <div className={styles.trainContainer} key={trainAnimationKey.current}>
            <div className={styles.train}>
              <div className={styles.smokeContainer}>
                <div className={styles.smoke} />
                <div className={styles.smoke} />
                <div className={styles.smoke} />
              </div>
              <div className={styles.trainBody}>
                <div className={styles.trainWindow} />
                <div className={styles.trainWindow} />
                <div className={styles.trainWindow} />
                <div className={styles.trainWheels}>
                  <div className={styles.wheel} />
                  <div className={styles.wheel} />
                  <div className={styles.wheel} />
                </div>
              </div>
            </div>
          </div>
        )}

        <Container>
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.ctaTitle}>{aboutData.cta.title}</h2>
            <p className={styles.ctaDescription}>
              {aboutData.cta.description}
            </p>
            <button
              type="button"
              className={`${styles.ctaButton} ${showContactButton ? styles.visible : ''}`}
              onClick={openContactModal}
            >
              {aboutData.cta.button}
              <span className={styles.ctaButtonArrow}>→</span>
            </button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
