import {readFile,access,readdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
const html=await readFile('dist/index.html','utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
if(new Set(ids).size!==ids.length)throw new Error('Duplicate element IDs');
for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const value=match[1];if(value.startsWith('#')){if(!ids.includes(value.slice(1)))throw new Error(`Missing anchor ${value}`);}
  else if(!/^(?:https?:|mailto:|data:)/.test(value))await access(resolve('dist',value));
}
for(const file of ['dist/assets/app.js','dist/assets/keyboard.js','dist/assets/cursor.js','scripts/serve.mjs']){
  const result=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});if(result.status!==0)throw new Error(result.stderr);
}
if(/lorem ipsum|your name here|your-github|TODO/i.test(html))throw new Error('Unfinished placeholder content');
const config=JSON.parse(await readFile('vercel.json','utf8'));
if(config.outputDirectory!=='dist'||config.framework!==null)throw new Error('Vercel static output is not configured');
console.log(JSON.stringify({passed:true,htmlAnchors:ids.length,sourceFiles:(await readdir('dist/assets')).length,checks:['local asset references','anchor destinations','unique IDs','JavaScript syntax','placeholder scan','Vercel configuration']}));
