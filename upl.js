/* 공용 이미지 업로드 카드: 기존 input[type=file]을 그대로 옮겨 썸네일·파일명·변경·삭제 UI로 통일 */
(function(){
  var NONE='선택된 파일 없음';
  function bind(card){
    if(card._b)return;card._b=1;
    var inp=card.querySelector('input[type=file]'),img=card.querySelector('.upl-th img'),tag=card.querySelector('.upl-th span'),nm=card.querySelector('.upl-name'),body=card.querySelector('.upl-body');
    if(!inp||!img||!tag||!nm||!body)return;
    var acts=card.querySelector('.upl-acts');
    if(!acts){acts=document.createElement('div');acts.className='upl-acts';body.appendChild(acts);
      [].slice.call(body.children).forEach(function(x){if(x.classList.contains('upl-btn')||x.classList.contains('upl-del'))acts.appendChild(x)})}
    function clear(){img.removeAttribute('src');tag.hidden=false;nm.textContent=NONE}
    inp.addEventListener('change',function(){var f=inp.files&&inp.files[0];if(!f){clear();return}img.src=URL.createObjectURL(f);tag.hidden=true;nm.textContent=f.name},true);
    var del=card.querySelector('.upl-del');if(del)del.addEventListener('click',clear);
    card._clear=clear;
  }
  function build(inp){
    if(!inp.id||inp.closest('.upl')||inp.multiple||inp.hasAttribute('webkitdirectory'))return;
    var acc=inp.getAttribute('accept')||'';if(acc&&acc.indexOf('image')<0)return;
    var label=inp.parentNode;if(!label||label.tagName!=='LABEL'||label.id||label.getAttribute('style'))return;
    if(label.children.length!==1)return;
    var title='';[].forEach.call(label.childNodes,function(n){if(n.nodeType===3)title+=n.nodeValue});title=title.replace(/\s+/g,' ').replace(/^\+\s*/,'').trim();
    var card=document.createElement('div');card.className='upl';
    card.innerHTML='<div class="upl-th"><img alt=""><span>없음</span></div><div class="upl-body"><span class="upl-label"></span><b class="upl-name">'+NONE+'</b><div class="upl-acts"><label class="upl-btn">변경</label></div></div>';
    card.querySelector('.upl-label').textContent=title||'이미지';
    var acts=card.querySelector('.upl-acts');acts.firstChild.appendChild(inp);
    var del=inp.id&&document.getElementById(inp.id+'_del');if(del)acts.appendChild(del);
    label.parentNode.replaceChild(card,label);
    bind(card);
  }
  function scan(root){
    [].forEach.call((root||document).querySelectorAll('.upl'),bind);
    [].forEach.call((root||document).querySelectorAll('.ps-side input[type=file]'),build);
  }
  function init(){
    scan();
    var side=document.querySelector('.ps-side');
    if(side&&window.MutationObserver){var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(scan,30)}).observe(side,{childList:true,subtree:true})}
    document.addEventListener('click',function(e){
      var b=e.target.closest&&e.target.closest('#reset,.ps-ghost,[data-reset]');
      if(b)setTimeout(function(){[].forEach.call(document.querySelectorAll('.upl'),function(c){var i=c.querySelector('input[type=file]');if(i&&!i.value&&c._clear)c._clear()})},60)});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
