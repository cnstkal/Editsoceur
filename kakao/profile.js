(function(){
  var $=function(i){return document.getElementById(i)},STORE='kakao_profile_v1';
  var DEF={name:'사노민지로',bg:'#79828d',bgImg:'',pa:'',dd:[{d:'1503',l:'ㅅㅎ'},{d:'322',l:'ㄷㅈㅈ'},{d:'249',l:'이창호'}],g:[]};
  var S;
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function render(){
    var f=$('kp');f.style.background=S.bgImg?'url('+S.bgImg+') center/cover':S.bg;
    $('kPn').textContent=S.name;
    $('kPa').outerHTML='<i class="av c3 kpa" id="kPa"'+(S.pa?' style="background-image:url('+S.pa+')"':'')+'></i>';
    $('kDd').innerHTML=S.dd.map(function(x){return '<div><b>D+'+esc(x.d)+'</b>'+esc(x.l)+'</div>'}).join('');
    var h='';for(var i=0;i<Math.max(6,S.g.length);i++)h+='<i'+(S.g[i]?' style="background-image:url('+S.g[i]+')"':'')+'></i>';
    $('kGrid').innerHTML=h}
  function list(){
    $('elDd').innerHTML=S.dd.map(function(x,i){return '<div class="pe" data-i="'+i+'"><div class="row"><label>숫자<input data-f="d" value="'+esc(x.d)+'"></label><label>이름<input data-f="l" value="'+esc(x.l)+'"></label></div><button type="button" class="xb" data-a="x" style="width:100%">✕ 삭제</button></div>'}).join('');
    $('elG').innerHTML=S.g.map(function(x,i){return '<button type="button" class="ghost" data-i="'+i+'" style="margin-bottom:8px">'+(i+1)+'번 사진 삭제</button>'}).join('')}
  function load(reset){
    if(reset){try{localStorage.removeItem(STORE)}catch(e){}S=JSON.parse(JSON.stringify(DEF))}
    else{try{var v=localStorage.getItem(STORE);S=v?JSON.parse(v):JSON.parse(JSON.stringify(DEF));if(!S||!Array.isArray(S.dd)||!Array.isArray(S.g))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}}
    $('iName').value=S.name;$('iBg').value=S.bg;list();render()}
  function rd(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
  $('iName').addEventListener('input',function(){S.name=this.value;persist();render()});
  $('iBg').addEventListener('input',function(){S.bg=this.value;S.bgImg='';persist();render()});
  $('iBgImg').addEventListener('change',function(){if(this.files[0])rd(this.files[0],function(d){S.bgImg=d;persist();render()})});
  $('iPa').addEventListener('change',function(){if(this.files[0])rd(this.files[0],function(d){S.pa=d;persist();render()})});
  $('iG').addEventListener('change',function(){var fs=[].slice.call(this.files),n=0;fs.forEach(function(f){rd(f,function(d){S.g.push(d);if(++n===fs.length){persist();list();render()}})})});
  $('elG').addEventListener('click',function(e){var i=e.target.dataset.i;if(i==null)return;S.g.splice(+i,1);persist();list();render()});
  $('elDd').addEventListener('input',function(e){var p=e.target.closest('.pe'),f=e.target.dataset.f;if(!p||!f)return;S.dd[+p.dataset.i][f]=e.target.value;persist();render()});
  $('elDd').addEventListener('click',function(e){if(e.target.dataset.a!=='x')return;S.dd.splice(+e.target.closest('.pe').dataset.i,1);persist();list();render()});
  $('addD').onclick=function(){S.dd.push({d:'1',l:''});persist();list();render()};
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
