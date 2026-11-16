(function(){
  var $=function(i){return document.getElementById(i)},STORE='pin_home_v1';
  var H={s:.7,n:1.0,t:1.35,l:1.8},DOTS='<svg width="24" height="24" viewBox="0 0 24 24" fill="#111"><circle cx="5" cy="12" r="1.800"/><circle cx="12" cy="12" r="1.800"/><circle cx="19" cy="12" r="1.800"/></svg>';
  var DEF={dot:true,nav:false,p:[['',  'l'],['핀 제목','t'],['','n'],['핀 제목','l'],['','t'],['핀 제목','n']].map(function(a){return{x:a[0],h:a[1],img:''}})};
  var S;
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function render(){
    var c=['',''];
    S.p.forEach(function(p,i){
      c[i%2]+='<div class="pin"><div class="pi" style="padding-top:'+(H[p.h]||1)*100+'%'+(p.img?';background-image:url('+p.img+')':'')+'"></div><div class="pt"><span>'+esc(p.x)+'</span>'+DOTS+'</div></div>'});
    $('pc0').innerHTML=c[0];$('pc1').innerHTML=c[1];
    $('pDot').style.display=S.dot?'block':'none';$('pnav').classList.toggle('on',!!S.nav)}
  function list(){
    $('plist').innerHTML=S.p.map(function(p,i){
      return '<div class="pe" data-i="'+i+'"><label>제목(비우면 숨김)<input data-f="x" value="'+esc(p.x)+'"></label>'+
      '<div class="row"><label class="file" style="flex:2">이미지<input type="file" accept="image/*" data-f="img"></label>'+
      '<label style="flex:1">높이<select data-f="h"><option value="s"'+(p.h==='s'?' selected':'')+'>가로형</option><option value="n"'+(p.h==='n'?' selected':'')+'>정사각</option><option value="t"'+(p.h==='t'?' selected':'')+'>세로형</option><option value="l"'+(p.h==='l'?' selected':'')+'>길게</option></select></label></div>'+
      '<div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'}).join('')}
  function load(reset){
    if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}
    else{try{var v=localStorage.getItem(STORE);S=v?JSON.parse(v):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.p))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}
    $('iDot').checked=S.dot;$('iNav').checked=!!S.nav;list();render()}
  $('iDot').addEventListener('change',function(){S.dot=this.checked;persist();render()});
  $('iNav').addEventListener('change',function(){S.nav=this.checked;persist();render()});
  var L=$('plist'),ix=function(e){return +e.target.closest('.pe').dataset.i};
  L.addEventListener('input',function(e){var t=e.target;if(t.dataset.f!=='x')return;S.p[ix(e)].x=t.value;persist();render()});
  L.addEventListener('change',function(e){var t=e.target,f=t.dataset.f,o=S.p[ix(e)];
    if(f==='h'){o.h=t.value;persist();render()}
    else if(f==='img'&&t.files[0]){var r=new FileReader();r.onload=function(){o.img=r.result;persist();render()};r.readAsDataURL(t.files[0])}});
  L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.p;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
    persist();list();render()});
  $('addP').onclick=function(){S.p.push({x:'',h:'t',img:''});persist();list();render()};
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return html2canvas($('pf'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='pinterest-home.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
  load(false);
})();
