/* ===== Source of the SoundCloud playback screen ===== */
const SRC = {
html: `<div class="screen">
<div class="status"><span class="time">12:12</span>
  <span class="right"><svg width="20" height="15" viewBox="0 0 20 15" fill="#fff"><path d="M10 14l2.6-3a4 4 0 00-5.2 0zM3.5 7.3l1.6 1.8a7.5 7.5 0 019.8 0l1.6-1.8a10 10 0 00-13 0zM.5 4l1.6 1.8a12.5 12.5 0 0115.8 0L19.5 4a15 15 0 00-19 0z"/></svg><span class="batt">55</span></span></div>

<div class="player" id="player">
 <div class="cover"><img id="pcover" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 800' preserveAspectRatio='xMidYMid slice'><rect width='400' height='800' fill='%23f08ad8'/><g fill='%23d9b9d6' opacity='.75'><path d='M0 200C80 120 140 260 220 180S340 120 400 220V300C300 260 220 380 120 330S40 380 0 330z'/><path d='M40 520C120 420 200 560 280 470S380 440 400 520V640C300 600 220 700 120 660S40 700 0 640z'/><path d='M0 60C100 20 200 90 300 40L400 70V120C280 100 160 160 0 120z'/></g><text x='215' y='85' font-size='46' font-weight='700' fill='%23ffffff' opacity='.5' font-family='sans-serif'>Part.5</text></svg>" alt="cover">
  <div class="tinfo"><span id="ptitle">Golden Hour: Pt.5 Ateez - BAD,</span><span id="psub">MAMACITA, TOXIN, Fallin’, Body</span><span id="part" class="gray">ATEEZ</span>
   <span class="behind"><svg width="16" height="16" viewBox="0 0 16 16" fill="#fff"><path d="M2 6h1.5v4H2zM5 3h1.5v10H5zM8 5h1.5v6H8zM11 2h1.5v12H11z"/></svg>Behind this track</span></div>
  <button class="down" id="pdown"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M5 9l7 7 7-7"/></svg></button>
  <svg class="ico i1" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-6 7-6s7 2 7 6M19 6v6M16 9h6"/></svg>
  <svg class="ico i2" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><rect x="2" y="5" width="12" height="9" rx="1"/><path d="M6 19h4M8 14v5"/><rect x="16" y="3" width="6" height="17" rx="1.5"/></svg>
  <div class="react"><i style="left:50px;top:6px">🥺</i><i style="left:80px;top:0">🔥</i><i style="left:30px;top:40px">👏</i><i style="left:100px;top:40px">🥺</i><i style="left:75px;top:60px">🔥</i><i style="left:60px;top:105px">🔥</i><i style="left:150px;top:100px">🔥</i></div>
  <div class="wave" id="wave"></div>
  <div class="ptime"><span id="pcur">0:03</span><u></u><span id="pdur" class="gray">14:58</span></div>
  <div class="comment"><input id="cin" placeholder="Comment..."><button data-e="🔥">🔥</button><button data-e="👏">👏</button><button data-e="🥺">🥺</button></div>
 </div>
 <div class="acts"><span>♡ <b id="plikes">4184</b></span><span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><path d="M3 4h18v13H10l-5 4v-4H3z"/></svg> <b id="pcmts">78</b></span>
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><path d="M12 15V3M8 7l4-4 4 4M5 11v10h14V11"/></svg>
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><path d="M3 6h14M3 12h14M3 18h8M15 14l6 4-6 4z"/></svg>
  <span class="m">•••</span></div>
</div>
</div>`,
css: `*{box-sizing:border-box;margin:0}
html,body{height:100%;background:#121212;color:#fff;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;overflow:hidden}
.screen{position:relative;height:100%;display:flex;flex-direction:column}
.status{display:flex;justify-content:space-between;align-items:center;padding:16px 32px 0 36px;height:44px;font-weight:600;font-size:17px}
.right{display:flex;gap:7px;align-items:center}
.batt{background:#fff;color:#121212;border-radius:6px;font-size:13px;padding:0 5px;font-weight:700}

.player{position:absolute;left:0;right:0;top:44px;bottom:0;background:#121212;display:flex;flex-direction:column;z-index:20}
.player[hidden]{display:none}
.cover{position:relative;flex:1;border-radius:28px;overflow:hidden;background:#222}
.cover>img{width:100%;height:100%;object-fit:cover;display:block}
.tinfo{position:absolute;left:16px;top:16px;display:flex;flex-direction:column;align-items:flex-start;max-width:78%}
.tinfo span{background:#000;color:#fff;font-weight:700;font-size:16px;line-height:26px;padding:0 5px}
.tinfo .gray{color:#bbb}
.tinfo .behind{margin-top:2px;font-weight:500;font-size:15px;display:flex;gap:8px;align-items:center;padding:0 5px 0 8px;line-height:24px}
.down{position:absolute;right:16px;top:16px;width:40px;height:40px;border-radius:50%;background:#000;border:0;display:flex;align-items:center;justify-content:center}
.ico{position:absolute;right:20px;width:24px;height:24px}
.i1{top:62px}.i2{top:100px}
.react{position:absolute;left:46%;bottom:36%;width:140px;height:130px;font-size:12px;opacity:.5}
.react i{position:absolute;font-style:normal}
.wave{position:absolute;left:51%;right:0;bottom:150px;height:140px;overflow:hidden}
.wave svg{width:100%;height:100%}
.ptime{position:absolute;left:41%;bottom:174px;background:#000;color:#fff;font-size:12px;font-weight:600;display:flex;align-items:center;gap:6px;padding:4px 6px;line-height:14px}
.ptime u{width:1px;height:14px;background:#777}.ptime .gray{color:#aaa}
.comment{position:absolute;left:16px;right:16px;bottom:16px;height:46px;border-radius:23px;background:rgba(80,50,75,.8);border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;padding:0 12px 0 16px;gap:8px}
.comment input{flex:1;min-width:0;background:none;border:0;outline:0;color:#fff;font-size:15px}
.comment input::placeholder{color:#d9bfd3}
.comment button{background:none;border:0;font-size:22px;padding:0 4px}
.acts{height:84px;display:flex;justify-content:space-around;align-items:center;padding:0 14px;color:#fff}
.acts span{display:flex;align-items:center;gap:6px;font-size:22px}
.acts b{font-size:17px}.acts .m{font-size:12px;letter-spacing:2px}
.row[data-title]{cursor:pointer}`,
js: `
var COVERS={pink:"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 800' preserveAspectRatio='xMidYMid slice'><rect width='400' height='800' fill='%23f08ad8'/><g fill='%23d9b9d6' opacity='.75'><path d='M0 200C80 120 140 260 220 180S340 120 400 220V300C300 260 220 380 120 330S40 380 0 330z'/><path d='M40 520C120 420 200 560 280 470S380 440 400 520V640C300 600 220 700 120 660S40 700 0 640z'/><path d='M0 60C100 20 200 90 300 40L400 70V120C280 100 160 160 0 120z'/></g><text x='215' y='85' font-size='46' font-weight='700' fill='%23ffffff' opacity='.5' font-family='sans-serif'>Part.5</text></svg>",black:"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 800' preserveAspectRatio='xMidYMid slice'><rect width='400' height='800' fill='%23050505'/><text x='200' y='400' font-size='90' font-style='italic' font-weight='700' fill='%23444' text-anchor='middle' font-family='serif'>Drip</text></svg>"};
function buildWave(){
  var n=62,x=0,r=7,bars='',rf='',mid=70;
  for(var i=0;i<n;i++){r=(r*9301+49297)%233280;var bh=(0.35+0.65*r/233280)*62;
    bars+='<rect x="'+x+'" y="'+(mid-bh)+'" width="2.6" height="'+bh+'" fill="#fff" opacity=".9"/>';
    rf+='<rect x="'+x+'" y="'+(mid+3)+'" width="2.6" height="'+(bh*0.75)+'" fill="#fff" opacity=".45"/>';x+=4.2;}
  document.getElementById('wave').innerHTML='<svg viewBox="0 0 260 140" preserveAspectRatio="none">'+bars+'<rect x="0" y="'+mid+'" width="260" height="1" fill="#fff" opacity=".6"/>'+rf+'</svg>';
}
buildWave();
var cin=document.getElementById('cin');
document.querySelectorAll('.comment button').forEach(function(b){b.onclick=function(){cin.value+=b.dataset.e;cin.focus();};});
cin.onkeydown=function(e){if(e.key=='Enter'&&cin.value.trim()){var c=document.getElementById('pcmts');c.textContent=+c.textContent+1;cin.value='';}};`
};

/* ===== Studio ===== */
const KEY='sc-playback-v1';
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
