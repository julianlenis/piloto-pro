/* v7: módulo 6 "vuelo completo" y bancos de preguntas ampliados para A320 y 787 */
(()=>{const Q=(arr)=>arr.map(([q,o,e])=>({q,o,a:0,e}));const C=id=>PP.courses.find(c=>c.id===id);const M=(c,id)=>C(c).modules.find(m=>m.id===id);
/* ---------- A320 ---------- */
M('a320','m1').quiz.push(...Q([
["¿Qué miembros forman la familia A320?",["A318, A319, A320 y A321","A300, A310 y A320","A320, A330 y A340"],"La familia de pasillo único: A318, A319, A320 y A321 (y sus versiones neo)."],
["“neo” en A320neo significa…",["New Engine Option: motores nuevos más eficientes","Next Electronic Operation","Nueva estructura de ala"],"New Engine Option: CFM LEAP-1A o Pratt & Whitney PW1100G."],
["¿Con qué se pilota el A320?",["Con un sidestick a cada lado","Con un yoke central","Con palancas de cable directo"],"Sidestick lateral y mandos fly-by-wire."],
["¿Qué significa “cabina oscura” en Airbus?",["Si no hay luces en el overhead, todo está en posición normal","Que la cabina no tiene luces de noche","Que las pantallas están apagadas en crucero"],"Dark cockpit: una luz encendida indica algo anormal o una selección no estándar."],
["El ECAM sirve para…",["Mostrar parámetros de motores, avisos y las acciones a seguir","Programar la ruta","Controlar el piloto automático"],"Electronic Centralised Aircraft Monitor: motores, sistemas, avisos y procedimientos."],
["¿Qué pantalla muestra la ruta en forma de mapa?",["La ND (Navigation Display)","El PFD","El E/WD"],"La ND muestra la ruta, radioayudas, meteo del radar y tráfico."]]));
M('a320','m2').quiz.push(...Q([
["¿Cuántos sistemas hidráulicos tiene el A320?",["Tres: verde, azul y amarillo","Dos: izquierdo y derecho","Cuatro"],"Green, Blue y Yellow, a 3.000 psi."],
["¿Qué es el PTU del A320?",["Una unidad que transfiere potencia entre los sistemas verde y amarillo sin mezclar líquido","Una bomba de combustible","La unidad de potencia auxiliar"],"Power Transfer Unit: el famoso “ladrido” en tierra con un solo motor."],
["¿Qué hace el CREW SUPPLY del panel de oxígeno?",["Da oxígeno a las máscaras de los pilotos","Abre el oxígeno de pasajeros","Presuriza la cabina"],"Se pone en ON en la preparación de cabina (luz OFF apagada)."],
["En AUTO, ¿de dónde toma el A320 la elevación de aterrizaje para presurizar?",["De la base de datos del FMS (aeropuerto de destino)","Del QNH que pone el piloto","De la altitud del FCU"],"Con LDG ELEV en AUTO, el sistema usa el destino del FMS."],
["¿Cuándo se usa el anti-hielo de motor?",["Con engelamiento: 10 °C o menos con humedad visible","Siempre por encima de FL100","Solo en el despegue"],"Condiciones de engelamiento: temperatura ≤ 10 °C y humedad visible."],
["PROBE/WINDOW HEAT en AUTO calienta las sondas…",["En vuelo y en tierra con al menos un motor en marcha","Solo cuando el piloto pulsa ON","Solo con el APU en marcha"],"En AUTO se activan solas; ON fuerza la calefacción en tierra."],
["¿Por qué hay dos bombas por tanque de ala?",["Por redundancia: si una falla, la otra alimenta el motor","Para llenar el tanque más rápido","Una es para el APU y otra para el motor"],"Redundancia: cada tanque de ala tiene dos bombas."],
["¿Qué tanque se vacía primero en el A320?",["El central","El de ala izquierda","El de ala derecha"],"El central se gasta primero para aliviar la flexión de las alas."]]));
M('a320','m3').quiz.push(...Q([
["En el FCU, empujar la ventana de altitud significa…",["Modo gestionado: el FMS controla la subida o bajada","Modo seleccionado con régimen fijo","Cancelar la altitud"],"Empujar = managed (puntos), tirar = selected."],
["“OP DES” en el FMA indica…",["Descenso seleccionado hacia la altitud del FCU sin restricciones del FMS","Descenso gestionado respetando restricciones","Aproximación ILS armada"],"Open Descent: ignora restricciones, empuje a ralentí."],
["¿Qué pulsas para armar una aproximación ILS completa?",["APPR","LOC","EXPED"],"APPR arma LOC y G/S; LOC solo el localizador."],
["El autothrust del A320 se activa en el despegue al…",["Poner las palancas en FLX/MCT o TOGA","Pulsar AP1","Soltar el freno de aparcamiento"],"Con FLX/MCT o TOGA el A/THR se arma (azul) y se activa al pasar a CL."],
["“LVR CLB” parpadeando significa…",["Que lleves las palancas a CL (subida)","Que subas el tren","Que actives el piloto automático"],"A la altitud de reducción de empuje."],
["¿Qué es “green dot”?",["La velocidad de mejor relación sustentación/resistencia en limpio","La velocidad de rotación","La máxima con flaps"],"Velocidad de maniobra limpia óptima."]]));
M('a320','m4').quiz.push(...Q([
["En el panel, ¿para qué se pone AUTO BRK en MAX antes de despegar?",["Para frenar al máximo si se aborta el despegue a alta velocidad","Para frenar en el rodaje","Para el aterrizaje"],"MAX en despegue = frenada automática máxima en un despegue abortado."],
["¿Qué comprueba el botón T.O CONFIG?",["Que flaps, trim, spoilers y frenos estén bien para despegar","Que los motores estén a ralentí","La presión de cabina"],"Simula el empuje de despegue para disparar avisos de configuración."],
["Tras aterrizar, ¿a qué velocidad se pasan las reversas a IDLE?",["Unos 70 kt","Unos 140 kt","Unos 20 kt"],"A 70 kt reversa a ralentí."],
["Al aparcar, ¿qué se apaga justo después de parar los motores?",["El BEACON","El APU","Las baterías"],"Beacon OFF indica al personal de tierra que es seguro acercarse."]]));
M('a320','m5').quiz.push(...Q([
["¿En qué página se introducen QNH, temperatura y viento del destino?",["PERF APPR","INIT A","F-PLN"],"PERF APPR: QNH, TEMP, MAG WIND, DH/MDA y configuración."],
["¿Qué hace DIR TO en el MCDU?",["Vuela directo al punto elegido borrando los intermedios","Inserta una espera","Cambia el aeropuerto de destino"],"Direct To: línea recta al punto seleccionado."],
["La página RAD NAV sirve para…",["Ver o sintonizar VOR, ILS y ADF","Introducir pesos","Ver el consumo"],"Las radioayudas se autosintonizan; aquí se comprueban o fuerzan."],
["“NEXT PHASE” en las páginas PERF lleva…",["A la siguiente fase: CLB, CRZ, DES, APPR, GO AROUND","A la siguiente página de la ruta","Al siguiente punto de ruta"],"Recorres las fases de vuelo."],
["¿Cuándo se rellena normalmente la página APPR?",["En crucero, tras escuchar el ATIS del destino","Antes de arrancar motores","Tras aterrizar"],"Con los datos actuales del destino."]]));
C('a320').modules.push({id:'m6',title:'6. Vuelo completo: del rodaje al apagado (panel)',lessons:[{id:'l1',title:'Despegue, subida, crucero, llegada, aterrizaje y apagado',html:`${SIMNOTE}
<p>El <b>flujo 2</b> del panel del A320 te lleva por un vuelo entero LEVC → LEBL. Resumen:</p>
<ol><li><b>Rodaje</b>: AUTO BRK MAX y T.O CONFIG test.</li><li><b>Pista</b>: STROBE, LAND, NOSE T.O, RWY TURN OFF y TCAS TA/RA.</li>
<li><b>Despegue</b>: palancas a FLX/MCT, “V1, rotate”, tren arriba con régimen positivo.</li><li><b>Subida</b>: LVR CLB → CL, AP1, flaps 0 a la velocidad S, STD en la altitud de transición, luces fuera a FL100.</li>
<li><b>Crucero</b>: PERF APPR con datos del ATIS, DIR TO si el control lo da.</li><li><b>Descenso</b>: ALT y pulsar (managed), QNH en el nivel de transición, LAND ON bajo FL100.</li>
<li><b>Aproximación</b>: APPR, flaps 1-2, tren, flaps 3-FULL, spoilers armados, AUTO BRK LO.</li><li><b>Aterrizaje</b>: AP OFF, “RETARD” → IDLE, reversas, 70 kt reversa IDLE.</li>
<li><b>Apagado</b>: APU, freno de aparcamiento, motores OFF, beacon OFF, bombas OFF y asegurar el avión hasta cold & dark.</li></ol>
${TOOL('#/p/a320','🎛️ Abrir el panel (elige “2. Del rodaje al apagado”)')}
${WARN('Simplificado','Velocidades, altitudes y configuraciones son de ejemplo. Sigue los procedimientos de tu avión del simulador.')}`}],quiz:Q([
["Tras el despegue, ¿cuándo se sube el tren?",["Con régimen de ascenso positivo confirmado","Nada más pasar V1","A 1.500 ft"],"“Positive climb, gear up”."],
["¿Qué se hace al pasar la altitud de transición en subida?",["Poner el altímetro en STD (1013)","Poner el QNH del destino","Bajar los flaps"],"Por encima se vuela con niveles de vuelo."],
["¿Por debajo de qué nivel se llevan las luces de aterrizaje encendidas?",["FL100","FL200","FL050"],"Bajo FL100: luces encendidas y máximo 250 kt."],
["¿Qué significa el aviso sonoro “RETARD” en el A320?",["Que lleves las palancas a IDLE en el flare","Que retrases el despegue","Que bajes los flaps"],"A unos 20 ft en aterrizaje manual o con A/THR."],
["¿Qué AUTO BRK se usa normalmente para aterrizar en pista larga y seca?",["LO","MAX","OFF siempre"],"LO o MED según pista y condiciones; MAX es para el despegue."],
["En el apagado, ¿por qué se arranca el APU antes de parar motores?",["Para mantener energía eléctrica y aire acondicionado","Para frenar el avión","Para refrigerar los frenos"],"Al parar motores, el APU (o el GPU) alimenta el avión."]])});
/* ---------- 787 ---------- */
M('b787','m1').quiz.push(...Q([
["¿De qué material es gran parte de la estructura del 787?",["Materiales compuestos (fibra de carbono)","Aluminio en su totalidad","Titanio"],"Alrededor de la mitad de su estructura es de compuestos."],
["¿Qué motores puede llevar el 787?",["GEnx-1B o Rolls-Royce Trent 1000","CFM56 o LEAP-1B","GE90 o Trent XWB"],"Dos opciones: GEnx-1B y Trent 1000."],
["¿Qué versiones tiene el 787?",["787-8, 787-9 y 787-10","787-100, -200 y -300","787 NG y MAX"],"Tres longitudes: -8, -9 y -10."],
["¿Con qué se pilota el 787?",["Con yoke (cuernos) y fly-by-wire","Con sidestick","Con mandos mecánicos de cable"],"Fly-by-wire pero con yoke, al estilo Boeing."],
["El HUD del 787 es…",["Una pantalla transparente que proyecta datos de vuelo delante del piloto","Un tipo de radar meteorológico","El nombre del FMS"],"Head-Up Display: datos superpuestos al exterior."],
["¿Qué muestra el EICAS?",["Parámetros de motores y mensajes de alerta","La ruta del FMC","El radar meteorológico"],"Engine Indication and Crew Alerting System."]]));
M('b787','m2').quiz.push(...Q([
["¿Qué significa que el 787 es “bleedless”?",["Que no usa aire sangrado de los motores para packs y anti-hielo de alas","Que no tiene APU","Que no tiene sistema hidráulico"],"Usa compresores eléctricos; solo el anti-hielo de motor usa aire de motor."],
["Los packs del 787 funcionan con…",["Electricidad (compresores eléctricos)","Aire del APU","Aire de los motores"],"Por eso necesitan generadores (motor o APU) o tierra."],
["¿Qué hace WINDOW HEAT?",["Calienta los cristales contra empañado, hielo e impactos","Calienta la cabina de pasajeros","Calienta el combustible"],"El cristal caliente es más flexible y resistente a impactos de aves."],
["El anti-hielo de alas del 787 es…",["Eléctrico, con mantas calefactoras","Neumático con aire de motor","Químico con líquido"],"Otra consecuencia del diseño bleedless."],
["¿Cuántos sistemas hidráulicos tiene el 787?",["Tres: izquierdo, central y derecho","Dos: verde y amarillo","Cuatro"],"L, C y R, a 5.000 psi."],
["¿A qué presión trabajan los hidráulicos del 787?",["5.000 psi","3.000 psi","1.500 psi"],"5.000 psi permite tuberías y actuadores más ligeros."],
["Las bombas de demanda se ponen en AUTO…",["Antes de arrancar motores","Al aterrizar","Solo en caso de fallo"],"En AUTO apoyan cuando hace falta caudal (p. ej. tren, flaps)."],
["¿Cuántas bombas hay en cada tanque de ala del 787?",["Dos: FWD y AFT","Una","Cuatro"],"Delantera y trasera por redundancia."]]));
M('b787','m3').quiz.push(...Q([
["¿Qué modo del MCP sigue la ruta lateral del FMC?",["LNAV","VNAV","HDG SEL"],"LNAV = navegación lateral del FMC."],
["¿Qué modo sigue el perfil vertical del FMC?",["VNAV","LNAV","FLCH"],"VNAV gestiona subida, crucero y descenso."],
["FLCH significa…",["Flight Level Change: cambia de nivel a velocidad constante","Flaps Change","Fuel Level Check"],"Sube o baja manteniendo la velocidad del MCP."],
["¿Qué pulsas para interceptar el localizador y la senda del ILS?",["APP","LOC","VS"],"APP arma LOC y G/S."],
["¿Qué hace el botón TO/GA en el despegue?",["Hace que el autothrottle ponga el empuje de despegue","Retrae el tren","Conecta el piloto automático"],"Tras estabilizar ~40 % N1, TO/GA fija el empuje calculado."],
["En el FMA, “THR REF” indica que el A/T…",["Mantiene el empuje de referencia (despegue o subida)","Está desconectado","Mantiene una velocidad"],"Empuje de referencia del FMC."]]));
M('b787','m4').quiz.push(...Q([
["En el 787, ¿qué selector pones en RTO antes de despegar?",["AUTOBRAKE","FLAPS","APU"],"Rejected Take-Off: frenada automática si abortas a alta velocidad."],
["¿Qué pulsas en el MCP con la autorización ILS?",["APP","FLCH","HOLD"],"APP arma localizador y senda."],
["Para parar los motores del 787 en el aparcamiento se usan…",["Los FUEL CONTROL en CUTOFF","Los ENG START en NORM","El APU en OFF"],"Fuel control a CUTOFF corta el combustible."],
["¿Por qué se ponen los cuatro WINDOW HEAT en ON en la preparación?",["Para calentar los cristales antes del vuelo","Para descongelar las alas","Para encender las luces de cabina"],"Se hace en la preparación de cabina."]]));
M('b787','m5').quiz.push(...Q([
["En THRUST LIM, “SEL” es…",["La temperatura supuesta para reducir empuje","El selector de pista","La selección de flaps"],"Assumed temperature."],
["¿Qué es un “derate” (TO 1, TO 2)?",["Una reducción fija del empuje máximo de despegue","Un aumento de empuje","Un tipo de flaps"],"Se puede combinar con temperatura supuesta."],
["En TAKEOFF REF, ¿cómo se aceptan las V-speeds propuestas?",["Pulsando R1, R2 y R3 y EXEC","Pulsando L6","Escribiéndolas en la página RTE"],"Pasan de letra pequeña a grande."],
["¿Dónde se elige la STAR y la aproximación del destino?",["DEP ARR → ARR","INIT REF","PROG"],"DEP ARR del aeropuerto de llegada."],
["¿Cómo se hace un directo en el FMC de Boeing?",["En LEGS, poniendo el punto en L1 y EXEC","Con el botón DIR","En PERF INIT"],"Boeing no tiene tecla DIR: se usa LEGS."],
["APPROACH REF sirve para…",["Elegir los flaps de aterrizaje y la VREF","Elegir el aeropuerto alternativo","Introducir el peso sin combustible"],"Ej.: flaps 30 / VREF."]]));
C('b787').modules.push({id:'m6',title:'6. Vuelo completo: del rodaje al apagado (panel)',lessons:[{id:'l1',title:'El vuelo completo en el 787',html:`${SIMNOTE}
<ol><li><b>Rodaje</b>: AUTOBRAKE RTO y lista before takeoff.</li><li><b>Pista</b>: STROBE, LANDING, RWY TURNOFF, TA/RA.</li><li><b>Despegue</b>: ~40 % N1 estable → TO/GA, “V1, rotate”, tren arriba.</li>
<li><b>Subida</b>: A/P por encima de 200 ft (LNAV a 50 ft, VNAV a 400 ft), flaps 1 → UP, STD, FL240, luces fuera a FL100.</li>
<li><b>Llegada</b>: DEP ARR → ILS24R + STAR, EXEC, LEGS, directo, APPROACH REF flaps 30.</li><li><b>Aproximación</b>: APP, flaps 1-5, tren, 20, 30, SPEEDBRAKE ARMED, AUTOBRAKE 2.</li>
<li><b>Aterrizaje</b>: A/P OFF, IDLE en el flare, reversas.</li><li><b>Apagado</b>: APU, PARK BRAKE, FUEL CONTROL CUTOFF, beacon OFF, bombas OFF y asegurar hasta cold & dark.</li></ol>
${TOOL('#/p/b787','🎛️ Abrir el panel (flujo 2)')}`}],quiz:Q([
["¿A partir de qué altura se suele poder conectar el A/P del 787 tras despegar?",["Unos 200 ft","50 ft","5.000 ft"],"En esta app usamos 200 ft como referencia."],
["¿Qué autobrake se usa para aterrizar en condiciones normales en el panel?",["2","RTO","MAX siempre"],"RTO es solo para el despegue."],
["¿Qué se arma antes de aterrizar para que los spoilers salgan solos?",["SPEEDBRAKE: ARMED","AUTOBRAKE: RTO","FLAPS: UP"],"Al tocar la pista se despliegan."],
["En descenso, al cruzar el nivel de transición…",["Se pone el QNH del destino","Se pone STD","Se apagan las luces"],"Bajando: de STD a QNH."]])});
})();
