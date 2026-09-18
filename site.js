/* app.js */
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

;
/* douyin-stats.js */
// Public counts observed in the official player. Rounded platform display values.
window.douyinStats = {
  "7605950150100157362": {
    "likes": "4.2万",
    "comments": "2401",
    "favorites": "2661",
    "date": "2026-09-16",
    "source": "https://open.douyin.com/player/video?vid=7605950150100157362&autoplay=0",
    "account": "@故宫博物院"
  },
  "7605807871187619135": {
    "likes": "5.3万",
    "comments": "1663",
    "favorites": "2820",
    "date": "2026-09-16",
    "source": "https://open.douyin.com/player/video?vid=7605807871187619135&autoplay=0",
    "account": "@故宫博物院"
  },
  "7605811600137653510": {
    "likes": "4.7万",
    "comments": "1405",
    "favorites": "2008",
    "date": "2026-09-16",
    "source": "https://open.douyin.com/player/video?vid=7605811600137653510&autoplay=0",
    "account": "@故宫博物院"
  },
  "7605812867245395219": {
    "likes": "4.2万",
    "comments": "1436",
    "favorites": "1979",
    "date": "2026-09-16",
    "source": "https://open.douyin.com/player/video?vid=7605812867245395219&autoplay=0",
    "account": "@故宫博物院"
  },
  "7617752892186873126": {
    "likes": "18.3万",
    "comments": "6902",
    "favorites": "1.3万",
    "date": "2026-09-16",
    "source": "https://open.douyin.com/player/video?vid=7617752892186873126&autoplay=0",
    "account": "@豆包"
  },
  "7595114318467714313": {
    "likes": "4.4万",
    "comments": "439",
    "favorites": "1433",
    "date": "2026-09-16",
    "source": "https://open.douyin.com/player/video?vid=7595114318467714313&autoplay=0",
    "account": "@抖音和ta的朋友们"
  },
  "7589583000012493032": {
    "likes": "3.4万",
    "comments": "2507",
    "favorites": "3981",
    "date": "2026-09-16",
    "source": "https://open.douyin.com/player/video?vid=7589583000012493032&autoplay=0",
    "account": "@豆包"
  },
  "7586133073617718565": {
    "likes": "2.8万",
    "comments": "2626",
    "favorites": "2309",
    "date": "2026-09-16",
    "source": "https://open.douyin.com/player/video?vid=7586133073617718565&autoplay=0",
    "account": "@豆包"
  },
  "7617756861957295386": {
    "likes": "3.5万",
    "comments": "3648",
    "favorites": "4825",
    "date": "2026-09-16",
    "source": "https://open.douyin.com/player/video?vid=7617756861957295386&autoplay=0",
    "account": "@豆包"
  },
  "7600671798006402345": {
    "likes": "2.1万",
    "comments": "1887",
    "favorites": "2636",
    "date": "2026-09-16",
    "source": "https://open.douyin.com/player/video?vid=7600671798006402345&autoplay=0",
    "account": "@豆包"
  }
};

