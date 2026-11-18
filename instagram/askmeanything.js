(function(){
var $=function(i){return document.getElementById(i)};
var DEF={name:'_starhwa_',q:'프로필 사진은 왜 바꾼 거야',btn:'답글 달기',bar:'#000000',bg:'#ffffff'};
var zs=$('zoom'),zw=$('zw'),fr=$('frame'),S=1932,av=null;

function fit(){var s=fr.clientWidth/S;zs.style.transform='scale('+s+')';zw.style.height=(S*s)+'px'}
if(window.ResizeObserver)new ResizeObserver(fit).observe(fr);window.addEventListener('resize',fit);

function render(){
 $('vName').textContent=$('iName').value;$('vQ').textContent=$('iQ').value;$('vBtn').textContent=$('iBtn').value;
 $('vBtn').style.background=$('iBar').value;zs.style.background=zw.style.background=$('iBg').value;
 $('vAv').style.backgroundImage=av?'url('+av+')':'';
}
function setDefaults(){
 $('iName').value=DEF.name;$('iQ').value=DEF.q;$('iBtn').value=DEF.btn;$('iBar').value=DEF.bar;$('iBg').value=DEF.bg;
 av=null;$('iAv').value='';render();
}
['iName','iQ','iBtn','iBar','iBg'].forEach(function(id){$(id).addEventListener('input',render)});
$('iAv').addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();
 r.onload=function(e){av=e.target.result;render()};r.readAsDataURL(f)});
$('clearAv').onclick=function(){av=null;$('iAv').value='';render()};
$('reset').onclick=setDefaults;

(function(){
 var ed=document.querySelector('.editor'),g=[].slice.call(ed.querySelectorAll('.ps-pn'));
 var bar=document.createElement('div');bar.className='ps-seg';
 g.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');
  if(!i)b.className='on';
  b.onclick=function(){g.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};
  bar.appendChild(b)});
 ed.parentNode.insertBefore(bar,ed);
})();

$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';setTimeout(fit,0)};

$('savePng').onclick=function(){
 var t=zs.style.transform;zs.style.transform='none';
 html2canvas(zs,{width:S,height:S,scale:1,backgroundColor:$('iBg').value,useCORS:true}).then(function(c){
  zs.style.transform=t;var a=document.createElement('a');a.download='askmeanything.png';a.href=c.toDataURL('image/png');a.click();
 }).catch(function(){zs.style.transform=t});
};
setDefaults();fit();
})();
