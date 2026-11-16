(function(){
var $=function(i){return document.getElementById(i)},STORE='pin_home_v1',S;
var DOTS='<svg width="24" height="24" viewBox="0 0 24 24" fill="#111"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>';
var DEF={dot:true,nav:false,p:[{x:'',img:'',ratio:1.25},{x:'주말의 기록',img:'',ratio:1.4},{x:'',img:'',ratio:1.1},{x:'오늘의 무드',img:'',ratio:1.6},{x:'',img:'',ratio:1.2},{x:'영감 보관함',img:'',ratio:1.45}]};
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
function esc(t){return String(t==null?'':t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function render(){
 var c=['',''];
 S.p.forEach(function(p,i){c[i%2]+='<div class="pin"><div class="pi" style="aspect-ratio:1 / '+(p.ratio||1.25)+';'+(p.img?'background-image:url('+p.img+')':'')+'"></div><div class="pt"><span>'+esc(p.x)+'</span>'+DOTS+'</div></div>'});
 $('pc0').innerHTML=c[0];$('pc1').innerHTML=c[1];
 $('pDot').style.display=S.dot?'block':'none';$('pnav').classList.toggle('on',!!S.nav)
}
function list(){
 $('plist').innerHTML=S.p.map(function(p,i){return '<div class="pe" data-i="'+i+'"><label>제목(비우면 숨김)<input data-f="x" value="'+esc(p.x)+'"></label><label class="file">이미지 교체<input type="file" accept="image/*" data-f="img"></label><div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'}).join('')
}
function readImage(file,cb){var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){cb(r.result,im.height/im.width)};im.src=r.result};r.readAsDataURL(file)}
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var v=localStorage.getItem(STORE);S=v?JSON.parse(v):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.p))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}$('iDot').checked=!!S.dot;$('iNav').checked=!!S.nav;list();render()}
$('iDot').onchange=function(){S.dot=this.checked;persist();render()};
$('iNav').onchange=function(){S.nav=this.checked;persist();render()};
var L=$('plist'),ix=function(e){return +e.target.closest('.pe').dataset.i};
L.addEventListener('input',function(e){if(e.target.dataset.f!=='x')return;S.p[ix(e)].x=e.target.value;persist();render()});
L.addEventListener('change',function(e){var t=e.target;if(t.dataset.f!=='img'||!t.files[0])return;readImage(t.files[0],function(data,ratio){var o=S.p[ix(e)];o.img=data;o.ratio=ratio;persist();list();render()})});
L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.p,t;if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){t=m[i];m[i]=m[i+1];m[i+1]=t}persist();list();render()});
$('batchPins').onchange=function(){var fs=[].slice.call(this.files);fs.forEach(function(f){readImage(f,function(data,ratio){S.p.push({x:'',img:data,ratio:ratio});persist();list();render()})});this.value=''};
$('addP').onclick=function(){S.p.push({x:'',img:'',ratio:1.25});persist();list();render()};
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){return html2canvas($('pf'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='pinterest-home.png';document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
load(false);
})();