document.addEventListener('click',function(e){
  var a=e.target.closest('.tback,.navbar a');
  if(!a||!a.getAttribute('href'))return;
  e.preventDefault();
  document.body.classList.add('leaving');
  setTimeout(function(){location.href=a.href},160);
});
