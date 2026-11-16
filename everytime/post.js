(function(){
var $=function(i){return document.getElementById(i)};
var DEF={tm:'12:46',bt:'72',bd:'자유게시판',sc:'한빛대학교',nm:'익명',pt:'11/15 21:44',cn:'3',ti:'과제 제출 기한 연장되나요',by:'교수님께 메일 보내봤는데 아직 답장이 없네요. 혹시 공지 떴나요?',
c:[{n:'익명1',x:'저도 같은 과목 듣는데 아직 아무 공지도 없어요',tm:'11/15 22:13'},{n:'익명(글쓴이)',x:'헐 그럼 조금 더 기다려봐야겠네요',tm:'11/15 22:43',r:1,w:1},{n:'익명2',x:'수업 시간에 말씀 안 하셨으면 다음 주에 다시 물어보는 게 나을 듯해요',tm:'11/15 22:45',r:1}]};
var G=[['iTm','tm'],['iBt','bt'],['iBd','bd'],['iSc','sc'],['iNm','nm'],['iPt','pt'],['iCn','cn'],['iTi','ti'],['iBy','by']];
var S,STORE='editsoceur-everytime-post-v2';
var BU='<svg class="b" width="14" height="14" viewBox="0 0 24 24"><path d="M12 2.500a9.500 9 0 1 1-4.300 17L3 21l1.600-4.300A9 9 0 0 1 12 2.500z"/></svg><u style="margin:0 12px 0 11px"></u>',
TH='<svg width="12" height="12" viewBox="0 0 24 24"><path d="M2 10h4v12H2zM8 11l4-8a2.500 2.500 0 0 1 2.500 3L14 9.500h6a2 2 0 0 1 2 2.400l-1.600 8A2 2 0 0 1 18.400 22H8z"/></svg><u style="margin:0 16.750px 0 12px"></u><i class="d"><s></s><s></s><s></s></i>',
AR='<svg class="ra" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#c4c4c4" stroke-width="1.300" stroke-linecap="round" stroke-linejoin="round"><path d="M2 1v9h10M8 6l4 4-4 4"/></svg>';
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('저장 실패',e)}}
function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function body(x,r){return '<div class="cr"><i class="av s"></i><b'+(x.w?' class="w"':'')+'>'+esc(x.n)+'</b><div class="pl">'+(r?'':BU)+TH+'</div></div><div class="cb">'+esc(x.x)+'</div><div class="ct">'+esc(x.tm)+'</div>'}
function render(){
$('eTm').textContent=S.tm;$('eBn').textContent=S.bt;$('eBu').style.width=(+S.bt||0)+'%';$('eBd').textContent=S.bd;$('eSc').textContent=S.sc;
$('pNm').textContent=S.nm;$('pTm').textContent=S.pt;$('pCn').textContent=S.cn;$('pTi').textContent=S.ti;$('pBd').textContent=S.by;
var h='',o=0;S.c.forEach(function(x){
if(x.r&&o)h+='<div class="rp">'+AR+body(x,1)+'</div>';
else{if(o)h+='</div>';h+='<div class="cm">'+body(x,0);o=1}});
$('pL').innerHTML=h+(o?'</div>':'')}
function list(){var h='';S.c.forEach(function(x,i){
h+='<div class="xc" data-i="'+i+'"><div class="row"><label>작성자<input data-f="n" value="'+esc(x.n)+'"></label><label>시간<input data-f="tm" value="'+esc(x.tm)+'"></label></div><label>내용<input data-f="x" value="'+esc(x.x)+'"></label><div class="row"><label class="xk"><input type="checkbox" data-f="r"'+(x.r?' checked':'')+'> 대댓글</label><label class="xk"><input type="checkbox" data-f="w"'+(x.w?' checked':'')+'> 글쓴이 색</label></div>'+
'<div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'});
$('clist').innerHTML=h}
function set(){G.forEach(function(p){$(p[0]).value=S[p[1]]})}
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var s=localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.c))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}set();list();render()}
G.forEach(function(p){$(p[0]).addEventListener('input',function(){S[p[1]]=this.value;persist();render()})});
var L=$('clist'),ix=function(e){return +e.target.closest('.xc').dataset.i};
L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||e.target.type==='checkbox')return;S.c[ix(e)][f]=e.target.value;persist();render()});
L.addEventListener('change',function(e){var t=e.target,f=t.dataset.f;if(t.type==='checkbox'&&f){S.c[ix(e)][f]=t.checked?1:0;persist();render()}});
L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.c;
if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
persist();list();render()});
$('addC').onclick=function(){S.c.push({n:'익명'+(S.c.length+1),x:'',tm:'11/15 23:00'});persist();list();render()};
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas($('pf'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='everytime-post.png';
document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
load(false);
})();
