/* v7: 737 ampliado a 5 módulos y 60+ preguntas */
(()=>{const Q=(arr)=>arr.map(([q,o,e])=>({q,o,a:0,e}));const c=PP.courses.find(x=>x.id==='b737');const M=id=>c.modules.find(m=>m.id===id);
c.sub='Curso completo: sistemas, FMC y MCP, panel interactivo con dos flujos, procedimientos y examen';
M('m1').quiz.push(...Q([
["¿Qué generación del 737 es la “NG”?",["737-600, -700, -800 y -900","737-300, -400 y -500","737-100 y -200"],"Next Generation, de finales de los 90."],
["¿Qué motores lleva el 737 NG?",["CFM56-7B","CFM LEAP-1B","Pratt & Whitney JT8D"],"El MAX lleva LEAP-1B; los originales, JT8D."],
["¿Qué motores lleva el 737 MAX?",["CFM LEAP-1B","CFM56-7B","GEnx"],"LEAP-1B, más grandes y eficientes."],
["¿Cómo son los mandos de vuelo del 737?",["Mecánicos con cables y actuadores hidráulicos (no fly-by-wire)","Fly-by-wire con sidestick","Fly-by-wire con yoke"],"El 737 mantiene mandos convencionales con asistencia hidráulica."],
["¿Cuántos sistemas hidráulicos tiene el 737?",["A, B y standby","Verde, azul y amarillo","Izquierdo, central y derecho"],"Sistemas A y B (3.000 psi) más el standby."],
["En el 737 NG, el sistema A tiene la bomba del motor 1 y…",["La bomba eléctrica 2","La bomba eléctrica 1","Ninguna eléctrica"],"Cruzadas: A = ENG 1 + ELEC 2; B = ENG 2 + ELEC 1."],
["¿Cuántos generadores tiene el APU del 737?",["Uno, que puede alimentar las dos barras","Dos independientes","Ninguno"],"Un generador con dos interruptores (barra 1 y barra 2)."],
["¿Qué tanque se consume primero en el 737 si tiene combustible?",["El central","El tanque 1","El tanque 2"],"Las bombas centrales dan más presión, así que se gasta primero."],
["¿Cuántas bombas hay en cada tanque de ala del 737?",["Dos: FWD y AFT","Una","Tres"],"Delantera y trasera."],
["Una luz LOW PRESSURE en una bomba de combustible indica…",["Que la bomba no da presión (apagada o fallo)","Que el tanque está lleno","Que el combustible está frío"],"Al encender la bomba se apaga la luz."]]));
M('m2').quiz.push(...Q([
["¿Qué es N1 LIMIT en el FMC del 737?",["La página para elegir el empuje de despegue y subida","El límite de velocidad","La página de combustible"],"TO, TO-1, TO-2 y temperatura supuesta."],
["En un 737-800 con motores de 26K, TO-1 corresponde a…",["24K (empuje reducido)","28K","20K"],"Derates habituales: 26K / 24K / 22K."],
["¿Qué tecla del CDU muestra el progreso del vuelo y el combustible?",["PROG","LEGS","DEP ARR"],"PROG: tiempos, distancias y combustible estimado."],
["¿Qué significa que EXEC esté iluminada?",["Hay una modificación pendiente de ejecutar","El FMC ha fallado","El vuelo ha terminado"],"Revisa y pulsa EXEC para activarla."],
["¿Cuál es el orden típico de preparación del FMC Boeing?",["IDENT, POS INIT, RTE, DEP ARR, PERF INIT, N1 LIMIT, TAKEOFF","RTE, PERF, IDENT, POS","TAKEOFF, RTE, IDENT"],"Regla I-P-R-D-P-N-T."],
["¿Qué son CMD A y CMD B?",["Los dos pilotos automáticos del 737","Dos modos de autothrottle","Dos radios"],"Normalmente se usa uno; en aproximaciones CAT III, los dos."],
["En el MCP, LVL CHG hace que el avión…",["Cambie de nivel manteniendo la velocidad seleccionada","Mantenga la altitud actual","Siga el perfil del FMC"],"Level Change: como FLCH en el 787."],
["¿Qué es VNAV PTH?",["Descenso o crucero siguiendo el perfil vertical calculado","Modo de rumbo","Aproximación visual"],"VNAV path: sigue la senda vertical del FMC."],
["¿Dónde se ve la ruta y el perfil en el 737?",["En la ND (Navigation Display)","En el EICAS","En el panel de combustible"],"La ND muestra ruta, puntos y T/D."],
["¿Qué hace el autothrottle en modo N1?",["Mantiene el empuje de referencia (p. ej. subida)","Mantiene una velocidad","Reduce a ralentí"],"N1 = empuje de referencia; MCP SPD = velocidad."]]));
M('m3').quiz.push(...Q([
["¿Por qué se apagan los packs antes de arrancar motores en el 737?",["Para que todo el aire del APU vaya al arrancador","Para ahorrar combustible en vuelo","Porque hacen ruido"],"Más presión de conducto = arranque más fiable."],
["¿Cuándo se sube la START LEVER a IDLE en un 737 NG?",["A ~25 % N2 (o máximo motoring, mínimo 20 %)","Nada más girar el selector","Al 60 % N2"],"Luego se vigila EGT y que el arrancador se desconecte (~56 % N2)."],
["¿Qué se pone en el panel de presurización antes de volar?",["FLT ALT (crucero) y LAND ALT (elevación del destino)","El QNH","La velocidad de crucero"],"Olvidar LAND ALT o FLT ALT es un error clásico."],
["¿Cuánto tiempo antes de despegar debe estar encendido el WINDOW HEAT?",["Al menos 10 minutos","Justo al despegar","No hace falta"],"Así el cristal está caliente y más resistente."],
["¿Para qué sirve el YAW DAMPER?",["Para amortiguar el balanceo holandés (dutch roll)","Para frenar en tierra","Para calentar las sondas"],"Corrige oscilaciones de guiñada."],
["¿Cuándo se enciende PROBE HEAT en el 737 NG?",["Después de arrancar motores","Antes de conectar baterías","En crucero solamente"],"Se activa tras el arranque, antes del rodaje."],
["El selector ENG START en GRD…",["Abre la válvula del arrancador neumático","Corta el combustible","Activa la reversa"],"Al llegar a ~56 % N2 vuelve solo a OFF."]]));
c.modules.push({id:'m4',title:'4. Vuelo completo: del rodaje al apagado (panel)',lessons:[{id:'l1',title:'El vuelo completo en el 737',html:`${SIMNOTE}
<ol><li><b>Rodaje</b>: AUTO BRAKE RTO y lista before takeoff.</li><li><b>Pista</b>: POSITION en STROBE & STEADY, LANDING, RWY TURNOFF y TA/RA.</li>
<li><b>Despegue</b>: ~40 % N1 → TO/GA (N1 en el FMA), “V1, rotate”, tren UP y luego OFF.</li><li><b>Subida</b>: CMD A por encima de 400 ft (referencia de esta app), flaps 1 → UP, STD, FL240, luces fuera a FL100.</li>
<li><b>Llegada</b>: DEP ARR → ILS24R + STAR, LEGS, directo, APPROACH REF flaps 30.</li><li><b>Aproximación</b>: APP, flaps 1-5, tren, 15, 30, SPEED BRAKE ARMED, AUTO BRAKE 2.</li>
<li><b>Aterrizaje</b>: A/P OFF, IDLE, reversas.</li><li><b>Apagado</b>: APU, PARK BRAKE, START LEVERS CUTOFF, ANTI COLLISION OFF, bombas, ELEC PUMPS, WINDOW HEAT, PROBE HEAT, YAW DAMPER… hasta cold & dark.</li></ol>
${TOOL('#/p/b737','🎛️ Abrir el panel (flujo 2)')}`},
{id:'l2',title:'El MCP en vuelo: modos útiles',html:`<table><tr><td><b>LNAV</b></td><td>Sigue la ruta del FMC.</td></tr><tr><td><b>VNAV</b></td><td>Sigue el perfil vertical del FMC (VNAV SPD / VNAV PTH).</td></tr><tr><td><b>LVL CHG</b></td><td>Sube o baja a la altitud del MCP manteniendo velocidad.</td></tr><tr><td><b>V/S</b></td><td>Régimen vertical fijo.</td></tr><tr><td><b>HDG SEL</b></td><td>Vuela el rumbo del MCP (vectores del control).</td></tr><tr><td><b>APP</b></td><td>Arma LOC y G/S del ILS.</td></tr><tr><td><b>CWS</b></td><td>Control Wheel Steering: mueves el avión con el yoke y el AP mantiene la actitud.</td></tr></table>
${TIP('Lee el FMA','Después de cada cambio en el MCP, mira el FMA (arriba del PFD) para confirmar el modo activo y el armado.')}`}],
quiz:Q([
["Tras subir el tren en el 737, la palanca se pone en…",["OFF","DOWN","Se queda en UP siempre"],"OFF quita la presión hidráulica del sistema del tren."],
["¿En qué posición van las luces POSITION al entrar en pista?",["STROBE & STEADY","OFF","STEADY"],"Las estroboscópicas se encienden en pista."],
["¿Qué autobrake se pone para despegar?",["RTO","2","MAX"],"RTO frena automáticamente en un despegue abortado."],
["¿Qué modo del MCP usarías para vectores del control?",["HDG SEL","LNAV","VNAV"],"Vuelas el rumbo que te da el ATC."],
["¿Qué modo mantiene un régimen vertical fijo?",["V/S","LVL CHG","ALT HOLD"],"Vertical Speed."],
["¿Qué es CWS?",["Control Wheel Steering: mueves el avión con el yoke y el AP mantiene la actitud","Un sistema de alerta de cizalladura","El modo de crucero"],"Modo propio del 737."],
["Al terminar la aproximación, ¿qué flaps de aterrizaje usamos en el panel?",["30","5","1"],"15, 30 o 40 son flaps de aterrizaje en el 737."],
["¿Qué se apaga en el 737 para parar los motores?",["Las START LEVER a CUTOFF","El selector ENG START a GRD","El APU"],"Cutoff corta el combustible."],
["¿Por qué se conecta el APU GEN antes de parar motores?",["Para no quedarse sin corriente al parar los generadores","Para arrancar otra vez","Para cargar combustible"],"El APU toma el relevo eléctrico."],
["¿Qué debes mirar tras cada cambio en el MCP?",["El FMA","El reloj","La radio"],"El FMA confirma qué modo está activo."]])});
c.modules.push({id:'m5',title:'5. Sistemas avanzados, NG vs MAX y situaciones anormales',lessons:[{id:'l1',title:'Presurización, anti-hielo y avisos',html:`
<h3>Presurización</h3><p>En AUTO, el 737 controla la cabina con los valores de <b>FLT ALT</b> y <b>LAND ALT</b>. Si la altitud de cabina supera unos <b>10.000 ft</b>, suena la bocina de aviso de altitud de cabina: máscaras de oxígeno y descenso de emergencia.</p>
${WARN('Lección histórica','En el accidente de Helios 522 (2005) el selector de presurización se quedó en MANUAL tras un mantenimiento y la tripulación no reconoció el aviso de altitud de cabina. Por eso se insiste tanto en revisar el panel de presurización.')}
<h3>Anti-hielo</h3><p>ENG ANTI-ICE se usa en tierra y en vuelo con engelamiento (≤ 10 °C y humedad visible). WING ANTI-ICE en tierra para quitar escarcha ligera según el procedimiento y en vuelo cuando se acumula hielo.</p>
<h3>Avisos</h3><p><b>MASTER CAUTION</b> (ámbar) + el <b>anunciador de seis paquetes</b> (six-pack) te dicen qué sistema tiene el problema. <b>FIRE WARN</b> (rojo) es fuego. Primero vuela el avión, luego lee la checklist (QRH).</p>`},
{id:'l2',title:'737 NG vs 737 MAX',html:`<table><tr><th></th><th>NG</th><th>MAX</th></tr><tr><td>Motor</td><td>CFM56-7B</td><td>LEAP-1B (más grande)</td></tr><tr><td>Pantallas</td><td>6 pantallas</td><td>4 pantallas grandes</td></tr><tr><td>Winglets</td><td>Blended winglets (o split scimitar)</td><td>AT winglet</td></tr><tr><td>Mandos</td><td>Mecánicos</td><td>Mecánicos (spoilers con fly-by-wire)</td></tr><tr><td>Nombres</td><td>-600/-700/-800/-900</td><td>MAX 7, 8, 9 y 10</td></tr></table>
<p>El <b>MCAS</b> es un sistema del MAX que ajusta el trim para compensar el cambio de comportamiento en cabeceo con ángulos de ataque altos. Tras los accidentes de 2018 y 2019 se rediseñó (usa dos sensores de ángulo de ataque y tiene límites) antes de volver al servicio.</p>
${TIP('En el simulador','Los procedimientos normales del NG y del MAX son muy parecidos: lo que aprendes en el panel sirve para ambos.')}`}],
quiz:Q([
["¿Qué ocurre si la altitud de cabina supera unos 10.000 ft en el 737?",["Suena la bocina de aviso de altitud de cabina","Se retrae el tren","Se apagan los motores"],"Máscaras y descenso de emergencia."],
["¿Qué error se cometió en el accidente de Helios 522?",["El selector de presurización estaba en MANUAL","Faltaba combustible","El tren no bajó"],"Y el aviso no se identificó a tiempo."],
["¿Qué te indica el “six-pack” junto al MASTER CAUTION?",["Qué sistema tiene la precaución","La velocidad del viento","El combustible restante"],"Agrupa los avisos por sistema."],
["¿Cuántas pantallas grandes tiene la cabina del MAX?",["Cuatro","Seis","Dos"],"Cuatro pantallas de 15,1 pulgadas."],
["¿Qué hace el MCAS del 737 MAX?",["Ajusta el trim de cabeceo con ángulos de ataque altos","Controla la presurización","Gestiona el combustible"],"Se rediseñó tras los accidentes."],
["Tras el rediseño, el MCAS usa…",["Dos sensores de ángulo de ataque","Un solo sensor","Ningún sensor"],"Compara ambos y tiene límites de actuación."],
["¿Qué es lo primero ante un aviso en vuelo?",["Volar el avión (aviate), luego navegar y comunicar","Leer la checklist inmediatamente sin mirar fuera","Llamar a la compañía"],"Aviate, navigate, communicate."],
["El FIRE WARN es de color…",["Rojo","Ámbar","Azul"],"Rojo = aviso (warning); ámbar = precaución."],
["¿Qué denominación usa el MAX?",["MAX 7, 8, 9 y 10","737-700, -800 y -900","737-300, -400 y -500"],"El MAX 8 es el más común."],
["¿Qué winglet es característico del MAX?",["AT winglet (dos aletas)","Sin winglets","Winglet de punta de ala circular"],"Advanced Technology winglet."]])});
c.final={n:20,pass:75};
})();
