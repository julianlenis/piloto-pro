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
   Voice.say(`Pregunta ${i+1}. ${q.q} ${q.o.map((o,k)=>'Opción '+L[k]+': '+o+'.').join(' ')}`);
   root.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(root.querySelector('.opt.ok'))return;const k=+b.dataset.k;root.querySelectorAll('.opt')[q.a].classList.add('ok');
     if(k===q.a)ok++;else{b.classList.add('ko');wrong.push(q);}
     k===q.a?Snd.beep(1046,0.18,0.2):Snd.error();Voice.say((k===q.a?'¡Correcto! ':'No es correcto. La buena es la '+L[q.a]+'. ')+q.e);
     root.querySelector('#qx').innerHTML=`<div class="expl">${k===q.a?'✅ <b>¡Correcto!</b>':'❌ <b>No es correcto.</b> La buena es la <b>'+L[q.a]+'</b>.'}<br>${q.e}</div><div class="btns"><button class="btn wide" id="qn">${i+1<items.length?'Siguiente ›':'Ver resultado'}</button></div>`;
     root.querySelector('#qn').onclick=()=>{i++;i<items.length?show():end();};
     root.querySelector('#qn').scrollIntoView({behavior:'smooth',block:'center'});});};
  const end=()=>{const pc=Math.round(100*ok/items.length);if(opt.onScore)opt.onScore(pc);const pass=pc>=(opt.pass||PASS);scrollTo(0,0);
   root.innerHTML=`<div class="q" style="text-align:center"><div class="mu">${opt.title}</div><div class="score ${pass?'okc':'koc'}">${pc}%</div><p>${ok} de ${items.length} correctas · ${pass?'🎉 ¡Aprobado! Buen trabajo, comandante.':'Necesitas un '+(opt.pass||PASS)+' % para aprobar. ¡Repasa y vuelve a intentarlo!'}</p>
   <div class="btns" style="justify-content:center"><button class="btn" id="qr">↺ Repetir</button>${opt.back?`<a class="btn sec" href="${opt.back}">Volver</a>`:''}</div></div>
   ${wrong.length?`<h2>Repaso de fallos</h2>${wrong.map(q=>`<div class="lesson" style="margin-bottom:8px"><b>${q.q}</b><p class="okc">✔ ${q.o[q.a]}</p><p class="sm">${q.e}</p></div>`).join('')}`:''}`;
   Voice.say(`Has sacado un ${pc} por ciento. ${pass?'¡Aprobado! Buen trabajo, comandante.':'Repasa y vuelve a intentarlo.'}`);if(pass)Snd.chime();
   root.insertAdjacentHTML('beforeend',Prof.card(false));
   root.querySelector('#qr').onclick=()=>opt.onExit?opt.onExit():Quiz.run(root,shuffle(qs),opt);};
  show();}};

