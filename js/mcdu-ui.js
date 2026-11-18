/* Prácticas guiadas, ideas paso a paso, mini-tests y glosario — Piloto Pro by Julián Lenis */
(function(){
const say=t=>{if(typeof Voice!=='undefined')Voice.say(t);};
const snd=f=>{try{if(typeof Snd!=='undefined')f(Snd);}catch(e){}};
/* ---------- Simulador + práctica ---------- */
MC.sim=function(el,opt){// opt:{pre,steps,id,title,end}
 let st=MC.make(opt.pre),i=0,on=false,hist=[];const id='m'+Math.random().toString(36).slice(2,7);
 const step=()=>opt.steps&&opt.steps[i];
 const hlKey=()=>{const s=step();if(!on||!s)return null;if(s.ty!=null){return s.ty.startsWith(st.sp)?(s.ty[st.sp.length]===' '?'SP':s.ty[st.sp.length]):'CLR';}return s.k;};
 const done=()=>localStorage.getItem('pp_mc_'+opt.id)==='1';
 const draw=(note)=>{const s=step(),n=opt.steps?opt.steps.length:0;
  let top='';if(opt.steps){top=on?(s?`<div class="pst"><div class="mu sm">Paso ${i+1} de ${n}</div><div class="bar"><i style="width:${100*i/n}%"></i></div><p class="ptx">${s.t}</p>${note?`<p class="pnote">${note}</p>`:''}<div class="btns">${s.ty!=null?'<button class="btn sec sm" data-a="fill">✍️ Escríbelo por mí</button>':''}<button class="btn sec sm" data-a="undo" ${i?'':'disabled'}>↶ Deshacer</button><button class="btn sec sm" data-a="rep">🔁 Repetir</button></div></div>`
   :`<div class="pst okb"><p class="ptx">🎉 <b>¡Práctica completada!</b> ${opt.end||''}</p><div class="btns"><button class="btn sec sm" data-a="start">↺ Repetir práctica</button><button class="btn sec sm" data-a="free">🕹️ Seguir tocando (modo libre)</button></div></div>`)
   :`<div class="pst"><p class="ptx">${done()?'✅ Ya la completaste. ':''}Te diré qué tecla pulsar en cada paso. La tecla correcta <b>parpadea en amarillo</b>.</p><div class="btns"><button class="btn" data-a="start">▶ Empezar práctica guiada</button></div></div>`;}
  el.innerHTML=top+MC.html(st,id);const k=hlKey();if(k){const b=el.querySelector(`.mcd [data-k="${CSS.escape(k)}"]`);if(b)b.classList.add('hl');}};
 const next=()=>{i++;hist.length=i;hist[i]=JSON.stringify(st);if(!step()){localStorage.setItem('pp_mc_'+opt.id,'1');snd(S=>S.chime());say('¡Práctica completada! '+(opt.end||'').replace(/<[^>]+>/g,''));draw();return;}snd(S=>S.beep(1046,0.12,0.15));draw();say(step().t);};
 const check=(k)=>{const s=step();if(s.ty!=null){if(st.sp===s.ty)next();else draw();return;}if(s.k===k){if(st.msg&&!s.err){draw('Mira el mensaje del bloc de notas.');return;}next();}};
 el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||!el.contains(b))return;
  if(b.dataset.a){const a=b.dataset.a;if(a==='start'){st=MC.make(opt.pre);i=0;on=true;hist=[JSON.stringify(st)];draw();say(step().t);const p=el.querySelector('.pst');if(p){p.scrollIntoView({block:'start'});scrollBy(0,-68);}}
   else if(a==='free'){on=false;opt.steps=null;draw();}
   else if(a==='undo'&&i>0){i--;st=JSON.parse(hist[i]);hist.length=i+1;draw();say('Deshecho. '+step().t);}
   else if(a==='rep'){say(step().t);}
   else if(a==='fill'){const s=step();st.sp=s.ty;st.msg='';check(null);}return;}
  const k=b.dataset.k;if(!k)return;snd(S=>S.click());
  if(on&&step()){const s=step();
   if(s.ty!=null){const okk=k.length===1||k==='SP'||k==='CLR'||k==='DEL'||k==='+/-';if(!okk){snd(S=>S.error());draw('Ahora toca <b>escribir</b> con el teclado: '+s.ty+'. Si te equivocas, CLR borra.');return;}MC.press(st,k);check(k);return;}
   if(k!==s.k){snd(S=>S.error());draw('Esa no es. Pulsa la tecla que <b>parpadea en amarillo</b>.');return;}
   MC.press(st,k);check(k);return;}
  MC.press(st,k);draw();});
 draw();
 return {get st(){return st;}};};
/* ---------- Ideas una a una ---------- */
function ideas(root){const box=root.querySelector('.ideas');if(!box)return null;const it=[...box.querySelectorAll(':scope>.idea')];let i=0;
 const nav=document.createElement('div');nav.className='inav';box.after(nav);
 const show=(sp)=>{it.forEach((x,j)=>x.style.display=j===i?'':'none');nav.innerHTML=`<button class="btn sec" ${i?'':'disabled'} data-i="-1">‹ Idea anterior</button><span class="dots">${it.map((_,j)=>`<i class="${j===i?'on':''}"></i>`).join('')}</span><button class="btn ${i<it.length-1?'':'sec'}" data-i="1">${i<it.length-1?'Siguiente idea ›':'Practicar ↓'}</button>`;if(sp)say(it[i].innerHTML);};
 nav.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=+b.dataset.i;if(d>0&&i===it.length-1){const t=root.querySelector('.resu,.mcsim,.miniq');if(t)t.scrollIntoView({behavior:'smooth'});return;}i=Math.max(0,Math.min(it.length-1,i+d));show(true);box.scrollIntoView({behavior:'smooth',block:'start'});});
 show(false);return {say(){say(it[i].innerHTML);}};}
