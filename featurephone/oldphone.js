(function(){
var $=function(id){return document.getElementById(id)};
var W=2176,H=1700,zs=$('zoom'),zw=$('zw'),fr=$('frame'),frm=null,frameSelect=$('frameSelect');
var ICON={iSig:'sSig',iMail:'sMail',iVib:'sVib',iBat:null};
var frames=['5A1E9D06-731A-4B35-81ED-7BE87A4CAA8B.png','BAA32941-7946-4EE5-9992-8CB9766D1C4F.png','DD8F6F1F-FB46-48E0-9471-45BD59D3BD01.png'];
frames.forEach(function(n,i){var o=document.createElement('option');o.value='frames/'+n;o.textContent='폰 틀 '+(i+1);frameSelect.appendChild(o)});
function fit(){var w=fr.clientWidth;if(!w)return;var s=w/W;zs.style.transform='scale('+s+')';zw.style.height=(H*s)+'px';zw.style.aspectRatio='auto'}
function render(){
$('vT').textContent=$('iT').value;$('vM').textContent=$('iM').value;$('vL').textContent=$('iL').value;$('vR').textContent=$('iR').value;
Object.keys(ICON).forEach(function(k){var e=ICON[k]?$(ICON[k]):document.querySelector('#scr .bat');e.style.display=$(k).checked?'':'none'});
$('scr').style.transform='translate('+$('iX').value+'px,'+$('iY').value+'px) scale('+($('iS').value/100)+')';
$('vFrm').style.display=frm?'block':'none';if(frm)$('vFrm').src=frm;fit();
}
function reset(){ $('iT').value='메시지';$('iM').value='너무 보고싶다';$('iL').value='메뉴';$('iR').value='확인';Object.keys(ICON).forEach(function(k){$(k).checked=true});$('iX').value=0;$('iY').value=0;$('iS').value=100;frm=null;$('iF').value='';frameSelect.value='';render()}
['iT','iM','iL','iR','iX','iY','iS','iSig','iMail','iVib','iBat'].forEach(function(id){$(id).addEventListener('input',render)});
frameSelect.addEventListener('change',function(){frm=this.value?this.value:null;$('iF').value='';render()});
$('iF').addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(e){frm=e.target.result;frameSelect.value='';render()};r.readAsDataURL(f)});
$('clearF').onclick=function(){frm=null;$('iF').value='';frameSelect.value='';render()};$('reset').onclick=reset;
(function(){var ed=document.querySelector('.editor'),panels=[].slice.call(ed.querySelectorAll('.ps-pn')),bar=document.createElement('div');bar.className='ps-seg';panels.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');if(!i)b.className='on';b.onclick=function(){panels.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(x,j){x.classList.toggle('on',j===i)})};bar.appendChild(b)});ed.parentNode.insertBefore(bar,ed)})();
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';setTimeout(fit,50)};
$('savePng').onclick=function(){var t=zs.style.transform;zs.style.transform='none';html2canvas(zs,{width:W,height:H,scale:1,backgroundColor:'#fff',useCORS:true}).then(function(c){zs.style.transform=t;var a=document.createElement('a');a.download='oldphone.png';a.href=c.toDataURL('image/png');a.click()}).catch(function(){zs.style.transform=t})};
if(window.ResizeObserver)new ResizeObserver(fit).observe(fr);window.addEventListener('resize',fit);reset();setTimeout(fit,100);setTimeout(fit,500);
})();