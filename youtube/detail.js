(function(){
var $=function(i){return document.getElementById(i)};
var DEF={time:'9:41',bat:'80',chg:false,
m:{gs:false,thRaw:'',th:'',n:'샘플 영상 제목입니다. 여기에 원하는 제목을 적어 주세요',h:'@samplechannel',lk:'4.3천개',vw:'1.2만회',time:'2시간 전',sub:'구독',pg:'20'},
c:{cnt:'350',x:'샘플 댓글입니다.\n여기에 원하는 댓글 내용을 적어 주세요.'},
u:{n:'다른 샘플 영상의 긴 제목 예시입니다',ch:'샘플 채널',bd:true,vw:'12만',time:'5시간 전',dur:'28:40',pg:'100'}};
var BD='<svg width="12" height="12" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#606060"/><path d="M13 6v7.200a2.600 2.600 0 1 0 1.500 2.300V9h3V6z" fill="#fff"/></svg>',
DOTS='<svg class="ddt" width="16" height="5" viewBox="0 0 16 5" fill="#0f0f0f"><circle cx="2.500" cy="2.500" r="2.300"/><circle cx="8" cy="2.500" r="2.300"/><circle cx="13.500" cy="2.500" r="2.300"/></svg>';
var S,STORE='editsoceur-youtube-detail-v2';
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('영상 세부 데이터 저장 실패',e)}}
function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function pc(v){v=parseFloat(v);return isNaN(v)?0:Math.max(0,Math.min(100,v))}
function bgi(u){return u?"background-image:url('"+u+"')":''}
var KEYC={};
function keyGreen(src,cb){
var im=new Image();im.onload=function(){var m=Math.min(1,900/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*m);c.height=Math.round(im.height*m);var x=c.getContext('2d');x.drawImage(im,0,0,c.width,c.height);try{var d=x.getImageData(0,0,c.width,c.height),p=d.data;for(var i=0;i<p.length;i+=4){var r=p[i],g=p[i+1],b=p[i+2];var df=g-Math.max(r,b);if(df>45)p[i+3]=0;else if(df>20)p[i+3]=Math.round(p[i+3]*(45-df)/25)}x.putImageData(d,0,0);cb(c.toDataURL('image/png'))}catch(e){cb(src)}};im.onerror=function(){cb(src)};im.src=src}
function buildTh(){var m=S.m;if(!m.thRaw){m.th='';return}if(!m.gs){m.th=m.thRaw;return}var k=m.thRaw;if(KEYC[k]){m.th=KEYC[k];return}keyGreen(k,function(d){KEYC[k]=d;S.m.th=d;persist();render()})}
function render(){
var m=S.m,p=pc(m.pg);
$('dV').style.cssText=bgi(m.th);
$('dPi').style.width=p+'%';$('dPu').style.left=p+'%';$('dPu').style.width=Math.min(7,100-p)+'%';
$('dN').textContent=m.n;$('dH').textContent=m.h;
$('dS').textContent='좋아요 '+m.lk+' · 조회수 '+m.vw+' · '+m.time;
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
if(e.type==='file')e.addEventListener('change',function(){if(e.files[0])rd(e.files[0],function(d){put(e.dataset.k,d);if(e.dataset.k==='m.thRaw')buildTh();persist();render()})});
else{var h=function(){put(e.dataset.k,e.type==='checkbox'?e.checked:e.value);if(e.dataset.k==='m.gs')buildTh();persist();render()};e.addEventListener('input',h);e.addEventListener('change',h)}});
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var saved=localStorage.getItem(STORE);S=saved?JSON.parse(saved):JSON.parse(JSON.stringify(DEF));if(!S||!S.m||!S.c||!S.u)throw new Error('invalid saved data')}catch(e){S=JSON.parse(JSON.stringify(DEF))}}if(S.m.th&&!S.m.thRaw)S.m.thRaw=S.m.th;buildTh();set();render()}
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas($('df'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);var n=new Date(),z=function(x,l){return String(x).padStart(l||2,'0')};a.download='youtube-detail-'+n.getFullYear()+z(n.getMonth()+1)+z(n.getDate())+'-'+z(n.getHours())+z(n.getMinutes())+z(n.getSeconds())+z(n.getMilliseconds(),3)+'.png';
document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
load(false);
})();
