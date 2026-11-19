(function(){
var $=function(i){return document.getElementById(i)},W=1080,H=1920,ks=$('ks'),kw=$('kw'),fr=$('frame');
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function defs(){return{ch:'Q&A',t:'이게 무슨 감정이죠?',w:'사니',v:'조회수 710',d:'2025.11.15',
 b:'제가 친한 친구가 있는데요\n그 친구랑 같이 있으면 부정맥처럼 가슴이 뛰고\n가끔은 하늘을 나는 기분도 듭니다.\n이유 없이 울고 싶어질 때도 있습니다.\n만나고 돌아오는 길에도 그 친구 생각만 나고\n하루 종일 개 얼굴만 떠올라요.\n장난 답변 신고합니다.',
 tg:'#사람과 그룹',cn:'답변 1개',an:'우주신',ad:'2025.11.15',at:'네 말씀하신 것처럼 부정맥이 심히 의심되네요',av:'',rp:true,rn:'사니',rt:'오늘',rb:'신고합니다',sel:true}}
var S=defs();
var AV='<svg viewBox="0 0 89 89"><circle cx="44" cy="44" r="44" fill="#c9cff3"/><path d="M20 40l8-18 16 8 16-8 8 18v22H20z" fill="#3a2a2e"/><rect x="30" y="40" width="30" height="24" rx="10" fill="#f4a3ad"/><path d="M12 70c14-10 52-10 66 0v19H12z" fill="#f3f0f4"/></svg>',
UP='<svg viewBox="0 0 28 28" fill="#c9d1ea"><path d="M2 12h6v14H2zM10 12l5-9c3 0 4 2 3 5l-1 3h8c2 0 3 2 2 4l-3 9c-.5 1-1 2-3 2H10z"/></svg>',
DN='<svg viewBox="0 0 28 28" fill="#c9d1ea"><path d="M2 2h6v14H2zM10 16l5 9c3 0 4-2 3-5l-1-3h8c2 0 3-2 2-4l-3-9c-.5-1-1-2-3-2H10z"/></svg>',
CM='<svg viewBox="0 0 28 28" fill="#c9d1ea"><path d="M14 3C7 3 2 7 2 12c0 3 2 5 4 7l-2 6 7-3c1 .3 2 .3 3 .3 7 0 12-4 12-10S21 3 14 3z"/></svg>',
CK='<svg viewBox="0 0 26 26" fill="none" stroke="#2a6df4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12v1a9 9 0 1 1-5.5-8.3"/><path d="m8 12 5 5L23 6"/></svg>',
PR='<svg viewBox="0 0 40 40"><circle cx="20" cy="15" r="7" fill="#fff"/><path d="M6 36c1-9 9-11 14-11s13 2 14 11z" fill="#fff"/></svg>';
function render(){
 var h='<span class="ch">'+esc(S.ch)+'</span><h1>'+esc(S.t)+'</h1><div class="mt"><b>'+esc(S.w)+'</b> · '+esc(S.v)+' · '+esc(S.d)+'</div><div class="bx">'+esc(S.b)+'</div><div class="tg">'+esc(S.tg)+'</div><div class="hr"></div><div class="cn">'+esc(S.cn)+'</div>';
 h+='<div class="au"><div class="av"'+(S.av?' style="background-image:url('+S.av+')"':'')+'>'+(S.av?'':AV)+'</div><div class="an2"><b>'+esc(S.an)+'</b><span>'+esc(S.ad)+'</span></div></div><div class="at">'+esc(S.at)+'</div>';
 if(S.rp)h+='<div class="rp"><div class="rv">'+PR+'</div><div><b>'+esc(S.rn)+'</b><em>'+esc(S.rt)+'</em><div>'+esc(S.rb)+'</div></div></div>';
 h+='<div class="ac">'+UP+DN+CM+(S.sel?'<div class="sel">'+CK+'채택</div>':'')+'</div>';
 ks.innerHTML=h}
function fit(){var s=fr.clientWidth/W;ks.style.transform='scale('+s+')';kw.style.height=(H*s)+'px'}
if(window.ResizeObserver)new ResizeObserver(fit).observe(fr);addEventListener('resize',fit);
var F=[['iCh','ch'],['iT','t'],['iW','w'],['iV','v'],['iD','d'],['iB','b'],['iTg','tg'],['iCn','cn'],['iAn','an'],['iAd','ad'],['iAt','at'],['iRn','rn'],['iRt','rt'],['iRb','rb'],['iRp','rp',1],['iSel','sel',1]];
function sync(){F.forEach(function(f){var e=$(f[0]);if(f[2])e.checked=S[f[1]];else e.value=S[f[1]]});$('iAv').value='';render()}
F.forEach(function(f){$(f[0]).addEventListener('input',function(){S[f[1]]=f[2]?this.checked:this.value;render()})});
$('iAv').addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(e){S.av=e.target.result;render()};r.readAsDataURL(f)});
$('reset').onclick=function(){S=defs();sync()};
(function(){var ed=document.querySelector('.editor'),g=[].slice.call(ed.querySelectorAll('.ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
 g.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');if(!i)b.className='on';
  b.onclick=function(){g.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
 ed.parentNode.insertBefore(bar,ed)})();
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';setTimeout(fit,0)};
$('savePng').onclick=function(){var t=ks.style.transform;ks.style.transform='none';
 html2canvas(ks,{width:W,height:H,scale:1,backgroundColor:'#fff',useCORS:true}).then(function(c){ks.style.transform=t;var a=document.createElement('a');a.download='jisikin-new.png';a.href=c.toDataURL('image/png');a.click()}).catch(function(){ks.style.transform=t})};
sync();fit();
})();
