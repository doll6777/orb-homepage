export const SITE_URL = 'https://orbclinic.pages.dev';

export const clinic = {
  nameKo: '오브한의원 마곡점',
  nameEn: 'ORB Korean Medicine Clinic Magok',
  phoneDisplay: '02-6959-5982',
  phoneHref: 'tel:0269595982',
  addressKo: '서울 강서구 마곡중앙로 111, 롯데캐슬 르웨스트 104동 2층 238호·239호',
  addressEn:
    '111 Magokjungang-ro, Lotte Castle Le West, Building 104, 2F, Units 238–239, Gangseo-gu, Seoul',
  naverPlaceUrl: 'https://pcmap.place.naver.com/hospital/2005324011/home',
  naverBookingUrl:
    'https://m.booking.naver.com/booking/16/bizes/1731406?theme=place&lang=ko&area=ple',
  kakaoMapUrl:
    'https://map.kakao.com/link/search/%EC%98%A4%EB%B8%8C%ED%95%9C%EC%9D%98%EC%9B%90%20%EB%A7%88%EA%B3%A1%EC%A0%90',
  googleMapUrl:
    'https://www.google.com/maps/search/?api=1&query=%EC%98%A4%EB%B8%8C%ED%95%9C%EC%9D%98%EC%9B%90+%EB%A7%88%EA%B3%A1%EC%A0%90+%EC%84%9C%EC%9A%B8+%EA%B0%95%EC%84%9C%EA%B5%AC+%EB%A7%88%EA%B3%A1%EC%A4%91%EC%95%99%EB%A1%9C+111',
  googleMapEmbedUrl:
    'https://www.google.com/maps?q=%EC%84%9C%EC%9A%B8+%EA%B0%95%EC%84%9C%EA%B5%AC+%EB%A7%88%EA%B3%A1%EC%A4%91%EC%95%99%EB%A1%9C+111&output=embed',
} as const;

export type Locale = 'ko' | 'en';
export type TreatmentSlug =
  | 'pain-chuna'
  | 'autonomic-qeeg'
  | 'stress-neurosis'
  | 'weight-metabolism';

type LocalizedText = {
  ko: string;
  en: string;
};

export type Treatment = {
  slug: TreatmentSlug;
  number: string;
  image: string;
  imagePosition?: string;
  title: LocalizedText;
  shortTitle: LocalizedText;
  summary: LocalizedText;
  intro: LocalizedText;
  imageAlt: LocalizedText;
  concerns: { ko: string[]; en: string[] };
  care: { ko: string[]; en: string[] };
};

