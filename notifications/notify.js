(function(){
var $=function(id){return document.getElementById(id)};
var icons={
 kakao:'<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#fee500"/><path d="M20 8C11 8 5 13 5 19c0 4 3 8 8 10l-1 5 7-4c9 0 16-5 16-11S28 8 20 8z" fill="#3a1d1d"/></svg>',
 message:'<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#19c45a"/><path d="M20 7C11 7 5 12 5 19c0 4 3 8 8 10l-1 5 8-5c9 0 15-4 15-10S29 7 20 7z" fill="#fff"/></svg>',
 discord:'<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#5865f2"/><path d="M10 13c7-4 13-4 20 0l3 15c-5 4-8 4-11 2l-2-3-2 3c-4 2-7 1-11-2z" fill="#fff"/><circle cx="16" cy="21" r="2" fill="#5865f2"/><circle cx="25" cy="21" r="2" fill="#5865f2"/></svg>'
};
var data=[
{id:'kakao',label:'카카오톡',app:'카카오톡',title:'띵화형',body:'전화 좀 받아 ㅜㅜ',time:'지금',icon:'kakao'},
{id:'message',label:'메시지',app:'메시지',title:'marspark',body:'토요일에 정모하는데 올래요?',time:'지금',icon:'message'},
{id:'discord',label:'디스코드',app:'디스코드',title:'호요호요 (#황잡이)',body:'유유님 같이 레이드 뛰실래여?ㅎㅎ',time:'지금',icon:'discord'}
];
var selected=0,color='#efefef',opacity=96;
function rgba(hex,a){var n=parseInt(hex.slice(1),16);return 'rgba('+(n>>16)+','+((n>>8)&255)+','+(n&255)+','+(a/100)+')'}
function render(){
 var n=data[selected],stage=$('stage');
 stage.innerHTML='<div class="banner" id="banner"><div class="ico">'+icons[n.icon]+'</div><div class="txt"><small class="app"></small><b></b><p></p></div><span class="time"></span></div>';
 $('banner').style.background=rgba(color,opacity);
 $('banner').querySelector('.app').textContent=n.app;$('banner').querySelector('b').textContent=n.title;$('banner').querySelector('p').textContent=n.body;$('banner').querySelector('.time').textContent=n.time;
 $('appName').value=n.app;$('title').value=n.title;$('bodyText').value=n.body;$('timeText').value=n.time;
 $('bgColor').value=color;$('opacity').value=opacity;$('opacityValue').textContent=opacity+'%';
 Array.prototype.forEach.call($('picker').children,function(b,i){b.classList.toggle('on',i===selected)});
}
data.forEach(function(n,i){var b=document.createElement('button');b.textContent=n.label;b.onclick=function(){selected=i;render()};$('picker').appendChild(b)});
[['appName','app'],['title','title'],['bodyText','body'],['timeText','time']].forEach(function(p){$(p[0]).addEventListener('input',function(){data[selected][p[1]]=this.value;renderKeepFocus(p[0])})});
function renderKeepFocus(id){var n=data[selected];var b=$('banner');if(!b)return;b.style.background=rgba(color,opacity);b.querySelector('.app').textContent=n.app;b.querySelector('b').textContent=n.title;b.querySelector('p').textContent=n.body;b.querySelector('.time').textContent=n.time}
$('bgColor').oninput=function(){color=this.value;renderKeepFocus()};
$('opacity').oninput=function(){opacity=+this.value;$('opacityValue').textContent=opacity+'%';renderKeepFocus()};
$('reset').onclick=function(){data[selected].app=data[selected].label;data[selected].title='알림 제목';data[selected].body='알림 내용을 입력하세요';data[selected].time='지금';color='#efefef';opacity=96;render()};
$('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){return html2canvas($('banner'),{scale:3,useCORS:true,backgroundColor:null,logging:false})}).then(function(c){c.toBlob(function(blob){var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='notification.png';document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')}).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
render();
})();