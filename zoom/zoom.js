(function(){
var $=function(i){return document.getElementById(i)};
var DEF={n0:'최산',n1:'윤호',cnt:'2',login:'로그인',gs:'#00ff00',m0:true,m1:true,a:true,v:true,cp:false,cs:'윤호',ct:'모두에게',cm:'산아'};
var zs=$('zoom'),zw=$('zw'),fr=$('frame'),W=2576,H=1449,pics=[null,null];

/* 반응형 스케일 */
function fit(){var s=fr.clientWidth/W;zs.style.transform='scale('+s+')';zw.style.height=(H*s)+'px'}
if(window.ResizeObserver)new ResizeObserver(fit).observe(fr);window.addEventListener('resize',fit);

/* 렌더 */
function render(){
 var count=Math.max(1,Math.min(40,parseInt($('iCnt').value)||1));
 $('vCnt').textContent=count;$('vLogin').textContent=$('iLogin').value;
 /* 줌 갤러리뷰: 타일 16:9, 전체 중앙정렬, 마지막 줄도 중앙정렬. 타일이 가장 커지는 줄 수 선택 */
 var gap=20,left=82,top=130,areaW=2412,areaH=1120,best=null,markup='';
 for(var r=1;r<=count;r++){var c=Math.ceil(count/r);if(Math.ceil(count/c)!==r)continue;
  var tw=Math.min((areaW-gap*(c-1))/c,(areaH-gap*(r-1))/r*16/9);if(!best||tw>best.tw+0.5)best={r:r,c:c,tw:tw}}
 var cols=best.c,rows=best.r,tileW=best.tw,tileH=tileW*9/16,gridH=rows*tileH+gap*(rows-1),oy=top+(areaH-gridH)/2,pos=[];
 for(var ry=0;ry<rows;ry++){var n=Math.min(cols,count-ry*cols),rw=n*tileW+gap*(n-1),ox=left+(areaW-rw)/2;
  for(var rx=0;rx<n;rx++)pos.push([ox+rx*(tileW+gap),oy+ry*(tileH+gap)])}
 for(var i=0;i<count;i++){
  var name=i===0?$('iN0').value:i===1?$('iN1').value:'참가자 '+(i+1);
  var muted=i===0?$('iM0').checked:i===1?$('iM1').checked:true;
  var bg=i<2&&pics[i]?'background-image:url('+pics[i]+');':'background-color:'+$('iGs').value+';';
  markup+='<div class="vid dynamic'+(muted?' unm':'')+'" style="left:'+pos[i][0]+'px;top:'+pos[i][1]+'px;width:'+tileW+'px;height:'+tileH+'px;'+bg+'"><div class="tag"><svg viewBox="0 0 24 24" class="mi"><use href="#mic"/></svg><span>'+name.replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})+'</span></div></div>';
 }
 $('vids').innerHTML=markup;
 zs.classList.toggle('cpon',$('iCp').checked);var s=$('iCs').value;$('vCpA').textContent=s.charAt(0);$('vCpT').textContent=s+'님이 '+$('iCt').value;$('vCpS').textContent=$('iCm').value;
 zs.classList.toggle('aoff',$('iA').checked);zs.classList.toggle('voff',$('iV').checked);
}
function setDefaults(){
 $('iN0').value=DEF.n0;$('iN1').value=DEF.n1;$('iCnt').value=DEF.cnt;$('iLogin').value=DEF.login;$('iGs').value=DEF.gs;
 $('iM0').checked=DEF.m0;$('iM1').checked=DEF.m1;$('iA').checked=DEF.a;$('iV').checked=DEF.v;$('iCp').checked=DEF.cp;$('iCs').value=DEF.cs;$('iCt').value=DEF.ct;$('iCm').value=DEF.cm;
 pics=[null,null];$('iP0').value='';$('iP1').value='';render();
}
['iN0','iN1','iCnt','iLogin','iGs','iM0','iM1','iA','iV','iCp','iCs','iCt','iCm'].forEach(function(id){
 $(id).addEventListener('input',render);$(id).addEventListener('change',render)});
[0,1].forEach(function(i){$('iP'+i).addEventListener('change',function(){
 var f=this.files[0];if(!f)return;var r=new FileReader();
 r.onload=function(e){pics[i]=e.target.result;render()};r.readAsDataURL(f)})});
$('clearPics').onclick=function(){pics=[null,null];$('iP0').value='';$('iP1').value='';render()};
$('reset').onclick=setDefaults;

/* 탭 */
(function(){
 var ed=document.querySelector('.editor'),g=[].slice.call(ed.querySelectorAll('.ps-pn'));
 var bar=document.createElement('div');bar.className='ps-seg';
 g.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');
  if(!i)b.className='on';
  b.onclick=function(){g.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};
  bar.appendChild(b)});
 ed.parentNode.insertBefore(bar,ed);
})();

/* 미리보기 모드 */
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';setTimeout(fit,0)};

/* PNG 저장 (2576x1449 원본 크기) */
$('savePng').onclick=function(){
 var t=zs.style.transform;zs.style.transform='none';
 html2canvas(zs,{width:W,height:H,scale:1,backgroundColor:'#000',useCORS:true}).then(function(c){
  zs.style.transform=t;var a=document.createElement('a');a.download='zoom.png';a.href=c.toDataURL('image/png');a.click();
 }).catch(function(){zs.style.transform=t});
};

setDefaults();fit();
})();
