(function(){
  var W=window.W,$=W.$,esc=W.esc;
  var U=function(n){return 'calc('+n+'*var(--u))'};
  var DEF={time:'10:58',sc:0,im:'',pg:'1 / 6',av:'',sn:'판매자닉네임',loc:'동네이름',tp:'41.8°C',tl:'아이패드 에어 5세대',pc:'130,000원',pay:'1',cat:'디지털기기',wh:'13시간 전',lk:'3',vw:'38',
    ds:'아이패드 에어 5세대 판매합니다.\n\n사설, 공식 수리내역 없습니다(순정)\n\n용량은 64기가, 배터리는 87%입니다.\n\n사이드에 자잘한 찍힘만 있고, 액정과 후면 깨끗합니다.\n\n에어드랍, 데이터, 와이파이 등등 정상입니다.\n\n거래방법 : 반택, 우체국 택배\n\n직거래 시간 조율이 어려워서 그렇습니다'};
  function ics(c){var a='fill="none" stroke="'+c+'" stroke-width="1.900" stroke-linecap="round" stroke-linejoin="round"',s='<svg class="ic" style="left:%L%" viewBox="0 0 24 24" ';
    return [[46,a+'><path d="m15 4-8 8 8 8"/>'],[184,a+'><path d="M3.500 11 12 3.500l8.500 7.500v9.500h-6v-6h-5v6h-6z"/>'],[932,a+'><path d="M12 15V3M8 7l4-4 4 4M5 11v9h14v-9"/>'],[1082,'fill="'+c+'"><circle cx="12" cy="5" r="1.800"/><circle cx="12" cy="12" r="1.800"/><circle cx="12" cy="19" r="1.800"/>']].map(function(x){return s.replace('%L%',U(x[0]))+x[1]+'</svg>'}).join('')}
  function render(S){
    var top=!(+S.sc>0),col=top?'#fff':'#111';
    $('dScr').style.top=U(-(+S.sc||0));
    $('dHb').style.display=top?'none':'block';$('dGray').style.display=top?'block':'none';
    document.querySelector('#df .sb').style.color=col;$('dTime').textContent=S.time;
    var sb=document.querySelector('#df .sb');if(!sb.querySelector('svg'))sb.insertAdjacentHTML('beforeend',W.sb);
    $('dIcs').innerHTML=ics(col);
    var im=$('dIm');im.style.cssText=W.cv({img:S.im},2);im.innerHTML=S.im?'':'<em>제품 사진</em>';
    $('dPg').textContent=S.pg;$('dPg').style.display=S.pg?'':'none';
    $('dAv').style.backgroundImage=S.av?"url('"+S.av+"')":'';
    $('dSn').textContent=S.sn;$('dLoc').textContent=S.loc;$('dTp').textContent=S.tp;$('dTl').textContent=S.tl;$('dPc').textContent=S.pc;
    $('dPay').innerHTML=+S.pay?'<svg viewBox="0 0 24 24"><circle cx="12" cy="15" r="7" fill="#ff6600"/><circle cx="12" cy="15" r="2.500" fill="#fff"/><circle cx="11" cy="4.500" r="3" fill="#22a05a"/></svg>pay':'';
    $('dCat').textContent=S.cat;$('dWh').textContent=S.wh;$('dDs').textContent=S.ds;$('dSt').textContent='관심 '+S.lk+' · 조회 '+S.vw}
  W.start({key:'daangn_detail_v1',def:DEF,frame:'df',name:'daangn-detail',render:render,
    fields:[['iTime','time'],['iSc','sc'],['iIm','im'],['iPg','pg'],['iAv','av'],['iSn','sn'],['iLoc','loc'],['iTp','tp'],['iTl','tl'],['iPc','pc'],['iPay','pay'],['iCat','cat'],['iWh','wh'],['iLk','lk'],['iVw','vw'],['iDs','ds']]})
})();
