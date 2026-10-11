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
    panels.forEach(item => { item.hidden = false; });
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
    panel.querySelector('.palace-return')?.addEventListener('click', () => {
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
