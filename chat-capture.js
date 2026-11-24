/* 채팅/DM 편집 화면 PNG 저장: 배경(벽지·큰 배경)을 투명하게 하고 채팅 말풍선·글씨만 남김 */
(function(){
 function clearBg(root){
  var A=root.getBoundingClientRect(),area=A.width*A.height,saved=[];
  [root].concat([].slice.call(root.querySelectorAll('*'))).forEach(function(e){
   var cs=getComputedStyle(e),r=e.getBoundingClientRect();
   var hasBg=cs.backgroundImage!=='none'||(cs.backgroundColor!=='rgba(0, 0, 0, 0)'&&cs.backgroundColor!=='transparent');
   var big=r.width*r.height>=area*0.9,img=cs.backgroundImage!=='none';
   var txt=[].some.call(e.childNodes,function(n){return n.nodeType===3&&n.textContent.trim()});
   if(hasBg && !e.closest('.av') && !e.classList.contains('av') && !e.classList.contains('nm') && !e.classList.contains('b') && !e.classList.contains('gb') && !e.classList.contains('r') && (e===root||big&&!txt)){
    saved.push([e,e.style.background,e.style.backgroundImage,e.style.boxShadow]);
    e.style.background='transparent';e.style.backgroundImage='none';e.style.boxShadow='none';
   }
  });
  return function(){saved.forEach(function(p){p[0].style.background=p[1];p[0].style.backgroundImage=p[2];p[0].style.boxShadow=p[3]})};
 }
 window.capChat=function(el,opts){
  opts=opts||{};opts.backgroundColor=null;
  var restore=clearBg(el);
  var w=el.scrollWidth||el.offsetWidth||1,h=el.scrollHeight||el.offsetHeight||1,lim=Math.sqrt(16777216/(w*h));opts.scale=Math.max(1,Math.min(opts.scale||8,lim));
  return html2canvas(el,opts).then(function(c){restore();return c},function(e){restore();throw e});
 };
})();

/* 공용 PNG 캡처: 브라우저 캔버스 한계(약 1,600만 px)를 넘지 않도록 배율을 자동으로 낮춤 → 긴 화면 저장 실패 방지 */
window.igCapture=function(el,opts){
 opts=opts||{};var w=el.scrollWidth||el.offsetWidth||1,h=el.scrollHeight||el.offsetHeight||1;
 var s=opts.scale||8,lim=Math.sqrt(16777216/(w*h));if(s>lim)opts.scale=Math.max(1,Math.floor(lim*10)/10);
 return html2canvas(el,opts)};
