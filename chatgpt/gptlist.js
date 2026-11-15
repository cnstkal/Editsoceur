(function(){
var IC={
 clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
 lib:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="4" height="16" rx="1.500"/><rect x="9" y="4" width="4" height="16" rx="1.500"/><path d="M15.500 5.500l3-1 3 14.500-3 1Z"/></svg>',
 sliders:'<svg viewBox="0 0 24 24"><path d="M3 7h6M15 7h6M3 17h10M19 17h2"/><circle cx="12" cy="7" r="2.500"/><circle cx="16" cy="17" r="2.500"/></svg>',
 grid:'<svg viewBox="0 0 24 24"><circle cx="7" cy="7" r="3"/><circle cx="17" cy="7" r="3"/><circle cx="7" cy="17" r="3"/><circle cx="17" cy="17" r="3"/></svg>',
 star:'<svg viewBox="0 0 24 24"><path d="M12 3.500l2.600 5.400 5.900.8-4.300 4.100 1 5.800L12 16.800l-5.200 2.800 1-5.800L3.500 9.700l5.900-.8L12 3.500Z"/></svg>',
 folder:'<svg viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h4l2 2.500h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/></svg>'
};
var NAMES={clock:'시계',lib:'라이브러리',sliders:'슬라이더',grid:'동그라미 4개',star:'별',folder:'폴더'};
function defaults(){return{
 title:'ChatGPT',showSearch:true,btn:'Chat',initials:'CK',color:'#e6c238',showBottom:true,showPeek:true,
 menu:[{i:'clock',x:'예약'},{i:'lib',x:'라이브러리'},{i:'sliders',x:'맞춤 설정'},{i:'grid',x:'탐색하기'}],
 chats:['주말 여행 계획','안부 인사','프롬프트 다듬기','선물 추천','영어 메일 첨삭','운동 루틴 짜기','자기소개 문구','독서 노트 정리','레시피 정리','면접 질문 연습']
};}
var S=defaults();
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function render(){
 var h='<div class="side"><div class="hd"><b>'+esc(S.title)+'</b>'+(S.showSearch?'<div class="sbtn"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg></div>':'')+'</div><div class="menu">';
 S.menu.forEach(function(m){h+='<div class="mi">'+(IC[m.i]||IC.star)+'<span>'+esc(m.x)+'</span></div>'});
 h+='</div><div class="hr"></div><div class="chats">';
 S.chats.forEach(function(c){h+='<div class="ci">'+esc(c)+'</div>'});
 h+='</div>';
 if(S.showBottom)h+='<div class="bot"><div class="chat"><svg viewBox="0 0 24 24"><path d="M11 4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-3"/><path d="M19.500 4.500a2 2 0 0 1 0 3L12 15l-4 1 1-4 7.500-7.500a2 2 0 0 1 3 0Z"/></svg>'+esc(S.btn)+'</div><div class="av"><i style="background:'+esc(S.color)+'">'+esc(S.initials)+'</i></div></div>';
 h+='</div>';
 if(S.showPeek)h+='<div class="peek"><div class="pc"><svg viewBox="0 0 24 24"><path d="M4 8h16M4 15h10"/></svg></div><div class="pl"></div><div class="pi"><svg viewBox="0 0 24 24"><path d="M12 4v16M4 12h16"/></svg></div></div>';
 var cap=document.getElementById('capture');cap.className='phone'+(S.showPeek?'':' full');
 cap.innerHTML=h;
}
function mv(arr,i,a){
 if(a==='up'&&i>0){var x=arr.splice(i,1)[0];arr.splice(i-1,0,x)}
 if(a==='down'&&i<arr.length-1){var y=arr.splice(i,1)[0];arr.splice(i+1,0,y)}
 if(a==='del')arr.splice(i,1);
}
function renderMenu(){
 var box=document.getElementById('menuList');box.innerHTML='';
 S.menu.forEach(function(m,i){
  var c=document.createElement('div');c.className='card';
  var opts='';Object.keys(IC).forEach(function(k){opts+='<option value="'+k+'">'+NAMES[k]+'</option>'});
  c.innerHTML='<div class="grid2"><label>이름<input type="text" data-k="x"></label><label>아이콘<select data-k="i">'+opts+'</select></label></div><div class="row3"><button type="button" data-a="up">↑</button><button type="button" data-a="down">↓</button><button type="button" data-a="del">× 삭제</button></div>';
  c.querySelectorAll('[data-k]').forEach(function(el){el.value=m[el.dataset.k];el.oninput=function(){m[el.dataset.k]=el.value;render()};el.onchange=el.oninput});
  c.querySelectorAll('[data-a]').forEach(function(b){b.onclick=function(){mv(S.menu,i,b.dataset.a);renderMenu();render()}});
  box.appendChild(c);
 });
}
function renderChats(){
 var box=document.getElementById('chatList');box.innerHTML='';
 S.chats.forEach(function(t,i){
  var c=document.createElement('div');c.className='card';
  c.innerHTML='<label>제목<input type="text"></label><div class="row3"><button type="button" data-a="up">↑</button><button type="button" data-a="down">↓</button><button type="button" data-a="del">× 삭제</button></div>';
  var inp=c.querySelector('input');inp.value=t;inp.oninput=function(){S.chats[i]=inp.value;render()};
  c.querySelectorAll('[data-a]').forEach(function(b){b.onclick=function(){mv(S.chats,i,b.dataset.a);renderChats();render()}});
  box.appendChild(c);
 });
}
var ids=['title','btn','initials','color'],sw=['showSearch','showBottom','showPeek'];
function sync(){ids.forEach(function(k){document.getElementById(k).value=S[k]});sw.forEach(function(k){document.getElementById(k).checked=S[k]})}
ids.forEach(function(k){var el=document.getElementById(k);el.oninput=function(){S[k]=el.value;render()}});
sw.forEach(function(k){var el=document.getElementById(k);el.onchange=function(){S[k]=el.checked;render()}});
document.getElementById('addMenu').onclick=function(){S.menu.push({i:'star',x:'새 메뉴'});renderMenu();render()};
document.getElementById('addChat').onclick=function(){S.chats.push('');renderChats();render()};
document.getElementById('reset').onclick=function(){S=defaults();sync();renderMenu();renderChats();render()};
document.getElementById('save').onclick=function(){
 var b=this;b.textContent='저장 중...';
 html2canvas(document.getElementById('capture'),{scale:2,backgroundColor:'#fafafa',useCORS:true}).then(function(cv){
  var a=document.createElement('a');a.download='gptlist.png';a.href=cv.toDataURL('image/png');a.click();b.textContent='PNG로 저장';
 }).catch(function(){b.textContent='PNG로 저장';alert('저장에 실패했어요')});
};
sync();renderMenu();renderChats();render();
})();
