# 개념 설명 이미지

제작일: 2026-11-02. 내장 이미지 생성 도구를 사용했다. 아래 생성 그림 10개는 실제 사진·관측자료가 아닌 개념 설명용 이미지다. 계산 그래프의 가정과 재생성 방법은 아래에 정리했다. 문서 본문의 대체 텍스트와 설명을 함께 사용한다.

## 가상 품절

- 파일: `phantom-stockout.png`
- 본문: `../가상 품절.md`

### 생성 프롬프트

Use case: scientific-educational. Create one landscape 1536x1024 educational editorial illustration for a Korean knowledge archive explaining phantom stockouts. Clean precise isometric cutaway of ONE clothing shop: left half the customer-facing shop floor with a visibly empty rail for a distinctive teal jacket and a puzzled shopper; right half behind the partition a fitting room return trolley holding several identical teal jackets, a worker returning one jacket along a clear cyan arrow to the empty rail. Make physical stock exist yet unavailable on the shelf, NOT a genuinely empty warehouse. Two short Korean labels only, large crisp sans serif: '매대: 없음' over empty rail; '피팅룸: 재고 있음' over trolley. No other text, numbers, logos or watermark. Restrained navy background #081027, teal and muted violet accents, light neutral architecture, warm small human figures, generous padding. Accurate simple spatial storytelling, no decorative charts, no equation. Clearly an illustrative hypothetical scene, not documentary photography.

## 대기행렬

- 파일: `queue-bottleneck.png`
- 본문: `../대기행렬.md`

### 생성 프롬프트

Use case: scientific-educational. One landscape 1536x1024 educational cutaway illustration about queueing systems. A single service counter horizontally composed: a small arrival stream from far left, four customers waiting in a neat queue, ONE customer being served by one agent at a counter near right, one departing customer beyond right. A thin dashed cyan rounded rectangular SYSTEM BOUNDARY encloses BOTH the waiting customers and the counter including customer in service, excludes approaching and departing customer. Show arrows crossing boundary left to right. Three Korean labels only in large crisp sans serif: '유입' above incoming arrow, '대기 + 서비스' above dashed system boundary, '완료' above outgoing arrow. No numerical counts, no equations, no other text. The distinction between queue and whole system must be unmistakable. Premium clean editorial isometric illustration, dark navy #081027, teal flow arrows, restrained violet boundary highlights, spacious composition, light architecture, readable small human figures, no logos/watermark. Not a claim that a particular queue discipline or population count is universal.

## 채찍효과

- 파일: `bullwhip-effect.png`
- 본문: `../채찍효과.md`

### 생성 프롬프트

Use case: scientific-educational. One landscape 1536x1024 explanatory illustration of the bullwhip effect. Four large readable columns LEFT TO RIGHT with small friendly isometric icons: household customers, retail shop, wholesale warehouse, factory. Exact Korean labels respectively '소비자', '소매점', '도매상', '제조사'. Under each icon show same-size small schematic line panel, same time width and same vertical visual scale, centered on same dashed midline: tiny fluctuations under consumer, modest under retailer, larger under wholesaler, largest under factory. Equal mean and increasingly large amplitude, not increasing average. No numeric axes or data ticks, these are explicitly schematic patterns. A teal directional order-information arrow along bottom pointing LEFT TO RIGHT from consumers toward factory, label '주문 정보'. A separate pale thin product-flow arrow along top pointing RIGHT TO LEFT label '상품 흐름'. All Korean labels crisp and exact, no other text. Dark navy #081027 background, teal lines, restrained violet accents, generous whitespace, no logos/watermark. Precise educational illustration, no whip object, no decorative random graphics.

## 네트워크 효과

- 파일: `network-effects.png`
- 본문: `../네트워크 효과.md`

### 생성 프롬프트

