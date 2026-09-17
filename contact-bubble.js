(() => {
 'use strict';
 const trigger=document.querySelector('.contact-trigger'),bubble=document.querySelector('#contact-bubble');
 if(!trigger||!bubble)return;
 const status=bubble.querySelector('.contact-bubble__status'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let queued=false,animation=null;
 function position(){
  queued=false;if(!bubble.matches(':popover-open'))return;
  const r=trigger.getBoundingClientRect();
  if(r.bottom<0||r.top>innerHeight){bubble.hidePopover();return}
  const width=bubble.offsetWidth,height=bubble.offsetHeight,center=r.left+r.width/2;
  const left=Math.max(16,Math.min(center-width*.76,innerWidth-width-16));
  const above=r.bottom+16+height>innerHeight-16&&r.top>height+32;
  bubble.style.left=left+'px';bubble.style.top=(above?r.top-height-16:r.bottom+16)+'px';
  bubble.style.setProperty('--tail-x',Math.max(24,Math.min(center-left,width-24))+'px');
  bubble.dataset.tail=above?'bottom':'top';
 }
 function queuePosition(){if(!queued){queued=true;requestAnimationFrame(position)}}
 bubble.addEventListener('beforetoggle',event=>{if(event.newState==='open'){status.textContent='';queuePosition()}});
 bubble.addEventListener('toggle',event=>{
  const open=event.newState==='open';trigger.setAttribute('aria-expanded',String(open));animation?.cancel();
  if(open){position();if(!reduced.matches)animation=bubble.animate([{opacity:0,transform:'translateY(-5px) scale(.97)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:180,easing:'cubic-bezier(.22,.8,.25,1)'});}
 });
 window.addEventListener('resize',queuePosition);window.addEventListener('scroll',queuePosition,{passive:true});
 document.fonts.ready.then(queuePosition);document.addEventListener('portfolio:content-changed',queuePosition);
 bubble.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
  const field=document.getElementById(button.dataset.copy),value=field.textContent.trim();
  try{await navigator.clipboard.writeText(value);status.textContent=button.dataset.copy==='contact-phone'?'电话号码已复制':'QQ 号已复制';}
  catch{const range=document.createRange();range.selectNodeContents(field);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);status.textContent='请长按号码或按 Ctrl+C 复制';}
 }));
})();
