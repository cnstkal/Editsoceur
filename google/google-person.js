(function(){
var $=function(i){return document.getElementById(i)};
var DEF={q:"Who is Name?",name:"Name",desc:"Describe",av:"",photos:[],age:"00 years old",birth:"00 October 2000",songs:["","",""],
ov:"add text here add text here add text here add text here add text here add text here add text here add text here",
tag:"NEWS",key:"속보",tick:"화제의 인물, 지금 구글에서 가장 많이 검색된 이름",live:true};
var D=JSON.parse(JSON.stringify(DEF));

function bg(el,img){el.style.backgroundImage=img?"url("+img+")":"";el.classList[img?"remove":"add"]("ph")}
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}

function render(){
  var m={vQ:"q",vName:"name",vDesc:"desc",vAge:"age",vBirth:"birth",vOv:"ov"};
  for(var k in m)$(k).textContent=D[m[k]];
  bg($("vAv"),D.av);
  var row=$("vPh");row.innerHTML="";
  (D.photos.length?D.photos:["",""]).forEach(function(p){var i=document.createElement("i");bg(i,p);i.className+=p?"":" ph";row.appendChild(i)});
  document.querySelectorAll(".sg i").forEach(function(el,n){bg(el,D.songs[n])});
}

[["iQ","q"],["iName","name"],["iDesc","desc"],["iAge","age"],["iBirth","birth"],["iOv","ov"]].forEach(function(a){
  $(a[0]).oninput=function(){D[a[1]]=this.value;render()}});
$("iAv").onchange=function(){rd(this.files[0],function(d){D.av=d;render()})};
$('iAv_del').onclick=function(){D.av=''; $('iAv').value=''; render();};
$("iPh").onchange=function(){
  var fs=[].slice.call(this.files),n=0;D.photos=[];
  fs.forEach(function(f,i){rd(f,function(d){D.photos[i]=d;if(++n===fs.length)render()})});
};
$("clrPh").onclick=function(){D.photos=[];$("iPh").value="";render()};
document.querySelectorAll(".sgf").forEach(function(el,n){el.onchange=function(){rd(this.files[0],function(d){D.songs[n]=d;render()})}});

function fill(){
  $("iQ").value=D.q;$("iName").value=D.name;$("iDesc").value=D.desc;$("iAge").value=D.age;$("iBirth").value=D.birth;$("iOv").value=D.ov;
  document.querySelectorAll("input[type=file]").forEach(function(f){f.value=""});
  render();
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
    var a=document.createElement("a");a.download="google-person.png";a.href=c.toDataURL("image/png");a.click();
  }).catch(function(){f.style.zoom=z});
};

fill();fit();
})();
