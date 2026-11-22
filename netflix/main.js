(function(){
var $=function(i){return document.getElementById(i)};
var P=function(r,w,t){return{img:'',red:r||'',white:w||'',top:!!t}};
var DEF={c0:'시리즈',c1:'영화',c2:'NEW & HOT',c3:'카테고리',hero:'',ht:'화요일 새로운 에피소드 공개',b1:'시리즈 재생',b2:'내가 찜한 리스트',t1:'오늘 대한민국의 TOP 10 시리즈',t2:'스릴러 & 미스터리 시리즈',av:'',
r1:[P('새로운 에피소드','지금 시청하기'),P('새로운 시즌'),P()],
r2:[P('스릴러'),P('미스터리'),P('범죄'),P('심리 스릴러'),P('추리'),P('스릴러 시리즈')]};
var S,STORE='editsoceur-netflix-main-v1',nx=$('nx'),sc=$('nSc');
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('저장 공간 부족 — 이미지 일부가 새로고침 시 사라질 수 있어요',e)}}
function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function bg(u){return u?"background-image:url('"+u+"')":''}
function tt(t){return esc(t).replace(/TOP 10/g,'<b>TOP 10</b>')}
var CARET='<svg viewBox="0 0 12 8" style="width:2.8cqw"><path d="M1 1h10L6 7z" fill="#fff"/></svg>';
var PENG='<svg viewBox="0 0 40 40"><rect width="40" height="40" fill="#5a2ec2"/><path d="M6 26a14 14 0 0 1 28 0v7a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z" fill="#fff"/><circle cx="14.500" cy="22" r="4.600" fill="#fff" stroke="#2a1470" stroke-width="1.200"/><circle cx="25.500" cy="22" r="4.600" fill="#fff" stroke="#2a1470" stroke-width="1.200"/><circle cx="14.500" cy="22.500" r="1.700" fill="#111"/><circle cx="25.500" cy="22.500" r="1.700" fill="#111"/></svg>';
function poster(x){var g='';if(x.red||x.white)g='<div class="ntg">'+(x.red?'<span class="r">'+esc(x.red)+'</span>':'')+(x.white?'<span class="w">'+esc(x.white)+'</span>':'')+'</div>';
return '<div class="np" style="'+bg(x.img)+'">'+(x.top?'<b class="tb"><i>TOP</i>10</b>':'')+g+'</div>'}
function arr(r){return String(r)[0]==='x'?S.sx[+String(r).slice(1)].items:S['r'+r]}
function ensure(){if(!Array.isArray(S.sx))S.sx=[{t:'로맨스 & 드라마 시리즈',items:[P('로맨스'),P('드라마'),P('코미디')]}]}
function render(){ensure();
$('nCh').innerHTML='<i>'+esc(S.c0)+'</i><i>'+esc(S.c1)+'</i><i>'+esc(S.c2)+'</i><i><span>'+esc(S.c3)+'</span>'+CARET+'</i>';
var hc=$('nHc');hc.style.backgroundImage=S.hero?"url('"+S.hero+"')":'';
$('nHt').textContent=S.ht;$('nB1').textContent=S.b1;$('nB2').textContent=S.b2;
$('nT1').innerHTML=tt(S.t1);$('nT2').innerHTML=tt(S.t2);
var h='';S.r1.forEach(function(x,i){var n=i+1;h+='<div class="ni"><i class="nn" style="left:-'+(n===1?8:12.3)+'cqw">'+n+'</i>'+poster(x)+'</div>'});$('nR1').innerHTML=h;
h='';S.r2.forEach(function(x){h+=poster(x)});$('nR2').innerHTML=h+h;
var sx='';S.sx.forEach(function(s){var it=s.items.map(poster).join('');sx+='<div class="nst m2">'+esc(s.t)+'</div><div class="nr2">'+it+it+'</div>'});$('nSx').innerHTML=sx;

var av=$('nAv');if(S.av){av.innerHTML='';av.style.backgroundImage="url('"+S.av+"')"}else{av.style.backgroundImage='';av.innerHTML=PENG}}
function card(r,x,i){return '<div class="nk" data-r="'+r+'" data-i="'+i+'"><div class="row"><label class="file">포스터 '+(i+1)+' 이미지<input type="file" accept="image/*" data-f="img"></label><label class="xk"><input type="checkbox" data-f="top"'+(x.top?' checked':'')+'> TOP10 배지</label></div><div class="row"><label>빨간 라벨<input data-f="red" value="'+esc(x.red)+'"></label><label>흰 라벨<input data-f="white" value="'+esc(x.white)+'"></label></div><div class="row"><button type="button" class="nkb" data-a="u">↑</button><button type="button" class="nkb" data-a="d">↓</button><button type="button" class="nkb" data-a="x">✕ 삭제</button></div></div>'}
function list(){ensure();[1,2].forEach(function(r){var h='';S['r'+r].forEach(function(x,i){h+=card(r,x,i)});$('l'+r).innerHTML=h});
 document.querySelectorAll('.xp').forEach(function(p){p.remove()});
 var ed=document.querySelector('.editor'),after=document.querySelector('[data-t="섹션1"]');
 S.sx.forEach(function(s,k){var p=document.createElement('div');p.className='ps-pn xp';p.setAttribute('data-t','섹션'+(k+2));p.hidden=true;
  p.innerHTML='<div class="row"><label>제목<input data-sx="'+k+'" value="'+esc(s.t)+'"></label></div><div id="lx'+k+'"></div><button class="ghost" data-add="x'+k+'" type="button">+ 포스터 추가</button><button class="ghost" data-delsx="'+k+'" type="button">이 섹션 삭제</button>';
  ed.insertBefore(p,after?after.nextSibling:null);after=p;
  var h='';s.items.forEach(function(x,i){h+=card('x'+k,x,i)});p.querySelector('#lx'+k).innerHTML=h});
 tabs()}
