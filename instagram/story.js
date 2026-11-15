(function(){
  var $=function(i){return document.getElementById(i)};
  var DEF={user:'username',time:'1일',badge:true,mode:'fill',seg:3,cur:2,ph:'메시지 보내기...'};
  var S,av,photo,grad;
  function set(){$('iUser').value=S.user;$('iTime').value=S.time;$('iPh').value=S.ph;$('iMode').value=S.mode;
    $('iSeg').value=S.seg;$('iCur').value=S.cur;$('iBadge').checked=S.badge}
  function read(){S.user=$('iUser').value;S.time=$('iTime').value;S.ph=$('iPh').value;S.mode=$('iMode').value;
    S.seg=Math.max(1,Math.min(30,parseInt($('iSeg').value)||1));S.cur=Math.max(1,Math.min(S.seg,parseInt($('iCur').value)||1));S.badge=$('iBadge').checked}
  function load(){S=JSON.parse(JSON.stringify(DEF));av=photo=grad=null;$('iAv').value='';$('iPhoto').value='';set();render()}
  function render(){
    $('vNm').textContent=S.user;$('vTm').textContent=S.time;$('vPh').textContent=S.ph;
    $('vBadge').style.display=S.badge?'':'none';
    $('vAv').style.backgroundImage=av?'url('+av+')':'';
    var b='';for(var i=0;i<S.seg;i++)b+='<span><i style="width:'+(i<S.cur-1?100:i===S.cur-1?30:0)+'%"></i></span>';
    $('bars').innerHTML=b;
    var f=$('frame'),p=$('photo'),fit=S.mode==='fit';
    f.classList.toggle('fit',fit);
    p.classList.toggle('empty',!photo);p.style.backgroundImage=photo?'url('+photo+')':'';
    var g=grad||['#8f9a8c','#2d3a2b'];
    f.style.background=fit?'linear-gradient('+g[0]+','+g[1]+')':'#000'}
  function colors(src){var im=new Image();im.onload=function(){
    var w=24,h=Math.max(2,Math.round(w*im.height/im.width)),c=document.createElement('canvas');c.width=w;c.height=h;
    var x=c.getContext('2d');x.drawImage(im,0,0,w,h);var n=Math.max(1,Math.round(h*.15));
    function avg(y){var d=x.getImageData(0,y,w,n).data,r=0,g=0,b=0,k=d.length/4;
      for(var i=0;i<d.length;i+=4){r+=d[i];g+=d[i+1];b+=d[i+2]}return'rgb('+Math.round(r/k)+','+Math.round(g/k)+','+Math.round(b/k)+')'}
    grad=[avg(0),avg(h-n)];render()};im.src=src}
  function rd(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
  $('iAv').onchange=function(){if(this.files[0])rd(this.files[0],function(d){av=d;render()})};
  $('iPhoto').onchange=function(){if(this.files[0])rd(this.files[0],function(d){photo=d;colors(d);render()})};
  document.querySelectorAll('.editor input:not([type=file]),.editor select').forEach(function(e){
    e.addEventListener('input',function(){read();render()});e.addEventListener('change',function(){read();render()})});
  $('reset').onclick=load;
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return html2canvas($('story'),{scale:5,useCORS:true,backgroundColor:'#0c1014',logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='instagram-story.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
  load();
})();
