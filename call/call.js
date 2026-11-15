(function(){
var $=function(i){return document.getElementById(i)};
var DEF={st:'0',num:'1588-3819',sub:'대한민국',cn:'연결 중...',tm:'00:00',c1:'#465b55',c2:'#2d453f'};
var S,STORE='editsoceur-call-v1';
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('저장 실패',e)}}
function render(){
var f=$('cf'),c0=S.st==='0';
f.classList.toggle('c0',c0);
f.style.setProperty('--c1',S.c1);f.style.setProperty('--c2',S.c2);
$('cS').textContent=c0?S.cn:S.tm;
$('cN').textContent=S.num;
$('cSub').textContent=S.sub;$('cSub').style.display=(c0&&S.sub)?'':'none'}
function set(){$('iSt').value=S.st;$('iNum').value=S.num;$('iSub').value=S.sub;$('iCn').value=S.cn;$('iTm').value=S.tm;$('iC1').value=S.c1;$('iC2').value=S.c2}
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var sv=localStorage.getItem(STORE);S=sv?JSON.parse(sv):JSON.parse(JSON.stringify(DEF));if(!S||typeof S.st!=='string')throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}set();render()}
function glob(){S.st=$('iSt').value;S.num=$('iNum').value;S.sub=$('iSub').value;S.cn=$('iCn').value;S.tm=$('iTm').value;S.c1=$('iC1').value;S.c2=$('iC2').value;persist();render()}
['iSt','iNum','iSub','iCn','iTm','iC1','iC2'].forEach(function(id){$(id).addEventListener('input',glob);$(id).addEventListener('change',glob)});
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas($('cf'),{scale:4,useCORS:true,backgroundColor:null,logging:false})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='call.png';
document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
document.addEventListener('dblclick',function(e){e.preventDefault()},{passive:false});
load(false);
})();
