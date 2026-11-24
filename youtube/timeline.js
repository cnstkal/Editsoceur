(function(){
var $=function(i){return document.getElementById(i)};
var LEFT=[16,57,121,177,241,320],BG=['linear-gradient(#1b1740,#c92d78)','linear-gradient(#e4ecec,#7ea3a6)'];
var DEF={time:'11:48',bat:'65',chg:true,badge:'7',act:'0',tabs:['홈','구독','음악','라이브','팟캐스트','더보기'],
v:[{ch:'샘플 채널',n:'샘플 영상 제목입니다. 여기에 원하는 제목을 적어 주세요',vw:'1.2만',time:'2시간 전',dur:'4:46',mu:false},
{ch:'다른 샘플 채널',n:'두 줄로 넘어가는 긴 샘플 영상 제목 예시입니다 테스트용 문구',vw:'12만',time:'3일 전',dur:'12:36',mu:false}]};
var NOTE='<svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M9 3v11.500A4 4 0 1 0 12 18V8h6V3z"/></svg>',
DOTS='<svg class="yd" width="16" height="5" viewBox="0 0 16 5" fill="#0f0f0f"><circle cx="2.500" cy="2.500" r="2.300"/><circle cx="8" cy="2.500" r="2.300"/><circle cx="13.500" cy="2.500" r="2.300"/></svg>';
var S,STORE='editsoceur-youtube-timeline-v3';
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('유튜브 데이터 저장 실패',e)}}
function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function bgi(u,d){return u?"background-image:url('"+u+"')":(d?'background-image:'+d:'')}
function render(){
$('yTime').textContent=S.time;
var b=parseInt(S.bat,10);b=isNaN(b)?0:Math.max(0,Math.min(100,b));
$('yBf').style.width=b+'%';$('yBt').textContent=b;

var t='';S.tabs.forEach(function(n,i){t+='<span class="yb'+(String(i)===S.act?' on':'')+'" style="left:'+LEFT[i]+'px">'+esc(n)+'</span>'});$('yTabs').innerHTML=t;
if($('yMy'))$('yMy').style.cssText=S.my?bgi(S.my):'';
var h='';S.v.forEach(function(x,i){h+='<div class="yc"><div class="yv" style="'+bgi(x.th,BG[i%2])+'">'+(x.dur?'<div class="yu">'+esc(x.dur)+'</div>':'')+'</div><div class="yi"><i class="ya" style="'+bgi(x.av)+'"></i><div class="yx"><div class="yn">'+esc(x.n)+'</div><div class="ym">'+esc(x.ch)+'<span>▷'+esc(x.vw)+'</span><span>'+esc(x.time)+'</span></div></div>'+DOTS+'</div></div>'});
$('yL').innerHTML=h}
function list(){var h='';S.v.forEach(function(x,i){
h+='<div class="ec" data-i="'+i+'"><label>제목<input data-f="n" value="'+esc(x.n)+'"></label><label>채널명<input data-f="ch" value="'+esc(x.ch)+'"></label>'+
'<div class="row"><label>조회수<input data-f="vw" value="'+esc(x.vw)+'"></label><label>업로드 시간<input data-f="time" value="'+esc(x.time)+'"></label><label>길이<input data-f="dur" value="'+esc(x.dur)+'"></label></div>'+
'<div class="row" style="align-items:center"><label class="file">썸네일<input type="file" accept="image/*" data-f="th"></label><label class="file">채널 사진<input type="file" accept="image/*" data-f="av"></label></div>'+
'<div class="row"><button type="button" class="eb" data-a="u">↑</button><button type="button" class="eb" data-a="d">↓</button><button type="button" class="eb" data-a="x">✕ 삭제</button></div></div>'});
$('ylist').innerHTML=h}
function set(){
var o='';S.tabs.forEach(function(n,i){o+='<option value="'+i+'">'+esc(n)+'</option>'});$('iAct').innerHTML=o;$('iAct').value=S.act}
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var saved=localStorage.getItem(STORE);S=saved?JSON.parse(saved):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.v)||!Array.isArray(S.tabs)||S.tabs.length!==6)throw new Error('invalid saved data')}catch(e){S=JSON.parse(JSON.stringify(DEF))}}set();list();render()}
function rd(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
function glob(){S.act=$('iAct').value;persist();render()}
['iAct'].forEach(function(id){$(id).addEventListener('input',glob);$(id).addEventListener('change',glob)});
$('iMy').addEventListener('change',function(){if(this.files[0])rd(this.files[0],function(d){S.my=d;persist();render()})});
$('iMy_del').onclick=function(){S.my=''; $('iMy').value=''; persist(); render();};
var L=$('ylist'),ix=function(e){return +e.target.closest('.ec').dataset.i};
L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||e.target.type==='file'||e.target.type==='checkbox')return;S.v[ix(e)][f]=e.target.value;persist();render()});
L.addEventListener('change',function(e){var t=e.target,f=t.dataset.f;if(!f)return;var o=S.v[ix(e)];
if(t.type==='checkbox'){o[f]=t.checked;persist();render()}else if(t.type==='file'&&t.files[0])rd(t.files[0],function(d){o[f]=d;persist();render()})});
L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.v;
if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
persist();list();render()});
$('addV').onclick=function(){var l=S.v[S.v.length-1]||{ch:'채널명'};S.v.push({ch:l.ch,av:l.av,n:'',vw:'',time:'1시간 전',dur:'10:00',mu:false});persist();list();render()};
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas($('yf'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='youtube-timeline.png';
document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
load(false);
})();