Use case: scientific-educational. One landscape 1536x1024 educational illustration comparing DIRECT and CROSS-SIDE network effects in two clearly separated balanced panels. Left heading exactly '직접 네트워크 효과': a small messaging network of three same-style teal person nodes links to another small network of six same-style teal person nodes, via a short rightward arrow, show meaningful connections among people. Right heading exactly '교차 네트워크 효과': a group of three teal buyer/person icons left and a group of three muted-violet seller/store icons right, a platform hub between them, two curved arrows forming a two-way feedback loop connecting buyer participation to sellers and seller participation back to buyers. Short exact labels '구매자' and '판매자' below those two groups. Do not connect buyers to buyers on right panel; clearly two different user groups. No universal exponential-growth claim, no formula, no numeric counts, no other words. Clean premium 2.5D editorial diagram, dark navy #081027, restrained cyan/teal and violet, bright legible Korean typography, generous margins, no logos/watermark.

## 스마일 커브

- 파일: `smile-curve.png`
- 본문: `../스마일 커브.md`

### 생성 프롬프트

Use case: scientific-educational. One landscape 1536x1024 educational raster infographic explaining the smile curve. A single large coordinate sketch, x-axis labeled '가치사슬 활동', y-axis labeled '부가가치'. No numeric scale, no tick values, not empirical data. One smooth TEAL U-SHAPED curve high left, low middle, high right, obvious smile shape with minimum above x-axis. Three positions under x-axis from left to right exactly '연구개발·설계', '제조·조립', '브랜드·서비스'. Below each position a small precise isometric vignette: designer and technical sketch; assembly workbench; service conversation and product box. Short caption within image bottom exactly '일부 산업에서 관찰되는 개념도'. No time labels, no universal-law language, no revenue or profit axis, no other text. Beautiful legible Korean sans-serif, dark navy #081027, teal line and muted violet highlights, light neutral objects, ample room around all text, no watermark or logos.

## 외부효과

- 파일: `externality.png`
- 본문: `../외부효과.md`

### 생성 프롬프트

Use case: scientific-educational. One landscape 1536x1024 explanatory editorial illustration of a negative production externality. Left a tidy small factory making generic boxed goods, center a buyer receiving a box and a thin teal trade arrow with a tiny neutral currency icon between factory and buyer. Right beyond the factory fence a modest house with resident covering ears; clearly visible soft amber sound-wave arcs originate from factory machinery and reach the resident across the fence. The resident is OUTSIDE the transaction, no money arrow to resident, not an employee and not a buyer. Three exact Korean labels only: '생산자', '구매자', '제3자의 소음 피해' at appropriate positions. Do not show pollution as a trade, do not depict reimbursement already happening. Clean isometric cutaway, navy #081027, teal transaction, amber external harm, restrained violet accents, warm people, crisp readable sans serif, wide spacing, no logos/watermark, no equations. A hypothetical conceptual scene.

### 최종 수정 프롬프트

Edit this educational illustration with ONE precise correction only: remove the cyan coin/money-stack circular icon located between the two trading people above the bottom cyan arrow. In its place put a small clean cyan outline icon of a cardboard parcel, and put the exact Korean label '상품 전달' just above the rightward arrow in that same space. The cyan arrow must clearly represent goods flowing from producer to buyer, never payment. Keep the entire factory, people, home, fence, amber noise waves, navy colors, camera framing, all three existing Korean labels, and every other detail unchanged. No other edits or extra text.

## 수직적 통합

- 파일: `vertical-integration.png`
- 본문: `../수직적 통합.md`

### 생성 프롬프트

Use case: scientific-educational. One landscape 1536x1024 educational illustration explaining backward and forward vertical integration from a manufacturer's viewpoint. Three horizontal stages equally spaced: component supplier (small parts warehouse) on LEFT, manufacturer (assembly factory) CENTER, retail distribution shop RIGHT. Exact labels '부품 공급', '제조기업', '유통·판매'. Show a pale thin bottom product flow left to right, label '상품 흐름'. At top center above manufacturer put two separate large ownership-expansion arrows: a violet arrow from manufacturer pointing LEFT toward supplier labeled '후방 통합'; a teal arrow from manufacturer pointing RIGHT toward retailer labeled '전방 통합'. Distinguish arrows spatially so ownership expansion is NOT mistaken for product flow. A translucent dashed outline connects all three as a potential single ownership scope, no claim all firms must integrate. No other text, no equations or numbers. Clean premium precise isometric illustration, dark navy #081027 background, restrained teal/violet, high contrast Korean typography, generous margins, no logos or watermark.

