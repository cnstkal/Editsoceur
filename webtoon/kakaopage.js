(function(){
var $=function(i){return document.getElementById(i)},W=1080,H=1920,ks=$('ks'),kw=$('kw'),fr=$('frame');
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var G=['#6b5a4a,#2a2320','#c9902f,#3a2410','#8d94a3,#3b3f4a','#a9a3b8,#2b2833','#8aa0b8,#2f3a4a','#9a7b5a,#3a2e22'];
function defs(){return{sec:'로맨스/드라마',tabs:'추천,웹툰,웹소설,책',on:2,chips:['지금핫한','요일','실시간 랭킹','오늘신작','단행본'],nav:true,
 c:[['잘못한 술잔의 비밀','905만','3다무',1],['흔적 없는 방','323만','',1],['라벤더 향기','734만','',1],['살육의 알고리즘','403만','3다무',1],['로맨스 판타지 세계관에 빙의했는데 남주가 내 전남친인 썰','1024만','',1],['신입사원 대표님','31만','3다무',1]].map(function(a,i){return{t:a[0],v:a[1],b:a[2],clk:a[3],img:'',dot:i==1?1:0,up:1}})}}
var S=defs();
var IC={home:'<path d="M12 22c0-3 2-5 5-5l13-9c2-1 4-1 6 0l13 9c3 0 5 2 5 5v22c0 3-2 5-5 5H17c-3 0-5-2-5-5z" fill="#111"/>',
go:'<g fill="none" stroke="#8a8a8a" stroke-width="5"><rect x="6" y="6" width="20" height="20" rx="3"/><rect x="34" y="6" width="20" height="20" rx="3"/><rect x="6" y="34" width="20" height="20" rx="3"/><rect x="34" y="34" width="20" height="20" rx="3"/></g>',
bell:'<path d="M30 6c-9 0-15 7-15 16v10l-6 9h42l-6-9V22c0-9-6-16-15-16zM22 52c2 4 14 4 16 0" fill="none" stroke="#8a8a8a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',
gift:'<g fill="none" stroke="#8a8a8a" stroke-width="5" stroke-linejoin="round"><rect x="6" y="20" width="48" height="12"/><path d="M10 32v22h40V32M30 20v34M30 20c-8-2-14-14-6-14 6 0 6 10 6 14zM30 20c8-2 14-14 6-14-6 0-6 10-6 14z"/></g>',
box:'<g fill="none" stroke="#8a8a8a" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"><path d="M10 12h40M6 26h48v26H6zM22 38h16"/></g>'};
function render(){
 var anyDot=S.c.some(function(c){return c.dot});var tb=S.tabs.split(','),x=[58,182,305,476];
 var h='<div class="tabs">'+tb.map(function(t,i){return'<span class="'+(i+1==S.on?'on':'')+'" style="left:'+(i?(i==1?182:i==2?305:476):58)+'px">'+esc(t.trim())+'</span>'}).join('')+'</div>';
 h+='<svg class="hex" viewBox="0 0 62 66"><path d="M31 2l27 15v32L31 64 4 49V17z" fill="#ffd400"/><path d="M40 24c-3-2-9-2-12 1-3 3-3 11 0 14 3 3 9 3 12 1" fill="none" stroke="#111" stroke-width="7" stroke-linecap="round"/></svg>';
 h+='<svg style="left:850px;top:60px;width:58px;height:58px" viewBox="0 0 58 58" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round"><circle cx="24" cy="24" r="18"/><path d="m37 37 17 17"/></svg>';
 h+='<svg style="left:966px;top:66px;width:54px;height:48px" viewBox="0 0 54 48" fill="none" stroke="#111" stroke-width="5"><path d="M2 5h50M2 24h50M2 43h50"/></svg>';
 var ch=S.chips.filter(function(c){return c.trim()}).slice(0,5),cx=[30,327,489,760,987],cw=[277,141,251,207,140];
 h+=ch.map(function(c,i){var l=i?cx[i]:30;if(i>4)return'';return'<div class="chip'+(i?'':' on')+'" style="left:'+l+'px;width:'+cw[i]+'px">'+(i?'':'<svg viewBox="0 0 44 50"><path d="M26 0 4 28h16l-4 22 24-30H24z" fill="#ffd400"/></svg>')+esc(c.trim())+'</div>'}).join('');
 h+='<div class="sec">'+esc(S.sec)+'</div>';
 h+=S.c.map(function(c,i){var l=32+(i%3)*342,t=401+Math.floor(i/3)*675,g=G[i%6].split(',');
  var bg=c.img?'url('+c.img+')':'linear-gradient(160deg,'+g[0]+','+g[1]+')';
  var bd='';if(c.clk||c.b||c.up){bd='<div class="bd">'+(c.clk?'<svg class="clk" viewBox="0 0 42 42"><circle cx="21" cy="21" r="21" fill="#ffd400"/><circle cx="21" cy="21" r="13" fill="#111"/><path d="M21 13v9l6 3" stroke="#ffd400" stroke-width="3" fill="none" stroke-linecap="round"/></svg>':'');
   var off=c.clk?0:-0;if(c.b)bd+='<span class="pl">'+esc(c.b)+'</span>';
   if(c.up)bd+='<span class="up" style="left:'+(c.b?(c.b.length*21+78):(c.clk?64:0))+'px">UP</span>';bd+='</div>'}
  return'<div class="cd" style="left:'+l+'px;top:'+t+'px;background-image:'+bg+'">'+bd+(c.dot?'<i class="kd"></i>':'')+'<div class="ct" style="font-size:'+(c.t.length>14?40:58)+'px">'+esc(c.t)+'</div><div class="cv">'+esc(c.v)+'</div></div>'}).join('');
 if(S.nav){var n=[['home','홈'],['go','바로가기'],['bell','알림'],['gift','선물함'],['box','보관함']],nx=[108,323,539,756,972];
  h+='<div class="nav">'+n.map(function(a,i){return'<div class="ni'+(i?'':' on')+'" style="left:'+nx[i]+'px"><svg viewBox="0 0 60 60">'+IC[a[0]]+'</svg>'+((i==2||i==3)&&anyDot?'<i class="dot"></i>':'')+'<span>'+a[1]+'</span></div>'}).join('')+'</div>'}
 ks.innerHTML=h}
function fit(){var s=fr.clientWidth/W;ks.style.transform='scale('+s+')';kw.style.height=(H*s)+'px'}
if(window.ResizeObserver)new ResizeObserver(fit).observe(fr);addEventListener('resize',fit);
function cards(){$('cards').innerHTML=S.c.map(function(c,i){return'<div class="xc"><h3>작품 '+(i+1)+'</h3><label>제목<input data-i="'+i+'" data-k="t" value="'+esc(c.t)+'"></label><label>조회수<input data-i="'+i+'" data-k="v" value="'+esc(c.v)+'"></label><label>뱃지 문구<input data-i="'+i+'" data-k="b" value="'+esc(c.b)+'"></label><div class="ps-tg"><span>시계 아이콘</span><label class="sw"><input type="checkbox" data-i="'+i+'" data-k="clk"'+(c.clk?' checked':'')+'><i></i></label></div><div class="ps-tg"><span>알림 점 표시</span><label class="sw"><input type="checkbox" data-i="'+i+'" data-k="dot"'+(c.dot?' checked':'')+'><i></i></label></div><div class="ps-tg"><span>UP 뱃지 표시</span><label class="sw"><input type="checkbox" data-i="'+i+'" data-k="up"'+(c.up?' checked':'')+'><i></i></label></div><label>표지 이미지<input type="file" accept="image/*" data-i="'+i+'" data-k="img"></label></div>'}).join('')}
$('cards').addEventListener('input',function(e){var el=e.target,i=el.dataset.i,k=el.dataset.k;if(i==null)return;
 if(k=='img'){var f=el.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){S.c[i].img=ev.target.result;render()};r.readAsDataURL(f);return}
 S.c[i][k]=el.type=='checkbox'?el.checked:el.value;render()});
var F=[['iSec','sec'],['iTabs','tabs'],['iTabOn','on'],['iNav','nav',1]];
function sync(){F.forEach(function(f){var e=$(f[0]);if(f[2])e.checked=S[f[1]];else e.value=S[f[1]]});cards();chips();render()}
F.forEach(function(f){$(f[0]).addEventListener('input',function(){S[f[1]]=f[2]?this.checked:this.value;render()})});
function chips(){$('chips').innerHTML=S.chips.map(function(c,i){return'<div class="row"><label style="flex:1">칩 '+(i+1)+'<input data-ci="'+i+'" value="'+esc(c)+'"></label><button class="xb" type="button" data-cd="'+i+'">✕ 삭제</button></div>'}).join('');$('addChip').disabled=S.chips.length>=5}
$('chips').addEventListener('input',function(e){var i=e.target.dataset.ci;if(i==null)return;S.chips[i]=e.target.value;render()});
$('chips').addEventListener('click',function(e){var i=e.target.dataset.cd;if(i==null)return;S.chips.splice(+i,1);chips();render()});
$('addChip').onclick=function(){if(S.chips.length<5){S.chips.push('');chips();render()}};
$('clearPics').onclick=function(){S.c.forEach(function(c){c.img=''});render()};
$('reset').onclick=function(){S=defs();sync()};
(function(){var ed=document.querySelector('.editor'),g=[].slice.call(ed.querySelectorAll('.ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
 g.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');if(!i)b.className='on';
  b.onclick=function(){g.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
 ed.parentNode.insertBefore(bar,ed)})();
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';setTimeout(fit,0)};
$('savePng').onclick=function(){var t=ks.style.transform;ks.style.transform='none';
 html2canvas(ks,{width:W,height:H,scale:4,backgroundColor:'#fff',useCORS:true}).then(function(c){ks.style.transform=t;var a=document.createElement('a');a.download='kakaopage.png';a.href=c.toDataURL('image/png');a.click()}).catch(function(){ks.style.transform=t})};
sync();fit();
})();
