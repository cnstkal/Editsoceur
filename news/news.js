(function(){
  var W=window.W,$=W.$,esc=W.esc;
  var U=function(n){return 'calc('+n+'*var(--var-u))'.replace('--var-u','--u')};
  var DEF={time:'11:15',url:'sample.example.com',out:'데일리샘플',tabs:'사회,정치,경제,생활,세계,IT,사설/칼럼,신문보기',act:5,
    ti:'“가상 도시 모래시, 첫 겨울 축제 앞두고 준비 한창”',rp:'홍길동 기자',dt:'입력 2026.11.16. 오전 7:33',re:'13',cc:'27',
    sb:'시민 참여형 행사 확대\n자원봉사자 3000명 모집 마감',
    bd:'가상 도시 모래시가 다음 달 열리는 첫 겨울 축제를 앞두고 막바지 준비에 들어갔다. 시는 시민 참여 프로그램을 늘리고 행사장 주변 교통 대책도 함께 마련했다고 밝혔다.\n\n이번 축제에는 지역 상인과 학생 동아리 등 120여 개 팀이 참가할 예정이다. 행사 기간 임시 셔틀버스도 운영된다.\n\n시 관계자는 “누구나 편하게 즐길 수 있는 축제를 목표로 준비하고 있다”고 말했다.\n\n축제는 다음 달 둘째 주 금요일 개막한다.',
    em:'홍길동 기자 sample@example.com',cp:'Copyright ⓒ 샘플. 이 화면은 가상의 예시입니다.',c1:'25',c2:'2',c3:'0',
    m:[{n:'sample****',t:'기대되네요 꼭 가볼게요.',d:'2026.11.16. 11:04',l:'0',x:'0'},{n:'demo****',t:'교통 대책이 잘 마련됐으면 좋겠습니다. 작년에는 주차가 많이 힘들었는데요…',d:'2026.11.16. 11:00',l:'12',x:'0'},{n:'test****',t:'가족들과 같이 가야겠어요',d:'2026.11.16. 10:52',l:'3',x:'0'}]};
  var TH='<svg viewBox="0 0 24 24" fill="none" stroke="#9a9ea3" stroke-width="1.500" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11v9H4v-9zM7 11l4-8c2 0 3 1 2.500 3.500L13 9h6a2 2 0 0 1 2 2.300l-1.200 6.500A2 2 0 0 1 18 20H7"/></svg>';
  function render(S){
    var sc=+S.sc||0,hide=sc>=2000;
    $('nScr').style.top=U(-sc);$('nTime').textContent=S.time;
    var sb=document.querySelector('#nf .sb');if(!sb.querySelector('svg'))sb.insertAdjacentHTML('beforeend',W.sb);
    $('nHd').style.top=U(177);
    $('nHd').innerHTML=(hide?'':'<div class="ub">'+esc(S.url)+'<svg viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round"><path d="M5 5l14 14M19 5 5 19"/></svg></div>')+
      '<div class="ph"><svg class="bk" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="1.200" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12H4M10 5l-7 7 7 7"/></svg><b>'+esc(S.out)+'</b><span class="sub">✓ 구독중</span></div>'+
      '<div class="tb">'+S.tabs.split(',').map(function(t,i){return '<span'+(i+1===+S.act?' class="on"':'')+'>'+esc(t.trim())+'</span>'}).join('')+'</div>';
    $('nOut').textContent=S.out;$('nTi').textContent=S.ti;$('nRp').textContent=S.rp;$('nDt').textContent=S.dt;
    $('nRe').textContent=S.re;$('nCc').textContent=S.cc;$('nSb').textContent=S.sb;$('nBd').textContent=S.bd;$('nEm').textContent=S.em;$('nCp').textContent=S.cp;
    $('nPol').innerHTML='ⓘ <b>'+esc(S.out)+'</b>가 이 기사의 댓글 정책을 결정합니다.';
    $('nCt').innerHTML='댓글 '+esc(S.cc)+'<i></i><u>MY댓글</u>';
    $('nCs').innerHTML='현재 댓글 <b>'+esc(S.c1)+'</b> 작성자 삭제 <b>'+esc(S.c2)+'</b> 규정 미준수 <b>'+esc(S.c3)+'</b>';
    $('nCm').innerHTML=S.m.map(function(x){return '<div class="cm"><i class="pf"></i><div class="nk">'+esc(x.n)+' ›</div><span class="fl">팔로우</span><svg class="kb" viewBox="0 0 4 16" fill="#333"><circle cx="2" cy="2" r="1.700"/><circle cx="2" cy="8" r="1.700"/><circle cx="2" cy="14" r="1.700"/></svg><div class="tx">'+esc(x.t)+'</div><div class="da">'+esc(x.d)+'</div><div class="ft"><b>답글</b>'+TH+esc(x.l)+'<span style="display:inline-block;transform:scaleY(-1);margin-left:0">'+TH+'</span>'+esc(x.x)+'</div></div>'}).join('');
    $('nTop').style.display='none';$('nf').style.height=Math.max($('nScr').scrollHeight,$('nScr').getBoundingClientRect().height)+'px'}
  W.start({key:'news_v1',def:DEF,frame:'nf',name:'news',render:render,
    fields:[['iTime','time'],['iUrl','url'],['iOut','out'],['iTabs','tabs'],['iAct','act'],['iTi','ti'],['iRp','rp'],['iDt','dt'],['iRe','re'],['iCc','cc'],['iSb','sb'],['iBd','bd'],['iEm','em'],['iCp','cp'],['iC1','c1'],['iC2','c2'],['iC3','c3']],
    lists:[{p:'m',el:'el',add:'addE',blank:{n:'user****',t:'',d:'2026.11.16. 11:10',l:'0',x:'0'},f:[['n','닉네임'],['t','내용'],['d','날짜'],['l','좋아요'],['x','싫어요']]}]});

})();
