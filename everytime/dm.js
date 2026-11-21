(function(){
var $=function(i){return document.getElementById(i)};
var G=[['iTm','tm'],['iBt','bt'],['iNm','nm']];
function pick(a){return a[Math.floor(Math.random()*a.length)]}
var _MS=['오늘 뭐해?','ㅋㅋㅋ 그래','내일 봐요!','진짜?? 대박','응 알겠어','식사 하셨어요?','ㅇㅋ','다음에 봬요'];
var DEF={tm:'12:47',bt:'72',nm:'김민지',dt:'',av:'',m:[{d:'2026. 03. 04'},{t:pick(_MS)},{me:1,t:pick(_MS)},{t:pick(_MS),tm:'13:07'},{me:1,t:pick(_MS)},{t:pick(_MS),tm:'13:08'}]};
var S,STORE='editsoceur-everytime-dm-v1';
var AV='<svg class="av" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#f08a8a"/><ellipse cx="16" cy="30" rx="10" ry="8" fill="#fff"/><circle cx="16" cy="14" r="8" fill="#fdecec"/><circle cx="13" cy="13" r="1" fill="#f08a8a"/><circle cx="19" cy="13" r="1" fill="#f08a8a"/><path d="M13 16.500q3 2.500 6 0" stroke="#f08a8a" stroke-width="1.200" fill="none" stroke-linecap="round"/></svg>';
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('저장 실패',e)}}
function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function render(){
$('eTm').textContent=S.tm;$('eBn').textContent=S.bt;$('eBu').style.width=(+S.bt||0)+'%';$('dNm').textContent=S.nm;$('dDt').style.display='none';
var h='',i=0,m=S.m;
while(i<m.length){if(m[i].d){h+='<div class="dv">'+esc(m[i].d)+'</div>';i++;continue}var j=i;while(j+1<m.length&&!m[j+1].d&&!m[j+1].me===!m[i].me)j++;
var me=!!m[i].me;h+='<div class="g '+(me?'me':'rv')+'">'+(me?'':(S.av?'<i class="av" style="background:url('+S.av+') center/cover"></i>':AV)+'<div class="nm">'+esc(S.nm)+'</div>');
var fb=true,rc=0;for(var k=i;k<=j;k++){var x=m[k];
var tm=k===j&&x.tm?'<span class="tm">'+esc(x.tm)+'</span>':'';
var b='<div class="bb'+(me&&fb?' f':'')+'">'+esc(x.t)+'</div>';fb=false;
h+='<div class="rw"'+(rc++?'':' style="margin-top:0"')+'>'+(me?tm+b:b+tm)+'</div>'}
h+='</div>';i=j+1}
$('dL').innerHTML=h}
function list(){var h='';S.m.forEach(function(x,i){
if(x.d!==undefined){h+='<div class="xc" data-i="'+i+'"><label>날짜선<input data-f="d" value="'+esc(x.d)+'"></label><div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>';return}
h+='<div class="xc" data-i="'+i+'"><label>내용<input data-f="t" value="'+esc(x.t)+'"></label><div class="row"><label>시간(그룹 마지막만 표시)<input data-f="tm" value="'+esc(x.tm)+'"></label></div><div class="row"><label class="xk"><input type="checkbox" data-f="me"'+(x.me?' checked':'')+'> 내가 보냄</label></div>'+
'<div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'});
$('mlist').innerHTML=h}
function set(){G.forEach(function(p){$(p[0]).value=S[p[1]]})}
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var s=localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.m))throw 0;if(S.av===undefined)S.av=''}catch(e){S=JSON.parse(JSON.stringify(DEF))}}set();list();render()}
G.forEach(function(p){$(p[0]).addEventListener('input',function(){S[p[1]]=this.value;persist();render()})});
var L=$('mlist'),ix=function(e){return +e.target.closest('.xc').dataset.i};
L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||e.target.type==='checkbox')return;S.m[ix(e)][f]=e.target.value;persist();render()});
L.addEventListener('change',function(e){var t=e.target,f=t.dataset.f;if(t.type==='checkbox'&&f){S.m[ix(e)][f]=t.checked?1:0;persist();render()}});
L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.m;
if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
persist();list();render()});
$('addM').onclick=function(){S.m.push({me:Math.random()<.5?1:0,t:pick(_MS),tm:'13:10'});persist();list();render()};
$('addD').onclick=function(){S.m.push({d:'2026. 03. 04'});persist();list();render()};
$('iAv').addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){S.av=r.result;persist();render()};r.readAsDataURL(f)});
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return capChat($('df'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='everytime-dm.png';
document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
load(false);
})();
