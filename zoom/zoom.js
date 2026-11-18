(function(){
var $=function(i){return document.getElementById(i)};
var DEF={n0:'최산',n1:'윤호',cnt:'2',login:'로그인',gs:'#00ff00',m0:true,m1:true,a:true,v:true};
var zs=$('zoom'),zw=$('zw'),fr=$('frame'),W=2576,H=1449,pics=[null,null];

/* 반응형 스케일 */
function fit(){var s=fr.clientWidth/W;zs.style.transform='scale('+s+')';zw.style.height=(H*s)+'px'}
if(window.ResizeObserver)new ResizeObserver(fit).observe(fr);window.addEventListener('resize',fit);

/* 렌더 */
function render(){
 $('vN0').textContent=$('iN0').value;$('vN1').textContent=$('iN1').value;
 $('vCnt').textContent=$('iCnt').value;$('vLogin').textContent=$('iLogin').value;
 [0,1].forEach(function(i){var v=$('v'+i);
  v.style.backgroundColor=$('iGs').value;
  v.style.backgroundImage=pics[i]?'url('+pics[i]+')':'none';
  v.classList.toggle('unm',!$('iM'+i).checked)});
 zs.classList.toggle('aoff',$('iA').checked);zs.classList.toggle('voff',$('iV').checked);
}
function setDefaults(){
 $('iN0').value=DEF.n0;$('iN1').value=DEF.n1;$('iCnt').value=DEF.cnt;$('iLogin').value=DEF.login;$('iGs').value=DEF.gs;
 $('iM0').checked=DEF.m0;$('iM1').checked=DEF.m1;$('iA').checked=DEF.a;$('iV').checked=DEF.v;
 pics=[null,null];$('iP0').value='';$('iP1').value='';render();
}
['iN0','iN1','iCnt','iLogin','iGs','iM0','iM1','iA','iV'].forEach(function(id){
 $(id).addEventListener('input',render);$(id).addEventListener('change',render)});
[0,1].forEach(function(i){$('iP'+i).addEventListener('change',function(){
 var f=this.files[0];if(!f)return;var r=new FileReader();
 r.onload=function(e){pics[i]=e.target.result;render()};r.readAsDataURL(f)})});
$('clearPics').onclick=function(){pics=[null,null];$('iP0').value='';$('iP1').value='';render()};
$('reset').onclick=setDefaults;

/* 탭 */
(function(){
 var ed=document.querySelector('.editor'),g=[].slice.call(ed.querySelectorAll('.ps-pn'));
 var bar=document.createElement('div');bar.className='ps-seg';
 g.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');
  if(!i)b.className='on';
  b.onclick=function(){g.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};
  bar.appendChild(b)});
 ed.parentNode.insertBefore(bar,ed);
})();

/* 미리보기 모드 */
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';setTimeout(fit,0)};

/* PNG 저장 (2576x1449 원본 크기) */
$('savePng').onclick=function(){
 var t=zs.style.transform;zs.style.transform='none';
 html2canvas(zs,{width:W,height:H,scale:1,backgroundColor:'#000',useCORS:true}).then(function(c){
  zs.style.transform=t;var a=document.createElement('a');a.download='zoom.png';a.href=c.toDataURL('image/png');a.click();
 }).catch(function(){zs.style.transform=t});
};

setDefaults();fit();
})();
