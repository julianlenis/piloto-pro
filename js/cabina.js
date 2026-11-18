/* Cabina completa para clases: vista de toda la cabina con zoom, explicación al tocar y clase guiada — Piloto Pro by Julián Lenis.
   Dibujos propios y esquemáticos (no a escala). */
const CAB={};
(function(){
const raw=f=>(f.match(/<svg[\s\S]*<\/svg>/)||[''])[0].replace(/<g class="num">[\s\S]*?<\/g>/g,'').replace(/<line [^>]*stroke="#facc15" stroke-width="1\.3"\/>/g,'');
const put=(svg,x,y,w,h)=>svg.replace('<svg ',`<svg x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet" `);
const box=(x,y,w,h,t,sub,col='#111827')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#000" stroke="#475569" stroke-width="3"/><rect x="${x+8}" y="${y+8}" width="${w-16}" height="${h-16}" rx="4" fill="${col}"/><text x="${x+w/2}" y="${y+h/2}" text-anchor="middle" fill="#fff" font-size="22" font-weight="bold">${t}</text>${sub?`<text x="${x+w/2}" y="${y+h/2+26}" text-anchor="middle" fill="#94a3b8" font-size="15">${sub}</text>`:''}`;
const efis=(x,y,A)=>`<g transform="translate(${x} ${y})"><rect width="300" height="150" rx="10" fill="#4b5563"/>${A?'<text x="70" y="24" fill="#fff" font-size="15" text-anchor="middle">QNH / STD</text><rect x="35" y="32" width="70" height="26" fill="#111"/><text x="70" y="51" fill="#fb923c" font-size="17" text-anchor="middle">1013</text><circle cx="70" cy="95" r="26" fill="#1f2937" stroke="#9ca3af" stroke-width="3"/>':'<text x="70" y="24" fill="#fff" font-size="15" text-anchor="middle">MINS · BARO</text><circle cx="45" cy="70" r="22" fill="#1f2937" stroke="#9ca3af" stroke-width="3"/><circle cx="100" cy="70" r="22" fill="#1f2937" stroke="#9ca3af" stroke-width="3"/>'}
 <text x="185" y="24" fill="#fff" font-size="15" text-anchor="middle">MODO</text><circle cx="185" cy="66" r="26" fill="#1f2937" stroke="#9ca3af" stroke-width="3"/><text x="255" y="24" fill="#fff" font-size="15" text-anchor="middle">ESCALA</text><circle cx="255" cy="66" r="26" fill="#1f2937" stroke="#9ca3af" stroke-width="3"/>
 ${[0,1,2,3,4].map(i=>`<rect x="${140+i*30}" y="110" width="24" height="24" rx="3" fill="#111" stroke="#000"/>`).join('')}</g>`;
const gear=(x,y,A)=>`<g transform="translate(${x} ${y})"><rect width="130" height="150" rx="8" fill="#374151"/><text x="40" y="22" fill="#fff" font-size="14" text-anchor="middle">UP</text><line x1="40" y1="30" x2="40" y2="118" stroke="#111" stroke-width="8"/><circle cx="40" cy="112" r="18" fill="#f1f5f9" stroke="#111" stroke-width="2"/><text x="40" y="146" fill="#fff" font-size="13" text-anchor="middle">DOWN</text>${[0,1,2].map(i=>`<rect x="78" y="${20+i*40}" width="40" height="30" rx="3" fill="#052e16" stroke="#22c55e" stroke-width="2"/><text x="98" y="${41+i*40}" text-anchor="middle" fill="#22c55e" font-size="16">${A?'▽':'▼'}</text>`).join('')}</g>`;
const stick=x=>`<g transform="translate(${x} 1110)"><rect width="170" height="260" rx="14" fill="#1f2937"/><rect x="55" y="70" width="60" height="40" rx="10" fill="#111"/><rect x="72" y="30" width="26" height="70" rx="12" fill="#111" stroke="#94a3b8" stroke-width="3"/><circle cx="85" cy="40" r="8" fill="#dc2626"/><rect x="20" y="170" width="130" height="60" rx="8" fill="#374151"/><text x="85" y="207" fill="#cbd5e1" font-size="15" text-anchor="middle">consola</text></g>`;
const yoke=x=>`<g transform="translate(${x} 960)" opacity=".96"><path d="M0 0 q0 70 40 70 h80 q40 0 40 -70" fill="none" stroke="#e5e7eb" stroke-width="16" stroke-linecap="round"/><rect x="62" y="64" width="36" height="26" rx="6" fill="#9ca3af"/><rect x="72" y="88" width="16" height="200" fill="#6b7280"/></g>`;
const kccu=(x,y)=>`<g transform="translate(${x} ${y})"><rect width="230" height="190" rx="10" fill="#374151"/>${Array.from({length:24},(_,i)=>`<rect x="${12+(i%8)*26}" y="${14+Math.floor(i/8)*26}" width="22" height="22" rx="3" fill="#111"/>`).join('')}<circle cx="115" cy="140" r="30" fill="#111" stroke="#9ca3af" stroke-width="3"/><circle cx="115" cy="140" r="14" fill="#64748b"/><text x="115" y="184" fill="#cbd5e1" font-size="13" text-anchor="middle">KCCU</text></g>`;
const sd=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#000" stroke="#475569" stroke-width="3"/><text x="${x+w/2}" y="${y+28}" text-anchor="middle" fill="#fff" font-size="18" text-decoration="underline">FUEL</text>${[0,1,2].map(i=>`<rect x="${x+20+i*(w-40)/3}" y="${y+50}" width="${(w-40)/3-10}" height="40" fill="none" stroke="#fff" stroke-width="2"/><text x="${x+20+i*(w-40)/3+((w-40)/3-10)/2}" y="${y+77}" text-anchor="middle" fill="#22c55e" font-size="17">${['2.6','3.3','2.6'][i]}</text>`).join('')}<text x="${x+w/2}" y="${y+h-18}" text-anchor="middle" fill="#94a3b8" font-size="14">SD: página de ejemplo</text>`;
/* ---------- definición de cada cabina ---------- */
const TYPES={a320:{n:'Airbus A320',A:1,lesson:'#/l/a320/m1/l2'},a350:{n:'Airbus A350',A:1,lesson:'#/l/a350/m3/l1'},b737:{n:'Boeing 737',lesson:'#/l/b737/m1/l1'},b787:{n:'Boeing 787',lesson:'#/l/b787/m1/l2'},b777:{n:'Boeing 777',lesson:'#/l/b777/m1/l1'}};
CAB.TYPES=TYPES;
function build(t){const T=TYPES[t],A=!!T.A,F=FG.f;const hs=[];const H=(id,x,y,w,h)=>hs.push({id,x,y,w,h});
 let s=`<svg viewBox="0 0 1400 1420" font-family="Arial" xmlns="http://www.w3.org/2000/svg"><rect width="1400" height="1420" fill="#0f172a"/>`;
 s+=`<path d="M380 0 h640 l-30 380 h-580 z" fill="#334155"/><path d="M60 380 h1280 l-40 80 h-1200 z" fill="#7dd3fc" opacity=".22"/><path d="M700 380 v80 M420 380 l-20 80 M980 380 l20 80" stroke="#1e293b" stroke-width="14"/>
 <rect x="10" y="460" width="1380" height="250" rx="16" fill="#1f2937"/><rect x="10" y="705" width="1380" height="375" rx="10" fill="#334155"/><path d="M480 1075 h440 l40 345 h-520 z" fill="#1f2937"/>`;
 s+=put(raw(F.overhead),410,10,580,362);H('overhead',410,10,580,362);
 s+=efis(40,520,A)+efis(1060,520,A);H('efis',40,520,300,150);H('efis',1060,520,300,150);
 s+=put(raw(A?F.fcu:(t==='b737'?F.mcp737:F.mcp)),380,468,640,236);H(A?'fcu':'mcp',380,480,640,215);
 const pfd=raw(A?F.pfdA:F.pfdB),nd=raw(A?F.ndA:F.ndB);
 s+=put(pfd,20,715,260,195)+put(nd,290,715,260,195)+put(nd,850,715,260,195)+put(pfd,1120,715,260,195);
 H('pfd',20,715,260,195);H('nd',290,715,260,195);H('nd',850,715,260,195);H('pfd',1120,715,260,195);
 s+=put(raw(A?F.ewd:F.eicas),560,712,280,182);H(A?'ewd':'eicas',560,712,280,182);
 if(A){s+=sd(570,905,260,150);H('sd',570,905,260,150);}
 else if(t==='b737'){s+=box(570,905,260,150,'PANTALLA','inferior central','#1e293b');H('lower',570,905,260,150);}
 else{s+=box(570,905,260,150,'MFD','multifunción','#1e3a5f');H('mfd',570,905,260,150);}
 const sb=raw(F.standby);
 if(t==='a350'){s+=box(20,925,130,125,'OIS','','#374151')+box(1250,925,130,125,'OIS','','#374151')+box(290,925,260,125,'MFD','FMS','#1e3a5f')+box(850,925,260,125,'MFD','FMS','#1e3a5f');H('ois',20,925,130,125);H('ois',1250,925,130,125);H('ois',290,925,260,125);H('ois',850,925,260,125);
  s+=put(sb,155,930,130,85);H('standby',155,930,130,85);s+=gear(1115,925,A);H('gear',1115,925,130,150);}
 else{s+=put(sb,330,930,160,104);H('standby',330,930,160,104);s+=gear(900,925,A);H('gear',900,925,130,150);}
 if(t==='b787'){s+=`<path d="M110 450 l25 -80 h170 l-12 80 z M1290 450 l-25 -80 h-170 l12 80 z" fill="#cbd5e1" opacity=".35" stroke="#e2e8f0" stroke-width="3"/>`;H('hud',110,370,195,80);H('hud',1095,370,195,80);}
 // pedestal
 s+=put(raw(A?F.pedA:(t==='b737'?F.ped737:F.pedB)),500,1090,400,300);
 const P=A?{thrust:[150,20,100,190],speedbrake:[20,30,60,120],flaps:[316,30,70,140],engstart:[140,222,120,70],park:[296,214,90,40],radios:[14,214,110,76]}:{thrust:[140,20,120,180],speedbrake:[20,30,70,130],flaps:[300,30,90,170],engstart:[140,210,120,80],park:[20,210,90,40],radios:[300,210,90,80]};
 Object.entries(P).forEach(([k,[x,y,w,h]])=>H(k,500+x,1090+y,w,h));
 const cdu=raw(A?F.mcdu:F.cdu);
 if(t==='a350'){s+=kccu(255,1100)+kccu(915,1100);H('kccu',255,1100,230,190);H('kccu',915,1100,230,190);}
 else{s+=put(cdu,262,1095,230,196)+put(cdu,908,1095,230,196);H(A?'mcdu':'cdu',262,1095,230,196);H(A?'mcdu':'cdu',908,1095,230,196);}
 if(A){s+=stick(20)+stick(1210);H('stick',20,1110,170,260);H('stick',1210,1110,170,260);}
 else{s+=yoke(70)+yoke(1170);H('yoke',60,950,180,300);H('yoke',1160,950,180,300);}
 s+=`<rect id="hlr" x="0" y="0" width="0" height="0" rx="12" fill="none" stroke="#facc15" stroke-width="8" style="display:none"/>`;
 s+=hs.map((h,i)=>`<rect class="hs" data-i="${i}" x="${h.x}" y="${h.y}" width="${h.w}" height="${h.h}" fill="transparent"/>`).join('');
 return {s:s+'</svg>',hs,T,A};}
CAB.build=build;
})();
/* ---------- textos: qué es, para qué sirve, cuándo se usa ---------- */
(function(){
const I=(t,A)=>({
overhead:['Panel superior (overhead)','Los interruptores de los sistemas, en el techo.','Enciende y controla electricidad, combustible, hidráulico, aire acondicionado, antihielo, luces y el APU.','Al preparar el avión desde apagado y al apagarlo. En vuelo casi no se toca.'+(A?' En Airbus, si no hay luces encendidas, todo está normal (“cabina oscura”).':'')],
efis:['Panel EFIS','Botones y ruedas a cada lado del glareshield (uno por piloto).','Eliges qué ves en tus pantallas: modo y escala del mapa (ND), ajuste del altímetro (QNH/STD) y mínimos.','Antes del vuelo, al pasar la altitud de transición (STD/QNH) y en la aproximación.'],
fcu:['FCU: piloto automático (Airbus)','El panel largo encima de las pantallas.','Le dices al piloto automático la velocidad, el rumbo, la altitud y la velocidad vertical. Conectas AP1/AP2 y el autoempuje (A/THR).','Todo el vuelo: tras el despegue conectas el AP y vas poniendo las altitudes que te da el control. Empujar = lo gestiona el avión; tirar = lo eliges tú.'],
mcp:['MCP: piloto automático (Boeing)','El panel largo encima de las pantallas.','Eliges velocidad, rumbo, altitud y velocidad vertical, y los modos: LNAV, VNAV, LOC, APP… Conectas el piloto automático'+(t==='b737'?' (CMD A/B).':' (A/P).'),'Todo el vuelo: después de despegar conectas el piloto automático y vas cambiando la altitud.'],
pfd:['PFD: pantalla principal de vuelo','La pantalla justo delante de cada piloto.','Velocidad (izquierda), actitud (centro), altitud (derecha), velocidad vertical, rumbo (abajo) y los modos del piloto automático (FMA, arriba).','Siempre. Es la pantalla que más miras.'],
nd:['ND: pantalla de navegación','La pantalla al lado del PFD.','Es el mapa: tu avión, la ruta, los puntos, el viento y el radar meteorológico.','Todo el vuelo, para saber dónde estás y qué viene.'],
ewd:['ECAM superior (E/WD)','La pantalla central de arriba.','Motores (N1, EGT…), combustible, flaps y los avisos con lo que hay que hacer.','Al arrancar motores, en el despegue y cuando sale un aviso.'],
sd:['ECAM inferior (SD)','La pantalla central de abajo.','Dibuja los sistemas: combustible, eléctrico, hidráulico, puertas, ruedas…','En la preparación y para revisar un sistema concreto.'],
eicas:['EICAS: motores y alertas','La pantalla central.','Motores, combustible, flaps, tren y mensajes de alerta (rojo, ámbar, blanco).','Arranque, despegue y cuando aparece un mensaje.'],
mfd:['MFD: pantalla multifunción','La pantalla central de abajo.','Puede enseñar sistemas, la checklist electrónica o páginas del FMS.','Durante la preparación y cuando quieres revisar algo.'],
lower:['Pantalla inferior central','Debajo de la de motores.','Muestra datos secundarios de motores o de sistemas.','Cuando quieres revisar algo más.'],
ois:['OIS y MFD (A350)','Las partes de abajo de las pantallas laterales.','OIS: documentación, como una tableta. MFD: el FMS del A350, que se maneja con el KCCU.','Preparación del vuelo y cambios en ruta.'],
standby:['Instrumento de reserva','Pequeña pantalla independiente (ISIS/ISFD).','Muestra velocidad, actitud y altitud aunque fallen las pantallas grandes.','Si fallan las pantallas principales. Antes del vuelo se comprueba su ajuste.'],
gear:['Palanca del tren de aterrizaje','La palanca con forma de rueda en el panel.','Sube y baja las ruedas. Tres luces verdes = las tres patas abajo y blocadas.','Arriba nada más despegar (“positive climb”). Abajo en la aproximación final.'],
mcdu:['MCDU','Teclado con pantalla en el pedestal (uno por piloto).','Programas el FMS: ruta, pesos, velocidades.','Sobre todo antes del vuelo. En vuelo, para cambios: directo a un punto, cambio de llegada…'],
cdu:['CDU','Teclado con pantalla en el pedestal (uno por piloto'+(t==='b777'?'; el 777 lleva un tercero':'')+').','Programas el FMC: ruta, pesos, velocidades. Los cambios se confirman con EXEC.','Sobre todo antes del vuelo. En vuelo, para cambios de ruta.'],
kccu:['KCCU (A350)','Teclado con bola de cursor, uno por piloto.','Con él escribes y eliges en las pantallas MFD (el FMS del A350).','Igual que el MCDU: preparación y cambios en vuelo.'],
thrust:['Palancas de empuje','Las palancas grandes del centro del pedestal.',A?'Controlan la potencia de los motores. Con el A/THR se dejan en la muesca CL y el ordenador ajusta el empuje (no se mueven solas).':'Controlan la potencia. Con el autothrottle se mueven solas. Tienen los botones TO/GA y las palancas de reversa.',A?'Despegue en FLX o TOGA, luego CL. Al aterrizar, a IDLE y reversas.':'Despegue con TO/GA. Al aterrizar, a ralentí y reversas.'],
flaps:['Palanca de flaps','A la derecha del pedestal.','Saca flaps y slats para volar más despacio con seguridad. Posiciones: '+(A?'0, 1, 2, 3, FULL.':t==='b737'?'UP, 1, 2, 5, 10, 15, 25, 30, 40.':'UP, 1, 5, 15, 20, 25, 30.'),'Despegue y aproximación: se van sacando poco a poco al reducir la velocidad.'],
speedbrake:['Speedbrake (aerofrenos)','Palanca a la izquierda del pedestal.','Levanta paneles del ala para frenar en el aire o pegar el avión al suelo al aterrizar.','En el descenso si vas alto o rápido. Se arma antes de aterrizar.'],
engstart:A?['ENG MASTER y ENG MODE','Interruptores debajo de las palancas de empuje.','ENG MASTER abre el combustible de cada motor. ENG MODE elige el arranque (IGN START).','Al arrancar y al apagar los motores.']:['FUEL CONTROL','Interruptores rojos bajo las palancas'+(t==='b737'?' (en el 737 se llaman START LEVERS: IDLE/CUTOFF).':'.'),'RUN da combustible al motor; CUTOFF lo corta.','Al arrancar y al apagar los motores.'],
park:['Freno de aparcamiento','En el pedestal.','Frena el avión parado.','Puesto en la puerta de embarque. Se quita antes de rodar.'],
radios:['Radios','Paneles de radio del pedestal.','Eliges la frecuencia para hablar con el control.','Cada vez que el control te pasa a otra frecuencia.'],
stick:['Sidestick','La mini-palanca a cada lado.','Mueve el avión: adelante/atrás baja o sube el morro; a los lados inclina las alas. Si la sueltas, el avión mantiene la actitud.','Despegue, aterrizaje y siempre que vueles a mano.'],
yoke:['Yoke (cuernos)','El volante delante de cada piloto.','Tirar/empujar sube o baja el morro; girar inclina las alas.','Despegue, aterrizaje y siempre que vueles a mano.'],
hud:['HUD','El cristal plegable delante de los ojos de cada piloto.','Proyecta velocidad, actitud y la senda sin bajar la vista.','Sobre todo en el despegue y el aterrizaje.']});
CAB.info=I;
const ORDER=['overhead','efis','fcu','mcp','hud','pfd','nd','ewd','eicas','sd','mfd','lower','ois','standby','gear','mcdu','cdu','kccu','thrust','flaps','speedbrake','engstart','park','radios','stick','yoke'];
CAB.list=function(app){app.innerHTML=`<h1>🛫 Cabina completa</h1><p class="mu">Toda la cabina en una pantalla. Toca cualquier panel para saber <b>qué es, para qué sirve y cuándo se usa</b>, o sigue la <b>clase guiada</b> zona por zona.</p><div class="grid">${Object.entries(CAB.TYPES).map(([k,v])=>`<a class="card" href="#/cab/${k}"><div class="ic">🛫</div><b>${v.n}</b><small>Cabina completa y clase guiada</small></a>`).join('')}</div><p class="sm mu">📱 Consejo: gira el móvil en horizontal para verla más grande.</p>`;};
CAB.view=function(app,t){const T=CAB.TYPES[t];if(!T)return CAB.list(app);const B=CAB.build(t),info=I(t,B.A);localStorage.setItem('pp_last',location.hash);
 const tour=ORDER.filter(id=>B.hs.some(h=>h.id===id));
 app.innerHTML=`<div class="mu sm"><a href="#/cab">Cabina completa</a></div><h1>🛫 ${T.n}</h1>
 <p class="sm mu">Arrastra para moverte, pellizca o usa ＋/－ para acercar. Toca un panel para ver qué es. <span class="landh">📱↻ Mejor en horizontal.</span></p>
 <div class="cabbar"><button class="btn" id="cTour">▶ Clase guiada</button><button class="btn sec" id="cZo" aria-label="Alejar">－</button><button class="btn sec" id="cZi" aria-label="Acercar">＋</button><button class="btn sec" id="cZr" aria-label="Ver toda la cabina">⟲</button></div>
 <div class="cabv" id="cabv">${B.s}</div><div id="cabc"></div>
 <div class="btns"><a class="btn sec" href="#/p/${t}">🎛️ Panel interactivo (encender el avión)</a><a class="btn sec" href="${T.lesson}">📖 Lección de la cabina</a>${B.A?'<a class="btn sec" href="#/c/mcdu">🖥️ MCDU / FMC</a>':'<a class="btn sec" href="#/l/mcdu/m4/l1">🖥️ CDU de Boeing</a>'}</div>
 <p class="sm mu">Dibujo esquemático propio, no a escala. Distribución simplificada.</p>`;
 const v=app.querySelector('#cabv'),svg=v.querySelector('svg'),hl=svg.querySelector('#hlr'),card=app.querySelector('#cabc');
 const full={x:0,y:0,w:1400,h:1420};let vb={...full},anim=0;
 const setVB=()=>svg.setAttribute('viewBox',`${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
 const fit=r=>{const ar=v.clientWidth/v.clientHeight||1;let w=r.w,h=r.h;if(w/h>ar)h=w/ar;else w=h*ar;return {x:r.x+r.w/2-w/2,y:r.y+r.h/2-h/2,w,h};};
 const go=(to,ms=450)=>{const from={...vb},t0=performance.now(),id=++anim;const st=n=>{if(id!==anim)return;const k=Math.min(1,(n-t0)/ms),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;['x','y','w','h'].forEach(p=>vb[p]=from[p]+(to[p]-from[p])*e);setVB();if(k<1)requestAnimationFrame(st);};requestAnimationFrame(st);};
 const zoom=(f,cx,cy)=>{anim++;const nw=Math.max(150,Math.min(2200,vb.w*f)),nh=vb.h*nw/vb.w;cx=cx??vb.x+vb.w/2;cy=cy??vb.y+vb.h/2;vb={x:cx-(cx-vb.x)*nw/vb.w,y:cy-(cy-vb.y)*nh/vb.h,w:nw,h:nh};setVB();};
 const reset=()=>go(fit(full));vb=fit(full);setVB();
 const mark=h=>{if(!h){hl.style.display='none';return;}hl.style.display='';['x','y','w','h'].forEach((p,i)=>hl.setAttribute(['x','y','width','height'][i],h[p]));};
 const say=t=>Voice.say(t);
 const txt=id=>{const x=info[id];return `${x[0]}. ${x[1]} Para qué sirve: ${x[2]} Cuándo lo usas: ${x[3]}`;};
 const cardHtml=(id,extra)=>{const x=info[id];return `<div class="cabcard"><h3>${x[0]}</h3><p><b>Qué es:</b> ${x[1]}</p><p><b>Para qué sirve:</b> ${x[2]}</p><p><b>Cuándo lo usas:</b> ${x[3]}</p>${extra||''}</div>`;};
 let ti=-1;
 const show=id=>{const h=B.hs.find(x=>x.id===id);mark(h);go(fit({x:h.x-40,y:h.y-40,w:h.w+80,h:h.h+80}));};
 const tourStep=()=>{const id=tour[ti];show(id);card.innerHTML=cardHtml(id,`<div class="mu sm">Clase guiada · zona ${ti+1} de ${tour.length}</div><div class="bar"><i style="width:${100*(ti+1)/tour.length}%"></i></div><div class="btns"><button class="btn sec" data-c="prev" ${ti?'':'disabled'}>‹ Atrás</button><button class="btn" data-c="next">${ti<tour.length-1?'Siguiente ›':'Terminar ✓'}</button><button class="btn sec" data-c="say">🔊</button><button class="btn sec" data-c="stop">✕ Salir</button></div>`);say(txt(id));card.scrollIntoView({behavior:'smooth',block:'nearest'});};
 const pop=id=>{ti=-1;show(id);card.innerHTML=cardHtml(id,`<div class="btns"><button class="btn sec" data-c="say">🔊 Escuchar</button><button class="btn sec" data-c="all">⟲ Ver toda la cabina</button><button class="btn" data-c="tour">▶ Clase guiada</button></div>`);card.dataset.id=id;say(txt(id));card.scrollIntoView({behavior:'smooth',block:'nearest'});};
 card.addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(!b)return;const c=b.dataset.c;
  if(c==='next'){if(ti<tour.length-1){ti++;tourStep();}else{ti=-1;mark(null);reset();card.innerHTML=`<div class="cabcard okb"><h3>🎉 ¡Clase terminada!</h3><p>Has recorrido toda la cabina del ${T.n}. Ahora practica encendiendo el avión paso a paso.</p><div class="btns"><a class="btn" href="#/p/${t}">🎛️ Ir al panel interactivo</a><button class="btn sec" data-c="tour">↺ Repetir clase</button></div></div>`;Snd.chime();say('¡Clase terminada! Ahora practica en el panel interactivo.');}}
  else if(c==='prev'&&ti>0){ti--;tourStep();}else if(c==='say'){say(ti>=0?txt(tour[ti]):txt(card.dataset.id));}
  else if(c==='stop'){ti=-1;mark(null);card.innerHTML='';Voice.stop();reset();}else if(c==='all'){mark(null);card.innerHTML='';reset();}else if(c==='tour'){ti=0;tourStep();}});
 app.querySelector('#cTour').onclick=()=>{ti=0;tourStep();};app.querySelector('#cZi').onclick=()=>zoom(.7);app.querySelector('#cZo').onclick=()=>zoom(1/.7);app.querySelector('#cZr').onclick=()=>{mark(null);reset();};
 // arrastrar, pellizcar, rueda y tocar
 const pts=new Map();let down=null,moved=0,pinch=null;
 const toSvg=(cx,cy)=>{const r=v.getBoundingClientRect();return {x:vb.x+(cx-r.left)/r.width*vb.w,y:vb.y+(cy-r.top)/r.height*vb.h};};
 v.addEventListener('pointerdown',e=>{v.setPointerCapture(e.pointerId);pts.set(e.pointerId,{x:e.clientX,y:e.clientY});anim++;
  if(pts.size===1){down={x:e.clientX,y:e.clientY,hs:e.target.closest&&e.target.closest('.hs')};moved=0;}
  if(pts.size===2){const [a,b]=[...pts.values()];pinch={d:Math.hypot(a.x-b.x,a.y-b.y)};down=null;}});
 v.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;const p=pts.get(e.pointerId),r=v.getBoundingClientRect();
  if(pts.size===1){const dx=e.clientX-p.x,dy=e.clientY-p.y;moved+=Math.abs(dx)+Math.abs(dy);vb.x-=dx*vb.w/r.width;vb.y-=dy*vb.h/r.height;setVB();}
  pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pts.size===2&&pinch){const [a,b]=[...pts.values()],d=Math.hypot(a.x-b.x,a.y-b.y);const c=toSvg((a.x+b.x)/2,(a.y+b.y)/2);zoom(pinch.d/d,c.x,c.y);pinch.d=d;}});
 const up=e=>{if(!pts.has(e.pointerId))return;pts.delete(e.pointerId);if(pts.size<2)pinch=null;
  if(down&&pts.size===0&&moved<10&&down.hs){const h=B.hs[+down.hs.dataset.i];pop(h.id);}if(pts.size===0)down=null;};
 v.addEventListener('pointerup',up);v.addEventListener('pointercancel',up);
 v.addEventListener('wheel',e=>{e.preventDefault();const c=toSvg(e.clientX,e.clientY);zoom(e.deltaY>0?1.15:1/1.15,c.x,c.y);},{passive:false});
 CAB._tap=id=>pop(id);CAB._tour=()=>{ti=0;tourStep();};
 if(SET.get().teacher)say(`Cabina del ${T.n}. Toca cualquier panel para saber qué es, o pulsa Clase guiada.`);};
})();
