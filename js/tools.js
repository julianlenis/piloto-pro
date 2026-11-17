/* Herramientas: decodificador METAR/TAF, juego del alfabeto, peso y centrado, viento */
const WX={MI:'baja (shallow)',BC:'en bancos',PR:'parcial',DR:'ventisca baja',BL:'ventisca alta',SH:'chubascos de',TS:'tormenta',FZ:'engelante',DZ:'llovizna',RA:'lluvia',SN:'nieve',SG:'cinarra',PL:'hielo granulado',GR:'granizo',GS:'granizo pequeño',UP:'precipitación desconocida',BR:'neblina',FG:'niebla',FU:'humo',VA:'ceniza volcánica',DU:'polvo',SA:'arena',HZ:'calima',PO:'remolinos de polvo',SQ:'turbonada',FC:'tromba/tornado',SS:'tempestad de arena',DS:'tempestad de polvo'};
const CL={FEW:'Pocas nubes (1–2/8)',SCT:'Nubes dispersas (3–4/8)',BKN:'Nubosidad abundante (5–7/8)',OVC:'Cubierto (8/8)'};
const tmp=s=>s.startsWith('M')?'−'+(+s.slice(1)):''+(+s);
function wxText(t){let m=t.match(/^(-|\+|VC)?((?:MI|BC|PR|DR|BL|SH|TS|FZ)?)((?:DZ|RA|SN|SG|PL|GR|GS|UP|BR|FG|FU|VA|DU|SA|HZ|PO|SQ|FC|SS|DS)*)$/);if(!m||(!m[2]&&!m[3]))return null;
 const parts=[];if(m[1]==='-')parts.push('Débil:');if(m[1]==='+')parts.push('Fuerte:');
 if(m[2])parts.push(WX[m[2]]);for(let i=0;i<m[3].length;i+=2)parts.push(WX[m[3].substr(i,2)]);
 let s=parts.join(' ');if(m[1]==='VC')s+=' en las proximidades (8–16 km)';return s.charAt(0).toUpperCase()+s.slice(1)+'.';}
