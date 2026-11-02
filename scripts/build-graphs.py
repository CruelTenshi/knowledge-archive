"""Rebuild explanatory PNG graphs: Python 3, numpy, matplotlib, Korean font."""
from pathlib import Path
import json
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib import font_manager
from matplotlib.patches import Rectangle

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'db' / 'img'
OUT.mkdir(parents=True, exist_ok=True)
font = Path('C:/Windows/Fonts/malgun.ttf')
if font.exists():
    font_manager.fontManager.addfont(str(font))
    font_name = font_manager.FontProperties(fname=str(font)).get_name()
else:
    font_name = 'Noto Sans CJK KR'
BG, FG, GRID = '#081027', '#e0e9ff', '#263653'
TEAL, VIOLET, AMBER, MUTED = '#34dce2', '#b295ff', '#ffbe64', '#a1b2d0'
plt.rcParams.update({'font.family':[font_name, 'DejaVu Sans'], 'font.size':14, 'axes.unicode_minus':False,
 'figure.facecolor':BG, 'axes.facecolor':BG, 'axes.edgecolor':MUTED,
 'text.color':FG, 'axes.labelcolor':FG, 'xtick.color':MUTED, 'ytick.color':MUTED,
 'grid.color':GRID, 'grid.alpha':.7, 'axes.spines.top':False, 'axes.spines.right':False,
 'legend.facecolor':BG, 'legend.edgecolor':GRID, 'legend.labelcolor':FG, 'savefig.facecolor':BG})
manifest=[]

def canvas(title, subtitle):
    fig, ax=plt.subplots(figsize=(12,7.5),dpi=150)
    fig.subplots_adjust(left=.12,right=.95,bottom=.19,top=.78)
    fig.text(.08,.92,title,fontsize=24,weight='bold')
    fig.text(.08,.86,subtitle,fontsize=13,color=MUTED)
    ax.set_axisbelow(True)
    ax.grid(True,alpha=.5)
    return fig,ax

def save(fig,name,assumptions,concept=False):
    note='설명용 개념도 · 수치·기울기·현재 국면을 추정하지 않음' if concept else '가정에 따른 계산 예시 · 실제 관측자료 아님'
    fig.text(.08,.055,note,fontsize=11,color=MUTED)
    dest=OUT/(name+'.png')
    fig.savefig(dest,dpi=150)
    plt.close(fig)
    manifest.append({'file':dest.name,'assumptions':assumptions})

# 1. Dollar smile: qualitative regimes, never a fitted growth regression.
fig,ax=canvas('달러 스마일: 세 국면의 개념도','위험 회피와 미국의 상대적 성장 우위가 서로 다른 강세 경로를 만든다')
x=np.linspace(-1,1,300);y=.22+.72*x*x
for left,right,color in [(-1,-.34,VIOLET),(-.34,.34,AMBER),(.34,1,TEAL)]:
    ax.axvspan(left,right,color=color,alpha=.06)
ax.plot(x,y,color=TEAL,lw=4)
ax.set(xlim=(-1.1,1.1),ylim=(0,1.25),ylabel='달러의 상대적 강세 압력',xlabel='경제·시장 국면을 설명하기 위한 배열')
ax.set_xticks([-.78,0,.78],['세계적 불안\n위험 회피','위험 선호 회복\n미국 우위 약화','미국 성장의\n상대적 우위'])
ax.set_yticks([.22,.95],['낮음','높음'])
for tx,ty,label,color in [(-.78,1.08,'안전자산·달러 유동성 수요',VIOLET),(0,.48,'해외·위험자산으로 자금 이동',AMBER),(.76,1.08,'미국 자산의 기대수익 매력',TEAL)]:
    ax.text(tx,ty,label,ha='center',fontsize=12,color=color)
save(fig,'dollar-smile-graph','정성적 세 국면. 가로축은 시간·실측 성장률이 아니며 세로축에도 수치 단위를 부여하지 않음.',True)

