(function(){
var $=function(i){return document.getElementById(i)};
var D={name:'내 행복❤️',date:'2026년 11월 15일',hint:'메시지 입력 4회 가능',clock:'12:00',bat:34,
msgs:['사랑해💕 | 오전 10:51','어제 정신없었어서 | 오전 10:51','멋진 상 축하하고 고마워🫶 | 오전 10:51','일어나자마자 잠깐 왔넹 | 오전 10:52','> 윤둥이 | 오전 10:52','웅웅 잘잤어 ㅎㅎ | 오전 10:53'].join('\n')};
var avatar='';
function esc(s){return s.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
function render(){
 var name=$('iName').value,h='';
 $('vTitle').textContent=name;$('vDate').textContent=$('iDate').value;$('vHint').textContent=$('iHint').value;$('vClock').textContent=$('iClock').value;$('vBat').textContent=$('iBat').value;
 $('iMsgs').value.split('\n').forEach(function(l){
  if(!l.trim())return;var me=/^\s*>/.test(l);if(me)l=l.replace(/^\s*>\s?/,'');
  var p=l.split('|'),t=(p[1]||'').trim(),txt=esc(p[0].trim());
  if(me)h+='<div class="m me"><div class="row"><div class="bb">'+txt+'</div>'+(t?'<span class="tm">'+esc(t)+'</span>':'')+'</div></div>';
  else h+='<div class="m"><div class="av"'+(avatar?' style="background-image:url('+avatar+')"':'')+'></div><div class="bd"><div class="nm">'+esc(name)+'</div><div class="row"><div class="bb">'+txt+'</div>'+(t?'<span class="tm">'+esc(t)+'</span>':'')+'</div></div></div>';
 });
 $('msgs').innerHTML=h;
}
function fill(){$('iName').value=D.name;$('iDate').value=D.date;$('iHint').value=D.hint;$('iClock').value=D.clock;$('iBat').value=D.bat;$('iMsgs').value=D.msgs;render()}
['iName','iDate','iHint','iClock','iBat','iMsgs'].forEach(function(i){$(i).addEventListener('input',render)});
$('iAvatar').addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(e){avatar=e.target.result;render()};r.readAsDataURL(f)});
$('clearAv').onclick=function(){avatar='';$('iAvatar').value='';render()};
$('reset').onclick=function(){avatar='';fill()};
$('savePng').onclick=function(){if(!window.html2canvas)return;html2canvas($('fm'),{scale:3,useCORS:true,backgroundColor:'#fff'}).then(function(c){var a=document.createElement('a');a.download='fromm.png';a.href=c.toDataURL('image/png');a.click()})};
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드'};
var ed=document.querySelector('.editor'),groups=[].slice.call(ed.querySelectorAll(':scope > .ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
groups.forEach(function(g,i){var b=document.createElement('button');b.type='button';b.textContent=g.getAttribute('data-t');if(!i)b.className='on';b.onclick=function(){groups.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
ed.parentNode.insertBefore(bar,ed);
fill();
})();
