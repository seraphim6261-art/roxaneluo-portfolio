(() => {
 'use strict';
 const drawer=document.querySelector('.directory-drawer'),toggle=document.querySelector('.directory-toggle');
 if(!drawer||!toggle)return;
 const closeButton=drawer.querySelector('.directory-close'),scroller=drawer.querySelector('.directory-drawer__content');
 const links=[...drawer.querySelectorAll('.directory-item')],reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let positions=[],current=null,pending=false,measuring=false,closing=null,animation=null,opener=null;
 function markCurrent(){
  pending=false;const point=scrollY+innerHeight*.28;let next=null;
  for(const item of positions)if(item.top<=point)next=item.link;
  if(next===current)return;current=next;
  for(const link of links){if(link===current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')}
 }
 function queueCurrent(){if(!pending){pending=true;requestAnimationFrame(markCurrent)}}
 function measure(){measuring=false;positions=links.map(link=>({link,top:document.getElementById(link.hash.slice(1)).getBoundingClientRect().top+scrollY}));markCurrent()}
 function queueMeasure(){if(!measuring){measuring=true;requestAnimationFrame(measure)}}
 function movePanel(open){
  animation?.cancel();if(reduced.matches)return Promise.resolve();
  animation=drawer.animate(open?[{transform:'translateX(calc(-100% - 24px))',opacity:.65},{transform:'translateX(0)',opacity:1}]:[{transform:'translateX(0)',opacity:1},{transform:'translateX(calc(-100% - 24px))',opacity:.65}],{duration:open?290:200,easing:'cubic-bezier(.22,.8,.25,1)',fill:'both'});
  return animation.finished.catch(()=>{});
 }
 function openDirectory(){
  if(drawer.open||closing)return;
  opener=document.activeElement;const scroll=window.portfolioScroll;
  if(scroll){scroll.scrollTo(scrollY,{immediate:true});scroll.stop()}
  document.body.classList.add('directory-open');const editing=document.body.classList.contains('is-text-editing');drawer.classList.toggle('directory-drawer--editing',editing);if(editing)drawer.show();else drawer.showModal();toggle.setAttribute('aria-expanded','true');measure();
  if(current){const top=current.getBoundingClientRect().top-scroller.getBoundingClientRect().top+scroller.scrollTop;scroller.scrollTop=Math.max(0,top-scroller.clientHeight/2+current.offsetHeight/2)}
  closeButton.focus({preventScroll:true});movePanel(true);
 }
 async function closeDirectory(){
  if(closing)return closing;if(!drawer.open)return;
  closing=(async()=>{await movePanel(false);drawer.close();finishClose();animation?.cancel();animation=null;})();
  await closing;closing=null;
 }
 function finishClose(){document.body.classList.remove('directory-open');drawer.classList.remove('directory-drawer--editing');toggle.setAttribute('aria-expanded','false');if(!document.querySelector('dialog[open]'))window.portfolioScroll?.start();opener?.focus({preventScroll:true});opener=null}
 drawer.addEventListener('close',finishClose);
 toggle.addEventListener('click',openDirectory);closeButton.addEventListener('click',closeDirectory);
 drawer.addEventListener('cancel',event=>{event.preventDefault();closeDirectory()});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&drawer.open&&drawer.classList.contains('directory-drawer--editing')&&!event.isComposing){event.preventDefault();closeDirectory()}});
 document.addEventListener('portfolio:editing',()=>{if(drawer.open&&drawer.classList.contains('directory-drawer--editing')&&!document.body.classList.contains('is-text-editing'))closeDirectory()});
 drawer.addEventListener('click',event=>{if(event.target!==drawer)return;const r=drawer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDirectory()});
 drawer.addEventListener('click',async event=>{
  const link=event.target.closest('.directory-item');if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();event.stopPropagation();const target=document.getElementById(link.hash.slice(1));if(!target)return;
  await closeDirectory();history.pushState(null,'',link.hash);
  const focus=()=>{if(!target.hasAttribute('tabindex'))target.setAttribute('tabindex','-1');target.focus({preventScroll:true});queueCurrent()};
  const topbar=document.querySelector('.topbar'),offset=(topbar?.getBoundingClientRect().height||0)+20;
  const destination=Math.max(0,target.getBoundingClientRect().top+scrollY-offset),scroll=window.portfolioScroll;
  if(scroll){scroll.scrollTo(scrollY,{immediate:true});scroll.scrollTo(destination,{duration:.95,lerp:0,easing:t=>1-Math.pow(1-t,4),onComplete:focus})}
  else{window.scrollTo({top:destination,behavior:reduced.matches?'instant':'smooth'});focus()}
 },true);
 window.addEventListener('scroll',queueCurrent,{passive:true});window.addEventListener('resize',queueMeasure);document.addEventListener('portfolio:content-changed',queueMeasure);
 new ResizeObserver(queueMeasure).observe(document.querySelector('main'));document.fonts.ready.then(queueMeasure);queueMeasure();
 function fromHash(){if(location.hash==='#work-directory')openDirectory();else queueCurrent()}
 window.addEventListener('hashchange',fromHash);fromHash();
})();
