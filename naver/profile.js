(function(){
  var $=function(i){return document.getElementById(i)},STORE='naver_profile_v2';
  var DEF={q:'이름',cat:'배우',tc:'#a8766a',tabs:'전체,프로필,수상,최근영상,필모그래피,뉴스',act:1,ph:'',ft:'본인 또는 대리인이 직접 관리하는 정보입니다.\n본인참여 2026.01.01.',
    r:[{l:'출생',v:'2000.01.01.',k:0},{l:'신체',v:'180cm',k:0},{l:'소속사',v:'○○엔터테인먼트',k:1},{l:'학력',v:'○○대학교',k:1},{l:'수상',v:'2025년 ○○ 시상식 신인상\n2025년 ○○ 시상식 베스트 액터',k:0},{l:'사이트',v:'공식홈페이지, 인스타그램, 팬카페',k:1},{l:'활동',v:'방송, 영화, 공연',k:1}]};
  var S;
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function val(x){return x.k?String(x.v).split(/,\s*/).map(function(p){return '<a>'+esc(p)+'</a>'}).join(', '):esc(x.v)}
  function render(){
    $('pQ').textContent=S.q;$('pT').textContent=S.q;$('pCat').textContent=S.cat;$('pf').style.setProperty('--tc',S.tc);
    $('pTabs').innerHTML=S.tabs.split(',').map(function(t,i){return '<span'+(i+1===+S.act?' class="on"':'')+'>'+esc(t.trim())+'</span>'}).join('');
    $('pRows').innerHTML=S.r.map(function(x){return '<div class="pro"><span class="l">'+esc(x.l)+'</span><span class="v">'+val(x)+'</span></div>'}).join('');
    $('pPh').style.backgroundImage=S.ph?'url('+S.ph+')':'';
    var lines=S.ft.split('\n');$('pFt').innerHTML=esc(S.ft)+'<u>인물정보 본인참여 · 직업별 등재기준</u>'}
  function list(){$('el').innerHTML=S.r.map(function(x,i){return '<div class="pe" data-i="'+i+'"><div class="row"><label>항목명<input data-f="l" value="'+esc(x.l)+'"></label><label style="display:flex;align-items:center;gap:6px;margin-top:22px"><input type="checkbox" data-f="k"'+(x.k?' checked':'')+' style="width:auto;margin:0">파란 링크(쉼표 구분)</label></div><label>내용<textarea data-f="v" rows="2">'+esc(x.v)+'</textarea></label><div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'}).join('')}
  function load(reset){
    if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}
    else{try{var v=localStorage.getItem(STORE);S=v?JSON.parse(v):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.r))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}
    $('iQ').value=S.q;$('iCat').value=S.cat;$('iTc').value=S.tc;$('iTabs').value=S.tabs;$('iAct').value=S.act;$('iFt').value=S.ft;list();render()}
  [['iQ','q'],['iCat','cat'],['iTc','tc'],['iTabs','tabs'],['iAct','act'],['iFt','ft']].forEach(function(a){$(a[0]).addEventListener('input',function(){S[a[1]]=this.value;persist();render()})});
  $('iPh').addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){S.ph=r.result;persist();render()};r.readAsDataURL(f)});
  var L=$('el'),ix=function(e){return +e.target.closest('.pe').dataset.i};
  L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||f==='k')return;S.r[ix(e)][f]=e.target.value;persist();render()});
  L.addEventListener('change',function(e){if(e.target.dataset.f!=='k')return;S.r[ix(e)].k=e.target.checked?1:0;persist();render()});
  L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.r;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
    persist();list();render()});
  $('addR').onclick=function(){S.r.push({l:'항목',v:'',k:0});persist();list();render()};
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return html2canvas($('pf'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='naver-profile.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
  load(false);
})();
