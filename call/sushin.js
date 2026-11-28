(function(){
var $=function(i){return document.getElementById(i)};
var DEF={st:'2',rn:'성화',rs:'휴대전화',c3:'#303030',num:'1588-3819',sub:'대한민국',cn:'연결 중...',tm:'00:00',c1:'#465b55',c2:'#2d453f',ed:'통화 종료',e1:'#3a5a52',e2:'#294a41'};
var S,STORE='editsoceur-sushin-v1';
var IDS={iSt:'st',iRn:'rn',iRs:'rs',iC3:'c3',iNum:'num',iCn:'cn',iTm:'tm',iC1:'c1',iC2:'c2',iEd:'ed',iE1:'e1',iE2:'e2'};
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
function render(){
var f=$('cf'),d=S.st==='3';
f.classList.toggle('c0',S.st==='0'||d);f.classList.toggle('c2',S.st==='2');f.classList.toggle('c3',d);
f.style.setProperty('--c1',d?S.e1:S.c1);f.style.setProperty('--c2',d?S.e2:S.c2);f.style.setProperty('--c3',S.c3);
$('cS').textContent=d?S.ed:(S.st==='0'?S.cn:S.tm);
$('cN').textContent=d?S.rn:S.num;

$('rN').textContent=S.rn;$('rS').textContent=S.rs;$('rS').style.display=S.rs?'':'none'}
function set(){for(var k in IDS)$(k).value=S[IDS[k]]}
function load(reset){
if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}
else{try{var sv=localStorage.getItem(STORE);S=sv?JSON.parse(sv):JSON.parse(JSON.stringify(DEF));if(!S||typeof S.st!=='string')throw 0;for(var k in DEF)if(S[k]==null)S[k]=DEF[k]}catch(e){S=JSON.parse(JSON.stringify(DEF))}}
set();render()}
function glob(){for(var k in IDS)S[IDS[k]]=$(k).value;persist();render()}
Object.keys(IDS).forEach(function(id){$(id).addEventListener('input',glob);$(id).addEventListener('change',glob)});
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas($('cf'),{scale:4,useCORS:true,backgroundColor:null,logging:false})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='sushin.png';
document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
document.addEventListener('dblclick',function(e){e.preventDefault()},{passive:false});
load(false);
})();