## 공공재

- 파일: `public-goods.png`
- 본문: `../공공재.md`

### 생성 프롬프트

Use case: scientific-educational. Create one landscape 1536x1024 educational illustrated comparison of FOUR goods, a clean 2 by 2 matrix with four independent hypothetical scenes. Top-left '사적재': one customer buys and eats a single sandwich; top-right '클럽재': a lightly used membership swimming pool with access gate/card reader; bottom-left '공유자원': two separate fishing boats on an open pond competing over a visibly finite fish population; bottom-right '공공재': a local outdoor warning siren broadcasting simultaneously to several neighborhood homes without ticket gate. Exact large Korean headings only '사적재', '클럽재', '공유자원', '공공재'. Under each add respective exact two-part label '배제 가능 · 경합', '배제 가능 · 혼잡 전 비경합', '배제 어려움 · 경합', '배제 어려움 · 비경합'. Do NOT add confusing column or row axis headers. Each scene clearly separates access control and rival consumption; membership pool explicitly not crowded. Dark navy #081027, light neutral miniatures, teal and muted violet accents, clean editorial isometric illustration, ample margins and perfectly readable large Korean sans-serif. No numbers, logos, watermark or additional text.


## 홀드업 문제

- 파일: `asset-specificity.png`
- 본문: `../홀드업 문제.md`

### 생성 프롬프트

Use case: scientific-educational. One landscape 1536x1024 premium realistic isometric educational illustration for a Korean knowledge archive about asset specificity and hold-up. LEFT: a supplier's clean factory with a custom machine making a distinctive hexagonal component. CENTER: its intended customer's assembly station with an exactly matching hexagonal socket, clear teal arrow delivering the matching part. RIGHT: an alternative buyer's assembly machine has an obviously different round socket, the same hexagonal part cannot fit, amber small crossed-out fit indicator. Show the machinery visibly specialized, not broken. Three exact Korean labels only: '전용 설비', '특정 고객과 거래', '다른 용도로 전환 어려움'. Do not show prices or quantified losses, no bribery or violence, no document text, no other labels. Clean spatial storytelling, dark navy #081027 background, teal intended-match flow, restrained violet architecture and amber mismatch, simple correct geometrical shapes, generous spacing, crisp readable sans serif. Hypothetical illustration, not a photograph of a real firm. No logo, watermark, equations or chart.

### 최종 수정 프롬프트

Edit only the CENTRAL customer's tooling to correct the conceptual fit: replace every circular receiving socket on the CENTRAL assembly conveyor with a crisp HEXAGONAL recessed receiving socket matching exactly the hexagonal metal prism being delivered. Show the first hexagonal prism partly seated inside the matching central hexagonal socket. Keep the RIGHT alternative buyer's receiving socket CIRCULAR and mismatched, with the orange X. Keep left supplier, entire composition, dark navy palette, the three Korean labels, arrow direction, and all other details unchanged. The center must clearly FIT and the right must clearly NOT FIT. No extra labels.

## 지정학

- 파일: `chokepoint-route.png`
- 본문: `../지정학.md`

### 생성 프롬프트

Use case: scientific-educational. Create one landscape 1536x1024 clean editorial 3D top-down oblique island-and-sea miniature illustrating a maritime chokepoint and the cost of a detour. A fictitious irregular island sits centrally. Two distant ports A left and B right connected by TWO clearly different sea routes: a short cyan route passes through a narrow channel cutting through a gap in the central island; an amber long detour route curves around the island's entire southern coast, staying in water at all points. A few small cargo ships make scale clear, port cranes at both ends. A small violet bracket marks the narrow channel. Only three exact Korean labels: '좁은 통로', '짧은 항로', '우회 항로'. Use NO country names, NO real coastlines, NO borders, NO flags, NO distances or travel-time numbers. Both routes must connect the SAME two ports, never cross land, do not imply the short route is already closed. Rich but restrained precise illustrated relief map, dark navy sea #081027, light neutral land, teal and amber routes, crisp labels with generous whitespace, no watermark or logo. Hypothetical concept scene, not real geospatial data.

