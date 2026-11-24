(function(){
var $=function(i){return document.getElementById(i)};
var D={q:'박성화',aiOn:true,panelOn:true,
name:'박성화',job:'대한민국 배우',desc:'박성화는 대한민국 배우이다. 2014년 KBS 드라마 《0시의 목격자》로 연예계에 데뷔했다.',src:'위키백과',
k1:'출생',v1:'1999년 4월 04일 (27세)',k2:'키',v2:'178cm',p:{p0:'',p1:'',p2:''},
R:[
 {t:'wiki',site:'나무위키',url:'https://namu.wiki > 박성화',title:'박성화',snip:'박성화 · 2014년 데뷔 · 한국 남배우 · 대한민국의 영화배우 · 한국의 드라마 배우 · 1998년 출생 · 경남 진주시 출신 인물 ...',thumb:'',date:''},
 {t:'news',site:'레몬경제',title:'박성화, 결혼 소식 직접 전해…‘인생의 새로운 장’',snip:'15년째 활동 중인 박성화는 공개 연애 중이던 연인과 결혼을 준비 중인 것으로 알려졌다.',date:'2025. 06. 22',thumb:''},
 {t:'news',site:'ohmynews',title:'‘여름의 끝에서’ 박성화, 섬세한 연기로 시청자 호평…드라마 흥행 견인',snip:'배우 박성화가 출연 중인 드라마 ‘여름의 끝에서’가 시청자들의 호평 속에 꾸준한 상승세를 보이고 있다.',date:'2025. 06. 22',thumb:''},
 {t:'news',site:'KBS 뉴스',title:'박성화, 화보 속 색다른 매력…성숙한 분위기',snip:'배우 박성화가 패션 매거진 화보를 통해 색다른 매력을 선보였다.',date:'2025. 06. 22',thumb:''}
]};
var S,ed=$('ed'),gp=$('gp'),fit=$('fit');
var PN=[];
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function bgi(u){return u?' style="background-image:url('+u+')"':''}
function render(){
 gp.querySelector('.sb .q').textContent=S.q;
 $('tAi').style.display=S.aiOn?'':'none';
 var kp=$('kp');kp.style.display=S.panelOn?'':'none';$('vl').style.display=S.panelOn?'':'none';$('chev').style.display=S.panelOn?'':'none';
 var set=function(k,v){var e=gp.querySelector('[data-b="'+k+'"]');if(e)e.textContent=v||''};
 set('name',S.name);set('job',S.job);set('desc',S.desc);set('src',S.src);set('k1',S.k1);set('v1',S.v1);set('k2',S.k2);set('v2',S.v2);
 ['p0','p1','p2'].forEach(function(k,i){var e=kp.querySelectorAll('[data-i]')[i];if(e)e.style.backgroundImage=S.p[k]?'url('+S.p[k]+')':''});
 $('res').innerHTML=S.R.map(function(r){
  var th='<i class="th ph"'+bgi(r.thumb)+'></i>';
  if(r.t==='wiki')return '<div class="it">'+th+'<div class="hd"><span class="fv nm"></span><div><div class="sn">'+esc(r.site)+'</div><div class="ur">'+esc(r.url)+'</div></div><em>⋮</em></div><a class="tt big">'+esc(r.title)+'</a><p class="sp">'+esc(r.snip)+'</p></div>';
  return '<div class="it">'+th+'<div class="hd s"><span class="fv lm">'+esc((r.site||'?').charAt(0))+'</span><span class="sn">'+esc(r.site)+'</span></div><a class="tt">'+esc(r.title)+'</a><p class="sp">'+esc(r.snip)+'</p>'+(r.date?'<div class="dt">'+esc(r.date)+'</div>':'')+'</div>';
 }).join('');
}
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(e){cb(e.target.result);render()};r.readAsDataURL(f)}
function fld(p,label,get,set,ta){var l=document.createElement('label'),s=document.createElement('span');s.textContent=label;l.appendChild(s);
 var i=document.createElement(ta?'textarea':'input');if(ta)i.rows=3;i.value=get();i.oninput=function(){set(i.value);render()};l.appendChild(i);p.appendChild(l)}
function fileFld(p,label,cb){var l=document.createElement('label'),s=document.createElement('span');s.textContent=label;l.appendChild(s);
 var i=document.createElement('input');i.type='file';i.accept='image/*';i.onchange=function(){rd(i.files[0],cb)};l.appendChild(i);p.appendChild(l)}
function toggle(p,label,get,set){var d=document.createElement('div');d.className='ps-tg';d.innerHTML='<span>'+label+'</span><label class="sw"><input type="checkbox"'+(get()?' checked':'')+'><i></i></label>';d.querySelector('input').onchange=function(){set(this.checked);render()};p.appendChild(d)}
function resList(){
 var box=$('resList');
 box.innerHTML=S.R.map(function(r,i){return '<div class="it2" data-i="'+i+'"><div class="row2"><select data-k="t"><option value="wiki"'+(r.t==='wiki'?' selected':'')+'>위키형</option><option value="news"'+(r.t==='news'?' selected':'')+'>뉴스형</option></select><button type="button" data-d="'+i+'">✕</button></div>'+
  '<input data-k="site" value="'+esc(r.site)+'" placeholder="사이트/매체">'+(r.t==='wiki'?'<input data-k="url" value="'+esc(r.url)+'" placeholder="주소">':'')+
  '<input data-k="title" value="'+esc(r.title)+'" placeholder="제목">'+'<textarea data-k="snip" rows="2" placeholder="요약">'+esc(r.snip)+'</textarea>'+
  (r.t==='news'?'<input data-k="date" value="'+esc(r.date)+'" placeholder="날짜">':'')+
  '<label class="fl2">썸네일<input type="file" accept="image/*" data-f="thumb"></label></div>'}).join('');
}
function build(){
 S=JSON.parse(JSON.stringify(D));
 var old=ed.parentNode.querySelector('.ps-seg');if(old)old.remove();
 ed.innerHTML='';PN=[];
 var bar=document.createElement('div');bar.className='ps-seg';
 var names=['기본','검색 결과','인물','기타'];
 names.forEach(function(n,i){var p=document.createElement('div');p.className='ps-pn';p.hidden=i>0;ed.appendChild(p);PN.push(p);
  var b=document.createElement('button');b.type='button';b.textContent=n;if(!i)b.className='on';
  b.onclick=function(){PN.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
 ed.parentNode.insertBefore(bar,ed);
 fld(PN[0],'검색어',function(){return S.q},function(v){S.q=v});
 toggle(PN[0],'상단 AI 모드 탭',function(){return S.aiOn},function(v){S.aiOn=v});
 PN[1].innerHTML='<div id="resList"></div><button class="addc" id="addR" type="button">+ 검색 결과 추가</button>';
 resList();
 fld(PN[2],'이름',function(){return S.name},function(v){S.name=v});
 fld(PN[2],'직업/분류',function(){return S.job},function(v){S.job=v});
 fld(PN[2],'소개문',function(){return S.desc},function(v){S.desc=v},true);
 fld(PN[2],'출처',function(){return S.src},function(v){S.src=v});
 fld(PN[2],'항목 1',function(){return S.k1},function(v){S.k1=v});
 fld(PN[2],'값 1',function(){return S.v1},function(v){S.v1=v});
 fld(PN[2],'항목 2',function(){return S.k2},function(v){S.k2=v});
 fld(PN[2],'값 2',function(){return S.v2},function(v){S.v2=v});
 fileFld(PN[2],'큰 사진',function(v){S.p.p0=v});
 fileFld(PN[2],'작은 사진 1',function(v){S.p.p1=v});
 fileFld(PN[2],'작은 사진 2',function(v){S.p.p2=v});
 toggle(PN[3],'오른쪽 인물 패널 표시',function(){return S.panelOn},function(v){S.panelOn=v});
 render();
}
$('resList').addEventListener('input',function(e){var t=e.target,r=t.closest('.it2');if(!r||!t.dataset.k)return;S.R[+r.dataset.i][t.dataset.k]=t.value;render()});
ed.addEventListener('change',function(e){var t=e.target,r=t.closest&&t.closest('.it2');if(!r)return;var it=S.R[+r.dataset.i];
 if(t.dataset.k==='t'){it.t=t.value;resList();render()}
 else if(t.dataset.f==='thumb'){rd(t.files[0],function(v){it.thumb=v})}});
ed.addEventListener('click',function(e){var d=e.target.dataset.d;if(d!=null){S.R.splice(+d,1);resList();render()}});
ed.addEventListener('click',function(e){if(e.target.id==='addR'){S.R.push({t:'news',site:'매체',title:'새 검색 결과',snip:'요약을 입력하세요',date:'',thumb:''});resList();render()}});
function scale(){gp.style.transform='scale('+fit.clientWidth/1288+')'}
window.addEventListener('resize',scale);
if(window.ResizeObserver)new ResizeObserver(scale).observe(fit);
$('reset').onclick=build;
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';scale()};
$('savePng').onclick=function(){
 if(!window.html2canvas){alert('html2canvas 로딩 실패 (인터넷 연결 확인)');return}
 html2canvas(gp,{scale:4,useCORS:true,backgroundColor:'#fff',width:1288,height:724.5,onclone:function(d){var g=d.getElementById('gp');g.style.transform='none';g.parentNode.style.overflow='visible'}})
 .then(function(c){var a=document.createElement('a');a.download='google_person_search.png';a.href=c.toDataURL('image/png');a.click()})};
build();scale();
})();
