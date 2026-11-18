/* 편집 패널 탭 자동 생성: data-t가 있는 .ps-pn 또는 h2 제목 단위로 묶어서 탭으로 표시 */
(function(){
  var ed=document.querySelector('.ps-edwrap .editor')||document.querySelector('.editor');
  if(!ed) return;
  var side=ed.closest('.ps-side')||ed.parentNode;
  var groups=[].slice.call(ed.querySelectorAll(':scope > .ps-pn'));
  function mk(t){var g=document.createElement('div');g.className='ps-pn';g.setAttribute('data-t',t);return g}
  if(!groups.length){
    var kids=[].slice.call(ed.children),cur=null;
    if(kids.filter(function(k){return k.tagName==='H2'}).length<2) return;
    kids.forEach(function(k){
      if(k.tagName==='H2'||!cur){cur=mk(k.tagName==='H2'?k.textContent.trim():'기본');ed.insertBefore(cur,k);groups.push(cur)}
      cur.appendChild(k);
    });
  }
  if(groups.length<2) return;
  [].forEach.call(side.querySelectorAll(':scope > .ps-seg'),function(o){o.remove()});
  var bar=document.createElement('div');bar.className='ps-seg';
  groups.forEach(function(g,i){
    var b=document.createElement('button');b.type='button';b.textContent=g.getAttribute('data-t');
    if(i===0)b.className='on';
    b.onclick=function(){groups.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};
    bar.appendChild(b);
    g.hidden=i!==0;
  });
  ed.parentNode.insertBefore(bar,ed);
})();
