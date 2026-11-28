(function(){
  var $=function(i){return document.getElementById(i)},STORE='editsoceur-community-post-v1',S;
  var DEF={tabs:['DC','마이너갤','미니갤','인물갤'],act:1,gal:'임시게시판',nick:'ㅇㅇ',title:'임시 제목입니다',date:'2026.01.01 12:00',view:'1234',rec:'56',fixed:'3',cmt:'8',body:'임시 내용입니다\n임시 내용입니다',note:'',imgs:[],comments:[
    {name:'감귤장수',ip:'121.88',time:'01.01 12:04',text:'오 이거 나만 궁금한 거 아니었네'},
    {reply:true,name:'ㅇㅇ',ip:'39.7',time:'01.01 12:06',to:'감귤장수(121.88)',text:'나도 어제부터 계속 찾아봤음'},
    {reply:true,name:'감귤장수',ip:'121.88',time:'01.01 12:09',to:'ㅇㅇ(39.7)',text:'뭐 좀 나온 거 있음? - dc App'},
    {reply:true,name:'새벽라면',ip:'218.51',time:'01.01 12:15',to:'감귤장수(121.88)',text:'작년에도 비슷한 글 올라왔었는데 그때는 결국 아무도 답을 못 내고 흐지부지됐던 걸로 기억함'},
    {name:'ㅇㅇ',ip:'175.223',time:'01.01 12:21',text:'ㄹㅇㅋㅋ'},
    {name:'붕어빵탐정',ip:'61.74',time:'01.01 12:33',text:'본문만 보면 좀 애매한데 사진 더 있으면 올려줘 봐\n그래야 뭐라 말을 하지'},
    {reply:true,name:'ㅇㅇ',ip:'211.36',time:'01.01 12:40',to:'붕어빵탐정(61.74)',text:'ㅇㄱㄹㅇ 후속글 기다린다'},
    {name:'겨울고양이',ip:'106.101',time:'01.01 12:52',text:'일단 개추 박고 감 - dc App'}
  ]};
  function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  var X='<span class="dc-x"><svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="#9a9ba5" stroke-width="1.3"><circle cx="9" cy="9" r="8.2"/><path d="M6 6l6 6M12 6l-6 6"/></svg></span>';
  function ico(w,h,body){return '<svg width="'+w+'" height="'+h+'" viewBox="0 0 24 24">'+body+'</svg>'}
  function lower(){
    var h='<div class="dc-vote"><div class="dc-num"><b>'+esc(S.rec)+'</b><span><svg width="13" height="13" viewBox="0 0 13 13"><rect x=".7" y=".7" width="10" height="10" rx="1.5" fill="#ddd" stroke="#888" stroke-width="1.4"/><path d="M3.5 3.5h4.5M3.5 6h3M3.5 8.5h2" stroke="#888"/><rect x="8.5" y="8.5" width="4" height="4" fill="#ffe62e" stroke="#777" stroke-width=".8"/></svg>'+esc(S.fixed)+'</span></div>'
      +'<div class="dc-star">'+ico(32,32,'<path fill="#fff" d="M12 1.8l3.1 6.5 7 .9-5.1 4.9 1.3 7-6.3-3.5-6.3 3.5 1.3-7L1.9 9.2l7-.9z"/>')+'<span>개념</span></div></div>';
    h+='<div class="dc-share">'
      +'<span><svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#9a9ba5"/><path d="M8 6h5.5a3 3 0 011.6 5.5A3.4 3.4 0 0113.8 18H8zm3 2.4v2.4h2a1.2 1.2 0 000-2.4zm0 4.6v2.6h2.4a1.3 1.3 0 000-2.6z" fill="#fff"/></svg>실베추</span>'
      +'<span>'+ico(24,24,'<path d="M6 19V5h12v13M2.500 9L6 4.500 9.500 9M14.500 15l3.500 4.500 3.500-4.500M6 19h6M12 5h6" fill="none" stroke="#3d8ef0" stroke-width="2.6"/>')+'펌 0</span>'
      +'<span>'+ico(22,22,'<path d="M18 5L6 12l12 7" fill="none" stroke="#9a9ba5" stroke-width="2.4"/><g fill="#9a9ba5"><circle cx="18" cy="5" r="3.6"/><circle cx="6" cy="12" r="3.6"/><circle cx="18" cy="19" r="3.6"/></g>')+'공유</span>'
      +'<span>'+ico(24,24,'<path fill="#9a9ba5" d="M1 5a2 2 0 012-2h6l3 3h9a2 2 0 012 2v11a2 2 0 01-2 2H3a2 2 0 01-2-2z"/><path d="M12 9v8M8 13h8" stroke="#fff" stroke-width="2.4"/>')+'스크랩</span>'
      +'<span>'+ico(24,24,'<path fill="#c72f2f" d="M7 19v-6a5 5 0 0110 0v6zM3 20h18v3H3zM11 1h2v5h-2zM3 5l1.600-1.600 3.500 3.500-1.600 1.600zM21 5l-1.600-1.600-3.500 3.500 1.600 1.600z"/>')+'신고</span></div>';
    h+='<div class="dc-btns"><span>목록보기</span><span class="on">글쓰기</span><span>수정</span><span>삭제</span></div>';
    h+='<div class="dc-ch"><div class="l">댓글 <em>['+esc(S.cmt)+']</em><svg width="18" height="18" viewBox="0 0 24 24"><path d="M19.500 12a7.500 7.500 0 11-3-6" fill="none" stroke="#8c8d96" stroke-width="3"/><path fill="#8c8d96" d="M14 1.500l8.500 1-2.500 8.500z"/></svg></div>'
      +'<div class="r"><span>본문</span><i></i><span>등록순<svg width="14" height="9" viewBox="0 0 14 9"><path d="M1 1l6 6 6-6" fill="none" stroke="#555" stroke-width="1.5"/></svg></span></div></div>';
    h+='<ul class="dc-cl">'+S.comments.map(function(c){
      return '<li'+(c.reply?' class="re"':'')+'><div class="who"><b>'+esc(c.name)+'</b>'+(c.ip?'<span>('+esc(c.ip)+')</span>':'')+'</div>'
        +'<p>'+(c.reply&&c.to?'<a>@'+esc(c.to)+'</a> ':'')+esc(c.text)+'</p><time>'+esc(c.time)+'</time>'+X+'</li>'}).join('')+'</ul>';
    return h;
  }
  function cmEditor(){
    $('cmList').innerHTML=S.comments.map(function(c,i){
      function f(k,l){return '<label>'+l+'<input data-i="'+i+'" data-f="'+k+'" value="'+esc(c[k])+'"></label>'}
      return '<h2>'+(c.reply?'답글 ':'댓글 ')+(i+1)+'</h2><div class="row">'+f('name','닉네임')+f('ip','IP(선택)')+'</div>'+f('time','작성일시')+(c.reply?f('to','@대상(선택)'):'')
        +'<label>내용<textarea data-i="'+i+'" data-f="text" rows="2">'+esc(c.text)+'</textarea></label>'
        +'<div class="ps-tg"><span>답글로 표시</span><label class="sw"><input type="checkbox" data-i="'+i+'" data-f="reply"'+(c.reply?' checked':'')+'><i></i></label></div>'
        +'<button type="button" class="ps-ghost" data-del="'+i+'">삭제</button>'}).join('');
  }
  function render(){
    var h='<div class="nv">'+S.tabs.map(function(t,i){return '<span'+(i===S.act?' class="on"':'')+'>'+esc(t)+'</span>'}).join('')+'<svg viewBox="0 0 24 24"><path d="M3 5h18L12 20z"/></svg></div>';
    h+='<div class="gh"><div class="g">'+esc(S.gal)+'<span class="m">m</span></div><div class="r"><span class="ic">i</span><i></i><span>설정<span class="n">N</span></span><i></i><span>연관</span><span class="wr">글쓰기</span></div></div>';
    h+='<div class="ti"><h1>'+esc(S.title)+'</h1><div class="au"><div class="l"><b>'+esc(S.nick)+'</b><i></i><span>'+esc(S.date)+'</span></div><div class="r"><span class="gl">갤로그가기</span></div></div></div>';
    h+='<div class="st"><span>조회수 '+esc(S.view)+'</span><i></i><span>추천 '+esc(S.rec)+'</span><i></i><span class="cm">댓글 <b>'+esc(S.cmt)+'</b></span></div>';
    if(S.imgs.length)h+='<div class="im">'+S.imgs.map(function(s){return '<img src="'+s+'">'}).join('')+'</div>';
    h+='<div class="bd2">'+esc(S.body)+'</div>';
    if(S.note)h+='<div class="nt">'+esc(S.note)+'</div>';
    $('cap').innerHTML=h+lower();
  }
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
  var F={t0:0,t1:1,t2:2,t3:3};
  function renderImgs(){$('imgList').innerHTML=S.imgs.map(function(s,i){return '<div class="ps-imgrow"><img src="'+s+'" alt=""><span>사진 '+(i+1)+'</span><button type="button" class="ps-ghost" data-img="'+i+'">삭제</button></div>'}).join('')}
  function set(){['gal','nick','title','date','view','rec','fixed','cmt','body','note'].forEach(function(k){$(k).value=S[k]});renderImgs()}
  function load(r){if(r)try{localStorage.removeItem(STORE)}catch(e){}try{var s=!r&&localStorage.getItem(STORE);S=s?JSON.parse(s):JSON.parse(JSON.stringify(DEF));if(!Array.isArray(S.tabs))throw 0;
    /* 이전에 저장한 내용에는 없는 항목을 기본값으로 채움 */
    Object.keys(DEF).forEach(function(k){if(S[k]==null)S[k]=JSON.parse(JSON.stringify(DEF[k]))});if(S.img&&!S.imgs.length)S.imgs=[S.img];delete S.img;delete S.showImg}catch(e){S=JSON.parse(JSON.stringify(DEF))}set();cmEditor();render()}
  /* 댓글을 추가·삭제하면 댓글 수도 같은 만큼 바뀜 */
  function count(d){var n=parseInt(S.cmt,10);if(!isNaN(n)){S.cmt=String(Math.max(0,n+d));$('cmt').value=S.cmt}}
  function onCm(e){var x=e.target,d=x.dataset;if(d.i==null)return;var c=S.comments[d.i];c[d.f]=x.type==='checkbox'?x.checked:x.value;persist();render();if(x.type==='checkbox')cmEditor()}
  $('cmList').addEventListener('input',onCm);
  $('cmList').addEventListener('click',function(e){var d=e.target.dataset.del;if(d==null)return;S.comments.splice(+d,1);count(-1);persist();cmEditor();render()});
  $('addCm').onclick=function(){S.comments.push({name:'ㅇㅇ',ip:'123.45',time:'01.01 13:00',text:'내용',to:'',reply:false});count(1);persist();cmEditor();render()};
  ['gal','nick','title','date','view','rec','fixed','cmt','body','note'].forEach(function(k){$(k).addEventListener('input',function(){S[k]=this.value;persist();render()})});
  $('img').addEventListener('change',function(){var inp=this,fs=[].slice.call(inp.files||[]);if(!fs.length)return;
    Promise.all(fs.map(function(f){return new Promise(function(ok){var r=new FileReader();r.onload=function(){ok(r.result)};r.readAsDataURL(f)})})).then(function(urls){S.imgs=S.imgs.concat(urls);inp.value='';persist();renderImgs();render()})});
  $('imgList').addEventListener('click',function(e){var d=e.target.dataset.img;if(d==null)return;S.imgs.splice(+d,1);persist();renderImgs();render()});
  $('reset').onclick=function(){load(true)};
  $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    (document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){return html2canvas($('cap'),{scale:4,useCORS:true,backgroundColor:'#fff',logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='community-post.png';document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t})
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
  load(false);
})();
