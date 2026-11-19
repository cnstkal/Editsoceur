(function(){
  var W=window.W,$=W.$,esc=W.esc;
  var DEF={time:'10:57',wr:'+ 글쓰기',dong:'동네이름',sub:'옆동네',chips:'전체,중고차 ↗,가까운 동네,수집품,알바',act:1,ch:'',nv:'1',
    it:[{t:'무선 이어폰 새상품 (미개봉)',loc:'옆동네',dist:'5km',d:'16시간 전',p:'200,000원',buy:1,k:'h',n:'5',img:''},
      {t:'투명 보관 케이스 새상품',loc:'동네이름',dist:'600m',d:'1일 전',p:'1,500원',buy:1,k:'h',n:'8',img:''},
      {t:'포토카드 판매합니다',loc:'옆동네',dist:'4km',d:'3일 전',p:'100원',buy:0,k:'c',n:'1',img:''},
      {t:'어린이 학습만화 시리즈 10권',loc:'다른동네',dist:'3km',d:'2분 전',p:'15,000원',buy:0,k:'',n:'',img:''}]};
  var A='fill="none" stroke="#111" stroke-width="1.900" stroke-linecap="round" stroke-linejoin="round"';
  var HEART='<svg viewBox="0 0 24 24"><path d="M12 21s-8.500-5.500-8.500-11.500A4.800 4.800 0 0 1 12 6.700a4.800 4.800 0 0 1 8.500 2.800C20.500 15.500 12 21 12 21z" fill="#c9ccd1"/></svg>';
  var CHAT='<svg viewBox="0 0 24 24"><path d="M12 3C6.800 3 3 6.400 3 10.800c0 2.300 1 4.200 2.700 5.600L5 21l4.300-2.300c.9.200 1.800.3 2.700.3 5.200 0 9-3.400 9-7.800S17.200 3 12 3z" fill="#c9ccd1"/><g fill="#fff"><circle cx="8" cy="11" r="1.200"/><circle cx="12" cy="11" r="1.200"/><circle cx="16" cy="11" r="1.200"/></g></svg>';
  var BUY='<svg viewBox="0 0 24 24"><path d="M3 9.500 5 4h14l2 5.500V20H3z" fill="#e8590c"/><path d="M9 14h6" stroke="#fdeee6" stroke-width="2" stroke-linecap="round"/></svg>';
  function nav(n){return '<div class="gn"><span class="on"><svg viewBox="0 0 24 24"><path d="M3 11 12 3l9 8v10H3z" fill="#111" stroke="#111" stroke-width="2" stroke-linejoin="round"/></svg><em>홈</em></span>'+
    '<span><svg viewBox="0 0 24 24"><g '+A+'><circle cx="12" cy="6" r="2.800"/><circle cx="5" cy="10" r="2.200"/><circle cx="19" cy="10" r="2.200"/><path d="M7 20c0-3 2-5 5-5s5 2 5 5zM1.500 17c0-2 1.500-3.500 3.500-3.500M22.500 17c0-2-1.500-3.500-3.500-3.500"/></g></svg><em>커뮤니티</em></span>'+
    '<span><svg viewBox="0 0 24 24"><g '+A+'><path d="M12 2.500a7.500 7.500 0 0 0-7.500 7.500c0 5.500 7.500 11.500 7.500 11.500s7.500-6 7.500-11.500A7.500 7.500 0 0 0 12 2.500z"/><circle cx="12" cy="10" r="2.800"/></g></svg><em>동네지도</em></span>'+
    '<span><svg viewBox="0 0 24 24"><g '+A+'><path d="M12 3C6.800 3 3 6.400 3 10.800c0 2.300 1 4.200 2.700 5.600L5 21l4.300-2.300c.9.200 1.800.3 2.700.3 5.200 0 9-3.400 9-7.800S17.200 3 12 3z"/></g><g fill="#111"><circle cx="8" cy="11" r="1.100"/><circle cx="12" cy="11" r="1.100"/><circle cx="16" cy="11" r="1.100"/></g></svg>'+(n?'<u class="nb" style="background:#ee6a21;left:52%;top:-6px">'+esc(n)+'</u>':'')+'<em>채팅</em></span>'+
    '<span><svg viewBox="0 0 24 24"><g '+A+'><circle cx="12" cy="7.500" r="4"/><path d="M4 21c0-4.500 3.500-7 8-7s8 2.500 8 7z"/></g></svg><em>나의 당근</em></span></div>'}
  function render(S){
    $('gTime').textContent=S.time;$('gDong').textContent=S.dong;$('gSub').textContent=S.sub;$('gWr').textContent=S.wr;
    var sb=document.querySelector('#gf .sb');if(!sb.querySelector('svg.rs'))sb.insertAdjacentHTML('beforeend',W.sb.replace('<svg','<svg class="rs"'));
    $('gChips').innerHTML=S.chips.split(',').map(function(c,i){return '<span'+(i+1===+S.act?' class="on"':'')+'>'+esc(c.trim())+'</span>'}).join('');
    $('gLs').innerHTML=S.it.map(function(x,i){
      return '<div class="it"><div class="im"><i class="cv" style="'+W.cv(x,i+1)+'">'+(x.img?'':'<em>'+esc(x.t)+'</em>')+'</i></div><div class="tx"><div class="ti">'+esc(x.t)+'</div>'+
      '<div class="mt">'+esc(x.loc)+' · '+esc(x.dist)+' · '+esc(x.d)+'</div><div class="pr">'+esc(x.p)+'</div>'+(+x.buy?'<div class="by">'+BUY+'바로구매</div>':'')+'</div>'+
      '<svg class="kb" viewBox="0 0 4 16" fill="#8d9096"><circle cx="2" cy="2" r="1.700"/><circle cx="2" cy="8" r="1.700"/><circle cx="2" cy="14" r="1.700"/></svg>'+
      (x.k?'<div class="cn">'+(x.k==='c'?CHAT:HEART)+esc(x.n)+'</div>':'')+'</div>'}).join('');
    $('gNav').innerHTML=nav('');$('gNav').style.display=S.nv==='0'?'none':''}
  W.start({key:'daangn_main_v1',def:DEF,frame:'gf',name:'daangn-main',render:render,
    fields:[['iTime','time'],['iWr','wr'],['iDong','dong'],['iSub','sub'],['iChips','chips'],['iAct','act'],['iCh','ch'],['iNv','nv']],
    lists:[{p:'it',el:'el',add:'addE',blank:{t:'새 게시글',loc:'동네이름',dist:'1km',d:'1시간 전',p:'10,000원',buy:0,k:'h',n:'0',img:''},
      f:[['t','제목'],['loc','동네'],['dist','거리'],['d','시간'],['p','가격'],['buy','바로구매 표시','c'],['k','반응 아이콘','s',[['','없음'],['h','관심(하트)'],['c','채팅']]],['n','반응 숫자'],['img','사진','f']]}]})
})();
