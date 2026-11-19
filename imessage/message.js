(function(){
var $=function(i){return document.getElementById(i)};
var DEF={ratio:'phone',nm:'김민지',cnt:'681',time:'12:11',bat:'69',mode:'android',read:'읽음: 2026. 10. 29.',av:'',ic:'',m:[
{s:0,x:'리센느 인기준나많아....ㄹㅇ 인천 사람 다온듯',l:''},
{s:0,x:'ㄹㅇ 리센느가 방탄 경복궁보다 많음',l:''},
{s:1,x:'리센느나옴?그래서사람많구만',l:''},
{s:0,x:'광화문이다',l:''},
{s:0,x:'ㅇㅇ',l:''},
{s:1,x:'지금 친구들과 WeChat 채팅을 하고 있습니다! 전 세계에 10억 명 넘는 사용자가 WeChat을 사용합니다. http://wechat.com/dl/HMWidP18GIc%3D에서 지금 다운로드한 후 WeChat ID wxid_s7660vkm68eh12을(를) 통해 저를 추가해 주세요',l:'10월 29일 (목) 오후 10:44'}]};
var S,STORE='editsoceur-imessage-v1';
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('저장 실패',e)}}
function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function bgi(u){return u?"url('"+u+"')":''}
function lk(t){return esc(t).replace(/(https?:\/\/[^\s<>가-힣]+)/g,'<u>$1</u>')}
function render(){
$('mCnt').textContent=S.cnt;$('mNm').textContent=S.nm;
var av=$('mAv');av.style.backgroundImage=bgi(S.av);av.textContent=S.av?'':String(S.nm).charAt(0);
$('mf').classList.toggle('ios',S.mode==='ios');$('mf').style.aspectRatio={'16:9':'16/9','4:3':'4/3'}[S.ratio]||'1179/2556';
$('mPh').textContent=S.mode==='ios'?'iMessage':'문자 메시지 · RCS';
var h='',n=S.m.length;
S.m.forEach(function(x,i){var nx=S.m[i+1],t=!nx||+nx.s!==+x.s||nx.l;
if(x.l){var mm=String(x.l).match(/^(.+\))\s+(.+)$/);h+='<div class="tm">'+(mm?'<b>'+esc(mm[1])+'</b> '+esc(mm[2]):esc(x.l))+'</div>'}
h+='<div class="b '+(+x.s?'r':'l')+(t?' t':'')+'">'+(x.im?'<img class="ci" src="'+x.im+'" alt="">':'')+(x.x?lk(x.x):'')+'</div>'});
var last=S.m[n-1];if(last&&+last.s&&S.read)h+='<div class="rd">'+esc(S.read)+'</div>';
$('mL').innerHTML=h}
function list(){var h='';S.m.forEach(function(x,i){
h+='<div class="mc" data-i="'+i+'"><div class="row"><label>보낸 사람<select data-f="s"><option value="0"'+(+x.s?'':' selected')+'>상대 (받음)</option><option value="1"'+(+x.s?' selected':'')+'>나 (보냄)</option></select></label><label>시간 라벨(위에 표시)<input data-f="l" value="'+esc(x.l)+'"></label></div>'+
'<label>내용<textarea data-f="x" rows="3">'+esc(x.x)+'</textarea></label>'+'<label>사진 첨부<input type="file" accept="image/*" data-f="im"></label>'+(x.im?'<img class="ci" src="'+x.im+'" alt="" style="max-width:120px;border-radius:10px">':'')+
'<div class="row"><button type="button" class="mb" data-a="u">↑</button><button type="button" class="mb" data-a="d">↓</button><button type="button" class="mb" data-a="x">✕ 삭제</button></div></div>'});
$('mlist').innerHTML=h}
function set(){$('iRatio').value=S.ratio||'phone';$('iNm').value=S.nm;$('iCnt').value=S.cnt;$('iMode').value=S.mode;$('iRead').value=S.read}
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var sv=localStorage.getItem(STORE);S=sv?JSON.parse(sv):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.m))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}set();list();render()}
function rd(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
function glob(){S.ratio=$('iRatio').value;S.nm=$('iNm').value;S.cnt=$('iCnt').value;S.mode=$('iMode').value;S.read=$('iRead').value;persist();render()}
['iRatio','iNm','iCnt','iMode','iRead'].forEach(function(id){$(id).addEventListener('input',glob);$(id).addEventListener('change',glob)});
$('iAv').addEventListener('change',function(e){var f=e.target.files[0];if(f)rd(f,function(d){S.av=d;persist();render()})});
var L=$('mlist'),ix=function(e){return +e.target.closest('.mc').dataset.i};
function ed(e){var f=e.target.dataset.f;if(!f||f==='im')return;S.m[ix(e)][f]=f==='s'?+e.target.value:e.target.value;persist();render()}
L.addEventListener('input',ed);L.addEventListener('change',ed);
L.addEventListener('change',function(e){var t=e.target;if(t.dataset.f!=='im'||!t.files[0])return;var i=ix(e);rd(t.files[0],function(d){S.m[i].im=d;persist();list();render()})});
L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.m;
if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
persist();list();render()});
$('addM').onclick=function(){var l=S.m[S.m.length-1];S.m.push({s:l?+l.s:0,x:'',l:''});persist();list();render()};
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas($('mf'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='imessage.png';
document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
document.addEventListener('dblclick',function(e){e.preventDefault()},{passive:false});
load(false);
})();

