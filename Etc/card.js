(function () {
  var $ = function (i) { return document.getElementById(i); }, STORE = "etc_card_v1", S;
  var DEF = { title: "개미 협회 회원증", name: "홍길동", no: "000000-0000000", date: "2026. 01. 01", issuer: "가상 개미 협회장", mode: "blank", photo: "", bg: "", sample: true };
  function persist() { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) {} }
  function render() {
    $("vTitle").textContent = S.title; $("vName").textContent = S.name; $("vNo").textContent = S.no;
    $("vDate").textContent = S.date; $("vIssuer").textContent = S.issuer;
    var ph = $("vPhoto"), photo = S.mode === "photo" && S.photo;
    ph.className = "ph" + (S.mode === "green" ? " green" : photo ? " photo" : "");
    ph.style.backgroundImage = photo ? "url(" + S.photo + ")" : "none";
    var c = $("cap"); c.classList.toggle("hasbg", !!S.bg); c.style.backgroundImage = S.bg ? "url(" + S.bg + ")" : "";
    $("vSample").style.display = S.sample ? "" : "none";
  }
  function set() { $("iTitle").value = S.title; $("iName").value = S.name; $("iNo").value = S.no; $("iDate").value = S.date; $("iIssuer").value = S.issuer; $("iMode").value = S.mode; $("iSample").checked = !!S.sample; }
  function load(reset) {
    if (reset) { try { localStorage.removeItem(STORE); } catch (e) {} S = JSON.parse(JSON.stringify(DEF)); }
    else { try { var v = localStorage.getItem(STORE); S = v ? Object.assign({}, DEF, JSON.parse(v)) : JSON.parse(JSON.stringify(DEF)); } catch (e) { S = JSON.parse(JSON.stringify(DEF)); } }
    set(); render();
  }
  [["iTitle", "title"], ["iName", "name"], ["iNo", "no"], ["iDate", "date"], ["iIssuer", "issuer"], ["iMode", "mode"]].forEach(function (a) {
    $(a[0]).addEventListener("input", function () { S[a[1]] = this.value; persist(); render(); });
  });
  $("iSample").onchange = function () { S.sample = this.checked; persist(); render(); };
  function shrink(f, max, cb) {
    var r = new FileReader();
    r.onload = function () { var im = new Image(); im.onload = function () {
      var k = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement("canvas");
      c.width = im.width * k; c.height = im.height * k; c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); cb(c.toDataURL("image/jpeg", 0.88));
    }; im.src = r.result; }; r.readAsDataURL(f);
  }
  $("iPhoto").onchange = function () { var f = this.files[0]; if (!f) return; shrink(f, 1000, function (u) { S.photo = u; S.mode = "photo"; $("iMode").value = "photo"; persist(); render(); }); };
  $("iBg").onchange = function () { var f = this.files[0]; if (!f) return; shrink(f, 2200, function (u) { S.bg = u; persist(); render(); }); };
  $("rmPhoto").onclick = function () { S.photo = ""; persist(); render(); };
  $("rmBg").onclick = function () { S.bg = ""; persist(); render(); };
  $("reset").onclick = function () { load(true); };
  $("save").onclick = function () {
    var b = this, t = b.textContent; b.disabled = true; b.textContent = "저장 중...";
    html2canvas($("cap"), { scale: 2, useCORS: true, backgroundColor: null, logging: false }).then(function (c) {
      c.toBlob(function (bl) { var a = document.createElement("a"); a.href = URL.createObjectURL(bl); a.download = "member-card.png"; document.body.appendChild(a); a.click(); a.remove(); b.disabled = false; b.textContent = t; });
    }).catch(function () { b.disabled = false; b.textContent = t; alert("PNG 저장에 실패했습니다."); });
  };
  load(false);
})();
