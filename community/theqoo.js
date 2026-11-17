// ===== 데이터 (여기만 수정) =====
const POST = {
  category: "케이돌토크 카테고리",
  title: "유우시 아무래도 mbti 검사 다시해야할거같음",
  url: "https://example.com/board/0000000000",
  author: "무명의 더쿠", date: "03-14", views: 1165,
  body: " 왔다갔다하긴했지만 넘 대문자 I라고",
  star: 0
};
const COMMENTS = [
  { name: "무명의 더쿠", date: "2024-03-14", text: "이 아이가 E,,,,?" },
  { name: "무명의 더쿠", date: "2024-03-14", text: "우시 E나온대??라스타트에서 잇프제라길래 I인줄" },
  { name: "무명의 더쿠", date: "2024-03-14", text: "진짜 대문자 I 확실해보인다고ㅋㅋㅋ" }
];
const S = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const F = p => `<svg viewBox="0 0 24 24" fill="currentColor">${p}</svg>`;
const ICON = {
  login: S('<path d="M10 7l5 5-5 5M15 12H3M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3"/>'),
  chat: S('<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/>'),
  share: F('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8 11l8-5M8 13l8 5" stroke="currentColor" stroke-width="2"/>'),
  star: F('<path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z"/>'),
  list: S('<path d="M3 6h.01M3 12h.01M3 18h.01M8 6h13M8 12h13M8 18h13" stroke-width="3"/>')
};
const $ = id => document.getElementById(id), T = (id, t) => $(id).textContent = t;
$("login").innerHTML = ICON.login;
T("cat", POST.category); T("title", POST.title); T("url", POST.url);
$("meta").innerHTML = "<span></span><i></i><span></span><i></i><span></span>";
[POST.author, POST.date, "조회 수 " + POST.views].forEach((t, i) => $("meta").children[i * 2].textContent = t);
T("body", POST.body);
$("acts").innerHTML = `<span>${ICON.chat}댓글 <b>${COMMENTS.length}</b></span><span class="sp"></span><span>${ICON.share}</span><span>${ICON.star}${POST.star}</span><span>${ICON.list}목록</span>`;
COMMENTS.forEach((c, i) => {
  const d = document.createElement("div"); d.className = "cm";
  d.innerHTML = '<div class="nm"><b></b><span></span></div><div class="tx"></div>';
  d.querySelector("b").textContent = `${i + 1}. ${c.name}`;
  d.querySelector("span").textContent = c.date; d.querySelector(".tx").textContent = c.text;
  $("comments").append(d);
});
