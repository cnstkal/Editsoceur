(function(){
var $=function(i){return document.getElementById(i)};
var out=$('out'),ctx=out.getContext('2d'),sc=document.createElement('canvas').getContext('2d');
var img1=null,img2=null,token=0,raf=0;
var FB=', Pretendard, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif';
var FONTS={imp:{f:'Anton, Impact, "Arial Narrow"',w:'400',lh:1.08},arial:{f:'"Archivo Black", "Arial Black", Arial',w:'400',lh:1.12},helv:{f:'Helvetica, Arial',w:'700',lh:1.15},comic:{f:'"Comic Neue", "Comic Sans MS", cursive',w:'700',lh:1.15},serif:{f:'"Times New Roman", Times, serif',w:'700',lh:1.15},pixel:{f:'VT323, "Courier New", monospace',w:'400',lh:1.05},type:{f:'"Special Elite", "Courier New", monospace',w:'400',lh:1.2},kr:{f:'Pretendard',w:'800',lh:1.2}};
var EMO='"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
function fs(k,size){var o=FONTS[k]||FONTS.imp;return o.w+' '+Math.round(size)+'px '+o.f+FB}
var LAY={
 impact:{font:'imp',up:true,fill:'#ffffff',stroke:'#000000',sw:9,size:100,pre:'orig'},
 caption:{font:'helv',up:false,fill:'#000000',stroke:'#000000',sw:0,size:100,pre:'orig'},
 drake:{font:'helv',up:false,fill:'#000000',stroke:'#000000',sw:0,size:100,pre:'orig'},
 demo:{font:'serif',up:true,fill:'#ffffff',stroke:'#000000',sw:0,size:100,pre:'orig'},
 core:{font:'pixel',up:false,fill:'#ffffff',stroke:'#000000',sw:4,size:100,pre:'core'}
};
var PRE={
 orig:{Bri:0,Con:0,Sat:100,Hue:0,Warm:0,Blur:0,Noise:0,Vig:0,Scan:0,Ab:0,Crush:0},
 insta:{Bri:4,Con:20,Sat:125,Hue:0,Warm:25,Blur:0,Noise:6,Vig:55,Scan:0,Ab:0,Crush:0},
 old:{Bri:6,Con:15,Sat:140,Hue:0,Warm:45,Blur:0,Noise:15,Vig:10,Scan:0,Ab:0,Crush:55},
 fry:{Bri:10,Con:70,Sat:280,Hue:0,Warm:35,Blur:0,Noise:35,Vig:0,Scan:0,Ab:0,Crush:78},
 core:{Bri:-8,Con:20,Sat:70,Hue:0,Warm:-15,Blur:1,Noise:45,Vig:70,Scan:40,Ab:4,Crush:25},
 bw:{Bri:0,Con:25,Sat:0,Hue:0,Warm:0,Blur:0,Noise:20,Vig:40,Scan:0,Ab:0,Crush:0}
};
var DEF_TOP="ME: I'LL SLEEP EARLY TONIGHT",DEF_BOT="ALSO ME AT 4 AM:";

function sched(){cancelAnimationFrame(raf);raf=requestAnimationFrame(render)}
function cvs(w,h){var c=document.createElement('canvas');c.width=w;c.height=h;return c}

function wrap(c,text,maxW){var res=[];text.split('\n').forEach(function(par){
 if(par===''){res.push('');return}
 var line='';par.split(' ').forEach(function(w){
  var test=line?line+' '+w:w;if(c.measureText(test).width<=maxW){line=test;return}
  if(line){res.push(line);line=''}
  if(c.measureText(w).width<=maxW){line=w;return}
  var cur='';Array.from(w).forEach(function(ch){if(cur&&c.measureText(cur+ch).width>maxW){res.push(cur);cur=ch}else cur+=ch});line=cur});
 res.push(line)});return res}
function layText(text,key,base,maxW,maxH){
 if(!text)return{lines:[],size:base,lh:1,h:0,key:key};
 var lh=(FONTS[key]||FONTS.imp).lh,size=base,lines;
 for(var n=0;n<40;n++){sc.font=fs(key,size);lines=wrap(sc,text,maxW);if(lines.length*size*lh<=maxH||size<=14)break;size*=0.93}
 return{lines:lines,size:size,lh:lh,h:lines.length*size*lh,key:key}}
function paint(c,L,cx,top,fill,stroke,sw,ls){
 if(!L.lines.length)return;c.font=fs(L.key,L.size);c.textAlign='center';c.textBaseline='top';c.lineJoin='round';c.miterLimit=2;
 if(ls&&'letterSpacing' in c)c.letterSpacing=ls+'px';
 L.lines.forEach(function(s,i){var y=top+i*L.size*L.lh;
  if(sw>0){c.lineWidth=L.size*sw/50;c.strokeStyle=stroke;c.strokeText(s,cx,y)}
  c.fillStyle=fill;c.fillText(s,cx,y)});
 if('letterSpacing' in c)c.letterSpacing='0px'}

function fx(){var o={};['Bri','Con','Sat','Hue','Warm','Blur','Noise','Vig','Scan','Ab','Crush'].forEach(function(k){o[k]=+$('i'+k).value});return o}
function applyFx(t,f){
 var c=t.getContext('2d'),w=t.width,h=t.height;
 if(f.Blur>0){var k=1/(1+f.Blur*1.2),s=cvs(Math.max(1,w*k|0),Math.max(1,h*k|0));s.getContext('2d').drawImage(t,0,0,s.width,s.height);c.imageSmoothingEnabled=true;c.clearRect(0,0,w,h);c.drawImage(s,0,0,w,h)}
 if(f.Bri||f.Con||f.Sat!==100||f.Hue||f.Warm||f.Noise||f.Ab){
  var d=c.getImageData(0,0,w,h),a=d.data,n=a.length;
  var bri=f.Bri*2.55,cc=f.Con*2.55,cf=(259*(cc+255))/(255*(259-cc)),s=f.Sat/100,wr=f.Warm*0.5,wb=-f.Warm*0.45,nz=f.Noise*1.5;
  var ang=f.Hue*Math.PI/180,co=Math.cos(ang),si=Math.sin(ang),hm=null;
  if(f.Hue)hm=[.213+co*.787-si*.213,.715-co*.715-si*.715,.072-co*.072+si*.928,.213-co*.213+si*.143,.715+co*.285+si*.140,.072-co*.072-si*.283,.213-co*.213-si*.787,.715-co*.715+si*.715,.072+co*.928+si*.072];
  for(var i=0;i<n;i+=4){var r=a[i],g=a[i+1],b=a[i+2],x;
   if(hm){x=hm[0]*r+hm[1]*g+hm[2]*b;var y=hm[3]*r+hm[4]*g+hm[5]*b,z=hm[6]*r+hm[7]*g+hm[8]*b;r=x;g=y;b=z}
   if(s!==1){var gr=.299*r+.587*g+.114*b;r=gr+(r-gr)*s;g=gr+(g-gr)*s;b=gr+(b-gr)*s}
   var e=nz?(Math.random()-.5)*2*nz:0;
   a[i]=(r-128)*cf+128+bri+wr+e;a[i+1]=(g-128)*cf+128+bri+e;a[i+2]=(b-128)*cf+128+bri+wb+e}
  if(f.Ab){var src=new Uint8ClampedArray(a),k2=Math.round(f.Ab*w/1080);
   for(var yy=0;yy<h;yy++)for(var xx=0;xx<w;xx++){var j=(yy*w+xx)*4;a[j]=src[(yy*w+Math.min(w-1,xx+k2))*4];a[j+2]=src[(yy*w+Math.max(0,xx-k2))*4+2]}}
  c.putImageData(d,0,0)}
 if(f.Vig>0){var g=c.createRadialGradient(w/2,h/2,Math.min(w,h)*.25,w/2,h/2,Math.hypot(w,h)/2);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+(f.Vig/100*.9)+')');c.fillStyle=g;c.fillRect(0,0,w,h)}
 if(f.Scan>0){c.fillStyle='rgba(0,0,0,'+(f.Scan/100*.35)+')';var st=Math.max(2,Math.round(w/270));for(var y2=0;y2<h;y2+=st*2)c.fillRect(0,y2,w,st)}}

function region(img,x,y,w,h,f){
 w=Math.round(w);h=Math.round(h);var t=cvs(w,h),c=t.getContext('2d');
 if(img){var z=+$('iZoom').value/100,px=+$('iPx').value/100,py=+$('iPy').value/100,sc2=Math.max(w/img.width,h/img.height)*z,sw=w/sc2,sh=h/sc2;
  var sx=(img.width-sw)/2*(1+px),sy=(img.height-sh)/2*(1+py);c.drawImage(img,sx,sy,sw,sh,0,0,w,h)}
 else{var g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,'#6a7bd1');g.addColorStop(1,'#d16a9b');c.fillStyle=g;c.fillRect(0,0,w,h);
  c.fillStyle='rgba(255,255,255,.85)';c.font='700 '+Math.round(Math.min(w,h)*.07)+'px Pretendard,sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText('📷 사진을 추가해 주세요',w/2,h/2)}
 applyFx(t,f);ctx.drawImage(t,x,y)}

function render(){
 var t=++token,lay=$('iLay').value,W=1080,H=1080,f=fx();
 var key=$('iFont').value,scale=+$('iSize').value/100,fill=$('iFill').value,stroke=$('iStroke').value,sw=+$('iSW').value,up=$('iUp').checked;
 var top=$('iTop').value,bot=$('iBot').value;if(up){top=top.toUpperCase();bot=bot.toUpperCase()}
 var oT=+$('iTy').value,oB=+$('iBy').value,L1,L2;
 if(lay==='impact'||lay==='core'){
  var r=$('iRatio').value.split(':');H=Math.round(W*r[1]/r[0]);
  var core=lay==='core',base=W*(core?.065:.12)*scale,pad=W*(core?.07:.035);
  L1=layText(top,key,base,W*.92,H*.36);L2=layText(bot,key,base,W*.92,H*.36);
  out.width=W;out.height=H;ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);region(img1,0,0,W,H,f);
  paint(ctx,L1,W/2,pad+oT,fill,stroke,sw);paint(ctx,L2,W/2,H-pad-L2.h+oB,fill,stroke,sw);
  if($('iVhs').checked){
   ctx.font='400 '+Math.round(W*.07)+'px VT323,"Courier New",monospace';ctx.textBaseline='top';ctx.textAlign='left';ctx.lineJoin='round';ctx.lineWidth=W*.012;
   var m=W*.04;ctx.strokeStyle='#000';ctx.fillStyle='#fff';ctx.strokeText('PLAY ▶',m,m);ctx.fillText('PLAY ▶',m,m);
   var d=$('iVhsD').value;ctx.textBaseline='bottom';ctx.strokeText('12:00 AM',m,H-m-W*.065);ctx.fillText('12:00 AM',m,H-m-W*.065);ctx.strokeText(d,m,H-m);ctx.fillText(d,m,H-m)}
 }else if(lay==='caption'){
  var bar=$('iBar').value,base2=W*.075*scale,pd=W*.04;
  L1=layText(top,key,base2,W-pd*2,W*.6);L2=layText(bot,key,base2,W-pd*2,W*.6);
  var tb=L1.lines.length?L1.h+pd*2:0,bb=L2.lines.length?L2.h+pd*2:0,ih=W;
  if(img1)ih=Math.round(Math.min(W*2,Math.max(W*.5,W*img1.height/img1.width)));
  H=Math.round(tb+ih+bb);out.width=W;out.height=H;ctx.fillStyle=bar;ctx.fillRect(0,0,W,H);
  region(img1,0,tb,W,ih,f);paint(ctx,L1,W/2,pd+oT,fill,stroke,sw);paint(ctx,L2,W/2,tb+ih+pd+oB,fill,stroke,sw);
 }else if(lay==='drake'){
  var cell=W/2,bs=W*.055*scale;
  L1=layText(top,key,bs,cell-70,cell-60);L2=layText(bot,key,bs,cell-70,cell-60);
  out.width=W;out.height=H;ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H);
  region(img1,0,0,cell,cell,f);region(img2||img1,0,cell,cell,cell,f);
  ctx.fillStyle='#000';ctx.fillRect(cell-2,0,4,H);ctx.fillRect(0,cell-2,W,4);
  paint(ctx,L1,cell+cell/2,(cell-L1.h)/2+oT,fill,stroke,sw);paint(ctx,L2,cell+cell/2,cell+(cell-L2.h)/2+oB,fill,stroke,sw);
 }else{ // demo
  var ts=W*.085*scale;
  L1=layText(top,key,ts,W-200,W*.3);L2=layText(bot,'helv',ts*.4,W-200,W*.25);
  var ty=90+620+12+50;H=Math.round(Math.max(1100,ty+L1.h+(L2.h?26+L2.h:0)+100));
  out.width=W;out.height=H;ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
  region(img1,100,90,880,620,f);ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.strokeRect(88,78,904,644);
  paint(ctx,L1,W/2,ty+oT,fill,stroke,sw,ts*.06);ctx.globalAlpha=.9;paint(ctx,L2,W/2,ty+L1.h+26+oB,fill,stroke,0);ctx.globalAlpha=1}
 // 스티커 / 워터마크
 var emo=$('iEmo').value;if(emo){ctx.font=Math.round(+$('iEs').value*W/1080)+'px '+EMO;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#000';ctx.fillText(emo,W*$('iEx').value/100,H*$('iEy').value/100)}
 var wm=$('iWm').value;if(wm){ctx.font='700 '+Math.round(W*.032)+'px Helvetica,Arial'+FB;ctx.textAlign='right';ctx.textBaseline='bottom';ctx.lineJoin='round';ctx.lineWidth=4;ctx.strokeStyle='rgba(0,0,0,.55)';ctx.fillStyle='rgba(255,255,255,.85)';ctx.strokeText(wm,W-W*.025,H-W*.02);ctx.fillText(wm,W-W*.025,H-W*.02)}
 if(f.Crush>0)crush(f.Crush,t)}

