(function(){
var $=function(i){return document.getElementById(i)};
var E=[['날라리 하느님','58분','댄스팀에 빈자리가 생기자 오디션에 지원하는 리즈베스와 그레이스. 댄스팀은 광란의 할로윈 파티로 신고식을 치르며 새로운 팀원을 맞이한다.'],['주님처럼 살아났어','52분','아냐는 죄책감에 시달리면서도 할로윈 밤의 여파를 수습하려 애쓴다. 한편, 리즈베스는 학교에서 자신의 위상을 높일 기회를 놓치지 않으려 한다.'],['불경한 생각들','46분','불길한 악몽이 번지면서 결속력이 흔들리는 라이언스. 그레이스를 그린 리오의 그림이 학교에 돌면서, 죄책감에 사로잡힌 리오에게 의혹의 눈길이 쏟아진다.'],['악마와 함께 있는 그레이스 프랭클린을 보았다','54분','']];
var DEF={tm:'12:32',bt:'71',is:'16분',sc:false,pg:'5',sb:'',ti:'더 바디',yr:'2026',rt:'19',ep:'에피소드 8개',hd:true,
ds:'여학생 댄스팀의 신고식이 예상치 못한 방향으로 흘러가면서, 종교적 광기가 믿는 자와 믿지 않는 자의 경계를 허문다. 도발적인 하이틴 시리즈.',
cs:'크리스티나 보기치, 지나 메사로시, 사라 부스타니',cr:'퀸 셰퍼드',
t:E.map(function(e){return{n:e[0],d:e[1],x:e[2]}})};
var T=[['iTm','tm'],['iBt','bt'],['iIs','is'],['iPg','pg'],['iSb','sb'],['iTi','ti'],['iYr','yr'],['iRt','rt'],['iEp','ep'],['iDs','ds'],['iCs','cs'],['iCr','cr']];
var S,STORE='editsoceur-netflix-detail-v1';
var PL='<svg width="16" height="16" viewBox="0 0 24 24"><path d="M6 3.500v17l15-8.500z"/></svg>',
DL='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.800" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v13M6.500 11 12 16.500 17.500 11M4 21h16"/></svg>';
function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){console.warn('저장 실패',e)}}
function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function bg(u){return u?"background-image:url('"+u+"')":''}
function render(){
$('nTm').textContent=S.tm;$('nIs').textContent=S.is;$('nBn').textContent=S.bt;$('nBu').style.width=(+S.bt||0)+'%';
$('nC').className='nc'+(S.sc?' sc':'');
$('nV').style.backgroundImage=S.vi?"url('"+S.vi+"')":'';
$('nP').style.width=(+S.pg||0)+'%';
$('nSb').textContent=S.sb;$('nSb').style.display=S.sb?'block':'none';
$('nTi').textContent=S.ti;$('nTi2').textContent=S.ti;$('nYr').textContent=S.yr;
$('nRt').textContent=S.rt;$('nRt').style.display=S.rt?'':'none';
$('nEp').textContent=S.ep;$('nEp2').textContent=S.ep;$('nHd').style.display=S.hd?'':'none';
$('nDs').textContent=S.ds;
$('nCs').innerHTML='출연: '+esc(S.cs)+' ... <em>더 보기</em>';
$('nCr').textContent='크리에이터: '+S.cr;
var h='';S.t.forEach(function(x,i){h+='<div class="ne"><div class="nr"><div class="nth" style="'+bg(x.im)+'"><i>'+PL+'</i></div><div class="nx"><b>'+(i+1)+'. '+esc(x.n)+'</b><span>'+esc(x.d)+'</span></div>'+DL+'</div>'+(x.x?'<p>'+esc(x.x)+'</p>':'')+'</div>'});
$('nL').innerHTML=h}
function list(){var h='';S.t.forEach(function(x,i){
h+='<div class="xc" data-i="'+i+'"><div class="row"><label>제목<input data-f="n" value="'+esc(x.n)+'"></label><label>시간<input data-f="d" value="'+esc(x.d)+'"></label></div><label>설명<input data-f="x" value="'+esc(x.x)+'"></label><div class="row" style="align-items:center"><label class="file">썸네일<input type="file" accept="image/*" data-f="im"></label></div><div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'});
$('nlist').innerHTML=h}
function set(){T.forEach(function(p){$(p[0]).value=S[p[1]]});$('iSc').checked=S.sc;$('iHd').checked=S.hd}
function load(reset){if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}else{try{var s=localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.t))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}set();list();render()}
function rd(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
function glob(){T.forEach(function(p){S[p[1]]=$(p[0]).value});S.sc=$('iSc').checked;S.hd=$('iHd').checked;persist();render()}
T.map(function(p){return p[0]}).concat(['iSc','iHd']).forEach(function(id){$(id).addEventListener('input',glob);$(id).addEventListener('change',glob)});
$('iVi').addEventListener('change',function(){if(this.files[0])rd(this.files[0],function(d){S.vi=d;persist();render()})});
var L=$('nlist'),ix=function(e){return +e.target.closest('.xc').dataset.i};
L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||e.target.type==='file')return;S.t[ix(e)][f]=e.target.value;persist();render()});
L.addEventListener('change',function(e){var t=e.target;if(t.type==='file'&&t.files[0]){var o=S.t[ix(e)];rd(t.files[0],function(d){o.im=d;persist();render()})}});
L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.t;
if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
persist();list();render()});
$('addE').onclick=function(){S.t.push({n:'',d:'50분',x:''});persist();list();render()};
$('reset').onclick=function(){load(true)};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas($('nf'),{scale:4,useCORS:true,backgroundColor:'#000',logging:false})}).then(function(c){
c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='netflix-detail.png';
document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
load(false);
})();
