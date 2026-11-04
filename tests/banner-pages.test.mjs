import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
const root=resolve(new URL('..',import.meta.url).pathname);
const server=createServer((req,res)=>{
 const pathname=decodeURIComponent((req.url||'/').split('?')[0]);
 const full=resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
 if(!full.startsWith(root+sep)){res.writeHead(403).end();return}
 try{const data=readFileSync(full);res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html'}[extname(full)]||'text/plain'));res.end(data)}catch{res.writeHead(404).end('Not found')}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true});
try{
 for(const width of [1440,800,390]){
  for(const path of ['/','/banner-studio.html']){
   const page=await browser.newPage({viewport:{width,height:900}});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(origin+path,{waitUntil:'domcontentloaded'});
   assert.equal(await page.evaluate(()=>typeof window.RoseBannerRenderer?.renderBanner),'function',path+' did not load shared renderer');
   const mounted=await page.evaluate(()=>{
    const host=document.createElement('div');host.style.cssText='position:relative;width:1600px;height:582px';
    document.body.append(host);
    const canvas=document.createElement('div');host.append(canvas);
    window.RoseBannerRenderer.renderBanner({title:'Amanda Rose',subtitle:'Beauty and fashion',button_label:'Explore',button_url:'/shop.html',background_css:'design:'+JSON.stringify({title_size:76,button_size:20})},canvas);
    return {title:canvas.querySelector('.rose-render-title')?.textContent,font:getComputedStyle(canvas.querySelector('.rose-render-title')).fontSize,padding:getComputedStyle(canvas.querySelector('a')).padding}
   });
   assert.equal(mounted.title,'Amanda Rose');
   assert.equal(mounted.font,'76px');
   assert.equal(mounted.padding,'12px 20px');
   assert.equal(errors.filter(e=>/RoseBannerRenderer|renderBanner/.test(e)).length,0);
   await page.close();
  }
 }
 console.log('PASS: actual page HTML loads shared renderer at desktop and mobile widths');
}finally{await browser.close();await new Promise(r=>server.close(r))}
