/* 프로필·아바타 이미지 공통 처리: 원본 화질(PNG, 무손실) 유지, 1024px 초과 이미지만 고품질 단계 축소(계단/픽셀 현상 방지) */
(function(){
  var MAX=3072;
  function q(c){var x=c.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';return x}
  function shrink(img){
    var w=img.naturalWidth,h=img.naturalHeight,m=Math.max(w,h);
    if(!w||m<=MAX)return null;
    var s=MAX/m,tw=Math.round(w*s),th=Math.round(h*s),src=img,cw=w,ch=h;
    while(cw/2>tw){var c=document.createElement('canvas');cw=c.width=Math.round(cw/2);ch=c.height=Math.round(ch/2);q(c).drawImage(src,0,0,cw,ch);src=c}
    var o=document.createElement('canvas');o.width=tw;o.height=th;q(o).drawImage(src,0,0,tw,th);
    return o.toDataURL('image/png');
  }
  window.IGImg={capture:function(el,opts){opts=opts||{};var scale=opts.scale||8;return (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){var imgs=[].slice.call(el.querySelectorAll('img'));return Promise.all(imgs.map(function(im){return im.decode?im.decode().catch(function(){}):im.complete?Promise.resolve():new Promise(function(ok){im.onload=im.onerror=ok})}))}).then(function(){return new Promise(function(ok){requestAnimationFrame(function(){requestAnimationFrame(ok)})})}).then(function(){var w=el.scrollWidth||el.offsetWidth||1,h=el.scrollHeight||el.offsetHeight||1;scale=Math.min(scale,Math.sqrt(32000000/(w*h)),8192/Math.max(w,h));opts.scale=Math.max(1,scale);opts.useCORS=true;opts.allowTaint=false;opts.imageTimeout=20000;return html2canvas(el,opts)})},read:function(file,cb){
    var r=new FileReader();
    r.onload=function(){var im=new Image();
      im.onload=function(){var d=null;try{d=shrink(im)}catch(e){}cb(d||r.result)};
      im.onerror=function(){cb(r.result)};im.src=r.result};
    r.readAsDataURL(file)}};
})();
