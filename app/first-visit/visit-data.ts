export const firstVisitSteps = [
  {
    title: '예약',
    body: '네이버 예약, 카카오톡 상담 또는 전화로 원하는 일정을 확인합니다.',
  },
  {
    title: '접수와 문진',
    body: '현재 불편과 시작 시점, 복용 중인 약과 이전 검사 내용을 확인합니다.',
  },
  {
    title: '상담과 상태 확인',
    body: '증상과 생활 리듬을 상담하고 필요한 진찰 및 검사 여부를 안내합니다.',
  },
  {
    title: '진료와 안내',
    body: '현재 상태에 맞는 진료를 진행하고 이후의 내원 및 생활 관리 방향을 설명합니다.',
  },
];

export const firstVisitQuestions: Array<{
  id: 'exams' | 'duration' | 'cost' | 'parking';
  question: string;
  answer: string;
}> = [
  {
    id: 'exams',
    question: '처음 방문하면 검사를 모두 받아야 하나요?',
    answer: '모든 검사를 일률적으로 진행하지 않고 상담과 진찰을 바탕으로 필요한 항목을 설명합니다.',
  },
  {
    id: 'duration',
    question: '첫 진료는 얼마나 걸리나요?',
    answer: '상담 내용과 검사 여부에 따라 소요 시간이 달라집니다. 예약할 때 현재 불편과 검사 희망 여부를 말씀하시고 예상 소요 시간을 확인해 주세요.',
  },
  {
    id: 'cost',
    question: '비용과 보험 적용은 어떻게 확인하나요?',
    answer: '예약 전 전화나 카카오톡으로 궁금한 진료·검사 항목을 말씀해 주세요. 예상 비용과 건강보험 적용 여부를 문의하실 수 있으며, 실제 항목과 비용은 상담 후 확인해 주세요. 실손보험의 보장 여부는 가입하신 보험사에 확인해 주세요.',
  },
  {
    id: 'parking',
    question: '주차할 수 있나요?',
    answer: '롯데캐슬 르웨스트 지하주차장 이용 시 2시간 무료입니다.',
  },
];
