/* Herramientas v5: NOTAM, cartas, OFP, combustible, ETA y T/D */
const NQ1={MR:'Pista',MX:'Calle de rodaje',MA:'Área de movimiento',MN:'Plataforma',IC:'ILS',IL:'Localizador ILS',IG:'Senda de planeo ILS',ID:'DME asociado al ILS',NV:'VOR',ND:'DME',NB:'NDB',NM:'VOR/DME',LR:'Luces de pista (todas)',LA:'Luces de aproximación',LX:'Luces de eje de calle de rodaje',OB:'Obstáculo',OL:'Luces de obstáculo',RD:'Zona peligrosa',RR:'Zona restringida',RP:'Zona prohibida',RT:'Restricción temporal',PI:'Procedimiento de aproximación instrumental',PD:'Salida normalizada (SID)',PA:'Llegada normalizada (STAR)',FA:'Aeródromo',ST:'Torre de control',SA:'ATIS',FU:'Combustible disponible',WP:'Lanzamiento de paracaidistas',WU:'Vuelo de aeronaves no tripuladas (drones)',AC:'Zona de control (CTR)'};
const NQ2={LC:'cerrado/a',AS:'fuera de servicio',CA:'activada',CD:'desactivada',CH:'cambiado',AH:'horario de servicio cambiado',LT:'limitado a…',XX:'ver texto (lenguaje claro)',AU:'no disponible',CS:'instalado',LW:'tendrá lugar',LP:'prohibido para…',HW:'obras en curso',AP:'disponible con permiso previo (PPR)'};
const NAB={CLSD:'cerrado',RWY:'pista',TWY:'calle de rodaje',WIP:'obras en curso','U/S':'fuera de servicio',AD:'aeródromo',OBST:'obstáculo',AVBL:'disponible',LGT:'luces',ACT:'activo/a',FLW:'como sigue',DUE:'debido a',BTN:'entre',HR:'horas',MAINT:'mantenimiento',CRANE:'grúa',ELEV:'elevación',AMSL:'sobre el nivel del mar',AGL:'sobre el terreno',PSN:'posición',RADIUS:'radio',SFC:'superficie',UNL:'ilimitado',EXC:'excepto',PPR:'permiso previo',APCH:'aproximación',DEP:'salida',ARR:'llegada',GP:'senda de planeo',LLZ:'localizador',ILS:'ILS',DME:'DME',VOR:'VOR',ACFT:'aeronave',MON:'lunes',TUE:'martes',WED:'miércoles',THU:'jueves',FRI:'viernes',SAT:'sábado',SUN:'domingo',DAILY:'diario',RTE:'ruta',FL:'nivel de vuelo',MIL:'militar',PJE:'lanzamiento de paracaidistas',UAS:'aeronave no tripulada',THR:'umbral',FM:'desde',TIL:'hasta',RESTRICTED:'restringida',AREA:'zona',EXERCISE:'ejercicio',ERECTED:'levantada',TAKE:'tener',PLACE:'lugar',WILL:'(futuro)',CENTRED:'centrado',ON:'en'};
const NOTAM_EX=[
{n:'Pista cerrada por obras (LEVC)',s:`A1234/26 NOTAMN
Q) LECB/QMRLC/IV/NBO/A/000/999/3929N00028W005
A) LEVC B) 2611200600 C) 2611201400
E) RWY 12/30 CLSD DUE WIP`},
{n:'ILS fuera de servicio (LEBL)',s:`A2210/26 NOTAMN
Q) LECB/QICAS/I/NBO/A/000/999/4117N00205E005
A) LEBL B) 2611180000 C) 2611222359 EST
E) ILS RWY 24R U/S DUE MAINT`},
{n:'Grúa cerca del aeropuerto (LECH)',s:`B0456/26 NOTAMN
Q) LECB/QOBCE/IV/M/A/000/005/4013N00002E002
A) LECH B) 2611150700 C) 2612151800
E) CRANE ERECTED PSN 401310N 0000215E ELEV 410FT AMSL, LGT`},
{n:'Zona restringida activada (ruta)',s:`D0789/26 NOTAMN
Q) LECM/QRRCA/IV/BO/W/000/180/3945N00110W010
A) LECM B) 2611190800 C) 2611191400
D) DAILY 0800-1400
E) RESTRICTED AREA ACT DUE MIL EXERCISE
F) SFC G) FL180`},
{n:'Calle de rodaje cerrada (LEMD)',s:`A3321/26 NOTAMR A3300/26
Q) LECM/QMXLC/IV/M/A/000/999/4029N00334W005
A) LEMD B) 2611170000 C) 2612010000
E) TWY Z1 CLSD DUE WIP`},
{n:'Paracaidistas (aviso de navegación)',s:`B0912/26 NOTAMN
Q) LECB/QWPLW/V/M/W/000/120/3955N00005W003
A) LECB B) 2611210900 C) 2611211700
E) PJE WILL TAKE PLACE RADIUS 3NM CENTRED ON 395500N 0000500W
F) SFC G) FL120`}];
const ndate=d=>{const m=(d||'').match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);return m?`${m[3]}/${m[2]}/20${m[1]} a las ${m[4]}:${m[5]} UTC`:(d==='PERM'?'permanente':d);};
function decodeNotam(t){t=t.trim();const out=[];const h=t.match(/^([A-Z]\d{4}\/\d{2})\s+NOTAM([NRC])\s*([A-Z]\d{4}\/\d{2})?/);
 if(h)out.push(['Cabecera',`<b>${h[1]}</b>: serie ${h[1][0]}, número ${h[1].slice(1,5)} del año 20${h[1].slice(-2)}. NOTAM${h[2]} = ${{N:'nuevo',R:'reemplaza a '+(h[3]||'otro'),C:'cancela a '+(h[3]||'otro')}[h[2]]}.`]);
 const f=k=>{const m=t.match(new RegExp('(?:^|\\s)'+k+'\\)\\s*([\\s\\S]*?)(?=\\s[A-G]\\)|$)'));return m?m[1].trim():null;};
 const q=f('Q');if(q){const p=q.split('/');const c=p[1]||'';const a=NQ1[c.slice(1,3)],b=NQ2[c.slice(3,5)];
  out.push(['Q) FIR',`<b>${p[0]}</b>: región de información de vuelo (${{LECB:'Barcelona',LECM:'Madrid',GCCC:'Canarias'}[p[0]]||'FIR'}).`]);
  out.push(['Q) Código',`<b>${c}</b>: ${a||'¿?'} — ${b||'¿?'}.`]);
  if(p[2])out.push(['Q) Tráfico',`<b>${p[2]}</b>: ${{I:'afecta a vuelos IFR',V:'afecta a vuelos VFR',IV:'afecta a IFR y VFR',K:'lista de comprobación'}[p[2]]||p[2]}.`]);
  if(p[3])out.push(['Q) Propósito',`<b>${p[3]}</b>: `+[...p[3]].map(x=>({N:'atención inmediata',B:'incluido en el boletín (PIB)',O:'operacionalmente significativo',M:'varios'}[x])).join(', ')+'.']);
  if(p[4])out.push(['Q) Ámbito',`<b>${p[4]}</b>: `+[...p[4]].map(x=>({A:'aeródromo',E:'en ruta',W:'aviso de navegación'}[x])).join(' + ')+'.']);
  if(p[5])out.push(['Q) Niveles',`De <b>FL${p[5]}</b> a <b>FL${p[6]}</b>${p[6]==='999'?' (sin límite superior)':''}.`]);
  if(p[7])out.push(['Q) Posición',`<b>${p[7]}</b>: coordenadas ${p[7].slice(0,2)}°${p[7].slice(2,4)}'${p[7][4]} ${p[7].slice(5,8)}°${p[7].slice(8,10)}'${p[7][10]} y radio de ${+p[7].slice(11)} NM.`]);}
 const A=f('A');if(A)out.push(['A) Lugar',`<b>${A}</b>${typeof AIRP!=='undefined'&&AIRP[A]?' — '+AIRP[A]:''}.`]);
 const B=f('B');if(B)out.push(['B) Desde',ndate(B)]);
 const Cc=f('C');if(Cc)out.push(['C) Hasta',ndate(Cc)+(/EST/.test(Cc)?' (<b>EST</b> = hora estimada, puede alargarse)':'')]);
 const D=f('D');if(D)out.push(['D) Horario',`<b>${D}</b>: solo activo en ese horario.`.replace('DAILY','DAILY (diario)')]);
 const Et=f('E');if(Et){const tr=Et.split(/\s+/).map(w=>{const k=w.replace(/[,.]$/,'');return NAB[k]?`<b>${w}</b> <span class="mu">(${NAB[k]})</span>`:w;}).join(' ');out.push(['E) Texto',tr]);}
 const F=f('F'),G=f('G');if(F||G)out.push(['F) / G) Límites',`Desde <b>${F||'?'}</b> hasta <b>${G||'?'}</b>${F==='SFC'?' (SFC = superficie)':''}.`]);
 return out;}
