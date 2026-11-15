(function(){
var $=function(i){return document.getElementById(i)};
var DEF={tm:'12:47',bt:'72',nm:'김민지',dt:'2026. 03. 04',m:[{me:1,s:1},{me:1,t:'김민지님을 콕 찔렀어요!'},{me:1,t:'똥먹어'},{me:1,t:'똥머거',tm:'13:07'},{t:'좆까'},{t:'어머',tm:'13:08'},{me:1,t:'ㅋ',tm:'13:08'}]};
var G=[['iTm','tm'],['iBt','bt'],['iNm','nm'],['iDt','dt']];
var S,STORE='editsoceur-everytime-dm-v1';
var AV='<svg class="av" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#f08a8a"/><ellipse cx="16" cy="30" rx="10" ry="8" fill="#fff"/><circle cx="16" cy="14" r="8" fill="#fdecec"/><circle cx="13" cy="13" r="1" fill="#f08a8a"/><circle cx="19" cy="13" r="1" fill="#f08a8a"/><path d="M13 16.500q3 2.500 6 0" stroke="#f08a8a" stroke-width="1.200" fill="none" stroke-linecap="round"/></svg>',
SK='<svg class="stk" width="49" height="55" viewBox="0 0 50 56"><g transform="rotate(40 28 22)"><rect x="21" y="-4" width="14" height="30" rx="7" fill="#f7d754" stroke="#f0c437" stroke-width="2.200"/></g><path d="M4 36Q4 25 16 22L33 28Q46 34 40 48L24 54Q8 52 4 36z" fill="#f7d754" stroke="#f0c437" stroke-width="2.400" stroke-linejoin="round"/></svg>';
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('저장 실패',e)}}
function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function render(){
$('eTm').textContent=S.tm;$('eBn').textContent=S.bt;$('eBu').style.width=(+S.bt||0)+'%';$('dNm').textContent=S.nm;$('dDt').textContent=S.dt;
var h='',i=0,m=S.m;
while(i<m.length){var j=i;while(j+1<m.length&&!m[j+1].me===!m[i].me)j++;
var me=!!m[i].me;h+='<div class="g '+(me?'me':'rv')+'">'+(me?'':AV+'<div class="nm">'+esc(S.nm)+'</div>');
var fb=true,rc=0;for(var k=i;k<=j;k++){var x=m[k];
if(x.s){h+=SK;continue}
var tm=k===j&&x.tm?'<span class="tm">'+esc(x.tm)+'</span>':'';
var b='<div class="bb'+(me&&fb?' f':'')+'">'+esc(x.t)+'</div>';fb=false;
h+='<div class="rw"'+(rc++?'':' style="margin-top:0"')+'>'+(me?tm+b:b+tm)+'</div>'}
h+='</div>';i=j+1}
$('dL').innerHTML=h}
function list(){var h='';S.m.forEach(function(x,i){
h+='<div class="xc" data-i="'+i+'"><label>내용<input data-f="t" value="'+esc(x.t)+'"></label><div class="row"><label>시간(그룹 마지막만 표시)<input data-f="tm" value="'+esc(x.tm)+'"></label></div><div class="row"><label class="xk"><input type="checkbox" data-f="me"'+(x.me?' checked':'')+'> 내가 보냄</label><label class="xk"><input type="checkbox" data-f="s"'+(x.s?' checked':'')+'> 콕 스티커</label></div>'+
'<div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'});
$('mlist').innerHTML=h}
function set(){G.forEach(function(p){$(p[0]).value=S[p[1]]})}
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var s=localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.m))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}set();list();render()}
G.forEach(function(p){$(p[0]).addEventListener('input',function(){S[p[1]]=this.value;persist();render()})});
var L=$('mlist'),ix=function(e){return +e.target.closest('.xc').dataset.i};
L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||e.target.type==='checkbox')return;S.m[ix(e)][f]=e.target.value;persist();render()});
L.addEventListener('change',function(e){var t=e.target,f=t.dataset.f;if(t.type==='checkbox'&&f){S.m[ix(e)][f]=t.checked?1:0;persist();render()}});
L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.m;
if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
persist();list();render()});
$('addM').onclick=function(){S.m.push({me:1,t:'',tm:'13:10'});persist();list();render()};
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas($('df'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='everytime-dm.png';
document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
load(false);
})();
