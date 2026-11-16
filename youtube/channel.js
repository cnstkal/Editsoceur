(function(){
var $=function(i){return document.getElementById(i)};
var CX=[36,107,183,258,338],SCROLL_MID=592.5,STICKY=72.5,TAB_Y=463;
var BG=['linear-gradient(#1b1740,#c92d78)','linear-gradient(#fbe3f1,#f2a6cf)','linear-gradient(#f6efd8,#d9d0f2)','linear-gradient(#fdd3e6,#e84c8f)','linear-gradient(#5a3a7a,#c43a5a)'];
var DEF={time:'9:41',bat:'80',chg:false,sc:0,
nm:'샘플 채널',hd:'@samplechannel',su:'구독자 1만명',vd:'동영상 120개',sb:'구독',
ds:'샘플 채널 소개 문구입니다. 원하는 내용으로 바꿔 주세요.',lk:'example.com 외 링크 1개',
tabs:['홈','동영상','Shorts','라이브','재생목록'],act:'0',
f:{n:'대표 영상 샘플 제목입니다',ch:'샘플 채널',vw:'1만',time:'1개월 전',dur:'3:13',mu:false,cb:false},
l:[
{n:'샘플 영상 첫 번째 제목입니다',ch:'',sc:false,vw:'5천',time:'2시간 전',dur:'4:46',mu:false,pg:'0'},
{n:'샘플 쇼츠 영상 제목',ch:'',sc:true,vw:'2.8천',time:'4시간 전',dur:'0:56',mu:false,pg:'0'},
{n:'테스트용으로 조금 더 긴 샘플 영상 제목 예시입니다',ch:'',sc:false,vw:'1.5천',time:'13시간 전',dur:'1:37',mu:false,pg:'0'},
{n:'샘플 영상 네 번째',ch:'',sc:false,vw:'2.5천',time:'2일 전',dur:'25:07',mu:false,pg:'0'}]};
var NOTE='<svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M9 3v11.500A4 4 0 1 0 12 18V8h6V3z"/></svg>',
DOTS='<svg class="ld" width="13" height="4" viewBox="0 0 13 4" fill="#0f0f0f"><circle cx="2" cy="2" r="1.900"/><circle cx="6.500" cy="2" r="1.900"/><circle cx="11" cy="2" r="1.900"/></svg>',
DOTS2='<svg class="cdd" width="16" height="5" viewBox="0 0 16 5" fill="#0f0f0f"><circle cx="2.500" cy="2.500" r="2.300"/><circle cx="8" cy="2.500" r="2.300"/><circle cx="13.500" cy="2.500" r="2.300"/></svg>',
CC='<div class="cc"><i class="c1"></i><i class="c2">T</i><i class="c3">連</i><i class="c4"></i></div>';
var S,STORE='editsoceur-youtube-channel-v2';
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('채널 데이터 저장 실패',e)}}
function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function pc(v){v=parseFloat(v);return isNaN(v)?0:Math.max(0,Math.min(100,v))}
function bgi(u,d){return u?"background-image:url('"+u+"')":(d?'background-image:'+d:'')}
function img(el,u){el.style.backgroundImage=u?"url('"+u+"')":''}
function render(){
$('cTime').textContent=S.time;
var b=pc(S.bat);$('cBf').style.width=b+'%';$('cBt').textContent=Math.round(b);$('cBz').style.display=S.chg?'':'none';
img($('cBn'),S.bn);img($('cAv'),S.av);
$('cNm').textContent=S.nm;$('cHd').textContent=S.hd;$('cSu').textContent=S.su;$('cVd').textContent=S.vd;
$('cDs').innerHTML=esc(S.ds)+'<b>...더보기</b>';$('cLk').textContent=S.lk;$('cSb').textContent=S.sb;
var sc=Math.max(0,parseFloat(S.sc)||0);$('cS').style.transform='translateY('+(-sc)+'px)';
var T=Math.max(TAB_Y-sc,STICKY);$('cTb').style.top=T+'px';
var tf=$('cTf');tf.style.height=T>STICKY?'0px':(STICKY-58)+'px';
var t='';S.tabs.forEach(function(n,i){t+='<span class="cb'+(String(i)===S.act?' on':'')+'" style="left:'+CX[i]+'px">'+esc(n)+'</span>'});$('cTb').innerHTML=t;
var f=S.f;
$('cFd').innerHTML='<div class="cfv" style="'+bgi(f.th,BG[0])+'">'+(f.dur?'<div class="cfu">'+(f.mu?NOTE:'')+esc(f.dur)+'</div>':'')+'</div><div class="cfi">'+'<i class="cfa"></i>'+'<div class="cfx"><div class="cft">'+esc(f.n)+'</div><div class="cfm">'+esc(f.ch)+'<span>▷'+esc(f.vw)+'</span><span>'+esc(f.time)+'</span></div></div></div>'+DOTS2;
var h='';S.l.forEach(function(x,i){h+='<div class="li"><div class="lt" style="'+bgi(x.th,BG[(i+1)%5])+'">'+(x.dur?'<div class="lu">'+(x.mu?NOTE:'')+esc(x.dur)+'</div>':'')+(pc(x.pg)?'<div class="lp"><i style="width:'+pc(x.pg)+'%"></i></div>':'')+'</div><div class="lx"><div class="ln">'+esc(x.n)+'</div>'+(x.sc?'<div class="lc">'+esc(x.ch)+'</div>':'')+'<div class="lm">'+esc(x.vw)+' · '+esc(x.time)+'</div></div>'+DOTS+'</div>'});
$('cL').innerHTML=h}
function get(p){return p.split('.').reduce(function(o,k){return o&&o[k]},S)}
function put(p,v){var a=p.split('.'),l=a.pop();a.reduce(function(o,k){return o[k]},S)[l]=v}
function rd(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
var els=[].slice.call(document.querySelectorAll('[data-k]'));
function setTabs(){$('iTabs').value=S.tabs.join(',');var o='';S.tabs.forEach(function(n,i){o+='<option value="'+i+'">'+esc(n)+'</option>'});$('iAct').innerHTML=o;$('iAct').value=S.act}
function set(){els.forEach(function(e){if(e.type==='file')return;var v=get(e.dataset.k);if(e.type==='checkbox')e.checked=!!v;else e.value=v==null?'':v});setTabs()}
els.forEach(function(e){
if(e.type==='file')e.addEventListener('change',function(){if(e.files[0])rd(e.files[0],function(d){put(e.dataset.k,d);persist();render()})});
else{var h=function(){put(e.dataset.k,e.type==='checkbox'?e.checked:e.value);persist();render()};e.addEventListener('input',h);e.addEventListener('change',h)}});
$('iTabs').addEventListener('change',function(){var a=this.value.split(',').map(function(s){return s.trim()});while(a.length<5)a.push('');S.tabs=a.slice(0,5);persist();setTabs();render()});
$('iAct').addEventListener('change',function(){S.act=this.value;persist();render()});
function scr(v){S.sc=v;set();persist();render()}
$('pTop').onclick=function(){scr(0)};$('pMid').onclick=function(){scr(SCROLL_MID)};
function list(){var h='';S.l.forEach(function(x,i){
h+='<div class="ec" data-i="'+i+'"><label>제목<input data-f="n" value="'+esc(x.n)+'"></label><label>채널명 줄<input data-f="ch" value="'+esc(x.ch)+'"></label>'+
'<div class="row"><label>조회수<input data-f="vw" value="'+esc(x.vw)+'"></label><label>시간<input data-f="time" value="'+esc(x.time)+'"></label><label>길이<input data-f="dur" value="'+esc(x.dur)+'"></label><label>진행률 %<input data-f="pg" value="'+esc(x.pg)+'"></label></div>'+
'<div class="row" style="align-items:center"><label class="file">썸네일<input type="file" accept="image/*" data-f="th"></label><label class="ek"><input type="checkbox" data-f="mu"'+(x.mu?' checked':'')+'> 음표</label><label class="ek"><input type="checkbox" data-f="sc"'+(x.sc?' checked':'')+'> 채널명 표시</label></div>'+
'<div class="row"><button type="button" class="eb" data-a="u">↑</button><button type="button" class="eb" data-a="d">↓</button><button type="button" class="eb" data-a="x">✕ 삭제</button></div></div>'});
$('clist').innerHTML=h}
var L=$('clist'),ix=function(e){return +e.target.closest('.ec').dataset.i};
L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||e.target.type==='file'||e.target.type==='checkbox')return;S.l[ix(e)][f]=e.target.value;persist();render()});
L.addEventListener('change',function(e){var t=e.target,f=t.dataset.f;if(!f)return;var o=S.l[ix(e)];
if(t.type==='checkbox'){o[f]=t.checked;persist();render()}else if(t.type==='file'&&t.files[0])rd(t.files[0],function(d){o.th=d;persist();render()})});
L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.l;
if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
persist();list();render()});
$('addV').onclick=function(){S.l.push({n:'',ch:'',sc:false,vw:'',time:'1시간 전',dur:'10:00',mu:false,pg:'0'});persist();list();render()};
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var saved=localStorage.getItem(STORE);S=saved?JSON.parse(saved):JSON.parse(JSON.stringify(DEF));if(!S||!S.f||!Array.isArray(S.l)||!Array.isArray(S.tabs)||S.tabs.length!==5)throw new Error('invalid saved data')}catch(e){S=JSON.parse(JSON.stringify(DEF))}}set();list();render()}
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas($('cf'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='youtube-channel.png';
document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
load(false);
})();
