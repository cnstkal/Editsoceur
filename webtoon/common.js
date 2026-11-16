window.W=(function(){
  var $=function(i){return document.getElementById(i)};
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function cv(x,i){return x.img?"background-image:url('"+x.img+"')":'background:linear-gradient(160deg,hsl('+(i*57%360)+',28%,38%),hsl('+((i*57+40)%360)+',32%,16%))'}
  var SB='<svg viewBox="0 0 150 38"><g fill="currentColor"><rect x="0" y="22" width="6" height="12" rx="1.500"/><rect x="10" y="16" width="6" height="18" rx="1.500"/><rect x="20" y="10" width="6" height="24" rx="1.500"/><rect x="30" y="4" width="6" height="30" rx="1.500"/><circle cx="67" cy="29" r="4"/><rect x="96" y="3" width="50" height="30" rx="9" opacity=".35"/><rect x="96" y="3" width="32" height="30" rx="9"/></g><path d="M48 12a24 24 0 0 1 38 0M54 19a15 15 0 0 1 26 0" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/></svg>';
  var A='fill="none" stroke="#111" stroke-width="1.900" stroke-linecap="round" stroke-linejoin="round"';
  var NAV='<div class="gn"><span class="on"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="4" fill="#111"/><path d="M8 2.500v4M16 2.500v4" stroke="#111" stroke-width="2.400" stroke-linecap="round"/></svg><em>웹툰</em></span>'+
    '<span><svg viewBox="0 0 24 24"><rect x="2.500" y="6" width="16" height="13" rx="3" '+A+'/><path d="M8.500 9.500 13 12.500l-4.500 3z" fill="#111"/><path d="m18.500 10 3-2v8l-3-2" '+A+'/></svg><u class="nb">N</u><em>컷츠</em></span>'+
    '<span><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" '+A+'/><path d="m12 7.500 1.500 3.200 3.500.4-2.600 2.400.7 3.500-3.100-1.800-3.100 1.800.7-3.500L7 11.100l3.500-.4z" '+A+'/></svg><em>베스트도전</em></span>'+
    '<span><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.500" '+A+'/><path d="M8.500 14.500a4.500 4.500 0 0 0 7 0" '+A+'/><circle cx="9" cy="9.500" r="1.100" fill="#111"/><circle cx="15" cy="9.500" r="1.100" fill="#111"/></svg><em>MY</em></span>'+
    '<span><svg viewBox="0 0 24 24"><rect x="3.500" y="3.500" width="7" height="7" rx="2" '+A+'/><rect x="13.500" y="3.500" width="7" height="7" rx="2" '+A+'/><rect x="3.500" y="13.500" width="7" height="7" rx="2" '+A+'/><rect x="13.500" y="13.500" width="7" height="7" rx="2" '+A+'/></svg><em>더보기</em></span></div>';

  function start(o){
    var S;
    function persist(){try{localStorage.setItem(o.key,JSON.stringify(S))}catch(e){}}
    function clone(x){return JSON.parse(JSON.stringify(x))}
    function lab(f,x){
      var v=x[f[0]],t=f[2]||'t';
      if(t==='f')return '<label>'+f[1]+'<input type="file" accept="image/*" data-f="'+f[0]+'"></label>';
      if(t==='c')return '<label style="display:flex;align-items:center;gap:6px"><input type="checkbox" style="width:auto;margin:0" data-f="'+f[0]+'"'+(v?' checked':'')+'>'+f[1]+'</label>';
      if(t==='s')return '<label>'+f[1]+'<select data-f="'+f[0]+'">'+f[3].map(function(p){return '<option value="'+esc(p[0])+'"'+(String(v)===String(p[0])?' selected':'')+'>'+esc(p[1])+'</option>'}).join('')+'</select></label>';
      return '<label>'+f[1]+'<input data-f="'+f[0]+'" value="'+esc(v)+'"></label>'}
    function lists(){(o.lists||[]).forEach(function(L){$(L.el).innerHTML=S[L.p].map(function(x,i){
      return '<div class="pe" data-i="'+i+'"><b>'+(i+1)+'번</b>'+L.f.map(function(f){return lab(f,x)}).join('')+'<div class="row"><button type="button" class="xb" data-a="u">↑</button><button type="button" class="xb" data-a="d">↓</button><button type="button" class="xb" data-a="x">✕ 삭제</button></div></div>'}).join('')})}
    function fill(){(o.fields||[]).forEach(function(a){var e=$(a[0]);if(e.type!=='file')e.value=S[a[1]]})}
    function load(reset){
      if(reset){try{localStorage.removeItem(o.key)}catch(e){}S=clone(o.def)}
      else{try{var v=localStorage.getItem(o.key);S=v?JSON.parse(v):clone(o.def);if(!S||typeof S!=='object')throw 0}catch(e){S=clone(o.def)}}
      fill();lists();o.render(S)}
    function rd(f,cb){var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
    (o.fields||[]).forEach(function(a){var e=$(a[0]);
      function h(ev){
        if(e.type==='file'){if(ev.type!=='change'||!e.files[0])return;rd(e.files[0],function(d){S[a[1]]=d;persist();o.render(S)})}
        else{S[a[1]]=a[2]==='c'?e.checked:e.value;persist();o.render(S)}}
      e.addEventListener('input',h);e.addEventListener('change',h)});
    (o.lists||[]).forEach(function(L){var c=$(L.el);
      function h(ev){var t=ev.target,f=t.dataset.f,pe=t.closest('.pe');if(!f||!pe)return;var x=S[L.p][+pe.dataset.i];
        if(t.type==='file'){if(ev.type!=='change'||!t.files[0])return;rd(t.files[0],function(d){x[f]=d;persist();o.render(S)});return}
        x[f]=t.type==='checkbox'?(t.checked?1:0):t.value;persist();o.render(S)}
      c.addEventListener('input',h);c.addEventListener('change',h);
      c.addEventListener('click',function(ev){var a=ev.target.dataset.a;if(!a)return;var i=+ev.target.closest('.pe').dataset.i,m=S[L.p],t;
        if(a==='x')m.splice(i,1);else if(a==='u'&&i>0){t=m[i];m[i]=m[i-1];m[i-1]=t}else if(a==='d'&&i<m.length-1){t=m[i];m[i]=m[i+1];m[i+1]=t}
        persist();lists();o.render(S)});
      if(L.add)$(L.add).onclick=function(){S[L.p].push(clone(L.blank));persist();lists();o.render(S)}});
    $('reset').onclick=function(){load(true)};
    $('savePng').onclick=function(){var b=this,t=b.textContent;b.disabled=true;b.textContent='저장 중...';
      (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){
        return html2canvas($(o.frame),{scale:4,useCORS:true,backgroundColor:null,logging:false})}).then(function(c){
        c.toBlob(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download=o.name+'.png';
          document.body.appendChild(a);a.click();a.remove();b.disabled=false;b.textContent=t},'image/png')
      }).catch(function(){b.disabled=false;b.textContent=t;alert('PNG 저장에 실패했습니다.')})};
    document.addEventListener('gesturestart',function(e){e.preventDefault()},{passive:false});
    load(false)}
  return{$:$,esc:esc,cv:cv,sb:SB,nav:NAV,start:start}
})();
