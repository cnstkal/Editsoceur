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
  return html2canvas(el,opts).then(function(c){restore();return c},function(e){restore();throw e});
 };
})();
