// 인스티즈·더쿠 공통 편집 패널: 입력창을 고치면 화면에 바로 반영되고 자동 저장됩니다.
(function(){
  var KEY='community-edit-'+location.pathname;
  var t=document.getElementById('title'), b=document.getElementById('body');
  var usesP=!!b.querySelector('p');
  var saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
  var titleText=saved.title!=null?saved.title:t.textContent.replace(/\d+$/,'').trim();
  var bodyText=saved.body!=null?saved.body:Array.prototype.map.call(usesP?b.querySelectorAll('p'):[b],function(e){return e.textContent}).join('\n');
  var panel=document.createElement('div');
  panel.style.cssText='margin:24px 16px 40px;font-size:14px';
  panel.innerHTML='<div style="font-weight:700;margin-bottom:6px">제목</div><input id="ed-title" style="width:100%;box-sizing:border-box;padding:10px;border:1px solid #ddd;border-radius:8px;font-size:15px"><div style="font-weight:700;margin:14px 0 6px">본문 (줄바꿈 가능)</div><textarea id="ed-body" rows="6" style="width:100%;box-sizing:border-box;padding:10px;border:1px solid #ddd;border-radius:8px;font-size:15px"></textarea>';
  document.querySelector('.wrap').after(panel);
  var it=document.getElementById('ed-title'), ib=document.getElementById('ed-body');
  it.value=titleText; ib.value=bodyText;
  function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  function apply(){
    var em=t.querySelector('em');
    t.textContent=it.value; if(em)t.append(em);
    var lines=ib.value.split('\n');
    b.innerHTML=usesP?lines.map(function(l){return '<p>'+esc(l)+'</p>'}).join(''):lines.map(esc).join('<br>');
    try{localStorage.setItem(KEY,JSON.stringify({title:it.value,body:ib.value}))}catch(e){}
  }
  it.addEventListener('input',apply); ib.addEventListener('input',apply);
  apply();
})();
