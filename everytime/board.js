(function(){
var $=function(i){return document.getElementById(i)};
var P=function(t,x,c,tm){return{t:t,x:x,c:c,tm:tm,a:'익명'}};
var DEF={tm:'12:43',bt:'72',bd:'자유게시판',sc:'한빛대학교',p:[P('주말에 같이 영화 볼 사람','이번 주 토요일 오후에 시간 되는 분 계신가요? 팝콘은 제가 살게요','2','20분 전'),P('학식 메뉴 추천','오늘 돈까스 괜찮았나요? 다음 주 메뉴 궁금해요','4','1시간 전'),P('사진 동아리 신입 모집','가을 풍경 찍는 게 취미인 분 환영합니다. 관심 있으면 댓글 주세요!','','11/15'),P('과제 제출 기한 연장되나요','교수님께 메일 보내봤는데 아직 답장이 없네요','','11/15'),P('도서관 자리 팁','3층 열람실이 제일 조용하고 콘센트도 많아요','3','11/14')]};
var G=[['iTm','tm'],['iBt','bt'],['iBd','bd'],['iSc','sc']];
function pick(a){return a[Math.floor(Math.random()*a.length)]}
var S,STORE='editsoceur-everytime-board-v2';
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
var _TI=['오늘 날씨 진짜 좋다', '시험 범위 어디까지예요?', '점심 뭐 먹지', '과제 제출 기한 연장됐나요?', '동아리 모집 공고', '자리 있으면 같이 앉아도 될까요?'];var _BD=['다들 어떻게 생각하세요?', '저도 같은 경험 있어요ㅋㅋ', '정보 아시는 분 댓글 부탁드려요!', '요즘 학교 분위기 진짜 좋은 것 같아요.', '이거 어디서 사셨어요?', '내일 같이 가실 분 구해요~'];
$('addP').onclick=function(){S.p.push({t:pick(_TI),x:pick(_BD),c:String(Math.floor(Math.random()*9)),tm:'방금',a:'익명'});persist();list();render()};

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
