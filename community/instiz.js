// ===== 데이터 (여기만 수정) =====
const POST = {
  tabs: ["HOT", "이슈", "일상", "연예", "드영배", "장터"],
  active: "연예",
  title: "유우시는 일본에서도 아이돌이었던거양?",
  count: 8,
  meta: "1년 전 | 조회 447",
  body: ["과거이야기 잘 안해주는거같아서 ..긁적", "그냥 뜨는 영상이나 이런거보고 판단하는뎅ㅋㅋ", "축구부는 취미고 아이돌활동했던건가??"],
  bookmark: 4
};
// d: 들여쓰기 단계, ic: 아이콘(ufo/planet), u: 글쓴이 밑줄
const COMMENTS = [
  { d: 0, ic: "ufo", name: "익인1", time: "1년 전",
    text: "ㄴㄴ그냥 어릴때 공개연습생느낌? 솜으로 치면 루키즈처럼 일본소속사가 컸어서 거기서 활동한거\n공식 데뷔하기전에 유우시는 에비단 탈퇴했고 솜가서 연습생하고 데뷔" },
  { d: 1, ic: "planet", name: "글쓴이", u: true, time: "1년 전", text: "그러면 일본 소속사에서 연생을 한곤가.." },
  { d: 2, ic: "planet", name: "익인1", time: "1년 전",
    text: "웅 맞음 거기서 연습생~~! 그 소속사가 일본에서 배우쪽인가 하튼 대형 3사안에 들만큼 큰곳이긴해\n그때 축구도 했음ㅎㅎ그래서 윳시가 블로그도 썼었는데 축구그만두고 아이돌한거아니고 에비단&축구같이하면서 꿈찾다가 엑소보고 진심되가디고 솜오디션보고 들어온거임" },
  { d: 0, ic: "planet", name: "익인2", time: "1년 전",
    text: "축구도 유럽 갔다 올 정도면 꽤나 진심이었던것같은데 또 연습생? 비슷한거 한거보면 바쁘게 살았나봄 회사테스트였나?" }
];

// ===== 아이콘 =====
const G = "#56bb6f";
const S = (p, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${p}</svg>`;
const ICON = {
  login: S('<path d="M10 7l5 5-5 5M15 12H3M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3"/>', 'style="color:#fff"'),
  search: S('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>', 'style="color:#fff"'),
  menu: S('<path d="M3 6h18M3 12h18M3 18h18"/>', 'style="color:#fff"'),
  chev: S('<path d="M5 9l7 7 7-7"/>', 'style="color:#111"'),
  dots: S('<circle cx="5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/>', 'style="color:#222"'),
  dotsW: S('<circle cx="5" cy="12" r="1.5" fill="#fff"/><circle cx="12" cy="12" r="1.5" fill="#fff"/><circle cx="19" cy="12" r="1.5" fill="#fff"/>'),
  mark: S('<path d="M6 3h12v18l-6-4-6 4z"/>', 'style="color:#222"'),
  like: S('<path d="M7 11v9H4v-9zM7 11l4-8c2 0 3 1 3 3l-1 4h6a2 2 0 012 2l-2 7a2 2 0 01-2 1H7" fill="currentColor"/>', 'style="color:#222"'),
  flame: '<svg viewBox="0 0 24 24"><path d="M12 2c1 4 6 6 6 12a6 6 0 01-12 0c0-3 2-4 3-6 1 1 1 2 1 3 2-2 2-6 2-9z" fill="#ff5a4d"/></svg>',
  arrow: S('<path d="M5 4v8h10M11 8l4 4-4 4"/>', 'style="color:#bbb"'),
  ufo: `<svg viewBox="0 0 24 24" fill="none" stroke="${G}" stroke-width="1.8"><path d="M6 11c0-4 12-4 12 0"/><ellipse cx="12" cy="13" rx="9" ry="4"/><circle cx="8" cy="13" r=".8" fill="${G}"/><circle cx="12" cy="14" r=".8" fill="${G}"/><circle cx="16" cy="13" r=".8" fill="${G}"/></svg>`,
  planet: `<svg viewBox="0 0 24 24" fill="none" stroke="${G}" stroke-width="1.8"><circle cx="12" cy="12" r="6"/><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-35 12 12)"/></svg>`
};

// ===== 렌더링 =====
const $ = id => document.getElementById(id);
$("topIcons").innerHTML = ICON.login + ICON.search + ICON.menu;

const tabs = $("tabs");
tabs.innerHTML = '<div class="nav-face"><i></i></div>' +
  POST.tabs.map(t => `<div class="t${t === POST.active ? " on" : ""}">${t}</div>`).join("") +
  '<div class="sp"></div><div class="chev">' + ICON.chev + "</div>";

$("title").innerHTML = "";
$("title").append(POST.title);
const em = document.createElement("em"); em.textContent = POST.count; $("title").append(em);
$("meta").textContent = POST.meta;
$("moreTop").innerHTML = ICON.dots;
$("body").innerHTML = POST.body.map(t => `<p></p>`).join("");
[...$("body").children].forEach((p, i) => p.textContent = POST.body[i]);
$("acts").innerHTML = `<div class="pill"><span>${ICON.mark}${POST.bookmark}</span><span>${ICON.like}</span></div><div class="circ">${ICON.dots}</div>`;

$("comments").innerHTML = "";
COMMENTS.forEach(c => {
  const d = document.createElement("div");
  d.className = "cm"; d.style.setProperty("--d", c.d);
  d.innerHTML = (c.d ? `<span class="arrow">${ICON.arrow}</span>` : "") +
    `<span class="tick"></span><span class="av">${ICON[c.ic]}</span><div class="nm${c.u ? " u" : ""}"></div><div class="tx"></div><div class="tm"></div>`;
  d.querySelector(".nm").textContent = c.name;
  d.querySelector(".tx").textContent = c.text;
  d.querySelector(".tm").textContent = c.time;
  $("comments").append(d);
});

$("flame").innerHTML = ICON.flame;
$("dots").innerHTML = ICON.dotsW;

const onScroll = () => tabs.classList.toggle("scrolled", window.scrollY > 59);
tabs.parentElement.classList.toggle("x", false);
window.addEventListener("scroll", () => document.querySelector(".wrap").classList.toggle("scrolled", window.scrollY > 59), { passive: true });
