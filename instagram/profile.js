(function(){
  var $=function(i){return document.getElementById(i)};
  var DEF={un:'yunou._.u',nm:'윤호 (YUNHO)',po:'167',fr:'712만',fg:'8',bio:'ATEEZ',mut:'choi3an님, wooyounggg__님 외 7명이 팔로우합니다',f1:'팔로잉',f2:'메시지',badge:true,cnt:9};
  var S,av,mav,ph;
  var ICON='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="8" y="3" width="13" height="13" rx="3.500" fill="#fff"/><path d="M4 8v9a3 3 0 0 0 3 3h9"/></svg>';
  var K=['un','nm','po','fr','fg','bio','mut','f1','f2'],I={un:'iUn',nm:'iNm',po:'iPo',fr:'iFr',fg:'iFg',bio:'iBio',mut:'iMut',f1:'iF1',f2:'iF2'};
  function set(){K.forEach(function(k){$(I[k]).value=S[k]});$('iBadge').checked=S.badge;$('iCnt').value=S.cnt}
  function read(){K.forEach(function(k){S[k]=$(I[k]).value});S.badge=$('iBadge').checked;S.cnt=Math.max(3,Math.min(30,parseInt($('iCnt').value)||9))}
  function load(){S=JSON.parse(JSON.stringify(DEF));av=null;mav=[];ph=[];['iAv','iMav','iPh'].forEach(function(i){$(i).value=''});set();render()}
  function render(){
    var m={vUn:'un',vNm:'nm',vPo:'po',vFr:'fr',vFg:'fg',vBio:'bio',vMut:'mut',vF1:'f1',vF2:'f2'};
    for(var id in m)$(id).textContent=S[m[id]];
    $('vBadge').style.display=S.badge?'':'none';
    $('vBio').style.display=S.bio?'':'none';
    $('vMutBox').style.display=S.mut?'':'none';
    $('vAv').style.backgroundImage=av?'url('+av+')':'';
    var a='';for(var i=0;i<3;i++)a+='<i style="background-image:'+(mav[i]?'url('+mav[i]+')':'none')+'"></i>';
    $('vMav').innerHTML=a;
    var g='';for(var j=0;j<S.cnt;j++)g+='<div class="cell"'+(ph[j]?' style="background-image:url('+ph[j]+')"':'')+'>'+ICON+'</div>';
    $('grid').innerHTML=g}
  function rd(files,cb){var out=[],n=files.length;if(!n)return cb(out);
    Array.prototype.forEach.call(files,function(f,i){var r=new FileReader();r.onload=function(){out[i]=r.result;if(--n===0)cb(out)};r.readAsDataURL(f)})}
  $('iAv').onchange=function(){rd(this.files,function(o){av=o[0]||null;render()})};
  $('iMav').onchange=function(){rd(this.files,function(o){mav=o.slice(0,3);render()})};
  $('iPh').onchange=function(){rd(this.files,function(o){ph=o;if(o.length>S.cnt){S.cnt=Math.min(30,o.length);$('iCnt').value=S.cnt}render()})};
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
