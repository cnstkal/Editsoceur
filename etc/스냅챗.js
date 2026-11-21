(function(){
var $=function(i){return document.getElementById(i)},
D={t:'HUFTTTTTTTTTTT',y:78,h:10,f:14,o:70},
S={},ids={t:'iTxt',y:'iY',h:'iH',f:'iF',o:'iO'};
function render(){
var b=$('bar');
b.style.top=S.y+'%';
b.style.height=S.h+'%';
b.style.fontSize=S.f+'px';
b.style.background='rgba(20,24,38,'+S.o/100+')';
$('txt').textContent=S.t;
$('oY').textContent=S.y+'%';$('oH').textContent=S.h+'%';$('oF').textContent=S.f+'px';$('oO').textContent=S.o+'%';
}
function load(){
S=Object.assign({},D);
for(var k in ids)$(ids[k]).value=S[k];
render();
}
Object.keys(ids).forEach(function(k){
$(ids[k]).addEventListener('input',function(){S[k]=k==='t'?this.value:parseFloat(this.value);render()});
});
$('reset').onclick=load;
$('save').onclick=function(){
html2canvas($('snap'),{backgroundColor:null,scale:4,useCORS:true}).then(function(c){
var a=document.createElement('a');
a.download='snapchat.png';
a.href=c.toDataURL('image/png');
a.click();
});
};
load();
})();
