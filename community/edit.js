// 수정 / 저장 버튼 (인스티즈·더쿠 공통). 제목과 본문을 직접 고친 뒤 PNG로 저장합니다.
(function(){
  var KEY='community-edit-'+location.pathname;
  var SEL=['#title','#body'];
  var saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
  SEL.forEach(function(s){var el=document.querySelector(s);if(el&&saved[s]!=null)el.innerHTML=saved[s]});
  var bar=document.createElement('div');
  bar.style.cssText='position:fixed;left:50%;bottom:16px;transform:translateX(-50%);display:flex;gap:8px;z-index:99';
  bar.innerHTML='<button id="ebtn" style="padding:10px 18px;border:0;border-radius:20px;background:#333;color:#fff;font-size:15px">수정</button><button id="sbtn" style="padding:10px 18px;border:0;border-radius:20px;background:#56bb6f;color:#fff;font-size:15px">저장</button>';
  document.body.appendChild(bar);
  var editing=false;
  document.getElementById('ebtn').onclick=function(){
    editing=!editing;
    SEL.forEach(function(s){var el=document.querySelector(s);if(el){el.contentEditable=editing;el.style.outline=editing?'1px dashed #56bb6f':''}});
    this.textContent=editing?'완료':'수정';
    if(!editing){var o={};SEL.forEach(function(s){var el=document.querySelector(s);if(el)o[s]=el.innerHTML});try{localStorage.setItem(KEY,JSON.stringify(o))}catch(e){}}
  };
  document.getElementById('sbtn').onclick=function(){
    var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
    if(editing)document.getElementById('ebtn').click();
    (document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){return html2canvas(document.querySelector('.wrap'),{scale:2,useCORS:true,backgroundColor:null,logging:false})}).then(function(c){
      c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='community-post.png';document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png');
    }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')});
  };
})();
