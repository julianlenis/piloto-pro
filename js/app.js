/* Piloto Pro by Julián Lenis — app */
const $=s=>document.querySelector(s);const app=$('#app');
const ST={get(){try{return JSON.parse(localStorage.getItem('pp_prog'))||{l:{},q:{},f:{}}}catch(e){return{l:{},q:{},f:{}}}},set(p){localStorage.setItem('pp_prog',JSON.stringify(p));}};
const C=id=>PP.courses.find(c=>c.id===id);
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const PASS=70;
function courseProg(c){const p=ST.get();let tot=0,done=0;c.modules.forEach(m=>{m.lessons.forEach(l=>{tot++;if(p.l[`${c.id}/${m.id}/${l.id}`])done++;});tot++;if((p.q[`${c.id}/${m.id}`]||0)>=PASS)done++;});if(c.final){tot++;if((p.f[c.id]||0)>=c.final.pass)done++;}if(c.panel){tot++;if((+localStorage.getItem('pp_panel_'+c.panel)||0)>=PP.panels[c.panel].flow.length)done++;}return Math.round(100*done/tot);}
const levelBadge=c=>c.level==='full'?'<span class="badge">Curso completo</span>':c.level==='intro'?'<span class="badge intro">Introducción</span>':'<span class="badge ok">Fundamentos</span>';

/* ---------- Quiz ---------- */
const Quiz={run(root,qs,opt){
  const L='ABC';let i=0,ok=0,wrong=[];const items=qs.map(q=>{const idx=shuffle([0,1,2]);return{...q,o:idx.map(k=>q.o[k]),a:idx.indexOf(q.a)};});
  const show=()=>{const q=items[i];scrollTo(0,0);
   root.innerHTML=`<div class="mu sm">${opt.title} · Pregunta ${i+1} de ${items.length}</div><div class="bar"><i style="width:${100*i/items.length}%"></i></div>
   <div class="q" style="margin-top:10px"><div class="qt">${q.q}</div>${q.o.map((o,k)=>`<button class="opt" data-k="${k}"><span class="L">${L[k]}</span><span>${o}</span></button>`).join('')}<div id="qx"></div></div>`;
   root.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(root.querySelector('.opt.ok'))return;const k=+b.dataset.k;root.querySelectorAll('.opt')[q.a].classList.add('ok');
     if(k===q.a)ok++;else{b.classList.add('ko');wrong.push(q);}
     root.querySelector('#qx').innerHTML=`<div class="expl">${k===q.a?'✅ <b>¡Correcto!</b>':'❌ <b>No es correcto.</b> La buena es la <b>'+L[q.a]+'</b>.'}<br>${q.e}</div><div class="btns"><button class="btn wide" id="qn">${i+1<items.length?'Siguiente ›':'Ver resultado'}</button></div>`;
     root.querySelector('#qn').onclick=()=>{i++;i<items.length?show():end();};
     root.querySelector('#qn').scrollIntoView({behavior:'smooth',block:'center'});});};
  const end=()=>{const pc=Math.round(100*ok/items.length);if(opt.onScore)opt.onScore(pc);const pass=pc>=(opt.pass||PASS);scrollTo(0,0);
   root.innerHTML=`<div class="q" style="text-align:center"><div class="mu">${opt.title}</div><div class="score ${pass?'okc':'koc'}">${pc}%</div><p>${ok} de ${items.length} correctas · ${pass?'🎉 ¡Aprobado! Buen trabajo, comandante.':'Necesitas un '+(opt.pass||PASS)+' % para aprobar. ¡Repasa y vuelve a intentarlo!'}</p>
   <div class="btns" style="justify-content:center"><button class="btn" id="qr">↺ Repetir</button>${opt.back?`<a class="btn sec" href="${opt.back}">Volver</a>`:''}</div></div>
   ${wrong.length?`<h2>Repaso de fallos</h2>${wrong.map(q=>`<div class="lesson" style="margin-bottom:8px"><b>${q.q}</b><p class="okc">✔ ${q.o[q.a]}</p><p class="sm">${q.e}</p></div>`).join('')}`:''}`;
   root.querySelector('#qr').onclick=()=>opt.onExit?opt.onExit():Quiz.run(root,shuffle(qs),opt);};
  show();}};

