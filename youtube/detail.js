(function(){
var $=function(i){return document.getElementById(i)};
var DEF={time:'9:41',bat:'80',chg:false,
m:{n:'샘플 영상 제목입니다. 여기에 원하는 제목을 적어 주세요',h:'@samplechannel',lk:'4.3천개',vw:'1.2만회',time:'2시간 전',sub:'구독',pg:'20'},
c:{cnt:'350',x:'샘플 댓글입니다.\n여기에 원하는 댓글 내용을 적어 주세요.'},
u:{n:'다른 샘플 영상의 긴 제목 예시입니다',ch:'샘플 채널',bd:true,vw:'12만',time:'5시간 전',dur:'28:40',pg:'100'}};
var BD='<svg width="12" height="12" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#606060"/><path d="M13 6v7.200a2.600 2.600 0 1 0 1.500 2.300V9h3V6z" fill="#fff"/></svg>',
DOTS='<svg class="ddt" width="16" height="5" viewBox="0 0 16 5" fill="#0f0f0f"><circle cx="2.500" cy="2.500" r="2.300"/><circle cx="8" cy="2.500" r="2.300"/><circle cx="13.500" cy="2.500" r="2.300"/></svg>';
var S,STORE='editsoceur-youtube-detail-v2';
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('영상 세부 데이터 저장 실패',e)}}
function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function pc(v){v=parseFloat(v);return isNaN(v)?0:Math.max(0,Math.min(100,v))}
function bgi(u){return u?"background-image:url('"+u+"')":''}
function render(){
$('dTime').textContent=S.time;
var b=pc(S.bat);$('dBf').style.width=b+'%';$('dBt').textContent=Math.round(b);$('dBz').style.display=S.chg?'':'none';
var m=S.m,p=pc(m.pg);
$('dV').style.cssText=bgi(m.th);
$('dPi').style.width=p+'%';$('dPu').style.left=p+'%';$('dPu').style.width=Math.min(7,100-p)+'%';
$('dN').textContent=m.n;$('dH').textContent=m.h;
$('dS').textContent='좋아요 '+m.lk+' 조회수 '+m.vw+' '+m.time;
$('dA0').style.cssText=bgi(m.av);$('dSb').textContent=m.sub;
$('dCn').textContent=S.c.cnt;$('dCx').textContent=S.c.x;$('dCa').style.cssText=bgi(S.c.av);
var u=S.u;
$('dL').innerHTML='<div class="dcd"><div class="dth" style="'+bgi(u.th)+'">'+(u.dur?'<div class="dur">'+esc(u.dur)+'</div>':'')+'<div class="dpb"><i style="width:'+pc(u.pg)+'%"></i></div></div><div class="dif"><i class="dav" style="'+bgi(u.av)+'"></i><div class="dtx"><div class="dtt">'+esc(u.n)+'</div><div class="dmt">'+esc(u.ch)+(u.bd?BD:'')+'<span>▷'+esc(u.vw)+'</span><span>'+esc(u.time)+'</span></div></div></div>'+DOTS+'</div>'}
function get(p){return p.split('.').reduce(function(o,k){return o&&o[k]},S)}
function put(p,v){var a=p.split('.'),l=a.pop();a.reduce(function(o,k){return o[k]},S)[l]=v}
var els=[].slice.call(document.querySelectorAll('[data-k]'));
function set(){els.forEach(function(e){if(e.type==='file')return;var v=get(e.dataset.k);if(e.type==='checkbox')e.checked=!!v;else e.value=v==null?'':v})}
function rd(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
els.forEach(function(e){
if(e.type==='file')e.addEventListener('change',function(){if(e.files[0])rd(e.files[0],function(d){put(e.dataset.k,d);persist();render()})});
else{var h=function(){put(e.dataset.k,e.type==='checkbox'?e.checked:e.value);persist();render()};e.addEventListener('input',h);e.addEventListener('change',h)}});
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var saved=localStorage.getItem(STORE);S=saved?JSON.parse(saved):JSON.parse(JSON.stringify(DEF));if(!S||!S.m||!S.c||!S.u)throw new Error('invalid saved data')}catch(e){S=JSON.parse(JSON.stringify(DEF))}}set();render()}
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas($('df'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='youtube-detail.png';
document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
load(false);
})();
