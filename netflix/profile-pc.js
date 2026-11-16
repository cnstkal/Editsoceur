(function(){
  var $=function(i){return document.getElementById(i)},STORE='editsoceur-netflix-profile-pc-v1',S;
  var DEF={tt:'Netflix를 시청할 프로필을 선택하세요.',p:[{n:'선택 1',img:''},{n:'선택 2',img:''},{n:'선택 3',img:''},{n:'선택 4',img:''},{n:'선택 5',img:''}]};
  function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  function render(){
    var h='<div class="lg">Netflix</div><div class="tt">'+esc(S.tt)+'</div><div class="pr">'+S.p.map(function(p){return '<div class="pi"><div class="pb" style="'+(p.img?"background-image:url('"+esc(p.img)+"')":'')+'"></div><div class="pn">'+esc(p.n)+'</div></div>'}).join('')+'</div>';
    $('pf').innerHTML=h;fit()}
  function list(){var h='';S.p.forEach(function(p,i){h+='<div class="xc" data-i="'+i+'"><div class="row"><label>이름<input data-f="n" value="'+esc(p.n)+'"></label><label>프로필 사진<input type="file" accept="image/*" data-f="img"></label></div><div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'});$('xlist').innerHTML=h;$('addP').disabled=S.p.length>=5}
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  function fit(){var k=Math.min(1,$('pw').clientWidth/1920);$('pf').style.transform='scale('+k+')';$('pf').style.height='auto';$('pf').style.overflow='visible';var base=$('pf').getBoundingClientRect().top,bottom=Math.max(1080,$('pf').scrollHeight);$('pf').querySelectorAll('*').forEach(function(el){var r=el.getBoundingClientRect();bottom=Math.max(bottom,(r.bottom-base)/k)});var h=Math.max(1080,bottom+40);$('pf').style.height=h+'px';$('pw').style.height=h*k+'px'}
  function load(r){if(r)try{localStorage.removeItem(STORE)}catch(e){}try{var s=!r&&localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!Array.isArray(S.p))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}$('iTt').value=S.tt;list();render();fit()}
  $('iTt').addEventListener('input',function(){S.tt=this.value;persist();render()});

  var L=$('xlist'),ix=function(e){return +e.target.closest('.xc').dataset.i};
  L.addEventListener('input',function(e){var f=e.target.dataset.f;if(!f||e.target.type==='file')return;S.p[ix(e)][f]=e.target.value;persist();render()});
  L.addEventListener('change',function(e){var t=e.target;if(t.dataset.f!=='img'||!t.files[0])return;var o=S.p[ix(e)],r=new FileReader();r.onload=function(){o.img=r.result;persist();render()};r.readAsDataURL(t.files[0])});
  L.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;var i=ix(e),m=S.p,t;
    if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){t=m[i];m[i]=m[i+1];m[i+1]=t}
    persist();list();render()});
  $('addP').onclick=function(){if(S.p.length<5){S.p.push({n:'선택 '+(S.p.length+1),img:''});persist();list();render()}};
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){return html2canvas($('pf'),{scale:2,width:1920,height:Math.max(1080,$('pf').scrollHeight),useCORS:true,backgroundColor:'#000',logging:false,onclone:function(d){d.getElementById('pf').style.transform='none';var w=d.getElementById('pw');w.style.height='auto';w.style.overflow='visible'}})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='netflix-profile-pc.png';document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t})
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  addEventListener('resize',fit);
  load(false);
})();
