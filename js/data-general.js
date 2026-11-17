/* Piloto Pro by Julián Lenis — Escuela de vuelo (contenidos comunes) */
window.PP={courses:[],panels:{}};
const TIP=(t,h)=>`<div class="box tip"><b>💡 ${t}</b>${h}</div>`;
const WARN=(t,h)=>`<div class="box warn"><b>⚠️ ${t}</b>${h}</div>`;
const EX=(t,h)=>`<div class="box ex"><b>✍️ ${t}</b>${h}</div>`;
const TOOL=(href,txt)=>`<p><a class="btn sec" href="${href}">${txt}</a></p>`;
const SIMNOTE=`<div class="disc">🎮 Contenido didáctico para simulador doméstico (MSFS, X-Plane…). Simplificado: no sirve como formación ni como procedimiento real de vuelo.</div>`;

/* ---------- SVG: cartas didácticas dibujadas a mano (ficticias) ---------- */
const SVG={
aero:`<svg viewBox="0 0 400 240" font-family="Arial" font-size="10">
<rect width="400" height="240" fill="#f8fafc"/>
<text x="10" y="16" font-weight="bold" font-size="12">PLANO DE AERÓDROMO (ejemplo ficticio) · LEXX</text>
<g transform="rotate(-25 200 130)"><rect x="40" y="118" width="320" height="22" fill="#374151"/>
<line x1="50" y1="129" x2="350" y2="129" stroke="#fff" stroke-dasharray="10 8" stroke-width="2"/>
<text x="44" y="133" fill="#fff" font-weight="bold" font-size="12" transform="rotate(90 52 129)">12</text>
<text x="352" y="125" fill="#fff" font-weight="bold" font-size="12" transform="rotate(-90 350 129)">30</text>
<rect x="60" y="140" width="280" height="10" fill="#9ca3af"/>
<rect x="90" y="140" width="10" height="45" fill="#9ca3af"/><rect x="200" y="140" width="10" height="45" fill="#9ca3af"/><rect x="300" y="140" width="10" height="45" fill="#9ca3af"/>
<text x="150" y="148" font-size="9" fill="#111">TWY A</text><text x="102" y="170" font-size="9">B1</text><text x="212" y="170" font-size="9">B2</text><text x="312" y="170" font-size="9">B3</text>
<rect x="80" y="185" width="250" height="40" fill="#cbd5e1" stroke="#64748b"/><text x="160" y="209" font-size="11">PLATAFORMA / STANDS 1-10</text></g>
<rect x="300" y="190" width="70" height="30" fill="#e2e8f0" stroke="#64748b"/><text x="308" y="209">TERMINAL</text>
<line x1="372" y1="40" x2="372" y2="20" stroke="#111" stroke-width="2"/><polygon points="372,14 367,24 377,24" fill="#111"/><text x="368" y="50">N</text>
<text x="10" y="232" font-size="9" fill="#475569">Pista 12/30 · Calles de rodaje A, B1-B3 · Hot spots se marcan con círculos rojos en las cartas reales</text>
<circle cx="120" cy="178" r="9" fill="none" stroke="#dc2626" stroke-width="2"/><text x="132" y="182" fill="#dc2626">HS1</text>
</svg>`,
sid:`<svg viewBox="0 0 400 250" font-family="Arial" font-size="10">
<rect width="400" height="250" fill="#f8fafc"/>
<text x="10" y="16" font-weight="bold" font-size="12">SID (salida) — EJEMPLO FICTICIO "AZAHR 1A" pista 30</text>
<rect x="40" y="190" width="60" height="7" fill="#374151" transform="rotate(-30 70 193)"/><text x="40" y="222">LEXX RWY 30</text>
<path d="M95 178 L150 146 L220 120 L330 60" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
<polygon points="150,146 145,140 156,140" fill="#111"/><text x="120" y="138">D5 XX</text><text x="120" y="160" fill="#1d4ed8">↑ 2500</text>
<polygon points="220,120 214,112 226,112" fill="#111"/><text x="226" y="114" font-weight="bold">NARAN</text><text x="226" y="132" fill="#1d4ed8">FL070 o sup. (<u>FL070</u>)</text>
<polygon points="330,60 324,52 336,52" fill="#111"/><text x="300" y="46" font-weight="bold">AZAHR</text><text x="336" y="72" fill="#1d4ed8">FL100</text>
<text x="235" y="90" transform="rotate(-28 235 90)">058°  32 NM</text>
<text x="10" y="242" fill="#475569" font-size="9">Altitud inicial 5000 · Velocidad máx. 250 KT bajo FL100 · Altitud de transición: la que publique la carta</text>
</svg>`,
star:`<svg viewBox="0 0 400 250" font-family="Arial" font-size="10">
<rect width="400" height="250" fill="#f8fafc"/>
<text x="10" y="16" font-weight="bold" font-size="12">STAR (llegada) — EJEMPLO FICTICIO "MARTA 2B"</text>
<path d="M30 60 L130 90 L230 140 L320 190" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
<polygon points="30,60 24,52 36,52" fill="#111"/><text x="10" y="46" font-weight="bold">MARTA</text><text x="18" y="78" fill="#7c3aed">FL140</text>
<polygon points="130,90 124,82 136,82" fill="#111"/><text x="115" y="76" font-weight="bold">ROSAL</text><text x="138" y="104" fill="#7c3aed">FL100 / 250 KT</text>
<polygon points="230,140 224,132 236,132" fill="#111"/><text x="235" y="134" font-weight="bold">SOLER</text><text x="200" y="160" fill="#7c3aed"><tspan text-decoration="underline">7000</tspan> (≥7000)</text>
<ellipse cx="320" cy="200" rx="38" ry="14" fill="none" stroke="#111" stroke-dasharray="4 3"/><text x="290" y="228">Espera (HOLD) en IAF</text>
<polygon points="320,190 314,182 326,182" fill="#111"/><text x="330" y="186" font-weight="bold">IAF LXX</text>
<text x="10" y="242" fill="#475569" font-size="9">Línea bajo la cifra = "a o por encima" · Encima = "a o por debajo" · Ambas = "exactamente"</text>
</svg>`,
iac:`<svg viewBox="0 0 400 260" font-family="Arial" font-size="10">
<rect width="400" height="260" fill="#f8fafc"/>
<text x="10" y="16" font-weight="bold" font-size="12">APROXIMACIÓN ILS — EJEMPLO FICTICIO RWY 30</text>
<text x="10" y="32" font-size="9">LOC 110.XX · CRS 300° · Mínimos: DA según categoría · Frustrada: subir a 3000</text>
<line x1="20" y1="80" x2="380" y2="80" stroke="#111"/><text x="300" y="74">VISTA EN PLANTA</text>
<path d="M360 80 L60 80" stroke="#16a34a" stroke-width="3"/><rect x="40" y="76" width="22" height="8" fill="#374151"/>
<polygon points="300,72 294,64 306,64" fill="#111"/><text x="290" y="60" font-weight="bold">IF</text>
<path d="M200 72 L194 64 L206 64 Z" fill="#fff" stroke="#111"/><text x="185" y="60" font-weight="bold">FAF 4.5 NM</text>
<text x="10" y="120" font-weight="bold">PERFIL VERTICAL</text>
<line x1="20" y1="230" x2="380" y2="230" stroke="#111"/>
<path d="M360 140 L200 140 L60 225" fill="none" stroke="#16a34a" stroke-width="3"/>
<text x="300" y="134">3000</text><text x="205" y="134">FAF 3000 · GS 3°</text><rect x="40" y="226" width="30" height="6" fill="#374151"/>
<line x1="85" y1="205" x2="85" y2="232" stroke="#dc2626" stroke-dasharray="3 2"/><text x="90" y="200" fill="#dc2626">DA</text>
<path d="M60 225 L30 180 L30 150" fill="none" stroke="#111" stroke-dasharray="5 4"/><text x="34" y="150">Frustrada ↑3000</text>
<text x="10" y="252" fill="#475569" font-size="9">Una carta real añade frecuencias, MSA, mínimos por categoría, distancias DME y texto de frustrada.</text>
</svg>`,
enr:`<svg viewBox="0 0 400 240" font-family="Arial" font-size="10">
<rect width="400" height="240" fill="#f8fafc"/>
<text x="10" y="16" font-weight="bold" font-size="12">CARTA DE RUTA — EJEMPLO FICTICIO</text>
<line x1="40" y1="200" x2="200" y2="110" stroke="#0369a1" stroke-width="2"/><line x1="200" y1="110" x2="360" y2="50" stroke="#0369a1" stroke-width="2"/>
<line x1="200" y1="110" x2="350" y2="200" stroke="#0369a1" stroke-width="1.5" stroke-dasharray="6 3"/>
<rect x="88" y="150" width="56" height="16" fill="#e0f2fe" stroke="#0369a1"/><text x="92" y="162" fill="#0369a1" font-weight="bold">UN725</text>
<rect x="250" y="62" width="56" height="16" fill="#e0f2fe" stroke="#0369a1"/><text x="254" y="74" fill="#0369a1" font-weight="bold">UM601</text>
<text x="110" y="182">045° · 64</text><text x="250" y="96">072° · 71</text>
<g><circle cx="200" cy="110" r="9" fill="none" stroke="#111"/><polygon points="200,103 206,114 194,114" fill="none" stroke="#111"/><text x="210" y="124" font-weight="bold">VOR XXX 114.X</text></g>
<polygon points="40,200 34,192 46,192" fill="#111"/><text x="20" y="215" font-weight="bold">AZAHR</text>
<polygon points="360,50 354,42 366,42" fill="#111"/><text x="335" y="36" font-weight="bold">MARTA</text>
<text x="300" y="215">MEA FL070</text>
<text x="10" y="232" fill="#475569" font-size="9">Aerovías con nombre (UN725), rumbos magnéticos, distancias en NM, radioayudas y altitudes mínimas.</text>
</svg>`
};

