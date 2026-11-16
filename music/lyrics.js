(function(){
  var $=function(i){return document.getElementById(i)},STORE='music_lyrics_v1';
  var L=[['여기에 가사를 입력하세요','Type your lyrics here',0],['두 번째 줄은 이렇게 보여요','The second line looks like this',0],['세 번째 줄부터는 점점 흐려져요','From the third line it fades out',0],['멀어질수록 더 번져 보이고','The farther it is, the blurrier',0],['오른쪽 정렬도 쓸 수 있어요','Right-aligned lines work too',1],['마지막 줄까지 이어져요','It goes on to the last line',1]];
  var DEF={title:'곡 제목',artist:'아티스트',c1:'#5b4034',c2:'#252c45',c3:'#6e3b39',art:'',act:1,l:L.map(function(a){return{t:a[0],tr:a[1],r:a[2]}})};
  var S;
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function render(){
    $('mf').style.background='radial-gradient(90% 55% at 100% 62%,'+S.c3+' 0%,transparent 70%),linear-gradient(180deg,'+S.c1+' 0%,'+S.c2+' 100%)';
    $('mT').textContent=S.title;$('mA').textContent=S.artist;
    $('mArt').style.backgroundImage=S.art?'url('+S.art+')':'';
    var act=Math.max(0,Math.min(S.l.length-1,(+S.act||1)-1)),start=Math.max(0,act-1),h='';
    for(var i=start;i<S.l.length;i++){
      var x=S.l[i],d=i-act,st;
      if(d===0)st='color:#fff';
      else if(d===1)st='color:rgba(255,255,255,.6)';
      else{var bl=d<0?3.5:Math.min(9,(d-1)*2.4+1),op=d<0?.45:Math.max(.22,.55-(d-2)*.09);st='color:transparent;text-shadow:0 0 '+bl+'px rgba(255,255,255,'+op+')'}
      h+='<div class="ln'+(x.r?' r':'')+'" style="'+st+'">'+esc(x.t).replace(/\n/g,'<br>')+(x.tr?'<div class="tr">'+esc(x.tr)+'</div>':'')+'</div>'}
    $('mL').innerHTML=h}
  function list(){
    $('el').innerHTML=S.l.map(function(x,i){return '<div class="pe" data-i="'+i+'"><label>'+(i+1)+'번 가사<textarea data-f="t" rows="2">'+esc(x.t)+'</textarea></label><label>번역(비우면 숨김)<input data-f="tr" value="'+esc(x.tr)+'"></label><label style="display:flex;align-items:center;gap:6px"><input type="checkbox" data-f="r"'+(x.r?' checked':'')+' style="width:auto;margin:0">오른쪽 정렬</label><div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'}).join('')}
  var F=[['iT','title'],['iA','artist'],['iC1','c1'],['iC2','c2'],['iC3','c3'],['iAct','act']];
  function load(reset){
    if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}
    else{try{var v=localStorage.getItem(STORE);S=v?JSON.parse(v):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.l))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}
    F.forEach(function(a){$(a[0]).value=S[a[1]]});list();render()}
  F.forEach(function(a){$(a[0]).addEventListener('input',function(){S[a[1]]=this.value;persist();render()})});
  $('iArt').addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){S.art=r.result;persist();render()};r.readAsDataURL(f)});
  var E=$('el'),ix=function(e){return +e.target.closest('.pe').dataset.i};
  E.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||f==='r')return;S.l[ix(e)][f]=e.target.value;persist();render()});
  E.addEventListener('change',function(e){if(e.target.dataset.f!=='r')return;S.l[ix(e)].r=e.target.checked?1:0;persist();render()});
  E.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.l;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
    persist();list();render()});
  $('addR').onclick=function(){S.l.push({t:'',tr:'',r:0});persist();list();render()};
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return html2canvas($('mf'),{scale:4,useCORS:true,backgroundColor:null,logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='music-lyrics.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
  load(false);
})();
