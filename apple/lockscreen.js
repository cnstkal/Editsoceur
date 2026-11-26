(function(){
var $=function(i){return document.getElementById(i)};
var W=1080,H=1920,cv=$('cv'),ctx=cv.getContext('2d'),bg=null,seq=0;
var FONT='Pretendard,sans-serif',LS=-0.02; /* 자간 -20 */
var DEF={iAlpha:55,iBlur:60,iZoom:100,iX:50,iY:50,iDim:0,iCol:'#8d9aa6',iTime:'9:41',iPick:'2021-06-07',iLang:'ko',iDate:'6월 7일 월요일',iTop:0,iInk:'#ffffff',iSig:'4',iWifi:'3',iBat:100,iSbX:0,iSbY:0,iSwipe:'위로 쓸어올려 잠금 해제'};
var CHK={iChg:false,iBtn:true,iHome:true};
function v(id){return $(id).value}
function n(id){return Number($(id).value)}
function is16(){return v('iVer')==='16'}

/* 둥근 사각형 (구형 브라우저 대응) */
function rr(c,x,y,w,h,r){r=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}

function drawBg(){
 ctx.fillStyle=v('iCol');ctx.fillRect(0,0,W,H);
 if(bg){
  var s=Math.max(W/bg.naturalWidth,H/bg.naturalHeight)*n('iZoom')/100,w=bg.naturalWidth*s,h=bg.naturalHeight*s;
  ctx.drawImage(bg,(W-w)*n('iX')/100,(H-h)*n('iY')/100,w,h);
 }
 if(n('iDim')){ctx.fillStyle='rgba(0,0,0,'+n('iDim')/100+')';ctx.fillRect(0,0,W,H)}
}

/* 가운데 글자 (자간 적용). 브라우저마다 canvas 자간 지원이 달라 글자별로 배치하고, 길면 크기를 줄임 */
function text(str,y,size,weight,max,g){
 g=g||ctx;
 var ch=Array.from(str);if(!ch.length)return;
 function width(){return g.measureText(str).width+LS*size*(ch.length-1)}
 g.font=weight+' '+size+'px '+FONT;
 var w=width();
 if(w>max){size*=max/w;g.font=weight+' '+size+'px '+FONT;w=width()}
 var x=(W-w)/2,pre='';
 g.textAlign='left';
 ch.forEach(function(c,i){
  /* 앞뒤 글자 간격(커닝)은 유지 */
  pre+=c;
  g.fillText(c,x+g.measureText(pre).width-g.measureText(c).width+LS*size*i,y);
 });
}

/* 시계 유리 효과: 흐린 배경을 글자 모양으로 잘라낸 뒤 반투명한 색을 덮음.
   canvas filter를 지원하지 않는 브라우저(사파리)가 있어 흐림은 직접 계산 */
function layer(w,h){var c=document.createElement('canvas');c.width=w;c.height=h;return c}
var low=layer(W/4,H/4),glass=layer(W,H),mask=layer(W,H);
var lg=low.getContext('2d',{willReadFrequently:true}),gg=glass.getContext('2d'),mg=mask.getContext('2d');
function boxBlur(src,dst,w,h,r,step,line,lines,len){
 for(var l=0;l<lines;l++){
  var base=l*line;
  for(var c=0;c<4;c++){
   var sum=0,i;
   for(i=-r;i<=r;i++)sum+=src[base+Math.max(0,Math.min(len-1,i))*step+c];
   for(i=0;i<len;i++){
    dst[base+i*step+c]=sum/(r*2+1);
    sum+=src[base+Math.min(len-1,i+r+1)*step+c]-src[base+Math.max(0,i-r)*step+c];
   }
  }
 }
}
function blurBg(){
 var w=low.width,h=low.height,r=Math.round(n('iBlur')*0.14);
 lg.drawImage(cv,0,0,w,h);
 if(!r)return false;
 var d=lg.getImageData(0,0,w,h),a=d.data,t=new Uint8ClampedArray(a.length);
 for(var p=0;p<2;p++){boxBlur(a,t,w,h,r,4,w*4,h,w);boxBlur(t,a,w,h,r,w*4,4,w,h)}
 lg.putImageData(d,0,0);return true;
}
/* 배경만 그려진 상태에서 호출해야 함 */
function glassTime(y,size,weight){
 var blurred=blurBg();
 mg.clearRect(0,0,W,H);mg.fillStyle='#000';text(v('iTime'),y,size,weight,1000,mg);
 gg.globalCompositeOperation='source-over';gg.globalAlpha=1;gg.clearRect(0,0,W,H);
 gg.drawImage(blurred?low:cv,0,0,W,H);
 /* 흐림이 클수록 살짝 밝게 해서 글자 윤곽이 보이게 함 */
 gg.fillStyle='rgba(255,255,255,'+(n('iBlur')*0.0018)+')';gg.fillRect(0,0,W,H);
 gg.globalAlpha=n('iAlpha')/100;gg.fillStyle=v('iInk');gg.fillRect(0,0,W,H);gg.globalAlpha=1;
 gg.globalCompositeOperation='destination-in';gg.drawImage(mask,0,0);
 ctx.drawImage(glass,0,0);
}

/* 하단 원형 버튼: 뒤 배경을 흐리게 만든 뒤 어둡게 덮음 */
var small=document.createElement('canvas');small.width=small.height=32;
function circle(cx,cy,r){
 var s=small.getContext('2d',{willReadFrequently:true});s.drawImage(cv,cx-r,cy-r,r*2,r*2,0,0,32,32);
 var d=s.getImageData(0,0,32,32),px=d.data,t=new Uint8ClampedArray(px.length);
 for(var p=0;p<2;p++){boxBlur(px,t,32,32,4,4,128,32,32);boxBlur(t,px,32,32,4,128,4,32,32)}
 s.putImageData(d,0,0);
 ctx.save();ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.clip();
 ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(small,cx-r,cy-r,r*2,r*2);
 ctx.fillStyle='rgba(30,30,30,.36)';ctx.fillRect(cx-r,cy-r,r*2,r*2);ctx.restore();
}

function drawBottom(){
 if($('iBtn').checked){
  var y=H-208,L=198,R=W-198;
  circle(L,y,63);circle(R,y,63);
  ctx.save();ctx.fillStyle='#fff';ctx.strokeStyle='#fff';ctx.lineJoin='round';
  /* 손전등 */
  rr(ctx,L-14,y-33,28,8,2);ctx.fill();
  ctx.beginPath();ctx.moveTo(L-14,y-21);ctx.lineTo(L+14,y-21);ctx.lineTo(L+14,y-15);ctx.lineTo(L+8,y-5);ctx.lineTo(L+8,y+29);
  ctx.quadraticCurveTo(L+8,y+33,L+4,y+33);ctx.lineTo(L-4,y+33);ctx.quadraticCurveTo(L-8,y+33,L-8,y+29);ctx.lineTo(L-8,y-5);ctx.lineTo(L-14,y-15);ctx.closePath();ctx.fill();
  ctx.fillStyle='rgba(50,50,50,.75)';rr(ctx,L-3,y+1,6,15,3);ctx.fill();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(L,y+11,2.5,0,Math.PI*2);ctx.fill();
  /* 카메라 */
  ctx.lineWidth=4;rr(ctx,R-27,y-15,54,38,8);ctx.stroke();
  ctx.beginPath();ctx.moveTo(R-14,y-15);ctx.lineTo(R-9,y-23);ctx.lineTo(R+9,y-23);ctx.lineTo(R+14,y-15);ctx.stroke();
  ctx.beginPath();ctx.arc(R,y+4,10.5,0,Math.PI*2);ctx.stroke();
  ctx.beginPath();ctx.arc(R+18,y-6,3,0,Math.PI*2);ctx.fill();
  ctx.restore();
 }
 ctx.save();ctx.fillStyle=v('iInk');
 if(!is16())text(v('iSwipe'),H-110,35,600,620); /* 안내 문구는 iOS 15만 */
 if($('iHome').checked){ctx.fillStyle='#fff';rr(ctx,(W-384)/2,H-52,384,12,6);ctx.fill()}
 ctx.restore();
}

/* 상단 상태바: 신호 · 와이파이 · 배터리 (오른쪽 정렬) */
function drawStatus(){
 var ink=is16()?'#ffffff':v('iInk'),x=962; /* iOS 16은 글자 색을 바꿔도 상단바는 흰색 */
 ctx.save();ctx.translate(n('iSbX'),n('iSbY'));ctx.fillStyle=ink;ctx.strokeStyle=ink;

 /* 배터리 */
 var pct=n('iBat'),chg=$('iChg').checked;
 ctx.globalAlpha=.45;ctx.lineWidth=3;rr(ctx,x+1.5,53.5,55,28,9);ctx.stroke();
 rr(ctx,x+61,61,5,13,2.5);ctx.fill();ctx.globalAlpha=1;
 if(pct>0){
  ctx.save();rr(ctx,x+6,58,46,19,5);ctx.clip();
  ctx.fillStyle=chg?'#34c759':pct<=20?'#ff3b30':ink;ctx.fillRect(x+6,58,Math.max(4,46*pct/100),19);ctx.restore();
 }
 if(chg){
  ctx.beginPath();[[33,48],[19,70],[28,70],[24,87],[39,64],[30,64]].forEach(function(p,i){ctx[i?'lineTo':'moveTo'](x+p[0],p[1])});ctx.closePath();
  ctx.shadowColor='rgba(0,0,0,.45)';ctx.shadowBlur=6;ctx.fillStyle='#fff';ctx.fill();ctx.shadowBlur=0;ctx.fillStyle=ink;
 }
 x-=17;

 /* 와이파이: 부채꼴 3겹 */
 var wf=n('iWifi');
 if(wf){
  var cx=x-23,cy=83,a=Math.PI*1.25,b=Math.PI*1.75;
  [[0,11],[15,22],[26,33]].forEach(function(r,i){
   ctx.globalAlpha=i<wf?1:.35;ctx.beginPath();ctx.arc(cx,cy,r[1],a,b);
   if(r[0])ctx.arc(cx,cy,r[0],b,a,true);else ctx.lineTo(cx,cy);
   ctx.closePath();ctx.fill();
  });
  x-=62;
 }

 /* 신호 막대 */
 for(var i=0;i<4;i++){
  var h=[13,19,26,33][i];ctx.globalAlpha=i<n('iSig')?1:.35;
  rr(ctx,x-47+i*13,83-h,8,h,2.5);ctx.fill();
 }

 ctx.globalAlpha=1;
 ctx.restore();
}

function render(){
 $('vBat').textContent=n('iBat')+'%';
 drawBg();
 if(is16())glassTime(535+n('iTop'),264,600); /* 유리 효과 시계는 iOS 16 */
 ctx.save();ctx.fillStyle=v('iInk');ctx.textBaseline='alphabetic';
 if(is16()){ /* 날짜가 위, 굵고 큰 시계 */
  text(v('iDate'),275+n('iTop'),57,600,980);
 }else{ /* 얇은 시계, 날짜가 아래 */
  text(v('iTime'),487+n('iTop'),206,300,1000);
  text(v('iDate'),588+n('iTop'),53,400,980);
 }
 ctx.restore();
 drawStatus();
 drawBottom();
}

/* 날짜 선택 → 문구 자동 입력 */
function fillDate(){
 var p=v('iPick').split('-');if(p.length!==3)return;
 var d=new Date(+p[0],p[1]-1,+p[2]);
 $('iDate').value=d.toLocaleDateString(v('iLang')==='ko'?'ko-KR':'en-US',{month:'long',day:'numeric',weekday:'long'});
 render();
}

/* 프리텐다드가 늦게 도착해도 다시 그림 */
function loadFonts(){
 if(!document.fonts)return Promise.resolve();
 var t=v('iTime')+v('iDate')+v('iSwipe');
 return Promise.all(['300','400','600'].map(function(w){return document.fonts.load(w+' 56px Pretendard',t)})).catch(function(){});
}

/* iOS 버전 버튼 상태 맞추기 */
function syncVer(){
 [].forEach.call($('verSeg').children,function(b){var on=b.getAttribute('data-v')===v('iVer');b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
 $('swipeRow').hidden=is16();
 [].forEach.call(document.querySelectorAll('.only16'),function(e){e.hidden=!is16()});
}
[].forEach.call($('verSeg').children,function(b){b.onclick=function(){$('iVer').value=b.getAttribute('data-v');syncVer();render()}});

function reset(){
 for(var k in DEF)$(k).value=DEF[k];
 for(var c in CHK)$(c).checked=CHK[c];
 seq++;bg=null;$('iBg').value='';syncVer();render();
}

Object.keys(DEF).concat(Object.keys(CHK)).forEach(function(id){
 var fn=id==='iPick'||id==='iLang'?fillDate:render;
 $(id).addEventListener('input',fn);$(id).addEventListener('change',fn);
});
['iDate','iSwipe'].forEach(function(id){$(id).addEventListener('change',function(){loadFonts().then(render)})});
$('iBg').addEventListener('change',function(){
 var f=this.files[0];if(!f)return;
 var my=++seq,url=URL.createObjectURL(f),img=new Image();
 img.onload=function(){URL.revokeObjectURL(url);if(my!==seq)return;bg=img;$('iZoom').value=100;$('iX').value=50;$('iY').value=50;render()};
 img.onerror=function(){URL.revokeObjectURL(url);alert('이미지를 불러올 수 없어요. JPG나 PNG 파일로 다시 시도해 주세요.')};
 img.src=url;
});
$('clearBg').onclick=function(){
 seq++;bg=null;$('iBg').value='';
 var card=$('iBg').closest('.upl');if(card&&card._clear)card._clear();
 render();
};
$('reset').onclick=reset;

/* PNG 저장 (1080x1920) */
$('savePng').onclick=function(){
 loadFonts().then(function(){
  render();
  cv.toBlob(function(b){
   if(!b)return;
   var u=URL.createObjectURL(b),a=document.createElement('a');a.download='iphone-lockscreen.png';a.href=u;
   document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},1000);
  },'image/png');
 });
};

reset();loadFonts().then(render);
window.addEventListener('load',function(){loadFonts().then(render)});
if(document.fonts&&document.fonts.addEventListener)document.fonts.addEventListener('loadingdone',render);
})();

/* 화면 전환 */
(function(){document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||a.target||a.hasAttribute("download"))return;var h=a.getAttribute("href");if(!h||h[0]==="#"||/^(javascript:|mailto:|tel:)/.test(h))return;var u=new URL(a.href,location.href);if(u.origin!==location.origin)return;e.preventDefault();document.body.classList.add("pa-out");setTimeout(function(){location.href=u.href},180)},true)})();
