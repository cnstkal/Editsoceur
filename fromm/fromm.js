(function(){
var $=function(i){return document.getElementById(i)};
var D={name:'민지',title:'민지',hint:'메시지 입력',avatar:'',chat:false,inputBar:true,
items:[
 {me:false,type:'date',text:'2026년 11월 15일'},
 {me:false,type:'text',text:'오늘 시간 괜찮아?',time:'오전 10:51'},
 {me:true,type:'text',text:'응 점심 이후에 가능해!',time:'오전 10:52'},
 {me:false,type:'photo',text:'',time:'오전 10:53',img:''},
 {me:true,type:'text',text:'사진 예쁘다 ㅎㅎ',time:'오전 10:53'},
 {me:false,type:'text',text:'그럼 2시에 보자 🙌',time:'오전 10:54'}
]};
var S;
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var TYPES={text:'텍스트',photo:'사진',date:'날짜'};
function render(){
 var fm=$('fm');fm.classList.toggle('chat-only',!!S.chat);
 $('vTitle').textContent=$('iTitle').value;$('vHint').textContent=$('iHint').value;$('fm').querySelector('.ib').hidden=!S.inputBar;
 var h='';
 S.items.forEach(function(it){
  if(it.type==='date'){h+='<div class="dt"><span>'+esc(it.text)+'</span></div>';return}
  var tm=it.time?'<span class="tm">'+esc(it.time)+'</span>':'';
  var body=it.type==='photo'?'<div class="pic"'+(it.img?' style="background-image:url('+it.img+')"':'')+'></div>':'<div class="bb">'+esc(it.text)+'</div>';
  if(it.me)h+='<div class="m me"><div class="row">'+body+tm+'</div></div>';
  else h+='<div class="m"><div class="av"'+(S.avatar?' style="background-image:url('+S.avatar+')"':'')+'></div><div class="bd"><div class="nm">'+esc(S.name)+'</div><div class="row">'+body+tm+'</div></div></div>';
 });
 $('msgs').innerHTML=h;
}
function edRows(){
 $('ed').innerHTML=S.items.map(function(it,i){
  var opts=Object.keys(TYPES).map(function(k){return '<option value="'+k+'"'+(it.type===k?' selected':'')+'>'+TYPES[k]+'</option>'}).join('');
  return '<div class="ed-row" data-i="'+i+'">'+
   '<select data-k="me"><option value="0"'+(!it.me?' selected':'')+'>상대</option><option value="1"'+(it.me?' selected':'')+'>나</option></select>'+
   '<select data-k="type">'+opts+'</select>'+
   (it.type==='date'?'<input class="t" data-k="text" value="'+esc(it.text)+'" placeholder="날짜">':it.type==='photo'?'<div class="photo-preview"><label class="fl">사진 첨부<input type="file" accept="image/*" data-f="img"></label>'+(it.img?'<img class="photo-thumb" src="'+it.img+'" alt="첨부 미리보기">':'<span class="hint">선택한 사진 없음</span>')+'</div>':'<input class="t" data-k="text" value="'+esc(it.text)+'" placeholder="메시지">')+
   (it.type!=='date'?'<input class="tt" data-k="time" value="'+esc(it.time||'')+'" placeholder="시간">':'')+
   '<button type="button" data-d="'+i+'">✕</button></div>';
 }).join('');
}
function init(){
 S=JSON.parse(JSON.stringify(D));
 $('iName').value=S.name;$('iHint').value=S.hint;$('iTitle').value=S.title;$('iAvatar').value='';$('tChat').checked=false;$('tInput').checked=S.inputBar;
 edRows();render();
}
$('iName').addEventListener('input',function(){S.name=this.value;render()});
$('iHint').addEventListener('input',render);
$('iTitle').addEventListener('input',render);
$('tChat').addEventListener('change',function(){S.chat=this.checked;render()});
$('tInput').addEventListener('change',function(){S.inputBar=this.checked;render()});
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(e){cb(e.target.result)};r.readAsDataURL(f)}
$('iAvatar').addEventListener('change',function(){rd(this.files[0],function(d){S.avatar=d;render()})});
$('clearAv').onclick=function(){S.avatar='';$('iAvatar').value='';render()};
$('add').onclick=function(){S.items.push({me:false,type:'text',text:'',time:''});edRows();render()};
$('ed').addEventListener('input',function(ev){var t=ev.target,r=t.closest('.ed-row');if(!r||!t.dataset.k)return;var it=S.items[r.dataset.i];it[t.dataset.k]=t.value;render()});
$('ed').addEventListener('change',function(ev){var t=ev.target,r=t.closest('.ed-row');if(!r)return;var it=S.items[r.dataset.i];
 if(t.dataset.k==='me'){it.me=t.value==='1';render()}
 else if(t.dataset.k==='type'){var old=it.type;it.type=t.value;if(it.type==='date'&&old!=='date'){it.text=it.text||'2026년 11월 15일'}edRows();render()}
 else if(t.dataset.f==='img'){rd(t.files[0],function(d){it.img=d;edRows();render()})}});
$('ed').addEventListener('click',function(ev){var d=ev.target.dataset.d;if(d!=null){S.items.splice(+d,1);edRows();render()}});
$('reset').onclick=init;
$('savePng').onclick=function(){if(!window.html2canvas)return;var chat=S.chat;html2canvas($('fm'),{scale:3,useCORS:true,backgroundColor:chat?null:'#fff'}).then(function(c){var a=document.createElement('a');a.download='fromm.png';a.href=c.toDataURL('image/png');a.click()})};
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드'};
var ed0=document.querySelector('.editor'),groups=[].slice.call(ed0.querySelectorAll(':scope > .ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
groups.forEach(function(g,i){var b=document.createElement('button');b.type='button';b.textContent=g.getAttribute('data-t');if(!i)b.className='on';b.onclick=function(){groups.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
ed0.parentNode.insertBefore(bar,ed0);
init();
})();
