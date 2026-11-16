(function(){
  var $=function(i){return document.getElementById(i)},STORE='editsoceur-netflix-main-pc-v1',S;
  var DEF={tg:'시리즈',nOn:true,bg:'',ht:'임시 제목입니다',hd:'임시 설명 문구입니다. 이 자리에 작품 소개가 들어갑니다.',pl:'재생',ls:'내가 찜한 콘텐츠',rw:'넷플릭스 인기 콘텐츠',rw2:'스릴러 & 미스터리 시리즈',cn:7,cards1:['','','','','','',''],cards2:['','','','','','','']};
  function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  var PLAY='<svg width="20" height="20" viewBox="0 0 24 24" style="fill:#000;stroke:none"><path d="M6 4l14 8-14 8z"/></svg>',
    CAST='<svg viewBox="0 0 24 24"><path d="M2 16a6 6 0 0 1 6 6M2 11a11 11 0 0 1 11 11M2 6h2a14 14 0 0 1 14 14v2"/><path d="M2 20h.01"/></svg>',
    SRCH='<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-5-5"/></svg>',
    BELL='<svg viewBox="0 0 24 24"><path d="M6 9a6 6 0 0 1 12 0c0 6 3 7 3 7H3s3-1 3-7M10 20h4"/></svg>';
  function render(){
    var menu=['홈','시리즈','영화','NEW & HOT','내가 찜한 콘텐츠'];
    var h='<div class="hero" style="'+(S.bg?"background-image:url('"+esc(S.bg)+"')":'')+'"><div class="sh"></div></div>';
    h+='<div class="nv"><span class="lg">NETFLIX</span><div class="m">'+menu.map(function(m){return '<span>'+m+'</span>'}).join('')+'</div><div class="r">'+CAST+SRCH+BELL+'<span class="pf2"></span></div></div>';
    h+='<div class="ct"><div class="tg">'+(S.nOn?'<b>N</b>':'')+esc(S.tg)+'</div><div class="ht">'+esc(S.ht)+'</div><div class="hd">'+esc(S.hd)+'</div><div class="bt"><span class="p">'+PLAY+esc(S.pl)+'</span><span class="s">✓ '+esc(S.ls)+'</span></div></div>';
    function row(arr){return arr.map(function(u){return '<div class="cd" style="'+(u?"background-image:url('"+esc(u)+"')":'')+'"></div>'}).join('')}
    h+='<div class="rw"><h3>'+esc(S.rw)+'</h3><div class="cards">'+row(S.cards1.slice(0,Math.max(1,Math.min(7,+S.cn||7))))+'</div></div>';
    h+='<div class="rw rw2"><h3>'+esc(S.rw2)+'</h3><div class="cards">'+row(S.cards2)+'</div></div>';
    $('pf').innerHTML=h;fit();
  }
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function fit(){var k=Math.min(1,$('pw').clientWidth/1920);$('pf').style.transform='scale('+k+')';$('pf').style.height='auto';$('pf').style.overflow='visible';var base=$('pf').getBoundingClientRect().top,bottom=Math.max(1080,$('pf').scrollHeight);$('pf').querySelectorAll('*').forEach(function(el){var r=el.getBoundingClientRect();bottom=Math.max(bottom,(r.bottom-base)/k)});var h=Math.max(1080,bottom+40);$('pf').style.height=h+'px';$('pw').style.height=h*k+'px'}
  var TX={iTg:'tg',iHt:'ht',iHd:'hd',iPl:'pl',iLs:'ls',iRw:'rw',iRw2:'rw2',iCn:'cn'};
  function buildCards(){['cards1','cards2'].forEach(function(id,k){var arr=S[k?'cards2':'cards1'];$(id).innerHTML=arr.map(function(u,i){return '<label>카드 '+(i+1)+' 사진<input type="file" data-row="'+k+'" data-card="'+i+'" accept="image/*"></label>'}).join('')})}
  function set(){Object.keys(TX).forEach(function(id){$(id).value=S[TX[id]]});$('iNOn').checked=!!S.nOn;buildCards()}
  function load(reset){if(reset)try{localStorage.removeItem(STORE)}catch(e){}try{var v=!reset&&localStorage.getItem(STORE);S=v?JSON.parse(v):JSON.parse(JSON.stringify(DEF));if(!Array.isArray(S.cards1))S.cards1=['','','','','','',''];if(!Array.isArray(S.cards2))S.cards2=['','','','','','',''];if(typeof S.tg!=='string')throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}set();render();fit()}
  Object.keys(TX).forEach(function(id){$(id).addEventListener('input',function(){S[TX[id]]=this.value;persist();render()})});
  $('iNOn').onchange=function(){S.nOn=this.checked;persist();render()};
  document.querySelector('.ed').addEventListener('change',function(e){if(e.target.type!=='file'||!e.target.dataset.card||!e.target.files[0])return;var row=+e.target.dataset.row,idx=+e.target.dataset.card,fr=new FileReader();fr.onload=function(){S[row?'cards2':'cards1'][idx]=fr.result;persist();render()};fr.readAsDataURL(e.target.files[0])});
  $('iBg').addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){S.bg=r.result;persist();render()};r.readAsDataURL(f)});
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){return html2canvas($('pf'),{scale:2,width:1920,height:Math.max(1080,$('pf').scrollHeight),useCORS:true,backgroundColor:'#141414',logging:false,onclone:function(d){d.getElementById('pf').style.transform='none';var w=d.getElementById('pw');w.style.height='auto';w.style.overflow='visible'}})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='netflix-main-pc.png';document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t})
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  addEventListener('resize',fit);
  load(false);
})();
