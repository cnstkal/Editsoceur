(function(){
  var $=function(i){return document.getElementById(i)},STORE='kakao_chats_v1';
  var D=[['소윤','사진을 보냈습니다.','11월 8일','',3,1,1,0],['하늘','ㅋㅋㅋㅋ 그거 진짜였어?','오전 9:35','',0,0,0,0],['우리반 단톡방','서연: 내일 시간표 바뀌었대 확인해봐','오전 8:01','12',2,0,0,1],['엄마','밥 먹었니? 늦지 말고 들어와','어제','1',1,0,0,0],['지우','휴~~ 다행이다 진짜','어제','',4,0,0,0],['카카오톡 선물하기','충전결제 리워드로 267P가 적립되었습니다.','어제','',4,0,0,0],['카카오톡 지갑','인증이 완료되었습니다.','어제','5',0,0,0,0]];
  var DEF={tu:'340',b1:'340',b2:'1',dot:true,r:D.map(function(a){return{n:a[0],m:a[1],t:a[2],u:a[3],c:a[4],me:!!a[5],pin:!!a[6],mute:!!a[7],img:''}})};
  var S,PIN='<svg width="18" height="18" viewBox="0 0 24 24" fill="#9a9fa6"><path d="M8 3h8l-1 6 3 3v2H13v7l-1 2-1-2v-7H6v-2l3-3z"/></svg>',
      MU='<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#9a9fa6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 17h12l-1.500-2V10a4.500 4.500 0 0 0-9 0v5zM10 20h4M3 3l18 18"/></svg>';
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function render(){
    $('tU').textContent=S.tu;$('tU').style.display=S.tu?'':'none';
    $('cL').innerHTML=S.r.map(function(x){
      return '<div class="cr"><i class="av c'+x.c+'"'+(x.img?' style="background-image:url('+x.img+')"':'')+'></i><div class="mid"><div class="nm2">'+(x.me?'<i class="me2">나</i>':'')+esc(x.n)+(x.pin?PIN:'')+(x.mute?MU:'')+'</div><div class="pv">'+esc(x.m)+'</div></div><div class="rt"><span>'+esc(x.t)+'</span>'+(x.u?'<span class="bd">'+esc(x.u)+'</span>':'')+'</div></div>'}).join('');
    [['kB1',S.b1],['kB2',S.b2]].forEach(function(a){var e=$(a[0]);e.textContent=a[1];e.style.display=a[1]?'flex':'none'});
    $('kDot').style.display=S.dot?'block':'none'}
  function list(){
    $('el').innerHTML=S.r.map(function(x,i){var ck=function(f,l){return '<label><input type="checkbox" data-f="'+f+'"'+(x[f]?' checked':'')+'>'+l+'</label>'};
      return '<div class="pe" data-i="'+i+'"><label>이름<input data-f="n" value="'+esc(x.n)+'"></label><label>마지막 메시지<textarea data-f="m" rows="2">'+esc(x.m)+'</textarea></label>'+
      '<div class="row"><label>시간<input data-f="t" value="'+esc(x.t)+'"></label><label>안읽음(비우면 숨김)<input data-f="u" value="'+esc(x.u)+'"></label></div>'+
      '<div class="ck">'+ck('me','나')+ck('pin','고정')+ck('mute','알림끔')+'</div>'+
      '<div class="row"><label>색<select data-f="c">'+['파랑','보라','민트','연보라','노랑'].map(function(n,j){return '<option value="'+j+'"'+(+x.c===j?' selected':'')+'>'+n+'</option>'}).join('')+'</select></label><label class="file">사진<input type="file" accept="image/*" data-f="img"></label></div>'+
      '<div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'}).join('')}
  function load(reset){
    if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}
    else{try{var v=localStorage.getItem(STORE);S=v?JSON.parse(v):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.r))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}
    $('iTU').value=S.tu;$('iB1').value=S.b1;$('iB2').value=S.b2;$('iDot').checked=S.dot;list();render()}
  function rd(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
  [['iTU','tu'],['iB1','b1'],['iB2','b2']].forEach(function(a){$(a[0]).addEventListener('input',function(){S[a[1]]=this.value;persist();render()})});
  $('iDot').addEventListener('change',function(){S.dot=this.checked;persist();render()});
  var L=$('el'),ix=function(e){return +e.target.closest('.pe').dataset.i};
  L.addEventListener('input',function(e){var t=e.target,f=t.dataset.f;if(!f||t.type==='file'||t.type==='checkbox'||f==='c')return;S.r[ix(e)][f]=t.value;persist();render()});
  L.addEventListener('change',function(e){var t=e.target,f=t.dataset.f;if(!f)return;var o=S.r[ix(e)];
    if(t.type==='checkbox'){o[f]=t.checked;persist();render()}else if(f==='c'){o.c=+t.value;persist();render()}else if(f==='img'&&t.files[0])rd(t.files[0],function(d){o.img=d;persist();render()})});
  L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.r;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
    persist();list();render()});
  $('addR').onclick=function(){S.r.push({n:'이름',m:'',t:'어제',u:'',c:0,me:false,pin:false,mute:false,img:''});persist();list();render()};
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return html2canvas($('kf'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='kakao-chats.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
  load(false);
})();
