(function(){
var $=function(i){return document.getElementById(i)};
var RX=[['😍','좋아요'],['😆','응원해요'],['🥳','축하해요'],['😮','기대해요'],['😨','놀랐어요'],['😢','슬퍼요']];
var DEF={logo:'Atzen',title:'정윤호 측, 마스 열애설에 선 긋기…“사실무근, 열애 관계 아니다”',date:'입력 2026.09.02 오후 3:02',
body:'정윤호 측이 래퍼 마스와의 열애설에 대해 “사실무근”이라는 입장을 밝혔다.\n\n정윤호 소속사 측은 “마스와의 열애설은 사실이 아니다”라며 관련 보도 및 주장에 대해 선을 그었다. 이어 “배우 본인에게 확인한 결과 열애설의 내용을 전혀 알지 못하고 있으며, 사실과 다른 내용에 당황스러워하고 있다”고 전했다.\n\n갑작스럽게 불거진 열애설에 대해 정윤호 측은 사실이 아니라는 입장을 재차 강조했다.',
rep:'김코 기자 koooo@atzen.com',rx:[12,145,8,7,250,8],
cm:[{id:'fixo****',t:'2026.09.03 13:08',x:'짝사랑이었나보네'},{id:'mout****',t:'2026.09.03 13:07',x:'그래 요즘 시대에 자기 마음표현하는 거 보기좋다 성화야 나도 내년에 중학교 들어가는데 힘내라'},{id:'dkek****',t:'2026.09.03 13:05',x:'에이구.  젊은 청년이.  안타깝게됐네. 윤호.씨가잘. 보듬어. 주시길...^^'}]};
var S=JSON.parse(JSON.stringify(DEF));
function esc(s){return String(s).replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
function render(){
$('vLogo').textContent=S.logo;$('vTitle').textContent=S.title;$('vDate').textContent=S.date;
$('vBody').textContent=S.body+'\n\n'+S.rep;
$('vTotal').textContent=S.rx.reduce(function(a,b){return a+(+b||0)},0);
$('vRx').innerHTML=RX.map(function(r,i){return '<div><span class="em">'+r[0]+'</span>'+r[1]+'<b>'+esc(S.rx[i])+'</b></div>'}).join('');
$('vCm').innerHTML=S.cm.map(function(c){return '<div class="c"><div class="av"></div><div class="id">'+esc(c.id)+'</div><div class="tm">'+esc(c.t)+'</div><div class="tx">'+esc(c.x)+'</div><div class="rp">답글</div><i class="dt"></i></div>'}).join('');
}
function fit(){var f=$('fit');$('post').style.transform='scale('+f.clientWidth/1600+')'}
function cmEditor(){
$('cmList').innerHTML=S.cm.map(function(c,i){return '<div class="ecard"><h3>댓글 '+(i+1)+'<button data-d="'+i+'" type="button">삭제</button></h3><div class="row"><label>아이디<input data-k="id" data-i="'+i+'" value="'+esc(c.id).replace(/"/g,'&quot;')+'"></label><label>시간<input data-k="t" data-i="'+i+'" value="'+esc(c.t)+'"></label></div><label>내용<textarea rows="2" data-k="x" data-i="'+i+'">'+esc(c.x)+'</textarea></label></div>'}).join('');
}
function fill(){
$('iLogo').value=S.logo;$('iTitle').value=S.title;$('iDate').value=S.date;$('iBody').value=S.body;$('iRep').value=S.rep;
$('rxPn').innerHTML='<div class="row">'+RX.slice(0,3).map(function(r,i){return '<label>'+r[1]+'<input data-r="'+i+'" value="'+S.rx[i]+'"></label>'}).join('')+'</div><div class="row">'+RX.slice(3).map(function(r,i){return '<label>'+r[1]+'<input data-r="'+(i+3)+'" value="'+S.rx[i+3]+'"></label>'}).join('')+'</div>';
cmEditor();render();
}
[['iLogo','logo'],['iTitle','title'],['iDate','date'],['iBody','body'],['iRep','rep']].forEach(function(p){$(p[0]).addEventListener('input',function(){S[p[1]]=this.value;render()})});
document.querySelector('.editor').addEventListener('input',function(e){var t=e.target;
if(t.dataset.r!=null){S.rx[t.dataset.r]=t.value;render()}
else if(t.dataset.k){S.cm[t.dataset.i][t.dataset.k]=t.value;render()}});
document.querySelector('.editor').addEventListener('click',function(e){var d=e.target.dataset.d;if(d!=null){S.cm.splice(d,1);cmEditor();render()}});
$('addC').onclick=function(){S.cm.push({id:'user****',t:'2026.09.03 13:00',x:''});cmEditor();render()};
var tabs=document.querySelectorAll('#seg button'),pns=document.querySelectorAll('.ps-pn');
tabs.forEach(function(b,i){b.onclick=function(){tabs.forEach(function(x,j){x.classList.toggle('on',i===j)});pns.forEach(function(p,j){p.hidden=i!==j})}});
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';fit()};
$('reset').onclick=function(){S=JSON.parse(JSON.stringify(DEF));fill()};
$('savePng').onclick=function(){var p=$('post'),old=p.style.transform;p.style.transform='none';
html2canvas(p,{scale:2,width:1600,height:900,backgroundColor:'#fff',useCORS:true}).then(function(c){p.style.transform=old;var a=document.createElement('a');a.download='naver-news.png';a.href=c.toDataURL('image/png');a.click()})};
window.addEventListener('resize',fit);fill();fit();
})();
