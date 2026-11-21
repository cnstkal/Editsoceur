/* 편집 패널 탭 + 미리보기 모드 (Zoom 편집화면과 동일 구성) */
(function(){
 var ed=document.querySelector('.editor');
 if(ed){
  var g=[].slice.call(ed.querySelectorAll('.ps-pn'));
  if(g.length>1){
   var bar=document.createElement('div');bar.className='ps-seg';
   g.forEach(function(p,i){
    var b=document.createElement('button');b.type='button';b.textContent=p.getAttribute('data-t');
    if(i)p.hidden=true;else b.className='on';
    b.onclick=function(){g.forEach(function(x,j){x.hidden=j!==i});[].forEach.call(bar.children,function(c,j){c.classList.toggle('on',j===i)})};
    bar.appendChild(b);
   });
   ed.parentNode.insertBefore(bar,ed);
  }
 }
 var pv=document.getElementById('pvBtn');
 if(pv)pv.onclick=function(){var on=document.body.classList.toggle('pvmode');this.textContent=on?'편집 모드':'미리보기 모드';window.dispatchEvent(new Event('resize'))};
})();
