(function(){
var $=function(i){return document.getElementById(i)};
var DEF={title:"나의 플레이리스트",owner:"이름",up:"오늘 업데이트",cover:"",scov:"",
songs:[1,2,3,4,5,6,7,8,9].map(function(){return{t:"곡 제목",s:"가수",img:""}})};
var D=JSON.parse(JSON.stringify(DEF));

function bg(el,img){el.style.background=img?"url("+img+") center/cover":""}
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}

function render(){
  $("vTitle").textContent=D.title;$("vOwner").textContent=D.owner;$("vUp").textContent=D.up;
  bg($("vCv"),D.cover);
  var ul=$("vList");ul.innerHTML="";
  D.songs.forEach(function(s){
    var li=document.createElement("li"),th=document.createElement("div"),w=document.createElement("div"),b=document.createElement("b"),m=document.createElement("small");
    th.className="th ph";bg(th,s.img||D.scov);
    b.textContent=s.t;m.textContent=s.s;w.appendChild(b);w.appendChild(m);
    li.appendChild(th);li.appendChild(w);ul.appendChild(li);
  });
}

function bind(id,k){$(id).oninput=function(){D[k]=this.value;render()}}
[["iTitle","title"],["iOwner","owner"],["iUp","up"]].forEach(function(a){bind(a[0],a[1])});
$("iCover").onchange=function(){rd(this.files[0],function(d){D.cover=d;render()})};
$("iScov").onchange=function(){rd(this.files[0],function(d){D.scov=d;render()})};
$("clrCover").onclick=function(){D.cover="";$("iCover").value="";render()};
$("clrScov").onclick=function(){D.scov="";$("iScov").value="";render()};

function songs(){
  var box=$("sList");box.innerHTML="";
  D.songs.forEach(function(s,i){
    var c=document.createElement("div");c.className="sc";
    c.innerHTML='<h3>곡 '+(i+1)+'<button type="button">삭제</button></h3><label>곡 제목<input></label><label>가수<input></label><label>개별 커버<input type="file" accept="image/*"></label>';
    var n=c.querySelectorAll("input");
    n[0].value=s.t;n[1].value=s.s;
    n[0].oninput=function(){s.t=this.value;render()};
    n[1].oninput=function(){s.s=this.value;render()};
    n[2].onchange=function(){rd(this.files[0],function(d){s.img=d;render()})};
    c.querySelector("button").onclick=function(){D.songs.splice(i,1);songs();render()};
    box.appendChild(c);
  });
}
$("addSong").onclick=function(){if(D.songs.length>=9)return;D.songs.push({t:"곡 제목",s:"가수",img:""});songs();render()};

function fill(){
  $("iTitle").value=D.title;$("iOwner").value=D.owner;$("iUp").value=D.up;
  ["iCover","iScov"].forEach(function(i){$(i).value=""});
  songs();render();
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
    var a=document.createElement("a");a.download="playlist.png";a.href=c.toDataURL("image/png");a.click();
  }).catch(function(){f.style.zoom=z});
};

fill();fit();
})();
