(function(){
var $=function(i){return document.getElementById(i)};
var P=function(r,w,t){return{img:'',red:r||'',white:w||'',top:!!t}};
var DEF={c0:'시리즈',c1:'영화',c2:'NEW & HOT',c3:'카테고리',hero:'',ht:'화요일 새로운 에피소드 공개',b1:'시리즈 재생',b2:'내가 찜한 리스트',t1:'오늘 대한민국의 TOP 10 시리즈',t2:'스릴러 & 미스터리 시리즈',t3:'',bm:'',bn:'',bk:false,ban:'',av:'',
r1:[P('새로운 에피소드','지금 시청하기'),P('새로운 시즌'),P()],
r2:[P('새로운 에피소드','지금 시청하기'),P('시즌 공개'),P('오늘의 추천'),P('새로운 에피소드'),P('인기 시리즈'),P()]};
var S,STORE='editsoceur-netflix-main-v1',nx=$('nx'),sc=$('nSc');
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('저장 공간 부족 — 이미지 일부가 새로고침 시 사라질 수 있어요',e)}}
function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function bg(u){return u?"background-image:url('"+u+"')":''}
function tt(t){return esc(t).replace(/TOP 10/g,'<b>TOP 10</b>')}
var CARET='<svg viewBox="0 0 12 8" style="width:2.8cqw"><path d="M1 1h10L6 7z" fill="#fff"/></svg>';
var PENG='<svg viewBox="0 0 40 40"><rect width="40" height="40" fill="#5a2ec2"/><path d="M6 26a14 14 0 0 1 28 0v7a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z" fill="#fff"/><circle cx="14.500" cy="22" r="4.600" fill="#fff" stroke="#2a1470" stroke-width="1.200"/><circle cx="25.500" cy="22" r="4.600" fill="#fff" stroke="#2a1470" stroke-width="1.200"/><circle cx="14.500" cy="22.500" r="1.700" fill="#111"/><circle cx="25.500" cy="22.500" r="1.700" fill="#111"/></svg>';
function poster(x){var g='';if(x.red||x.white)g='<div class="ntg">'+(x.red?'<span class="r">'+esc(x.red)+'</span>':'')+(x.white?'<span class="w">'+esc(x.white)+'</span>':'')+'</div>';
return '<div class="np" style="'+bg(x.img)+'">'+(x.top?'<b class="tb"><i>TOP</i>10</b>':'')+g+'</div>'}
function render(){
$('nCh').innerHTML='<i>'+esc(S.c0)+'</i><i>'+esc(S.c1)+'</i><i>'+esc(S.c2)+'</i><i><span>'+esc(S.c3)+'</span>'+CARET+'</i>';
var hc=$('nHc');hc.style.backgroundImage=S.hero?"url('"+S.hero+"')":'';
$('nHt').textContent=S.ht;$('nB1').textContent=S.b1;$('nB2').textContent=S.b2;
$('nT1').innerHTML=tt(S.t1);$('nT2').innerHTML=tt(S.t2);
var h='';S.r1.forEach(function(x,i){var n=i+1;h+='<div class="ni"><i class="nn" style="left:-'+(n===1?8:12.3)+'cqw">'+n+'</i>'+poster(x)+'</div>'});$('nR1').innerHTML=h;
h='';S.r2.forEach(function(x){h+=poster(x)});$('nR2').innerHTML=h;
$('nBn').style.backgroundImage=S.ban?"url('"+S.ban+"')":'';$('nBk').style.display=S.bk?'':'none';
$('nBm').textContent=S.bm;$('nBt').textContent=S.bn;
var av=$('nAv');if(S.av){av.innerHTML='';av.style.backgroundImage="url('"+S.av+"')"}else{av.style.backgroundImage='';av.innerHTML=PENG}}
function card(r,x,i){return '<div class="nk" data-r="'+r+'" data-i="'+i+'"><div class="row"><label class="file">포스터 '+(i+1)+' 이미지<input type="file" accept="image/*" data-f="img"></label><label class="xk"><input type="checkbox" data-f="top"'+(x.top?' checked':'')+'> TOP10 배지</label></div><div class="row"><label>빨간 라벨<input data-f="red" value="'+esc(x.red)+'"></label><label>흰 라벨<input data-f="white" value="'+esc(x.white)+'"></label></div><div class="row"><button type="button" class="nkb" data-a="u">↑</button><button type="button" class="nkb" data-a="d">↓</button><button type="button" class="nkb" data-a="x">✕ 삭제</button></div></div>'}
function list(){[1,2].forEach(function(r){var h='';S['r'+r].forEach(function(x,i){h+=card(r,x,i)});$('l'+r).innerHTML=h})}
function set(){Array.prototype.forEach.call(document.querySelectorAll('[data-g]'),function(e){var k=e.dataset.g;if(e.type==='checkbox')e.checked=!!S[k];else e.value=S[k]})}
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var sv=localStorage.getItem(STORE);S=sv?JSON.parse(sv):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.r1)||!Array.isArray(S.r2))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}set();list();render()}
function shrink(f){return new Promise(function(ok){var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var m=1000,k=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);ok(c.toDataURL('image/jpeg',.82))};im.onerror=function(){ok(null)};im.src=r.result};r.onerror=function(){ok(null)};r.readAsDataURL(f)})}
document.querySelector('.editor').addEventListener('input',function(e){var t=e.target,k=t.dataset.g;
if(k){S[k]=t.type==='checkbox'?t.checked:t.value;persist();render();return}
var f=t.dataset.f,c=t.closest('.nk');if(!f||!c||t.type==='file')return;var o=S['r'+c.dataset.r][+c.dataset.i];o[f]=t.type==='checkbox'?t.checked:t.value;persist();render()});
document.querySelector('.editor').addEventListener('change',function(e){var t=e.target;if(t.type!=='file'||!t.files[0])return;var f=t.dataset.f,c=t.closest('.nk'),k=t.dataset.i;
shrink(t.files[0]).then(function(u){if(!u)return;if(k)S[k]=u;else if(c)S['r'+c.dataset.r][+c.dataset.i][f]=u;t.value='';persist();render()})});
document.querySelector('.editor').addEventListener('click',function(e){var t=e.target;
if(t.dataset.add){S['r'+t.dataset.add].push(P());persist();list();render();return}
var a=t.dataset.a,c=t.closest('.nk');if(!a||!c)return;var m=S['r'+c.dataset.r],i=+c.dataset.i;
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
