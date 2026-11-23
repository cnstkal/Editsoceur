(function(){
var $=function(i){return document.getElementById(i)};
var out=$('out'),ctx=out.getContext('2d'),imgs=[],raf=0;
var FB=', Pretendard, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif';
var EMO='"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
var TF={pret:'800 {s}px Pretendard',anton:'400 {s}px Anton,Impact',comic:'700 {s}px "Comic Neue","Comic Sans MS"',type:'400 {s}px "Special Elite","Courier New"'};
var PRE={orig:{Bri:0,Con:0,Sat:100,Warm:0,Glow:0,Grain:0},booth:{Bri:8,Con:-8,Sat:105,Warm:6,Glow:40,Grain:0},film:{Bri:0,Con:15,Sat:85,Warm:18,Glow:10,Grain:30},bw:{Bri:0,Con:20,Sat:0,Warm:0,Glow:0,Grain:12},vivid:{Bri:4,Con:25,Sat:150,Warm:0,Glow:0,Grain:0},cool:{Bri:2,Con:10,Sat:95,Warm:-22,Glow:12,Grain:0}};
var LAYS={strip:{W:720,H:2160,c:1,r:4,f:240},grid4:{W:1080,H:1620,c:2,r:2,f:240},grid6:{W:1080,H:1620,c:2,r:3,f:240}};
function cvs(w,h){var c=document.createElement('canvas');c.width=w;c.height=h;return c}
function sched(){cancelAnimationFrame(raf);raf=requestAnimationFrame(render)}
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function rr(c,x,y,w,h,r){r=Math.max(0,Math.min(r,w/2,h/2));c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function today(){var d=new Date();return d.getFullYear()+'.'+('0'+(d.getMonth()+1)).slice(-2)+'.'+('0'+d.getDate()).slice(-2)}

function placeholder(i,w,h){var c=cvs(w,h),g=c.getContext('2d'),hues=[340,200,45,150,280,20],hu=hues[i%hues.length],gr=g.createLinearGradient(0,0,w,h);
 gr.addColorStop(0,'hsl('+hu+',80%,82%)');gr.addColorStop(1,'hsl('+(hu+30)+',85%,68%)');g.fillStyle=gr;g.fillRect(0,0,w,h);
 g.font=Math.round(Math.min(w,h)*.5)+'px '+EMO;g.textAlign='center';g.textBaseline='middle';g.fillText(['😀','😎','🥰','🤪','😴','🤩'][i%6],w/2,h/2);return c}

function cover(src,w,h){var c=cvs(w,h),g=c.getContext('2d'),z=+$('iZoom').value/100,px=+$('iPx').value/100,py=+$('iPy').value/100,s0=Math.max(w/src.width,h/src.height)*z,sw=w/s0,sh=h/s0;
 g.imageSmoothingQuality='high';if($('iMirror').checked){g.translate(w,0);g.scale(-1,1)}
 g.drawImage(src,(src.width-sw)/2*(1+px),(src.height-sh)/2*(1+py),sw,sh,0,0,w,h);return c}
function filter(c){var w=c.width,h=c.height,g=c.getContext('2d'),bri=+$('iBri').value*2.55,cc=+$('iCon').value*2.55,cf=(259*(cc+255))/(255*(259-cc)),s=+$('iSat').value/100,wr=+$('iWarm').value*.5,wb=-+$('iWarm').value*.45,gn=+$('iGrain').value*1.2,gl=+$('iGlow').value;
 if(bri||cc||s!==1||wr||gn){var d=g.getImageData(0,0,w,h),a=d.data;for(var i=0;i<a.length;i+=4){var r=a[i],gg=a[i+1],b=a[i+2],gr=.299*r+.587*gg+.114*b;r=gr+(r-gr)*s;gg=gr+(gg-gr)*s;b=gr+(b-gr)*s;var e=gn?(Math.random()-.5)*2*gn:0;a[i]=(r-128)*cf+128+bri+wr+e;a[i+1]=(gg-128)*cf+128+bri+e;a[i+2]=(b-128)*cf+128+bri+wb+e}g.putImageData(d,0,0)}
 if(gl>0){var sm=cvs(Math.max(2,w>>3),Math.max(2,h>>3)),sg=sm.getContext('2d');sg.drawImage(c,0,0,sm.width,sm.height);g.save();g.globalCompositeOperation='screen';g.globalAlpha=gl/100*.55;g.imageSmoothingEnabled=true;g.drawImage(sm,0,0,w,h);g.restore()}}

function background(W,H){var st=$('iBgS').value,c1=$('iC1').value,c2=$('iC2').value,s=W*.05;ctx.fillStyle=c1;ctx.fillRect(0,0,W,H);
 if(st==='grad'){var g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,c1);g.addColorStop(1,c2);ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
 else if(st==='dots'){ctx.fillStyle=c2;for(var y=0,row=0;y<H+s;y+=s,row++)for(var x=(row%2)*s/2;x<W+s;x+=s){ctx.beginPath();ctx.arc(x,y,s*.17,0,7);ctx.fill()}}
 else if(st==='stripes'){ctx.save();ctx.translate(W/2,H/2);ctx.rotate(-.5);ctx.fillStyle=c2;var big=Math.hypot(W,H);for(var k=-big;k<big;k+=s*2)ctx.fillRect(-big,k,big*2,s);ctx.restore()}
 else if(st==='check'){ctx.fillStyle=c2;for(var yy=0;yy<H;yy+=s)for(var xx=0;xx<W;xx+=s)if(((xx/s|0)+(yy/s|0))%2===0)ctx.fillRect(xx,yy,s,s)}
 else if(st==='stars'||st==='hearts'){ctx.fillStyle=c2;ctx.globalAlpha=.7;ctx.font=Math.round(s*.8)+'px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';var gl=st==='stars'?'★':'♥';for(var y3=0,r3=0;y3<H+s;y3+=s*1.2,r3++)for(var x3=(r3%2)*s*.75;x3<W+s;x3+=s*1.5)ctx.fillText(gl,x3,y3);ctx.globalAlpha=1}}

function render(){
 var L=LAYS[$('iLay').value],W=L.W,H=L.H,m=+$('iMar').value,g=+$('iGap').value,f=L.f;
 out.width=W;out.height=H;background(W,H);
 var cw=Math.round((W-2*m-(L.c-1)*g)/L.c),ch=Math.round((H-2*m-f-(L.r-1)*g)/L.r),rad=+$('iRad').value,bw=+$('iBw').value,rects=[];
 for(var i=0;i<L.c*L.r;i++){var x=m+(i%L.c)*(cw+g),y=m+Math.floor(i/L.c)*(ch+g);rects.push([x,y,cw,ch]);
  var src=imgs.length?imgs[i%imgs.length]:placeholder(i,cw*2,ch*2),cell=cover(src,cw,ch);filter(cell);
  ctx.save();
  if(bw>0||$('iSh').checked){ctx.save();if($('iSh').checked){ctx.shadowColor='rgba(0,0,0,.22)';ctx.shadowBlur=W*.015;ctx.shadowOffsetY=W*.006}ctx.fillStyle=$('iBc').value;rr(ctx,x-bw,y-bw,cw+2*bw,ch+2*bw,rad+bw);ctx.fill();ctx.restore()}
  rr(ctx,x,y,cw,ch,rad);ctx.clip();ctx.drawImage(cell,0,0,cw,ch,x,y,cw,ch);ctx.restore()}
 // 하단 글자
 var fy=H-m-f+g,tc=$('iTc').value,title=$('iTitle').value,cap=$('iCap').value,dt=$('iDate').value||today(),showD=$('iDOn').checked;
 ctx.fillStyle=tc;ctx.textAlign='center';ctx.textBaseline='middle';
 var lines=[];if(title)lines.push([title,W*.085*(W===720?1.25:1),TF[$('iTF').value]]);if(cap)lines.push([cap,W*.04*(W===720?1.15:1),'600 {s}px Pretendard']);if(showD)lines.push([dt,W*.038*(W===720?1.1:1),'400 {s}px "Courier New",monospace']);
 var total=lines.reduce(function(a,l){return a+l[1]*1.25},0),cy=fy+(f-g-0)/2-total/2;
 lines.forEach(function(l){ctx.font=l[2].replace('{s}',Math.round(l[1]))+FB;ctx.fillText(l[0],W/2,cy+l[1]*.62);cy+=l[1]*1.25});
 // 스티커
 var emo=$('iEmo').value,n=+$('iEn').value;
 if(emo&&n){var R=rng(77),es=+$('iEs').value*W/1080;ctx.font=Math.round(es)+'px '+EMO;ctx.textAlign='center';ctx.textBaseline='middle';
  for(var k=0;k<n;k++){for(var t=0;t<40;t++){var sx=R()*W,sy=R()*H,inside=rects.some(function(r){return sx>r[0]+es*.2&&sx<r[0]+r[2]-es*.2&&sy>r[1]+es*.2&&sy<r[1]+r[3]-es*.2});if(!inside){ctx.save();ctx.translate(sx,sy);ctx.rotate((R()-.5)*.9);ctx.fillText(emo,0,0);ctx.restore();break}}}}
 // 바깥 둥근 모서리
 var orad=+$('iOut').value;if(orad>0){ctx.save();ctx.globalCompositeOperation='destination-in';rr(ctx,0,0,W,H,orad*W/540);ctx.fillStyle='#000';ctx.fill();ctx.restore()}
 $('info').textContent=W+' × '+H+(imgs.length?' · 사진 '+imgs.length+'장':' · 사진을 올리면 프레임이 채워져요')}

function applyPre(){var p=PRE[$('iPre').value];for(var k in p)$('i'+k).value=p[k]}
$('iPre').addEventListener('change',function(){applyPre();sched()});
$('iDate').value=today();
var EL=[].slice.call(document.querySelectorAll('.editor input:not([type=file]),.editor select')),DEFS={};
EL.forEach(function(e){DEFS[e.id]=e.type==='checkbox'?e.checked:e.value;e.addEventListener('input',sched);e.addEventListener('change',sched)});
$('iImg').addEventListener('change',function(){var fl=[].slice.call(this.files||[]).slice(0,12);imgs=[];if(!fl.length){sched();return}var left=fl.length,arr=new Array(fl.length);
 fl.forEach(function(f,i){var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){arr[i]=im;if(--left===0){imgs=arr.filter(Boolean);sched()}};im.onerror=function(){if(--left===0){imgs=arr.filter(Boolean);sched()}};im.src=r.result};r.readAsDataURL(f)})});
$('shuffle').onclick=function(){for(var i=imgs.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=imgs[i];imgs[i]=imgs[j];imgs[j]=t}sched()};
$('savePng').onclick=function(){var a=document.createElement('a');a.download='4cut.png';a.href=out.toDataURL('image/png');a.click()};
$('share').onclick=function(){out.toBlob(function(b){if(!b)return;var f=new File([b],'4cut.png',{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]}))navigator.share({files:[f]}).catch(function(){});else $('savePng').onclick()},'image/png')};
$('reset').onclick=function(){imgs=[];$('iImg').value='';EL.forEach(function(e){if(e.type==='checkbox')e.checked=DEFS[e.id];else e.value=DEFS[e.id]});sched()};
render();
try{Promise.all(['40px Anton','700 40px "Comic Neue"','40px "Special Elite"'].map(function(f){return document.fonts.load(f)})).then(sched)}catch(e){}
})();
