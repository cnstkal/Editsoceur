const $=i=>document.getElementById(i),paper=$('paper'),t=$('text'),body=$('body');

const fonts=['Nanum Pen Script','Gaegu','Hi Melody','Gamja Flower','Gowun Batang','Nanum Myeongjo','Pretendard'];

// [이름, 기본 글자색, 기본 여백]
const papers=[['레몬 밴드','#5a5040',11],['핑크 라벨','#8a4a5e',12],['스카이 헤더','#36597f',12],['민트 프레임','#2f5d4b',12],['라벤더','#5a4880',12],['도트 노트','#4d4235',11],['바인더','#54463a',11],['네이비 골드','#f3ecd8',12]];

const ratios=[['세로 3:4.2',3,4.2],['세로 3:4',3,4],['세로 4:5',4,5],['세로 2:3',2,3],['세로 9:16',9,16],['정사각 1:1',1,1],['가로 4:3',4,3],['가로 16:9',16,9],['A4',1,1.414]];

const TXT=`사랑하는 너에게,

오늘 문득 네 생각이 나서 편지를 써.

요즘 날씨가 참 좋더라. 네가 보고 싶은 하루야.

- 나로부터`;

let cur=0;

fonts.forEach(f=>{const o=document.createElement('option');o.value=o.textContent=f;$('font').appendChild(o)});

ratios.forEach(([n,w,h],i)=>{const o=document.createElement('option');o.value=i;o.textContent=n;$('ratio').appendChild(o)});

$('ratio').insertAdjacentHTML('beforeend','<option value="x">직접 입력</option>');

papers.forEach(([n],i)=>{const d=document.createElement('button');d.className='pp'+(i?'':' on');

d.innerHTML=`<div class="paper p${i+1}"><span class="mt" style="color:${papers[i][1]}">Aa</span></div>${n}`;

d.onclick=()=>setPaper(i);$('papers').appendChild(d)});

function setPaper(i,keep){

cur=i;paper.className='paper p'+(i+1);

document.querySelectorAll('.pp').forEach((x,k)=>x.classList.toggle('on',k==i));

if(!keep){$('color').value=papers[i][1];$('pad').value=papers[i][2]}

apply();

}

function apply(){

const u=paper.clientWidth/100;

document.querySelectorAll('.paper').forEach(p=>p.style.setProperty('--u',(p.clientWidth/100)+'px'));

paper.style.setProperty('--pad',$('pad').value);

paper.style.aspectRatio=`${$('rw').value}/${$('rh').value}`;

t.style.setProperty('--lh',$('lh').value);

t.style.fontFamily=`'${$('font').value}',sans-serif`;

t.style.fontSize=($('size').value/5.2*u)+'px';

t.style.letterSpacing=($('ls').value/1000)+'em';

t.style.lineHeight=$('lh').value;

t.style.color=$('color').value;

t.style.textAlign=$('ctr').checked?'center':'left';

}

['font','size','ls','lh','color','ctr','pad','rw','rh'].forEach(i=>$(i).oninput=()=>{if(i=='rw'||i=='rh')$('ratio').value='x';apply()});

$('ratio').onchange=e=>{if(e.target.value=='x')return;const r=ratios[e.target.value];$('rw').value=r[1];$('rh').value=r[2];apply()};

document.querySelectorAll('.ps-seg button').forEach(b=>b.onclick=()=>{

document.querySelectorAll('.ps-seg button').forEach(x=>x.classList.toggle('on',x==b));

['a','b','c'].forEach(k=>$('p'+k).hidden=k!=b.dataset.t)});

body.oninput=()=>t.innerText=body.value;

t.oninput=()=>body.value=t.innerText;

function init(){t.innerText=body.value=TXT;$('font').value='Nanum Pen Script';$('size').value=22;$('ls').value=-20;$('lh').value=1.9;$('ctr').checked=false;$('ratio').value=0;$('rw').value=3;$('rh').value=4.2;setPaper(0)}

$('reset').onclick=init;

$('pv').onclick=()=>{document.body.classList.toggle('pvmode');$('pv').textContent=document.body.classList.contains('pvmode')?'편집으로':'미리보기';apply()};

$('savePng').onclick=()=>html2canvas(paper,{scale:2,backgroundColor:null}).then(c=>{const a=document.createElement('a');a.download='letter.png';a.href=c.toDataURL();a.click()});

new ResizeObserver(apply).observe(paper);

document.fonts&&document.fonts.ready.then(apply);

init();