var TABS_KEEP=0;
function tabs(){var side=document.querySelector('.ps-side'),ed=document.querySelector('.editor');
 [].forEach.call(side.querySelectorAll(':scope > .ps-seg'),function(o){o.remove()});
 var panes=[].slice.call(ed.querySelectorAll(':scope > .ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
 if(TABS_KEEP>=panes.length)TABS_KEEP=0;
 panes.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');
  if(i===TABS_KEEP)b.className='on';
  b.onclick=function(){TABS_KEEP=i;panes.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};
  bar.appendChild(b);p.hidden=i!==TABS_KEEP});
 ed.parentNode.insertBefore(bar,ed)}
function set(){Array.prototype.forEach.call(document.querySelectorAll('[data-g]'),function(e){var k=e.dataset.g;if(e.type==='checkbox')e.checked=!!S[k];else e.value=S[k]})}
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var sv=localStorage.getItem(STORE);S=sv?JSON.parse(sv):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.r1)||!Array.isArray(S.r2))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}set();list();render()}
function shrink(f){return new Promise(function(ok){var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var m=1000,k=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);ok(c.toDataURL('image/jpeg',.82))};im.onerror=function(){ok(null)};im.src=r.result};r.onerror=function(){ok(null)};r.readAsDataURL(f)})}
document.querySelector('.editor').addEventListener('input',function(e){var t=e.target,k=t.dataset.g;
if(t.dataset.sx!=null){S.sx[+t.dataset.sx].t=t.value;persist();render();return}
if(k){S[k]=t.type==='checkbox'?t.checked:t.value;persist();render();return}
var f=t.dataset.f,c=t.closest('.nk');if(!f||!c||t.type==='file')return;var o=arr(c.dataset.r)[+c.dataset.i];o[f]=t.type==='checkbox'?t.checked:t.value;persist();render()});
document.querySelector('.editor').addEventListener('change',function(e){var t=e.target;if(t.type!=='file'||!t.files[0])return;var f=t.dataset.f,c=t.closest('.nk'),k=t.dataset.i;
shrink(t.files[0]).then(function(u){if(!u)return;if(k)S[k]=u;else if(c)arr(c.dataset.r)[+c.dataset.i][f]=u;t.value='';persist();render()})});
document.querySelector('.editor').addEventListener('click',function(e){var t=e.target;
if(t.id==='addSx'){S.sx.push({t:'새 섹션',items:[P(),P(),P()]});persist();list();render();return}
if(t.dataset.delsx!=null){S.sx.splice(+t.dataset.delsx,1);persist();list();render();return}
if(t.dataset.add){arr(t.dataset.add).push(P());persist();list();render();return}
var a=t.dataset.a,c=t.closest('.nk');if(!a||!c)return;var m=arr(c.dataset.r),i=+c.dataset.i;
if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var x=m[i];m[i]=m[i-1];m[i-1]=x}else if(a==='d'&&i<m.length-1){var y=m[i];m[i]=m[i+1];m[i+1]=y}
persist();list();render()});
sc.addEventListener('scroll',function(){nx.classList.toggle('sc',sc.scrollTop>4)});
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent,s=sc.scrollTop,inn=sc.firstElementChild;b.disabled=true;b.textContent='저장 중...';
inn.style.transform='translateY('+(-s)+'px)';sc.style.overflow='hidden';
var done=function(){inn.style.transform='';sc.style.overflow='';sc.scrollTop=s;b.disabled=false;b.textContent=t};
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas(nx,{scale:4,useCORS:true,backgroundColor:'#000',logging:false})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='netflix.png';
document.body.appendChild(a);a.click();a.remove();done()},'image/png')
}).catch(function(){done();alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
document.addEventListener('dblclick',function(e){e.preventDefault()},{passive:false});
load(false);
})();
