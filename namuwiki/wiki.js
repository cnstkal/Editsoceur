(function(){
  var $=function(i){return document.getElementById(i)},STORE='namu_wiki_v1';
  var DEF={sc:0,top:'#00a495',th:'#ffa500',t:'문서 제목',m:'최근 수정 시각: 2026-01-01 12:00:00',s:'50',lock:true,cats:['분류1','분류2','분류3','분류4'],g1:'GROUP',g2:'그룹명',mem:'멤버1,멤버2,멤버3,멤버4,멤버5,멤버6',act:4,n1:'이름',n2:'NAME',ph:'',
    r:[['본명','홍길동 (洪吉童, Hong Gildong)'],['출생','[[2000년 1월 1일]] (26세)\n[[서울특별시]]'],['국적','[[대한민국]]'],['신체','180cm | 60kg^[1] | [[A형]]'],['학력','[[○○초등학교]] (졸업)\n[[○○중학교]] (졸업)'],['소속사','[[○○엔터테인먼트]]'],['소속 그룹','[[그룹명]]'],['포지션','**센터**, 보컬, 댄서'],['MBTI','ISTJ^[2]'],['별명','홍반장, **길동이**\n상세 내용은 [[해당 문단]] 참조.']].map(function(a){return{l:a[0],v:a[1]}})};
  var S;
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function md(t){return esc(t).replace(/\[\[(.+?)\]\]/g,'<a>$1</a>').replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\^\[(\d+)\]/g,'<sup>[$1]</sup>').replace(/\n/g,'<br>')}
  function render(){
    var f=$('wf');f.style.setProperty('--t',S.th);document.querySelector('.wh').style.background=S.top;document.querySelector('.wtop').style.background=S.top;
    $('wT').textContent=S.t;$('wM').textContent=S.m;
    $('wCat').innerHTML='분류: '+S.cats.map(function(c){return '<a>'+esc(c)+'</a>'}).join('<s>|</s>');
    var mem=S.mem.split(',');
    $('wNb1').innerHTML='<div class="r1"><span class="lg">'+esc(S.g1)+'</span><span class="vl"></span><span class="tt"><b>'+esc(S.g1)+'</b><span>'+esc(S.g2)+'</span></span></div><div class="mem">'+mem.map(function(x,i){return '<span'+(i+1===+S.act?' class="on"':'')+'>'+esc(x.trim())+'</span>'}).join('')+'</div><div class="sub">[ 전 멤버 ]</div><div class="pills"><span>한국 음반</span><span>해외 음반</span><span>기타 음반</span><span>관련 문서</span></div>';
    $('wNb2').innerHTML='<div class="r1"><span class="lg">'+esc(S.g1)+'</span><span class="vl"></span><span class="tt"><b>'+esc(S.n1)+'</b><span>'+esc(S.n2)+'</span></span></div><div class="lk"><span>[ 참여 음반 ]</span><span>[ 관련 문서 ]</span></div>';
    $('wIb').innerHTML='<div class="hd"><b>'+esc(S.n1)+'</b><span>'+esc(S.n2)+'</span></div><div class="ph"'+(S.ph?' style="background-image:url('+S.ph+')"':'')+'></div>'+S.r.map(function(x){return '<div class="tr"><div class="tl">'+esc(x.l)+'</div><div class="tv">'+md(x.v)+'</div></div>'}).join('')}
  function list(){$('el').innerHTML=S.r.map(function(x,i){return '<div class="pe" data-i="'+i+'"><label>항목명<input data-f="l" value="'+esc(x.l)+'"></label><label>내용<textarea data-f="v" rows="2">'+esc(x.v)+'</textarea></label><div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'}).join('')}
  var F=[['iTop','top'],['iTh','th'],['iT','t'],['iM','m'],['iG1','g1'],['iG2','g2'],['iMem','mem'],['iAct','act'],['iN1','n1'],['iN2','n2']];
  function load(reset){
    if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}
    else{try{var v=localStorage.getItem(STORE);S=v?JSON.parse(v):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.r))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}
    if(!Array.isArray(S.cats))S.cats=String(S.cat||'').split(',').map(function(c){return c.trim()}).filter(Boolean);
    F.forEach(function(a){$(a[0]).value=S[a[1]]});list();catList();render()}
  function catList(){$('elCat').innerHTML=S.cats.map(function(c,i){return '<div class="cr" data-i="'+i+'"><input value="'+esc(c)+'" placeholder="분류 이름"><button type="button" aria-label="삭제">✕</button></div>'}).join('')}
  $('elCat').addEventListener('input',function(e){S.cats[+e.target.closest('.cr').dataset.i]=e.target.value;persist();render()});
  $('elCat').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;S.cats.splice(+b.closest('.cr').dataset.i,1);persist();catList();render()});
  $('addCat').onclick=function(){S.cats.push('분류');persist();catList();render()};
  F.forEach(function(a){$(a[0]).addEventListener('input',function(){S[a[1]]=this.value;persist();render()})});
  $('iPh').addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){S.ph=r.result;persist();render()};r.readAsDataURL(f)});
  var L=$('el'),ix=function(e){return +e.target.closest('.pe').dataset.i};
  L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f)return;S.r[ix(e)][f]=e.target.value;persist();render()});
  L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.r;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
    persist();list();render()});
  $('addR').onclick=function(){S.r.push({l:'항목',v:''});persist();list();render()};
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return html2canvas($('wf'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='namuwiki.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
  load(false);
})();
