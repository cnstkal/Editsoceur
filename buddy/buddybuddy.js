(function(){
var $=function(i){return document.getElementById(i)};
var D={nick:'버디바디',stat:'(접속)',note:'★ 버디버디 7.0 서비스 자',search:'친구 검색하기',top:'♡ LOVE ♡ 히히 ♡~★≋♡',bot:'바보 ♡≋★ 반짝 ♪♪♡',color:'#3fd9cf'};
var map=[['iNick','vNick','nick'],['iStat','vStat','stat'],['iNote','vNote','note'],['iSearch','vSearch','search'],['iTop','vTop','top'],['iBot','vBot','bot']];
function fill(){map.forEach(function(m){$(m[0]).value=D[m[2]];$(m[1]).textContent=D[m[2]]});$('iColor').value=D.color;$('bb').style.setProperty('--c',D.color);$('iGlit').checked=true;$('gl').classList.remove('off')}
map.forEach(function(m){$(m[0]).addEventListener('input',function(){$(m[1]).textContent=this.value})});
$('iColor').addEventListener('input',function(){$('bb').style.setProperty('--c',this.value)});
$('iGlit').addEventListener('change',function(){$('gl').classList.toggle('off',!this.checked)});
function noPhoto(){var p=$('pi');p.classList.remove('has');p.style.backgroundImage='';$('iPhoto').value=''}
$('iPhoto').addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(e){var p=$('pi');p.style.backgroundImage='url('+e.target.result+')';p.classList.add('has')};r.readAsDataURL(f)});
$('clearPhoto').onclick=noPhoto;
$('reset').onclick=function(){noPhoto();fill()};
$('savePng').onclick=function(){if(!window.html2canvas)return;html2canvas($('bb'),{scale:3,useCORS:true,backgroundColor:null}).then(function(c){var a=document.createElement('a');a.download='buddybuddy.png';a.href=c.toDataURL('image/png');a.click()})};
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드'};
/* 탭 */
var ed=document.querySelector('.editor'),groups=[].slice.call(ed.querySelectorAll(':scope > .ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
groups.forEach(function(g,i){var b=document.createElement('button');b.type='button';b.textContent=g.getAttribute('data-t');if(!i)b.className='on';b.onclick=function(){groups.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
ed.parentNode.insertBefore(bar,ed);
fill();
})();
