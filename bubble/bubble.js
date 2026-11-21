(function(){
var $=function(i){return document.getElementById(i)};
var D={name:'시온이',title:'정인이💕',banner:'우리 다시 만날 수 있겠지?',date:'2020년 11월 30일 월요일',clock:'12:02',bat:35,
msgs:['안녕하세요 아이엔입니다! 저도 많이 찾아올 테니 많이 많이 찾아와주세요! | 오후 07:01','몇시부터 몇시였더라 | 오후 02:44','[사진] | 오후 09:29','[이모지]🍀 | 오후 02:44','> 8시부터야아아 | 오후 02:44','> 으아아아아 떨린다 | 오후 02:44','오케이 ㅎㅎㅎ | 오후 02:49'].join('\n'),
bg:'#ededed',me:'#a186ee',ring:'#6c8cf0'};
var av='',ph='';
function esc(s){return s.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
function render(){
 var bu=$('bu'),name=esc($('iName').value),art=$('iArt').checked,h='';
 bu.style.setProperty('--bg',$('iBg').value);bu.style.setProperty('--me',$('iMe').value);bu.style.setProperty('--ring',$('iRing').value);
 $('vTitle').textContent=$('iTitle').value;$('vBanner').textContent=$('iBanner').value;$('vDate').textContent=$('iDate').value;if($('vClock'))$('vClock').textContent=$('iClock').value;if($('vBat'))$('vBat').textContent=$('iBat').value;
 $('bn').classList.toggle('off',!$('iBnOn').checked);bu.classList.toggle('nb',!$('iBnOn').checked);$('fab').classList.toggle('on',$('iFab').checked);bu.classList.toggle('chat-only',$('iChatOnly').checked);
 $('iMsgs').value.split('\n').forEach(function(l){
  if(!l.trim())return;var me=/^\s*>/.test(l);if(me)l=l.replace(/^\s*>\s?/,'');
  var p=l.split('|'),t=(p[1]||'').trim(),x=p[0].trim(),b;
  if(x.indexOf('[사진]')===0)b='<div class="bb ph"'+(ph?' style="background-image:url('+ph+')"':'')+'></div>';
  else if(x.indexOf('[이모지]')===0)b='<div class="bb em">'+esc(x.slice(5))+'</div>';
  else b='<div class="bb">'+esc(x)+'</div>';
  var tm=t?'<span class="tm">'+esc(t)+'</span>':'';
  if(me)h+='<div class="m me"><div class="row">'+b+tm+'</div></div>';
  else h+='<div class="m'+(art?' art':'')+'"><div class="av"'+(av?' style="background-image:url('+av+')"':'')+'></div><div class="bd"><div class="nm"><span class="bg">ARTIST</span>'+name+'</div><div class="row">'+b+tm+'</div></div></div>';
 });
 $('msgs').innerHTML=h;
}
function fill(){$('iName').value=D.name;$('iTitle').value=D.title;$('iBanner').value=D.banner;$('iDate').value=D.date;$('iClock').value=D.clock;$('iBat').value=D.bat;$('iMsgs').value=D.msgs;$('iBg').value=D.bg;$('iMe').value=D.me;$('iRing').value=D.ring;$('iArt').checked=true;$('iBnOn').checked=true;$('iFab').checked=false;$('iChatOnly').checked=false;render()}
['iName','iTitle','iBanner','iDate','iClock','iBat','iMsgs','iBg','iMe','iRing'].forEach(function(i){$(i).addEventListener('input',render)});
['iArt','iBnOn','iFab','iChatOnly'].forEach(function(i){$(i).addEventListener('change',render)});
function rd(id,cb){$(id).addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(e){cb(e.target.result);render()};r.readAsDataURL(f)})}
rd('iAvatar',function(v){av=v});rd('iPhoto',function(v){ph=v});
$('clearImg').onclick=function(){av='';ph='';$('iAvatar').value='';$('iPhoto').value='';render()};
$('reset').onclick=function(){av='';ph='';fill()};
$('savePng').onclick=function(){if(!window.html2canvas)return;html2canvas($('bu'),{scale:3,useCORS:true,backgroundColor:$('iChatOnly').checked?null:$('iBg').value}).then(function(c){var a=document.createElement('a');a.download='bubble.png';a.href=c.toDataURL('image/png');a.click()})};
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드'};
var ed=document.querySelector('.editor'),groups=[].slice.call(ed.querySelectorAll(':scope > .ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
groups.forEach(function(g,i){var b=document.createElement('button');b.type='button';b.textContent=g.getAttribute('data-t');if(!i)b.className='on';b.onclick=function(){groups.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
ed.parentNode.insertBefore(bar,ed);
fill();
})();
