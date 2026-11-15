(function(){
  var i=0,n=5,total=8,x0=null;
  var s=document.getElementById('slides'),m=document.getElementById('media'),
      c=document.getElementById('counter'),d=document.querySelectorAll('#dots i');
  function go(k){
    i=Math.max(0,Math.min(n-1,k));
    s.style.transform='translateX('+(-100*i)+'%)';
    c.textContent=(i+1)+'/'+total;
    d.forEach(function(e,j){e.classList.toggle('on',j===i)});
  }
  m.addEventListener('pointerdown',function(e){x0=e.clientX});
  m.addEventListener('pointerup',function(e){
    if(x0===null)return;var dx=e.clientX-x0;x0=null;
    if(dx<-40)go(i+1);else if(dx>40)go(i-1);
  });
  var like=document.getElementById('like'),ln=document.getElementById('likeN');
  like.addEventListener('click',function(){
    var on=like.classList.toggle('on');ln.textContent=on?'23.6만':'23.6만';
  });
  m.addEventListener('dblclick',function(){
    if(!like.classList.contains('on'))like.click();
  });
})();
