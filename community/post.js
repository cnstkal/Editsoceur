(function(){
  var $=function(i){return document.getElementById(i)},STORE='editsoceur-community-post-v1',S;
  var DEF={tabs:['DC','마이너갤','미니갤','인물갤'],act:1,gal:'임시게시판',nick:'ㅇㅇ',title:'임시 제목입니다',date:'2026.01.01 12:00',view:'1234',rec:'56',cmt:'7',body:'임시 내용입니다\n임시 내용입니다',note:'',img:'',showImg:true};
  function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  function render(){
    var h='<div class="nv">'+S.tabs.map(function(t,i){return '<span'+(i===S.act?' class="on"':'')+'>'+esc(t)+'</span>'}).join('')+'<svg viewBox="0 0 24 24"><path d="M3 5h18L12 20z"/></svg></div>';
    h+='<div class="gh"><div class="g">'+esc(S.gal)+'<span class="m">m</span></div><div class="r"><span class="ic">i</span><i></i><span>설정<span class="n">N</span></span><i></i><span>연관</span><span class="wr">글쓰기</span></div></div>';
    h+='<div class="ti"><h1>'+esc(S.title)+'</h1><div class="au"><div class="l"><b>'+esc(S.nick)+'</b><i></i><span>'+esc(S.date)+'</span></div><div class="r"><span class="gl">갤로그가기</span></div></div></div>';
    h+='<div class="st"><span>조회수 '+esc(S.view)+'</span><i></i><span>추천 '+esc(S.rec)+'</span><i></i><span class="cm">댓글 <b>'+esc(S.cmt)+'</b></span></div>';
    if(S.showImg)h+='<div class="im">'+(S.img?'<img src="'+S.img+'">':'')+'</div>';
    h+='<div class="bd2">'+esc(S.body)+'</div>';
    if(S.note)h+='<div class="nt">'+esc(S.note)+'</div>';
    $('cap').innerHTML=h;
}
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  var F={t0:0,t1:1,t2:2,t3:3};
  function set(){[0,1,2,3].forEach(function(i){$('t'+i).value=S.tabs[i]});['gal','nick','title','date','view','rec','cmt','body','note'].forEach(function(k){$(k).value=S[k]});$('showImg').checked=!!S.showImg}
  function load(r){if(r)try{localStorage.removeItem(STORE)}catch(e){}try{var s=!r&&localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!Array.isArray(S.tabs))throw 0}catch(e){S=JSON.parse(JSON.stringify(DEF))}set();render()}
  [0,1,2,3].forEach(function(i){$('t'+i).addEventListener('input',function(){S.tabs[i]=this.value;persist();render()})});
  ['gal','nick','title','date','view','rec','cmt','body','note'].forEach(function(k){$(k).addEventListener('input',function(){S[k]=this.value;persist();render()})});
  $('showImg').addEventListener('change',function(){S.showImg=this.checked;persist();render()});
  $('img').addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){S.img=r.result;persist();render()};r.readAsDataURL(f)});
  $('reset').onclick=function(){load(true)};
  $('save').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){return html2canvas($('cap'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='community-post.png';document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t})
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  load(false);
})();
