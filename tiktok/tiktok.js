(function(){
var $=function(i){return document.getElementById(i)};
function u(s){return 'data:image/svg+xml;utf8,'+encodeURIComponent(s)}
var H='<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8e0fb"/><stop offset="1" stop-color="#eafaff"/></linearGradient></defs>';
var V=u('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 303" preserveAspectRatio="xMidYMid slice">'+H+'<rect width="270" height="303" fill="url(#g)"/><g fill="#fff"><rect x="62" y="48" width="139" height="40" rx="20"/><circle cx="130" cy="50" r="32"/><circle cx="170" cy="62" r="24"/></g><path d="M0 225c50-22 110-18 170 8s80 22 100 14v56H0z" fill="#c2e083"/><path d="M0 246c60-30 150-24 200 0 30 14 55 18 70 14v43H0z" fill="#87a80a"/></svg>');
var C=u('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid slice">'+H+'<rect width="40" height="40" fill="url(#g)"/><g fill="#fff"><rect x="8" y="8" width="24" height="8" rx="4"/><circle cx="18" cy="9" r="6"/></g><path d="M0 26c10-6 22-6 40 2v12H0z" fill="#c2e083"/><path d="M0 32c14-6 28-5 40 0v8H0z" fill="#87a80a"/></svg>');
var S,F={iN:'n',iT:'t',iCp:'cp',iM:'m',iRp:'rp',iSr:'sr',iL:'l',iC:'c',iB:'b',iS:'s',iIb:'ib'},
G={fVid:'vid',fAv:'av',fSa:'sa',fD:'d'};
function draw(){
$('vN').textContent=S.n;$('vT').textContent=S.t;$('vCp').textContent=S.cp;$('vM').textContent=S.m;
$('vRp').textContent=S.rp;$('vSr').textContent=S.sr;
$('vL').textContent=S.l;$('vC').textContent=S.c;$('vB').textContent=S.b;$('vS').textContent=S.s;$('vIb').textContent=S.ib;
$('vIb').style.display=S.ib?'block':'none';
$('vVid').src=S.vid;$('vAv').src=S.av;$('vSa').src=S.sa;$('vD').src=S.d;
$('vRpW').style.display=S.trp?'flex':'none';
$('vFy').classList.toggle('ul',S.tfy);
}
function init(){
S={n:'이름',t:'제목...',cp:'캡션...',m:'가수 · 곡 제목',rp:'리포스트함',sr:'검색어',l:'000',c:'000',b:'000',s:'000',ib:'00+',vid:V,av:C,sa:C,d:C,trp:true,tfy:false};
for(var k in F)$(k).value=S[F[k]];
for(k in G)$(k).value='';
$('tRp').checked=true;$('tFy').checked=false;
draw();
}
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
Object.keys(F).forEach(function(k){$(k).oninput=function(){S[F[k]]=this.value;draw()}});
Object.keys(G).forEach(function(k){$(k).onchange=function(){rd(this.files[0],function(d){S[G[k]]=d;draw()})}});
$('tRp').onchange=function(){S.trp=this.checked;draw()};
$('tFy').onchange=function(){S.tfy=this.checked;draw()};
$('reset').onclick=init;
$('save').onclick=function(){
var snap=$('snap');snap.style.transform='none';
html2canvas(snap,{backgroundColor:null,scale:4,useCORS:true}).then(function(c){
snap.style.transform='';
var a=document.createElement('a');a.download='tiktok.png';a.href=c.toDataURL('image/png');a.click();
},function(){snap.style.transform=''});
};
document.querySelectorAll('.edit-tab').forEach(function(btn){
btn.addEventListener('click',function(){
document.querySelectorAll('.edit-tab').forEach(function(x){x.classList.toggle('active',x===btn)});
document.querySelectorAll('.edit-panel').forEach(function(x){x.classList.toggle('active',x.id==='panel-'+btn.dataset.panel)});
});
});
init();
})();
