(function(){
var $=function(i){return document.getElementById(i)};
var NS='http://www.w3.org/2000/svg';
var C={음식점:{c:'#f28c38',i:'<path d="M23 17v9a4 4 0 0 0 4 4v15M23 17v9M31 17v9M27 17v13M41 17c-4 2-5 9-4 15h4v13M41 17v28" stroke="#fff" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',t:'#f28c38'},
 카페:{c:'#8b6b55',i:'<path d="M19 25h23v9a9 9 0 0 1-9 9h-5a9 9 0 0 1-9-9z" fill="#fff"/><path d="M42 28h3a4.5 4.5 0 0 1 0 9h-3" stroke="#fff" stroke-width="3" fill="none"/>',t:'#a8806a'},
 쇼핑:{c:'#8b6fe0',i:'<path d="M20 26h24l2 18H18z" fill="#fff"/><path d="M26 26v-3a6 6 0 0 1 12 0v3" stroke="#fff" stroke-width="3" fill="none"/>',t:'#f0586e'},
 숙소:{c:'#6b8def',i:'<path d="M17 21v24M17 37h30v8M17 37v-7h16a9 9 0 0 1 9 9" stroke="#fff" stroke-width="3.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',t:'#8e7be8'}};
var DEF=[{n:'맛집',t:'음식점',x:712,y:318},{n:'쇼핑몰',t:'쇼핑',x:930,y:232},{n:'카페',t:'카페',x:790,y:500}];
var TABS=['지도','저장','추가','알림','내 정보'];
var TI=['<path d="M12 22s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.500-7 12-7 12z" fill="currentColor" stroke="none"/><circle cx="12" cy="10" r="2.800" fill="#fff" stroke="none"/>','<path d="M6 3h12v18l-6-4.500L6 21z"/>','<circle cx="12" cy="12" r="9"/><path d="M12 7.500v9M7.500 12h9"/>','<path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21a2 2 0 0 0 4 0"/>','<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.500 3.500-7 8-7s8 2.500 8 7z"/>'];
var S,selId,on=new Set(Object.keys(C)),adding=false,tab=0;
function find(id){return S.pins.filter(function(p){return p.id===id})[0]}
function toast(m){var t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(function(){t.classList.remove('show')},1400)}
function fit(){var s=$('frame').clientWidth/1280;$('app').style.transform='scale('+s+')';$('pw').style.height=(720*s)+'px'}
if(window.ResizeObserver)new ResizeObserver(fit).observe($('frame'));
window.addEventListener('resize',fit);
function ico(k,col){return '<svg width="48" height="48" viewBox="14 14 36 36"><g style="color:'+col+'">'+C[k].i.replace(/#fff/g,col)+'</g></svg>'}
function draw(){
  var g=$('pins');g.innerHTML='';
  var q=$('q').value.trim();
  S.pins.forEach(function(p){
    if(!on.has(p.t)||p.n.indexOf(q)<0)return;
    var f=document.createElementNS(NS,'foreignObject');
    f.setAttribute('x',p.x-32);f.setAttribute('y',p.y-80);f.setAttribute('width',64);f.setAttribute('height',80);f.style.overflow='visible';
    f.innerHTML='<div xmlns="http://www.w3.org/1999/xhtml" class="pin'+(p.id===selId?' sel':'')+'"><svg width="64" height="80" viewBox="0 0 64 80"><path d="M32 79C20 66 3 52 3 32a29 29 0 0 1 58 0c0 20-17 34-29 47z" fill="'+C[p.t].c+'" stroke="#fff" stroke-width="3.500"/><circle cx="32" cy="32" r="22" fill="#fff" opacity=".18"/>'+C[p.t].i+'</svg></div>';
    f.onclick=function(e){e.stopPropagation();select(p.id);toast(p.n)};
    g.appendChild(f);
  });
}
function select(id){selId=id;draw();editor()}
function editor(){
  if(!find(selId))selId=S.pins.length?S.pins[0].id:null;
  var s=$('sel');s.innerHTML='';
  S.pins.forEach(function(p){var o=document.createElement('option');o.value=p.id;o.textContent=p.n;if(p.id===selId)o.selected=true;s.appendChild(o)});
  var p=find(selId);$('zName').value=p?p.n:'';$('zType').value=p?p.t:'음식점';
  $('zName').disabled=$('zType').disabled=$('zDel').disabled=!p;
}
function tabs(){
  $('tabs').innerHTML='';
  TABS.forEach(function(n,i){
    var b=document.createElement('button');b.className='tb'+(i===tab?' on':'');
    b.innerHTML='<svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.700" stroke-linecap="round" stroke-linejoin="round">'+TI[i]+'</svg><span>'+S.tabs[i]+'</span>';
    b.onclick=function(){tab=i;tabs()};$('tabs').appendChild(b);
  });
}
function init(){
  S={pins:[],nid:0,ph:'장소, 주소 검색',tabs:TABS.slice()};
  DEF.forEach(function(p){S.pins.push({id:++S.nid,n:p.n,t:p.t,x:p.x,y:p.y})});
  on=new Set(Object.keys(C));adding=false;selId=null;tab=0;
  document.querySelectorAll('.chip').forEach(function(c){c.classList.remove('off')});
  $('q').value='';$('q').placeholder=S.ph;$('iPh').value=S.ph;
  var it=$('iTabs');it.innerHTML='';
  TABS.forEach(function(n,i){var l=document.createElement('label');l.innerHTML='탭 '+(i+1)+' 문구<input value="'+n+'">';l.lastChild.oninput=function(){S.tabs[i]=this.value||TABS[i];tabs()};it.appendChild(l)});
  draw();editor();tabs();
}
/* 칩 */
Object.keys(C).forEach(function(k){
  var b=document.createElement('button');b.className='chip';b.innerHTML=ico(k,C[k].t)+k;
  b.onclick=function(){on.has(k)?on.delete(k):on.add(k);b.classList.toggle('off',!on.has(k));draw()};
  $('chips').appendChild(b);
  var o='<option>'+k+'</option>';$('zType').insertAdjacentHTML('beforeend',o);$('nType').insertAdjacentHTML('beforeend',o);
});
$('chips').insertAdjacentHTML('beforeend','<span class="chip more"><i></i><i></i><i></i></span>');
$('q').oninput=draw;
$('loc').onclick=function(){toast('현재 위치')};
$('add').onclick=function(){adding=!adding;toast(adding?'지도를 탭해서 위치를 정하세요':'추가 모드 종료')};
$('map').onclick=function(e){
  if(!adding)return;
  var r=$('map').getBoundingClientRect(),k=1280/r.width;
  var p={id:++S.nid,n:'새 핀',t:$('nType').value,x:(e.clientX-r.left)*k,y:(e.clientY-r.top)*k};
  S.pins.push(p);adding=false;select(p.id);toast('핀을 추가했어요');
};
$('sel').onchange=function(){select(+this.value)};
$('zName').oninput=function(){var p=find(selId);if(!p)return;p.n=this.value||'이름 없음';var o=$('sel').querySelector('option[value="'+p.id+'"]');if(o)o.textContent=p.n;draw()};
$('zType').onchange=function(){var p=find(selId);if(!p)return;p.t=this.value;draw()};
$('zDel').onclick=function(){S.pins=S.pins.filter(function(p){return p.id!==selId});selId=null;draw();editor();toast('핀을 삭제했어요')};
$('iPh').oninput=function(){S.ph=this.value||'장소, 주소 검색';$('q').placeholder=S.ph};
$('reset').onclick=function(){init();fit();toast('초기화했어요')};
init();fit();
})();
