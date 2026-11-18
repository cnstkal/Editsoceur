(function(){
var $=function(i){return document.getElementById(i)};
var DEF={t:'메시지',m:'너무 보고싶다',l:'메뉴',r:'확인'};
var zs=$('zoom'),zw=$('zw'),fr=$('frame'),W=2176,H=1700,frm=null;
var ICON={iSig:'sSig',iMail:'sMail',iVib:'sVib',iBat:null};\nvar frameSelect=$('frameSelect');

function fit(){var s=fr.clientWidth/W;zs.style.transform='scale('+s+')';zw.style.height=(H*s)+'px'}
if(window.ResizeObserver)new ResizeObserver(fit).observe(fr);window.addEventListener('resize',fit);

function render(){
 $('vT').textContent=$('iT').value;$('vM').textContent=$('iM').value;$('vL').textContent=$('iL').value;$('vR').textContent=$('iR').value;
 Object.keys(ICON).forEach(function(k){var e=ICON[k]?$(ICON[k]):document.querySelector('#scr .bat');e.style.display=$(k).checked?'':'none'});
 $('scr').style.transform='translate('+$('iX').value+'px,'+$('iY').value+'px) scale('+($('iS').value/100)+')';
 $('vFrm').style.display=frm?'block':'none';if(frm)$('vFrm').src=frm;
}
function setDefaults(){
 $('iT').value=DEF.t;$('iM').value=DEF.m;$('iL').value=DEF.l;$('iR').value=DEF.r;
 Object.keys(ICON).forEach(function(k){$(k).checked=true});
 $('iX').value=0;$('iY').value=0;$('iS').value=100;frm=null;$('iF').value='';frameSelect.value='';render();
}
['iT','iM','iL','iR','iX','iY','iS','iSig','iMail','iVib','iBat'].forEach(function(id){$(id).addEventListener('input',render)});
$('iF').addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();
 r.onload=function(e){frm=e.target.result;render()};r.readAsDataURL(f)});
$('clearF').onclick=function(){frm=null;$('iF').value='';frameSelect.value='';render()};
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
 html2canvas(zs,{width:W,height:H,scale:1,backgroundColor:'#fff',useCORS:true}).then(function(c){
  zs.style.transform=t;var a=document.createElement('a');a.download='oldphone.png';a.href=c.toDataURL('image/png');a.click();
 }).catch(function(){zs.style.transform=t});
};
setDefaults();fit();
})();
