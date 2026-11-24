(function(){
var $=function(i){return document.getElementById(i)};
var D={Title:'AirDrop',No:'Decline',Yes:'Accept',Col:'#4f8fc3'},url='';
function load(){$('iTitle').value=D.Title;$('iNo').value=D.No;$('iYes').value=D.Yes;$('iCol').value=D.Col;url='';$('iPhoto').value='';r()}
function r(){
$('vTitle').textContent=$('iTitle').value;$('vNo').textContent=$('iNo').value;$('vYes').textContent=$('iYes').value;
$('box').style.setProperty('--c',$('iCol').value);
$('pic').classList.toggle('on',!!url);if(url)$('vImg').src=url;
}
['iTitle','iNo','iYes','iCol'].forEach(function(k){$(k).addEventListener('input',r)});
$('iPhoto').onchange=function(){if(this.files[0]){url=URL.createObjectURL(this.files[0]);r()}};
$('clr').onclick=function(){url='';$('iPhoto').value='';r()};
$('reset').onclick=load;
$('save').onclick=function(){
var b=$('box'),ch=b.parentNode,bg=ch.style.background,pd=ch.style.padding;ch.style.background='none';ch.style.padding='0';
(document.fonts?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas(b,{backgroundColor:null,scale:4,useCORS:true})}).then(function(cv){
ch.style.background=bg;ch.style.padding=pd;
var a=document.createElement('a');a.download='airdrop.png';a.href=cv.toDataURL('image/png');a.click()
}).catch(function(){ch.style.background=bg;ch.style.padding=pd})};
load();
})();
