/* One verified admin session shared across Amanda Rose's same-origin admin pages. */
window.RoseAdminSession=(()=>{
const key='rose_admin_session_v1',cfg=window.ROSE_SUPABASE;
const read=()=>{try{return JSON.parse(sessionStorage.getItem(key)||'null')}catch{return null}};
const clear=()=>sessionStorage.removeItem(key);
const save=d=>{const s={access_token:d.access_token,refresh_token:d.refresh_token,expires_at:d.expires_at||Date.now()+(d.expires_in||3600)*1000,email:d.email||read()?.email||''};sessionStorage.setItem(key,JSON.stringify(s));return s};
async function request(path,token,options={}){const r=await fetch(cfg.url+path,{...options,headers:{apikey:cfg.key,...(token?{Authorization:'Bearer '+token}:{}),...(options.headers||{})}});const d=await r.json().catch(()=>null);if(!r.ok)throw Error(d?.msg||d?.message||d?.error_description||'Authentication failed');return d}
async function ensure(){let s=read();if(!s?.access_token)return null;try{if(Date.now()>=s.expires_at-60000){const d=await request('/auth/v1/token?grant_type=refresh_token',null,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({refresh_token:s.refresh_token})});s=save({...d,email:s.email})}const me=await request('/auth/v1/user',s.access_token);const admins=await request('/rest/v1/shop_admins?select=user_id&user_id=eq.'+encodeURIComponent(me.id)+'&limit=1',s.access_token);if(!admins?.length)throw Error('Administrator access required');return s}catch{clear();return null}}
async function signIn(email,password){const d=await request('/auth/v1/token?grant_type=password',null,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});save({...d,email});const s=await ensure();if(!s)throw Error('Administrator access required');return s}
async function signOut(){const s=read();clear();if(s?.access_token)fetch(cfg.url+'/auth/v1/logout',{method:'POST',headers:{apikey:cfg.key,Authorization:'Bearer '+s.access_token}}).catch(()=>{})}
return {read,save,clear,ensure,signIn,signOut};
})();