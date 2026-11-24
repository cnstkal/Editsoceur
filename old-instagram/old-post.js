(function(){
var $=function(i){return document.getElementById(i)};
var D={Back:'Explore',User:'user2093492',Time:'92w',Like:'1,445 likes',Cm:'mina_92: 사진 너무 예쁘다\nhaneul: 나도 가고 싶어'};
var map={Back:'vBack',User:'vUser',Time:'vTime',Like:'vLike'},av=null,pic=null;
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
function draw(){
 for(var k in map)$(map[k]).textContent=$('i'+k).value;
 $('vCm').innerHTML=$('iCm').value.split('\n').filter(Boolean).map(function(l){var i=l.indexOf(':');return i<0?esc(l):'<b>'+esc(l.slice(0,i))+'</b>'+esc(l.slice(i+1))}).join('<br>');
 $('vAv').style.backgroundImage=av?'url('+av+')':'';$('vAv').classList.toggle('e',!av);
 $('vPic').style.backgroundImage=pic?'url('+pic+')':'';
}
function load(){for(var k in D)$('i'+k).value=D[k];av=pic=null;$('iAv').value=$('iPic').value='';draw()}
['Back','User','Time','Like','Cm'].forEach(function(k){$('i'+k).addEventListener('input',draw)});
function rd(id,cb){$(id).onchange=function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result);draw()};r.readAsDataURL(f)}}
rd('iAv',function(v){av=v});rd('iPic',function(v){pic=v});
$('clr').onclick=function(){av=pic=null;$('iAv').value=$('iPic').value='';draw()};
$('reset').onclick=load;
var fitEl=$('fit'),stage=$('stage');
function fit(){var w=stage.clientWidth,h=stage.clientHeight;if(!w||!h){fitEl.style.zoom=1;return}var z=Math.min((h-48)/640,(w-48)/360,1);fitEl.style.zoom=Math.max(z,.2)}
if(window.ResizeObserver)new ResizeObserver(fit).observe(stage);addEventListener('resize',fit);
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';fit()};
$('savePng').onclick=function(){var z=fitEl.style.zoom;fitEl.style.zoom=1;html2canvas($('shot'),{scale:4,useCORS:true,backgroundColor:'#fff'}).then(function(c){fitEl.style.zoom=z;var a=document.createElement('a');a.download='old-instagram-post.png';a.href=c.toDataURL('image/png');a.click()}).catch(function(){fitEl.style.zoom=z})};
var ed=document.querySelector('.editor'),g=[].slice.call(ed.querySelectorAll(':scope > .ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
g.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');if(!i)b.className='on';b.onclick=function(){g.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
ed.parentNode.insertBefore(bar,ed);
load();fit();
})();
