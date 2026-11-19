// 인스티즈·더쿠 공통 편집 패널: 입력창을 고치면 화면에 바로 반영되고 자동 저장됩니다.
(function(){
  var KEY='community-edit-'+location.pathname;
  var t=document.getElementById('title'), b=document.getElementById('body');
  var usesP=!!b.querySelector('p');
  var saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
  var titleText=saved.title!=null?saved.title:t.textContent.replace(/\d+$/,'').trim();
  var bodyText=saved.body!=null?saved.body:Array.prototype.map.call(usesP?b.querySelectorAll('p'):[b],function(e){return e.textContent}).join('\n');
  var titleText0=t.textContent.replace(/\d+$/,'').trim(),bodyText0=Array.prototype.map.call(usesP?b.querySelectorAll('p'):[b],function(e){return e.textContent}).join('\n');
  var panel=document.createElement('div');panel.className='ed';
  panel.innerHTML='<label style="flex-direction:column;align-items:stretch">제목<input id="ed-title"></label><label>본문 (줄바꿈 가능)<textarea id="ed-body" rows="6"></textarea></label>';
  var wrap=document.querySelector('.wrap');
  document.body.classList.add('studio');
  var root=document.createElement('div');root.className='ps-wrap';
  root.innerHTML='<header class="ps-top"><span></span></header><div class="ps-grid"><section class="ps-card ps-main"><div class="ps-lbl">Live Preview</div><h2>커뮤니티 게시글</h2><p class="ps-sub">화면을 확인하고, 오른쪽에서 바로 수정해요</p><div class="ps-stage"><div class="cm-frame"></div></div></section><section class="ps-card ps-side"><div class="ps-lbl">Editor</div><h2>내용 수정</h2><div class="ps-edwrap"></div><div class="ps-acts"><button id="reset" type="button">초기화</button><button id="savePng" type="button">PNG 저장</button></div></section></div>';
  document.body.insertBefore(root,wrap);
  root.querySelector('.cm-frame').appendChild(wrap);
  root.querySelector('.ps-edwrap').appendChild(panel);
  [['../ps-editor.css?v=10'],['studio.css?v=1']].forEach(function(x){var l=document.createElement('link');l.rel='stylesheet';l.href=x[0];document.head.appendChild(l)});
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
  document.getElementById('reset').onclick=function(){try{localStorage.removeItem(KEY)}catch(x){}it.value=titleText0;ib.value=bodyText0;apply()};
  document.getElementById('savePng').onclick=function(){var bt=this,tx=bt.textContent;bt.disabled=true;bt.textContent='저장 중...';
    html2canvas(wrap,{scale:3,useCORS:true,backgroundColor:null,logging:false}).then(function(c){var a=document.createElement('a');a.href=c.toDataURL('image/png');a.download='community.png';a.click()}).catch(function(){alert('PNG 저장에 실패했습니다.')}).then(function(){bt.disabled=false;bt.textContent=tx})};
  apply();
})();