/* ---------- Vistas ---------- */
const V={
home(){const p=ST.get();const last=localStorage.getItem('pp_last');
 app.innerHTML=`<div class="hero"><div class="plane">✈</div><div class="mu sm">Bienvenido a bordo, Julián</div><h1>Aprende a volar desde cero</h1><p>Escuela de vuelo, cursos por avión con exámenes y paneles de cabina interactivos para tu simulador.</p>
 <div class="btns">${last?`<a class="btn" href="${last}">▶ Continuar</a>`:`<a class="btn" href="#/c/escuela">▶ Empezar por la Escuela</a>`}<button class="btn sec" id="inst" style="display:none">📲 Instalar app</button></div></div>
 <h2>🎓 Tu ruta de aprendizaje</h2><div class="list">
 ${[['escuela','1','Escuela de vuelo: fundamentos, radio, meteo, cartas, plan de vuelo'],['a320','2','Airbus A320 completo + panel'],['b787','3','Boeing 787 completo + panel'],['b737','4','Boeing 737 completo + panel']].map(([id,n,t])=>{const c=C(id),pc=courseProg(c);return `<a class="row" href="#/c/${id}"><span class="n ${pc===100?'done':''}">${pc===100?'✓':n}</span><div><b>${c.title}</b><small>${t}</small><div class="bar"><i style="width:${pc}%"></i></div></div><span class="go">›</span></a>`;}).join('')}</div>
 <h2>🎛️ Paneles de cabina interactivos</h2><div class="grid">${Object.keys(PP.panels).map(k=>`<a class="card" href="#/p/${k}"><div class="ic">🎛️</div><b>${PP.panels[k].name}</b><small>De cold & dark a listo para rodar, paso a paso</small></a>`).join('')}</div>
 <h2>🧰 Herramientas rápidas</h2>${V.toolsGrid()}
 <div class="foot">Piloto Pro by Julián Lenis · Para estudio en simulador. No es formación aeronáutica oficial.</div>`;
 const b=$('#inst');if(window._dp){b.style.display='';b.onclick=()=>{window._dp.prompt();};}
},
toolsGrid(){return `<div class="grid">
 <a class="card" href="#/t/alfabeto"><div class="ic">🔤</div><b>Alfabeto aeronáutico</b><small>Tabla, juego y deletreador</small></a>
 <a class="card" href="#/t/metar"><div class="ic">🌦️</div><b>METAR / TAF</b><small>Decodificador interactivo y ejercicios</small></a>
 <a class="card" href="#/t/wb"><div class="ic">⚖️</div><b>Peso y centrado</b><small>Calculadora didáctica</small></a>
 <a class="card" href="#/t/viento"><div class="ic">🧭</div><b>Viento cruzado</b><small>Componentes en pista</small></a>
 <a class="card" href="#/l/escuela/m5/l1"><div class="ic">🗺️</div><b>Cartas</b><small>SID, STAR, IAC, aeródromo, ruta</small></a>
 <a class="card" href="#/l/escuela/m4/l1"><div class="ic">📢</div><b>NOTAM</b><small>Cómo leerlos</small></a></div>`;},
escuela(){V.course('escuela');},
aviones(){app.innerHTML=`<h1>✈️ Aviones</h1><p class="mu">Catálogo de aviones. Los cursos completos incluyen sistemas, programación del FMS, panel interactivo y examen final. Las introducciones son una primera toma de contacto.</p>
 <div class="list">${PP.courses.filter(c=>c.level!=='school').map(c=>{const pc=courseProg(c);return `<a class="row" href="#/c/${c.id}"><span class="n" style="font-size:20px">${c.icon}</span><div><b>${c.title}</b> ${levelBadge(c)}<small>${c.sub}</small><div class="bar"><i style="width:${pc}%"></i></div></div><span class="go">›</span></a>`;}).join('')}</div>
 ${TIP('¿Más aviones?','La app está preparada para añadir más aviones fácilmente (catálogo basado en datos). Próximos candidatos: A330, A321neo, ATR 72…')}`;},
herramientas(){app.innerHTML=`<h1>🧰 Herramientas</h1>${V.toolsGrid()}`;},
course(id){const c=C(id);if(!c)return V.home();const p=ST.get();
 app.innerHTML=`<div class="hero"><div class="plane">${c.icon}</div>${levelBadge(c)}<h1>${c.title}</h1><p>${c.sub}</p><div class="bar"><i style="width:${courseProg(c)}%"></i></div><p class="sm">${courseProg(c)} % completado</p>
 ${c.panel?`<div class="btns"><a class="btn" href="#/p/${c.panel}">🎛️ Panel interactivo</a>${c.final?`<a class="btn sec" href="#/x/${c.id}">🏁 Examen final</a>`:''}</div>`:c.final?`<div class="btns"><a class="btn sec" href="#/x/${c.id}">🏁 Examen final</a></div>`:''}</div>
 ${c.modules.map(m=>`<h2>${m.title}</h2><div class="list">${m.lessons.map((l,i)=>{const d=p.l[`${c.id}/${m.id}/${l.id}`];return `<a class="row" href="#/l/${c.id}/${m.id}/${l.id}"><span class="n ${d?'done':''}">${d?'✓':i+1}</span><div><b>${l.title}</b><small>Lección</small></div><span class="go">›</span></a>`;}).join('')}
 <a class="row" href="#/q/${c.id}/${m.id}"><span class="n ${(p.q[c.id+'/'+m.id]||0)>=PASS?'done':''}">📝</span><div><b>Test del módulo</b><small>${m.quiz.length} preguntas A/B/C${p.q[c.id+'/'+m.id]!=null?' · mejor nota: '+p.q[c.id+'/'+m.id]+' %':''}</small></div><span class="go">›</span></a></div>`).join('')}
 ${c.final?`<h2>🏁 Examen final</h2><a class="row" href="#/x/${c.id}"><span class="n ${(p.f[c.id]||0)>=c.final.pass?'done':''}">🏁</span><div><b>Examen final: ${c.title}</b><small>${c.final.n} preguntas al azar de todo el curso · aprobado con ${c.final.pass} %${p.f[c.id]!=null?' · mejor nota: '+p.f[c.id]+' %':''}</small></div><span class="go">›</span></a>`:''}`;},
lesson(cid,mid,lid){const c=C(cid),m=c&&c.modules.find(x=>x.id===mid),l=m&&m.lessons.find(x=>x.id===lid);if(!l)return V.home();
 const p=ST.get();p.l[`${cid}/${mid}/${lid}`]=1;ST.set(p);localStorage.setItem('pp_last',location.hash);
 const li=m.lessons.indexOf(l),next=m.lessons[li+1];
 app.innerHTML=`<div class="mu sm">${c.title} · ${m.title}</div><h1>${l.title}</h1><div class="lesson">${l.html}</div>
 <div class="btns">${next?`<a class="btn wide" href="#/l/${cid}/${mid}/${next.id}">Siguiente lección: ${next.title} ›</a>`:`<a class="btn wide" href="#/q/${cid}/${mid}">📝 Hacer el test del módulo ›</a>`}</div>`;},
quiz(cid,mid){const c=C(cid),m=c&&c.modules.find(x=>x.id===mid);if(!m)return V.home();
 Quiz.run(app,shuffle(m.quiz),{title:`Test · ${m.title}`,back:`#/c/${cid}`,onScore:pc=>{const p=ST.get();p.q[`${cid}/${mid}`]=Math.max(pc,p.q[`${cid}/${mid}`]||0);ST.set(p);}});},
exam(cid){const c=C(cid);if(!c||!c.final)return V.home();const pool=c.modules.flatMap(m=>m.quiz);
 app.innerHTML=`<div class="hero"><h1>🏁 Examen final · ${c.title}</h1><p>${Math.min(c.final.n,pool.length)} preguntas elegidas al azar de todo el curso. Aprobado: ${c.final.pass} %. Tras cada respuesta verás la explicación.</p><div class="btns"><button class="btn" id="go">Empezar examen</button></div></div>`;
 $('#go').onclick=()=>Quiz.run(app,shuffle(pool).slice(0,c.final.n),{title:`Examen final · ${c.title}`,pass:c.final.pass,back:`#/c/${cid}`,onScore:pc=>{const p=ST.get();p.f[cid]=Math.max(pc,p.f[cid]||0);ST.set(p);}});},
panel(id){const P=PP.panels[id];if(!P)return V.home();localStorage.setItem('pp_last',location.hash);
 app.innerHTML=`<h1>🎛️ Panel ${P.name}</h1><p class="mu sm">Sigue las instrucciones: el control que toca parpadea en amarillo. Tócalo y mira cómo cambia.</p><div id="pnl"></div>`;Panel.run(id,$('#pnl'));},
tool(t){const r=app;if(t==='metar')Tools.metar(r);else if(t==='alfabeto')Tools.alfa(r);else if(t==='wb')Tools.wb(r);else if(t==='viento')Tools.viento(r);
 else if(t==='metarq'){Quiz.run(r,Tools.metarQs(),{title:'Ejercicios METAR',back:'#/t/metar'});}else V.home();}
};
function route(){const h=location.hash.replace(/^#\/?/,'').split('/');scrollTo(0,0);
 const tab={'':'home',escuela:'escuela',c:h[1]==='escuela'?'escuela':'aviones',l:h[1]==='escuela'?'escuela':'aviones',q:'aviones',x:'aviones',p:'aviones',aviones:'aviones',herramientas:'herramientas',t:'herramientas'}[h[0]]||'home';
 document.querySelectorAll('#tabs a').forEach(a=>a.classList.toggle('on',a.dataset.t===tab));
 $('#bBack').style.visibility=h[0]?'visible':'hidden';
 switch(h[0]){case'':V.home();break;case'escuela':V.escuela();break;case'aviones':V.aviones();break;case'herramientas':V.herramientas();break;
 case'c':V.course(h[1]);break;case'l':V.lesson(h[1],h[2],h[3]);break;case'q':V.quiz(h[1],h[2]);break;case'x':V.exam(h[1]);break;case'p':V.panel(h[1]);break;case't':V.tool(h[1]);break;default:V.home();}}
$('#bBack').onclick=()=>history.length>1?history.back():location.hash='#/';
addEventListener('hashchange',route);route();
addEventListener('beforeinstallprompt',e=>{e.preventDefault();window._dp=e;const b=$('#inst');if(b){b.style.display='';b.onclick=()=>e.prompt();}});
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js'));
