import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const renderer=readFileSync(new URL('../rose-banner-renderer.js',import.meta.url),'utf8');
const browser=await chromium.launch({headless:true});
const base={eyebrow:'THE ROSE COLLECTION',title:'Amanda Rose',subtitle:'Beauty, fashion, faith and comedy',button_label:'Explore',button_url:'/shop.html'};
const design={background:'shop',overlay_opacity:37,eyebrow_size:28,title_size:78,subtitle_size:30,button_size:20,title_color:'#ffffff',subtitle_color:'#f4e9ee',button_bg_color:'#222222',button_color:'#ffffff',shadow_blur:6};
const fixtures=[
 ['default',base,design],
 ['empty',{...base,eyebrow:'',title:'',subtitle:'',button_label:'',button_url:''},design],
 ['long-copy',{...base,title:'Long headline testing consistent wrapping across two rendering contexts and different display widths',subtitle:'A deliberately long subtitle with spacing and wrapping and multiple words to exercise the text window'},design],
 ['offset-shadow',{...base,title:'Shadow and offsets'}, {...design,title_x:-45,title_y:15,subtitle_x:62,subtitle_y:-25,shadow_x:8,shadow_y:-4,shadow_opacity:70,shadow_color:'#7f2040'}],
 ['colors',{...base,title:'Custom colors'}, {...design,overlay_opacity:0,title_color:'#000000',subtitle_color:'#ff0000',eyebrow_color:'#f1f100',button_color:'#ffffff',button_bg_color:'#000000'}],
 ['max-overlay',{...base,title:'Full overlay'}, {...design,overlay_opacity:100}],
 ...Array.from({length:9},(_,i)=>['sector-'+i,base,{...design,title_position:Math.floor(i/3)+'-'+i%3,subtitle_position:Math.floor(i/3)+'-'+i%3,button_position:Math.floor(i/3)+'-'+i%3,eyebrow_position:Math.floor(i/3)+'-'+i%3}])
];
try{
 for(const [name,record,settings] of fixtures)for(const width of [1600,800,375]){
  const captures=[];
  for(const context of ['homepage','studio']){
   const page=await browser.newPage({viewport:{width:Math.max(width,400),height:900},deviceScaleFactor:1});
   const css=context==='homepage'?'.hero h2{font-size:155px!important;margin:20px!important}.btn{padding:40px!important}':'.preview h2{font-size:54px!important}.preview a{padding:9px!important}';
   await page.setContent('<style>*{box-sizing:border-box}body{margin:0}'+css+'#mount{position:relative;width:'+width+'px;height:'+(582*width/1600)+'px;overflow:hidden}</style><div id="mount"></div>');
   await page.addScriptTag({content:renderer});
   await page.evaluate(({record,settings,width})=>{const banner={...record,background_css:'design:'+JSON.stringify(settings)};const el=document.querySelector('#mount');const canvas=document.createElement('div');el.append(canvas);window.RoseBannerRenderer.renderBanner(banner,canvas);window.RoseBannerRenderer.scale(canvas,width)}, {record,settings,width});
   await page.evaluate(()=>document.fonts.ready);
   const layout=await page.evaluate(()=>{const c=document.querySelector('.rose-render-canvas');return {width:c.getBoundingClientRect().width,childCount:c.children.length}});
   assert.equal(Math.round(layout.width),width,name+' canvas scaled incorrectly');
   captures.push(await page.locator('#mount').screenshot());
   await page.close();
  }
  assert.ok(captures[0].equals(captures[1]),name+' differs at width '+width);
 }
 console.log('PASS: '+fixtures.length+' fixtures x 3 widths, same renderer pixels across both host contexts');
}finally{await browser.close()}