/* ---------- ALFABETO ---------- */
PP.ALFA=[["A","Alfa","AL-fa"],["B","Bravo","BRA-vo"],["C","Charlie","CHAR-li"],["D","Delta","DEL-ta"],["E","Echo","E-co"],["F","Foxtrot","FOX-trot"],["G","Golf","GOLF"],["H","Hotel","jo-TEL"],["I","India","IN-dia"],["J","Juliett","YU-li-et"],["K","Kilo","KI-lo"],["L","Lima","LI-ma"],["M","Mike","MAIK"],["N","November","no-VEM-ber"],["O","Oscar","OS-car"],["P","Papa","pa-PA"],["Q","Quebec","que-BEC"],["R","Romeo","RO-mio"],["S","Sierra","si-E-rra"],["T","Tango","TAN-go"],["U","Uniform","IU-ni-form"],["V","Victor","VIC-tor"],["W","Whiskey","UIS-qui"],["X","X-ray","EX-rei"],["Y","Yankee","IAN-qui"],["Z","Zulu","ZU-lu"]];
PP.NUM=[["0","Zero","ZI-ro"],["1","One","UAN"],["2","Two","TU"],["3","Three","TRI"],["4","Four","FOU-er"],["5","Five","FAIF"],["6","Six","SIX"],["7","Seven","SE-ven"],["8","Eight","EIT"],["9","Nine","NAI-ner"]];

