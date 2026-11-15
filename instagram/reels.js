(function(){
  var $=function(i){return document.getElementById(i)};
  var DEF={un:'username',fw:'팔로우',fwOn:true,cap:'캡션을 입력하세요 ...',c0:'17.2만',c1:'1,009',c2:'4,082',c3:'3.7만',c4:'1.9만',pg:3,z:100};
  var K=['un','fw','cap','c0','c1','c2','c3','c4','pg'],I={un:'iUn',fw:'iFw',cap:'iCap',c0:'iC0',c1:'iC1',c2:'iC2',c3:'iC3',c4:'iC4',pg:'iPg'};
  var FI={iPhoto:'ph',iAv:'av',iF0:'f0',iF1:'f1',iF2:'f2',iMe:'me'};
  var S,G;
  function bg(e,u){$(e).style.backgroundImage=u?"url('"+u+"')":''}
  function set(){K.forEach(function(k){$(I[k]).value=S[k]});$('iFwOn').checked=S.fwOn;$('iZ').value=S.z}
  function read(){K.forEach(function(k){S[k]=$(I[k]).value});S.fwOn=$('iFwOn').checked;S.z=+$('iZ').value}
  function render(){
    $('vUn').textContent=S.un;$('vCap').textContent=S.cap;$('vFw').textContent=S.fw;$('vFw').style.display=S.fwOn?'':'none';
    for(var i=0;i<5;i++)$('c'+i).textContent=S['c'+i];
    $('vPg').style.width=Math.max(0,Math.min(100,+S.pg||0))+'%';
    bg('rlBg',G.ph);$('rlBg').style.transform='scale('+S.z/100+')';
    bg('vAv',G.av);bg('fa0',G.f0);bg('fa1',G.f1);bg('fa2',G.f2);bg('vMe',G.me);
    $('rl').style.background=G.ph?'#000':'#00b140'}
  function load(){S=JSON.parse(JSON.stringify(DEF));G={};for(var f in FI)$(f).value='';set();render()}
  Object.keys(FI).forEach(function(f){$(f).onchange=function(){var x=this.files[0];if(!x)return;var r=new FileReader();r.onload=function(){G[FI[f]]=r.result;render()};r.readAsDataURL(x)}});
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
