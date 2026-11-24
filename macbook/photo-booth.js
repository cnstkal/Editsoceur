(function(){
var $=function(i){return document.getElementById(i)};
var D={Title:'Photo Booth',Fx:'Effects',View:2,Mir:false,Sh:true},url='';
function load(){$('iTitle').value=D.Title;$('iFx').value=D.Fx;$('iView').value=D.View;$('iMir').checked=D.Mir;$('iSh').checked=D.Sh;url='';$('iPhoto').value='';r()}
function r(){
$('vTitle').textContent=$('iTitle').value;$('vFx').textContent=$('iFx').value;
var v=Math.max(1,Math.min(3,+$('iView').value||2));
[].forEach.call($('seg').children,function(e,i){e.classList.toggle('on',i==v-1)});
$('win').classList.toggle('sh',$('iSh').checked);
var p=$('vp');p.classList.toggle('m',$('iMir').checked);p.classList.toggle('on',!!url);if(url)$('vImg').src=url;
}
['iTitle','iFx','iView','iMir','iSh'].forEach(function(k){$(k).addEventListener('input',r)});
$('iPhoto').onchange=function(){if(this.files[0]){url=URL.createObjectURL(this.files[0]);r()}};
$('clr').onclick=function(){url='';$('iPhoto').value='';r()};
$('reset').onclick=load;
$('save').onclick=function(){
var pad=$('pad'),ch=pad.parentNode,bg=ch.style.background;ch.style.background='none';
(document.fonts?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas(pad,{backgroundColor:null,scale:4,useCORS:true})}).then(function(cv){
ch.style.background=bg;
var a=document.createElement('a');a.download='photo-booth.png';a.href=cv.toDataURL('image/png');a.click()
}).catch(function(){ch.style.background=bg})};
load();
})();
