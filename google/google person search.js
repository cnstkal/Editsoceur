(function(){
var D={
q:'박성화',
name:'박성화',job:'대한민국 배우',
desc:'박성화는 대한민국 배우이다. 2014년 KBS 드라마 《0시의 목격자》로 연예계에 데뷔했다.',
src:'위키백과',
nsite:'나무위키',nurl:'https://namu.wiki > 박성화',ntitle:'박성화',
nsnip:'박성화 · 2014년 데뷔 · 한국 남배우 · 대한민국의 영화배우 · 한국의 드라마 배우 · 1998년 출생 · 경남 진주시 출신 인물 ...',
m1s:'레몬경제',m1t:'박성화, 결혼 소식 직접 전해…‘인생의 새로운 장’',
m1b:'15년째 활동 중인 박성화는 공개 연애 중이던 연인과 결혼을 준비 중인 것으로 알려졌다. 두 사람은 교제를 이어오며 서로에 대한 신뢰 ...',m1d:'2025. 06. 22',
m2s:'ohmynews',m2t:'‘여름의 끝에서’ 박성화, 섬세한 연기로 시청자 호평…드라마 흥행 견인',
m2b:'배우 박성화가 출연 중인 드라마 ‘여름의 끝에서’가 시청자들의 호평 속에 꾸준한 상승세를 보이고 있다. 박성화는 극 중 복잡한 감정 ...',m2d:'2025. 06. 22',
m3s:'KBS 뉴스',m3t:'박성화, 화보 속 색다른 매력…성숙한 분위기',
m3b:'배우 박성화가 패션 매거진 화보를 통해 색다른 매력을 선보였다. 공개된 화보 속 박성화 ...',m3d:'2025. 06. 22',
k1:'출생',v1:'1999년 4월 04일 (27세)',k2:'키',v2:'178cm'
};
var G=[
{t:'기본',f:[['q','검색어'],['name','패널 이름'],['job','직업/분류'],['desc','패널 소개문','ta'],['src','출처']]},
{t:'검색결과',f:[['','1번 결과 (위키)','h'],['nsite','사이트명'],['nurl','주소'],['ntitle','제목'],['nsnip','요약','ta'],
['','2번 결과','h'],['m1s','매체'],['m1t','제목'],['m1b','요약','ta'],['m1d','날짜'],
['','3번 결과','h'],['m2s','매체'],['m2t','제목'],['m2b','요약','ta'],['m2d','날짜'],
['','4번 결과','h'],['m3s','매체'],['m3t','제목'],['m3b','요약','ta'],['m3d','날짜']]},
{t:'이미지',f:[['','오른쪽 인물 패널','h'],['p0','큰 사진','f'],['p1','작은 사진 1','f'],['p2','작은 사진 2','f'],
['','검색 결과 썸네일','h'],['t0','1번 썸네일','f'],['t1','2번 썸네일','f'],['t2','3번 썸네일','f'],['t3','4번 썸네일','f']]},
{t:'정보',f:[['k1','항목 1'],['v1','값 1'],['k2','항목 2'],['v2','값 2']]}
];
var S,IM,ed=document.getElementById('ed'),gp=document.getElementById('gp'),fit=document.getElementById('fit');

function render(){
[].forEach.call(gp.querySelectorAll('[data-b]'),function(e){e.textContent=S[e.dataset.b]||''});
[].forEach.call(gp.querySelectorAll('[data-i]'),function(e){var u=IM[e.dataset.i];e.style.backgroundImage=u?'url('+u+')':''});
}

function build(){
S=JSON.parse(JSON.stringify(D));IM={};ed.innerHTML='';
var groups=[],bar=document.createElement('div');bar.className='ps-seg';
G.forEach(function(g,i){
var p=document.createElement('div');p.className='ps-pn';p.hidden=i>0;
g.f.forEach(function(f){
if(f[2]==='h'){var h=document.createElement('h3');h.textContent=f[1];p.appendChild(h);return}
var l=document.createElement('label'),s=document.createElement('span');s.textContent=f[1];l.appendChild(s);
var inp;
if(f[2]==='f'){inp=document.createElement('input');inp.type='file';inp.accept='image/*';
inp.onchange=function(){var r=new FileReader();r.onload=function(){IM[f[0]]=r.result;render()};if(inp.files[0])r.readAsDataURL(inp.files[0])}}
else{inp=document.createElement(f[2]==='ta'?'textarea':'input');if(f[2]==='ta')inp.rows=3;inp.value=S[f[0]]||'';
inp.oninput=function(){S[f[0]]=inp.value;render()}}
l.appendChild(inp);p.appendChild(l);
});
ed.appendChild(p);groups.push(p);
var b=document.createElement('button');b.type='button';b.textContent=g.t;if(!i)b.className='on';
b.onclick=function(){groups.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};
bar.appendChild(b);
});
ed.parentNode.insertBefore(bar,ed);
ed.dataset.bar='1';
render();
}

function rebuild(){var o=ed.parentNode.querySelector('.ps-seg');if(o)o.remove();build()}

function scale(){var s=fit.clientWidth/1288;gp.style.transform='scale('+s+')'}
window.addEventListener('resize',scale);
if(window.ResizeObserver)new ResizeObserver(scale).observe(fit);

document.getElementById('reset').onclick=rebuild;
document.getElementById('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';scale()};
document.getElementById('savePng').onclick=function(){
if(!window.html2canvas){alert('html2canvas 로딩 실패 (인터넷 연결 확인)');return}
html2canvas(gp,{scale:2,useCORS:true,backgroundColor:'#fff',width:1288,height:724.5,onclone:function(d){var g=d.getElementById('gp');g.style.transform='none';g.parentNode.style.overflow='visible'}})
.then(function(c){var a=document.createElement('a');a.download='google_person_search.png';a.href=c.toDataURL('image/png');a.click()});
};

rebuild();scale();
})();
