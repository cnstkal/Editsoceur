(function(){
var s=document.createElement('style');
s.textContent='html,body{touch-action:manipulation;-webkit-text-size-adjust:100%;text-size-adjust:100%}'+
'.editor input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]):not([type=file]),.editor textarea,.editor select,.ps-side input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]):not([type=file]),.ps-side textarea,.ps-side select{font-size:16px!important}';
(document.head||document.documentElement).appendChild(s);
var o={passive:false};
['gesturestart','gesturechange','gestureend','dblclick'].forEach(function(t){document.addEventListener(t,function(e){e.preventDefault()},o)});
document.addEventListener('touchmove',function(e){if(e.touches&&e.touches.length>1)e.preventDefault()},o);
})();
