(function(){
  var $=function(i){return document.getElementById(i)},STORE='editsoceur-youtube-channel-pc-v1',S;
  var DEF={nm:'Mars U',hd:'@marsu',sb:'23만명',cn:'12개',ds:'채널 자세히 알아보기',lk:'',lu:'',av:'',ft:'4월 기록',fm:'조회수 108만회 · 1주 전',fth:'',sc:'추천',v:[{t:'Q&A',vw:'92만',ago:'6달전',th:''},{t:'12월 기록',vw:'50만',ago:'4달전',th:''},{t:'3월 기록',vw:'34만',ago:'1달전',th:''}]};
  var DOTS='<svg width="24" height="24" viewBox="0 0 24 24" style="fill:#0f0f0f;stroke:none"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>';
  function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  function bg(u){return u?"background-image:url('"+esc(u)+"')":''}
  function render(){
    var h='<div class="c-av" style="'+bg(S.av)+'"></div><div class="c-nm">'+esc(S.nm)+'</div><div class="c-hd"><b>'+esc(S.hd)+'</b> · 구독자 '+esc(S.sb)+' · 동영상 '+esc(S.cn)+'</div>';
    h+='<div class="c-ds">'+esc(S.ds)+' <b>...더보기</b>'+(S.lk?'<a href="'+esc(S.lu||'#')+'" target="_blank" rel="noopener">'+esc(S.lk)+'</a>':'')+'</div><div class="c-sub">구독</div>';
    h+='<div class="c-tabs"><div class="on">홈</div><div>동영상</div><div>Shorts</div><div>팟캐스트</div><div>재생목록</div><div>게시물</div></div><i class="c-line" style="top:302px"></i>';
    h+='<div class="c-fth" style="'+bg(S.fth)+'"></div><div class="c-ftt">'+esc(S.ft)+'</div><div class="c-ftm">'+esc(S.fm)+'</div><div class="c-fd">'+DOTS+'</div><i class="c-line" style="top:586px"></i>';
    h+='<div class="c-sc">'+esc(S.sc)+'</div><div class="c-g">'+S.v.map(function(v){return '<div class="c-c"><div class="t" style="'+bg(v.th)+'"></div><div class="tt">'+esc(v.t)+'</div><div class="m">조회수 '+esc(v.vw)+'회 · '+esc(v.ago)+'</div><div class="dt">'+DOTS+'</div></div>'}).join('')+'</div>';
    $('pf').innerHTML=h;fit()}
  function list(){var h='';S.v.forEach(function(v,i){h+='<div class="xc" data-i="'+i+'"><div class="row"><label>제목<input data-f="t" value="'+esc(v.t)+'"></label></div><div class="row"><label>조회수<input data-f="vw" value="'+esc(v.vw)+'"></label><label>올린 시기<input data-f="ago" value="'+esc(v.ago)+'"></label></div><label>썸네일 사진<input type="file" accept="image/*" data-f="th"></label><div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'});$('xlist').innerHTML=h}
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function fit(){var k=Math.min(1,$('pw').clientWidth/1920);$('pf').style.transform='scale('+k+')';$('pf').style.height='auto';$('pf').style.overflow='visible';var base=$('pf').getBoundingClientRect().top,bottom=Math.max(1080,$('pf').scrollHeight);$('pf').querySelectorAll('*').forEach(function(el){var r=el.getBoundingClientRect();bottom=Math.max(bottom,(r.bottom-base)/k)});var h=Math.max(1080,bottom+40);$('pf').style.height=h+'px';$('pw').style.height=h*k+'px'}
  function set(){$('iNm').value=S.nm;$('iHd').value=S.hd;$('iSb').value=S.sb;$('iCn').value=S.cn;$('iDs').value=S.ds;$('iLk').value=S.lk||'';$('iLu').value=S.lu||'';$('iFt').value=S.ft;$('iFm').value=S.fm;$('iSc').value=S.sc}
  function load(r){if(r)try{localStorage.removeItem(STORE)}catch(e){}try{var s=!r&&localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!Array.isArray(S.v))throw 0;if(S.sc==null)S.sc=DEF.sc}catch(e){S=JSON.parse(JSON.stringify(DEF))}set();list();render();fit()}
  var TX={iNm:'nm',iHd:'hd',iSb:'sb',iCn:'cn',iDs:'ds',iLk:'lk',iLu:'lu',iFt:'ft',iFm:'fm',iSc:'sc'};
  Object.keys(TX).forEach(function(id){$(id).addEventListener('input',function(){S[TX[id]]=this.value;persist();render()})});
  function readFile(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
  $('iFth').addEventListener('change',function(){if(this.files[0])readFile(this.files[0],function(d){S.fth=d;persist();render()})});
$('iFth_del').onclick=function(){S.fth=''; $('iFth').value=''; persist(); render();};
  $('iAv').addEventListener('change',function(){if(this.files[0])readFile(this.files[0],function(d){S.av=d;persist();render()})});
$('iAv_del').onclick=function(){S.av=''; $('iAv').value=''; persist(); render();};
  var L=$('xlist'),ix=function(e){return +e.target.closest('.xc').dataset.i};
  L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||e.target.type==='file')return;S.v[ix(e)][f]=e.target.value;persist();render()});
  L.addEventListener('change',function(e){var t=e.target;if(t.dataset.f!=='th'||!t.files[0])return;var o=S.v[ix(e)];readFile(t.files[0],function(d){o.th=d;persist();render()})});
  L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.v,t;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){t=m[i];m[i]=m[i+1];m[i+1]=t}
    persist();list();render()});
  $('addV').onclick=function(){S.v.push({t:'임시 영상 제목입니다',vw:'1만',ago:'1일 전',th:''});persist();list();render()};
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){return html2canvas($('pf'),{scale:4,width:1920,height:Math.max(1080,$('pf').scrollHeight),useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='youtube-channel-pc.png';document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t})
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  addEventListener('resize',fit);
  load(false);
})();
