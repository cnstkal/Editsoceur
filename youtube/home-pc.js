(function(){
  var $=function(i){return document.getElementById(i)},STORE='editsoceur-youtube-home-pc-v1',S;
  var DEF={sr:'검색',av:'',bl:'0',chips:['전체','음악','믹스','라이브','요리','최근에 업로드된 동영상','감상한 동영상','새로운 맞춤 동영상'],v:[
    {th:'',d:'3:27',t:'임시 영상 제목입니다',c:'임시 채널',vw:'58만',ago:'3개월 전'},
    {th:'',d:'32:55',t:'임시 영상 제목입니다. 두 줄까지 보입니다',c:'임시 채널',vw:'49만',ago:'4개월 전'},
    {th:'',d:'9:30',t:'임시 영상 제목입니다',c:'임시 채널',vw:'12만',ago:'1주 전'},
    {th:'',d:'9:24',t:'임시 영상 제목입니다',c:'임시 채널',vw:'3만',ago:'2일 전'},
    {th:'',d:'10:12',t:'임시 영상 제목입니다',c:'임시 채널',vw:'8천',ago:'5일 전'},
    {th:'',d:'4:05',t:'임시 영상 제목입니다',c:'임시 채널',vw:'21만',ago:'1개월 전'}]};
  var IC={
    menu:'<svg width="24" height="24" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    search:'<svg width="22" height="22" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-5-5"/></svg>',
    mic:'<svg width="22" height="22" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    plus:'<svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 4v16M4 12h16"/></svg>',
    bell:'<svg width="26" height="26" viewBox="0 0 24 24"><path d="M6 9a6 6 0 0 1 12 0c0 6 3 7 3 7H3s3-1 3-7M10 20h4"/></svg>',
    home:'<svg width="24" height="24" viewBox="0 0 24 24"><path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z"/></svg>',
    shorts:'<svg width="24" height="24" viewBox="0 0 24 24"><path d="M9 3l6 9-6 9M15 12h6"/></svg>',
    down:'<svg width="24" height="24" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>'};
  function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  function render(){
    var h='<div class="hd"><div class="hm">'+IC.menu+'</div><div class="logo"><svg width="44" height="31" viewBox="0 0 44 31"><rect width="44" height="31" rx="9" fill="#ff0033"/><path d="M18 9.5v12l10.5-6z" fill="#fff"/></svg>Premium<small>KR</small></div>'+
      '<div class="sr"><div class="in">'+esc(S.sr)+'</div><div class="bt">'+IC.search+'</div></div><div class="mic">'+IC.mic+'</div>'+
      '<div class="mk">'+IC.plus+'만들기</div><div class="bell">'+IC.bell+'<em>0</em>'+'</div><div class="av" style="'+(S.av?"background-image:url('"+esc(S.av)+"')":'')+'"></div></div>';
    h+='<div class="sd"><div style="height:18px"></div><div class="si on">'+IC.home+'홈</div><div class="si">'+IC.shorts+'Shorts</div>'+
      '<div class="sec"><div style="font-size:16px;font-weight:600;padding:8px 12px">구독</div>'+['서재로36','침착맨','ATEEZ','강유미','킥서비스','케인 TV','예예 yehyeh'].map(function(n,i){return '<div class="sub"><i></i>'+esc(n)+(i%2===0?'<span class="d"></span>':'')+'</div>'}).join('')+'</div></div>';
    h+='<div class="main"><div class="chips">'+S.chips.map(function(c,i){return '<span class="chip'+(i===0?' on':'')+'">'+esc(c)+'</span>'}).join('')+'</div><div class="grid">'+
      S.v.map(function(v){return '<div><div class="th" style="'+(v.th?"background-image:url('"+esc(v.th)+"')":'')+'"><span class="dur">'+esc(v.d)+'</span></div><div class="meta"><i></i><div><div class="tt">'+esc(v.t)+'</div><div class="ch">'+esc(v.c)+'<br>조회수 '+esc(v.vw)+'회 · '+esc(v.ago)+'</div></div></div></div>'}).join('')+'</div></div>';
    $('pf').innerHTML=h;fit()}
  var CAT=[];
  function list(){var h='';S.v.forEach(function(v,i){
    h+='<div class="xc" data-i="'+i+'"><div class="row"><label>제목<input data-f="t" value="'+esc(v.t)+'"></label><label>채널<input data-f="c" value="'+esc(v.c)+'"></label></div><div class="row"><label>길이<input data-f="d" value="'+esc(v.d)+'"></label><label>조회수<input data-f="vw" value="'+esc(v.vw)+'"></label><label>올린 시기<input data-f="ago" value="'+esc(v.ago)+'"></label></div><label>썸네일 사진<input type="file" accept="image/*" data-f="th"></label><div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'});
    $('xlist').innerHTML=h}
  function renderChips(){var h='';S.chips.forEach(function(c,i){h+='<div class="xc" data-ci="'+i+'"><label>카테고리 '+(i+1)+'<input data-chip value="'+esc(c)+'"></label><button type="button" class="xb" data-delchip>삭제</button></div>'});$('chipList').innerHTML=h}
  $('chipList').addEventListener('input',function(e){if(e.target.hasAttribute('data-chip')){S.chips[+e.target.closest('[data-ci]').dataset.ci]=e.target.value;persist();render()}});$('chipList').addEventListener('click',function(e){if(e.target.hasAttribute('data-delchip')){S.chips.splice(+e.target.closest('[data-ci]').dataset.ci,1);persist();renderChips();render()}});$('addChip').onclick=function(){S.chips.push('새 카테고리');persist();renderChips();render()};
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function fit(){var k=Math.min(1,$('pw').clientWidth/1920);$('pf').style.transform='scale('+k+')';$('pf').style.height='auto';$('pf').style.overflow='visible';var base=$('pf').getBoundingClientRect().top,bottom=Math.max(1080,$('pf').scrollHeight);$('pf').querySelectorAll('*').forEach(function(el){var r=el.getBoundingClientRect();bottom=Math.max(bottom,(r.bottom-base)/k)});var h=Math.max(1080,bottom+40);$('pf').style.height=h+'px';$('pw').style.height=h*k+'px'}
  function set(){$('iSr').value=S.sr;$('iAv').value=S.av;renderChips()}
  function load(r){if(r)try{localStorage.removeItem(STORE)}catch(e){}try{var s=!r&&localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!Array.isArray(S.v))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}set();list();render();fit()}
  function glob(){S.sr=$('iSr').value;S.av=$('iAv').value;S.bl='0';persist();render()}
  ['iSr','iAv'].forEach(function(id){$(id).addEventListener('input',glob)});
  var L=$('xlist'),ix=function(e){return +e.target.closest('.xc').dataset.i};
  L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||e.target.type==='file')return;S.v[ix(e)][f]=e.target.value;persist();render()});
  L.addEventListener('change',function(e){var t=e.target,f=t.dataset.f;if(f!=='th'||!t.files[0])return;var o=S.v[ix(e)],r=new FileReader();r.onload=function(){o.th=r.result;persist();render()};r.readAsDataURL(t.files[0])});
  L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.v,t;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){t=m[i];m[i]=m[i+1];m[i+1]=t}
    persist();list();render()});
  $('addV').onclick=function(){S.v.push({th:'',d:'0:00',t:'임시 영상 제목입니다',c:'임시 채널',vw:'1만',ago:'1일 전'});persist();list();render()};
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){return html2canvas($('pf'),{scale:2,width:1920,height:$('pf').scrollHeight,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='youtube-home-pc.png';document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t})
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  addEventListener('resize',fit);
  load(false);
})();
