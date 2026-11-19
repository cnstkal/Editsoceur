/* 뒤로 버튼 공통 가벼운 애니메이션 (모든 화면 공용) */
(function(){
  var SEL='.ps-back,.ed-back,.back,.tback,.mback,button.back,a.back';
  var css='@keyframes bkPress{0%{transform:scale(1)}40%{transform:scale(.88)}100%{transform:scale(1)}}'
   +'.bk-press{animation:bkPress .22s ease-out}'
   +'html.bk-leave body{transition:opacity .18s ease,transform .18s ease;opacity:0;transform:translateX(14px)}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  document.addEventListener('click',function(e){
    var el=e.target.closest&&e.target.closest(SEL);
    if(!el)return;
    el.classList.remove('bk-press');void el.offsetWidth;el.classList.add('bk-press');
    var href=el.getAttribute('href');
    if(el.tagName==='A'&&href&&!el.target&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&href.charAt(0)!=='#'){
      e.preventDefault();
      document.documentElement.classList.add('bk-leave');
      setTimeout(function(){location.href=el.href;},180);
    }
  },true);
  window.addEventListener('pageshow',function(){document.documentElement.classList.remove('bk-leave');});
})();
