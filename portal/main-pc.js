(function(){
  var $=function(i){return document.getElementById(i)},STORE='editsoceur-portal-main-pc-v2',S;
  var DEF={lg:'포털',sr:'검색어를 입력해 주세요',qk:'메일,카페,블로그,쇼핑,뉴스,증권,부동산,지도',bd:'36',sp:true,
    hi:[{t:'임시 검색어 1',d:'08.25.'},{t:'임시 검색어 2',d:'07.27.'},{t:'임시 검색어 3',d:'07.20.'},{t:'임시 검색어 4',d:'07.04.'}],
    tb:'언론사 1,언론사 2,언론사 3,언론사 4',nw:'임시 뉴스 제목입니다 하나\n임시 뉴스 제목입니다 둘\n임시 뉴스 제목입니다 셋\n임시 뉴스 제목입니다 넷\n임시 뉴스 제목입니다 다섯',nm:'사용자님',em:'user@example.com',tp:'14.3°',st:'구름많음'};
  function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  var CLK='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  function render(){
    var qk=S.qk.split(',').map(function(s){return s.trim()}).filter(Boolean).slice(0,8);
    var tb=S.tb.split(',').map(function(s){return s.trim()}).filter(Boolean);
    var nw=S.nw.split('\n').map(function(s){return s.trim()}).filter(Boolean).slice(0,6);
    var h='<div class="hd"><div class="hm"></div><div class="lg">'+esc(S.lg).slice(0,4)+'</div><div class="bd" style="right:58px">'+esc(S.bd)+'</div></div>';
    h+='<div class="sb">'+esc(S.sr)+'<span class="ai">AI</span></div>';
    h+='<div class="qk">'+qk.map(function(q){return '<div><i></i>'+esc(q)+'</div>'}).join('')+'</div>';
    h+='<div class="nw"><div class="nt">'+tb.map(function(t){return '<span>'+esc(t)+'</span>'}).join('')+'</div><div class="np"></div><div class="nh" style="left:420px;top:104px;width:560px">'+nw.map(function(n){return '<div>'+esc(n)+'</div>'}).join('')+'</div></div>';
    h+='<div class="pr"><div class="ph"></div><div class="nm">'+esc(S.nm)+'</div><div class="em">'+esc(S.em)+'</div></div>';
    h+='<div class="wt"><div class="tg">날씨</div><div class="tp">'+esc(S.tp)+'</div><div class="st">'+esc(S.st)+'</div></div>';
    if(S.sp){
      var rows=S.hi.slice(0,8).map(function(x,i){return '<div class="row" style="top:'+(150+i*46)+'px">'+CLK.replace('<svg','<svg style="margin-right:14px;flex:none"')+'<span>'+esc(x.t)+'</span><span class="d">'+esc(x.d)+'</span><span class="x">✕</span></div>'}).join('');
      h+='<div class="sp"><div class="sbin">'+esc(S.sr)+'</div><div class="hdr">최근 검색어</div><div class="del">전체삭제</div>'+rows+'<div class="ft"><span>자동저장 끄기 · 도움말</span><span>닫기</span></div></div>';
    }
    $('pf').innerHTML=h}
  function list(){var h='';S.hi.forEach(function(x,i){h+='<div class="xc" data-i="'+i+'" style="background:#fff;border:1px solid #dbdbdb;border-radius:12px;padding:12px 12px 0;margin-bottom:12px"><div class="row" style="display:flex;gap:10px"><label style="flex:1">검색어<input data-f="t" value="'+esc(x.t)+'" style="display:block;width:100%;margin-top:5px;padding:10px 12px;border:1px solid #dbdbdb;border-radius:10px;font-size:15px"></label><label style="flex:0 0 110px">날짜<input data-f="d" value="'+esc(x.d)+'" style="display:block;width:100%;margin-top:5px;padding:10px 12px;border:1px solid #dbdbdb;border-radius:10px;font-size:15px"></label></div><div style="display:flex;gap:8px;margin-bottom:12px"><button type="button" data-a="u" style="flex:1;height:38px;border:1px solid #dbdbdb;border-radius:8px;background:#f6f6f6;font-weight:700">↑</button><button type="button" data-a="d" style="flex:1;height:38px;border:1px solid #dbdbdb;border-radius:8px;background:#f6f6f6;font-weight:700">↓</button><button type="button" data-a="x" style="flex:1;height:38px;border:1px solid #dbdbdb;border-radius:8px;background:#f6f6f6;font-weight:700">✕ 삭제</button></div></div>'});$('xh').innerHTML=h}
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function fit(){var k=Math.min(1,$('pw').clientWidth/1920);$('pf').style.transform='scale('+k+')';$('pf').style.height='auto';$('pf').style.overflow='visible';var base=$('pf').getBoundingClientRect().top,bottom=Math.max(1080,$('pf').scrollHeight);$('pf').querySelectorAll('*').forEach(function(el){var r=el.getBoundingClientRect();bottom=Math.max(bottom,(r.bottom-base)/k)});var h=Math.max(1080,bottom+40);$('pf').style.height=h+'px';$('pw').style.height=h*k+'px'}
  var TX={iLg:'lg',iSr:'sr',iQk:'qk',iBd:'bd',iTb:'tb',iNw:'nw',iNm:'nm',iEm:'em',iTp:'tp',iSt:'st'};
  function set(){Object.keys(TX).forEach(function(id){$(id).value=S[TX[id]]});$('iSp').checked=!!S.sp}
  function load(r){if(r)try{localStorage.removeItem(STORE)}catch(e){}try{var s=!r&&localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!Array.isArray(S.hi))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}set();list();render();fit()}
  Object.keys(TX).forEach(function(id){$(id).addEventListener('input',function(){S[TX[id]]=this.value;persist();render()})});
  $('iSp').addEventListener('change',function(){S.sp=this.checked;persist();render()});
  var L=$('xh'),ix=function(e){return +e.target.closest('.xc').dataset.i};
  L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f)return;S.hi[ix(e)][f]=e.target.value;persist();render()});
  L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.hi,t;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){t=m[i];m[i]=m[i+1];m[i+1]=t}
    persist();list();render()});
  $('addH').onclick=function(){S.hi.push({t:'새 검색어',d:'11.16.'});persist();list();render()};
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){return html2canvas($('pf'),{scale:2,width:1920,height:Math.max(1080,$('pf').scrollHeight),useCORS:true,backgroundColor:'#fff',logging:false,onclone:function(d){d.getElementById('pf').style.transform='none';var w=d.getElementById('pw');w.style.height='auto';w.style.overflow='visible'}})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='portal-main-pc.png';document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t})
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  addEventListener('resize',fit);
  load(false);
})();
