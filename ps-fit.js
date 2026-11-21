/* 공통 프리뷰 맞춤 (Zoom 편집화면 기준)
   1) .ps-fit[data-w][data-h] 안의 고정 px 프리뷰를 컨테이너 폭에 맞춰 축소/확대
   2) PNG 저장(html2canvas) 때는 축소를 잠깐 풀어 원본 크기로 캡처
   3) 미리보기 영역 폭이 바뀌면 window 'resize'를 한 번 알려 각 화면의 자체 fit()이 다시 계산하게 함 */
(function(){
 var fits=[].slice.call(document.querySelectorAll('.ps-fit'));
 function run(){
  fits.forEach(function(f){
   var inner=f.firstElementChild,W=+f.getAttribute('data-w'),H=+f.getAttribute('data-h');
   if(!inner||!W||!H)return;
   var avail=f.parentNode.clientWidth||W,
       maxH=innerHeight*(innerWidth<1100?0.55:0.8),
       s=Math.min(avail/W,maxH/H,+f.getAttribute('data-max')||2);
   f.style.width=(W*s)+'px';f.style.height=(H*s)+'px';
   inner.style.transformOrigin='0 0';inner.style.transform='scale('+s+')';
  });
 }
 var h=window.html2canvas;
 if(h&&!h.__psfit){
  var w=function(el,o){
   var f=el&&el.closest&&el.closest('.ps-fit');
   if(!f)return h(el,o);
   var inner=f.firstElementChild,t=inner.style.transform;
   inner.style.transform='none';
   var p=h(el,o),back=function(){inner.style.transform=t};
   p.then(back,back);return p;
  };
  w.__psfit=1;window.html2canvas=w;
 }
 window.addEventListener('resize',run);
 run();
 if(window.ResizeObserver){
  var lastW=0,raf=0;
  var ro=new ResizeObserver(function(es){
   var cw=Math.round(es[0].contentRect.width);
   if(cw===lastW)return;
   lastW=cw;
   cancelAnimationFrame(raf);
   raf=requestAnimationFrame(function(){window.dispatchEvent(new Event('resize'))});
  });
  var st=document.querySelector('.ps-stage');
  if(st)ro.observe(st);
 }
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(run);
})();
