/* Saved illustration composition; no editing UI or browser-local preferences. */
(() => {
 const board=document.querySelector('.board-hero'),art=document.querySelector('.hero-art');
 if(!board||!art)return;
 const mobile=matchMedia('(max-width:800px)');
 function position(){
  art.style.setProperty('--image-x',mobile.matches?'0px':(-.04872389791183295*board.clientWidth)+'px');
  art.style.setProperty('--image-y',mobile.matches?'0px':(-.04345239911760602*board.clientHeight)+'px');
  art.style.setProperty('--image-scale',mobile.matches?'1':'1.15');
 }
 new ResizeObserver(position).observe(board);mobile.addEventListener('change',position);position();
})();
