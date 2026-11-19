(function(){
var $=function(id){return document.getElementById(id)};
var picker=$('framePicker');var W=2176,H=1700,zs=$('zoom'),zw=$('zw'),fr=$('frame'),frm=null;
var ICON={iSig:'sSig',iMail:'sMail',iVib:'sVib',iBat:null};
var files=["1E7DB810-32DC-4DB3-8322-FD4BD0A647BA.png", "41E19F89-5516-4045-ABA1-DA8802EAF773.png", "5A1E9D06-731A-4B35-81ED-7BE87A4CAA8B.png", "BAA32941-7946-4EE5-9992-8CB9766D1C4F.png", "33691128-E1B3-4EEA-B919-9D8F61095F27.png", "lg_cyon_pink_phone_background_removed.png", "nokia7600_clean_transparent.png", "xelibri_background_removed.png"];
var HOLE={"1E7DB810-32DC-4DB3-8322-FD4BD0A647BA.png":{"w":887,"h":1774,"x0":255,"y0":210,"x1":618,"y1":710},"33691128-E1B3-4EEA-B919-9D8F61095F27.png":{"w":1024,"h":1536,"x0":369,"y0":241,"x1":653,"y1":604},"41E19F89-5516-4045-ABA1-DA8802EAF773.png":{"w":1024,"h":1536,"x0":301,"y0":191,"x1":723,"y1":742},"5A1E9D06-731A-4B35-81ED-7BE87A4CAA8B.png":{"w":887,"h":1774,"x0":285,"y0":258,"x1":607,"y1":652},"BAA32941-7946-4EE5-9992-8CB9766D1C4F.png":{"w":887,"h":1774,"x0":257,"y0":227,"x1":622,"y1":697},"lg_cyon_pink_phone_background_removed.png":{"w":887,"h":1774,"x0":253,"y0":213,"x1":629,"y1":720},"nokia7600_clean_transparent.png":{"w":1448,"h":1086,"x0":500,"y0":280,"x1":889,"y1":736},"xelibri_background_removed.png":{"w":1024,"h":1536,"x0":288,"y0":288,"x1":721,"y1":668}};
var curFile=null;
/* 폰 틀 이미지의 투명한 액정 영역을 미리 측정해 둔 값. 화면을 이 영역에 딱 맞춰 넣는다 */
function holeBox(){var d=HOLE[curFile];if(!d)return{x:818,y:498,w:548,h:692};var k=Math.min(W/d.w,H/d.h),ox=(W-d.w*k)/2,oy=(H-d.h*k)/2,m=3;return{x:ox+d.x0*k-m,y:oy+d.y0*k-m,w:(d.x1-d.x0)*k+m*2,h:(d.y1-d.y0)*k+m*2}}
function fit(){var w=fr.clientWidth;if(!w)return;var s=w/W;zs.style.transform='scale('+s+')';zw.style.height=(H*s)+'px';}
function detectScreen(src,cb){
 var im=new Image();im.crossOrigin='anonymous';im.onload=function(){
  var cw=272,ch=213,cv=document.createElement('canvas');cv.width=cw;cv.height=ch;var cx=cv.getContext('2d',{willReadFrequently:true});cx.drawImage(im,0,0,cw,ch);
  var d;try{d=cx.getImageData(0,0,cw,ch).data}catch(e){cb(null);return}
  var x0=Math.floor(cw*.28),x1=Math.floor(cw*.72),y0=Math.floor(ch*.12),y1=Math.floor(ch*.84),seen=new Uint8Array(cw*ch),best=null;
  for(var y=y0;y<y1;y++)for(var x=x0;x<x1;x++){var p=y*cw+x;if(seen[p]||d[p*4+3]>12)continue;var q=[p];seen[p]=1;var minx=x,maxx=x,miny=y,maxy=y,count=0;while(q.length){var v=q.pop(),vx=v%cw,vy=Math.floor(v/cw);count++;minx=Math.min(minx,vx);maxx=Math.max(maxx,vx);miny=Math.min(miny,vy);maxy=Math.max(maxy,vy);var ns=[v-1,v+1,v-cw,v+cw];for(var k=0;k<4;k++){var n=ns[k],nx=n%cw,ny=Math.floor(n/cw);if(n<0||n>=cw*ch||nx<x0||nx>=x1||ny<y0||ny>=y1||seen[n]||d[n*4+3]>12)continue;seen[n]=1;q.push(n)}}var ww=maxx-minx+1,hh=maxy-miny+1,ratio=ww/hh;if(count>90&&ww>15&&hh>18&&ratio>.38&&ratio<1.35&&(!best||count>best.count))best={count:count,x:minx,y:miny,w:ww,h:hh};}
  if(best)cb({x:best.x/cw*W,y:best.y/ch*H,w:best.w/cw*W,h:best.h/ch*H});else cb(null);
 };im.onerror=function(){cb(null)};im.src=src;
}
function chooseFrame(index){var btn=picker.children[index];if(!btn)return;var url='frames/'+files[index];frm=url;curFile=files[index];$('iX').value=0;$('iY').value=0;$('iS').value=100;$('vFrm').src=url;$('vFrm').style.display='block';[].forEach.call(picker.children,function(x){x.classList.remove('active')});btn.classList.add('active');render()}
files.forEach(function(name,i){var url='frames/'+name;var btn=document.createElement('button');btn.type='button';btn.className='frame-choice';btn.innerHTML='<img src="'+url+'" alt="폰 틀 '+(i+1)+'"><span>폰 틀 '+(i+1)+'</span>';btn.onclick=function(){chooseFrame(i)};picker.appendChild(btn)});
function render(){
$('vT').textContent=$('iT').value;$('vM').textContent=$('iM').value;$('vL').textContent=$('iL').value;$('vR').textContent=$('iR').value;
Object.keys(ICON).forEach(function(k){var e=ICON[k]?$(ICON[k]):document.querySelector('#scr .bat');e.style.display=$(k).checked?'':'none'});
var sc=$('scr'),bb=holeBox(),s0=bb.w/548,hh=bb.h/s0,S=s0*$('iS').value/100;sc.style.height=hh+'px';sc.style.transform='translate('+(bb.x+bb.w/2-548*S/2+Number($('iX').value))+'px,'+(bb.y+bb.h/2-hh*S/2+Number($('iY').value))+'px) scale('+S+')';$('xVal').textContent=$('iX').value;$('yVal').textContent=$('iY').value;$('sVal').textContent=$('iS').value+'%';
$('vFrm').style.display=frm?'block':'none';if(frm)$('vFrm').src=frm;fit();
}
function reset(){ $('iT').value='메시지';$('iM').value='너무 보고싶다';$('iL').value='메뉴';$('iR').value='확인';Object.keys(ICON).forEach(function(k){$(k).checked=true});$('iX').value=0;$('iY').value=0;$('iS').value=100;frm=null;curFile=null;$('vFrm').src='';$('vFrm').style.display='none';[].forEach.call(picker.children,function(x){x.classList.remove('active')});render()}
['iT','iM','iL','iR','iX','iY','iS','iSig','iMail','iVib','iBat'].forEach(function(id){var el=$(id);if(el)el.addEventListener('input',render)});


$('reset').onclick=reset;
(function(){var ed=document.querySelector('.editor'),panels=[].slice.call(ed.querySelectorAll('.ps-pn')),bar=document.createElement('div');bar.className='ps-seg';panels.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');if(!i)b.className='on';b.onclick=function(){panels.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(x,j){x.classList.toggle('on',j===i)})};bar.appendChild(b)});ed.parentNode.insertBefore(bar,ed)})();
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';setTimeout(fit,50)};
$('savePng').onclick=function(){var btn=this,oldTransform=zs.style.transform;btn.disabled=true;btn.textContent='저장 중…';zs.style.transform='none';function finish(){zs.style.transform=oldTransform;btn.disabled=false;btn.textContent='PNG 저장'}html2canvas(zs,{width:W,height:H,scale:1,backgroundColor:null,useCORS:true,allowTaint:false,logging:false}).then(function(canvas){canvas.toBlob(function(blob){finish();if(!blob){alert('PNG 생성에 실패했어. 다시 시도해줘.');return;}var url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='oldphone.png';a.style.display='none';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url)},15000);},'image/png')}).catch(function(err){finish();alert('PNG 저장에 실패했어. 미리보기 이미지를 불러온 뒤 다시 시도해줘.');console.error(err)})};
if(window.ResizeObserver)new ResizeObserver(fit).observe(fr);window.addEventListener('resize',fit);reset();chooseFrame(0);setTimeout(fit,100);setTimeout(fit,500);
})();