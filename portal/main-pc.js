(function(){
  var $=function(i){return document.getElementById(i)},STORE='editsoceur-portal-main-pc-v1',S;
  var DEF={lg:'포털',sr:'검색어를 입력하세요',qk:'메일,카페,블로그,쇼핑,뉴스,증권,부동산,지도',bd:'36',tb:'언론사 1,언론사 2,언론사 3,언론사 4',nw:'임시 뉴스 제목입니다 하나\n임시 뉴스 제목입니다 둘\n임시 뉴스 제목입니다 셋\n임시 뉴스 제목입니다 넷\n임시 뉴스 제목입니다 다섯',nm:'사용자님',em:'user@example.com',tp:'14.3°',st:'구름많음'};
  function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  function render(){
    var qk=S.qk.split(',').map(function(s){return s.trim()}).filter(Boolean).slice(0,8);
    var tb=S.tb.split(',').map(function(s){return s.trim()}).filter(Boolean);
    var nw=S.nw.split('\n').map(function(s){return s.trim()}).filter(Boolean).slice(0,6);
    var h='<div class="hd"><div class="hm"></div><div class="lg">'+esc(S.lg).slice(0,4)+'</div>';
    h+='<div class="bd" style="right:58px">'+esc(S.bd)+'</div></div>';
    h+='<div class="sb">'+esc(S.sr)+'<span class="ai">AI</span></div>';
    h+='<div class="qk">'+qk.map(function(q){return '<div><i></i>'+esc(q)+'</div>'}).join('')+'</div>';
    h+='<div class="nw"><div class="nt">'+tb.map(function(t,i){return '<span>'+esc(t)+'</span>'}).join('')+'</div><div class="np"></div><div class="nh" style="left:420px;top:104px;width:560px">'+nw.map(function(n){return '<div>'+esc(n)+'</div>'}).join('')+'</div></div>';
    h+='<div class="pr"><div class="ph"></div><div class="nm">'+esc(S.nm)+'</div><div class="em">'+esc(S.em)+'</div></div>';
    h+='<div class="wt"><div class="tg">날씨</div><div class="tp">'+esc(S.tp)+'</div><div class="st">'+esc(S.st)+'</div></div>';
    $('pf').innerHTML=h}
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function fit(){var k=Math.min(1,$('pw').clientWidth/1920);$('pf').style.transform='scale('+k+')';$('pw').style.height=1080*k+'px'}
  var TX={iLg:'lg',iSr:'sr',iQk:'qk',iBd:'bd',iTb:'tb',iNw:'nw',iNm:'nm',iEm:'em',iTp:'tp',iSt:'st'};
  function set(){Object.keys(TX).forEach(function(id){$(id).value=S[TX[id]]})}
  function load(r){if(r)try{localStorage.removeItem(STORE)}catch(e){}try{var s=!r&&localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(typeof S.qk!=='string')throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}set();render();fit()}
  Object.keys(TX).forEach(function(id){$(id).addEventListener('input',function(){S[TX[id]]=this.value;persist();render()})});
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){return html2canvas($('pf'),{scale:2,width:1920,height:1080,useCORS:true,backgroundColor:'#fff',logging:false,onclone:function(d){d.getElementById('pf').style.transform='none';var w=d.getElementById('pw');w.style.height='1080px';w.style.overflow='visible'}})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='portal-main-pc.png';document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t})
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  addEventListener('resize',fit);
  load(false);
})();
