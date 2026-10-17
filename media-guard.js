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
    document.querySelectorAll('video').forEach(video => { if (window.portfolioVideo) window.portfolioVideo.pause(video); else video.pause(); });
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
