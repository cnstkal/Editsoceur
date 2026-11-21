(function(){
var $=function(i){return document.getElementById(i)};
var D={Name:'애플',Txt:'좋아하는 일을 할 땐\n온 힘을 다해 노력하는 게\n멋진 소녀 아니겠어? 큐룽?',Bub:'#fffbee',Ac:'#f0648c',Col:'#7a6a4f',Y:60,S:62,A:true};
var ids=['Name','Txt','Bub','Ac','Col','Y','S','A'],st=$('stage');
function load(){ids.forEach(function(k){var e=$('i'+k);if(e.type=='checkbox')e.checked=D[k];else e.value=D[k]});r()}
function r(){
var v={};ids.forEach(function(k){var e=$('i'+k);v[k]=e.type=='checkbox'?e.checked:e.value});
$('vName').textContent=v.Name;$('vName').style.display=v.Name?'':'none';$('vTxt').textContent=v.Txt;
$('vArr').style.display=v.A?'':'none';
st.style.setProperty('--bub',v.Bub);st.style.setProperty('--ac',v.Ac);st.style.setProperty('--col',v.Col);st.style.setProperty('--fs',v.S+'px');
$('grp').style.top=v.Y+'%';$('pY').textContent=v.Y+'%';$('pS').textContent=v.S+'px';
}
function fit(){$('view').firstChild.style.transform='scale('+($('view').clientWidth/1080)+')'}
ids.forEach(function(k){$('i'+k).addEventListener('input',r)});
$('reset').onclick=load;window.addEventListener('resize',fit);if(window.ResizeObserver)new ResizeObserver(fit).observe($('view'));
$('savePng').onclick=function(){
var c=$('view').firstChild,t=c.style.transform;c.style.transform='none';c.style.background='none';
(document.fonts?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas(st,{backgroundColor:null,scale:1,width:1080,height:1920})}).then(function(cv){
c.style.transform=t;c.style.background='';
var a=document.createElement('a');a.download='animal-crossing.png';a.href=cv.toDataURL('image/png');a.click()
}).catch(function(){c.style.transform=t;c.style.background=''})};
load();fit();
})();
