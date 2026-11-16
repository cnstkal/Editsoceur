(function(){
function pic(bg,fg){return 'data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="'+bg+'"/><circle cx="50" cy="42" r="20" fill="'+fg+'"/><path d="M14 100Q18 68 50 66Q82 68 86 100Z" fill="'+fg+'"/></svg>')}
function T(n,h,t,x,r,rt,l,v,a,m){return{name:n,handle:h,time:t,text:x,reply:r,rt:rt,like:l,view:v,avatar:a,more:!!m}}
function defaults(){return{
 query:'고양이',tabs:'인기,최근,사용자,동영상,사진',sel:'1',fab:true,
 items:[
  T('집사일기','nyang_diary_01','4시','오늘 처음으로 고양이가 무릎 위에 올라와서 잤다\n\n움직이면 깰까봐 두 시간 동안 꼼짝 못함\n\n다리 저린데 행복해서 괜찮음','1','21','38','1197',pic('#c58f8f','#f3d9d9')),
  T('주말의 집사','sunday_butler_xyz123abc','55분','고양이 사료 바꿨더니 갑자기 밥그릇을 핥아먹기 시작함\n\n그동안 입맛에 안 맞았던 건가 싶어서 미안해지네요\n\n추천해주신 제품 리스트는 다음과 같습니다\n사료 A - 연어 맛\n사료 B - 닭고기 맛\n사료 C - 참치 맛\n\n는 기호성이 좋다고 하니 참고해보세요',  '1','','5','142',pic('#555','#999'),true),
  T('co','coiqv6r','22시','나 왜 고양이 영상만 보면 시간이 순삭되지','1','','3','74',pic('#e6d3e0','#fff')),
  T('냥냥','nyangnyang__','2024. 3. 1.','고양이 키우고 나서 퇴근이 기다려짐','','','12','230',pic('#8ab08a','#e7f2e7'))
 ]};}
var S=defaults();
var I={
 back:'<svg viewBox="0 0 24 24"><path d="M20 12H4M10 5l-7 7 7 7"/></svg>',
 sr:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
 flt:'<svg class="flt" viewBox="0 0 24 24"><path d="M12 3v5M12 12v9M5 3v9M5 16v5M19 3v9M19 16v5M9 8h6M2 12h6M16 12h6"/><path d="M9 8h6M2 16h6M16 16h6" style="display:none"/></svg>',
 x:'<svg class="xl" viewBox="0 0 24 24"><path d="M18.200 2.300h3.300l-7.200 8.300 8.500 11.200h-6.700l-5.200-6.800-6 6.800H1.600l7.700-8.800L1.200 2.300h6.800l4.700 6.200 5.500-6.200Zm-1.200 17.500h1.800L7.100 4.100H5.200L17 19.800Z"/></svg>',
 rep:'<svg viewBox="0 0 24 24"><path d="M12 4c-5 0-8.500 3-8.500 7 0 2.200 1.200 4.100 3 5.300L5.500 20l4.300-2.500c.7.100 1.500.2 2.200.2 5 0 8.500-3 8.500-7S17 4 12 4Z"/></svg>',
 rt:'<svg viewBox="0 0 24 24"><path d="M4 12V9a3 3 0 0 1 3-3h11M15 2.500L18.500 6 15 9.500M20 12v3a3 3 0 0 1-3 3H6M9 14.500L5.500 18 9 21.500"/></svg>',
 heart:'<svg viewBox="0 0 24 24"><path d="M12 20.500S3.500 15.500 3.500 9.200A4.700 4.700 0 0 1 12 6.500a4.700 4.700 0 0 1 8.500 2.700C20.500 15.500 12 20.500 12 20.500Z"/></svg>',
 view:'<svg viewBox="0 0 24 24"><path d="M5 20V10M10 20V4M15 20v-7M20 20v-4"/></svg>',
 bm:'<svg viewBox="0 0 24 24"><path d="M6 3.500h12v17l-6-4.500-6 4.500v-17Z"/></svg>',
 sh:'<svg viewBox="0 0 24 24"><path d="M12 15V3M7.500 7.500L12 3l4.500 4.500M5 13v6.500h14V13"/></svg>',
 plus:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
 home:'<svg viewBox="0 0 24 24"><path d="M12 3L3.500 10v10.500h6v-6h5v6h6V10L12 3Z"/></svg>',
 search:'<svg viewBox="0 0 24 24" style="stroke-width:2.4"><circle cx="11" cy="11" r="7.500"/><path d="M21 21l-4.500-4.500"/></svg>',
 eye:'<svg viewBox="0 0 24 24"><path d="M20 4C12 4 5 9 5 16c0 1.500.4 2.800 1 4 3.500-.5 5.500-1.500 7-3.500M3 21c4-4 8-8 13-11"/><path d="M4 21L21 3"/></svg>',
 bell:'<svg viewBox="0 0 24 24"><path d="M6 17V11a6 6 0 0 1 12 0v6l1.500 2h-15L6 17ZM10 21.500h4"/></svg>',
 msg:'<svg viewBox="0 0 24 24" style="stroke-width:2.4"><path d="M12 3.500c-5 0-9 3.200-9 7.300 0 2.300 1.300 4.300 3.300 5.600L5.500 21l4.700-2.800c.6.100 1.200.2 1.800.2 5 0 9-3.200 9-7.300S17 3.500 12 3.500Z"/></svg>'
};
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function bold(text){
 var out=esc(text),q=S.query.trim();
 if(!q)return out;
 var re=new RegExp(esc(q).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi');
 return out.replace(re,function(m){return '<b>'+m+'</b>'});
}
function render(){
 var h='<div class="top"><div class="back">'+I.back+'</div><div class="sb">'+I.sr+'<span>'+esc(S.query)+'</span></div>'+I.flt+'</div><div class="tabs">';
 var n=parseInt(S.sel,10)||1;
 S.tabs.split(',').forEach(function(t,i){t=t.trim();if(t)h+='<span'+(i+1===n?' class="on"':'')+'>'+esc(t)+'</span>'});
 h+='</div><div class="items">';
 S.items.forEach(function(t){
  var body=bold(t.text)+(t.more?'… <span class="more">더 보기</span>':'');
  h+='<div class="post"><div class="av"><img src="'+esc(t.avatar)+'"></div><div class="pb"><div class="ph"><b>'+esc(t.name)+'</b><span class="m">@'+esc(String(t.handle).replace(/^@/,''))+'</span><span class="tm">· '+esc(t.time)+'</span></div><div class="pt">'+body+'</div>';
  h+='<div class="ac"><span>'+I.rep+esc(t.reply)+'</span><span>'+I.rt+esc(t.rt)+'</span><span>'+I.heart+esc(t.like)+'</span><span>'+I.view+esc(t.view)+'</span><span class="s">'+I.bm+'</span><span class="s">'+I.sh+'</span></div></div>'+I.x+'</div>';
 });
 h+='</div>';
 h+='<div class="fabbtn">'+I.plus+'</div>';

 document.getElementById('capture').innerHTML=h;
}
function readFile(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
var ids=['query','tabs','sel'],sw=[];
function sync(){ids.forEach(function(k){document.getElementById(k).value=S[k]});sw.forEach(function(k){document.getElementById(k).checked=S[k]})}
function renderList(){
 var box=document.getElementById('list');box.innerHTML='';
 S.items.forEach(function(t,i){
  var c=document.createElement('div');c.className='card';
  c.innerHTML='<div class="grid3"><label>이름<input type="text" data-k="name"></label><label>아이디<input type="text" data-k="handle"></label><label>시간<input type="text" data-k="time"></label></div>'+
  '<label>내용 (줄바꿈 가능)<textarea data-k="text"></textarea></label>'+
  '<div class="grid4"><label>멘션<input type="text" data-k="reply"></label><label>리트윗<input type="text" data-k="rt"></label><label>마음<input type="text" data-k="like"></label><label>조회수<input type="text" data-k="view"></label></div>'+
  '<label>프로필 사진<input type="file" accept="image/*" data-f="1"></label>'+
  '<div class="switches" style="margin-bottom:12px"><label class="sw"><input type="checkbox" data-k="more"><span class="knob"></span>"더 보기" 표시</label></div>'+
  '<div class="row3"><button type="button" data-a="up">↑</button><button type="button" data-a="down">↓</button><button type="button" data-a="del">× 삭제</button></div>';
  c.querySelectorAll('[data-k]').forEach(function(el){
   var k=el.dataset.k;
   if(el.type==='checkbox'){el.checked=!!t[k];el.onchange=function(){t[k]=el.checked;render()}}
   else{el.value=t[k];el.oninput=function(){t[k]=el.value;render()}}
  });
  c.querySelector('[data-f]').onchange=function(e){readFile(e.target.files[0],function(u){t.avatar=u;render()})};
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
ids.forEach(function(k){var el=document.getElementById(k);el.oninput=function(){S[k]=el.value;render()}});
sw.forEach(function(k){var el=document.getElementById(k);el.onchange=function(){S[k]=el.checked;render()}});
document.getElementById('add').onclick=function(){S.items.push(T('사용자','username','방금','','','','','',pic('#9aa7b5','#e6ebf0')));renderList();render()};
document.getElementById('reset').onclick=function(){S=defaults();sync();renderList();render()};
document.getElementById('save').onclick=function(){
 var b=this;b.textContent='저장 중...';
 html2canvas(document.getElementById('capture'),{scale:2,backgroundColor:'#ffffff',useCORS:true}).then(function(cv){
  var a=document.createElement('a');a.download='search.png';a.href=cv.toDataURL('image/png');a.click();b.textContent='PNG로 저장';
 }).catch(function(){b.textContent='PNG로 저장';alert('저장에 실패했어요')});
};
sync();renderList();render();
})();