## 비판적 사고·논리학 설명 그림

### 연역논증의 포함관계와 반례

- 파일 `deduction-sets.png`
- 내장 ImageGen으로 생성하고 연역논증·정언삼단논법 본문에 연결했다.
- 포함관계와 두 집합이 분리된 반례, 한글 표기를 확인했다.

#### 생성 프롬프트

Educational illustration landscape 1536x1024 matching existing knowledge archive dark navy background #081027 luminous teal violet clean 2.5D miniature objects and crisp Korean typography. Two separated panels. Left exact heading '타당한 추론', three nested transparent rounded regions labeled outer '동물', middle '포유류', inner '고양이', small cat inside inner, dog in middle outside inner, bird in outer outside middle. Right exact heading '잘못된 역추론', large region labeled '포유류' enclosing two SEPARATE nonoverlapping small regions labeled '고양이' and '개' with cat and dog respectively. Caption left '고양이는 동물이다', caption right '둘 다 포유류여도 같은 집합은 아니다'. All containment precise. No arrows between right cat and dog, no formulas no other text. Generous spacing, useful teaching diagram, premium polished objects.

2026-11-04. 내장 ImageGen으로 생성했다. 기존 `network-effects.png`를 색상·입체 표현·한글 표기의 스타일 참고 자료로 사용했다. 아래 그림은 실제 통계나 관측 증거가 아닌 교육용 가상 개념도다.

### 귀추법

- 파일: `abduction-hypotheses.png`
- 문서: `../귀추법.md`
- 검토: 하나의 관찰에 세 후보 설명이 연결되며, 어느 설명도 확정하지 않았다.

#### 최종 생성 프롬프트

Use case: scientific-educational. Create ONE landscape 1536x1024 Korean educational illustration for an existing knowledge wiki. Style reference only: match the dark navy #081027 background, luminous teal and muted violet accents, premium clean 2.5D miniature scenes, generous margins and crisp large Korean typography of the attached reference images. Do not reproduce their subject. Subject: abduction means comparing multiple possible explanations of wet grass. At top center a single large miniature patch of visibly WET green lawn, water droplets visible, exact Korean label '관찰: 젖은 잔디'. Below it THREE clearly separated equally sized explanation vignettes in one row: LEFT rainy cloud dropping water on a small lawn, label exactly '비'; CENTER garden sprinkler spraying onto a small lawn, label exactly '스프링클러'; RIGHT early morning dew drops on closeup grass beneath gentle dawn light, label exactly '이슬'. Three thin pale curved lines lead FROM these three vignettes UPWARD toward the same observation, depicting candidate causes compatible with observation, not a chronological chain. Under the row one short exact Korean caption '추가 증거로 설명을 비교한다'. No checkmarks, no crossed-out hypothesis, no probabilities, no certainty, no formulas, no other text. Keep all labels readable. This is a hypothetical teaching illustration, not evidence that any explanation is true.

### 내포와 외연

- 파일: `intension-extension.png`
- 문서: `../내포와 외연.md`
- 검토: 탈것 ⊇ 자동차 ⊇ 전기자동차의 포함관계와 예시의 위치를 확인했다. 화살표는 개념을 읽는 방향이며 실측 수량이 아니다.

#### 최종 생성 프롬프트