# 2. Average cost: exact fixed-cost dilution.
fig,ax=canvas('생산량이 늘 때 평균비용은 어떻게 변할까?','고정비 F = 1,000 · 단위변동비 v = 10 · AC(Q) = 1,000/Q + 10')
q=np.linspace(50,500,451);ac=1000/q+10
ax.plot(q,ac,color=TEAL,lw=3,label='평균비용 AC')
ax.axhline(10,color=VIOLET,ls='--',lw=2,label='단위변동비 v = 10')
for qi,ai in [(100,20),(200,15)]:
    ax.scatter(qi,ai,color=AMBER,zorder=4)
    ax.annotate(f'Q = {qi} → AC = {ai}',(qi,ai),xytext=(20,20),textcoords='offset points',fontsize=12)
ax.set(xlabel='생산량 Q (단위)',ylabel='평균비용 (금액/단위)',xlim=(50,500),ylim=(8,33))
ax.legend(loc='upper right');save(fig,'average-cost-graph','TC=1000+10Q. Q=50..500. 동일 설비·일정 단위변동비의 범위, 장기 비용곡선 아님.')

# 3. Compounding versus simple interest.
fig,ax=canvas('단리와 복리의 차이는 시간이 지나며 커진다','원금 100 · 연 5% 고정 · 추가 납입·인출·세금·수수료 없음')
t=np.arange(21);compound=100*1.05**t;simple=100*(1+.05*t)
ax.plot(t,compound,color=TEAL,lw=3,label='복리: 100 × 1.05ⁿ')
ax.plot(t,simple,color=AMBER,lw=2.5,ls='--',label='단리: 100 × (1 + 0.05n)')
ax.text(19.5,compound[-1]+6,f'{compound[-1]:.2f}',ha='right',color=TEAL)
ax.text(19.5,simple[-1]-13,f'{simple[-1]:.2f}',ha='right',color=AMBER)
ax.set(xlabel='기간 n (년)',ylabel='미래 금액',xlim=(0,21),ylim=(90,285));ax.legend(loc='upper left')
save(fig,'compound-interest-graph','PV=100,r=.05,n=0..20. 비교용 단리는 매년 최초 원금의 5%만 반영.')

# 4. Two identical-volatility assets with distinct correlations.
fig,ax=canvas('분산투자: 상관관계에 따라 위험이 달라진다','두 자산의 표준편차 각각 20% · 고정 비중 · 공매도 없음')
w=np.linspace(0,1,501)
for rho,color,ls in [(1,MUTED,':'),(0,TEAL,'-'),(-1,VIOLET,'--')]:
    risk=np.sqrt(np.maximum(0,.04*(w*w+(1-w)**2+2*rho*w*(1-w))))*100
    ax.plot(w*100,risk,color=color,lw=3,ls=ls,label=f'상관계수 ρ = {rho}')
ax.scatter(50,np.sqrt(.02)*100,color=AMBER,zorder=5)
ax.annotate('50:50 · ρ = 0\n약 14.14%',(50,np.sqrt(.02)*100),xytext=(62,17),arrowprops={'arrowstyle':'->','color':AMBER},fontsize=12)
ax.set(xlabel='자산 1의 비중 (%) · 자산 2는 나머지',ylabel='포트폴리오 표준편차 (%)',xlim=(0,100),ylim=(0,24))
ax.legend(loc='lower right');save(fig,'portfolio-correlation-graph','Var=.04[w²+(1-w)²+2ρw(1-w)]. ρ=1,0,-1. 완전 음의 상관과 동일 변동성은 설명용 극단 가정.')