function decodeWx(raw){
 const toks=raw.trim().toUpperCase().replace(/=$/,'').split(/\s+/).filter(Boolean);const out=[];let st=0,isTaf=false,prev='',rmk=false;
 const dd=(x)=>`día ${+x.slice(0,2)} a las ${x.slice(2,4)}:${x.length>=6?x.slice(4,6):'00'} UTC`;
 toks.forEach((t,i)=>{let e=null;
  if(rmk){e='Observaciones (RMK): información adicional nacional.';}
  else if(t==='METAR'||t==='SPECI'){e=t==='METAR'?'Tipo de informe: METAR, observación ordinaria del tiempo actual.':'SPECI: informe especial por un cambio significativo.';}
  else if(t==='TAF'){isTaf=true;e='TAF: pronóstico de aeródromo.';}
  else if(t==='AMD')e='AMD: TAF enmendado (corregido con nueva información).';
  else if(t==='COR')e='COR: informe corregido.';
  else if(t==='AUTO')e='AUTO: observación totalmente automática, sin observador humano.';
  else if(t==='NIL')e='NIL: no hay informe.';
  else if(/^[A-Z]{4}$/.test(t)&&st===0&&!['NSC','NCD','SKC','CLR'].includes(t)&&!/^(BECMG|TEMPO|NOSIG|CAVOK)$/.test(t)){st=1;e=`Aeródromo con código OACI <b>${t}</b>${AIRP[t]?' ('+AIRP[t]+')':''}.`;}
  else if(/^\d{6}Z$/.test(t))e=`Fecha y hora: ${dd(t)}.`;
  else if(/^\d{4}\/\d{4}$/.test(t)){const a=t.slice(0,4),b=t.slice(5);e=(/^(BECMG|TEMPO|PROB\d\d)$/.test(prev)?'Periodo del cambio: ':'Periodo de validez: ')+`desde el día ${+a.slice(0,2)} a las ${a.slice(2)} UTC hasta el día ${+b.slice(0,2)} a las ${b.slice(2)} UTC.`;}
  else if(/^(\d{3}|VRB)(\d{2,3})(G\d{2,3})?(KT|MPS)$/.test(t)){const m=t.match(/^(\d{3}|VRB)(\d{2,3})(G(\d{2,3}))?(KT|MPS)$/);const u=m[5]==='KT'?'nudos':'m/s';
    if(t.startsWith('00000'))e='Viento en calma.';else e=`Viento ${m[1]==='VRB'?'de dirección variable':'<b>de</b> '+m[1]+'°'} a ${+m[2]} ${u}${m[4]?`, con rachas de ${+m[4]} ${u}`:''}.`;}
  else if(/^\d{3}V\d{3}$/.test(t))e=`Dirección del viento variable entre ${t.slice(0,3)}° y ${t.slice(4)}°.`;
  else if(t==='CAVOK')e='CAVOK: visibilidad ≥10 km, sin nubes por debajo de 5.000 ft (o de la altitud mínima de sector si es mayor), sin CB ni TCU y sin fenómenos significativos.';
  else if(/^\d{4}(NDV)?$/.test(t))e=t.startsWith('9999')?'Visibilidad de 10 km o más.':`Visibilidad ${+t.slice(0,4)} m.`;
  else if(/^\d{4}(N|NE|E|SE|S|SW|W|NW)$/.test(t))e=`Visibilidad mínima ${+t.slice(0,4)} m hacia el ${t.slice(4)}.`;
  else if(/^\d{1,2}SM$/.test(t))e=`Visibilidad ${parseInt(t)} millas terrestres (formato EE. UU.).`;
  else if(/^R\d{2}[LCR]?\/[PM]?\d{4}(V[PM]?\d{4})?(FT)?[UDN]?$/.test(t)){const m=t.match(/^R(\d{2}[LCR]?)\/([PM]?)(\d{4})/);const tr=t.slice(-1);e=`RVR (alcance visual en pista) de la pista ${m[1]}: ${m[2]==='P'?'más de ':m[2]==='M'?'menos de ':''}${+m[3]} m${tr==='U'?', aumentando':tr==='D'?', disminuyendo':tr==='N'?', sin cambios':''}.`;}
  else if(/^(FEW|SCT|BKN|OVC)\d{3}(CB|TCU|\/\/\/)?$/.test(t)){const h=+t.slice(3,6)*100;e=`${CL[t.slice(0,3)]} a ${h.toLocaleString('es-ES')} ft sobre el aeródromo${t.endsWith('CB')?' — <b>cumulonimbos (tormenta)</b>':t.endsWith('TCU')?' — cúmulos congestus (torreados)':''}.`;}
  else if(/^VV(\d{3}|\/\/\/)$/.test(t))e=`Cielo oscurecido: visibilidad vertical ${/\d/.test(t)?(+t.slice(2)*100)+' ft':'no disponible'}.`;
  else if(t==='NSC')e='NSC: sin nubes significativas.';else if(t==='NCD')e='NCD: no se detectan nubes (estación automática).';else if(t==='SKC')e='SKC: cielo despejado.';
  else if(/^M?\d{2}\/M?\d{2}$/.test(t)){const [a,b]=t.split('/');e=`Temperatura ${tmp(a)} °C y punto de rocío ${tmp(b)} °C${Math.abs(parseInt(a.replace('M','-'))-parseInt(b.replace('M','-')))<=2?' (muy próximos: posible niebla o neblina)':''}.`;}
  else if(/^Q\d{4}$/.test(t))e=`QNH ${+t.slice(1)} hPa: ajuste del altímetro.`;
  else if(/^A\d{4}$/.test(t))e=`Altímetro ${t.slice(1,3)}.${t.slice(3)} pulgadas de mercurio (formato EE. UU.).`;
  else if(t==='NOSIG')e='NOSIG: sin cambios significativos previstos en las próximas 2 horas.';
  else if(t==='BECMG')e='BECMG (becoming): cambio gradual durante el periodo indicado.';
  else if(t==='TEMPO')e='TEMPO: fluctuaciones temporales durante el periodo indicado.';
  else if(/^PROB(30|40)$/.test(t))e=`Probabilidad del ${t.slice(4)} %.`;
  else if(/^FM\d{6}$/.test(t))e=`FM (from): a partir del ${dd(t.slice(2))}, cambio rápido a las condiciones siguientes.`;
  else if(/^T[XN]M?\d{2}\/\d{4}Z$/.test(t)){const m=t.match(/^T([XN])(M?\d{2})\/(\d{4})Z$/);e=`Temperatura ${m[1]==='X'?'máxima':'mínima'} prevista ${tmp(m[2])} °C el día ${+m[3].slice(0,2)} a las ${m[3].slice(2)} UTC.`;}
  else if(/^RE[A-Z]{2,6}$/.test(t)){const w=wxText(t.slice(2));e=w?'Tiempo reciente (en la última hora): '+w.toLowerCase():null;}
  else if(t==='WS'){e='WS: cizalladura del viento (wind shear) informada.';}
  else if(t==='RMK'){rmk=true;e='RMK: comienzan las observaciones adicionales.';}
  else if(t==='NSW')e='NSW: fin del tiempo significativo.';
  else {const w=wxText(t);if(w)e='Tiempo presente: '+w;}
  out.push({t,e});prev=t;});
 return {toks:out,isTaf};
}
const AIRP={LEVC:'Valencia',LEBL:'Barcelona-El Prat',LEMD:'Madrid-Barajas',LECH:'Castellón',LEPA:'Palma de Mallorca',LEGE:'Girona',LERS:'Reus',LEMG:'Málaga',LEAL:'Alicante',LEZL:'Sevilla',LEBB:'Bilbao',GCLP:'Gran Canaria',GCXO:'Tenerife Norte'};
const WX_EX=[
 {n:'Valencia, buen tiempo',s:'METAR LEVC 171030Z 09008KT 060V120 9999 FEW030 SCT045 22/14 Q1018 NOSIG='},
 {n:'Barcelona, chubascos',s:'METAR LEBL 171100Z 21015G27KT 6000 -SHRA FEW018CB BKN030 17/13 Q1009 TEMPO 4000 SHRA='},
 {n:'Madrid, niebla invernal',s:'METAR LEMD 170700Z 00000KT 0300 R32L/0450N R18R/0600U FG VV001 02/02 Q1027 BECMG 1500 BR='},
 {n:'Castellón, CAVOK',s:'METAR LECH 171200Z 12006KT CAVOK 24/12 Q1016 NOSIG='},
 {n:'Palma, tormenta',s:'METAR LEPA 171500Z 18012KT 3000 +TSRA BKN015CB OVC060 21/19 Q1011 RETS='},
 {n:'Madrid, nieve',s:'METAR LEMD 170600Z VRB03KT 2000 -SN BKN008 OVC015 M01/M02 Q1004 NOSIG='},
 {n:'TAF Barcelona',s:'TAF LEBL 171100Z 1712/1818 22010KT 9999 FEW025 TX21/1714Z TN12/1806Z BECMG 1716/1718 VRB03KT TEMPO 1800/1806 4000 BR PROB30 1804/1806 BKN008='},
 {n:'TAF Valencia',s:'TAF LEVC 170500Z 1706/1806 VRB04KT CAVOK BECMG 1710/1712 10010KT FM171800 30008KT 9999 SCT040 PROB40 TEMPO 1714/1718 SHRA BKN025CB='}
];
const Tools={
 metar(root){
  root.innerHTML=`<h1>🔎 Decodificador METAR / TAF</h1><p class="mu">Pega un METAR o TAF (real o de ejemplo) y toca cada grupo para ver su explicación.</p>
  <label>Ejemplos (ilustrativos, no son partes reales)</label><select id="wxSel">${WX_EX.map((x,i)=>`<option value="${i}">${x.n}</option>`).join('')}</select>
  <label>Texto</label><textarea id="wxIn" class="mono" rows="3"></textarea>
  <div class="btns"><button class="btn" id="wxGo">Decodificar</button><a class="btn sec" href="#/t/metarq">✍️ Ejercicios</a></div>
  <div id="wxTok" class="toks"></div><div id="wxDec" class="dec"></div>
  ${TIP('Consejo','Para practicar con partes reales, en el simulador o en webs de meteorología aeronáutica (p. ej. AEMET o aviationweather.gov) copia el METAR de LEVC, LECH o LEBL y pégalo aquí.')}`;
  const sel=root.querySelector('#wxSel'),inp=root.querySelector('#wxIn');
  const go=()=>{const r=decodeWx(inp.value);const tk=root.querySelector('#wxTok'),dc=root.querySelector('#wxDec');
   tk.innerHTML=r.toks.map((x,i)=>`<span class="tok ${x.e?'':'unk'}" data-i="${i}">${x.t}</span>`).join('');
   dc.innerHTML=r.toks.map((x,i)=>`<div data-i="${i}"><code>${x.t}</code>${x.e||'<span class="mu">Grupo no reconocido por este decodificador sencillo.</span>'}</div>`).join('');
   tk.querySelectorAll('.tok').forEach(s=>s.onclick=()=>{root.querySelectorAll('.on').forEach(z=>z.classList.remove('on'));s.classList.add('on');const d=dc.querySelector(`[data-i="${s.dataset.i}"]`);d.classList.add('on');d.scrollIntoView({behavior:'smooth',block:'center'});});};
  sel.onchange=()=>{inp.value=WX_EX[sel.value].s;go();};root.querySelector('#wxGo').onclick=go;inp.value=WX_EX[0].s;go();
 },
 metarQs(){ // genera ejercicios a partir de los METAR de ejemplo
  const ms=WX_EX.filter(x=>x.s.startsWith('METAR')).map(x=>({s:x.s.replace(/=$/,''),d:decodeWx(x.s).toks}));
  const get=(m,re)=>{const t=m.d.find(x=>re.test(x.t));return t?t:null;};
  const kinds=[
   {q:'¿Cuál es el QNH?',re:/^Q\d{4}$/,f:t=>t.t.slice(1)+' hPa'},
   {q:'¿Qué viento hay?',re:/^(\d{3}|VRB)\d{2}/,f:t=>t.e.replace(/<\/?b>/g,'').replace(/\.$/,'')},
   {q:'¿Qué temperatura y punto de rocío hay?',re:/^M?\d{2}\/M?\d{2}$/,f:t=>t.e.replace(/ \(.*\)/,'').replace(/\.$/,'')},
   {q:'¿Qué visibilidad hay?',re:/^(\d{4}|CAVOK)$/,f:t=>t.t==='CAVOK'?'CAVOK (10 km o más y sin nubes significativas)':t.e.replace(/\.$/,'')}];
  const qs=[];ms.forEach(m=>kinds.forEach(k=>{const t=get(m,k.re);if(!t)return;const right=k.f(t);const pool=[...new Set(ms.filter(o=>o!==m).map(o=>get(o,k.re)).filter(Boolean).map(k.f))].filter(x=>x!==right);
   if(pool.length<2)return;pool.sort(()=>Math.random()-.5);qs.push({q:`<pre class="mono">${m.s}</pre>${k.q}`,o:[right,pool[0],pool[1]],a:0,e:`El grupo <code>${t.t}</code> significa: ${t.e}`});}));
  return qs.sort(()=>Math.random()-.5).slice(0,10);
 },
 alfa(root){
  root.innerHTML=`<h1>🔤 Alfabeto aeronáutico</h1>
  <div class="btns"><button class="btn" id="aG1">🎯 Letra → palabra</button><button class="btn sec" id="aG2">🎯 Palabra → letra</button><button class="btn sec" id="aG3">🗣️ Deletreador</button></div>
  <div id="aBox"></div>`;
  const box=root.querySelector('#aBox');
  const game=(mode)=>{const qs=[...PP.ALFA,...PP.NUM.map(n=>[n[0],n[1],n[2]])].sort(()=>Math.random()-.5).slice(0,12).map(a=>{
     const others=[...PP.ALFA,...PP.NUM].filter(x=>x[0]!==a[0]&&(/\d/.test(a[0])===/\d/.test(x[0]))).sort(()=>Math.random()-.5).slice(0,2);
     return mode===1?{q:`<div class="big">${a[0]}</div>¿Cómo se dice en radio?`,o:[a[1],others[0][1],others[1][1]],a:0,e:`<b>${a[0]}</b> = <b>${a[1]}</b> (se pronuncia ${a[2]}).`}
       :{q:`<div class="big" style="font-size:30px">${a[1]}</div>¿Qué letra o cifra es?`,o:[a[0],others[0][0],others[1][0]],a:0,e:`<b>${a[1]}</b> = ${a[0]}.`};});
   Quiz.run(box,qs,{title:mode===1?'Letra → palabra':'Palabra → letra',key:'alfa'+mode,onExit:()=>Tools.alfa(root)});};
  root.querySelector('#aG1').onclick=()=>game(1);root.querySelector('#aG2').onclick=()=>game(2);
  root.querySelector('#aG3').onclick=()=>{box.innerHTML=`<label>Escribe una matrícula, indicativo o palabra</label><input id="aIn" value="EC-JLN" autocapitalize="characters"><div id="aOut" class="lesson" style="margin-top:10px"></div>`;
   const i=box.querySelector('#aIn'),o=box.querySelector('#aOut');const f=()=>{o.innerHTML=[...i.value.toUpperCase()].map(c=>{const a=PP.ALFA.find(x=>x[0]===c)||PP.NUM.find(x=>x[0]===c);return a?`<span class="pill"><b>${c}</b> ${a[1]}</span>`:(c===' '?'<br>':c==='-'?'':`<span class="pill">${c}</span>`);}).join(' ');};i.oninput=f;f();};
  box.innerHTML=`<div class="lesson"><table>${PP.ALFA.map(a=>`<tr><td><b>${a[0]}</b></td><td>${a[1]}</td><td class="mu">${a[2]}</td></tr>`).join('')}</table></div>`;
 },
 wb(root){
  const D={dow:42500,dowArm:17.2,pa:40,pb:60,pc:50,pax:84,cf:2200,ca:1500,fuel:7000,trip:3000};
  root.innerHTML=`<h1>⚖️ Peso y centrado</h1>
  ${WARN('Avión y cifras de EJEMPLO','Es un bimotor de pasillo único <b>ficticio</b> con números redondos para aprender el método. Los límites no son los oficiales de ningún avión real. En el simulador usa el EFB o la hoja de carga de tu avión.')}
  <div class="lesson">
  <label>Peso operativo en seco (DOW), kg</label><input type="number" id="wDow" value="${D.dow}">
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px"><div><label>Pax zona delantera</label><input type="number" id="wPa" value="${D.pa}"></div><div><label>Pax zona central</label><input type="number" id="wPb" value="${D.pb}"></div><div><label>Pax zona trasera</label><input type="number" id="wPc" value="${D.pc}"></div></div>
  <label>Peso estándar por pasajero (kg, con equipaje de mano)</label><input type="number" id="wPx" value="${D.pax}">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><div><label>Bodega delantera, kg</label><input type="number" id="wCf" value="${D.cf}"></div><div><label>Bodega trasera, kg</label><input type="number" id="wCa" value="${D.ca}"></div></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><div><label>Combustible al despegue, kg</label><input type="number" id="wFu" value="${D.fuel}"></div><div><label>Combustible del viaje (trip), kg</label><input type="number" id="wTr" value="${D.trip}"></div></div>
  </div><div id="wRes"></div>
  <h3>¿Cómo se calcula?</h3><div class="lesson sm"><p>Cada peso tiene un <b>brazo</b>: su distancia (m) a un punto de referencia del morro. <b>Momento = peso × brazo</b>. El CG es la suma de momentos dividida entre el peso total. Luego se expresa en <b>% MAC</b>: (CG − inicio de la MAC) ÷ longitud de la MAC × 100.</p>
  <p>Brazos de ejemplo: DOW 17,2 m · pax delanteros 9,0 m · centrales 16,5 m · traseros 24,0 m · bodega delantera 10,0 m · trasera 23,5 m · combustible 17,0 m. MAC de ejemplo: empieza a 16,0 m y mide 4,2 m.</p></div>`;
  const L={MZFW:62500,MTOW:78000,MLW:66000,fwd:18,aft:38},LEMAC=16.0,MAC=4.2;
  const calc=()=>{const v=id=>+root.querySelector(id).value||0;const px=v('#wPx');
   const items=[[v('#wDow'),17.2],[v('#wPa')*px,9.0],[v('#wPb')*px,16.5],[v('#wPc')*px,24.0],[v('#wCf'),10.0],[v('#wCa'),23.5]];
   const zfw=items.reduce((s,x)=>s+x[0],0),zm=items.reduce((s,x)=>s+x[0]*x[1],0);const fu=v('#wFu'),tr=v('#wTr');
   const tow=zfw+fu,lw=tow-tr,cgZ=((zm/zfw)-LEMAC)/MAC*100,cgT=(((zm+fu*17.0)/tow)-LEMAC)/MAC*100;
   const pax=v('#wPa')+v('#wPb')+v('#wPc');
   const ok=(x,m)=>x<=m?`<small class="okc">✔ ≤ ${m.toLocaleString('es-ES')}</small>`:`<small class="koc">✖ supera ${m.toLocaleString('es-ES')}</small>`;
   const cgok=c=>c>=L.fwd&&c<=L.aft?`<small class="okc">✔ dentro (${L.fwd}–${L.aft} %)</small>`:`<small class="koc">✖ fuera de límites (${L.fwd}–${L.aft} %)</small>`;
   const f=n=>Math.round(n).toLocaleString('es-ES');
   root.querySelector('#wRes').innerHTML=`<div class="wb-res">
    <div>Pasajeros<b>${pax}</b><small class="mu">${f(pax*px)} kg</small></div>
    <div>ZFW<b>${f(zfw)} kg</b>${ok(zfw,L.MZFW)}</div>
    <div>TOW<b>${f(tow)} kg</b>${ok(tow,L.MTOW)}</div>
    <div>LW<b>${f(lw)} kg</b>${ok(lw,L.MLW)}</div>
    <div>CG sin combustible<b>${cgZ.toFixed(1)} % MAC</b>${cgok(cgZ)}</div>
    <div>CG al despegue<b>${cgT.toFixed(1)} % MAC</b>${cgok(cgT)}</div></div>
    <svg viewBox="0 0 300 50" style="width:100%;background:#0b1424;border-radius:10px"><rect x="20" y="20" width="260" height="10" rx="5" fill="#334155"/>
    <rect x="${20+260*L.fwd/50}" y="20" width="${260*(L.aft-L.fwd)/50}" height="10" fill="#16a34a" opacity=".6"/>
    <circle cx="${20+260*Math.max(0,Math.min(50,cgT))/50}" cy="25" r="8" fill="#facc15"/><text x="20" y="45" fill="#9fb0cf" font-size="9">0 % MAC</text><text x="250" y="45" fill="#9fb0cf" font-size="9">50 %</text><text x="${20+260*L.fwd/50}" y="14" fill="#86efac" font-size="9">límite del.</text><text x="${20+260*L.aft/50-30}" y="14" fill="#86efac" font-size="9">límite tras.</text></svg>
    <p class="sm mu">Prueba: pon todos los pasajeros atrás y mucha carga en la bodega trasera y mira cómo el CG se va hacia el límite trasero.</p>`;};
  root.querySelectorAll('input').forEach(i=>i.oninput=calc);calc();
 },
 viento(root){
  root.innerHTML=`<h1>🧭 Componentes del viento</h1><p class="mu">Calcula el viento de cara y cruzado para una pista.</p>
  <div class="lesson"><label>Rumbo de la pista (°) — p. ej. pista 30 ≈ 300°</label><input type="number" id="vR" value="300"><label>Dirección del viento (°)</label><input type="number" id="vD" value="270"><label>Velocidad del viento (kt)</label><input type="number" id="vS" value="15"></div><div id="vO" class="wb-res"></div>
  ${TIP('Regla rápida','Ángulo de 30° → cruzado ≈ 50 % del viento; 45° → ≈ 70 %; 60° o más → ≈ 90-100 %. Cada avión tiene un viento cruzado máximo demostrado en su manual.')}`;
  const c=()=>{const r=+root.querySelector('#vR').value,d=+root.querySelector('#vD').value,s=+root.querySelector('#vS').value;const a=(d-r)*Math.PI/180;const h=s*Math.cos(a),x=s*Math.sin(a);
   root.querySelector('#vO').innerHTML=`<div>${h>=0?'Viento de cara':'Viento de cola'}<b>${Math.abs(h).toFixed(0)} kt</b></div><div>Viento cruzado<b>${Math.abs(x).toFixed(0)} kt</b><small class="mu">desde la ${x>=0?'derecha':'izquierda'}</small></div>`;};
  root.querySelectorAll('input').forEach(i=>i.oninput=c);c();
 }
};
