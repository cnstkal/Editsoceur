(function(){
var $=function(i){return document.getElementById(i)},cv=$('cv'),vp=$('vp');
var Z=['.5','1×','2','3'],ZX=[466,590,712,834],M=['비디오','사진','인물 사진'];
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
function draw(){
 var z=+$('iZoom').value,m=+$('iMode').value;
 $('zm').innerHTML='';Z.forEach(function(t,k){var d=document.createElement('div');d.textContent=t;d.style.left=(ZX[k]-60)+'px';if(k===z)d.className='on';$('zm').appendChild(d)});
 $('modes').innerHTML='';M.forEach(function(t,k){var s=document.createElement('span');s.textContent=t;if(k===m)s.className='on';$('modes').appendChild(s)});
 var s=$('modes').children[m];$('modes').style.left=(635/2-(s.offsetLeft+s.offsetWidth/2))+'px';
 $('grid').style.display=$('iGrid').checked?'':'none';$('face').style.display=$('iFace').checked?'':'none'}
['iZoom','iMode','iGrid','iFace'].forEach(function(i){$(i).onchange=draw});
$('iVf').onchange=function(){rd(this.files[0],function(u){$('vf').style.backgroundImage='url('+u+')'})};
$('iTh').onchange=function(){rd(this.files[0],function(u){$('thumb').style.backgroundImage='url('+u+')'})};
function fit(){var w=vp.parentNode.clientWidth||390,s=Math.min(w/1179,innerHeight*(innerWidth<1100?0.55:0.8)/2556);
 vp.style.setProperty('width',1179*s+'px','important');vp.style.height=2556*s+'px';vp.style.margin='0 auto';cv.style.transform='scale('+s+')'}
addEventListener('resize',fit);
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(draw);draw();fit();
$('savePng').onclick=function(){var t=cv.style.transform;cv.style.transform='none';
 html2canvas(cv,{backgroundColor:'#000',scale:4,useCORS:true,width:1179,height:2556}).then(function(c){cv.style.transform=t;
 var a=document.createElement('a');a.download='camera.png';a.href=c.toDataURL('image/png');a.click()}).catch(function(){cv.style.transform=t})};
$('reset').onclick=function(){$('iZoom').value='1';$('iMode').value='1';$('iGrid').checked=true;$('iFace').checked=true;
 $('vf').style.backgroundImage='';$('thumb').style.backgroundImage='';$('iVf').value='';$('iTh').value='';draw()};
})();
