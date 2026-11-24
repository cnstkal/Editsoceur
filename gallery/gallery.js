(function(){
var $=function(i){return document.getElementById(i)};
function ph(){
var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 231" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8e0fb"/><stop offset="1" stop-color="#e9f9ff"/></linearGradient></defs><rect width="160" height="231" fill="url(#g)"/><path d="M42 74a20 20 0 0 1 38-6 18 18 0 0 1 36 6 12 12 0 0 1 0 24H48a12 12 0 0 1-6-24z" fill="#fff"/><path d="M0 170c30-22 70-22 100-6s45 14 60 8v59H0z" fill="#c2e083"/><path d="M0 195c40-16 90-12 160 4v32H0z" fill="#87a80a"/></svg>';
return 'data:image/svg+xml;utf8,'+encodeURIComponent(s);
}
var P=ph(),S;
function init(){
S={cnt:3,np:5,loc:'위치 정보 포함',bd:false,th:P,ph:[P,P,P],pp:[0,1,2,3,4].map(function(i){return{n:'사용자 '+(i+1),img:P}})};
$('iCnt').value=3;$('iNp').value=5;$('iLoc').value=S.loc;$('iBd').checked=false;
document.querySelectorAll('input[type=file]').forEach(function(f){f.value=''});
editor();render();
}
var BADGE='<svg width="14" height="14" viewBox="0 0 14 14"><rect width="14" height="14" rx="4" fill="#34c759" stroke="#161e19" stroke-width="1.500"/><ellipse cx="7" cy="6.500" rx="3.800" ry="3" fill="#fff"/></svg>';
var CHK='<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7.500" fill="#0a84ff" stroke="#fff" stroke-width="1.500"/><path d="m4.800 8.200 2.200 2.200 4.200-4.600" fill="none" stroke="#fff" stroke-width="1.700" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function render(){
$('vCnt').textContent='사진 '+S.cnt+'장 선택됨';
$('vLoc').textContent=S.loc;
$('vTh').src=S.th;
var L=[-116,55,227],h='';
for(var i=0;i<3;i++)h+='<div class="c" style="left:'+L[i]+'px"><img src="'+S.ph[i]+'">'+(i<2?CHK:'')+'</div>';
$('car').innerHTML=h;
h='';
for(i=0;i<S.np;i++)h+='<div class="p"><div class="a"><img src="'+S.pp[i].img+'">'+(S.bd?BADGE:'')+'</div><span>'+esc(S.pp[i].n)+'</span></div>';
$('ppl').innerHTML=h;
}
function esc(t){return t.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}

function editor(){
var h='';
for(var i=0;i<S.np;i++)h+='<div class="pe"><b>인원 '+(i+1)+'</b><input data-n="'+i+'" value="'+esc(S.pp[i].n)+'"><input type="file" accept="image/*" data-a="'+i+'"></div>';
$('pEd').innerHTML=h;
}
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
$('iCnt').oninput=function(){S.cnt=Math.max(1,parseInt(this.value)||1);render()};
$('iNp').oninput=function(){S.np=Math.min(5,Math.max(0,parseInt(this.value)||0));editor();render()};
$('iLoc').oninput=function(){S.loc=this.value;render()};
$('iBd').onchange=function(){S.bd=this.checked;render()};
$('iTh').onchange=function(){rd(this.files[0],function(d){S.th=d;render()})};
$('iTh_del').onclick=function(){S.th=''; $('iTh').value=''; render();};
document.querySelectorAll('.iPh').forEach(function(el){el.onchange=function(){var k=+el.dataset.p;rd(el.files[0],function(d){S.ph[k]=d;render()})}});
$('pEd').addEventListener('input',function(e){var t=e.target;if(t.dataset.n!=null){S.pp[t.dataset.n].n=t.value;render()}});
$('pEd').addEventListener('change',function(e){var t=e.target;if(t.dataset.a!=null)rd(t.files[0],function(d){S.pp[t.dataset.a].img=d;render()})});
$('reset').onclick=init;
$('save').onclick=function(){
html2canvas($('snap'),{backgroundColor:null,scale:4,useCORS:true}).then(function(c){
var a=document.createElement('a');a.download='gallery.png';a.href=c.toDataURL('image/png');a.click();
});
};
/* Zoom과 동일한 탭 생성 및 전환 */
(function(){var ed=document.querySelector('.editor'),g=[].slice.call(ed.querySelectorAll('.ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
g.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');if(!i)b.className='on';b.onclick=function(){g.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});ed.parentNode.insertBefore(bar,ed)})();
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드'};
init();
})();