# 5. A deliberately linear hypothetical utility frontier fits the article examples.
fig,ax=canvas('효용가능집합: 개선과 분배의 선택을 구별하기','가상의 가능집합: uA ≥ 0, uB ≥ 0, uA + uB ≤ 5')
u=np.linspace(0,5,101);ax.fill_between(u,0,5-u,color=TEAL,alpha=.12)
ax.plot(u,5-u,color=TEAL,lw=3,label='파레토 효율적 경계')
for xx,yy,label,color,offset in [(2,2,'A (2, 2)',AMBER,(-70,-28)),(3,2,'B (3, 2)',TEAL,(15,12)),(4,1,'C (4, 1)',VIOLET,(15,10))]:
    ax.scatter(xx,yy,color=color,s=65,zorder=5);ax.annotate(label,(xx,yy),xytext=offset,textcoords='offset points',color=color,fontsize=13)
ax.annotate('',(3,2),(2,2),arrowprops={'arrowstyle':'->','lw':2,'color':AMBER,'shrinkA':8,'shrinkB':8})
ax.text(.5,.5,'달성 가능한 효용 조합',color=MUTED,fontsize=13)
ax.set(xlabel='사람 A의 효용 uA (가상 단위)',ylabel='사람 B의 효용 uB (가상 단위)',xlim=(0,5.5),ylim=(0,5.5))
ax.legend(loc='upper right');save(fig,'utility-frontier-graph','uA+uB<=5. A에서 B로는 파레토 개선, B와 C는 서로 지배하지 않음. 효용의 객관적 측정치 아님.')

# 6. Surplus areas under linear curves.
fig,ax=canvas('경제적 잉여: 가격 위와 아래의 두 면적','수요 P = 14 − 0.6Q · 공급 P = 2 + 0.4Q · 외부효과 없는 경쟁시장 가정')
q=np.linspace(0,18,181);d=14-.6*q;s=2+.4*q;qe,pe=12,6.8
ax.plot(q,d,color=TEAL,lw=3,label='수요: 한계 지불의사');ax.plot(q,s,color=VIOLET,lw=3,label='공급: 한계비용')
qs=np.linspace(0,qe,100);ax.fill_between(qs,pe,14-.6*qs,color=TEAL,alpha=.22);ax.fill_between(qs,2+.4*qs,pe,color=VIOLET,alpha=.25)
ax.hlines(pe,0,qe,color=AMBER,ls='--');ax.vlines(qe,0,pe,color=MUTED,ls=':')
ax.text(1.3,9.6,'소비자잉여 CS = 43.2',color=TEAL,fontsize=13)
ax.text(1.3,4.5,'생산자잉여 PS = 28.8',color=VIOLET,fontsize=13)
ax.annotate('균형 Q = 12, P = 6.8',(qe,pe),xytext=(12.5,10),arrowprops={'arrowstyle':'->','color':AMBER},fontsize=12)
ax.set(xlabel='수량 Q',ylabel='가격·단위당 편익/비용',xlim=(0,18),ylim=(0,15));ax.legend(loc='upper right',fontsize=11)
save(fig,'economic-surplus-graph','D=14-.6Q,S=2+.4Q. Q*=12,P*=6.8,CS=.5*12*7.2=43.2,PS=.5*12*4.8=28.8.')

# 7. Negative externality with constant marginal damage.
fig,ax=canvas('외부비용을 빼고 생산하면 과잉생산이 생길 수 있다','한계편익 14 − 0.6Q · 한계사적비용 2 + 0.4Q · 한계외부비용 2')
q=np.linspace(0,18,181);mb=14-.6*q;mpc=2+.4*q;msc=mpc+2
for values,color,label in [(mb,TEAL,'한계편익 MB'),(mpc,VIOLET,'한계사적비용 MPC'),(msc,AMBER,'한계사회비용 MSC')]: ax.plot(q,values,color=color,lw=2.8,label=label)
ex=np.linspace(10,12,30);ax.fill_between(ex,14-.6*ex,4+.4*ex,color=AMBER,alpha=.3,label='초과 생산에 따른 순손실')
ax.vlines([10,12],0,[8,6.8],color=MUTED,ls=':');ax.set_xticks([0,5,10,12,15,18],['0','5','10\n효율적 수량','12\n사적 균형','15','18'])
ax.set(xlabel='생산량 Q',ylabel='단위당 편익·비용',xlim=(0,18),ylim=(0,15));ax.legend(loc='upper right',fontsize=11)
save(fig,'external-cost-graph','MSC=MPC+2. MB=MPC=>Q12, MB=MSC=>Q10. 순손실=.5*(12-10)*2=2. 소비 외부효과 없음.')

