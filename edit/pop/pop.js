(function(){
var $=function(i){return document.getElementById(i)};
var out=$('out'),ctx=out.getContext('2d'),img=null,raf=0;
var FB=', Pretendard, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif';
function hex(h){var n=parseInt(h.slice(1),16);return[n>>16,n>>8&255,n&255]}
var PALS=[['#1b1030','#ff2d95','#ffe600'],['#06223b','#00c2ff','#fff6c2'],['#2b0a0a','#ff3b1f','#ffd166'],['#0b2b1a','#18c48f','#f7ff7a'],['#1d0b45','#8a4dff','#ffd1f3'],['#2d1200','#ff8a00','#fff1b8'],['#0a1a5c','#2e6bff','#ffffff'],['#0b0b0b','#8a8a8a','#f4f4f4'],['#2a1a00','#d9a400','#fff3b0']].map(function(p){return p.map(hex)});
function cvs(w,h){var c=document.createElement('canvas');c.width=w;c.height=h;return c}
function sched(){cancelAnimationFrame(raf);raf=requestAnimationFrame(render)}
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

function sample(){var c=cvs(640,800),g=c.getContext('2d'),s=g.createLinearGradient(0,0,0,800);s.addColorStop(0,'#5a7bd8');s.addColorStop(1,'#f4b27a');g.fillStyle=s;g.fillRect(0,0,640,800);
 g.fillStyle='#3a2a22';g.beginPath();g.ellipse(320,330,150,170,0,0,7);g.fill();
 g.fillStyle='#f2c6a0';g.beginPath();g.ellipse(320,360,115,140,0,0,7);g.fill();
 g.fillStyle='#2a1c18';g.beginPath();g.ellipse(272,340,14,18,0,0,7);g.ellipse(368,340,14,18,0,0,7);g.fill();
 g.strokeStyle='#b8453d';g.lineWidth=12;g.lineCap='round';g.beginPath();g.arc(320,395,42,.2*Math.PI,.8*Math.PI);g.stroke();
 g.fillStyle='#d9473f';g.beginPath();g.moveTo(120,800);g.quadraticCurveTo(320,520,520,800);g.fill();return c}

function drawCover(src,w,h){var c=cvs(w,h),g=c.getContext('2d'),z=+$('iZoom').value/100,px=+$('iPx').value/100,py=+$('iPy').value/100,s0=Math.max(w/src.width,h/src.height)*z,sw=w/s0,sh=h/s0;
 g.imageSmoothingQuality='high';g.drawImage(src,(src.width-sw)/2*(1+px),(src.height-sh)/2*(1+py),sw,sh,0,0,w,h);return c}

function adjust(d,w,h){ // 밝기/대비 적용 + 휘도
 var a=d.data,bri=+$('iBri').value*2.55,cc=+$('iCon').value*2.55,cf=(259*(cc+255))/(255*(259-cc)),L=new Float32Array(w*h);
 for(var i=0,j=0;i<a.length;i+=4,j++){for(var k=0;k<3;k++){var v=(a[i+k]-128)*cf+128+bri;a[i+k]=v}
  var l=.299*a[i]+.587*a[i+1]+.114*a[i+2];L[j]=l<0?0:l>255?255:l}
 return L}
function grad(p,t){t=t<0?0:t>1?1:t;var seg=t<.5?0:1,u=t<.5?t*2:(t-.5)*2,c0=p[seg],c1=p[seg+1];return[c0[0]+(c1[0]-c0[0])*u,c0[1]+(c1[1]-c0[1])*u,c0[2]+(c1[2]-c0[2])*u]}

function edges(L,w,h){ // 소벨 + 팽창
 var B=new Float32Array(w*h),i,x,y;
 for(y=1;y<h-1;y++)for(x=1;x<w-1;x++){i=y*w+x;B[i]=(L[i-w-1]+L[i-w]+L[i-w+1]+L[i-1]+L[i]*4+L[i+1]+L[i+w-1]+L[i+w]+L[i+w+1])/12}
 var E=new Uint8Array(w*h),thr=150-(+$('iEdge').value)*1.35;
 for(y=1;y<h-1;y++)for(x=1;x<w-1;x++){i=y*w+x;var gx=-B[i-w-1]-2*B[i-1]-B[i+w-1]+B[i-w+1]+2*B[i+1]+B[i+w+1],gy=-B[i-w-1]-2*B[i-w]-B[i-w+1]+B[i+w-1]+2*B[i+w]+B[i+w+1];if(Math.sqrt(gx*gx+gy*gy)>thr)E[i]=1}
 var th=+$('iThick').value;
 for(var p=0;p<th;p++){var N=new Uint8Array(E);for(y=1;y<h-1;y++)for(x=1;x<w-1;x++){i=y*w+x;if(E[i-1]||E[i+1]||E[i-w]||E[i+w])N[i]=1}E=N}
 return E}

function stylize(cell,palIdx){
 var w=cell.width,h=cell.height,g=cell.getContext('2d'),sty=$('iSty').value,d=g.getImageData(0,0,w,h),a=d.data,L=adjust(d,w,h),pal=PALS[palIdx%PALS.length];
 if(sty==='cmyk'){return cmyk(cell,a,w,h)}
 if(sty==='duo'){return duo(cell,L,w,h,pal)}
 var lv=+$('iLv').value,orig=$('iPal').value==='orig'&&sty==='comic',E=sty==='comic'&&+$('iEdge').value>0?edges(L,w,h):null,R=rng(5);
 for(var i=0,j=0;i<a.length;i+=4,j++){var r,gg,b;
  if(orig){var gr=L[j],m=lv-1;r=gr+(a[i]-gr)*1.5;gg=gr+(a[i+1]-gr)*1.5;b=gr+(a[i+2]-gr)*1.5;r=Math.round(Math.max(0,Math.min(255,r))/255*m)*255/m;gg=Math.round(Math.max(0,Math.min(255,gg))/255*m)*255/m;b=Math.round(Math.max(0,Math.min(255,b))/255*m)*255/m}
  else{var t=L[j]/255;if(sty==='comic')t=Math.min(lv-1,Math.floor(t*lv))/(lv-1);var c=grad(pal,t);r=c[0];gg=c[1];b=c[2];if(sty==='screen'){var n=(R()-.5)*26;r+=n;gg+=n;b+=n}}
  if(E&&E[j]){r=gg=b=17}
  a[i]=r;a[i+1]=gg;a[i+2]=b;a[i+3]=255}
 g.putImageData(d,0,0);return cell}

function dots(g,w,h,D,ang,sampler,color,maxK){
 var c=Math.cos(ang),s=Math.sin(ang),cx=w/2,cy=h/2,R=Math.hypot(w,h)/2+D;g.fillStyle=color;
 for(var u=-R;u<=R;u+=D)for(var v=-R;v<=R;v+=D){var x=cx+u*c-v*s,y=cy+u*s+v*c;if(x<-D||y<-D||x>w+D||y>h+D)continue;var val=sampler(x,y);if(val<=.02)continue;g.beginPath();g.arc(x,y,D*maxK*Math.sqrt(val),0,7);g.fill()}}
function duo(cell,L,w,h,pal){var g=cell.getContext('2d'),D=+$('iDot').value,f=function(x,y,th){var xi=Math.max(0,Math.min(w-1,x|0)),yi=Math.max(0,Math.min(h-1,y|0)),l=0;for(var k=0;k<5;k++){var ox=k===1?D*.25:k===2?-D*.25:0,oy=k===3?D*.25:k===4?-D*.25:0;l+=L[Math.max(0,Math.min(h-1,(yi+oy)|0))*w+Math.max(0,Math.min(w-1,(xi+ox)|0))]}l/=5;return Math.max(0,Math.min(1,(th-l)/th))};
 g.fillStyle='rgb('+pal[2].join(',')+')';g.fillRect(0,0,w,h);
 dots(g,w,h,D,Math.PI/4,function(x,y){return f(x,y,215)},'rgb('+pal[1].join(',')+')',.72);
 dots(g,w,h,D,Math.PI/12,function(x,y){return f(x,y,95)},'rgb('+pal[0].join(',')+')',.7);return cell}
function cmyk(cell,a,w,h){var g=cell.getContext('2d'),D=+$('iDot').value,ch=[[0,0,0,0],[0,0,0,0]];
 var C=new Float32Array(w*h),M=new Float32Array(w*h),Y=new Float32Array(w*h),K=new Float32Array(w*h);
 for(var i=0,j=0;i<a.length;i+=4,j++){var r=Math.max(0,Math.min(255,a[i]*1.1))/255,gg=Math.max(0,Math.min(255,a[i+1]*1.1))/255,b=Math.max(0,Math.min(255,a[i+2]*1.1))/255,k=1-Math.max(r,gg,b),dn=1-k||1;K[j]=k;C[j]=(1-r-k)/dn;M[j]=(1-gg-k)/dn;Y[j]=(1-b-k)/dn}
 function mk(Arr){return function(x,y){var xi=Math.max(0,Math.min(w-1,x|0)),yi=Math.max(0,Math.min(h-1,y|0)),s=0;for(var kk=0;kk<5;kk++){var ox=kk===1?D*.25:kk===2?-D*.25:0,oy=kk===3?D*.25:kk===4?-D*.25:0;s+=Arr[Math.max(0,Math.min(h-1,(yi+oy)|0))*w+Math.max(0,Math.min(w-1,(xi+ox)|0))]}return s/5}}
 g.globalCompositeOperation='source-over';g.fillStyle='#fffdf4';g.fillRect(0,0,w,h);g.globalCompositeOperation='multiply';
 dots(g,w,h,D,15*Math.PI/180,mk(C),'#00aeef',.7);dots(g,w,h,D,75*Math.PI/180,mk(M),'#ec008c',.7);dots(g,w,h,D,0,mk(Y),'#fff200',.7);dots(g,w,h,D,45*Math.PI/180,mk(K),'#231f20',.68);
 g.globalCompositeOperation='source-over';return cell}

function wrapText(c,text,maxW){var res=[];text.split('\n').forEach(function(par){var line='';par.split(' ').forEach(function(w){var t=line?line+' '+w:w;if(c.measureText(t).width<=maxW||!line)line=t;else{res.push(line);line=w}});res.push(line)});return res}
function burst(cx,cy,r,rot,txt){var R=rng(11),n=16,pts=[];for(var i=0;i<n*2;i++){var a=i*Math.PI/n,rad=i%2?r*(.68+R()*.06):r*(.98+R()*.04);pts.push([Math.cos(a)*rad,Math.sin(a)*rad])}
 ctx.save();ctx.translate(cx,cy);ctx.rotate(rot*Math.PI/180);ctx.lineJoin='round';
 function path(ox,oy){ctx.beginPath();pts.forEach(function(p,i){i?ctx.lineTo(p[0]+ox,p[1]+oy):ctx.moveTo(p[0]+ox,p[1]+oy)});ctx.closePath()}
 path(r*.07,r*.07);ctx.fillStyle='#111';ctx.fill();path(0,0);ctx.fillStyle='#ffe600';ctx.fill();ctx.lineWidth=r*.05;ctx.strokeStyle='#111';ctx.stroke();
 var fz=r*.62;ctx.textAlign='center';ctx.textBaseline='middle';do{ctx.font='400 '+Math.round(fz)+'px Anton,Impact,"Arial Black"'+FB;fz*=.93}while(ctx.measureText(txt).width>r*1.35&&fz>10);
 ctx.lineWidth=fz*.16;ctx.strokeStyle='#111';ctx.strokeText(txt,r*.03,r*.04);ctx.fillStyle='#e8112d';ctx.fillText(txt,0,0);ctx.restore()}
function bubble(W,H,txt){var s=+$('iBs').value/100,cx=W*$('iBx').value/100,cy=H*$('iBy').value/100,fz=W*.045*s;ctx.font='700 '+Math.round(fz)+'px "Comic Neue","Comic Sans MS"'+FB;
 var lines=wrapText(ctx,txt,W*.36*s),tw=0;lines.forEach(function(l){tw=Math.max(tw,ctx.measureText(l).width)});var lh=fz*1.2,rx=tw/2+fz*1.1,ry=lines.length*lh/2+fz*.9,tl=$('iTail').value,dx=tl[1]==='l'?-1:1,dy=tl[0]==='t'?-1:1;
 function shape(){ctx.beginPath();ctx.ellipse(cx,cy,rx,ry,0,0,7);ctx.moveTo(cx+dx*rx*.35,cy+dy*ry*.9);ctx.lineTo(cx+dx*(rx+fz*1.4),cy+dy*(ry+fz*1.8));ctx.lineTo(cx+dx*rx*.8,cy+dy*ry*.62);ctx.closePath()}
 ctx.lineJoin='round';shape();ctx.lineWidth=W*.012;ctx.strokeStyle='#111';ctx.stroke();ctx.fillStyle='#fff';shape();ctx.fill();
 ctx.fillStyle='#111';ctx.textAlign='center';ctx.textBaseline='middle';lines.forEach(function(l,i){ctx.fillText(l,cx,cy-(lines.length-1)*lh/2+i*lh)})}

function render(){
 var src=img||sample(),W=1080,r=$('iRatio').value.split(':'),H=Math.round(W*r[1]/r[0]),n=+$('iLay').value,fw=+$('iFw').value,gap=n>1?+$('iGap').value:0;
 out.width=W;out.height=H;ctx.fillStyle=$('iFrC').value;ctx.fillRect(0,0,W,H);
 var cw=Math.round((W-2*fw-(n-1)*gap)/n),ch=Math.round((H-2*fw-(n-1)*gap)/n),pv=$('iPal').value,start=pv==='orig'?0:+pv;
 for(var i=0;i<n*n;i++){var cx=fw+(i%n)*(cw+gap),cy=fw+Math.floor(i/n)*(ch+gap),cell=drawCover(src,cw,ch);stylize(cell,start+i);ctx.drawImage(cell,cx,cy)}
 var cap=$('iCap').value;if(cap){var fz=W*.04;ctx.font='700 '+Math.round(fz)+'px "Comic Neue","Comic Sans MS"'+FB;var tw=ctx.measureText(cap).width,bw=tw+fz*1.2,bh=fz*1.8,bx=fw+10,by=fw+10;ctx.fillStyle='#ffe97a';ctx.fillRect(bx,by,bw,bh);ctx.lineWidth=5;ctx.strokeStyle='#111';ctx.strokeRect(bx,by,bw,bh);ctx.fillStyle='#111';ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText(cap,bx+fz*.6,by+bh/2)}
 var bub=$('iBub').value;if(bub)bubble(W,H,bub);
 var bt=$('iBurst').value;if(bt){var t=bt==='custom'?($('iBT').value||'POP!'):bt;burst(W*$('iBX').value/100,H*$('iBY').value/100,W*.15*($('iBZ').value/150),+$('iBR').value,t)}
 $('info').textContent=(n>1?n+'×'+n+' · ':'')+W+' × '+H+(img?'':' · 사진을 올리면 팝아트로 바뀌어요')}

function vis(){$('lBT').hidden=$('iBurst').value!=='custom'}
var EL=[].slice.call(document.querySelectorAll('.editor input:not([type=file]),.editor select')),DEFS={};
EL.forEach(function(e){DEFS[e.id]=e.value;e.addEventListener('input',function(){vis();sched()});e.addEventListener('change',function(){vis();sched()})});
$('iImg').addEventListener('change',function(){var f=this.files&&this.files[0];if(!f){img=null;sched();return}var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){img=im;sched()};im.src=r.result};r.readAsDataURL(f)});
$('savePng').onclick=function(){var a=document.createElement('a');a.download='popart.png';a.href=out.toDataURL('image/png');a.click()};
$('share').onclick=function(){out.toBlob(function(b){if(!b)return;var f=new File([b],'popart.png',{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]}))navigator.share({files:[f]}).catch(function(){});else $('savePng').onclick()},'image/png')};
$('reset').onclick=function(){img=null;$('iImg').value='';EL.forEach(function(e){e.value=DEFS[e.id]});vis();sched()};
vis();render();
try{Promise.all(['40px Anton','700 40px "Comic Neue"'].map(function(f){return document.fonts.load(f)})).then(sched)}catch(e){}
})();
