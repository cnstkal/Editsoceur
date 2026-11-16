(function(){
  var $=function(i){return document.getElementById(i)},STORE='editsoceur-twitter-timeline-pc-v1',G='#536471',S;
  var DEF={tabs:['추천','팔로잉'],me:{n:'사용자',h:'@username'},t:[
    {n:'사용자',h:'@username',time:'1초',x:'임시 내용입니다',lock:true,rtby:'',r:'',rt:'',lk:'',vw:''},
    {n:'사용자',h:'@username',time:'1분',x:'임시 내용입니다. 이 줄은 길어지면 자동으로 줄바꿈됩니다.',lock:false,rtby:'',r:'',rt:'',lk:'1',vw:'27'},
    {n:'사용자',h:'@username',time:'11시간',x:'임시 내용입니다',lock:false,rtby:'사용자',r:'',rt:'',lk:'',vw:''}]};
  function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  function sv(d,w,s,c,f){return '<svg width="'+(s||26)+'" height="'+(s||26)+'" viewBox="0 0 24 24" fill="'+(f||'none')+'" stroke="'+(c||'#0f1419')+'" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>'}
  var XL='<svg width="44" height="44" viewBox="0 0 24 24"><path d="M18.244 2.250h3.308l-7.227 8.260 8.502 11.240H16.170l-5.214-6.817L4.990 21.750H1.680l7.730-8.835L1.254 2.250H8.080l4.713 6.231zm-1.161 17.520h1.833L7.084 4.126H5.117z"/></svg>',
    LK='<svg width="22" height="22" viewBox="0 0 24 24" fill="#0f1419"><path d="M7 10V7.500a5 5 0 0 1 10 0V10h1.500a1.500 1.500 0 0 1 1.500 1.500v8a1.500 1.500 0 0 1-1.500 1.500h-13A1.500 1.500 0 0 1 4 19.500v-8A1.500 1.500 0 0 1 5.500 10zm2 0h6V7.500a3 3 0 0 0-6 0z"/></svg>',
    GK='<circle cx="12" cy="12" r="9"/><path d="M6.500 17.500 17.500 6.500"/>',
    DT='<circle cx="5" cy="12" r="1.200"/><circle cx="12" cy="12" r="1.200"/><circle cx="19" cy="12" r="1.200"/>',
    P=['<path d="M12 3a9 9 0 1 0 4.500 16.800L21 21l-1.200-4.500A9 9 0 0 0 12 3z"/>','<path d="m17 2.500 3.500 3.500-3.500 3.500M4 11V9.500A3.500 3.500 0 0 1 7.500 6h13M7 21.500 3.500 18 7 14.500M20 13v1.500a3.500 3.500 0 0 1-3.500 3.500h-13"/>','<path d="M12 21s-8.500-5.200-8.500-11A4.800 4.800 0 0 1 12 7.200 4.800 4.800 0 0 1 20.500 10c0 5.800-8.500 11-8.500 11z"/>','<path d="M5 20V11M10 20V4M15 20V13M20 20V8"/>','<path d="M6 3h12v18l-6-4.500L6 21z"/>','<path d="M12 15V3M7.500 7.500 12 3l4.500 4.500M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>'],
    N=[['<path d="M12 2.500 2.500 10v10a1.500 1.500 0 0 0 1.500 1.500h5v-6.500h6v6.500h5a1.500 1.500 0 0 0 1.500-1.500V10z"/>','홈',1],['<circle cx="10.500" cy="10.500" r="7"/><path d="m21 21-5.500-5.500"/>','탐색하기',0],['<path d="M18 9a6 6 0 0 0-12 0c0 6-2.500 7.500-2.500 7.500h17S18 15 18 9zM10 20a2 2 0 0 0 4 0"/>','알림',0],['<circle cx="9" cy="8" r="4"/><path d="M2 21c0-5 4-7 7-7s7 2 7 7M19 7v6M16 10h6"/>','팔로우하기',0],['<path d="M12 3a9 9 0 1 0 4.500 16.800L21 21l-1.200-4.500A9 9 0 0 0 12 3z"/>','채팅',0],['<path d="M5 3l4 1 1 5-2 2c1 3 3 5 6 6l2-2 5 1 1 4c-1 3-4 3-7 2C8 20 3 14 3 7c0-2 1-4 2-4z"/>','통화',0],[GK,'Grok',0],['<circle cx="12" cy="12" r="10"/><path d="M7.500 12h.1M12 12h.1M16.500 12h.1"/>','더 보기',0]];
  function render(){
    var h='<span class="lg">'+XL.replace('44','34').replace('44','34')+'</span>';
    N.forEach(function(n,i){h+='<div class="pn'+(i===1?' on':'')+(n[2]?' hm':'')+'" style="top:'+(88+i*69)+'px">'+sv(n[0],n[2]?0:2.2,30,'#0f1419',n[2]?'#0f1419':'none')+'<span>'+n[1]+'</span></div>'});
    if(!window.getXCompose||window.getXCompose())h+='<div class="pb">게시하기</div>';
    h+='<div class="me"><i class="pa" style="width:55px;height:55px"></i><div><b>'+esc(S.me.n)+LK+'</b>'+esc(S.me.h)+'</div><span class="dt">'+sv(DT,2,26,'#0f1419','#0f1419')+'</span></div>';
    $('pl').innerHTML=h;
    for(var i=0;i<2;i++){$('pT'+i).textContent=S.tabs[i];$('pT'+i).className=i===1?'on':''}
    $('pPlus').innerHTML=window.getXCompose&&window.getXCompose()?sv('<path d="M12 4v16M4 12h16"/>',2.2,26):'';
    $('cpA').className='pa';
    $('cpI').innerHTML=['<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="1.500"/><path d="m4 18 5-5 4 4 3-3 4 4"/>','<rect x="3" y="5" width="18" height="14" rx="3"/>','<path d="M4 6h2M10 6h10M4 12h2M10 12h10M4 18h2M10 18h10"/>','<circle cx="12" cy="12" r="9"/><path d="M8 14s1.500 3 4 3 4-3 4-3M9 9.500h.1M15 9.500h.1"/>','<rect x="3" y="4" width="18" height="17" rx="3"/><path d="M3 9h18M8 2v4M16 2v4"/>','<path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.500"/>','<path d="M5 3v18M5 4h14l-4 5 4 5H5"/>'].map(function(d){return sv(d,2,28,'#1d9bf0')}).join('');
    $('pS').innerHTML=sv(N[1][0],2.2,22,G)+'검색';
    var t='<h2>무슨 일이 일어나고 있나요?</h2>';['국내 선예매','다른 노래','#임시트렌드','ATEEZ','오늘의 추천','실시간 화제'].forEach(function(x){t+='<div class="tr">대한민국에서 트렌드 중<b>'+x+'</b><i>'+sv(DT,2,24,G,G)+'</i></div>'});
    $('pTr').innerHTML=t+'<div style="color:#1d9bf0;font-size:21px;margin:36px 0 6px">더 보기</div>';
    $('fl0').innerHTML=sv(GK,2,34);$('fl1').innerHTML=sv(P[0],2,34);
    var L='';S.t.forEach(function(x){
      var v=[x.r,x.rt,x.lk,x.vw,'',''],k='';P.forEach(function(p,i){k+='<span>'+sv(p,1.900,22,G)+(v[i]?'<em style="font-style:normal">'+esc(v[i])+'</em>':'')+'</span>'});
      L+='<div class="pw1'+(x.rtby?' rt':'')+'">'+(x.rtby?'<div class="rb">'+sv(P[1],2.200,18,G)+esc(x.rtby)+' 님이 재게시함</div>':'')+'<i class="pa" style="width:55px;height:55px;'+(x.av?"background-image:url('"+x.av+"')":'')+'"></i><div class="pn1"><b>'+esc(x.n)+'</b>'+(x.lock?LK:'')+'<span>'+esc(x.h)+' · '+esc(x.time)+'</span><span class="mr">'+sv(GK,2,22,G)+sv(DT,2,24,G,G)+'</span></div><div class="px">'+esc(x.x)+'</div><div class="pk">'+k+'</div></div>'});
    $('pL').innerHTML=L}
  function list(){var h='';S.t.forEach(function(x,i){
    h+='<div class="xc" data-i="'+i+'"><div class="row"><label>이름<input data-f="n" value="'+esc(x.n)+'"></label><label>아이디<input data-f="h" value="'+esc(x.h)+'"></label><label>시간<input data-f="time" value="'+esc(x.time)+'"></label></div><label>내용<input data-f="x" value="'+esc(x.x)+'"></label><label>재게시한 사람(비우면 숨김)<input data-f="rtby" value="'+esc(x.rtby)+'"></label><div class="row"><label>답글<input data-f="r" value="'+esc(x.r)+'"></label><label>재게시<input data-f="rt" value="'+esc(x.rt)+'"></label><label>마음<input data-f="lk" value="'+esc(x.lk)+'"></label><label>조회수<input data-f="vw" value="'+esc(x.vw)+'"></label></div><div class="row" style="align-items:center"><label>프로필 사진<input type="file" accept="image/*" data-f="av"></label><label class="xk"><input type="checkbox" data-f="lock"'+(x.lock?' checked':'')+'> 자물쇠</label></div><div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'});
    $('xlist').innerHTML=h}
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function fit(){var k=Math.min(1,$('pw').clientWidth/1920);$('pf').style.transform='scale('+k+')';$('pf').style.height='auto';$('pf').style.overflow='visible';var base=$('pf').getBoundingClientRect().top,bottom=Math.max(1080,$('pf').scrollHeight);$('pf').querySelectorAll('*').forEach(function(el){var r=el.getBoundingClientRect();bottom=Math.max(bottom,(r.bottom-base)/k)});var h=Math.max(1080,bottom+40);$('pf').style.height=h+'px';$('pw').style.height=h*k+'px'}
  function set(){$('iT0').value=S.tabs[0];$('iT1').value=S.tabs[1];$('iMn').value=S.me.n;$('iMh').value=S.me.h;$('iCompose').checked=window.getXCompose?window.getXCompose():true}
  function load(r){if(r)try{localStorage.removeItem(STORE)}catch(e){}try{var s=!r&&localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!Array.isArray(S.t)||!S.me)throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}set();list();render();fit()}
  function glob(){S.tabs=[$('iT0').value,$('iT1').value];S.me={n:$('iMn').value,h:$('iMh').value};persist();render()}
  $('iCompose').addEventListener('change',function(){if(window.setXCompose)window.setXCompose(this.checked);render()});
  ['iT0','iT1','iMn','iMh'].forEach(function(id){$(id).addEventListener('input',glob)});
  var L=$('xlist'),ix=function(e){return +e.target.closest('.xc').dataset.i};
  L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||e.target.type==='file'||e.target.type==='checkbox')return;S.t[ix(e)][f]=e.target.value;persist();render()});
  L.addEventListener('change',function(e){var t=e.target,f=t.dataset.f;if(!f)return;var o=S.t[ix(e)];
    if(t.type==='checkbox'){o.lock=t.checked;persist();render()}else if(t.type==='file'&&t.files[0]){var r=new FileReader();r.onload=function(){o.av=r.result;persist();render()};r.readAsDataURL(t.files[0])}});
  L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.t,t;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){t=m[i];m[i]=m[i+1];m[i+1]=t}
    persist();list();render()});
  $('addT').onclick=function(){var l=S.t[S.t.length-1]||{n:'사용자',h:'@username'};S.t.push({n:l.n,h:l.h,lock:l.lock,av:l.av,time:'1분',x:'',rtby:'',r:'',rt:'',lk:'',vw:''});persist();list();render()};
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){return html2canvas($('pf'),{scale:2,width:1920,height:Math.max(1080,$('pf').scrollHeight),useCORS:true,backgroundColor:'#fff',logging:false,onclone:function(d){d.getElementById('pf').style.transform='none';var w=d.getElementById('pw');w.style.height='auto';w.style.overflow='visible'}})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='x-timeline-pc.png';document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t})
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  addEventListener('resize',fit);
  load(false);
})();
