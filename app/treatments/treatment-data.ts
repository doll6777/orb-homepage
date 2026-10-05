import type { Metadata } from 'next';

export type Treatment = {
  slug: string;
  eyebrow: string;
  title: string;
  pageTitle: string;
  description: string;
  lead: string;
  image: string;
  imageAlt: string;
  concerns: string[];
  approach: Array<{
    title: string;
    body: string;
  }>;
};

const siteUrl = 'https://orbclinic.pages.dev';

export const treatments = {
  painChuna: {
    slug: 'pain-chuna',
    eyebrow: 'PAIN · CHUNA',
    title: '통증 · 추나 진료',
    pageTitle: '마곡나루역 통증·추나 한의원',
    description:
      '마곡나루역 오브한의원 마곡점의 통증·추나 진료 안내. 목·허리·관절의 불편과 교통사고 후 불편을 살피고 개인별 진료 방향을 안내합니다.',
    lead:
      '현재의 통증만 보지 않고 불편이 반복되는 움직임과 생활 환경을 함께 확인해 진료 방향을 안내합니다.',
    image: '/orb-chuna-room.png',
    imageAlt: '오브한의원 마곡점의 추나 진료 공간',
    concerns: [
      '목·어깨·허리·골반 부위의 반복되는 불편',
      '관절 가동 범위와 움직임의 불편',
      '교통사고 이후 남아 있는 통증과 긴장',
      '일상 자세와 업무 환경에 따라 심해지는 증상',
    ],
    approach: [
      {
        title: '초진 상담',
        body: '증상이 시작된 시점과 생활 습관, 이전 진료 및 검사 내용을 확인합니다.',
      },
      {
        title: '상태 확인',
        body: '통증 부위와 움직임을 살피고 필요한 경우 추가 검사 여부를 안내합니다.',
      },
      {
        title: '개별 진료 계획',
        body: '현재 상태에 맞춰 추나를 포함한 진료 방법과 내원 계획을 설명합니다.',
      },
    ],
  },
  autonomicQeeg: {
    slug: 'autonomic-qeeg',
    eyebrow: 'AUTONOMIC · QEEG',
    title: '자율신경 · 뇌파검사',
    pageTitle: '마곡 자율신경·뇌파검사 한의원',
    description:
      '마곡나루역 오브한의원 마곡점의 자율신경·정량뇌파검사 안내. 상담과 검사 결과를 바탕으로 현재 상태와 진료 방향을 설명합니다.',
    lead:
      '수면, 피로, 집중력처럼 서로 연결된 불편을 상담하고 필요한 경우 자율신경 및 정량뇌파검사를 통해 현재 상태를 살핍니다.',
    image: '/orb-qeeg-test.jpeg',
    imageAlt: '오브한의원 마곡점의 정량뇌파검사 장면',
    concerns: [
      '충분히 쉬어도 이어지는 피로와 긴장',
      '수면 리듬의 변화와 집중하기 어려운 느낌',
      '두근거림, 식은땀 등 자율신경 관련 불편',
      '브레인포그처럼 머리가 맑지 않은 느낌',
    ],
    approach: [
      {
        title: '상담',
        body: '수면, 피로, 스트레스와 일상 리듬을 포함해 불편의 양상을 확인합니다.',
      },
      {
        title: '검사 안내',
        body: '진료상 필요한 경우 자율신경검사 또는 정량뇌파검사의 목적과 과정을 설명합니다.',
      },
      {
        title: '결과 설명',
        body: '검사 결과와 상담 내용을 함께 살펴 개인별 진료 및 관리 방향을 안내합니다.',
      },
    ],
  },
  stressNeurosis: {
    slug: 'stress-neurosis',
    eyebrow: 'STRESS · NEUROSIS',
    title: '스트레스 · 신경증 진료',
    pageTitle: '마곡 스트레스·신경증 진료',
    description:
      '마곡나루역 오브한의원 마곡점의 스트레스·신경증 진료 안내. 수면, 긴장, 과민감과 정서적 피로를 상담하고 진료 방향을 설명합니다.',
    lead:
      '스트레스에 따른 신체 반응과 수면, 감정, 집중력의 변화를 함께 살펴 일상 회복을 위한 진료 방향을 안내합니다.',
    image: '/orb-treatment-bed.jpeg',
    imageAlt: '오브한의원 마곡점의 독립 치료 공간',
    concerns: [
      '긴장이 쉽게 풀리지 않고 예민해진 느낌',
      '스트레스 상황에서 심해지는 신체적 불편',
      '수면과 감정 리듬의 변화',
      '집중 저하와 정서적인 피로감',
    ],
    approach: [
      {
        title: '현재 상태 상담',
        body: '불편이 나타나는 상황과 수면, 식사, 활동 리듬을 차분히 확인합니다.',
      },
      {
        title: '필요한 평가',
        body: '상담 내용을 바탕으로 추가 확인이 필요한 검사와 진료 범위를 안내합니다.',
      },
      {
        title: '회복 방향 안내',
        body: '개인별 상태와 생활 환경을 고려해 진료 및 일상 관리 방향을 설명합니다.',
      },
    ],
  },
  weightMetabolism: {
    slug: 'weight-metabolism',
    eyebrow: 'WEIGHT · METABOLISM',
    title: '다이어트 · 열대사 진료',
    pageTitle: '마곡 다이어트·열대사 한의원',
    description:
      '마곡나루역 오브한의원 마곡점의 다이어트·열대사 진료 안내. 체중 변화, 식욕, 수면과 생활 리듬을 확인해 개인별 관리 방향을 설명합니다.',
    lead:
      '체중 수치만이 아니라 식욕, 수면, 활동량과 생활 리듬을 함께 확인해 지속 가능한 관리 방향을 안내합니다.',
    image: '/orb-space-consult.jpg',
    imageAlt: '오브한의원 마곡점의 상담 공간',
    concerns: [
      '반복되는 체중 증가와 식욕 조절의 어려움',
      '수면과 스트레스에 따라 달라지는 식사 패턴',
      '활동량에 비해 쉽게 느껴지는 피로',
      '현재 생활에 맞는 체중 관리 계획이 필요한 경우',
    ],
    approach: [
      {
        title: '생활 리듬 상담',
        body: '식사, 수면, 활동량과 기존 체중 관리 경험을 확인합니다.',
      },
      {
        title: '상태 확인',
        body: '현재 체중 변화와 컨디션을 살피고 필요한 진료 범위를 안내합니다.',
      },
      {
        title: '관리 계획',
        body: '개인별 목표와 생활 환경을 고려해 진료와 관리 방향을 설명합니다.',
      },
    ],
  },
} satisfies Record<string, Treatment>;

export function makeTreatmentMetadata(treatment: Treatment): Metadata {
  const path = `/treatments/${treatment.slug}`;

  return {
    title: treatment.pageTitle,
    description: treatment.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${treatment.pageTitle} | 오브한의원 마곡점`,
      description: treatment.description,
      url: path,
      siteName: '오브한의원 마곡점',
      locale: 'ko_KR',
      type: 'article',
      images: [
        {
          url: treatment.image,
          alt: treatment.imageAlt,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function makeTreatmentJsonLd(treatment: Treatment) {
  const url = `${siteUrl}/treatments/${treatment.slug}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `${url}/#webpage`,
        url,
        name: treatment.pageTitle,
        description: treatment.description,
        inLanguage: 'ko-KR',
        about: {
          '@id': `${siteUrl}/#clinic`,
        },
        primaryImageOfPage: `${siteUrl}${treatment.image}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: '오브한의원 마곡점',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: treatment.title,
            item: url,
          },
        ],
      },
    ],
  };
}
