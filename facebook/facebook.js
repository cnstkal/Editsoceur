(function(){
var $=function(i){return document.getElementById(i)};
var D={Name:'정윤호',Time:'2분 전',Text:'확실히 흰피부가 이쁘다\n오늘 그냥 문득 버스에서 팔다리 쭉뻗고 있다가 내 자신이 은교 같다는 생각이 들었음',Like:'김코님 외 1명',Cmt:'2',Shr:'0',C1n:'민병관',C1t:'어디 아프냐',C1s:'방금 전 · 좋아요 · 답글 달기',C2n:'정현숙',C2t:'윤호야^^ 고모야.  자신을.사랑하는모습이  참.보기좋다~',C2s:'방금 전 · 좋아요 · 답글 달기'};
var map={Name:'vName',Time:'vTime',Text:'vText',Like:'vLike',Cmt:'vCmt',Shr:'vShr',C1n:'vC1n',C1t:'vC1t',C1s:'vC1s',C2n:'vC2n',C2t:'vC2t',C2s:'vC2s'};
var imgs={iAv:'vAv',iPhoto:'vPhoto',iC1av:'vC1av',iC2av:'vC2av'};
function fill(){for(var k in map){$('i'+k).value=D[k];$(map[k]).textContent=D[k]}}
Object.keys(map).forEach(function(k){$('i'+k).oninput=function(){$(map[k]).textContent=this.value}});
fill();
function clr(){for(var k in imgs){$(imgs[k]).style.backgroundImage='';$(k).value=''}$('vPhoto').hidden=true}
Object.keys(imgs).forEach(function(k){$(k).onchange=function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){$(imgs[k]).style.backgroundImage='url('+r.result+')';if(k==='iPhoto')$('vPhoto').hidden=false};r.readAsDataURL(f)}});
$('clearImg').onclick=clr;
var pns=[].slice.call(document.querySelectorAll('.ps-pn')),bar=$('seg');
pns.forEach(function(g,i){var b=document.createElement('button');b.type='button';b.textContent=g.getAttribute('data-t');if(!i)b.className='on';
b.onclick=function(){pns.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드'};
$('reset').onclick=function(){fill();clr()};
var shot=$('shot');
$('savePng').onclick=function(){
 var btn=this,oldText=btn.textContent;
 btn.disabled=true;btn.textContent='저장 중...';
 var w=shot.scrollWidth,h=shot.scrollHeight;
 var scale=Math.min(5,16000/Math.max(w,h),Math.sqrt(80000000/(w*h)));
 scale=Math.max(1,scale);
 html2canvas(shot,{scale:scale,useCORS:true,allowTaint:false,backgroundColor:'#fff',imageTimeout:20000,logging:false,windowWidth:Math.max(document.documentElement.clientWidth,w),windowHeight:Math.max(document.documentElement.clientHeight,h),scrollX:0,scrollY:0}).then(function(c){
  return new Promise(function(resolve,reject){
   if(!c.toBlob){try{resolve(c.toDataURL('image/png'))}catch(e){reject(e)}return}
   c.toBlob(function(blob){if(blob)resolve(blob);else reject(new Error('PNG encoding failed'))},'image/png');
  });
 }).then(function(data){
  var url=typeof data==='string'?data:URL.createObjectURL(data),a=document.createElement('a');
  a.download='facebook.png';a.href=url;document.body.appendChild(a);a.click();a.remove();
  if(typeof data!=='string')setTimeout(function(){URL.revokeObjectURL(url)},30000);
 }).catch(function(err){console.error('Legacy Facebook PNG export failed:',err);alert('PNG 저장에 실패했습니다. 이미지 크기를 확인한 뒤 다시 시도해 주세요.')})
 .finally(function(){btn.disabled=false;btn.textContent=oldText});
};
function fit(){shot.style.fontSize=(shot.clientWidth/36)+'px'}
fit();window.addEventListener('resize',fit);if(window.ResizeObserver)new ResizeObserver(fit).observe(shot);
})();
