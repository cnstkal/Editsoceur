(function(){
var $=function(i){return document.getElementById(i)};
var DEF={t:'보관함',n:'19,305개의 항목',tab:'0',cut:true,nav:true,p:[]};
var S,STORE='editsoceur-photos-v1';
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('저장 공간 부족 — 사진 일부가 새로고침 시 사라질 수 있어요',e)}}
function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function bg(u){return "background-image:url('"+u+"')"}
function render(){
$('pT').textContent='보관함';$('pN').textContent=S.n;
$('bottomTabs').style.display=S.nav?'flex':'none';
$('pA').classList.toggle('on',S.tab==='0');$('pB').classList.toggle('on',S.tab==='1');
var h='';if(!S.p.length){for(var q=0;q<18;q++)h+='<i class="ph"></i>'}else S.p.forEach(function(u){h+='<i style="'+bg(u)+'"></i>'});

$('pG').innerHTML=h}
function list(){var h='';S.p.forEach(function(u,i){h+='<div class="pk" data-i="'+i+'"><i style="'+bg(u)+'"></i><button type="button" data-a="u">↑</button><button type="button" data-a="d">↓</button><button type="button" data-a="x">✕</button></div>'});$('plist').innerHTML=h}
function set(){$('iN').value=S.n;$('iTab').value=S.tab;$('iNav').checked=!!S.nav}
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var sv=localStorage.getItem(STORE);S=sv?JSON.parse(sv):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.p))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}set();list();render()}
function glob(){S.t='보관함';S.n=$('iN').value;S.tab=$('iTab').value;S.nav=$('iNav').checked;persist();render()}
['iN','iTab','iNav'].forEach(function(id){$(id).addEventListener('input',glob);$(id).addEventListener('change',glob)});
function shrink(f){return new Promise(function(ok){var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var m=2400,k=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*k));c.height=Math.max(1,Math.round(im.height*k));var x=c.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(im,0,0,c.width,c.height);ok(c.toDataURL('image/jpeg',.94))};im.onerror=function(){ok(null)};im.src=r.result};r.onerror=function(){ok(null)};r.readAsDataURL(f)})}
$('iP').addEventListener('change',function(e){var fs=Array.prototype.slice.call(e.target.files);if(!fs.length)return;
Promise.all(fs.map(shrink)).then(function(a){a.forEach(function(u){if(u)S.p.push(u)});e.target.value='';persist();list();render()})});
$('plist').addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=+e.target.closest('.pk').dataset.i,m=S.p;
if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
persist();list();render()});
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas($('pf'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='photos.png';
document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
document.addEventListener('dblclick',function(e){e.preventDefault()},{passive:false});
load(false);
})();
