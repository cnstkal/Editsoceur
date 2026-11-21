(function(){
var $=function(i){return document.getElementById(i)};
function u(s){return 'data:image/svg+xml;utf8,'+encodeURIComponent(s)}
var H='<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8e0fb"/><stop offset="1" stop-color="#eafaff"/></linearGradient></defs>';
var BG=u('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 480" preserveAspectRatio="xMidYMid slice">'+H+'<rect width="270" height="480" fill="url(#g)"/><g fill="#fff"><rect x="31" y="70" width="199" height="52" rx="26"/><circle cx="105" cy="75" r="43"/><circle cx="170" cy="92" r="30"/></g></svg>');
var C=u('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid slice">'+H+'<rect width="40" height="40" fill="url(#g)"/><g fill="#fff"><rect x="8" y="8" width="24" height="8" rx="4"/><circle cx="18" cy="9" r="6"/></g><path d="M0 26c10-6 22-6 40 2v12H0z" fill="#c2e083"/><path d="M0 32c14-6 28-5 40 0v8H0z" fill="#87a80a"/></svg>');
var IM=u('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 74" preserveAspectRatio="xMidYMid slice">'+H+'<rect width="84" height="74" fill="url(#g)"/><g fill="#fff"><rect x="22" y="12" width="40" height="14" rx="7"/><circle cx="37" cy="14" r="10"/></g><path d="M0 48c20-10 45-8 84 6v20H0z" fill="#c2e083"/><path d="M0 58c25-10 55-8 84 2v14H0z" fill="#87a80a"/></svg>');
var T1='add text here add text here add text here add text here add text here add .....',S;
function cm(t,r,img){return{n:'name',t:t,d:'09-00',l:'000',r:r,a:C,i:img||''}}
function init(){
S={cnt:'000 comments',ph:'Add comment...',bg:BG,me:C,M:[cm(T1,'View 000 replies'),cm(T1,'View 000 replies'),cm('add text here add text here add text here','',IM)]};
$('iCnt').value=S.cnt;$('iPh').value=S.ph;$('fBg').value='';$('fMe').value='';
ed();draw();
}
function e(t){return t.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var HT='<svg width="9" height="8" viewBox="0 0 9 8" fill="none" stroke="#8e8e8e" stroke-width=".9"><path d="M4.500 7.300S.7 5 .7 2.600A2 2 0 0 1 4.500 1.800 2 2 0 0 1 8.300 2.600C8.300 5 4.500 7.300 4.500 7.300z"/></svg>';
var DT='<svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="#8e8e8e" stroke-width=".9" stroke-linejoin="round"><path d="M1 1h2v4.500H1zM3 5.500 4.500 8c1 0 1-1 .8-2h2A1 1 0 0 0 8.200 4.800L7.600 2A1.500 1.500 0 0 0 6.200 1H3"/></svg>';
function draw(){
$('vCnt').textContent=S.cnt;$('vPh').textContent=S.ph;$('vBg').src=S.bg;$('vMe').src=S.me;
$('list').innerHTML=S.M.map(function(x){return '<div class="cm"><img src="'+x.a+'"><div class="bd"><b>'+e(x.n)+'</b><p>'+e(x.t)+'</p>'+(x.i?'<img class="im" src="'+x.i+'">':'')+'<div class="mt">'+e(x.d)+'<b>Reply</b><div class="r">'+HT+'<span>'+e(x.l)+'</span>'+DT+'</div></div>'+(x.r?'<div class="rpl"><i></i>'+e(x.r)+'</div>':'')+'</div></div>'}).join('');
}
function ed(){
$('ed').innerHTML=S.M.map(function(x,i){var d=' data-i="'+i+'" data-k=';return '<div class="it"><input class="a"'+d+'"n" value="'+e(x.n)+'" placeholder="이름"><input class="b"'+d+'"t" value="'+e(x.t)+'" placeholder="댓글"><input class="c"'+d+'"d" value="'+e(x.d)+'"><input class="c"'+d+'"l" value="'+e(x.l)+'"><input class="d"'+d+'"r" value="'+e(x.r)+'" placeholder="답글 문구(비우면 숨김)"><label class="fl">프로필<input type="file" accept="image/*" data-i="'+i+'" data-f="a"></label><label class="fl">사진<input type="file" accept="image/*" data-i="'+i+'" data-f="i"></label><button data-d="'+i+'" type="button">✕</button></div>'}).join('');
}
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
$('iCnt').oninput=function(){S.cnt=this.value;draw()};
$('iPh').oninput=function(){S.ph=this.value;draw()};
$('fBg').onchange=function(){rd(this.files[0],function(d){S.bg=d;draw()})};
$('fMe').onchange=function(){rd(this.files[0],function(d){S.me=d;draw()})};
$('add').onclick=function(){S.M.push(cm('add text here',''));ed();draw()};
$('ed').addEventListener('input',function(ev){var t=ev.target;if(t.dataset.k){S.M[t.dataset.i][t.dataset.k]=t.value;draw()}});
$('ed').addEventListener('change',function(ev){var t=ev.target;if(t.dataset.f)rd(t.files[0],function(d){S.M[t.dataset.i][t.dataset.f]=d;draw()})});
$('ed').addEventListener('click',function(ev){var d=ev.target.dataset.d;if(d!=null){S.M.splice(d,1);ed();draw()}});
$('reset').onclick=init;
$('save').onclick=function(){
html2canvas($('snap'),{backgroundColor:null,scale:4,useCORS:true}).then(function(c){
var a=document.createElement('a');a.download='tiktok-comments.png';a.href=c.toDataURL('image/png');a.click();
});
};
init();
})();