/* ---------- Vistas ---------- */
const V={
home(){const p=ST.get();const last=localStorage.getItem('pp_last');
 app.innerHTML=`<div class="hero"><div class="plane">✈</div><div class="mu sm">Bienvenido a bordo, Julián</div><h1>Aprende a volar desde cero</h1><p>Escuela de vuelo, cursos por avión con exámenes y paneles de cabina interactivos para tu simulador.</p>
 <div class="btns">${last?`<a class="btn" href="${last}">▶ Continuar</a>`:`<a class="btn" href="#/c/escuela">▶ Empezar por la Escuela</a>`}<button class="btn sec" id="inst" style="display:none">📲 Instalar app</button></div></div>
 ${Prof.card(true)}
 <h2>🎓 Tu ruta de aprendizaje</h2><div class="list">
 ${[['escuela','1','Escuela de vuelo: fundamentos, radio, meteo, cartas, plan de vuelo'],['mcdu','2','MCDU / FMC: programa el ordenador de vuelo con un simulador de teclas'],['a320','3','Airbus A320 completo + panel'],['b787','4','Boeing 787 completo + panel'],['b737','5','Boeing 737 completo + panel'],['a350','6','Airbus A350 completo + panel'],['b777','7','Boeing 777 completo + panel']].map(([id,n,t])=>{const c=C(id),pc=courseProg(c);return `<a class="row" href="#/c/${id}"><span class="n ${pc===100?'done':''}">${pc===100?'✓':n}</span><div><b>${c.title}</b><small>${t}</small><div class="bar"><i style="width:${pc}%"></i></div></div><span class="go">›</span></a>`;}).join('')}</div>
 <h2>🎬 Vídeo-lecciones</h2><div class="grid">${VIDS.slice(0,4).map(v=>`<a class="card" href="#/v/${v.id}"><div class="ic">${v.ic}</div><b>${v.t}</b><small>Animación narrada</small></a>`).join('')}</div><p><a href="#/videos">Ver todas ›</a></p>
 <h2>🎛️ Paneles de cabina interactivos</h2><div class="grid">${Object.keys(PP.panels).map(k=>`<a class="card" href="#/p/${k}"><div class="ic">🎛️</div><b>${PP.panels[k].name}</b><small>Preparación desde cold & dark y vuelo completo hasta el apagado</small></a>`).join('')}</div>
 <h2>🧰 Herramientas rápidas</h2>${V.toolsGrid()}
 <div class="foot">Piloto Pro by Julián Lenis · Para estudio en simulador. No es formación aeronáutica oficial.</div>`;
 if(!localStorage.getItem('pp_onb'))Prof.onboard();else if(SET.get().teacher)Voice.say('Hola Julián. '+Prof.next().say);
 const b=$('#inst');if(window._dp){b.style.display='';b.onclick=()=>{window._dp.prompt();};}
},
toolsGrid(){return `<div class="grid">
 <a class="card" href="#/videos"><div class="ic">🎬</div><b>Vídeo-lecciones</b><small>Animaciones narradas + YouTube</small></a>
 <a class="card" href="#/t/alfabeto"><div class="ic">🔤</div><b>Alfabeto aeronáutico</b><small>Tabla, juego y deletreador</small></a>
 <a class="card" href="#/t/metar"><div class="ic">🌦️</div><b>METAR / TAF</b><small>Decodificador interactivo y ejercicios</small></a>
 <a class="card" href="#/t/wb"><div class="ic">⚖️</div><b>Peso y centrado</b><small>Calculadora didáctica</small></a>
 <a class="card" href="#/t/viento"><div class="ic">🧭</div><b>Viento cruzado</b><small>Componentes en pista</small></a>
 <a class="card" href="#/t/notam"><div class="ic">📢</div><b>NOTAM</b><small>Decodificador y ejercicios</small></a>
 <a class="card" href="#/t/ofp"><div class="ic">🧾</div><b>Generador de OFP</b><small>LEVC→LEBL: ETO, combustible, T/D</small></a>
 <a class="card" href="#/t/fuel"><div class="ic">⛽</div><b>Combustible</b><small>Taxi, trip, contingencia, reservas</small></a>
 <a class="card" href="#/t/navq"><div class="ic">⏱️</div><b>ETA y T/D</b><small>Ejercicios de cálculo</small></a>
 <a class="card" href="#/t/cartasq"><div class="ic">🗺️</div><b>Leer cartas</b><small>Mínimos, MSA, espera, LEMD</small></a>
 <a class="card" href="#/l/escuela/m3/l4"><div class="ic">🌬️</div><b>Viento y SIGWX</b><small>Barbas y símbolos</small></a></div>`;},
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
 ${c.final?`<h2>🏁 Examen final</h2><a class="row" href="#/x/${c.id}"><span class="n ${(p.f[c.id]||0)>=c.final.pass?'done':''}">🏁</span><div><b>Examen final: ${c.title}</b><small>${c.final.n} preguntas al azar de todo el curso · aprobado con ${c.final.pass} %${p.f[c.id]!=null?' · mejor nota: '+p.f[c.id]+' %':''}</small></div><span class="go">›</span></a>`:''}
 <div class="btns"><button class="btn sec" id="cRst">🗑️ Reiniciar curso</button></div>`;
 $('#cRst').onclick=()=>{if(!confirm(`¿Seguro que quieres reiniciar el curso “${c.title}”? Se borrarán las lecciones leídas, las notas de los tests${c.panel?', el examen y el progreso del panel':' y el examen'}.`))return;
  const p=ST.get();Object.keys(p.l).filter(k=>k.startsWith(c.id+'/')).forEach(k=>delete p.l[k]);Object.keys(p.q).filter(k=>k.startsWith(c.id+'/')).forEach(k=>delete p.q[k]);delete p.f[c.id];ST.set(p);
  if(c.panel)Object.keys(localStorage).filter(k=>k.startsWith('pp_panel_'+c.panel)).forEach(k=>localStorage.removeItem(k));toast('Curso reiniciado');V.course(c.id);};},
lesson(cid,mid,lid){const c=C(cid),m=c&&c.modules.find(x=>x.id===mid),l=m&&m.lessons.find(x=>x.id===lid);if(!l)return V.home();
 const p=ST.get();p.l[`${cid}/${mid}/${lid}`]=1;ST.set(p);localStorage.setItem('pp_last',location.hash);
 const flat=c.modules.flatMap(mm=>mm.lessons.map(x=>[mm,x])),fi=flat.findIndex(x=>x[1]===l),prev=flat[fi-1];
 const li=m.lessons.indexOf(l),next=m.lessons[li+1];
 app.innerHTML=`<div class="mu sm"><a href="#/c/${cid}">${c.title}</a> · ${m.title}</div><h1>${l.title}</h1>
 <div class="lnav">${prev?`<a class="btn sec" href="#/l/${cid}/${prev[0].id}/${prev[1].id}">‹ Anterior</a>`:`<a class="btn sec" href="#/c/${cid}">‹ Curso</a>`}<button class="btn sec" id="lSay">🔊 Escuchar</button><button class="btn sec" id="lStop">⏹</button></div>
 <div class="lesson">${l.html}</div>
 <div class="btns">${next?`<a class="btn wide" href="#/l/${cid}/${mid}/${next.id}">Siguiente lección: ${next.title} ›</a>`:`<a class="btn wide" href="#/q/${cid}/${mid}">📝 Hacer el test del módulo ›</a>`}</div>
 <div class="lnav">${prev?`<a class="btn sec" href="#/l/${cid}/${prev[0].id}/${prev[1].id}">‹ Lección anterior</a>`:''}<a class="btn sec" href="#/c/${cid}">☰ Índice del curso</a></div>`;
 if(typeof MC!=='undefined')MC.mount(app);const rd=()=>typeof MC!=='undefined'&&MC.cur?MC.cur.say():Voice.say(l.title+'. '+l.html);$('#lSay').onclick=()=>{SET.get().voice?rd():(SET.set('voice',true),UI.sync(),rd());};$('#lStop').onclick=()=>Voice.stop();rd();},
quiz(cid,mid){const c=C(cid),m=c&&c.modules.find(x=>x.id===mid);if(!m)return V.home();
 Quiz.run(app,shuffle(m.quiz),{title:`Test · ${m.title}`,back:`#/c/${cid}`,onScore:pc=>{const p=ST.get();p.q[`${cid}/${mid}`]=Math.max(pc,p.q[`${cid}/${mid}`]||0);ST.set(p);}});},
exam(cid){const c=C(cid);if(!c||!c.final)return V.home();const pool=c.modules.flatMap(m=>m.quiz);
 app.innerHTML=`<div class="hero"><h1>🏁 Examen final · ${c.title}</h1><p>${Math.min(c.final.n,pool.length)} preguntas elegidas al azar de todo el curso. Aprobado: ${c.final.pass} %. Tras cada respuesta verás la explicación.</p><div class="btns"><button class="btn" id="go">Empezar examen</button></div></div>`;
 $('#go').onclick=()=>Quiz.run(app,shuffle(pool).slice(0,c.final.n),{title:`Examen final · ${c.title}`,pass:c.final.pass,back:`#/c/${cid}`,onScore:pc=>{const p=ST.get();p.f[cid]=Math.max(pc,p.f[cid]||0);ST.set(p);}});},
panel(id){const P=PP.panels[id];if(!P)return V.home();localStorage.setItem('pp_last',location.hash);
 app.innerHTML=`<h1>🎛️ Panel ${P.name}</h1><p class="mu sm">Sigue las instrucciones: el control que toca parpadea en amarillo. Tócalo y mira cómo cambia.</p><div id="pnl"></div>`;Panel.run(id,$('#pnl'));},
tool(t){const r=app;if(QZ[t]){const z=QZ[t];Quiz.run(r,Tools[z[0]](),{title:z[1],back:z[2]});}else if(t==='alfabeto')Tools.alfa(r);else if(typeof Tools[t]==='function'&&!/Qs$/.test(t))Tools[t](r);else V.home();}
};
function route(){const h=location.hash.replace(/^#\/?/,'').split('/');scrollTo(0,0);Voice.stop();Snd.stopAll();if(window.Video)Video.g++;document.querySelectorAll('.sheet').forEach(x=>x.remove());
 const tab={'':'home',escuela:'escuela',c:/^(escuela|mcdu)$/.test(h[1])?'escuela':'aviones',l:/^(escuela|mcdu)$/.test(h[1])?'escuela':'aviones',sim:'escuela',q:'aviones',x:'aviones',p:'aviones',aviones:'aviones',herramientas:'herramientas',t:'herramientas',videos:'herramientas',v:'herramientas'}[h[0]]||'home';
 document.querySelectorAll('#tabs a').forEach(a=>a.classList.toggle('on',a.dataset.t===tab));
 $('#bBack').style.visibility=h[0]?'visible':'hidden';
 switch(h[0]){case'':V.home();break;case'escuela':V.escuela();break;case'aviones':V.aviones();break;case'herramientas':V.herramientas();break;
 case'c':V.course(h[1]);break;case'l':V.lesson(h[1],h[2],h[3]);break;case'q':V.quiz(h[1],h[2]);break;case'x':V.exam(h[1]);break;case'p':V.panel(h[1]);break;case't':V.tool(h[1]);break;case'videos':Video.list(app);break;case'sim':MC.free(app,h[1]);break;case'v':Video.play(h[1],app);break;default:V.home();}}
$('#bBack').onclick=()=>history.length>1?history.back():location.hash='#/';
/* ---------- Ajustes: voz, sonido, profesor ---------- */
const UI={sync(){const s=SET.get();$('#hVoice').classList.toggle('off',!s.voice);$('#hSnd').classList.toggle('off',!s.sound);$('#hVoice').textContent=s.voice?'🗣️':'🤐';$('#hSnd').textContent=s.sound?'🔊':'🔇';},
 sheet(){const s=SET.get();const d=document.createElement('div');d.className='sheet';d.innerHTML=`<div><h2 style="margin-top:0">⚙️ Ajustes</h2>
 <label class="sw"><span>🗣️ Voz del profesor (lee pasos y lecciones)</span><input type="checkbox" id="sV" ${s.voice?'checked':''}></label>
 <label class="sw"><span>🔊 Sonidos de cabina</span><input type="checkbox" id="sS" ${s.sound?'checked':''}></label>
 <label>Volumen de los sonidos</label><input type="range" id="sVol" min="0" max="1" step="0.05" value="${s.vol}">
 <label class="sw"><span>👨‍✈️ Modo profesor (te guía paso a paso)</span><input type="checkbox" id="sT" ${s.teacher?'checked':''}></label>
 <div class="btns"><button class="btn sec" id="sTest">▶ Probar sonidos</button><button class="btn sec" id="sOnb">Ver bienvenida</button><button class="btn" id="sOk">Cerrar</button></div></div>`;
 document.body.appendChild(d);const q=x=>d.querySelector(x);
 q('#sV').onchange=e=>{SET.set('voice',e.target.checked);if(!e.target.checked)Voice.stop();else Voice.say('Voz activada.');UI.sync();};
 q('#sS').onchange=e=>{SET.set('sound',e.target.checked);if(!e.target.checked)Snd.stopAll();UI.sync();};
 q('#sVol').oninput=e=>Snd.vol(+e.target.value);q('#sT').onchange=e=>{SET.set('teacher',e.target.checked);};
 q('#sTest').onclick=()=>{Snd.click(true);setTimeout(()=>Snd.start('apu'),300);setTimeout(()=>Snd.stop('apu'),3500);setTimeout(()=>Snd.chime(),4000);};
 q('#sOnb').onclick=()=>{d.remove();Prof.onboard();};q('#sOk').onclick=()=>d.remove();d.onclick=e=>{if(e.target===d)d.remove();};}};
$('#hVoice').onclick=()=>{const v=!SET.get().voice;SET.set('voice',v);v?Voice.say('Voz activada.'):Voice.stop();UI.sync();toast(v?'🗣️ Voz activada':'🤐 Voz desactivada');};
$('#hSnd').onclick=()=>{const v=!SET.get().sound;SET.set('sound',v);if(!v)Snd.stopAll();else{Snd.init();Snd.click(true);}UI.sync();toast(v?'🔊 Sonidos activados':'🔇 Sonidos desactivados');};
$('#hCfg').onclick=()=>UI.sheet();UI.sync();
/* ---------- Modo profesor ---------- */
const Prof={order:['escuela','mcdu','a320','b787','b737','a350','b777'],
 next(){const p=ST.get();const ids=[...this.order,...PP.courses.map(c=>c.id).filter(x=>!this.order.includes(x))];
  for(const id of ids){const c=C(id);if(!c)continue;
   for(const m of c.modules){for(const l of m.lessons){if(!p.l[`${c.id}/${m.id}/${l.id}`])return{href:`#/l/${c.id}/${m.id}/${l.id}`,txt:`Lee la lección <b>“${l.title}”</b> (${c.title} · ${m.title}).`,say:`Ahora te toca leer la lección ${l.title}, del curso ${c.title}.`};}
    if((p.q[`${c.id}/${m.id}`]||0)<PASS)return{href:`#/q/${c.id}/${m.id}`,txt:`Haz el <b>test del ${m.title}</b> (${c.title}). Necesitas un ${PASS} %.`,say:`Ahora haz el test del módulo ${m.title}. Necesitas un ${PASS} por ciento para aprobar.`};
    if(c.panel&&m.lessons.some(l=>l.html.includes('#/p/'+c.panel))&&(+localStorage.getItem('pp_panel_'+c.panel)||0)<Panel.flows(PP.panels[c.panel])[0].steps.length)return{href:`#/p/${c.panel}`,txt:`Practica el <b>panel interactivo del ${PP.panels[c.panel].name}</b>: enciende el avión paso a paso.`,say:`Es hora de practicar en el panel del ${PP.panels[c.panel].name}. Te iré diciendo qué tocar.`};}
   if(c.final&&(p.f[c.id]||0)<c.final.pass)return{href:`#/x/${c.id}`,txt:`¡Último paso del curso ${c.title}: el <b>examen final</b>!`,say:`Te toca el examen final de ${c.title}. ¡Ánimo!`};}
  return{href:'#/herramientas',txt:'¡Has completado todo! Repasa con las herramientas y el modo libre de los paneles.',say:'Has completado todos los cursos. ¡Enhorabuena, comandante!'};},
 card(home){if(!SET.get().teacher)return'';const n=this.next();return `<div class="prof"><div class="av">👨‍✈️</div><div><b>Tu profesor dice:</b><p>${home?'':'¡Bien hecho! '}Siguiente paso → ${n.txt}</p><a class="btn" href="${n.href}">Vamos ›</a></div></div>`;},
 onboard(){localStorage.setItem('pp_onb','1');const d=document.createElement('div');d.className='sheet';
  const txt=`Hola Julián, soy tu profesor de vuelo. Así funciona Piloto Pro. Primero, la Escuela de vuelo: aprenderás cómo vuela un avión, la radio, la meteorología, las cartas y el plan de vuelo. Después, el curso del Airbus A320, con su panel interactivo, donde te diré qué interruptor tocar y por qué. Luego el Boeing 787 y el 737. Cada módulo termina con un test, y cada avión con un examen final. Si no entiendes algo, usa el botón Anterior para volver atrás, y el botón repetir para que te lo vuelva a explicar. Puedes quitarme la voz con el botón de la cabeza que habla, y los sonidos con el altavoz. ¡Empecemos!`;
  d.innerHTML=`<div><div class="prof" style="margin-top:0"><div class="av">👨‍✈️</div><div><b>¡Bienvenido a Piloto Pro!</b><p>Soy tu profesor. Te iré diciendo qué hacer en cada momento.</p></div></div>
  <ol><li><b>Escuela de vuelo</b>: lo básico (cómo vuela un avión, radio, meteo, cartas, plan de vuelo).</li><li><b>Airbus A320</b> con su panel interactivo.</li><li><b>Boeing 787</b> y <b>737</b>; después A350 y 777.</li><li>Cada módulo acaba con un <b>test</b>; cada avión, con un <b>examen final</b>.</li></ol>
  <p class="sm">‹ <b>Anterior</b> para volver atrás · 🔁 para repetir · 🗣️ voz on/off · 🔊 sonidos on/off · ⚙️ ajustes.</p>
  <div class="btns"><a class="btn" href="#/l/escuela/m1/l1" id="oGo">▶ Empezar la primera lección</a><button class="btn sec" id="oX">Cerrar</button></div></div>`;
  document.body.appendChild(d);const close=()=>{d.remove();};d.querySelector('#oX').onclick=()=>{Voice.stop();close();};d.querySelector('#oGo').onclick=close;Voice.say(txt);}};
addEventListener('hashchange',route);route();
addEventListener('beforeinstallprompt',e=>{e.preventDefault();window._dp=e;const b=$('#inst');if(b){b.style.display='';b.onclick=()=>e.prompt();}});
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js'));
