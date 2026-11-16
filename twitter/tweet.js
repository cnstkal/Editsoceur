(function(){
function cat(bg,fg){return 'data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="'+bg+'"/><path d="M22 40L30 14 44 30Q50 28 56 30L70 14 78 40Q86 60 70 80Q50 92 30 80Q14 60 22 40Z" fill="'+fg+'"/><ellipse cx="38" cy="54" rx="5" ry="7" fill="#222"/><ellipse cx="62" cy="54" rx="5" ry="7" fill="#222"/><path d="M44 68Q50 74 56 68" stroke="#555" stroke-width="3" fill="none"/></svg>')}
function fish(){return 'data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#8cc4e8"/><ellipse cx="50" cy="58" rx="36" ry="34" fill="#7fd6d0"/><circle cx="38" cy="50" r="6" fill="#222"/><circle cx="62" cy="50" r="6" fill="#222"/><ellipse cx="50" cy="68" rx="14" ry="7" fill="#e88aa0"/></svg>')}
var A1=cat('#3a3128','#d9b48a'),A2=fish();
function defaults(){return{
 title:'게시',name:'성체인 고양이',handle:'nangmanmeowmeow',text:'발목까지요!',
 time:'오전 10:52',date:'2026. 11. 12.',views:'1085',reply:'1',rt:'10',like:'11',
 avatar:A1,btn:'쪽지',showBtn:true,lockT:false,
 showQuote:true,qname:'지몬냥이',qhandle:'NippleMon',qtime:'3일',qtext:'엉.주사맞을때어디까지내려야해요?',qavatar:A2,
 showNotice:false,notice:'',
 replies:[
  {name:'지몬냥이',handle:'NippleMon',time:'3일',text:'감사합니다 덕분에 구속됐습니다',reply:'1',rt:'',like:'5',view:'90',avatar:A2,icon:'x',lock:false,chain:false},
  {name:'성체인 고양이',handle:'nangmanmeowmeow',time:'3일',text:'간호사님이 화끈하다고 좋아하시죠?',reply:'',rt:'',like:'2',view:'73',avatar:'',icon:'hidden',lock:false,chain:true}
 ]};}
