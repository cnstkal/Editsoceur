(function(){
var $=function(i){return document.getElementById(i)};
var DEF={theme:"light",sub:"Subject subject subject subject subject",from:"sender's name",to:"to me",time:"now",av:"",
body:"add text here"};
var D=JSON.parse(JSON.stringify(DEF));

function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
function render(){
  var m={vSub:"sub",vFrom:"from",vTime:"time",vBody:"body"};
  for(var k in m)$(k).textContent=D[m[k]];
  $("vTo").textContent=D.to+" ⌄";
  $("card").classList.toggle("dark",D.theme==="dark");
  var a=$("vAv");a.style.backgroundImage=D.av?"url("+D.av+")":"";a.classList.toggle("ph",!D.av);
}
[["iSub","sub"],["iFrom","from"],["iTo","to"],["iTime","time"],["iBody","body"]].forEach(function(a){
  $(a[0]).oninput=function(){D[a[1]]=this.value;render()}});
$("iTheme").onchange=function(){D.theme=this.value;render()};
$("iAv").onchange=function(){rd(this.files[0],function(d){D.av=d;render()})};

function fill(){
  $("iTheme").value=D.theme;$("iSub").value=D.sub;$("iFrom").value=D.from;$("iTo").value=D.to;$("iTime").value=D.time;$("iBody").value=D.body;
  $("iAv").value="";
  render();
}
$("reset").onclick=function(){D=JSON.parse(JSON.stringify(DEF));fill()};

var tabs=document.querySelectorAll("#seg button"),pns=document.querySelectorAll(".pn");
tabs.forEach(function(b,i){b.onclick=function(){tabs.forEach(function(x,j){x.classList.toggle("on",i===j)});pns.forEach(function(p,j){p.hidden=i!==j})}});

$("pvBtn").onclick=function(){var on=document.body.classList.toggle("pvmode");this.textContent=on?"편집 모드":"미리보기 모드";fit()};
function fit(){var st=$("stage"),w=st.clientWidth,h=st.clientHeight;if(!w||!h)return;var fh=$("fit").offsetHeight||640;var z=Math.min((h-48)/fh,(w-48)/360,1.6);$("fit").style.zoom=Math.max(z,.2)}
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
