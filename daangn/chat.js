(function(){
  var W=window.W,$=W.$,esc=W.esc;
  var DEF={time:'10:59',nm:'상대닉네임',tp:'36.5°C',sub:'동네이름, 보통 10분 이내 응답',th:'',st:'거래완료',pt:'보조배터리 10000mAh 팝니다',pr:'23,000원',
    m:[{s:'d',t:'2026년 11월 16일',tm:''},{s:'l',t:'20,000원 안 되나요?',tm:'오후 4:03'},{s:'r',t:'22,000원까지만 가능해요',tm:'오후 4:05'},{s:'l',t:'글에는 8,000원이라고 되어 있는데 박스에는 다르게 적혀 있어서요',tm:''},{s:'l',t:'뭐가 맞나요?',tm:'오후 4:06'},{s:'r',t:'박스에 써있는 게 맞아요. 제가 제목을 잘못 적은 것 같아요',tm:'오후 4:06'},{s:'l',t:'아 알겠습니다!',tm:'오후 4:06'}]};
  function render(S){
    $('cTime').textContent=S.time;
    var sb=document.querySelector('#cf .sb');if(!sb.querySelector('svg'))sb.insertAdjacentHTML('beforeend',W.sb);
    $('cNm').textContent=S.nm;$('cTp').textContent=S.tp;$('cTp').style.display=S.tp?'':'none';$('cSub').textContent=S.sub;
    var th=$('cTh');th.style.cssText=W.cv({img:S.th},0);
    $('cSt').textContent=S.st+' ⌄';$('cPt').textContent=S.pt;$('cPr').textContent=S.pr;
    $('cMs').innerHTML=S.m.map(function(x,i){
      if(x.s==='d')return '<div class="dl">'+esc(x.t)+'</div>';
      var p=S.m[i-1],first=!p||p.s!==x.s,r=x.s==='r',tm=x.tm?'<span class="tm">'+esc(x.tm)+'</span>':'';
      var av=r?'':(first?'<i class="pf"></i>':'<i class="sp"></i>');
      return '<div class="mr'+(r?' r':'')+(first?' g':'')+'">'+av+(r?tm:'')+'<div class="bb">'+esc(x.t)+'</div>'+(r?'':tm)+'</div>'}).join('')}
  W.start({key:'daangn_chat_v1',def:DEF,frame:'cf',name:'daangn-chat',render:render,
    fields:[['iTime','time'],['iNm','nm'],['iTp','tp'],['iSub','sub'],['iTh','th'],['iSt','st'],['iPr','pr'],['iPt','pt']],
    lists:[{p:'m',el:'el',add:'addE',blank:{s:'l',t:'',tm:'오후 4:07'},f:[['s','종류','s',[['l','상대 메시지'],['r','내 메시지'],['d','날짜 구분선']]],['t','내용'],['tm','시간(비우면 숨김)']]}]})
})();
