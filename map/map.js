const TYPES = {
  주거: {c:'#4f9dff', e:'🏠'},
  상업: {c:'#ff6b6b', e:'🍴'},
  공원: {c:'#34c27a', e:'🌳'},
  산업: {c:'#ffa63d', e:'🏭'},
};
const ZONES = [
  {n:'송도 주거단지', t:'주거', b:[[37.385,126.640],[37.400,126.665]]},
  {n:'구월 상권',     t:'상업', b:[[37.440,126.700],[37.452,126.722]]},
  {n:'중앙공원',      t:'공원', b:[[37.378,126.668],[37.390,126.688]]},
  {n:'남동 공단',     t:'산업', b:[[37.405,126.690],[37.420,126.715]]},
  {n:'부평 주거',     t:'주거', b:[[37.488,126.715],[37.500,126.740]]},
];

const map = L.map('map',{zoomControl:false}).setView([37.43,126.69],12);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{maxZoom:19,subdomains:'abcd'}).addTo(map);

const $ = id => document.getElementById(id);
const layers = [];            // {zone, rect, pin}
const active = new Set(Object.keys(TYPES));
const marks = new Set(JSON.parse(localStorage.getItem('map-bm')||'[]'));
let cur = null, drawing = false, p1 = null, tmp = null;

function toast(m){const t=$('toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1400)}

function addZone(z){
  const col = TYPES[z.t].c;
  const rect = L.rectangle(z.b,{className:'zone',color:col,fillColor:col,fillOpacity:.32,weight:3}).addTo(map);
  rect.bindTooltip(z.n,{permanent:true,direction:'center',className:'zlabel'});
  const pin = L.marker(rect.getBounds().getCenter(),{icon:L.divIcon({className:'',iconSize:[34,34],iconAnchor:[17,34],
    html:`<div class="pin" style="background:${col}"><span>${TYPES[z.t].e}</span></div>`})}).addTo(map);
  const go = () => select(z,rect);
  rect.on('click',go); pin.on('click',go);
  layers.push({z,rect,pin});
}

function select(z,rect){
  if(drawing) return;
  cur = z;
  layers.forEach(l=>l.rect.getElement()?.classList.remove('sel'));
  rect.getElement()?.classList.add('sel');
  $('s-name').textContent = z.n;
  $('s-type').textContent = z.t + ' 구역';
  $('s-dot').style.background = TYPES[z.t].c;
  refreshBm();
  map.fitBounds(rect.getBounds(),{padding:[60,60],maxZoom:15});
}

function refreshBm(){
  const on = cur && marks.has(cur.n);
  $('bm').textContent = on ? '북마크 해제' : '북마크하기';
  $('bm').classList.toggle('done',!!on);
}
$('bm').onclick = () => {
  if(!cur) return toast('구역을 먼저 선택하세요');
  marks.has(cur.n) ? marks.delete(cur.n) : marks.add(cur.n);
  localStorage.setItem('map-bm',JSON.stringify([...marks]));
  refreshBm(); toast(marks.has(cur.n)?'북마크에 저장했어요':'북마크를 해제했어요');
};

// 카테고리 칩
Object.entries(TYPES).forEach(([k,v])=>{
  const b = document.createElement('button');
  b.className='chip'; b.innerHTML=`<i style="background:${v.c}"></i>${k}`;
  b.onclick = () => { active.has(k)?active.delete(k):active.add(k); b.classList.toggle('off',!active.has(k)); filter(); };
  $('chips').appendChild(b);
});

function filter(){
  const q = $('q').value.trim();
  layers.forEach(({z,rect,pin})=>{
    const show = active.has(z.t) && z.n.includes(q);
    [rect,pin].forEach(x => show ? x.addTo(map) : x.remove());
  });
}
$('q').oninput = filter;
$('q').onkeydown = e => {
  if(e.key!=='Enter') return;
  const l = layers.find(l=>l.z.n.includes($('q').value.trim()));
  if(l) select(l.z,l.rect);
};

// 구역 추가: 두 점 탭 → 네모
$('add').onclick = () => {
  drawing = !drawing; p1 = null; tmp && tmp.remove();
  $('add').classList.toggle('on',drawing);
  toast(drawing ? '두 꼭짓점을 차례로 눌러주세요' : '추가 모드 종료');
};
map.on('click',e=>{
  if(!drawing) return;
  if(!p1){ p1=e.latlng; tmp=L.circleMarker(p1,{radius:6,color:'#222'}).addTo(map); return; }
  const name = prompt('구역 이름','새 구역'); 
  const type = prompt('종류 (주거/상업/공원/산업)','주거');
  tmp.remove();
  if(name && TYPES[type]) addZone({n:name,t:type,b:[[p1.lat,p1.lng],[e.latlng.lat,e.latlng.lng]]});
  else toast('종류가 올바르지 않아요');
  p1=null; drawing=false; $('add').classList.remove('on');
});

ZONES.forEach(addZone);
