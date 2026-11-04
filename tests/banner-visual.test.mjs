import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const renderer = readFileSync(new URL('../rose-banner-renderer.js',import.meta.url),'utf8');
const browser=await chromium.launch({headless:true});
try {
 const banner={title:'Long headline testing consistent wrapping across two rendering contexts',eyebrow:'THE ROSE COLLECTION',subtitle:'A deliberately long subtitle with spacing and wrapping',button_label:'Explore',button_url:'/shop.html',background_css:'design:'+JSON.stringify({background:'sunset',overlay_opacity:37,title_position:'1-1',subtitle_position:'2-1',title_size:78,subtitle_size:30,title_x:-45,subtitle_y:15,title_color:'#ffffff',subtitle_color:'#f4e9ee',button_bg_color:'#222222',button_color:'#ffffff',shadow_blur:6})};
 const captures=[];
 for(const context of ['homepage','studio']){
  const page=await browser.newPage({viewport:{width:1800,height:900},deviceScaleFactor:1});
  await page.setContent('<style>body{margin:0}#mount{position:relative;width:1600px;height:582px;overflow:hidden}</style><div id="mount"></div>');
  await page.addScriptTag({content:renderer});
  await page.evaluate(({banner,context})=>{
   if(typeof window.RoseBannerRenderer?.renderBanner!=='function')throw Error('Shared renderer must expose RoseBannerRenderer.renderBanner(record, mount)');
   window.RoseBannerRenderer.renderBanner(banner,document.querySelector('#mount'),{context});
  },{banner,context});
  await page.evaluate(()=>document.fonts.ready);
  captures.push(await page.locator('#mount').screenshot());
  await page.close();
 }
 assert.ok(captures[0].equals(captures[1]),'Homepage and Studio pixels differ at identical logical canvas size');
 console.log('PASS: identical 1600x582 browser screenshots for both contexts');
} finally {await browser.close()}
