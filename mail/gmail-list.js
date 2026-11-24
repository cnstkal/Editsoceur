(function(){
var $=function(i){return document.getElementById(i)};
var mk=function(u,un){return{n:"Title",t:"text here\ntext here",d:"11 Sep",av:"",un:!!un,st:false}};
var DEF={theme:"light",sr:"Telusuri dalam email",cat:"Utama",fab:"Tulis",badge:"9",me:"",
mails:[mk(),mk(),mk(),mk(1),mk(1),mk(),mk()]};
var D=JSON.parse(JSON.stringify(DEF));
var STAR='<svg viewBox="0 0 24 24" stroke-width="2" class="CLS"><path d="m12 3 2.700 5.600 6.100.8-4.500 4.200 1.100 6-5.400-3-5.400 3 1.100-6L3.200 9.400l6.100-.8z"/></svg>';

function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
function bg(el,img){el.style.backgroundImage=img?"url("+img+")":"";el.classList[img?"remove":"add"]("ph")}

function render(){
  $("vSr").textContent=D.sr;$("vCat").textContent=D.cat;$("vFab").textContent=D.fab;
  $("vBadge").textContent=D.badge;$("vBadge").style.display=D.badge?"":"none";
  $("card").classList.toggle("dark",D.theme==="dark");
  bg($("vMe"),D.me);
  var ls=$("vList");ls.innerHTML="";
  D.mails.forEach(function(m){
    var r=document.createElement("div");r.className="rw"+(m.un?" un":"");
    var a=document.createElement("i");a.className="av";bg(a,m.av);
    var t=document.createElement("div");t.className="tx";
    var b=document.createElement("b");b.textContent=m.n;
    var p=document.createElement("p");p.textContent=m.t;
    t.appendChild(b);t.appendChild(p);
    var rt=document.createElement("div");rt.className="rt";
    var d=document.createElement("span");d.textContent=m.d;
    rt.appendChild(d);rt.insertAdjacentHTML("beforeend",STAR.replace("CLS",m.st?"on":""));
    r.appendChild(a);r.appendChild(t);r.appendChild(rt);ls.appendChild(r);
  });
}

[["iSr","sr"],["iCat","cat"],["iFab","fab"],["iBadge","badge"]].forEach(function(a){
  $(a[0]).oninput=function(){D[a[1]]=this.value;render()}});
$("iTheme").onchange=function(){D.theme=this.value;render()};
$("iMe").onchange=function(){rd(this.files[0],function(d){D.me=d;render()})};

function mails(){
  var box=$("mList");box.innerHTML="";
  D.mails.forEach(function(m,i){
    var c=document.createElement("div");c.className="sc";
    c.innerHTML='<h3>메일 '+(i+1)+'<button type="button">삭제</button></h3><label>보낸 사람<input></label><label class="tx">내용 (2줄)<textarea rows="2"></textarea></label><label>날짜<input></label><label>프로필<input type="file" accept="image/*"></label><div class="chk"><label><input type="checkbox">안 읽음</label><label><input type="checkbox">별표</label></div>';
    var n=c.querySelectorAll("input,textarea");
    n[0].value=m.n;n[1].value=m.t;n[2].value=m.d;n[4].checked=m.un;n[5].checked=m.st;
    n[0].oninput=function(){m.n=this.value;render()};
    n[1].oninput=function(){m.t=this.value;render()};
    n[2].oninput=function(){m.d=this.value;render()};
    n[3].onchange=function(){rd(this.files[0],function(d){m.av=d;render()})};
    n[4].onchange=function(){m.un=this.checked;render()};
    n[5].onchange=function(){m.st=this.checked;render()};
    c.querySelector("button").onclick=function(){D.mails.splice(i,1);mails();render()};
    box.appendChild(c);
  });
}
$("addM").onclick=function(){if(D.mails.length>=9)return;D.mails.push(mk());mails();render()};

function fill(){
  $("iTheme").value=D.theme;$("iSr").value=D.sr;$("iCat").value=D.cat;$("iFab").value=D.fab;$("iBadge").value=D.badge;$("iMe").value="";
  mails();render();
}
$("reset").onclick=function(){D=JSON.parse(JSON.stringify(DEF));fill()};

var tabs=document.querySelectorAll("#seg button"),pns=document.querySelectorAll(".pn");
tabs.forEach(function(b,i){b.onclick=function(){tabs.forEach(function(x,j){x.classList.toggle("on",i===j)});pns.forEach(function(p,j){p.hidden=i!==j})}});

$("pvBtn").onclick=function(){var on=document.body.classList.toggle("pvmode");this.textContent=on?"편집 모드":"미리보기 모드";fit()};
function fit(){var st=$("stage"),w=st.clientWidth,h=st.clientHeight;if(!w||!h)return;var fh=$("fit").offsetHeight||640;var z=Math.min((h-48)/fh,(w-48)/360,1.6);$("fit").style.zoom=Math.max(z,.2)}
window.addEventListener("resize",fit);

$("savePng").onclick=function(){
  var f=$("fit"),z=f.style.zoom;f.style.zoom=1;
  html2canvas($("cap"),{backgroundColor:null,scale:4,useCORS:true}).then(function(c){
    f.style.zoom=z;
    var a=document.createElement("a");a.download="gmail-list.png";a.href=c.toDataURL("image/png");a.click();
  }).catch(function(){f.style.zoom=z});
};

fill();fit();
})();
