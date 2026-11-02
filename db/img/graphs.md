# 개념 설명 그래프

2026-11-02. 모든 그래프는 설명용 가정에 따른 그림이며 관측 통계·투자 예측·임상 결과가 아니다. PNG는 `scripts/build-graphs.py`에서 Matplotlib로 작성했다. 수치와 계산 검사는 `graph-data.json`에 기록했다.

## 다시 만들기

Python 3, numpy, matplotlib와 한글 글꼴이 필요하다. 저장소 루트에서 `python scripts/build-graphs.py`를 실행한다. Windows는 맑은 고딕을 사용하며 다른 환경에서는 Noto Sans CJK KR을 사용한다. 기존 그래프 PNG와 계산 기록을 갱신한다.

## 그래프별 가정

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
