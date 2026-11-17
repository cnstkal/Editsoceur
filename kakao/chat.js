// ===== 대화 데이터 (여기만 수정) =====
const ROOM = "한소율", UNREAD = 327;
// me: 내가 보낸 말, tm: 시간 표시(그룹 마지막), rd: 안 읽음 표시
const CHAT = [
  { date: "2026년 11월 16일 월요일", msgs: [
    { me: 1, t: "야 오늘 과제 제출 언제까지임" },
    { me: 1, t: "ㅇㅈㅇㅈ", tm: "오후 11:20" },
    { t: "내일 오전 9시까지" },
    { t: "나도 아직 못함..ㅠㅠ", tm: "오후 11:21" },
    { me: 1, t: "망했다", tm: "오후 11:22" },
    { t: "ㅋㅋㅋㅋ같이 하자" },
    { t: "내가 자료 보내줄게", tm: "오후 11:23" }
  ]},
  { date: "2026년 11월 17일 화요일", msgs: [
    { me: 1, t: "어제 자료 고마워ㅠㅠ" },
    { me: 1, t: "덕분에 제때 냈음", tm: "오전 8:47" },
    { t: "다행이다ㅋㅋ" },
    { t: "오늘 점심 뭐 먹을래?", tm: "오전 8:50" },
    { me: 1, t: "학식 아니면 다 좋음" },
    { me: 1, t: "ㅎㅎㅎㅎㅎ", tm: "오전 10:33", rd: 1 }
  ]}
];

const G = (p, w = 2) => `<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ICON = {
  back: G('<path d="M15 5l-7 7 7 7"/>', 2.4),
  search: G('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'),
  call: G('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>'),
  menu: G('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  plus: G('<path d="M12 5v14M5 12h14"/>', 2.4),
  hash: G('<path d="M9.5 4 7.5 20M16.5 4l-2 16M4.5 9h16M3.5 15h16"/>', 2.2),
  smile: '<svg viewBox="0 0 24 24"><circle cx="9" cy="10" r="1.6" fill="#2b2f36"/><circle cx="15" cy="10" r="1.6" fill="#2b2f36"/><path d="M7.5 14c1.2 3 7.8 3 9 0" stroke="#2b2f36" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
  chev: G('<path d="M9 5l7 7-7 7"/>', 2.6)
};
// 임의 프로필 그림
const AVATAR = `<svg viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg"><rect width="34" height="34" fill="#f3d9c7"/><path d="M4 34c1-8 6-11 13-11s12 3 13 11z" fill="#6f8fb3"/><ellipse cx="17" cy="15" rx="6.5" ry="7.5" fill="#f6dcc8"/><path d="M9.5 15c-1-8 4-11 8-11s9 3 7.5 11c-1-4-3-6-7.5-6s-6.5 2-8 6z" fill="#3a2a22"/></svg>`;

const $ = id => document.getElementById(id);
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
$("back").innerHTML = ICON.back; $("back").append(String(UNREAD));
$("title").textContent = ROOM;
$("tools").innerHTML = ICON.search + ICON.call + ICON.menu;
$("plus").innerHTML = ICON.plus; $("hash").innerHTML = ICON.hash; $("smile").innerHTML = ICON.smile;

const chat = $("chat");
CHAT.forEach(day => {
  const d = el("div", "date", day.date); d.insertAdjacentHTML("beforeend", ICON.chev); chat.append(d);
  let prev = null;
  day.msgs.forEach(m => {
    const me = !!m.me, first = me !== prev; prev = me;
    const row = el("div", "row" + (me ? " me" : "") + (first ? " first tail" : ""));
    const col = el("div", "col");
    if (!me) {
      if (first) { const av = el("div", "av"); av.innerHTML = AVATAR; row.append(av); col.append(el("div", "name", ROOM)); }
      else row.append(el("div", "sp"));
    }
    const line = el("div", "line"); line.append(el("div", "b", m.t));
    if (m.tm) {
      const tm = el("div", "tm");
      if (m.rd) tm.append(el("span", "rd", "1"));
      tm.append(m.tm); line.append(tm);
    }
    col.append(line); row.append(col); chat.append(row);
  });
});
chat.scrollTop = chat.scrollHeight;