# 8. Same 100->130 / 100->110 example as the document.
fig,ax=canvas('이중차분: 공통 변화를 차감하는 논리','처리집단 100 → 130 · 비교집단 100 → 110 · 평행추세를 가정한 예시')
ax.plot([0,1],[100,130],color=TEAL,lw=3,marker='o',ms=8,label='처리집단: 관측 변화 +30')
ax.plot([0,1],[100,110],color=AMBER,lw=3,ls='--',marker='s',ms=7,label='비교집단: 관측 변화 +10')
ax.annotate('',(1.08,130),(1.08,110),arrowprops={'arrowstyle':'<->','color':VIOLET,'lw':2})
ax.text(1.12,120,'차이 20',color=VIOLET,va='center',fontsize=15)
ax.text(.48,96,'처리가 없었을 경우의 110은\n평행추세 가정 아래의 반사실',color=AMBER,fontsize=12)
ax.set(xlim=(-.1,1.45),ylim=(92,138),ylabel='결과의 집단 평균');ax.set_xticks([0,1],['개입 전','개입 후']);ax.legend(loc='upper left',fontsize=12)
save(fig,'difference-in-differences-graph','관측값 T100->130,C100->110. (130-100)-(110-100)=20. 평행추세 등 가정이 없으면 인과효과로 해석 불가.')

# 9. Relative variance of the average loss, not total loss.
fig,ax=canvas('위험풀링: 공통 위험이 남으면 분산의 하한이 생긴다','같은 분산을 가진 손실 · 모든 쌍의 상관계수가 동일하다는 단순화')
n=np.arange(1,101)
ax.plot(n,1/n,color=TEAL,lw=3,label='독립: ρ = 0')
ax.plot(n,(1+(n-1)*.2)/n,color=VIOLET,lw=3,label='양의 공통 상관: ρ = 0.2')
ax.axhline(.2,color=AMBER,ls='--',lw=2,label='ρ = 0.2일 때의 극한 0.2')
ax.set(xlabel='위험의 수 n',ylabel='평균 손실의 분산 / 개별 손실 분산',xlim=(1,100),ylim=(0,1.05));ax.legend(loc='upper right',fontsize=12)
save(fig,'risk-pooling-graph','Var(mean)/σ²=[1+(n-1)ρ]/n,n1..100,ρ0,.2. 평균 손실의 불확실성, 총손실 감소 그래프 아님.')

# 10. QALY is a quality-weighted duration area.
fig,ax=canvas('QALY는 건강 가중치 × 기간의 면적이다','건강 가중치 0.8을 2년 유지 · 할인·생존확률 차이를 생략한 예시')
ax.fill_between([0,2],0,.8,color=TEAL,alpha=.23);ax.plot([0,2],[.8,.8],color=TEAL,lw=3)
ax.axhline(1,color=MUTED,ls='--',lw=1.5);ax.text(2.03,1.05,'완전한 건강 = 1',color=MUTED,fontsize=12,va='center')
ax.text(1,.4,'0.8 × 2년 = 1.6 QALY',color=FG,ha='center',fontsize=20)
ax.set(xlabel='시간 (년)',ylabel='건강 관련 삶의 질 가중치',xlim=(0,2.8),ylim=(0,1.2));ax.set_xticks([0,1,2]);ax.set_yticks([0,.4,.8,1])
save(fig,'qaly-area-graph','q=.8,Δt=2,QALY=1.6. 할인·생존확률을 생략. 사람의 존엄에 대한 점수가 아님.')

