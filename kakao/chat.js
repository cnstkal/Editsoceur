(function () {
  var $ = function (i) { return document.getElementById(i); }, STORE = "kakao_chat_v2", S;
  // ===== 기본 데이터 =====
  var DEF = { room: "한소율", un: "327", av: "", comp: true, items: [
    { k: "d", t: "2026년 11월 16일 월요일" },
    { k: "m", me: 1, t: "야 오늘 과제 제출 언제까지임" },
    { k: "m", me: 1, t: "ㅇㅈㅇㅈ", tm: "오후 11:20" },
    { k: "m", t: "내일 오전 9시까지" },
    { k: "m", t: "나도 아직 못함..ㅠㅠ", tm: "오후 11:21" },
    { k: "m", me: 1, t: "망했다", tm: "오후 11:22" },
    { k: "d", t: "2026년 11월 17일 화요일" },
    { k: "m", me: 1, t: "어제 자료 고마워ㅠㅠ" },
    { k: "m", me: 1, t: "덕분에 제때 냈음", tm: "오전 8:47" },
    { k: "m", t: "다행이다ㅋㅋ" },
    { k: "m", t: "오늘 점심 뭐 먹을래?", tm: "오전 8:50" },
    { k: "m", me: 1, t: "학식 아니면 다 좋음" },
    { k: "m", me: 1, t: "ㅎㅎㅎㅎㅎ", tm: "오전 10:33", rd: 1 }
  ]};
  var G = function (p, w) { return '<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round">' + p + "</svg>"; };
  var IC = {
    back: G('<path d="M15 5l-7 7 7 7"/>', 2.4), search: G('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'),
    call: G('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>'),
    menu: G('<path d="M4 7h16M4 12h16M4 17h16"/>'), plus: G('<path d="M12 5v14M5 12h14"/>', 2.4),
    hash: G('<path d="M9.5 4 7.5 20M16.5 4l-2 16M4.5 9h16M3.5 15h16"/>', 2.2), chev: G('<path d="M9 5l7 7-7 7"/>', 3),
    smile: '<svg viewBox="0 0 24 24"><circle cx="9" cy="10" r="1.6" fill="#2b2f36"/><circle cx="15" cy="10" r="1.6" fill="#2b2f36"/><path d="M7.5 14c1.2 3 7.8 3 9 0" stroke="#2b2f36" stroke-width="2" fill="none" stroke-linecap="round"/></svg>'
  };
  var AVATAR = '<svg viewBox="0 0 34 34"><rect width="34" height="34" fill="#f3d9c7"/><path d="M4 34c1-8 6-11 13-11s12 3 13 11z" fill="#6f8fb3"/><ellipse cx="17" cy="15" rx="6.5" ry="7.5" fill="#f6dcc8"/><path d="M9.5 15c-1-8 4-11 8-11s9 3 7.5 11c-1-4-3-6-7.5-6s-6.5 2-8 6z" fill="#3a2a22"/></svg>';
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function persist() { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) {} }

  // ===== 미리보기 렌더링 =====
  function render() {
    if (S.comp === undefined) S.comp = true;
    $("cap").classList.toggle("nocomp", !S.comp); if ($("iComp")) $("iComp").checked = !!S.comp;
    $("back").innerHTML = IC.back + (S.un ? esc(S.un) : ""); $("title").textContent = S.room;
    $("tools").innerHTML = IC.search + IC.call + IC.menu;
    $("plus").innerHTML = IC.plus; $("hash").innerHTML = IC.hash; $("smile").innerHTML = IC.smile;
    var chat = $("chat"); chat.innerHTML = ""; var prev = null;
    S.items.forEach(function (m) {
      if (m.k === "d") { var d = el("div", "date", m.t); d.insertAdjacentHTML("beforeend", IC.chev); chat.append(d); prev = null; return; }
      var me = !!m.me, first = me !== prev; prev = me;
      var row = el("div", "row" + (me ? " me" : "") + (first ? " first tail" : "")), col = el("div", "col");
      if (!me) {
        if (first) { var av = el("div", "av"); if (S.av) av.style.backgroundImage = "url(" + S.av + ")"; else av.innerHTML = AVATAR; row.append(av); col.append(el("div", "name", S.room)); }
        else row.append(el("div", "sp"));
      }
      var line = el("div", "line"), bb = el("div", "b" + (m.img ? " img" : ""), m.img ? null : m.t);
      if (m.img) { var im = document.createElement("img"); im.src = m.img; bb.append(im); }
      line.append(bb);
      if (m.tm || (me && m.rd)) { var tm = el("div", "tm"); if (me && m.rd) tm.append(el("span", "rd", "1")); tm.append(m.tm || ""); line.append(tm); }
      col.append(line); row.append(col); chat.append(row);
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
  }
  $("iRoom").oninput = function () { S.room = this.value; persist(); render(); };
  $("iUn").oninput = function () { S.un = this.value; persist(); render(); };
  $("iComp").onchange = function () { S.comp = this.checked; persist(); render(); };
  $("iAv").onchange = function () { var f = this.files[0]; if (!f) return; var r = new FileReader(); r.onload = function () { S.av = r.result; persist(); render(); }; r.readAsDataURL(f); };
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
  $("save").onclick = function () {
    var b = this, t = b.textContent; b.disabled = true; b.textContent = "저장 중...";
    capChat($("cap"), { scale: 5, useCORS: true, backgroundColor: null, logging: false }).then(function (c) {
      c.toBlob(function (bl) { var a = document.createElement("a"); a.href = URL.createObjectURL(bl); a.download = "kakao-chat.png"; document.body.appendChild(a); a.click(); a.remove(); b.disabled = false; b.textContent = t; });
    }).catch(function () { b.disabled = false; b.textContent = t; alert("PNG 저장에 실패했습니다."); });
  };
  load(false);
})();
