(function(){
function pic(bg,fg){return 'data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="'+bg+'"/><circle cx="50" cy="42" r="20" fill="'+fg+'"/><path d="M14 100Q18 68 50 66Q82 68 86 100Z" fill="'+fg+'"/></svg>')}
var P1=pic('#6b7a99','#e8c3a0'),P2=pic('#b58fa0','#f3d9d9'),P3=pic('#7fa68a','#e7f2e7'),ME=pic('#9a8f7a','#d9cdb5');
var PAL=[['#6b7a99','#e8c3a0'],['#b58fa0','#f3d9d9'],['#7fa68a','#e7f2e7'],['#c9a85a','#fff3c4'],['#5a6fa8','#d9e2ff'],['#a86a5a','#ffe0d6'],['#7a7a7a','#e5e5e5'],['#8a5aa8','#efdcff']];
function avs(n){var o=[];for(var i=0;i<n;i++){var p=PAL[i%PAL.length];o.push(pic(p[0],p[1]))}return o}
function thumb(c1,c2){return 'data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+c1+'"/><stop offset="1" stop-color="'+c2+'"/></linearGradient></defs><rect width="100" height="100" fill="url(#g)"/><circle cx="50" cy="40" r="16" fill="rgba(255,255,255,.55)"/><path d="M18 100Q22 66 50 64Q78 66 82 100Z" fill="rgba(255,255,255,.55)"/></svg>')}
function R(kind,name,n,obj,time,pv,hasTh,th){return{t:'react',kind:kind,name:name,n:String(n),obj:obj,time:time,pv:pv,hasTh:hasTh,th:th,avatars:avs(n)}}
function Mn(n,h,time,to,text,r,rt,l,v,lock,av){return{t:'mention',name:n,handle:h,time:time,to:to,text:text,reply:r,rt:rt,like:l,view:v,lock:!!lock,avatar:av}}
function defaults(){return{
 avatar:ME,title:'알림',tab1:'모두',tab2:'멘션',sel:'1',fab:true,
 items:[
  R('like','예시 친구1',1,'재게시물','48분','예시 알림 텍스트입니다',true,thumb('#3a5a8a','#1f2f4d')),
  R('rt','예시 친구2',1,'재게시물','1시',"",true,thumb('#8a9a6a','#4d5a3a')),
  R('like','예시 친구2',3,'재게시물','1시','',true,thumb('#8a9a6a','#4d5a3a')),
  R('like','예시 친구3',6,'게시물','2시','예시 알림 텍스트입니다',true,thumb('#5a4a3a','#2a2018')),
  R('like','예시 친구3',5,'게시물','2시','예시 알림 텍스트입니다',true,thumb('#444','#111')),
  Mn('예시 친구1','example_2','18분','example_1','예시 알림 텍스트입니다','1','','','10',true,P1)
 ]};}
var S=defaults();
var I={
 gear:'<svg class="gear" viewBox="0 0 24 24"><path d="M12 8.500a3.500 3.500 0 1 0 0 7 3.500 3.500 0 0 0 0-7Z"/><path d="M10.500 2.500h3l.6 2.400 2 .9 2.200-1.200 2.100 2.100-1.200 2.200.9 2 2.400.6v3l-2.400.6-.9 2 1.200 2.200-2.100 2.100-2.200-1.200-2 .9-.6 2.400h-3l-.6-2.400-2-.9-2.200 1.200-2.100-2.100 1.200-2.200-.9-2-2.400-.6v-3l2.400-.6.9-2L4.300 6.300l2.100-2.100 2.200 1.200 2-.9.600-2.400Z"/></svg>',
 bellS:'<svg viewBox="0 0 24 24"><path d="M6 17V11a6 6 0 0 1 12 0v6l1.500 2h-15L6 17ZM10 21.500h4"/></svg>',
 rtG:'<svg class="r" viewBox="0 0 24 24"><path d="M4 12V9a3 3 0 0 1 3-3h11M15 2.500L18.500 6 15 9.500M20 12v3a3 3 0 0 1-3 3H6M9 14.500L5.500 18 9 21.500"/></svg>',
 heart:'<svg class="h" viewBox="0 0 24 24"><path d="M12 21.500S2.500 15.800 2.500 8.800A5.300 5.300 0 0 1 12 5.800a5.300 5.300 0 0 1 9.500 3C21.500 15.800 12 21.500 12 21.500Z"/></svg>',
 lock:'<svg class="lkc" viewBox="0 0 24 24"><path d="M7 10V7a5 5 0 0 1 10 0v3h1.500A1.500 1.500 0 0 1 20 11.500v8a1.500 1.500 0 0 1-1.500 1.500h-13A1.500 1.500 0 0 1 4 19.500v-8A1.500 1.500 0 0 1 5.500 10H7Zm2 0h6V7a3 3 0 0 0-6 0v3Z"/></svg>',
 rep:'<svg viewBox="0 0 24 24"><path d="M12 4c-5 0-8.500 3-8.500 7 0 2.200 1.200 4.100 3 5.300L5.500 20l4.300-2.500c.7.100 1.500.2 2.200.2 5 0 8.500-3 8.500-7S17 4 12 4Z"/></svg>',
 rt:'<svg viewBox="0 0 24 24"><path d="M4 12V9a3 3 0 0 1 3-3h11M15 2.500L18.500 6 15 9.500M20 12v3a3 3 0 0 1-3 3H6M9 14.500L5.500 18 9 21.500"/></svg>',
 hr:'<svg viewBox="0 0 24 24"><path d="M12 20.500S3.500 15.500 3.500 9.200A4.700 4.700 0 0 1 12 6.500a4.700 4.700 0 0 1 8.500 2.700C20.500 15.500 12 20.500 12 20.500Z"/></svg>',
 view:'<svg viewBox="0 0 24 24"><path d="M5 20V10M10 20V4M15 20v-7M20 20v-4"/></svg>',
 bm:'<svg viewBox="0 0 24 24"><path d="M6 3.500h12v17l-6-4.500-6 4.500v-17Z"/></svg>',
 sh:'<svg viewBox="0 0 24 24"><path d="M12 15V3M7.500 7.500L12 3l4.500 4.500M5 13v6.500h14V13"/></svg>',
 plus:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
 home:'<svg viewBox="0 0 24 24"><path d="M12 3L3.500 10v10.500h6v-6h5v6h6V10L12 3Z"/></svg>',
 search:'<svg viewBox="0 0 24 24" style="stroke-width:2.4"><circle cx="11" cy="11" r="7.500"/><path d="M21 21l-4.500-4.500"/></svg>',
 eye:'<svg viewBox="0 0 24 24"><path d="M20 4C12 4 5 9 5 16c0 1.500.4 2.800 1 4 3.500-.5 5.500-1.500 7-3.500M3 21c4-4 8-8 13-11"/><path d="M4 21L21 3"/></svg>',
 bell:'<svg class="fill" viewBox="0 0 24 24"><path d="M6 17V11a6 6 0 0 1 12 0v6l1.500 2h-15L6 17ZM10 21.500h4"/></svg>',
 msg:'<svg viewBox="0 0 24 24" style="stroke-width:2.4"><path d="M12 3.500c-5 0-9 3.200-9 7.300 0 2.300 1.300 4.300 3.300 5.600L5.500 21l4.700-2.800c.6.100 1.200.2 1.800.2 5 0 9-3.200 9-7.300S17 3.500 12 3.500Z"/></svg>'
};
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function render(){
 var s=S.sel==='2'?2:1;
 var h='<div class="top"><div class="av"><img src="'+esc(S.avatar)+'"></div><b>알림</b>'+I.gear+'</div>';
 h+='<div class="tabs"><div><span'+(s===1?' class="on"':'')+'>'+I.bellS+'모두'+'</span></div><div><span'+(s===2?' class="on"':'')+'>'+'멘션'+'</span></div></div><div class="items">';
 S.items.forEach(function(it){
  if(it.t==='react'){
   var cnt=Math.max(1,it.avatars.length),more=cnt>1?' 외 '+(cnt-1)+'명이':'이';
   var act=it.kind==='rt'?'재게시했습니다':'마음에 들어 합니다';
   var ic=it.kind==='rt'?I.rtG:I.heart;
   var ah='';it.avatars.slice(0,8).forEach(function(u){ah+='<div class="av"><img src="'+esc(u)+'"></div>'});
   h+='<div class="lk"><div class="hrt">'+ic+'</div><div class="rt"><div class="avs">'+ah+'</div><div class="tx"><b>'+esc(it.name)+'</b> 님'+(cnt>1?' 외 '+(cnt-1)+'명이':'이')+' 내 '+esc(it.obj)+'을 '+act+' <span class="t">· '+esc(it.time)+'</span></div>'+(it.pv?'<div class="pv">'+esc(it.pv)+'</div>':'')+'</div>'+(it.hasTh?'<div class="th"><img src="'+esc(it.th)+'"></div>':'')+'</div>';
  }else{
   h+='<div class="mn"><div class="av"><img src="'+esc(it.avatar)+'"></div><div class="pb"><div class="ph"><b>'+esc(it.name)+'</b>'+(it.lock?I.lock:'')+'<span class="m">@'+esc(String(it.handle).replace(/^@/,''))+'</span><span class="tm">· '+esc(it.time)+'</span></div>'+(it.to?'<div class="to"><span>@'+esc(String(it.to).replace(/^@/,''))+'</span> 님에게 보내는 답글</div>':'')+'<div class="tt">'+esc(it.text)+'</div>';
   h+='<div class="ac"><span>'+I.rep+esc(it.reply)+'</span><span class="fade">'+I.rt+esc(it.rt)+'</span><span>'+I.hr+esc(it.like)+'</span><span>'+I.view+esc(it.view)+'</span><span class="s">'+I.bm+'</span><span class="s">'+I.sh+'</span></div></div><div class="dots"><i></i><i></i><i></i></div></div>';
  }
 });
 h+='</div>';
 h+='<div class="fabbtn">'+I.plus+'</div>';

 document.getElementById('capture').innerHTML=h;
}
function readFile(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
var ids=['sel'],sw=[];
function sync(){ids.forEach(function(k){document.getElementById(k).value=S[k]});sw.forEach(function(k){document.getElementById(k).checked=S[k]})}
var FL={react:[['name','이름'],['time','시간'],['pv','미리보기 글 (비우면 숨김)'],['obj','대상 (게시물/재게시물)']],
 mention:[['name','이름'],['handle','아이디'],['time','시간'],['to','답글 대상(비우면 숨김)'],['text','내용'],['reply','멘션'],['rt','리트윗'],['like','마음'],['view','조회수']]};
function tagName(it){return it.t==='mention'?'멘션 알림':(it.kind==='rt'?'재게시 알림':'좋아요 알림')}
function tagCls(it){return it.t==='mention'?'mention':(it.kind==='rt'?'rt':'like')}
function renderList(){
 var box=document.getElementById('list');box.innerHTML='';
 S.items.forEach(function(it,i){
  var c=document.createElement('div');c.className='card';
  var h='<span class="tag '+tagCls(it)+'">'+tagName(it)+'</span><div class="grid2">';
  FL[it.t].forEach(function(f){h+='<label>'+f[1]+'<input type="text" data-k="'+f[0]+'"></label>'});
  h+='</div>';
  if(it.t==='react'){
   h+='<div class="grid2"><label>누른 사람 수 (사진 개수)<input type="number" min="1" max="8" data-cnt="1"></label><label>사진 올리기 (여러 장 가능)<input type="file" accept="image/*" multiple data-fm="1"></label></div>';
   h+='<label>오른쪽 썸네일 사진<input type="file" accept="image/*" data-ft="1"></label><div class="switches" style="margin-bottom:12px"><label class="sw"><input type="checkbox" data-k="hasTh"><span class="knob"></span>썸네일 표시</label></div>';
  }else{
   h+='<label>프로필 사진<input type="file" accept="image/*" data-f="1"></label><div class="switches" style="margin-bottom:12px"><label class="sw"><input type="checkbox" data-k="lock"><span class="knob"></span>자물쇠</label></div>';
  }
  h+='<div class="row3"><button type="button" data-a="up">↑</button><button type="button" data-a="down">↓</button><button type="button" data-a="del">× 삭제</button></div>';
  c.innerHTML=h;
  c.querySelectorAll('[data-k]').forEach(function(el){
   var k=el.dataset.k;
   if(el.type==='checkbox'){el.checked=!!it[k];el.onchange=function(){it[k]=el.checked;render()}}
   else{el.value=it[k]==null?'':it[k];el.oninput=function(){it[k]=el.value;render()}}
  });
  var f=c.querySelector('[data-f]');if(f)f.onchange=function(e){readFile(e.target.files[0],function(u){it.avatar=u;render()})};
  var cn=c.querySelector('[data-cnt]');
  if(cn){cn.value=it.avatars.length;cn.oninput=function(){
   var n=Math.max(1,Math.min(8,parseInt(cn.value,10)||1));
   var base=avs(8);while(it.avatars.length<n)it.avatars.push(base[it.avatars.length]);
   it.avatars.length=n;render();
  }}
  var fm=c.querySelector('[data-fm]');
  if(fm)fm.onchange=function(e){
   Array.prototype.slice.call(e.target.files,0,8).forEach(function(file,idx){readFile(file,function(u){
    if(idx<it.avatars.length)it.avatars[idx]=u;else it.avatars.push(u);render();
    cn.value=it.avatars.length;
   })});
  };
  var ft=c.querySelector('[data-ft]');if(ft)ft.onchange=function(e){readFile(e.target.files[0],function(u){it.th=u;it.hasTh=true;render()})};
  c.querySelectorAll('[data-a]').forEach(function(b){b.onclick=function(){
   var a=b.dataset.a;
   if(a==='up'&&i>0){var x=S.items.splice(i,1)[0];S.items.splice(i-1,0,x)}
   if(a==='down'&&i<S.items.length-1){var y=S.items.splice(i,1)[0];S.items.splice(i+1,0,y)}
   if(a==='del')S.items.splice(i,1);
   renderList();render();
  }});
  box.appendChild(c);
 });
}
ids.forEach(function(k){var el=document.getElementById(k);el.oninput=function(){S[k]=el.value;render()};el.onchange=el.oninput});
sw.forEach(function(k){var el=document.getElementById(k);el.onchange=function(){S[k]=el.checked;render()}});
document.getElementById('avatarFile').onchange=function(e){readFile(e.target.files[0],function(u){S.avatar=u;render()})};
document.getElementById('addLike').onclick=function(){S.items.push(R('like','사용자',1,'게시물','방금','',true,thumb('#777','#333')));renderList();render()};
document.getElementById('addRt').onclick=function(){S.items.push(R('rt','사용자',1,'게시물','방금','',true,thumb('#777','#333')));renderList();render()};
document.getElementById('addMention').onclick=function(){S.items.push(Mn('사용자','username','방금','','','','','','',false,P3));renderList();render()};
document.getElementById('reset').onclick=function(){S=defaults();sync();renderList();render()};
document.getElementById('save').onclick=function(){
 var b=this;b.textContent='저장 중...';
 html2canvas(document.getElementById('capture'),{scale:5,backgroundColor:'#ffffff',useCORS:true}).then(function(cv){
  var a=document.createElement('a');a.download='notify.png';a.href=cv.toDataURL('image/png');a.click();b.textContent='PNG로 저장';
 }).catch(function(){b.textContent='PNG로 저장';alert('저장에 실패했어요')});
};
sync();renderList();render();
})();
