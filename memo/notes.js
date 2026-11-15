(function(){
var $=function(i){return document.getElementById(i)};
var DEF={d:'2026년 11월 16일 오전 12:25',t:'안녕하세요',b:'안녕허세요'};
var S,STORE='editsoceur-notes-v1';
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('저장 실패',e)}}
function render(){$('nD').textContent=S.d;$('nT').textContent=S.t;$('nB').textContent=S.b}
function set(){$('iD').value=S.d;$('iT').value=S.t;$('iB').value=S.b}
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var sv=localStorage.getItem(STORE);S=sv?JSON.parse(sv):JSON.parse(JSON.stringify(DEF));if(!S||typeof S.t!=='string')throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}set();render()}
function glob(){S.d=$('iD').value;S.t=$('iT').value;S.b=$('iB').value;persist();render()}
['iD','iT','iB'].forEach(function(id){$(id).addEventListener('input',glob)});
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas($('nf'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='notes.png';
document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
document.addEventListener('dblclick',function(e){e.preventDefault()},{passive:false});
load(false);
})();
