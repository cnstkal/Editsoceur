(function(){
var $=function(i){return document.getElementById(i)};
var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8e0fb"/><stop offset="1" stop-color="#eafaff"/></linearGradient></defs><rect width="160" height="200" fill="url(#g)"/><path d="M42 60a20 20 0 0 1 38-6 18 18 0 0 1 36 6 12 12 0 0 1 0 24H48a12 12 0 0 1-6-24z" fill="#fff"/><path d="M0 140c30-22 70-22 100-6s45 14 60 8v58H0z" fill="#c2e083"/><path d="M0 165c40-16 90-12 160 4v31H0z" fill="#87a80a"/></svg>';
var P='data:image/svg+xml;utf8,'+encodeURIComponent(s),S;
function it(t,u){return{t:t,u:u||'',i:P}}
function init(){
S={t:'사진',s:'저장 공간이 부족해요 · 더 알아보기',a:P,
M:[it('12월 12일','2026년'),it('일상 기록','2026년 12월 8일')],
P:[it('즐겨찾기'),it('최근 저장 항목'),it('즐겨찾기 2'),it('새 폴더')],
A:[it('새 앨범'),it('여행'),it('일상'),it('추억')]};
$('iT').value=S.t;$('iS').value=S.s;$('iA').value='';
ed();draw();
}
function e(t){return t.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
function tiles(a,m){return a.map(function(x){return '<div class="m"><img src="'+x.i+'"><div class="t">'+e(x.t)+(m&&x.u?'<small>'+e(x.u)+'</small>':'')+'</div></div>'}).join('')}
function draw(){
$('vT').textContent=S.t;$('vS').textContent=S.s;$('vA').src=S.a;
$('rM').innerHTML=tiles(S.M,1);$('rP').innerHTML=tiles(S.P);$('rA').innerHTML=tiles(S.A);
}
var N={M:'추억',P:'고정',A:'앨범'};
function ed(){
var h='';
['M','P','A'].forEach(function(g){
h+='<div class="g"><h3>'+N[g]+'</h3>';
S[g].forEach(function(x,i){
h+='<div class="it"><b>'+(i+1)+'</b><input data-g="'+g+'" data-i="'+i+'" data-k="t" value="'+e(x.t)+'" placeholder="문구">'+(g==='M'?'<input data-g="M" data-i="'+i+'" data-k="u" value="'+e(x.u)+'" placeholder="부제">':'')+'<input type="file" accept="image/*" data-g="'+g+'" data-i="'+i+'"></div>';
});
h+='</div>';
});
$('ed').innerHTML=h;
}
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
$('iT').oninput=function(){S.t=this.value;draw()};
$('iS').oninput=function(){S.s=this.value;draw()};
$('iA').onchange=function(){rd(this.files[0],function(d){S.a=d;draw()})};
$('ed').addEventListener('input',function(ev){var t=ev.target;if(t.dataset.k){S[t.dataset.g][t.dataset.i][t.dataset.k]=t.value;draw()}});
$('ed').addEventListener('change',function(ev){var t=ev.target;if(t.type==='file')rd(t.files[0],function(d){S[t.dataset.g][t.dataset.i].i=d;draw()})});
$('reset').onclick=init;
$('save').onclick=function(){
html2canvas($('snap'),{backgroundColor:null,scale:4,useCORS:true}).then(function(c){
var a=document.createElement('a');a.download='photos.png';a.href=c.toDataURL('image/png');a.click();
});
};
document.querySelectorAll('.tabs button').forEach(function(b){b.onclick=function(){document.querySelectorAll('.tabs button').forEach(function(x){x.classList.toggle('on',x===b)});document.querySelectorAll('[data-panel]').forEach(function(p){p.hidden=p.dataset.panel!==b.dataset.tab})}});
init();
})();
