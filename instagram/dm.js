(function(){
  var $=function(i){return document.getElementById(i)};
  var DEF={nick:'🐄 🥛',id:'bright_sou',ph:'메시지 보내기...',m:[
    ['r','야 어떡해 너무 무서워...'],['s','난알고잇엇직ㅋ'],['s','그래서마지막에 노래할때 조개카레라고만 햇자나'],
    ['r','씨이아앙.........'],['r','나 티켓팅하느라 못봤나봐........'],['s','ㅋㅋㅋㅋㅋㅋㅋㅋㅋ'],
    ['r','넘무무서워........'],['r','아니 치이카와는 원작만화를 봐야 하네'],['r','지금 알고리즘이'],['r','치이카와로 점령됐는데'],
    ['r','원작만화 파묘할수록 미친 만화야'],['r','너무 무섭고 재밌다']].map(function(a){return{s:a[0],t:a[1]}})};
  var S,av;
  function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  function chat(){
    $('vNick').textContent=S.nick;$('vId').textContent=S.id;$('vPh').textContent=S.ph;
    var bg=av?'background-image:url('+av+')':'';$('vHav').style.cssText=bg;
    var h='';S.m.forEach(function(x,i){var pv=S.m[i-1],nx=S.m[i+1],first=!pv||pv.s!==x.s,last=!nx||nx.s!==x.s;
      h+='<div class="m '+x.s+(first&&i?' gap':'')+'">'+(x.s==='r'?'<div class="mav'+(last?'':' hid')+'" style="'+bg+'"></div>':'')+'<div class="b">'+esc(x.t)+'</div></div>'});
    var c=$('chat');c.innerHTML=h;var H=c.offsetHeight||1;
    c.querySelectorAll('.m.s .b').forEach(function(b){var t=Math.max(0,Math.min(1,(b.offsetTop+b.offsetHeight/2)/H));
      b.style.background='rgb('+Math.round(160-55*t)+','+Math.round(56+4*t)+','+Math.round(210+30*t)+')'})}
  function list(){var h='';S.m.forEach(function(x,i){
    h+='<div class="mi" data-i="'+i+'"><select><option value="r"'+(x.s==='r'?' selected':'')+'>받은</option><option value="s"'+(x.s==='s'?' selected':'')+'>보낸</option></select><input class="mt" value="'+esc(x.t)+'"><button type="button" class="mb" data-a="u">↑</button><button type="button" class="mb" data-a="d">↓</button><button type="button" class="mb" data-a="x">✕</button></div>'});
    $('mlist').innerHTML=h}
  function load(){S=JSON.parse(JSON.stringify(DEF));av=null;$('iAv').value='';
    $('iNick').value=S.nick;$('iId').value=S.id;$('iPh').value=S.ph;list();chat()}
  [['iNick','nick'],['iId','id'],['iPh','ph']].forEach(function(p){$(p[0]).addEventListener('input',function(){S[p[1]]=this.value;chat()})});
  $('iAv').onchange=function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){av=r.result;chat()};r.readAsDataURL(f)};
  var ml=$('mlist');
  ml.addEventListener('input',function(e){if(e.target.className==='mt'){S.m[+e.target.parentNode.dataset.i].t=e.target.value;chat()}});
  ml.addEventListener('change',function(e){if(e.target.tagName==='SELECT'){S.m[+e.target.parentNode.dataset.i].s=e.target.value;chat()}});
  ml.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=+e.target.parentNode.dataset.i,m=S.m;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){var t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){var t2=m[i];m[i]=m[i+1];m[i+1]=t2}
    list();chat()});
  $('addR').onclick=function(){S.m.push({s:'r',t:''});list();chat()};
  $('addS').onclick=function(){S.m.push({s:'s',t:''});list();chat()};
  $('reset').onclick=load;
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return html2canvas($('dm'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='instagram-dm.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
  load();
})();
