(function(){
var $=function(i){return document.getElementById(i)};
var out=$('out'),ctx=out.getContext('2d'),img=null,raf=0;
function hex(h){var n=parseInt(h.slice(1),16);return[n>>16,n>>8&255,n&255]}
var PAL={
 gameboy:['#0f380f','#306230','#8bac0f','#9bbc0f'].map(hex),
 pico8:['#000000','#1D2B53','#7E2553','#008751','#AB5236','#5F574F','#C2C3C7','#FFF1E8','#FF004D','#FFA300','#FFEC27','#00E436','#29ADFF','#83769C','#FF77A8','#FFCCAA'].map(hex),
 bw:['#000000','#ffffff'].map(hex),
 cga:['#000000','#55ffff','#ff55ff','#ffffff'].map(hex),
 sepia:['#2b1d0e','#6b4a2b','#b88a5a','#f0dfb8'].map(hex),
 vapor:['#1a1033','#5b2a86','#ff4fa3','#4ee1f0','#fff5fb'].map(hex),
 amber:['#100800','#5a2d00','#c26a00','#ffb000'].map(hex)
};
var BAYER=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
function cvs(w,h){var c=document.createElement('canvas');c.width=w;c.height=h;return c}
function sched(){cancelAnimationFrame(raf);raf=requestAnimationFrame(render)}

function sample(){var c=cvs(640,420),g=c.getContext('2d'),s=g.createLinearGradient(0,0,0,420);
 s.addColorStop(0,'#2a1a6e');s.addColorStop(.5,'#ff5e8a');s.addColorStop(1,'#ffc15e');g.fillStyle=s;g.fillRect(0,0,640,420);
 g.fillStyle='#fff3c4';g.beginPath();g.arc(320,230,90,0,7);g.fill();
 g.fillStyle='#1b0f3a';g.beginPath();g.moveTo(0,420);g.lineTo(0,330);g.lineTo(120,270);g.lineTo(220,340);g.lineTo(340,260);g.lineTo(470,350);g.lineTo(560,290);g.lineTo(640,340);g.lineTo(640,420);g.fill();return c}

function render(){
 var src=img||sample(),res=+$('iRes').value,rv=+$('iRatio').value,ratio=rv>0?rv:src.width/src.height; // w/h
 var gw=res,gh=Math.max(1,Math.round(res/ratio));
 var sm=cvs(gw,gh),sg=sm.getContext('2d');sg.imageSmoothingEnabled=true;sg.imageSmoothingQuality='high';
 var z=+$('iZoom').value/100,px=+$('iPx').value/100,py=+$('iPy').value/100,s0=Math.max(gw/src.width,gh/src.height)*z,sw=gw/s0,sh=gh/s0;
 sg.drawImage(src,(src.width-sw)/2*(1+px),(src.height-sh)/2*(1+py),sw,sh,0,0,gw,gh);
 var d=sg.getImageData(0,0,gw,gh),a=d.data,n=a.length;
 var bri=+$('iBri').value*2.55,cc=+$('iCon').value*2.55,cf=(259*(cc+255))/(255*(259-cc)),sat=+$('iSat').value/100;
 var buf=new Float32Array(gw*gh*3);
 for(var i=0,j=0;i<n;i+=4,j+=3){var r=a[i],g=a[i+1],b=a[i+2],gr=.299*r+.587*g+.114*b;
  r=gr+(r-gr)*sat;g=gr+(g-gr)*sat;b=gr+(b-gr)*sat;
  buf[j]=(r-128)*cf+128+bri;buf[j+1]=(g-128)*cf+128+bri;buf[j+2]=(b-128)*cf+128+bri}
 var pal=$('iPal').value,P=PAL[pal],L=+$('iLv').value,dit=$('iDit').value,inv=$('iInv').checked;
 function near(r,g,b){if(!P){var m=L-1;return[Math.round(Math.max(0,Math.min(255,r))/255*m)*255/m,Math.round(Math.max(0,Math.min(255,g))/255*m)*255/m,Math.round(Math.max(0,Math.min(255,b))/255*m)*255/m]}
  var best=null,bd=1e12;for(var k=0;k<P.length;k++){var c=P[k],dr=r-c[0],dg=g-c[1],db=b-c[2],dd=dr*dr*.3+dg*dg*.59+db*db*.11;if(dd<bd){bd=dd;best=c}}return best}
 var spread=P?(P.length>8?24:64):(255/(L-1))*.9,res2=new Uint8ClampedArray(gw*gh*4);
 for(var y=0;y<gh;y++)for(var x=0;x<gw;x++){var o=(y*gw+x)*3,r2=buf[o],g2=buf[o+1],b2=buf[o+2];
  if(dit==='bayer'){var t=(BAYER[y%4][x%4]+.5)/16-.5;r2+=t*spread;g2+=t*spread;b2+=t*spread}
  var q=near(r2,g2,b2);
  if(dit==='fs'){var er=r2-q[0],eg=g2-q[1],eb=b2-q[2];
   function push(xx,yy,f){if(xx<0||xx>=gw||yy>=gh)return;var oo=(yy*gw+xx)*3;buf[oo]+=er*f;buf[oo+1]+=eg*f;buf[oo+2]+=eb*f}
   push(x+1,y,7/16);push(x-1,y+1,3/16);push(x,y+1,5/16);push(x+1,y+1,1/16)}
  var p=(y*gw+x)*4,qr=q[0],qg=q[1],qb=q[2];if(inv){qr=255-qr;qg=255-qg;qb=255-qb}
  res2[p]=qr;res2[p+1]=qg;res2[p+2]=qb;res2[p+3]=255}
 var small=cvs(gw,gh);small.getContext('2d').putImageData(new ImageData(res2,gw,gh),0,0);
 var k2=Math.max(1,Math.round(960/gw));out.width=gw*k2;out.height=gh*k2;
 ctx.imageSmoothingEnabled=false;ctx.drawImage(small,0,0,out.width,out.height);
 if($('iGrid').checked&&k2>=4){ctx.fillStyle='rgba(0,0,0,.28)';for(var gx=0;gx<=gw;gx++)ctx.fillRect(gx*k2,0,1,out.height);for(var gy=0;gy<=gh;gy++)ctx.fillRect(0,gy*k2,out.width,1)}
 if($('iCrt').checked){ctx.fillStyle='rgba(0,0,0,.22)';var st=Math.max(2,Math.round(out.width/320));for(var sy=0;sy<out.height;sy+=st*2)ctx.fillRect(0,sy,out.width,st);
  var vg=ctx.createRadialGradient(out.width/2,out.height/2,Math.min(out.width,out.height)*.35,out.width/2,out.height/2,Math.hypot(out.width,out.height)/2);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.55)');ctx.fillStyle=vg;ctx.fillRect(0,0,out.width,out.height)}
 $('info').textContent=gw+' × '+gh+' 도트'+(img?'':' · 사진을 올리면 도트 이미지로 바뀌어요');
}

function vis(){$('lLv').hidden=$('iPal').value!=='orig'}
var EL=[].slice.call(document.querySelectorAll('.editor input:not([type=file]),.editor select')),DEFS={};
EL.forEach(function(e){DEFS[e.id]=e.type==='checkbox'?e.checked:e.value;e.addEventListener('input',function(){vis();sched()});e.addEventListener('change',function(){vis();sched()})});
$('iImg').addEventListener('change',function(){var f=this.files&&this.files[0];if(!f){img=null;sched();return}var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){img=im;sched()};im.src=r.result};r.readAsDataURL(f)});
$('savePng').onclick=function(){var a=document.createElement('a');a.download='pixel.png';a.href=out.toDataURL('image/png');a.click()};
$('share').onclick=function(){out.toBlob(function(b){if(!b)return;var f=new File([b],'pixel.png',{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]}))navigator.share({files:[f]}).catch(function(){});else $('savePng').onclick()},'image/png')};
$('reset').onclick=function(){img=null;$('iImg').value='';EL.forEach(function(e){if(e.type==='checkbox')e.checked=DEFS[e.id];else e.value=DEFS[e.id]});vis();sched()};
vis();render();
})();
