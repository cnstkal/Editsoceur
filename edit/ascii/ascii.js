(function(){
var $=function(i){return document.getElementById(i)};
var out=$('out'),ctx=out.getContext('2d'),img=null,lastText='',raf=0;
var RAMPS={
 classic:' .:-=+*#%@',
 detail:' .\'`^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
 blocks:' ░▒▓█',
 dots:' ·•●',
 binary:' 10',
 emoji:'⬜🟨🟧🟫⬛'
};
var BAYER=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
var FONTS={sans:'900 {s}px Pretendard,"Apple SD Gothic Neo","Noto Sans KR",Arial,sans-serif',serif:'900 {s}px "Times New Roman",Times,serif',mono:'700 {s}px "Courier New",monospace'};
function cvs(w,h){var c=document.createElement('canvas');c.width=w;c.height=h;return c}
function sched(){cancelAnimationFrame(raf);raf=requestAnimationFrame(render)}

function source(){
 if($('iMode').value==='photo'){
  var s=img;if(!s){var c0=cvs(600,400),g=c0.getContext('2d'),gr=g.createLinearGradient(0,0,600,400);gr.addColorStop(0,'#fff');gr.addColorStop(1,'#222');g.fillStyle=gr;g.fillRect(0,0,600,400);g.fillStyle='#000';g.beginPath();g.arc(300,200,120,0,7);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(260,170,22,0,7);g.arc(340,170,22,0,7);g.fill();g.strokeStyle='#fff';g.lineWidth=14;g.beginPath();g.arc(300,215,60,.15*Math.PI,.85*Math.PI);g.stroke();return c0}
  var k=Math.min(1,1600/Math.max(s.width,s.height)),c=cvs(Math.max(1,Math.round(s.width*k)),Math.max(1,Math.round(s.height*k)));c.getContext('2d').drawImage(s,0,0,c.width,c.height);return c}
 var lines=($('iText').value||' ').split('\n'),size=300,fnt=FONTS[$('iTF').value],probe=cvs(10,10).getContext('2d'),mw=0;
 probe.font=fnt.replace('{s}',size);lines.forEach(function(l){mw=Math.max(mw,probe.measureText(l).width)});
 var pad=size*.25,w=Math.max(10,Math.round(mw+pad*2)),h=Math.round(lines.length*size*1.15+pad*2),c2=cvs(w,h),g2=c2.getContext('2d');
 g2.fillStyle='#fff';g2.fillRect(0,0,w,h);g2.fillStyle='#000';g2.font=fnt.replace('{s}',size);g2.textAlign='center';g2.textBaseline='middle';
 lines.forEach(function(l,i){g2.fillText(l,w/2,pad+size*1.15*(i+.5))});return c2}

function isDark(hex){var n=parseInt(hex.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;return(.299*r+.587*g+.114*b)<128}

function render(){
 var src=source(),set=$('iSet').value,cols=+$('iCols').value,braille=set==='braille',isText=$('iMode').value==='text',asp=set==='emoji'?1:+$('iAsp').value;
 var mode=$('iCol').value;if(isText&&mode==='color')mode='mono';
 var dark=mode==='matrix'||mode==='color',bg=dark?'#000000':$('iBg').value,ink=mode==='matrix'?'#33ff55':$('iInk').value;
 // 글자 소스는 검은 글자=잉크, 사진은 배경이 밝으면 어두운 픽셀이, 어두우면 밝은 픽셀이 진하게
 var dens_dark=isText?true:!isDark(bg);
 var ramp=set==='custom'?Array.from($('iCus').value||' @'):Array.from(RAMPS[set]||RAMPS.classic);
 var gw,gh,rows;
 if(braille){gw=cols*2;rows=Math.max(1,Math.round(gw*src.height/src.width/4));gh=rows*4}
 else{gw=cols;rows=Math.max(1,Math.round(cols*src.height/src.width*asp));gh=rows}
 var sm=cvs(gw,gh),sg=sm.getContext('2d');sg.fillStyle='#fff';sg.fillRect(0,0,gw,gh);sg.imageSmoothingEnabled=true;sg.imageSmoothingQuality='high';sg.drawImage(src,0,0,gw,gh);
 var px=sg.getImageData(0,0,gw,gh).data,bri=+$('iBri').value*2.55,cc=+$('iCon').value*2.55,cf=(259*(cc+255))/(255*(259-cc)),inv=$('iInv').checked;
 function dens(i){var l=.299*px[i]+.587*px[i+1]+.114*px[i+2];l=(l-128)*cf+128+bri;l=l<0?0:l>255?255:l;var d=dens_dark?1-l/255:l/255;return inv?1-d:d}
 var lines=[],colors=[];
 for(var r=0;r<rows;r++){var line='',crow=[];
  for(var c=0;c<cols;c++){
   if(braille){var bits=0,rs=0,gs=0,bs=0,map=[[1,2,4,64],[8,16,32,128]];
    for(var dx=0;dx<2;dx++)for(var dy=0;dy<4;dy++){var x=c*2+dx,y=r*4+dy,i=(y*gw+x)*4;if(dens(i)>(BAYER[y%4][x%4]+.5)/16)bits|=map[dx][dy];rs+=px[i];gs+=px[i+1];bs+=px[i+2]}
    line+=String.fromCharCode(0x2800+bits);crow.push('rgb('+(rs>>3)+','+(gs>>3)+','+(bs>>3)+')')}
   else{var j=(r*gw+c)*4,d=dens(j),idx=Math.round(d*(ramp.length-1));line+=ramp[idx];crow.push('rgb('+px[j]+','+px[j+1]+','+px[j+2]+')')}}
  lines.push(line);colors.push(crow)}
 lastText=lines.map(function(l){return l.replace(/\s+$/,'')}).join('\n');
 // 캔버스 그리기
 var fs=Math.max(6,Math.min(40,1600/(cols*.6))),font=fs+'px "Courier New",Menlo,Consolas,monospace',emo=set==='emoji';
 ctx.font=font;var cw=emo?fs*1.25:ctx.measureText('M').width,ch=braille?cw*2:(emo?cw:cw/asp);
 out.width=Math.ceil(cw*cols);out.height=Math.ceil(ch*rows);
 ctx.fillStyle=bg;ctx.fillRect(0,0,out.width,out.height);ctx.font=emo?Math.round(fs)+'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif':font;ctx.textBaseline='middle';ctx.textAlign='left';
 var perChar=mode==='color'||emo;
 for(var rr=0;rr<rows;rr++){
  if(!perChar){ctx.fillStyle=ink;
   if(braille||set==='classic'||set==='detail'||set==='binary'||set==='dots'||set==='blocks')lines[rr].split('').forEach(function(chv,ci){if(chv!==' ')ctx.fillText(chv,ci*cw,rr*ch+ch/2)});
   else Array.from(lines[rr]).forEach(function(chv,ci){if(chv!==' ')ctx.fillText(chv,ci*cw,rr*ch+ch/2)})}
  else Array.from(lines[rr]).forEach(function(chv,ci){if(chv===' '&&!emo)return;ctx.fillStyle=mode==='color'?colors[rr][ci]:ink;ctx.fillText(chv,ci*cw,rr*ch+ch/2)})}
 $('info').textContent=cols+' × '+rows+' 글자 · '+lastText.length.toLocaleString()+'자'+(!isText&&!img?' · 사진을 올리면 아스키아트로 바뀌어요':'');
}

function vis(){var m=$('iMode').value==='photo';$('lImg').hidden=!m;$('lText').hidden=m;$('lTF').hidden=m;
 $('lCus').hidden=$('iSet').value!=='custom';var mat=$('iCol').value==='matrix',col=$('iCol').value==='color';$('lBg').hidden=mat||col;$('lInk').hidden=mat||col}
document.querySelectorAll('.editor input:not([type=file]),.editor select,.editor textarea').forEach(function(e){e.addEventListener('input',function(){vis();sched()});e.addEventListener('change',function(){vis();sched()})});
$('iImg').addEventListener('change',function(){var f=this.files&&this.files[0];if(!f){img=null;sched();return}var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){img=im;$('iMode').value='photo';vis();sched()};im.src=r.result};r.readAsDataURL(f)});
$('copy').onclick=function(){var b=$('copy'),done=function(){var o=b.textContent;b.textContent='복사됨!';setTimeout(function(){b.textContent=o},1200)};
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(lastText).then(done,fallback);else fallback();
 function fallback(){var ta=document.createElement('textarea');ta.value=lastText;ta.style.cssText='position:fixed;opacity:0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');done()}catch(e){}document.body.removeChild(ta)}};
$('savePng').onclick=function(){var a=document.createElement('a');a.download='ascii.png';a.href=out.toDataURL('image/png');a.click()};
var EL=[].slice.call(document.querySelectorAll('.editor input:not([type=file]),.editor select,.editor textarea')),DEFS={};EL.forEach(function(e){DEFS[e.id]=e.type==='checkbox'?e.checked:e.value});
$('reset').onclick=function(){img=null;$('iImg').value='';EL.forEach(function(e){if(e.type==='checkbox')e.checked=DEFS[e.id];else e.value=DEFS[e.id]});vis();sched()};
vis();render();
})();
