/**
 * 지식 아카이브 — 문서 목록 관리 (본문은 db 폴더의 .md 파일)
 * 새 문서: db에 md 파일을 넣고 ARTICLES에 항목을 추가한 뒤 새로고침합니다.
 * id: 고유하고 변하지 않는 문서 주소 / title: 표시 제목
 * file: db 폴더 기준 상대 경로 / summary: 카드 요약
 * tags: 검색용 태그 / updatedAt: YYYY-MM-DD (선택)
 * 이미지: db/img에 저장하고 본문에서 ![설명](img/파일명.png)로 사용합니다.
 * 아래 ARTICLES에 문서 정보를 추가합니다. 빈 배열이면 빈 아카이브로 표시됩니다.
 */
(() => {
  "use strict";
  const ARTICLES = [
    {
      "id": "international-politics",
      "title": "국제정치학",
      "file": "국제정치학.md",
      "summary": "전쟁·평화·협력의 조건과 개인·국가·국제체제의 분석 수준.",
      "tags": [
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "political-realism",
      "title": "현실주의",
      "file": "현실주의.md",
      "summary": "국가의 생존·권력 경쟁을 설명하는 고전적·구조적·공격적 현실주의.",
      "tags": [
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "liberalism",
      "title": "자유주의",
      "file": "자유주의.md",
      "summary": "민주평화론·상업적 자유주의·윌슨주의와 국제협력의 조건.",
      "tags": [
        "정치철학",
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "power",
      "title": "권력",
      "file": "권력.md",
      "summary": "국력의 평가, 하드·소프트·스마트파워와 패권의 작동 방식.",
      "tags": [
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "interdependence",
      "title": "상호의존",
      "file": "상호의존.md",
      "summary": "민감성·취약성의 차이와 비대칭적 의존이 만드는 협상력.",
      "tags": [
        "국제정치",
        "경제학"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "international-system",
      "title": "국제체제",
      "file": "국제체제.md",
      "summary": "무정부성·능력 분포·극성, 카플란의 체제 유형과 구조적 설명의 한계.",
      "tags": [
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "balance-of-power",
      "title": "세력균형",
      "file": "세력균형.md",
      "summary": "내적·외적 균형, 위협균형과 역외균형의 논리 및 한계.",
      "tags": [
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "diplomacy",
      "title": "외교",
      "file": "외교.md",
      "summary": "목표·능력·상대의 이익을 조정하는 신중한 외교와 공공외교.",
      "tags": [
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "international-institutions",
      "title": "국제제도",
      "file": "국제제도.md",
      "summary": "기구·법·규범·레짐의 구별과 제도를 통한 협력의 조건.",
      "tags": [
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "functionalism",
      "title": "기능주의",
      "file": "기능주의.md",
      "summary": "기능적 협력의 확산, 신기능주의의 스필오버와 정치통합.",
      "tags": [
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "geopolitics",
      "title": "지정학",
      "file": "지정학.md",
      "summary": "해양력·하트랜드·림랜드와 지리·교통망·권력의 관계.",
      "tags": [
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "security",
      "title": "안보",
      "file": "안보.md",
      "summary": "안보 딜레마·확장억제·인간안보·보호책임의 범위와 쟁점.",
      "tags": [
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "prejudice",
      "title": "편견",
      "file": "편견.md",
      "summary": "고정관념·편견·차별의 구별과 올포트 척도, 전쟁·인간안보의 연결.",
      "tags": [
        "사회심리"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "hans-morgenthau",
      "title": "한스 모겐소",
      "file": "한스 모겐소.md",
      "summary": "정치적 현실주의의 여섯 원칙, 권력으로 정의된 이익과 신중한 외교.",
      "tags": [
        "인물",
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "kenneth-waltz",
      "title": "케네스 월츠",
      "file": "케네스 월츠.md",
      "summary": "세 가지 이미지와 국제체제의 구조로 전쟁·경쟁·균형을 설명한 학자.",
      "tags": [
        "인물",
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "thomas-hobbes",
      "title": "토머스 홉스",
      "file": "토머스 홉스.md",
      "summary": "자연상태·사회계약·주권과 국제정치의 무정부성.",
      "tags": [
        "인물",
        "정치철학"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "niccolo-machiavelli",
      "title": "니콜로 마키아벨리",
      "file": "니콜로 마키아벨리.md",
      "summary": "군주론의 권력 유지·판단·수단과 정치적 결과의 문제.",
      "tags": [
        "인물",
        "정치철학"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "thucydides",
      "title": "투키디데스",
      "file": "투키디데스.md",
      "summary": "힘의 부상과 공포, 멜로스의 대화와 아테네 팽창의 비용.",
      "tags": [
        "인물",
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "game-theory",
      "title": "게임이론",
      "file": "게임이론.md",
      "summary": "내시균형, 죄수의 딜레마·치킨게임의 차이와 반복 협력의 유인 조건.",
      "tags": [
        "경제학",
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "business-ethics",
      "title": "기업 윤리",
      "file": "기업 윤리.md",
      "summary": "기업의 의사결정을 결과·권리·공정성·성품의 관점에서 평가하는 기준.",
      "tags": [
        "윤리",
        "기업과 사회",
        "경영"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "utilitarianism",
      "title": "공리주의",
      "file": "공리주의.md",
      "summary": "관련된 모든 사람의 편익과 고통을 고려해 결과를 평가하는 윤리 이론.",
      "tags": [
        "윤리"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "kantian-ethics",
      "title": "임마누엘 칸트",
      "file": "임마누엘 칸트.md",
      "summary": "행위의 원칙과 인간의 존엄, 법질서와 영구평화를 탐구한 철학자.",
      "tags": [
        "윤리",
        "인물",
        "정치철학"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "rawls-justice",
      "title": "존 롤스",
      "file": "존 롤스.md",
      "summary": "기본 자유와 공정한 기회, 최소수혜자의 처지를 중심으로 제도를 평가하는 이론.",
      "tags": [
        "윤리"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "virtue-ethics",
      "title": "덕 윤리",
      "file": "덕 윤리.md",
      "summary": "규칙과 결과를 넘어 성품·습관·관계 속의 책임을 살피는 관점.",
      "tags": [
        "윤리"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "rights",
      "title": "권리",
      "file": "권리.md",
      "summary": "권리의 구조와 근거, 내재적·도구적 정당화 및 권리 충돌을 다루는 개념.",
      "tags": [
        "윤리",
        "정치철학"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "rights-liberty",
      "title": "자유지상주의",
      "file": "자유지상주의.md",
      "summary": "개인의 자유·소유권·자발적 교환 및 국가 역할의 범위를 둘러싼 논의.",
      "tags": [
        "윤리"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "stakeholders",
      "title": "이해관계자 이론",
      "file": "이해관계자 이론.md",
      "summary": "기업과 상호 영향을 주고받는 집단의 정당한 이해를 고려하는 관점.",
      "tags": [
        "기업과 사회"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "shared-value",
      "title": "공유가치 창출",
      "file": "공유가치 창출.md",
      "summary": "사회적 조건의 개선과 기업의 경쟁력을 함께 높이는 사업적 접근.",
      "tags": [
        "기업과 사회"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "net-zero",
      "title": "탄소중립",
      "file": "탄소중립.md",
      "summary": "온실가스 배출·제거의 균형, 국제 감축 협력과 정의로운 전환.",
      "tags": [
        "기업과 사회",
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "greenwashing",
      "title": "그린워싱",
      "file": "그린워싱.md",
      "summary": "환경·지속가능성에 관한 주장과 실제 성과 사이의 오도 가능성을 분석하는 개념.",
      "tags": [
        "기업과 사회"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "market-failure",
      "title": "시장실패",
      "file": "시장실패.md",
      "summary": "시장가격과 자발적 거래만으로 자원이 효율적으로 배분되지 못하는 상황.",
      "tags": [
        "경제학"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "externalities",
      "title": "외부효과",
      "file": "외부효과.md",
      "summary": "거래에 참여하지 않은 제3자에게 발생하지만 가격에 충분히 반영되지 않는 영향.",
      "tags": [
        "경제학"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "public-goods",
      "title": "공공재",
      "file": "공공재.md",
      "summary": "비배제성·비경합성, 무임승차와 국제공공재의 공동 공급 문제.",
      "tags": [
        "경제학",
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "information-asymmetry",
      "title": "정보 비대칭",
      "file": "정보 비대칭.md",
      "summary": "당사자 사이의 정보 격차가 거래 구성과 시장의 존속에 영향을 주는 현상.",
      "tags": [
        "경제학"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "moral-hazard",
      "title": "도덕적 해이",
      "file": "도덕적 해이.md",
      "summary": "계약 뒤에 관찰하기 어려운 행동과 비용 부담의 분리가 만드는 유인 문제.",
      "tags": [
        "경제학"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "principal-agent",
      "title": "대리인 문제",
      "file": "대리인 문제.md",
      "summary": "일을 맡긴 사람과 수행하는 사람의 목표·정보가 다를 때 발생하는 문제.",
      "tags": [
        "기업이론"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "transaction-costs",
      "title": "거래비용",
      "file": "거래비용.md",
      "summary": "시장·조직·국제협력에서 탐색·협상·이행·조정에 드는 비용.",
      "tags": [
        "기업이론",
        "국제정치",
        "경제학"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "hold-up",
      "title": "홀드업 문제",
      "file": "홀드업 문제.md",
      "summary": "특정 거래관계에 묶인 투자가 사후 협상에서 취약성을 만드는 현상.",
      "tags": [
        "기업이론"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "bounded-rationality",
      "title": "제한된 합리성",
      "file": "제한된 합리성.md",
      "summary": "정보·계산·예측 능력의 한계가 의사결정과 계약 설계에 미치는 영향.",
      "tags": [
        "기업이론"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "incomplete-contracts",
      "title": "불완전계약",
      "file": "불완전계약.md",
      "summary": "미래의 모든 사건을 예측하고 검증 가능한 문장으로 쓰기 어렵기 때문에 계약은 빈틈을 가진다.",
      "tags": [
        "기업이론"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "incentives",
      "title": "인센티브",
      "file": "인센티브.md",
      "summary": "보상 기준이 실제 행동과 목표 달성 방식을 바꾸는 메커니즘.",
      "tags": [
        "경제학"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "prisoners-dilemma",
      "title": "죄수의 딜레마",
      "file": "죄수의 딜레마.md",
      "summary": "개별적으로 유리한 비협력이 공동 손실을 만드는 게임과 국제협력의 조건.",
      "tags": [
        "경제학",
        "국제정치"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "economic-surplus",
      "title": "경제적 잉여",
      "file": "경제적 잉여.md",
      "summary": "지불의사와 기회비용의 차이로 거래에서 생기는 이득을 분석하는 도구.",
      "tags": [
        "경제학"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "management",
      "title": "경영",
      "file": "경영.md",
      "summary": "계획·조직화·리딩·통제를 연결해 조직의 자원을 성과로 전환하는 과정.",
      "tags": [
        "경영"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "leadership",
      "title": "리더십",
      "file": "리더십.md",
      "summary": "보상·기준의 관리와 공동 목적·변화의 촉진을 비교하는 리더십 관점.",
      "tags": [
        "경영"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "planned-behavior",
      "title": "계획행동이론",
      "file": "계획행동이론.md",
      "summary": "태도·주관적 규범·지각된 행동통제가 의도와 행동에 연결되는 모형.",
      "tags": [
        "조직행동"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "strategy",
      "title": "경영 전략",
      "file": "경영 전략.md",
      "summary": "어디에서 경쟁하고 어떤 방식으로 가치를 만들지 결정하는 상호 연결된 선택.",
      "tags": [
        "전략"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "vrio",
      "title": "VRIO 분석",
      "file": "VRIO 분석.md",
      "summary": "자원과 역량이 경쟁우위를 뒷받침할 수 있는지 평가하는 틀.",
      "tags": [
        "전략"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "diversification",
      "title": "다각화",
      "file": "다각화.md",
      "summary": "새로운 사업·지역·가치사슬 단계로 확장할 때 가치 창출과 복잡성을 함께 평가하는 전략.",
      "tags": [
        "전략"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "vertical-integration",
      "title": "수직적 통합",
      "file": "수직적 통합.md",
      "summary": "수직적 통합은 공급이나 유통 등 가치사슬의 앞뒤 단계를 내부화하는 것이다.",
      "tags": [
        "전략"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "competitive-strategy",
      "title": "본원적 경쟁전략",
      "file": "본원적 경쟁전략.md",
      "summary": "고객가치와 비용, 목표시장의 범위로 경쟁 방식을 구분하는 틀.",
      "tags": [
        "전략"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "blue-ocean",
      "title": "블루오션 전략",
      "file": "블루오션 전략.md",
      "summary": "기존 경쟁요소를 재설계해 차별화와 낮은 비용을 함께 추구하는 가치혁신 접근.",
      "tags": [
        "전략"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "value-chain",
      "title": "가치사슬",
      "file": "가치사슬.md",
      "summary": "가치 창출 활동의 연결과 단계별 부가가치 분포를 분석하는 관점.",
      "tags": [
        "전략"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "smile-curve",
      "title": "스마일 커브",
      "file": "스마일 커브.md",
      "summary": "스마일 커브는 일부 산업에서 연구개발·디자인 같은 상류 활동과 브랜드·서비스 같은 하류 활동의 부가가치가 조립보다 높게 나타날 수 있음을 설명하는 그림이다.",
      "tags": [
        "전략"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "finance",
      "title": "금융",
      "file": "금융.md",
      "summary": "시간·주체·위험 사이에서 자금을 이동시키는 제도와 활동.",
      "tags": [
        "재무"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "consumption-smoothing",
      "title": "소비 평활화",
      "file": "소비 평활화.md",
      "summary": "소득이 변해도 소비의 급격한 변동을 줄이려는 개인의 선택.",
      "tags": [
        "재무"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "compound-interest",
      "title": "화폐의 시간가치",
      "file": "화폐의 시간가치.md",
      "summary": "수익의 재투자와 현재가치 계산으로 시간에 따른 금액을 비교하는 원리.",
      "tags": [
        "재무"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "risk-return",
      "title": "투자",
      "file": "투자.md",
      "summary": "예상되는 보상과 결과의 불확실성, 위험을 나누는 방법을 구분하는 개념.",
      "tags": [
        "재무"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "diversification-investing",
      "title": "분산 투자",
      "file": "분산 투자.md",
      "summary": "자산 간 공분산과 상관관계를 활용해 포트폴리오 위험을 나누는 원리.",
      "tags": [
        "재무"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "insurance-risk-pooling",
      "title": "보험",
      "file": "보험.md",
      "summary": "여러 주체의 손실 위험을 모아 예측 가능성을 높이고 부담을 나누는 구조.",
      "tags": [
        "재무"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "capital-structure",
      "title": "자본구조",
      "file": "자본구조.md",
      "summary": "기업의 자금조달 방식을 상환의무·수익청구권·통제권으로 비교하는 개념.",
      "tags": [
        "재무"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "venture-capital-ipo",
      "title": "벤처금융",
      "file": "벤처금융.md",
      "summary": "성장 단계의 불확실성을 감수하는 투자와 공개시장으로의 전환.",
      "tags": [
        "재무"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "initial-public-offering",
      "title": "기업공개",
      "file": "기업공개.md",
      "summary": "기업공개(Initial Public Offering, IPO)는 기업이 처음으로 주식을 일반 대중에게 공모하는 것을 뜻한다.",
      "tags": [
        "재무"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "hedging",
      "title": "헤지",
      "file": "헤지.md",
      "summary": "기존 위험에 반대 방향으로 반응하는 계약을 활용해 변동성을 조절하는 방법.",
      "tags": [
        "재무"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "efficient-markets",
      "title": "효율적 시장 가설",
      "file": "효율적 시장 가설.md",
      "summary": "정보가 가격에 반영되는 정도와 위험을 감안한 기대성과를 구분하는 관점.",
      "tags": [
        "재무"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "responsible-investment",
      "title": "책임투자",
      "file": "책임투자.md",
      "summary": "ESG 정보를 투자판단과 보유 이후의 활동에 반영하는 여러 접근.",
      "tags": [
        "재무"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "stewardship",
      "title": "스튜어드십",
      "file": "스튜어드십.md",
      "summary": "투자자의 권한과 영향력을 활용해 장기 가치와 기업의 관행에 관여하는 활동.",
      "tags": [
        "재무"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "cost-of-capital",
      "title": "자본비용",
      "file": "자본비용.md",
      "summary": "자금 제공자가 요구하는 보상이 기업의 투자와 ESG 개선에 미치는 경로.",
      "tags": [
        "재무"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "bank-runs",
      "title": "뱅크런",
      "file": "뱅크런.md",
      "summary": "단기 지급약속과 장기 자산의 불일치가 금융시스템의 불안을 증폭하는 현상.",
      "tags": [
        "재무"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "too-big-to-fail",
      "title": "대마불사",
      "file": "대마불사.md",
      "summary": "대마불사(Too Big to Fail)는 대형 기관의 실패가 시스템에 큰 피해를 줄 수 있어 구제를 기대하게 되는 문제다.",
      "tags": [
        "재무"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "mergers-acquisitions",
      "title": "인수·합병",
      "file": "인수·합병.md",
      "summary": "기업의 소유권·사업구성을 바꾸어 자원과 역량을 재배치하는 활동.",
      "tags": [
        "재무"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "financial-statements",
      "title": "재무제표",
      "file": "재무제표.md",
      "summary": "기업의 재무상태·기간성과·현금흐름을 연결해 읽는 보고 체계.",
      "tags": [
        "회계"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "accounting-equation",
      "title": "회계방정식",
      "file": "회계방정식.md",
      "summary": "자산·부채·자본 및 수익·비용의 관계로 거래를 추적하는 기본 틀.",
      "tags": [
        "회계"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "accrual-accounting",
      "title": "발생주의",
      "file": "발생주의.md",
      "summary": "현금의 수취·지급 시점과 경제적 사건의 인식 시점을 구분하는 회계 관점.",
      "tags": [
        "회계"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "accounting-standards",
      "title": "회계기준",
      "file": "회계기준.md",
      "summary": "개별 거래의 회계처리와 그 기초 개념을 제공하는 체계의 역할 구분.",
      "tags": [
        "회계"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "integrated-reporting",
      "title": "통합보고",
      "file": "통합보고.md",
      "summary": "여러 자원과 관계가 장기 가치 창출에 어떻게 연결되는지 설명하는 보고 관점.",
      "tags": [
        "회계"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "sustainability-reporting",
      "title": "지속가능성 보고",
      "file": "지속가능성 보고.md",
      "summary": "기업의 지속가능성 관련 영향·위험·기회를 어떤 범위에서 공개할지 정하는 과정.",
      "tags": [
        "회계"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "capital-maintenance",
      "title": "자본유지",
      "file": "자본유지.md",
      "summary": "자본을 훼손하지 않고 소비할 수 있는 잉여를 통해 소득의 의미를 묻는 개념.",
      "tags": [
        "회계"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "operations-management",
      "title": "운영관리",
      "file": "운영관리.md",
      "summary": "자원과 프로세스를 설계해 제품·서비스를 안정적으로 제공하는 관리 활동.",
      "tags": [
        "운영관리"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "service-operations",
      "title": "서비스 운영관리",
      "file": "서비스 운영관리.md",
      "summary": "고객의 참여와 수요 변동을 고려해 서비스 경험과 처리 과정을 설계하는 분야.",
      "tags": [
        "운영관리"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "queuing",
      "title": "대기행렬",
      "file": "대기행렬.md",
      "summary": "유입률·체류시간·시스템 안의 평균 수량을 연결하는 분석 틀.",
      "tags": [
        "운영관리"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "supply-chain",
      "title": "공급망관리",
      "file": "공급망관리.md",
      "summary": "상품·정보·자금의 연결과 전체 최적화, 회복력·상호의존의 관리.",
      "tags": [
        "운영관리",
        "국제정치",
        "경제학"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "bullwhip-effect",
      "title": "채찍효과",
      "file": "채찍효과.md",
      "summary": "최종 소비의 작은 변동이 공급망 상류의 큰 주문 변동으로 증폭되는 현상.",
      "tags": [
        "운영관리"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "causal-inference",
      "title": "인과추론",
      "file": "인과추론.md",
      "summary": "함께 움직이는 현상과 개입으로 발생한 효과를 구분하는 분석.",
      "tags": [
        "분석"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "experiments",
      "title": "무작위 실험",
      "file": "무작위 실험.md",
      "summary": "대상을 무작위 배정해 개입의 효과를 비교하는 연구 설계.",
      "tags": [
        "분석"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "difference-in-differences",
      "title": "이중차분",
      "file": "이중차분.md",
      "summary": "처리집단과 비교집단의 전후 변화 차이를 이용하는 인과추론 방법.",
      "tags": [
        "분석"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "phantom-stockouts",
      "title": "가상 품절",
      "file": "가상 품절.md",
      "summary": "재고가 존재하지만 고객이 찾거나 구매할 수 없는 상태와 그 운영상 원인.",
      "tags": [
        "운영관리"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "customer-value",
      "title": "마케팅",
      "file": "마케팅.md",
      "summary": "고객과 사회에 의미 있는 제안을 만들고 전달·교환하는 활동.",
      "tags": [
        "마케팅"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "value-proposition",
      "title": "가치 제안",
      "file": "가치 제안.md",
      "summary": "특정 고객이 대안 대신 해당 제품·서비스를 선택해야 하는 이유.",
      "tags": [
        "마케팅"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "stp",
      "title": "STP 분석",
      "file": "STP 분석.md",
      "summary": "시장을 나누고 목표고객을 선택한 뒤 고객의 인식 속 위치를 설계하는 과정.",
      "tags": [
        "마케팅"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "marketing-mix",
      "title": "마케팅 믹스",
      "file": "마케팅 믹스.md",
      "summary": "제품·가격·유통·촉진을 고객 관점과 연결해 실행하는 체계.",
      "tags": [
        "마케팅"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "brand-loyalty",
      "title": "브랜드 충성도",
      "file": "브랜드 충성도.md",
      "summary": "반복구매와 선호를 구분하고 핵심 고객가치와 전달수단을 함께 관리하는 관점.",
      "tags": [
        "마케팅"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "market-orientation",
      "title": "시장지향성",
      "file": "시장지향성.md",
      "summary": "고객과 경쟁환경의 변화를 이해하고 조직이 이를 실행에 반영하는 능력이다.",
      "tags": [
        "마케팅"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "information-systems",
      "title": "정보시스템",
      "file": "정보시스템.md",
      "summary": "사람·프로세스·기술을 결합해 데이터를 업무와 의사결정으로 연결하는 체계.",
      "tags": [
        "정보시스템"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "dikw",
      "title": "DIKW",
      "file": "DIKW.md",
      "summary": "기록에 맥락과 해석을 더해 판단으로 연결하는 개념적 구분.",
      "tags": [
        "정보시스템"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "platform-network-effects",
      "title": "플랫폼",
      "file": "플랫폼.md",
      "summary": "여러 이용자 집단의 상호작용과 규모가 서비스의 가치에 영향을 주는 구조.",
      "tags": [
        "정보시스템"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "network-effects",
      "title": "네트워크 효과",
      "file": "네트워크 효과.md",
      "summary": "여러 이용자 집단의 상호작용과 규모가 서비스의 가치에 영향을 주는 구조.",
      "tags": [
        "정보시스템"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "business-analytics",
      "title": "비즈니스 애널리틱스",
      "file": "비즈니스 애널리틱스.md",
      "summary": "데이터와 분석을 경영의 질문·선택·행동으로 연결하는 활동.",
      "tags": [
        "분석"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "artificial-intelligence",
      "title": "인공지능",
      "file": "인공지능.md",
      "summary": "규칙 기반 방법부터 데이터 학습과 콘텐츠 생성까지 포함하는 기술적 개념.",
      "tags": [
        "정보시스템"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "ai-management",
      "title": "AI 경영",
      "file": "AI 경영.md",
      "summary": "모형 개발을 데이터·배포·업무·운영 감시까지 연결하는 관리 과정.",
      "tags": [
        "정보시스템"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "comparative-advantage",
      "title": "비교우위",
      "file": "비교우위.md",
      "summary": "절대 생산성이 아니라 상대적 기회비용의 차이로 교환의 이익을 설명하는 원리.",
      "tags": [
        "국제경영"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "economies-of-scale",
      "title": "규모의 경제",
      "file": "규모의 경제.md",
      "summary": "생산규모·제품 차별화가 비용과 무역 패턴에 미치는 영향.",
      "tags": [
        "국제경영"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "current-account",
      "title": "경상수지",
      "file": "경상수지.md",
      "summary": "국가의 재화·서비스·소득 거래와 대외 금융흐름을 구분하는 계정.",
      "tags": [
        "국제경영"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "exchange-rates",
      "title": "환율",
      "file": "환율.md",
      "summary": "통화 간 교환가격의 변화가 거래·자산·경쟁력에 미치는 영향.",
      "tags": [
        "국제경영"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "foreign-direct-investment",
      "title": "해외직접투자",
      "file": "해외직접투자.md",
      "summary": "국경 간 투자에서 지속적 관계와 유의한 영향력을 기준으로 구분하는 개념.",
      "tags": [
        "국제경영"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "portfolio-investment",
      "title": "포트폴리오 투자",
      "file": "포트폴리오 투자.md",
      "summary": "직접투자·준비자산과 구분되는 국경 간 증권투자의 분류와 위험.",
      "tags": [
        "국제경영"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "utility-possibility-set",
      "title": "효용가능집합",
      "file": "효용가능집합.md",
      "summary": "달성 가능한 효용 조합과 그중 어떤 배분을 선택할지 구분하는 도구.",
      "tags": [
        "경제학"
      ],
      "updatedAt": "2026-11-02"
    },
    {
      "id": "qaly",
      "title": "질보정생존연수",
      "file": "질보정생존연수.md",
      "summary": "생존기간과 건강 관련 삶의 질을 함께 표현하는 보건경제학의 지표.",
      "tags": [
        "윤리"
      ],
      "updatedAt": "2026-11-02"
    }
  ];  const REDIRECTS = [
    {
      "id": "business-ethics",
      "title": "기업윤리",
      "file": "기업윤리.md",
      "target": "business-ethics",
      "section": ""
    },
    {
      "id": "corporate-social-responsibility",
      "title": "기업의 사회적 책임",
      "file": "기업의 사회적 책임.md",
      "target": "business-ethics",
      "section": "기업의 사회적 책임"
    },
    {
      "id": "corporate-governance",
      "title": "기업지배구조",
      "file": "기업지배구조.md",
      "target": "business-ethics",
      "section": "기업지배구조"
    },
    {
      "id": "esg",
      "title": "ESG와 지속가능경영",
      "file": "ESG와 지속가능경영.md",
      "target": "business-ethics",
      "section": "ESG와 지속가능경영"
    },
    {
      "id": "ai-lifecycle",
      "title": "AI 시스템 생애주기와 도입 전략",
      "file": "AI 시스템 생애주기와 도입 전략.md",
      "target": "ai-management",
      "section": "AI 시스템 생애주기와 도입 전략"
    },
    {
      "id": "ai-governance",
      "title": "AI 위험과 거버넌스",
      "file": "AI 위험과 거버넌스.md",
      "target": "ai-management",
      "section": "AI 위험과 거버넌스"
    },
    {
      "id": "stp",
      "title": "STP와 포지셔닝",
      "file": "STP와 포지셔닝.md",
      "target": "stp",
      "section": ""
    },
    {
      "id": "vrio",
      "title": "VRIO와 핵심역량",
      "file": "VRIO와 핵심역량.md",
      "target": "vrio",
      "section": ""
    },
    {
      "id": "phantom-stockouts",
      "title": "가상 품절과 매장 혼잡",
      "file": "가상 품절과 매장 혼잡.md",
      "target": "phantom-stockouts",
      "section": ""
    },
    {
      "id": "finance",
      "title": "금융의 기능",
      "file": "금융의 기능.md",
      "target": "finance",
      "section": ""
    },
    {
      "id": "rawls-justice",
      "title": "롤스의 정의론",
      "file": "롤스의 정의론.md",
      "target": "rawls-justice",
      "section": ""
    },
    {
      "id": "rights-liberty",
      "title": "권리와 자유지상주의",
      "file": "권리와 자유지상주의.md",
      "target": "rights-liberty",
      "section": ""
    },
    {
      "id": "virtue-ethics",
      "title": "덕 윤리와 유교윤리",
      "file": "덕 윤리와 유교윤리.md",
      "target": "virtue-ethics",
      "section": ""
    },
    {
      "id": "net-zero",
      "title": "넷제로와 탄소중립",
      "file": "넷제로와 탄소중립.md",
      "target": "net-zero",
      "section": ""
    },
    {
      "id": "public-goods",
      "title": "공공재와 무임승차",
      "file": "공공재와 무임승차.md",
      "target": "public-goods",
      "section": ""
    },
    {
      "id": "information-asymmetry",
      "title": "정보 비대칭과 역선택",
      "file": "정보 비대칭과 역선택.md",
      "target": "information-asymmetry",
      "section": ""
    },
    {
      "id": "transaction-costs",
      "title": "거래비용과 기업의 경계",
      "file": "거래비용과 기업의 경계.md",
      "target": "transaction-costs",
      "section": ""
    },
    {
      "id": "hold-up",
      "title": "자산특수성과 홀드업 문제",
      "file": "자산특수성과 홀드업 문제.md",
      "target": "hold-up",
      "section": ""
    },
    {
      "id": "incentives",
      "title": "인센티브와 의도하지 않은 결과",
      "file": "인센티브와 의도하지 않은 결과.md",
      "target": "incentives",
      "section": ""
    },
    {
      "id": "economic-surplus",
      "title": "교환이익과 경제적 잉여",
      "file": "교환이익과 경제적 잉여.md",
      "target": "economic-surplus",
      "section": ""
    },
    {
      "id": "management",
      "title": "경영의 네 가지 기능",
      "file": "경영의 네 가지 기능.md",
      "target": "management",
      "section": ""
    },
    {
      "id": "leadership",
      "title": "거래적 리더십과 변혁적 리더십",
      "file": "거래적 리더십과 변혁적 리더십.md",
      "target": "leadership",
      "section": ""
    },
    {
      "id": "strategy",
      "title": "전략과 경쟁우위",
      "file": "전략과 경쟁우위.md",
      "target": "strategy",
      "section": ""
    },
    {
      "id": "competitive-strategy",
      "title": "차별화·원가우위·집중 전략",
      "file": "차별화·원가우위·집중 전략.md",
      "target": "competitive-strategy",
      "section": ""
    },
    {
      "id": "blue-ocean",
      "title": "블루오션 전략과 ERRC",
      "file": "블루오션 전략과 ERRC.md",
      "target": "blue-ocean",
      "section": ""
    },
    {
      "id": "consumption-smoothing",
      "title": "소비 평활화와 생애주기 가설",
      "file": "소비 평활화와 생애주기 가설.md",
      "target": "consumption-smoothing",
      "section": ""
    },
    {
      "id": "compound-interest",
      "title": "복리와 화폐의 시간가치",
      "file": "복리와 화폐의 시간가치.md",
      "target": "compound-interest",
      "section": ""
    },
    {
      "id": "insurance-risk-pooling",
      "title": "보험과 위험풀링",
      "file": "보험과 위험풀링.md",
      "target": "insurance-risk-pooling",
      "section": ""
    },
    {
      "id": "capital-structure",
      "title": "부채자본과 자기자본",
      "file": "부채자본과 자기자본.md",
      "target": "capital-structure",
      "section": ""
    },
    {
      "id": "hedging",
      "title": "헤지와 선물계약",
      "file": "헤지와 선물계약.md",
      "target": "hedging",
      "section": ""
    },
    {
      "id": "efficient-markets",
      "title": "효율적 시장과 초과수익",
      "file": "효율적 시장과 초과수익.md",
      "target": "efficient-markets",
      "section": ""
    },
    {
      "id": "responsible-investment",
      "title": "책임투자와 ESG 투자전략",
      "file": "책임투자와 ESG 투자전략.md",
      "target": "responsible-investment",
      "section": ""
    },
    {
      "id": "stewardship",
      "title": "스튜어드십과 주주관여",
      "file": "스튜어드십과 주주관여.md",
      "target": "stewardship",
      "section": ""
    },
    {
      "id": "cost-of-capital",
      "title": "자본비용과 지속가능투자의 영향 경로",
      "file": "자본비용과 지속가능투자의 영향 경로.md",
      "target": "cost-of-capital",
      "section": ""
    },
    {
      "id": "financial-statements",
      "title": "재무제표와 재무보고",
      "file": "재무제표와 재무보고.md",
      "target": "financial-statements",
      "section": ""
    },
    {
      "id": "accounting-equation",
      "title": "회계방정식과 재무제표의 연결",
      "file": "회계방정식과 재무제표의 연결.md",
      "target": "accounting-equation",
      "section": ""
    },
    {
      "id": "accrual-accounting",
      "title": "발생주의와 회계정보의 한계",
      "file": "발생주의와 회계정보의 한계.md",
      "target": "accrual-accounting",
      "section": ""
    },
    {
      "id": "accounting-standards",
      "title": "회계기준과 재무보고 개념체계",
      "file": "회계기준과 재무보고 개념체계.md",
      "target": "accounting-standards",
      "section": ""
    },
    {
      "id": "integrated-reporting",
      "title": "통합보고와 6대 자본",
      "file": "통합보고와 6대 자본.md",
      "target": "integrated-reporting",
      "section": ""
    },
    {
      "id": "sustainability-reporting",
      "title": "지속가능성 보고와 중요성",
      "file": "지속가능성 보고와 중요성.md",
      "target": "sustainability-reporting",
      "section": ""
    },
    {
      "id": "capital-maintenance",
      "title": "자본유지와 힉스식 소득",
      "file": "자본유지와 힉스식 소득.md",
      "target": "capital-maintenance",
      "section": ""
    },
    {
      "id": "queuing",
      "title": "대기행렬과 리틀의 법칙",
      "file": "대기행렬과 리틀의 법칙.md",
      "target": "queuing",
      "section": ""
    },
    {
      "id": "causal-inference",
      "title": "상관관계와 인과추론",
      "file": "상관관계와 인과추론.md",
      "target": "causal-inference",
      "section": ""
    },
    {
      "id": "experiments",
      "title": "무작위 실험과 A/B 테스트",
      "file": "무작위 실험과 A／B 테스트.md",
      "target": "experiments",
      "section": ""
    },
    {
      "id": "customer-value",
      "title": "마케팅과 고객가치",
      "file": "마케팅과 고객가치.md",
      "target": "customer-value",
      "section": ""
    },
    {
      "id": "marketing-mix",
      "title": "마케팅 믹스와 4P·4C",
      "file": "마케팅 믹스와 4P·4C.md",
      "target": "marketing-mix",
      "section": ""
    },
    {
      "id": "dikw",
      "title": "데이터·정보·지식·지혜",
      "file": "데이터·정보·지식·지혜.md",
      "target": "dikw",
      "section": ""
    },
    {
      "id": "comparative-advantage",
      "title": "비교우위와 자유무역",
      "file": "비교우위와 자유무역.md",
      "target": "comparative-advantage",
      "section": ""
    },
    {
      "id": "economies-of-scale",
      "title": "규모의 경제와 산업 내 무역",
      "file": "규모의 경제와 산업 내 무역.md",
      "target": "economies-of-scale",
      "section": ""
    },
    {
      "id": "current-account",
      "title": "경상수지와 국제수지",
      "file": "경상수지와 국제수지.md",
      "target": "current-account",
      "section": ""
    },
    {
      "id": "exchange-rates",
      "title": "환율과 기업의 외환위험",
      "file": "환율과 기업의 외환위험.md",
      "target": "exchange-rates",
      "section": ""
    },
    {
      "id": "utility-possibility-set",
      "title": "효용가능집합과 효율·분배",
      "file": "효용가능집합과 효율·분배.md",
      "target": "utility-possibility-set",
      "section": ""
    },
    {
      "id": "artificial-intelligence",
      "title": "인공지능·머신러닝·생성형 AI",
      "file": "인공지능·머신러닝·생성형 AI.md",
      "target": "artificial-intelligence",
      "section": ""
    },
    {
      "id": "kantian-ethics",
      "title": "의무론과 칸트 윤리",
      "file": "의무론과 칸트 윤리.md",
      "target": "kantian-ethics",
      "section": ""
    },
    {
      "id": "mission-vision",
      "title": "미션·비전과 계획의 수준",
      "file": "미션·비전과 계획의 수준.md",
      "target": "management",
      "section": "경영 계획"
    },
    {
      "id": "value-chain",
      "title": "가치사슬과 스마일 커브",
      "file": "가치사슬과 스마일 커브.md",
      "target": "value-chain",
      "section": ""
    },
    {
      "id": "bounded-rationality",
      "title": "제한된 합리성과 불완전계약",
      "file": "제한된 합리성과 불완전계약.md",
      "target": "bounded-rationality",
      "section": ""
    },
    {
      "id": "diversification",
      "title": "다각화와 수직적 통합",
      "file": "다각화와 수직적 통합.md",
      "target": "diversification",
      "section": ""
    },
    {
      "id": "venture-capital-ipo",
      "title": "벤처금융과 기업공개",
      "file": "벤처금융과 기업공개.md",
      "target": "venture-capital-ipo",
      "section": ""
    },
    {
      "id": "bank-runs",
      "title": "뱅크런과 대마불사",
      "file": "뱅크런과 대마불사.md",
      "target": "bank-runs",
      "section": ""
    },
    {
      "id": "mergers-acquisitions",
      "title": "인수·합병과 기업 구조조정",
      "file": "인수·합병과 기업 구조조정.md",
      "target": "mergers-acquisitions",
      "section": ""
    },
    {
      "id": "brand-loyalty",
      "title": "브랜드 충성도와 시장지향성",
      "file": "브랜드 충성도와 시장지향성.md",
      "target": "brand-loyalty",
      "section": ""
    },
    {
      "id": "foreign-direct-investment",
      "title": "해외직접투자와 포트폴리오 투자",
      "file": "해외직접투자와 포트폴리오 투자.md",
      "target": "foreign-direct-investment",
      "section": ""
    },
    {
      "id": "platform-network-effects",
      "title": "플랫폼과 네트워크 효과",
      "file": "플랫폼과 네트워크 효과.md",
      "target": "platform-network-effects",
      "section": ""
    },
    {
      "id": "risk-return",
      "title": "위험·기대수익과 분산투자",
      "file": "위험·기대수익과 분산투자.md",
      "target": "risk-return",
      "section": ""
    }
  ];
  window.KNOWLEDGE_DB = Object.freeze({ timeZone: "Asia/Seoul", redirects: Object.freeze(REDIRECTS.map(redirect => Object.freeze(redirect))), articles: Object.freeze(ARTICLES.map(article => Object.freeze({ ...article, tags: Object.freeze(article.tags || []) }))) });
})();
