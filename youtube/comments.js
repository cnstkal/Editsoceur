(function(){
var $=function(i){return document.getElementById(i)};
var DEF={time:'12:03',bat:'67',chg:true,pg:'1.4',ti:'댓글',c1:'인기순',c2:'최신순',act:'0',ip:'댓글 올리기...',showV:true,showP:true,showI:true,gs:false,thRaw:'',th:'',
l:[
{h:'@천장-h6p',time:'1일 전',x:'진짜 왜 이름만 부르고 본론은 내가 답장하기전까지 절대 말을 안꺼내는지????',lk:'1.3천',rp:'15',lt:'',cl:'#8e8e8a'},
{h:'@moracacaca',time:'1일 전',x:'회사에서 손톱깎는 인간도 넣어주지… 진짜 나는 아무리 생각해도 이해가 안가던데..',lk:'577',rp:'12',lt:'m',cl:'#3a9ea0'},
{h:'@Be be B',time:'23시간 전',x:'맞아요 저도 그 부분이 제일 공감됐어요',lk:'420',rp:'3',lt:'',cl:'#d9c7a8'}]};
var UP='<path d="M7.500 10.500V20h-4v-9.500zM7.500 10.500 11 3.500c1.600 0 2.600 1.400 2.200 2.900L12.600 9.500H19a2 2 0 0 1 2 2.400l-1.300 6.600A2 2 0 0 1 17.700 20H7.500"/>',
IC=function(d,g){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="1.800" stroke-linejoin="round" stroke-linecap="round">'+(g?'<g transform="rotate(180 12 12)">'+d+'</g>':d)+'</svg>'},
RP='<path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6l-4 3.500V17H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM7.500 8.500h9M7.500 12h6"/>',
DOTS='<svg class="mdt" width="12" height="4" viewBox="0 0 12 4" fill="#0f0f0f"><circle cx="2" cy="2" r="1.900"/><circle cx="6" cy="2" r="1.900"/><circle cx="10" cy="2" r="1.900"/></svg>',
CH='<svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="#0f0f0f" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"><path d="M1.200 1.200 5.800 6l-4.600 4.800"/></svg>';
var LIKED='<svg width="18" height="18" viewBox="0 0 24 24" fill="#0f0f0f" stroke="#0f0f0f" stroke-width="1.800" stroke-linejoin="round" stroke-linecap="round">'+UP+'</svg>';
function lkNum(s){s=String(s==null?'':s).replace(/,/g,'').trim();var m=s.match(/^([\d.]+)\s*(천|만)?/);if(!m)return 0;var v=parseFloat(m[1]);if(isNaN(v))return 0;if(m[2]==='천')v*=1000;if(m[2]==='만')v*=10000;return Math.round(v)}
var S,STORE='editsoceur-youtube-comments-v1';
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('댓글 데이터 저장 실패',e)}}
function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function ts(t){return esc(t).replace(/(\d{1,2}:\d{2}(?::\d{2})?)/g,'<span class="tsl">$1</span>')}
function pc(v){v=parseFloat(v);return isNaN(v)?0:Math.max(0,Math.min(100,v))}
var KEYC={};
function keyGreen(src,cb){
var im=new Image();im.onload=function(){var m=Math.min(1,900/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*m);c.height=Math.round(im.height*m);var x=c.getContext('2d');x.drawImage(im,0,0,c.width,c.height);try{var d=x.getImageData(0,0,c.width,c.height),p=d.data;for(var i=0;i<p.length;i+=4){var r=p[i],g=p[i+1],b=p[i+2];var df=g-Math.max(r,b);if(df>45)p[i+3]=0;else if(df>20)p[i+3]=Math.round(p[i+3]*(45-df)/25)}x.putImageData(d,0,0);cb(c.toDataURL('image/png'))}catch(e){cb(src)}};im.onerror=function(){cb(src)};im.src=src}
function buildTh(){if(!S.thRaw){S.th='';return}if(!S.gs){S.th=S.thRaw;return}var k=S.thRaw;if(KEYC[k]){S.th=KEYC[k];return}keyGreen(k,function(d){KEYC[k]=d;S.th=d;persist();render()})}
function render(){
$('mTime').textContent=S.time;
var b=pc(S.bat);$('mBf').style.width=b+'%';$('mBt').textContent=Math.round(b);$('mBz').style.display=S.chg?'':'none';
$('mV').style.backgroundImage=S.th?"url('"+S.th+"')":'';$('mV').style.display=S.showV===false?'none':'';$('mf').style.background=S.showV===false?'transparent':'';$('mPi').style.width=pc(S.pg)+'%';$('mPi').parentNode.style.display=S.showP===false?'none':'';var ib=document.querySelector('#mf .mcb');if(ib)ib.style.display=S.showI===false?'none':'';
$('mTi').textContent=S.ti;$('mIp').textContent=S.ip;
$('mC1').textContent=S.c1;$('mC2').textContent=S.c2;$('mC1').className='mc1'+(S.act==='0'?' on':'');$('mC2').className='mc2'+(S.act==='1'?' on':'');
var h='';S.l.forEach(function(x,i){
h+='<div class="mi"><i class="mav" style="background-color:'+esc(x.cl||'#999')+(x.av?";background-image:url('"+x.av+"')":'')+'">'+(x.av?'':esc(x.lt))+'</i>'+(x.rp?'<i class="cth"></i>':'')+
'<div class="mb"><div class="mh">'+esc(x.h)+'<i class="md"></i>'+esc(x.time)+'</div><div class="mt">'+ts(x.x)+'</div><div class="ma">'+'<span class="mlk" data-i="'+i+'" style="cursor:pointer">'+(x.liked?LIKED:IC(UP))+'</span><span>'+(x.liked?(lkNum(x.lk)+1).toLocaleString('en-US'):esc(x.lk))+'</span>'+IC(UP,1)+IC(RP)+'</div>'+(x.rp?'<div class="mr">답글 '+esc(x.rp)+'개'+CH+'</div>':'')+'</div>'+DOTS+'</div>'});
$('mL').innerHTML=h;fit()}
function fit(){var mf=$('mf'),ml=$('mL'),cb=document.querySelector('#mf .mcb');
ml.style.height='auto';var lh=ml.offsetHeight,base=Math.max(369,lh),d=base-369;
ml.style.height=base+'px';
if(d<=0){mf.style.aspectRatio='';mf.style.height='';cb.style.top='';return}
mf.style.aspectRatio='auto';mf.style.height=(mf.offsetWidth*2556/1179+d)+'px';cb.style.top=(766+d)+'px'}
function get(p){return p.split('.').reduce(function(o,k){return o&&o[k]},S)}
function put(p,v){var a=p.split('.'),l=a.pop();a.reduce(function(o,k){return o[k]},S)[l]=v}
function rd(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
var els=[].slice.call(document.querySelectorAll('[data-k]'));
function set(){els.forEach(function(e){if(e.type==='file')return;var v=get(e.dataset.k);if(e.type==='checkbox')e.checked=!!v;else e.value=v==null?'':v})}
els.forEach(function(e){
if(e.type==='file')e.addEventListener('change',function(){if(e.files[0])rd(e.files[0],function(d){put(e.dataset.k,d);if(e.dataset.k==='thRaw')buildTh();persist();render()})});
else{var h=function(){put(e.dataset.k,e.type==='checkbox'?e.checked:e.value);if(e.dataset.k==='gs')buildTh();persist();render()};e.addEventListener('input',h);e.addEventListener('change',h)}});
function list(){var h='';S.l.forEach(function(x,i){
h+='<div class="ec" data-i="'+i+'"><div class="row"><label>아이디<input data-f="h" value="'+esc(x.h)+'"></label><label>시간<input data-f="time" value="'+esc(x.time)+'"></label></div>'+
'<label>내용<textarea rows="3" data-f="x">'+esc(x.x)+'</textarea></label>'+
'<div class="row"><label>좋아요<input data-f="lk" value="'+esc(x.lk)+'"></label><label>답글 수(비우면 숨김)<input data-f="rp" value="'+esc(x.rp)+'"></label></div>'+
'<div class="row"><label>프로필 글자<input data-f="lt" value="'+esc(x.lt)+'"></label><label>프로필 색<input data-f="cl" value="'+esc(x.cl)+'"></label><label class="file">프로필 사진<input type="file" accept="image/*" data-f="av"></label></div>'+
'<div class="row"><button type="button" class="eb" data-a="u">↑</button><button type="button" class="eb" data-a="d">↓</button><button type="button" class="eb" data-a="x">✕ 삭제</button></div></div>'});
$('mlist').innerHTML=h}
var L=$('mlist'),ix=function(e){return +e.target.closest('.ec').dataset.i};
L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||e.target.type==='file')return;S.l[ix(e)][f]=e.target.value;persist();render()});
L.addEventListener('change',function(e){var t=e.target;if(t.type==='file'&&t.files[0]){var o=S.l[ix(e)];rd(t.files[0],function(d){o.av=d;persist();render()})}});
L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.l;
if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
persist();list();render()});
$('mL').addEventListener('click',function(e){var k=e.target.closest&&e.target.closest('.mlk');if(!k)return;var x=S.l[+k.dataset.i];if(!x)return;x.liked=!x.liked;persist();render()});
$('addC').onclick=function(){S.l.push({h:'@username',time:'1시간 전',x:'',lk:'',rp:'',lt:'',cl:'#999999'});persist();list();render()};
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var saved=localStorage.getItem(STORE);S=saved?JSON.parse(saved):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.l))throw new Error('invalid saved data')}catch(e){S=JSON.parse(JSON.stringify(DEF))}}if(S.th&&!S.thRaw)S.thRaw=S.th;buildTh();set();list();render()}
$('reset').onclick=function(){load(true)};
function svgToImgs(root){var undo=[],svgs=[].slice.call(root.querySelectorAll('svg')),ps=[];svgs.forEach(function(sv){var r=sv.getBoundingClientRect();var c=sv.cloneNode(true);c.setAttribute('width',r.width);c.setAttribute('height',r.height);var im=new Image();im.className=sv.getAttribute('class')||'';im.setAttribute('style',sv.getAttribute('style')||'');im.style.width=r.width+'px';im.style.height=r.height+'px';im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(c));var par=sv.parentNode,nx=sv.nextSibling;par.replaceChild(im,sv);undo.push(function(){par.insertBefore(sv,im.nextSibling);par.removeChild(im)});ps.push(im.decode?im.decode().catch(function(){}):Promise.resolve())});
return Promise.all(ps).then(function(){return function(){undo.forEach(function(f){f()})}})}
$('savePng').onclick=function(){var b=this,t=b.textContent,restore=function(){};b.disabled=true;b.textContent='저장 중...';
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){return svgToImgs($('mf'))}).then(function(rs){restore=rs;
return html2canvas($('mf'),{scale:4,useCORS:true,backgroundColor:S.showV===false?null:'#fff',logging:false})}).then(function(c){restore();
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);var n=new Date(),z=function(x,l){return String(x).padStart(l||2,'0')};a.download='youtube-comments-'+n.getFullYear()+z(n.getMonth()+1)+z(n.getDate())+'-'+z(n.getHours())+z(n.getMinutes())+z(n.getSeconds())+z(n.getMilliseconds(),3)+'.png';
document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){restore();b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
load(false);
})();
