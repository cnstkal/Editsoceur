(function(){
var $=function(i){return document.getElementById(i)};
var D={Key:'소화전',Txt:'이 있는 이미지를 모두 선택하세요\n위의 조건과 일치하는 새 이미지를 모두 선택했으면 확인을 클릭하세요.',Ok:'확인',N:9};
var img=[],sel=[];
function load(){$('iKey').value=D.Key;$('iTxt').value=D.Txt;$('iOk').value=D.Ok;$('iN').value=D.N;img=[];sel=[];r()}
function r(){
$('vKey').textContent=$('iKey').value;$('vTxt').textContent=$('iTxt').value;$('vOk').textContent=$('iOk').value;
var n=Math.max(1,Math.min(9,+$('iN').value||9)),g=$('grid'),p=$('ph');g.innerHTML='';p.innerHTML='';
for(var i=0;i<n;i++)(function(i){
var c=document.createElement('div');c.className='c'+(sel[i]?' s':'');
var b=document.createElement('b');if(img[i])b.style.backgroundImage='url('+img[i]+')';c.appendChild(b);
c.onclick=function(){sel[i]=!sel[i];c.classList.toggle('s',sel[i])};g.appendChild(c);
var l=document.createElement('label');l.textContent=img[i]?'':i+1;if(img[i])l.style.backgroundImage='url('+img[i]+')';
var f=document.createElement('input');f.type='file';f.accept='image/*';
f.onchange=function(){if(f.files[0]){img[i]=URL.createObjectURL(f.files[0]);r()}};
l.appendChild(f);p.appendChild(l)})(i);
}
['iKey','iTxt','iOk','iN'].forEach(function(k){$(k).addEventListener('input',r)});
$('reset').onclick=load;
$('clr').onclick=function(){img=[];r()};
$('unsel').onclick=function(){sel=[];r()};
$('save').onclick=function(){
var cap=$('cap'),ch=cap.parentNode,bg=ch.style.background,pd=ch.style.padding;ch.style.background='none';ch.style.padding='0';
(document.fonts?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas(cap,{backgroundColor:null,scale:3,useCORS:true})}).then(function(cv){
ch.style.background=bg;ch.style.padding=pd;
var a=document.createElement('a');a.download='recaptcha.png';a.href=cv.toDataURL('image/png');a.click()
}).catch(function(){ch.style.background=bg;ch.style.padding=pd})};
load();
})();
