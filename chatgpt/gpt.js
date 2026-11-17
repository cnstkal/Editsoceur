(function(){
function defaults(){return{
 placeholder:'ChatGPT에게 물어보세요',sendMode:'wave',showHeader:true,showInput:true,
 msgs:[
  {t:'user',x:'안녕',icons:true},
  {t:'bot',x:'안녕!! 🙌 오늘은 뭐 하고 놀까 ㅎㅎ',icons:true}
 ]};}
var S=defaults();
var I={
 menu:'<svg viewBox="0 0 24 24" style="stroke-width:2.6"><path d="M4 8h16M4 15h10"/></svg>',
 edit:'<svg viewBox="0 0 24 24"><path d="M11 4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-3"/><path d="M19.500 4.500a2 2 0 0 1 0 3L12 15l-4 1 1-4 7.500-7.500a2 2 0 0 1 3 0Z"/></svg>',
 dots:'<svg class="f" viewBox="0 0 24 24"><circle cx="4" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="20" cy="12" r="2"/></svg>',
 copy:'<svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h1"/></svg>',
 spk:'<svg viewBox="0 0 24 24"><path d="M4 9.500h3L12 5v14l-5-4.500H4v-5Z"/><path d="M15.500 9a4 4 0 0 1 0 6M18 6.500a7.500 7.500 0 0 1 0 11"/></svg>',
 share:'<svg viewBox="0 0 24 24"><path d="M12 15V3M7.500 7.500L12 3l4.500 4.500M5 12v7h14v-7"/></svg>',
 plus:'<svg viewBox="0 0 24 24"><path d="M12 4v16M4 12h16"/></svg>',
 mic:'<svg class="mic" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="12" rx="3" style="fill:#0d0d0d"/><path d="M5.500 11a6.500 6.500 0 0 0 13 0M12 17.500V21"/></svg>',
 wave:'<svg viewBox="0 0 24 24" style="stroke-width:3"><path d="M5 10v4M9 6v12M13 8v8M17 11v2M21 9v6" style="display:none"/><path d="M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4"/></svg>',
 send:'<svg viewBox="0 0 24 24"><path d="M12 19V5M5.500 11.500L12 5l6.500 6.500"/></svg>'
};
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function render(){
 var h='';
 if(S.showHeader)h+='<div class="hd"><div class="circ">'+I.menu+'</div><div class="pill">'+I.edit+I.dots+'</div></div>';
 h+='<div class="chat">';
 S.msgs.forEach(function(m){
  if(m.t==='user')h+='<div class="u"><div>'+esc(m.x)+'</div></div>';
  else h+='<div class="a"><div class="t">'+esc(m.x)+'</div>'+(m.icons?'<div class="ic">'+I.copy+I.spk+I.share+I.dots.replace('class="f"','style="fill:#0d0d0d;stroke:none;width:26px;height:26px"')+'</div>':'')+'</div>';
 });
 h+='</div><div class="fade"></div>';
 if(S.showInput)h+='<div class="inp"><div class="box">'+I.plus+'<span class="ph">'+esc(S.placeholder)+'</span>'+(S.sendMode==='wave'?I.mic:'')+'<div class="go">'+(S.sendMode==='wave'?I.wave:I.send)+'</div></div></div>';
 document.getElementById('capture').innerHTML=h;
}
function renderList(){
 var box=document.getElementById('list');box.innerHTML='';
 S.msgs.forEach(function(m,i){
  var c=document.createElement('div');c.className='card';
  c.innerHTML='<span class="tag '+m.t+'">'+(m.t==='user'?'내 말풍선':'답변')+'</span><label>내용 (줄바꿈 가능)<textarea data-k="x"></textarea></label>'+
  (m.t==='bot'?'<div class="switches" style="margin-bottom:12px"><label class="sw"><input type="checkbox" data-k="icons"><span class="knob"></span>복사·읽기·공유 아이콘</label></div>':'')+
  '<div class="row3"><button type="button" data-a="up">↑</button><button type="button" data-a="down">↓</button><button type="button" data-a="del">× 삭제</button></div>';
  c.querySelectorAll('[data-k]').forEach(function(el){
   var k=el.dataset.k;
   if(el.type==='checkbox'){el.checked=!!m[k];el.onchange=function(){m[k]=el.checked;render()}}
   else{el.value=m[k];el.oninput=function(){m[k]=el.value;render()}}
  });
  c.querySelectorAll('[data-a]').forEach(function(b){b.onclick=function(){
   var a=b.dataset.a;
   if(a==='up'&&i>0){var x=S.msgs.splice(i,1)[0];S.msgs.splice(i-1,0,x)}
   if(a==='down'&&i<S.msgs.length-1){var y=S.msgs.splice(i,1)[0];S.msgs.splice(i+1,0,y)}
   if(a==='del')S.msgs.splice(i,1);
   renderList();render();
  }});
  box.appendChild(c);
 });
}
var ids=['placeholder','sendMode'],sw=['showHeader','showInput'];
function sync(){ids.forEach(function(k){document.getElementById(k).value=S[k]});sw.forEach(function(k){document.getElementById(k).checked=S[k]})}
ids.forEach(function(k){var el=document.getElementById(k);el.oninput=function(){S[k]=el.value;render()};el.onchange=el.oninput});
sw.forEach(function(k){var el=document.getElementById(k);el.onchange=function(){S[k]=el.checked;render()}});
document.getElementById('addUser').onclick=function(){S.msgs.push({t:'user',x:'',icons:true});renderList();render()};
document.getElementById('addBot').onclick=function(){S.msgs.push({t:'bot',x:'',icons:true});renderList();render()};
document.getElementById('reset').onclick=function(){S=defaults();sync();renderList();render()};
document.getElementById('save').onclick=function(){
 var b=this;b.textContent='저장 중...';
 html2canvas(document.getElementById('capture'),{scale:5,backgroundColor:'#fafafa',useCORS:true}).then(function(cv){
  var a=document.createElement('a');a.download='gpt.png';a.href=cv.toDataURL('image/png');a.click();b.textContent='PNG로 저장';
 }).catch(function(){b.textContent='PNG로 저장';alert('저장에 실패했어요')});
};
sync();renderList();render();
})();
