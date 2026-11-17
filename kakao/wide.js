const DEFAULT = `제목: 윤둥이
나: 이번일로 뭐라하는 놈 있으면 나한테 데려와
나: 내가 처리할게
상대: 배고팡
나: 무뼈국물닭발에 치즈 주먹밥 계란찜 추가 맞지?
상대: [스티커:😍]
상대: 빨리와`;

const AVATAR = `<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#cfd6dc"/><circle cx="50" cy="38" r="17" fill="#fff"/><path d="M14 100c2-26 20-38 36-38s34 12 36 38z" fill="#fff"/></svg>`;
let name = "윤둥이";

function parse(t){
  const out=[];
  t.split("\n").forEach(l=>{
    l=l.trim(); if(!l) return;
    if(l.startsWith("제목:")){ name=l.slice(3).trim(); return; }
    if(l==="---"){ out.push({gap:true}); return; }
    const m=l.match(/^(나|상대)\s*:\s*(.*)$/); if(!m) return;
    const who=m[1]==="나"?"me":"you", body=m[2];
    const s=body.match(/^\[스티커(?::(.*))?\]$/);
    out.push(s?{who,sticker:s[1]||"😍"}:{who,text:body});
  });
  return out;
}

function render(){
  const items=parse(document.getElementById("src").value);
  document.getElementById("title").textContent=name;
  const chat=document.getElementById("chat"); chat.innerHTML="";
  let prev=null, forceGap=false, shownName=false;
  items.forEach(it=>{
    if(it.gap){ forceGap=true; return; }
    const newGroup = forceGap || !prev || prev.who!==it.who;
    const row=document.createElement("div");
    row.className="row "+it.who+(newGroup&&prev?" gap":"");
    const bubbleHTML = it.sticker
      ? `<div class="sticker">${it.sticker}</div>`
      : `<div class="bubble ${(newGroup||prev?.sticker)?"tail":""}"></div>`;
    if(it.who==="me"){
      row.innerHTML=bubbleHTML;
    }else{
      row.innerHTML = (newGroup ? `<div class="avatar">${AVATAR}</div>` : `<div class="avatar-space"></div>`)
        + `<div class="col">${newGroup?`<div class="name"></div>`:""}${bubbleHTML}</div>`;
      if(newGroup) row.querySelector(".name").textContent=name;
    }
    const b=row.querySelector(".bubble"); if(b) b.textContent=it.text;
    chat.appendChild(row);
    prev=it; forceGap=false;
  });
}

const src=document.getElementById("src"); src.value=DEFAULT;
document.getElementById("apply").onclick=render;
document.getElementById("ratio").onclick=()=>{
  const s=document.getElementById("stage");
  s.style.outline = s.style.outline ? "" : "3px dashed red";
};
render();
