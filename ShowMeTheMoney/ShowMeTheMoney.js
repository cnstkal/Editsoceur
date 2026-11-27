(function(){
var $=function(i){return document.getElementById(i)},ov=$('ov'),H=5.6,
P=[['60초 랩 미션',''],['[본선] 제이통 X 허키','나우아임영 & Royal 44 〈KISS KISS KISS〉'],['[세미파이널] 제이통 X 허키','나우아임영 〈Animal〉']];
function cur(){return $('md').value==='1'?$('ov2'):ov}
function fit(){var st=$('st'),o=cur(),k=Math.min(1,(st.clientWidth-24)/o.offsetWidth);$('fit').style.transform='scale('+k+')';st.style.minHeight=cur()===$('ov2')?'0px':'';st.style.height=o.offsetHeight*k+24+'px'}
function render(){
var t=+$('ty').value,f=$('fs').value/100,bw=+$('bw').value,op=$('op').value/100,ins=H*.55,LW=16.8,LH=LW*958/1642,BL=12.5,BT=.7;
ov.className='ov';
ov.style.fontSize=16*$('sc').value/100+'px';
var px=16*$('sc').value/100,mw=0;[['x1',t?1.45:1.9,'t1'],['x2',1.45,'t2']].forEach(function(q){if(q[0]==='x2'&&!t)return;var e=$(q[0]);e.textContent=$(q[2]).value;e.style.fontSize=q[1]*f+'em';e.parentNode.style.display='';mw=Math.max(mw,e.offsetWidth/px)});bw=Math.max(20,mw+8+(bw-42.5));
ov.style.width=BL+bw+'em';ov.style.height=Math.max(LH,BT+H)+'em';
$('bn').style.width=bw+'em';
$('bs').innerHTML='<svg viewBox="0 0 '+bw+' '+H+'" preserveAspectRatio="none"><defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1514"/><stop offset="1" stop-color="#050404"/></linearGradient><linearGradient id="g3" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffd23a"/><stop offset=".18" stop-color="#ffa21a"/><stop offset=".5" stop-color="#ff5a14"/><stop offset="1" stop-color="#ff2412"/></linearGradient><linearGradient id="g4" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff7a1a"/><stop offset=".45" stop-color="#ffb02a"/><stop offset=".6" stop-color="#ff6a1a"/><stop offset="1" stop-color="#ff7a1a"/></linearGradient><linearGradient id="g2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffb400"/><stop offset=".3" stop-color="#ff5a14"/><stop offset="1" stop-color="#ff3a1a"/></linearGradient></defs><polygon points="0,0 '+bw+',0 '+(bw-ins)+','+H+' 0,'+H+'" fill="url(#g1)" fill-opacity="'+op+'"/><polygon points="0,.06 '+(bw-.06)+',.06 '+(bw-ins-.03)+','+(H-.06)+' 0,'+(H-.06)+'" fill="none" stroke="url(#g2)" stroke-width=".12"/><line x1="0" y1=".12" x2="'+bw+'" y2=".12" stroke="url(#g3)" stroke-width=".26"/><line x1="0" y1="'+(H-.08)+'" x2="'+(bw-ins)+'" y2="'+(H-.08)+'" stroke="url(#g4)" stroke-width=".24"/></svg>';
var tx=$('tx'),a=$('x1'),b=$('x2'),w=[[a,t?1.45:1.9],[b,1.45]];
tx.style.left="3.8em";tx.style.right=ins*.5+.8+'em';
a.textContent=$('t1').value;b.textContent=$('t2').value;
a.style.color=$('c1').value;b.style.color=$('c2').value;b.style.display=t?'':'none';
w.forEach(function(x){var k=f;x[0].style.fontSize=x[1]*k+'em';while(x[0].offsetWidth>tx.clientWidth&&k>.3){k-=.03;x[0].style.fontSize=x[1]*k+'em'}});
$('st').className='smm-st b-chk';
fit();
}
[].forEach.call(document.querySelectorAll('.editor input,.editor select'),function(e){e.oninput=e.onchange=render});
$('ty').onchange=function(){var p=P[this.value];$('t1').value=p[0];$('t2').value=p[1];render()};
$('reset').onclick=function(){location.reload()};
$('savePng').onclick=function(){
var w=document.createElement('div'),c=cur().cloneNode(true);
w.style.cssText='position:fixed;left:-99999px;top:0';c.removeAttribute('id');w.appendChild(c);document.body.appendChild(w);
html2canvas(c,{backgroundColor:null,scale:3,useCORS:true}).then(function(cv){w.remove();cv.toBlob(function(b){var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=$('md').value==='1'?'showmethemoney_subtitle.png':'showmethemoney.png';a.click()})},function(){w.remove()});
};
(function(){var ed=document.querySelector('.editor'),g=[].slice.call(ed.querySelectorAll('.ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
g.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');if(!i)b.className='on';else p.hidden=true;
b.onclick=function(){g.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
ed.parentNode.insertBefore(bar,ed)})();
function r2(){
var H=3.4,W=+$('w2').value,N=+$('nw').value,s=.9,op=$('o2').value/100,m=$('md').value==='1',o2=$('ov2');
ov.style.position=m?'absolute':'';ov.style.left=ov.style.top=m?'0':'';ov.style.visibility=m?'hidden':'';o2.style.visibility=m?'':'hidden';
o2.style.fontSize=16*$('sc').value/100+'px';
$('bn2').style.width=W+'em';$('bn2').style.height=H+'em';
$('bs2').innerHTML='<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none"><defs><linearGradient id="s1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffa21a"/><stop offset=".25" stop-color="#ff5a14"/><stop offset="1" stop-color="#e8260f"/></linearGradient><linearGradient id="s2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a3d"/><stop offset="1" stop-color="#0d0d0e"/></linearGradient><linearGradient id="s3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff3a1a"/><stop offset="1" stop-color="#ff9a1a"/></linearGradient></defs>'
+'<polygon points="'+(N+s)+',0 '+W+',0 '+(W-s)+','+H+' '+N+','+H+'" fill="url(#s2)" fill-opacity="'+op*.9+'"/>'
+'<polygon points="'+s+',0 '+(N+s)+',0 '+N+','+H+' 0,'+H+'" fill="#050505" fill-opacity="'+Math.min(1,op+.1)+'"/>'
+'<polygon points="'+s+',.05 '+(W-.04)+',.05 '+(W-s-.03)+','+(H-.05)+' .04,'+(H-.05)+'" fill="none" stroke="url(#s1)" stroke-width=".1"/>'
+'<line x1="'+(N+s)+'" y1=".1" x2="'+W+'" y2=".1" stroke="#ff2d16" stroke-width=".14"/>'
+'<line x1="'+s+'" y1="0" x2="0" y2="'+H+'" stroke="#ffa31a" stroke-width=".22"/>'
+'<line x1="'+W+'" y1="0" x2="'+(W-s)+'" y2="'+H+'" stroke="#ff2d16" stroke-width=".2"/>'
+'<line x1="'+(N+s)+'" y1="0" x2="'+N+'" y2="'+H+'" stroke="url(#s3)" stroke-width=".26"/>'
+'<line x1="0" y1="'+(H-.07)+'" x2="'+N*.45+'" y2="'+(H-.07)+'" stroke="#ffb020" stroke-width=".16"/></svg>';
var nm=$('nm'),dl=$('dl');
nm.style.left=s/2+'em';nm.style.width=N+'em';dl.style.left=N+'em';dl.style.width=W-N+'em';
$('y1').textContent=$('n1').value;$('y2').textContent=$('d1').value;
[[$('y1'),nm,N-s-.8],[$('y2'),dl,W-N-s-2]].forEach(function(x){var k=$('fs2').value/100;x[0].style.fontSize=1.6*k+'em';while(x[0].offsetWidth>x[2]*16*$('sc').value/100&&k>.3){k-=.03;x[0].style.fontSize=1.6*k+'em'}});
fit();
}
[].forEach.call(document.querySelectorAll('#md,#n1,#d1,#fs2,#w2,#nw,#o2,#sc'),function(e){var f=e.oninput;e.oninput=e.onchange=function(){if(f)f();r2()}});
window.addEventListener('resize',fit);
render();r2();
if(document.fonts)document.fonts.ready.then(function(){render();r2()});
})();
