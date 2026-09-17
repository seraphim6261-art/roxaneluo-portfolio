(() => {
 const art=document.querySelector('.hero-art'),trigger=art?.querySelector('.hero-blink-trigger');if(!trigger)return;
 const original=trigger.querySelector('img'),plane=trigger.querySelector('.hero-eyes-plane'),frame=new Image();
 const editing=()=>document.body.classList.contains('is-image-editing')||document.body.classList.contains('is-text-editing');
 let ready=false,pending=false,resetTimer;
 function fit(){const width=art.clientWidth,height=art.clientHeight,ratio=Math.min(width/1353,height/1162),w=1353*ratio,h=1162*ratio;Object.assign(plane.style,{left:(width-w)/2+'px',top:height-h+'px',width:w+'px',height:h+'px'});}
 function blink(){if(editing())return;if(!ready){pending=true;return;}clearTimeout(resetTimer);trigger.classList.remove('is-blinking');void trigger.offsetWidth;trigger.classList.add('is-blinking');resetTimer=setTimeout(()=>trigger.classList.remove('is-blinking'),matchMedia('(prefers-reduced-motion:reduce)').matches?180:550);}
 frame.src='assets/elephant-closed-eyes.webp';frame.decode().then(()=>{ready=true;trigger.dataset.blinkReady='true';if(pending){pending=false;blink();}}).catch(()=>{trigger.dataset.blinkReady='false';});
 trigger.addEventListener('click',blink);new ResizeObserver(fit).observe(art);original.addEventListener('load',fit);fit();
 document.addEventListener('portfolio:editing',()=>{if(editing()){clearTimeout(resetTimer);pending=false;trigger.classList.remove('is-blinking');}});
})();
