(function(){
var $=function(i){return document.getElementById(i)};
var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 140" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8e0fb"/><stop offset="1" stop-color="#eafaff"/></linearGradient></defs><rect width="150" height="140" fill="url(#g)"/><g fill="#fff"><rect x="40" y="26" width="60" height="20" rx="10"/><circle cx="68" cy="28" r="14"/></g><path d="M0 98c25-14 55-14 80-2s50 10 70 2v42H0z" fill="#c2e083"/><path d="M0 110c40-14 90-10 150 6v24H0z" fill="#87a80a"/></svg>';
var P='data:image/svg+xml;utf8,'+encodeURIComponent(s),S;
var I='add text here add text here add text here add text',O='add text here add text add text add text add text add ...';
function m(sd,t,img){return{s:sd,t:t,tm:'20.00',i:img||''}}
function init(){
S={n:'homekeith',st:'last seen recently',av:P,bn:'99',kb:true,inp:'Add text here!',
M:[m('i',I),m('i',I),m('o',O),m('o',O),m('i',I),m('o',O),m('i',I),m('i','add text here add text',P)]};
$('iN').value=S.n;$('iSt').value=S.st;$('iBn').value=S.bn;$('iInp').value=S.inp;$('iKb').checked=true;$('iAv').value='';
ed();draw();
}
function e(t){return t.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var SM='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#8a8f98" stroke-width="1"><circle cx="6" cy="6" r="5.200"/><path d="M3.800 7.200q2.200 2 4.400 0"/><circle cx="4.300" cy="4.800" r=".4" fill="#8a8f98"/><circle cx="7.700" cy="4.800" r=".4" fill="#8a8f98"/></svg>';
var KR=[['Q','W','E','R','T','Y','U','I','O','P'],['A','S','D','F','G','H','J','K','L'],['⇧','Z','X','C','V','B','N','M','⌫']];
function draw(){
$('vN').textContent=S.n;$('vSt').textContent=S.st;$('vAv').src=S.av;$('vBn').textContent=S.bn;
var h='',p='';
S.M.forEach(function(x){
var o=x.s==='o',sw=p&&p!==x.s;p=x.s;
var tm='<span class="t">'+e(x.tm)+(o?'<u>✓✓</u>':'')+'</span>';
h+='<div class="m'+(o?' o':'')+(sw?' sw':'')+'"><div class="b'+(x.i?' im':'')+'">'+(x.i?'<img src="'+x.i+'"><p>'+tm+e(x.t)+'</p>':tm+e(x.t))+'</div></div>';
});
var c=$('chat');c.innerHTML=h;c.style.height=(S.kb?240:394)+'px';
var ip=$('inp'),has=S.inp.length>0;
ip.style.top=(S.kb?293:448)+'px';ip.style.height=(S.kb?26:27)+'px';
ip.innerHTML=SM+'<span class="'+(has?'':'ph')+'">'+e(has?S.inp:'Message')+'</span>'+
(has||S.kb?'<div class="snd"><svg width="11" height="11" viewBox="0 0 11 11" fill="#fff"><path d="M10.500.5.5 4.500l3.500 1.500 1 4.500z"/></svg></div>':'<div class="snd"><svg width="8" height="11" viewBox="0 0 8 11" fill="none" stroke="#fff" stroke-width="1.200"><rect x="2.500" y="0.500" width="3" height="6" rx="1.500" fill="#fff"/><path d="M.8 5a3.200 3.200 0 0 0 6.400 0M4 8.200V10.500"/></svg></div>');
var k=$('kbd');k.style.display=S.kb?'block':'none';
if(S.kb&&!k.dataset.b){
var kh='<div class="sg"><div>I</div><div>The</div><div>I\'m</div><div>≡A</div></div>';
KR.forEach(function(r,i){kh+='<div class="kr" style="top:'+(31+i*31.500)+'px">'+r.map(function(c){return '<div class="k'+(c==='⇧'||c==='⌫'?' g" style="min-width:33px':'')+'">'+c+'</div>'}).join('')+'</div>'});
kh+='<div class="kr" style="top:127px"><div class="k g" style="min-width:27px;font-size:9px">123</div><div class="k g" style="min-width:24px">☺</div><div class="k" style="flex:1"></div><div class="k g" style="min-width:61px">↵</div></div>';
k.innerHTML=kh;k.dataset.b=1;
}
}
function ed(){
$('ed').innerHTML=S.M.map(function(x,i){return '<div class="it"><select data-i="'+i+'" data-k="s"><option value="i"'+(x.s==='i'?' selected':'')+'>상대</option><option value="o"'+(x.s==='o'?' selected':'')+'>나</option></select><input class="tx" data-i="'+i+'" data-k="t" value="'+e(x.t)+'" placeholder="메시지"><input class="tm" data-i="'+i+'" data-k="tm" value="'+e(x.tm)+'" placeholder="시간"><input type="file" accept="image/*" data-i="'+i+'"><button data-d="'+i+'" type="button">✕</button></div>'}).join('');
}
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
[['iN','n'],['iSt','st'],['iBn','bn'],['iInp','inp']].forEach(function(a){$(a[0]).oninput=function(){S[a[1]]=this.value;draw()}});
$('iKb').onchange=function(){S.kb=this.checked;draw()};
$('iAv').onchange=function(){rd(this.files[0],function(d){S.av=d;draw()})};
$('add').onclick=function(){S.M.push(m('i','add text here'));ed();draw()};
$('ed').addEventListener('input',function(ev){var t=ev.target;if(t.dataset.k&&t.tagName!=='SELECT'){S.M[t.dataset.i][t.dataset.k]=t.value;draw()}});
$('ed').addEventListener('change',function(ev){var t=ev.target;
if(t.tagName==='SELECT'){S.M[t.dataset.i].s=t.value;draw()}
else if(t.type==='file')rd(t.files[0],function(d){S.M[t.dataset.i].i=d;draw()})});
$('ed').addEventListener('click',function(ev){var d=ev.target.dataset.d;if(d!=null){S.M.splice(d,1);ed();draw()}});
$('reset').onclick=function(){$('kbd').dataset.b='';init()};
$('save').onclick=function(){
html2canvas($('snap'),{backgroundColor:null,scale:4,useCORS:true}).then(function(c){
var a=document.createElement('a');a.download='telegram.png';a.href=c.toDataURL('image/png');a.click();
});
};
init();
})();
