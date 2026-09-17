const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
// Display the supplied sprite sheets intact, using CSS windows for each drawing.
function doodle(kind,index,extra='') {
 const item=document.createElement('span');
 const cols=kind==='tools'?4:5, rows=kind==='tools'?3:4;
 item.className=`supplied-doodle doodle-${kind} ${extra}`;
 item.style.setProperty('--sprite-x',`${index%cols/(cols-1)*100}%`);
 item.style.setProperty('--sprite-y',`${Math.floor(index/cols)/(rows-1)*100}%`);
 item.setAttribute('aria-hidden','true');
 return item;
}
const railElements=[...document.querySelectorAll('.stamp-rail')];
// Crop windows preserve the supplied sheet and the individual chalk accents.
const borderWindows=[
 [40,40,345,350],[390,48,340,350],[732,42,350,340],
 [44,366,350,330],[389,372,330,330],[737,383,348,308],
 [48,694,335,299],[390,680,338,324],[730,689,347,318],
 [36,989,357,352],[399,1000,325,329],[718,982,370,363]
];
railElements.forEach((rail,side)=>{
 for(let i=0;i<64;i++){
  const [x,y,w,h]=borderWindows[(i+side*6)%borderWindows.length];
  const item=document.createElement('span');
  item.className='supplied-doodle stamp doodle-border';
  item.setAttribute('aria-hidden','true');
  item.style.backgroundSize=`${1122/w*100}% ${1402/h*100}%`;
  item.style.backgroundPosition=`${x/(1122-w)*100}% ${y/(1402-h)*100}%`;
  item.style.setProperty('--tile-ratio',`${w} / ${h}`);
  item.style.setProperty('--lean',`${[-4,3,-2,5,0][(i+side)%5]}deg`);
  rail.appendChild(item);
 }
});
const backgroundDoodles=document.createElement('div');
backgroundDoodles.className='background-doodles';backgroundDoodles.setAttribute('aria-hidden','true');
[[15,9,17,-17],[8,90,27,12],[18,7,66,-13],[9,88,82,14],[19,37,95,-7],[3,67,7,9]].forEach(([index,x,y,angle])=>{
 const item=doodle('creative',index,'ambient-doodle');
 item.style.cssText+=`;left:${x}%;top:${y}%;--lean:${angle}deg`;
 backgroundDoodles.appendChild(item);
});
document.body.prepend(backgroundDoodles);
[['.floating-left',4],['.floating-right',9],['.hero-sprig',2],['.corner-flower',12],['.footer-flower',17]].forEach(([selector,index])=>{
 const previous=document.querySelector(selector);
 if(previous)previous.replaceWith(doodle('creative',index,previous.getAttribute('class')));
});
const words=['story.','scene.','film.','world.']; let wordIndex=0; let wordTimer,wordDelay;
const word=document.querySelector('#changing-word');
function beginWords(){clearInterval(wordTimer);clearTimeout(wordDelay);word.classList.remove('word-changing');if(reduceMotion.matches||document.hidden||document.body.classList.contains('is-text-editing')||word.dataset.customText==='true')return;wordIndex=Math.max(0,words.indexOf(word.textContent.trim()));wordTimer=setInterval(()=>{word.classList.add('word-changing');wordDelay=setTimeout(()=>{if(reduceMotion.matches||document.hidden||document.body.classList.contains('is-text-editing')||word.dataset.customText==='true'){word.classList.remove('word-changing');return}wordIndex=(wordIndex+1)%words.length;(word.querySelector('[data-edit-key]')||word).textContent=words[wordIndex];word.classList.remove('word-changing');},260);},3260)}
beginWords();document.addEventListener('visibilitychange',beginWords);reduceMotion.addEventListener('change',beginWords);document.addEventListener('portfolio:editing',beginWords);
const art=document.querySelector('.hero-art'),hero=document.querySelector('.board-hero');
hero.addEventListener('pointermove',event=>{if(reduceMotion.matches||event.pointerType!=='mouse'||document.body.classList.contains('is-image-editing')||document.body.classList.contains('is-text-editing'))return;const box=hero.getBoundingClientRect();const x=(event.clientX-box.left)/box.width-.5;const y=(event.clientY-box.top)/box.height-.5;art.style.transform=`translate(${x*8}px,${y*5}px) rotate(${x*1.2}deg)`;});
hero.addEventListener('pointerleave',()=>{art.style.transform='';});
