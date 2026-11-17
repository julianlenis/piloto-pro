/* v7: A350 curso completo (amplía la introducción) */
(()=>{const Q=(arr)=>arr.map(([q,o,e])=>({q,o,a:0,e}));const c=PP.courses.find(x=>x.id==='a350');
Object.assign(c,{level:'full',sub:'Curso completo: sistemas, MFD/FMS, panel interactivo con dos flujos y examen final',panel:'a350',final:{n:20,pass:75}});
c.modules[0].quiz.push(...Q([
["¿Cuándo entró en servicio el A350?",["En 2015","En 2005","En 1995"],"Con Qatar Airways, en enero de 2015."],
["¿Qué versión del A350 es más larga?",["A350-1000","A350-900","A350-800"],"El -1000 es la versión alargada."],
["¿Cuántas ruedas tiene cada pata principal del A350-1000?",["Seis","Cuatro","Ocho"],"El -900 lleva cuatro; el -1000, seis."],
["¿Qué aerolínea española opera el A350-900?",["Iberia","Vueling","Volotea"],"Iberia opera el A350-900 en largo radio."]]));
c.modules.push(
{id:'m2',title:'2. Sistemas del A350',lessons:[{id:'l1',title:'Electricidad, aire, combustible y frenos',html:`
<ul><li><b>Baterías</b>: dos principales (BAT 1 y 2) y dos de emergencia (BAT EMER 1 y 2), además de la del APU.</li>
<li><b>Aire</b>: a diferencia del 787, el A350 <b>sí usa aire sangrado</b> de motores y APU para packs, presurización, anti-hielo de alas y arranque.</li>
<li><b>Hidráulico</b>: dos sistemas (verde y amarillo) a 5.000 psi, más actuadores eléctricos de respaldo (2H/2E).</li>
<li><b>Combustible</b>: tanques de ala izquierdo y derecho y tanque central, con dos bombas en cada ala y dos en el central.</li>
<li><b>Frenos</b>: autobrake con <b>RTO</b> para el despegue y <b>BTV</b> (Brake To Vacate) para aterrizar: eliges la salida de pista y el avión frena lo justo para llegar a ella.</li>
<li><b>Emergencia</b>: RAT (turbina de aire de impacto) que da energía hidráulica/eléctrica si fallan los motores.</li></ul>`}],
 quiz:Q([
["¿Cuántas baterías de emergencia tiene el A350 (además de las principales)?",["Dos","Ninguna","Cuatro"],"BAT EMER 1 y BAT EMER 2."],
["¿El A350 usa aire sangrado de los motores?",["Sí, para packs, presurización, anti-hielo y arranque","No, es bleedless como el 787","Solo en tierra"],"El diseño bleedless es exclusivo del 787 entre estos aviones."],
["¿A qué presión trabajan los hidráulicos del A350?",["5.000 psi","3.000 psi","1.000 psi"],"Igual que el 787 y el A380."],
["¿Qué significa 2H/2E?",["Dos sistemas hidráulicos y dos de respaldo eléctrico","Dos motores y dos hélices","Dos horas de autonomía eléctrica"],"Arquitectura de mandos con respaldo eléctrico (EHA/EBHA)."],
["¿Qué hace BTV?",["Frena para salir por la calle de rodaje elegida","Aumenta el empuje de despegue","Bloquea el tren"],"Brake To Vacate."],
["¿Qué se arma antes de despegar en el A350 para un despegue abortado?",["RTO","BTV","LO"],"Rejected Take-Off."],
["¿Qué es la RAT?",["Una turbina que sale con el aire para dar energía de emergencia","Un radar de tráfico","El sistema de combustible"],"Ram Air Turbine."],
["¿Cuántas bombas de combustible hay en cada ala del A350 (en el panel)?",["Dos","Una","Cinco"],"Dos por ala y dos en el central."]])},
{id:'m3',title:'3. Cabina, MFD y automatismos',lessons:[{id:'l1',title:'Pantallas, KCCU y FCU',html:`
<p>La cabina tiene <b>seis pantallas iguales</b>: PFD y ND delante de cada piloto, el <b>E/WD</b> (motores y avisos ECAM) en el centro y el <b>SD</b> (sistemas) debajo; además, <b>MFD</b> para el FMS y <b>OIS</b> (información a bordo, como el EFB integrado).</p>
<p>El FMS se maneja con el <b>KCCU</b> (teclado y bola de cursor): seleccionas un campo con el cursor y escribes. Páginas clave: <b>ACTIVE/INIT</b>, <b>F-PLN</b>, <b>FUEL&LOAD</b>, <b>PERF</b>, <b>NAVAIDS</b>.</p>
<p>El <b>FCU</b> funciona como en el A320: empujar = gestionado, tirar = seleccionado. Modos: SRS, NAV, CLB, DES, APPR, LOC, G/S…</p>
${TIP('En esta app','El MFD se representa con teclas y botones laterales. En el simulador harás lo mismo con el cursor.')}`}],
 quiz:Q([
["¿Cuántas pantallas grandes iguales tiene la cabina del A350?",["Seis","Cuatro","Ocho"],"Seis pantallas intercambiables."],
["¿Qué es el KCCU?",["Teclado y cursor para manejar las pantallas","Un sistema de presurización","La unidad de control de flaps"],"Keyboard and Cursor Control Unit."],
["¿En qué página del MFD se introducen ZFW y BLOCK?",["FUEL&LOAD","F-PLN","NAVAIDS"],"Como el INIT B del A320."],
["¿Qué muestra el E/WD?",["Motores y avisos ECAM","El plan de vuelo","El radar"],"Engine/Warning Display."],
["En el FCU del A350, tirar del botón ALT significa…",["Modo seleccionado (OP CLB / OP DES)","Modo gestionado","Desconectar el AP"],"Igual que en el A320."],
["¿Qué es el OIS?",["El sistema de información a bordo (documentación, prestaciones)","El ordenador de mandos","El sistema de oxígeno"],"Onboard Information System."],
["¿Qué página del MFD equivale al INIT A del A320?",["ACTIVE/INIT","PERF","POSITION"],"Ahí se ponen vuelo, origen/destino, CI y nivel de crucero."],
["En la app, ¿qué ruta de ejemplo programamos en el A350?",["LEMD → LEBL","LEVC → LEBL","LEBL → LEMD"],"Madrid → Barcelona saliendo por la 36L."]])},
{id:'m4',title:'4. Del cold & dark al rodaje (panel)',lessons:[{id:'l1',title:'El flujo del A350 explicado',html:`${SIMNOTE}
<ol><li>Freno de aparcamiento y las <b>cuatro baterías</b>.</li><li><b>EXT 1</b>, luces NAV y <b>ADIRS</b> a NAV.</li><li>Oxígeno, sondas, señales.</li><li><b>APU</b> MASTER y START → AVAIL, APU BLEED, desconectar EXT.</li><li>Seis <b>bombas</b> de combustible.</li><li><b>MFD</b>: INIT, F-PLN (36L, SID, aerovía, llegada), FUEL&LOAD, PERF T.O.</li><li><b>FCU</b>: QNH, FD, altitud.</li><li>Transpondedor, pushback, BEACON, <b>arranque</b> (IGN/START, ENG 2, ENG 1).</li><li>Después del arranque y rodaje.</li></ol>
${TOOL('#/p/a350','🎛️ Abrir el panel del A350')}`}],
 quiz:Q([
["¿Qué es lo primero que se hace en la cabina oscura?",["Comprobar/poner el freno de aparcamiento","Arrancar el APU","Encender las bombas"],"Seguridad ante todo."],
["¿Por qué se desconecta EXT 1 tras arrancar el APU?",["Porque el generador del APU toma la carga y se puede retirar el cable","Porque el APU no funciona con tierra","Para arrancar motores con electricidad"],"Como en el A320."],
["¿Qué motor se arranca primero en el panel?",["El 2","El 1","Los dos a la vez"],"Convención habitual (como en el A320)."],
["¿Qué se apaga después del arranque?",["APU BLEED y APU","Las baterías","Los ADIRS"],"Los motores ya dan aire y electricidad."],
["¿Por qué Madrid obliga a vigilar el altímetro al poner el QNH?",["Porque el aeropuerto está a unos 2.000 ft de elevación","Porque está bajo el nivel del mar","Porque no tiene QNH"],"Debe marcar aprox. la elevación del aeropuerto."],
["¿Qué selector pones en IGN/START para arrancar?",["ENG MODE","FLAPS","AUTO BRK"],"Prepara el arranque automático."]])},
{id:'m5',title:'5. FMS: programar LEMD → LEBL',lessons:[{id:'l1',title:'Programación paso a paso en el MFD',html:`
<ol><li><b>ACTIVE/INIT</b>: FLT NBR, FROM/TO LEMD/LEBL, ALTN LEGE, CRZ FL300, CI 40 (ejemplo).</li>
<li><b>F-PLN</b>: revisión lateral en LEMD → DEPARTURE 36L + SID (ficticia TALAR1N); AIRWAYS hasta MARTA; revisión en LEBL → ARRIVAL ILS24R + STAR.</li>
<li><b>FUEL&LOAD</b>: ZFW, ZFWCG y BLOCK del OFP.</li><li><b>PERF</b> T.O: V1/VR/V2, FLAPS/THS, FLEX, THR RED/ACC.</li><li><b>NAVAIDS</b>: comprobar radioayudas.</li>
<li>En crucero: <b>PERF APPR</b> (QNH, OAT, viento, mínimos) y, si el control lo da, <b>DIR TO</b>.</li></ol>
${WARN('Datos de ejemplo','Pesos, velocidades y procedimientos son inventados para aprender.')}`}],
 quiz:Q([
["¿Dónde se elige la SID en el A350?",["En F-PLN, revisión lateral del aeropuerto de salida → DEPARTURE","En FUEL&LOAD","En NAVAIDS"],"Igual concepto que el A320."],
["¿Qué página se rellena en crucero con el ATIS del destino?",["PERF APPR","ACTIVE/INIT","FUEL&LOAD"],"QNH, OAT, viento, mínimos."],
["¿Qué hace DIR TO?",["Vuela directo al punto elegido","Borra todo el plan de vuelo","Cambia el destino"],"Direct To."],
["¿Qué son V1, VR y V2?",["Decisión, rotación y velocidad segura con un motor","Velocidades de crucero","Velocidades de aterrizaje"],"Se introducen en PERF T.O."],
["¿Qué es THR RED/ACC?",["Altitudes de reducción de empuje y de aceleración","El trim del estabilizador","La temperatura flexible"],"Ejemplo 1500/1500 ft."],
["¿Qué es el CI (cost index)?",["Equilibrio entre coste del tiempo y del combustible","El índice de carga de pasajeros","El código de la compañía"],"CI bajo = más ahorro de combustible, más lento."]])},
{id:'m6',title:'6. Vuelo completo: del rodaje al apagado (panel)',lessons:[{id:'l1',title:'El vuelo completo en el A350',html:`${SIMNOTE}
<p>El flujo 2 del panel: RTO, T.O CONFIG, luces de pista, FLX/MCT, rotación, tren, CL, AP, flaps, STD, FL300, PERF APPR, DIR TO, descenso, QNH, APPR, flaps y tren, spoilers, <b>BTV</b>, aterrizaje con RETARD y reversas, y apagado completo hasta cold & dark.</p>
${TOOL('#/p/a350','🎛️ Abrir el panel (flujo 2)')}`}],
 quiz:Q([
["¿Qué modo de frenado automático ayuda a salir por una calle concreta?",["BTV","RTO","HI"],"Brake To Vacate."],
["Tras tocar la pista, ¿qué se usa además de los frenos?",["Reversas","Flaps arriba de inmediato","Tren arriba"],"Reversas hasta 70 kt y luego IDLE."],
["¿Qué palancas indican “LVR CLB” tras el despegue?",["Las de empuje, a CL","Las de flaps","La del tren"],"A la altitud de reducción."],
["¿Cuándo se ponen las luces LAND en OFF en subida?",["Por encima de FL100","Al despegar","En crucero solamente"],"Bajo FL100 se llevan encendidas."]])});
})();
