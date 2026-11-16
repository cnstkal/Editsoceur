(function(){
var FACE='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#6b7a99"/><circle cx="50" cy="44" r="20" fill="#e8c3a0"/><path d="M28 42Q30 18 52 20Q74 20 72 44Q64 30 50 32Q36 30 28 42Z" fill="#2a2420"/><path d="M14 100Q18 70 50 68Q82 70 86 100Z" fill="#c9a98c"/></svg>');
function M(t,x,u){return{t:t,x:x,u:!!u}}
function defaults(){return{
 name:'렙',avatar:FACE,showCall:true,showRead:true,readText:'읽음',placeholder:'쪽지',showInput:true,
 msgs:[
  M('them','아까 말한 거 생각해봤는데 그냥 내일 가는 게 나을 듯'),
  M('me','오 나도 그게 편해ㅋㅋ'),
  M('them','근데 비 온다는데 우산 챙겨야 하나 좀 귀찮다 그냥 안 챙길까 고민중'),
  M('me','챙겨.'),
  M('them','헉...'),
  M('time','10월 26일 (월) 오후 10:19'),
  M('them','오늘 저녁 뭐 먹었어'),
  M('them','나는 라면 먹었는데 또 배고픔'),
  M('them','@someone',true),
  M('me','당연히 먹어야지ㅋㅋㅋ'),
  M('me','냉장고 뒤져봐')
 ]};}
var S=defaults();
var I={
 back:'<svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8"/></svg>',
 phone:'<svg viewBox="0 0 24 24"><path d="M5 4h3.500l2 5-2.500 1.500a11 11 0 0 0 5.500 5.500L15 13.500l5 2V19a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>',
 video:'<svg viewBox="0 0 24 24" style="stroke-width:2.2"><rect x="2.500" y="6" width="14" height="12" rx="3"/><path d="M17 10.500l4.500-2.500v8L17 13.500"/></svg>',
 plus:'<svg viewBox="0 0 24 24"><path d="M12 4v16M4 12h16"/></svg>',
 mic:'<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="12" rx="3" style="fill:#0f1419"/><path d="M5.500 11a6.500 6.500 0 0 0 13 0M12 17.500V21"/></svg>',
 home:'<svg viewBox="0 0 24 24"><path d="M12 3L3.500 10v10.500h6v-6h5v6h6V10L12 3Z"/></svg>',
 search:'<svg viewBox="0 0 24 24" style="stroke-width:2.4"><circle cx="11" cy="11" r="7.500"/><path d="M21 21l-4.500-4.500"/></svg>',
 eye:'<svg viewBox="0 0 24 24"><path d="M20 4C12 4 5 9 5 16c0 1.500.4 2.800 1 4 3.500-.5 5.500-1.500 7-3.500M3 21c4-4 8-8 13-11"/><path d="M4 21L21 3"/></svg>',
 bell:'<svg viewBox="0 0 24 24"><path d="M6 17V11a6 6 0 0 1 12 0v6l1.500 2h-15L6 17ZM10 21.500h4"/></svg>',
 msg:'<svg class="fill" viewBox="0 0 24 24"><path d="M12 3.500c-5 0-9 3.200-9 7.300 0 2.300 1.300 4.300 3.300 5.600L5.500 21l4.700-2.800c.6.100 1.200.2 1.800.2 5 0 9-3.200 9-7.300S17 3.500 12 3.500Z"/></svg>'
};
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function render(){
 var h='<div class="dh">'+I.back+'<div class="av"><img src="'+esc(S.avatar)+'"></div><b>'+esc(S.name)+'</b>'+(S.showCall?'<div class="ic">'+I.phone+I.video+'</div>':'')+'</div><div class="msgs">';
 var prev='';
 S.msgs.forEach(function(m,i){
  if(m.t==='time'){h+='<div class="tm">'+esc(m.x)+'</div>';prev='time';return}
  var gap=(prev&&prev!==m.t&&prev!=='time')?' gap':'';
  h+='<div class="b '+m.t+gap+'">'+(m.u?'<u>'+esc(m.x)+'</u>':esc(m.x))+'</div>';
  prev=m.t;
 });
 var last=S.msgs[S.msgs.length-1];
 if(S.showRead&&last&&last.t==='me')h+='<div class="rd">'+esc(S.readText)+'</div>';
 h+='</div>';
 if(S.showInput)h+='<div class="inp"><div class="plus">'+I.plus+'</div><div class="box"><span>'+esc(S.placeholder)+'</span>'+I.mic+'</div></div>';

 document.getElementById('capture').innerHTML=h;
}
function readFile(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
var ids=['name','readText','placeholder'];
var sw=['showCall','showRead','showInput'];
function sync(){
 ids.forEach(function(k){document.getElementById(k).value=S[k]});
 sw.forEach(function(k){document.getElementById(k).checked=S[k]});
}
var LBL={me:'내 말풍선',them:'상대 말풍선',time:'날짜·시간'};
function renderList(){
 var box=document.getElementById('msgList');box.innerHTML='';
 S.msgs.forEach(function(m,i){
  var c=document.createElement('div');c.className='card';
  c.innerHTML='<span class="tag '+m.t+'">'+LBL[m.t]+'</span>'+
  '<label>내용<input type="text" data-k="x"></label>'+
  '<div class="grid2"><label>종류<select data-k="t"><option value="me">내 말풍선 (파랑)</option><option value="them">상대 말풍선 (회색)</option><option value="time">날짜·시간 줄</option></select></label>'+
  '<label class="sw" style="align-self:end"><input type="checkbox" data-k="u"><span class="knob"></span>밑줄(멘션)</label></div>'+
  '<div class="row3" style="margin-top:6px"><button type="button" data-a="up">↑</button><button type="button" data-a="down">↓</button><button type="button" data-a="del">× 삭제</button></div>';
  c.querySelectorAll('[data-k]').forEach(function(el){
   var k=el.dataset.k;
   if(el.type==='checkbox'){el.checked=!!m[k];el.onchange=function(){m[k]=el.checked;render()}}
   else if(el.tagName==='SELECT'){el.value=m[k];el.onchange=function(){m[k]=el.value;renderList();render()}}
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
function add(t){S.msgs.push(M(t,t==='time'?'11월 15일 (일) 오후 11:22':''));renderList();render();
 var inp=document.querySelectorAll('#msgList input[data-k="x"]');if(inp.length)inp[inp.length-1].focus()}
function bind(){
 ids.forEach(function(k){var el=document.getElementById(k);el.oninput=function(){S[k]=el.value;render()}});
 sw.forEach(function(k){var el=document.getElementById(k);el.onchange=function(){S[k]=el.checked;render()}});
 document.getElementById('avatarFile').onchange=function(e){readFile(e.target.files[0],function(u){S.avatar=u;render()})};
 document.getElementById('addMe').onclick=function(){add('me')};
 document.getElementById('addThem').onclick=function(){add('them')};
 document.getElementById('addTime').onclick=function(){add('time')};
 document.getElementById('reset').onclick=function(){S=defaults();sync();renderList();render()};
 document.getElementById('save').onclick=function(){
  var b=this;b.textContent='저장 중...';
  html2canvas(document.getElementById('capture'),{scale:2,backgroundColor:'#ffffff',useCORS:true}).then(function(cv){
   var a=document.createElement('a');a.download='dm.png';a.href=cv.toDataURL('image/png');a.click();b.textContent='PNG로 저장';
  }).catch(function(){b.textContent='PNG로 저장';alert('저장에 실패했어요')});
 };
}
sync();bind();renderList();render();
})();
