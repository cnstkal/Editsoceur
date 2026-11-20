(function(){
var s=document.createElement('style');
s.textContent=
'html,body{overflow-x:hidden;touch-action:pan-y pinch-zoom;-webkit-text-size-adjust:100%;text-size-adjust:100%}'+
'input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]):not([type=file]),textarea,select,[contenteditable]{font-size:16px!important}';
(document.head||document.documentElement).appendChild(s);
var o={passive:false};
document.addEventListener('dblclick',function(e){e.preventDefault()},o);
var last=0;
document.addEventListener('touchend',function(e){
  if(e.touches.length||e.changedTouches.length>1)return;
  if(e.target.closest&&e.target.closest('input,textarea,select,[contenteditable]'))return;
  var now=Date.now();
  if(now-last<300)e.preventDefault();
  last=now;
},o);
})();
