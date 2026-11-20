(function(){
var $=function(i){return document.getElementById(i)};
var N=6,imgs=[],cv=$('cv'),vp=$('vp');
var F=[['iCh','vCh'],['iTime','vTime'],['iTitle','vTitle'],['iSub','vSub'],['iNote','vNote']];
var defs={};

/* text binding */
F.forEach(function(p){var i=$(p[0]),o=$(p[1]);defs[p[0]]=i.value;
 function up(){o.textContent=i.value}i.addEventListener('input',up);up()});

/* photo slots */
for(var k=0;k<N;k++){
 var d=document.createElement('div');d.className='ph';$('photos').appendChild(d);
 var l=document.createElement('input');l.type='file';l.accept='image/*';l.title='사진 '+(k+1);
 (function(k,l){l.onchange=function(){read(l.files[0],function(u){imgs[k]=u;render()})}})(k,l);
 $('slots').appendChild(l);
}
function read(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
$('iAll').onchange=function(){read(this.files[0],function(u){for(var k=0;k<N;k++)imgs[k]=u;$('iMode').value='photo';render()})};
$('iMode').onchange=render;
function render(){
 var m=$('iMode').value;
 [].forEach.call($('photos').children,function(e,k){
  e.className='ph'+(m==='green'?' g':'');
  e.style.backgroundImage=(m==='photo'&&imgs[k])?'url('+imgs[k]+')':'';
 });
}
render();

/* fit preview to 9:16 */
function fit(){
 var s=Math.min((window.innerWidth-40)/1080,(window.innerHeight-40)/1920,.5);
 s=Math.max(s,.15);
 vp.style.width=1080*s+'px';vp.style.height=1920*s+'px';
 cv.style.transform='scale('+s+')';
}
window.addEventListener('resize',fit);fit();

/* save transparent PNG */
$('save').onclick=function(){
 var t=cv.style.transform;cv.style.transform='none';
 html2canvas(cv,{backgroundColor:null,scale:1,useCORS:true,width:1080,height:1920}).then(function(c){
  cv.style.transform=t;
  var a=document.createElement('a');a.download='shomei_shashin.png';a.href=c.toDataURL('image/png');a.click();
 }).catch(function(){cv.style.transform=t});
};

/* reset */
$('reset').onclick=function(){
 F.forEach(function(p){$(p[0]).value=defs[p[0]];$(p[1]).textContent=defs[p[0]]});
 imgs=[];$('iMode').value='blue';render();
 [].forEach.call(document.querySelectorAll('input[type=file]'),function(i){i.value=''});
};
})();