var S=defaults();
var I={
 back:'<svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8"/></svg>',
 dots:'<svg class="dots" viewBox="0 0 24 24"><circle cx="4" cy="12" r="2.2"/><circle cx="12" cy="12" r="2.2"/><circle cx="20" cy="12" r="2.2"/></svg>',
 lock:'<svg class="lk" viewBox="0 0 24 24"><path d="M7 10V7a5 5 0 0 1 10 0v3h1.5A1.5 1.5 0 0 1 20 11.5v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5v-8A1.5 1.5 0 0 1 5.5 10H7Zm2 0h6V7a3 3 0 0 0-6 0v3Z"/></svg>',
 lockl:'<svg viewBox="0 0 24 24"><rect x="4.500" y="10" width="15" height="10.500" rx="2.500"/><path d="M8 10V7.500a4 4 0 0 1 8 0V10M9.500 15.200h5"/></svg>',
 rep:'<svg viewBox="0 0 24 24"><path d="M12 4c-5 0-8.500 3-8.500 7 0 2.200 1.200 4.100 3 5.300L5.500 20l4.300-2.500c.7.100 1.500.2 2.200.2 5 0 8.500-3 8.500-7S17 4 12 4Z"/></svg>',
 rt:'<svg viewBox="0 0 24 24"><path d="M4 12V9a3 3 0 0 1 3-3h11M15 2.500L18.500 6 15 9.500M20 12v3a3 3 0 0 1-3 3H6M9 14.500L5.500 18 9 21.500"/></svg>',
 heart:'<svg viewBox="0 0 24 24"><path d="M12 20.500S3.500 15.500 3.500 9.200A4.700 4.700 0 0 1 12 6.500a4.700 4.700 0 0 1 8.500 2.700C20.500 15.500 12 20.500 12 20.500Z"/></svg>',
 view:'<svg viewBox="0 0 24 24"><path d="M5 20V10M10 20V4M15 20v-7M20 20v-4"/></svg>',
 bm:'<svg viewBox="0 0 24 24"><path d="M6 3.500h12v17l-6-4.500-6 4.500v-17Z"/></svg>',
 sh:'<svg viewBox="0 0 24 24"><path d="M12 15V3M7.500 7.500L12 3l4.500 4.500M5 13v6.500h14V13"/></svg>',
 eye:'<svg viewBox="0 0 24 24"><path d="M20 4C12 4 5 9 5 16c0 1.500.4 2.800 1 4 3.500-.5 5.500-1.500 7-3.500M3 21c4-4 8-8 13-11"/><path d="M4 21L21 3"/></svg>',
 more:'<svg class="d" viewBox="0 0 24 24"><circle cx="4" cy="12" r="1.800"/><circle cx="12" cy="12" r="1.800"/><circle cx="20" cy="12" r="1.800"/></svg>',
 x:'<svg class="xx" viewBox="0 0 24 24"><path d="M18.200 2.300h3.300l-7.200 8.300 8.500 11.200h-6.700l-5.200-6.800-6 6.800H1.600l7.700-8.800L1.200 2.300h6.800l4.700 6.200 5.500-6.200Zm-1.200 17.500h1.800L7.100 4.100H5.200L17 19.800Z"/></svg>',
 home:'<svg viewBox="0 0 24 24"><path d="M12 3L3.500 10v10.500h6v-6h5v6h6V10L12 3Z"/></svg>',
 search:'<svg viewBox="0 0 24 24" style="stroke-width:2.4"><circle cx="11" cy="11" r="7.500"/><path d="M21 21l-4.500-4.500"/></svg>',
 bell:'<svg viewBox="0 0 24 24"><path d="M6 17V11a6 6 0 0 1 12 0v6l1.500 2h-15L6 17ZM10 21.500h4"/></svg>',
 msg:'<svg viewBox="0 0 24 24" style="stroke-width:2.4"><path d="M12 3.500c-5 0-9 3.200-9 7.300 0 2.300 1.300 4.300 3.300 5.600L5.500 21l4.700-2.800c.6.100 1.200.2 1.800.2 5 0 9-3.200 9-7.300S17 3.500 12 3.500Z"/></svg>'
};
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function hd(s){return esc(String(s).replace(/^@/,''))}
function render(){
 var h='<div class="hd">'+I.back+'<b>'+esc(S.title)+'</b>'+I.dots+'</div><div class="main">';
 h+='<div class="au"><div class="av"><img src="'+esc(S.avatar)+'"></div><div class="who"><div class="nm">'+esc(S.name)+(S.lockT?I.lock:'')+'</div><div class="hn">@'+hd(S.handle)+'</div></div>'+(S.showBtn?'<div class="pill">쪽지</div>':'')+'</div>';
 h+='<div class="body'+(S.showQuote?' hasq':'')+'">'+esc(S.text)+'</div>';
 if(S.showQuote)h+='<div class="quote"><div class="qh"><div class="av"><img src="'+esc(S.qavatar||S.avatar)+'"></div><b>'+esc(S.qname)+'</b><span class="m">@'+hd(S.qhandle)+'</span><span class="tm">· '+esc(S.qtime)+'</span></div><div class="qt">'+esc(S.qtext)+'</div></div>';
 var info=[];
 if(S.time)info.push(esc(S.time));
 if(S.date)info.push(esc(S.date));
 if(S.views)info.push('조회 <b>'+esc(S.views)+'</b>회');
 h+='<div class="info">'+info.join(' · ')+'</div>';
 h+='<div class="acts"><span class="fade">'+I.rep+esc(S.reply)+'</span><span>'+I.rt+esc(S.rt)+'</span><span>'+I.heart+esc(S.like)+'</span><span>'+I.bm+'</span><span>'+I.sh+'</span></div></div>';
 
 S.replies.forEach(function(r,i){
  var pre=r.chain&&i>0,nx=S.replies[i+1]&&S.replies[i+1].chain;
  var cls='rp'+(pre?' haspre':'')+(nx?' hasnext':'');
  var top=r.icon==='hidden'?I.more:'';
  h+='<div class="'+cls+'"><div class="av"><img src="'+esc(r.avatar||S.avatar)+'"></div><div class="rb"><div class="rh"><b>'+esc(r.name)+'</b>'+(r.lock?I.lock:'')+'<span class="m">@'+hd(r.handle)+'</span><span class="m tm">· '+esc(r.time)+'</span></div><div class="rt">'+esc(r.text)+'</div>';
  h+='<div class="ra"><span class="fade">'+I.rep+esc(r.reply)+'</span><span>'+I.rt+esc(r.rt)+'</span><span>'+I.heart+esc(r.like)+'</span><span>'+I.view+esc(r.view)+'</span><span class="s">'+I.bm+'</span><span class="s">'+I.sh+'</span></div></div>';
  if(top)h+='<div class="rtop">'+top+'</div>';
  h+='</div>';
 });

 document.getElementById('capture').innerHTML=h;
}
function readFile(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
var ids=['title','name','handle','text','time','date','views','reply','rt','like','qname','qhandle','qtime','qtext','notice'];
var sw=['showBtn','lockT','showQuote'];
function sync(){
 ids.forEach(function(k){document.getElementById(k).value=S[k]});
 sw.forEach(function(k){document.getElementById(k).checked=S[k]});
}
function renderList(){
 var box=document.getElementById('replyList');box.innerHTML='';
 S.replies.forEach(function(t,i){
  var c=document.createElement('div');c.className='card';
  c.innerHTML='<div class="grid3"><label>이름<input type="text" data-k="name"></label><label>아이디<input type="text" data-k="handle"></label><label>시간<input type="text" data-k="time"></label></div>'+
  '<label>내용<input type="text" data-k="text"></label>'+
  '<div class="grid4"><label>멘션<input type="text" data-k="reply"></label><label>리트윗<input type="text" data-k="rt"></label><label>마음<input type="text" data-k="like"></label><label>조회수<input type="text" data-k="view"></label></div>'+
  '<div class="grid2"><label>프로필 사진<input type="file" accept="image/*" data-f="1"></label><label>오른쪽 위 아이콘<select data-k="icon"><option value="none">없음</option><option value="x">X</option><option value="hidden">숨김 + 점</option></select></label></div>'+
  '<div class="switches"><label class="sw"><input type="checkbox" data-k="chain"><span class="knob"></span>앞 답글에 이어짐 (연결선)</label><label class="sw"><input type="checkbox" data-k="lock"><span class="knob"></span>자물쇠</label></div>'+
  '<div class="row3" style="margin-top:12px"><button type="button" data-a="up">↑</button><button type="button" data-a="down">↓</button><button type="button" data-a="del">× 삭제</button></div>';
  c.querySelectorAll('[data-k]').forEach(function(el){
   var k=el.dataset.k;
   if(el.type==='checkbox'){el.checked=!!t[k];el.onchange=function(){t[k]=el.checked;render()}}
   else{el.value=t[k];el.oninput=function(){t[k]=el.value;render()};el.onchange=el.oninput}
  });
  c.querySelector('[data-f]').onchange=function(e){readFile(e.target.files[0],function(u){t.avatar=u;render()})};
  c.querySelectorAll('[data-a]').forEach(function(b){b.onclick=function(){
   var a=b.dataset.a;
   if(a==='up'&&i>0){var x=S.replies.splice(i,1)[0];S.replies.splice(i-1,0,x)}
   if(a==='down'&&i<S.replies.length-1){var y=S.replies.splice(i,1)[0];S.replies.splice(i+1,0,y)}
   if(a==='del')S.replies.splice(i,1);
   renderList();render();
  }});
  box.appendChild(c);
 });
}
function addR(chain){
 S.replies.push({name:'사용자',handle:'username',time:'방금',text:'',reply:'',rt:'',like:'',view:'',avatar:A2,icon:'none',lock:false,chain:chain});
 renderList();render();
}
function bind(){
 ids.forEach(function(k){var el=document.getElementById(k);el.oninput=function(){S[k]=el.value;render()}});
 sw.forEach(function(k){var el=document.getElementById(k);el.onchange=function(){S[k]=el.checked;render()}});
 document.getElementById('avatarFile').onchange=function(e){readFile(e.target.files[0],function(u){S.avatar=u;render()})};
 document.getElementById('qavatarFile').onchange=function(e){readFile(e.target.files[0],function(u){S.qavatar=u;render()})};
 document.getElementById('addReply').onclick=function(){addR(false)};
 document.getElementById('addChain').onclick=function(){addR(true)};
 document.getElementById('reset').onclick=function(){S=defaults();sync();renderList();render()};
 document.getElementById('save').onclick=function(){
  var b=this;b.textContent='저장 중...';
  html2canvas(document.getElementById('capture'),{scale:2,backgroundColor:'#ffffff',useCORS:true}).then(function(cv){
   var a=document.createElement('a');a.download='tweet.png';a.href=cv.toDataURL('image/png');a.click();b.textContent='PNG로 저장';
  }).catch(function(){b.textContent='PNG로 저장';alert('저장에 실패했어요')});
 };
}
sync();bind();renderList();render();
})();
