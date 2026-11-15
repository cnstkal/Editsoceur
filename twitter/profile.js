(function(){
var CORGI='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#2b3a55"/><rect width="22" height="100" fill="#444a55"/><ellipse cx="50" cy="88" rx="44" ry="22" fill="#d9964f"/><ellipse cx="30" cy="48" rx="11" ry="16" fill="#c98a52" transform="rotate(-25 30 48)"/><ellipse cx="72" cy="48" rx="11" ry="16" fill="#c98a52" transform="rotate(25 72 48)"/><ellipse cx="51" cy="58" rx="24" ry="25" fill="#e5a85f"/><path d="M51 38C40 48 40 70 51 80C62 70 62 48 51 38Z" fill="#fff"/><ellipse cx="38" cy="52" rx="3" ry="3.5" fill="#1c1410"/><ellipse cx="64" cy="52" rx="3" ry="3.5" fill="#1c1410"/><ellipse cx="51" cy="62" rx="5" ry="3.5" fill="#1c1410"/><path d="M44 69Q51 80 58 69Z" fill="#d95a6a"/><path d="M26 34Q51 12 76 34Q51 40 26 34Z" fill="#8a6a55"/><ellipse cx="51" cy="35" rx="26" ry="5" fill="#7a5c48"/></svg>');
function defaults(){return{
 name:'sa',handle:'jukee_3',bio:'🌭',job:'기업가',birth:'1994년 1월 16일',joined:'2020년 2월',
 following:'55',followers:'0',avatar:CORGI,banner:'',bannerColor:'#999999',badge:'1',
 lock:true,verify:true,dot:true,fab:true,nav:true,
 tweets:[
  {name:'sa',handle:'jukee_3',time:'9분',text:'학교가기히러',reply:'',rt:'',like:'',view:'3',avatar:'',lock:true},
  {name:'sa',handle:'jukee_3',time:'9분',text:'끼야소',reply:'',rt:'',like:'',view:'4',avatar:'',lock:true},
  {name:'sa',handle:'jukee_3',time:'9분',text:'안녕와세여',reply:'',rt:'',like:'',view:'5',avatar:'',lock:true},
  {name:'sa',handle:'jukee_3',time:'1시간',text:'점심 뭐 먹지 고민중',reply:'1',rt:'',like:'2',view:'18',avatar:'',lock:true},
  {name:'sa',handle:'jukee_3',time:'3시간',text:'오늘 날씨 진짜 좋다',reply:'',rt:'',like:'1',view:'12',avatar:'',lock:true}
 ]};}
var S=defaults();
var I={
 back:'<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
 search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
 lock:'<svg class="lk" viewBox="0 0 24 24"><path d="M7 10V7a5 5 0 0 1 10 0v3h1.5A1.5 1.5 0 0 1 20 11.5v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5v-8A1.5 1.5 0 0 1 5.5 10H7Zm2 0h6V7a3 3 0 0 0-6 0v3Zm3 3.5a1.7 1.7 0 0 0-.8 3.2V18h1.6v-1.3a1.7 1.7 0 0 0-.8-3.2Z"/></svg>',
 x:'<svg class="xl" viewBox="0 0 24 24"><path d="M18.2 2.3h3.3l-7.2 8.3 8.5 11.2h-6.7l-5.2-6.8-6 6.8H1.6l7.7-8.8L1.2 2.3h6.8l4.7 6.2 5.5-6.2Zm-1.2 17.5h1.8L7.1 4.1H5.2L17 19.8Z"/></svg>',
 chk:'<svg viewBox="0 0 24 24"><path fill="#1d9bf0" d="M12 1.5l2.6 1.9 3.2-.1 1 3 2.6 1.9-1 3 1 3-2.6 1.9-1 3-3.2-.1L12 22.5l-2.6-1.9-3.2.1-1-3-2.6-1.9 1-3-1-3 2.6-1.9 1-3 3.2.1L12 1.5Z"/><path d="M7.8 12.3l3 3 5.4-5.9" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 job:'<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18M12 12v3"/></svg>',
 bd:'<svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0-6 6c0 3 2 5.5 4.5 6.3V17h3v-1.7C16 14.5 18 12 18 9a6 6 0 0 0-6-6Z"/><path d="M10.5 20h3"/></svg>',
 cal:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
 arr:'<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke-width:2.2"><path d="M9 5l7 7-7 7"/></svg>',
 post:'<svg viewBox="0 0 24 24"><rect x="3" y="3.5" width="18" height="17" rx="3.5"/><path d="M8 9.5h8M8 14h5"/></svg>',
 rep:'<svg viewBox="0 0 24 24"><path d="M12 4c-5 0-8.500 3-8.500 7 0 2.200 1.200 4.100 3 5.300L5.500 20l4.300-2.500c.7.100 1.500.2 2.200.2 5 0 8.500-3 8.500-7S17 4 12 4Z"/></svg>',
 rt:'<svg viewBox="0 0 24 24"><path d="M4 12V9a3 3 0 0 1 3-3h11M15 2.5L18.5 6 15 9.5M20 12v3a3 3 0 0 1-3 3H6M9 14.5L5.5 18 9 21.5"/></svg>',
 heart:'<svg viewBox="0 0 24 24"><path d="M12 20.5S3.500 15.500 3.500 9.200A4.700 4.700 0 0 1 12 6.500a4.700 4.700 0 0 1 8.500 2.700C20.500 15.500 12 20.500 12 20.500Z"/></svg>',
 view:'<svg viewBox="0 0 24 24"><path d="M5 20V10M10 20V4M15 20v-7M20 20v-4"/></svg>',
 bm:'<svg viewBox="0 0 24 24"><path d="M6 3.5h12v17l-6-4.500-6 4.500v-17Z"/></svg>',
 sh:'<svg viewBox="0 0 24 24"><path d="M12 15V3M7.500 7.500L12 3l4.500 4.500M5 13v6.500h14V13"/></svg>',
 media:'<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="14" rx="2.5"/><path d="M7 3.5h10M10 10.500v5l4.500-2.500-4.500-2.500Z"/></svg>',
 home:'<svg viewBox="0 0 24 24" style="fill:#0f1419"><path d="M12 2.500L3 10v10.500h6.500v-6h5v6H21V10l-9-7.500Z"/></svg>',
 feather:'<svg viewBox="0 0 24 24"><path d="M20 4C12 4 5 9 5 16c0 1.500.4 2.800 1 4 3.500-.5 5.500-1.500 7-3.500M3 21c4-4 8-8 13-11"/></svg>',
 bell:'<svg viewBox="0 0 24 24"><path d="M6 17V11a6 6 0 0 1 12 0v6l1.500 2h-15L6 17ZM10 21.500h4"/></svg>',
 msg:'<svg viewBox="0 0 24 24"><path d="M12 3.500c-5 0-9 3.200-9 7.300 0 2.300 1.300 4.300 3.300 5.600L5.500 21l4.700-2.800c.6.100 1.200.2 1.800.2 5 0 9-3.200 9-7.300S17 3.500 12 3.500Z"/></svg>'
};
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function cnt(v){return v?esc(v):''}
function render(){
 var bn=S.banner?'background-image:url('+S.banner+')':'background-color:'+S.bannerColor;
 var h='<div class="banner" style="'+bn+'"><div class="cb l">'+I.back+'</div><div class="cb r">'+I.search+'</div><div class="pavatar"><img src="'+esc(S.avatar||CORGI)+'"></div></div>';
 h+='<div class="prof"><div class="pname">'+esc(S.name)+(S.lock?I.lock:'')+(S.verify?'<span class="verify">'+I.chk+'인증받기</span>':'')+'</div>';
 h+='<div class="phandle">@'+esc(S.handle.replace(/^@/,''))+'</div><div class="pbio">'+esc(S.bio)+'</div><div class="meta">';
 if(S.job)h+='<span>'+I.job+esc(S.job)+'</span>';
 if(S.birth)h+='<span>'+I.bd+'생일: '+esc(S.birth)+'</span>';
 if(S.joined)h+='<span>'+I.cal+esc(S.joined)+'에 가입함 '+I.arr+'</span>';
 h+='</div><div class="follow"><span><b>'+esc(S.following)+'</b> 팔로잉</span><span><b>'+esc(S.followers)+'</b> 팔로워</span></div>';
 h+='<div class="btns"><div>프로필 공유</div><div>프로필 수정</div></div></div>';
 h+='<div class="tabs"><div class="on">'+I.post+'게시물<svg class="ch" viewBox="0 0 24 24"><path d="M5 9l7 7 7-7"/></svg></div><div>'+I.rep+'</div><div>'+I.rt+'</div><div>'+I.media+'</div></div>';
 S.tweets.forEach(function(t){
  h+='<div class="post"><div class="av"><img src="'+esc(t.avatar||S.avatar||CORGI)+'"></div><div class="pb"><div class="ph"><b>'+esc(t.name)+'</b>'+(t.lock?I.lock:'')+'<span class="m">@'+esc(t.handle.replace(/^@/,''))+' · '+esc(t.time)+'</span></div><div class="pt">'+esc(t.text)+'</div>';
  h+='<div class="ac"><span>'+I.rep+cnt(t.reply)+'</span><span>'+I.rt+cnt(t.rt)+'</span><span>'+I.heart+cnt(t.like)+'</span><span>'+I.view+cnt(t.view)+'</span><span style="min-width:0">'+I.bm+'</span><span style="min-width:0">'+I.sh+'</span></div></div>'+I.x+'</div>';
 });
 if(S.fab)h+='<div class="fabbtn"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></div>';
 if(S.nav)h+='<div class="nv"><div>'+I.home+(S.dot?'<i class="dt"></i>':'')+'</div><div>'+I.search+'</div><div>'+I.feather+(S.badge?'<i class="bd">'+esc(S.badge)+'</i>':'')+'</div><div>'+I.bell+'</div><div>'+I.msg+'</div></div>';
 document.getElementById('capture').innerHTML=h;
}
function renderList(){
 var box=document.getElementById('tweetList');box.innerHTML='';
 S.tweets.forEach(function(t,i){
  var c=document.createElement('div');c.className='card';
  c.innerHTML='<div class="grid3"><label>이름<input type="text" data-k="name"></label><label>아이디<input type="text" data-k="handle"></label><label>시간<input type="text" data-k="time"></label></div>'+
  '<label>내용<input type="text" data-k="text"></label>'+
  '<div class="grid4"><label>멘션<input type="text" data-k="reply"></label><label>리트윗<input type="text" data-k="rt"></label><label>마음<input type="text" data-k="like"></label><label>조회수<input type="text" data-k="view"></label></div>'+
  '<div class="grid2"><label>프로필 사진<input type="file" accept="image/*" data-f="avatar"></label><label class="chk"><input type="checkbox" data-k="lock">자물쇠</label></div>'+
  '<div class="row3"><button type="button" data-a="up">↑</button><button type="button" data-a="down">↓</button><button type="button" data-a="del">× 삭제</button></div>';
  c.querySelectorAll('[data-k]').forEach(function(el){
   var k=el.dataset.k;
   if(el.type==='checkbox'){el.checked=!!t[k];el.onchange=function(){t[k]=el.checked;render()}}
   else{el.value=t[k];el.oninput=function(){t[k]=el.value;render()}}
  });
  c.querySelector('[data-f]').onchange=function(e){readFile(e.target.files[0],function(u){t.avatar=u;render()})};
  c.querySelectorAll('[data-a]').forEach(function(b){b.onclick=function(){
   var a=b.dataset.a;
   if(a==='up'&&i>0){var x=S.tweets.splice(i,1)[0];S.tweets.splice(i-1,0,x)}
   if(a==='down'&&i<S.tweets.length-1){var y=S.tweets.splice(i,1)[0];S.tweets.splice(i+1,0,y)}
   if(a==='del')S.tweets.splice(i,1);
   renderList();render();
  }});
  box.appendChild(c);
 });
}
function readFile(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
var ids=['name','handle','bio','job','birth','joined','following','followers','badge','bannerColor'];
var sw=['lock','verify','dot','fab','nav'];
function sync(){
 ids.forEach(function(k){document.getElementById(k).value=S[k]});
 sw.forEach(function(k){document.getElementById(k).checked=S[k]});
}
function bind(){
 ids.forEach(function(k){var el=document.getElementById(k);el.oninput=function(){S[k]=el.value;render()}});
 sw.forEach(function(k){var el=document.getElementById(k);el.onchange=function(){S[k]=el.checked;render()}});
 document.getElementById('avatarFile').onchange=function(e){readFile(e.target.files[0],function(u){S.avatar=u;render()})};
 document.getElementById('bannerFile').onchange=function(e){readFile(e.target.files[0],function(u){S.banner=u;render()})};
 document.getElementById('bannerColor').addEventListener('input',function(){S.banner='';render()});
 document.getElementById('addTweet').onclick=function(){
  S.tweets.push({name:S.name,handle:S.handle,time:'방금',text:'',reply:'',rt:'',like:'',view:'',avatar:'',lock:S.lock});
  renderList();render();
 };
 document.getElementById('reset').onclick=function(){S=defaults();sync();renderList();render()};
 document.getElementById('save').onclick=function(){
  var b=this;b.textContent='저장 중...';
  html2canvas(document.getElementById('capture'),{scale:2,backgroundColor:'#ffffff',useCORS:true}).then(function(cv){
   var a=document.createElement('a');a.download='profile.png';a.href=cv.toDataURL('image/png');a.click();b.textContent='PNG로 저장';
  }).catch(function(){b.textContent='PNG로 저장';alert('저장에 실패했어요')});
 };
}
sync();bind();renderList();render();
})();
