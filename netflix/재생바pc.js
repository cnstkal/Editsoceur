(function(){
var $=function(i){return document.getElementById(i)};
var DEF={bg:'',ti:'Mars',ep:'시즌 1: 1화 외계인?',tm:'4:03',pg:'13.2',bf:'15.9',pl:false};
var T=[['iTi','ti'],['iEp','ep'],['iTm','tm'],['iPg','pg'],['iBf','bf']];
var S,STORE='editsoceur-netflix-player-pc-v1',pf=$('pf');
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('저장 실패',e)}}
function sv(vb,p,s,x){return '<svg viewBox="'+vb+'" style="width:'+s+'em;height:'+s+'em;'+(x||'')+'">'+p+'</svg>'}
function A(l,t,w,h,html,id,css){return '<div class="a"'+(id?' id="'+id+'"':'')+' style="left:'+l+'em;top:'+t+'em;width:'+w+'em;height:'+h+'em;'+(css||'')+'">'+html+'</div>'}
function tx(s,f,w,id,css){return '<s'+(id?' id="'+id+'"':'')+' style="font-size:'+f+'em;font-weight:'+(w||500)+';'+(css||'')+'">'+s+'</s>'}
var RW='<path d="M12 7.500A17.300 17.300 0 1 1 5 22M12 2v5.500h5.500"/>',
NX='<path d="M5 4.500v15L17 12zM20 4v16"/>',
EP='<rect x="2" y="9" width="16" height="12" rx="2"/><path d="M6 5.500h14a2 2 0 0 1 2 2V16M9.500 2H21"/>',
CC='<path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6l-4 3.500V17H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M6 9h4M13 9h5M6 12.500h12"/>',
SP='<path d="M4.500 19.500A9.500 9.500 0 1 1 19.500 19.500"/><circle cx="12" cy="14" r="2" fill="#fff"/><path d="M12 14l3.500-4.500"/>',
FS='<path d="M3 9V3h6M15 3h6v6M21 15v6h-6M9 21H3v-6"/>',
VL='<path d="M3 9.500v5h4l5 4.500V5L7 9.500zM15.500 8.500a5 5 0 0 1 0 7M18.500 6a9 9 0 0 1 0 12M21.500 3.500a13 13 0 0 1 0 17"/>',
PLY='<svg viewBox="0 0 34 40" style="width:34em;height:40em;fill:#fff;stroke:#fff;stroke-width:4"><path d="M3 3v34l28-17z"/></svg>',
PAU='<svg viewBox="0 0 34 40" style="width:34em;height:40em;fill:#fff;stroke:none"><rect x="5" y="2" width="9" height="36" rx="1.500"/><rect x="20" y="2" width="9" height="36" rx="1.500"/></svg>';
function build(){
pf.innerHTML='<div class="g gt"></div><div class="g gb"></div>'+
A(27,28,48,48,sv('0 0 24 24','<path d="M20 12H4M10 6l-6 6 6 6"/>',48,'stroke:#ccc;stroke-width:1.600'))+
A(22,947,1808,20,'<u id="pTk"></u><u id="pBf"></u><u id="pRd"></u><u id="pKb"></u>')+
A(1830,945,60,24,tx('',21,600,'pTm'),0,'justify-content:flex-end')+
A(36,1001,34,40,'','pPl')+
A(111,999,44,44,sv('0 0 44 44',RW,44))+A(111,999,44,44,tx('10',15,700),0,'justify-content:center')+
A(191,999,44,44,sv('0 0 44 44',RW,44,'transform:scaleX(-1)'))+A(191,999,44,44,tx('10',15,700),0,'justify-content:center')+
A(272,998,46,46,sv('0 0 24 24',VL,46))+
A(560,1001,800,40,tx('',24,700,'pTi')+tx('',24,400,'pEp','margin-left:13em'),0,'justify-content:center')+
A(1516,999,44,44,sv('0 0 24 24',NX,44))+
A(1596,998,46,46,sv('0 0 24 24',EP,46))+
A(1677,998,46,46,sv('0 0 24 24',CC,46))+
A(1759,999,44,44,sv('0 0 24 24',SP,44))+
A(1841,1000,44,44,sv('0 0 24 24',FS,44))}
function fit(){pf.style.fontSize=pf.clientWidth/1920+'px'}
function cl(v){return Math.max(0,Math.min(100,+v||0))}
function render(){
pf.style.backgroundImage=S.bg?"url('"+S.bg+"')":'';pf.classList.toggle('has',!!S.bg);
$('pTi').textContent=S.ti;$('pEp').textContent=S.ep;$('pTm').textContent=S.tm;
var p=cl(S.pg),b=Math.max(p,cl(S.bf));
$('pRd').style.width=p+'%';$('pBf').style.width=b+'%';$('pKb').style.left='calc('+p+'% - 7em)';
$('pPl').innerHTML=S.pl?PAU:PLY}
function set(){T.forEach(function(p){$(p[0]).value=S[p[1]]});$('iPl').checked=S.pl}
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var s=localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!S||typeof S!=='object')throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}set();render()}
function glob(){T.forEach(function(p){S[p[1]]=$(p[0]).value});S.pl=$('iPl').checked;persist();render()}
T.map(function(p){return p[0]}).concat(['iPl']).forEach(function(id){$(id).addEventListener('input',glob);$(id).addEventListener('change',glob)});
$('iBg').addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){S.bg=r.result;persist();render()};r.readAsDataURL(f)});
$('iClr').addEventListener('change',function(){S.bg='';this.checked=false;persist();render()});
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas(pf,{scale:1,useCORS:true,backgroundColor:'#000',logging:false,onclone:function(d){var c=d.getElementById('pf');c.style.width='1920px';c.style.fontSize='1px';c.style.borderRadius='0'}})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='netflix-player-pc.png';
document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';fit()};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
window.addEventListener('resize',fit);
build();fit();load(false);
})();