export const treatments: Treatment[] = [
  {
    slug: 'pain-chuna',
    number: '01',
    image: 'naver-chuna',
    imagePosition: 'center 52%',
    title: { ko: '통증 · 추나', en: 'Pain · Chuna' },
    shortTitle: { ko: '통증과 움직임', en: 'Pain & movement' },
    summary: {
      ko: '목·허리·관절의 불편과 움직임 제한을 살피고, 현재 상태에 맞는 치료 방향을 안내합니다.',
      en: 'We assess pain, restricted movement, and functional discomfort to guide care for the current stage.',
    },
    intro: {
      ko: '통증의 위치만 보지 않고 발생 시점, 움직임, 일상 자세와 회복 경과를 함께 확인합니다. 진찰 결과에 따라 침, 약침, 추나와 생활 관리 방향을 조합해 안내합니다.',
      en: 'Care considers not only where pain is felt, but also onset, movement, daily posture, and recovery pattern. Acupuncture, pharmacopuncture, Chuna, and daily guidance may be discussed after assessment.',
    },
    imageAlt: {
      ko: '오브한의원에서 근골격계 상태를 살피는 진료 장면',
      en: 'Musculoskeletal assessment at ORB Korean Medicine Clinic',
    },
    concerns: {
      ko: ['목·어깨·허리 통증', '디스크·협착증 관련 불편', '관절 가동 범위 제한', '교통사고 후 지속되는 불편감'],
      en: ['Neck, shoulder, or lower-back pain', 'Disc- or stenosis-related discomfort', 'Restricted joint movement', 'Persistent discomfort after a traffic accident'],
    },
    care: {
      ko: ['문진과 움직임 평가', '현재 상태에 맞춘 치료 계획', '회복 단계에 따른 운동·생활 안내'],
      en: ['Consultation and movement assessment', 'A care plan matched to the current condition', 'Exercise and daily guidance for the recovery stage'],
    },
  },
  {
    slug: 'autonomic-qeeg',
    number: '02',
    image: 'naver-qeeg',
    imagePosition: 'center 38%',
    title: { ko: '자율신경 · 뇌파검사', en: 'Autonomic System · QEEG' },
    shortTitle: { ko: '자율신경과 뇌파', en: 'Autonomic system & QEEG' },
    summary: {
      ko: '문진과 진찰에 자율신경 검사와 정량뇌파 정보를 더해 현재의 피로와 긴장 상태를 살핍니다.',
      en: 'Consultation and examination are considered alongside autonomic and quantitative EEG data.',
    },
    intro: {
      ko: '검사 수치 하나만으로 상태를 단정하지 않습니다. 수면, 피로, 집중력, 신체 증상과 검사 결과를 함께 해석해 진료 방향을 설명합니다.',
      en: 'No single test result determines a diagnosis. Sleep, fatigue, concentration, physical symptoms, and test findings are reviewed together when discussing care.',
    },
    imageAlt: {
      ko: '오브한의원 정량뇌파검사 장면',
      en: 'Quantitative EEG assessment at ORB Korean Medicine Clinic',
    },
    concerns: {
      ko: ['쉽게 가라앉지 않는 긴장감', '만성피로와 브레인포그', '수면 리듬의 불편', '두근거림·열감·냉감 등 자율신경 관련 불편'],
      en: ['Persistent tension', 'Chronic fatigue and brain fog', 'Sleep rhythm concerns', 'Autonomic discomfort such as palpitations or temperature sensitivity'],
    },
    care: {
      ko: ['증상과 생활 리듬 문진', '필요 시 자율신경·QEEG 검사', '결과 설명과 개인별 진료 계획'],
      en: ['Review of symptoms and daily rhythm', 'Autonomic or QEEG assessment when appropriate', 'Results review and an individualized care plan'],
    },
  },
  {
    slug: 'stress-neurosis',
    number: '03',
    image: 'naver-consultation',
    imagePosition: 'center center',
    title: { ko: '스트레스 · 신경증', en: 'Stress · Neurotic Symptoms' },
    shortTitle: { ko: '스트레스와 회복', en: 'Stress & recovery' },
    summary: {
      ko: '불면, 과민감, 브레인포그와 정서적 피로가 일상에 미치는 영향을 차분히 확인합니다.',
      en: 'We review how sleep problems, sensitivity, brain fog, and emotional fatigue affect everyday life.',
    },
    intro: {
      ko: '정서적 불편과 신체 증상을 분리해서 보지 않고, 수면과 식사, 업무 환경, 증상이 반복되는 패턴을 함께 살핍니다.',
      en: 'Emotional and physical discomfort are not viewed in isolation. Sleep, meals, work environment, and recurring symptom patterns are considered together.',
    },
    imageAlt: {
      ko: '오브한의원에서 증상과 상태를 설명하는 상담 장면',
      en: 'A consultation at ORB Korean Medicine Clinic',
    },
    concerns: {
      ko: ['불면과 얕은 수면', '지속되는 예민함과 긴장', '집중력 저하와 브레인포그', '번아웃과 정서적 피로'],
      en: ['Insomnia or light sleep', 'Persistent sensitivity and tension', 'Reduced concentration and brain fog', 'Burnout and emotional fatigue'],
    },
    care: {
      ko: ['현재 불편과 생활 환경 확인', '신체 증상과 회복 패턴 평가', '진료와 생활 관리 방향 설명'],
      en: ['Review of current concerns and environment', 'Assessment of physical symptoms and recovery patterns', 'Discussion of care and daily management'],
    },
  },
  {
    slug: 'weight-metabolism',
    number: '04',
    image: 'consult-room',
    imagePosition: 'center center',
    title: { ko: '다이어트 · 열대사', en: 'Weight · Metabolism' },
    shortTitle: { ko: '체중과 대사 균형', en: 'Weight & metabolism' },
    summary: {
      ko: '체중만을 기준으로 삼지 않고 식욕, 수면, 활동량과 대사 관련 상태를 함께 살핍니다.',
      en: 'Care considers appetite, sleep, activity, and metabolic health rather than weight alone.',
    },
    intro: {
      ko: '현재 건강 상태와 복용 약, 생활 습관을 확인한 뒤 현실적으로 지속할 수 있는 관리 방향을 안내합니다. 필요한 경우 체질과 상태를 고려한 한약 진료를 상담합니다.',
      en: 'Current health, medication, and daily habits are reviewed before discussing a sustainable management plan. Herbal medicine may be considered when appropriate.',
    },
    imageAlt: {
      ko: '오브한의원 상담 및 검사 공간',
      en: 'Consultation and examination room at ORB Korean Medicine Clinic',
    },
    concerns: {
      ko: ['반복되는 체중 변화', '식욕 조절의 어려움', '수면 부족과 피로', '열감·냉감 등 대사 관련 불편'],
      en: ['Repeated weight fluctuation', 'Difficulty regulating appetite', 'Lack of sleep and fatigue', 'Metabolic discomfort including heat or cold sensitivity'],
    },
    care: {
      ko: ['건강 상태와 생활 습관 확인', '개인별 목표와 관리 계획 설정', '경과에 따른 식사·활동·진료 조정'],
      en: ['Review of health and daily habits', 'Individual goals and management plan', 'Adjustments to meals, activity, and care over time'],
    },
  },
];

