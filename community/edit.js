// 인스티즈·더쿠 편집 패널 (기본 / 게시글 / 댓글). 입력하면 화면에 바로 반영되고 자동 저장됩니다.
(function(){
  var IZ=!!document.getElementById('tabs'),KEY='community-edit-v2-'+location.pathname;
  var $=function(i){return document.getElementById(i)},wrap=document.querySelector('.wrap');
  var t=$('title'),b=$('body'),cmBox=$('comments'),acts=$('acts');
  function txt(el,v){el.textContent=v}
  function numNode(span,n){[].slice.call(span.childNodes).forEach(function(c){if(c.nodeType===3)c.remove()});span.append(String(n))}
  function readNum(span){var s='';[].forEach.call(span.childNodes,function(c){if(c.nodeType===3)s+=c.nodeValue});return s.replace(/\D/g,'')}
  var orig=[].map.call(cmBox.querySelectorAll('.cm'),function(c){return c.cloneNode(true)});
  var D={};
  if(IZ){
    var h2=document.querySelector('.board h2'),mt=$('meta').textContent.split('|');
    D={board:h2.firstChild.nodeValue.trim(),title:t.firstChild.nodeValue,time:mt[0].trim(),views:(mt[1]||'').replace(/\D/g,''),like:readNum(acts.querySelector('.pill span')),
      body:[].map.call(b.querySelectorAll('p'),function(p){return p.textContent}).join('\n'),cnt:t.querySelector('em').textContent,
      comments:orig.map(function(c){return {name:c.querySelector('.nm').textContent,time:c.querySelector('.tm').textContent,text:c.querySelector('.tx').textContent}})};
  }else{
    var ms=$('meta').children;
    D={board:$('cat').textContent,title:t.textContent,url:$('url').textContent,author:ms[0].textContent,date:ms[2].textContent,views:ms[4].textContent.replace(/\D/g,''),
      star:readNum(acts.children[3]),body:b.textContent,cnt:acts.querySelector('b').textContent,
      comments:orig.map(function(c){return {name:c.querySelector('b').textContent.replace(/^\d+\.\s*/,''),time:c.querySelector('span').textContent,text:c.querySelector('.tx').textContent}})};
  }
  var S=JSON.parse(JSON.stringify(D));
  try{var sv=JSON.parse(localStorage.getItem(KEY)||'null');if(sv&&sv.comments)S=sv}catch(e){}
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}

  function apply(){
    if(IZ){
      h2.firstChild.nodeValue=S.board+' ';
      var em=document.createElement('em');em.textContent=S.cnt;t.textContent=S.title;t.append(em);
      $('meta').textContent=S.time+' | 조회 '+S.views;
      b.innerHTML=S.body.split('\n').map(function(l){return '<p>'+esc(l)+'</p>'}).join('');
      numNode(acts.querySelector('.pill span'),S.like);
    }else{
      txt($('cat'),S.board);txt(t,S.title);txt($('url'),S.url);
      var m=$('meta').children;txt(m[0],S.author);txt(m[2],S.date);txt(m[4],'조회 수 '+S.views);
      txt(b,S.body);acts.querySelector('b').textContent=S.cnt;numNode(acts.children[3],S.star);
    }
    cmBox.innerHTML='';
    S.comments.forEach(function(c,i){
      var d=(orig[i]||orig[0]).cloneNode(true);
      if(IZ){d.querySelector('.nm').textContent=c.name;d.querySelector('.tm').textContent=c.time;d.querySelector('.tx').textContent=c.text}
      else{d.querySelector('b').textContent=(i+1)+'. '+c.name;d.querySelector('span').textContent=c.time;d.querySelector('.tx').textContent=c.text}
      cmBox.append(d)});
    try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}
  }
  function fld(k,label,ta){return '<label>'+label+(ta?'<textarea data-k="'+k+'" rows="5"></textarea>':'<input data-k="'+k+'">')+'</label>'}
  function cmPanel(){
    var h='<h2>댓글</h2>'+fld('cnt','댓글 수 (제목 옆 숫자)');
    S.comments.forEach(function(c,i){h+='<div class="card"><h3>댓글 '+(i+1)+'</h3><label>닉네임<input data-c="'+i+'" data-f="name"></label><label>'+(IZ?'시간':'날짜')+'<input data-c="'+i+'" data-f="time"></label><label>내용<textarea data-c="'+i+'" data-f="text" rows="3"></textarea></label><button type="button" class="ghost" data-del="'+i+'">이 댓글 삭제</button></div>'});
    return h+'<button type="button" class="addc" id="addCm">+ 댓글 추가</button>';
  }
  var P=[['기본','<h2>기본</h2>'+fld('board',IZ?'게시판 이름':'카테고리 이름')],
    ['게시글','<h2>게시글</h2>'+fld('title','제목')+(IZ?fld('time','작성 시간')+fld('views','조회수')+fld('like','좋아요 수'):fld('url','주소')+fld('author','작성자')+fld('date','작성일')+fld('views','조회수')+fld('star','즐겨찾기 수'))+fld('body','본문 (줄바꿈 가능)',1)],
    ['댓글','']];
  document.body.classList.add('studio');
  var root=document.createElement('div');root.className='ps-wrap';
  root.innerHTML='<header class="ps-top"><span></span></header><div class="ps-grid"><section class="ps-card ps-main"><div class="ps-lbl">Live Preview</div><h2>'+(IZ?'인스티즈':'더쿠')+' 게시글</h2><p class="ps-sub">화면을 확인하고, 오른쪽에서 바로 수정해요</p><div class="ps-stage"><div class="cm-frame"></div></div></section><section class="ps-card ps-side"><div class="ps-lbl">Editor</div><h2>내용 수정</h2><div class="ps-edwrap"><div class="ed"></div></div><div class="ps-acts"><button id="reset" type="button">초기화</button><button id="savePng" type="button">PNG 저장</button></div></section></div>';
  document.body.insertBefore(root,wrap);root.querySelector('.cm-frame').appendChild(wrap);
  [['../ps-editor.css?v=10'],['studio.css?v=1']].forEach(function(x){var l=document.createElement('link');l.rel='stylesheet';l.href=x[0];document.head.appendChild(l)});
  var ed=root.querySelector('.ed'),bar=document.createElement('div');bar.className='ps-seg';
  var pn=P.map(function(p,i){var d=document.createElement('div');d.className='ps-pn';d.hidden=!!i;ed.append(d);
    var bt=document.createElement('button');bt.type='button';bt.textContent=p[0];if(!i)bt.className='on';
    bt.onclick=function(){pn.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(bt);return d});
  ed.parentNode.insertBefore(bar,ed);
  function build(){
    pn[0].innerHTML=P[0][1];pn[1].innerHTML=P[1][1];pn[2].innerHTML=cmPanel();
    [].forEach.call(ed.querySelectorAll('[data-k]'),function(e){e.value=S[e.dataset.k]});
    [].forEach.call(ed.querySelectorAll('[data-c]'),function(e){e.value=S.comments[e.dataset.c][e.dataset.f]});
  }
  ed.addEventListener('input',function(e){var x=e.target;
    if(x.dataset.k)S[x.dataset.k]=x.value;else if(x.dataset.c)S.comments[x.dataset.c][x.dataset.f]=x.value;else return;apply()});
  ed.addEventListener('click',function(e){var x=e.target;
    if(x.dataset.del!=null){S.comments.splice(+x.dataset.del,1);build();apply()}
    else if(x.id==='addCm'){S.comments.push({name:IZ?'익인'+(S.comments.length+1):'무명의 더쿠',time:IZ?'방금':D.comments[0]?D.comments[0].time:'',text:'내용'});build();apply()}});
  $('reset').onclick=function(){try{localStorage.removeItem(KEY)}catch(x){}S=JSON.parse(JSON.stringify(D));build();apply()};
  $('savePng').onclick=function(){var bt=this,tx=bt.textContent;bt.disabled=true;bt.textContent='저장 중...';
    html2canvas(wrap,{scale:4,useCORS:true,backgroundColor:null,logging:false}).then(function(c){var a=document.createElement('a');a.href=c.toDataURL('image/png');a.download='community.png';a.click()}).catch(function(){alert('PNG 저장에 실패했습니다.')}).then(function(){bt.disabled=false;bt.textContent=tx})};
  build();apply();
})();
