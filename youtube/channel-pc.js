(function(){
  var $=function(i){return document.getElementById(i)},STORE='editsoceur-youtube-channel-pc-v1',S;
  var DEF={nm:'임시 채널',hd:'@tempchannel',sb:'48.9만명',cn:'301개',ds:'임시 채널 설명입니다. 이 줄은 설명 미리보기 영역입니다.',bn:'',av:'',ft:'임시 대표 영상 제목입니다',fm:'1.9백만회 · 2년 전',v:[{t:'임시 영상 제목입니다',d:'24:51',vw:'62만',ago:'11일 전',th:''},{t:'임시 영상 제목입니다',d:'23:33',vw:'46만',ago:'8일 전',th:''},{t:'임시 영상 제목입니다',d:'20:33',vw:'49만',ago:'6개월 전',th:''}]};
  var SIDE='<div style="height:18px"></div><div class="si">'+'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="1.8"><path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z"/></svg>홈</div><div class="si" style="gap:24px"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="1.8"><path d="M9 3l6 9-6 9M15 12h6"/></svg>Shorts</div>';
  var SUBS=['서재로36','침착맨','ATEEZ','강유미','킥서비스','케인 TV','예예 yehyeh'];
  function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  function bg(u){return u?"background-image:url('"+esc(u)+"')":''}
  function render(){
    var h='<div class="hd"><div class="hm"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg></div><div class="logo"><svg width="44" height="31" viewBox="0 0 44 31"><rect width="44" height="31" rx="9" fill="#ff0033"/><path d="M18 9.5v12l10.5-6z" fill="#fff"/></svg>Premium<small>KR</small></div>'+
      '<div class="sr"><div class="in">여단오</div><div class="bt"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-5-5"/></svg></div></div><div class="mic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="2"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></div><div class="mk">+ 만들기</div><div class="bell"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="2"><path d="M6 9a6 6 0 0 1 12 0c0 6 3 7 3 7H3s3-1 3-7M10 20h4"/></svg><em>7</em></div><div class="av"></div></div>';
    h+='<div class="sd">'+SIDE+'<div class="sec"><div style="font-size:16px;font-weight:600;padding:8px 12px">구독</div>'+SUBS.map(function(n,i){return '<div class="sub"><i></i>'+esc(n)+(i%2===0?'<span class="d"></span>':'')+'</div>'}).join('')+'</div></div>';
    h+='<div class="ch-bn" style="'+bg(S.bn)+'"></div><div class="ch-av" style="'+bg(S.av)+'"></div>';
    h+='<div class="ch-nm">'+esc(S.nm)+'</div><div class="ch-hd">'+esc(S.hd)+' · 구독자 '+esc(S.sb)+' · 동영상 '+esc(S.cn)+'</div>';
    h+='<div class="ch-ds">'+esc(S.ds)+'<span class="l">Instagram</span></div><div class="ch-sub">구독</div>';
    h+='<div class="ch-tabs"><div class="on">홈</div><div>동영상</div><div>Shorts</div><div>재생목록</div><div>게시물</div><div class="sr"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#606060" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-5-5"/></svg></div></div>';
    h+='<div class="fv"><div class="th" style="'+bg(S.v[0]&&S.v[0].th)+'"></div><div class="info"><h3>'+esc(S.ft)+'</h3><p>'+esc(S.fm)+'</p></div></div>';
    h+='<div class="sr-row" style="top:985px">동영상</div>';
    h+='<div class="main" style="left:417px;top:1040px;width:1365px;display:flex;gap:16px">'+S.v.slice(0,3).map(function(v){return '<div style="width:440px"><div class="th" style="aspect-ratio:16/9;border-radius:12px;background:#ddd center/cover;'+bg(v.th).replace(/"/g,'')+'"></div><div style="font-size:15px;font-weight:600;margin-top:8px">'+esc(v.t)+'</div><div style="font-size:13px;color:#606060">조회수 '+esc(v.vw)+'회 · '+esc(v.ago)+'</div></div>'}).join('')+'</div>';
    $('pf').innerHTML=h}
  function list(){var h='';S.v.forEach(function(v,i){h+='<div class="xc" data-i="'+i+'"><div class="row"><label>제목<input data-f="t" value="'+esc(v.t)+'"></label><label>길이<input data-f="d" value="'+esc(v.d)+'"></label></div><div class="row"><label>조회수<input data-f="vw" value="'+esc(v.vw)+'"></label><label>올린 시기<input data-f="ago" value="'+esc(v.ago)+'"></label></div><label>썸네일 사진<input type="file" accept="image/*" data-f="th"></label><div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'});$('xlist').innerHTML=h}
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function fit(){var k=Math.min(1,$('pw').clientWidth/1920);$('pf').style.transform='scale('+k+')';$('pf').style.height='auto';$('pf').style.overflow='visible';var base=$('pf').getBoundingClientRect().top,bottom=Math.max(1080,$('pf').scrollHeight);$('pf').querySelectorAll('*').forEach(function(el){var r=el.getBoundingClientRect();bottom=Math.max(bottom,(r.bottom-base)/k)});var h=Math.max(1080,bottom+40);$('pf').style.height=h+'px';$('pw').style.height=h*k+'px'}
  function set(){$('iNm').value=S.nm;$('iHd').value=S.hd;$('iSb').value=S.sb;$('iCn').value=S.cn;$('iDs').value=S.ds;$('iFt').value=S.ft;$('iFm').value=S.fm}
  function load(r){if(r)try{localStorage.removeItem(STORE)}catch(e){}try{var s=!r&&localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!Array.isArray(S.v))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}set();list();render();fit()}
  var TX={iNm:'nm',iHd:'hd',iSb:'sb',iCn:'cn',iDs:'ds',iFt:'ft',iFm:'fm'};
  Object.keys(TX).forEach(function(id){$(id).addEventListener('input',function(){S[TX[id]]=this.value;persist();render()})});
  function readFile(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
  $('iBn').addEventListener('change',function(){if(this.files[0])readFile(this.files[0],function(d){S.bn=d;persist();render()})});
  $('iAv').addEventListener('change',function(){if(this.files[0])readFile(this.files[0],function(d){S.av=d;persist();render()})});
  var L=$('xlist'),ix=function(e){return +e.target.closest('.xc').dataset.i};
  L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||e.target.type==='file')return;S.v[ix(e)][f]=e.target.value;persist();render()});
  L.addEventListener('change',function(e){var t=e.target;if(t.dataset.f!=='th'||!t.files[0])return;var o=S.v[ix(e)];readFile(t.files[0],function(d){o.th=d;persist();render()})});
  L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.v,t;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){t=m[i];m[i]=m[i+1];m[i+1]=t}
    persist();list();render()});
  $('addV').onclick=function(){S.v.push({t:'임시 영상 제목입니다',d:'0:00',vw:'1만',ago:'1일 전',th:''});persist();list();render()};
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){return html2canvas($('pf'),{scale:2,width:1920,height:Math.max(1080,$('pf').scrollHeight),useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='youtube-channel-pc.png';document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t})
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  addEventListener('resize',fit);
  load(false);
})();
