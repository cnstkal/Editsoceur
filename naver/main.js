(function(){
  var $=function(i){return document.getElementById(i)},STORE='naver_main_v1';
  var DEF={badge:'9+',bg:'#edf0f5',w:'구름많음 10.8°',loc:'송현1.2동',d1:'나쁨',d2:'나쁨',k:'5,249.86',bn:'첫 참여 혜택 도착',bs:'최대 6천원 드려요',
    f:[{a:'박여행스케치',t:'2026년 11월 11일 현재 유튜브 프리미엄',img:''},{a:'모야',t:"성시경♥문가영 '공식 발표'",img:''}]};
  var S;
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function render(){
    $('nf').style.background=S.bg;$('nBadge').textContent=S.badge;$('nBadge').style.display=S.badge?'flex':'none';
    $('nCards').innerHTML='<div class="nc w"><div><b>'+esc(S.w)+'</b><br><small>'+esc(S.loc)+'</small></div><span style="font-size:38px">⛅</span></div>'+
      '<div class="nc d"><span>미세 <em>'+esc(S.d1)+'</em></span><span>초미세 <em>'+esc(S.d2)+'</em></span></div>'+
      '<div class="nc k"><b>'+esc(S.k)+'</b><small>코스피<i></i></small></div>';
    $('nBn').innerHTML='<i>🎁</i>'+esc(S.bn)+' <small>'+esc(S.bs)+'</small>';
    $('nFeed').innerHTML=S.f.map(function(x){return '<div class="nfc"><div class="nfi"'+(x.img?' style="background-image:url('+x.img+')"':'')+'><div class="dt"><u></u><u></u><u></u></div><div class="au"><i></i>'+esc(x.a)+'</div></div><div class="nft">'+esc(x.t)+'</div></div>'}).join('')}
  function list(){
    $('el').innerHTML=S.f.map(function(x,i){return '<div class="pe" data-i="'+i+'"><label>작성자<input data-f="a" value="'+esc(x.a)+'"></label><label>제목<input data-f="t" value="'+esc(x.t)+'"></label><label class="file">이미지<input type="file" accept="image/*" data-f="img"></label></div>'}).join('')}
  function load(reset){
    if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}
    else{try{var v=localStorage.getItem(STORE);S=v?JSON.parse(v):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.f))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}
    [['iBadge','badge'],['iBg','bg'],['iW','w'],['iLoc','loc'],['iD1','d1'],['iD2','d2'],['iK','k'],['iBn','bn']].forEach(function(a){$(a[0]).value=S[a[1]]});list();render()}
  [['iBadge','badge'],['iBg','bg'],['iW','w'],['iLoc','loc'],['iD1','d1'],['iD2','d2'],['iK','k'],['iBn','bn']].forEach(function(a){$(a[0]).addEventListener('input',function(){S[a[1]]=this.value;persist();render()})});
  function rd(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
  var L=$('el');
  L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||f==='img')return;S.f[+e.target.closest('.pe').dataset.i][f]=e.target.value;persist();render()});
  L.addEventListener('change',function(e){var t=e.target;if(t.dataset.f!=='img'||!t.files[0])return;var o=S.f[+t.closest('.pe').dataset.i];rd(t.files[0],function(d){o.img=d;persist();render()})});
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return html2canvas($('nf'),{scale:4,useCORS:true,backgroundColor:null,logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='naver-main.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
  load(false);
})();
