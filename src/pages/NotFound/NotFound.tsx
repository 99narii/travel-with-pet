import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useLocale } from '../../hooks';
import { Container, Section } from '../../components/layout';
import { Button, Text, Icon } from '../../components/ui';
import styles from './NotFound.module.css';

export function NotFound() {
  const { t } = useLocale();

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Section fullHeight animate={false} className={styles.section}>
        <Container>
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className={styles.iconWrapper}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Icon name="paw" size="xl" />
            </motion.div>

            <Text variant="h1" align="center" className={styles.errorCode}>
              404
            </Text>

            <Text variant="h3" align="center" color="secondary">
              Page Not Found
            </Text>

            <Text variant="body" align="center" color="tertiary" className={styles.description}>
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </Text>

            <Link to="/">
              <Button variant="primary" size="lg">
                {t('nav.home')}
              </Button>
            </Link>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
