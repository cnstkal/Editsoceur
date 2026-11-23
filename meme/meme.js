(function(){
var $=function(i){return document.getElementById(i)};
var out=$('out'),ctx=out.getContext('2d'),sc=document.createElement('canvas').getContext('2d');
var imgs=[],token=0,raf=0,TS={};
var FB=', Pretendard, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif';
var FONTS={imp:{f:'Anton, Impact, "Arial Narrow"',w:'400',lh:1.08},arial:{f:'"Archivo Black", "Arial Black", Arial',w:'400',lh:1.12},helv:{f:'Helvetica, Arial',w:'700',lh:1.15},comic:{f:'"Comic Neue", "Comic Sans MS", cursive',w:'700',lh:1.15},serif:{f:'"Times New Roman", Times, serif',w:'700',lh:1.15},pixel:{f:'VT323, "Courier New", monospace',w:'400',lh:1.05},type:{f:'"Special Elite", "Courier New", monospace',w:'400',lh:1.2},kr:{f:'Pretendard',w:'800',lh:1.2},sans:{f:'Arial, Helvetica',w:'400',lh:1.25}};
var EMO='"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
var EM=['😂','💀','🔥','😭','🤡','🗿','💯','😎','🥶','🫠','👁️👄👁️','👍','🙏','🤯','😳','🥵','🐸','🐶','🐱','❓','❗','💢','💥','✨','⭐','❤️','🤔','😤','😈','👀','🫡','#LOL','#NO','#OOF','#DEAD','#NPC','#POV','#BRUH','#FAIL','#WTF'];
function fs(k,size){var o=FONTS[k]||FONTS.imp;return o.w+' '+Math.round(size)+'px '+o.f+FB}

var LAY={
 impact:{font:'imp',up:true,fill:'#ffffff',stroke:'#000000',sw:9,pre:'orig'},
 caption:{font:'helv',up:false,fill:'#000000',stroke:'#000000',sw:0,pre:'orig'},
 drake:{font:'helv',up:false,fill:'#000000',stroke:'#000000',sw:0,pre:'orig'},
 side:{font:'helv',up:true,fill:'#000000',stroke:'#000000',sw:0,pre:'orig'},
 grid4:{font:'imp',up:true,fill:'#ffffff',stroke:'#000000',sw:8,pre:'orig'},
 brain:{font:'helv',up:false,fill:'#000000',stroke:'#000000',sw:0,pre:'orig'},
 strip:{font:'comic',up:false,fill:'#000000',stroke:'#000000',sw:0,pre:'orig'},
 tier:{font:'helv',up:false,fill:'#ffffff',stroke:'#000000',sw:0,pre:'orig'},
 demo:{font:'serif',up:true,fill:'#ffffff',stroke:'#000000',sw:0,pre:'orig'},
 error:{font:'sans',up:false,fill:'#000000',stroke:'#000000',sw:0,pre:'orig'},
 cinema:{font:'helv',up:true,fill:'#ffffff',stroke:'#000000',sw:6,pre:'orig'},
 core:{font:'pixel',up:false,fill:'#ffffff',stroke:'#000000',sw:4,pre:'core'}
};
var SAMPLE={
 impact:["ME: I'LL SLEEP EARLY TONIGHT","ALSO ME AT 4 AM:"],
 caption:["me trying to act normal after sending the wrong text to the wrong person",""],
 drake:["공부하기","유튜브 알고리즘 5시간"],
 side:["EXPECTATION","REALITY"],
 grid4:["월요일\n화요일\n수요일\n목요일",""],
 brain:["일찍 자기\n누워서 폰 보기\n그냥 안 자기\n밤새고 출근하기",""],
 strip:["아침 7시, 알람이 울린다\n5분만 더...\n눈을 뜨니 오후 2시","- 끝 -"],
 tier:["도넛\n피자\n라면\n김밥\n파인애플 피자","음식 티어표"],
 demo:["MOTIVATION","SOMETIMES THE BEST PLAN IS TO NAP"],
 error:["일요일 밤이 감지되었습니다.\n월요일을 막을 수 없습니다.","치명적 오류"],
 cinema:["A FILM BY NOBODY","I DIDN'T COME THIS FAR TO ONLY COME THIS FAR."],
 core:["","i miss when it was just us"]
};
var HINT={
 impact:'위/아래 문구를 입력해요.',
 caption:'위 문구는 사진 위 바, 아래 문구는 사진 아래 바에 들어가요.',
 drake:'위 문구=윗칸, 아래 문구=아랫칸. 사진을 2장 선택하면 칸마다 들어가요.',
 side:'위 문구=왼쪽 제목, 아래 문구=오른쪽 제목. 사진 2장을 선택하세요.',
 grid4:'위 문구에 줄바꿈으로 칸마다 입력(최대 4줄). 사진은 최대 4장.',
 brain:'위 문구에 줄바꿈으로 단계마다 입력(2~6줄). 사진 여러 장 가능.',
 strip:'위 문구에 줄바꿈으로 컷마다 자막(2~4줄). 아래 문구=하단 서명.',
 tier:'위 문구에 줄바꿈으로 S·A·B·C·D 칸 내용 입력. 아래 문구=제목.',
 demo:'위 문구=큰 제목, 아래 문구=작은 부제.',
 error:'위 문구=오류 메시지, 아래 문구=창 제목. 사진은 배경으로 깔려요.',
 cinema:'아래 문구=영화 자막, 위 문구=상단 크레딧.',
 core:'VHS 오버레이(꾸미기 탭)를 켜면 PLAY ▶와 날짜가 붙어요.'
};
var RND=[["ME: I'LL SLEEP EARLY TONIGHT","ALSO ME AT 4 AM:"],["NOBODY:","ABSOLUTELY NOBODY:\nME:"],["WHEN THE WIFI DIES","AND YOU REMEMBER YOU HAVE A LIFE"],["ONE DOES NOT SIMPLY","WALK INTO MONDAY"],["BRAIN: SLEEP NOW?","ME: HERE ARE ALL YOUR CRINGE MEMORIES"],["ME: I HAVE NO MONEY","ALSO ME: ONE MORE ORDER"],["POV:","YOU SAID 'JUST FIVE MINUTES'"],["TFW NO PLANS","AND IT'S THE BEST DAY EVER"],["WHAT I ORDERED","WHAT I GOT"],["나: 오늘은 일찍 잔다","새벽 4시의 나:"],["남들: 퇴근","나:"],["내 월급","통장을 스쳐 지나가는 중"]];
var PRE={
 orig:{Bri:0,Con:0,Sat:100,Hue:0,Warm:0,Blur:0,Noise:0,Vig:0,Scan:0,Ab:0,Glitch:0,Pix:0,Post:0,Crush:0},
 insta:{Bri:4,Con:20,Sat:125,Hue:0,Warm:25,Blur:0,Noise:6,Vig:55,Scan:0,Ab:0,Glitch:0,Pix:0,Post:0,Crush:0},
 old:{Bri:6,Con:15,Sat:140,Hue:0,Warm:45,Blur:0,Noise:15,Vig:10,Scan:0,Ab:0,Glitch:0,Pix:0,Post:0,Crush:55},
 fry:{Bri:10,Con:70,Sat:280,Hue:0,Warm:35,Blur:0,Noise:35,Vig:0,Scan:0,Ab:0,Glitch:0,Pix:0,Post:0,Crush:78},
 core:{Bri:-8,Con:20,Sat:70,Hue:0,Warm:-15,Blur:1,Noise:45,Vig:70,Scan:40,Ab:4,Glitch:0,Pix:0,Post:0,Crush:25},
 bw:{Bri:0,Con:25,Sat:0,Hue:0,Warm:0,Blur:0,Noise:20,Vig:40,Scan:0,Ab:0,Glitch:0,Pix:0,Post:0,Crush:0},
 glitch:{Bri:0,Con:25,Sat:130,Hue:0,Warm:0,Blur:0,Noise:20,Vig:0,Scan:30,Ab:9,Glitch:45,Pix:0,Post:0,Crush:15},
 pixel:{Bri:0,Con:25,Sat:160,Hue:0,Warm:0,Blur:0,Noise:0,Vig:0,Scan:0,Ab:0,Glitch:0,Pix:62,Post:5,Crush:0},
 vapor:{Bri:5,Con:15,Sat:170,Hue:300,Warm:-10,Blur:0,Noise:10,Vig:25,Scan:20,Ab:3,Glitch:0,Pix:0,Post:0,Crush:0},
 sepia:{Bri:0,Con:10,Sat:40,Hue:0,Warm:45,Blur:0,Noise:22,Vig:55,Scan:0,Ab:0,Glitch:0,Pix:0,Post:0,Crush:10},
 cctv:{Bri:-10,Con:30,Sat:0,Hue:0,Warm:-10,Blur:0,Noise:50,Vig:30,Scan:50,Ab:3,Glitch:0,Pix:10,Post:0,Crush:20}
};
var FXK=['Bri','Con','Sat','Hue','Warm','Blur','Noise','Vig','Scan','Ab','Glitch','Pix','Post','Crush'];

function sched(){cancelAnimationFrame(raf);raf=requestAnimationFrame(render)}
function cvs(w,h){var c=document.createElement('canvas');c.width=w;c.height=h;return c}
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function IMG(n){return imgs[n]||imgs[0]||null}
function lns(s){return s.split('\n').map(function(x){return x.trim()}).filter(Boolean)}

function wrap(c,text,maxW){var res=[];text.split('\n').forEach(function(par){
 if(par===''){res.push('');return}
 var line='';par.split(' ').forEach(function(w){
  var test=line?line+' '+w:w;if(c.measureText(test).width<=maxW){line=test;return}
  if(line){res.push(line);line=''}
  if(c.measureText(w).width<=maxW){line=w;return}
  var cur='';Array.from(w).forEach(function(ch){if(cur&&c.measureText(cur+ch).width>maxW){res.push(cur);cur=ch}else cur+=ch});line=cur});
 res.push(line)});return res}
function layText(text,key,base,maxW,maxH,trk){
 if(!text)return{lines:[],size:base,lh:1,h:0,w:0,key:key};
 var lh=(FONTS[key]||FONTS.imp).lh,size=base,lines;
 trk=trk==null?TS.trk:trk;
 for(var n=0;n<40;n++){sc.font=fs(key,size);if('letterSpacing' in sc)sc.letterSpacing=(trk*size/50)+'px';lines=wrap(sc,text,maxW);if(lines.length*size*lh<=maxH||size<=14)break;size*=0.93}
 var w=0;lines.forEach(function(s){w=Math.max(w,sc.measureText(s).width)});
 return{lines:lines,size:size,lh:lh,h:lines.length*size*lh,w:w,key:key}}
function paint(c,L,cx,top,o){
 o=o||TS;if(!L.lines.length)return;c.save();
 if(o.rot){c.translate(cx,top+L.h/2);c.rotate(o.rot*Math.PI/180);cx=0;top=-L.h/2}
 c.font=fs(L.key,L.size);c.textAlign=o.align||'center';c.textBaseline='top';c.lineJoin='round';c.miterLimit=2;
 if('letterSpacing' in c)c.letterSpacing=((o.trk||0)*L.size/50)+'px';
 L.lines.forEach(function(s,i){var y=top+i*L.size*L.lh;
  if(o.box&&s){var w=c.measureText(s).width+L.size*.5,x0=o.align==='left'?cx-L.size*.25:cx-w/2;c.fillStyle=o.box;c.fillRect(x0,y,w,L.size*L.lh*.98)}
  if(o.shadow){c.shadowColor='rgba(0,0,0,.65)';c.shadowBlur=L.size*.12;c.shadowOffsetX=c.shadowOffsetY=L.size*.05}
  if(o.sw>0){c.lineWidth=L.size*o.sw/50;c.strokeStyle=o.stroke;c.strokeText(s,cx,y)}
  c.fillStyle=o.fill;c.fillText(s,cx,y);c.shadowColor='transparent'});
 c.restore()}
function plain(fill,extra){var o={fill:fill,stroke:'#000',sw:0,box:'',shadow:false,trk:0,rot:0};for(var k in extra)o[k]=extra[k];return o}

function fx(){var o={};FXK.forEach(function(k){o[k]=+$('i'+k).value});o.Inv=$('iInv').checked;return o}
function applyFx(t,f,seed){
 var c=t.getContext('2d'),w=t.width,h=t.height;
 if(f.Blur>0){var k=1/(1+f.Blur*1.2),s=cvs(Math.max(1,w*k|0),Math.max(1,h*k|0));s.getContext('2d').drawImage(t,0,0,s.width,s.height);c.imageSmoothingEnabled=true;c.clearRect(0,0,w,h);c.drawImage(s,0,0,w,h)}
 if(f.Pix>0){var bw=Math.max(8,Math.round(w*Math.pow(1-f.Pix/100,2)+8)),bh=Math.max(8,Math.round(h*bw/w)),s2=cvs(bw,bh);s2.getContext('2d').drawImage(t,0,0,bw,bh);c.imageSmoothingEnabled=false;c.clearRect(0,0,w,h);c.drawImage(s2,0,0,w,h);c.imageSmoothingEnabled=true}
 if(f.Bri||f.Con||f.Sat!==100||f.Hue||f.Warm||f.Noise||f.Ab||f.Post||f.Inv){
  var d=c.getImageData(0,0,w,h),a=d.data,n=a.length;
  var bri=f.Bri*2.55,cc=f.Con*2.55,cf=(259*(cc+255))/(255*(259-cc)),s=f.Sat/100,wr=f.Warm*0.5,wb=-f.Warm*0.45,nz=f.Noise*1.5,po=f.Post>=2?f.Post-1:0;
  var ang=f.Hue*Math.PI/180,co=Math.cos(ang),si=Math.sin(ang),hm=null;
  if(f.Hue)hm=[.213+co*.787-si*.213,.715-co*.715-si*.715,.072-co*.072+si*.928,.213-co*.213+si*.143,.715+co*.285+si*.140,.072-co*.072-si*.283,.213-co*.213-si*.787,.715-co*.715+si*.715,.072+co*.928+si*.072];
  for(var i=0;i<n;i+=4){var r=a[i],g=a[i+1],b=a[i+2],x;
   if(hm){x=hm[0]*r+hm[1]*g+hm[2]*b;var y=hm[3]*r+hm[4]*g+hm[5]*b,z=hm[6]*r+hm[7]*g+hm[8]*b;r=x;g=y;b=z}
   if(s!==1){var gr=.299*r+.587*g+.114*b;r=gr+(r-gr)*s;g=gr+(g-gr)*s;b=gr+(b-gr)*s}
   var e=nz?(Math.random()-.5)*2*nz:0;
   r=(r-128)*cf+128+bri+wr+e;g=(g-128)*cf+128+bri+e;b=(b-128)*cf+128+bri+wb+e;
   if(po){r=r<0?0:r>255?255:r;g=g<0?0:g>255?255:g;b=b<0?0:b>255?255:b;r=Math.round(r/255*po)*255/po;g=Math.round(g/255*po)*255/po;b=Math.round(b/255*po)*255/po}
   if(f.Inv){r=255-r;g=255-g;b=255-b}
   a[i]=r;a[i+1]=g;a[i+2]=b}
  if(f.Ab){var src=new Uint8ClampedArray(a),k2=Math.max(1,Math.round(f.Ab*w/1080));
   for(var yy=0;yy<h;yy++)for(var xx=0;xx<w;xx++){var j=(yy*w+xx)*4;a[j]=src[(yy*w+Math.min(w-1,xx+k2))*4];a[j+2]=src[(yy*w+Math.max(0,xx-k2))*4+2]}}
  c.putImageData(d,0,0)}
 if(f.Glitch>0){var cp=cvs(w,h);cp.getContext('2d').drawImage(t,0,0);var R=rng(seed||7),N=Math.round(f.Glitch/5);
  for(var q=0;q<N;q++){var gy=R()*h,gh=h*(.008+R()*.05),dx=(R()-.5)*w*.18*(.4+f.Glitch/100);c.drawImage(cp,0,gy,w,gh,dx,gy,w,gh)}}
 if(f.Vig>0){var g2=c.createRadialGradient(w/2,h/2,Math.min(w,h)*.25,w/2,h/2,Math.hypot(w,h)/2);g2.addColorStop(0,'rgba(0,0,0,0)');g2.addColorStop(1,'rgba(0,0,0,'+(f.Vig/100*.9)+')');c.fillStyle=g2;c.fillRect(0,0,w,h)}
 if(f.Scan>0){c.fillStyle='rgba(0,0,0,'+(f.Scan/100*.35)+')';var st=Math.max(2,Math.round(w/270));for(var y2=0;y2<h;y2+=st*2)c.fillRect(0,y2,w,st)}}

var FL=false;
function region(img,x,y,w,h,f,glowIdx){
 w=Math.round(w);h=Math.round(h);var t=cvs(w,h),c=t.getContext('2d');
 if(img){var z=+$('iZoom').value/100,px=+$('iPx').value/100,py=+$('iPy').value/100,s0=Math.max(w/img.width,h/img.height)*z,sw=w/s0,sh=h/s0;
  var sx=(img.width-sw)/2*(1+px),sy=(img.height-sh)/2*(1+py);
  if(FL){c.translate(w,0);c.scale(-1,1)}c.drawImage(img,sx,sy,sw,sh,0,0,w,h)}
 else{var g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,'#6a7bd1');g.addColorStop(1,'#d16a9b');c.fillStyle=g;c.fillRect(0,0,w,h);
  c.fillStyle='rgba(255,255,255,.85)';c.font='700 '+Math.round(Math.min(w,h)*.07)+'px Pretendard,sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText('📷 사진을 추가해 주세요',w/2,h/2)}
 applyFx(t,f,x+y+w+7);ctx.drawImage(t,x,y)}

function render(){
 var t=++token,lay=$('iLay').value,W=1080,H=1080,f=fx();FL=$('iFlip').checked;
 var key=$('iFont').value,scale=+$('iSize').value/100,up=$('iUp').checked;
 TS={fill:$('iFill').value,stroke:$('iStroke').value,sw:+$('iSW').value,box:$('iBox').value,shadow:$('iShadow').checked,trk:+$('iTrk').value,rot:+$('iRot').value};
 var top=$('iTop').value,bot=$('iBot').value;if(up){top=top.toUpperCase();bot=bot.toUpperCase()}
 var oT=+$('iTy').value,oB=+$('iBy').value,L1,L2,r,bar=$('iBar').value;
 function setSize(w,h){W=w;H=h;out.width=w;out.height=h}
 if(lay==='impact'||lay==='core'){
  r=$('iRatio').value.split(':');var core=lay==='core',base=W*(core?.065:.12)*scale,pad=W*(core?.07:.035);H=Math.round(W*r[1]/r[0]);
  L1=layText(top,key,base,W*.92,H*.36);L2=layText(bot,key,base,W*.92,H*.36);
  setSize(W,H);ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);region(IMG(0),0,0,W,H,f);
  paint(ctx,L1,W/2,pad+oT);paint(ctx,L2,W/2,H-pad-L2.h+oB);
 }else if(lay==='caption'){
  var base2=W*.075*scale,pd=W*.04;L1=layText(top,key,base2,W-pd*2,W*.6);L2=layText(bot,key,base2,W-pd*2,W*.6);
  var tb=L1.lines.length?L1.h+pd*2:0,bb=L2.lines.length?L2.h+pd*2:0,ih=W,im=IMG(0);
  if(im)ih=Math.round(Math.min(W*2,Math.max(W*.5,W*im.height/im.width)));
  setSize(W,Math.round(tb+ih+bb));ctx.fillStyle=bar;ctx.fillRect(0,0,W,H);
  region(im,0,tb,W,ih,f);paint(ctx,L1,W/2,pd+oT);paint(ctx,L2,W/2,tb+ih+pd+oB);
 }else if(lay==='drake'){
  var cell=W/2,bs=W*.075*scale;L1=layText(top,key,bs,cell-70,cell-60);L2=layText(bot,key,bs,cell-70,cell-60);
  setSize(W,W);ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H);
  region(IMG(0),0,0,cell,cell,f);region(IMG(1),0,cell,cell,cell,f);
  ctx.fillStyle='#000';ctx.fillRect(cell-2,0,4,H);ctx.fillRect(0,cell-2,W,4);
  paint(ctx,L1,cell*1.5,(cell-L1.h)/2+oT);paint(ctx,L2,cell*1.5,cell+(cell-L2.h)/2+oB);
 }else if(lay==='side'){
  var bh=Math.round(W*.15),chh=720,sb=W*.07*scale;L1=layText(top,key,sb,W/2-60,bh-30);L2=layText(bot,key,sb,W/2-60,bh-30);
  setSize(W,bh+chh);ctx.fillStyle=bar;ctx.fillRect(0,0,W,H);
  region(IMG(0),0,bh,W/2,chh,f);region(IMG(1),W/2,bh,W/2,chh,f);ctx.fillStyle=bar;ctx.fillRect(W/2-3,bh,6,chh);
  paint(ctx,L1,W/4,(bh-L1.h)/2+oT);paint(ctx,L2,W*.75,(bh-L2.h)/2+oB);
 }else if(lay==='grid4'){
  var ls=lns(top);setSize(W,W);ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H);
  for(var i=0;i<4;i++){var gx=(i%2)*540,gy=(i>>1)*540;region(IMG(i),gx,gy,540,540,f);
   var Lg=layText(ls[i]||'',key,W*.07*scale,500,220);paint(ctx,Lg,gx+270,gy+540-24-Lg.h+oB)}
  ctx.fillStyle='#fff';ctx.fillRect(W/2-3,0,6,H);ctx.fillRect(0,H/2-3,W,6);
 }else if(lay==='brain'){
  var lb=lns(top),n=Math.min(6,Math.max(2,lb.length)),rowH=200;setSize(W,n*rowH);
  for(var j=0;j<n;j++){var ry=j*rowH;ctx.fillStyle=j%2?'#f2f2f2':'#fff';ctx.fillRect(0,ry,720,rowH);
   var Lr=layText(lb[j]||'',key,W*.06*scale,650,rowH-40);paint(ctx,Lr,360,ry+(rowH-Lr.h)/2+oT);
   var ff=Object.assign({},f);ff.Bri+=j*6;ff.Sat+=j*18;region(IMG(j),720,ry,360,rowH,ff);
   if(j){var gl=ctx.createRadialGradient(900,ry+rowH/2,0,900,ry+rowH/2,230);gl.addColorStop(0,'rgba(255,255,255,'+Math.min(.75,.14*j)+')');gl.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=gl;ctx.fillRect(720,ry,360,rowH)}
   ctx.fillStyle='rgba(0,0,0,.18)';ctx.fillRect(0,ry,W,2)}
 }else if(lay==='strip'){
  var lt=lns(top),np=Math.min(4,Math.max(2,lt.length||2)),pw=960,ph=520,gap=40,m=60;
  L2=layText(bot,key,W*.05*scale,W-120,200);var foot=L2.lines.length?L2.h+60:0;
  setSize(W,m+np*ph+(np-1)*gap+m+foot);ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H);
  for(var p=0;p<np;p++){var py=m+p*(ph+gap);region(IMG(p),m,py,pw,ph,f);ctx.strokeStyle='#000';ctx.lineWidth=8;ctx.strokeRect(m,py,pw,ph);
   if(lt[p]){var Lc=layText(lt[p],key,W*.04*scale,600,170),bw2=Lc.w+40,bh2=Lc.h+30;ctx.fillStyle='#ffe97a';ctx.fillRect(m,py,bw2,bh2);ctx.lineWidth=4;ctx.strokeRect(m,py,bw2,bh2);paint(ctx,Lc,m+bw2/2,py+15,plain('#000'))}}
  paint(ctx,L2,W/2,H-m-foot+30+oB);
 }else if(lay==='tier'){
  var lq=lns(top),rows=5,rh=150,cols=['#ff7f7f','#ffbf7f','#ffdf7f','#bfff7f','#7fbfff'],lab=['S','A','B','C','D'];
  L2=layText(bot,key,W*.07*scale,W-80,110);var th=L2.lines.length?Math.round(L2.h+50):0;
  setSize(W,th+rows*rh);ctx.fillStyle='#111';ctx.fillRect(0,0,W,H);paint(ctx,L2,W/2,25+oB,plain(TS.fill,{sw:TS.sw,stroke:TS.stroke}));
  for(var q=0;q<rows;q++){var ty=th+q*rh;ctx.fillStyle=cols[q];ctx.fillRect(0,ty,150,rh);ctx.fillStyle='#262626';ctx.fillRect(150,ty,W-150,rh);
   ctx.fillStyle='#000';ctx.font=fs('imp',100);ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(lab[q],75,ty+rh/2+4);
   var Lt=layText(lq[q]||'','helv',W*.045*scale,W-150-60,rh-24);paint(ctx,Lt,150+(W-150)/2,ty+(rh-Lt.h)/2+oT,plain('#fff',{trk:TS.trk}));
   ctx.fillStyle='#000';ctx.fillRect(0,ty+rh-2,W,2)}
 }else if(lay==='demo'){
  var ts=W*.085*scale;L1=layText(top,key,ts,W-200,W*.3);L2=layText(bot,'helv',ts*.4,W-200,W*.25);
  var ty2=90+620+12+50;setSize(W,Math.round(Math.max(1100,ty2+L1.h+(L2.h?26+L2.h:0)+100)));ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
  region(IMG(0),100,90,880,620,f);ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.strokeRect(88,78,904,644);
  var o1=Object.assign({},TS);o1.trk=TS.trk+3;paint(ctx,L1,W/2,ty2+oT,o1);ctx.globalAlpha=.9;paint(ctx,L2,W/2,ty2+L1.h+26+oB,plain(TS.fill));ctx.globalAlpha=1;
 }else if(lay==='error'){
  r=$('iRatio').value.split(':');setSize(W,Math.round(W*r[1]/r[0]));region(IMG(0),0,0,W,H,f);
  var dw=Math.round(W*.64),ms=W*.038*scale,Lm=layText($('iTop').value||'오류가 발생했습니다.','sans',ms,dw-60-90,H*.4,0);
  var dh=Math.round(44+30+Math.max(Lm.h,70)+30+60+24),dx=Math.round((W-dw)/2),dy=Math.round((H-dh)/2+oT),ttl=$('iBot').value||'Error';
  ctx.fillStyle='#c0c0c0';ctx.fillRect(dx,dy,dw,dh);ctx.fillStyle='#fff';ctx.fillRect(dx,dy,dw,3);ctx.fillRect(dx,dy,3,dh);ctx.fillStyle='#404040';ctx.fillRect(dx,dy+dh-3,dw,3);ctx.fillRect(dx+dw-3,dy,3,dh);
  var tg=ctx.createLinearGradient(dx,0,dx+dw,0);tg.addColorStop(0,'#000080');tg.addColorStop(1,'#1084d0');ctx.fillStyle=tg;ctx.fillRect(dx+5,dy+5,dw-10,38);
  ctx.fillStyle='#fff';ctx.font='700 '+Math.round(W*.024)+'px Arial,Helvetica'+FB;ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText(ttl,dx+16,dy+24);
  ctx.fillStyle='#c0c0c0';ctx.fillRect(dx+dw-44,dy+10,30,28);ctx.fillStyle='#fff';ctx.fillRect(dx+dw-44,dy+10,30,2);ctx.fillRect(dx+dw-44,dy+10,2,28);ctx.fillStyle='#404040';ctx.fillRect(dx+dw-44,dy+36,30,2);ctx.fillRect(dx+dw-16,dy+10,2,28);
  ctx.fillStyle='#000';ctx.font='700 '+Math.round(W*.02)+'px Arial'+FB;ctx.textAlign='center';ctx.fillText('✕',dx+dw-29,dy+25);
  var cy=dy+44+30+35;ctx.beginPath();ctx.arc(dx+60,cy,32,0,7);ctx.fillStyle='#e0201c';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=8;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(dx+48,cy-12);ctx.lineTo(dx+72,cy+12);ctx.moveTo(dx+72,cy-12);ctx.lineTo(dx+48,cy+12);ctx.stroke();
  paint(ctx,Lm,dx+110,dy+44+30+(Math.max(Lm.h,70)-Lm.h)/2,plain('#000',{align:'left'}));
  var bx=dx+(dw-150)/2,by=dy+dh-24-48;ctx.fillStyle='#c0c0c0';ctx.fillRect(bx,by,150,48);ctx.fillStyle='#fff';ctx.fillRect(bx,by,150,3);ctx.fillRect(bx,by,3,48);ctx.fillStyle='#404040';ctx.fillRect(bx,by+45,150,3);ctx.fillRect(bx+147,by,3,48);
  ctx.fillStyle='#000';ctx.font='400 '+Math.round(W*.026)+'px Arial'+FB;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('OK',bx+75,by+25);
 }else{ // cinema
  setSize(W,Math.round(W*9/16));var cb=Math.round(H*.125);ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);region(IMG(0),0,cb,W,H-2*cb,f);
  L1=layText(top,key,W*.03,W*.9,cb-6);L2=layText(bot,key,W*.045*scale,W*.86,H*.3);
  paint(ctx,L1,W/2,(cb-L1.h)/2+oT,plain('#bbb'));paint(ctx,L2,W/2,H-cb-14-L2.h+oB);
 }
 W=out.width;H=out.height;
 // VHS
 if($('iVhs').checked&&(lay==='impact'||lay==='core'||lay==='cinema')){
  ctx.font='400 '+Math.round(W*.07)+'px VT323,"Courier New",monospace';ctx.textBaseline='top';ctx.textAlign='left';ctx.lineJoin='round';ctx.lineWidth=W*.012;
  var mg=W*.04;ctx.strokeStyle='#000';ctx.fillStyle='#fff';ctx.strokeText('PLAY ▶',mg,mg);ctx.fillText('PLAY ▶',mg,mg);
  ctx.textBaseline='bottom';var dd=$('iVhsD').value;ctx.strokeText('12:00 AM',mg,H-mg-W*.065);ctx.fillText('12:00 AM',mg,H-mg-W*.065);ctx.strokeText(dd,mg,H-mg);ctx.fillText(dd,mg,H-mg)}
 // 라벨 / 스티커 / 효과
 for(var li=0;li<3;li++)label(li);
 for(var si=0;si<3;si++)sticker(si);
 spam();sparkle();
 var wm=$('iWm').value;if(wm){ctx.font='700 '+Math.round(W*.032)+'px Helvetica,Arial'+FB;ctx.textAlign='right';ctx.textBaseline='bottom';ctx.lineJoin='round';ctx.lineWidth=4;ctx.strokeStyle='rgba(0,0,0,.55)';ctx.fillStyle='rgba(255,255,255,.85)';ctx.strokeText(wm,W-W*.025,H-W*.02);ctx.fillText(wm,W-W*.025,H-W*.02)}
 frame();
 if(f.Crush>0)crush(f.Crush,t)}

