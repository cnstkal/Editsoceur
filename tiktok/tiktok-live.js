(function(){
var $=function(i){return document.getElementById(i)};
function u(s){return 'data:image/svg+xml;utf8,'+encodeURIComponent(s)}
var BG=u('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 443" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8e0fb"/><stop offset="1" stop-color="#eafaff"/></linearGradient></defs><rect width="270" height="443" fill="url(#g)"/><g fill="#fff"><rect x="28" y="75" width="204" height="52" rx="26"/><circle cx="105" cy="78" r="45"/><circle cx="188" cy="95" r="32"/></g><path d="M0 312c40-22 100-20 150 6s80 28 120 20v105H0z" fill="#c2e083"/><path d="M0 365c60-34 150-28 200-4 30 14 50 16 70 12v70H0z" fill="#87a80a"/></svg>');
var S,F={iN:'n',iCp:'cp',iNow:'now',iTap:'tap',iIb:'ib'};
function draw(){
$('vN').textContent=S.n;$('vCp').textContent=S.cp;$('vNow').textContent=S.now;$('vTap').textContent=S.tap;
$('vIb').textContent=S.ib;$('vIb').style.display=S.ib?'block':'none';
$('vBg').src=S.bg;
$('vNow').style.display=S.tnow?'inline-block':'none';
$('vTapW').style.display=$('vLn').style.display=S.ttap?'flex':'none';
$('vLn').style.display=S.ttap?'block':'none';
$('vFy').classList.toggle('ul',S.tfy);
}
function init(){
S={n:'Name',cp:'add captions',now:'LIVE now',tap:'Tap to watch LIVE',ib:'00+',bg:BG,tnow:true,ttap:true,tfy:true};
for(var k in F)$(k).value=S[F[k]];
$('fBg').value='';$('tNow').checked=true;$('tTap').checked=true;$('tFy').checked=true;
draw();
}
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
Object.keys(F).forEach(function(k){$(k).oninput=function(){S[F[k]]=this.value;draw()}});
$('fBg').onchange=function(){rd(this.files[0],function(d){S.bg=d;draw()})};
$('tNow').onchange=function(){S.tnow=this.checked;draw()};
$('tTap').onchange=function(){S.ttap=this.checked;draw()};
$('tFy').onchange=function(){S.tfy=this.checked;draw()};
$('reset').onclick=init;
$('save').onclick=function(){
html2canvas($('snap'),{backgroundColor:null,scale:4,useCORS:true}).then(function(c){
var a=document.createElement('a');a.download='tiktok-live.png';a.href=c.toDataURL('image/png');a.click();
});
};
init();
})();
