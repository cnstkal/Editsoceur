(function(){
var $=function(i){return document.getElementById(i)};
function u(s){return 'data:image/svg+xml;utf8,'+encodeURIComponent(s)}
var H='<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8e0fb"/><stop offset="1" stop-color="#eafaff"/></linearGradient></defs>';
var B=u('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 369" preserveAspectRatio="xMidYMid slice">'+H+'<rect width="270" height="369" fill="url(#g)"/><g fill="#fff"><rect x="98" y="46" width="111" height="40" rx="20"/><circle cx="150" cy="52" r="30"/><circle cx="186" cy="68" r="22"/></g><path d="M0 262c40-18 100-12 150 10s80 20 120 12v85H0z" fill="#c2e083"/><path d="M0 300c70-30 150-20 200 0 30 12 55 14 70 10v59H0z" fill="#87a80a"/></svg>');
var M=u('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 106" preserveAspectRatio="xMidYMid slice">'+H+'<rect width="82" height="106" fill="url(#g)"/><g fill="#fff"><rect x="17" y="17" width="46" height="13" rx="6.500"/><circle cx="34" cy="18" r="9"/></g><path d="M0 72c20-6 45-4 82 8v26H0z" fill="#c2e083"/><path d="M0 86c25-12 55-10 82 0v20H0z" fill="#87a80a"/></svg>');
var S;
function draw(){
$('snap').dataset.m=S.m;
$('vB').src=S.b;$('vS').src=S.s;$('vT').textContent=S.t;$('vL').textContent=S.l;
$('vS').style.display=S.ts?'block':'none';
$('vX').style.display=(S.m==='b'&&S.tx)?'flex':'none';
$('vL').style.display=(S.m==='b'&&S.tl)?'block':'none';
document.querySelectorAll('.a-f').forEach(function(el){el.classList.toggle('hide',S.m!=='a')});
document.querySelectorAll('.b-f').forEach(function(el){el.classList.toggle('hide',S.m!=='b')});
}
function init(){
S={m:'a',b:B,s:M,t:'13:14',l:'BeReal.',ts:true,tx:true,tl:true};
$('iM').value='a';$('iT').value=S.t;$('iL').value=S.l;
$('tS').checked=$('tX').checked=$('tL').checked=true;
$('iB').value='';$('iS').value='';
draw();
}
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
$('iM').onchange=function(){S.m=this.value;draw()};
$('iB').onchange=function(){rd(this.files[0],function(d){S.b=d;draw()})};
$('iS').onchange=function(){rd(this.files[0],function(d){S.s=d;draw()})};
$('iT').oninput=function(){S.t=this.value;draw()};
$('iL').oninput=function(){S.l=this.value;draw()};
$('tS').onchange=function(){S.ts=this.checked;draw()};
$('tX').onchange=function(){S.tx=this.checked;draw()};
$('tL').onchange=function(){S.tl=this.checked;draw()};
$('reset').onclick=init;
$('save').onclick=function(){
html2canvas($('snap'),{backgroundColor:null,scale:4,useCORS:true}).then(function(c){
var a=document.createElement('a');a.download='bereal.png';a.href=c.toDataURL('image/png');a.click();
});
};
init();
})();
