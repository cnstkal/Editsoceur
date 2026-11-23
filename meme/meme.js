(function(){
var $=function(i){return document.getElementById(i)},cv=$('cv'),vp=$('vp'),W=1080,H=1080;
var D={top:'',bot:''};
function txt(){cv.style.setProperty('--fs',$('iSize').value+'px');$('mTop').textContent=$('iTop').value;$('mBot').textContent=$('iBot').value}
$('iTop').oninput=txt;$('iBot').oninput=txt;$('iSize').oninput=txt;
$('iImg').onchange=function(){var f=this.files&&this.files[0];if(!f)return;var r=new FileReader();
 r.onload=function(){var im=$('mImg');im.src=r.result;im.hidden=false};r.readAsDataURL(f)};
function fit(){var w=vp.parentNode.clientWidth||390,s=Math.min(w/W,innerHeight*0.8/H);
 vp.style.setProperty('width',W*s+'px','important');vp.style.height=H*s+'px';vp.style.margin='0 auto';cv.style.transform='scale('+s+')'}
addEventListener('resize',fit);fit();
$('savePng').onclick=function(){var t=cv.style.transform;cv.style.transform='none';
 html2canvas(cv,{backgroundColor:null,scale:1,useCORS:true,width:W,height:H}).then(function(c){cv.style.transform=t;
 var a=document.createElement('a');a.download='meme.png';a.href=c.toDataURL('image/png');a.click()}).catch(function(){cv.style.transform=t})};
$('reset').onclick=function(){$('iTop').value=D.top;$('iBot').value=D.bot;$('iSize').value=110;$('iImg').value='';
 $('mImg').hidden=true;$('mImg').removeAttribute('src');txt()};
txt();
})();
