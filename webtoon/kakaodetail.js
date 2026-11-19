(function(){
var $=function(i){return document.getElementById(i)},W=1449,H=2576,ks=$('ks'),kw=$('kw'),fr=$('frame');
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function defs(){return{cov:'',t:'첫 만남은 계획대로 되지 않아',a:'작가 ko',g:'웹툰 · 로맨스· 수 연재',v:'912만',r:'9.9',all:'전체 22',tabs:'첫화보기,회차,정보,소식,댓글',on:2,col:'#00ff2f',
 e:[['22화','25.09.03','89MB','74쪽'],['21화','25.08.27','72MB','88쪽'],['20화','25.08.20','40.3MB','98쪽'],['19화','25.08.13','32.3MB','99쪽'],['18화','25.08.06','35MB','90쪽']].map(function(a){return{n:a[0],d:a[1],s:a[2],p:a[3],b:'무료',img:''}})}}
var S=defs();
var I1='<svg viewBox="0 0 34 34" fill="none" stroke="#bdbdbd" stroke-width="2.5"><rect x="3" y="4" width="28" height="26" rx="3"/><path d="M3 15h28"/></svg>',
I2='<svg viewBox="0 0 34 34" fill="none" stroke="#bdbdbd" stroke-width="2.5"><path d="M2 17c4-8 10-11 15-11s11 3 15 11c-4 8-10 11-15 11S6 25 2 17z"/><circle cx="17" cy="17" r="5"/></svg>',
I3='<svg viewBox="0 0 34 34" fill="none" stroke="#bdbdbd" stroke-width="2.5" stroke-linejoin="round"><path d="m17 3 4.2 9.3 9.8 1-7.4 6.6 2.2 9.8L17 24.4l-8.8 5.3 2.2-9.8L3 13.3l9.8-1z"/></svg>';
function render(){
 var h='<div class="cover'+(S.cov?'':' n')+'"'+(S.cov?' style="background-image:url('+S.cov+')"':'')+'></div>';
 h+='<div class="dt">'+esc(S.t)+'</div><div class="da">'+esc(S.a)+'</div>';
 h+='<div class="dm">'+I1+'<span>'+esc(S.g)+'</span>'+I2+'<span>'+esc(S.v)+'</span>'+I3+'<span>'+esc(S.r)+'</span></div>';
 h+='<div class="dtb">'+S.tabs.split(',').map(function(t,i){return'<span class="'+(i+1==S.on?'on':'')+'">'+esc(t.trim())+'</span>'}).join('')+'</div>';
 h+='<div class="dall">'+esc(S.all)+'</div>';
 h+=S.e.map(function(e,i){return'<div class="er" style="top:'+(1440+i*282.5)+'px"><div class="et" style="background-color:'+S.col+(e.img?';background-image:url('+e.img+')':'')+'"></div><div class="en">'+esc(e.n)+'</div><div class="em">'+esc(e.d)+' · '+esc(e.s)+' · '+esc(e.p)+'</div>'+(e.b?'<div class="eb">'+esc(e.b)+'</div>':'')+'</div>'}).join('');
 ks.innerHTML=h}
function fit(){var s=fr.clientWidth/W;ks.style.transform='scale('+s+')';kw.style.height=(H*s)+'px'}
if(window.ResizeObserver)new ResizeObserver(fit).observe(fr);addEventListener('resize',fit);
function eps(){$('eps').innerHTML=S.e.map(function(e,i){var f=function(k,l){return'<label>'+l+'<input data-i="'+i+'" data-k="'+k+'" value="'+esc(e[k])+'"></label>'};
 return'<h3>회차 '+(i+1)+'</h3>'+f('n','제목')+f('d','날짜')+f('s','용량')+f('p','쪽수')+f('b','뱃지(비우면 숨김)')+'<label>이미지<input type="file" accept="image/*" data-i="'+i+'" data-k="img"></label>'}).join('')}
function rd(file,cb){var f=file.files[0];if(!f)return;var r=new FileReader();r.onload=function(e){cb(e.target.result);render()};r.readAsDataURL(f)}
$('eps').addEventListener('input',function(e){var el=e.target,i=el.dataset.i,k=el.dataset.k;if(i==null)return;
 if(k=='img')rd(el,function(d){S.e[i].img=d});else{S.e[i][k]=el.value;render()}});
var F=[['iT','t'],['iA','a'],['iG','g'],['iV','v'],['iR','r'],['iAll','all'],['iTabs','tabs'],['iOn','on'],['iCol','col']];
function sync(){F.forEach(function(f){$(f[0]).value=S[f[1]]});$('iCov').value='';eps();render()}
F.forEach(function(f){$(f[0]).addEventListener('input',function(){S[f[1]]=this.value;render()})});
$('iCov').addEventListener('change',function(){rd(this,function(d){S.cov=d})});
$('clearCov').onclick=function(){S.cov='';$('iCov').value='';render()};
$('clearPics').onclick=function(){S.e.forEach(function(e){e.img=''});eps();render()};
$('reset').onclick=function(){S=defs();sync()};
(function(){var ed=document.querySelector('.editor'),g=[].slice.call(ed.querySelectorAll('.ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
 g.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');if(!i)b.className='on';
  b.onclick=function(){g.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
 ed.parentNode.insertBefore(bar,ed)})();
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';setTimeout(fit,0)};
$('savePng').onclick=function(){var t=ks.style.transform;ks.style.transform='none';
 html2canvas(ks,{width:W,height:H,scale:1,backgroundColor:'#000',useCORS:true}).then(function(c){ks.style.transform=t;var a=document.createElement('a');a.download='kakaopage-detail.png';a.href=c.toDataURL('image/png');a.click()}).catch(function(){ks.style.transform=t})};
sync();fit();
})();
