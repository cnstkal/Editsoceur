(function(){
  var $=function(i){return document.getElementById(i)},STORE='editsoceur-gpt-pc-v1',S;
  var DEF={title:'ChatGPT',mode:'Auto',ph:'',input:true,msgs:[{t:'u',x:'임시 내용입니다'},{t:'b',x:'임시 내용입니다\n임시 내용입니다'}]};
  function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  var PL='<svg class="pl" viewBox="0 0 24 24"><path d="M12 4v16M4 12h16"/></svg>',
    MC='<svg class="mc" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5.500 11a6.500 6.500 0 0 0 13 0M12 17.500V21"/></svg>',
    WV='<svg viewBox="0 0 24 24"><path d="M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4"/></svg>';
  function render(){
    var h='<div class="ht">'+esc(S.title)+(S.mode?'<i>'+esc(S.mode)+'</i>':'')+'</div><div class="col">';
    S.msgs.forEach(function(m){h+=m.t==='u'?'<div class="u"><div>'+esc(m.x)+'</div></div>':'<div class="a">'+esc(m.x)+'</div>'});
    h+='</div><div class="fade"></div>';
    if(S.input)h+='<div class="inp">'+PL+'<span class="ph">'+esc(S.ph)+'</span>'+MC+'<div class="go">'+WV+'</div></div>';
    $('pf').innerHTML=h;fit()}
  function list(){var h='';S.msgs.forEach(function(m,i){
    h+='<div class="xc" data-i="'+i+'"><label>'+(m.t==='u'?'내 말풍선':'답변')+' (줄바꿈 가능)<textarea rows="2" data-f="x">'+esc(m.x)+'</textarea></label><div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'});
    $('xlist').innerHTML=h}
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function fit(){var k=Math.min(1,$('pw').clientWidth/1920);$('pf').style.transform='scale('+k+')';$('pf').style.height='auto';$('pf').style.overflow='visible';var base=$('pf').getBoundingClientRect().top,bottom=Math.max(1080,$('pf').scrollHeight);$('pf').querySelectorAll('*').forEach(function(el){var r=el.getBoundingClientRect();bottom=Math.max(bottom,(r.bottom-base)/k)});var h=Math.max(1080,bottom+40);$('pf').style.height=h+'px';$('pw').style.height=h*k+'px'}
  function set(){$('iTi').value=S.title;$('iMo').value=S.mode;$('iPh').value=S.ph;$('iIn').checked=!!S.input}
  function load(r){if(r)try{localStorage.removeItem(STORE)}catch(e){}try{var s=!r&&localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!Array.isArray(S.msgs))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}set();list();render();fit()}
  function glob(){S.title=$('iTi').value;S.mode=$('iMo').value;S.ph=$('iPh').value;S.input=$('iIn').checked;persist();render()}
  ['iTi','iMo','iPh','iIn'].forEach(function(id){$(id).addEventListener('input',glob);$(id).addEventListener('change',glob)});
  var L=$('xlist'),ix=function(e){return +e.target.closest('.xc').dataset.i};
  L.addEventListener('input',function(e){if(e.target.dataset.f){S.msgs[ix(e)].x=e.target.value;persist();render()}});
  L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.msgs,t;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){t=m[i];m[i]=m[i+1];m[i+1]=t}
    persist();list();render()});
  $('addU').onclick=function(){S.msgs.push({t:'u',x:''});persist();list();render()};
  $('addB').onclick=function(){S.msgs.push({t:'b',x:''});persist();list();render()};
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){return html2canvas($('pf'),{scale:2,width:1920,height:Math.max(1080,$('pf').scrollHeight),useCORS:true,backgroundColor:'#fff',logging:false,onclone:function(d){d.getElementById('pf').style.transform='none';var w=d.getElementById('pw');w.style.height='auto';w.style.overflow='visible'}})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='gpt-pc.png';document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t})
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  addEventListener('resize',fit);
  load(false);
})();
