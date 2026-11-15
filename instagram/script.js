(function(){
  var $=function(id){return document.getElementById(id)};
  var DEF={user:'yunou._.u',liker:'_starhwa_',like:'23.6만',cmt:'2,232',rep:'2.4만',shr:'2.2만',
    cap:'UP💪\n#Yunhois3gram',date:'2일 전',count:8,musicOn:true,music:'ATEEZ · UP',badge:true,bub:true,bubN:2};
  var S={},bimg=[null,null,null],avatar=null,photos=[],idx=0;
  function esc(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  function load(){S=JSON.parse(JSON.stringify(DEF));avatar=null;bimg=[null,null,null];['iB0','iB1','iB2'].forEach(function(i){$(i).value=''});$('iBadge').checked=true;$('iBubN').value=2;photos=[];idx=0;
    ['user','liker','like','cmt','rep','shr','cap','date','count','music'].forEach(function(k){$('i'+k.charAt(0).toUpperCase()+k.slice(1)).value=S[k]});
    $('iMusicOn').checked=S.musicOn;$('iAvatar').value='';$('iPhotos').value='';render()}
  function read(){
    S.user=$('iUser').value;S.liker=$('iLiker').value;S.like=$('iLike').value;S.cmt=$('iCmt').value;
    S.rep=$('iRep').value;S.shr=$('iShr').value;S.cap=$('iCap').value;S.date=$('iDate').value;
    S.count=Math.max(1,Math.min(20,parseInt($('iCount').value)||1));S.musicOn=$('iMusicOn').checked;S.music=$('iMusic').value;S.badge=$('iBadge').checked;S.bubN=Math.max(1,Math.min(3,parseInt($('iBubN').value)||1))}
  function render(){
    $('vHead').textContent=S.user;$('vName').textContent=S.user;
    var m=$('vMusic');m.style.display=S.musicOn&&S.music.trim()?'':'none';$('vMusicTxt').textContent=S.music;
    $('vBadge').style.display=S.badge?'':'none';renderBub();
    $('vAvatar').style.backgroundImage=avatar?'url('+avatar+')':'';
    $('vAvatar').classList.toggle('has',!!avatar);
    $('vLike').textContent=S.like;$('vCmt').textContent=S.cmt;$('vRep').textContent=S.rep;$('vShr').textContent=S.shr;
    $('vLikedRow').style.display=S.liker.trim()?'':'none';
    $('vLiked').innerHTML='<b>'+esc(S.liker)+'</b>님 외 <b>여러 명</b>이 좋아합니다';
    $('vCap').innerHTML='<b>'+esc(S.user)+'</b> '+esc(S.cap).replace(/([#@][^\s#@<]+)/g,'<span class="tag">$1</span>');
    $('vDate').textContent=S.date;
    if(idx>=S.count)idx=S.count-1;
    var h='';for(var i=0;i<S.count;i++)h+=photos[i]?'<div class="slide" style="background-image:url('+photos[i]+')"></div>':'<div class="slide ph'+(i%5)+'"></div>';
    $('slides').innerHTML=h;go(idx)}
  var BG=['radial-gradient(circle at 50% 40%,#bbb,#333 60%,#111)','radial-gradient(circle at 50% 38%,#e7c9b0 0 30%,#222 32% 60%,#f2f2f2 62%)','radial-gradient(circle at 50% 40%,#d9d9d9,#777 60%,#333)'];
  function renderBub(){var h='';
    for(var i=0;i<S.bubN;i++){h+='<span class="mini" style="background:'+(bimg[i]?'url('+bimg[i]+')':BG[i])+';background-size:cover;background-position:center"></span>'}
    $('vMinis').innerHTML=h}
  [0,1,2].forEach(function(i){file($('iB'+i),function(o){bimg[i]=o[0];render()})});
  function go(k){
    idx=Math.max(0,Math.min(S.count-1,k));
    $('slides').style.transform='translateX('+(-100*idx)+'%)';
    $('counter').textContent=(idx+1)+'/'+S.count;$('counter').style.display=S.count>1?'':'none';
    var d='',n=Math.min(S.count,5);
    for(var i=0;i<n;i++){var c=i===Math.min(idx,n-1)?'on':(S.count>5&&i===3?'sm':(S.count>5&&i===4?'xs':''));d+='<i class="'+c+'"></i>'}
    $('dots').innerHTML=d;$('dots').style.display=S.count>1?'':'none'}
  function file(el,cb){el.addEventListener('change',function(){
    var fs=[].slice.call(el.files),out=[],n=0;if(!fs.length)return;
    fs.forEach(function(f,i){var r=new FileReader();r.onload=function(){out[i]=r.result;if(++n===fs.length)cb(out)};r.readAsDataURL(f)})})}
  file($('iAvatar'),function(o){avatar=o[0];render()});
  file($('iPhotos'),function(o){photos=o;if(S.count<o.length){S.count=o.length;$('iCount').value=o.length}idx=0;render()});
  $('clearPhotos').onclick=function(){photos=[];$('iPhotos').value='';render()};
  document.querySelectorAll('.editor input:not([type=file]),.editor textarea').forEach(function(e){
    e.addEventListener('input',function(){read();render()})});
  var x0=null,m=$('media');
  m.addEventListener('pointerdown',function(e){x0=e.clientX});
  m.addEventListener('pointerup',function(e){if(x0===null)return;var dx=e.clientX-x0;x0=null;
    if(dx<-40)go(idx+1);else if(dx>40)go(idx-1)});
  $('like').onclick=function(){this.classList.toggle('on')};
  $('reset').onclick=load;
  $('savePng').onclick=function(){
    var b=this;b.disabled=true;var t=b.textContent;b.textContent='저장 중...';
    var run=function(){html2canvas($('post'),{scale:5,useCORS:true,backgroundColor:'#ffffff',logging:false}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);
        a.download='instagram-post.png';document.body.appendChild(a);a.click();a.remove();
        setTimeout(function(){URL.revokeObjectURL(a.href)},2000);b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(run)};
  load();
})();

document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
