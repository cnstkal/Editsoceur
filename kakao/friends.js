(function(){
  var $=function(i){return document.getElementById(i)},STORE='kakao_friends_v1';
  var F=[['가희(멜뮤양도자)','',0],['강서경','',1],['강주희','',2],['고노을','히키코모리 + 오타쿠 + 집순이 =고여울',0],['고여울','',3],['김규은','',2],['김민경','',3],['김아인','상태메시지를 입력해 주세요.',1],['김예지','',2]];
  var DEF={name:'소윤',b1:'340',b2:'1',dot:true,bd:true,fav:true,bdN:'1',frN:'51',me:'',bdImg:'',
    favs:[{n:'엄마',s:'',c:2},{n:'아빠',s:'쉽게 얻을 수 있는 것 중에, 가치 있는 것은 거의 없다',c:0}],
    fr:F.map(function(a){return{n:a[0],s:a[1],c:a[2]}})};
  var S;
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function img(u){return u?' style="background-image:url('+u+')"':''}
  function row(p){return '<div class="kp"><i class="av c'+(p.c||0)+'"'+img(p.img)+'></i><div><b>'+esc(p.n)+'</b>'+(p.s?'<small>'+esc(p.s)+'</small>':'')+'</div></div>'}
  function render(){
    $('kName').textContent=S.name;$('kMe').outerHTML='<i class="av c3" id="kMe"'+img(S.me)+'></i>';
    $('kBd').style.display=S.bd?'':'none';$('kBdT').textContent='생일인 친구 '+S.bdN;
    $('kBdA').outerHTML='<i class="av sm" id="kBdA"'+img(S.bdImg)+'></i>';
    $('kFav').style.display=S.fav?'':'none';$('kFavT').textContent='즐겨찾는 친구 '+S.favs.length;$('kFavL').innerHTML=S.favs.map(row).join('');
    $('kFrT').textContent='친구 '+(S.frN||S.fr.length);$('kFrL').innerHTML=S.fr.map(row).join('');
    [['kB1',S.b1],['kB2',S.b2]].forEach(function(a){var e=$(a[0]);e.textContent=a[1];e.style.display=a[1]?'flex':'none'});
    $('kDot').style.display=S.dot?'block':'none'}
  function list(){['favs','fr'].forEach(function(k){
    $(k==='fr'?'elFr':'elFav').innerHTML=S[k].map(function(p,i){
      return '<div class="pe" data-k="'+k+'" data-i="'+i+'"><div class="row"><label>이름<input data-f="n" value="'+esc(p.n)+'"></label><label>색<select data-f="c">'+['파랑','보라','민트','연보라'].map(function(n,j){return '<option value="'+j+'"'+(+p.c===j?' selected':'')+'>'+n+'</option>'}).join('')+'</select></label></div>'+
      '<label>상태메시지<input data-f="s" value="'+esc(p.s)+'"></label><label class="file">사진<input type="file" accept="image/*" data-f="img"></label>'+
      '<div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'}).join('')})}
  function set(){$('iName').value=S.name;$('iB1').value=S.b1;$('iB2').value=S.b2;$('iBd').checked=S.bd;$('iFav').checked=S.fav;$('iDot').checked=S.dot;$('iBdN').value=S.bdN;$('iFrN').value=S.frN}
  function load(reset){
    if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}
    else{try{var v=localStorage.getItem(STORE);S=v?JSON.parse(v):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.fr)||!Array.isArray(S.favs))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}
    set();list();render()}
  function rd(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
  [['iName','name'],['iB1','b1'],['iB2','b2'],['iBdN','bdN'],['iFrN','frN']].forEach(function(a){$(a[0]).addEventListener('input',function(){S[a[1]]=this.value;persist();render()})});
  [['iBd','bd'],['iFav','fav'],['iDot','dot']].forEach(function(a){$(a[0]).addEventListener('change',function(){S[a[1]]=this.checked;persist();render()})});
  [['iMe','me'],['iBdImg','bdImg']].forEach(function(a){$(a[0]).addEventListener('change',function(){if(this.files[0])rd(this.files[0],function(d){S[a[1]]=d;persist();render()})})});
  function ctx(e){var p=e.target.closest('.pe');return p&&{k:p.dataset.k,i:+p.dataset.i}}
  ['elFav','elFr'].forEach(function(id){var L=$(id);
    L.addEventListener('input',function(e){var c=ctx(e),f=e.target.dataset.f;if(!c||f==='c'||f==='img')return;S[c.k][c.i][f]=e.target.value;persist();render()});
    L.addEventListener('change',function(e){var c=ctx(e),t=e.target,f=t.dataset.f;if(!c)return;var o=S[c.k][c.i];
      if(f==='c'){o.c=+t.value;persist();render()}else if(f==='img'&&t.files[0])rd(t.files[0],function(d){o.img=d;persist();render()})});
    L.addEventListener('click',function(e){var a=e.target.dataset.a,c=ctx(e);if(!a||!c)return;var m=S[c.k],i=c.i;
      if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
      persist();list();render()})});
  document.querySelectorAll('[data-add]').forEach(function(b){b.onclick=function(){S[b.dataset.add].push({n:'이름',s:'',c:0});persist();list();render()}});
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return html2canvas($('kf'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='kakao-friends.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
  load(false);
})();
