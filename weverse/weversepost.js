(function(){
var $=function(i){return document.getElementById(i)};
var VF='<svg class="vf" width="18" height="18" viewBox="0 0 40 40"><path fill="#1fc5d1" d="M19.998 3.094 14.638 0l-2.972 5.150H5.432v6.354L0 14.640 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.360-3.094L25.359 40l3.232-5.600h6.162v-6.010L40 25.359 36.905 20 40 14.641l-5.248-3.030v-6.460h-6.419L25.359 0z"/><path d="M11.500 20.600l6 6 11-12.600" fill="none" stroke="#fff" stroke-width="3.500" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var KB='<svg class="kb" width="22" height="22" viewBox="0 0 8 24" fill="#8e8e93"><circle cx="4" cy="4" r="1.800"/><circle cx="4" cy="12" r="1.800"/><circle cx="4" cy="20" r="1.800"/></svg>';
var HT='<svg width="30" height="28" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="1.900" stroke-linejoin="round"><path d="M12 20.500S3 14.500 3 8.500A4.700 4.700 0 0 1 12 6.200 4.700 4.700 0 0 1 21 8.500c0 6-9 12-9 12z"/></svg>';
var CM='<svg width="30" height="28" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="1.900" stroke-linejoin="round"><path d="M3.500 20.500v-8.500a8.500 8.500 0 1 1 8.500 8.500z"/></svg>';
var D={clock:'12:08',bat:35,sub:'커뮤니티로 가기 ›',hint:'댓글을 입력하세요.',name:'시즈⛧´-',date:'11. 17. 00:50',
body:'#to_지훈 지훈아 부산의 물떡 진짜 꿀맛이야? 넘 궁금한데',like:'58',cmt:'54',
cms:['*GEE | 11. 17. 00:52 | 그 어묵 칸 구석에서 팔팔 끓여진 떡을 고르는 게 중요하고... | 606 | 10','^*GEE | 11. 17. 00:51 | 물떡은 그냥 맛있어 그 간장 찍어 먹거든?? 굿굿 | 691 | 14','나_Zrra | 11. 17. 00:54 | 한국에 가면 어떤 음식을 먹어야 할까요? | |'].join('\n')};
var av='',aav='',ph=[];
function esc(s){return s.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
function bg(u){return u?' style="background-image:url('+u+')"':''}
function render(){
 $('vClock').textContent=$('iClock').value;$('vBat').textContent=$('iBat').value;$('vSub').textContent=$('iSub').value;$('vHint').textContent=$('iHint').value;
 var ver=$('iVer').checked,h='';
 h+='<div class="au"><div class="av"'+bg(av)+'></div><div class="w"><div class="nm">'+esc($('iName').value)+(ver?VF:'')+'</div><div class="dtt">'+esc($('iDate').value)+'</div></div>'+($('iFol').checked?'<div class="fo">＋ 팔로우</div>':'')+KB+'</div>';
 if($('iTrn').checked)h+='<div class="tr"><span>번역 보기</span></div>';
 h+='<div class="bd">'+esc($('iBody').value).replace(/(#[^\s#]+)/g,'<span class="tg">$1</span>')+'</div>';
 ph.forEach(function(u){h+='<img class="ph" src="'+u+'" alt="">'});
 h+='<div class="ct">좋아요<b>'+esc($('iLike').value)+'</b><i>·</i>댓글<b>'+esc($('iCmt').value)+'</b></div><div class="gap"></div>';
 var art=[],all=[];
 $('iCms').value.split('\n').forEach(function(l){
  if(!l.trim())return;var hl=false,a=false;
  if(l[0]==='^'){hl=true;l=l.slice(1)}if(l[0]==='*'){a=true;l=l.slice(1)}
  var p=l.split('|').map(function(s){return s.trim()});
  var o={n:p[0]||'',d:p[1]||'',t:(p[2]||'').replace(/\\n/g,'\n'),l:p[3]||'',r:p[4]||'',hl:hl,a:a};(a?art:all).push(o);
 });
 function card(o){return '<div class="cm'+(o.hl?' hl':'')+'"><div class="av'+(o.a?'':' g')+'"'+(o.a?bg(aav):'')+'></div><div class="cd'+(o.a?' a':'')+'"><div class="nm">'+esc(o.n)+(o.a?VF:'')+' <span class="dtt">'+esc(o.d)+'</span></div>'+KB+'<div class="tx">'+esc(o.t)+'</div><div class="mt"><span>'+HT+esc(o.l)+'</span><span>'+CM+esc(o.r)+'</span></div></div></div>'}
 if(art.length){h+='<div class="sec"><div>아티스트 댓글<s>'+art.length+'</s></div><div class="r"><div class="av"'+bg(aav)+'></div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15l7-7 7 7"/></svg></div></div>';art.forEach(function(o){h+=card(o)});h+='<div class="gap"></div>'}
 h+='<div class="sec"><div>전체 댓글<s>'+esc($('iCmt').value)+'</s></div></div>';
 if($('iMore').checked)h+='<div class="mr"><i>＋</i>최신 댓글 더 보기</div>';
 all.forEach(function(o){h+=card(o)});
 $('in').innerHTML=h;$('in').style.transform='translateY(-'+(parseInt($('iScroll').value)||0)+'px)';
 var f=$('fl');f.classList.toggle('on',$('iFab').checked);
 f.innerHTML=$('iFabT').value==='up'?'<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="1.900" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h14M12 20V8M6 13l6-6 6 6"/></svg>':'<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="1.900" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l6 6 6-6M6 13l6 6 6-6"/></svg>';
 $('sbar').classList.toggle('on',$('iSbar').checked);
}
function fill(){$('iClock').value=D.clock;$('iBat').value=D.bat;$('iSub').value=D.sub;$('iHint').value=D.hint;$('iScroll').value=0;$('iName').value=D.name;$('iDate').value=D.date;$('iBody').value=D.body;$('iLike').value=D.like;$('iCmt').value=D.cmt;$('iCms').value=D.cms;$('iVer').checked=false;$('iFol').checked=true;$('iTrn').checked=false;$('iFab').checked=true;$('iFabT').value='up';$('iMore').checked=true;$('iSbar').checked=true;render()}
['iClock','iBat','iSub','iHint','iScroll','iName','iDate','iBody','iLike','iCmt','iCms'].forEach(function(i){$(i).addEventListener('input',render)});
['iVer','iFol','iTrn','iFab','iFabT','iMore','iSbar'].forEach(function(i){$(i).addEventListener('change',render)});
function rd(f,cb){var r=new FileReader();r.onload=function(e){cb(e.target.result);render()};r.readAsDataURL(f)}
$('iAvatar').addEventListener('change',function(){if(this.files[0])rd(this.files[0],function(v){av=v})});
$('iArtAv').addEventListener('change',function(){if(this.files[0])rd(this.files[0],function(v){aav=v})});
$('iPhotos').addEventListener('change',function(){[].forEach.call(this.files,function(f){rd(f,function(v){ph.push(v)})})});
$('clearImg').onclick=function(){av='';aav='';ph=[];['iAvatar','iArtAv','iPhotos'].forEach(function(i){$(i).value=''});render()};
$('reset').onclick=function(){av='';aav='';ph=[];fill()};
$('savePng').onclick=function(){if(!window.html2canvas)return;html2canvas($('wp'),{scale:3,useCORS:true,backgroundColor:'#fff'}).then(function(c){var a=document.createElement('a');a.download='weversepost.png';a.href=c.toDataURL('image/png');a.click()})};
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드'};
var ed=document.querySelector('.editor'),groups=[].slice.call(ed.querySelectorAll(':scope > .ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
groups.forEach(function(g,i){var b=document.createElement('button');b.type='button';b.textContent=g.getAttribute('data-t');if(!i)b.className='on';b.onclick=function(){groups.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
ed.parentNode.insertBefore(bar,ed);
fill();
})();
