(function(){
  var $=function(i){return document.getElementById(i)};
  var T=['5초','9초','12초','16초','19초','23초','27초','31초'],X=['오늘 날씨 진짜 좋다','점심 뭐 먹지','방금 일어남','퇴근하고 싶다','커피 한 잔 하러 가야지','이 노래 너무 좋아','다들 뭐해?','오늘도 수고했어'];
  var DEF={tabs:['추천','팔로우 중','yuyu'],act:'1',dot:true,badge:'1',t:T.map(function(t,i){return{n:'사용자',h:'@username',time:t,x:X[i],lock:true}})};
  var G='#536471',
    LK='<svg width="18" height="18" viewBox="0 0 24 24"><path d="M7 10V7.500a5 5 0 0 1 10 0V10h1.500a1.500 1.500 0 0 1 1.500 1.500v8a1.500 1.500 0 0 1-1.500 1.500h-13A1.500 1.500 0 0 1 4 19.500v-8A1.500 1.500 0 0 1 5.500 10zm2 0h6V7.500a3 3 0 0 0-6 0z"/></svg>',
    XL='<svg width="22" height="22" viewBox="0 0 24 24"><path d="M18.244 2.250h3.308l-7.227 8.260 8.502 11.240H16.170l-5.214-6.817L4.990 21.750H1.680l7.730-8.835L1.254 2.250H8.080l4.713 6.231zm-1.161 17.520h1.833L7.084 4.126H5.117z"/></svg>',
    ic=function(d){return '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="'+G+'" stroke-width="1.900" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>'},
    AC='<div class="xac"><span>'+ic('<path d="M12 3a9 9 0 1 0 4.500 16.800L21 21l-1.200-4.500A9 9 0 0 0 12 3z"/>')+'</span><span>'+ic('<path d="m17 2.500 3.500 3.500-3.500 3.500M4 11V9.500A3.500 3.500 0 0 1 7.500 6h13M7 21.500 3.500 18 7 14.500M20 13v1.500a3.500 3.500 0 0 1-3.500 3.500h-13"/>')+'</span><span>'+ic('<path d="M12 21s-8.500-5.200-8.500-11A4.800 4.800 0 0 1 12 7.200 4.800 4.800 0 0 1 20.500 10c0 5.800-8.500 11-8.500 11z"/>')+'</span><span>'+ic('<path d="M5 20V11M10 20V4M15 20V13M20 20V8"/>')+'</span><span>'+ic('<path d="M6 3h12v18l-6-4.500L6 21z"/>')+'</span><span>'+ic('<path d="M12 15V3M7.500 7.500 12 3l4.500 4.500M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>')+'</span></div>';
  var S,me;
  function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  function bgi(u){return u?"background-image:url('"+u+"')":''}
  function render(){
    $('xMe').style.cssText=bgi(me);
    for(var i=0;i<3;i++){var e=$('xT'+i);e.textContent=S.tabs[i];e.className='xtab'+(String(i)===S.act?' on':'')}
    $('xD1').style.display=$('xD2').style.display=S.dot?'':'none';
    $('xBg').style.display=S.badge?'':'none';$('xBg').textContent=S.badge;
    var h='';S.t.forEach(function(x){h+='<div class="xw"><i class="xa" style="'+bgi(x.av)+'"></i><div class="xc2"><div class="xn"><b>'+esc(x.n)+'</b>'+(x.lock?LK:'')+'<span>'+esc(x.h)+' · '+esc(x.time)+'</span>'+XL+'</div><div class="xtx">'+esc(x.x)+'</div>'+AC+'</div></div>'});
    $('xL').innerHTML=h}
  function list(){var h='';S.t.forEach(function(x,i){
    h+='<div class="xc" data-i="'+i+'"><div class="row"><label>이름<input data-f="n" value="'+esc(x.n)+'"></label><label>아이디<input data-f="h" value="'+esc(x.h)+'"></label><label>시간<input data-f="time" value="'+esc(x.time)+'"></label></div>'+
    '<label>내용<input data-f="x" value="'+esc(x.x)+'"></label><div class="row" style="align-items:center"><label class="file">프로필 사진<input type="file" accept="image/*" data-f="av"></label><label class="xk"><input type="checkbox" data-f="lock"'+(x.lock?' checked':'')+'> 자물쇠</label></div>'+
    '<div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'});
    $('xlist').innerHTML=h}
  function set(){for(var i=0;i<3;i++)$('iT'+i).value=S.tabs[i];$('iAct').value=S.act;$('iBadge').value=S.badge;$('iDot').checked=S.dot}
  function load(){S=JSON.parse(JSON.stringify(DEF));me=null;$('iMe').value='';set();list();render()}
  function rd(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
  $('iMe').onchange=function(){if(this.files[0])rd(this.files[0],function(d){me=d;render()})};
  function glob(){for(var i=0;i<3;i++)S.tabs[i]=$('iT'+i).value;S.act=$('iAct').value;S.badge=$('iBadge').value;S.dot=$('iDot').checked;render()}
  ['iT0','iT1','iT2','iBadge','iDot','iAct'].forEach(function(id){$(id).addEventListener('input',glob);$(id).addEventListener('change',glob)});
  var L=$('xlist'),ix=function(e){return +e.target.closest('.xc').dataset.i};
  L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||e.target.type==='file'||e.target.type==='checkbox')return;S.t[ix(e)][f]=e.target.value;render()});
  L.addEventListener('change',function(e){var t=e.target,f=t.dataset.f;if(!f)return;var o=S.t[ix(e)];
    if(t.type==='checkbox'){o.lock=t.checked;render()}else if(t.type==='file'&&t.files[0])rd(t.files[0],function(d){o.av=d;render()})});
  L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.t;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
    list();render()});
  $('addT').onclick=function(){var l=S.t[S.t.length-1]||{n:'사용자',h:'@username',lock:true};S.t.push({n:l.n,h:l.h,lock:l.lock,av:l.av,time:'1분',x:''});list();render()};
  $('reset').onclick=load;
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return html2canvas($('xf'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='x-timeline.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
  load();
})();
