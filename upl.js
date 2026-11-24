/* 공용 이미지 업로드 필드: 썸네일 미리보기 + 파일명 표시 (기존 input 동작은 그대로 유지) */
(function(){
  function bind(wrap){
    var inp=wrap.querySelector('input[type=file]'),img=wrap.querySelector('.upl-th img'),tag=wrap.querySelector('.upl-th span'),nm=wrap.querySelector('.upl-name');
    if(!inp)return;
    inp.addEventListener('change',function(){
      var f=inp.files&&inp.files[0];
      if(!f){if(img)img.removeAttribute('src');if(tag)tag.hidden=false;if(nm)nm.textContent='선택된 파일 없음';return}
      if(img){img.src=URL.createObjectURL(f);}
      if(tag)tag.hidden=true;
      if(nm)nm.textContent=f.name;
    });
  }
  [].forEach.call(document.querySelectorAll('.upl'),bind);
})();
