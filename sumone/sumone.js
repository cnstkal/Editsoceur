(function(){
var $=function(i){return document.getElementById(i)},W=1449,H=2576,ks=$('ks'),kw=$('kw'),fr=$('frame');
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function defs(){return{lg:'Sumone',sb:'우리의 하루 일기',q:'계획은 완벽',d:'#1번째 질문 Sep. 12 2025',ill:true,img:'heart.png',a:[{n:'유유',t:'빨리 말 걸어 보고싶어'},{n:'모모',t:'계획대로 되면 좋겠다 ㅎㅎ'}]}}
var S=defs();
function render(){
 var h='<div class="lg">'+esc(S.lg)+'</div><div class="sb2">'+esc(S.sb)+'</div>';
 if(S.ill)h+='<div class="ill"'+(S.img?' style="background-image:url('+S.img+')"':'')+'></div>';
 h+='<div class="qt">'+esc(S.q)+'</div><div class="qd">'+esc(S.d)+'</div>';
 h+='<div class="an">'+S.a.map(function(a){return'<div><b>'+esc(a.n)+'</b><p>'+esc(a.t)+'</p></div>'}).join('')+'</div>';
 ks.innerHTML=h}
function fit(){var s=fr.clientWidth/W;ks.style.transform='scale('+s+')';kw.style.height=(H*s)+'px'}
if(window.ResizeObserver)new ResizeObserver(fit).observe(fr);addEventListener('resize',fit);
function ans(){$('ans').innerHTML=S.a.map(function(a,i){return'<div class="ans"><h3>답변 '+(i+1)+'</h3><label>이름<input data-i="'+i+'" data-k="n" value="'+esc(a.n)+'"></label><label>내용<input data-i="'+i+'" data-k="t" value="'+esc(a.t)+'"></label><button class="ps-ghost" data-del="'+i+'" type="button">삭제</button></div>'}).join('')}
$('ans').addEventListener('input',function(e){var el=e.target,i=el.dataset.i;if(i==null)return;S.a[i][el.dataset.k]=el.value;render()});
$('ans').addEventListener('click',function(e){var d=e.target.dataset.del;if(d==null)return;S.a.splice(d,1);ans();render()});
function cap(){$('add').disabled=S.a.length>=2;$('add').textContent=S.a.length>=2?'답변은 최대 2개':'+ 답변 추가'}
$('add').onclick=function(){if(S.a.length>=2)return;S.a.push({n:'이름',t:'내용'});ans();render();cap()};
var F=[['iLg','lg'],['iSb','sb'],['iQ','q'],['iD','d']];
function sync(){F.forEach(function(f){$(f[0]).value=S[f[1]]});ans();render();cap()}
F.forEach(function(f){$(f[0]).addEventListener('input',function(){S[f[1]]=this.value;render()})});
$('reset').onclick=function(){S=defs();sync()};
(function(){var ed=document.querySelector('.editor'),g=[].slice.call(ed.querySelectorAll('.ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
 g.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');if(!i)b.className='on';
  b.onclick=function(){g.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
 ed.parentNode.insertBefore(bar,ed)})();
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';setTimeout(fit,0)};
$('savePng').onclick=function(){var t=ks.style.transform;ks.style.transform='none';
 html2canvas(ks,{width:W,height:H,scale:1,backgroundColor:'#f5f5f5',useCORS:true,allowTaint:false}).then(function(c){ks.style.transform=t;var a=document.createElement('a');a.download='sumone.png';a.href=c.toDataURL('image/png');a.click()}).catch(function(){ks.style.transform=t})};
sync();fit();
})();
