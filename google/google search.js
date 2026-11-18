(function(){
var D={ai:'AI 모드',hl:'1',r1:'박성화',r2:'ㅂ',r3:'오늘 날씨',r4:'대화하기 좋은 야외장소',r5:'김홍중 신춘문예상 당선',r6:'박성화 신작',r7:'레몬드롭 호텔 위치',r8:'어깨 통증 스트레칭'};
var G=[{t:'검색어 목록',f:[['r1','1번'],['r2','2번'],['r3','3번'],['r4','4번'],['r5','5번'],['r6','6번'],['r7','7번'],['r8','8번']]},
{t:'기타',f:[['ai','AI 모드 버튼 글자'],['hl','강조 줄 번호 (1~8, 없으면 0)']]}];
var S,ed=document.getElementById('ed'),gp=document.getElementById('gp'),fit=document.getElementById('fit'),rows=document.getElementById('rows');
var HI='<svg class="h" width="20" height="20" viewBox="0 0 24 24" fill="#5f6368"><path d="M13 3a9 9 0 0 0-9 9H1l4 4 4-4H6a7 7 0 1 1 2.050 4.950L6.600 18.400A9 9 0 1 0 13 3zm-1 5v5l4.200 2.500.8-1.300-3.500-2.100V8z"/></svg>';
function render(){
[].forEach.call(gp.querySelectorAll('[data-b]'),function(e){e.textContent=S[e.dataset.b]||''});
rows.innerHTML='';
for(var i=1;i<=8;i++){var d=document.createElement('div');d.className='row'+(+S.hl===i?' hl':'');
d.innerHTML=HI+'<span></span><i class="x">✕</i>';d.children[1].textContent=S['r'+i]||'';rows.appendChild(d)}
}
function build(){
S=JSON.parse(JSON.stringify(D));ed.innerHTML='';
var old=ed.parentNode.querySelector('.ps-seg');if(old)old.remove();
var gs=[],bar=document.createElement('div');bar.className='ps-seg';
G.forEach(function(g,i){
var p=document.createElement('div');p.className='ps-pn';p.hidden=i>0;
g.f.forEach(function(f){var l=document.createElement('label'),s=document.createElement('span'),n=document.createElement('input');
s.textContent=f[1];n.value=S[f[0]];n.oninput=function(){S[f[0]]=n.value;render()};l.appendChild(s);l.appendChild(n);p.appendChild(l)});
ed.appendChild(p);gs.push(p);
var b=document.createElement('button');b.type='button';b.textContent=g.t;if(!i)b.className='on';
b.onclick=function(){gs.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};
bar.appendChild(b)});
ed.parentNode.insertBefore(bar,ed);render();
}
function scale(){gp.style.transform='scale('+fit.clientWidth/1288+')'}
window.addEventListener('resize',scale);
if(window.ResizeObserver)new ResizeObserver(scale).observe(fit);
document.getElementById('reset').onclick=build;
document.getElementById('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';scale()};
document.getElementById('savePng').onclick=function(){
if(!window.html2canvas){alert('html2canvas 로딩 실패');return}
html2canvas(gp,{scale:2,backgroundColor:'#fff',width:1288,height:724.5,onclone:function(d){var g=d.getElementById('gp');g.style.transform='none';g.parentNode.style.overflow='visible'}})
.then(function(c){var a=document.createElement('a');a.download='google_search.png';a.href=c.toDataURL('image/png');a.click()})};
build();scale();
})();
