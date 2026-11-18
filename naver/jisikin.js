(function(){
var $=function(i){return document.getElementById(i)};
var D={Title:'찹쌀떡 같은 사람',Body:'짝남 이상형이 찹쌀떡 같은 사람이라는데\n그건 대체 어떻게 될 수 있나요?',User:'yuyu***',Date:'201X.4.1',Close:'98%',Pick:'100%',Want:'2',Cnt:'1',Name:'답변요리사님의 답변',Grade:'시민',Adopt:'2',Ans:'찹쌀떡을 아주 많이 먹으면 됩니다\n도움이 되셨다면 채택 부탁드립니다'};
var map={Title:'vTitle',Body:'vBody',User:'vUser',Date:'vDate',Close:'vClose',Pick:'vPick',Want:'vWant',Cnt:'vCnt',Name:'vName',Grade:'vGrade',Adopt:'vAdopt',Ans:'vAns'};
var shot=$('shot'),av=$('vAv'),th=document.querySelector('.ps-pic .th');
function fill(){for(var k in map){$('i'+k).value=D[k];$(map[k]).textContent=D[k]}}
Object.keys(map).forEach(function(k){$('i'+k).oninput=function(){$(map[k]).textContent=this.value}});
fill();
/* 사진 */
function setAv(u){av.style.backgroundImage=u?'url('+u+')':'';th.style.backgroundImage=u?'url('+u+')':'';$('picTxt').textContent=u?'프로필 선택됨':'기본 프로필'}
$('iAv').onchange=function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){setAv(r.result)};r.readAsDataURL(f)};
$('clearAv').onclick=function(){setAv('');$('iAv').value=''};
/* 탭 (studio.js 방식: data-t 패널 → 탭 버튼) */
var pns=[].slice.call(document.querySelectorAll('.ps-pn')),bar=$('seg');
pns.forEach(function(g,i){var b=document.createElement('button');b.type='button';b.textContent=g.getAttribute('data-t');if(!i)b.className='on';
b.onclick=function(){pns.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
/* 미리보기 모드 / 초기화 / 저장 */
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드'};
$('reset').onclick=function(){fill();setAv('')};
$('savePng').onclick=function(){html2canvas(shot,{scale:3,useCORS:true,backgroundColor:'#fff'}).then(function(c){var a=document.createElement('a');a.download='jisikin.png';a.href=c.toDataURL();a.click()})};
/* 폭에 맞춰 9:16 화면 비율 유지 (360px = 10px 기준) */
function fit(){shot.style.fontSize=(shot.clientWidth/36)+'px'}
fit();window.addEventListener('resize',fit);if(window.ResizeObserver)new ResizeObserver(fit).observe(shot);
})();
