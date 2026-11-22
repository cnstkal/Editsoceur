(function(){
var $=function(i){return document.getElementById(i)};
var D={Name:'박성화',Sub:'정모씨를 구한 시민영웅',Chip:'',Txt:'처음에는 몸이 안움직일 정도로 무서웠는데 이겨냈죠. [[어떻게요?]]\n사랑의 힘으로…',
Tick:'야구선수 정윤호, 열애 의혹 불거져 ※ 아부라소바, 하루 권장 섭취량 \'사실상 1그릇 이하\' ※ OTC 기석,',
Bar:'#0b1f6b',Hi:'#ffc61a',Ac:'#e5243b',Y:26,S:56,T:true,AcOn:true,TS:30,TG:100};
var ids=['Name','Sub','Chip','Txt','Tick','Bar','Hi','Ac','S','T','AcOn','TS','TG'],st=$('stage'),canvas=$('view').firstElementChild;
function esc(s){return s.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
function load(){ids.forEach(function(k){var e=$('i'+k);if(e.type==='checkbox')e.checked=D[k];else e.value=D[k]});r()}
function r(){
var v={};ids.forEach(function(k){var e=$('i'+k);v[k]=e.type==='checkbox'?e.checked:e.value});
$('vName').textContent=v.Name;$('vSub').textContent=v.Sub;$('vChip').textContent=v.Chip;
$('vTxt').innerHTML=esc(v.Txt).replace(/\[\[([\s\S]*?)\]\]/g,'<em>$1</em>');
$('vTick').textContent=v.Tick;$('tick').style.display=v.T?'':'none';
st.style.setProperty('--bar',v.Bar);st.style.setProperty('--hi',v.Hi);st.style.setProperty('--ac',v.AcOn?v.Ac:'transparent');st.style.setProperty('--ts',v.TS+'px');st.style.setProperty('--tz',v.TG/100);$('pTg').textContent=v.TG+'%';$('pTs').textContent=v.TS+'px';st.style.setProperty('--fs',v.S+'px');
$('pS').textContent=v.S+'px';
}
function fit(){var w=$('view').clientWidth;if(!w)return;var s=w/1080,g=$('grp'),fh=w*9/16,fc=fh/s,gh=g.offsetHeight,y0=g.offsetTop-(fc-gh)/2;canvas.style.transformOrigin='0 0';canvas.style.transform='scale('+s+') translate(0px,'+(-y0)+'px)';$('view').style.height=fh+'px'}
ids.forEach(function(k){$('i'+k).addEventListener('input',r)});
$('reset').onclick=load;window.addEventListener('resize',fit);if(window.ResizeObserver)new ResizeObserver(fit).observe($('view'));
$('savePng').onclick=function(){
var old=canvas.style.transform;canvas.style.transform='none';
(document.fonts?document.fonts.ready:Promise.resolve()).then(function(){
return html2canvas(st,{backgroundColor:null,scale:1,width:1080,height:1920,useCORS:true})
}).then(function(cv){canvas.style.transform=old;var a=document.createElement('a');a.download='뉴스 표.png';a.href=cv.toDataURL('image/png');a.click()
}).catch(function(){canvas.style.transform=old});
};
load();fit();
})();