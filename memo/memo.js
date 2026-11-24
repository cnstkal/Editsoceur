(function(){
var $=function(i){return document.getElementById(i)},cv=$('cv'),vp=$('vp'),W=2560,H=1440,D={};
function layoutTb(p){var tb=$('tb');tb.setAttribute('viewBox',p?'0 0 1440 200':'0 0 2560 200');
 var xs=[180,540,900,1260];tb.querySelectorAll('.ic').forEach(function(g,i){
  if(!p){g.removeAttribute('transform');return}
  g.setAttribute('transform','translate('+xs[i]+' 100) scale(1.15) translate('+(-g.dataset.cx)+' '+(-g.dataset.cy)+')')})}
function setRatio(r){var p=r==='9:16';W=p?1440:2560;H=p?2560:1440;cv.classList.toggle('r916',p);layoutTb(p);$('subR').textContent=r+' · 오른쪽에서 바로 수정해요';fit()}
$('iRatio').onchange=function(){setRatio(this.value)};
[['iDate','vDate'],['iBody','vBody']].forEach(function(p){var i=$(p[0]),o=$(p[1]);D[p[0]]=i.value;function u(){o.textContent=i.value}i.oninput=u;u()});
$('iBg').oninput=function(){cv.style.background=this.value};
$('iTb').onchange=function(){$('tb').style.display=this.checked?'':'none'};
function fit(){var w=vp.parentNode.clientWidth||390,s=Math.min(w/W,innerHeight*0.8/H);
 vp.style.setProperty('width',W*s+'px','important');vp.style.height=H*s+'px';vp.style.margin='0 auto';cv.style.transform='scale('+s+')'}
addEventListener('resize',fit);fit();
$('savePng').onclick=function(){var t=cv.style.transform;cv.style.transform='none';
 html2canvas(cv,{backgroundColor:null,scale:4,useCORS:true,width:W,height:H}).then(function(c){cv.style.transform=t;
 var a=document.createElement('a');a.download='memo.png';a.href=c.toDataURL('image/png');a.click()}).catch(function(){cv.style.transform=t})};
$('reset').onclick=function(){['iDate','iBody'].forEach(function(k){$(k).value=D[k];$(k).oninput()});
 $('iBg').value='#ffffff';cv.style.background='#fff';$('iTb').checked=true;$('tb').style.display='';$('iRatio').value='16:9';setRatio('16:9')};
})();
