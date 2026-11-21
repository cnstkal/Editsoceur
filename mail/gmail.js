(function(){
var $=function(i){return document.getElementById(i)};
var DEF={theme:"light",sub:"Subject subject subject subject subject",from:"sender's name",to:"to me",time:"now",av:"",
body:"add text here",tag:"NEWS",key:"속보",tick:"도착한 메일 한 통이 화제가 되고 있습니다",live:true};
var D=JSON.parse(JSON.stringify(DEF));

function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
function render(){
  var m={vSub:"sub",vFrom:"from",vTime:"time",vBody:"body",vTag:"tag",vKey:"key",vTick:"tick"};
  for(var k in m)$(k).textContent=D[m[k]];
  $("vTo").textContent=D.to+" ⌄";
  $("vLive").style.display=D.live?"":"none";
  $("card").classList.toggle("dark",D.theme==="dark");
  var a=$("vAv");a.style.backgroundImage=D.av?"url("+D.av+")":"";a.classList.toggle("ph",!D.av);
}
[["iSub","sub"],["iFrom","from"],["iTo","to"],["iTime","time"],["iBody","body"],["iTag","tag"],["iKey","key"],["iTick","tick"]].forEach(function(a){
  $(a[0]).oninput=function(){D[a[1]]=this.value;render()}});
$("iTheme").onchange=function(){D.theme=this.value;render()};
$("iLive").onchange=function(){D.live=this.checked;render()};
$("iAv").onchange=function(){rd(this.files[0],function(d){D.av=d;render()})};

function fill(){
  $("iTheme").value=D.theme;$("iSub").value=D.sub;$("iFrom").value=D.from;$("iTo").value=D.to;$("iTime").value=D.time;$("iBody").value=D.body;
  $("iTag").value=D.tag;$("iKey").value=D.key;$("iTick").value=D.tick;$("iLive").checked=D.live;$("iAv").value="";
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
    var a=document.createElement("a");a.download="gmail.png";a.href=c.toDataURL("image/png");a.click();
  }).catch(function(){f.style.zoom=z});
};

fill();fit();
})();
