(function () {
  var $ = function (i) { return document.getElementById(i); }, STORE = "gallery_detail_v1", S;
  var DEF = { date: "2024년 2월 5일", time: "오전 11:23", mode: "photo", fit: "contain", green: "#00ff00", img: "" };
  var A = 'fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  var IC = {
    back: '<svg viewBox="0 0 24 24" ' + A + ' stroke-width="2.4"><path d="M15 4l-8 8 8 8"/></svg>',
    more: '<svg viewBox="0 0 24 24"><circle cx="4" cy="12" r="2.2" fill="#111"/><circle cx="12" cy="12" r="2.2" fill="#111"/><circle cx="20" cy="12" r="2.2" fill="#111"/></svg>',
    share: '<svg viewBox="0 0 24 24" ' + A + '><path d="M12 15V3M8 7l4-4 4 4M7 10H5v11h14V10h-2"/></svg>',
    heart: '<svg viewBox="0 0 24 24" ' + A + '><path d="M12 21C5 15.5 2.5 12.5 2.5 8.5a5 5 0 019.5-2 5 5 0 019.5 2c0 4-2.5 7-9.5 12.5z"/></svg>',
    info: '<svg viewBox="0 0 24 24" ' + A + '><circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7.5v.01"/></svg>',
    adj: '<svg viewBox="0 0 24 24" ' + A + '><path d="M3 7h18M3 12h18M3 17h18"/><circle cx="15" cy="7" r="2" fill="#f2f2f2"/><circle cx="8" cy="12" r="2" fill="#f2f2f2"/><circle cx="15" cy="17" r="2" fill="#f2f2f2"/></svg>',
    trash: '<svg viewBox="0 0 24 24" ' + A + '><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v8M14 10v8"/></svg>'
  };
  $("bBack").innerHTML = IC.back; $("bMore").innerHTML = IC.more; $("bShare").innerHTML = IC.share; $("bTrash").innerHTML = IC.trash;
  $("bMid").innerHTML = IC.heart + IC.info + IC.adj;
  function persist() { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) {} }
  function render() {
    $("vDate").textContent = S.date; $("vTime").textContent = S.time;
    var st = $("stage"), photo = S.mode === "photo" && S.img;
    st.style.backgroundColor = S.mode === "green" ? S.green : "#fff";
    st.style.backgroundImage = photo ? "url(" + S.img + ")" : "none";
    st.style.backgroundSize = S.fit;
  }
  function set() { $("iDate").value = S.date; $("iTime").value = S.time; $("iMode").value = S.mode; $("iFit").value = S.fit; $("iGreen").value = S.green; }
  function load(reset) {
    if (reset) { try { localStorage.removeItem(STORE); } catch (e) {} S = JSON.parse(JSON.stringify(DEF)); }
    else { try { var v = localStorage.getItem(STORE); S = v ? Object.assign({}, DEF, JSON.parse(v)) : JSON.parse(JSON.stringify(DEF)); } catch (e) { S = JSON.parse(JSON.stringify(DEF)); } }
    set(); render();
  }
  [["iDate", "date"], ["iTime", "time"], ["iMode", "mode"], ["iFit", "fit"], ["iGreen", "green"]].forEach(function (a) {
    $(a[0]).addEventListener("input", function () { S[a[1]] = this.value; persist(); render(); });
  });
  $("iImg").onchange = function () {
    var f = this.files[0]; if (!f) return; var r = new FileReader();
    r.onload = function () { var im = new Image(); im.onload = function () {
      var k = Math.min(1, 1600 / Math.max(im.width, im.height)), c = document.createElement("canvas");
      c.width = im.width * k; c.height = im.height * k; c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
      S.img = c.toDataURL("image/jpeg", 0.88); S.mode = "photo"; $("iMode").value = "photo"; persist(); render();
    }; im.src = r.result; };
    r.readAsDataURL(f);
  };
  $("rmImg").onclick = function () { S.img = ""; persist(); render(); };
  $("reset").onclick = function () { load(true); };
  $("save").onclick = function () {
    var b = this, t = b.textContent; b.disabled = true; b.textContent = "저장 중...";
    html2canvas($("cap"), { scale: 5, useCORS: true, backgroundColor: null, logging: false }).then(function (c) {
      c.toBlob(function (bl) { var a = document.createElement("a"); a.href = URL.createObjectURL(bl); a.download = "photo-detail.png"; document.body.appendChild(a); a.click(); a.remove(); b.disabled = false; b.textContent = t; });
    }).catch(function () { b.disabled = false; b.textContent = t; alert("PNG 저장에 실패했습니다."); });
  };
  load(false);
})();
