(function(){
var $=function(i){return document.getElementById(i)};
var DEF={name:'떵',age:'28',recent:true,look:'내가 찾는 관계',emoji:'💘',goal:'진지한 연애',pos:20,img:''};
var S=Object.assign({},DEF);
function render(){
$('vName').textContent=S.name;$('vAge').textContent=S.age;$('vRecent').style.display=S.recent?'':'none';
$('vLook').textContent=S.look;$('vEmoji').textContent=S.emoji;$('vGoal').textContent=S.goal;
var p=$('vPhoto');p.style.backgroundImage=S.img?'url('+S.img+')':'none';p.style.backgroundPosition='center '+S.pos+'%';
$('iRecent').checked=S.recent;
}
function fill(){[['iName','name'],['iAge','age'],['iLook','look'],['iEmoji','emoji'],['iGoal','goal'],['iPos','pos']].forEach(function(p){$(p[0]).value=S[p[1]]});render()}
[['iName','name'],['iAge','age'],['iLook','look'],['iEmoji','emoji'],['iGoal','goal'],['iPos','pos']].forEach(function(p){$(p[0]).addEventListener('input',function(){S[p[1]]=this.value;render()})});
$('iRecent').onchange=function(){S.recent=this.checked;render()};
$('iPhoto').onchange=function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){S.img=r.result;render()};r.readAsDataURL(f)};
function fit(){$('post').style.transform='scale('+$('fit').clientWidth/1118+')'}
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';fit()};
$('reset').onclick=function(){S=Object.assign({},DEF);fill()};
$('savePng').onclick=function(){var p=$('post'),o=p.style.transform;p.style.transform='none';
html2canvas(p,{scale:1,width:1118,height:1726,backgroundColor:'#0f1014',useCORS:true}).then(function(c){p.style.transform=o;var a=document.createElement('a');a.download='tinder.png';a.href=c.toDataURL('image/png');a.click()})};
window.addEventListener('resize',fit);fill();fit();
})();
