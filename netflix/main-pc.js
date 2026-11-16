(function(){
  var $=function(i){return document.getElementById(i)},STORE='editsoceur-netflix-main-pc-v1',S;
  var DEF={mn:'홈,시리즈,영화,신규 콘텐츠,내가 찜한 콘텐츠',tg:'시리즈',bg:'',ht:'임시 제목입니다',hd:'임시 설명 문구입니다. 이 자리에 작품 소개가 들어갑니다.',pl:'재생',ls:'내가 찜한 콘텐츠',rw:'넷플릭스 인기 콘텐츠',cn:7};
  function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  var PLAY='<svg width="20" height="20" viewBox="0 0 24 24" style="fill:#000;stroke:none"><path d="M6 4l14 8-14 8z"/></svg>',
    CAST='<svg viewBox="0 0 24 24"><path d="M2 16a6 6 0 0 1 6 6M2 11a11 11 0 0 1 11 11M2 6h2a14 14 0 0 1 14 14v2"/><path d="M2 20h.01"/></svg>',
    SRCH='<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-5-5"/></svg>',
    BELL='<svg viewBox="0 0 24 24"><path d="M6 9a6 6 0 0 1 12 0c0 6 3 7 3 7H3s3-1 3-7M10 20h4"/></svg>';
  function render(){
    var menu=S.mn.split(',').map(function(s){return s.trim()}).filter(Boolean);
    var h='<div class="hero" style="'+(S.bg?"background-image:url('"+esc(S.bg)+"')":'')+'"><div class="sh"></div></div>';
    h+='<div class="nv"><span class="lg">NETFLIX</span><div class="m">'+menu.map(function(m){return '<span>'+esc(m)+'</span>'}).join('')+'</div><div class="r">'+CAST+SRCH+BELL+'<span class="pf2"></span></div></div>';
    h+='<div class="ct"><div class="tg"><b>N</b>'+esc(S.tg)+'</div><div class="ht">'+esc(S.ht)+'</div><div class="hd">'+esc(S.hd)+'</div><div class="bt"><span class="p">'+PLAY+esc(S.pl)+'</span><span class="s">✓ '+esc(S.ls)+'</span></div></div>';
    var cards='';for(var i=0;i<Math.max(1,Math.min(7,+S.cn||7));i++)cards+='<div class="cd"></div>';
    h+='<div class="rw"><h3>'+esc(S.rw)+'</h3><div class="cards">'+cards+'</div></div>';
    $('pf').innerHTML=h}
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function fit(){var k=Math.min(1,$('pw').clientWidth/1920);$('pf').style.transform='scale('+k+')';$('pw').style.height=1080*k+'px'}
  var TX={iMn:'mn',iTg:'tg',iHt:'ht',iHd:'hd',iPl:'pl',iLs:'ls',iRw:'rw',iCn:'cn'};
  function set(){Object.keys(TX).forEach(function(id){$(id).value=S[TX[id]]})}
  function load(r){if(r)try{localStorage.removeItem(STORE)}catch(e){}try{var s=!r&&localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(typeof S.mn!=='string')throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}set();render();fit()}
  Object.keys(TX).forEach(function(id){$(id).addEventListener('input',function(){S[TX[id]]=this.value;persist();render()})});
  $('iBg').addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){S.bg=r.result;persist();render()};r.readAsDataURL(f)});
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){return html2canvas($('pf'),{scale:2,width:1920,height:1080,useCORS:true,backgroundColor:'#141414',logging:false,onclone:function(d){d.getElementById('pf').style.transform='none';var w=d.getElementById('pw');w.style.height='1080px';w.style.overflow='visible'}})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='netflix-main-pc.png';document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t})
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  addEventListener('resize',fit);
  load(false);
})();