;
/* assets/vendor/lenis.min.js */
(function(){var e=`1.3.26`;function t(e,t,n){return Math.max(e,Math.min(t,n))}function n(e,t,n){return(1-n)*e+n*t}function r(e,t,r,i){return n(e,t,1-Math.exp(-r*i))}function i(e,t){return(e%t+t)%t}var a=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(e){if(!this.isRunning)return;let n=!1;if(this.duration&&this.easing){this.currentTime+=e;let r=t(0,this.currentTime/this.duration,1);n=r>=1;let i=n?1:this.easing(r);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=r(this.value,this.to,this.lerp*60,e),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,n=!0)):(this.value=this.to,n=!0);n&&this.stop(),this.onUpdate?.(this.value,n)}stop(){this.isRunning=!1}fromTo(e,t,{lerp:n,duration:r,easing:i,onStart:a,onUpdate:o}){this.from=this.value=e,this.to=t,this.lerp=n,this.duration=r,this.easing=i,this.currentTime=0,this.isRunning=!0,a?.(),this.onUpdate=o}};function o(e,t){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>{n=void 0,e.apply(this,r)},t)}}var s=class{width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;constructor(e,t,{autoResize:n=!0,debounce:r=250}={}){this.wrapper=e,this.content=t,n&&(this.debouncedResize=o(this.resize,r),this.wrapper instanceof Window?window.addEventListener(`resize`,this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener(`resize`,this.debouncedResize)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},c=class{events={};emit(e,...t){let n=this.events[e]||[];for(let e=0,r=n.length;e<r;e++)n[e]?.(...t)}on(e,t){return this.events[e]?this.events[e].push(t):this.events[e]=[t],()=>{this.events[e]=this.events[e]?.filter(e=>t!==e)}}off(e,t){this.events[e]=this.events[e]?.filter(e=>t!==e)}destroy(){this.events={}}};let l={passive:!1};function u(e,t){return e===1?16.666666666666668:e===2?t:1}var d=class{touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new c;constructor(e,t={wheelMultiplier:1,touchMultiplier:1}){this.element=e,this.options=t,window.addEventListener(`resize`,this.onWindowResize),this.onWindowResize(),this.element.addEventListener(`wheel`,this.onWheel,l),this.element.addEventListener(`touchstart`,this.onTouchStart,l),this.element.addEventListener(`touchmove`,this.onTouchMove,l),this.element.addEventListener(`touchend`,this.onTouchEnd,l)}on(e,t){return this.emitter.on(e,t)}destroy(){this.emitter.destroy(),window.removeEventListener(`resize`,this.onWindowResize),this.element.removeEventListener(`wheel`,this.onWheel,l),this.element.removeEventListener(`touchstart`,this.onTouchStart,l),this.element.removeEventListener(`touchmove`,this.onTouchMove,l),this.element.removeEventListener(`touchend`,this.onTouchEnd,l)}onTouchStart=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:0,y:0},this.emitter.emit(`scroll`,{deltaX:0,deltaY:0,event:e})};onTouchMove=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e,r=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(n-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:r,y:i},this.emitter.emit(`scroll`,{deltaX:r,deltaY:i,event:e})};onTouchEnd=e=>{this.emitter.emit(`scroll`,{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:e})};onWheel=e=>{let{deltaX:t,deltaY:n,deltaMode:r}=e,i=u(r,this.window.width),a=u(r,this.window.height);t*=i,n*=a,t*=this.options.wheelMultiplier,n*=this.options.wheelMultiplier,this.emitter.emit(`scroll`,{deltaX:t,deltaY:n,event:e})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}};let f=e=>Math.min(1,1.001-2**(-10*e));var p=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;_rafId=null;_isDraggingSelection=!1;reducedMotionMediaQuery=window.matchMedia(`(prefers-reduced-motion: reduce)`);isTouching;isIos;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new a;emitter=new c;dimensions;virtualScroll;constructor({wrapper:t=window,content:n=document.documentElement,eventsTarget:r=t,smoothWheel:i=!0,syncTouch:a=!1,syncTouchLerp:o=.075,touchInertiaExponent:c=1.7,duration:l,easing:u,lerp:p=.1,infinite:m=!1,orientation:h=`vertical`,gestureOrientation:g=h===`horizontal`?`both`:`vertical`,touchMultiplier:_=1,wheelMultiplier:v=1,autoResize:y=!0,prevent:b,virtualScroll:x,overscroll:S=!0,autoRaf:C=!1,anchors:w=!1,autoToggle:T=!1,allowNestedScroll:E=!1,__experimental__naiveDimensions:D=!1,naiveDimensions:O=D,stopInertiaOnNavigate:k=!1,respectReducedMotion:A=!0}={}){window.lenisVersion=e,window.lenis||(window.lenis={}),window.lenis.version=e,h===`horizontal`&&(window.lenis.horizontal=!0),a===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!t||t===document.documentElement)&&(t=window),typeof l==`number`&&typeof u!=`function`?u=f:typeof u==`function`&&typeof l!=`number`&&(l=1),this.options={wrapper:t,content:n,eventsTarget:r,smoothWheel:i,syncTouch:a,syncTouchLerp:o,touchInertiaExponent:c,duration:l,easing:u,lerp:p,infinite:m,gestureOrientation:g,orientation:h,touchMultiplier:_,wheelMultiplier:v,autoResize:y,prevent:b,virtualScroll:x,overscroll:S,autoRaf:C,anchors:w,autoToggle:T,allowNestedScroll:E,naiveDimensions:O,stopInertiaOnNavigate:k,respectReducedMotion:A},this.dimensions=new s(t,n,{autoResize:y}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.addEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener(`click`,this.onClick),this.options.wrapper.addEventListener(`pointerdown`,this.onPointerDown),this.virtualScroll=new d(r,{touchMultiplier:_,wheelMultiplier:v}),this.virtualScroll.on(`scroll`,this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener(`transitionend`,this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.removeEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener(`pointerdown`,this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener(`click`,this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(e,t){return this.emitter.on(e,t)}off(e,t){return this.emitter.off(e,t)}onScrollEnd=e=>{e instanceof CustomEvent||(this.isScrolling===`smooth`||this.isScrolling===!1)&&e.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent(`scrollend`,{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};get overflow(){let e=this.isHorizontal?`overflow-x`:`overflow-y`;return getComputedStyle(this.rootElement)[e]}checkOverflow(){[`hidden`,`clip`].includes(this.overflow)?this.internalStop():this.internalStart()}onTransitionEnd=e=>{e.propertyName?.includes(`overflow`)&&e.target===this.rootElement&&this.checkOverflow()};setScroll(e){this.isHorizontal?this.options.wrapper.scrollTo({left:e,behavior:`instant`}):this.options.wrapper.scrollTo({top:e,behavior:`instant`})}onClick=e=>{let t=e.composedPath().filter(e=>e instanceof HTMLAnchorElement&&e.href).map(e=>new URL(e.href)),n=new URL(window.location.href);if(this.options.anchors){let e=t.find(e=>n.host===e.host&&n.pathname===e.pathname&&e.hash);if(e){let t=typeof this.options.anchors==`object`&&this.options.anchors?this.options.anchors:void 0,n=decodeURIComponent(e.hash);this.scrollTo(n,t);return}}if(this.options.stopInertiaOnNavigate&&t.some(e=>n.host===e.host&&n.pathname!==e.pathname)){this.reset();return}};onPointerDown=e=>{e.button===1&&this.reset()};isTouchOnSelectionHandle(e){let t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;let n=e.targetTouches[0]??e.changedTouches[0];if(!n)return!1;let r=t.getRangeAt(0).getClientRects();if(r.length===0)return!1;let i=r[0],a=r[r.length-1],o=Math.hypot(n.clientX-i.left,n.clientY-i.top)<=40,s=Math.hypot(n.clientX-a.right,n.clientY-a.bottom)<=40;return o||s}onVirtualScroll=e=>{if(typeof this.options.virtualScroll==`function`&&this.options.virtualScroll(e)===!1)return;let{deltaX:t,deltaY:n,event:r}=e;if(this.emitter.emit(`virtual-scroll`,{deltaX:t,deltaY:n,event:r}),r.ctrlKey||r.lenisStopPropagation)return;let i=r.type.includes(`touch`),a=r.type.includes(`wheel`);if(i&&this.isIos&&(r.type===`touchstart`&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(r)),this._isDraggingSelection)){r.type===`touchend`&&(this._isDraggingSelection=!1);return}this.isTouching=r.type===`touchstart`||r.type===`touchmove`;let o=t===0&&n===0;if(this.options.syncTouch&&i&&r.type===`touchstart`&&o&&!this.isStopped&&!this.isLocked){this.reset();return}let s=this.options.gestureOrientation===`vertical`&&n===0||this.options.gestureOrientation===`horizontal`&&t===0;if(o||s)return;let c=r.composedPath();c=c.slice(0,c.indexOf(this.rootElement));let l=this.options.prevent,u=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`;if(c.find(e=>e instanceof HTMLElement&&(typeof l==`function`&&l?.(e)||e.hasAttribute?.(`data-lenis-prevent`)||u===`vertical`&&e.hasAttribute?.(`data-lenis-prevent-vertical`)||u===`horizontal`&&e.hasAttribute?.(`data-lenis-prevent-horizontal`)||i&&e.hasAttribute?.(`data-lenis-prevent-touch`)||a&&e.hasAttribute?.(`data-lenis-prevent-wheel`)||this.options.allowNestedScroll&&this.hasNestedScroll(e,{deltaX:t,deltaY:n}))))return;if(this.isStopped||this.isLocked){r.cancelable&&r.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&a)){this.isScrolling=`native`,this.animate.stop(),r.lenisStopPropagation=!0;return}let d=n;this.options.gestureOrientation===`both`?d=Math.abs(n)>Math.abs(t)?n:t:this.options.gestureOrientation===`horizontal`&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&n>0||this.animatedScroll===this.limit&&n<0))&&(r.lenisStopPropagation=!0),r.cancelable&&r.preventDefault();let f=i&&this.options.syncTouch,p=i&&r.type===`touchend`;p&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...f?{lerp:p?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit(`scroll`,this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling===`native`){let e=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-e,this.direction=Math.sign(this.animatedScroll-e),this.isStopped||(this.isScrolling=`native`),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty(`overflow`);return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty(`overflow`,`clip`);return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=e=>{let t=e-(this.time||e);this.time=e,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))};scrollTo(e,{offset:n=0,immediate:r=!1,lock:i=!1,programmatic:a=!0,lerp:o=a?this.options.lerp:void 0,duration:s=a?this.options.duration:void 0,easing:c=a?this.options.easing:void 0,onStart:l,onComplete:u,force:d=!1,userData:p}={}){if(this.prefersReducedMotion&&(a?r=!0:(o=1,s=void 0,c=void 0)),(this.isStopped||this.isLocked)&&!d)return;let m=e,h=n;if(typeof m==`string`&&[`top`,`left`,`start`,`#`].includes(m))m=0;else if(typeof m==`string`&&[`bottom`,`right`,`end`].includes(m))m=this.limit;else{let e=null;if(typeof m==`string`?(e=m.startsWith(`#`)?document.getElementById(m.slice(1)):document.querySelector(m),e||(m===`#top`?m=0:console.warn(`Lenis: Target not found`,m))):m instanceof HTMLElement&&m?.nodeType&&(e=m),e){if(this.options.wrapper!==window){let e=this.rootElement.getBoundingClientRect();h-=this.isHorizontal?e.left:e.top}let t=e.getBoundingClientRect(),n=getComputedStyle(e),r=this.isHorizontal?Number.parseFloat(n.scrollMarginLeft):Number.parseFloat(n.scrollMarginTop),i=getComputedStyle(this.rootElement),a=this.isHorizontal?Number.parseFloat(i.scrollPaddingLeft):Number.parseFloat(i.scrollPaddingTop);m=(this.isHorizontal?t.left:t.top)+this.animatedScroll-(Number.isNaN(r)?0:r)-(Number.isNaN(a)?0:a)}}if(typeof m==`number`){if(m+=h,this.options.infinite){if(a){this.targetScroll=this.animatedScroll=this.scroll;let e=m-this.animatedScroll;e>this.limit/2?m-=this.limit:e<-this.limit/2&&(m+=this.limit)}}else m=t(0,m,this.limit);if(m===this.targetScroll){l?.(this),u?.(this);return}if(this.userData=p??{},r){this.animatedScroll=this.targetScroll=m,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),u?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}a||(this.targetScroll=m),typeof s==`number`&&typeof c!=`function`?c=f:typeof c==`function`&&typeof s!=`number`&&(s=1),this.animate.fromTo(this.animatedScroll,m,{duration:s,easing:c,lerp:o,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling=`smooth`,l?.(this)},onUpdate:(e,t)=>{this.isScrolling=`smooth`,this.lastVelocity=this.velocity,this.velocity=e-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=e,this.setScroll(this.scroll),a&&(this.targetScroll=e),t||this.emit(),t&&(this.reset(),this.emit(),u?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(e,{deltaX:t,deltaY:n}){let r=Date.now();e._lenis||={};let i=e._lenis,a,o,s,c,l,u,d,f,p,m;if(r-(i.time??0)>2e3){i.time=Date.now();let t=window.getComputedStyle(e);if(i.computedStyle=t,a=[`auto`,`overlay`,`scroll`].includes(t.overflowX),o=[`auto`,`overlay`,`scroll`].includes(t.overflowY),l=[`auto`].includes(t.overscrollBehaviorX),u=[`auto`].includes(t.overscrollBehaviorY),i.hasOverflowX=a,i.hasOverflowY=o,!(a||o))return!1;d=e.scrollWidth,f=e.scrollHeight,p=e.clientWidth,m=e.clientHeight,s=d>p,c=f>m,i.isScrollableX=s,i.isScrollableY=c,i.scrollWidth=d,i.scrollHeight=f,i.clientWidth=p,i.clientHeight=m,i.hasOverscrollBehaviorX=l,i.hasOverscrollBehaviorY=u}else s=i.isScrollableX,c=i.isScrollableY,a=i.hasOverflowX,o=i.hasOverflowY,d=i.scrollWidth,f=i.scrollHeight,p=i.clientWidth,m=i.clientHeight,l=i.hasOverscrollBehaviorX,u=i.hasOverscrollBehaviorY;if(!(a&&s||o&&c))return!1;let h=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`,g,_,v,y,b,x;if(h===`horizontal`)g=Math.round(e.scrollLeft),_=d-p,v=t,y=a,b=s,x=l;else if(h===`vertical`)g=Math.round(e.scrollTop),_=f-m,v=n,y=o,b=c,x=u;else return!1;return!x&&(g>=_||g<=0)?!0:(v>0?g<_:g>0)&&y&&b}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?`x`:`y`]}get isHorizontal(){return this.options.orientation===`horizontal`}get actualScroll(){let e=this.options.wrapper;return this.isHorizontal?e.scrollX??e.scrollLeft:e.scrollY??e.scrollTop}get scroll(){return this.options.infinite?i(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(e){this._isScrolling!==e&&(this._isScrolling=e,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(e){this._isStopped!==e&&(this._isStopped=e,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(e){this._isLocked!==e&&(this._isLocked=e,this.updateClassName())}get isSmooth(){return this.isScrolling===`smooth`}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let e=`lenis`;return this.options.autoToggle&&(e+=` lenis-autoToggle`),this.isStopped&&(e+=` lenis-stopped`),this.isLocked&&(e+=` lenis-locked`),this.isScrolling&&(e+=` lenis-scrolling`),this.isScrolling===`smooth`&&(e+=` lenis-smooth`),e}updateClassName(){this.cleanUpClassName(),this.className.split(` `).forEach(e=>{this.rootElement.classList.add(e)})}cleanUpClassName(){for(let e of Array.from(this.rootElement.classList))(e===`lenis`||e.startsWith(`lenis-`))&&this.rootElement.classList.remove(e)}};globalThis.Lenis=p,globalThis.Lenis.prototype=p.prototype})();
//# sourceMappingURL=lenis.min.js.map
;
/* portfolio.js */
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const notebook=document.querySelector('.story-notebook'),surface=document.querySelector('.blackboard-surface'),resume=document.querySelector('.resume-overview');
 const dialog=document.querySelector('.video-dialog'),stage=dialog.querySelector('.dialog-stage'),status=dialog.querySelector('.dialog-status'),closeButton=dialog.querySelector('.dialog-close'),bookmarks=dialog.querySelector('.dialog-bookmarks'),layout=dialog.querySelector('.dialog-layout');
 const railTracks=[...document.querySelectorAll('.stamp-rail')].map(rail=>{const track=document.createElement('div');track.className='rail-track';while(rail.firstChild)track.appendChild(rail.firstChild);rail.appendChild(track);return track;});
 let lenis=null,layoutPending=false,scrollPending=false,geometry=[],activeButton=null,loadTimeout=null,savedScroll=0,wide=false,activeFrame=null,playerGeneration=0;
 function setupScroll(){lenis?.destroy();lenis=null;if(!reduced.matches&&window.Lenis){lenis=new Lenis({autoRaf:true,lerp:.095,smoothWheel:true,syncTouch:false,wheelMultiplier:.9});if(dialog.open)lenis.stop();}window.portfolioScroll=lenis;}
 setupScroll();
 function measure(){layoutPending=false;const y=scrollY,base=surface.getBoundingClientRect().top+y;surface.style.height=Math.round(resume.getBoundingClientRect().bottom+y+32-base)+'px';geometry=['about','resume','doubao','films','project-commerce'].map(id=>({id,top:document.getElementById(id).getBoundingClientRect().top+y}));lenis?.resize();renderScroll();}
 function queueMeasure(){if(!layoutPending){layoutPending=true;requestAnimationFrame(measure)}}
 const layoutObserver=new ResizeObserver(queueMeasure);layoutObserver.observe(resume);layoutObserver.observe(notebook);
 document.fonts.ready.then(queueMeasure);document.addEventListener('portfolio:content-changed',queueMeasure);document.addEventListener('toggle',queueMeasure,true);window.addEventListener('resize',()=>{queueMeasure();if(dialog.open)fitDialog()});
 function renderScroll(){scrollPending=false;railTracks.forEach(track=>track.style.transform=reduced.matches?'':`translate3d(0,${-(scrollY*.12)}px,0)`);let active='about';geometry.forEach(s=>{if(s.top<=scrollY+innerHeight*.35)active=s.id});document.querySelectorAll('.nav-link').forEach(a=>{const yes=a.hash==='#'+active;a.classList.toggle('active',yes);if(yes)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});}
 window.addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(renderScroll)}},{passive:true});
 reduced.addEventListener('change',()=>{setupScroll();queueMeasure();if(reduced.matches)document.querySelectorAll('.reveal-item').forEach(e=>e.classList.add('is-revealed'))});
 document.querySelectorAll('a[href^="#"]:not(.directory-item)').forEach(a=>a.addEventListener('click',event=>{const target=document.getElementById(a.hash.slice(1));if(!target)return;event.preventDefault();history.pushState(null,'',a.hash);const focusTarget=()=>{if(!target.hasAttribute('tabindex'))target.setAttribute('tabindex','-1');target.focus({preventScroll:true})};const destination=Math.max(0,target.getBoundingClientRect().top+scrollY-35);if(lenis){lenis.scrollTo(scrollY,{immediate:true});lenis.scrollTo(destination,{lerp:0,duration:1,easing:t=>1-Math.pow(1-t,4),onComplete:focusTarget})}else{window.scrollTo({top:destination,behavior:reduced.matches?'instant':'smooth'});focusTarget();}}));
 function fitDialog(){
  const compact=innerWidth<=600,hasGroup=bookmarks.children.length>1,fullscreen=document.fullscreenElement===stage;
  layout.classList.toggle('solo',!hasGroup);bookmarks.hidden=!hasGroup;
  const available=window.visualViewport?.height||innerHeight,landscapeFrame=wide||innerWidth>900;
  const w=landscapeFrame?960:324,h=landscapeFrame?588:672;
  const maxW=fullscreen?innerWidth:innerWidth-(compact?28:70),maxH=fullscreen?innerHeight:Math.max(150,available-(compact?(hasGroup?156:113):(hasGroup?200:138)));
  const scale=Math.min(maxW/w,maxH/h),viewW=w*scale,viewH=h*scale;
  if(!fullscreen){dialog.style.width=(viewW+(compact?20:46))+'px';stage.style.width=viewW+'px';stage.style.height=viewH+'px'}
  stage.style.setProperty('--frame-width',w+'px');stage.style.setProperty('--frame-height',h+'px');
  const frame=stage.querySelector('iframe');if(frame){frame.style.width=w+'px';frame.style.height=h+'px';frame.style.transform=`scale(${scale})`;}
 }
 function beginDialog(button){activeButton=button;savedScroll=scrollY;if(lenis){lenis.scrollTo(savedScroll,{immediate:true});lenis.stop();}document.querySelectorAll('video').forEach(v=>v.pause());document.body.classList.add('video-open');if(!dialog.open)dialog.showModal();closeButton.focus({preventScroll:true});}
 function titleOf(button){return button.closest('.douyin-card')?.querySelector('h4')?.textContent.trim()||button.dataset.title;}
 function loadVideo(button){
  clearTimeout(loadTimeout);const generation=++playerGeneration;wide=button.dataset.wide==='true';
  dialog.querySelector('#video-dialog-title').textContent=titleOf(button);const original=dialog.querySelector('.dialog-original');original.href='https://www.douyin.com/video/'+button.dataset.video;original.textContent='在抖音查看原片 ↗';original.hidden=false;
  const frame=document.createElement('iframe');activeFrame=frame;frame.title=titleOf(button)+' · 抖音视频';frame.src=`https://open.douyin.com/player/video?vid=${button.dataset.video}&autoplay=0`;frame.allow='fullscreen; autoplay; encrypted-media; picture-in-picture';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
  frame.addEventListener('load',()=>{if(generation!==playerGeneration)return;clearTimeout(loadTimeout);status.textContent='';},{once:true});
  stage.replaceChildren(frame);status.textContent='正在载入…';[...bookmarks.children].forEach(b=>b.setAttribute('aria-current',String(b.dataset.video===button.dataset.video)));fitDialog();
  loadTimeout=setTimeout(()=>{if(generation===playerGeneration&&frame.isConnected)status.textContent='加载较慢，可通过右侧链接观看原片。';},10000);
 }
 function openVideo(button){
  beginDialog(button);bookmarks.replaceChildren();const group=button.closest('.douyin-gallery').querySelectorAll('.video-preview');
  if(group.length>1)group.forEach(item=>{const tab=document.createElement('button');tab.className='dialog-bookmark';tab.type='button';tab.dataset.video=item.dataset.video;tab.setAttribute('aria-label','播放 '+titleOf(item));const img=document.createElement('img');img.src=item.querySelector('img').src;img.alt='';const label=document.createElement('span');label.textContent=titleOf(item);tab.append(img,label);tab.addEventListener('click',()=>loadVideo(item));bookmarks.append(tab)});
  loadVideo(button);
 }
 function cleanupVideo(){clearTimeout(loadTimeout);playerGeneration++;activeFrame=null;stage.replaceChildren();bookmarks.replaceChildren();status.textContent='';document.body.classList.remove('video-open');lenis?.start();if(lenis)lenis.scrollTo(savedScroll,{immediate:true});else window.scrollTo({top:savedScroll,behavior:'instant'});activeButton?.focus({preventScroll:true});activeButton=null;}
 document.querySelectorAll('.video-preview').forEach(button=>button.addEventListener('click',()=>openVideo(button)));
 closeButton.addEventListener('click',()=>dialog.close());dialog.addEventListener('close',cleanupVideo);
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()});
 dialog.querySelector('.dialog-fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await stage.requestFullscreen()}catch{status.textContent='可使用播放器右下角的全屏按钮。'}});
 window.visualViewport?.addEventListener('resize',()=>{if(dialog.open)fitDialog()});
 document.addEventListener('fullscreenchange',()=>{if(dialog.open)fitDialog()});
 document.querySelectorAll('.portrait-film').forEach(container=>{const button=document.createElement('button');button.className='local-enlarge';button.type='button';button.textContent='放大观看 ↗';container.after(button);button.addEventListener('click',()=>{beginDialog(button);wide=false;bookmarks.replaceChildren();const source=container.querySelector('video'),video=source.cloneNode(true);video.preload='metadata';video.autoplay=false;dialog.querySelector('#video-dialog-title').textContent=container.closest('.film-project').querySelector('h3').textContent;stage.replaceChildren(video);const link=dialog.querySelector('.dialog-original');link.hidden=true;link.removeAttribute('href');status.textContent='';fitDialog();});});
 document.querySelectorAll('video').forEach(video=>{video.addEventListener('play',()=>document.querySelectorAll('video').forEach(v=>{if(v!==video)v.pause()}));video.addEventListener('error',()=>{const message=video.parentElement.querySelector('.local-video-error');if(message)message.hidden=false;});});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('video').forEach(v=>v.pause())});
 const revealTargets=[...document.querySelectorAll('.doubao-project>header,.douyin-card,.film-overline,.film-project>.work-title,.film-stage,.film-description,.commerce-heading,.commerce-board')];
 if(!reduced.matches){document.body.classList.add('motion-ready');const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-revealed');reveal.unobserve(entry.target)}}),{rootMargin:'0px 0px -28px 0px',threshold:.05});revealTargets.forEach(el=>{el.classList.add('reveal-item');reveal.observe(el)});document.querySelectorAll('.douyin-gallery').forEach(g=>[...g.children].forEach((card,i)=>card.style.setProperty('--reveal-delay',(i%2)*65+'ms')));}
 queueMeasure();
})();

