(function(){
var $=function(id){return document.getElementById(id)};
var icons={
 kakao:'<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#fee500"/><path d="M20 8C11 8 5 13 5 19c0 4 3 8 8 10l-1 5 7-4c9 0 16-5 16-11S28 8 20 8z" fill="#3a1d1d"/></svg>',
 message:'<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#19c45a"/><path d="M20 7C11 7 5 12 5 19c0 4 3 8 8 10l-1 5 8-5c9 0 15-4 15-10S29 7 20 7z" fill="#fff"/></svg>',
 instagram:'<svg viewBox="0 0 40 40"><defs><linearGradient id="ig" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#f9ce34"/><stop offset=".5" stop-color="#ee2a7b"/><stop offset="1" stop-color="#6228d7"/></linearGradient></defs><rect width="40" height="40" rx="9" fill="url(#ig)"/><rect x="11" y="11" width="18" height="18" rx="5" fill="none" stroke="#fff" stroke-width="2.4"/><circle cx="20" cy="20" r="4" fill="none" stroke="#fff" stroke-width="2.4"/></svg>',
 discord:'<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#5865f2"/><path d="M10 13c7-4 13-4 20 0l3 15c-5 4-8 4-11 2l-2-3-2 3c-4 2-7 1-11-2z" fill="#fff"/><circle cx="16" cy="21" r="2" fill="#5865f2"/><circle cx="25" cy="21" r="2" fill="#5865f2"/></svg>'
};
var data=[
{id:'imessage',label:'아이메시지',app:'메시지',title:'엄마',body:'저녁 뭐 먹을래?',time:'지금',icon:'imessage',img:'images/imessage/ios-message.svg'},
{id:'kakao',label:'카카오톡',app:'카카오톡',title:'띵화형',body:'전화 좀 받아 ㅜㅜ',time:'지금',icon:'kakao',img:'images/kakao/KakaoTalk_logo.svg'},
{id:'instagram',label:'인스타그램',app:'인스타그램',title:'marspark',body:'좋아요를 눌렀습니다',time:'지금',icon:'instagram',img:'images/instagram/Instagram_logo_2016.svg'},
{id:'twitter',label:'트위터',app:'X',title:'marspark',body:'새 댓글이 달렸어요',time:'지금',icon:'twitter',img:'images/twitter/sl_z_072523_61700_01.jpg'},
{id:'discord',label:'디스코드',app:'디스코드',title:'호요호요 (#황잡이)',body:'유유님 같이 레이드 뛰실래여?ㅎㅎ',time:'지금',icon:'discord',img:'images/discord/discordapp_tile_logo_icon_171263.svg'},
{id:'call',label:'전화',app:'전화',title:'엄마',body:'부재중 전화가 있습니다',time:'지금',icon:'call',img:'images/call/phone.svg'},
{id:'youtube',label:'유튜브',app:'YouTube',title:'침착맨',body:'새 동영상이 업로드되었습니다',time:'지금',icon:'youtube',img:'images/youtube/IMG_0674.png'},
{id:'chatgpt',label:'챗GPT',app:'ChatGPT',title:'ChatGPT',body:'답변이 준비되었습니다',time:'지금',icon:'chatgpt',img:'images/chatgpt/ChatGPT_logo.svg'},
{id:'naver',label:'네이버',app:'네이버',title:'네이버 알림',body:'관심 있는 뉴스가 도착했어요',time:'지금',icon:'naver',img:'images/naver/IMG_0673.png'},
{id:'daangn',label:'당근',app:'당근',title:'동네 이웃',body:'관심 목록의 물건이 가격 인하되었어요',time:'지금',icon:'daangn',img:'images/daangn/IMG_0671.png'},
{id:'everytime',label:'에브리타임',app:'에브리타임',title:'새 댓글',body:'내 글에 새 댓글이 달렸어요',time:'지금',icon:'everytime',img:'images/everytime/IMG_0672.png'}
];
data.forEach(function(n){n.noSmall=false;n.style='normal';n.appImg='';n.avatar=''});
var selected=0,color='#efefef',opacity=96;
function rgba(hex,a){var n=parseInt(hex.slice(1),16);return 'rgba('+(n>>16)+','+((n>>8)&255)+','+(n&255)+','+(a/100)+')'}
function appIcon(n){var u=n.appImg||n.img;return u?'<img src="'+u+'" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:22%;display:block">':icons[n.icon]}
function icoHtml(n){
 if(n.style==='small')return '<div class="ico big"><div class="av">'+(n.avatar?'<img src="'+n.avatar+'" alt="">':'')+'</div><div class="badge">'+appIcon(n)+'</div></div>';
 return '<div class="ico">'+appIcon(n)+'</div>'}
function fit(){var st=$('stage');if(st)st.style.setProperty('--u',st.clientWidth/1412)}
function render(){
 var n=data[selected],stage=$('stage');
 stage.innerHTML='<div class="banner" id="banner">'+icoHtml(n)+'<div class="txt"><b></b><p></p></div><span class="time"></span></div>';
 $('banner').style.background=rgba(color,opacity);
 $('banner').querySelector('b').textContent=n.title;$('banner').querySelector('p').textContent=n.body;$('banner').querySelector('.time').textContent=n.time;
 $('iconStyle').value=n.style;$('iconStyle').parentNode.style.display=n.noSmall?'none':'block';$('avatarRow').style.display=n.style==='small'?'block':'none';$('appName').value=n.app;$('title').value=n.title;$('bodyText').value=n.body;$('timeText').value=n.time;
 $('bgColor').value=color;$('opacity').value=opacity;$('opacityValue').textContent=opacity+'%';
 Array.prototype.forEach.call($('picker').children,function(b,i){b.classList.toggle('on',i===selected)});
 fit();
}
if(window.ResizeObserver)new ResizeObserver(fit).observe($('stage'));window.addEventListener('resize',fit);
data.forEach(function(n,i){var b=document.createElement('button');b.textContent=n.label;b.onclick=function(){selected=i;render()};$('picker').appendChild(b)});
[['appName','app'],['title','title'],['bodyText','body'],['timeText','time']].forEach(function(p){$(p[0]).addEventListener('input',function(){data[selected][p[1]]=this.value;renderKeepFocus(p[0])})});
function renderKeepFocus(id){var n=data[selected];var b=$('banner');if(!b)return;b.style.background=rgba(color,opacity);b.querySelector('b').textContent=n.title;b.querySelector('p').textContent=n.body;b.querySelector('.time').textContent=n.time}
$('iconStyle').onchange=function(){data[selected].style=this.value;render()};
function readFile(id,key){$(id).addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){data[selected][key]=r.result;render()};r.readAsDataURL(f);this.value=''})}
readFile('appImgFile','appImg');readFile('avatarFile','avatar');
$('appImgClear').onclick=function(){data[selected].appImg='';render()};
$('bgColor').oninput=function(){color=this.value;renderKeepFocus()};
$('opacity').oninput=function(){opacity=+this.value;$('opacityValue').textContent=opacity+'%';renderKeepFocus()};
$('reset').onclick=function(){data[selected].app=data[selected].label;data[selected].title='알림 제목';data[selected].body='알림 내용을 입력하세요';data[selected].time='지금';data[selected].style='normal';data[selected].appImg='';data[selected].avatar='';color='#efefef';opacity=96;render()};
$('savePng').onclick=async function(){var b=this,t=b.textContent,el=$('banner');b.disabled=true;b.textContent='고화질 저장 중...';try{
 if(document.fonts&&document.fonts.ready)await document.fonts.ready;
 var waits=[];Array.prototype.forEach.call(el.querySelectorAll('img'),function(im){if(im.decode)waits.push(im.decode().catch(function(){}));else if(!im.complete)waits.push(new Promise(function(ok){im.onload=im.onerror=ok}))});
 await Promise.all(waits);await new Promise(function(ok){requestAnimationFrame(function(){requestAnimationFrame(ok)})});
 var c=await html2canvas(el,{scale:4*1412/el.offsetWidth,useCORS:true,allowTaint:false,backgroundColor:null,logging:false,imageTimeout:20000});
 var blob=await new Promise(function(ok){c.toBlob(ok,'image/png')});if(!blob)throw new Error('PNG encode failed');
 var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='notification.png';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},1000);
 }catch(err){console.error(err);alert('PNG 저장에 실패했습니다.');}finally{b.disabled=false;b.textContent=t}};
render();
})();