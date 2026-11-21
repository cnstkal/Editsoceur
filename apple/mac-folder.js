(function(){
var $=function(i){return document.getElementById(i)};
var DEF={title:"Desktop",fav:"Downloads",ic:"Documents,Desktop,Shared",stat:"4 items, 1.02 TB available on iCloud",color:"#72cffa",
folders:["01 Projects","02 Areas","03 Resources","04 Archive"],
bar:true,tag:"NEWS",key:"속보",tick:"폴더 정리 끝, 지금 가장 화제의 바탕화면",live:true};
var D=JSON.parse(JSON.stringify(DEF));
var NS="http://www.w3.org/2000/svg";

function dk(h,f){var n=parseInt(h.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;
  var m=function(v){return Math.round(v*(1-f))};return"rgb("+m(r)+","+m(g)+","+m(b)+")"}
function T(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}
function folder(){
  var s='<svg viewBox="0 0 72 56"><path d="M4 6a4 4 0 0 1 4-4h14l6 5h36a4 4 0 0 1 4 4v38a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" fill="'+dk(D.color,.28)+'"/><rect x="4" y="13" width="64" height="40" rx="4" fill="'+D.color+'"/></svg>';
  return s}
function side(){
  var box=$("sdA");box.innerHTML="";
  var ic='<svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="#777" stroke-width="1.100"><rect x="1.500" y="1" width="9" height="10" rx="1.500"/></svg>';
  function grp(h,arr){
    box.appendChild(T("h4","",h));
    arr.split(",").forEach(function(n){n=n.trim();if(!n)return;
      var d=document.createElement("div");if(n===D.title)d.className="on";
      d.innerHTML=ic;d.appendChild(T("span","",n));box.appendChild(d)});
  }
  grp("Favorites",D.fav);grp("iCloud",D.ic);box.appendChild(T("h4","","Locations"));
}
function render(){
  var m={vTitle:"title",vPath:"title",vStat:"stat",vTag:"tag",vKey:"key",vTick:"tick"};
  for(var k in m)$(k).textContent=D[m[k]];
  $("vLive").style.display=D.live?"":"none";
  $("card").classList.toggle("nobar",!D.bar);
  side();
  var f=$("vFolders");f.innerHTML="";
  D.folders.forEach(function(n){var d=T("div","fd");d.innerHTML=folder();d.appendChild(T("span","",n));f.appendChild(d)});
}

[["iTitle","title"],["iFav","fav"],["iIc","ic"],["iStat","stat"],["iColor","color"],["iTag","tag"],["iKey","key"],["iTick","tick"]].forEach(function(a){
  $(a[0]).oninput=function(){D[a[1]]=this.value;render()}});
$("iLive").onchange=function(){D.live=this.checked;render()};
$("iBar").onchange=function(){D.bar=this.checked;render()};

function items(){
  var box=$("iList");box.innerHTML="";
  D.folders.forEach(function(n,i){
    var c=T("div","sc");
    c.innerHTML='<h3>폴더 '+(i+1)+'<button type="button">삭제</button></h3><label>이름<input></label>';
    var inp=c.querySelector("input");inp.value=n;
    inp.oninput=function(){D.folders[i]=this.value;render()};
    c.querySelector("button").onclick=function(){D.folders.splice(i,1);items();render()};
    box.appendChild(c);
  });
}
$("addF").onclick=function(){if(D.folders.length>=8)return;D.folders.push("New Folder");items();render()};

function fill(){
  [["iTitle","title"],["iFav","fav"],["iIc","ic"],["iStat","stat"],["iColor","color"],["iTag","tag"],["iKey","key"],["iTick","tick"]].forEach(function(a){$(a[0]).value=D[a[1]]});
  $("iBar").checked=D.bar;$("iLive").checked=D.live;
  items();render();
}
$("reset").onclick=function(){D=JSON.parse(JSON.stringify(DEF));fill()};

var tabs=document.querySelectorAll("#seg button"),pns=document.querySelectorAll(".pn");
tabs.forEach(function(b,i){b.onclick=function(){tabs.forEach(function(x,j){x.classList.toggle("on",i===j)});pns.forEach(function(p,j){p.hidden=i!==j})}});

$("pvBtn").onclick=function(){var on=document.body.classList.toggle("pvmode");this.textContent=on?"편집 모드":"미리보기 모드";fit()};
function fit(){var w=$("stage").clientWidth;$("fit").style.zoom=w&&w<360?w/360:1}
window.addEventListener("resize",fit);

$("savePng").onclick=function(){
  var f=$("fit"),z=f.style.zoom;f.style.zoom=1;
  html2canvas($("cap"),{backgroundColor:null,scale:3,useCORS:true}).then(function(c){
    f.style.zoom=z;
    var a=document.createElement("a");a.download="mac-folder.png";a.href=c.toDataURL("image/png");a.click();
  }).catch(function(){f.style.zoom=z});
};

fill();fit();
})();
