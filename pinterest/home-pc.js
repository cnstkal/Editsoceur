(function(){
  var $=function(i){return document.getElementById(i)},STORE='editsoceur-pinterest-home-pc-v1',S;
  var H=[1.5,1.7,1.2,1.1,1.45,1.8,1.3,1.6,1.15,1.4,1.65,1.1];
  var DEF={sr:'검색',tb:'전체',p:H.map(function(h,i){return {ratio:h,img:'',t:i%3===1?'임시 핀 제목':'',c:'#'+['d9d9d9','cfd6e0','e6dccf','d5e0d0','e0d5e6'][i%5]}})};
  function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  var I={
    logo:'<svg width="34" height="34" viewBox="0 0 24 24" style="fill:#e60023;stroke:none"><path d="M12 0a12 12 0 0 0-4.4 23.2c-.1-.9-.2-2.4 0-3.4l1.4-6s-.4-.7-.4-1.8c0-1.7 1-2.9 2.2-2.9 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4-.3 1.2.6 2.2 1.8 2.2 2.1 0 3.8-2.2 3.8-5.5 0-2.9-2.1-4.9-5-4.9-3.4 0-5.4 2.6-5.4 5.2 0 1 .4 2.1.9 2.7.1.1.1.2.1.3l-.3 1.4c-.1.2-.2.3-.4.2-1.5-.7-2.4-2.9-2.4-4.6 0-3.8 2.7-7.2 7.9-7.2 4.1 0 7.3 2.9 7.3 6.9 0 4.1-2.6 7.4-6.2 7.4-1.2 0-2.4-.6-2.7-1.4l-.7 2.8c-.3 1-1 2.3-1.5 3.1A12 12 0 1 0 12 0z"/></svg>',
    home:'<svg width="30" height="30" viewBox="0 0 24 24" style="fill:#111;stroke:none"><path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
    grid:'<svg width="30" height="30" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 12h18M12 3v18"/></svg>',
    plus:'<svg width="30" height="30" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/></svg>',
    bell:'<svg width="30" height="30" viewBox="0 0 24 24"><path d="M6 9a6 6 0 0 1 12 0c0 6 3 7 3 7H3s3-1 3-7M10 20h4"/></svg>',
    msg:'<svg width="30" height="30" viewBox="0 0 24 24"><path d="M12 21a9 9 0 1 0-8-5l-1 4 4-1a9 9 0 0 0 5 2z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/></svg>',
    set:'<svg width="30" height="30" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    cam:'<svg width="28" height="28" viewBox="0 0 24 24"><path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    srch:'<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-5-5"/></svg>',
    chev:'<svg width="18" height="18" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
    dots:'<svg width="22" height="22" viewBox="0 0 24 24" style="fill:#111;stroke:none"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>'
  };
  function render(){
    var h='<div class="sd"><div class="i" style="top:18px">'+I.logo+'</div><div class="i" style="top:110px">'+I.home+'</div><div class="i" style="top:204px">'+I.grid+'</div><div class="i" style="top:298px">'+I.plus+'</div><div class="i" style="top:392px">'+I.bell+'<span class="dot"></span></div><div class="i" style="top:486px">'+I.msg+'</div><div class="i" style="top:804px">'+I.set+'</div></div>';
    h+='<div class="sr">'+I.srch+'<span style="margin-left:12px">'+esc(S.sr)+'</span><span class="cam">'+I.cam+'</span></div>';
    h+='<div class="av"></div><div class="dd">'+I.chev+'</div><div class="tb">'+esc(S.tb)+'</div>';
    var cols=[[],[],[],[],[],[]],ys=[0,0,0,0,0,0];
    S.p.forEach(function(p,i){var c=0;for(var j=1;j<6;j++)if(ys[j]<ys[c])c=j;cols[c].push(p);ys[c]+=(p.ratio||1.4)*278+60});
    cols.forEach(function(col,ci){
      var x=108+ci*299;var html='';
      col.forEach(function(p){html+='<div style="margin-bottom:16px"><div class="pin" style="aspect-ratio:1 / '+(p.ratio||1.4)+';background-color:'+esc(p.c)+';'+(p.img?"background-image:url('"+esc(p.img)+"')":'')+'"></div><div class="pn"><b>'+esc(p.t)+'</b>'+I.dots+'</div></div>'});
      h+='<div class="col" style="left:'+x+'px">'+html+'</div>'});
    $('pf').innerHTML=h;fit()}
  function list(){var h='';S.p.forEach(function(p,i){h+='<div class="xc" data-i="'+i+'"><div class="row"><label>제목<input data-f="t" value="'+esc(p.t)+'"></label></div><label>사진<input type="file" accept="image/*" data-f="img"></label><div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'});$('xlist').innerHTML=h}
  function readImage(file,cb){var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){cb(r.result,im.height/im.width)};im.src=r.result};r.readAsDataURL(file)}
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function fit(){var k=Math.min(1,$('pw').clientWidth/1920);$('pf').style.transform='scale('+k+')';$('pf').style.height='auto';$('pf').style.overflow='visible';var h=Math.max(1080,$('pf').scrollHeight);$('pw').style.height=h*k+'px'}
  function load(r){if(r)try{localStorage.removeItem(STORE)}catch(e){}try{var s=!r&&localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!Array.isArray(S.p))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}$('iSr').value=S.sr;$('iTb').value=S.tb;list();render()}
  $('iSr').addEventListener('input',function(){S.sr=this.value;persist();render()});
  $('iTb').addEventListener('input',function(){S.tb=this.value;persist();render()});
  var L=$('xlist'),ix=function(e){return +e.target.closest('.xc').dataset.i};
  L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||e.target.type==='file')return;S.p[ix(e)][f]=e.target.value;persist();render()});
  L.addEventListener('change',function(e){var t=e.target;if(t.dataset.f!=='img'||!t.files[0])return;var o=S.p[ix(e)];readImage(t.files[0],function(data,ratio){o.img=data;o.ratio=ratio;persist();render()})});
  L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.p,t;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){t=m[i];m[i]=m[i+1];m[i+1]=t}
    persist();list();render()});
  $('batchPins').onchange=function(){[].slice.call(this.files).forEach(function(f){readImage(f,function(data,ratio){S.p.push({ratio:ratio,img:data,t:'',c:'#d9d9d9'});persist();list();render()})});this.value=''};
  $('addP').onclick=function(){S.p.push({ratio:1.4,img:'',t:'',c:'#d9d9d9'});persist();list();render()};
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){return html2canvas($('pf'),{scale:2,width:1920,height:$('pf').scrollHeight,useCORS:true,backgroundColor:'#fff',logging:false,onclone:function(d){d.getElementById('pf').style.transform='none';var w=d.getElementById('pw');w.style.height='1080px';w.style.overflow='visible'}})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='pinterest-home-pc.png';document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t})
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  addEventListener('resize',fit);
  load(false);
})();