function crush(level,t){
 var passes=level>60?2:1,step=0,w=out.width,h=out.height;
 (function pass(){if(t!==token)return;
  var s=Math.max(.25,1-.7*level/100),c1=cvs(Math.max(8,w*s|0),Math.max(8,h*s|0));c1.getContext('2d').drawImage(out,0,0,c1.width,c1.height);
  var im=new Image();im.onload=function(){if(t!==token)return;ctx.imageSmoothingEnabled=step<passes-1;ctx.drawImage(im,0,0,w,h);ctx.imageSmoothingEnabled=true;step++;if(step<passes)pass()};
  im.src=c1.toDataURL('image/jpeg',Math.max(.04,1-.95*level/100))})()}

function applyLay(){var l=LAY[$('iLay').value];
 $('iFont').value=l.font;$('iUp').checked=l.up;$('iFill').value=l.fill;$('iStroke').value=l.stroke;$('iSW').value=l.sw;$('iSize').value=l.size;$('iPre').value=l.pre;applyPre();vis()}
function applyPre(){var p=PRE[$('iPre').value];for(var k in p)$('i'+k).value=p[k]}
function vis(){var l=$('iLay').value;
 $('lRatio').hidden=!(l==='impact'||l==='core');$('lImg2').hidden=l!=='drake';$('lBar').hidden=l!=='caption';$('lVhs').hidden=!(l==='impact'||l==='core')}