PP.courses.push({
id:"escuela",title:"Escuela de vuelo",sub:"Lo que todo piloto de simulador debe saber antes de tocar un avión",icon:"🎓",level:"school",
modules:[
{id:"m1",title:"1. Primeros pasos: cómo vuela un avión",lessons:[
{id:"l1",title:"Las 4 fuerzas y los mandos",html:`
<p>¡Bienvenido a bordo, Julián! Antes de encender ningún interruptor, vamos a entender <b>por qué vuela un avión</b>. Lo explico como si fuera tu instructor, paso a paso.</p>
<h3>Las 4 fuerzas</h3>
<ul><li><b>Sustentación</b> (hacia arriba): la generan las alas al moverse por el aire.</li>
<li><b>Peso</b> (hacia abajo): el avión, el combustible, los pasajeros y la carga.</li>
<li><b>Empuje</b> (hacia delante): lo dan los motores.</li>
<li><b>Resistencia</b> (hacia atrás): el aire que frena al avión.</li></ul>
<p>En vuelo recto y nivelado a velocidad constante, sustentación ≈ peso y empuje ≈ resistencia.</p>
<h3>Los 3 ejes y sus mandos</h3>
<table><tr><th>Movimiento</th><th>Eje</th><th>Superficie</th><th>Mando</th></tr>
<tr><td>Cabeceo (morro arriba/abajo)</td><td>Transversal</td><td>Timón de profundidad (elevator)</td><td>Palanca adelante/atrás</td></tr>
<tr><td>Alabeo (inclinar alas)</td><td>Longitudinal</td><td>Alerones (y spoilers en reactores)</td><td>Palanca a izquierda/derecha</td></tr>
<tr><td>Guiñada (morro a los lados)</td><td>Vertical</td><td>Timón de dirección (rudder)</td><td>Pedales</td></tr></table>
<h3>Flaps y slats</h3><p>Son superficies que se extienden en el borde de salida (flaps) y de ataque (slats) del ala para <b>volar más lento con seguridad</b>: se usan en despegue y aterrizaje.</p>
${TIP("Truco de instructor","En el Airbus no hay cuernos de mando: se vuela con un <b>sidestick</b> lateral. En Boeing (737, 777, 787) hay <b>cuernos (yoke)</b> delante del piloto.")}`},
{id:"l2",title:"Instrumentos básicos (PFD) y unidades",html:`
<p>En los aviones modernos, todos los instrumentos básicos están en una pantalla: el <b>PFD</b> (Primary Flight Display).</p>
<ul><li><b>Cinta de velocidad</b> (izquierda): en <b>nudos</b> (kt). 1 nudo = 1 milla náutica por hora ≈ 1,852 km/h.</li>
<li><b>Horizonte artificial</b> (centro): actitud del avión (cabeceo y alabeo).</li>
<li><b>Cinta de altitud</b> (derecha): en <b>pies</b> (ft). 1 ft ≈ 0,305 m.</li>
<li><b>Velocidad vertical</b> (VS): pies por minuto que subes o bajas.</li>
<li><b>Rumbo</b> (abajo): en grados magnéticos, 0–359°.</li>
<li><b>FMA</b> (arriba): los modos activos del piloto automático. ¡Siempre se leen!</li></ul>
<h3>Altitud vs nivel de vuelo</h3>
<p>Por debajo de la <b>altitud de transición</b> se vuela con el <b>QNH</b> local (presión ajustada al nivel del mar, en hPa) y se habla de "altitud" (p. ej. 5000 ft). Por encima, todos ponen <b>1013 hPa (STD)</b> y se habla de <b>niveles de vuelo</b>: FL350 = 35.000 ft con presión estándar.</p>
${TIP("Recuerda","Distancias en <b>millas náuticas</b> (NM ≈ 1,852 km). Velocidades altas se indican en <b>Mach</b> (M0.78 = 78 % de la velocidad del sonido).")}
<h3>Velocidades que verás mucho</h3>
<ul><li><b>V1</b>: velocidad de decisión. Por encima, el despegue continúa aunque falle un motor.</li><li><b>VR</b>: rotación (tirar de la palanca).</li><li><b>V2</b>: velocidad segura de ascenso con un motor inoperativo.</li><li><b>Vref / VAPP</b>: velocidad de aproximación final.</li></ul>`}],
quiz:[
{q:"¿Qué fuerza generan principalmente las alas?",o:["Sustentación","Empuje","Resistencia"],a:0,e:"El ala, al moverse por el aire, genera sustentación. El empuje lo dan los motores y la resistencia es la oposición del aire."},
{q:"¿Con qué superficie controlas el cabeceo (morro arriba/abajo)?",o:["Timón de profundidad (elevator)","Alerones","Timón de dirección (rudder)"],a:0,e:"El elevator, en la cola horizontal, controla el cabeceo. Los alerones dan alabeo y el rudder guiñada."},
{q:"¿Para qué sirven los flaps?",o:["Para volar más lento con seguridad en despegue y aterrizaje","Para aumentar la velocidad de crucero","Para controlar el alabeo"],a:0,e:"Flaps y slats aumentan la sustentación a baja velocidad. En crucero van recogidos."},
{q:"FL350 significa…",o:["35.000 ft con altímetro en 1013 hPa","3.500 ft con el QNH local","350 metros sobre el aeropuerto"],a:0,e:"Nivel de vuelo = altitud en cientos de pies con presión estándar 1013 hPa."},
{q:"¿Qué es V1?",o:["La velocidad de decisión en el despegue","La velocidad de rotación","La velocidad de aproximación final"],a:0,e:"V1 es la velocidad de decisión: a partir de ella el despegue se continúa. VR es rotación y Vref/VAPP la de aproximación."},
{q:"¿En qué unidad se mide normalmente la velocidad del avión en el PFD?",o:["Nudos (kt)","Kilómetros por hora","Millas terrestres por hora"],a:0,e:"La aviación usa nudos: millas náuticas por hora."},
{q:"¿Qué muestra el FMA en la parte superior del PFD?",o:["Los modos activos y armados del piloto automático y autothrust","El combustible restante","La temperatura exterior"],a:0,e:"El FMA (Flight Mode Annunciator) dice qué está haciendo la automatización. Se lee en voz alta en cada cambio."}]},

{id:"m2",title:"2. Radio: alfabeto aeronáutico y fraseología",lessons:[
{id:"l1",title:"El alfabeto fonético OACI",html:`
<p>En la radio hay ruido y acentos distintos. Por eso las letras se dicen con palabras estándar de la OACI. Así "B" y "D" nunca se confunden.</p>
<table><tr><th>Letra</th><th>Palabra</th><th>Se pronuncia</th></tr>${PP.ALFA.map(a=>`<tr><td><b>${a[0]}</b></td><td>${a[1]}</td><td class="mu">${a[2]}</td></tr>`).join("")}</table>
<h3>Números en inglés aeronáutico</h3>
<table><tr><th>Cifra</th><th>Palabra</th><th>Se pronuncia</th></tr>${PP.NUM.map(a=>`<tr><td><b>${a[0]}</b></td><td>${a[1]}</td><td class="mu">${a[2]}</td></tr>`).join("")}</table>
${TIP("Ojo","Se escribe <b>Alfa</b> (no Alpha) y <b>Juliett</b> (con dos t) en la ortografía OACI. El 9 se dice <b>niner</b> para no confundirlo con el alemán 'nein'.")}
${EX("Ejemplo","Tu indicativo <b>EC-JLN</b> sería: <i>Echo Charlie Juliett Lima November</i>. Una calle de rodaje <b>B2</b>: <i>Bravo Two</i>.")}
${TOOL("#/t/alfabeto","🎯 Practicar con el juego del alfabeto")}`},
{id:"l2",title:"Fraseología básica y transpondedor",html:`
<p>En España el control puede hablarte en <b>español o inglés</b>. En el simulador (VATSIM, IVAO o el ATC del juego) normalmente se usa inglés.</p>
<h3>Reglas de oro</h3><ul>
<li><b>Escucha antes de hablar</b>, piensa, y luego pulsa el botón.</li>
<li><b>Colacionar (readback)</b>: repite siempre autorizaciones, pistas, altitudes, rumbos, velocidades, QNH y códigos de transpondedor, terminando con tu indicativo.</li>
<li>Palabras clave: <b>ROGER</b> (recibido), <b>WILCO</b> (cumpliré), <b>AFFIRM</b> (sí), <b>NEGATIVE</b> (no), <b>SAY AGAIN</b> (repita), <b>STANDBY</b> (espere).</li></ul>
${EX("Ejemplo de readback","ATC: <i>“Iberia 123, climb flight level 240, turn left heading 090.”</i><br>Tú: <i>“Climb flight level 240, left heading 090, Iberia 123.”</i>")}
<h3>Códigos de transpondedor especiales</h3>
<ul><li><b>7700</b>: emergencia.</li><li><b>7600</b>: fallo de comunicaciones.</li><li><b>7500</b>: interferencia ilícita (secuestro).</li></ul>
${WARN("En el simulador online","No pongas estos códigos por juego en VATSIM/IVAO: los controladores los tratan como reales dentro de la simulación.")}`}],
quiz:[
{q:"¿Cómo se dice la letra J en el alfabeto OACI?",o:["Juliett","Jaguar","Jupiter"],a:0,e:"J = Juliett (con dos t en la ortografía OACI)."},
{q:"¿Qué palabra corresponde a la letra Q?",o:["Quebec","Queen","Quito"],a:0,e:"Q = Quebec. Queen y Quito no forman parte del alfabeto OACI."},
{q:"El número 9 en fraseología inglesa se dice…",o:["Niner","Nine","Nein"],a:0,e:"Se dice 'niner' para evitar confusiones (por ejemplo con el alemán 'nein')."},
{q:"¿Qué significa WILCO?",o:["He entendido y cumpliré","Repita su último mensaje","Afirmativo, sí"],a:0,e:"WILCO = will comply. Repetir sería SAY AGAIN y sí es AFFIRM."},
{q:"¿Qué código de transpondedor indica fallo de comunicaciones?",o:["7600","7700","7500"],a:0,e:"7600 = fallo de radio; 7700 = emergencia; 7500 = interferencia ilícita."},
{q:"¿Qué se debe colacionar (readback) siempre?",o:["Altitudes, rumbos, pistas, QNH y códigos de transpondedor","Solo el saludo y la despedida","Únicamente la frecuencia de la siguiente estación"],a:0,e:"Todo lo que afecta a la seguridad (autorizaciones, niveles, rumbos, pistas, QNH, squawk) se repite."},
{q:"¿Cómo deletrearías la calle de rodaje “K4”?",o:["Kilo Four","Kilo Fower Alfa","King Four"],a:0,e:"K = Kilo y 4 = Four (pronunciado 'fower')."}]},

{id:"m3",title:"3. Meteorología: METAR, TAF y mapas",lessons:[
{id:"l1",title:"Cómo leer un METAR",html:`
<p>El <b>METAR</b> es el parte meteorológico <b>actual</b> de un aeropuerto. Normalmente se emite cada 30 minutos (o cada hora) y está escrito en código. Vamos grupo a grupo:</p>
<pre class="mono">METAR LEVC 171030Z 09008KT 060V120 9999 FEW030 SCT045 22/14 Q1018 NOSIG</pre>
<table>
<tr><td><code>LEVC</code></td><td>Aeropuerto (código OACI). LEVC = Valencia.</td></tr>
<tr><td><code>171030Z</code></td><td>Día 17, a las 10:30 <b>UTC</b> (Z = hora Zulú). En España, invierno = UTC+1, verano = UTC+2.</td></tr>
<tr><td><code>09008KT</code></td><td>Viento <b>de</b> 090° (del este) a 8 nudos. <code>G</code> indica rachas: <code>27015G28KT</code>.</td></tr>
<tr><td><code>060V120</code></td><td>Dirección del viento variable entre 060° y 120°.</td></tr>
<tr><td><code>9999</code></td><td>Visibilidad de 10 km o más (en metros).</td></tr>
<tr><td><code>FEW030</code></td><td>Pocas nubes (1–2 octavos) a 3.000 ft sobre el aeródromo. La altura va en <b>cientos de pies</b>.</td></tr>
<tr><td><code>SCT045</code></td><td>Nubes dispersas (3–4 octavos) a 4.500 ft.</td></tr>
<tr><td><code>22/14</code></td><td>Temperatura 22 °C, punto de rocío 14 °C. <code>M</code> = bajo cero (M02).</td></tr>
<tr><td><code>Q1018</code></td><td>QNH 1018 hPa: el valor que pones en el altímetro.</td></tr>
<tr><td><code>NOSIG</code></td><td>Sin cambios significativos previstos en las próximas 2 horas.</td></tr></table>
<h3>Nubes</h3><p><b>FEW</b> 1–2/8 · <b>SCT</b> 3–4/8 · <b>BKN</b> 5–7/8 · <b>OVC</b> 8/8. <b>CB</b> = cumulonimbo (¡tormenta!) y <b>TCU</b> = cúmulo congestus. <b>CAVOK</b> = visibilidad ≥10 km, sin nubes por debajo de 5.000 ft (o de la altitud mínima de sector, si es mayor), sin CB/TCU ni fenómenos significativos.</p>
<h3>Fenómenos</h3><p><code>-</code> débil, <code>+</code> fuerte. <b>RA</b> lluvia, <b>DZ</b> llovizna, <b>SN</b> nieve, <b>TS</b> tormenta, <b>SH</b> chubasco, <b>FG</b> niebla, <b>BR</b> neblina, <b>HZ</b> calima, <b>VC</b> en las proximidades. Ej.: <code>+TSRA</code> tormenta con lluvia fuerte.</p>
${TOOL("#/t/metar","🔎 Abrir el decodificador METAR/TAF")}`},
{id:"l2",title:"Cómo leer un TAF",html:`
<p>El <b>TAF</b> es el <b>pronóstico</b> de un aeropuerto, normalmente para 24 o 30 horas. Usa el mismo código que el METAR más grupos de cambio.</p>
<pre class="mono">TAF LEBL 171100Z 1712/1818 22010KT 9999 FEW025 TX21/1714Z TN12/1806Z BECMG 1716/1718 VRB03KT TEMPO 1800/1806 4000 BR PROB30 1804/1806 BKN008</pre>
<table>
<tr><td><code>171100Z</code></td><td>Emitido el día 17 a las 11:00 UTC.</td></tr>
<tr><td><code>1712/1818</code></td><td>Válido del día 17 a las 12 UTC hasta el día 18 a las 18 UTC.</td></tr>
<tr><td><code>TX21/1714Z</code></td><td>Temperatura máxima 21 °C el día 17 a las 14 UTC. <code>TN</code> = mínima.</td></tr>
<tr><td><code>BECMG 1716/1718</code></td><td>Cambio gradual entre las 16 y las 18 UTC del día 17.</td></tr>
<tr><td><code>TEMPO 1800/1806</code></td><td>Fluctuaciones temporales (menos de 1 hora cada vez y en total menos de la mitad del periodo).</td></tr>
<tr><td><code>PROB30</code></td><td>Probabilidad del 30 % (solo se usan 30 y 40).</td></tr>
<tr><td><code>FM171500</code></td><td>Desde el día 17 a las 15:00 UTC, cambio rápido y completo.</td></tr></table>
${TIP("Para planificar","Mira el TAF del destino para tu hora estimada de llegada ±1 h. Si prevé niebla o tormentas, elige un buen alternativo y lleva combustible extra.")}`},
{id:"l3",title:"Mapas de viento, tormentas y turbulencia",html:`
<p>Además de METAR y TAF, el briefing incluye mapas:</p>
<ul><li><b>Mapas de vientos y temperaturas en altura</b>: flechas (barbas) con la dirección y fuerza del viento a cada nivel (FL240, FL340…). Un viento de cara aumenta tu tiempo y combustible.</li>
<li><b>Mapa de tiempo significativo (SIGWX)</b>: zonas de cumulonimbos (CB), turbulencia, engelamiento, corrientes en chorro (jet stream) y frentes.</li>
<li><b>SIGMET</b>: avisos de fenómenos peligrosos en ruta (turbulencia fuerte, engelamiento fuerte, tormentas embebidas, ceniza volcánica).</li></ul>
<h3>Leer una barba de viento</h3><p>Cada barba larga = 10 kt, barba corta = 5 kt, banderín (triángulo) = 50 kt. El palo apunta <b>desde</b> donde viene el viento.</p>
${WARN("Regla de seguridad","Nunca atravieses un cumulonimbo. Se rodea con margen amplio usando el radar meteorológico (en el simulador, si tu avión lo modela).")}`}],
quiz:[
{q:"En un METAR, “27015G28KT” significa…",o:["Viento de 270° a 15 kt con rachas de 28 kt","Viento hacia 270° a 28 kt con rachas de 15 kt","Pista 27, visibilidad 15 km, nubes a 2.800 ft"],a:0,e:"Dirección DE la que viene (270°), velocidad media 15 kt y rachas (G) de 28 kt."},
{q:"“BKN012” indica…",o:["Nubosidad de 5–7 octavos a 1.200 ft","Nubosidad dispersa a 12.000 ft","Cielo cubierto a 120 ft"],a:0,e:"BKN = broken (5–7/8) y la altura va en cientos de pies: 012 = 1.200 ft."},
{q:"“Q1009” es…",o:["El QNH: 1009 hPa","La visibilidad: 1.009 m","La temperatura del punto de rocío"],a:0,e:"La Q seguida de 4 cifras es el QNH en hectopascales."},
{q:"“M03/M05” significa…",o:["Temperatura −3 °C y punto de rocío −5 °C","Temperatura 3 °C y viento de 5 kt","Visibilidad de 3 a 5 km"],a:0,e:"M = minus (bajo cero). Primero la temperatura, luego el punto de rocío."},
{q:"¿Qué diferencia hay entre METAR y TAF?",o:["El METAR es la observación actual y el TAF es el pronóstico","El METAR es el pronóstico y el TAF la observación","Los dos son pronósticos, pero de distinta duración"],a:0,e:"METAR = observación actual. TAF = pronóstico del aeródromo (normalmente 24–30 h)."},
{q:"En un TAF, “TEMPO 1800/1806 4000 BR” indica…",o:["Temporalmente entre 00 y 06 UTC del día 18, visibilidad 4.000 m con neblina","Desde las 18:00 hasta las 06:00 la pista estará cerrada","Cambio permanente y gradual a 4.000 m a partir del día 18"],a:0,e:"TEMPO = fluctuaciones temporales. 1800/1806 = día 18 de 00 a 06 UTC. BR = neblina."},
{q:"¿Qué significa CAVOK?",o:["Visibilidad ≥10 km, sin nubes significativas bajo 5.000 ft ni CB/TCU, y sin fenómenos significativos","Cielo totalmente cubierto pero con buena visibilidad","Que el aeropuerto está cerrado por mal tiempo"],a:0,e:"Ceiling And Visibility OK: condiciones buenas de visibilidad y nubes (bajo 5.000 ft o la altitud mínima de sector si es mayor)."},
{q:"¿En qué hora están las horas de un METAR?",o:["UTC (hora Zulú)","Hora local del aeropuerto","Hora local de quien lo consulta"],a:0,e:"Siempre en UTC, de ahí la Z. En España suma 1 h en invierno y 2 h en verano para pasar a hora local."}]},

{id:"m4",title:"4. NOTAM: avisos de última hora",lessons:[
{id:"l1",title:"Qué es un NOTAM y cómo se lee",html:`
<p>Un <b>NOTAM</b> (Notice to Air Missions, antes "to Airmen") es un aviso con información <b>temporal o de última hora</b>: pistas cerradas, radioayudas fuera de servicio, grúas, restricciones de espacio aéreo, etc.</p>
<p class="mu sm">Ejemplo didáctico (inventado):</p>
<pre class="mono">A1234/26 NOTAMN
Q) LECB/QMRLC/IV/NBO/A/000/999/3929N00028W005
A) LEVC B) 2611200600 C) 2611201400
E) RWY 12/30 CLSD DUE TO WIP</pre>
<table>
<tr><td><code>A1234/26</code></td><td>Número del NOTAM (serie A, nº 1234 de 2026). NOTAMN = nuevo (R = reemplaza, C = cancela).</td></tr>
<tr><td><code>Q)</code></td><td>Línea de calificación: FIR (LECB = Barcelona), código Q (<b>QMRLC</b>: MR = pista, LC = cerrada), tipo de tráfico, propósito, ámbito, límites de nivel y coordenadas/radio.</td></tr>
<tr><td><code>A)</code></td><td>Lugar afectado: LEVC.</td></tr>
<tr><td><code>B)</code> / <code>C)</code></td><td>Inicio y fin en formato AAMMDDhhmm UTC. Aquí: 20/11/2026 de 06:00 a 14:00 UTC. <b>EST</b> = estimado, <b>PERM</b> = permanente.</td></tr>
<tr><td><code>E)</code></td><td>El texto: pista 12/30 cerrada por obras (WIP = work in progress).</td></tr></table>
<h3>Abreviaturas frecuentes</h3><p><b>CLSD</b> cerrado · <b>U/S</b> fuera de servicio · <b>WIP</b> obras · <b>TWY</b> calle de rodaje · <b>RWY</b> pista · <b>AD</b> aeródromo · <b>OBST</b> obstáculo · <b>AVBL</b> disponible · <b>LGT</b> luces.</p>
${TIP("En el briefing","Lee los NOTAM de salida, destino, alternativos y ruta. SimBrief los incluye en el OFP si están disponibles. Si la pista que pensabas usar está cerrada, cambias de plan antes de volar.")}`}],
quiz:[
{q:"¿Para qué sirve un NOTAM?",o:["Para avisar de información temporal o urgente que afecta a la operación","Para informar del tiempo actual en el aeropuerto","Para presentar el plan de vuelo al control"],a:0,e:"El NOTAM informa de cambios temporales (cierres, averías, restricciones). El tiempo actual es el METAR y el plan de vuelo es el FPL."},
{q:"En un NOTAM, “RWY 12/30 CLSD” significa…",o:["Pista 12/30 cerrada","Pista 12/30 con luces averiadas","Pista 12/30 solo para despegues"],a:0,e:"CLSD = closed (cerrada)."},
{q:"¿Qué indican los campos B) y C)?",o:["Inicio y fin de validez en UTC","Aeropuerto de salida y de llegada","Nivel mínimo y máximo afectado"],a:0,e:"B) = desde, C) = hasta, en formato AAMMDDhhmm UTC. Los niveles van en F) y G)."},
{q:"“ILS RWY 24R U/S” quiere decir…",o:["El ILS de la pista 24R está fuera de servicio","El ILS de la pista 24R está en pruebas pero utilizable","La pista 24R solo admite aproximaciones ILS"],a:0,e:"U/S = unserviceable: fuera de servicio. Tendrás que planificar otra aproximación."},
{q:"Un NOTAM con fecha C) “PERM” es…",o:["Permanente (hasta que se publique en la documentación oficial)","Pendiente de confirmar","Válido solo durante el día"],a:0,e:"PERM indica un cambio permanente. EST indica una hora de fin estimada."}]},

{id:"m5",title:"5. Cartas de navegación",lessons:[
{id:"l1",title:"Tipos de cartas y plano de aeródromo",html:`
<p>Las cartas son los "mapas" del piloto. Para un vuelo IFR usarás sobre todo:</p>
<ul><li><b>Plano de aeródromo</b>: pistas, calles de rodaje, plataformas y puntos calientes (hot spots).</li>
<li><b>SID</b> (Standard Instrument Departure): la salida desde la pista hasta la ruta.</li>
<li><b>Carta de ruta (en-route)</b>: aerovías y puntos entre aeropuertos.</li>
<li><b>STAR</b> (Standard Terminal Arrival Route): la llegada desde la ruta hasta la aproximación.</li>
<li><b>IAC</b> (carta de aproximación por instrumentos): ILS, RNP, VOR… hasta la pista.</li></ul>
${WARN("Importante","Las cartas de esta app están <b>dibujadas a mano y son ficticias</b>, solo para aprender a leerlas. Para volar usa las cartas oficiales del AIP de España (ENAIRE, gratuitas) o un proveedor como Navigraph/Chartfox.")}
<div class="svgwrap">${SVG.aero}</div><p class="cap">Plano de aeródromo (ficticio)</p>
<p>Fíjate: la pista se identifica por su <b>rumbo magnético dividido entre 10</b>. La pista 12 apunta a unos 120° y su extremo opuesto es la 30 (300°). Si hay pistas paralelas se añaden L, C, R (izquierda, centro, derecha).</p>`},
{id:"l2",title:"SID y STAR",html:`
<div class="svgwrap">${SVG.sid}</div><p class="cap">SID de ejemplo (ficticia)</p>
<p>Una SID te dice: desde qué pista sale, qué puntos sigues, qué <b>restricciones de altitud y velocidad</b> hay y cuál es la <b>altitud inicial</b> autorizada.</p>
<h3>Cómo se leen las restricciones</h3>
<ul><li>Cifra con línea <b>debajo</b> (<u>FL070</u>): a o <b>por encima</b>.</li><li>Cifra con línea <b>encima</b>: a o <b>por debajo</b>.</li><li>Línea encima y debajo: <b>exactamente</b> a esa altitud.</li></ul>
<div class="svgwrap">${SVG.star}</div><p class="cap">STAR de ejemplo (ficticia)</p>
<p>La STAR conecta la ruta con el inicio de la aproximación (IAF). Suele terminar en una espera (hold) por si el control necesita secuenciarte.</p>
${TIP("Nombre de los procedimientos","Una SID o STAR se llama con el punto donde termina/empieza + un número de versión + una letra: <b>AZAHR 1A</b>.")}`},
{id:"l3",title:"Aproximación (IAC) y carta de ruta",html:`
<div class="svgwrap">${SVG.iac}</div><p class="cap">Aproximación ILS de ejemplo (ficticia)</p>
<p>El <b>ILS</b> tiene dos señales: el <b>localizador (LOC)</b>, que te alinea con la pista, y la <b>senda de planeo (GS/G/S)</b>, normalmente de 3°. En la carta verás:</p>
<ul><li><b>IF/FAF</b>: punto intermedio y punto de aproximación final.</li><li><b>DA/DH</b>: altitud/altura de decisión: si no ves la pista, ¡motor y al aire!</li><li><b>Frustrada (missed approach)</b>: lo que haces si no aterrizas.</li><li><b>MSA</b>: altitud mínima de sector en un radio de 25 NM.</li></ul>
<div class="svgwrap">${SVG.enr}</div><p class="cap">Carta de ruta (ficticia)</p>
<p>Las <b>aerovías</b> (UN725, UM601…) son "autopistas" entre puntos o radioayudas, con rumbo, distancia y altitud mínima (MEA).</p>`}],
quiz:[
{q:"¿Qué carta usas para salir de la pista y llegar a la ruta?",o:["SID","STAR","IAC"],a:0,e:"SID = salida normalizada. STAR = llegada. IAC = aproximación."},
{q:"Una restricción con línea solo DEBAJO de “FL070” significa…",o:["A o por encima de FL070","A o por debajo de FL070","Exactamente FL070"],a:0,e:"Línea debajo = mínimo (a o por encima). Línea encima = máximo. Las dos = exacta."},
{q:"La pista opuesta a la 12 es la…",o:["30","21","06"],a:0,e:"120° + 180° = 300° → pista 30."},
{q:"¿Qué haces si llegas a la DA/DH sin ver la pista?",o:["Ejecutar la aproximación frustrada","Seguir bajando hasta verla","Mantener la DA hasta que mejore"],a:0,e:"En la DA/DH sin referencias visuales se inicia la frustrada publicada."},
{q:"El localizador (LOC) de un ILS te guía…",o:["Lateralmente hacia el eje de pista","Verticalmente en la senda de 3°","Hacia el aparcamiento"],a:0,e:"LOC = guía lateral. La guía vertical la da la senda de planeo (glide slope)."},
{q:"En una carta de aeródromo, un “hot spot” es…",o:["Un punto con riesgo de confusión o incursión en pista","Una zona de la plataforma donde hace más calor","El lugar donde se reposta"],a:0,e:"Los hot spots marcan puntos con historial o riesgo de errores de rodaje o incursiones en pista."},
{q:"¿Qué es la MSA?",o:["La altitud mínima de sector alrededor de un punto de referencia","La máxima altitud de salida","La velocidad máxima en la STAR"],a:0,e:"MSA = Minimum Sector Altitude, normalmente en un radio de 25 NM."}]},

{id:"m6",title:"6. Peso y centrado",lessons:[
{id:"l1",title:"Pesos del avión y el centro de gravedad",html:`
<p>Un avión no puede despegar con cualquier peso ni con la carga mal repartida. Los pesos clave (siglas en inglés):</p>
<table>
<tr><td><b>DOW</b></td><td>Peso operativo en seco: avión + tripulación + equipamiento, sin combustible ni carga de pago.</td></tr>
<tr><td><b>Payload</b></td><td>Carga de pago: pasajeros, equipaje y carga.</td></tr>
<tr><td><b>ZFW</b></td><td>Peso sin combustible = DOW + payload. ¡Lo meterás en el FMS!</td></tr>
<tr><td><b>TOW</b></td><td>Peso al despegue = ZFW + combustible de despegue (block − taxi).</td></tr>
<tr><td><b>LW</b></td><td>Peso al aterrizaje = TOW − combustible consumido en ruta (trip).</td></tr></table>
<p>Cada uno tiene un <b>máximo</b> (MZFW, MTOW, MLW) que no se puede superar.</p>
<h3>Centro de gravedad (CG)</h3>
<p>Es el punto donde el avión "se equilibraría". Se expresa en <b>% MAC</b> (porcentaje de la cuerda aerodinámica media). Tiene que estar dentro de unos límites delantero y trasero:</p>
<ul><li>CG <b>muy adelantado</b>: el avión pesa de morro, cuesta rotar y consume más.</li><li>CG <b>muy atrasado</b>: el avión se vuelve inestable. Muy peligroso.</li></ul>
<p>Con el CG calculas el <b>trim</b> de despegue (en Airbus, el ajuste del THS; en Boeing, las unidades de trim del estabilizador).</p>
${TOOL("#/t/wb","⚖️ Abrir la calculadora de peso y centrado")}
${TIP("En el simulador","SimBrief te da ZFW, combustible y pesos. En aviones de estudio (Fenix, PMDG…), el EFB calcula el CG por ti.")}`}],
quiz:[
{q:"ZFW es…",o:["El peso del avión cargado pero sin combustible","El peso máximo al despegue","El peso del combustible del viaje"],a:0,e:"Zero Fuel Weight = DOW + payload."},
{q:"TOW se calcula como…",o:["ZFW + combustible a bordo al despegue","DOW + combustible","LW + payload"],a:0,e:"Peso de despegue = peso sin combustible + combustible que llevas al iniciar la carrera."},
{q:"¿Qué pasa si el CG está demasiado atrasado?",o:["El avión se vuelve inestable y peligroso","El avión consume menos y es más seguro","No influye mientras no se supere el MTOW"],a:0,e:"Un CG por detrás del límite trasero reduce la estabilidad longitudinal: es peligroso."},
{q:"El CG se expresa normalmente en…",o:["% MAC","Kilogramos","Grados"],a:0,e:"Porcentaje de la cuerda aerodinámica media (Mean Aerodynamic Chord)."},
{q:"Si el peso de aterrizaje previsto supera el MLW…",o:["Hay que reducir carga o combustible (o planificar consumo) para no superarlo","Se aterriza igual porque el MLW es solo orientativo","Basta con usar más flaps"],a:0,e:"Los pesos máximos son limitaciones: se replanifica la carga o el combustible."}]},

{id:"m7",title:"7. Plan de vuelo y combustible",lessons:[
{id:"l1",title:"El plan de vuelo (FPL) y el OFP",html:`
<p>Hay dos documentos que se confunden:</p>
<ul><li><b>FPL (plan de vuelo OACI)</b>: lo que se envía al control: indicativo, tipo de avión, equipos, aeropuertos, hora, velocidad, nivel, <b>ruta</b> y alternativos.</li>
<li><b>OFP (plan operacional de vuelo)</b>: el documento de la tripulación, punto por punto: rumbo, distancia, tiempo estimado (ETO/ETA), viento, combustible previsto en cada punto.</li></ul>
${EX("Ruta de ejemplo (ficticia) LEVC → LEBL","<code>LEVC AZAHR1A AZAHR UN725 MARTA MARTA2B LEBL</code><br>SID AZAHR 1A → aerovía UN725 hasta MARTA → STAR MARTA 2B. Crucero de ejemplo: FL240.")}
<h3>Leer una línea del OFP</h3>
<table><tr><th>Punto</th><th>FL</th><th>Rumbo</th><th>Dist</th><th>ETO</th><th>Comb.</th></tr>
<tr><td>AZAHR</td><td>CLB</td><td>045</td><td>32</td><td>10:42</td><td>4.1</td></tr>
<tr><td>MARTA</td><td>240</td><td>072</td><td>135</td><td>11:05</td><td>2.9</td></tr></table>
<p class="sm mu">Valores de ejemplo, no reales. El combustible va en toneladas restantes.</p>
<p>Durante el vuelo compruebas que llegas a cada punto a la hora y con el combustible previstos.</p>`},
{id:"l2",title:"Cálculo de combustible",html:`
<p>El combustible se planifica por partes (esquema típico europeo para reactores):</p>
<table>
<tr><td><b>Taxi</b></td><td>Lo que gastas rodando.</td></tr>
<tr><td><b>Trip</b></td><td>Del despegue al aterrizaje en destino.</td></tr>
<tr><td><b>Contingencia</b></td><td>Para imprevistos; normalmente un 5 % del trip (con mínimos y variantes según normativa).</td></tr>
<tr><td><b>Alternativo</b></td><td>Para ir del destino al aeropuerto alternativo.</td></tr>
<tr><td><b>Reserva final</b></td><td>30 minutos en espera a 1.500 ft sobre el alternativo.</td></tr>
<tr><td><b>Extra / discrecional</b></td><td>Lo que decida el comandante (tormentas, esperas…).</td></tr></table>
<p><b>Block fuel</b> = la suma de todo. Es lo que cargas en el avión.</p>
${TIP("SimBrief","En SimBrief eliges avión, ruta y nivel y te genera el OFP con todos estos valores. Después los importas al FMS del simulador.")}`}],
quiz:[
{q:"¿Qué documento se envía al control de tránsito aéreo?",o:["El FPL (plan de vuelo OACI)","El OFP de la tripulación","La hoja de carga (loadsheet)"],a:0,e:"El FPL es el que recibe el ATC. El OFP es el documento operacional interno."},
{q:"El combustible “trip” es…",o:["El necesario del despegue al aterrizaje en destino","El que se gasta rodando","La reserva de 30 minutos"],a:0,e:"Trip = del despegue al aterrizaje en destino."},
{q:"La reserva final de un reactor equivale a…",o:["30 minutos de espera a 1.500 ft sobre el aeródromo","10 % del combustible total","Lo que sobre al llegar"],a:0,e:"Final reserve: 30 min a 1.500 ft sobre el alternativo (o destino si no hay alternativo) para aviones de turbina."},
{q:"¿Qué es el “block fuel”?",o:["El combustible total cargado antes de arrancar","El combustible que queda al aterrizar","El combustible de contingencia"],a:0,e:"Block = taxi + trip + contingencia + alternativo + reserva final + extra."},
{q:"En una ruta “LEVC AZAHR1A AZAHR UN725 MARTA…”, “UN725” es…",o:["Una aerovía","Una SID","Un aeropuerto"],a:0,e:"Las aerovías tienen letras y números (UN725). AZAHR1A es la SID."},
{q:"ETO en un OFP significa…",o:["Hora estimada sobre un punto","Combustible estimado al aterrizar","Tiempo total de vuelo"],a:0,e:"Estimated Time Over: hora prevista de paso por cada punto."}]},

{id:"m8",title:"8. El EFB y el briefing",lessons:[
{id:"l1",title:"La tableta del piloto (EFB)",html:`
<p>El <b>EFB</b> (Electronic Flight Bag) es la tableta que sustituye al maletín de papel. En ella el piloto tiene:</p>
<ul><li>Cartas de navegación (con la posición del avión en el plano de aeródromo).</li><li>El OFP, METAR/TAF, NOTAM y mapas de tiempo.</li><li>Calculadoras de <b>prestaciones</b> de despegue y aterrizaje (velocidades V1/VR/V2, flaps, empuje reducido).</li><li>Peso y centrado (loadsheet) y manuales (FCOM, checklists).</li></ul>
<h3>Tu EFB en el simulador</h3>
<ul><li>Muchos aviones de MSFS traen una tableta integrada (A320 de FlyByWire, Fenix, PMDG…).</li><li>Fuera del simulador puedes usar SimBrief (OFP gratuito), las cartas de ENAIRE (gratuitas) o Navigraph (de pago).</li><li>¡Y esta app puede ser tu EFB de estudio! 😉</li></ul>
<h3>El briefing: orden recomendado</h3><ol><li>OFP: ruta, nivel, tiempo y combustible.</li><li>Meteo: METAR/TAF de salida, destino y alternativos + SIGWX.</li><li>NOTAM.</li><li>Peso y centrado.</li><li>Cartas: plano de salida, SID, STAR y aproximación prevista.</li><li>Prestaciones de despegue.</li></ol>`}],
quiz:[
{q:"¿Qué es un EFB?",o:["Una tableta electrónica con cartas, documentos y cálculos para el piloto","El ordenador de gestión de vuelo del avión","Un sistema de frenos electrónicos"],a:0,e:"Electronic Flight Bag: el maletín electrónico del piloto. El ordenador de vuelo es el FMS."},
{q:"¿Qué calcula la herramienta de prestaciones del EFB?",o:["V1, VR, V2, flaps y empuje de despegue","La ruta óptima entre aeropuertos","El código de transpondedor"],a:0,e:"El módulo de performance calcula velocidades y configuración según peso, pista y meteo."},
{q:"¿Qué servicio gratuito genera un OFP para el simulador?",o:["SimBrief","Flightradar24","Google Maps"],a:0,e:"SimBrief (de Navigraph) genera planes de vuelo gratis para simulador."},
{q:"¿Qué va primero en un briefing ordenado?",o:["Revisar el OFP: ruta, nivel, tiempo y combustible","Arrancar motores","Pedir autorización de rodaje"],a:0,e:"Primero se planifica (OFP, meteo, NOTAM, pesos, cartas). Arrancar y rodar va mucho después."}]},

{id:"m9",title:"9. Programar un vuelo desde cero",lessons:[
{id:"l1",title:"Las fases del vuelo",html:`
<ol><li><b>Preparación</b>: briefing, encendido del avión, programación del FMS.</li>
<li><b>Autorización (clearance)</b>: el ATC te da SID, altitud inicial y código de transpondedor.</li>
<li><b>Pushback y arranque de motores.</b></li><li><b>Rodaje</b> hasta el punto de espera de la pista.</li>
<li><b>Despegue</b> y ascenso siguiendo la SID.</li><li><b>Crucero</b> en tu nivel.</li>
<li><b>Descenso</b>: prepara la llegada (STAR + aproximación) unos 30 min antes. Regla rápida: empieza a bajar a unas 3 NM por cada 1.000 ft a perder.</li>
<li><b>Aproximación y aterrizaje.</b></li><li><b>Rodaje a parking y apagado.</b></li></ol>
${EX("Regla de 3","De FL240 (24.000 ft) a un aeropuerto casi a nivel del mar: 24 × 3 = 72 NM antes, más un margen para decelerar.")}`},
{id:"l2",title:"Cómo se programa el FMS (orden universal)",html:`
<p>Tanto en Airbus (MCDU) como en Boeing (CDU/FMC) el orden lógico es el mismo. Una regla para recordarlo en Boeing es <b>"I-P-R-D-P-T"</b>:</p>
<table>
<tr><th>Qué</th><th>Airbus (MCDU)</th><th>Boeing (CDU)</th></tr>
<tr><td>Comprobar base de datos</td><td>DATA / estado</td><td>IDENT</td></tr>
<tr><td>Posición</td><td>INIT A (alineación IRS)</td><td>POS INIT</td></tr>
<tr><td>Origen, destino, vuelo</td><td>INIT A</td><td>RTE</td></tr>
<tr><td>Ruta, SID y STAR</td><td>F-PLN (+ lateral revision)</td><td>RTE + DEP/ARR</td></tr>
<tr><td>Pesos y combustible</td><td>INIT B / FUEL PRED</td><td>PERF INIT</td></tr>
<tr><td>Despegue</td><td>PERF TAKE OFF</td><td>THRUST LIM + TAKEOFF REF</td></tr></table>
<p>Después: radioayudas (RAD NAV en Airbus, NAV RAD en Boeing), panel del piloto automático (FCU/MCP) y comprobación cruzada.</p>
<p>En cada curso de avión tienes la programación completa <b>paso a paso</b> de un vuelo de ejemplo <b>Valencia (LEVC) → Barcelona (LEBL)</b>, y el panel interactivo para practicarlo.</p>
${WARN("Datos de ejemplo","Los nombres de SID/STAR y puntos (AZAHR, MARTA…) del ejemplo son <b>ficticios</b>. En el simulador carga una ruta real de SimBrief con el ciclo AIRAC de tu simulador.")}`}],
quiz:[
{q:"¿Qué te da el ATC en la autorización (clearance) antes de rodar?",o:["SID, altitud inicial y código de transpondedor","La hora de aterrizaje y la puerta de llegada","El peso de despegue y el CG"],a:0,e:"La autorización incluye destino, SID, altitud inicial y squawk (y a veces frecuencia de salida)."},
{q:"Según la regla de 3, desde FL300 ¿a qué distancia aproximada empiezas a bajar a un aeropuerto al nivel del mar?",o:["Unas 90 NM","Unas 30 NM","Unas 300 NM"],a:0,e:"30 (miles de pies) × 3 = 90 NM, más margen para reducir velocidad."},
{q:"En Boeing, ¿en qué página del CDU se introducen ZFW y combustible de reserva?",o:["PERF INIT","POS INIT","IDENT"],a:0,e:"PERF INIT recoge pesos, reservas, cost index y nivel de crucero."},
{q:"En Airbus, ¿dónde se introducen origen y destino?",o:["INIT A","PERF TAKE OFF","RAD NAV"],a:0,e:"INIT (página A) recoge FROM/TO, número de vuelo, cost index y nivel de crucero."},
{q:"¿Qué se programa antes en el FMS?",o:["La ruta (origen, destino, SID, aerovías)","Las velocidades de aproximación en destino","La frecuencia de la torre de llegada"],a:0,e:"Primero la ruta y pesos; los datos de aproximación se preparan antes del descenso."}]}
]});

