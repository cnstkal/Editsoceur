(function(){
  var $=function(i){return document.getElementById(i)},STORE='naver_search_v1';
  var D=[['아는형님','11.14.'],['아는 형님 김희철','11.14.'],['아는 형님 민경훈','11.14.'],['김태영','11.14.'],['안태규','11.14.'],['목요일 날씨','11.14.'],['ㄴ이버톡톡','11.14.'],['검은수녀들','11.11.'],['네이버시계','11.11.'],['크레스트 치아미백','11.10.'],['네이비즘','11.10.'],['더뮤즈엔터','11.10.'],['젠슨황','11.09.'],['호프','11.08.']];
  var DEF={ph:'검색어 또는 URL 입력',r:D.map(function(a){return{q:a[0],d:a[1]}})};
  var S,CL='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a8a8f" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',X='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8a8a8f" stroke-width="1.800" stroke-linecap="round"><path d="M5 5l14 14M19 5 5 19"/></svg>';
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function render(){$('sPh').textContent=S.ph;$('sL').innerHTML=S.r.map(function(x){return '<div class="sr"><span class="ic">'+CL+'</span><b>'+esc(x.q)+'</b><s>'+esc(x.d)+'</s>'+X+'</div>'}).join('')}
  function list(){$('el').innerHTML=S.r.map(function(x,i){return '<div class="pe" data-i="'+i+'"><div class="row"><label style="flex:2">검색어<input data-f="q" value="'+esc(x.q)+'"></label><label>날짜<input data-f="d" value="'+esc(x.d)+'"></label></div><div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'}).join('')}
  function load(reset){
    if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}
    else{try{var v=localStorage.getItem(STORE);S=v?JSON.parse(v):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.r))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}
    $('iPh').value=S.ph;list();render()}
  $('iPh').addEventListener('input',function(){S.ph=this.value;persist();render()});
  var L=$('el'),ix=function(e){return +e.target.closest('.pe').dataset.i};
  L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f)return;S.r[ix(e)][f]=e.target.value;persist();render()});
  L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.r;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
    persist();list();render()});
  $('addR').onclick=function(){S.r.push({q:'',d:'11.14.'});persist();list();render()};
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return html2canvas($('sf'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='naver-search.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
  load(false);
})();
