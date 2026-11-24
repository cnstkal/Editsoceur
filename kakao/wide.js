(function () {
  var $ = function (i) { return document.getElementById(i); }, STORE = "kakao_wide_v1", S;
  // ===== 기본 데이터 =====
  var DEF = { room: "윤둥이", un: "", av: "", items: [
    { k: "m", me: 1, t: "이번일로 뭐라하는 놈 있으면 나한테 데려와" },
    { k: "m", me: 1, t: "내가 처리할게" },
    { k: "m", t: "배고팡" },
    { k: "m", me: 1, t: "무뼈국물닭발에 치즈 주먹밥 계란찜 추가 맞지?" },
    { k: "m", t: "빨리와" }
  ]};
  var G = function (p, w) { return '<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round">' + p + "</svg>"; };
  var IC = {
    back: G('<path d="M15 5l-7 7 7 7"/>', 2.4), search: G('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'),
    call: G('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>'),
    menu: G('<path d="M4 7h16M4 12h16M4 17h16"/>'), plus: G('<path d="M12 5v14M5 12h14"/>', 2.4),
    hash: G('<path d="M9.5 4 7.5 20M16.5 4l-2 16M4.5 9h16M3.5 15h16"/>', 2.2), chev: G('<path d="M9 5l7 7-7 7"/>', 3),
    smile: '<svg viewBox="0 0 24 24"><circle cx="9" cy="10" r="1.6" fill="#2b2f36"/><circle cx="15" cy="10" r="1.6" fill="#2b2f36"/><path d="M7.5 14c1.2 3 7.8 3 9 0" stroke="#2b2f36" stroke-width="2" fill="none" stroke-linecap="round"/></svg>'
  };
  var AVATAR = '<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#cfd6dc"/><circle cx="50" cy="38" r="17" fill="#fff"/><path d="M14 100c2-26 20-38 36-38s34 12 36 38z" fill="#fff"/></svg>';
  var TL = '<svg viewBox="0 0 8 6" preserveAspectRatio="none"><path d="M8 0H0C1.2 1.6 3.4 4.4 8 5.4z" fill="#fff"/></svg>';
  var TR = '<svg viewBox="0 0 8 6" preserveAspectRatio="none"><path d="M0 0H8C6.8 1.6 4.6 4.4 0 5.4z" fill="#fee500"/></svg>';
  // 프로필 사진: 가운데 정사각형으로 잘라 저장(저장 PNG에서 찌그러짐/깨짐 방지)
  function cropSq(src, cb) {
    var im = new Image(); im.onload = function () {
      var s = Math.min(im.width, im.height), c = document.createElement("canvas"); c.width = c.height = 256;
      c.getContext("2d").drawImage(im, (im.width - s) / 2, (im.height - s) / 2, s, s, 0, 0, 256, 256); cb(c.toDataURL("image/jpeg", 0.92));
    }; im.onerror = function () { cb(src); }; im.src = src;
  }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function persist() { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) {} }

  // 작업 영역은 항상 960px 논리 크기로 고정, 화면 크기는 transform 배율로만 조절
  function fit() { var c = $("cap"), w = $("capWrap"), s = w.clientWidth / 960; c.style.transform = "scale(" + s + ")"; w.style.height = (c.offsetHeight * s) + "px"; }
  window.addEventListener("resize", fit);

  // ===== 미리보기 렌더링 =====
  function render() {
    $("back").innerHTML = IC.back + (S.un ? esc(S.un) : ""); $("title").textContent = S.room;
    $("tools").innerHTML = IC.search + IC.menu;
    fit();
    var chat = $("chat"); chat.innerHTML = ""; var prev = null;
    S.items.forEach(function (m) {
      if (m.k === "d") { var d = el("div", "date", m.t); d.insertAdjacentHTML("beforeend", IC.chev); chat.append(d); prev = null; return; }
      var me = !!m.me, first = me !== prev; prev = me;
      var row = el("div", "row" + (me ? " me" : "") + (first ? " first tail" : "")), col = el("div", "col");
      if (!me) {
        if (first) { var av = el("div", "av"); if (S.av) { var ai = document.createElement("img"); ai.src = S.av; ai.alt = ""; av.append(ai); } else av.innerHTML = AVATAR; row.append(av); col.append(el("div", "name", S.room)); }
        else row.append(el("div", "sp"));
      }
      var line = el("div", "line"), bb = el("div", "b" + (m.img ? " img" : ""), m.img ? null : m.t);
      if (m.img) { var im = document.createElement("img"); im.src = m.img; bb.append(im); }
      if (first && !m.img) bb.insertAdjacentHTML("beforeend", '<i class="tl">' + (me ? TR : TL) + "</i>");
      line.append(bb);
      if (m.tm || m.rd) { var tm = el("div", "tm"); if (m.rd) tm.append(el("span", "rd", "1")); tm.append(m.tm || ""); line.append(tm); }
      col.append(line); row.append(col); chat.append(row);
    });
    layoutBubbles();
  }

  // 말풍선의 줄바꿈과 너비는 브라우저 레이아웃에 맡김.
  // 띄어쓰기나 canvas 측정값으로 줄을 재조립하지 않고, CSS padding으로 내부 여백을 확보한다.
  function layoutBubbles() {
    Array.prototype.forEach.call($("chat").querySelectorAll(".b"), function (b) {
      if (b.querySelector("img")) return;
      b.style.width = "fit-content";
      b.style.whiteSpace = "pre-wrap";
    });
  }

  // ===== 편집기 =====
  function list() {
    $("list").innerHTML = S.items.map(function (m, i) {
      var ops = '<div class="ops"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div>';
      if (m.k === "d") return '<div class="pe" data-i="' + i + '"><label>날짜 구분선<input data-f="t" value="' + esc(m.t) + '"></label>' + ops + "</div>";
      return '<div class="pe" data-i="' + i + '"><div class="r2"><label>보낸 사람<select data-f="me"><option value="0"' + (m.me ? "" : " selected") + '>상대</option><option value="1"' + (m.me ? " selected" : "") + '>나</option></select></label>' +
        '<label>시간<input data-f="tm" value="' + esc(m.tm) + '"></label></div><label class="chk"><input type="checkbox" data-f="rd"' + (m.rd ? " checked" : "") + '>안읽음 1</label>' +
        '<label>내용<textarea rows="2" data-f="t">' + esc(m.t) + "</textarea></label>" +
        '<label class="file">사진 보내기(올리면 말풍선 대신 사진)<input type="file" accept="image/*" data-f="img"></label>' +
        (m.img ? '<button type="button" class="xb sm" data-a="ri">사진 빼기</button>' : "") + ops + "</div>";
    }).join("");
  }
  function load(reset) {
    if (reset) { try { localStorage.removeItem(STORE); } catch (e) {} S = JSON.parse(JSON.stringify(DEF)); }
    else { try { var v = localStorage.getItem(STORE); S = v ? JSON.parse(v) : JSON.parse(JSON.stringify(DEF)); if (!S || !Array.isArray(S.items)) throw 0; } catch (e) { S = JSON.parse(JSON.stringify(DEF)); } }
    $("iRoom").value = S.room; $("iUn").value = S.un; list(); render();
    if (S.av && !S.avSq) cropSq(S.av, function (u) { S.av = u; S.avSq = 1; persist(); render(); });
  }
  $("iRoom").oninput = function () { S.room = this.value; persist(); render(); };
  $("iUn").oninput = function () { S.un = this.value; persist(); render(); };
  $("iAv").onchange = function () { var f = this.files[0]; if (!f) return; var r = new FileReader(); r.onload = function () { cropSq(r.result, function (u) { S.av = u; S.avSq = 1; persist(); render(); }); }; r.readAsDataURL(f); };
  $("list").addEventListener("input", function (e) {
    var pe = e.target.closest(".pe"), f = e.target.dataset.f; if (!pe || !f) return;
    if (f === "img") return;
    var m = S.items[+pe.dataset.i];
    m[f] = f === "me" ? +e.target.value : f === "rd" ? (e.target.checked ? 1 : 0) : e.target.value;
    persist(); render();
  });
  $("list").addEventListener("click", function (e) {
    var b = e.target.closest("[data-a]"), pe = e.target.closest(".pe"); if (!b || !pe) return;
    var i = +pe.dataset.i, a = b.dataset.a;
    if (a === "ri") delete S.items[i].img;
    else if (a === "x") S.items.splice(i, 1);
    else { var j = a === "u" ? i - 1 : i + 1; if (j < 0 || j >= S.items.length) return; var t = S.items[i]; S.items[i] = S.items[j]; S.items[j] = t; }
    persist(); list(); render();
  });
  function shrink(file, cb) {
    var r = new FileReader();
    r.onload = function () { var im = new Image(); im.onload = function () {
      var k = Math.min(1, 800 / Math.max(im.width, im.height)), c = document.createElement("canvas");
      c.width = im.width * k; c.height = im.height * k; c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); cb(c.toDataURL("image/jpeg", 0.85));
    }; im.src = r.result; };
    r.readAsDataURL(file);
  }
  $("list").addEventListener("change", function (e) {
    var pe = e.target.closest(".pe"); if (!pe || e.target.dataset.f !== "img" || !e.target.files[0]) return;
    shrink(e.target.files[0], function (u) { S.items[+pe.dataset.i].img = u; persist(); list(); render(); });
  });
  document.querySelectorAll("[data-add]").forEach(function (b) {
    b.onclick = function () {
      var k = b.dataset.add;
      S.items.push(k === "d" ? { k: "d", t: "2026년 1월 1일 목요일" } : { k: "m", me: 0, t: "", tm: "" });
      persist(); list(); render(); window.scrollTo(0, document.body.scrollHeight);
    };
  });
  $("reset").onclick = function () { load(true); };
  // ===== PNG 저장: 프리뷰 DOM 하나를 단일 엔진(html-to-image)으로 캡처 =====
  // 프리뷰 실제 너비 기준으로 pixelRatio만 키워서 고해상도 저장 (레이아웃은 건드리지 않음)
  var EXPORT_W = 5120;
  function capture(cap) {
    var fontsReady = document.fonts ? Promise.all([document.fonts.load("500 16px Pretendard"), document.fonts.load("600 16px Pretendard"), document.fonts.load("700 16px Pretendard")]).then(function () { return document.fonts.ready; }) : Promise.resolve();
    var prev=cap.style.transform;cap.style.transform="none";
    return fontsReady.then(function(){
      var imgs=[].slice.call(cap.querySelectorAll("img"));
      return Promise.all(imgs.map(function(im){return im.decode?im.decode().catch(function(){}):Promise.resolve()}));
    }).then(function(){return htmlToImage.toCanvas(cap,{pixelRatio:EXPORT_W/960,cacheBust:true})})
      .finally(function(){cap.style.transform=prev});
  }
  function savePng(btn, mode) {
    var t = btn.textContent, cap = $("cap"); btn.disabled = true; btn.textContent = "저장 중...";
    fit();
    capture(cap).then(function (c) {
      c.toBlob(function (bl) {
        var a = document.createElement("a"); a.href = URL.createObjectURL(bl);
        a.download = mode === "tp" ? "kakao-chat-16x9-transparent.png" : mode === "bg" ? "kakao-chat-16x9-background.png" : "kakao-chat-16x9.png";
        document.body.appendChild(a); a.click(); a.remove();
      });
    }).catch(function () { alert("PNG 저장에 실패했습니다."); })
      .then(function () { btn.disabled = false; btn.textContent = t; });
  }
  var MODE = "full";
  function setMode(m) {
    MODE = MODE === m ? "full" : m;
    var cap = $("cap");
    cap.classList.toggle("tp", MODE === "tp"); cap.classList.toggle("bgonly", MODE === "bg");
    $("modeT").classList.toggle("on", MODE === "tp"); $("modeBg").classList.toggle("on", MODE === "bg");
  }
  $("modeT").onclick = function () { setMode("tp"); };
  $("modeBg").onclick = function () { setMode("bg"); };
  $("save").onclick = function () { savePng(this, MODE); };

  load(false);
  if (document.fonts) document.fonts.ready.then(function () { render(); });
})();
