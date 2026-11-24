(function(){
  var $=function(i){return document.getElementById(i)};
  var PH='메시지 보내기…',DEF={nick:'상대 이름',id:'username',ph:'',m:[
    ['r','안녕!'],['s','안녕~ 뭐해?'],['s','이 영상 봤어?'],['r','아직 못 봤어ㅠㅠ'],['r','지금 볼게'],['s','ㅋㅋㅋㅋㅋㅋ']].map(function(a){return{k:'t',s:a[0],t:a[1]}})};
  var SH='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linejoin="round"><path d="M22 3 2.5 10.3l7.300 3 3 7.200z"/><path d="m9.800 13.300 12.200-10.300"/></svg>',
    BK='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.200" stroke-linejoin="round"><path d="M6 3h12v18l-6-4.500L6 21z"/></svg>',
    VB='<svg width="18" height="18" viewBox="0 0 40 40"><path fill="#c9c9c9" d="M19.998 3.094 14.638 0l-2.972 5.150H5.432v6.354L0 14.640 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.360-3.094L25.359 40l3.232-5.600h6.162v-6.010L40 25.359 36.905 20 40 14.641l-5.248-3.030v-6.460h-6.419L25.359 0z"/><path d="m11.500 20.600 6 6 11-12.600" fill="none" stroke="#fff" stroke-width="3.500" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    PL='<svg width="46" height="46" viewBox="0 0 24 24"><path fill="#fff" stroke="#fff" stroke-width="3" stroke-linejoin="round" d="M7 4.500v15l12.500-7.500z"/></svg>',
    PS='<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#000" stroke="#000" stroke-width="2.500" stroke-linejoin="round" d="M7 4.500v15l12.500-7.500z"/></svg>';
  var S,av,bgImg=null,lt=0,li=-1;
  function paintBg(){var d=$('dm');if($('iBg').checked){d.style.background=bgImg?"url('"+bgImg+"') center/cover no-repeat":'#fff'}else d.style.background=''}
  function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  function bgi(u){return u?"background-image:url('"+u+"')":''}
  function chat(){
    paintBg();
    $('vNick').textContent=S.nick;$('vId').textContent=S.id;$('vPh').textContent=S.ph||PH;$('vPh').classList.toggle('typed',!!S.ph);
    $('vHav').style.cssText=bgi(av);
    var h='';S.m.forEach(function(x,i){
      if(x.k==='d'){h+='<div class="dt">'+esc(x.t)+'</div>';return}
      var pv=S.m[i-1],nx=S.m[i+1],first=!pv||pv.s!==x.s,last=!nx||nx.s!==x.s,gap=first&&i&&pv.k!=='d',inner;
      if(x.k==='t')inner='<div class="b">'+esc(x.t)+'</div>';
      else if(x.k==='p')inner=x.img?'<img class="pic" src="'+x.img+'" alt="">':'<div class="med p"></div>';
      else inner='<div class="med r" style="'+bgi(x.img)+'"><div class="rs"></div><div class="rh"><i style="'+bgi(x.rav)+'"></i><span>'+esc(x.rid)+'</span>'+(x.vb?VB:'')+'</div><div class="rc">'+PL+'</div><div class="rp">'+PS+'</div></div>';
      var w='<div class="w '+x.s+(x.k==='t'?'':x.k==='p'?' pw':' mw')+'">'+inner+(x.h?'<span class="hrt">❤️</span>':'')+'</div>';
      var sc=x.k==='p'?'<div class="sc cen">'+SH+'</div>':x.k==='r'?'<div class="scs"><div class="sc">'+SH+'</div><div class="sc">'+BK+'</div></div>':'';
      var a=x.s==='r'?'<div class="mav'+(last?'':' hid')+'" style="'+bgi(av)+'"></div>':'';
      h+='<div class="m '+x.s+(gap?' gap':'')+(x.h?' hh':'')+'" data-i="'+i+'">'+(x.s==='s'?sc+w:a+w+sc)+'</div>'});
    var c=$('chat');c.innerHTML=h;var H=c.offsetHeight||1;
    c.querySelectorAll('.m.s .b').forEach(function(b){var t=Math.max(0,Math.min(1,(b.offsetTop+b.offsetHeight/2)/H));
      b.style.background='rgb('+Math.round(160-55*t)+','+Math.round(56+4*t)+','+Math.round(210+30*t)+')'})}
  function list(){var h='';S.m.forEach(function(x,i){
    var sel='<select><option value="r"'+(x.s==='r'?' selected':'')+'>상대</option><option value="s"'+(x.s==='s'?' selected':'')+'>나</option></select>';
    var f=function(n,l){return '<label class="fl">'+l+'<input type="file" accept="image/*" data-f="'+n+'"></label>'};
    h+='<div class="mi" data-i="'+i+'">'+(x.k==='d'?'<span class="tg">날짜</span><input class="mt" data-f="t" value="'+esc(x.t)+'">':
      sel+(x.k==='t'?'<input class="mt" data-f="t" value="'+esc(x.t)+'">':x.k==='p'?f('img','사진'):f('img','릴스 화면')+'<input class="mt" data-f="rid" placeholder="릴스 아이디" value="'+esc(x.rid)+'">'+f('rav','프사')+'<label class="fl"><input type="checkbox" data-f="vb"'+(x.vb?' checked':'')+'> 파란딱지</label>'))+
      '<button type="button" class="mb" data-a="u">↑</button><button type="button" class="mb" data-a="d">↓</button><button type="button" class="mb" data-a="x">✕</button></div>'});
    $('mlist').innerHTML=h}
  function load(){S=JSON.parse(JSON.stringify(DEF));av=null;$('iAv').value='';bgImg=null;$('iBgImg').value='';
    $('iNick').value=S.nick;$('iId').value=S.id;$('iPh').value=S.ph;$('iBg').checked=true;list();bgApply()}
  function bgApply(){var on=$('iBg').checked;$('dm').classList.toggle('nobg',!on);document.body.classList.toggle('dm-off',!on);chat()}
  $('iBg').onchange=bgApply;
  $('iBgImg').onchange=function(){var f=this.files[0];if(f)IGImg.read(f,function(d){bgImg=d;chat()})};
  [['iNick','nick'],['iId','id'],['iPh','ph']].forEach(function(p){$(p[0]).addEventListener('input',function(){S[p[1]]=this.value;chat()})});
  $('iAv').onchange=function(){var f=this.files[0];if(!f)return;IGImg.read(f,function(d){av=d;chat()})};
  var ml=$('mlist');
  ml.addEventListener('input',function(e){var f=e.target.dataset.f;if(f&&e.target.type!=='file'&&e.target.type!=='checkbox'){S.m[+e.target.parentNode.dataset.i][f]=e.target.value;chat()}});
  ml.addEventListener('change',function(e){var t=e.target,m=S.m[+t.closest('.mi').dataset.i];
    if(t.tagName==='SELECT'){m.s=t.value;chat()}
    else if(t.type==='checkbox'){m[t.dataset.f]=t.checked;chat()}
    else if(t.type==='file'&&t.files[0]){var fn=function(d){m[t.dataset.f]=d;chat()};if(t.dataset.f==='rav')IGImg.read(t.files[0],fn);else{var r=new FileReader();r.onload=function(){fn(r.result)};r.readAsDataURL(t.files[0])}}});
  ml.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=+e.target.parentNode.dataset.i,m=S.m;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
    list();chat()});
  $('chat').addEventListener('click',function(e){var m=e.target.closest('.m');if(!m||!e.target.closest('.w'))return;
    var i=+m.dataset.i,n=Date.now();
    if(li===i&&n-lt<400){S.m[i].h=!S.m[i].h;lt=0;li=-1;chat()}else{lt=n;li=i}});
  function add(o){return function(){S.m.push(o());list();chat()}}
  $('addR').onclick=add(function(){return{k:'t',s:'r',t:''}});
  $('addS').onclick=add(function(){return{k:'t',s:'s',t:''}});
  $('addP').onclick=function(){$('addImg').click()};
  $('addImg').onchange=function(){var fs=[].slice.call(this.files),out=[],n=0,el=this;if(!fs.length)return;
    fs.forEach(function(f,i){var r=new FileReader();r.onload=function(){out[i]=r.result;if(++n===fs.length){out.forEach(function(d){S.m.push({k:'p',s:'s',img:d})});el.value='';list();chat()}};r.readAsDataURL(f)})};
  $('addV').onclick=add(function(){return{k:'r',s:'s',rid:'username'}});
  $('addD').onclick=add(function(){return{k:'d',s:'d',t:'11월 4일 오전 9:56'}});
  $('reset').onclick=load;
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return IGImg.capture($('dm'),{scale:8,backgroundColor:$('iBg').checked?'#ffffff':null,logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='instagram-dm.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
  load();
})();
