(function(){
var $=function(id){return document.getElementById(id)};
var avatar='',photo='';
var initial=[
{name:'wasianboiiiii😛😛',start:true,text:'그게 전부예요 ㅋㅋ',translation:'それだけです笑',time:''},
{name:'',start:false,text:'가끔 그림을 그리기도 하는데',translation:'たまに絵描いたりするんだけど',time:''},
{name:'',start:false,text:'보여주고 싶어서',translation:'見せたくて',time:'22:01'},
{name:'명재현',start:true,text:'나 공연 끝나자마자',translation:'',time:''},
{name:'',start:false,text:'허겁지겁 밥두공기에 김치찌개에 불닭하나 먹고왔어',translation:'',time:'16:57'},
{name:'명재현',start:true,text:'메이크업도 안지우고',translation:'',time:''},
{name:'',start:false,text:'왕창먹었다',translation:'',time:''},
{name:'',start:false,text:'배불렁 움직이지도 못하게써',translation:'',time:'16:58'}
];
var messages=initial.map(function(m){return Object.assign({},m)});
function esc(s){return String(s||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function renderEditor(){
 var root=$('messageList');
 root.innerHTML=messages.map(function(m,i){
  return '<div class="dm-edit-item" data-index="'+i+'">'+
   '<div class="dm-edit-head"><strong>메시지 '+(i+1)+'</strong><button type="button" class="dm-delete" data-delete="'+i+'">삭제</button></div>'+
   '<label class="dm-sender">보낸 사람 이름'+(m.start?' (새 대화 그룹)':'')+'<input data-field="name" value="'+esc(m.name)+'" placeholder="같은 대화 이어쓰기면 비워두기"></label>'+
   '<label>메시지 내용<textarea data-field="text" rows="2" placeholder="메시지를 입력하세요">'+esc(m.text)+'</textarea></label>'+
   '<label>번역 (선택)<textarea data-field="translation" rows="2" placeholder="번역문을 입력하세요">'+esc(m.translation)+'</textarea></label>'+
   '<label>시간 (선택)<input data-field="time" value="'+esc(m.time)+'" placeholder="예: 22:01"></label>'+
   '</div>';
 }).join('');
}
function renderPreview(){
 var html='',lastGroup=false,showTr=$('iTr').checked,color=$('iColor').value;
 messages.forEach(function(m,i){
  if(m.start||!lastGroup){
   if(m.start||!lastGroup) html+='<div class="g"><div class="av"'+(avatar?' style="background-image:url(&quot;'+avatar+'&quot;)"':'')+'></div><div class="gb">'+(m.name?'<div class="nm">'+esc(m.name)+'</div>':'');
   lastGroup=true;
  }
  var tr=showTr&&m.translation;
  html+='<div class="r"><div class="b'+(tr?' t':'')+'" style="--c:'+color+';--bd:'+color+'">'+esc(m.text)+(tr?'<div class="tr">'+esc(m.translation)+'</div>':'')+'</div>'+(m.time?'<span class="tm">'+esc(m.time)+'</span>':'')+'</div>';
  var next=messages[i+1];
  if(!next||next.start) html+='</div></div>';
 });
 $('ch').innerHTML=html;
 $('wd').classList.toggle('chat-only',!!$('iChatOnly').checked);
 $('ch').classList.toggle('chat-only-inner',!!$('iChatOnly').checked);
}
function render(){renderEditor();renderPreview()}
$('messageList').addEventListener('input',function(e){
 var card=e.target.closest('.dm-edit-item');if(!card)return;
 var m=messages[Number(card.dataset.index)];if(!m)return;
 var field=e.target.dataset.field;if(field)m[field]=e.target.value;
 renderPreview();
});
$('messageList').addEventListener('click',function(e){
 var i=e.target.dataset.delete;if(i===undefined)return;
 messages.splice(Number(i),1);render();
});
$('addMessage').onclick=function(){messages.push({name:'',start:false,text:'',translation:'',time:''});render();var items=$('messageList').querySelectorAll('.dm-edit-item');items[items.length-1].scrollIntoView({behavior:'smooth',block:'center'});items[items.length-1].querySelector('[data-field="text"]').focus()};
$('addGroup').onclick=function(){messages.push({name:'새 이름',start:true,text:'',translation:'',time:''});render();var items=$('messageList').querySelectorAll('.dm-edit-item');items[items.length-1].scrollIntoView({behavior:'smooth',block:'center'})};
$('iColor').addEventListener('input',renderPreview);
$('iTr').addEventListener('change',renderPreview);
$('iChatOnly').addEventListener('change',renderPreview);
$('iAvatar').addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(e){avatar=e.target.result;renderPreview()};r.readAsDataURL(f)});
$('clearImg').onclick=function(){avatar='';photo='';$('iAvatar').value='';$('iPhoto').value='';renderPreview()};
$('reset').onclick=function(){messages=initial.map(function(m){return Object.assign({},m)});avatar='';photo='';$('iAvatar').value='';$('iPhoto').value='';$('iColor').value='#c6eff5';$('iTr').checked=false;$('iChatOnly').checked=false;render()};
$('savePng').onclick=function(){if(!window.html2canvas)return;capChat($('wd'),{scale:3,useCORS:true,backgroundColor:null}).then(function(c){var a=document.createElement('a');a.download='weversedm.png';a.href=c.toDataURL('image/png');a.click()})};
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드'};
render();
})();