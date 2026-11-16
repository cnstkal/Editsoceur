(function(){
var $=function(i){return document.getElementById(i)};
var DEF={ti:"시즌 2: 1화 '1화'",tm:'7:27',pg:'7.7',br:'58',sb:'감사합니다!',pl:true};
var T=[['iTi','ti'],['iTm','tm'],['iPg','pg'],['iBr','br'],['iSb','sb']];
var S,STORE='editsoceur-netflix-player-v1',pf=$('pf');
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('저장 실패',e)}}
function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function sv(p,w,x){return '<svg viewBox="0 0 24 24" style="width:'+w+'em;height:'+w+'em;'+(x||'')+'">'+p+'</svg>'}
function A(l,t,w,h,html,id,css){return '<div class="a"'+(id?' id="'+id+'"':'')+' style="left:'+l+'em;top:'+t+'em;width:'+w+'em;height:'+h+'em;'+(css||'')+'">'+html+'</div>'}
function tx(s,f,w,id){return '<s'+(id?' id="'+id+'"':'')+' style="font-size:'+f+'em;font-weight:'+(w||500)+'">'+s+'</s>'}
var TU='<path d="M7 10v12M15 5.880 14 10h5.830a2 2 0 0 1 1.920 2.560l-2.330 8A2 2 0 0 1 17.500 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.760a2 2 0 0 0 1.790-1.110L12 2a3.130 3.130 0 0 1 3 3.880z"/>',
TD='<path d="M17 14V2M9 18.120 10 14H4.170a2 2 0 0 1-1.920-2.560l2.330-8A2 2 0 0 1 6.500 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.760a2 2 0 0 0-1.790 1.110L12 22a3.130 3.130 0 0 1-3-3.880z"/>',
CA='<path d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8M2 16a5 5 0 0 1 4 4M2 20h.01"/>',
RP='<svg viewBox="0 0 40 40" style="width:40em;height:40em;stroke-width:2.400%s"><path d="M8 10A17 17 0 1 0 15.600 5.600M4 4v6h6"/></svg>';
function bi(l,ic,w,t){return A(l,342,200,22,sv(ic,w)+'<s style="font-size:14.500em;font-weight:500;margin-left:.62em">'+t+'</s>')}
function build(){
pf.innerHTML=
A(0,333,852,28,tx('',19,500,'pSb'),'',"justify-content:center;opacity:.3")+
A(71,31,19,19,sv('<path d="M3 3l18 18M21 3 3 21"/>',19,'stroke-width:2.300'))+
A(105,32,250,20,tx('',13,600,'pTi'))+
A(648,31,22,22,sv(CA,22))+
A(704,31,22,22,sv('<rect x="2" y="4" width="20" height="16" rx="2"/><rect x="11.500" y="12" width="8" height="5" rx="1"/>',22))+
A(760,29,24,24,sv('<rect x="4" y="10.500" width="16" height="11" rx="2"/><path d="M8 10.500V7a4 4 0 0 1 8-1M10.500 16h3"/>',24))+
A(70,109,22,22,sv('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.900 4.900l1.400 1.400M17.700 17.700l1.400 1.400M2 12h2M20 12h2M4.900 19.100l1.400-1.400M17.700 6.300l1.400-1.400"/>',22))+
A(78,140,6,125,'<u id="pBr" style="position:absolute;left:0;right:0;bottom:0;background:#fff;border-radius:3em"></u>',0,'background:#5a5a5a;border-radius:3em;overflow:hidden')+
A(192,167,40,40,RP.replace('%s',''))+A(192,167,40,40,tx('10',14.500,700),0,'justify-content:center')+
A(619,167,40,40,RP.replace('%s',';transform:scaleX(-1)'))+A(619,167,40,40,tx('10',14.500,700),0,'justify-content:center')+
A(413,169,30,36,'',0)+'<div id="pPl" class="a" style="left:413em;top:169em;width:30em;height:36em;justify-content:center"></div>'+
A(80,311,608,22,'<u style="position:absolute;left:0;right:0;top:9em;height:4em;border-radius:2em;background:#6b6b6b"></u><u id="pRd" style="position:absolute;left:0;top:9em;height:4em;border-radius:2em;background:#e50914"></u><u id="pKb" style="position:absolute;top:2em;width:18em;height:18em;border-radius:50%;background:#d4281f"></u>')+
A(726,311,45,22,tx('',15,500,'pTm'))+
bi(188,'<path d="M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM20 4 8.120 15.880M14.470 14.480 20 20M8.120 8.120 12 12"/>',22,'잘라내기')+
bi(289,'<path d="M4.500 19.500A9.500 9.500 0 1 1 19.500 19.500"/><circle cx="12" cy="14" r="2" fill="#fff"/><path d="M12 14l3.500-4.500"/>',24,'속도(1x)')+
bi(393,'<rect x="2" y="9" width="16" height="12" rx="2"/><path d="M6 5.500h14a2 2 0 0 1 2 2V16M9.500 2H21"/>',23,'회차')+
bi(469,'<path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-6l-4 3v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M7 10h3.500M13.500 10H17M7 13.500h10"/>',23,'음성 및 자막')+
bi(592,'<path d="M5 4.500v15L17 12zM20 4v16"/>',21,'다음 화');
var ps=pf.querySelectorAll('.a');for(var i=0;i<ps.length;i++)if(!ps[i].innerHTML&&!ps[i].id&&ps[i].style.width==='30em')ps[i].remove()}
function fit(){pf.style.fontSize=pf.clientWidth/852+'px'}
function render(){
pf.style.backgroundImage=S.bg?"url('"+S.bg+"')":'';
$('pTi').textContent=S.ti;$('pTm').textContent=S.tm;$('pSb').textContent=S.sb;
var p=Math.max(0,Math.min(100,+S.pg||0));
$('pRd').style.width=p+'%';$('pKb').style.left='calc('+p+'% - 9em)';
$('pBr').style.height=(+S.br||0)+'%';
$('pPl').innerHTML=S.pl?'<svg viewBox="0 0 30 36" style="width:30em;height:36em;fill:#fff;stroke:none"><rect x="0" y="0" width="8" height="36"/><rect x="21.500" y="0" width="8" height="36"/></svg>':'<svg viewBox="0 0 30 36" style="width:30em;height:36em;fill:#fff;stroke:#fff;stroke-width:3"><path d="M2 2v32l27-16z"/></svg>'}
function set(){T.forEach(function(p){$(p[0]).value=S[p[1]]});$('iPl').checked=S.pl}
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var s=localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!S||typeof S!=='object')throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}set();render()}
function glob(){T.forEach(function(p){S[p[1]]=$(p[0]).value});S.pl=$('iPl').checked;persist();render()}
T.map(function(p){return p[0]}).concat(['iPl']).forEach(function(id){$(id).addEventListener('input',glob);$(id).addEventListener('change',glob)});
$('iBg').addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){S.bg=r.result;persist();render()};r.readAsDataURL(f)});
$('iClr').addEventListener('change',function(){S.bg='';this.checked=false;persist();render()});
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas(pf,{scale:3,useCORS:true,backgroundColor:'#000',logging:false,onclone:function(d){var c=d.getElementById('pf');c.style.width='852px';c.style.fontSize='1px';c.style.borderRadius='0'}})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='netflix-player.png';
document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
window.addEventListener('resize',fit);
build();fit();load(false);
})();