export const gallery = [
  { image: 'reception', label: { ko: '안내 데스크', en: 'Reception' }, alt: { ko: '오브한의원 안내 데스크 전경', en: 'Reception desk at ORB Korean Medicine Clinic' } },
  { image: 'hero-lobby', label: { ko: '로비와 대기 공간', en: 'Lobby & waiting' }, alt: { ko: '오브한의원 로비와 대기 공간', en: 'Lobby and waiting area at ORB Korean Medicine Clinic' } },
  { image: 'media-wall', label: { ko: '대기 공간', en: 'Waiting area' }, alt: { ko: '오브한의원 대기 공간과 안내 화면', en: 'Waiting area and information display at ORB Korean Medicine Clinic' } },
  { image: 'logo-reception', label: { ko: '브랜드 월', en: 'Brand wall' }, alt: { ko: '오브한의원 로고가 있는 접수 공간', en: 'ORB logo wall and reception area' } },
  { image: 'corridor', label: { ko: '진료실 복도', en: 'Care corridor' }, alt: { ko: '오브한의원 독립 진료실로 이어지는 복도', en: 'Corridor leading to private care rooms' } },
  { image: 'consult-room', label: { ko: '상담실', en: 'Consultation room' }, alt: { ko: '오브한의원 상담 및 검사실', en: 'Consultation and examination room' } },
  { image: 'treatment-room', label: { ko: '치료 공간', en: 'Treatment rooms' }, alt: { ko: '오브한의원 독립 치료 공간', en: 'Private treatment rooms at ORB' } },
  { image: 'care-room', label: { ko: '1인 치료실', en: 'Private care room' }, alt: { ko: '오브한의원 1인 치료실 내부', en: 'Private care room at ORB' } },
] as const;

export function getTreatment(slug: string) {
  return treatments.find((treatment) => treatment.slug === slug);
}

export function treatmentPath(locale: Locale, slug: TreatmentSlug) {
  return `${locale === 'en' ? '/en' : ''}/treatments/${slug}`;
}
