(function(){
  var $=function(i){return document.getElementById(i)};
  var DEF={un:'yunou._.u',nm:'윤호 (YUNHO)',po:'167',fr:'712만',fg:'8',bio:'ATEEZ',m1:'choi3an',m2:'wooyounggg__',mn:'7',mutOn:true,mi:[],f1:'팔로잉',f2:'메시지',badge:true,cnt:9};
  var S,av,mav,ph;
  var ICON='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="8" y="3" width="13" height="13" rx="3.5" fill="#fff"/><path d="M4 8v9a3 3 0 0 0 3 3h9"/></svg>';
  var K=['un','nm','po','fr','fg','bio','f1','f2','m1','m2','mn'],I={un:'iUn',nm:'iNm',po:'iPo',fr:'iFr',fg:'iFg',bio:'iBio',f1:'iF1',f2:'iF2',m1:'iM1',m2:'iM2',mn:'iMn'};
  function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  function rd(file,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(file)}
  function buildInputs(){
    var h='';for(var i=0;i<S.cnt;i++)h+='<div class="musicbox pst"><div class="trow"><span>게시물 '+(i+1)+' 여러 장 아이콘</span><label class="sw"><input type="checkbox" data-c="'+i+'"'+(S.mi[i]?' checked':'')+'><i></i></label></div><label class="file">게시물 '+(i+1)+' 사진<input type="file" accept="image/*" data-i="'+i+'"></label></div>';
    $('pInputs').innerHTML=h;
    document.querySelectorAll('#pInputs [data-c]').forEach(function(c){c.onchange=function(){S.mi[+this.dataset.c]=this.checked;render()}});
    document.querySelectorAll('#pInputs input[type=file]').forEach(function(inp){
      inp.onchange=function(){var i=+this.dataset.i;if(!this.files[0])return;rd(this.files[0],function(d){ph[i]=d;render()})}})}
  function set(){K.forEach(function(k){$(I[k]).value=S[k]});$('iBadge').checked=S.badge;$('iMutOn').checked=S.mutOn;$('iCnt').value=S.cnt}
  function read(){K.forEach(function(k){S[k]=$(I[k]).value});S.badge=$('iBadge').checked;S.mutOn=$('iMutOn').checked;
    var c=Math.max(3,Math.min(30,parseInt($('iCnt').value)||9));if(c!==S.cnt){S.cnt=c;buildInputs()}else S.cnt=c}
  function load(){S=JSON.parse(JSON.stringify(DEF));av=null;mav=[];ph=[];set();buildInputs();render()}
  function render(){
    var m={vUn:'un',vNm:'nm',vPo:'po',vFr:'fr',vFg:'fg',vBio:'bio',vF1:'f1',vF2:'f2'};
    for(var id in m)$(id).textContent=S[m[id]];
    $('vMut').innerHTML='<b>'+esc(S.m1)+'</b>님, <b>'+esc(S.m2)+'</b>님 외 '+esc(S.mn)+'명이 팔로우합니다';
    $('vBadge').style.display=S.badge?'':'none';
    $('vBio').style.display=S.bio?'':'none';
    $('vMutBox').style.display=S.mutOn?'':'none';
    $('vAv').style.backgroundImage=av?'url('+av+')':'';
    var a='';for(var i=0;i<3;i++)a+='<i style="background-image:'+(mav[i]?'url('+mav[i]+')':'none')+'"></i>';
    $('vMav').innerHTML=a;
    var g='';for(var j=0;j<S.cnt;j++)g+='<div class="cell"'+(ph[j]?' style="background-image:url('+ph[j]+')"':'')+'>'+(S.mi[j]&&ph[j]?ICON:'')+'</div>';
    $('grid').innerHTML=g}
  $('iAv').onchange=function(){if(this.files[0])rd(this.files[0],function(d){av=d;render()})};
  document.querySelectorAll('[data-m]').forEach(function(inp){
    inp.onchange=function(){var i=+this.dataset.m;if(!this.files[0])return;rd(this.files[0],function(d){mav[i]=d;render()})}});
  document.querySelectorAll('.editor input:not([type=file]),.editor textarea').forEach(function(e){
    e.addEventListener('input',function(){read();render()});e.addEventListener('change',function(){read();render()})});
  $('reset').onclick=load;
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return html2canvas($('prof'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='instagram-profile.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
  load();
})();