/* ---------- Ayudantes para definir paneles ---------- */
// pb: pulsador con dos "luces" (arriba/abajo). st = {estado:[[txt,color],[txt,color]]}
const pb=(id,lb,v,st,info)=>({id,lb,k:'pb',v,st,info});
const sel=(id,lb,p,v,info)=>({id,lb,k:'sel',p,v,info});
const lev=(id,lb,p,v,info,cls)=>({id,lb,k:'lev',p,v,info,cls});
const tg=(id,lb,p,v,info)=>({id,lb,k:'tg',p,v,info});
const key=(id,lb)=>({id,lb,k:'key'});
const disp=(id,lb,v,info)=>({id,lb,k:'disp',v,info});
const LSK=p=>['L1','L2','L3','L4','L5','L6','R1','R2','R3','R4','R5','R6'].map(x=>key(p+x,x));
// estados típicos
const S_OFFW={OFF:[['',''],['OFF','w']],ON:[['','d'],['ON','d']],AUTO:[['','d'],['AUTO','d']]}; // Airbus: luz blanca OFF = no normal
const S_ONB={OFF:[['',''],['','d']],ON:[['',''],['ON','b']]};
const S_AVAIL={AVAIL:[['AVAIL','g'],['','']],ON:[['',''],['ON','b']],OFF:[['',''],['','']]};
// Pantalla de CDU/MCDU: rows = [[etiquetaIzq, etiquetaDer],[datoIzq, datoDer]] ... colores {o} ámbar {c} cian {g} verde {m} magenta {w} blanco
const _vis=s=>s.replace(/\{[ocgmws]\}|\{\/\}/g,'');
const _col=s=>s.replace(/\{([ocgmws])\}/g,(m,c)=>`<span class="${c==='w'?'':c==='s'?'s':c==='g'?'gr':c}">`).replace(/\{\/\}/g,'</span>');
const _row=(l,r,w=24)=>{l=l||'';r=r||'';const n=Math.max(1,w-_vis(l).length-_vis(r).length);return _col(l)+' '.repeat(n)+_col(r);};
function cdu(title,rows,sp){const out=[`<span class="t">${_col(title)}</span>`];for(let i=0;i<6;i++){const r=rows[i]||[['',''],['','']];out.push('<span class="s">'+_row(r[0][0],r[0][1])+'</span>');out.push(_row(r[1][0],r[1][1]));}out.push(_col(sp?'{c}'+sp+'{/}':''));return out;}