document.querySelectorAll('.editor input,.editor select,.editor textarea').forEach(function(e){e.addEventListener('input',sched);e.addEventListener('change',sched)});
$('iLay').addEventListener('change',function(){applyLay();sched()});
$('iPre').addEventListener('change',function(){applyPre();sched()});
$('iBar').addEventListener('change',function(){$('iFill').value=this.value==='#000000'?'#ffffff':'#000000';sched()});
function load(inp,set){inp.addEventListener('change',function(){var f=inp.files&&inp.files[0];if(!f){set(null);sched();return}
 var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){set(im);sched()};im.src=r.result};r.readAsDataURL(f)})}
load($('iImg'),function(i){img1=i});load($('iImg2'),function(i){img2=i});

$('savePng').onclick=function(){var a=document.createElement('a');a.download='meme.png';a.href=out.toDataURL('image/png');a.click()};
$('reset').onclick=function(){img1=img2=null;$('iImg').value='';$('iImg2').value='';$('iLay').value='impact';applyLay();
 $('iTop').value=DEF_TOP;$('iBot').value=DEF_BOT;['iTy','iBy','iPx','iPy'].forEach(function(k){$(k).value=0});$('iZoom').value=100;
 $('iEmo').value='';$('iEs').value=220;$('iEx').value=85;$('iEy').value=18;$('iWm').value='';$('iVhs').checked=false;$('iVhsD').value='JAN. 01 2012';$('iRatio').value='1:1';$('iBar').value='#ffffff';sched()};

$('iTop').value=DEF_TOP;$('iBot').value=DEF_BOT;applyLay();render();
try{Promise.all(['40px Anton','40px "Archivo Black"','700 40px "Comic Neue"','40px VT323','40px "Special Elite"'].map(function(f){return document.fonts.load(f)})).then(sched)}catch(e){}
})();
