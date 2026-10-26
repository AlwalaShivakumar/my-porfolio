/* Original rounded keyboard geometry; Three.js is vendored locally under assets/vendor. */
const KEYS = [
  ['Python','Py','#004dde','Python for AI workflows, data exploration, and useful backend services.'],
  ['React','react','#009bbd','Responsive interfaces built around reusable React components.'],
  ['Gemini','spark','#6500c4','Generative AI experiences powered by the Gemini API.'],
  ['FastAPI','bolt','#008843','Clear, typed APIs connecting intelligent systems to the web.'],
  ['AI','AI','#d60025','AI tools that help people learn, practice, and make things.'],
  ['TypeScript','TS','#006fe5','TypeScript brings structure and confidence to interactive applications.'],
  ['JavaScript','JS','#e58b00','Interactive experiences and practical applications for the browser.'],
  ['HTML','</>','#ed3900','Semantic foundations that make interfaces understandable and accessible.'],
  ['CSS','CSS','#1832c9','Layout, detail, and considered motion for the browser.'],
  ['Git','git','#d7230b','Version control and an open record of the work, one commit at a time.'],
  ['LangChain','chain','#00952d','Connecting language models, tools, and retrieval into useful AI workflows.'],
  ['SQL','database','#cf9400','Structured data, thoughtful queries, and reliable application storage.'],
  ['Docker','containers','#008fda','Reproducible environments for bringing applications together.'],
  ['Node','node','#168800','The JavaScript runtime behind modern web tooling and application workflows.'],
  ['Data','bars','#5800b8','Finding useful patterns and making information easier to work with.'],
  ['API','API','#303943','Connecting products, services, and ideas through deliberate interfaces.'],
  ['Supabase','bolt','#008c46','PostgreSQL-backed application data and retrieval-powered experiences.'],
  ['Build','BUILD','#df6000','From an interesting idea to something people can actually use.'],
  ['Cloud','cloud','#31363e','Bringing useful backend and AI applications into the world.'],
  ['Launch','arrow','#8300cb','Put the work into the world. Keep learning from what happens next.'],
].map(([name,glyph,color,description])=>({name,glyph,color,description}));
const instances=new WeakMap();
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const damp=(a,b,dt,speed=12)=>a+(b-a)*(1-Math.exp(-dt*speed));