# 11. Little's law: occupancy area and individual sojourn durations.
fig,ax=canvas('리틀의 법칙: 수량 그래프의 면적 = 체류시간의 합','3건이 각각 3분 체류 · 5분 관찰 · 시작·끝 경계에 남는 건 없음')
fig.subplots_adjust(bottom=.25)
colors=[TEAL,VIOLET,AMBER]
# Each color tracks one customer's time; the stair outline is N(t).
edges=[0,1,2,3,4,5];active=[[0],[0,1],[0,1,2],[1,2],[2]]
for k,ids in enumerate(active):
    for level,cid in enumerate(ids): ax.add_patch(Rectangle((k,level),1,1,facecolor=colors[cid],alpha=.4,edgecolor=BG))
ax.step(edges,[1,2,3,2,1,0],where='post',color=FG,lw=2.5)
ax.set(xlabel='시간 (분)',ylabel='시스템 안의 건수 N(t)',xlim=(0,5),ylim=(0,3.5));ax.set_xticks(range(6));ax.set_yticks(range(4))
ax.text(.15,3.17,'면적 = 9 건·분',fontsize=15,color=FG)
fig.text(.15,.11,'L = 9/5 = 1.8건       λ = 3/5 = 0.6건/분       W = 9/3 = 3분',fontsize=13,color=TEAL)
save(fig,'little-law-area-graph','도착0,1,2분/출발3,4,5분. 체류3분씩,총9건분,T5,n3,L1.8,λ.6,W3. 끝점의 순간은 면적에 영향 없음.')

# 12. Feasible consumption smoothing with zero rate and borrowing allowed.
fig,ax=canvas('소비 평활화: 소득과 소비의 시점을 나누기','3기간 · 금리 0 · 초기 순자산 0 · 차입 가능 · 최종 부채 없음')
fig.subplots_adjust(bottom=.25)
x=np.arange(3);income=np.array([1,4,1]);cons=np.array([2,2,2])
ax.bar(x-.18,income,width=.36,color=VIOLET,alpha=.8,label='소득 Yt: 1, 4, 1')
ax.bar(x+.18,cons,width=.36,color=TEAL,alpha=.85,label='소비 Ct: 2, 2, 2')
for i,label in enumerate(['차입 1','저축 2','자산 사용 1']): ax.text(i,4.5,label,ha='center',fontsize=14,color=AMBER)
ax.set(xlabel='시점',ylabel='금액 (가상 단위)',ylim=(0,5.3));ax.set_xticks(x,['0','1','2']);ax.legend(loc='upper center',bbox_to_anchor=(.5,1.11),ncol=2,fontsize=12)
fig.text(.13,.105,'소득 합계 = 소비 합계 = 6 · 소비 후 순자산: −1 → 1 → 0',fontsize=13,color=MUTED)
save(fig,'consumption-smoothing-graph','r0,A0=0,Y=[1,4,1],C=[2,2,2]. 소비후잔액[-1,1,0]. 일정 소비가 항상 최적이라는 주장은 아님.')

checks={
 'average_cost_q100':1000/100+10,'average_cost_q200':1000/200+10,
 'compound_year20':100*1.05**20,'portfolio_half_rho0':float(np.sqrt(.02)),
 'surplus_cs':.5*12*(14-6.8),'surplus_ps':.5*12*(6.8-2),
 'did':(130-100)-(110-100),'qaly':.8*2,'little_area':1+2+3+2+1,
 'consumption_total_income':int(income.sum()),'consumption_total_spending':int(cons.sum())}
assert checks['average_cost_q100']==20 and checks['average_cost_q200']==15
assert np.isclose(checks['surplus_cs']+checks['surplus_ps'],72)
assert checks['did']==20 and checks['little_area']==9
assert checks['consumption_total_income']==checks['consumption_total_spending']==6
(OUT/'graph-data.json').write_text(json.dumps({'type':'illustrative-assumptions-not-observations','graphs':manifest,'checks':checks},ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
print(json.dumps({'graphs':len(manifest),'checks':checks},ensure_ascii=False,indent=2))
