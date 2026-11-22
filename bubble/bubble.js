(function(){
var $=function(i){return document.getElementById(i)};
var D={name:'시온이',title:'정인이💕',banner:'우리 다시 만날 수 있겠지?',dday:false,ddayNum:'1000',bnOn:true,fab:false,art:true,round:true,chatOnly:false,bg:'#ededed',me:'#a186ee',ring:'#6c8cf0',avatar:'',
items:[
 {me:false,type:'date',text:'2026년 11월 16일 월요일'},
 {me:false,type:'text',text:'안녕하세요! 오늘 와주셔서 고마워요 :)',time:'오후 07:01'},
 {me:true,type:'text',text:'몇시부터 몇시였더라',time:'오후 02:44'},
 {me:false,type:'photo',text:'',time:'오후 09:29',img:''},
 {me:true,type:'emoji',text:'🍀',time:'오후 02:44'},
 {me:true,type:'text',text:'8시부터야!',time:'오후 02:44'},
 {me:false,type:'text',text:'오케이 ㅎㅎㅎ',time:'오후 02:49'}
]};
var S;
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var TYPES={text:'텍스트',photo:'사진',emoji:'이모지',date:'날짜'};
function render(){
 var bu=$('bu');
 bu.style.setProperty('--bg',S.bg);bu.style.setProperty('--me',S.me);bu.style.setProperty('--ring',S.ring);
 bu.classList.toggle('dday',!!S.dday);bu.classList.toggle('noring',!S.art?true:!S.round);bu.classList.toggle('noround',!S.round);
 bu.classList.toggle('chat-only',!!S.chatOnly);bu.classList.toggle('nb',!S.bnOn);
 $('vTitle').textContent=S.title;
 $('vBanner').textContent=S.dday?'D-'+S.ddayNum:S.banner;
 $('bn').classList.toggle('off',!S.bnOn);
 $('fab').classList.toggle('on',!!S.fab);
 var h='';
 S.items.forEach(function(it){
  if(it.type==='date'){h+='<div class="dt"><span>'+esc(it.text)+'</span></div>';return}
  var tm=it.time?'<span class="tm">'+esc(it.time)+'</span>':'';
  var b=it.type==='photo'?'<div class="bb ph"'+(it.img?' style="background-image:url('+it.img+')"':'')+'></div>':
        it.type==='emoji'?'<div class="bb em">'+esc(it.text)+'</div>':'<div class="bb">'+esc(it.text)+'</div>';
  if(it.me)h+='<div class="m me"><div class="row">'+b+tm+'</div></div>';
  else h+='<div class="m'+(S.art?' art':'')+'"><div class="av"'+(S.avatar?' style="background-image:url('+S.avatar+')"':'')+'></div><div class="bd"><div class="nm"><span class="bg">ARTIST</span>'+esc(S.name)+'</div><div class="row">'+b+tm+'</div></div></div>';
 });
 $('msgs').innerHTML=h;
}
function edRows(){
 $('list').innerHTML=S.items.map(function(it,i){
  var opts=Object.keys(TYPES).map(function(k){return '<option value="'+k+'"'+(it.type===k?' selected':'')+'>'+TYPES[k]+'</option>'}).join('');
  var mid=it.type==='date'?'<input class="t" data-k="text" value="'+esc(it.text)+'" placeholder="날짜">':
    it.type==='photo'?'<label class="fl">사진<input type="file" accept="image/*" data-f="img"></label>':
    '<input class="t" data-k="text" value="'+esc(it.text)+'" placeholder="메시지">';
  return '<div class="ed-row" data-i="'+i+'">'+
   '<select data-k="me"><option value="0"'+(!it.me?' selected':'')+'>상대</option><option value="1"'+(it.me?' selected':'')+'>나</option></select>'+
   '<select data-k="type">'+opts+'</select>'+mid+
   (it.type!=='date'?'<input class="tt" data-k="time" value="'+esc(it.time||'')+'" placeholder="시간">':'')+
   '<button type="button" data-d="'+i+'">✕</button></div>';
 }).join('');
}
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(e){cb(e.target.result)};r.readAsDataURL(f)}
function init(){
 S=JSON.parse(JSON.stringify(D));
 $('iName').value=S.name;$('iTitle').value=S.title;$('iBanner').value=S.banner;$('iDday').checked=false;$('iDdayNum').value=S.ddayNum;
 $('iBnOn').checked=true;$('iFab').checked=false;$('iChatOnly').checked=false;$('iArt').checked=true;$('iRound').checked=true;
 $('iBg').value=S.bg;$('iMe').value=S.me;$('iRing').value=S.ring;$('iAvatar').value='';
 edRows();render();
}
[['iName','name'],['iTitle','title'],['iBanner','banner'],['iDdayNum','ddayNum']].forEach(function(p){$(p[0]).addEventListener('input',function(){S[p[1]]=this.value;render()})});
[['iDday','dday'],['iBnOn','bnOn'],['iFab','fab'],['iChatOnly','chatOnly'],['iArt','art'],['iRound','round']].forEach(function(p){$(p[0]).addEventListener('change',function(){S[p[1]]=this.checked;render()})});
[['iBg','bg'],['iMe','me'],['iRing','ring']].forEach(function(p){$(p[0]).addEventListener('input',function(){S[p[1]]=this.value;render()})});
$('iAvatar').addEventListener('change',function(){rd(this.files[0],function(d){S.avatar=d;render()})});
$('clearImg').onclick=function(){S.avatar='';$('iAvatar').value='';render()};
$('addM').onclick=function(){S.items.push({me:false,type:'text',text:'새 메시지',time:''});edRows();render()};
$('list').addEventListener('input',function(ev){var t=ev.target,r=t.closest('.ed-row');if(!r||!t.dataset.k)return;S.items[r.dataset.i][t.dataset.k]=t.value;render()});
$('list').addEventListener('change',function(ev){var t=ev.target,r=t.closest('.ed-row');if(!r)return;var it=S.items[r.dataset.i];
 if(t.dataset.k==='me'){it.me=t.value==='1';render()}
 else if(t.dataset.k==='type'){it.type=t.value;if(it.type==='date'&&!it.text)it.text='2026년 11월 16일';edRows();render()}
 else if(t.dataset.f==='img'){rd(t.files[0],function(d){it.img=d;render()})}});
$('list').addEventListener('click',function(ev){var d=ev.target.dataset.d;if(d!=null){S.items.splice(+d,1);edRows();render()}});
$('reset').onclick=init;
$('savePng').onclick=function(){if(!window.html2canvas)return;html2canvas($('bu'),{scale:3,useCORS:true,backgroundColor:S.chatOnly?null:S.bg}).then(function(c){var a=document.createElement('a');a.download='bubble.png';a.href=c.toDataURL('image/png');a.click()})};
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드'};
var ed=document.querySelector('.editor'),groups=[].slice.call(ed.querySelectorAll(':scope > .ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
groups.forEach(function(g,i){var b=document.createElement('button');b.type='button';b.textContent=g.getAttribute('data-t');if(!i)b.className='on';b.onclick=function(){groups.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
ed.parentNode.insertBefore(bar,ed);
init();
})();
