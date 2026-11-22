(function(){
var $=function(i){return document.getElementById(i)};
var DEF={name:'떵',age:'28',recent:true,look:'내가 찾는 관계',like:'내가 받은 LIKE',tabs:'FOR YOU,더블 데이트,별자리,두근두근',goal:'진지한 연애',pos:20,img:''};
var S=Object.assign({},DEF);
function render(){
$('vName').textContent=S.name;$('vAge').textContent=S.age;$('vRecent').style.display=S.recent?'':'none';
$('vLook').textContent=S.look;$('vLike').textContent=S.like;var T=S.tabs.split(',');for(var q=0;q<4;q++)$('vT'+q).textContent=(T[q]||'').trim();$('vGoal').textContent=S.goal;
var p=$('vPhoto');p.style.backgroundImage=S.img?'url('+S.img+')':'none';p.style.backgroundPosition='center '+S.pos+'%';
$('iRecent').checked=S.recent;
}
function fill(){[['iName','name'],['iAge','age'],['iLook','look'],['iLike','like'],['iTabs','tabs'],['iGoal','goal'],['iPos','pos']].forEach(function(p){$(p[0]).value=S[p[1]]});render()}
[['iName','name'],['iAge','age'],['iLook','look'],['iLike','like'],['iTabs','tabs'],['iGoal','goal'],['iPos','pos']].forEach(function(p){$(p[0]).addEventListener('input',function(){S[p[1]]=this.value;render()})});
$('iRecent').onchange=function(){S.recent=this.checked;render()};
$('iPhoto').onchange=function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){S.img=r.result;render()};r.readAsDataURL(f)};
function fit(){$('post').style.transform='scale('+$('fit').clientWidth/1118+')'}
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';fit()};
$('reset').onclick=function(){S=Object.assign({},DEF);fill()};
$('savePng').onclick=function(){var p=$('post'),o=p.style.transform;p.style.transform='none';
html2canvas(p,{scale:1,width:1118,height:1988,backgroundColor:null,useCORS:true}).then(function(c){p.style.transform=o;var a=document.createElement('a');a.download='tinder.png';a.href=c.toDataURL('image/png');a.click()})};
window.addEventListener('resize',fit);fill();fit();
})();
