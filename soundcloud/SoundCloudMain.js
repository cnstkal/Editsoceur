/* ===== Source of the SoundCloud screen (edited live in the studio) ===== */
const SRC = {
html: `<div class="screen">
<div class="status"><span class="time">12:11</span>
  <span class="right"><svg width="20" height="15" viewBox="0 0 20 15" fill="#fff"><path d="M10 14l2.6-3a4 4 0 00-5.2 0zM3.5 7.3l1.6 1.8a7.5 7.5 0 019.8 0l1.6-1.8a10 10 0 00-13 0zM.5 4l1.6 1.8a12.5 12.5 0 0115.8 0L19.5 4a15 15 0 00-19 0z"/></svg><span class="batt">55</span></span></div>
<div class="search"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ddd" stroke-width="1.8"><circle cx="10.5" cy="10.5" r="7.5"/><path d="M16 16l5 5"/></svg>
  <input id="q" value="ateez" autocomplete="off"><button id="clear" class="clr">✕</button></div>
<nav class="cats"><a class="on">All</a><a>Tracks</a><a>Profiles</a><a>Playlists</a><a>Albums</a></nav>
<div class="scroll">
<section data-s="tracks"><h2>Top Result</h2>
  <div class="row"><div class="art drip">Drip</div><div class="info"><b>Drip</b><span class="art-n">ATEEZ</span><span class="meta">▶ 65.6K · 4:19</span></div><i class="dots">•••</i></div></section>
<section data-s="profiles"><h2>Profiles<a>See all</a></h2>
  <div class="profiles">
   <div class="p"><div class="av a1"></div><b>ATEEZ</b><button>Follow</button></div>
   <div class="p"><div class="av a2">ATEEZ</div><b>ATEEZ</b><button>Follow</button></div>
   <div class="p"><div class="av a3"></div><b>ATEEZ (에이...</b><button>Follow</button></div>
  </div></section>
<section data-s="tracks"><h2>Tracks<a>See all</a></h2>
  <div class="row"><div class="art gold"></div><div class="info"><b>Golden Hour: Pt.5 Ateez - BAD,...</b><span class="art-n">ATEEZ</span><span class="meta">▶ 262.2K · 14:58</span></div><i class="dots">•••</i></div></section>
<p id="empty" hidden>No results in this category.</p>
<div style="height:90px"></div></div>
<footer class="nav">
 <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z"/></svg>Home</div>
 <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="9" width="16" height="11" rx="1"/><path d="M6 5h12"/></svg><u class="dot"></u>Feed</div>
 <div class="sel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="10.5" cy="10.5" r="7"/><path d="M16 16l5 5"/></svg>Search</div>
 <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="4" height="16" rx="1"/><rect x="9" y="4" width="4" height="16" rx="1"/><path d="M15 6l4-1 3 14-4 1z"/></svg>Library</div>
 <div><svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 12h1v4H2zM5 10h1v6H5zM8 9h1v7H8zM11 8h1v8h-1zM13 8a5 5 0 019 3 3 3 0 01-1 5h-8z"/></svg>Upgrade</div>
</footer></div>`,
css: `*{box-sizing:border-box;margin:0}
html,body{height:100%;background:#121212;color:#fff;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;overflow:hidden}
.screen{position:relative;height:100%;display:flex;flex-direction:column}
.status{display:flex;justify-content:space-between;align-items:center;padding:16px 32px 0 36px;height:44px;font-weight:600;font-size:17px}
.right{display:flex;gap:7px;align-items:center}
.batt{background:#fff;color:#121212;border-radius:6px;font-size:13px;padding:0 5px;font-weight:700}
.search{display:flex;align-items:center;gap:12px;margin:14px 16px 0;height:36px;padding:0 10px;border-radius:18px;background:#303030}
.search input{flex:1;min-width:0;background:none;border:0;outline:0;color:#fff;font-size:17px}
.clr{width:20px;height:20px;border-radius:50%;border:0;background:#8a8a8a;color:#222;font-size:11px;font-weight:700}
.cats{display:flex;margin-top:32px;overflow-x:auto;scrollbar-width:none}
.cats a{padding:8px 0 10px;margin-right:0;width:auto;flex:none;font-weight:600;font-size:15px;color:#9a9a9a;border-bottom:2px solid transparent;padding-inline:24px}
.cats a.on{color:#fff;border-color:#fff}
.scroll{flex:1;overflow-y:auto;padding:0 16px}
h2{display:flex;justify-content:space-between;align-items:baseline;font-size:26px;margin:32px 0 20px}
h2 a{font-size:15px;color:#aaa;font-weight:600}
.row{display:flex;gap:14px;align-items:flex-start}
.art{width:64px;height:64px;border-radius:7px;flex:none;border:1px solid #333;display:flex;align-items:center;justify-content:center;font:italic 700 20px serif;background:#000;color:#555}
.gold{background:linear-gradient(135deg,#f7a1d6,#ff7fc4,#f5b6e0);border:0}
.info{flex:1;min-width:0;display:flex;flex-direction:column;gap:4px}
.info b{font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.art-n{font-size:17px;color:#aaa}.meta{font-size:15px;color:#999}
.dots{color:#aaa;font-size:10px;letter-spacing:2px;align-self:center;margin-right:6px;font-style:normal}
.profiles{display:flex;justify-content:space-between}
.p{width:104px;display:flex;flex-direction:column;align-items:center;gap:12px}
.av{width:104px;height:104px;border-radius:50%;border:2px solid #444;flex:none;display:flex;align-items:flex-end;justify-content:center;font:italic 800 18px sans-serif;color:#222;overflow:hidden}
.a1{background:#1c1c1c linear-gradient(160deg,#e0368a 0 10%,#1c1c1c 11% 60%,#3a8bff 61% 64%,#1c1c1c 65%)}
.a2{background:#14202a;color:#ddd}
.a3{background:linear-gradient(#7d84c4,#c9d3ea 55%,#3f58a8)}
.p b{font-size:16px;white-space:nowrap}
.p button{background:#fff;color:#000;border:0;border-radius:20px;width:72px;height:38px;font-weight:700;font-size:15px}
#empty{color:#888;margin-top:40px;text-align:center}
.nav{position:absolute;left:0;right:0;bottom:0;display:flex;background:#222;padding:12px 0 calc(12px + env(safe-area-inset-bottom));font-size:12px;color:#888;border-top:1px solid #1a1a1a}
.nav div{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;position:relative}
.nav svg{width:26px;height:26px}
.nav .sel{color:#fff}
.dot{position:absolute;top:-2px;left:55%;width:9px;height:9px;border-radius:50%;background:#ff4a00}`,
js: `var q=document.getElementById('q');
document.getElementById('clear').onclick=function(){q.value='';q.focus();};
var cats=document.querySelectorAll('.cats a');
cats.forEach(function(a){a.onclick=function(){
  cats.forEach(function(x){x.classList.remove('on')});a.classList.add('on');
  var t=a.textContent.toLowerCase(),n=0;
  document.querySelectorAll('section').forEach(function(s){
    var show=t=='all'||s.dataset.s==t;s.hidden=!show;if(show)n++;});
  document.getElementById('empty').hidden=n>0;
};});`
};

