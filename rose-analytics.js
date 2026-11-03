/* Privacy-conscious, first-party Rose Garden analytics. No cookies, IPs or third-party trackers. */
(()=>{'use strict';const cfg=window.ROSE_SUPABASE;if(!cfg)return;
let sid;try{sid=sessionStorage.getItem('rose_analytics_sid');if(!sid){sid=crypto.randomUUID();sessionStorage.setItem('rose_analytics_sid',sid)}}catch{sid=crypto.randomUUID()}
const allowed=new Set(['page_view','content_view','video_play','product_click','code_copy','code_shop_click']);
const clean=v=>String(v??'').slice(0,180);
window.roseTrack=(event_type,detail={})=>{if(!allowed.has(event_type))return;const row={event_type,page:clean(location.pathname||'/').slice(0,80),session_id:sid,item_id:detail.item_id?clean(detail.item_id).slice(0,100):null,item_name:detail.item_name?clean(detail.item_name):null,source:detail.source?clean(detail.source).slice(0,40):null};
try{fetch(cfg.url+'/rest/v1/rose_analytics_events',{method:'POST',headers:{apikey:cfg.key,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(row),keepalive:true}).catch(()=>{})}catch{}};
window.roseTrack('page_view');
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a)return;let u;try{u=new URL(a.href,location.href)}catch{return}if(!/^https?:$/.test(u.protocol)||u.origin===location.origin)return;if(location.pathname.includes('shop'))window.roseTrack('product_click',{item_name:a.closest('article,.card')?.querySelector('h2,h3')?.textContent||a.textContent,source:u.hostname});if(location.pathname.includes('discount-codes'))window.roseTrack('code_shop_click',{item_name:a.closest('article,.card')?.querySelector('h2,h3')?.textContent||a.textContent,source:u.hostname})},true);
})();