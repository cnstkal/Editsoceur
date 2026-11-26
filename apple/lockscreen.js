(function(){
var $=function(i){return document.getElementById(i)};
var W=1080,H=1920,cv=$('cv'),ctx=cv.getContext('2d'),bg=null,seq=0;
var FONT='-apple-system,BlinkMacSystemFont,Inter,Pretendard,"Apple SD Gothic Neo","Noto Sans KR",sans-serif';
var DEF={iZoom:100,iX:50,iY:50,iDim:0,iCol:'#8d9aa6',iTime:'9:41',iPick:'2026-06-07',iLang:'en',iDate:'Monday, June 7',iTop:0,iInk:'#ffffff',iSig:'4',iWifi:'3',iBat:100};
var CHK={iChg:false,iBar:true};
function v(id){return $(id).value}
function n(id){return Number($(id).value)}

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

/* 가운데 글자: 화면보다 길면 글자 크기를 줄임 */
function text(str,y,size,weight,max){
 ctx.font=weight+' '+size+'px '+FONT;
 var w=ctx.measureText(str).width;
 if(w>max){ctx.font=weight+' '+(size*max/w)+'px '+FONT}
 ctx.fillText(str,W/2,y);
}

/* 상단 상태바: 신호 · 와이파이 · 배터리 (오른쪽 정렬) */
function drawStatus(){
 var ink=v('iInk'),x=962;
 ctx.save();ctx.fillStyle=ink;ctx.strokeStyle=ink;

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
 if($('iBar').checked){rr(ctx,862,106,132,8,4);ctx.fill()}
 ctx.restore();
}

function render(){
 $('vBat').textContent=n('iBat')+'%';
 drawBg();
 ctx.save();ctx.fillStyle=v('iInk');ctx.textAlign='center';ctx.textBaseline='alphabetic';
 text(v('iTime'),487+n('iTop'),206,300,1000);
 text(v('iDate'),588+n('iTop'),53,400,980);
 ctx.restore();
 drawStatus();
}

/* 날짜 선택 → 문구 자동 입력 */
function fillDate(){
 var p=v('iPick').split('-');if(p.length!==3)return;
 var d=new Date(+p[0],p[1]-1,+p[2]);
 $('iDate').value=d.toLocaleDateString(v('iLang')==='ko'?'ko-KR':'en-US',{month:'long',day:'numeric',weekday:'long'});
 render();
}

/* 글꼴이 늦게 도착해도 다시 그림 */
function loadFonts(){
 if(!document.fonts)return Promise.resolve();
 var s=v('iTime')+v('iDate');
 return Promise.all(['300','400'].map(function(w){
  return Promise.all([document.fonts.load(w+' 56px Inter',s),document.fonts.load(w+' 56px Pretendard',s)])
 })).catch(function(){});
}

function reset(){
 for(var k in DEF)$(k).value=DEF[k];
 for(var c in CHK)$(c).checked=CHK[c];
 seq++;bg=null;$('iBg').value='';render();
}

Object.keys(DEF).concat(Object.keys(CHK)).forEach(function(id){
 var fn=id==='iPick'||id==='iLang'?fillDate:render;
 $(id).addEventListener('input',fn);$(id).addEventListener('change',fn);
});
$('iDate').addEventListener('change',function(){loadFonts().then(render)});
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
 render();
 cv.toBlob(function(b){
  if(!b)return;
  var u=URL.createObjectURL(b),a=document.createElement('a');a.download='iphone-lockscreen.png';a.href=u;
  document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},1000);
 },'image/png');
};

reset();loadFonts().then(render);
window.addEventListener('load',function(){loadFonts().then(render)});
if(document.fonts&&document.fonts.addEventListener)document.fonts.addEventListener('loadingdone',render);
})();
