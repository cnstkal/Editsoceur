(function(){
var $=function(i){return document.getElementById(i)};
var D={clock:'12:09',bat:35,name:'GEE',date:'11. 15. 12:58',text:'오늘 SHOCK 막방 사녹도 와준 트메들 넘 고마워 어제는 비오고 흐렸는데 오늘은 맑아서 다행이다!!!!\n조심히 돌아가구 마지막까지 큰 기세를 줘서 고마워🎶🎶🎶',cmt:'630',like:'6.4K',pg:25,color:'#96332f'};
var av='',bg='';
function hx(h,k){var n=parseInt(h.slice(1),16);return'rgb('+Math.round((n>>16)*k)+','+Math.round((n>>8&255)*k)+','+Math.round((n&255)*k)+')'}
function render(){
 if($('vClock'))$('vClock').textContent=$('iClock').value;if($('vBat'))$('vBat').textContent=$('iBat').value;$('vName').textContent=$('iName').value;$('vDate').textContent=$('iDate').value;$('vText').textContent=$('iText').value;$('vCmt').textContent=$('iCmt').value;$('vLike').textContent=$('iLike').value;
 var c=$('iColor').value,cd=$('cd');cd.style.setProperty('--b',c);cd.style.setProperty('--a',hx(c,.72));cd.style.setProperty('--c',hx(c,.42));
 var p=Math.max(0,Math.min(100,parseFloat($('iPg').value)||0))+'%';$('vFill').style.width=p;$('vKnob').style.left=p;
 $('vDia').classList.toggle('off',!$('iDia').checked);
 var a=$('vAv');a.style.backgroundImage=av?'url('+av+')':'';var im=$('im');im.style.backgroundImage=bg?'url('+bg+')':'';im.classList.toggle('has',!!bg);
}
function fill(){$('iClock').value=D.clock;$('iBat').value=D.bat;$('iName').value=D.name;$('iDate').value=D.date;$('iText').value=D.text;$('iCmt').value=D.cmt;$('iLike').value=D.like;$('iPg').value=D.pg;$('iColor').value=D.color;$('iDia').checked=true;render()}
['iClock','iBat','iName','iDate','iText','iCmt','iLike','iPg','iColor'].forEach(function(i){$(i).addEventListener('input',render)});
$('iDia').addEventListener('change',render);
function rd(f,cb){var r=new FileReader();r.onload=function(e){cb(e.target.result);render()};r.readAsDataURL(f)}
$('iAvatar').addEventListener('change',function(){if(this.files[0])rd(this.files[0],function(v){av=v})});
$('iBg').addEventListener('change',function(){if(this.files[0])rd(this.files[0],function(v){bg=v})});
$('clearImg').onclick=function(){av='';bg='';$('iAvatar').value='';$('iBg').value='';render()};
$('reset').onclick=function(){av='';bg='';fill()};
$('savePng').onclick=function(){if(!window.html2canvas)return;html2canvas($('ws'),{scale:3,useCORS:true,backgroundColor:'#000'}).then(function(c){var a=document.createElement('a');a.download='weversestory.png';a.href=c.toDataURL('image/png');a.click()})};
$('pvBtn').onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드'};
var ed=document.querySelector('.editor'),groups=[].slice.call(ed.querySelectorAll(':scope > .ps-pn')),bar=document.createElement('div');bar.className='ps-seg';
groups.forEach(function(g,i){var b=document.createElement('button');b.type='button';b.textContent=g.getAttribute('data-t');if(!i)b.className='on';b.onclick=function(){groups.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};bar.appendChild(b)});
ed.parentNode.insertBefore(bar,ed);
fill();
})();
