(function(){
var $=function(i){return document.getElementById(i)};
var DEF={t:'보관함',n:'19,305개의 항목',tab:'0',cut:true,nav:true,r:'phone',p:[]};
var S,STORE='editsoceur-photos-v1';
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('저장 공간 부족 — 사진 일부가 새로고침 시 사라질 수 있어요',e)}}
function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function bg(u){return "background-image:url('"+u+"')"}
function render(){
var w=S.r==='16:9';$('pf').classList.toggle('wide',w);document.querySelector('.phone').classList.toggle('wide',w);
$('pT').textContent='보관함';$('pN').textContent=S.n;
$('bottomTabs').style.display=S.nav?'flex':'none';
$('pA').classList.toggle('on',S.tab==='0');$('pB').classList.toggle('on',S.tab==='1');
var h='';if(!S.p.length){for(var q=0;q<(w?28:18);q++)h+='<i class="ph"></i>'}else S.p.forEach(function(u){h+='<i style="'+bg(u)+'"></i>'});

$('pG').innerHTML=h}
function list(){var h='';S.p.forEach(function(u,i){h+='<div class="pk" data-i="'+i+'"><i style="'+bg(u)+'"></i><span class="grip">⠿</span><button type="button" data-a="u">↑</button><button type="button" data-a="d">↓</button><button type="button" data-a="x">✕</button></div>'});$('plist').innerHTML=h}
function set(){$('iR').value=S.r||'phone';$('iN').value=S.n;$('iTab').value=S.tab;$('iNav').checked=!!S.nav}
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var sv=localStorage.getItem(STORE);S=sv?JSON.parse(sv):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.p))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}set();list();render()}
function glob(){S.t='보관함';S.r=$('iR').value;S.n=$('iN').value;S.tab=$('iTab').value;S.nav=$('iNav').checked;persist();render()}
['iR','iN','iTab','iNav'].forEach(function(id){$(id).addEventListener('input',glob);$(id).addEventListener('change',glob)});
function shrink(f){return new Promise(function(ok){var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var m=6000,k=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*k));c.height=Math.max(1,Math.round(im.height*k));var x=c.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(im,0,0,c.width,c.height);ok(c.toDataURL('image/jpeg',.98))};im.onerror=function(){ok(null)};im.src=r.result};r.onerror=function(){ok(null)};r.readAsDataURL(f)})}
$('iP').addEventListener('change',function(e){var fs=Array.prototype.slice.call(e.target.files);if(!fs.length)return;
Promise.all(fs.map(shrink)).then(function(a){a.forEach(function(u){if(u)S.p.push(u)});e.target.value='';persist();list();render()})});
$('plist').addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=+e.target.closest('.pk').dataset.i,m=S.p;
if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
persist();list();render()});
$('reset').onclick=function(){load(true)};
(function(){
var pl=$('plist'),timer=null,sx=0,sy=0,drag=null;
function clr(){clearTimeout(timer);timer=null}
pl.addEventListener('pointerdown',function(e){
  if(e.target.closest('button'))return;
  var row=e.target.closest('.pk');if(!row)return;
  sx=e.clientX;sy=e.clientY;clr();
  timer=setTimeout(function(){
    timer=null;drag={i:+row.dataset.i};row.classList.add('drag');
    try{pl.setPointerCapture(e.pointerId)}catch(_){}
    if(navigator.vibrate)navigator.vibrate(15);
  },350);
});
pl.addEventListener('pointermove',function(e){
  if(!drag){if(timer&&Math.hypot(e.clientX-sx,e.clientY-sy)>8)clr();return}
  var under=document.elementFromPoint(e.clientX,e.clientY);
  var r=under&&under.closest&&under.closest('.pk');if(!r||!pl.contains(r))return;
  var j=+r.dataset.i;if(j===drag.i)return;
  var m=S.p,v=m.splice(drag.i,1)[0];m.splice(j,0,v);drag.i=j;
  list();render();
  var el=pl.querySelector('.pk[data-i="'+j+'"]');if(el)el.classList.add('drag');
});
function end(){clr();if(drag){drag=null;persist();list();render()}}
pl.addEventListener('pointerup',end);
pl.addEventListener('pointercancel',end);
pl.addEventListener('touchmove',function(e){if(drag)e.preventDefault()},{passive:false});
pl.addEventListener('contextmenu',function(e){if(drag||timer)e.preventDefault()});
})();
function stamp(){var d=new Date(),p=function(n){return String(n).padStart(2,'0')};return d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+'-'+p(d.getHours())+p(d.getMinutes())+p(d.getSeconds())+'-'+String(d.getMilliseconds()).padStart(3,'0')}
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
var el=$('pf'),w=el.getBoundingClientRect().width,h=el.getBoundingClientRect().height;
// 목표: 가로 3840px 이상(고화질), 단 브라우저 캔버스 한계(약 1600만 px)를 넘지 않도록 제한
var k=Math.max(4,3840/w);k=Math.min(k,Math.sqrt(16000000/(w*h)));
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas(el,{scale:k,useCORS:true,backgroundColor:'#fff',logging:false,imageTimeout:0})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a'),u=URL.createObjectURL(bl);a.href=u;a.download=(S.r==='16:9'?'photos-16x9_':'photos_')+stamp()+'.png';
document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},1000);b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
document.addEventListener('dblclick',function(e){e.preventDefault()},{passive:false});
load(false);
})();