/* ---------- Mini-test ---------- */
function miniq(el){const qs=(MC.Q||{})[el.dataset.q]||[];const L='ABC';
 el.innerHTML=qs.map((q,n)=>`<div class="q mq"><div class="qt">${n+1}. ${q.q}</div>${q.o.map((o,k)=>`<button class="opt" data-n="${n}" data-k="${k}"><span class="L">${L[k]}</span><span>${o}</span></button>`).join('')}<div class="qx"></div></div>`).join('');
 el.addEventListener('click',e=>{const b=e.target.closest('.opt');if(!b)return;const n=+b.dataset.n,k=+b.dataset.k,q=qs[n],box=b.closest('.mq');if(box.querySelector('.opt.ok'))return;
  box.querySelectorAll('.opt')[q.a].classList.add('ok');if(k!==q.a)b.classList.add('ko');snd(S=>k===q.a?S.beep(1046,0.18,0.2):S.error());
  box.querySelector('.qx').innerHTML=`<div class="expl">${k===q.a?'✅ <b>¡Correcto!</b>':'❌ <b>No.</b> La buena es la <b>'+L[q.a]+'</b>.'}<br>${q.e}</div>`;say((k===q.a?'¡Correcto! ':'No. La buena es la '+L[q.a]+'. ')+q.e);});}
/* ---------- Glosario ---------- */
let pop=null;const closePop=()=>{if(pop){pop.remove();pop=null;}};
function glos(root){const G=MC.G||{};const keys=Object.keys(G).sort((a,b)=>b.length-a.length);if(!keys.length)return;
 const re=new RegExp('(^|[^A-Za-zÁÉÍÓÚÑáéíóúñ0-9/])('+keys.map(k=>k.replace(/[.*+?^${}()|[\]\\\/]/g,'\\$&')).join('|')+')(?![A-Za-zÁÉÍÓÚÑáéíóúñ0-9])','');
 const seen=new Set();const L=root.querySelector('.lesson');if(!L)return;
 const tw=document.createTreeWalker(L,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('svg,figure,.mcd,.mcsim,abbr,a,button,.miniq,h1,.pst,table.gl')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
 const nodes=[];while(tw.nextNode())nodes.push(tw.currentNode);
 nodes.forEach(n=>{let t=n.nodeValue,frag=null,mm;let guard=0;
  while((mm=re.exec(t))&&guard++<20){const k=mm[2];if(seen.has(k)){const cut=mm.index+mm[0].length;frag=frag||document.createDocumentFragment();frag.appendChild(document.createTextNode(t.slice(0,cut)));t=t.slice(cut);continue;}
   seen.add(k);frag=frag||document.createDocumentFragment();const st=mm.index+mm[1].length;frag.appendChild(document.createTextNode(t.slice(0,st)));const ab=document.createElement('abbr');ab.className='gl';ab.textContent=k;ab.title=G[k];ab.tabIndex=0;frag.appendChild(ab);t=t.slice(st+k.length);}
  if(frag){frag.appendChild(document.createTextNode(t));n.replaceWith(frag);}});}
document.addEventListener('click',e=>{const ab=e.target.closest&&e.target.closest('abbr.gl');if(!ab){if(pop&&!e.target.closest('.gpop'))closePop();return;}
 e.preventDefault();closePop();pop=document.createElement('div');pop.className='gpop';pop.innerHTML=`<b>${ab.textContent}</b> ${ab.title}<button aria-label="Cerrar">✕</button>`;document.body.appendChild(pop);
 const r=ab.getBoundingClientRect();pop.style.top=(scrollY+r.bottom+6)+'px';pop.style.left=Math.max(8,Math.min(innerWidth-pop.offsetWidth-8,r.left-20))+'px';pop.querySelector('button').onclick=closePop;say(ab.textContent+'. '+ab.title);});
addEventListener('hashchange',closePop);
/* ---------- Montaje en una lección ---------- */
MC.mount=function(root){MC.cur=ideas(root);
 root.querySelectorAll('.mcsim').forEach(el=>{const p=(MC.P||{})[el.dataset.p];if(p)MC.sim(el,{...p,id:el.dataset.p,steps:p.steps.slice()});else MC.sim(el,{pre:el.dataset.pre||'a0'});});
 root.querySelectorAll('.miniq').forEach(miniq);glos(root);};
MC.free=function(root,m){m=m==='b'?'b':'a';root.innerHTML=`<div class="mu sm"><a href="#/c/mcdu">MCDU / FMC</a></div><h1>🕹️ ${m==='a'?'MCDU Airbus':'CDU Boeing'}: modo libre</h1><p class="mu sm">Toca lo que quieras. Ya tiene un vuelo de ejemplo LEMD → LEBL cargado. <a href="#/sim/${m==='a'?'b':'a'}">Cambiar a ${m==='a'?'Boeing':'Airbus'} ›</a></p><div class="mcsim" data-pre="${m==='a'?'aPerf':'bLegs'}"></div><p class="sm mu">Datos de ejemplo, no reales. Simulación simplificada para aprender.</p>`;
 MC.cur=null;MC.sim(root.querySelector('.mcsim'),{pre:m==='a'?'aPerf':'bLegs'});};
})();
