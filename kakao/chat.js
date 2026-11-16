(function(){
  var $=function(i){return document.getElementById(i)},STORE='kakao_chat_v1',T='오전 9:34';
  var M=[['o','임티?'],['o','샷어..?'],['o','저딴거를..?',T],['m','오늘은무슨요일'],['m','월요일'],['m','그렇다면이모티콘은',T],['o','아~~월ㄹ러ㅓㄹ월윙ㄹ월'],['o','근데왜스포해시발럼아'],['o','노잼이네 ㅉㅉ',T],['m','시발럼아빨리골랏어야지',T],['o','까먹엇어 ㅅㅂ 스포하지마','오전 9:35'],['m','네','오전 9:35']];
  var DEF={name:'사노민지로',back:'340',bg:'#aebfce',av:'',m:M.map(function(a){return{s:a[0],t:a[1],tm:a[2]||'',img:''}})};
  var S;
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function render(){
    $('kc').style.background=S.bg;$('cName').textContent=S.name;$('cBack').textContent=S.back;$('cBack').style.display=S.back?'':'none';
    var h='',m=S.m;
    m.forEach(function(x,i){
      var p=m[i-1],n=m[i+1],first=!p||p.s!==x.s,last=!n||n.s!==x.s||n.tm!==x.tm||(n.tm||'')!==(x.tm||'');
      var tm=x.tm&&(!n||n.s!==x.s||n.tm!==x.tm)?'<span class="tm">'+esc(x.tm)+'</span>':'';
      var body=x.img?'<img class="bi" src="'+x.img+'">'+(x.t?'<div class="bb" style="margin-top:4px">'+esc(x.t)+'</div>':''):'<div class="bb">'+esc(x.t)+'</div>';
      if(x.s==='m'){h+='<div class="mr me'+(first?' first':'')+'">'+tm+'<div class="bw">'+body+'</div></div>';return}
      var lead=first?'<i class="av c3" style="width:40px;height:40px;margin-top:1px'+(S.av?';background-image:url('+S.av+')':'')+'"></i>':'<span class="gap" style="width:40px"></span>';
      h+='<div class="mr'+(first?' first':'')+'" style="align-items:'+(first?'flex-start':'flex-end')+'">'+lead+'<div class="col" style="display:flex;flex-direction:column;max-width:78%;align-items:flex-start">'+(first?'<div class="nm">'+esc(S.name)+'</div>':'')+'<div style="display:flex;align-items:flex-end;gap:6px"><div class="bw" style="max-width:none">'+body+'</div>'+tm+'</div></div></div>'});
    $('cM').innerHTML=h}
  function list(){
    $('cl').innerHTML=S.m.map(function(x,i){return '<div class="pe" data-i="'+i+'"><div class="row"><label>보낸 사람<select data-f="s"><option value="o"'+(x.s==='o'?' selected':'')+'>상대</option><option value="m"'+(x.s==='m'?' selected':'')+'>나</option></select></label><label>시간(비우면 숨김)<input data-f="tm" value="'+esc(x.tm)+'"></label></div>'+
      '<label>내용<textarea data-f="t" rows="2">'+esc(x.t)+'</textarea></label><label class="file">사진/이모티콘<input type="file" accept="image/*" data-f="img"></label>'+
      '<div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'}).join('')}
  function load(reset){
    if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}
    else{try{var v=localStorage.getItem(STORE);S=v?JSON.parse(v):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.m))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}
    $('iName').value=S.name;$('iBack').value=S.back;$('iBg').value=S.bg;list();render()}
  function rd(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
  [['iName','name'],['iBack','back'],['iBg','bg']].forEach(function(a){$(a[0]).addEventListener('input',function(){S[a[1]]=this.value;persist();render()})});
  $('iAv').addEventListener('change',function(){if(this.files[0])rd(this.files[0],function(d){S.av=d;persist();render()})});
  var L=$('cl'),ix=function(e){return +e.target.closest('.pe').dataset.i};
  L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||f==='img'||f==='s')return;S.m[ix(e)][f]=e.target.value;persist();render()});
  L.addEventListener('change',function(e){var t=e.target,f=t.dataset.f;if(!f)return;var o=S.m[ix(e)];
    if(f==='s'){o.s=t.value;persist();render()}else if(f==='img'&&t.files[0])rd(t.files[0],function(d){o.img=d;persist();render()})});
  L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.m;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
    persist();list();render()});
  $('addM').onclick=function(){var l=S.m[S.m.length-1]||{s:'o',tm:''};S.m.push({s:l.s,t:'',tm:l.tm,img:''});persist();list();render()};
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return html2canvas($('kc'),{scale:4,useCORS:true,backgroundColor:null,logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='kakao-chat.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
  load(false);
})();
