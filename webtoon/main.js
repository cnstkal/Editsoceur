(function(){
  var W=window.W,$=W.$,esc=W.esc;
  var N=['호랑이 신부','월요일의 연인','도시의 밤','새벽 배달부','검은 숲','여름방학','나의 이웃','하늘 정원'];
  var DEF={navOn:true,subs:[],time:'10:06',sb:'지금! 인기 급상승',sn:' 여성 TOP 30',tabs:'전체,신작,매일+,월,화,수,목,금,토',act:1,
    rk:[0,1,2,3].map(function(i){return{t:N[i],img:''}}),
    g:[{t:'작품 제목 1',s:'새 이야기 1개',day:'일',b:'',g:0,img:''},{t:'작품 제목 2',s:'랭킹급상승 TOP 10',day:'일',b:'n',g:1,img:''},{t:'작품 제목 3',s:'새 이야기 1개',day:'월',b:'u',g:0,img:''},{t:'작품 제목 4',s:'',day:'일',b:'',g:0,img:''},{t:'작품 제목 5',s:'',day:'월',b:'',g:0,img:''},{t:'작품 제목 6',s:'',day:'월',b:'',g:0,img:''}]};
  function ph(x){return x.img?'':'<em>'+esc(x.t)+'</em>'}
  function render(S){
    $('wTime').textContent=S.time;$('wSb').textContent=S.sb;$('wSn').textContent=S.sn;
    var sb=document.querySelector('#wf .sb');if(!sb.querySelector('svg'))sb.insertAdjacentHTML('beforeend',W.sb);
    $('wNav').innerHTML=S.navOn?W.nav:'';var off=36*(S.subs||[]).length;$('wSub').innerHTML=(S.subs||[]).map(function(x,i){return '<div class="sx" style="top:calc('+(318+36*i)+'*var(--u))">'+esc(x.t)+'</div>'}).join('');$('wRk').style.top='calc('+(337+off)+'*var(--u))';$('wTabs').style.top='calc('+(700+off)+'*var(--u))';$('wGr').style.top='calc('+(812+off)+'*var(--u))';
    $('wRk').innerHTML=S.rk.map(function(x,i){return '<div class="rc"><i class="cv" style="'+W.cv(x,i)+'">'+ph(x)+'</i><b class="rn">'+(i+1)+'</b></div>'}).join('');
    $('wTabs').innerHTML=S.tabs.split(',').map(function(t,i){var p=t.split('|');
      return '<span'+(i+1===+S.act?' class="on"':'')+'>'+esc(p[0].trim())+(p[1]?'<u>'+esc(p[1])+'</u>':'')+'</span>'}).join('');
    $('wGr').innerHTML=S.g.map(function(x,i){
      return '<div><div class="cv2"><i class="cv" style="'+W.cv(x,i+4)+'">'+ph(x)+'</i>'+(x.day?'<i class="dy">'+esc(x.day)+'</i>':'')+(x.b==='n'?'<i class="nw">신작</i>':'')+'</div>'+
      '<div class="gt">'+(x.b==='u'?'<i class="up">UP</i>':'')+esc(x.t)+'</div>'+(x.s?'<div class="gs'+(+x.g?' g':'')+'">'+esc(x.s)+'</div>':'')+'</div>'}).join('')}
  var rk=[['t','제목'],['img','표지 이미지','f']];
  var DY=[['','없음'],['월','월'],['화','화'],['수','수'],['목','목'],['금','금'],['토','토'],['일','일']];
  var g=[['t','제목'],['s','부가 문구(비우면 숨김)'],['day','요일 뱃지','s',DY],['b','제목 표시','s',[['','없음'],['n','신작 동그라미'],['u','UP 태그']]],['g','부가 문구 초록색(랭킹급상승)','c'],['img','표지 이미지','f']];
  W.start({key:'webtoon_main_v1',def:DEF,frame:'wf',name:'webtoon-main',render:render,
    fields:[['iNav','navOn','c'],['iTime','time'],['iSb','sb'],['iSn','sn']],
    lists:[{p:'subs',el:'elSub',add:'addSub',f:[['t','부제 문구']],blank:{t:'추가 부제'}},{p:'rk',el:'el1',add:'add1',f:rk,blank:{t:'작품',img:''}},{p:'g',el:'el2',add:'add2',f:g,blank:{t:'작품 제목',s:'',day:'월',b:'',g:0,img:''}}]})
})();
