(function(){
var $=function(i){return document.getElementById(i)};
var DEF={name:'떵',age:'28',recent:true,look:'내가 찾는 관계',tabs:'FOR YOU,더블 데이트,별자리,두근두근',goalEmoji:'💗',goal:'진지한 연애',pos:20,posX:50,zoom:100,img:''};
var S=Object.assign({},DEF),ed=document.querySelector('.editor'),g=[].slice.call(ed.querySelectorAll(':scope > .ps-pn')),bar=document.createElement('div');
bar.className='ps-seg';g.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');if(!i)b.className='on';b.onclick=function(){g.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});ed.parentNode.insertBefore(bar,ed);
function emojiColor(emoji){
 var c=document.createElement('canvas');c.width=c.height=80;var x=c.getContext('2d');x.clearRect(0,0,80,80);x.font='58px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(emoji||'💗',40,42);
 try{var d=x.getImageData(0,0,80,80).data,best=null,score=-1;for(var i=0;i<d.length;i+=16){var a=d[i+3];if(a<100)continue;var r=d[i],gg=d[i+1],bl=d[i+2],mx=Math.max(r,gg,bl),mn=Math.min(r,gg,bl),sat=mx?((mx-mn)/mx):0;var v=sat*2+mx/255*.25;if(v>score){score=v;best=[r,gg,bl]}}if(best)return 'rgb('+best.join(',')+')'}catch(e){}
 return '#e85b9b';
}
function setGlow(){var color=emojiColor(S.goalEmoji);$('vGoalEmoji').textContent=S.goalEmoji||'💗';$('vGoalEmoji').style.filter='drop-shadow(0 0 4px '+color+')';var ge=document.querySelector('.ge');ge.style.background='radial-gradient(circle, '+color+'88 0%, '+color+'35 38%, transparent 74%)';ge.style.boxShadow='0 0 42px '+color+'88'}
function photoStyle(){var p=$('vPhoto');p.style.backgroundImage=S.img?'url('+S.img+')':'none';p.style.backgroundSize=S.zoom+'% auto';p.style.backgroundPosition=S.posX+'% '+S.pos+'%'}
function render(){
 $('vName').textContent=S.name;$('vAge').textContent=S.age;$('vRecent').style.visibility=S.recent?'visible':'hidden';
 $('vIc').innerHTML='<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>';
 $('vLook').textContent=S.look;$('vLike').textContent='내가 받은 LIKE';var T=S.tabs.split(',');for(var q=0;q<4;q++)$('vT'+q).textContent=(T[q]||'').trim();$('vGoal').textContent=S.goal;setGlow();photoStyle();$('iRecent').checked=S.recent;
}
var fields=[['iName','name'],['iAge','age'],['iLook','look'],['iTabs','tabs'],['iGoalEmoji','goalEmoji'],['iGoal','goal'],['iPos','pos'],['iPosX','posX'],['iZoom','zoom']];
function fill(){fields.forEach(function(p){$(p[0]).value=S[p[1]]});render()}
fields.forEach(function(p){$(p[0]).addEventListener('input',function(){S[p[1]]=p[1]==='pos'||p[1]==='posX'||p[1]==='zoom'?Number(this.value):this.value;render()})});
$('iRecent').onchange=function(){S.recent=this.checked;render()};
$('iPhoto').onchange=function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){S.img=r.result;render()};r.readAsDataURL(f)};
var photo=$('vPhoto'),drag=null,last=0;
photo.addEventListener('pointerdown',function(e){if(!S.img)return;drag={x:e.clientX,y:e.clientY,px:S.posX,py:S.pos};last=0;photo.setPointerCapture(e.pointerId);photo.style.cursor='grabbing';e.preventDefault()});
photo.addEventListener('pointermove',function(e){if(!drag)return;if(last)cancelAnimationFrame(last);var dx=e.clientX-drag.x,dy=e.clientY-drag.y,rect=photo.getBoundingClientRect(),sx=100/Math.max(1,rect.width),sy=100/Math.max(1,rect.height);last=requestAnimationFrame(function(){S.posX=Math.max(0,Math.min(100,drag.px-dx*sx));S.pos=Math.max(0,Math.min(100,drag.py-dy*sy));$('iPosX').value=S.posX;$('iPos').value=S.pos;photoStyle()})});
function endDrag(){drag=null;photo.style.cursor=S.img?'grab':'default'}photo.addEventListener('pointerup',endDrag);photo.addEventListener('pointercancel',endDrag);photo.addEventListener('lostpointercapture',endDrag);
function fit(){$('post').style.transform='scale('+($('fit').clientWidth/1118)+')'}
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';fit()};
$('reset').onclick=function(){S=Object.assign({},DEF);$('iPhoto').value='';fill()};
$('savePng').onclick=function(){var p=$('post'),o=p.style.transform;p.style.transform='none';html2canvas(p,{scale:4,width:1118,height:1988,backgroundColor:null,useCORS:true}).then(function(c){p.style.transform=o;var a=document.createElement('a');a.download='tinder.png';a.href=c.toDataURL('image/png');a.click()}).catch(function(e){p.style.transform=o;console.error(e);alert('PNG 저장에 실패했습니다.')})};
window.addEventListener('resize',fit);fill();fit();
})();