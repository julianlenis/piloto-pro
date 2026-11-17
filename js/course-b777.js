/* v7: 777 curso completo (amplía la introducción) */
(()=>{const Q=(arr)=>arr.map(([q,o,e])=>({q,o,a:0,e}));const c=PP.courses.find(x=>x.id==='b777');
Object.assign(c,{level:'full',sub:'Curso completo: sistemas, FMC, panel interactivo con dos flujos y examen final',panel:'b777',final:{n:20,pass:75}});
c.modules[0].quiz.push(...Q([
["¿Con qué aerolínea entró en servicio el 777?",["United Airlines","Iberia","Emirates"],"En 1995."],
["El 777 fue el primer avión en obtener…",["ETOPS 180 desde su entrada en servicio","Certificación para cuatro motores","Mandos con sidestick en Boeing"],"Pudo volar rutas transoceánicas largas con dos motores desde el primer día."],
["¿Qué motor lleva el 777X?",["GE9X","GE90-94B","Trent 1000"],"El GE9X, de los motores más grandes del mundo."]]));
c.modules.push(
{id:'m2',title:'2. Sistemas del 777',lessons:[{id:'l1',title:'Electricidad, aire, hidráulico y combustible',html:`
<ul><li><b>Eléctrico</b>: un IDG por motor, generador del APU, dos <b>generadores de respaldo</b> (backup) y RAT. Dos tomas de tierra: PRIMARY y SECONDARY EXT PWR.</li>
<li><b>ADIRU</b>: un solo interruptor; la unidad tiene redundancia interna y hay una de reserva (SAARU).</li>
<li><b>Aire</b>: aire sangrado de motores y APU para packs, presurización, anti-hielo y arranque.</li>
<li><b>Hidráulico</b>: tres sistemas (izquierdo, central y derecho) a 3.000 psi. Bombas primarias (de motor y eléctricas C1/C2) y de demanda.</li>
<li><b>Combustible</b>: tanques de ala y central, dos bombas por ala (FWD/AFT) y dos centrales.</li>
<li><b>Mandos</b>: fly-by-wire con yoke y protecciones “suaves” (envelope protection): el piloto puede sobrepasarlas con más fuerza.</li>
<li><b>TAC</b> (Thrust Asymmetry Compensation): con un fallo de motor, el timón compensa automáticamente la asimetría de empuje.</li></ul>`}],
 quiz:Q([
["¿Cuántos sistemas hidráulicos tiene el 777?",["Tres: L, C y R","Dos","Cuatro"],"Izquierdo, central y derecho."],
["¿A qué presión trabajan los hidráulicos del 777?",["3.000 psi","5.000 psi","1.500 psi"],"El 787 y el A350 suben a 5.000 psi."],
["¿Qué es el TAC del 777?",["Compensación automática con el timón ante un fallo de motor","Un sistema de alerta de tráfico","El control del aire acondicionado"],"Thrust Asymmetry Compensation."],
["¿Cuántos interruptores de ADIRU hay en el 777?",["Uno","Tres","Dos"],"Una ADIRU con redundancia interna y una SAARU de reserva."],
["¿Qué generadores de respaldo tiene el 777?",["Dos backup generators además de los IDG y el APU","Ninguno","Solo la batería"],"Más la RAT."],
["Las protecciones de vuelo del 777 son…",["Suaves: el piloto puede sobrepasarlas con más fuerza","Duras: imposible sobrepasarlas","Inexistentes"],"Filosofía Boeing."],
["¿Para qué usa el 777 el aire del APU en tierra?",["Packs y arranque de motores","Solo para iluminación","Para los frenos"],"Es un avión con aire sangrado."],
["¿Cuántas tomas de corriente de tierra tiene el panel del 777?",["Dos: PRIMARY y SECONDARY","Una","Cuatro"],"Se puede conectar una o las dos."]])},
{id:'m3',title:'3. MCP, FMC y automatismos',lessons:[{id:'l1',title:'MCP y modos del 777',html:`
<p>MCP muy parecido al del 787: <b>LNAV</b>, <b>VNAV</b>, <b>FLCH</b>, <b>HDG SEL/HOLD</b>, <b>V/S</b> o <b>FPA</b>, <b>LOC</b>, <b>APP</b>, A/P y A/T. El FMC sigue la regla <b>IDENT → POS → RTE → DEP ARR → PERF → THRUST LIM → TAKEOFF</b>.</p>
<p>En el despegue: ~40 % N1 estable → <b>TO/GA</b>. LNAV se activa a 50 ft y VNAV a 400 ft (si estaban armados). El A/P se puede conectar por encima de unos 200 ft.</p>
${TIP('Autostart','Con AUTOSTART en ON, tiras del selector de arranque y pones FUEL CONTROL en RUN: el sistema gestiona ignición y combustible y aborta si detecta un problema.')}`}],
 quiz:Q([
["¿Qué modo del MCP sigue el perfil vertical del FMC?",["VNAV","LNAV","HDG HOLD"],"Vertical navigation."],
["¿A qué altura se activa LNAV tras el despegue si está armado?",["50 ft","400 ft","1.500 ft"],"VNAV a 400 ft."],
["¿Qué hace AUTOSTART en ON?",["Gestiona ignición y combustible durante el arranque","Arranca el APU solo","Activa el piloto automático"],"Y aborta el arranque si detecta problemas."],
["Con autostart, ¿cuándo se pone FUEL CONTROL en RUN?",["Justo después de tirar del selector de arranque","A 60 % N2","Tras el despegue"],"El sistema introduce combustible en el momento adecuado."],
["¿Qué es FLCH?",["Cambio de nivel a velocidad constante","Modo de aproximación","Control de flaps"],"Flight Level Change."],
["¿Qué página del FMC elige el empuje de despegue?",["THRUST LIM","LEGS","PROG"],"TO, TO 1, TO 2 y temperatura supuesta."],
["¿Qué orden sigue la preparación del FMC?",["IDENT, POS, RTE, DEP ARR, PERF, THRUST LIM, TAKEOFF","RTE, IDENT, TAKEOFF","PERF, RTE, POS"],"Regla universal de los Boeing."],
["¿Qué tecla del CDU no existe en Boeing para hacer directos?",["DIR (se usa LEGS)","LEGS","EXEC"],"El directo se hace en LEGS."]])},
{id:'m4',title:'4. Del cold & dark al rodaje (panel)',lessons:[{id:'l1',title:'El flujo del 777 explicado',html:`${SIMNOTE}
<ol><li>PARK BRAKE, BATTERY, PRIMARY EXT PWR, NAV.</li><li><b>ADIRU</b> ON (alineación).</li><li><b>APU</b> START → APU GEN, APU BLEED AUTO.</li><li>Bombas C1/C2, combustible, WINDOW HEAT, cinturones.</li><li><b>FMC</b> completo LEMD → LEBL.</li><li><b>MCP</b>: QNH, F/D, A/T, V2, altitud, LNAV/VNAV.</li><li>Transpondedor, pushback, bombas de demanda AUTO, BEACON.</li><li><b>Arranque</b> R y L con autostart; APU OFF, flaps 15, rodaje.</li></ol>
${TOOL('#/p/b777','🎛️ Abrir el panel del 777')}`}],
 quiz:Q([
["¿Qué se conecta justo después de la batería en el panel del 777?",["PRIMARY EXT PWR","El APU","Los motores"],"La corriente de tierra."],
["¿Qué interruptor alinea el sistema inercial del 777?",["ADIRU","IRS L/R","ADIRS 1/2/3"],"Un solo interruptor."],
["¿Qué flaps de despegue usamos en el ejemplo del 777?",["15","5","30"],"Ejemplo; dependen del cálculo de prestaciones."],
["Antes de arrancar, las bombas de demanda se ponen en…",["AUTO","OFF","Siempre ON"],"Apoyan cuando hace falta caudal."],
["¿Qué motor arrancamos primero en el ejemplo?",["El derecho","El izquierdo","Los dos a la vez"],"Ejemplo habitual en simulador."],
["¿Por qué se apaga el APU tras el arranque?",["Los motores ya dan electricidad y aire","Porque es obligatorio para rodar","Para cargar la batería"],"Ahorra combustible."]])},
{id:'m5',title:'5. FMC: programar LEMD → LEBL',lessons:[{id:'l1',title:'Programación paso a paso',html:`
<ol><li><b>IDENT</b> y <b>POS INIT</b> (REF AIRPORT LEMD).</li><li><b>RTE</b>: LEMD → LEBL, pista 36L, VIA/TO, ACTIVATE, EXEC.</li><li><b>DEP ARR</b>: SID (ficticia) TALAR1N.</li><li><b>PERF INIT</b>: ZFW, reservas, CI, CRZ ALT (ejemplo 210,0 / 6,0 / 50 / FL300).</li><li><b>THRUST LIM</b>: SEL 40 °C, TO 1.</li><li><b>TAKEOFF REF</b>: flaps 15, CG, aceptar V1/VR/V2, EXEC.</li><li>En crucero: <b>DEP ARR → ARR</b> (ILS24R + STAR), <b>LEGS</b>, directo y <b>APPROACH REF</b> (flaps 30, VREF).</li></ol>
${WARN('Datos de ejemplo','Todo inventado para aprender. Usa SimBrief y el FMC de tu simulador.')}`}],
 quiz:Q([
["¿Dónde se pone la pista de salida en el FMC?",["En RTE (o DEP ARR)","En PROG","En THRUST LIM"],"RTE permite poner RUNWAY; DEP ARR la SID y pista."],
["¿Qué significa ACTIVATE en la página RTE?",["Activar la ruta para que el FMC la use","Arrancar los motores","Enviar el plan al control"],"Después se pulsa EXEC."],
["¿Qué datos van en PERF INIT?",["ZFW, reservas, cost index y altitud de crucero","Frecuencias de radio","Velocidades V1/VR/V2"],"Con ellos calcula peso bruto y perfil."],
["¿Dónde eliges flaps de aterrizaje y VREF?",["APPROACH REF","TAKEOFF REF","RTE"],"INIT REF en descenso."],
["¿Cómo se aceptan las V-speeds?",["R1, R2 y R3 en TAKEOFF REF y EXEC","L6 en IDENT","No se aceptan"],"Pasan a letra grande."],
["¿Qué tecla confirma las modificaciones del FMC?",["EXEC","PROG","VNAV"],"EXEC iluminada = cambios pendientes."]])},
{id:'m6',title:'6. Vuelo completo: del rodaje al apagado (panel)',lessons:[{id:'l1',title:'El vuelo completo en el 777',html:`${SIMNOTE}
<p>Flujo 2: AUTOBRAKE RTO, luces de pista, ~40 % N1 → TO/GA, rotación, tren, A/P, flaps 5 → 1 → UP, STD, FL300, llegada en el FMC, APP, flaps y tren, SPEEDBRAKE ARMED, AUTOBRAKE 2, aterrizaje, reversas y apagado hasta cold & dark.</p>
${TOOL('#/p/b777','🎛️ Abrir el panel (flujo 2)')}`}],
 quiz:Q([
["¿Qué se pulsa tras estabilizar ~40 % N1 en el despegue?",["TO/GA","APP","A/P"],"El A/T pone el empuje de despegue."],
["¿Qué secuencia de flaps se recoge en el ejemplo tras despegar con 15?",["5 → 1 → UP","30 → 20 → UP","1 → 5 → 15"],"Por etapas según las marcas de velocidad."],
["¿Qué se corta para parar los motores?",["FUEL CONTROL a CUTOFF","ENG START a NORM","AUTOSTART a OFF"],"Corta el combustible."],
["Tras aterrizar, ¿qué se hace con el speedbrake?",["Se baja (DOWN)","Se arma","Se deja arriba hasta el aparcamiento"],"En la lista after landing."]])});
})();
