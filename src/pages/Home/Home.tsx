import { Helmet } from 'react-helmet-async';
import { useLocale, useSectionScroll } from '../../hooks';
import { Hero, SplitSection, DualCardSection, SemicircleSlider, StatsSection } from '../../components/domain';

const slideImages = [
  'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2071&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop',
];

const statsImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2074&auto=format&fit=crop',
];

export function Home() {
  const { t, data } = useLocale();
  useSectionScroll();

  const slides = data.sections.slides.map((slide, index) => ({
    ...slide,
    image: slideImages[index],
  }));

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
        <link rel="canonical" href="https://travel-with-pet.vercel.app" />
        <meta property="og:title" content={t('meta.ogTitle')} />
        <meta property="og:description" content={t('meta.ogDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://travel-with-pet.vercel.app" />
        <meta property="og:image" content="https://travel-with-pet.vercel.app/share.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta.ogTitle')} />
        <meta name="twitter:description" content={t('meta.ogDescription')} />
        <meta name="twitter:image" content="https://travel-with-pet.vercel.app/share.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'TravelWithPets',
            url: 'https://travel-with-pet.vercel.app',
            logo: 'https://travel-with-pet.vercel.app/favicon.png',
            description: t('meta.description'),
            sameAs: [
              'https://instagram.com',
              'https://facebook.com',
              'https://youtube.com'
            ]
          })}
        </script>
      </Helmet>

      <div data-section>
        <Hero backgroundVideo="/video/main.mp4" />
      </div>

      <div data-section>
        <SplitSection
          image="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=1976&auto=format&fit=crop"
          imageAlt={t('sections.family.imageAlt')}
          title={t('sections.family.title')}
          imagePosition="left"
        />
      </div>

      <div data-section>
        <DualCardSection
          leftCard={{
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
            imageAlt: t('sections.cards.left.imageAlt'),
            date: t('sections.cards.left.date'),
            title: t('sections.cards.left.title'),
            description: t('sections.cards.left.description'),
            href: '/magazine/jeju-pet-tour',
          }}
          rightCard={{
            image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop',
            imageAlt: t('sections.cards.right.imageAlt'),
            date: t('sections.cards.right.date'),
            title: t('sections.cards.right.title'),
            description: t('sections.cards.right.description'),
            href: '/magazine/gangwon-healing-camping',
          }}
        />
      </div>

      <div data-section>
        <SemicircleSlider slides={slides} />
      </div>

      <div data-section>
        <StatsSection stats={data.sections.stats} images={statsImages} />
      </div>
    </>
  );
}
