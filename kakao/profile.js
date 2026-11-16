(function(){
  var $=function(i){return document.getElementById(i)},STORE='kakao_profile_v2';
  var DEF={name:'사노민지로',bg:'#79828d',bgImg:'',pa:'',dOn:false,dDate:'',dName:'',ddX:68,ddY:19,ddScale:1,g:[]};
  function dday(){var t=Date.parse(S.dDate+'T00:00:00Z');if(isNaN(t))return '';var k=new Date(Date.now()+9*3600e3);var today=Date.UTC(k.getUTCFullYear(),k.getUTCMonth(),k.getUTCDate());var n=Math.round((today-t)/864e5);return n>0?'D+'+n:n<0?'D-'+(-n):'D-DAY'}
  var S;
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function render(){
    var f=$('kp');f.style.background=S.bgImg?'url('+S.bgImg+') center/cover':S.bg;
    $('kPn').textContent=S.name;
    $('kPa').outerHTML='<i class="av c3 kpa" id="kPa"'+(S.pa?' style="background-image:url('+S.pa+')"':'')+'></i>';
    var dt=S.dOn?dday():'';var dd=$('kDd');dd.innerHTML=dt?'<div><b>'+dt+'</b>'+esc(S.dName)+'</div>':'';dd.style.left=(S.ddX==null?68:S.ddX)+'%';dd.style.top=(S.ddY==null?19:S.ddY)+'%';dd.style.transform='scale('+(S.ddScale||1)+')';dd.style.transformOrigin='top right';
    var h='';for(var i=0;i<Math.max(6,S.g.length);i++)h+='<i'+(S.g[i]?' style="background-image:url('+S.g[i]+')"':'')+'></i>';
    $('kGrid').innerHTML=h}
  function list(){
    $('elG').innerHTML=S.g.map(function(x,i){return '<button type="button" class="ghost" data-i="'+i+'" style="margin-bottom:8px">'+(i+1)+'번 사진 삭제</button>'}).join('')}
  function load(reset){
    if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}
    else{try{var v=localStorage.getItem(STORE);S=v?JSON.parse(v):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.g))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}
    $('iName').value=S.name;$('iBg').value=S.bg;$('iDOn').checked=!!S.dOn;$('iDDate').value=S.dDate||'';$('iDName').value=S.dName||'';$('iDScale').value=Math.round((S.ddScale||1)*100);list();render()}
  function rd(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
  $('iName').addEventListener('input',function(){S.name=this.value;persist();render()});
  $('iBg').addEventListener('input',function(){S.bg=this.value;S.bgImg='';persist();render()});
  $('iBgImg').addEventListener('change',function(){if(this.files[0])rd(this.files[0],function(d){S.bgImg=d;persist();render()})});
  $('iPa').addEventListener('change',function(){if(this.files[0])rd(this.files[0],function(d){S.pa=d;persist();render()})});
  $('iG').addEventListener('change',function(){var fs=[].slice.call(this.files),n=0;fs.forEach(function(f){rd(f,function(d){S.g.push(d);if(++n===fs.length){persist();list();render()}})})});
  $('elG').addEventListener('click',function(e){var i=e.target.dataset.i;if(i==null)return;S.g.splice(+i,1);persist();list();render()});
  $('iDOn').addEventListener('change',function(){S.dOn=this.checked;persist();render()});
  $('iDDate').addEventListener('input',function(){S.dDate=this.value;persist();render()});
  $('iDName').addEventListener('input',function(){S.dName=this.value;persist();render()});\n  $('iDScale').addEventListener('input',function(){S.ddScale=+this.value/100;persist();render()});\n  var pointers={};function pointDist(){var a=Object.keys(pointers).map(function(k){return pointers[k]});return a.length>1?Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y):0}\n  var drag=null;var dd=$('kDd');dd.addEventListener('pointerdown',function(e){if(!S.dOn)return;dd.setPointerCapture(e.pointerId);pointers[e.pointerId]={x:e.clientX,y:e.clientY};if(Object.keys(pointers).length===1)drag={x:e.clientX,y:e.clientY,left:S.ddX,top:S.ddY};else drag={dist:pointDist(),scale:S.ddScale||1};e.preventDefault()});dd.addEventListener('pointermove',function(e){if(!pointers[e.pointerId])return;pointers[e.pointerId]={x:e.clientX,y:e.clientY};if(Object.keys(pointers).length>=2){if(!drag||!drag.dist)drag={dist:pointDist(),scale:S.ddScale||1};else S.ddScale=Math.max(.5,Math.min(2,drag.scale*pointDist()/drag.dist));$('iDScale').value=Math.round(S.ddScale*100)}else if(drag){var rect=$('kp').getBoundingClientRect();S.ddX=Math.max(0,Math.min(95,drag.left+(e.clientX-drag.x)/rect.width*100));S.ddY=Math.max(0,Math.min(95,drag.top+(e.clientY-drag.y)/rect.height*100))}persist();render()});function end(e){delete pointers[e.pointerId];drag=null}dd.addEventListener('pointerup',end);dd.addEventListener('pointercancel',end);
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return html2canvas($('kp'),{scale:4,useCORS:true,backgroundColor:null,logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='kakao-profile.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
  load(false);
})();
