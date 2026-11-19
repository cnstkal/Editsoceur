/* 편집 패널 탭 자동 분류: 기본 / 이미지 / 상호작용 / 기타 (data-t가 있는 .ps-pn이 있으면 그대로 사용) */
(function(){
  var ed=document.querySelector('.ps-edwrap .editor')||document.querySelector('.editor')||document.querySelector('.ps-edwrap .ed');
  if(!ed) return;
  var side=ed.closest('.ps-side')||ed.parentNode;
  var ORDER=['기본','이미지','상호작용','기타'];
  var pre=[].slice.call(ed.querySelectorAll(':scope > .ps-pn'));
  var groups=[];
  if(pre.length){ groups=pre; }
  else{
    var RX={
      '이미지':/사진|이미지|썸네일|배너|프로필|파일|비율|첨부|아바타|아이콘|배경|photo|image/,
      '상호작용':/좋아요|댓글|조회|리트윗|리포스트|공유|답글|팔로|구독|반응|멘션|알림|저장|시청|like|reply|share/,
      '기본':/아이디|이름|제목|본문|내용|날짜|시간|설명|문구|소개|채널|계정|닉네임|상대|텍스트|메시지|글|안내|화면|검색|문장/
    };
    var kids=[].slice.call(ed.children),buckets={},last='기본';
    kids.forEach(function(k){
      var t=(k.textContent||'').replace(/\s+/g,' ');
      var c=null;
      ['이미지','상호작용','기본'].some(function(name){ if(RX[name].test(t)){c=name;return true} return false });
      if(!c) c=last; last=c;
      (buckets[c]=buckets[c]||[]).push(k);
    });
    var used=ORDER.filter(function(n){return buckets[n]&&buckets[n].length});
    if(used.length<2) return;
    used.forEach(function(n){
      var g=document.createElement('div');g.className='ps-pn';g.setAttribute('data-t',n);
      buckets[n].forEach(function(k){g.appendChild(k)});
      ed.appendChild(g);groups.push(g);
    });
  }
  if(groups.length<1) return;
  [].forEach.call(side.querySelectorAll(':scope > .ps-seg'),function(o){o.remove()});
  var bar=document.createElement('div');bar.className='ps-seg';
  groups.forEach(function(g,i){
    var b=document.createElement('button');b.type='button';b.textContent=g.getAttribute('data-t');
    if(i===0)b.className='on';
    b.onclick=function(){groups.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};
    bar.appendChild(b);
    g.hidden=i!==0;
  });
  ed.parentNode.insertBefore(bar,ed);
})();
