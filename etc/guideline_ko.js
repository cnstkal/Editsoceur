(function(){
var $=function(i){return document.getElementById(i)},cv=$('cv'),vp=$('vp');
var L=['너무 가깝다','너무 멀다','자고 있다','너무 귀엽다','식사중','강아지 됐어'];
var F=[['iCh','vCh'],['iTime','vTime'],['iLabel','vLabel'],['iHead','vHead'],['iTick','vTick'],['iTitle','vTitle'],['iOk','vOk'],['iDesc','vDesc']],defs={};
F.forEach(function(p){var i=$(p[0]),o=$(p[1]);defs[p[0]]=i.value;function u(){o.textContent=i.value}i.oninput=u;u()});
var imgs={},phs=[$('main')],lbs=[];
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
L.forEach(function(t,k){
 var d=document.createElement('div');d.innerHTML='<div class="ph"></div><span></span>';
 $('ng').appendChild(d);phs.push(d.firstChild);var s=d.lastChild;s.textContent='✕ '+t;lbs.push(s);
 var w=document.createElement('label');w.innerHTML='NG '+(k+1)+' 문구<input value="'+t+'"><input type="file" accept="image/*">';
 var a=w.children;a[0].oninput=function(){s.textContent='✕ '+this.value};
 a[1].onchange=function(){rd(this.files[0],function(u){imgs[k+1]=u;draw()})};
 $('slots').appendChild(w);
});
$('iMain').onchange=function(){rd(this.files[0],function(u){imgs[0]=u;$('iMode').value='photo';draw()})};
$('iMode').onchange=draw;
function draw(){var m=$('iMode').value;phs.forEach(function(e,k){e.className='ph'+(m==='green'?' g':'');e.style.backgroundImage=(m==='photo'&&imgs[k])?'url('+imgs[k]+')':''})}
draw();
function fit(){var s=Math.max(.15,Math.min((innerWidth-40)/1080,(innerHeight-40)/1920,.5));
 vp.style.width=1080*s+'px';vp.style.height=1920*s+'px';cv.style.transform='scale('+s+')'}
addEventListener('resize',fit);fit();
$('save').onclick=function(){var t=cv.style.transform;cv.style.transform='none';
 html2canvas(cv,{backgroundColor:null,scale:1,useCORS:true,width:1080,height:1920}).then(function(c){cv.style.transform=t;
 var a=document.createElement('a');a.download='guideline_ko.png';a.href=c.toDataURL('image/png');a.click()}).catch(function(){cv.style.transform=t})};
$('reset').onclick=function(){F.forEach(function(p){$(p[0]).value=defs[p[0]];$(p[1]).textContent=defs[p[0]]});imgs={};$('iMode').value='blue';draw();
 L.forEach(function(t,k){lbs[k].textContent='✕ '+t});
 [].forEach.call(document.querySelectorAll('#slots input,#iMain'),function(i){i.type==='file'?i.value='':0})};
})();
