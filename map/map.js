(function(){
var $=function(i){return document.getElementById(i)};
var TYPES={주거:{c:'#4f9dff',e:'🏠'},상업:{c:'#ff6b6b',e:'🍴'},공원:{c:'#34c27a',e:'🌳'},산업:{c:'#ffa63d',e:'🏭'}};
var DEF_ZONES=[
  {n:'송도 주거단지',t:'주거',b:[[37.385,126.640],[37.400,126.665]]},
  {n:'구월 상권',t:'상업',b:[[37.440,126.700],[37.452,126.722]]},
  {n:'중앙공원',t:'공원',b:[[37.378,126.668],[37.390,126.688]]},
  {n:'남동 공단',t:'산업',b:[[37.405,126.690],[37.420,126.715]]},
  {n:'부평 주거',t:'주거',b:[[37.488,126.715],[37.500,126.740]]}
];
var DEF_BM='북마크하기', DEF_PH='구역 검색';
var S, selId=null, layers={}, active=new Set(Object.keys(TYPES)), drawing=false, p1=null, tmp=null;

var map=L.map('map',{zoomControl:false}).setView([37.43,126.69],12);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(map);

function find(id){for(var i=0;i<S.zones.length;i++)if(S.zones[i].id===id)return S.zones[i];return null}
function toast(m){var t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(function(){t.classList.remove('show')},1400)}

/* 390x844 폰 화면을 프레임 너비에 맞춰 축소 */
function fit(){var s=$('frame').clientWidth/390;$('app').style.transform='scale('+s+')';$('pw').style.height=(844*s)+'px';map.invalidateSize()}
if(window.ResizeObserver)new ResizeObserver(fit).observe($('frame'));
window.addEventListener('resize',fit);

function drawMap(){
  Object.keys(layers).forEach(function(k){layers[k].rect.remove();layers[k].pin.remove()});
  layers={};
  S.zones.forEach(function(z){
    var rect=L.rectangle(z.b,{className:'zone',color:z.c,fillColor:z.c,fillOpacity:.32,weight:3})
      .bindTooltip(z.n,{permanent:true,direction:'center',className:'zlabel'});
    var pin=L.marker(L.latLngBounds(z.b).getCenter(),{icon:L.divIcon({className:'',iconSize:[34,34],iconAnchor:[17,34],
      html:'<div class="pin" style="background:'+z.c+'"><span>'+TYPES[z.t].e+'</span></div>'})});
    var go=function(){select(z.id)};
    rect.on('click',go);pin.on('click',go);
    layers[z.id]={rect:rect,pin:pin};
  });
  applyFilter();refreshSheet();
}

function applyFilter(){
  var q=$('q').value.trim();
  S.zones.forEach(function(z){
    var l=layers[z.id]; if(!l)return;
    var show=active.has(z.t)&&z.n.indexOf(q)>-1;
    l.rect.setStyle({fillOpacity:z.id===selId?.55:.32,weight:z.id===selId?4:3});
    [l.rect,l.pin].forEach(function(x){show?x.addTo(map):x.remove()});
  });
}

function select(id){
  selId=id;var z=find(id);
  if(z)map.fitBounds(L.latLngBounds(z.b),{padding:[40,40],maxZoom:15});
  applyFilter();refreshSheet();renderEditor();
}

function refreshSheet(){
  var z=find(selId);
  $('s-name').textContent=z?z.n:'구역을 선택하세요';
  $('s-type').textContent=z?z.t+' 구역':'지도의 색칠된 구역을 눌러보세요';
  $('s-dot').style.background=z?z.c:'#ccc';
  var on=!!z&&S.marks.indexOf(z.id)>-1;
  $('bm').textContent=on?'북마크 해제':S.bm;
  $('bm').classList.toggle('done',on);
}

function renderEditor(){
  if(!find(selId))selId=S.zones.length?S.zones[0].id:null;
  var sel=$('sel');sel.innerHTML='';
  S.zones.forEach(function(z){var o=document.createElement('option');o.value=z.id;o.textContent=z.n;if(z.id===selId)o.selected=true;sel.appendChild(o)});
  var z=find(selId);
  $('zName').value=z?z.n:'';$('zType').value=z?z.t:'주거';$('zColor').value=z?z.c:'#000000';
  $('zName').disabled=$('zType').disabled=$('zColor').disabled=$('zDel').disabled=!z;
}

function init(){
  S={zones:[],marks:[],nid:0,bm:DEF_BM,ph:DEF_PH};
  DEF_ZONES.forEach(function(z){S.zones.push({id:++S.nid,n:z.n,t:z.t,c:TYPES[z.t].c,b:z.b})});
  active=new Set(Object.keys(TYPES));drawing=false;p1=null;
  if(tmp){tmp.remove();tmp=null}
  $('add').classList.remove('on');
  document.querySelectorAll('.chip').forEach(function(c){c.classList.remove('off')});
  selId=null;
  $('iBm').value=S.bm;$('iPh').value=S.ph;$('q').placeholder=S.ph;$('q').value='';
  $('nName').value='';$('nType').value='주거';
  drawMap();renderEditor();
}

/* 카테고리 칩 */
Object.keys(TYPES).forEach(function(k){
  var b=document.createElement('button');b.className='chip';
  b.innerHTML='<i style="background:'+TYPES[k].c+'"></i>'+k;
  b.onclick=function(){active.has(k)?active.delete(k):active.add(k);b.classList.toggle('off',!active.has(k));applyFilter()};
  $('chips').appendChild(b);
});

/* 검색 */
$('q').oninput=applyFilter;
$('q').onkeydown=function(e){
  if(e.key!=='Enter')return;
  var v=$('q').value.trim();
  var m=S.zones.filter(function(z){return active.has(z.t)&&z.n.indexOf(v)>-1})[0];
  if(m)select(m.id);
};

/* 북마크 */
$('bm').onclick=function(){
  var z=find(selId);
  if(!z)return toast('구역을 먼저 선택하세요');
  var i=S.marks.indexOf(z.id);
  i>-1?S.marks.splice(i,1):S.marks.push(z.id);
  refreshSheet();
  toast(i>-1?'북마크를 해제했어요':'북마크에 저장했어요');
};

/* 구역 추가: 두 점 탭 */
$('add').onclick=function(){
  drawing=!drawing;p1=null;
  if(tmp){tmp.remove();tmp=null}
  this.classList.toggle('on',drawing);
  toast(drawing?'두 꼭짓점을 차례로 눌러주세요':'추가 모드 종료');
};
map.on('click',function(e){
  if(!drawing)return;
  if(!p1){p1=e.latlng;tmp=L.circleMarker(p1,{radius:6,color:'#222'}).addTo(map);return}
  var t=$('nType').value;
  var z={id:++S.nid,n:$('nName').value.trim()||'새 구역',t:t,c:TYPES[t].c,b:[[p1.lat,p1.lng],[e.latlng.lat,e.latlng.lng]]};
  S.zones.push(z);
  tmp.remove();tmp=null;p1=null;drawing=false;
  $('add').classList.remove('on');
  selId=z.id;drawMap();renderEditor();toast('구역을 추가했어요');
});

/* 편집 패널 */
$('sel').onchange=function(){select(+this.value)};
$('zName').oninput=function(){
  var z=find(selId);if(!z)return;
  z.n=this.value||'이름 없음';
  var o=$('sel').querySelector('option[value="'+z.id+'"]');if(o)o.textContent=z.n;
  drawMap();
};
$('zType').onchange=function(){
  var z=find(selId);if(!z)return;
  z.t=this.value;z.c=TYPES[z.t].c;$('zColor').value=z.c;drawMap();
};
$('zColor').oninput=function(){var z=find(selId);if(!z)return;z.c=this.value;drawMap()};
$('zDel').onclick=function(){
  if(!find(selId))return;
  S.zones=S.zones.filter(function(z){return z.id!==selId});
  S.marks=S.marks.filter(function(id){return id!==selId});
  selId=null;drawMap();renderEditor();toast('구역을 삭제했어요');
};
$('iBm').oninput=function(){S.bm=this.value||DEF_BM;refreshSheet()};
$('iPh').oninput=function(){S.ph=this.value||DEF_PH;$('q').placeholder=S.ph};
$('reset').onclick=function(){init();fit();toast('초기화했어요')};

init();fit();
})();
