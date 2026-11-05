// 문서 본문의 {{틀:이름}}에서 사용할 공통 탐색 목록.
window.ARCHIVE_TEMPLATES = {
  logic: {
    title: "비판적 사고와 논리학",
    groups: [
      { label: "논증과 추론", articles: ["critical-thinking", "argument", "deductive-reasoning", "inductive-reasoning", "abduction"] },
      { label: "형식과 조건", articles: ["propositional-logic", "predicate-logic", "necessary-sufficient", "categorical-proposition", "categorical-syllogism"] },
      { label: "언어와 평가", articles: ["intension-extension", "ambiguity-vagueness", "pragmatics", "informal-fallacies", "principle-of-charity"] }
    ]
  },
  management: {
    title: "경영과 기업",
    groups: [
      { label: "조직과 전략", articles: ["management", "leadership", "strategy", "value-proposition", "value-chain"] },
      { label: "기업과 사회", articles: ["business-ethics", "stakeholders", "shared-value", "responsible-investment"] },
      { label: "기업의 경계", articles: ["transaction-costs", "principal-agent", "incomplete-contracts", "vertical-integration"] }
    ]
  },
  international: {
    title: "국제정치의 주요 개념",
    groups: [
      { label: "이론과 구조", articles: ["international-politics", "political-realism", "liberalism", "international-system"] },
      { label: "권력과 안보", articles: ["power", "balance-of-power", "geopolitics", "security"] },
      { label: "외교와 협력", articles: ["diplomacy", "interdependence", "international-institutions", "functionalism"] }
    ]
  },
  "accounting-basics": {
    flow: true,
    title: "회계의 기초",
    description: "재무제표의 역할을 파악한 뒤 거래가 기록되고 기간성과가 만들어지는 원리를 읽습니다.",
    groups: [
      { label: "보고서의 전체 모습", articles: ["financial-statements"] },
      { label: "자산·부채·자본의 관계", articles: ["accounting-equation"] },
      { label: "거래 기록과 결산", articles: ["double-entry-bookkeeping"] },
      { label: "수익·비용을 인식하는 시점", articles: ["accrual-accounting"] }
    ]
  },
  "accounting-operations": {
    flow: true,
    title: "영업활동과 현금 회수",
    description: "수익과 영업자산의 인식에서 출발해 회수·지급 시점과 현금흐름을 연결합니다.",
    groups: [
      { label: "기간 인식의 출발점", articles: ["accrual-accounting"] },
      { label: "판매와 상품 원가", articles: ["revenue-recognition","inventories"] },
      { label: "받을 대가와 회수 위험", articles: ["trade-receivables"] },
      { label: "영업에 묶이는 자금", articles: ["working-capital"] },
      { label: "현금의 증감 확인", articles: ["cash-flow-statement"] }
    ]
  },
  "accounting-group": {
    flow: true,
    title: "기업집단의 재무보고",
    description: "개별 재무제표를 읽은 뒤 그룹 전체로 합산하고 사업별로 나누어 보는 방법을 익힙니다.",
    groups: [
      { label: "재무제표의 구성", articles: ["financial-statements"] },
      { label: "지배력과 그룹 합산", articles: ["consolidated-financial-statements"] },
      { label: "사업별 성과와 연결 조정", articles: ["segment-reporting"] }
    ]
  },
  "cross-border-reporting": {
    flow: true,
    title: "해외사업의 재무보고",
    description: "환율의 의미를 이해한 뒤 외화 거래와 해외사업을 공통 통화로 바꾸고 연결하는 방법을 읽습니다.",
    groups: [
      { label: "통화의 교환가격", articles: ["exchange-rates"] },
      { label: "기능통화와 표시통화", articles: ["foreign-currency-translation"] },
      { label: "그룹 전체의 합산", articles: ["consolidated-financial-statements"] }
    ]
  },
  "accounting-assets": {
    flow: true,
    title: "장기자산의 회계",
    description: "인식·측정 기준을 바탕으로 취득, 사용, 상각과 손상이 보고에 반영되는 과정을 읽습니다.",
    groups: [
      { label: "인식과 측정의 기준", articles: ["accounting-standards","accrual-accounting"] },
      { label: "취득원가·감가상각·손상", articles: ["property-plant-equipment"] },
      { label: "무형의 자원과 사용권", articles: ["intangible-assets","lease-accounting"] },
      { label: "자산 변동과 현금 지출", articles: ["cash-flow-statement"] }
    ]
  },
  "accounting-financing": {
    flow: true,
    title: "금융상품과 주주 몫",
    description: "조달 구조를 이해한 뒤 금융상품과 잠재 주식이 장부와 주당이익에 미치는 영향을 읽습니다.",
    groups: [
      { label: "조달 원천과 청구권", articles: ["capital-structure"] },
      { label: "계약상 권리와 의무", articles: ["financial-assets","financial-liabilities"] },
      { label: "주식 전환과 보상", articles: ["hybrid-securities","employee-benefits"] },
      { label: "이익과 희석의 주당 표시", articles: ["earnings-per-share"] }
    ]
  },
  "accounting-analysis": {
    flow: true,
    title: "재무제표에서 기업가치까지",
    description: "보고 수치를 비교하고 현금과 대조한 뒤 지속 가능한 이익과 가치평가로 이어갑니다.",
    groups: [
      { label: "보고서의 구성과 연결", articles: ["financial-statements"] },
      { label: "비율과 현금으로 해석", articles: ["financial-ratios","cash-flow-statement"] },
      { label: "이익의 지속성과 신뢰성", articles: ["earnings-quality"] },
      { label: "장래 성과의 가치", articles: ["business-valuation"] }
    ]
  },
  "investment-value": {
    flow: true,
    title: "투자와 가치평가",
    description: "시점이 다른 금액과 투자위험을 이해한 뒤 요구수익률을 평가에 적용합니다.",
    groups: [
      { label: "현재가치와 복리", articles: ["compound-interest"] },
      { label: "기대수익과 불확실성", articles: ["risk-return"] },
      { label: "자금 제공자의 요구수익", articles: ["cost-of-capital"] },
      { label: "현금흐름·잔여이익의 현재가치", articles: ["business-valuation"] }
    ]
  },
  "market-basics": {
    flow: true,
    title: "시장균형과 후생",
    description: "희소한 자원의 선택이 시장가격과 거래량, 거래의 이득으로 연결되는 흐름입니다.",
    groups: [
      { label: "선택의 비용", articles: ["opportunity-cost"] },
      { label: "가격과 거래량", articles: ["supply-and-demand"] },
      { label: "가격 반응과 거래 이득", articles: ["price-elasticity","economic-surplus"] },
      { label: "효율적 배분이 어려운 경우", articles: ["market-failure"] }
    ]
  },
  "market-structure": {
    flow: true,
    title: "비용과 시장구조",
    description: "기업의 비용과 생산 결정을 먼저 읽고 가격수용과 제품 차별화의 차이를 비교합니다.",
    groups: [
      { label: "평균비용과 한계비용", articles: ["production-costs"] },
      { label: "주어진 가격에서의 생산", articles: ["perfect-competition"] },
      { label: "가격 결정력과 차별화", articles: ["monopoly","monopolistic-competition"] }
    ]
  },
  "costs-and-profit": {
    flow: true,
    title: "원가 구조와 수익성",
    description: "고정비와 변동비를 구분한 뒤 판매량에 따른 이익 변화와 보고된 수익성을 연결합니다.",
    groups: [
      { label: "총비용·평균비용·한계비용", articles: ["production-costs"] },
      { label: "공헌이익과 손익분기점", articles: ["cost-volume-profit"] },
      { label: "마진과 자본 수익률", articles: ["financial-ratios"] }
    ]
  },
  "market-pricing": {
    flow: true,
    title: "수요와 가격 결정",
    description: "수요 반응을 바탕으로 한계수입을 이해하고 고객별 가격 선택으로 확장합니다.",
    groups: [
      { label: "가격과 수요량", articles: ["supply-and-demand"] },
      { label: "수요의 가격 민감도", articles: ["price-elasticity"] },
      { label: "한계수입과 독점가격", articles: ["monopoly"] },
      { label: "지불의사별 가격", articles: ["price-discrimination"] }
    ]
  },
  "strategic-competition": {
    flow: true,
    title: "전략적 경쟁",
    description: "상대방의 반응을 고려하는 방법을 익힌 뒤 소수 기업의 경쟁과 시장구조를 읽습니다.",
    groups: [
      { label: "보수와 최선반응", articles: ["game-theory"] },
      { label: "협력과 이탈의 유인", articles: ["prisoners-dilemma"] },
      { label: "기업 간 수량·가격 경쟁", articles: ["oligopoly"] },
      { label: "시장의 집중 정도", articles: ["market-concentration"] }
    ]
  },
  "contracts-boundaries": {
    flow: true,
    title: "계약과 기업의 경계",
    description: "계약의 빈틈이 생기는 이유에서 시작해 전용 투자와 기업 내부화의 판단을 읽습니다.",
    groups: [
      { label: "의사결정과 거래의 제약", articles: ["bounded-rationality","transaction-costs"] },
      { label: "미래 사건을 다 쓰기 어려운 계약", articles: ["incomplete-contracts"] },
      { label: "전용 투자 이후의 협상", articles: ["hold-up"] },
      { label: "가치사슬을 내부화하는 선택", articles: ["vertical-integration"] }
    ]
  },
  "information-incentives": {
    flow: true,
    title: "정보와 계약 유인",
    description: "계약 당사자의 정보 차이가 행동과 목표의 차이로 이어지는 경로를 읽습니다.",
    groups: [
      { label: "당사자 사이의 정보 격차", articles: ["information-asymmetry"] },
      { label: "계약 이후의 행동 변화", articles: ["moral-hazard"] },
      { label: "위임과 목표 불일치", articles: ["principal-agent"] },
      { label: "보상과 행동의 설계", articles: ["incentives"] }
    ]
  },
  "logic-deduction": {
    flow: true,
    title: "논증에서 형식논리까지",
    description: "전제와 결론을 찾아 타당성을 판단하고, 문장과 대상의 구조를 기호로 분석합니다.",
    groups: [
      { label: "주장과 근거의 구조", articles: ["argument"] },
      { label: "결론이 보장되는 추론", articles: ["deductive-reasoning"] },
      { label: "문장의 연결과 조건", articles: ["necessary-sufficient","propositional-logic"] },
      { label: "대상·성질·양화", articles: ["predicate-logic"] }
    ]
  },
  "logic-categorical": {
    flow: true,
    title: "정언논리",
    description: "개념의 범위를 이해한 뒤 모든·어떤 명제로 이루어진 삼단논법을 검토합니다.",
    groups: [
      { label: "개념의 조건과 대상 집합", articles: ["intension-extension"] },
      { label: "명제의 수량과 성질", articles: ["categorical-proposition"] },
      { label: "세 개념을 연결한 추론", articles: ["categorical-syllogism"] }
    ]
  },
  "evidence-causality": {
    flow: true,
    title: "추론에서 인과 검증까지",
    description: "개연적 추론과 설명 가설을 구분한 뒤, 가설이 실제 효과를 설명하는지 검토합니다.",
    groups: [
      { label: "전제와 결론", articles: ["argument"] },
      { label: "일반화와 설명의 후보", articles: ["inductive-reasoning","abduction"] },
      { label: "검증할 예측과 반례", articles: ["scientific-hypothesis"] },
      { label: "원인과 결과의 식별", articles: ["causal-inference"] },
      { label: "개입 효과의 비교 설계", articles: ["experiments","difference-in-differences"] }
    ]
  },
  "management-strategy": {
    flow: true,
    title: "경영과 경쟁우위",
    description: "조직의 목표와 계획을 정하고 경쟁 방식과 이를 뒷받침하는 활동·역량을 살핍니다.",
    groups: [
      { label: "목표·계획·실행", articles: ["management"] },
      { label: "경쟁 범위와 선택", articles: ["strategy"] },
      { label: "고객가치와 비용의 선택", articles: ["competitive-strategy"] },
      { label: "활동과 자원의 뒷받침", articles: ["value-chain","vrio"] }
    ]
  },
  "marketing-planning": {
    flow: true,
    title: "고객에서 마케팅 실행까지",
    description: "고객가치를 정의하고 목표고객과 제안을 정한 뒤 실행 수단과 고객 반응을 읽습니다.",
    groups: [
      { label: "고객가치와 교환", articles: ["customer-value"] },
      { label: "시장의 구분과 목표고객", articles: ["stp"] },
      { label: "선택받을 이유", articles: ["value-proposition"] },
      { label: "제품·가격·유통·촉진", articles: ["marketing-mix"] },
      { label: "선호와 반복구매", articles: ["brand-loyalty"] }
    ]
  },
  "service-capacity": {
    flow: true,
    title: "서비스의 처리능력",
    description: "운영 프로세스의 기초에서 서비스 수요와 고객의 대기 문제로 이어갑니다.",
    groups: [
      { label: "프로세스와 처리능력", articles: ["operations-management"] },
      { label: "고객 참여와 수요 변동", articles: ["service-operations"] },
      { label: "유입·체류·대기", articles: ["queuing"] }
    ]
  },
  "supply-chain-variability": {
    flow: true,
    title: "공급망과 주문 변동",
    description: "공급망의 상품·정보 흐름을 이해하고 상류로 커지는 주문 변동을 분석합니다.",
    groups: [
      { label: "상품·정보·자금의 연결", articles: ["supply-chain"] },
      { label: "수요와 주문 변동의 증폭", articles: ["bullwhip-effect"] }
    ]
  },
  "data-ai": {
    flow: true,
    title: "데이터에서 AI 경영까지",
    description: "데이터가 판단에 쓰이는 과정을 이해한 뒤 분석·학습과 업무 도입을 읽습니다.",
    groups: [
      { label: "기록에서 의미와 판단으로", articles: ["dikw"] },
      { label: "데이터를 업무에 연결", articles: ["information-systems"] },
      { label: "경영 질문과 분석", articles: ["business-analytics"] },
      { label: "학습과 생성의 원리", articles: ["artificial-intelligence"] },
      { label: "도입·운영·감시", articles: ["ai-management"] }
    ]
  },
  "international-security": {
    flow: true,
    title: "국제체제와 안보",
    description: "국제정치의 분석 수준을 파악한 뒤 국가 간 권력 분포와 안보의 상호작용을 읽습니다.",
    groups: [
      { label: "행위자와 분석 수준", articles: ["international-politics"] },
      { label: "무정부성과 구조", articles: ["international-system"] },
      { label: "능력과 영향력", articles: ["power"] },
      { label: "균형과 대응", articles: ["balance-of-power"] },
      { label: "억제와 안보 딜레마", articles: ["security"] }
    ]
  },
  "international-cooperation": {
    flow: true,
    title: "국제협력의 조건",
    description: "상호의존이 만드는 편익과 취약성을 읽고, 반복 관계와 제도가 협력을 돕는 경로를 살핍니다.",
    groups: [
      { label: "민감성과 취약성", articles: ["interdependence"] },
      { label: "전략과 반복 관계", articles: ["game-theory"] },
      { label: "감시·규칙·분쟁 해결", articles: ["international-institutions"] },
      { label: "기능적 협력과 통합", articles: ["functionalism"] }
    ]
  }
};
