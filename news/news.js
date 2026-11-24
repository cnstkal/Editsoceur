(function(){
var $=function(i){return document.getElementById(i)};
var DEF={
cat:'생활 · 문화',
title:'박성화, 결혼 소식 직접 전해…‘인생의\n새로운 장’',
press:'레몬경제',
inp:'입력 2025.06.22 12:10',
up:'업데이트 2025.06.22 12:23',
rep:'코돌이 기자',
body:'15년째 활동 중인 박성화는 공개 연애 중이던 연인과 결혼을 준비 중인 것으로 알려졌다. 두 사람은 교제를 이어오며 서로에 대한 신뢰를 쌓아왔고, 최근 결혼을 결심한 것으로 전해졌다.\n\n소속사 측은 6일 “박성화가 오랜 시간 진지하게 만나온 연인과 평생을 함께하기로 약속했다”며 “구체적인 결혼 시기와 방식 등은 현재 조율 중인 단계”라고 밝혔다. 이어 “두 사람이 조용히 준비할 수 있도록 따뜻한 시선으로 지켜봐 주시길 부탁드린다”고 덧붙였다.\n\n박성화는 데뷔 이후 드라마와 영화, 예능을 넘나들며 꾸준히 활동을 이어온 배우로, 안정적인 연기력과 폭넓은 캐릭터 소화력으로 대중의 사랑을 받아왔다. 특히 최근 출연작이 잇따라 좋은 반응을 얻으며 다시 한 번 존재감을 입증하기도 했다.\n\n한편 박성화는 공개 연애 사실을 밝힌 이후에도 비교적 조용히 관계를 이어왔으며, 이번 결혼 소식이 전해지자 팬들과 업계 관계자들의 축하가 이어지고 있다.',
img:'news.jpg'
};
var F={iCat:'cat',iTitle:'title',iPress:'press',iIn:'inp',iUp:'up',iRep:'rep',iBody:'body'};
var photo=DEF.img;

function render(){
$('vCat').textContent=$('iCat').value;
$('vTitle').textContent=$('iTitle').value;
$('vPress').textContent=$('iPress').value;
$('vIn').textContent=$('iIn').value;
$('vUp').textContent=$('iUp').value;
$('vRep').textContent=$('iRep').value;
$('vBody').textContent=$('iBody').value;
$('vImg').src=photo;
$('vPhoto').classList.toggle('off',!$('iImgOn').checked||!photo);
fit();
}
function fit(){
var box=$('fit'),art=$('art'),s=box.clientWidth/1560;
art.style.transform='scale('+s+')';
box.style.height=art.offsetHeight*s+'px';
}
function fill(){
for(var k in F)$(k).value=DEF[F[k]];
$('iImgOn').checked=true;photo=DEF.img;
render();
}
Object.keys(F).forEach(function(k){$(k).addEventListener('input',render)});
$('iImgOn').addEventListener('change',render);
$('iPhoto').addEventListener('change',function(){
var f=this.files[0];if(!f)return;
var r=new FileReader();r.onload=function(){photo=r.result;$('iImgOn').checked=true;render()};r.readAsDataURL(f);
});
$('reset').onclick=fill;

var tabs=document.querySelectorAll('#seg button'),pns=document.querySelectorAll('.ps-pn');
tabs.forEach(function(b,i){b.onclick=function(){
tabs.forEach(function(x,j){x.classList.toggle('on',i===j)});
pns.forEach(function(p,j){p.hidden=i!==j});
}});
$('pvBtn').onclick=function(){
var on=document.body.classList.toggle('pvmode');
this.textContent=on?'편집 모드':'미리보기 모드';
setTimeout(fit,0);
};

$('savePng').onclick=function(){
var art=$('art'),old=art.style.transform;
art.style.transform='none';
html2canvas(art,{scale:4,backgroundColor:'#fff',useCORS:true,width:1560,height:art.offsetHeight}).then(function(c){
art.style.transform=old;
var a=document.createElement('a');a.download='news.png';a.href=c.toDataURL('image/png');a.click();
}).catch(function(){art.style.transform=old});
};

window.addEventListener('resize',fit);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
$('vImg').addEventListener('load',fit);
fill();
})();
