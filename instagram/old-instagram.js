(function(){
var $=function(i){return document.getElementById(i)};
var DEF={user:"_username",ph:"317",fo:"1403",fg:"80",name:"[Name]™",bio:"[bio]",link:"[any link. ex.: twitter]",av:"",pics:[],
bar:true,tag:"NEWS",key:"속보",tick:"화제의 계정, 지금 가장 많이 구경한 프로필",live:true};
var D=JSON.parse(JSON.stringify(DEF));

function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
function bg(el,img){el.style.backgroundImage=img?"url("+img+")":"";el.classList[img?"remove":"add"]("ph")}

function render(){
  var m={vUser:"user",vPh:"ph",vFo:"fo",vFg:"fg",vName:"name",vBio:"bio",vLink:"link",vTag:"tag",vKey:"key",vTick:"tick"};
  for(var k in m)$(k).textContent=D[m[k]];
  $("vLive").style.display=D.live?"":"none";
  $("card").classList.toggle("nobar",!D.bar);
  bg($("vAv"),D.av);
  var g=$("vGrid");g.innerHTML="";
  var n=D.pics.length?D.pics:[0,0,0,0,0,0,0,0,0];
  n.slice(0,9).forEach(function(p){var i=document.createElement("i");bg(i,p||"");g.appendChild(i)});
}

[["iUser","user"],["iPh","ph"],["iFo","fo"],["iFg","fg"],["iName","name"],["iBio","bio"],["iLink","link"],["iTag","tag"],["iKey","key"],["iTick","tick"]].forEach(function(a){
  $(a[0]).oninput=function(){D[a[1]]=this.value;render()}});
$("iLive").onchange=function(){D.live=this.checked;render()};
$("iBar").onchange=function(){D.bar=this.checked;render()};
$("iAv").onchange=function(){rd(this.files[0],function(d){D.av=d;render()})};
$("iPics").onchange=function(){
  var fs=[].slice.call(this.files).slice(0,9),n=0;D.pics=[];
  fs.forEach(function(f,i){rd(f,function(d){D.pics[i]=d;if(++n===fs.length)render()})});
};
$("clrPics").onclick=function(){D.pics=[];$("iPics").value="";render()};

function fill(){
  [["iUser","user"],["iPh","ph"],["iFo","fo"],["iFg","fg"],["iName","name"],["iBio","bio"],["iLink","link"],["iTag","tag"],["iKey","key"],["iTick","tick"]].forEach(function(a){$(a[0]).value=D[a[1]]});
  $("iBar").checked=D.bar;$("iLive").checked=D.live;$("iAv").value="";$("iPics").value="";
  render();
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
    var a=document.createElement("a");a.download="old-instagram.png";a.href=c.toDataURL("image/png");a.click();
  }).catch(function(){f.style.zoom=z});
};

fill();fit();
})();
