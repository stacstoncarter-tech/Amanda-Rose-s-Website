from pathlib import Path
from html.parser import HTMLParser
import subprocess,re,json
root=Path(__file__).resolve().parent.parent
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.refs=[];self.scripts=[];self.script=False;self.buf=''
 def handle_starttag(self,t,a):
  a=dict(a)
  for k in ['src','href']:
   if a.get(k):self.refs.append(a[k])
  if t=='script' and 'src' not in a:self.script=True;self.buf=''
 def handle_data(self,d):
  if self.script:self.buf+=d
 def handle_endtag(self,t):
  if t=='script' and self.script:self.scripts.append(self.buf);self.script=False
errors=[];count=0
for f in root.glob('*.html'):
 p=Parser();p.feed(f.read_text())
 for ref in p.refs:
  if ref.startswith(('http:','https:','mailto:','#','data:')):continue
  target=ref.split('?')[0].split('#')[0]
  if target and not (root/target).exists():errors.append(f'{f.name}: missing {target}')
 for s in p.scripts:
  r=subprocess.run(['node','--check'],input=s,text=True,capture_output=True);count+=1
  if r.returncode:errors.append(f'{f.name}: {r.stderr}')
for f in root.glob('*.js'):
 r=subprocess.run(['node','--check',str(f)],capture_output=True,text=True);count+=1
 if r.returncode:errors.append(r.stderr)
base=subprocess.check_output(['git','show','14b920d021a1e5e032110f39325ae21e4ec39f9e:index.html'],cwd=root,text=True);new=(root/'index.html').read_text()
for tag in ['header','section class="rose-banner"']:
 start='<'+tag;end='</header>' if tag=='header' else '</section>'
 assert base.split(start,1)[1].split(end,1)[0]==new.split(start,1)[1].split(end,1)[0],f'{tag} changed'
for f in ['rose-global-header.css','rose-banner-public.js','rose-banner-match.css','banner-studio.html','rose-banner-admin.js']:
 assert subprocess.check_output(['git','show','14b920d021a1e5e032110f39325ae21e4ec39f9e:'+f],cwd=root)==(root/f).read_bytes(),f+' changed'
curation=json.loads((root/'shopping-curation.json').read_text())
for id,m in curation['products'].items():assert id and m.get('brand')
assert 'SITE_ARCHITECTURE.md' in (root/'AGENTS.md').read_text()
if errors:raise SystemExit('\n'.join(errors))
print(f'PASS: {count} JavaScript syntax checks; all local HTML references resolve; homepage header/banner and protected assets unchanged; architecture rule persisted.')
