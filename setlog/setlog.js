(function(){
var $=function(i){return document.getElementById(i)},W=393,H=852,cv=$('cv'),fr=$('fit');
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function defs(){return{time:'1:20',sTime:true,bat:41,sBat:true,sIsl:true,pill:'🩶💕',sm:true,c:[{n:'성화',t:'13:00',x:'시간이 남아서',p:'',a:''},{n:'윤호',t:'13:00',x:'붓기 빼는 중',p:'',a:''}]}}
var S=defs();
var CH='<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">';
var WF='<svg class="sl-wf" viewBox="0 0 19 14"><path d="M9.500 2.600c2.600 0 5 1 6.800 2.700l1.300-1.400A12.300 12.300 0 0 0 9.500.7C6.200.7 3.200 2 1.400 3.900l1.300 1.400A9.900 9.900 0 0 1 9.500 2.600zm0 3.900c1.600 0 3 .6 4.100 1.600l1.300-1.400A8.100 8.100 0 0 0 9.500 4.600c-2.200 0-4.200.9-5.400 2.100l1.300 1.400c1.100-1 2.500-1.600 4.100-1.600zm0 3.800c-.9 0-1.700.4-2.300 1l2.300 2.600 2.300-2.600c-.6-.6-1.400-1-2.300-1z" fill="#000"/></svg>';
function render(){
 var h='';
 h+='<div class="sl-c" style="left:23px">'+CH+'<path d="m14.500 5-7 7 7 7"/></svg></div>';
 h+='<div class="sl-pill"><span>'+esc(S.pill)+'</span>'+CH.replace('<svg','<svg style="width:15px;height:15px"')+'<path d="m6 9 6 6 6-6"/></svg></div>';
 if(S.sm)h+='<svg class="sl-sm" viewBox="0 0 22 22"><circle cx="11" cy="11" r="10" fill="#c95cf0"/><circle cx="11" cy="11" r="7.600" fill="#f08fe6"/><circle cx="8.300" cy="9.200" r="1.100" fill="#2a1030"/><circle cx="13.700" cy="9.200" r="1.100" fill="#2a1030"/><path d="M7.600 12.500c1.800 2.200 5 2.200 6.800 0" fill="none" stroke="#2a1030" stroke-width="1.200" stroke-linecap="round"/></svg>';
 h+='<div class="sl-c" style="left:279px">'+CH+'<path d="M12 3v12M7.500 7.500 12 3l4.500 4.500M6 11H5v10h14V11h-1"/></svg></div>';
 h+='<div class="sl-c" style="left:329px">'+CH+'<path d="M12 4C7 4 3.500 7.200 3.500 11.200c0 2.100 1 4 2.600 5.300L5.300 20l3.800-1.700c.9.200 1.900.4 2.900.4 5 0 8.500-3.200 8.500-7.500S17 4 12 4z"/></svg></div>';
 S.c.forEach(function(c,i){
  h+='<div class="sl-card" style="top:'+(184+i*250)+'px'+(c.p?';background-image:url('+c.p+')':'')+'"><div class="sl-sh"></div><div class="sl-av"'+(c.a?' style="background-image:url('+c.a+')"':'')+'></div><div class="sl-nm">'+esc(c.n)+'</div><div class="sl-tm">'+esc(c.t)+'</div><div class="sl-tx">'+esc(c.x)+'</div><div class="sl-dt"><i></i><i></i><i></i></div></div>'});
 cv.innerHTML=h}
function fit(){cv.style.transform='scale('+fr.clientWidth/W+')'}
if(window.ResizeObserver)new ResizeObserver(fit).observe(fr);addEventListener('resize',fit);
function cards(){$('cards').innerHTML=S.c.map(function(c,i){return'<div class="ans"><h3>카드 '+(i+1)+'</h3><label>이름<input data-i="'+i+'" data-k="n" value="'+esc(c.n)+'"></label><label>시간<input data-i="'+i+'" data-k="t" value="'+esc(c.t)+'"></label><label>문구<input data-i="'+i+'" data-k="x" value="'+esc(c.x)+'"></label><label>배경 사진<input type="file" accept="image/*" data-i="'+i+'" data-k="p"></label><label>프로필 사진<input type="file" accept="image/*" data-i="'+i+'" data-k="a"></label><button class="ps-ghost" data-del="'+i+'" type="button">삭제</button></div>'}).join('');$('add').disabled=S.c.length>=2;$('add').textContent=S.c.length>=2?'카드는 최대 2개':'+ 카드 추가'}
$('cards').addEventListener('input',function(e){var el=e.target,i=el.dataset.i;if(i==null||el.type==='file')return;S.c[i][el.dataset.k]=el.value;render()});
$('cards').addEventListener('change',function(e){var el=e.target,i=el.dataset.i,f=el.files&&el.files[0];if(i==null||!f)return;var r=new FileReader();r.onload=function(ev){S.c[i][el.dataset.k]=ev.target.result;render()};r.readAsDataURL(f)});
$('cards').addEventListener('click',function(e){var d=e.target.dataset.del;if(d==null)return;S.c.splice(d,1);cards();render()});
$('add').onclick=function(){if(S.c.length>=2)return;S.c.push({n:'이름',t:'13:00',x:'문구',p:'',a:''});cards();render()};
var B=[['tSm','sm']],T=[];
B.forEach(function(p){$(p[0]).addEventListener('input',function(){S[p[1]]=this.checked;render()})});
T.forEach(function(p){$(p[0]).addEventListener('input',function(){S[p[1]]=this.value;render()})});
function sync(){B.forEach(function(p){$(p[0]).checked=S[p[1]]});T.forEach(function(p){$(p[0]).value=S[p[1]]});cards();render()}
$('reset').onclick=function(){S=defs();sync()};
(function(){var ed=document.querySelector('.editor'),g=[].slice.call(ed.querySelectorAll('.ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
 g.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');if(!i)b.className='on';
  b.onclick=function(){g.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
 ed.parentNode.insertBefore(bar,ed)})();
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';setTimeout(fit,0)};
$('savePng').onclick=function(){var t=cv.style.transform;cv.style.transform='none';
 html2canvas(cv,{width:W,height:H,scale:3,backgroundColor:'#ffffff',useCORS:true}).then(function(c){cv.style.transform=t;var a=document.createElement('a');a.download='setlog.png';a.href=c.toDataURL('image/png');a.click()}).catch(function(){cv.style.transform=t})};
sync();fit();
})();
