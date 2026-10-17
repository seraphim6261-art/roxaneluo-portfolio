(() => {
  'use strict';
  const videos = [...document.querySelectorAll('video[data-smooth-src]')];
  const connection = navigator.connection;
  const canPrefetch = () => !connection?.saveData && !/^(slow-)?2g$/.test(connection?.effectiveType || '');
  const states = new WeakMap();
  const nearby = new Set();
  let warming = null;

  // Warm only the nearest film's headers/first frame, not every film on the page.
  function warmNearest() {
    if (document.hidden || !canPrefetch() || videos.some(video => !video.paused)) return;
    const nearest = [...nearby].filter(video => !states.get(video).started)
      .sort((a, b) => Math.abs(a.getBoundingClientRect().top - innerHeight / 2) - Math.abs(b.getBoundingClientRect().top - innerHeight / 2))[0];
    if (warming && warming !== nearest && !states.get(warming).started) warming.preload = 'none';
    warming = nearest || null;
    if (nearest && nearest.preload === 'none') nearest.preload = 'metadata';
  }
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? nearby.add(entry.target) : nearby.delete(entry.target));
    warmNearest();
  }, { rootMargin: '500px 0px' }) : null;

  videos.forEach(video => {
    const state = { quality: 'hd', started: false, pending: null, generation: 0, fallback: false };
    states.set(video, state);
    const toolbar = document.createElement('div');
    toolbar.className = 'video-quality-tools';
    toolbar.setAttribute('role', 'group');
    toolbar.setAttribute('aria-label', `${video.getAttribute('aria-label')} · 视频清晰度`);
    const buttons = {};
    for (const [quality, label] of [['hd', '高清'], ['smooth', '流畅']]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.setAttribute('aria-pressed', String(quality === state.quality));
      button.addEventListener('click', () => switchQuality(quality));
      toolbar.append(button);
      buttons[quality] = button;
    }
    const status = document.createElement('span');
    status.className = 'video-quality-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    toolbar.append(status);
    video.parentElement.append(toolbar);

    function switchQuality(quality, recovery = false) {
      if (quality === state.quality && !recovery) return;
      // A second click during loading keeps the original time and play intent.
      const snapshot = state.pending || { time: video.currentTime || 0, playing: !video.paused && !video.ended, rate: video.playbackRate, volume: video.volume, muted: video.muted };
      state.pending = snapshot;
      state.quality = quality;
      state.generation++;
      state.fallback = recovery;
      for (const key of Object.keys(buttons)) buttons[key].setAttribute('aria-pressed', String(key === quality));
      const error = video.closest('.film-stage')?.querySelector('.local-video-error');
      if (error) error.hidden = true;
      status.textContent = recovery ? '正在尝试高清原片…' : '切换中…';
      video.preload = 'auto';
      video.querySelector('source').src = recovery ? video.dataset.originalSrc : quality === 'hd' ? video.dataset.hdSrc : video.dataset.smoothSrc;
      video.load();
    }

    video.addEventListener('loadedmetadata', () => {
      const pending = state.pending;
      if (!pending) return;
      const generation = state.generation;
      video.playbackRate = pending.rate;
      video.volume = pending.volume;
      video.muted = pending.muted;
      const time = Math.min(pending.time, Math.max(0, video.duration - 0.05));
      const finish = () => {
        if (generation !== state.generation) return;
        state.pending = null;
        status.textContent = '';
        if (pending.playing && video.isConnected && !document.hidden) video.play().catch(() => {
          status.textContent = '点击播放继续';
        });
      };
      if (time > 0) {
        video.addEventListener('seeked', finish, { once: true });
        video.currentTime = time;
      } else finish();
    });
    video.addEventListener('play', () => {
      state.started = true;
      video.preload = 'auto';
      status.textContent = '';
      document.querySelectorAll('video').forEach(other => {
        if (other === video) return;
        other.pause();
        const otherState = states.get(other);
        if (otherState?.pending) otherState.pending.playing = false;
        if (otherState && !otherState.started) other.preload = 'none';
      });
    });
    video.addEventListener('waiting', () => {
      if (!video.paused) status.textContent = state.quality === 'hd' ? '缓冲中，可切换流畅版' : '缓冲中…';
    });
    video.addEventListener('playing', () => { status.textContent = ''; });
    video.addEventListener('error', () => {
      if (!state.fallback) switchQuality('hd', true);
      else status.textContent = '暂时未能加载，请重新播放';
    });
    // Source errors do not always bubble up as a media-element error.
    video.querySelector('source').addEventListener('error', () => {
      if (!state.fallback) switchQuality('hd', true);
      else {
        status.textContent = '暂时未能加载，请重新播放';
        const error = video.closest('.film-stage')?.querySelector('.local-video-error');
        if (error) error.hidden = false;
      }
    });
    // Hover/focus is a stronger indication of intent than simply scrolling past.
    video.addEventListener('pointerenter', () => {
      if (canPrefetch() && !videos.some(other => other !== video && !other.paused)) video.preload = 'auto';
    });
    video.addEventListener('focus', () => {
      if (canPrefetch() && !videos.some(other => other !== video && !other.paused)) video.preload = 'auto';
    });
    observer?.observe(video);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) videos.forEach(video => {
      const state = states.get(video);
      if (state.pending) state.pending.playing = false;
      video.pause();
    });
    else warmNearest();
  });
  // Dialog close must also cancel any in-flight quality switch's resume intent.
  window.portfolioVideo = { pause(video) {
    const state = states.get(video);
    if (state?.pending) state.pending.playing = false;
    video.pause();
  } };
})();
