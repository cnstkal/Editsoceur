(function(){
var $=function(i){return document.getElementById(i)};
var C={'#7289da':'블루','#43b581':'그린','#faa61a':'오렌지'};
var DEF={srv:'황야의 활잡이',txt:'황잡이',head:'메인',vc:'마이크켜',
m:[{n:'유저1',t:'오늘 오후 3:02',x:'안녕하세요',c:'#7289da'},{n:'유저2',t:'오늘 오후 3:03',x:'반가워요',c:'#43b581'},{n:'유저3',t:'오늘 오후 3:04',x:'오늘 뭐해요?',c:'#faa61a'},{n:'유저1',t:'오늘 오후 3:05',x:'게임이요',c:'#7289da'},{n:'유저3',t:'오늘 오후 3:06',x:'저도 할래요',c:'#faa61a'}]};
var S=JSON.parse(JSON.stringify(DEF));
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function render(){
$('vSrv').textContent=S.srv;$('vTxt').textContent=S.txt;$('vHead').textContent=S.head;$('vVc').textContent=S.vc;
$('vMsgs').innerHTML=S.m.map(function(m){return '<div class="m"><div class="av'+(m.p?' pic':'')+'" style="background:'+(m.p?'url('+m.p+') center/cover':m.c)+';--c:'+m.c+'"></div><div class="t"><div class="n">'+esc(m.n)+'<small>'+esc(m.t)+'</small></div><div class="x">'+esc(m.x)+'</div></div></div>'}).join('');
}
function list(){$('mList').innerHTML=S.m.map(function(m,i){return '<div class="ecard"><h3>메시지 '+(i+1)+'<button data-d="'+i+'" type="button">삭제</button></h3><div class="row"><label>이름<input data-k="n" data-i="'+i+'" value="'+esc(m.n)+'"></label><label>시간<input data-k="t" data-i="'+i+'" value="'+esc(m.t)+'"></label></div><label>프로필 색<select data-k="c" data-i="'+i+'">'+Object.keys(C).map(function(k){return '<option value="'+k+'"'+(k==m.c?' selected':'')+'>'+C[k]+'</option>'}).join('')+'</select></label><label>프로필 사진<input type="file" accept="image/*" data-f="p" data-i="'+i+'"></label>'+(m.p?'<img src="'+m.p+'" alt="" style="width:48px;height:48px;border-radius:50%;object-fit:cover">':'')+'<label>내용<textarea rows="2" data-k="x" data-i="'+i+'">'+esc(m.x)+'</textarea></label></div>'}).join('')}
var F=[['iSrv','srv'],['iTxt','txt'],['iHead','head'],['iVc','vc']];
function fill(){F.forEach(function(p){$(p[0]).value=S[p[1]]});list();render()}
F.forEach(function(p){$(p[0]).addEventListener('input',function(){S[p[1]]=this.value;render()})});
var ed=document.querySelector('.editor');
function ch(e){var t=e.target;if(t.dataset.f==='p'){var f=t.files[0];if(f){var r=new FileReader();r.onload=function(ev){S.m[t.dataset.i].p=ev.target.result;list();render()};r.readAsDataURL(f)}return}if(t.dataset.k){S.m[t.dataset.i][t.dataset.k]=t.value;render()}}
ed.addEventListener('input',ch);ed.addEventListener('change',ch);
ed.addEventListener('click',function(e){var d=e.target.dataset.d;if(d!=null){S.m.splice(d,1);list();render()}});
$('addM').onclick=function(){S.m.push({n:'유저',t:'오늘 오후 3:00',x:'',c:'#7289da'});list();render()};
var tabs=document.querySelectorAll('#seg button'),pns=document.querySelectorAll('.ps-pn');
tabs.forEach(function(b,i){b.onclick=function(){tabs.forEach(function(x,j){x.classList.toggle('on',i===j)});pns.forEach(function(p,j){p.hidden=i!==j})}});
function fit(){$('post').style.transform='scale('+$('fit').clientWidth/2576+')'}
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';fit()};
$('reset').onclick=function(){S=JSON.parse(JSON.stringify(DEF));fill()};
$('savePng').onclick=function(){var p=$('post'),o=p.style.transform;p.style.transform='none';
html2canvas(p,{scale:4,width:2576,height:1449,backgroundColor:'#313338'}).then(function(c){p.style.transform=o;var a=document.createElement('a');a.download='discord.png';a.href=c.toDataURL('image/png');a.click()})};
window.addEventListener('resize',fit);fill();fit();
})();
