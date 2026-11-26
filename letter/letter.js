const $=i=>document.getElementById(i),paper=$('paper'),t=$('text'),panel=$('panel'),fab=$('fab');
const fonts=['Nanum Pen Script','Gaegu','Hi Melody','Gamja Flower','Gowun Batang','Nanum Myeongjo','sans-serif'];
const sw=['#fdf8ec','#ffe9ef','#eef6ff','#d9bf8e','#e9e1ff'];
fonts.forEach(f=>{const o=document.createElement('option');o.value=o.textContent=f;o.style.fontFamily=f;$('font').appendChild(o)});
sw.forEach((c,i)=>{const d=document.createElement('div');d.className='sw'+(i?'':' on');d.style.background=c;
 d.onclick=()=>{paper.className='paper p'+(i+1);document.querySelectorAll('.sw').forEach(x=>x.classList.remove('on'));d.classList.add('on');
 if(i==3&&$('color').value=='#3a3330')set('color','#4a3418')};$('papers').appendChild(d)});
function set(id,v){$(id).value=v;apply()}
function apply(){
 t.style.fontFamily=`'${$('font').value}',sans-serif`;
 t.style.fontSize=$('size').value+'px';
 t.style.letterSpacing=($('ls').value/1000)+'em';
 t.style.lineHeight=$('lh').value;
 t.style.color=$('color').value;
 $('sv').textContent=$('size').value;$('lv').textContent=$('ls').value;$('hv').textContent=$('lh').value;
 t.style.backgroundSize='';
}
['font','size','ls','lh','color'].forEach(i=>$(i).oninput=apply);
$('rst').onclick=()=>set('ls',-20);
fab.onclick=()=>{panel.classList.add('open');fab.style.display='none'};
document.querySelector('.grab').onclick=()=>{panel.classList.remove('open');fab.style.display='block'};
$('font').value='Nanum Pen Script';apply();
