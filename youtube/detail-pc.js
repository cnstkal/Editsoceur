(function(){
  var $=function(i){return document.getElementById(i)},STORE='editsoceur-youtube-detail-pc-v1',S;
  var DEF={th:'',ti:'임시 영상 제목입니다',cn:'임시 채널',sb:'333만명',lk:'2.7만',vw:'415만회',ag:'2년 전',ds:'임시 설명입니다\n임시 설명입니다',more:'더보기',cm:'1,007',
    c:[{n:'@tempuser',ag:'2년 전',t:'임시 댓글입니다',l:'1.2만',r:'답글 41개'},{n:'@tempuser2',ag:'2년 전',t:'임시 댓글입니다',l:'8.9천',r:'답글 30개'}],
    r:[{t:'임시 추천 영상 제목입니다',c:'임시 채널',vw:'224만',ag:'2년 전',d:'42:42',th:''},{t:'임시 추천 영상 제목입니다',c:'임시 채널',vw:'231만',ag:'2년 전',d:'24:56',th:''},{t:'임시 추천 영상 제목입니다',c:'임시 채널',vw:'20만',ag:'1일 전',d:'22:56',th:''},{t:'임시 추천 영상 제목입니다',c:'임시 채널',vw:'143만',ag:'1개월 전',d:'53:06',th:''}]};
  function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  function bg(u){return u?"background-image:url('"+esc(u)+"')":''}
  var I={
    menu:'<svg width="26" height="26" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    s:'<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-5-5"/></svg>',
    mic:'<svg width="24" height="24" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    bell:'<svg width="28" height="28" viewBox="0 0 24 24"><path d="M6 9a6 6 0 0 1 12 0c0 6 3 7 3 7H3s3-1 3-7M10 20h4"/></svg>',
    bl:'<svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 9a6 6 0 0 1 12 0c0 6 3 7 3 7H3s3-1 3-7"/></svg>',
    up:'<svg width="24" height="24" viewBox="0 0 24 24"><path d="M7 10v11H3V10zM7 10l4-7a2 2 0 0 1 2 2v3h6a2 2 0 0 1 2 2l-2 8a2 2 0 0 1-2 2H7"/></svg>',
    dn:'<svg width="24" height="24" viewBox="0 0 24 24"><path d="M17 14V3h4v11zM17 14l-4 7a2 2 0 0 1-2-2v-3H5a2 2 0 0 1-2-2l2-8a2 2 0 0 1 2-2h10"/></svg>',
    sh:'<svg width="24" height="24" viewBox="0 0 24 24"><path d="M14 5l7 7-7 7M21 12H3"/></svg>',
    cl:'<svg width="22" height="22" viewBox="0 0 24 24"><path d="M9 4h6l1 3h3v13H5V7h3z"/><path d="M12 10v6M9 13h6"/></svg>',
    sv:'<svg width="24" height="24" viewBox="0 0 24 24"><path d="M5 3h14v18l-7-5-7 5z"/></svg>',
    more:'<svg width="24" height="24" viewBox="0 0 24 24" style="fill:#0f0f0f;stroke:none"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
    chk:'<svg width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#606060" stroke="none"/><path d="m8 12 3 3 5-6" stroke="#fff" stroke-width="2.5"/></svg>',
    sort:'<svg width="24" height="24" viewBox="0 0 24 24"><path d="M3 6h18M6 12h12M10 18h4"/></svg>',
    dots:'<svg width="24" height="24" viewBox="0 0 24 24" style="fill:#0f0f0f;stroke:none"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>',
    tri:'<svg width="10" height="10" viewBox="0 0 24 24" style="fill:#0f0f0f;stroke:none;display:inline-block"><path d="M3 8l9 9 9-9z"/></svg>',
    thumb:'<svg width="22" height="22" viewBox="0 0 24 24"><path d="M7 10v11H3V10zM7 10l4-7a2 2 0 0 1 2 2v3h6a2 2 0 0 1 2 2l-2 8a2 2 0 0 1-2 2H7"/></svg>'
  };
  function render(){
    var h='<div class="hd"><div class="hm">'+I.menu+'</div><div class="logo"><svg width="44" height="31" viewBox="0 0 44 31"><rect width="44" height="31" rx="9" fill="#ff0033"/><path d="M18 9.5v12l10.5-6z" fill="#fff"/></svg>Premium<small>KR</small></div>'+
      '<div class="sr"><div class="in">검색</div><div class="bt">'+I.s+'</div></div><div class="mic">'+I.mic+'</div><div class="mk">+ 만들기</div><div class="bell">'+I.bell+'<em>7</em></div><div class="av"></div></div>';
    h+='<div class="vd" style="'+bg(S.th)+'"></div>';
    h+='<div class="ti">'+esc(S.ti)+'</div>';
    h+='<div class="ch"><div class="pf"></div><div class="nm"><b>'+esc(S.cn)+I.chk+'</b><span>구독자 '+esc(S.sb)+'</span></div><div class="sb" style="margin-left:24px">'+I.bl+'</div><div class="sbt">구독</div>'+
      '<div class="acts"><div class="pill">'+I.up+esc(S.lk)+'<i></i>'+I.dn+'</div><div class="pill">'+I.sh+'공유</div><div class="pill round">'+I.cl+'</div><div class="pill round">'+I.sv+'</div><div class="pill round">'+I.more+'</div></div></div>';
    h+='<div class="ds"><b>조회수 '+esc(S.vw)+' · '+esc(S.ag)+'</b><br>'+esc(S.ds)+'<span class="more">'+esc(S.more)+'</span></div>';
    h+='<div class="cm"><h4>댓글 '+esc(S.cm)+'<span>'+I.sort+'정렬 기준</span></h4><div class="add"><div class="pf"></div><div>댓글 추가...</div></div>';
    S.c.forEach(function(c){h+='<div class="c1"><div class="pf"></div><div class="b"><div class="h"><b>'+esc(c.n)+'</b>'+esc(c.ag)+'</div><div class="t">'+esc(c.t)+'</div><div class="l"><span>'+I.thumb+' '+esc(c.l)+'</span><span>'+I.dn+'</span><span>답글</span></div><div style="margin-top:12px;font-size:15px;font-weight:600">'+esc(c.r)+' '+I.tri+'</div></div><div>'+I.dots+'</div></div>'});
    h+='</div>';
    h+='<div class="rl"><div class="rc"><span class="c on">모두</span><span class="c">임시 칩</span><span class="c">하하</span><span class="c">관련 콘텐츠</span><span class="c">추천</span></div>';
    S.r.forEach(function(r){h+='<div class="ri"><div class="th" style="'+bg(r.th)+'"><span class="dur">'+esc(r.d)+'</span></div><div><div class="tx">'+esc(r.t)+'</div><div class="m">'+esc(r.c)+'<br>조회수 '+esc(r.vw)+'회 · '+esc(r.ag)+'</div></div></div>'});
    h+='</div>';
    $('pf').innerHTML=h;
    $('pf').style.height=(S.c.length>2?1900:1700)+'px';
    fit()}
  function list(){var c='',r='';S.c.forEach(function(x,i){c+='<div class="xc" data-i="'+i+'" data-k="c"><div class="row"><label>이름<input data-f="n" value="'+esc(x.n)+'"></label><label>시간<input data-f="ag" value="'+esc(x.ag)+'"></label></div><label>내용<input data-f="t" value="'+esc(x.t)+'"></label><div class="row"><label>좋아요<input data-f="l" value="'+esc(x.l)+'"></label><label>답글 문구<input data-f="r" value="'+esc(x.r)+'"></label></div><div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'});
    S.r.forEach(function(x,i){r+='<div class="xc" data-i="'+i+'" data-k="r"><div class="row"><label>제목<input data-f="t" value="'+esc(x.t)+'"></label><label>채널<input data-f="c" value="'+esc(x.c)+'"></label></div><div class="row"><label>길이<input data-f="d" value="'+esc(x.d)+'"></label><label>조회수<input data-f="vw" value="'+esc(x.vw)+'"></label><label>시기<input data-f="ag" value="'+esc(x.ag)+'"></label></div><label>썸네일 사진<input type="file" accept="image/*" data-f="th"></label><div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'});
    $('xc').innerHTML=c;$('xr').innerHTML=r}
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function fit(){var k=Math.min(1,$('pw').clientWidth/1920);$('pf').style.transform='scale('+k+')';$('pw').style.height=$('pf').offsetHeight*k+'px'}
  function set(){$('iTi').value=S.ti;$('iCn').value=S.cn;$('iSb').value=S.sb;$('iLk').value=S.lk;$('iVw').value=S.vw;$('iAg').value=S.ag;$('iDs').value=S.ds;$('iCm').value=S.cm}
  function load(r){if(r)try{localStorage.removeItem(STORE)}catch(e){}try{var s=!r&&localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!Array.isArray(S.c))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}set();list();render()}
  var TX={iTi:'ti',iCn:'cn',iSb:'sb',iLk:'lk',iVw:'vw',iAg:'ag',iDs:'ds',iCm:'cm'};
  Object.keys(TX).forEach(function(id){$(id).addEventListener('input',function(){S[TX[id]]=this.value;persist();render()})});
  function rf(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
  $('iTh').addEventListener('change',function(){if(this.files[0])rf(this.files[0],function(d){S.th=d;persist();render()})});
  function box(k){return function(e){var f=e.target.dataset.f,i=+e.target.closest('.xc').dataset.i,o=S[k][i];if(!f)return;if(e.target.type==='file'){if(e.target.files[0])rf(e.target.files[0],function(d){o.th=d;persist();render()});return}o[f]=e.target.value;persist();render()}}
  $('xc').addEventListener('input',box('c'));$('xr').addEventListener('input',box('r'));
  $('xr').addEventListener('change',box('r'));
  function clk(k){return function(e){var a=e.target.closest('[data-a]');if(!a)return;var i=+a.closest('.xc').dataset.i,m=S[k],t;
    if(a.dataset.a==='x')m.splice(i,1);else if(a.dataset.a==='u'&&i>0){t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a.dataset.a==='d'&&i<m.length-1){t=m[i];m[i]=m[i+1];m[i+1]=t}
    persist();list();render()}}
  $('xc').addEventListener('click',clk('c'));$('xr').addEventListener('click',clk('r'));
  $('addC').onclick=function(){S.c.push({n:'@tempuser',ag:'1일 전',t:'임시 댓글입니다',l:'1',r:'답글 0개'});persist();list();render()};
  $('addR').onclick=function(){S.r.push({t:'임시 추천 영상 제목입니다',c:'임시 채널',vw:'1만',ag:'1일 전',d:'0:00',th:''});persist();list();render()};
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){return html2canvas($('pf'),{scale:2,width:1920,height:$('pf').offsetHeight,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='youtube-detail-pc.png';document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t})
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  addEventListener('resize',fit);
  load(false);
})();
