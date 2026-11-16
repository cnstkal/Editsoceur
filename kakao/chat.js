// ===== 대화 데이터 (여기만 수정) =====
const ROOM = "송민기";
const USERS = { min: { name: "송민기" } };
const CHAT = [
  { date: "2026년 3월 24일 화요일", msgs: [{ u: "min", t: "치킨사와" }] },
  { date: "2026년 3월 25일 수요일", msgs: [{ u: "min", t: "작실 ㄱ" }, { u: "min", t: "저녁 먹지 말고 와" }] },
  { date: "2026년 3월 26일 목요일", msgs: [{ u: "min", t: "작실 ㄱ" }] },
  { date: "2026년 3월 29일 일요일", msgs: [{ u: "min", t: "ㅈㅅ ㄱ" }] },
  { date: "2026년 4월 1일 수요일",  msgs: [{ u: "min", t: "ㄱ" }] },
  { date: "2026년 4월 9일 목요일",  msgs: [{ u: "min", t: "쇼미에 너 전남친 나오는데" }, { u: "min", t: "뭐냐 이거" }] }
];

// ===== 벡터 프로필 (임의 그림) =====
const AVATAR = `<svg viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg">
  <rect width="34" height="34" fill="#22331f"/>
  <path d="M5 34c1-7 5-10 12-10s11 3 12 10z" fill="#1b1b1f"/>
  <ellipse cx="17" cy="14" rx="6" ry="7" fill="#e8c2a6"/>
  <path d="M10.5 12c0-6 3-8.5 6.5-8.5s6.5 2.5 6.5 8.5c-2-2-4-3-6.5-3s-4.5 1-6.5 3z" fill="#c9ccd1"/>
  <rect x="15" y="20" width="4" height="3" fill="#e8c2a6"/>
</svg>`;

// ===== 렌더링 =====
const chat = document.getElementById("chat");
document.getElementById("title").textContent = ROOM;

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

CHAT.forEach(day => {
  chat.append(el("div", "date", day.date));
  let prev = null;
  day.msgs.forEach(m => {
    const first = m.u !== prev;
    prev = m.u;
    const user = USERS[m.u] || { name: m.u };
    const row = el("div", "row" + (first ? " first" : ""));

    if (first) {
      const av = el("div", "av");
      av.innerHTML = AVATAR;
      row.append(av);
    } else {
      row.append(el("div", "sp"));
    }

    const col = el("div", "col");
    if (first) col.append(el("div", "name", user.name));
    col.append(el("div", "b", m.t));
    row.append(col);
    chat.append(row);
  });
});

chat.scrollTop = chat.scrollHeight;
