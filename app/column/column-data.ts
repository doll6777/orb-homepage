export type ColumnPost = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  publishedAt: string;
  displayDate: string;
  originalUrl: string;
  readTime: string;
  coverImage: string;
  coverImageAlt: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
};

export const columnPosts: ColumnPost[] = [
  {
    slug: 'wet-qeeg-guide',
    category: '자율신경 · 뇌파검사',
    title: '습식 정량뇌파(QEEG) 검사는 무엇을 확인할까요?',
    summary:
      '정량뇌파검사의 기본 개념과 다채널 습식 측정 방식을 사용하는 이유, 결과를 해석할 때 함께 살펴야 할 내용을 안내합니다.',
    publishedAt: '2026-10-02',
    displayDate: '2026.10.02',
    originalUrl: 'https://blog.naver.com/orbmed/224429668944',
    readTime: '5분',
    coverImage: '/orb-qeeg-test.jpeg',
    coverImageAlt: '오브한의원 정량뇌파 검사 장면',
    sections: [
      {
        heading: '정량뇌파검사란 무엇인가요?',
        paragraphs: [
          '뇌파검사는 두피에서 측정되는 미세한 전기 신호를 기록합니다. 정량뇌파검사(QEEG)는 기록된 신호를 주파수와 위치별로 정리해 현재의 뇌 활동 패턴을 살펴보는 보조 검사입니다.',
          '검사 결과 하나만으로 특정 질환이나 증상의 원인을 단정하지 않으며, 수면과 피로, 스트레스, 복용 중인 약, 실제 불편감과 함께 해석해야 합니다.',
        ],
      },
      {
        heading: '습식 다채널 측정을 사용하는 이유',
        paragraphs: [
          '습식 방식은 전용 캡과 수용성 전도 젤을 사용해 센서와 두피 사이의 접촉 상태를 안정적으로 유지합니다. 이마뿐 아니라 정수리, 측두부, 후두부를 포함한 여러 위치에서 신호를 기록할 수 있다는 점이 특징입니다.',
        ],
        bullets: [
          '머리 전반의 여러 위치에서 신호를 함께 기록합니다.',
          '센서의 접촉 상태를 확인하며 측정 오류를 줄입니다.',
          '눈 깜빡임과 얼굴 근육의 움직임처럼 뇌파가 아닌 신호가 섞이지 않았는지 살핍니다.',
        ],
      },
      {
        heading: '검사 결과는 어떻게 활용하나요?',
        paragraphs: [
          '측정 결과는 상담과 신체 상태를 이해하는 참고 자료로 활용합니다. 같은 수치라도 현재 증상과 생활 리듬에 따라 의미가 달라질 수 있으므로 의료진과 함께 확인하는 과정이 필요합니다.',
          '검사 시행 여부와 구체적인 진료 계획은 대면 상담 후 개인별 상태에 따라 결정됩니다.',
        ],
      },
    ],
  },
  {
    slug: 'qeeg-process',
    category: '검사 안내',
    title: '습식 정량뇌파 검사는 어떻게 진행될까요?',
    summary:
      '예약 전 준비부터 전용 캡 착용, 신호 확인, 검사 후 안내까지 실제 측정 흐름을 차례대로 설명합니다.',
    publishedAt: '2026-10-02',
    displayDate: '2026.10.02',
    originalUrl: 'https://blog.naver.com/orbmed/224429314941',
    readTime: '4분',
    coverImage: '/orb-qeeg-test.jpeg',
    coverImageAlt: '전용 캡을 착용하고 정량뇌파 검사를 준비하는 모습',
    sections: [
      {
        heading: '검사 전 확인합니다',
        paragraphs: [
          '검사 전에는 수면 상태와 카페인 섭취, 복용 중인 약, 머리와 두피 상태 등을 확인합니다. 검사 당일에는 헤어 왁스나 스프레이처럼 센서 접촉에 영향을 줄 수 있는 제품을 피하는 편이 좋습니다.',
          '복용 중인 약을 임의로 중단해서는 안 되며, 변경이 필요한지 여부는 의료진과 먼저 상의해야 합니다.',
        ],
      },
      {
        heading: '전용 캡을 착용하고 신호를 확인합니다',
        paragraphs: [
          '머리 크기에 맞는 전용 캡을 착용한 뒤 각 센서 위치에 수용성 전도 젤을 사용합니다. 측정 전에 센서별 접촉 상태를 확인하고 안정적인 신호가 기록되는지 살핍니다.',
        ],
        bullets: [
          '편안하게 앉은 상태에서 안내에 따라 눈을 감거나 뜹니다.',
          '측정 중에는 눈과 얼굴의 움직임을 가능한 한 줄입니다.',
          '검사가 끝난 뒤 전도 젤을 닦고 필요한 경우 물로 헹굴 수 있습니다.',
        ],
      },
      {
        heading: '검사 후에는 상담과 함께 해석합니다',
        paragraphs: [
          '검사 결과는 현재 느끼는 증상과 생활 패턴, 다른 검사 결과를 함께 고려해 설명합니다. 정량뇌파검사는 진료 계획을 세우고 경과를 살피는 데 참고하는 보조 자료입니다.',
        ],
      },
    ],
  },
  {
    slug: 'autonomic-top-down-bottom-up',
    category: '자율신경',
    title: '자율신경의 불편을 뇌와 몸의 연결로 살펴보는 이유',
    summary:
      '스트레스와 수면 같은 하향식 요인, 자세와 호흡·신체 긴장 같은 상향식 요인을 함께 확인하는 진료 관점을 소개합니다.',
    publishedAt: '2026-10-02',
    displayDate: '2026.10.02',
    originalUrl: 'https://blog.naver.com/orbmed/224428821373',
    readTime: '5분',
    coverImage: '/orb-space-consult.jpg',
    coverImageAlt: '오브한의원 상담 공간',
    sections: [
      {
        heading: '자율신경은 한 방향으로만 움직이지 않습니다',
        paragraphs: [
          '수면 부족이나 지속적인 스트레스처럼 뇌에서 시작된 변화는 심박, 호흡, 소화와 근육 긴장에 영향을 줄 수 있습니다. 반대로 통증, 얕은 호흡, 반복되는 신체 긴장도 뇌가 자극을 처리하는 방식에 영향을 줄 수 있습니다.',
          '따라서 자율신경 관련 불편은 한 가지 수치나 특정 부위만으로 설명하기보다 뇌와 몸이 주고받는 신호를 함께 살피는 것이 중요합니다.',
        ],
      },
      {
        heading: '상담에서 함께 확인하는 내용',
        paragraphs: [
          '불편이 시작된 시점과 악화되는 상황, 수면과 식사, 활동량, 통증, 복용 중인 약 등을 확인합니다. 필요한 경우 신체 상태와 자율신경 또는 뇌파검사 여부를 안내합니다.',
        ],
        bullets: [
          '수면 시간과 잠드는 과정, 중간 각성 여부',
          '스트레스 상황과 증상이 나타나는 시간대',
          '호흡, 소화, 두근거림, 통증처럼 함께 나타나는 불편',
          '자세와 활동량, 업무 환경의 변화',
        ],
      },
      {
        heading: '검사보다 먼저 필요한 것은 전체 맥락입니다',
        paragraphs: [
          '검사는 현재 상태를 이해하는 하나의 자료입니다. 결과를 증상과 분리해 해석하거나 특정 질환으로 단정하지 않고, 개인의 생활 환경과 신체 상태를 함께 살펴 진료 방향을 결정합니다.',
        ],
      },
    ],
  },
];

export const externalColumns = [
  {
    category: '스트레스 · 피로',
    title: '감각이 예민한 사람의 번아웃과 피로를 이해하기',
    summary: '감각 과민과 스트레스, 수면 및 피로가 서로 영향을 주는 양상을 살펴봅니다.',
    displayDate: '2026.09.28',
    href: 'https://blog.naver.com/orbmed/224425203467',
  },
  {
    category: '다이어트',
    title: '다이어트 이후 식욕과 체중 변화를 살피는 방법',
    summary: '약물 중단 이후 식욕과 체중 변화가 나타날 때 확인할 생활 요인을 정리합니다.',
    displayDate: '2026.09.27',
    href: 'https://blog.naver.com/orbmed/224423964165',
  },
  {
    category: '브레인포그',
    title: '만성 피로와 브레인포그를 상담할 때 확인하는 내용',
    summary: '피로와 집중력 저하가 이어질 때 수면, 신체 상태와 생활 리듬을 함께 살펴봅니다.',
    displayDate: '2026.09.26',
    href: 'https://blog.naver.com/orbmed/224423428133',
  },
];