;
/* palace.js */
(() => {
  'use strict';
  const root = document.querySelector('#project-palace');
  if (!root) return;
  const data = JSON.parse(document.querySelector('#palace-data').textContent);
  const entries = [...root.querySelectorAll('[data-artifact]')];
  const panels = [...root.querySelectorAll('[data-process]')];
  const viewer = document.querySelector('.palace-viewer');
  const image = viewer.querySelector('.palace-viewer-image');
  const message = viewer.querySelector('.palace-viewer-message');
  const thumbs = viewer.querySelector('.palace-viewer-thumbs');
  const close = viewer.querySelector('.palace-viewer-close');
  const previous = viewer.querySelector('.palace-viewer-prev');
  const next = viewer.querySelector('.palace-viewer-next');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let active = null, pictureIndex = 0, opener = null, savedScroll = 0, request = 0;

  let flowPending=false;
  function queueFlow(){if(!flowPending){flowPending=true;requestAnimationFrame(()=>{flowPending=false;drawFlow();})}}
  function roundedPath(points,radius=12){
    const n=value=>Math.round(value*10)/10;
    let d=`M ${n(points[0][0])} ${n(points[0][1])}`;
    for(let i=1;i<points.length-1;i++){
      const [x,y]=points[i],previous=points[i-1],next=points[i+1];
      const before=Math.hypot(x-previous[0],y-previous[1]),after=Math.hypot(next[0]-x,next[1]-y);
      if(!before||!after)continue;
      const r=Math.min(radius,before/2,after/2);
      const a=[x+(previous[0]-x)*r/before,y+(previous[1]-y)*r/before];
      const b=[x+(next[0]-x)*r/after,y+(next[1]-y)*r/after];
      d+=` L ${n(a[0])} ${n(a[1])} Q ${n(x)} ${n(y)} ${n(b[0])} ${n(b[1])}`;
    }
    return d+` L ${n(points.at(-1)[0])} ${n(points.at(-1)[1])}`;
  }
  function drawFlow(){
    if(!active)return;
    const panel=root.querySelector(`[data-process="${active}"]`);if(panel.hidden)return;
    const layout=panel.querySelector('.palace-process-layout'),base=layout.getBoundingClientRect(),svg=layout.querySelector('.palace-flow');
    if(!base.width||!base.height)return;
    const box=el=>{const b=el.getBoundingClientRect();return {left:b.left-base.left,right:b.right-base.left,top:b.top-base.top,bottom:b.bottom-base.top,cx:(b.left+b.right)/2-base.left,cy:(b.top+b.bottom)/2-base.top,width:b.width}};
    const cards=[0,1,2,3,4].map(index=>panel.querySelector(`[data-stage-index="${index}"]`));
    const photos=cards.map(card=>box(card.querySelector('.palace-photo'))),bounds=cards.map(box);
    const [original,line,visual,still,film]=photos;
    const compact=matchMedia('(max-width:800px)').matches,bottom=base.height-18;
    const paths=[
      ['0-1',[[original.right+6,original.cy],[line.left-9,line.cy]]],
      ['1-2',[[line.cx,bounds[1].bottom+6],[line.cx,visual.top-11]]],
      ['2-3',[[visual.left-6,visual.cy],[still.right+9,still.cy]]]
    ];
    if(compact){
      const across=bounds[4].bottom+26;
      paths.push(['3-4',[[still.cx,bounds[3].bottom+6],[still.cx,bottom],[base.width-4,bottom],[base.width-4,across],[film.cx,across],[film.cx,bounds[4].bottom+9]]]);
      paths.push(['4-0',[[film.cx,film.top-10],[film.cx,30],[4,30],[4,original.cy],[original.left-3,original.cy]]]);
    }else{
      paths.push(['3-4',[[still.cx,bounds[3].bottom+6],[still.cx,bottom],[film.cx,bottom],[film.cx,bounds[4].bottom+10]]]);
      const finishX=original.cx+original.width*.23;
      paths.push(['4-0',[[film.cx,film.top-10],[film.cx,30],[finishX,30],[finishX,original.top-10]]]);
    }
    svg.setAttribute('viewBox',`0 0 ${base.width} ${base.height}`);
    const group=svg.querySelector('.palace-flow-paths');group.replaceChildren();
    for(const [step,points] of paths){const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.dataset.flow=step;path.setAttribute('d',roundedPath(points));path.setAttribute('marker-end',`url(#palace-arrow-${active})`);if(step==='4-0')path.classList.add('palace-flow-return');group.append(path)}
  }
  const flowObserver=new ResizeObserver(queueFlow);
  panels.forEach(panel=>{flowObserver.observe(panel.querySelector('.palace-process-layout'));panel.querySelectorAll('.palace-stage').forEach(card=>flowObserver.observe(card));});
  document.fonts.ready.then(queueFlow);document.addEventListener('portfolio:content-changed',queueFlow);window.addEventListener('resize',queueFlow);
  function changed() { document.dispatchEvent(new CustomEvent('portfolio:content-changed'));queueFlow(); }
  function scrollToElement(target, offset = -30) {
    const lenis = window.portfolioScroll;
    if (lenis && !reduced.matches) lenis.scrollTo(Math.max(0,target.getBoundingClientRect().top+scrollY+offset), { duration: .7, easing: t => 1 - Math.pow(1 - t, 3) });
    else window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + scrollY + offset), behavior: reduced.matches ? 'instant' : 'smooth' });
  }
  function selectArtifact(id, focus = true) {
    if (!data[id]) return;
    active = id;
    const panel = root.querySelector(`[data-process="${id}"]`);
    panels.forEach(item => { item.hidden = item !== panel; });
    entries.forEach(item => item.setAttribute('aria-expanded', String(item.dataset.artifact === id)));
    const entryLabel = root.querySelector(`[data-artifact="${id}"] .palace-artifact-name`).textContent.trim();
    panel.querySelector('h4').textContent = entryLabel;
    panel.querySelector('.video-preview').dataset.title = entryLabel;
    panel.querySelector('.palace-sr-only').textContent = entryLabel;
    markStage(Number(panel.querySelector('.palace-featured').dataset.stageIndex));
    changed();
    if (!reduced.matches) panel.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 400, easing: 'cubic-bezier(.2,.7,.2,1)' });
    if (focus) {
      panel.querySelector('h4').focus({ preventScroll: true });
      requestAnimationFrame(() => scrollToElement(panel));
    }
  }
  function markStage(index) {
    const panel = root.querySelector(`[data-process="${active}"]`);
    panel.querySelectorAll('.palace-stage').forEach(card => card.classList.toggle('is-current', Number(card.dataset.stageIndex) === index));
  }
  function showImage(index) {
    const frames = data[active].frames;
    if (index < 0 || index >= frames.length) return;
    pictureIndex = index;
    const frame = frames[index], generation = ++request;
    const title = root.querySelector(`[data-process="${active}"] h4`).textContent;
    viewer.querySelector('.palace-viewer-subtitle').textContent = title;
    const stageLabel = root.querySelector(`[data-process="${active}"] [data-stage-index="${frame.stage}"] .palace-stage-name`).textContent.trim();
    viewer.querySelector('#palace-viewer-title').textContent = stageLabel;
    viewer.querySelector('.palace-viewer-count').textContent = `${index + 1} / ${frames.length}`;
    previous.disabled = index === 0;
    next.disabled = index === frames.length - 1;
    message.textContent = '图片载入中…';
    image.onload = () => { if (generation === request) message.textContent = ''; };
    image.onerror = () => { if (generation === request) message.textContent = '图片暂时未能载入，请稍后再试。'; };
    image.alt = frame.alt;
    image.src = frame.src;
    if (image.complete && image.naturalWidth) message.textContent = '';
    [...thumbs.children].forEach((button, i) => button.setAttribute('aria-current', String(i === index)));
    const currentThumb = thumbs.children[index];
    if (currentThumb) thumbs.scrollTo({ left: currentThumb.offsetLeft - thumbs.offsetLeft - thumbs.clientWidth / 2 + currentThumb.clientWidth / 2, behavior: 'instant' });
    markStage(frame.stage);
  }
  function openImages(button) {
    const id = button.closest('[data-process]').dataset.process;
    active = id;
    opener = button;
    savedScroll = scrollY;
    const lenis = window.portfolioScroll;
    if (lenis) { lenis.scrollTo(savedScroll, { immediate: true }); lenis.stop(); }
    document.querySelectorAll('video').forEach(video => video.pause());
    thumbs.replaceChildren();
    data[id].frames.forEach((frame, index) => {
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.setAttribute('aria-label', frame.alt);
      const preview = document.createElement('img');
      preview.src = frame.thumb; preview.alt = ''; preview.loading = 'lazy';
      thumb.append(preview);
      thumb.addEventListener('click', () => showImage(index));
      thumbs.append(thumb);
    });
    document.body.classList.add('palace-viewing');
    viewer.showModal();
    showImage(data[id].frames.findIndex(frame => frame.stage === Number(button.dataset.stage)));
    close.focus({ preventScroll: true });
  }
  entries.forEach(button => button.addEventListener('click', () => selectArtifact(button.dataset.artifact)));
  panels.forEach(panel => {
    panel.querySelector('.palace-return').addEventListener('click', () => {
      const entry = root.querySelector(`[data-artifact="${panel.dataset.process}"]`);
      panel.hidden = true;
      entry.setAttribute('aria-expanded', 'false');
      active = null;
      changed();
      entry.focus({ preventScroll: true });
      requestAnimationFrame(() => scrollToElement(root));
    });
    panel.querySelectorAll('[data-stage]').forEach(button => button.addEventListener('click', () => openImages(button)));
    panel.querySelector('.video-preview').addEventListener('click', () => {
      active = panel.dataset.process;
      markStage(Number(panel.querySelector('.palace-featured').dataset.stageIndex));
    });
  });
  previous.addEventListener('click', () => showImage(pictureIndex - 1));
  next.addEventListener('click', () => showImage(pictureIndex + 1));
  close.addEventListener('click', () => viewer.close());
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(pictureIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;
    const bounds = viewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
  });
  viewer.addEventListener('close', () => {
    request++;
    image.removeAttribute('src');
    image.onload = null; image.onerror = null;
    thumbs.replaceChildren();
    message.textContent = '';
    document.body.classList.remove('palace-viewing');
    const lenis = window.portfolioScroll;
    lenis?.start();
    if (lenis) lenis.scrollTo(savedScroll, { immediate: true });
    else window.scrollTo({ top: savedScroll, behavior: 'instant' });
    opener?.focus({ preventScroll: true });
    opener = null;
  });
  viewer.querySelector('.palace-viewer-watch').addEventListener('click', () => {
    const button = root.querySelector(`[data-process="${active}"] .video-preview`);
    viewer.addEventListener('close', () => button.click(), { once: true });
    viewer.close();
  });
})();

