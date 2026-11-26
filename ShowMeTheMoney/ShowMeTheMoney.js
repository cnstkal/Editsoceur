(function(){
var $=function(i){return document.getElementById(i)},ov=$('ov'),H=5.6,img='show_me_the_money_43_transparent.png',
P=[['60초 랩 미션',''],['[본선] 제이통 X 허키','나우아임영 & Royal 44 〈KISS KISS KISS〉'],['[세미파이널] 제이통 X 허키','나우아임영 〈Animal〉']];
function fit(){var st=$('st'),k=Math.min(1,(st.clientWidth-24)/ov.offsetWidth);$('fit').style.transform='scale('+k+')';st.style.height=ov.offsetHeight*k+24+'px'}
function render(){
var lg=$('tLogo').checked,ss=$('tSeason').checked,t=+$('ty').value,f=$('fs').value/100,bw=+$('bw').value,op=$('op').value/100,ins=H*.55,
ls=+$('ls').value,lx=+$('lxp').value,ly=+$('lyp').value,bx=+$('bx').value,by=+$('by').value,li=$('li'),
ih=img&&li.naturalWidth?ls*li.naturalHeight/li.naturalWidth:13.4,L=lg?bx:0,T=lg?by:0,lb=img?ly+ih:(ss?13.4:9.6);
ov.className='ov'+(lg?'':' nl')+(ss?'':' ns')+(img?' hi':'');
li.style.width=ls+'em';li.style.left=lx+'em';li.style.top=ly+'em';
ov.style.fontSize=16*$('sc').value/100+'px';
ov.style.width=L+bw+'em';ov.style.height=(lg?Math.max(lb,T+H):H)+'em';
$('bn').style.width=bw+'em';$('bn').style.left=L+'em';$('bn').style.top=T+'em';
$('sn').textContent=$('se').value;
$('bs').innerHTML='<svg viewBox="0 0 '+bw+' '+H+'" preserveAspectRatio="none"><defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a201e"/><stop offset="1" stop-color="#0b0909"/></linearGradient><linearGradient id="g2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffb400"/><stop offset=".3" stop-color="#ff5a14"/><stop offset="1" stop-color="#ff3a1a"/></linearGradient></defs><polygon points="0,0 '+bw+',0 '+(bw-ins)+','+H+' 0,'+H+'" fill="url(#g1)" fill-opacity="'+op+'"/><polygon points="0,.06 '+(bw-.06)+',.06 '+(bw-ins-.03)+','+(H-.06)+' 0,'+(H-.06)+'" fill="none" stroke="url(#g2)" stroke-width=".12"/><line x1="0" y1=".12" x2="'+bw+'" y2=".12" stroke="#ff2d16" stroke-width=".22"/><line x1="0" y1="'+(H-.08)+'" x2="'+(bw-ins)+'" y2="'+(H-.08)+'" stroke="#ff7a1a" stroke-width=".16"/></svg>';
var tx=$('tx'),a=$('x1'),b=$('x2'),w=[[a,t?1.9:2.6],[b,1.7]];
tx.style.left=(lg?Math.max(1.5,(img?lx+ls:17.6)-bx+.5):1.5)+'em';tx.style.right=ins*.5+.8+'em';
a.textContent=$('t1').value;b.textContent=$('t2').value;
a.style.color=$('c1').value;b.style.color=$('c2').value;b.style.display=t?'':'none';
w.forEach(function(x){var k=f;x[0].style.fontSize=x[1]*k+'em';while(x[0].offsetWidth>tx.clientWidth&&k>.3){k-=.03;x[0].style.fontSize=x[1]*k+'em'}});
$('st').className='smm-st '+$('pb').value;
fit();
}
[].forEach.call(document.querySelectorAll('.editor input,.editor select'),function(e){e.oninput=e.onchange=render});
$('ty').onchange=function(){var p=P[this.value];$('t1').value=p[0];$('t2').value=p[1];render()};
$('li').onload=render;
$('lf').onchange=function(){var r=new FileReader,f=this.files[0];if(!f)return;r.onload=function(){img=r.result;$('li').src=img;render()};r.readAsDataURL(f)};
$('lxx').onclick=function(){img='';$('lf').value='';render()};
$('reset').onclick=function(){location.reload()};
$('savePng').onclick=function(){
var w=document.createElement('div'),c=ov.cloneNode(true);
w.style.cssText='position:fixed;left:-99999px;top:0';c.removeAttribute('id');w.appendChild(c);document.body.appendChild(w);
html2canvas(c,{backgroundColor:null,scale:3,useCORS:true}).then(function(cv){w.remove();cv.toBlob(function(b){var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='showmethemoney.png';a.click()})},function(){w.remove()});
};
(function(){var ed=document.querySelector('.editor'),g=[].slice.call(ed.querySelectorAll('.ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
g.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');if(!i)b.className='on';else p.hidden=true;
b.onclick=function(){g.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
ed.parentNode.insertBefore(bar,ed)})();
window.addEventListener('resize',fit);
render();
if(document.fonts)document.fonts.ready.then(render);
})();
