(function(){
var $=function(i){return document.getElementById(i)};
var mk=function(){return{img:"",t:"Title Video\nTitle Video",s:"Aplikasi",d:"23.10",ago:"8 day ago"}};
var DEF={q:"text here",av:"",items:[mk(),mk(),mk(),mk(),mk()],
bar:true,tag:"NEWS",key:"속보",tick:"화제의 인물, 지금 구글 동영상에서 가장 많이 재생됐어요",live:true};
var D=JSON.parse(JSON.stringify(DEF));
var DOTS='<svg width="10" height="10" viewBox="0 0 24 24" fill="#555" class="dt"><circle cx="12" cy="4" r="2.200"/><circle cx="12" cy="12" r="2.200"/><circle cx="12" cy="20" r="2.200"/></svg>';

function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
function bg(el,img){el.style.backgroundImage=img?"url("+img+")":"";el.classList[img?"remove":"add"]("ph")}
function T(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}

function render(){
  var m={vQ:"q",vTag:"tag",vKey:"key",vTick:"tick"};for(var k in m)$(k).textContent=D[m[k]];
  $("vLive").style.display=D.live?"":"none";
  $("card").classList.toggle("nobar",!D.bar);
  bg($("vAv"),D.av);
  var ls=$("vList");ls.innerHTML="";
  D.items.forEach(function(it){
    var r=T("div","vr"),th=T("div","th ph");bg(th,it.img);
    if(it.d)th.appendChild(T("em","",it.d));
    var tx=T("div","vt"),inf=T("div");
    inf.appendChild(T("span","",it.s));inf.appendChild(T("span","",it.ago));
    tx.appendChild(T("p","",it.t));tx.appendChild(inf);
    r.appendChild(th);r.appendChild(tx);r.insertAdjacentHTML("beforeend",DOTS);
    ls.appendChild(r);
  });
}

[["iQ","q"],["iTag","tag"],["iKey","key"],["iTick","tick"]].forEach(function(a){
  $(a[0]).oninput=function(){D[a[1]]=this.value;render()}});
$("iLive").onchange=function(){D.live=this.checked;render()};
$("iBar").onchange=function(){D.bar=this.checked;render()};
$("iAv").onchange=function(){rd(this.files[0],function(d){D.av=d;render()})};

function items(){
  var box=$("iList");box.innerHTML="";
  D.items.forEach(function(it,i){
    var c=T("div","sc");
    c.innerHTML='<h3>영상 '+(i+1)+'<button type="button">삭제</button></h3><label>썸네일<input type="file" accept="image/*"></label><label>제목<textarea rows="2"></textarea></label><label>출처<input></label><label>길이 표시<input></label><label>날짜<input></label>';
    var n=c.querySelectorAll("input,textarea");
    n[1].value=it.t;n[2].value=it.s;n[3].value=it.d;n[4].value=it.ago;
    n[0].onchange=function(){rd(this.files[0],function(d){it.img=d;render()})};
    n[1].oninput=function(){it.t=this.value;render()};
    n[2].oninput=function(){it.s=this.value;render()};
    n[3].oninput=function(){it.d=this.value;render()};
    n[4].oninput=function(){it.ago=this.value;render()};
    c.querySelector("button").onclick=function(){D.items.splice(i,1);items();render()};
    box.appendChild(c);
  });
}
$("addI").onclick=function(){if(D.items.length>=5)return;D.items.push(mk());items();render()};

function fill(){
  $("iQ").value=D.q;$("iAv").value="";$("iBar").checked=D.bar;
  $("iTag").value=D.tag;$("iKey").value=D.key;$("iTick").value=D.tick;$("iLive").checked=D.live;
  items();render();
}
$("reset").onclick=function(){D=JSON.parse(JSON.stringify(DEF));fill()};

var tabs=document.querySelectorAll("#seg button"),pns=document.querySelectorAll(".pn");
tabs.forEach(function(b,i){b.onclick=function(){tabs.forEach(function(x,j){x.classList.toggle("on",i===j)});pns.forEach(function(p,j){p.hidden=i!==j})}});

$("pvBtn").onclick=function(){var on=document.body.classList.toggle("pvmode");this.textContent=on?"편집 모드":"미리보기 모드";fit()};
function fit(){var st=$("stage"),w=st.clientWidth,h=st.clientHeight;if(!w||!h)return;var f=$("fit");f.style.zoom=1;var fh=f.offsetHeight||640;var z=Math.min((h-48)/fh,(w-48)/360,1.6);f.style.zoom=Math.max(z,.2)}
window.addEventListener("resize",fit);

$("savePng").onclick=function(){
  var f=$("fit"),z=f.style.zoom;f.style.zoom=1;
  html2canvas($("cap"),{backgroundColor:null,scale:3,useCORS:true}).then(function(c){
    f.style.zoom=z;
    var a=document.createElement("a");a.download="google-video.png";a.href=c.toDataURL("image/png");a.click();
  }).catch(function(){f.style.zoom=z});
};

fill();fit();
})();
