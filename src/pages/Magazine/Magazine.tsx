import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Container } from '../../components/layout';
import { ArrowLink, Text } from '../../components/ui';
import styles from './Magazine.module.css';

// 매거진 데이터
const magazineData: Record<string, {
  title: string;
  subtitle: string;
  date: string;
  heroImage: string;
  content: {
    type: 'text' | 'image' | 'quote';
    content: string;
    caption?: string;
  }[];
}> = {
  'jeju-pet-tour': {
    title: '제주도 펫 프렌들리 투어',
    subtitle: '반려동물과 함께하는 제주의 아름다운 해변과 오름을 탐험하세요.',
    date: '2025.01 - 2025.03',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
    content: [
      {
        type: 'text',
        content: '제주도는 반려동물과 함께 여행하기에 최적의 장소입니다. 탁 트인 해변, 아름다운 오름, 그리고 펫 프렌들리한 카페와 숙소가 곳곳에 자리하고 있어 반려견과 함께하는 특별한 추억을 만들기에 안성맞춤입니다.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop',
        caption: '월정리 해변에서 산책하는 반려견'
      },
      {
        type: 'quote',
        content: '제주의 바람을 맞으며 함께 걷는 그 순간, 우리는 진정한 가족이 됩니다.'
      },
      {
        type: 'text',
        content: '월정리 해변은 에메랄드빛 바다와 하얀 모래사장이 어우러진 곳으로, 반려견과 함께 산책하기에 최고의 장소입니다. 이른 아침이나 해질녘에 방문하면 한적한 해변에서 여유로운 시간을 보낼 수 있습니다.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop',
        caption: '오름 트레킹을 즐기는 반려견'
      },
      {
        type: 'text',
        content: '제주의 오름은 반려견과 함께 가볍게 트레킹하기 좋은 코스입니다. 새별오름, 용눈이오름 등 반려동물 동반이 가능한 오름에서 제주의 아름다운 자연을 만끽해보세요. 정상에서 바라보는 제주의 풍경은 잊지 못할 추억이 될 것입니다.'
      }
    ]
  },
  'gangwon-healing-camping': {
    title: '강원도 힐링 캠핑',
    subtitle: '자연 속에서 반려동물과 함께하는 특별한 캠핑 경험.',
    date: '상시 운영',
    heroImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop',
    content: [
      {
        type: 'text',
        content: '강원도의 깊은 숲 속에서 반려동물과 함께하는 캠핑은 도시에서는 느낄 수 없는 특별한 힐링을 선사합니다. 맑은 공기, 새소리, 그리고 사랑하는 반려동물과 함께하는 시간은 진정한 휴식이 됩니다.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop',
        caption: '숲 속 캠핑장에서의 여유로운 아침'
      },
      {
        type: 'quote',
        content: '자연 속에서 함께하는 밤, 별빛 아래 나누는 온기가 가장 따뜻합니다.'
      },
      {
        type: 'text',
        content: '강원도에는 반려동물 동반이 가능한 캠핑장이 많이 있습니다. 인제, 평창, 홍천 등 자연환경이 뛰어난 지역에 위치한 캠핑장에서는 반려견과 함께 자연을 만끽할 수 있습니다.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
        caption: '강원도 숲길 트레킹'
      },
      {
        type: 'text',
        content: '캠핑장 주변의 숲길을 반려견과 함께 산책하며 힐링하는 시간을 가져보세요. 계곡물에 발을 담그고, 숲의 향기를 맡으며, 반려동물과 함께 자연의 품에서 진정한 휴식을 경험할 수 있습니다.'
      }
    ]
  },
  'seoul-pet-cafe': {
    title: '서울 펫카페 투어',
    subtitle: '도심 속 반려동물과 즐기는 카페 문화.',
    date: '2025.03',
    heroImage: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2071&auto=format&fit=crop',
    content: [
      {
        type: 'text',
        content: '서울에는 반려동물과 함께 즐길 수 있는 다양한 펫카페들이 있습니다. 홍대, 연남동, 성수동 등 트렌디한 지역에서 반려견과 함께 여유로운 커피 타임을 즐겨보세요.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=2070&auto=format&fit=crop',
        caption: '펫 프렌들리 카페에서의 여유로운 시간'
      },
      {
        type: 'quote',
        content: '커피 한 잔의 여유, 반려동물과 함께라면 더욱 특별해집니다.'
      },
      {
        type: 'text',
        content: '서울의 펫카페들은 반려동물을 위한 특별한 메뉴와 편의시설을 갖추고 있습니다. 강아지용 간식부터 반려견 전용 놀이 공간까지, 반려동물도 즐거운 시간을 보낼 수 있습니다.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop',
        caption: '카페에서 간식을 즐기는 반려견'
      },
      {
        type: 'text',
        content: '연남동의 숨은 골목 카페부터 성수동의 인더스트리얼 감성 카페까지, 서울 곳곳의 펫 프렌들리 카페를 탐방하며 반려동물과 특별한 추억을 만들어보세요.'
      }
    ]
  },
  'busan-beach-walk': {
    title: '부산 해변 산책',
    subtitle: '파도 소리와 함께하는 반려견 산책 코스.',
    date: '2025.04',
    heroImage: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=2070&auto=format&fit=crop',
    content: [
      {
        type: 'text',
        content: '부산의 아름다운 해변은 반려견과 함께 산책하기에 완벽한 장소입니다. 광안리, 해운대, 송정 해변에서 파도 소리를 들으며 여유로운 산책을 즐겨보세요.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=2076&auto=format&fit=crop',
        caption: '부산 해변에서 뛰노는 반려견'
      },
      {
        type: 'quote',
        content: '파도가 발을 적시고, 바람이 털을 날리는 그 순간이 가장 행복합니다.'
      },
      {
        type: 'text',
        content: '이른 아침이나 해질녘에 방문하면 한적한 해변에서 반려견과 자유롭게 뛰어놀 수 있습니다. 특히 송정 해변은 반려동물 동반이 가능한 구역이 넓어 인기가 높습니다.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
        caption: '해질녘 부산 해변의 아름다운 풍경'
      },
      {
        type: 'text',
        content: '해변 산책 후에는 근처의 펫 프렌들리 카페에서 시원한 음료와 함께 휴식을 취해보세요. 부산의 바다와 함께하는 반려견과의 여행은 잊지 못할 추억이 될 것입니다.'
      }
    ]
  },
  'pet-friendly-pension': {
    title: '펫 프렌들리 펜션',
    subtitle: '반려동물과 함께 머무는 특별한 숙소.',
    date: '2025.05',
    heroImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop',
    content: [
      {
        type: 'text',
        content: '반려동물과 함께하는 여행에서 숙소 선택은 매우 중요합니다. 전국 각지에 있는 펫 프렌들리 펜션에서 반려동물과 함께 편안한 휴식을 즐겨보세요.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?q=80&w=2070&auto=format&fit=crop',
        caption: '넓은 마당이 있는 펫 프렌들리 펜션'
      },
      {
        type: 'quote',
        content: '집처럼 편안한 공간에서 반려동물과 함께하는 시간, 그것이 진정한 여행입니다.'
      },
      {
        type: 'text',
        content: '좋은 펫 프렌들리 펜션은 넓은 마당, 반려동물용 어메니티, 그리고 인근 산책로를 갖추고 있습니다. 예약 전 반려동물 동반 정책과 추가 요금을 꼭 확인하세요.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop',
        caption: '펜션 주변 자연에서 산책하는 반려견'
      },
      {
        type: 'text',
        content: '가평, 양평, 포천 등 수도권 근교의 펫 프렌들리 펜션부터 제주, 강원도의 자연 속 펜션까지, 반려동물과 함께 특별한 휴식을 경험해보세요.'
      }
    ]
  },
  'forest-trekking': {
    title: '숲속 트레킹 가이드',
    subtitle: '반려견과 함께 걷는 전국 숲길 추천.',
    date: '2025.06',
    heroImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
    content: [
      {
        type: 'text',
        content: '반려견과 함께하는 숲속 트레킹은 서로에게 최고의 운동이자 힐링입니다. 전국의 아름다운 숲길에서 반려동물과 함께 자연을 만끽해보세요.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=2074&auto=format&fit=crop',
        caption: '숲길을 걷는 반려견'
      },
      {
        type: 'quote',
        content: '숲의 향기를 맡으며 함께 걷는 길, 그 어떤 여행보다 값진 시간입니다.'
      },
      {
        type: 'text',
        content: '북한산, 관악산, 남산 등 수도권의 등산로부터 지리산, 설악산 등 전국의 명산까지, 반려동물 동반이 가능한 트레킹 코스를 소개합니다. 난이도와 거리를 고려해 반려견에게 맞는 코스를 선택하세요.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2076&auto=format&fit=crop',
        caption: '정상에서 바라보는 아름다운 풍경'
      },
      {
        type: 'text',
        content: '트레킹 시에는 충분한 물과 간식, 배변봉투를 꼭 챙기세요. 반려견의 발바닥 보호를 위한 패드나 신발도 준비하면 좋습니다. 자연을 지키며 즐기는 것이 진정한 트레킹입니다.'
      }
    ]
  }
};

