(function(){
var S={aiOn:true,ai:'AI 모드',hl:0,q:['박성화','ㅂ','오늘 날씨','대화하기 좋은 야외장소','김홍중 신춘문예상 당선','박성화 신작','레몬드롭 호텔 위치','어깨 통증 스트레칭']};
var ed=document.getElementById('ed'),gp=document.getElementById('gp'),fit=document.getElementById('fit'),rows=document.getElementById('rows');
var HI='<svg class="h" width="20" height="20" viewBox="0 0 24 24" fill="#5f6368"><path d="M13 3a9 9 0 0 0-9 9H1l4 4 4-4H6a7 7 0 1 1 2.050 4.950L6.600 18.400A9 9 0 1 0 13 3zm-1 5v5l4.200 2.500.8-1.300-3.500-2.100V8z"/></svg>';
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function render(){
 var ai=gp.querySelector('.ai');if(ai)ai.style.display=S.aiOn?'':'none';
 gp.querySelector('[data-b="ai"]').textContent=S.ai;
 rows.innerHTML=S.q.map(function(t,i){return '<div class="row'+(S.hl===i+1?' hl':'')+'">'+HI+'<span>'+esc(t)+'</span><i class="x">✕</i></div>'}).join('');
}
var pn=[];
function build(){
 S={aiOn:true,ai:'AI 모드',hl:0,q:['박성화','ㅂ','오늘 날씨','대화하기 좋은 야외장소','김홍중 신춘문예상 당선','박성화 신작','레몬드롭 호텔 위치','어깨 통증 스트레칭']};
 var old=ed.parentNode.querySelector('.ps-seg');if(old)old.remove();
 ed.innerHTML='';
 var bar=document.createElement('div');bar.className='ps-seg';
 var basic=document.createElement('div');basic.className='ps-pn';
 basic.innerHTML='<div class="ps-tg"><span>AI 모드 버튼</span><label class="sw"><input id="gAi" type="checkbox" checked><i></i></label></div><label>AI 모드 글자<input id="gAiT" value="AI 모드"></label>';
 var list=document.createElement('div');list.className='ps-pn';list.hidden=true;
 list.innerHTML='<div id="gList"></div><button class="addc" id="gAdd" type="button">+ 검색어 추가</button><p class="hint">✓ 강조 체크 시 그 줄이 회색으로 강조돼요 (한 줄만)</p>';
 ed.appendChild(basic);ed.appendChild(list);pn=[basic,list];
 ['기본','검색어'].forEach(function(t,i){var b=document.createElement('button');b.type='button';b.textContent=t;if(!i)b.className='on';
  b.onclick=function(){pn.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
 ed.parentNode.insertBefore(bar,ed);
 drawList();render();
 document.getElementById('gAi').onchange=function(){S.aiOn=this.checked;render()};
 document.getElementById('gAiT').oninput=function(){S.ai=this.value;render()};
 document.getElementById('gAdd').onclick=function(){S.q.push('새 검색어');drawList();render()};
}
function drawList(){
 document.getElementById('gList').innerHTML=S.q.map(function(t,i){return '<div class="it" data-i="'+i+'"><input class="tx" data-k="t" value="'+esc(t)+'"><label class="fl"><input type="checkbox" data-k="h"'+(S.hl===i+1?' checked':'')+'>강조</label><button type="button" data-d="'+i+'">✕</button></div>'}).join('');
}
ed.addEventListener('input',function(e){var t=e.target;if(t.dataset.k==='t'){S.q[+t.closest('.it').dataset.i]=t.value;render()}});
ed.addEventListener('change',function(e){var t=e.target;if(t.dataset.k==='h'){var i=+t.closest('.it').dataset.i;S.hl=t.checked?i+1:0;drawList();render()}});
ed.addEventListener('click',function(e){var d=e.target.dataset.d;if(d!=null){S.q.splice(+d,1);if(S.hl===+d+1)S.hl=0;else if(S.hl>+d+1)S.hl--;drawList();render()}});
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
