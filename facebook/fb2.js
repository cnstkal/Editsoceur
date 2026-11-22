(function(){
var $=function(i){return document.getElementById(i)};
var DEF={Title:'김지안님의 게시물',Name:'김지안',Fol:'팔로우',Time:'3일',Music:'오늘의 노래 · 잔잔한 하루',Text:'오늘 하루도 고생 많았어요.\n따뜻한 차 한 잔 마시고 푹 쉬어요.\n\n내일은 더 좋은 일이 있을 거예요.\n다들 파이팅!!',Like:'5.7천명',L2:'5.7천개',Cmt:'190',Shr:'177',Ph:'댓글을 입력하세요...',phOn:true,cmOn:false,off:0,
cms:[{n:'이도윤',bd:'우수 팬',t:'항상 좋은 글 감사합니다\n오늘도 힘내세요',tm:'3일',lk:'46',rp:false},{n:'한서윤',bd:'',t:'응원합니다 ^^',tm:'3일',lk:'12',rp:true}]};
var S,av=null,ph=null,cav={};
var map={Title:'vTitle',Name:'vName',Fol:'vFol',Time:'vTime',Music:'vMusic',Text:'vText',Like:'vLike',L2:'vL2',Cmt:'vCmt',Shr:'vShr',Ph:'vPh'};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var thumb='<svg viewBox="0 0 24 24"><path d="M2 10h4v11H2zM8 10l4-8c2 0 3 1 3 3l-1 4h6c1.5 0 2.5 1.3 2 2.7l-2 7c-.3 1-1.2 1.8-2.3 1.8H8z"/></svg>';
var gem='<svg viewBox="0 0 24 24"><path d="M12 20 3 9l3-5h12l3 5zM3 9h18M9 9l3 11 3-11"/></svg>';
function draw(){
 for(var k in map)$(map[k]).textContent=S[k];
 $('vAv').style.backgroundImage=av?'url('+av+')':'';
 $('vPhoto').hidden=!S.phOn;$('vPhoto').style.backgroundImage=ph?'url('+ph+')':'';
 $('cms').hidden=!S.cmOn;$('in').style.transform='translateY(-'+S.off+'px)';
 $('cmv').innerHTML=S.cms.map(function(c,i){return '<div class="cm'+(c.rp?' rp':'')+'"><div class="av"'+(cav[i]?' style="background-image:url('+cav[i]+')"':'')+'></div><div><div class="bb">'+(c.bd?'<div class="bd">'+gem+esc(c.bd)+'</div>':'')+'<div class="cn">'+esc(c.n)+'</div><div class="ct">'+esc(c.t)+'</div></div><div class="mt"><span>'+esc(c.tm)+'</span><span>좋아요</span><span>답글 달기</span>'+(c.lk?'<span class="n">'+esc(c.lk)+'<span class="lb">'+thumb+'</span></span>':'')+'</div></div></div>'}).join('')}
function list(){
 $('cmList').innerHTML=S.cms.map(function(c,i){return '<div class="cmi" data-i="'+i+'"><div class="row"><label>이름<input data-f="n" value="'+esc(c.n)+'"></label><label>배지(선택)<input data-f="bd" value="'+esc(c.bd)+'"></label></div><label>내용<textarea data-f="t" rows="3">'+esc(c.t)+'</textarea></label><div class="row"><label>시간<input data-f="tm" value="'+esc(c.tm)+'"></label><label>좋아요 수<input data-f="lk" value="'+esc(c.lk)+'"></label></div><label class="ps-addp">+ 프로필 사진<input class="ps-sr" data-f="av" type="file" accept="image/*"></label><div class="cmt"><label><input data-f="rp" type="checkbox"'+(c.rp?' checked':'')+'> 대댓글</label><button type="button" data-f="del">삭제</button></div></div>'}).join('')}
$('cmList').addEventListener('input',function(e){var t=e.target,r=t.closest('.cmi'),f=t.getAttribute('data-f');if(!r||!f||f==='av'||f==='del')return;S.cms[r.dataset.i][f]=t.type==='checkbox'?t.checked:t.value;draw()});
$('cmList').addEventListener('change',function(e){var t=e.target,r=t.closest('.cmi');if(!r||t.getAttribute('data-f')!=='av'||!t.files[0])return;var i=r.dataset.i,fr=new FileReader();fr.onload=function(){cav[i]=fr.result;draw()};fr.readAsDataURL(t.files[0])});
$('cmList').addEventListener('click',function(e){var t=e.target;if(t.getAttribute('data-f')!=='del')return;var i=+t.closest('.cmi').dataset.i;S.cms.splice(i,1);var n={};for(var k in cav){k=+k;if(k<i)n[k]=cav[k];else if(k>i)n[k-1]=cav[k]}cav=n;list();draw()});
$('addCm').onclick=function(){S.cms.push({n:'새 댓글',bd:'',t:'댓글 내용',tm:'방금',lk:'',rp:false});list();draw()};
function load(){S=JSON.parse(JSON.stringify(DEF));av=ph=null;cav={};
 for(var k in map)$('i'+k).value=S[k];$('iPhOn').checked=S.phOn;$('iCmOn').checked=S.cmOn;$('iOff').value=S.off;
 ['iAv','iPhoto'].forEach(function(i){$(i).value=''});list();draw()}
Object.keys(map).forEach(function(k){$('i'+k).addEventListener('input',function(){S[k]=this.value;draw()})});
$('iPhOn').onchange=function(){S.phOn=this.checked;draw()};$('iCmOn').onchange=function(){S.cmOn=this.checked;draw()};
$('iOff').oninput=function(){S.off=+this.value;draw()};
function rd(id,cb){$(id).onchange=function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result);draw()};r.readAsDataURL(f)}}
rd('iAv',function(v){av=v});rd('iPhoto',function(v){ph=v;S.phOn=true;$('iPhOn').checked=true});
$('reset').onclick=load;
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';fit()};
var shot=$('shot'),fr=shot.parentNode;
function fit(){var w=fr.clientWidth;shot.style.zoom=w?w/393:1}
if(window.ResizeObserver)new ResizeObserver(fit).observe(fr);window.addEventListener('resize',fit);
$('savePng').onclick=function(){var z=shot.style.zoom;shot.style.zoom=1;html2canvas(shot,{scale:3,useCORS:true,backgroundColor:'#fff'}).then(function(c){shot.style.zoom=z;var a=document.createElement('a');a.download='facebook-new.png';a.href=c.toDataURL('image/png');a.click()}).catch(function(){shot.style.zoom=z})};
var ed=document.querySelector('.editor'),g=[].slice.call(ed.querySelectorAll(':scope > .ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
g.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');if(!i)b.className='on';b.onclick=function(){g.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
ed.parentNode.insertBefore(bar,ed);
load();fit();
})();