Use case: scientific-educational. ONE landscape 1536x1024 educational illustration for a Korean knowledge wiki. Style reference only: same dark navy #081027 background, teal and muted violet luminous edges, clean premium 2.5D miniature objects and large crisp Korean sans-serif typography as attached reference. Subject: nested extensions and increasing intension. Show THREE clearly nested rectangular translucent platforms/regions in a top-down slightly isometric view, no overlap ambiguity: large outer region labeled '탈것', medium region COMPLETELY INSIDE outer labeled '자동차', small region COMPLETELY INSIDE medium labeled '전기자동차'. A bicycle stands in the outer region but OUTSIDE medium; a generic conventional passenger car with a small fuel-pump pictogram beside it stands INSIDE medium but OUTSIDE small; an electric car with a little lightning symbol stands INSIDE small. Exactly ONE example object per region's exclusive area. Keep objects and labels separated. Bottom below regions, two clearly separate short horizontal arrows with exact Korean labels: rightward arrow '조건 추가' and leftward arrow '대상 범위'. They explain that moving from 탈것 to 자동차 to 전기자동차 adds conditions and narrows the applicable set, with the main nested objects providing the key explanation. No numeric claims, no data chart, no brands, no other text. Accurate set containment, no partially intersecting circles.

## 개념 설명 그래프

2026-11-02. 모든 그래프는 설명용 가정에 따른 그림이며 관측 통계·투자 예측·임상 결과가 아니다. PNG는 `scripts/build-graphs.py`에서 Matplotlib로 작성했다. 수치와 계산 검사는 `graph-data.json`에 기록했다.

### 다시 만들기

Python 3, numpy, matplotlib와 한글 글꼴이 필요하다. 저장소 루트에서 `python scripts/build-graphs.py`를 실행한다. Windows는 맑은 고딕을 사용하며 다른 환경에서는 Noto Sans CJK KR을 사용한다. 기존 그래프 PNG와 계산 기록을 갱신한다.

### 그래프별 가정

| 파일 | 가정·범위 |
| --- | --- |
| `dollar-smile-graph.png` | 정성적 세 국면. 가로축은 시간·실측 성장률이 아니며 세로축에도 수치 단위를 부여하지 않음. |
| `average-cost-graph.png` | TC=1000+10Q. Q=50..500. 동일 설비·일정 단위변동비의 범위, 장기 비용곡선 아님. |
| `compound-interest-graph.png` | PV=100,r=.05,n=0..20. 비교용 단리는 매년 최초 원금의 5%만 반영. |
| `portfolio-correlation-graph.png` | Var=.04[w²+(1-w)²+2ρw(1-w)]. ρ=1,0,-1. 완전 음의 상관과 동일 변동성은 설명용 극단 가정. |
| `utility-frontier-graph.png` | uA+uB<=5. A에서 B로는 파레토 개선, B와 C는 서로 지배하지 않음. 효용의 객관적 측정치 아님. |
| `economic-surplus-graph.png` | D=14-.6Q,S=2+.4Q. Q*=12,P*=6.8,CS=.5*12*7.2=43.2,PS=.5*12*4.8=28.8. |
| `external-cost-graph.png` | MSC=MPC+2. MB=MPC=>Q12, MB=MSC=>Q10. 순손실=.5*(12-10)*2=2. 소비 외부효과 없음. |
| `difference-in-differences-graph.png` | 관측값 T100->130,C100->110. (130-100)-(110-100)=20. 평행추세 등 가정이 없으면 인과효과로 해석 불가. |
| `risk-pooling-graph.png` | Var(mean)/σ²=[1+(n-1)ρ]/n,n1..100,ρ0,.2. 평균 손실의 불확실성, 총손실 감소 그래프 아님. |
| `qaly-area-graph.png` | q=.8,Δt=2,QALY=1.6. 할인·생존확률을 생략. 사람의 존엄에 대한 점수가 아님. |
| `little-law-area-graph.png` | 도착0,1,2분/출발3,4,5분. 체류3분씩,총9건분,T5,n3,L1.8,λ.6,W3. 끝점의 순간은 면적에 영향 없음. |
| `consumption-smoothing-graph.png` | r0,A0=0,Y=[1,4,1],C=[2,2,2]. 소비후잔액[-1,1,0]. 일정 소비가 항상 최적이라는 주장은 아님. |

달러 스마일은 정성적 국면 비교다. 근거는 「환율」 문서의 제안자 설명과 중앙은행 자료 각주에 연결했다. 다른 계산 그래프는 각 문서에 식·단위·생략한 조건을 설명했다.
