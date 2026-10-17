(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const notebook=document.querySelector('.story-notebook'),surface=document.querySelector('.blackboard-surface'),resume=document.querySelector('.resume-overview');
 const dialog=document.querySelector('.video-dialog'),stage=dialog.querySelector('.dialog-stage'),status=dialog.querySelector('.dialog-status'),closeButton=dialog.querySelector('.dialog-close'),bookmarks=dialog.querySelector('.dialog-bookmarks'),layout=dialog.querySelector('.dialog-layout');
 const railTracks=[...document.querySelectorAll('.stamp-rail')].map(rail=>{const track=document.createElement('div');track.className='rail-track';while(rail.firstChild)track.appendChild(rail.firstChild);rail.appendChild(track);return track;});
 let lenis=null,layoutPending=false,scrollPending=false,geometry=[],activeButton=null,loadTimeout=null,savedScroll=0,wide=false,activeFrame=null,playerGeneration=0,localPlayback=null;
 function setupScroll(){lenis?.destroy();lenis=null;window.portfolioScroll=null;}
 setupScroll();
 function measure(){layoutPending=false;const y=scrollY;surface.style.height='100%';geometry=['about','doubao','films','project-commerce','resume','connect'].map(id=>({id,top:document.getElementById(id).getBoundingClientRect().top+y}));renderScroll();}
 function queueMeasure(){if(!layoutPending){layoutPending=true;requestAnimationFrame(measure)}}
 const layoutObserver=new ResizeObserver(queueMeasure);layoutObserver.observe(resume);layoutObserver.observe(notebook);
 document.fonts.ready.then(queueMeasure);document.addEventListener('portfolio:content-changed',queueMeasure);document.addEventListener('toggle',queueMeasure,true);window.addEventListener('resize',()=>{queueMeasure();if(dialog.open)fitDialog()});
 function renderScroll(){scrollPending=false;railTracks.forEach(track=>track.style.transform=reduced.matches?'':`translate3d(0,${-(scrollY*.12)}px,0)`);let active='about';geometry.forEach(s=>{if(s.top<=scrollY+innerHeight*.35)active=s.id});document.querySelectorAll('.nav-link').forEach(a=>{const yes=a.hash==='#'+active;a.classList.toggle('active',yes);if(yes)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});}
 window.addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(renderScroll)}},{passive:true});
 reduced.addEventListener('change',()=>{setupScroll();queueMeasure();if(reduced.matches)document.querySelectorAll('.reveal-item').forEach(e=>e.classList.add('is-revealed'))});
 document.querySelectorAll('a[href^="#"]:not(.directory-item)').forEach(a=>a.addEventListener('click',event=>{if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;const target=document.getElementById(a.hash.slice(1));if(!target)return;event.preventDefault();history.pushState(null,'',a.hash);if(!target.hasAttribute('tabindex'))target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});}));
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
 function beginDialog(button){activeButton=button;savedScroll=scrollY;if(lenis){lenis.scrollTo(savedScroll,{immediate:true});lenis.stop();}document.querySelectorAll('video').forEach(v=>{if(window.portfolioVideo)window.portfolioVideo.pause(v);else v.pause()});document.body.classList.add('video-open');if(!dialog.open)dialog.showModal();closeButton.focus({preventScroll:true});}
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
 function cleanupVideo(){clearTimeout(loadTimeout);playerGeneration++;activeFrame=null;if(localPlayback){const {video,marker,toolbar,container}=localPlayback;window.portfolioVideo?.pause(video);video.pause();marker.replaceWith(video);if(toolbar)container.append(toolbar);localPlayback=null;}stage.replaceChildren();bookmarks.replaceChildren();status.textContent='';document.body.classList.remove('video-open');lenis?.start();if(lenis)lenis.scrollTo(savedScroll,{immediate:true});else window.scrollTo({top:savedScroll,behavior:'instant'});activeButton?.focus({preventScroll:true});activeButton=null;}
 document.querySelectorAll('.video-preview').forEach(button=>button.addEventListener('click',()=>openVideo(button)));
 closeButton.addEventListener('click',()=>dialog.close());dialog.addEventListener('close',cleanupVideo);
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()});
 dialog.querySelector('.dialog-fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await stage.requestFullscreen()}catch{status.textContent='可使用播放器右下角的全屏按钮。'}});
 window.visualViewport?.addEventListener('resize',()=>{if(dialog.open)fitDialog()});
 document.addEventListener('fullscreenchange',()=>{if(dialog.open)fitDialog()});
 document.querySelectorAll('.portrait-film').forEach(container=>{const button=document.createElement('button');button.className='local-enlarge';button.type='button';button.textContent='放大观看 ↗';container.after(button);button.addEventListener('click',()=>{beginDialog(button);wide=false;bookmarks.replaceChildren();const video=container.querySelector('video'),toolbar=container.querySelector('.video-quality-tools'),marker=document.createComment('video-home');video.replaceWith(marker);localPlayback={video,marker,toolbar,container};dialog.querySelector('#video-dialog-title').textContent=container.closest('.film-project').querySelector('h3').textContent;stage.replaceChildren(video);if(toolbar)stage.append(toolbar);const link=dialog.querySelector('.dialog-original');link.hidden=true;link.removeAttribute('href');status.textContent='';fitDialog();});});
 document.querySelectorAll('video').forEach(video=>{video.addEventListener('play',()=>document.querySelectorAll('video').forEach(v=>{if(v!==video)v.pause()}));video.addEventListener('error',()=>{const message=video.parentElement.querySelector('.local-video-error');if(message)message.hidden=false;});});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('video').forEach(v=>v.pause())});
 const revealTargets=[...document.querySelectorAll('.doubao-project>header,.douyin-card,.film-overline,.film-project>.work-title,.film-stage,.film-description,.commerce-heading,.commerce-board')];
 revealTargets.forEach(el=>el.classList.add('is-revealed'));
 queueMeasure();
})();
