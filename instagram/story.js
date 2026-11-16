(function(){
  var $=function(i){return document.getElementById(i)};
  var DEF={user:'username',time:'1일',badge:true,seg:3,cur:2,pct:30,ph:'메시지 보내기...'};
  var S,av,photo,grad,T,ratio=1,rot=0;
  function set(){$('iUser').value=S.user;$('iTime').value=S.time;$('iPh').value=S.ph;
    $('iSeg').value=S.seg;$('iCur').value=S.cur;$('iPct').value=S.pct;$('iBadge').checked=S.badge}
  function read(){S.user=$('iUser').value;S.time=$('iTime').value;S.ph=$('iPh').value;
    S.seg=Math.max(1,Math.min(30,parseInt($('iSeg').value)||1));S.cur=Math.max(1,Math.min(S.seg,parseInt($('iCur').value)||1));S.pct=Math.max(0,Math.min(100,parseFloat($('iPct').value)||0));S.badge=$('iBadge').checked}
  function load(){S=JSON.parse(JSON.stringify(DEF));av=photo=grad=null;rot=0;T={x:0,y:0,s:1};$('iZoom').value=100;$('iPhoto').value='';$('iAv').value='';$('iPhoto').value='';set();render()}
  function render(){
    $('vNm').textContent=S.user;$('vTm').textContent=S.time;$('vPh').textContent=S.ph;
    $('vBadge').style.display=S.badge?'':'none';
    $('vAv').style.backgroundImage=av?'url('+av+')':'';
    var b='';for(var i=0;i<S.seg;i++)b+='<span><i style="width:'+(i<S.cur-1?100:i===S.cur-1?S.pct:0)+'%"></i></span>';
    $('bars').innerHTML=b;
    var f=$('frame'),p=$('photo');
    $('empty').style.display=photo?'none':'';p.style.display=photo?'':'none';
    if(photo){p.src=photo;place()}
    var g=grad||['#8f9a8c','#2d3a2b'];
    f.style.background=photo?'linear-gradient('+g[0]+','+g[1]+')':'#000'}
  function place(){var f=$('frame'),w=f.clientWidth,h=f.clientHeight,p=$('photo');if(!photo||!w)return;
    var k=Math.max(w/(ratio),h)/1;var bw,bh;if(w/h>ratio){bw=w;bh=w/ratio}else{bh=h;bw=h*ratio}
    if(rot%180){var t=bw;bw=bh;bh=t}p.style.width=bw+'px';p.style.height=bh+'px';
    p.style.transform='translate(-50%,-50%) translate('+T.x*w+'px,'+T.y*w+'px) rotate('+rot+'deg) scale('+T.s+')'}
  function colors(src){var im=new Image();im.onload=function(){
    var w=24,h=Math.max(2,Math.round(w*im.height/im.width)),c=document.createElement('canvas');c.width=w;c.height=h;
    var x=c.getContext('2d');x.drawImage(im,0,0,w,h);var n=Math.max(1,Math.round(h*.15));
    function avg(y){var d=x.getImageData(0,y,w,n).data,r=0,g=0,b=0,k=d.length/4;
      for(var i=0;i<d.length;i+=4){r+=d[i];g+=d[i+1];b+=d[i+2]}return'rgb('+Math.round(r/k)+','+Math.round(g/k)+','+Math.round(b/k)+')'}
    grad=[avg(0),avg(h-n)];render()};im.src=src}
  function rd(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
  $('iAv').onchange=function(){if(this.files[0])rd(this.files[0],function(d){av=d;render()})};
  $('iPhoto').onchange=function(){if(this.files[0])rd(this.files[0],function(d){var im=new Image();im.onload=function(){ratio=im.width/im.height;photo=d;T={x:0,y:0,s:1};$('iZoom').value=100;colors(d);render()};im.src=d})};
  function setS(s){T.s=Math.max(.2,Math.min(5,s));$('iZoom').value=Math.round(T.s*100);place()}
  $('iZoom').oninput=function(){T.s=this.value/100;place()};
  $('posReset').onclick=function(){T={x:0,y:0,s:1};$('iZoom').value=100;place()};
  var P={},fr=$('frame'),last=null;
  function dist(){var a=Object.values(P);return Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)}
  function angle(){var a=Object.values(P);return Math.atan2(a[1].y-a[0].y,a[1].x-a[0].x)*180/Math.PI}
  function mid(){var a=Object.values(P);return{x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2}}
  fr.addEventListener('pointerdown',function(e){fr.setPointerCapture(e.pointerId);P[e.pointerId]={x:e.clientX,y:e.clientY};
    last=Object.keys(P).length===2?{d:dist(),m:mid(),a:angle()}:null});
  fr.addEventListener('pointermove',function(e){if(!P[e.pointerId]||!photo)return;var w=fr.clientWidth,n=Object.keys(P).length;
    if(n===1){T.x+=(e.clientX-P[e.pointerId].x)/w;T.y+=(e.clientY-P[e.pointerId].y)/w;P[e.pointerId]={x:e.clientX,y:e.clientY}}
    else if(n===2){P[e.pointerId]={x:e.clientX,y:e.clientY};var d=dist(),m=mid();
      if(last){T.x+=(m.x-last.m.x)/w;T.y+=(m.y-last.m.y)/w;setS(T.s*d/last.d);var da=angle()-last.a;rot+=((da+540)%360)-180}last={d:d,m:m,a:angle()}}
    place()});
  function up(e){delete P[e.pointerId];last=null}
  fr.addEventListener('pointerup',up);fr.addEventListener('pointercancel',up);
  fr.addEventListener('wheel',function(e){e.preventDefault();setS(T.s*Math.exp(-e.deltaY*.0015))},{passive:false});
  window.addEventListener('resize',place);
  document.querySelectorAll('.editor input:not([type=file]):not([type=range])').forEach(function(e){
    e.addEventListener('input',function(){read();render()});e.addEventListener('change',function(){read();render()})});

  $('reset').onclick=load;
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return html2canvas($('story'),{scale:5,useCORS:true,backgroundColor:null,logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='instagram-story.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
  load();
})();
