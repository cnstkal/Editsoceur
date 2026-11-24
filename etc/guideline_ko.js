(function(){
var $=function(i){return document.getElementById(i)},cv=$('cv'),vp=$('vp');
var L=['너무 가깝다','너무 멀다','자고 있다','너무 귀엽다','식사중','강아지 됐어'];
var F=[['iTitle','vTitle'],['iOk','vOk'],['iDesc','vDesc']],defs={};
F.forEach(function(p){var i=$(p[0]),o=$(p[1]);defs[p[0]]=i.value;function u(){o.textContent=i.value}i.oninput=u;u()});
var imgs={},phs=[$('main')],lbs=[];
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
L.forEach(function(t,k){
 var d=document.createElement('div');d.innerHTML='<div class="ph"></div><span></span>';
 $('ng').appendChild(d);phs.push(d.firstChild);var s=d.lastChild;s.textContent=t;lbs.push(s);
 var w=document.createElement('div');w.className='pcard';w.innerHTML='<b>NG '+(k+1)+'</b><label>문구<input value="'+t+'"></label><label>이미지<input type="file" accept="image/*"></label>';
 var a=w.querySelectorAll('input');a[0].oninput=function(){s.textContent=this.value};
 a[1].onchange=function(){rd(this.files[0],function(u){imgs[k+1]=u;$('iMode').value='photo';draw()})};
 $('slots').appendChild(w);
});
$('iMain').onchange=function(){rd(this.files[0],function(u){imgs[0]=u;$('iMode').value='photo';draw()})};
$('iMain_del').onclick=function(){imgs[0]=''; $('iMain').value=''; draw();};
$('iMode').onchange=draw;
function draw(){var m=$('iMode').value;phs.forEach(function(e,k){e.className='ph'+(m==='green'?' g':'');e.style.backgroundImage=(m==='photo'&&imgs[k])?'url('+imgs[k]+')':''})}
draw();
function fit(){var w=vp.parentNode.clientWidth||390,s=Math.min(w/1200,innerHeight*(innerWidth<1100?0.55:0.8)/1723);
 vp.style.setProperty('width',1200*s+'px','important');vp.style.height=1723*s+'px';vp.style.margin='0 auto';cv.style.transform='scale('+s+')'}
$('iBg').oninput=function(){cv.style.backgroundColor=this.value;vp.style.background=this.value};
addEventListener('resize',fit);fit();
$('savePng').onclick=function(){var t=cv.style.transform;cv.style.transform='none';
 html2canvas(cv,{backgroundColor:null,scale:4,useCORS:true,width:1200,height:1723}).then(function(c){cv.style.transform=t;
 var a=document.createElement('a');a.download='guideline_ko.png';a.href=c.toDataURL('image/png');a.click()}).catch(function(){cv.style.transform=t})};
$('reset').onclick=function(){F.forEach(function(p){$(p[0]).value=defs[p[0]];$(p[1]).textContent=defs[p[0]]});imgs={};$('iMode').value='blue';$('iBg').value='#dcf4f9';cv.style.backgroundColor='#dcf4f9';vp.style.background='#dcf4f9';draw();
 L.forEach(function(t,k){lbs[k].textContent=t});
 [].forEach.call(document.querySelectorAll('#slots input,#iMain'),function(i){i.type==='file'?i.value='':0})};
})();
