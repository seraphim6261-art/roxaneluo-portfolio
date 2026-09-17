import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const styles=['fonts.css','style.css','doodles.css','handwriting.css','paper-surround.css','palettes.css','assets/vendor/lenis.css','portfolio.css','refinements.css','compact.css','palace.css','chalk-directory.css','contact-bubble.css','hero-blink.css','commerce.css','chapters.css'];
const scripts=['app.js','douyin-stats.js','assets/vendor/lenis.min.js','portfolio.js','palace.js','chalk-directory.js','contact-bubble.js','hero-blink.js'];
for(const [name,files,separator] of [['site.css',styles,'\n'],['site.js',scripts,'\n;\n']]){
 const content=files.map(file=>`/* ${file} */\n${fs.readFileSync(path.join(root,file),'utf8')}`).join(separator);
 fs.writeFileSync(path.join(root,name),content);
}
let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
html=html.replace(/<link rel="stylesheet" href="([^"]+)">\s*/g,(tag,href)=>href==='fonts.css'?'<link rel="stylesheet" href="site.css">\n ':styles.includes(href)?'':tag);
html=html.replace(/<script src="([^"]+)"[^>]*><\/script>\s*/g,(tag,src)=>src==='app.js'?'<script src="site.js" defer></script>\n ':scripts.includes(src)?'':tag);
fs.writeFileSync(path.join(root,'index.html'),html);
console.log('Built site.css and site.js. Images, fonts and videos are unchanged.');