const pick=(a,n)=>[...a].sort(()=>Math.random()-.5).slice(0,n);
const r5=x=>Math.round(x/5)*5,r10=x=>Math.round(x/10)*10,hm=m=>{m=((m%1440)+1440)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(Math.round(m%60)).padStart(2,'0');};
Object.assign(Tools,{
 notam(root){root.innerHTML=`<h1>📢 Decodificador de NOTAM</h1><p class="mu">Pega un NOTAM en formato OACI o elige un ejemplo. Te explico cada campo y traduzco las abreviaturas.</p>
  <label>Ejemplos (inventados para estudio)</label><select id="nSel">${NOTAM_EX.map((x,i)=>`<option value="${i}">${x.n}</option>`).join('')}</select>
  <label>Texto del NOTAM</label><textarea id="nIn" class="mono" rows="6"></textarea>
  <div class="btns"><button class="btn" id="nGo">Decodificar</button><a class="btn sec" href="#/t/notamq">✍️ Ejercicios</a><a class="btn sec" href="#/l/escuela/m4/l2">📖 Lección</a></div><div id="nOut" class="dec"></div>`;
  const s=root.querySelector('#nSel'),i=root.querySelector('#nIn');const go=()=>{root.querySelector('#nOut').innerHTML=decodeNotam(i.value).map(([k,v])=>`<div class="on"><code>${k}</code>${v}</div>`).join('')||'<p class="mu">No he reconocido el formato.</p>';};
  s.onchange=()=>{i.value=NOTAM_EX[s.value].s;go();};root.querySelector('#nGo').onclick=go;i.value=NOTAM_EX[0].s;go();},
 notamQs(){const Q=[];const codes=Object.keys(NQ1);
  for(let k=0;k<6;k++){const a=pick(codes,3),b=pick(Object.keys(NQ2).filter(x=>x!=='XX'),3);Q.push({q:`¿Qué significa el código <code>Q${a[0]}${b[0]}</code>?`,o:[`${NQ1[a[0]]} — ${NQ2[b[0]]}`,`${NQ1[a[1]]} — ${NQ2[b[0]]}`,`${NQ1[a[0]]} — ${NQ2[b[1]]}`],a:0,e:`Letras 2–3 <b>${a[0]}</b> = ${NQ1[a[0]]}; letras 4–5 <b>${b[0]}</b> = ${NQ2[b[0]]}.`});}
  const ex=NOTAM_EX;Q.push(
  {q:`<pre class="mono">${ex[1].s}</pre>¿Hasta cuándo es válido?`,o:['22/11/2026 a las 23:59 UTC, hora estimada','18/11/2026 a las 00:00 UTC, fijo','22/11/2026 a las 23:59 hora local'],a:0,e:'C) 2611222359 EST: 22/11/2026 23:59 UTC, y EST indica que es estimada.'},
  {q:`<pre class="mono">${ex[3].s}</pre>¿Entre qué niveles está activa la zona?`,o:['Desde la superficie hasta FL180','Desde FL180 hacia arriba','Desde FL000 hasta FL999'],a:0,e:'F) SFC y G) FL180: de la superficie a FL180.'},
  {q:`<pre class="mono">${ex[3].s}</pre>¿En qué horario está activa?`,o:['Diario de 08:00 a 14:00 UTC','Todo el día 19 sin interrupción','De 08:00 a 14:00 hora local solo el lunes'],a:0,e:'D) DAILY 0800-1400: cada día en ese horario UTC (dentro de B y C).'},
  {q:`<pre class="mono">${ex[4].s}</pre>¿Qué significa NOTAMR A3300/26?`,o:['Que reemplaza al NOTAM A3300/26','Que cancela todos los NOTAM de LEMD','Que es un recordatorio de A3300/26 sin cambios'],a:0,e:'NOTAMR = reemplaza al NOTAM indicado.'},
  {q:`<pre class="mono">${ex[2].s}</pre>¿Qué informa?`,o:['Una grúa de 410 ft sobre el nivel del mar, con luces','Una pista cerrada por obras de 410 m','Un obstáculo sin luces a 410 ft sobre el terreno'],a:0,e:'CRANE ERECTED … ELEV 410FT AMSL, LGT: grúa con elevación 410 ft sobre el nivel del mar, iluminada.'},
  {q:`<pre class="mono">${ex[0].s}</pre>¿Qué ocurre y cuándo?`,o:['Pista 12/30 cerrada por obras el 20/11/2026 de 06:00 a 14:00 UTC','Pista 12/30 cerrada todo noviembre','Calle de rodaje 12 cerrada el 26/11 de 06:00 a 14:00'],a:0,e:'QMRLC = pista cerrada. B/C: 2611200600 a 2611201400 → 20/11/2026 06:00–14:00 UTC.'});
  return Q.sort(()=>Math.random()-.5);},
 cartasQs(){return [
  {q:`${SV2.iac}¿Cuál es el rumbo de acercamiento final?`,o:['300°','120°','110,30°'],a:0,e:'CRS 300° en la cabecera. 110.30 es la frecuencia del localizador.'},
  {q:'En la carta, ¿cuál es la frecuencia del localizador?',o:['110.30','118.10','300'],a:0,e:'LOC IXX 110.30. 118.10 es la torre.'},
  {q:'En la carta, ¿a qué altitud se cruza el FAF XAMEX?',o:['2.000 ft','4.000 ft','282 ft'],a:0,e:'Perfil: XAMEX D6.0 · 2000 ft.'},
  {q:'En la caja de mínimos, la DA para el ILS es…',o:['282 ft (200 ft sobre el umbral)','200 ft sobre el mar','520 ft'],a:0,e:'DA(H) 282 (200). 520 es la MDA si solo funciona el localizador.'},
  {q:'Si el ILS tiene la senda de planeo averiada y vuelas solo LOC (cat. C), tu mínima es…',o:['MDA 520 ft y 1.500 m','DA 282 ft y 550 m','MDA 438 ft y 550 m'],a:0,e:'Fila LOC: MDA(H) 520 (438), visibilidad 1.500 m para cat. C/D.'},
  {q:'Llegas del sector oeste de la MSA. ¿Altitud mínima de sector?',o:['4.600 ft','2.900 ft','3.500 ft'],a:0,e:'El semicírculo oeste muestra 4.600 ft.'},
  {q:'¿En qué punto está la espera y a qué altitud mínima?',o:['LUPAX, 4.000 ft','XAMEX, 2.000 ft','LUPAX, 2.000 ft'],a:0,e:'Espera en LUPAX, MHA 4.000 ft.'},
  {q:'La elevación del aeródromo es 82 ft y la DA 282 ft. ¿Cuál es la DH?',o:['200 ft','282 ft','364 ft'],a:0,e:'DH = DA − elevación del umbral = 282 − 82 = 200 ft.'},
  {q:`${SV2.hold}Llegas al fijo volando casi en el mismo rumbo que el acercamiento (sector de 180°). ¿Qué entrada usas?`,o:['Directa','Paralela','En gota'],a:0,e:'Si llegas dentro del sector de 180° alineado con la espera, entrada directa.'},
  {q:'A 12.000 ft, la velocidad máxima OACI en espera (cat. C/D) es…',o:['230 kt','265 kt','170 kt'],a:0,e:'Hasta 14.000 ft: 230 kt (170 kt cat. A/B).'},
  {q:`${SV2.lemd}LEMD, viento del norte (config. norte). ¿Por dónde esperas aterrizar?`,o:['32L/32R','36L/36R','18L/18R'],a:0,e:'Norte: llegadas 32L/32R, salidas 36L/36R.'},
  {q:'LEMD en configuración sur. ¿Por qué pistas se despega?',o:['14L/14R','18L/18R','36L/36R'],a:0,e:'Sur: salidas 14L/14R, llegadas 18L/18R.'}];},
 navQs(){const Q=[];
  for(let k=0;k<3;k++){const tas=r10(420+Math.random()*60),w=r5(10+Math.random()*40),head=Math.random()<.5,gs=head?tas-w:tas+w,d=r10(gs*(0.3+Math.random()*0.5)),t=Math.round(d/gs*60),dep=600+Math.floor(Math.random()*180);
   Q.push({q:`TAS ${tas} kt, viento ${head?'en cara':'de cola'} ${w} kt. Distancia ${d} NM. Despegas a las ${hm(dep)} UTC. ¿ETA?`,o:[hm(dep+t)+' UTC',hm(dep+Math.round(d/tas*60)+(head?-4:4))+' UTC',hm(dep+t+12)+' UTC'],a:0,e:`GS = ${tas} ${head?'−':'+'} ${w} = ${gs} kt. Tiempo = ${d} ÷ ${gs} × 60 ≈ ${t} min. ETA = ${hm(dep)} + ${t} min = ${hm(dep+t)} UTC.`});}
  for(let k=0;k<3;k++){const fl=[240,280,330,360,370][k+Math.floor(Math.random()*2)],el=[0,1000,2000][k],tgt=el+[3000,2000,3000][k],d=Math.round((fl*100-tgt)/1000*3);
   Q.push({q:`Crucero FL${fl}. Quieres estar a ${tgt.toLocaleString('es-ES')} ft en el punto de inicio de la aproximación. Regla del 3: ¿a cuántas NM antes empiezas a bajar?`,o:[`≈ ${d} NM`,`≈ ${Math.round(d/3)} NM`,`≈ ${d*2} NM`],a:0,e:`(${(fl*100).toLocaleString('es-ES')} − ${tgt.toLocaleString('es-ES')}) ÷ 1.000 × 3 ≈ ${d} NM (más ~10 NM para reducir velocidad).`});}
  for(let k=0;k<2;k++){const gs=[420,450,140][k+Math.floor(Math.random()*2)];Q.push({q:`GS ${gs} kt. Para una senda de unos 3°, ¿qué velocidad vertical aproximada?`,o:[`≈ ${gs*5} ft/min`,`≈ ${gs*2} ft/min`,`≈ ${gs*10} ft/min`],a:0,e:`VS ≈ GS × 5 = ${gs*5} ft/min.`});}
  for(let k=0;k<3;k++){const ff=[2400,2600,5800][k],min=[45,70,120][k]+r5(Math.random()*20),trip=Math.round(ff*min/60/10)*10;
   Q.push({q:`Consumo de ejemplo ${ff.toLocaleString('es-ES')} kg/h, tiempo de vuelo ${min} min. ¿Trip?`,o:[`${trip.toLocaleString('es-ES')} kg`,`${Math.round(trip*0.6/10*10).toLocaleString('es-ES')} kg`,`${Math.round(ff*min/100).toLocaleString('es-ES')} kg`],a:0,e:`${ff} × ${min}/60 ≈ ${trip} kg.`});}
  return Q.filter(q=>new Set(q.o).size===3).sort(()=>Math.random()-.5);},
 fuel(root){root.innerHTML=`<h1>⛽ Calculadora de combustible</h1>${WARN('Cifras de ejemplo','Método didáctico (estilo EASA: contingencia 5 %, reserva final 30 min). Consumos inventados con números redondos: usa los de tu avión/simulador o SimBrief.')}
  <div class="lesson"><div class="sm3"><div><label>Trip (kg)</label><input type="number" id="fT" value="1800"></div><div><label>Contingencia %</label><input type="number" id="fC" value="5"></div><div><label>Mín. contingencia (kg)</label><input type="number" id="fCm" value="200"></div></div>
  <div class="sm3"><div><label>Alternativo (kg)</label><input type="number" id="fA" value="1100"></div><div><label>Consumo en espera (kg/h)</label><input type="number" id="fH" value="2200"></div><div><label>Taxi (kg)</label><input type="number" id="fX" value="200"></div></div>
  <label>Extra (kg)</label><input type="number" id="fE" value="0"></div><div id="fOut" class="lesson" style="margin-top:10px"></div>`;
  const v=id=>+root.querySelector(id).value||0;const go=()=>{const T=v('#fT'),C=Math.max(T*v('#fC')/100,v('#fCm')),A=v('#fA'),R=v('#fH')/2,X=v('#fX'),E=v('#fE'),mf=T+C+A+R,blk=mf+E+X;
   root.querySelector('#fOut').innerHTML=`<table>${[['Taxi',X],['Trip',T],['Contingencia',C],['Alternativo',A],['Reserva final (30 min)',R],['Mínimo para despegar',mf],['Extra',E],['<b>BLOCK</b>',blk]].map(r=>`<tr><td>${r[0]}</td><td style="text-align:right"><b>${Math.round(r[1]).toLocaleString('es-ES')} kg</b></td></tr>`).join('')}</table><p class="sm">Reserva final = consumo en espera ÷ 2. Contingencia = el mayor entre ${v('#fC')} % del trip y el mínimo.</p>`;};
  root.querySelectorAll('input').forEach(i=>i.oninput=go);go();},
 ofp(root){const LEGS=[['LEVC','',0],['NARAN','SID',18],['AZAHR','SID',32],['ROSAL','UN725',55],['MARTA','UN725',40],['LEBL','STAR/APP',35]];
  root.innerHTML=`<h1>🧾 Generador de OFP</h1>${WARN('Ruta y cifras de ejemplo','LEVC → LEBL con puntos de ruta <b>ficticios</b> (NARAN, AZAHR, ROSAL, MARTA) y distancias redondeadas. Sirve para entender cómo se calcula un OFP, no para planificar un vuelo real.')}
  <div class="lesson"><div class="sm3"><div><label>Hora de despegue (UTC)</label><input id="oD" value="10:05"></div><div><label>Nivel de crucero (FL)</label><input type="number" id="oF" value="240"></div><div><label>TAS (kt)</label><input type="number" id="oT" value="430"></div></div>
  <div class="sm3"><div><label>Viento (+cola / −cara, kt)</label><input type="number" id="oW" value="-20"></div><div><label>Consumo medio (kg/h)</label><input type="number" id="oB" value="2500"></div><div><label>ZFW (kg)</label><input type="number" id="oZ" value="58000"></div></div>
  <div class="sm3"><div><label>Alternativo (kg)</label><input type="number" id="oA" value="1100"></div><div><label>Elev. destino (ft)</label><input type="number" id="oE" value="14"></div><div><label>Taxi (kg)</label><input type="number" id="oX" value="200"></div></div></div>
  <pre id="oOut" class="mono" style="white-space:pre;overflow:auto;background:#000;color:#4ade80;padding:10px;border-radius:12px;font-size:11.5px"></pre><div id="oNote" class="lesson"></div>`;
  const v=id=>root.querySelector(id).value;const go=()=>{const tas=+v('#oT'),w=+v('#oW'),gs=tas+w,ff=+v('#oB'),fl=+v('#oF');const [hh,mm]=(v('#oD')||'10:00').split(':').map(Number);let t=hh*60+mm,cum=0,fuel=0;
   const tot=LEGS.reduce((a,l)=>a+l[2],0),trip=Math.round(ff*tot/gs/10)*10,cont=Math.max(Math.round(trip*0.05),200),fres=Math.round(2200/2),blk=trip+cont+(+v('#oA'))+fres+(+v('#oX'));
   let s=`OFP DIDÁCTICO  LEVC-LEBL  FL${fl}  TAS ${tas}  GS ${gs}\nZFW ${(+v('#oZ')).toLocaleString('es-ES')}  TOW ${(+v('#oZ')+blk-(+v('#oX'))).toLocaleString('es-ES')}  (kg)\n\nPUNTO   VIA       DIST  ACUM  ETO    FUEL REST\n`;let rest=blk-(+v('#oX'));
   LEGS.forEach(l=>{cum+=l[2];const dt=l[2]/gs*60;t+=dt;rest-=ff*dt/60;s+=`${l[0].padEnd(8)}${l[1].padEnd(10)}${String(l[2]).padStart(4)}  ${String(cum).padStart(4)}  ${hm(t)}  ${String(Math.round(rest/10)*10).padStart(6)}\n`;});
   const td=Math.round((fl*100-(+v('#oE'))-3000)/1000*3)+10;
   s+=`\nTAXI ${v('#oX')}  TRIP ${trip}  CONT ${cont}  ALTN ${v('#oA')}  FRES ${fres}\nBLOCK ${blk} kg   TIEMPO ${Math.round(tot/gs*60)} min   ETA ${hm(hh*60+mm+tot/gs*60)} UTC\nT/D aprox. ${td} NM antes de LEBL`;
   root.querySelector('#oOut').textContent=s;root.querySelector('#oNote').innerHTML=`<p class="sm">GS = TAS ${w>=0?'+':'−'} ${Math.abs(w)} = <b>${gs} kt</b>. Tiempo total = ${tot} NM ÷ ${gs} × 60 ≈ <b>${Math.round(tot/gs*60)} min</b>. Trip = ${ff} kg/h × tiempo ≈ <b>${trip} kg</b>. Contingencia 5 % (mín. 200 kg). Reserva final: 30 min con 2.200 kg/h de espera (ejemplo). T/D: regla del 3 hasta 3.000 ft sobre el destino + 10 NM para decelerar.</p><p class="sm">Simplificación: se usa la misma GS y consumo en todo el vuelo; un OFP real calcula subida, crucero y descenso por separado.</p>${TOOL('#/t/navq','✍️ Ejercicios de ETA, combustible y T/D')}`;};
  root.querySelectorAll('input').forEach(i=>i.oninput=go);go();}
});
const QZ={metarq:['metarQs','Ejercicios METAR','#/t/metar'],notamq:['notamQs','Ejercicios de NOTAM','#/t/notam'],cartasq:['cartasQs','Ejercicios de cartas','#/l/escuela/m5/l4'],navq:['navQs','Ejercicios de ETA, combustible y T/D','#/t/ofp']};
