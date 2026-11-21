(function(){
var $=function(i){return document.getElementById(i)};
var D={clock:'12:04',bat:35,hide:'원문 가리기',color:'#c6eff5',
msgs:['@wasianboiiiii😛😛 #f8dfdb','그게 전부예요 ㅋㅋ // それだけです笑','가끔 그림을 그리기도 하는데 // たまに絵描いたりするんだけど','보여주고 싶어서 // 見せたくて | 22:01','','@명재현 #c6eff5','나 공연 끝나자마자','허겁지겁 밥두공기에 김치찌개에 불닭하나 먹고왔어 | 16:57','','@명재현 #c6eff5','메이크업도 안지우고','왕창먹었다','배불렁 움직이지도 못하게써 | 16:58'].join('\n')};
var av='',hidden=false;
function esc(s){return s.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
function dark(h){var n=parseInt(h.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;return'rgb('+Math.round(r*.94)+','+Math.round(g*.92)+','+Math.round(b*.92)+')'}
function render(){
 $('vClock').textContent=$('iClock').value;$('vBat').textContent=$('iBat').value;
 var groups=[],cur=null,tr=$('iTr').checked;
 $('iMsgs').value.split('\n').forEach(function(l){
  if(!l.trim()){cur=null;return}
  var m=l.match(/^\s*@(.*?)(?:\s+(#[0-9a-fA-F]{6}))?\s*$/);
  if(m){cur={name:m[1],c:m[2]||$('iColor').value,items:[]};groups.push(cur);return}
  if(!cur){cur={name:'',c:$('iColor').value,items:[]};groups.push(cur)}
  var p=l.split('|'),x=p[0].split('//');cur.items.push({o:x[0].trim(),t:(x[1]||'').trim(),tm:(p[1]||'').trim()});
 });
 var h='';
 groups.forEach(function(g){
  var hasTr=false;
  h+='<div class="g" style="--c:'+g.c+';--bd:'+dark(g.c)+'"><div class="av"'+(av?' style="background-image:url('+av+')"':'')+'></div><div class="gb">'+(g.name?'<div class="nm">'+esc(g.name)+'</div>':'');
  g.items.forEach(function(it){
   var t=tr&&it.t;if(t)hasTr=true;
   h+='<div class="r"><div class="b'+(t?' t':'')+'"><div class="o'+(hidden&&t?' hid':'')+'">'+esc(it.o)+'</div>'+(t?'<div class="tr">'+esc(it.t)+'</div>':'')+'</div>'+(it.tm?'<span class="tm">'+esc(it.tm)+'</span>':'')+'</div>';
  });
  if(hasTr)h+='<button class="hd" type="button">'+esc(hidden?'원문 보기':$('iHide').value)+'</button>';
  h+='</div></div>';
 });
 $('ch').innerHTML=h;
}
$('ch').addEventListener('click',function(e){if(e.target.classList.contains('hd')){hidden=!hidden;render()}});
function fill(){$('iClock').value=D.clock;$('iBat').value=D.bat;$('iHide').value=D.hide;$('iColor').value=D.color;$('iMsgs').value=D.msgs;$('iTr').checked=true;hidden=false;render()}
['iClock','iBat','iHide','iColor','iMsgs'].forEach(function(i){$(i).addEventListener('input',render)});
$('iTr').addEventListener('change',render);
$('iAvatar').addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(e){av=e.target.result;render()};r.readAsDataURL(f)});
$('clearImg').onclick=function(){av='';$('iAvatar').value='';render()};
$('reset').onclick=function(){av='';fill()};
$('savePng').onclick=function(){if(!window.html2canvas)return;capChat($('wd'),{scale:3,useCORS:true,backgroundColor:'#000'}).then(function(c){var a=document.createElement('a');a.download='weversedm.png';a.href=c.toDataURL('image/png');a.click()})};
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드'};
var ed=document.querySelector('.editor'),groups=[].slice.call(ed.querySelectorAll(':scope > .ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
groups.forEach(function(g,i){var b=document.createElement('button');b.type='button';b.textContent=g.getAttribute('data-t');if(!i)b.className='on';b.onclick=function(){groups.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
ed.parentNode.insertBefore(bar,ed);
fill();
})();
