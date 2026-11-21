(function(){
var $=function(i){return document.getElementById(i)};
function u(s){return 'data:image/svg+xml;utf8,'+encodeURIComponent(s)}
var H='<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8e0fb"/><stop offset="1" stop-color="#eafaff"/></linearGradient></defs>';
var B=u('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 362" preserveAspectRatio="xMidYMid slice">'+H+'<rect width="270" height="362" fill="url(#g)"/><g fill="#fff"><rect x="97" y="40" width="112" height="40" rx="20"/><circle cx="148" cy="42" r="30"/><circle cx="182" cy="52" r="22"/></g><path d="M0 235c40-18 100-12 150 10s80 18 120 8v109H0z" fill="#c2e083"/><path d="M0 285c70-30 150-20 200 0 30 12 55 10 70 4v73H0z" fill="#87a80a"/></svg>');
var M=u('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 106" preserveAspectRatio="xMidYMid slice">'+H+'<rect width="82" height="106" fill="url(#g)"/><g fill="#fff"><rect x="17" y="17" width="46" height="13" rx="6.500"/><circle cx="34" cy="18" r="9"/></g><path d="M0 72c20-6 45-4 82 8v26H0z" fill="#c2e083"/><path d="M0 86c25-12 55-10 82 0v20H0z" fill="#87a80a"/></svg>');
var S;
function draw(){$('vT').textContent=S.t;$('vB').src=S.b;$('vS').src=S.s}
function init(){S={t:'13:14',b:B,s:M};$('iT').value=S.t;$('iB').value='';$('iS').value='';draw()}
function rd(f,cb){if(!f)return;var r=new FileReader();r.onload=function(){cb(r.result)};r.readAsDataURL(f)}
$('iT').oninput=function(){S.t=this.value;draw()};
$('iB').onchange=function(){rd(this.files[0],function(d){S.b=d;draw()})};
$('iS').onchange=function(){rd(this.files[0],function(d){S.s=d;draw()})};
$('reset').onclick=init;
$('save').onclick=function(){
html2canvas($('snap'),{backgroundColor:null,scale:4,useCORS:true}).then(function(c){
var a=document.createElement('a');a.download='bereal.png';a.href=c.toDataURL('image/png');a.click();
});
};
init();
})();
