// User preference: preview the outer frame color only; preserve all other colors.
(() => {
 const palettes={
  sage:'#a3ac8a',sand:'#b9a48a',slate:'#91a9b5',clay:'#bc8d78',mauve:'#a796ac'
 };
 const key=new URLSearchParams(location.search).get('palette');
 if(!Object.prototype.hasOwnProperty.call(palettes,key))return;
 const root=document.documentElement;
 root.dataset.palette=key;
 root.style.setProperty('--preview-frame',palettes[key]);
})();
