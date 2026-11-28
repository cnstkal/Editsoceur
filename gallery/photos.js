(function(){
var $=function(i){return document.getElementById(i)};
var DEF={t:'보관함',n:'19,305개의 항목',tab:'0',cut:true,nav:true,r:'phone',cols:7,p:[],fav:{}};
var S,STORE='editsoceur-photos-v1';
var SRC={};                       // 사진 id -> 화면에 쓰는 blob URL
/* ---------- 저장: 메타데이터는 localStorage, 사진 원본은 IndexedDB ---------- */
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('저장 실패',e)}}
function db(){return new Promise(function(ok,no){var r=indexedDB.open('editsoceur-photos-db',1);r.onupgradeneeded=function(){r.result.createObjectStore('imgs')};r.onsuccess=function(){ok(r.result)};r.onerror=function(){no(r.error)}})}
function idb(mode,fn){return db().then(function(d){return new Promise(function(ok,no){var t=d.transaction('imgs',mode),s=t.objectStore('imgs');var q=fn(s);t.oncomplete=function(){d.close();ok(q?q.result:undefined)};t.onerror=function(){d.close();no(t.error)}})})}
function newId(){return 'p'+Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
function putImg(id,blob){SRC[id]=URL.createObjectURL(blob);return idb('readwrite',function(s){return s.put(blob,id)})}
function delImg(id){if(SRC[id]){URL.revokeObjectURL(SRC[id]);delete SRC[id]}return idb('readwrite',function(s){return s.delete(id)}).catch(function(){})}
function loadImgs(){return Promise.all(S.p.map(function(id){return idb('readonly',function(s){return s.get(id)}).then(function(b){if(b&&!SRC[id])SRC[id]=URL.createObjectURL(b)}).catch(function(){})}))}
/* 예전 방식(localStorage에 긴 데이터 주소로 저장된 사진)을 새 방식으로 옮기기 */
function migrate(){
  var legacy=S.p.filter(function(u){return typeof u==='string'&&u.indexOf('data:')===0});
  if(!legacy.length)return Promise.resolve();
  return Promise.all(legacy.map(function(u){return fetch(u).then(function(r){return r.blob()}).then(function(b){var id=newId();if(S.fav&&S.fav[u.length+':'+u.slice(200,260)+u.slice(-60)]){S.fav[id]=1}return putImg(id,b).then(function(){return [u,id]})})}))
  .then(function(pairs){var map={};pairs.forEach(function(p){map[p[0]]=p[1]});S.p=S.p.map(function(u){return map[u]||u});persist()})
}
function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function bg(id){return "background-image:url('"+(SRC[id]||'')+"')"}
var HEART='<svg class="fv" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.2l-1.45-1.32C5.4 15.14 2 12.06 2 8.28 2 5.2 4.42 2.8 7.5 2.8c1.74 0 3.41.81 4.5 2.09C13.09 3.61 14.76 2.8 16.5 2.8 19.58 2.8 22 5.2 22 8.28c0 3.78-3.4 6.86-8.55 11.54L12 21.2z" fill="#fff"/></svg>';
function isFav(id){return !!(S.fav&&S.fav[id])}
var selIdx=null;
function moveTo(from,to){var m=S.p,v=m.splice(from,1)[0];m.splice(to,0,v);persist()}
$('pG').addEventListener('click',function(e){
  var c=e.target.closest('i[data-i]');if(!c)return;
  var n=+c.dataset.i;
  if(selIdx===null){selIdx=n}
  else if(selIdx===n){selIdx=null}
  else{moveTo(selIdx,n);selIdx=null;list()}
  render();
});
function render(){
var w=S.r==='16:9';$('pG').style.gridTemplateColumns=w?'repeat('+(S.cols||7)+',1fr)':'';$('pf').classList.toggle('wide',w);document.querySelector('.phone').classList.toggle('wide',w);
$('pT').textContent='보관함';$('pN').textContent=S.n;
$('bottomTabs').style.display=S.nav?'flex':'none';
$('pA').classList.toggle('on',S.tab==='0');$('pB').classList.toggle('on',S.tab==='1');
var h='';if(!S.p.length){for(var q=0;q<(w?28:18);q++)h+='<i class="ph"></i>'}else S.p.forEach(function(id,n){h+='<i data-i="'+n+'" class="'+(n===selIdx?'sel':'')+'" style="'+bg(id)+'">'+(isFav(id)?HEART:'')+'</i>'});
$('pG').innerHTML=h}
function list(){var h='';S.p.forEach(function(id,i){h+='<div class="pk" data-i="'+i+'"><i style="'+bg(id)+'"></i><span class="grip">⠿</span><button type="button" data-a="f" class="fb'+(isFav(id)?' on':'')+'">'+(isFav(id)?'♥':'♡')+'</button><button type="button" data-a="u">↑</button><button type="button" data-a="d">↓</button><button type="button" data-a="x">✕</button></div>'});$('plist').innerHTML=h}
function set(){$('iR').value=S.r||'phone';$('iC').value=String(S.cols||7);$('iN').value=S.n;$('iTab').value=S.tab;$('iNav').checked=!!S.nav;$('rTab').style.display=S.nav?'':'none'}
function load(reset){
  if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF));
    Object.keys(SRC).forEach(function(k){URL.revokeObjectURL(SRC[k]);delete SRC[k]});
    idb('readwrite',function(s){return s.clear()}).catch(function(){});
    set();list();render();return}
  try{var sv=localStorage.getItem(STORE);S=sv?JSON.parse(sv):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.p))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}
  if(!S.fav)S.fav={};
  set();list();render();
  migrate().then(loadImgs).then(function(){list();render()}).catch(function(){});
}
function glob(){S.t='보관함';S.r=$('iR').value;S.cols=+$('iC').value;S.n=$('iN').value;S.tab=$('iTab').value;S.nav=$('iNav').checked;$('rTab').style.display=S.nav?'':'none';persist();render()}
['iR','iC','iN','iTab','iNav'].forEach(function(id){$(id).addEventListener('input',glob);$(id).addEventListener('change',glob)});
/* 업로드: 최대 6000px로 줄이고 JPEG blob으로 만들기 */
function shrink(f){return new Promise(function(ok){var u=URL.createObjectURL(f);var im=new Image();im.onload=function(){var m=6000,k=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*k));c.height=Math.max(1,Math.round(im.height*k));var x=c.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(im,0,0,c.width,c.height);c.toBlob(function(b){URL.revokeObjectURL(u);ok(b)},'image/jpeg',.98)};im.onerror=function(){URL.revokeObjectURL(u);ok(null)};im.src=u})}
$('iP').addEventListener('change',function(e){var fs=Array.prototype.slice.call(e.target.files);if(!fs.length)return;
Promise.all(fs.map(shrink)).then(function(blobs){
  return blobs.reduce(function(p,b){return p.then(function(){if(!b)return;var id=newId();return putImg(id,b).then(function(){S.p.push(id)})})},Promise.resolve())
}).then(function(){e.target.value='';persist();list();render()}).catch(function(){alert('사진 저장에 실패했습니다.')})});
$('plist').addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=+e.target.closest('.pk').dataset.i,m=S.p,id=m[i];
if(a==='f'){S.fav=S.fav||{};if(S.fav[id])delete S.fav[id];else S.fav[id]=1;persist();list();render();return}
if(a==='x'){delete (S.fav=S.fav||{})[id];m.splice(i,1);delImg(id)}else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
persist();list();render()});
$('reset').onclick=function(){load(true)};
(function(){
var pl=$('plist'),timer=null,sx=0,sy=0,drag=null,armRow=null,armId=null,armMouse=false;
function clr(){clearTimeout(timer);timer=null}
function start(row,id){
  drag={i:+row.dataset.i};row.classList.add('drag');armRow=null;
  try{pl.setPointerCapture(id)}catch(_){}
  if(navigator.vibrate)navigator.vibrate(15);
}
pl.addEventListener('pointerdown',function(e){
  if(e.button!==0||e.target.closest('button'))return;
  var row=e.target.closest('.pk');if(!row)return;
  sx=e.clientX;sy=e.clientY;clr();armRow=row;armId=e.pointerId;armMouse=e.pointerType==='mouse';
  if(!armMouse){timer=setTimeout(function(){timer=null;if(armRow)start(armRow,armId)},350)}
});
pl.addEventListener('pointermove',function(e){
  if(!drag){
    if(!armRow)return;
    var d=Math.hypot(e.clientX-sx,e.clientY-sy);
    if(armMouse&&d>4)start(armRow,armId);      // PC: 누른 채 움직이면 바로 드래그
    else if(!armMouse&&timer&&d>8)clr();      // 모바일: 길게 누르기 전 움직이면 취소(스크롤)
    if(!drag)return;
  }
  var under=document.elementFromPoint(e.clientX,e.clientY);
  var r=under&&under.closest&&under.closest('.pk');if(!r||!pl.contains(r))return;
  var j=+r.dataset.i;if(j===drag.i)return;
  var m=S.p,v=m.splice(drag.i,1)[0];m.splice(j,0,v);drag.i=j;
  list();render();
  var el=pl.querySelector('.pk[data-i="'+j+'"]');if(el)el.classList.add('drag');
});
function end(){clr();armRow=null;if(drag){drag=null;persist();list();render()}}
pl.addEventListener('pointerup',end);
pl.addEventListener('pointercancel',end);
pl.addEventListener('touchmove',function(e){if(drag)e.preventDefault()},{passive:false});
pl.addEventListener('contextmenu',function(e){if(drag||timer)e.preventDefault()});
})();
function stamp(){var d=new Date(),p=function(n){return String(n).padStart(2,'0')};return d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+'-'+p(d.getHours())+p(d.getMinutes())+p(d.getSeconds())+'-'+String(d.getMilliseconds()).padStart(3,'0')}
$('savePng').onclick=function(){var btn=this,t=btn.textContent;btn.disabled=true;btn.textContent='저장 중...';
var el=$('pf'),R=el.getBoundingClientRect(),w=R.width,h=R.height;
// 목표: 가로 3840px 이상, 브라우저 캔버스 한계(약 1600만 px) 안에서 자동 조절
var k=Math.max(4,3840/w);k=Math.min(k,Math.sqrt(16000000/(w*h)));
var cells=[].slice.call($('pG').querySelectorAll('i')).map(function(i){
  var m=/url\(["']?(.*?)["']?\)/.exec(i.style.backgroundImage||'');
  return m?{src:m[1],r:i.getBoundingClientRect(),st:i.getAttribute('style')}:null}).filter(Boolean);
// 1) 사진을 잠시 빼고 글자·버튼·배경만 캡처
var cellEls=[].slice.call($('pG').querySelectorAll('i'));var saved=cellEls.map(function(i){return i.getAttribute('style')});
cellEls.forEach(function(i){i.style.backgroundImage='none';i.style.background='transparent'});
var base;
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
  return html2canvas(el,{scale:k,useCORS:true,backgroundColor:'#fff',logging:false,imageTimeout:0})
}).then(function(c){
  base=c;
  // 2) 원본 사진을 캔버스에 직접 그리기 (리샘플링 품질 최대, 원본 해상도 유지)
  return Promise.all(cells.map(function(cell){return new Promise(function(ok){var im=new Image();im.onload=function(){ok({im:im,cell:cell})};im.onerror=function(){ok(null)};im.src=cell.src})}));
}).then(function(list){
  var out=document.createElement('canvas');out.width=base.width;out.height=base.height;
  var x=out.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';
  x.drawImage(base,0,0);
  list.forEach(function(it,n){if(!it)return;var cell=it.cell,im=it.im,cw=cell.r.width*k,ch=cell.r.height*k;
    var dx=(cell.r.left-R.left)*k,dy=(cell.r.top-R.top)*k;
    var sc=Math.max(cw/im.naturalWidth,ch/im.naturalHeight),sw=cw/sc,sh=ch/sc,sx=(im.naturalWidth-sw)/2,sy=(im.naturalHeight-sh)/2;
    x.drawImage(im,sx,sy,sw,sh,dx,dy,cw,ch)});
  return new Promise(function(ok){out.toBlob(ok,'image/png')});
}).then(function(bl){
  cellEls.forEach(function(i,n){i.setAttribute('style',saved[n]||'')});
  var a=document.createElement('a'),u=URL.createObjectURL(bl);a.href=u;
  a.download=(S.r==='16:9'?'photos-16x9_':'photos_')+stamp()+'.png';
  document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},1000);
  btn.disabled=false;btn.textContent=t;
}).catch(function(err){
  cellEls.forEach(function(i,n){i.setAttribute('style',saved[n]||'')});
  btn.disabled=false;btn.textContent=t;console.error(err);alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
document.addEventListener('dblclick',function(e){e.preventDefault()},{passive:false});
load(false);
})();
