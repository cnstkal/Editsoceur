(function(){
  var $=function(id){return document.getElementById(id)};
  var DEF=function(){return{target:'yunou._.u',me:null,list:[
    {id:'user_one',ver:true,ring:true,time:'3일',text:'정말 멋진 사진이에요! 😍',likes:'208',rep:4,av:null},
    {id:'user_two',ver:false,ring:true,time:'3일',text:'예쁘다..',likes:'6',rep:1,av:null},
    {id:'user_three',ver:false,ring:false,time:'3일',text:'너무 좋아요 💗💗',likes:'48',rep:2,av:null},
    {id:'user_four',ver:false,ring:true,time:'3일',text:'최고예요!!\n정말 최고!!',likes:'26',rep:1,av:null},
    {id:'user_five',ver:false,ring:false,time:'3일',text:'멋있다 😭😭😭',likes:'1',rep:0,av:null}]}};
  var S=DEF();
  function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  var BADGE='<svg width="15" height="15" viewBox="0 0 24 24"><path fill="#0095f6" d="M12 1l2.6 1.9 3.2-.1 1 3 2.6 1.9-1 3.1 1 3.1-2.6 1.9-1 3-3.2-.1L12 23l-2.6-1.9-3.2.1-1-3-2.6-1.9 1-3.1-1-3.1 2.6-1.9 1-3 3.2.1z"/><path d="m7.8 12.3 3 3 5.6-6" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var HEART='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.9" stroke-linejoin="round"><path d="M12 21s-8.500-5.200-8.500-11A4.800 4.800 0 0 1 12 7.200 4.800 4.800 0 0 1 20.500 10c0 5.800-8.500 11-8.500 11z"/></svg>';
  function bg(a){return a?'background-image:url('+a+')':''}
  function render(){
    $('vMe').style.backgroundImage=S.me?'url('+S.me+')':'';
    $('vPh').textContent=S.target+'님에게 댓글 추가';
    $('list').innerHTML=S.list.map(function(c){
      var av=c.ring?'<div class="av ring"><i style="'+bg(c.av)+'"></i></div>':'<div class="av" style="'+bg(c.av)+'"></div>';
      var more=c.rep>0?'<div class="more"><i></i>답글 '+c.rep+'개 더 보기</div>':'';
      return '<div class="cm">'+av+'<div class="body"><div class="hd">'+esc(c.id)+(c.ver?BADGE:'')+'<small>'+esc(c.time)+'</small></div><div class="tx">'+esc(c.text)+'</div><div class="rp">답글 달기</div>'+more+'</div><div class="lk">'+HEART+esc(c.likes)+'</div></div>'}).join('')}
  function build(){
    $('iTarget').value=S.target;
    $('eList').innerHTML=S.list.map(function(c,i){
      return '<div class="ecard" data-i="'+i+'"><h3>댓글 '+(i+1)+'<button data-del="'+i+'" type="button">삭제</button></h3>'+
      '<div class="row"><label>아이디<input data-k="id" value="'+esc(c.id).replace(/"/g,'&quot;')+'"></label><label>시간<input data-k="time" value="'+esc(c.time)+'"></label></div>'+
      '<label>본문<textarea data-k="text" rows="2">'+esc(c.text)+'</textarea></label>'+
      '<div class="row"><label>좋아요 수<input data-k="likes" value="'+esc(c.likes)+'"></label><label>답글 수 (0=숨김)<input data-k="rep" type="number" min="0" value="'+c.rep+'"></label></div>'+
      '<div class="chk"><label><input type="checkbox" data-k="ver"'+(c.ver?' checked':'')+'>파란딱지</label><label><input type="checkbox" data-k="ring"'+(c.ring?' checked':'')+'>스토리 링</label></div>'+
      '<label class="file">프로필 사진<input type="file" accept="image/*" data-av="'+i+'"></label></div>'}).join('')}
  function rd(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
  $('iTarget').oninput=function(){S.target=this.value;render()};
  $('iMe').onchange=function(){if(this.files[0])rd(this.files[0],function(d){S.me=d;render()})};
  $('eList').addEventListener('input',function(e){var t=e.target,k=t.dataset.k;if(!k)return;
    var c=S.list[t.closest('.ecard').dataset.i];
    c[k]=t.type==='checkbox'?t.checked:(k==='rep'?Math.max(0,parseInt(t.value)||0):t.value);render()});
  $('eList').addEventListener('change',function(e){var t=e.target;if(t.dataset.av===undefined||!t.files[0])return;
    rd(t.files[0],function(d){S.list[+t.dataset.av].av=d;render()})});
  $('eList').addEventListener('click',function(e){var d=e.target.dataset.del;if(d===undefined)return;
    S.list.splice(+d,1);build();render()});
  $('add').onclick=function(){S.list.push({id:'new_user',ver:false,ring:false,time:'1일',text:'댓글 내용',likes:'0',rep:0,av:null});build();render()};
  $('reset').onclick=function(){S=DEF();$('iMe').value='';build();render()};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return html2canvas($('cap'),{scale:5,useCORS:true,backgroundColor:null,logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='instagram-comments.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  build();render();
})();