function labelTexture(T,glyph,name){
  const c=document.createElement('canvas');c.width=c.height=512;
  const g=c.getContext('2d');g.scale(2,2);g.fillStyle=g.strokeStyle='#fff';g.lineWidth=17;g.lineCap=g.lineJoin='round';
  g.save();g.translate(24,0);g.scale(.81,.81);
  const line=p=>{g.beginPath();p.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke();};
  const dot=(x,y,r)=>{g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill();};
  if(glyph==='react'){
    for(const angle of [0,Math.PI/3,-Math.PI/3]){g.save();g.translate(128,128);g.rotate(angle);g.beginPath();g.ellipse(0,0,91,35,0,0,Math.PI*2);g.stroke();g.restore();}dot(128,128,15);
  }else if(glyph==='spark'){
    g.beginPath();g.moveTo(128,28);g.bezierCurveTo(143,101,155,113,227,128);g.bezierCurveTo(155,143,143,155,128,227);g.bezierCurveTo(113,155,101,143,28,128);g.bezierCurveTo(101,113,113,101,128,28);g.fill();
  }else if(glyph==='bolt'){
    g.beginPath();[[148,24],[54,143],[119,143],[102,232],[203,109],[137,109]].forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fill();
  }else if(glyph==='database'){
    g.beginPath();g.ellipse(128,68,76,29,0,0,Math.PI*2);g.stroke();line([[52,68],[52,180]]);line([[204,68],[204,180]]);for(const y of [124,180]){g.beginPath();g.ellipse(128,y,76,29,0,0,Math.PI);g.stroke();}
  }else if(glyph==='git'){
    line([[83,56],[83,203]]);line([[83,89],[173,143],[173,197]]);dot(83,57,17);dot(83,204,17);dot(173,195,17);
  }else if(glyph==='chain'){
    g.save();g.translate(128,128);g.rotate(-Math.PI/4);g.lineWidth=19;for(const x of [-37,37]){g.beginPath();g.roundRect(x-47,-36,94,72,35);g.stroke();}g.restore();
  }else if(glyph==='containers'){
    for(const [x,y]of [[44,109],[102,109],[160,109],[102,51],[160,51]])g.fillRect(x,y,43,43);g.beginPath();g.moveTo(33,172);g.bezierCurveTo(65,219,180,224,222,172);g.closePath();g.fill();
  }else if(glyph==='node'){
    g.beginPath();for(let i=0;i<6;i++){const a=i*Math.PI/3-Math.PI/6,x=128+Math.cos(a)*99,y=128+Math.sin(a)*99;i?g.lineTo(x,y):g.moveTo(x,y);}g.closePath();g.stroke();g.font='bold 112px Arial';g.textAlign='center';g.textBaseline='middle';g.fillText('N',128,135);
  }else if(glyph==='bars'){
    for(const[x,h]of [[52,68],[110,130],[168,100]]){g.beginPath();g.roundRect(x,201-h,36,h,7);g.fill();}
  }else if(glyph==='cloud'){
    g.beginPath();g.moveTo(59,187);g.bezierCurveTo(14,187,17,119,62,112);g.bezierCurveTo(70,36,182,34,196,112);g.bezierCurveTo(249,123,233,187,194,187);g.closePath();g.stroke();
  }else if(glyph==='arrow'){
    line([[67,194],[193,68]]);line([[101,64],[197,64],[197,160]]);
  }else{
    const size=glyph==='BUILD'?76:['CSS','API','</>'].includes(glyph)?104:136;g.font=`900 ${size}px Arial Black, Arial, sans-serif`;g.textAlign='center';g.textBaseline='middle';g.lineWidth=2;g.strokeText(glyph,128,135);g.fillText(glyph,128,135);
  }
  g.restore();g.font='900 24px Arial Black, Arial, sans-serif';g.textAlign='center';g.textBaseline='middle';g.lineWidth=.8;g.strokeText(name.toUpperCase(),128,225,236);g.fillText(name.toUpperCase(),128,225,236);
  const texture=new T.CanvasTexture(c);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;return texture;
}
function roundedBox(T,w,h,depth,r,bevel=.09){
  const s=new T.Shape(),x=-w/2,y=-h/2;
  s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);
  const geo=new T.ExtrudeGeometry(s,{depth,bevelEnabled:true,bevelSize:bevel,bevelThickness:bevel,bevelSegments:5,steps:1,curveSegments:10});geo.translate(0,0,-depth/2);geo.computeVertexNormals();return geo;
}
function studio(T,renderer){
  const s=new T.Scene();s.background=new T.Color('#444c5b');
  for(const[p,size,intensity]of [[[-5,4,6],[5,8],5],[[5,1,5],[3,7],3],[[0,6,3],[7,2],5]]){
    const light=new T.Mesh(new T.PlaneGeometry(...size),new T.MeshBasicMaterial({color:new T.Color().setScalar(intensity),side:T.DoubleSide}));light.position.set(...p);light.lookAt(0,0,0);s.add(light);
  }
  const generator=new T.PMREMGenerator(renderer),target=generator.fromScene(s,.05,.1,30);generator.dispose();s.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});return target;
}

