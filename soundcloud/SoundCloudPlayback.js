(function(){
S.png='soundcloud-playback.png';

S.init=function(){S.D={t:'Golden Hour: Pt.5 Ateez - BAD,',s:'MAMACITA, TOXIN, Fallin’, Body',a:'ATEEZ',likes:'4184',cmts:'78',img:''}};
S.init();
S.css='*{box-sizing:border-box;margin:0;letter-spacing:-.02em}button,input{font-family:inherit}html,body{height:100%;background:transparent;color:#fff;font-family:Pretendard,-apple-system,"Apple SD Gothic Neo",Arial,sans-serif;overflow:hidden}'+
'.screen{position:relative;height:100%;display:flex;flex-direction:column;background:transparent}.player{flex:1;display:flex;flex-direction:column;min-height:0;background:transparent}'+
'.cover{position:relative;flex:1;border-radius:0 0 28px 28px;overflow:hidden;background:transparent}.cover>img{width:100%;height:100%;object-fit:cover;display:block}'+
'.tinfo{position:absolute;left:16px;top:36px;display:flex;flex-direction:column;align-items:flex-start;max-width:78%}'+
'.tinfo span{background:#000;color:#fff;font-weight:700;font-size:16px;line-height:26px;padding:0 5px}.tinfo .gray{color:#bbb}'+
'.tinfo .behind{margin-top:2px;font-weight:500;font-size:15px;display:flex;gap:8px;align-items:center;padding:0 5px 0 8px;line-height:24px}'+
'.down{position:absolute;right:16px;top:36px;width:40px;height:40px;border-radius:50%;background:#000;border:0;display:flex;align-items:center;justify-content:center}'+
'.ico{position:absolute;right:20px;width:24px;height:24px}.i1{top:82px}.i2{top:120px}'+
'.acts{height:84px;display:flex;justify-content:space-around;align-items:center;padding:0 14px}.acts span{display:flex;align-items:center;gap:6px;font-size:22px}.acts b{font-size:17px}.acts .m{font-size:12px;letter-spacing:2px}';
S.js="";
var e=S.esc;
S.view=function(){var D=S.D,bg=D.bgMode==='green'?'#00ff00':'transparent';
 return '<div class="screen"><div class="player"><div class="cover" style="background:'+bg+'">'+(D.img?'<img src="'+D.img+'" alt="cover">':'')+
 '<div class="tinfo"><span>'+e(D.t)+'</span><span>'+e(D.s)+'</span><span class="gray">'+e(D.a)+'</span><span class="behind"><svg width="16" height="16" viewBox="0 0 16 16" fill="#fff"><path d="M2 6h1.5v4H2zM5 3h1.5v10H5zM8 5h1.5v6H8zM11 2h1.5v12H11z"/></svg>Behind this track</span></div>'+
 '<button class="down"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M5 9l7 7 7-7"/></svg></button>'+
 '<svg class="ico i1" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-6 7-6s7 2 7 6M19 6v6M16 9h6"/></svg>'+
 '<svg class="ico i2" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><rect x="2" y="5" width="12" height="9" rx="1"/><path d="M6 19h4M8 14v5"/><rect x="16" y="3" width="6" height="17" rx="1.5"/></svg>'+
 '</div>'+
 '<div class="acts"><span>♡ <b>'+e(D.likes)+'</b></span><span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><path d="M3 4h18v13H10l-5 4v-4H3z"/></svg> <b>'+e(D.cmts)+'</b></span>'+
 '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><path d="M12 15V3M8 7l4-4 4 4M5 11v10h14V11"/></svg>'+
 '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><path d="M3 6h14M3 12h14M3 18h8M15 14l6 4-6 4z"/></svg><span class="m">•••</span></div></div></div>'};
S.panels=[{t:'기본',build:function(el){var D=S.D;S.grp(el,'배경 설정');var sel=document.createElement('select');[['green','그린스크린'],['transparent','투명']].forEach(function(v){var o=document.createElement('option');o.value=v[0];o.textContent=v[1];sel.appendChild(o)});sel.value=D.bgMode;sel.onchange=function(){D.bgMode=sel.value;S.render()};S.row(el,'배경',sel);S.grp(el,'곡 정보');S.text(el,'곡 제목',D,'t');S.text(el,'부제목',D,'s');S.text(el,'아티스트',D,'a');S.file(el,'앨범 커버',D,'img');
 S.grp(el,'재생 정보');S.text(el,'좋아요 수',D,'likes');S.text(el,'댓글 수',D,'cmts')}}];
S.start();
})();
