/* Escuela v5: lecciones nuevas (NOTAM, cartas, OFP, combustible, ETA, T/D, viento y SIGWX) */
(()=>{const E=PP.courses.find(c=>c.id==='escuela');const M=id=>E.modules.find(m=>m.id===id);
M('m3').lessons.push({id:'l4',title:'Barbas de viento y mapa SIGWX',html:`
<p>En los mapas de viento en altura (<b>WINTEM</b>) y en los mapas de tiempo significativo (<b>SIGWX</b>) la información se dibuja con símbolos. Aprenderlos te ahorra mucho tiempo en el briefing.</p>
<h3>Barbas de viento</h3>${SV2.barbs}
<ul><li>El <b>mástil</b> apunta hacia <b>de dónde viene</b> el viento (igual que en el METAR).</li><li><b>Media barba</b> = 5 kt, <b>barba entera</b> = 10 kt, <b>banderín</b> (triángulo) = 50 kt. Se suman.</li><li>Ejemplo: un banderín + una barba + media barba = 50 + 10 + 5 = <b>65 kt</b>.</li></ul>
<h3>Mapa SIGWX</h3>${SV2.sigwx}
<table><tr><td>Línea festoneada roja</td><td>Zona de nubes de tormenta (CB). <b>ISOL</b> aisladas, <b>OCNL</b> ocasionales, <b>FRQ</b> frecuentes, <b>EMBD</b> embebidas en otras nubes (no se ven). <code>XXX/080</code> = cima por encima del mapa, base FL080.</td></tr>
<tr><td>Flecha gruesa</td><td>Corriente en chorro (jet stream) con su nivel y velocidad, dibujada con barbas.</td></tr>
<tr><td>Símbolo “^”</td><td>Turbulencia (uno = moderada, doble = fuerte). CAT = turbulencia en aire claro, sin nubes.</td></tr>
<tr><td>Símbolo de engelamiento</td><td>Hielo en las nubes, con los niveles afectados.</td></tr>
<tr><td>Recuadro con número</td><td>Altura de la tropopausa en cientos de pies (380 = FL380).</td></tr>
<tr><td>Triángulos azules / semicírculos rojos</td><td>Frente frío / frente cálido.</td></tr></table>
${WARN('Mapa ilustrativo','Es un dibujo propio simplificado. Los SIGWX reales los publican los centros mundiales de pronóstico (WAFC) y en España se consultan en AEMET.')}`});
M('m4').lessons.push({id:'l2',title:'Códigos Q y decodificador de NOTAM',html:`
<p>El <b>código Q</b> (5 letras, empieza por Q) resume de qué trata el NOTAM: letras 2–3 = <b>qué</b> está afectado, letras 4–5 = <b>qué le pasa</b>.</p>
<table><tr><th>Letras 2–3</th><th>Qué</th></tr><tr><td>MR</td><td>Pista</td></tr><tr><td>MX</td><td>Calle de rodaje</td></tr><tr><td>IC / IL / IG</td><td>ILS / localizador / senda de planeo</td></tr><tr><td>NV / ND / NB</td><td>VOR / DME / NDB</td></tr><tr><td>LR / LA</td><td>Luces de pista / luces de aproximación</td></tr><tr><td>OB / OL</td><td>Obstáculo / luces de obstáculo</td></tr><tr><td>RD / RR / RP</td><td>Zona peligrosa / restringida / prohibida</td></tr><tr><td>PI / PD / PA</td><td>Procedimiento de aproximación / SID / STAR</td></tr></table>
<table><tr><th>Letras 4–5</th><th>Qué le pasa</th></tr><tr><td>LC</td><td>Cerrado</td></tr><tr><td>AS</td><td>Fuera de servicio</td></tr><tr><td>CA / CD</td><td>Activada / desactivada</td></tr><tr><td>CH</td><td>Cambiado</td></tr><tr><td>AH</td><td>Horario cambiado</td></tr><tr><td>LT</td><td>Limitado a…</td></tr><tr><td>XX</td><td>Ver el texto (lenguaje claro)</td></tr></table>
<p>Ejemplo: <code>QICAS</code> = ILS fuera de servicio. <code>QRRCA</code> = zona restringida activada. <code>QMXLC</code> = calle de rodaje cerrada.</p>
<h3>Resto de la línea Q</h3><p>Tráfico (<b>I</b> IFR, <b>V</b> VFR, <b>IV</b> ambos) · propósito (<b>N</b> atención inmediata, <b>B</b> boletín PIB, <b>O</b> operacional, <b>M</b> varios) · ámbito (<b>A</b> aeródromo, <b>E</b> en ruta, <b>W</b> aviso de navegación) · límites inferior/superior en niveles de vuelo · coordenadas y radio en NM.</p>
${TOOL('#/t/notam','📢 Abrir el decodificador de NOTAM')}${TOOL('#/t/notamq','✍️ Ejercicios de NOTAM')}
${TIP('Prioriza','En un briefing real hay decenas de NOTAM. Busca primero los que afectan a tu pista, tu ILS, tu SID/STAR y el combustible/servicios del aeropuerto.')}`});
M('m5').lessons.push({id:'l4',title:'Aproximación completa: mínimos, MSA y espera',html:`
<p>Vamos a leer una carta de aproximación de arriba abajo. Es <b>ficticia</b>, pero tiene las mismas partes que una real.</p>${SV2.iac}
<ol><li><b>Cabecera</b>: aeropuerto, procedimiento (ILS Z RWY 30), frecuencia del localizador (110.30), rumbo de acercamiento (300°), frecuencias de torre, elevación y altitud de transición.</li>
<li><b>MSA</b> (altitud mínima de sector): el círculo de arriba a la derecha. Da la altitud que garantiza 1.000 ft de margen sobre obstáculos en un radio de 25 NM del punto indicado, por sectores. Ejemplo: viniendo del sector oeste, 4.600 ft.</li>
<li><b>Vista en planta</b>: la trayectoria, el FAF (XAMEX) y la <b>espera</b> en LUPAX: acercamiento 300°, 1 minuto, altitud mínima de espera 4.000 ft.</li>
<li><b>Perfil</b>: a qué altitud cruzas cada punto. Aquí 2.000 ft en XAMEX (D6.0) y después la senda de 3°.</li>
<li><b>Caja de mínimos</b>: <b>DA(H) 282 (200)</b> = altitud de decisión 282 ft sobre el nivel del mar, que son 200 ft sobre el umbral. RVR mínima 550 m. Si solo funciona el localizador (LOC), la mínima es más alta: MDA 520 ft.</li></ol>
<h3>La espera (holding)</h3>${SV2.hold}
<p>Una espera es un circuito tipo hipódromo sobre un punto. Estándar: virajes a la derecha, 1 minuto por tramo hasta FL140. Según el rumbo con el que llegas al punto, entras de forma <b>directa</b>, <b>paralela</b> o en <b>gota</b> (desplazada). En el simulador, el FMS calcula la entrada por ti.</p>
${TOOL('#/t/cartasq','✍️ Ejercicios de lectura de cartas')}
${WARN('Solo para aprender','Carta y cifras inventadas. Para volar en el simulador usa las cartas oficiales del AIP de cada país (en España, el AIP de ENAIRE, gratuito) o las que incluya tu simulador.')}`},
{id:'l5',title:'Ejemplo real: Madrid-Barajas (LEMD)',html:`
<p>Madrid-Barajas es un buen ejemplo de aeropuerto grande y con “configuraciones”: según el viento se usan unas pistas para llegar y otras para salir.</p>${SV2.lemd}
<ul><li><b>4 pistas</b> en dos pares paralelos: <b>18L/36R</b> y <b>18R/36L</b> (orientadas norte-sur) y <b>14L/32R</b> y <b>14R/32L</b> (orientadas noroeste-sureste).</li><li>Fíjate en el nombre: la pista 14L es la misma que la 32R, vista desde el otro extremo. Volando hacia el sureste (rumbo 140°) la “L” queda a tu izquierda.</li>
<li><b>Configuración norte</b> (la más habitual): <b>aterrizajes por 32L/32R</b> y <b>despegues por 36L/36R</b>.</li>
<li><b>Configuración sur</b>: <b>aterrizajes por 18L/18R</b> y <b>despegues por 14L/14R</b>.</li>
<li>Elevación ≈ <b>2.000 ft</b>: el aeropuerto está alto, por eso el QNH y el QFE se diferencian bastante y en verano los despegues son más largos (aire caliente y menos denso).</li></ul>
${TIP('En el simulador','Antes de programar el FMS, mira en el ATIS o en el METAR el viento: con viento del norte espera llegar por la 32; con viento del sur, por la 18. Elige tu STAR y tu aproximación en consecuencia.')}
${WARN('Esquema simplificado','El dibujo no está a escala ni sirve para navegar. Las configuraciones y pistas en uso las decide el control según condiciones; consulta siempre las cartas oficiales del AIP y el ATIS.')}`});
M('m7').lessons.push({id:'l3',title:'El OFP paso a paso: tiempos, ETA y combustible',html:`
<p>El <b>OFP</b> (plan de vuelo operacional) junta todo en un documento: ruta, niveles, tiempos y combustible. Vamos a entender cómo se calculan sus números.</p>
<h3>1. Velocidad respecto al suelo (GS)</h3><p><b>GS = TAS ± componente de viento</b>. Con TAS 450 kt y 30 kt de viento en cara: GS = 420 kt. Con viento de cola, se suma.</p>
<h3>2. Tiempo y ETA</h3><p><b>Tiempo (min) = distancia (NM) ÷ GS × 60</b>. 140 NM a 420 kt = 20 min. Si despegas a las 10:05 UTC, la ETA a ese punto es 10:25 UTC.</p>
<h3>3. Combustible</h3><p><b>Trip = consumo por hora × tiempo</b>. Después se añade: taxi, contingencia (habitualmente el 5 % del trip, con un mínimo), alternativo, reserva final (30 min a 1.500 ft para reactores) y extra si el comandante lo decide.</p>
${EX('Ejemplo (cifras de ejemplo, no oficiales)','Trip 1.800 kg + contingencia 5 % 90 kg + alternativo 1.100 kg + reserva final 1.100 kg = 4.090 kg. + taxi 200 kg = <b>block 4.290 kg</b>.')}
${TOOL('#/t/ofp','🧾 Abrir el generador de OFP (LEVC→LEBL)')}${TOOL('#/t/fuel','⛽ Calculadora de combustible')}${TOOL('#/t/navq','✍️ Ejercicios de ETA, combustible y T/D')}`});
M('m9').lessons.push({id:'l3',title:'Planificar el descenso: el T/D',html:`
<p>El <b>T/D</b> (top of descent) es el punto donde empiezas a bajar desde el crucero. El FMS lo calcula, pero un buen piloto lo comprueba mentalmente.</p>${SV2.tod}
<h3>Regla del 3</h3><p><b>Distancia (NM) = altitud a perder (ft) ÷ 1.000 × 3</b>. De FL350 a una llegada a nivel del mar: 35 × 3 = <b>105 NM</b>. Añade unas 10 NM para reducir velocidad.</p>
<h3>Velocidad vertical</h3><p>Para una senda de unos 3°: <b>VS ≈ GS × 5</b>. A 440 kt de GS, unos 2.200 ft/min. En aproximación a 140 kt, unos 700 ft/min.</p>
${EX('Ejemplo','Crucero FL240, aeropuerto a 1.000 ft, debes cruzar 4.000 ft a 15 NM del aeropuerto. Altitud a perder: 24.000 − 4.000 = 20.000 ft → 60 NM antes de ese punto → T/D a unas 75 NM del aeropuerto.')}
${TOOL('#/t/navq','✍️ Practica con ejercicios de T/D')}`});
})();