export function Magazine() {
  const { slug } = useParams<{ slug: string }>();
  const magazine = slug ? magazineData[slug] : null;

  if (!magazine) {
    return (
      <div className={styles.notFound}>
        <Container>
          <Text variant="h2">매거진을 찾을 수 없습니다</Text>
          <ArrowLink to="/magazines">목록으로 돌아가기</ArrowLink>
        </Container>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{magazine.title} | TravelWithPets</title>
        <meta name="description" content={magazine.subtitle} />
      </Helmet>

      <article className={styles.article}>
        {/* Hero Section */}
        <header className={styles.hero}>
          <img
            src={magazine.heroImage}
            alt=""
            className={styles.heroImage}
            aria-hidden="true"
          />
          <div className={styles.heroOverlay} />
          <Container>
            <motion.div
              className={styles.heroContent}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className={styles.date}>{magazine.date}</span>
              <h1 className={styles.title}>{magazine.title}</h1>
              <p className={styles.subtitle}>{magazine.subtitle}</p>
            </motion.div>
          </Container>
        </header>

        {/* Content */}
        <div className={styles.content}>
          <Container>
            <div className={styles.contentInner}>
              {magazine.content.map((block, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-50px' }}
                  transition={{ duration: 0.6 }}
                >
                  {block.type === 'text' && (
                    <p className={styles.paragraph}>{block.content}</p>
                  )}
                  {block.type === 'image' && (
                    <figure className={styles.figure}>
                      <img
                        src={block.content}
                        alt={block.caption || ''}
                        className={styles.image}
                      />
                      {block.caption && (
                        <figcaption className={styles.caption}>
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                  {block.type === 'quote' && (
                    <blockquote className={styles.quote}>
                      <p>{block.content}</p>
                    </blockquote>
                  )}
                </motion.div>
              ))}
            </div>
          </Container>
        </div>

        {/* Back Link */}
        <div className={styles.backLink}>
          <Container>
            <ArrowLink to="/magazines">목록으로 돌아가기</ArrowLink>
          </Container>
        </div>
      </article>
    </>
  );
}
