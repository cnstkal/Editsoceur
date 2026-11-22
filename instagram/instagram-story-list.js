(function(){
var $=function(i){return document.getElementById(i)};
var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89 155" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8e0fb"/><stop offset="1" stop-color="#eafaff"/></linearGradient></defs><rect width="89" height="155" fill="url(#g)"/><g fill="#fff"><rect x="12" y="26" width="66" height="19" rx="9.500"/><circle cx="36" cy="28" r="14"/></g><path d="M0 125c18-10 40-10 55-2s24 8 34 4v28H0z" fill="#c2e083"/><path d="M0 138c25-8 55-6 89 4v13H0z" fill="#87a80a"/></svg>';
var P='data:image/svg+xml;utf8,'+encodeURIComponent(s),S;
var ON=[0,1,4,5,7];
function init(){
S=[];for(var i=0;i<9;i++)S.push({i:P,b:ON.indexOf(i)>-1,d:'10',m:'9월'});
ed();draw();
}
function e(t){return t.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function draw(){
$('grid').innerHTML=S.map(function(c){return '<div class="c"><img src="'+c.i+'">'+(c.b?'<div class="bd"><b>'+e(c.d)+'</b><small>'+e(c.m)+'</small></div>':'')+'</div>'}).join('');
}
function ed(){
$('ed').innerHTML=S.map(function(c,i){return '<div class="it"><b>'+(i+1)+'</b><input type="file" accept="image/*" data-i="'+i+'"><input type="checkbox" data-i="'+i+'" data-k="b"'+(c.b?' checked':'')+'><input class="d" data-i="'+i+'" data-k="d" value="'+e(c.d)+'"><input class="m" data-i="'+i+'" data-k="m" value="'+e(c.m)+'"></div>'}).join('');
}
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
$('ed').addEventListener('input',function(ev){var t=ev.target;if(t.dataset.k&&t.type!=='checkbox'){S[t.dataset.i][t.dataset.k]=t.value;draw()}});
$('ed').addEventListener('change',function(ev){var t=ev.target;
if(t.type==='file')rd(t.files[0],function(d){S[t.dataset.i].i=d;draw()});
else if(t.type==='checkbox'){S[t.dataset.i].b=t.checked;draw()}});
$('reset').onclick=init;
$('save').onclick=function(){
var __s=$('snap'),__z=__s.style.zoom;__s.style.zoom=1;html2canvas(__s,{backgroundColor:null,scale:4,useCORS:true}).finally(function(){__s.style.zoom=__z}).then(function(c){
var a=document.createElement('a');a.download='instagram-story-list.png';a.href=c.toDataURL('image/png');a.click();
});
};
init();
})();

function fitSnap(){var w=document.querySelector('.stage').clientWidth;document.getElementById('snap').style.zoom=w?w/270:1}
addEventListener('resize',fitSnap);fitSnap();