;
/* chalk-directory.js */
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
  const destination=Math.max(0,target.getBoundingClientRect().top+scrollY-35),scroll=window.portfolioScroll;
  if(scroll){scroll.scrollTo(scrollY,{immediate:true});scroll.scrollTo(destination,{duration:.95,lerp:0,easing:t=>1-Math.pow(1-t,4),onComplete:focus})}
  else{window.scrollTo({top:destination,behavior:reduced.matches?'instant':'smooth'});focus()}
 },true);
 window.addEventListener('scroll',queueCurrent,{passive:true});window.addEventListener('resize',queueMeasure);document.addEventListener('portfolio:content-changed',queueMeasure);
 new ResizeObserver(queueMeasure).observe(document.querySelector('main'));document.fonts.ready.then(queueMeasure);queueMeasure();
 function fromHash(){if(location.hash==='#work-directory')openDirectory();else queueCurrent()}
 window.addEventListener('hashchange',fromHash);fromHash();
})();

;
/* contact-bubble.js */
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

;
/* hero-blink.js */
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

;
/* hero-layout.js */
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

;
/* media-guard.js */
(() => {
  'use strict';
  // Hide casual save actions; public media URLs are not access-controlled.
  const mediaSelector = 'img, video';
  function protect(root) {
    const media = root.matches?.(mediaSelector) ? [root] : [];
    media.push(...(root.querySelectorAll?.(mediaSelector) || []));
    for (const element of media) {
      element.draggable = false;
      if (element.tagName === 'VIDEO') element.controlsList?.add('nodownload');
    }
  }
  protect(document);
  new MutationObserver(records => {
    for (const record of records) for (const node of record.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) protect(node);
    }
  }).observe(document.body, { childList: true, subtree: true });
  for (const eventName of ['contextmenu', 'dragstart']) {
    document.addEventListener(eventName, event => {
      if (event.target instanceof Element && event.target.closest(mediaSelector)) event.preventDefault();
    }, { capture: true });
  }

  // Process artwork stays in the site instead of opening a raw image tab.
  const triggers = [...document.querySelectorAll('.process-image-preview')];
  if (!triggers.length) return;
  const viewer = document.createElement('dialog');
  viewer.className = 'palace-viewer media-image-viewer';
  viewer.setAttribute('aria-labelledby', 'media-image-title');
  viewer.setAttribute('data-lenis-prevent', '');
  viewer.innerHTML = '<header class="palace-viewer-heading"><h2 id="media-image-title">创作过程</h2><button class="palace-viewer-close" type="button" aria-label="关闭大图">×</button></header><div class="palace-viewer-canvas"><img class="palace-viewer-image" alt="" draggable="false"><p class="palace-viewer-message" role="status"></p></div>';
  document.body.append(viewer);
  const image = viewer.querySelector('img');
  const close = viewer.querySelector('button');
  const message = viewer.querySelector('[role="status"]');
  let opener = null, savedScroll = 0;
  triggers.forEach(button => button.addEventListener('click', () => {
    opener = button;
    savedScroll = scrollY;
    const scroll = window.portfolioScroll;
    if (scroll) { scroll.scrollTo(savedScroll, { immediate: true }); scroll.stop(); }
    document.querySelectorAll('video').forEach(video => video.pause());
    const source = button.querySelector('img');
    viewer.querySelector('h2').textContent = button.closest('.film-project').querySelector('h3').textContent.trim() + ' · 创作过程';
    message.textContent = '正在载入…';
    image.onload = () => { message.textContent = ''; };
    image.onerror = () => { message.textContent = '图片暂时未能加载，请关闭后重试。'; };
    image.alt = source.alt;
    image.src = button.dataset.image;
    document.body.classList.add('media-image-viewing');
    viewer.showModal();
    close.focus({ preventScroll: true });
  }));
  close.addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;
    const rect = viewer.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) viewer.close();
  });
  viewer.addEventListener('close', () => {
    image.onload = image.onerror = null;
    image.removeAttribute('src');
    message.textContent = '';
    document.body.classList.remove('media-image-viewing');
    const scroll = window.portfolioScroll;
    scroll?.start();
    if (scroll) scroll.scrollTo(savedScroll, { immediate: true });
    else window.scrollTo({ top: savedScroll, behavior: 'instant' });
    opener?.focus({ preventScroll: true });
    opener = null;
  });
  document.querySelectorAll('.local-video-retry').forEach(button => button.addEventListener('click', () => {
    const video = button.closest('.film-stage').querySelector('video');
    button.closest('.local-video-error').hidden = true;
    video.load();
    video.play().catch(() => {});
  }));
})();
