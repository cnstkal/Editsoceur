(function(){
var $=function(i){return document.getElementById(i)},S,av=null;
var G=['#f3d9cf,#e7b7a6','#d4e3f0,#a9c4de','#e8e1c9,#cdbf8f','#d9e8d4,#a6c9a0','#e6d4ee,#c4a4d6','#f1e1d2,#dcb998','#d0dde0,#97b2ba','#f0d4de,#dba0b6'];
var DEF={sr:'검색',p:[]};
var R=[1.5,1.05,0.85,1.7,0.75,1.3,1.0,1.55,0.9,1.25,1.65,1.1,0.8,1.4,1.2],T=['오늘의 무드','','주말의 기록','','영감 보관함','','','인테리어 아이디어','','여행 계획','','레시피 모음','','','색감 참고'];
R.forEach(function(r,i){DEF.p.push({x:T[i],img:'',ratio:r,g:G[i%G.length]})});
var esc=function(t){return String(t==null?'':t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var DOTS='<svg width="34" height="34" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.900"/><circle cx="12" cy="12" r="1.900"/><circle cx="19" cy="12" r="1.900"/></svg>';
function render(){
 $('vSr').textContent=S.sr;$('vAv').style.backgroundImage=av?'url('+av+')':'';
 var cw=357,gap=24,hs=[0,0,0,0,0],out='';
 S.p.forEach(function(p){var c=hs.indexOf(Math.min.apply(null,hs)),ih=Math.round(cw*(p.ratio||1.25));
  out+='<div class="hp-pin" style="left:'+(20+c*(cw+gap))+'px;top:'+hs[c]+'px"><div class="hp-i" style="height:'+ih+'px;'+(p.img?'background-image:url('+p.img+')':'background-image:linear-gradient(160deg,'+(p.g||G[0])+')')+'"></div><div class="hp-t"><span>'+esc(p.x)+'</span>'+DOTS+'</div></div>';
  hs[c]+=ih+50+14});
 $('mas').innerHTML=out}
function list(){
 $('plist').innerHTML=S.p.map(function(p,i){return '<div class="pe" data-i="'+i+'"><label>제목(비우면 숨김)<input data-f="x" value="'+esc(p.x)+'"></label><label class="file">이미지 교체<input type="file" accept="image/*" data-f="img"></label><div class="row"><button type="button" class="ghost" data-a="u">위로</button><button type="button" class="ghost" data-a="d">아래로</button><button type="button" class="ghost" data-a="x">삭제</button></div></div>'}).join('')}
function readImage(file,cb){var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){cb(r.result,im.height/im.width)};im.src=r.result};r.readAsDataURL(file)}
function load(){S=JSON.parse(JSON.stringify(DEF));av=null;$('iSr').value=S.sr;$('iAv').value='';list();render()}
$('iSr').oninput=function(){S.sr=this.value;render()};
$('iAv').onchange=function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){av=r.result;render()};r.readAsDataURL(f)};
var L=$('plist'),ix=function(e){return +e.target.closest('.pe').dataset.i};
L.addEventListener('input',function(e){if(e.target.dataset.f!=='x')return;S.p[ix(e)].x=e.target.value;render()});
L.addEventListener('change',function(e){var t=e.target;if(t.dataset.f!=='img'||!t.files[0])return;readImage(t.files[0],function(d,r){var o=S.p[ix(e)];o.img=d;o.ratio=r;list();render()})});
L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.p,t;if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){t=m[i];m[i]=m[i+1];m[i+1]=t}list();render()});
$('batchPins').onchange=function(){[].slice.call(this.files).forEach(function(f){readImage(f,function(d,r){S.p.push({x:'',img:d,ratio:r});list();render()})});this.value=''};
$('addP').onclick=function(){S.p.push({x:'',img:'',ratio:1.25,g:G[S.p.length%G.length]});list();render()};
$('reset').onclick=load;
var pf=$('pf'),pw=$('pw');
function fit(){var w=pw.clientWidth;if(w)pf.style.transform='scale('+(w/1920)+')'}
if(window.ResizeObserver)new ResizeObserver(fit).observe(pw);addEventListener('resize',fit);
$('savePng').onclick=function(){var b=this,t=b.textContent,tr=pf.style.transform;b.disabled=true;b.textContent='저장 중...';pf.style.transform='none';
 html2canvas(pf,{scale:4,useCORS:true,backgroundColor:'#fff',width:1920,height:1080,logging:false}).then(function(c){var a=document.createElement('a');a.download='pinterest-pc.png';a.href=c.toDataURL('image/png');a.click()}).finally(function(){pf.style.transform=tr;b.disabled=false;b.textContent=t})};
load();fit();
})();