/** Degrees preserve the former CSS pose convention: positive X tilts the far edge away. */
export function initKeyboard(container,{onSelect}={}){
  const host=typeof container==='string'?document.querySelector(container):container;
  if(!(host instanceof HTMLElement))throw new TypeError('initKeyboard needs a container element.');
  instances.get(host)?.destroy();host.classList.add('sk-scene');host.dataset.renderer='css-fallback';
  let T,renderer,scene,camera,board,environment,keys=[],corners=[];
  let raf=0,last=0,elapsed=0,phase=0,width=1,height=1;
  let pointer=false,focus=false,visible=true,disposed=false,docked=false,selected=-1,hover=-1,focused=-1,pressed=-1;
  let reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
  const pose={rotateX:50,rotateY:-5,rotateZ:-24,scale:1};let current={...pose};
  const mount=document.createElement('div');mount.className='sk-keyboard';
  const canvas=document.createElement('canvas');canvas.className='sk-webgl-canvas';canvas.setAttribute('aria-hidden','true');
  const controls=document.createElement('div');controls.className='sk-key-grid';controls.setAttribute('role','group');controls.setAttribute('aria-label','Interactive developer toolkit. Choose a key to explore a skill.');
  const buttons=KEYS.map((key,index)=>{
    const b=document.createElement('button');b.type='button';b.className='sk-key';b.dataset.key=key.name;b.dataset.keyboardKey='';b.style.setProperty('--sk-key-color',key.color);b.setAttribute('aria-label',key.name);b.setAttribute('aria-description',key.description);b.setAttribute('aria-pressed','false');
    const text=document.createElement('span');text.className='sk-key-glyph';text.textContent=['Py','TS','JS','CSS','AI','API','BUILD','</>'].includes(key.glyph)?key.glyph:key.name;
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('sk-hit-shape');svg.setAttribute('aria-hidden','true');const polygon=document.createElementNS('http://www.w3.org/2000/svg','polygon');polygon.setAttribute('vector-effect','non-scaling-stroke');svg.append(polygon);b.append(text,svg);
    b.addEventListener('pointerenter',()=>{hover=index;freeze();requestFrame();});b.addEventListener('pointerleave',()=>{hover=-1;requestFrame();});
    b.addEventListener('pointerdown',()=>{pressed=index;requestFrame();});
    b.addEventListener('focus',()=>{focused=index;freeze();requestFrame();});b.addEventListener('blur',()=>{focused=-1;queueMicrotask(()=>{if(!host.contains(document.activeElement)){focus=false;requestFrame();}});});
    b.addEventListener('click',()=>{selected=index;buttons.forEach((item,i)=>{item.classList.toggle('is-selected',i===index);item.setAttribute('aria-pressed',String(i===index));});requestFrame();onSelect?.({name:key.name,description:key.description,color:key.color});});
    b.addEventListener('keydown',event=>{const offset={ArrowLeft:-1,ArrowRight:1,ArrowUp:-5,ArrowDown:5}[event.key];if(offset&&buttons[index+offset]){event.preventDefault();buttons[index+offset].focus();}});return b;
  });
  controls.append(...buttons);mount.append(canvas,controls);host.append(mount);
  const frozen=()=>pointer||focus||docked;
  const canRender=()=>!disposed&&!!renderer&&!document.hidden&&visible;
  function freeze(){elapsed=Math.max(elapsed,3);}
  function requestFrame(){if(canRender()&&!raf)raf=requestAnimationFrame(frame);}
  function projectButtons(){
    board.updateMatrixWorld(true);
    for(let i=0;i<keys.length;i++){
      const points=corners.map(v=>{const point=v.clone();if(docked)point.z-=keys[i].lift;return point.applyMatrix4(keys[i].group.matrixWorld).project(camera);});
      const xs=points.map(p=>(p.x+1)*width/2),ys=points.map(p=>(1-p.y)*height/2);
      const left=Math.min(...xs),top=Math.min(...ys),w=Math.max(...xs)-left,h=Math.max(...ys)-top,b=buttons[i];
      b.style.left=`${left}px`;b.style.top=`${top}px`;b.style.width=`${w}px`;b.style.height=`${h}px`;b.style.zIndex=String(Math.round((1-points.reduce((sum,p)=>sum+p.z,0)/points.length)*10000));
      b.style.clipPath=`polygon(${xs.map((x,j)=>`${((x-left)/w*100).toFixed(2)}% ${((ys[j]-top)/h*100).toFixed(2)}%`).join(',')})`;
      const svg=b.querySelector('svg');svg.setAttribute('viewBox',`0 0 ${w} ${h}`);svg.querySelector('polygon').setAttribute('points',xs.map((x,j)=>`${(x-left)*.92+w*.04},${(ys[j]-top)*.92+h*.04}`).join(' '));
    }
  }
  function frame(now){
    raf=0;if(!canRender())return;
    const dt=last?clamp((now-last)/1000,.001,.05):.016;last=now;
    if(!reduced&&!frozen()){elapsed+=dt;phase+=dt*.55;}
    let again=false;
    for(const name of Object.keys(current)){if(!frozen())current[name]=reduced?pose[name]:damp(current[name],pose[name],dt,7);if(!frozen()&&Math.abs(current[name]-pose[name])>.001)again=true;}
    const idle=reduced?0:1;
    board.rotation.set(-T.MathUtils.degToRad(current.rotateX)+Math.sin(phase*.8)*.03*idle,T.MathUtils.degToRad(current.rotateY)+Math.sin(phase*.6)*.085*idle,-T.MathUtils.degToRad(current.rotateZ)+Math.sin(phase*.45)*.035*idle,'XYZ');
    board.position.y=Math.sin(phase*.85)*.1*idle;board.scale.setScalar(current.scale);
    for(let i=0;i<keys.length;i++){
      const key=keys[i],progress=reduced?1:clamp((elapsed-i*.027)/.9,0,1),reveal=1-Math.pow(1-progress,4);
      const target=selected===i?-.16:pressed===i?-.12:!docked&&(hover===i||focused===i)?.13:0;key.lift=reduced?target:damp(key.lift,target,dt,18);
      key.group.position.z=.81+(1-reveal)*2.2+key.lift;key.group.rotation.x=(1-reveal)*-.25;key.material.emissiveIntensity=selected===i?.13:hover===i||focused===i?.065:0;
      if(progress<1||Math.abs(key.lift-target)>.001)again=true;
    }
    try{renderer.render(scene,camera);projectButtons();}catch{fallback();return;}
    if((!reduced&&!frozen())||again)requestFrame();
  }
  function resize(){
    if(!renderer)return;const bounds=host.getBoundingClientRect();width=Math.max(1,host.clientWidth||bounds.width);height=Math.max(1,host.clientHeight||bounds.height);renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,width<500?1.5:1.75));renderer.setSize(width,height,false);camera.aspect=width/height;camera.position.z=15/Math.min(camera.aspect,1.12);camera.updateProjectionMatrix();requestFrame();
  }
  function fallback(){
    cancelAnimationFrame(raf);raf=0;mount.classList.remove('sk-webgl');host.dataset.renderer='css-fallback';for(const b of buttons)for(const p of ['left','top','width','height','z-index','clip-path'])b.style.removeProperty(p);
    const old=renderer;renderer=null;try{old?.dispose();}catch{}
  }
  const enter=()=>{pointer=true;freeze();requestFrame();},leave=()=>{pointer=false;hover=-1;last=0;requestFrame();},focusIn=()=>{focus=true;freeze();requestFrame();};
  const visibility=()=>{cancelAnimationFrame(raf);raf=0;last=0;if(!document.hidden)requestFrame();};
  const release=()=>{pressed=-1;requestFrame();};
  host.addEventListener('pointerenter',enter);host.addEventListener('pointerleave',leave);host.addEventListener('focusin',focusIn);document.addEventListener('visibilitychange',visibility);canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();fallback();});
  window.addEventListener('pointerup',release);window.addEventListener('pointercancel',release);
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
  const intersectionObserver=new IntersectionObserver(entries=>{visible=entries.some(entry=>entry.isIntersecting);if(!visible){cancelAnimationFrame(raf);raf=0;last=0;}else requestFrame();},{rootMargin:'120px'});intersectionObserver.observe(host);
  const api={
    setDocked(value){docked=Boolean(value);if(docked){elapsed=3;current={...pose};}requestFrame();},
    setPose(next={}){for(const name of ['rotateX','rotateY','rotateZ'])if(Number.isFinite(next[name]))pose[name]=clamp(next[name],-180,180);if(Number.isFinite(next.scale))pose.scale=clamp(next.scale,.35,1.8);mount.style.setProperty('--sk-fallback-rotation',`${pose.rotateZ}deg`);if(docked||reduced&&!frozen())current={...pose};requestFrame();},
    setReducedMotion(value){reduced=Boolean(value);host.classList.toggle('sk-reduced-motion',reduced);if(reduced){elapsed=3;current={...pose};}requestFrame();},
    destroy(){disposed=true;cancelAnimationFrame(raf);resizeObserver.disconnect();intersectionObserver.disconnect();document.removeEventListener('visibilitychange',visibility);window.removeEventListener('pointerup',release);window.removeEventListener('pointercancel',release);host.removeEventListener('pointerenter',enter);host.removeEventListener('pointerleave',leave);host.removeEventListener('focusin',focusIn);scene?.traverse(o=>{o.geometry?.dispose();if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material]){m.map?.dispose();m.dispose();}});environment?.dispose();renderer?.dispose();mount.remove();instances.delete(host);},
  };
  instances.set(host,api);api.setReducedMotion(reduced);
  api.ready=(async()=>{
    try{
      T=await import('./vendor/three.module.js');if(disposed)return false;
      const context=canvas.getContext('webgl2',{alpha:true,antialias:true,powerPreference:'high-performance'});if(!context){fallback();return false;}
      renderer=new T.WebGLRenderer({canvas,context,alpha:true,antialias:true,powerPreference:'high-performance'});renderer.setClearColor(0x000000,0);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.NeutralToneMapping;renderer.toneMappingExposure=.85;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
      scene=new T.Scene();camera=new T.PerspectiveCamera(34,1,.1,60);camera.position.set(0,0,15);environment=studio(T,renderer);scene.environment=environment.texture;
      scene.add(new T.HemisphereLight('#ffffff','#16131e',.5));
      const light=new T.DirectionalLight('#ffffff',2.1);light.position.set(-4,6,9);light.castShadow=true;light.shadow.mapSize.set(1024,1024);light.shadow.camera.left=light.shadow.camera.bottom=-6;light.shadow.camera.right=light.shadow.camera.top=6;light.shadow.normalBias=.025;light.shadow.bias=-.0003;light.shadow.radius=4;scene.add(light);
      const fill=new T.DirectionalLight('#d8e6ff',.45);fill.position.set(6,-2,5);scene.add(fill);const rim=new T.DirectionalLight('#fff',.65);rim.position.set(-2,-4,2);scene.add(rim);
      board=new T.Group();scene.add(board);
      const base=new T.Mesh(roundedBox(T,6.12,4.91,.41,.34,.13),new T.MeshPhysicalMaterial({color:'#101318',roughness:.36,metalness:.25,clearcoat:.55,clearcoatRoughness:.3}));base.castShadow=base.receiveShadow=true;board.add(base);
      const inset=new T.Mesh(roundedBox(T,5.96,4.75,.065,.28,.055),new T.MeshPhysicalMaterial({color:'#191d24',roughness:.4,metalness:.24,clearcoat:.35}));inset.position.z=.264;inset.receiveShadow=true;board.add(inset);
      const capGeometry=roundedBox(T,.87,.87,.46,.16,.095),labelGeometry=new T.PlaneGeometry(.78,.78),stemGeometry=new T.BoxGeometry(.45,.45,.28),stemMaterial=new T.MeshStandardMaterial({color:'#15171c',roughness:.45});
      for(let i=0;i<KEYS.length;i++){
        const key=KEYS[i],group=new T.Group();group.position.set((i%5-2)*1.13,(1.5-Math.floor(i/5))*1.13,.81);
        const material=new T.MeshPhysicalMaterial({color:key.color,emissive:key.color,emissiveIntensity:0,roughness:.32,metalness:.03,clearcoat:.45,clearcoatRoughness:.24,envMapIntensity:.25});
        const cap=new T.Mesh(capGeometry,material);cap.castShadow=cap.receiveShadow=true;group.add(cap);
        const stem=new T.Mesh(stemGeometry,stemMaterial);stem.position.z=-.38;group.add(stem);
        const glyph=new T.Mesh(labelGeometry,new T.MeshBasicMaterial({map:labelTexture(T,key.glyph,key.name),transparent:true,depthWrite:false,toneMapped:false,polygonOffset:true,polygonOffsetFactor:-1}));glyph.position.z=.327;group.add(glyph);board.add(group);keys.push({group,material,lift:0});
      }
      const screwGeometry=new T.CylinderGeometry(.04,.04,.012,12),screwMaterial=new T.MeshStandardMaterial({color:'#79828a',metalness:.8,roughness:.35});
      for(const x of [-2.88,2.88])for(const y of [-2.27,2.27]){const screw=new T.Mesh(screwGeometry,screwMaterial);screw.rotation.x=Math.PI/2;screw.position.set(x,y,.353);board.add(screw);}
      corners=[[-.46,.46],[.46,.46],[.46,-.46],[-.46,-.46]].map(([x,y])=>new T.Vector3(x,y,.335));
      resize();mount.classList.add('sk-webgl');host.dataset.renderer='webgl';last=0;requestFrame();return true;
    }catch{fallback();return false;}
  })();
  return api;
}
