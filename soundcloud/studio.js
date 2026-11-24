(function(){
var S=window.S={tab:0,png:'soundcloud.png'},$=function(i){return document.getElementById(i)},pv=$('preview'),tm;
S.esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
S.render=function(){clearTimeout(tm);tm=setTimeout(function(){
  pv.srcdoc='<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"><style>'+S.css+'</style></head><body>'+S.view()+'<script>'+S.js+'<\\/script></body></html>'},60)};
S.row=function(el,label,ctrl){var l=document.createElement('label');l.appendChild(document.createTextNode(label));l.appendChild(ctrl);el.appendChild(l)};
S.text=function(el,label,o,k){var i=document.createElement('input');i.value=o[k];i.oninput=function(){o[k]=i.value;S.render()};S.row(el,label,i)};
S.file=function(el,label,o,k){var i=document.createElement('input');i.type='file';i.accept='image/*';
  i.onchange=function(){var f=i.files[0];if(!f)return;var r=new FileReader();r.onload=function(e){o[k]=e.target.result;S.render()};r.readAsDataURL(f)};S.row(el,label,i)};
S.btn=function(el,txt,fn,cls){var b=document.createElement('button');b.type='button';b.className='ps-ghost '+(cls||'');b.textContent=txt;b.onclick=fn;el.appendChild(b)};
S.grp=function(el,txt){var d=document.createElement('div');d.className='ps-grp';d.textContent=txt;el.appendChild(d)};
S.build=function(){var ed=$('editor'),bar=$('seg');ed.innerHTML='';bar.innerHTML='';
  S.panels.forEach(function(p,i){var d=document.createElement('div');d.className='ps-pn';d.hidden=i!==S.tab;p.build(d);ed.appendChild(d);
    var b=document.createElement('button');b.type='button';b.textContent=p.t;b.className=i===S.tab?'on':'';b.onclick=function(){S.tab=i;S.build()};bar.appendChild(b)})};
S.start=function(){S.build();S.render()};
$('reset').onclick=function(){S.init();S.build();S.render()};
$('editToggle').onclick=function(){$('panel').classList.toggle('open')};
$('png').onclick=async function(){
  var doc=pv.contentDocument;if(!doc||!doc.body)return;
  var w=pv.clientWidth,h=pv.clientHeight;
  var button=$('png');button.disabled=true;button.textContent='이미지 준비 중…';
  try{
    if(doc.fonts&&doc.fonts.ready)await doc.fonts.ready;
    var waits=[];
    Array.prototype.forEach.call(doc.images,function(img){
      if(!img.complete)waits.push(new Promise(function(resolve){img.addEventListener('load',resolve,{once:true});img.addEventListener('error',resolve,{once:true})}));
      if(img.decode)waits.push(img.decode().catch(function(){}));
    });
    Array.prototype.forEach.call(doc.querySelectorAll('*'),function(el){
      var bg=getComputedStyle(el).backgroundImage,match,rx=/url\\(["']?(.*?)["']?\\)/g;
      while((match=rx.exec(bg))!==null){var image=new Image();image.src=match[1];if(image.decode)waits.push(image.decode().catch(function(){}));else if(!image.complete)waits.push(new Promise(function(resolve){image.onload=image.onerror=resolve}))}
    });
    await Promise.all(waits);
    await new Promise(function(resolve){requestAnimationFrame(function(){requestAnimationFrame(resolve)})});
    var c=await html2canvas(doc.body,{scale:4,width:w,height:h,backgroundColor:null,windowWidth:w,windowHeight:h,useCORS:true,imageTimeout:20000});
    var a=document.createElement('a');a.download=S.png;a.href=c.toDataURL('image/png');a.click();
  }catch(err){console.error(err);alert('PNG 저장 중 오류가 발생했어. 이미지를 다시 확인하고 시도해줘.')}
  finally{button.disabled=false;button.textContent='PNG 저장'}
};
})();