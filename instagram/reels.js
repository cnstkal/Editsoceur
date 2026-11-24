(function(){
  var $=function(i){return document.getElementById(i)};
  var DEF={un:'username',fw:'팔로우',fwOn:true,cap:'캡션을 입력하세요 ...',c0:'17.2만',c1:'1,009',c2:'4,082',c3:'3.7만',c4:'1.9만',pg:3,ring:true,hd:true};
  var K=['un','fw','cap','c0','c1','c2','c3','c4','pg'],I={un:'iUn',fw:'iFw',cap:'iCap',c0:'iC0',c1:'iC1',c2:'iC2',c3:'iC3',c4:'iC4',pg:'iPg'};
  var FI={iPhoto:'ph',iAv:'av',iF0:'f0',iF1:'f1',iF2:'f2',iMe:'me'};
  var S,G;
  function bg(e,u){$(e).style.backgroundImage=u?"url('"+u+"')":''}
  function set(){K.forEach(function(k){$(I[k]).value=S[k]});$('iFwOn').checked=S.fwOn;$('iRing').checked=S.ring;$('iHd').checked=S.hd}
  function read(){K.forEach(function(k){S[k]=$(I[k]).value});S.fwOn=$('iFwOn').checked;S.ring=$('iRing').checked;S.hd=$('iHd').checked}
  function render(){
    ['iF0','iF1','iF2'].forEach(function(id){$(id).disabled=!S.hd;$(id).closest('label').style.opacity=S.hd?'1':'.4'});
    $('vUn').textContent=S.un;$('vCap').textContent=S.cap;$('vFw').textContent=S.fw;$('vFw').style.display=S.fwOn?'':'none';
    for(var i=0;i<5;i++)$('c'+i).textContent=S['c'+i];
    $('vPg').style.width=Math.max(0,Math.min(100,+S.pg||0))+'%';
    bg('rlBg',G.ph);$('rlBg').style.transform='';
    bg('vAv',G.av);bg('fa0',G.f0);bg('fa1',G.f1);bg('fa2',G.f2);bg('vMe',G.me);
    $('rlRing').classList.toggle('off',!S.ring);$('rlTop').style.display=S.hd?'':'none';
    $('rl').style.background=G.ph?'#000':'#00b140'}
  function load(){S=JSON.parse(JSON.stringify(DEF));G={};for(var f in FI)$(f).value='';set();render()}
  Object.keys(FI).forEach(function(f){$(f).onchange=function(){var x=this.files[0];if(!x)return;var fn=function(d){G[FI[f]]=d;render()};if(f==='iPhoto'){var r=new FileReader();r.onload=function(){fn(r.result)};r.readAsDataURL(x)}else IGImg.read(x,fn)}});
  document.querySelectorAll('.editor input:not([type=file])').forEach(function(e){
    e.addEventListener('input',function(){read();render()});e.addEventListener('change',function(){read();render()})});
  $('reset').onclick=load;
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
      return html2canvas($('rl'),{scale:4,useCORS:true,backgroundColor:null,logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='instagram-reels.png';
        document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
  load();
})();