/* ===== Studio ===== */
const KEY='sc-studio-v1';
let cur='html', state=JSON.parse(localStorage.getItem(KEY)||'null')||Object.assign({},SRC);
const ed=document.getElementById('ed'), pv=document.getElementById('preview');
function doc(){return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>'+state.css+'</style></head><body>'+state.html+'<script>'+state.js+'<\/script></body></html>';}
function render(){pv.srcdoc=doc();}
function show(t){state[cur]=ed.value;cur=t;ed.value=state[t];
  document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t==t));}
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>show(b.dataset.t));
ed.addEventListener('input',()=>{state[cur]=ed.value;clearTimeout(ed.t);ed.t=setTimeout(render,300);});
ed.addEventListener('keydown',e=>{if(e.key=='Tab'){e.preventDefault();document.execCommand('insertText',false,'  ');}});
document.getElementById('apply').onclick=()=>{state[cur]=ed.value;render();};
document.getElementById('save').onclick=()=>{state[cur]=ed.value;localStorage.setItem(KEY,JSON.stringify(state));alert('Saved');};
document.getElementById('reset').onclick=()=>{state=Object.assign({},SRC);localStorage.removeItem(KEY);ed.value=state[cur];render();};
document.getElementById('editToggle').onclick=()=>document.getElementById('panel').classList.toggle('open');
document.getElementById('png').onclick=()=>{
  const d=pv.contentDocument.documentElement, w=pv.clientWidth, h=pv.clientHeight;
  html2canvas(pv.contentDocument.body,{scale:3,width:w,height:h,backgroundColor:'#121212',windowWidth:w,windowHeight:h}).then(c=>{
    const a=document.createElement('a');a.download='soundcloud-search.png';a.href=c.toDataURL('image/png');a.click();});
};
ed.value=state.html;render();