function label(i){var t=$('iLt'+i).value;if(!t)return;var W=out.width,H=out.height,k=$('iLk'+i).value,s=W*.05*($('iLs'+i).value/100),x=W*$('iLx'+i).value/100,y=H*$('iLy'+i).value/100;
 var kk=k==='2'?'imp':k==='3'?'comic':'helv',Lx=layText(k==='2'?t.toUpperCase():t,kk,s,W*.42,H*.4,0);
 var o=plain('#000');if(k==='0')o.box='#fff';if(k==='1'){o.box='#000';o.fill='#fff'}if(k==='2'){o.fill='#fff';o.sw=9}if(k==='3')o.box='#ffe94a';
 paint(ctx,Lx,x,y-Lx.h/2,o)}
function sticker(i){var e=$('iE'+i).value;if(!e)return;var W=out.width,H=out.height,s=+$('iEs'+i).value*W/1080,x=W*$('iEx'+i).value/100,y=H*$('iEy'+i).value/100,rt=+$('iEr'+i).value*Math.PI/180;
 ctx.save();ctx.translate(x,y);ctx.rotate(rt);ctx.textAlign='center';ctx.textBaseline='middle';
 if(e[0]==='#'){var tx=e.slice(1);ctx.font=fs('imp',s*.55);ctx.lineJoin='round';ctx.lineWidth=s*.1;ctx.strokeStyle='#000';ctx.strokeText(tx,0,0);ctx.fillStyle='#fff';ctx.fillText(tx,0,0)}
 else{ctx.font=Math.round(s)+'px '+EMO;ctx.fillStyle='#000';ctx.fillText(e,0,0)}
 ctx.restore()}
