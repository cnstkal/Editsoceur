(function(){
var $=function(i){return document.getElementById(i)};
var P=function(t,x,c,tm){return{t:t,x:x,c:c,tm:tm,a:'익명'}};
var DEF={tm:'12:43',bt:'72',bd:'자유게시판',sc:'숭의여대',p:[P('채플 억울하게 결석처리 되어 본 사람','제발','1','40분 전'),P('Ai 과제','아니 미루고 미루다 이제 진짜 하려고 들어가니까 교안 비밀번호 또 있던데 앞으로 지난주처럼...','1','50분 전'),P('오사카 여행','각자 제일 재밌는 거 뭐였어?\n아님 젤 맛있었던 음식?','5','11/15'),P('하','번아웃 올거같다','','11/15'),P('하치와례 좋아하는 사람','ㅈㄱㄴ','','11/15')]};
var G=[['iTm','tm'],['iBt','bt'],['iBd','bd'],['iSc','sc']];
var S,STORE='editsoceur-everytime-board-v1';
var IC='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#44bec5" stroke-width="2.300" stroke-linejoin="round"><path d="M12 3a8.500 8.500 0 1 1-4 16l-4.500 1.200L4.800 16A8.500 8.500 0 0 1 12 3z"/></svg>';
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('저장 실패',e)}}
function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function render(){
$('eTm').textContent=S.tm;$('eBn').textContent=S.bt;$('eBu').style.width=(+S.bt||0)+'%';$('eBd').textContent=S.bd;$('eSc').textContent=S.sc;
var h='';S.p.forEach(function(x){if(x.b){h+='<div class="ep bk"></div>';return}
h+='<div class="ep"><b>'+esc(x.t)+'</b><p>'+esc(x.x)+'</p><div class="em">'+(x.c?IC+'<i>'+esc(x.c)+'</i><u></u>':'')+esc(x.tm)+'<u></u>'+esc(x.a)+'</div></div>'});
$('eL').innerHTML=h}
function list(){var h='';S.p.forEach(function(x,i){
h+='<div class="xc" data-i="'+i+'">'+(x.b?'<label>빈 칸(광고 자리)</label>':'<label>제목<input data-f="t" value="'+esc(x.t)+'"></label><label>내용<textarea data-f="x" rows="2">'+esc(x.x)+'</textarea></label><div class="row"><label>댓글<input data-f="c" value="'+esc(x.c)+'"></label><label>시간<input data-f="tm" value="'+esc(x.tm)+'"></label><label>작성자<input data-f="a" value="'+esc(x.a)+'"></label></div>')+
'<div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'});
$('elist').innerHTML=h}
function set(){G.forEach(function(p){$(p[0]).value=S[p[1]]})}
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var s=localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.p))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}set();list();render()}
G.forEach(function(p){$(p[0]).addEventListener('input',function(){S[p[1]]=this.value;persist();render()})});
var L=$('elist'),ix=function(e){return +e.target.closest('.xc').dataset.i};
L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f)return;S.p[ix(e)][f]=e.target.value;persist();render()});
L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.p;
if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
persist();list();render()});
$('addP').onclick=function(){S.p.push({t:'',x:'',c:'',tm:'방금',a:'익명'});persist();list();render()};
$('addB').onclick=function(){S.p.push({b:1});persist();list();render()};
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas($('ef'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='everytime-board.png';
document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
load(false);
})();
