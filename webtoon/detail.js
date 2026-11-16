(function(){
  var W=window.W,$=W.$,esc=W.esc;
  var DEF={time:'10:08',ac:'#bf2a1e',hero:'',t:'작품 제목',au:'작가명',day:'일요웹툰',ds:'작품 소개가 여기에 한 줄로 표시되고, 길면 말줄임표로 잘려요.',fan:'66.0',fl:'내 팬스코어 >',int:'41,026',pv:'6',
    ep:[{t:'35화',r:'9.94',d:'26.11.14',rd:0,img:''},{t:'34화',r:'9.92',d:'26.11.07',rd:1,img:''},{t:'33화',r:'9.90',d:'26.10.31',rd:1,img:''}]};
  function render(S){
    var f=$('df');f.style.setProperty('--ac',S.ac);
    $('dTime').textContent=S.time;
    var sb=document.querySelector('#df .sb');if(!sb.querySelector('svg'))sb.insertAdjacentHTML('beforeend',W.sb);
    var h=$('dHero');h.style.cssText=W.cv({img:S.hero},3);h.innerHTML=S.hero?'':'<em>대표 이미지</em>';
    $('dFl').textContent=S.fl;$('dFan').textContent=S.fan;
    $('dInt').innerHTML='✓ 관심중 '+esc(S.int);
    $('dT').textContent=S.t;$('dAu').textContent=S.au;$('dDay').textContent='· '+S.day;$('dDs').textContent=S.ds;
    $('dPv').textContent=S.pv+'개';$('dPt').textContent='의 미리보기가 있습니다';
    $('dEl').innerHTML=S.ep.map(function(x,i){
      return '<div class="er'+(+x.rd?' rd':'')+'"><div class="th"><i class="cv" style="'+W.cv(x,i+2)+'"></i></div><div class="tx"><b>'+esc(x.t)+'</b><span>★'+esc(x.r)+'&nbsp;&nbsp;&nbsp;'+esc(x.d)+'</span></div></div>'}).join('');
    $('dNav').innerHTML=W.nav}
  W.start({key:'webtoon_detail_v1',def:DEF,frame:'df',name:'webtoon-detail',render:render,
    fields:[['iTime','time'],['iAc','ac'],['iHero','hero'],['iT','t'],['iAu','au'],['iDay','day'],['iInt','int'],['iDs','ds'],['iFl','fl'],['iFan','fan'],['iPv','pv']],
    lists:[{p:'ep',el:'el',add:'addE',f:[['t','회차'],['r','평점'],['d','날짜'],['rd','읽음(회색 처리)','c'],['img','썸네일','f']],blank:{t:'새 회차',r:'9.90',d:'26.11.21',rd:0,img:''}}]})
})();
