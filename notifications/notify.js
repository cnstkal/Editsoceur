// ===== 알림 데이터 (여기만 수정) =====
const NOTIS = [
  { id: "kakao",   label: "카카오톡", title: "띵화형",            body: "전화 좀 받아 ㅜㅜ",              time: "지금", icon: "kakao" },
  { id: "message", label: "메시지",   title: "marspark",          body: "토요일에 정모하는데 올래요?",     time: "지금", icon: "message" },
  { id: "discord", label: "디스코드", title: "호요호요 (#황잡이)", body: "유유님 같이 레이드 뛰실래여?ㅎㅎ", time: "지금", icon: "discord" }
];

// ===== 벡터 아이콘 =====
const ICONS = {
  kakao: `<svg viewBox="0 0 40 40"><defs><clipPath id="c"><circle cx="20" cy="20" r="20"/></clipPath></defs>
    <g clip-path="url(#c)"><rect width="40" height="40" fill="#2a3a2a"/>
    <path d="M2 40c1-9 7-13 18-13s17 4 18 13z" fill="#8f86c9"/>
    <ellipse cx="22" cy="17" rx="7" ry="8" fill="#d9a98a"/>
    <path d="M14 15c0-7 4-10 8-10s8 3 8 10c-2-3-5-4-8-4s-6 1-8 4z" fill="#2b2230"/></g></svg>
    <svg class="badge" viewBox="0 0 19 19"><rect width="19" height="19" rx="5" fill="#fee500"/>
    <ellipse cx="9.5" cy="9" rx="6.5" ry="5" fill="#3a1d1d"/><path d="M5 12.5 4.5 16l4-2.5z" fill="#3a1d1d"/>
    <text x="9.5" y="10.6" font-size="4.6" font-weight="800" fill="#fee500" text-anchor="middle" font-family="Arial">TALK</text></svg>`,

  message: `<svg viewBox="0 0 40 40"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ff26b"/><stop offset="1" stop-color="#0bd01f"/></linearGradient></defs>
    <rect width="40" height="40" rx="9" fill="url(#g)"/>
    <ellipse cx="20" cy="19" rx="15" ry="11.5" fill="#fff"/><path d="M10 27 6 33l9-3z" fill="#fff"/></svg>`,

  discord: `<svg viewBox="0 0 40 40"><defs><linearGradient id="d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7885f7"/><stop offset="1" stop-color="#5463ee"/></linearGradient></defs>
    <rect width="40" height="40" rx="9" fill="url(#d)"/>
    <path d="M9.5 15c1-2.4 2.6-3.7 4.5-4.2l.9 1.6c1.7-.3 3.4-.3 5.1 0l.9-1.6c1.9.5 3.5 1.8 4.5 4.2 1.8 4 2.3 8 1.8 12-1.6 1.2-3.4 1.9-5.3 2.3l-1.3-2.1c.8-.2 1.5-.6 2.2-1l-.5-.4c-3.4 1.5-6.8 1.5-10.2 0l-.5.400c.7.4 1.400.8 2.2 1l-1.3 2.1C9.2 29.900 7.4 29.2 5.8 28c-.5-4 0-8 1.800-12z" transform="translate(2 -1)" fill="#fff"/>
    <circle cx="16.5" cy="19.5" r="2.2" fill="#5463ee"/><circle cx="25.500" cy="19.5" r="2.2" fill="#5463ee"/></svg>`
};

// ===== 렌더링 =====
const stage = document.getElementById("stage");
const picker = document.getElementById("picker");

function show(id) {
  const n = NOTIS.find(x => x.id === id);
  stage.innerHTML = "";
  const b = document.createElement("div");
  b.className = "banner";
  b.innerHTML = `<div class="ico">${ICONS[n.icon]}</div>
    <div class="txt"><b></b><p></p></div><span class="time"></span>`;
  b.querySelector("b").textContent = n.title;
  b.querySelector("p").textContent = n.body;
  b.querySelector(".time").textContent = n.time;
  stage.append(b);
  [...picker.children].forEach(btn => btn.classList.toggle("on", btn.dataset.id === id));
}

NOTIS.forEach(n => {
  const btn = document.createElement("button");
  btn.textContent = n.label;
  btn.dataset.id = n.id;
  btn.onclick = () => show(n.id);
  picker.append(btn);
});
show(NOTIS[0].id);
