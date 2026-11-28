(function(){
var $=function(i){return document.getElementById(i)};
var DEF={st:'2',ar:'p',rn:'성화',num:'1588-3819',sub:'대한민국',cn:'연결 중...',tm:'00:00',ed:'통화 종료',bg:'',ty:'0'};
var S,STORE='editsoceur-sushin-v1';
var IDS={iSt:'st',iAr:'ar',iRn:'rn',iCn:'cn',iTm:'tm',iEd:'ed',iTy:'ty'};
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
function render(){
var f=$('cf'),d=S.st==='3';
f.classList.toggle('c0',S.st==='0'||d);f.classList.toggle('c2',S.st==='2');f.classList.toggle('c3',d);f.classList.toggle('wide',S.ar==='w');document.querySelector('.phone').classList.toggle('is-wide',S.ar==='w');
$('rowEnd').style.display=d?'':'none';
f.style.setProperty('background-image',S.bg?'linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.25)),url("'+S.bg+'")':'','important');f.style.backgroundSize='cover';f.style.setProperty('--ty',(+S.ty||0)+'cqw');f.style.backgroundPosition='center';
$('cS').textContent=d?S.ed:(S.st==='0'?S.cn:S.tm);
$('cN').textContent=S.rn;

$('rN').textContent=S.rn;$('rowTime').style.display=S.st==='0'?'none':'';}
function set(){for(var k in IDS)$(k).value=S[IDS[k]]}
function load(reset){
if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}
else{try{var sv=localStorage.getItem(STORE);S=sv?JSON.parse(sv):JSON.parse(JSON.stringify(DEF));if(!S||typeof S.st!=='string')throw 0;for(var k in DEF)if(S[k]==null)S[k]=DEF[k]}catch(e){S=JSON.parse(JSON.stringify(DEF))}}
set();render()}
function glob(){for(var k in IDS)S[IDS[k]]=$(k).value;persist();render()}
Object.keys(IDS).forEach(function(id){$(id).addEventListener('input',glob);$(id).addEventListener('change',glob)});
$('reset').onclick=function(){load(true)};
$('iBg').addEventListener('change',function(){var f=this.files&&this.files[0];if(!f)return;var u=URL.createObjectURL(f),im=new Image();im.onload=function(){var m=Math.min(1,1000/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*m);c.height=Math.round(im.height*m);c.getContext('2d').drawImage(im,0,0,c.width,c.height);S.bg=c.toDataURL('image/jpeg',.85);URL.revokeObjectURL(u);glob()};im.src=u});
$('bgRm').onclick=function(){S.bg='';$('iBg').value='';persist();render()};
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
