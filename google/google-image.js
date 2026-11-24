(function(){
var $=function(i){return document.getElementById(i)};
var RT=[1.25,1.25,.68,1.5,.68,1];
var mk=function(){return{img:"",t:"add text here",s:"add text here"}};
var DEF={q:"text here",chips:"Overview,Songs,Albums,Movies and TV",av:"",items:[mk(),mk(),mk(),mk(),mk()],
bar:true,tag:"NEWS",key:"속보",tick:"화제의 인물, 지금 구글 이미지에서 가장 많이 검색됐어요",live:true};
var D=JSON.parse(JSON.stringify(DEF));

function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
function bg(el,img){el.style.backgroundImage=img?"url("+img+")":"";el.classList[img?"remove":"add"]("ph")}
function T(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}

function render(){
  var m={vQ:"q"};for(var k in m)$(k).textContent=D[m[k]];
  bg($("vAv"),D.av);
  var ch=$("vChips");ch.innerHTML="";
  D.chips.split(",").forEach(function(c){c=c.trim();if(c)ch.appendChild(T("span","",c))});
  $("c0").innerHTML="";$("c1").innerHTML="";
  D.items.forEach(function(it,i){
    var w=T("div","it"),im;
    if(it.img){im=T("img","im");im.src=it.img;im.alt=""}
    else{im=T("div","im ph");im.style.aspectRatio="1/"+RT[i%RT.length]}
    w.appendChild(im);w.appendChild(T("b","",it.t));w.appendChild(T("span","",it.s));
    $("c"+(i%2)).appendChild(w);
  });
}

[["iQ","q"],["iChips","chips"]].forEach(function(a){
  $(a[0]).oninput=function(){D[a[1]]=this.value;render()}});
$("iAv").onchange=function(){rd(this.files[0],function(d){D.av=d;render()})};

function items(){
  var box=$("iList");box.innerHTML="";
  D.items.forEach(function(it,i){
    var c=T("div","sc");
    c.innerHTML='<h3>이미지 '+(i+1)+'<button type="button">삭제</button></h3><label>사진<input type="file" accept="image/*"></label><label>제목<input></label><label>출처<input></label>';
    var n=c.querySelectorAll("input");
    n[1].value=it.t;n[2].value=it.s;
    n[0].onchange=function(){rd(this.files[0],function(d){it.img=d;render()})};
    n[1].oninput=function(){it.t=this.value;render()};
    n[2].oninput=function(){it.s=this.value;render()};
    c.querySelector("button").onclick=function(){D.items.splice(i,1);items();render()};
    box.appendChild(c);
  });
}
$("addI").onclick=function(){if(D.items.length>=6)return;D.items.push(mk());items();render()};

function fill(){
  $("iQ").value=D.q;$("iChips").value=D.chips;$("iAv").value="";
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
  html2canvas($("cap"),{backgroundColor:null,scale:4,useCORS:true}).then(function(c){
    f.style.zoom=z;
    var a=document.createElement("a");a.download="google-image.png";a.href=c.toDataURL("image/png");a.click();
  }).catch(function(){f.style.zoom=z});
};

fill();fit();
})();
