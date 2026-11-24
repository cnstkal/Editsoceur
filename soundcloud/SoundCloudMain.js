(function(){
S.png='soundcloud-search.png';
S.init=function(){S.D={q:'ateez',
  top:{t:'Drip',a:'ATEEZ',p:'65.6K',d:'4:19',img:''},
  pf:[{n:'ATEEZ',img:''}],
  tr:[{t:'Golden Hour: Pt.5 Ateez - BAD,...',a:'ATEEZ',p:'262.2K',d:'14:58',img:''}]}};
S.init();
S.css='*{box-sizing:border-box;margin:0;letter-spacing:-.02em}button,input{font-family:inherit}html,body{height:100%;background:#121212;color:#fff;font-family:Pretendard,-apple-system,"Apple SD Gothic Neo",Arial,sans-serif;overflow:hidden}'+
'.screen{position:relative;height:100%;display:flex;flex-direction:column;padding-top:24px}'+
'.search{display:flex;align-items:center;gap:12px;margin:14px 16px 0;height:36px;padding:0 10px;border-radius:18px;background:#303030}'+
'.search input{flex:1;min-width:0;background:none;border:0;outline:0;color:#fff;font:inherit;font-size:17px}'+
'.clr{width:20px;height:20px;border-radius:50%;border:0;background:#8a8a8a;color:#222;font-size:11px;font-weight:700}'+
'.cats{display:flex;margin-top:28px;overflow-x:auto;scrollbar-width:none}'+
'.cats a{padding:8px 24px 10px;flex:none;font-weight:600;font-size:15px;color:#9a9a9a;border-bottom:2px solid transparent}.cats a.on{color:#fff;border-color:#fff}'+
'.scroll{flex:1;overflow-y:auto;padding:0 16px;scrollbar-width:none}'+
'h2{display:flex;justify-content:space-between;align-items:baseline;font-size:26px;margin:28px 0 18px}h2 a{font-size:15px;color:#aaa;font-weight:600}'+
'.row{display:flex;gap:14px;align-items:flex-start;margin-bottom:14px}'+
'.art{width:64px;height:64px;border-radius:7px;flex:none;border:1px solid #333;background:#000;overflow:hidden}.art-img{display:block;width:100%;height:100%;object-fit:contain;image-rendering:auto}'+
'.gold{background:linear-gradient(135deg,#f7a1d6,#ff7fc4,#f5b6e0);border:0}.gold .art-img{object-fit:contain}'+
'.info{flex:1;min-width:0;display:flex;flex-direction:column;gap:4px}.info b{font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'.art-n{font-size:17px;color:#aaa}.meta{font-size:15px;color:#999}.dots{color:#aaa;font-size:10px;letter-spacing:2px;align-self:center;margin-right:6px;font-style:normal}'+
'.profiles{display:flex;justify-content:space-between;gap:8px}.p{width:104px;display:flex;flex-direction:column;align-items:center;gap:12px}'+
'.av{width:104px;height:104px;border-radius:50%;border:2px solid #444;flex:none;overflow:hidden}.av-img{display:block;width:100%;height:100%;object-fit:cover;image-rendering:auto}'+
'.a1{background-color:#1c1c1c;background-image:linear-gradient(160deg,#e0368a 0 10%,#1c1c1c 11% 60%,#3a8bff 61% 64%,#1c1c1c 65%)}.a2{background-color:#14202a}.a3{background-image:linear-gradient(#7d84c4,#c9d3ea 55%,#3f58a8)}'+
'.p b{font-size:16px;white-space:nowrap;max-width:104px;overflow:hidden;text-overflow:ellipsis}'+
'.p button{background:#fff;color:#000;border:0;border-radius:20px;width:72px;height:38px;font-weight:700;font-size:15px}#empty{color:#888;margin-top:40px;text-align:center}'+
'.nav{position:absolute;left:0;right:0;bottom:0;display:flex;background:#222;padding:12px 0 calc(12px + env(safe-area-inset-bottom));font-size:12px;color:#888;border-top:1px solid #1a1a1a}'+
'.nav div{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;position:relative}.nav svg{width:26px;height:26px}.nav .sel{color:#fff}'+
'.dot{position:absolute;top:-2px;left:55%;width:9px;height:9px;border-radius:50%;background:#ff4a00}';
S.js="var q=document.getElementById('q');document.getElementById('clear').onclick=function(){q.value='';q.focus();};"+
"var cats=document.querySelectorAll('.cats a');cats.forEach(function(a){a.onclick=function(){cats.forEach(function(x){x.classList.remove('on')});a.classList.add('on');"+
"var t=a.textContent.toLowerCase(),n=0;document.querySelectorAll('section').forEach(function(s){var show=t=='all'||s.dataset.s==t;s.hidden=!show;if(show)n++;});document.getElementById('empty').hidden=n>0;};});";
var e=S.esc;
function photo(i,cls,alt){return i?'<img class="'+cls+'" src="'+e(i)+'" alt="'+e(alt||'')+'">':''}
function row(x,c){return '<div class="row"><div class="art '+c+'">'+photo(x.img,'art-img',x.t)+'</div><div class="info"><b>'+e(x.t)+'</b><span class="art-n">'+e(x.a)+'</span><span class="meta">▶ '+e(x.p)+' · '+e(x.d)+'</span></div><i class="dots">•••</i></div>'}
S.view=function(){var D=S.D,cl=['a1','a2','a3'];
 return '<div class="screen"><div class="search"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ddd" stroke-width="1.8"><circle cx="10.5" cy="10.5" r="7.5"/><path d="M16 16l5 5"/></svg><input id="q" value="'+e(D.q)+'" autocomplete="off"><button id="clear" class="clr">✕</button></div>'+
 '<nav class="cats"><a class="on">All</a><a>Tracks</a><a>Profiles</a><a>Playlists</a><a>Albums</a></nav><div class="scroll">'+
 '<section data-s="tracks"><h2>Top Result</h2>'+row(D.top,'')+'</section>'+
 '<section data-s="profiles"><h2>Profiles'+(D.pf.length>=3?'<a>See all</a>':'')+'</h2><div class="profiles">'+D.pf.map(function(p,i){return '<div class="p"><div class="av '+cl[i]+'">'+photo(p.img,'av-img',p.n)+'</div><b>'+e(p.n)+'</b><button>Follow</button></div>'}).join('')+'</div></section>'+
 (D.tr.length?'<section data-s="tracks"><h2>Tracks<a>See all</a></h2>'+D.tr.map(function(x){return row(x,'gold')}).join('')+'</section>':'')+
 '<p id="empty" hidden>No results in this category.</p><div style="height:90px"></div></div>'+
 '<footer class="nav"><div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z"/></svg>Home</div>'+
 '<div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="9" width="16" height="11" rx="1"/><path d="M6 5h12"/></svg><u class="dot"></u>Feed</div>'+
 '<div class="sel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="10.5" cy="10.5" r="7"/><path d="M16 16l5 5"/></svg>Search</div>'+
 '<div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="4" height="16" rx="1"/><rect x="9" y="4" width="4" height="16" rx="1"/><path d="M15 6l4-1 3 14-4 1z"/></svg>Library</div>'+
 '<div><svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 12h1v4H2zM5 10h1v6H5zM8 9h1v7H8zM11 8h1v8h-1zM13 8a5 5 0 019 3 3 3 0 01-1 5h-8z"/></svg>Upgrade</div></footer></div>'};
function song(el,o){S.text(el,'곡 제목',o,'t');S.text(el,'아티스트',o,'a');S.text(el,'재생수',o,'p');S.text(el,'시간',o,'d');S.file(el,'앨범 커버',o,'img')}
S.panels=[
 {t:'기본',build:function(el){S.grp(el,'검색창');S.text(el,'검색창 문구',S.D,'q');S.grp(el,'Top Result');song(el,S.D.top)}},
 {t:'프로필',build:function(el){
   S.D.pf.forEach(function(p,i){
     S.grp(el,'프로필 '+(i+1));
     S.text(el,'이름',p,'n');
     S.file(el,'프로필 사진',p,'img');
     if(S.D.pf.length>1) S.btn(el,'프로필 삭제',function(){
       S.D.pf.splice(i,1);S.build();S.render();
     });
   });
   if(S.D.pf.length<3) S.btn(el,'+ 프로필 추가',function(){
     S.D.pf.push({n:'새 프로필',img:''});S.build();S.render();
   },'add');
 }},
 {t:'트랙',build:function(el){S.D.tr.forEach(function(x,i){S.grp(el,'트랙 '+(i+1));song(el,x);
   S.btn(el,'이 곡 삭제',function(){S.D.tr.splice(i,1);S.build();S.render()})});
   S.btn(el,'+ 곡 추가',function(){S.D.tr.push({t:'새 곡',a:'ATEEZ',p:'0',d:'3:00',img:''});S.build();S.render()},'add')}}
];
S.start();
})();
