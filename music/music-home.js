(function(){
var $=function(i){return document.getElementById(i)};
function u(s){return 'data:image/svg+xml;utf8,'+encodeURIComponent(s)}
var H='<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8e0fb"/><stop offset="1" stop-color="#eafaff"/></linearGradient></defs>';
var P=u('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 75" preserveAspectRatio="xMidYMid slice">'+H+'<rect width="76" height="75" fill="url(#g)"/><g fill="#fff"><rect x="24" y="8" width="30" height="12" rx="6"/><circle cx="36" cy="9" r="8"/></g><path d="M0 52c14-8 30-8 44-2s22 6 32 2v23H0z" fill="#c2e083"/><path d="M0 60c20-8 44-6 76 2v13H0z" fill="#87a80a"/></svg>');
var R=u('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118 118" preserveAspectRatio="xMidYMid slice">'+H+'<rect width="118" height="118" fill="url(#g)"/><g fill="#fff"><rect x="42" y="10" width="42" height="14" rx="7"/><circle cx="56" cy="11" r="9"/></g><path d="M0 44c25-12 55-10 118 2v72H0z" fill="#c2e083"/><path d="M0 52c30-12 70-8 118 8v58H0z" fill="#87a80a"/></svg>');
var S;
function init(){
var p=[];for(var i=0;i<6;i++)p.push({t:'playlist',i:P});
S={t:'Library',h:'Recently Added',av:P,P:p,R:[{i:R},{i:R}]};
$('iT').value=S.t;$('iH').value=S.h;$('fAv').value='';
ed();draw();
}
function e(t){return t.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function draw(){
$('vT').textContent=S.t;$('vH').textContent=S.h;$('vAv').src=S.av;
$('pl').innerHTML=S.P.map(function(x){return '<div><img src="'+x.i+'"><span>'+e(x.t)+'</span></div>'}).join('');
$('ra').innerHTML=S.R.map(function(x){return '<img src="'+x.i+'">'}).join('');
}
function ed(){
$('edP').innerHTML=S.P.map(function(x,i){return '<div class="it"><b>'+(i+1)+'</b><input data-i="'+i+'" value="'+e(x.t)+'"><input type="file" accept="image/*" data-g="P" data-i="'+i+'"></div>'}).join('');
$('edR').innerHTML=S.R.map(function(x,i){return '<div class="it"><b>'+(i+1)+'</b><input type="file" accept="image/*" data-g="R" data-i="'+i+'"></div>'}).join('');
}
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
$('iT').oninput=function(){S.t=this.value;draw()};
$('iH').oninput=function(){S.h=this.value;draw()};
$('fAv').onchange=function(){rd(this.files[0],function(d){S.av=d;draw()})};
$('edP').addEventListener('input',function(ev){var t=ev.target;if(t.type!=='file'){S.P[t.dataset.i].t=t.value;draw()}});
document.querySelector('.side').addEventListener('change',function(ev){var t=ev.target;if(t.dataset.g)rd(t.files[0],function(d){S[t.dataset.g][t.dataset.i].i=d;draw()})});
$('reset').onclick=init;
$('save').onclick=function(){
html2canvas($('snap'),{backgroundColor:null,scale:4,useCORS:true}).then(function(c){
var a=document.createElement('a');a.download='music-home.png';a.href=c.toDataURL('image/png');a.click();
});
};
init();
})();