function spam(){var n=+$('iSpamN').value,e=$('iSpamE').value;if(!n)return;var W=out.width,H=out.height,R=rng(42);
 for(var i=0;i<n;i++){var x=R()*W,y=R()*H,s=W*(.05+R()*.12),rt=(R()-.5)*1.4;ctx.save();ctx.translate(x,y);ctx.rotate(rt);ctx.font=Math.round(s)+'px '+EMO;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(e,0,0);ctx.restore()}}
function sparkle(){var n=+$('iSpark').value;if(!n)return;var W=out.width,H=out.height,R=rng(99);
 for(var i=0;i<n;i++){var x=R()*W,y=R()*H,s=W*(.025+R()*.07);ctx.save();ctx.translate(x,y);
  var g=ctx.createRadialGradient(0,0,0,0,0,s);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.25,'rgba(255,255,230,.55)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,s,0,7);ctx.fill();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(0,-s*1.6);ctx.lineTo(s*.12,-s*.12);ctx.lineTo(s*1.6,0);ctx.lineTo(s*.12,s*.12);ctx.lineTo(0,s*1.6);ctx.lineTo(-s*.12,s*.12);ctx.lineTo(-s*1.6,0);ctx.lineTo(-s*.12,-s*.12);ctx.closePath();ctx.fill();ctx.restore()}}

function frame(){var m=$('iFrame').value;if(m==='none')return;
 var col=$('iFrC').value,txt=$('iFrT').value,w=out.width,h=out.height,tmp=cvs(w,h);tmp.getContext('2d').drawImage(out,0,0);
 function begin(a,b){out.width=a;out.height=b}
 var b,p;
 if(m==='solid'){b=Math.round(w*.05);begin(w+2*b,h+2*b);ctx.fillStyle=col;ctx.fillRect(0,0,out.width,out.height);ctx.drawImage(tmp,b,b)}
 else if(m==='double'){p=Math.round(w*.07);begin(w+2*p,h+2*p);ctx.fillStyle=col;ctx.fillRect(0,0,out.width,out.height);ctx.strokeStyle='#fff';ctx.lineWidth=Math.max(3,w*.006);ctx.strokeRect(p*.35,p*.35,out.width-p*.7,out.height-p*.7);ctx.drawImage(tmp,p,p)}
 else if(m==='insta'){b=Math.round(w*.035);begin(w+2*b,h+2*b);ctx.fillStyle='#fff';ctx.fillRect(0,0,out.width,out.height);ctx.save();rr(ctx,b,b,w,h,w*.012);ctx.clip();ctx.drawImage(tmp,b,b);ctx.restore()}
 else if(m==='polaroid'){var sd=Math.round(w*.06),bt=Math.round(w*.22);begin(w+2*sd,h+sd+bt);ctx.fillStyle='#fafaf7';ctx.fillRect(0,0,out.width,out.height);ctx.drawImage(tmp,sd,sd);ctx.strokeStyle='rgba(0,0,0,.12)';ctx.lineWidth=2;ctx.strokeRect(sd,sd,w,h);
  if(txt){var fz=w*.075;ctx.fillStyle='#333';ctx.textAlign='center';ctx.textBaseline='middle';do{ctx.font='700 '+Math.round(fz)+'px "Comic Neue","Comic Sans MS",cursive'+FB;fz*=.93}while(ctx.measureText(txt).width>w*.9&&fz>12);ctx.fillText(txt,out.width/2,h+sd+bt/2)}}
 else if(m==='film'){var bh=Math.round(w*.09),sx=Math.round(w*.03);begin(w+2*sx,h+2*bh);ctx.fillStyle='#111';ctx.fillRect(0,0,out.width,out.height);
  var hw=w*.03,hh=w*.045,step=w*.065;ctx.fillStyle='#f4f1e8';for(var x=step/2;x<out.width-hw;x+=step){rr(ctx,x,(bh-hh)/2,hw,hh,hw*.25);ctx.fill();rr(ctx,x,out.height-bh+(bh-hh)/2,hw,hh,hw*.25);ctx.fill()}
  ctx.drawImage(tmp,sx,bh);ctx.fillStyle='#f5a623';ctx.font='400 '+Math.round(bh*.34)+'px VT323,monospace';ctx.textAlign='left';ctx.textBaseline='bottom';ctx.fillText('▶ 12   12A'+(txt?'   '+txt:''),sx+10,bh-2)}
 else if(m==='shadow'){var mg=Math.round(w*.08);begin(w+2*mg,h+2*mg);ctx.fillStyle='#e6e6ea';ctx.fillRect(0,0,out.width,out.height);ctx.shadowColor='rgba(0,0,0,.35)';ctx.shadowBlur=w*.04;ctx.shadowOffsetY=w*.015;ctx.fillStyle='#fff';ctx.fillRect(mg,mg,w,h);ctx.shadowColor='transparent';ctx.drawImage(tmp,mg,mg)}
 else if(m==='news'){p=Math.round(w*.05);var hd=Math.round(w*.17);begin(w+2*p,h+2*p+hd);ctx.fillStyle='#efe6cf';ctx.fillRect(0,0,out.width,out.height);
  ctx.fillStyle='#222';ctx.textAlign='center';ctx.textBaseline='middle';var tt=txt||'THE DAILY MEME',fz2=hd*.5;do{ctx.font='700 '+Math.round(fz2)+'px "Times New Roman",Times,serif';fz2*=.94}while(ctx.measureText(tt).width>out.width-2*p&&fz2>12);ctx.fillText(tt,out.width/2,p*.3+hd/2);
  ctx.fillRect(p,hd-4,w,6);ctx.fillRect(p,hd+6,w,2);ctx.drawImage(tmp,p,p+hd);ctx.strokeStyle='#222';ctx.lineWidth=3;ctx.strokeRect(p,p+hd,w,h)}
 else if(m==='round'){var rad=Math.round(Math.min(w,h)*.08);begin(w,h);ctx.clearRect(0,0,w,h);rr(ctx,0,0,w,h,rad);ctx.clip();ctx.drawImage(tmp,0,0)}}

function crush(level,t){
 var passes=level>60?2:1,step=0,w=out.width,h=out.height;
 (function pass(){if(t!==token)return;
  var s=Math.max(.25,1-.7*level/100),c1=cvs(Math.max(8,w*s|0),Math.max(8,h*s|0)),c1c=c1.getContext('2d');c1c.fillStyle='#fff';c1c.fillRect(0,0,c1.width,c1.height);c1c.drawImage(out,0,0,c1.width,c1.height);
  var im=new Image();im.onload=function(){if(t!==token)return;ctx.imageSmoothingEnabled=step<passes-1;ctx.drawImage(im,0,0,w,h);ctx.imageSmoothingEnabled=true;step++;if(step<passes)pass()};
  im.src=c1.toDataURL('image/jpeg',Math.max(.04,1-.95*level/100))})()}

function applyPre(){var p=PRE[$('iPre').value];for(var k in p)$('i'+k).value=p[k]}
function vis(){var l=$('iLay').value;$('lRatio').hidden=!(l==='impact'||l==='core'||l==='error');$('lBar').hidden=!(l==='caption'||l==='side');$('lVhs').hidden=!(l==='impact'||l==='core'||l==='cinema');$('hint').textContent=HINT[l]}
var prevLay='impact';
function applyLay(keepText){var lay=$('iLay').value,l=LAY[lay];
 $('iFont').value=l.font;$('iUp').checked=l.up;$('iFill').value=l.fill;$('iStroke').value=l.stroke;$('iSW').value=l.sw;$('iSize').value=100;$('iPre').value=l.pre;applyPre();
 if(!keepText){var ps=SAMPLE[prevLay];if(($('iTop').value===ps[0]&&$('iBot').value===ps[1])||(!$('iTop').value&&!$('iBot').value)){$('iTop').value=SAMPLE[lay][0];$('iBot').value=SAMPLE[lay][1]}}
 prevLay=lay;vis()}

// 꾸미기 패널 생성
(function(){var opts='<option value="">없음</option>'+EM.map(function(e){return'<option value="'+e+'">'+(e[0]==='#'?e.slice(1)+' (글자)':e)+'</option>'}).join('');
 var emOnly='<option value="😂">😂</option>'+EM.filter(function(e){return e[0]!=='#'&&e!=='😂'}).map(function(e){return'<option>'+e+'</option>'}).join('');
 var h='';
 var sd=[[85,18,220],[15,80,200],[50,50,200]];
 for(var i=0;i<3;i++){h+='<h3>스티커 '+(i+1)+'</h3><label>종류<select id="iE'+i+'">'+opts+'</select></label><label>크기<input id="iEs'+i+'" type="range" min="60" max="500" value="'+sd[i][2]+'"></label><label>가로<input id="iEx'+i+'" type="range" min="0" max="100" value="'+sd[i][0]+'"></label><label>세로<input id="iEy'+i+'" type="range" min="0" max="100" value="'+sd[i][1]+'"></label><label>회전<input id="iEr'+i+'" type="range" min="-180" max="180" value="0"></label>'}
 var ld=[[25,25],[50,50],[75,75]];
 for(i=0;i<3;i++){h+='<h3>라벨 '+(i+1)+' (사진 위 글자 태그)</h3><label>글자<input id="iLt'+i+'" value=""></label><label>스타일<select id="iLk'+i+'"><option value="0">흰 박스</option><option value="1">검정 박스</option><option value="2">Impact 외곽선</option><option value="3">노랑 박스</option></select></label><label>가로<input id="iLx'+i+'" type="range" min="0" max="100" value="'+ld[i][0]+'"></label><label>세로<input id="iLy'+i+'" type="range" min="0" max="100" value="'+ld[i][1]+'"></label><label>크기<input id="iLs'+i+'" type="range" min="50" max="250" value="100"></label>'}
 h+='<h3>효과</h3><label>이모지 흩뿌리기 (개수)<input id="iSpamN" type="range" min="0" max="40" value="0"></label><label>흩뿌릴 이모지<select id="iSpamE">'+emOnly+'</select></label><label>반짝임 (딥프라이)<input id="iSpark" type="range" min="0" max="30" value="0"></label><label>워터마크<input id="iWm" value=""></label><label id="lVhs">VHS 오버레이<input id="iVhs" type="checkbox"></label><label>VHS 날짜<input id="iVhsD" value="JAN. 01 2012"></label>';
 $('deco').innerHTML=h})();

var EL=[].slice.call(document.querySelectorAll('.editor input:not([type=file]),.editor select,.editor textarea'));
EL.forEach(function(e){e.addEventListener('input',sched);e.addEventListener('change',sched)});
$('iLay').addEventListener('change',function(){applyLay();sched()});
$('iPre').addEventListener('change',function(){applyPre();sched()});
$('iBar').addEventListener('change',function(){$('iFill').value=this.value==='#000000'?'#ffffff':'#000000';sched()});
$('rnd').onclick=function(){var s=RND[Math.floor(Math.random()*RND.length)];$('iTop').value=s[0];$('iBot').value=s[1];sched()};
$('iImg').addEventListener('change',function(){var fl=[].slice.call(this.files||[]).slice(0,6);imgs=[];if(!fl.length){sched();return}
 var left=fl.length,arr=new Array(fl.length);fl.forEach(function(f,i){var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){arr[i]=im;if(--left===0){imgs=arr.filter(Boolean);sched()}};im.onerror=function(){if(--left===0){imgs=arr.filter(Boolean);sched()}};im.src=r.result};r.readAsDataURL(f)})});

$('savePng').onclick=function(){var a=document.createElement('a');a.download='meme.png';a.href=out.toDataURL('image/png');a.click()};
$('share').onclick=function(){out.toBlob(function(b){if(!b)return;var f=new File([b],'meme.png',{type:'image/png'});
 if(navigator.canShare&&navigator.canShare({files:[f]}))navigator.share({files:[f]}).catch(function(){});else $('savePng').onclick()},'image/png')};

$('iLay').value='impact';applyLay(true);$('iTop').value=SAMPLE.impact[0];$('iBot').value=SAMPLE.impact[1];
var DEFS={};EL.forEach(function(e){DEFS[e.id]=e.type==='checkbox'?e.checked:e.value});
$('reset').onclick=function(){imgs=[];$('iImg').value='';EL.forEach(function(e){if(e.type==='checkbox')e.checked=DEFS[e.id];else e.value=DEFS[e.id]});prevLay='impact';vis();sched()};
render();
try{Promise.all(['40px Anton','40px "Archivo Black"','700 40px "Comic Neue"','40px VT323','40px "Special Elite"'].map(function(f){return document.fonts.load(f)})).then(sched)}catch(e){}
})();
