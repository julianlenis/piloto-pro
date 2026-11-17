/* ===================== BOEING 737 NG / MAX ===================== */
(function(){
const LP={OFF:[['',''],['LOW PRESS','a']],ON:[['',''],['','d']]};
PP.panels.b737={
name:"Boeing 737 NG/MAX",quiz:"#/q/b737/m3",
ecamStart:'<span class="wh">COLD & DARK · todo apagado</span>',
sections:[
{id:'elec',name:'Overhead · ELECTRICAL',ctls:[
 tg('bat','BATTERY',['OFF','ON'],'OFF','Interruptor de batería (con guarda).'),sel('stby','STANDBY PWR',['BAT','OFF','AUTO'],'AUTO','Energía de reserva; normal AUTO (con guarda).'),
 sel('grd','GRD POWER',['OFF','ON'],'OFF','Corriente de tierra.'),sel('apug','APU GEN 1+2',['OFF','ON BUS'],'OFF','Generadores del APU a las barras (dos interruptores en el avión).'),sel('gen','GEN 1+2',['OFF','ON BUS'],'OFF','Generadores de los motores.')]},
{id:'irs',name:'Overhead · IRS',ctls:[sel('irsl','IRS L',['OFF','ALIGN','NAV','ATT'],'OFF','Sistema inercial izquierdo.'),sel('irsr','IRS R',['OFF','ALIGN','NAV','ATT'],'OFF','Sistema inercial derecho.')]},
{id:'fuel',name:'Overhead · FUEL',ctls:[pb('f1','AFT+FWD 1','OFF',LP,'Bombas del tanque 1 (izquierdo).'),pb('fc','CTR L+R','OFF',{OFF:[['',''],['','']],ON:[['',''],['','d']]},'Bombas centrales (solo con combustible en el central).'),pb('f2','AFT+FWD 2','OFF',LP,'Bombas del tanque 2 (derecho).')]},
{id:'hyd',name:'Overhead · HYDRAULICS',ctls:[tg('heng','ENG 1+2 PUMPS',['OFF','ON'],'ON','Bombas de motor A (motor 1) y B (motor 2).'),tg('helec','ELEC 1+2 PUMPS',['OFF','ON'],'OFF','Bombas eléctricas: ELEC 2 al sistema A, ELEC 1 al B.')]},
{id:'apu',name:'Overhead · APU, AIR y otros',ctls:[
 sel('apu','APU',['OFF','ON','START'],'OFF','START vuelve solo a ON.'),tg('apub','APU BLEED',['OFF','ON'],'OFF','Aire del APU.'),sel('packs','PACKS L+R',['OFF','AUTO','HIGH'],'AUTO','Aire acondicionado.'),sel('iso','ISOLATION',['CLOSE','AUTO','OPEN'],'AUTO','Válvula de aislamiento.'),tg('probe','PROBE HEAT',['OFF','ON'],'OFF','Calefacción de sondas.')]},
{id:'lt',name:'Overhead · LIGHTS y SIGNS',ctls:[
 sel('pos','POSITION',['STROBE','OFF','STEADY'],'OFF','Luces de posición (y estroboscópicas en STROBE & STEADY).'),tg('anti','ANTI COLLISION',['OFF','ON'],'OFF','Luz anticolisión.'),tg('taxi','TAXI',['OFF','ON'],'OFF','Luz de rodaje.'),
 sel('nosmk','NO SMOKING',['OFF','AUTO','ON'],'OFF','Señal de no fumar.'),sel('belts','FASTEN BELTS',['OFF','AUTO','ON'],'OFF','Señal de cinturones.')]},
{id:'mcp',name:'Glareshield · MCP y EFIS',dark:true,ctls:[
 disp('baro','BARO','29.92 IN','Altímetro.'),tg('fd','F/D',['OFF','ON'],'OFF','Director de vuelo.'),tg('at','A/T ARM',['OFF','ARM'],'OFF','Autothrottle.'),
 disp('ias','IAS','100','Velocidad.'),disp('hdg','HDG','000','Rumbo.'),disp('alt','ALT','00000','Altitud.'),
 pb('lnav','LNAV','OFF',{OFF:[['',''],['','']],ARM:[['',''],['▬','g']]},'Navegación lateral.'),pb('vnav','VNAV','OFF',{OFF:[['',''],['','']],ARM:[['',''],['▬','g']]},'Navegación vertical.')]},
{id:'cdu',name:'Pedestal · CDU (FMC)',cdu:true,tag:'CDU L',ctls:[...LSK('k'),key('kINIT','INIT REF'),key('kRTE','RTE'),key('kDEP','DEP ARR'),key('kEXEC','EXEC'),key('kN1','N1 LIMIT'),key('kNEXT','NEXT PG'),key('kLEGS','LEGS'),key('kPROG','PROG')]},
{id:'ped',name:'Pedestal y overhead (arranque)',ctls:[
 disp('xpdr','XPDR','2000 STBY','Transpondedor.'),
 sel('es1','ENG START 1',['GRD','OFF','CONT','FLT'],'OFF','Selector de arranque del motor 1.'),sel('es2','ENG START 2',['GRD','OFF','CONT','FLT'],'OFF','Selector de arranque del motor 2.'),
 lev('sl1','START LEVER 1',['CUTOFF','IDLE'],'CUTOFF','Palanca de combustible del motor 1.'),lev('sl2','START LEVER 2',['CUTOFF','IDLE'],'CUTOFF','Palanca de combustible del motor 2.'),
 tg('pbrk','PARK BRAKE',['OFF','SET'],'OFF','Freno de aparcamiento.'),sel('flaps','FLAPS',['UP','1','2','5','10','15','25','30','40'],'UP','Palanca de flaps.')]}
],
flow:[
{ph:'Preparación',t:'Cabina oscura del 737',d:'El 737 es el avión comercial más vendido de la historia. Su cabina es más "manual" que la de Airbus y 787: hay más interruptores, y aprenderlo te enseña mucho. Comprueba palanca del tren DOWN.',w:'Antes de dar energía se verifica que nada se moverá de golpe.'},
{ph:'Preparación',c:'pbrk',to:'SET',t:'PARK BRAKE: SET',d:'Freno de aparcamiento puesto.',w:'Avión inmóvil para preparar y alinear los IRS.'},
{ph:'Energía',c:'bat',to:'ON',t:'BATTERY: ON',d:'Levanta la guarda y pon la batería en ON.',w:'Da energía básica. El STANDBY POWER debe estar en AUTO (con guarda): así, si fallan los generadores, la batería alimenta los instrumentos esenciales.'},
{ph:'Energía',c:'grd',to:'ON',t:'GRD POWER: ON',d:'Con la luz GRD POWER AVAILABLE encendida, conecta la corriente de tierra.',w:'Alimentas todo el avión sin gastar batería.',m:'GRD PWR ON BUS · TRANSFER BUS 1+2 alimentados'},
{ph:'Energía',c:'pos',to:'STEADY',t:'POSITION: STEADY',d:'Luces de posición fijas.',w:'En tierra se usan las de posición; las estroboscópicas (STROBE) al entrar en pista.'},
{ph:'IRS',c:'irsl',to:'NAV',t:'IRS L: NAV',d:'Gira el IRS izquierdo a NAV (pasa por ALIGN).',w:'En el 737 la alineación tarda unos 10 minutos. Luego habrá que introducir la posición en el FMC.',m:'IRS L <span class="am">ALIGN</span>'},
{ph:'IRS',c:'irsr',to:'NAV',t:'IRS R: NAV',d:'Y el derecho.',w:'Con el avión quieto, la plataforma inercial detecta la rotación de la Tierra para encontrar el norte.',m:'IRS L+R <span class="am">ALIGN</span>'},
{ph:'Combustible',c:'f1',to:'ON',t:'Bombas tanque 1: ON',d:'Se apagan las luces LOW PRESSURE.',w:'El APU toma combustible del lado izquierdo: con bombas encendidas el arranque del APU es más fiable.'},
{ph:'APU',c:'apu',to:'ON',t:'APU: START (vuelve a ON)',d:'Gira a START y suéltalo: vuelve a ON. (Un toque.)',w:'El APU da electricidad y aire comprimido para el aire acondicionado y el arranque de motores.',m:'APU START · EGT ↑',later:[[],'APU <span class="gr">RUNNING</span> · APU GEN OFF BUS (luz azul)','Arrancando el APU…']},
{ph:'APU',c:'apug',to:'ON BUS',t:'APU GEN 1 y 2: ON BUS',d:'Conecta los generadores del APU a las barras.',w:'Al conectarlos, la corriente de tierra se desconecta sola y el personal puede retirar el cable.',m:'APU GEN ON BUS · GRD PWR desconectado'},
{ph:'APU',c:'apub',to:'ON',t:'APU BLEED: ON',d:'Aire del APU.',w:'Alimenta los packs ahora y los arrancadores neumáticos de los motores después.'},
{ph:'Combustible',c:'f2',to:'ON',t:'Bombas tanque 2: ON',d:'Bombas del tanque derecho.',w:'Las centrales se encienden solo si hay combustible en el tanque central (si no, aparecería una precaución por baja presión).'},
{ph:'Hidráulico',c:'helec',to:'ON',t:'ELEC PUMPS 1 y 2: ON',d:'Bombas hidráulicas eléctricas.',w:'Sistemas A y B: cada uno con una bomba de motor y otra eléctrica (cruzadas: ELEC 2 → A, ELEC 1 → B). Además hay un sistema standby.',m:'HYD A + B: presión normal'},
{ph:'Cabina',c:'nosmk',to:'ON',t:'NO SMOKING: ON',d:'Señal de no fumar.',w:'Muchos operadores la dejan siempre en ON.'},
{ph:'Cabina',c:'belts',to:'ON',t:'FASTEN BELTS: ON',d:'Señal de cinturones.',w:'Para embarque, rodaje y despegue.'},
// FMC
{ph:'FMC · IDENT',c:'kINIT',t:'INIT REF → IDENT',d:'Pulsa INIT REF.',w:'Comprueba modelo (737-800 o MAX 8) y la base de datos vigente.',scr:cdu('IDENT',[[[' MODEL','ENG RATING'],['{w}737-800{/}','{w}26K{/}']],[[' NAV DATA','ACTIVE'],['{w}AIRAC{/}','{w}VIGENTE{/}']],[['',''],['','']],[[' OP PROGRAM',''],['{w}SIMULADOR{/}','']],[['',''],['','']],[['',''],['{w}<INDEX{/}','{w}POS INIT>{/}']]],'')},
{ph:'FMC · POS INIT',c:'kR6',t:'POS INIT',d:'Pulsa R6. He copiado la posición GPS al scratchpad.',w:'En el 737 hay que introducir la posición actual en SET IRS POS para que los IRS terminen de alinearse.',scr:cdu('POS INIT',[[['','LAST POS'],['','{w}N3929.3 W00028.8{/}']],[[' REF AIRPORT',''],['{w}LEVC{/}','']],[[' GATE',''],['{w}-----{/}','']],[['','SET IRS POS'],['','{o}[][][][][] [][][][][][]{/}']],[['','GPS POS'],['','{w}N3929.3 W00028.8{/}']],[['',''],['{w}<INDEX{/}','{w}ROUTE>{/}']]],'N3929.3W00028.8')},
{ph:'FMC · POS INIT',c:'kR4',t:'SET IRS POS',d:'Pulsa R4.',w:'Sin este paso los IRS no pasan a modo NAV en el 737.',scr:cdu('POS INIT',[[['','LAST POS'],['','{w}N3929.3 W00028.8{/}']],[[' REF AIRPORT',''],['{w}LEVC{/}','']],[[' GATE',''],['{w}-----{/}','']],[['','SET IRS POS'],['','{w}N3929.3 W00028.8{/}']],[['','GPS POS'],['','{w}N3929.3 W00028.8{/}']],[['',''],['{w}<INDEX{/}','{w}ROUTE>{/}']]],'')},
{ph:'FMC · RTE',c:'kRTE',t:'RTE: origen, destino, pista',d:'Pulsa RTE: ORIGIN LEVC, DEST LEBL, RUNWAY RW30, FLT NO (en un toque).',w:'Igual que en el 787: primero el origen.',scr:cdu('RTE            1/2',[[[' ORIGIN','DEST '],['{w}LEVC{/}','{w}LEBL{/}']],[[' RUNWAY','FLT NO'],['{w}RW30{/}','{w}JLN123{/}']],[['','CO ROUTE'],['','{w}----------{/}']],[['',''],['','']],[['',''],['','']],[['',''],['','{w}ACTIVATE>{/}']]],'')},
{ph:'FMC · RTE',c:'kNEXT',t:'VIA UN725 TO MARTA',d:'NEXT PAGE y meter el tramo de aerovía (ejemplo ficticio).',w:'VIA = por dónde, TO = hasta dónde.',scr:cdu('RTE            2/2',[[[' VIA','TO '],['{w}AZAHR1A{/}','{w}AZAHR{/}']],[['',''],['{w}UN725{/}','{w}MARTA{/}']],[['',''],['{w}-----{/}','{w}-----{/}']],[['',''],['','']],[['',''],['','']],[['',''],['','{w}ACTIVATE>{/}']]],'')},
{ph:'FMC · RTE',c:'kR6',t:'ACTIVATE',d:'Pulsa R6.',w:'Se ilumina EXEC.'},
{ph:'FMC · RTE',c:'kEXEC',t:'EXEC',d:'Activa la ruta.',w:'Ahora es ACT RTE.'},
{ph:'FMC · DEP ARR',c:'kDEP',t:'DEP ARR → SID y pista',d:'Elige SID y pista 30 (ejemplo).',w:'Revisa LEGS para quitar discontinuidades.',scr:cdu('LEVC DEPARTURES',[[[' SIDS','RUNWAYS '],['{w}AZAHR1A <SEL>{/}','{w}<SEL> 30{/}']],[['',''],['','{w}12{/}']],[['',''],['','']],[['',''],['','']],[['',''],['','']],[['',''],['{w}<ERASE{/}','{w}ROUTE>{/}']]],'')},
{ph:'FMC · DEP ARR',c:'kEXEC',t:'EXEC',d:'Ejecuta.',w:'Siempre que EXEC se ilumina, hay algo pendiente.'},
{ph:'FMC · PERF',c:'kINIT',t:'PERF INIT',d:'INIT REF → PERF INIT. Ejemplo: ZFW 56,0 t, reservas 2,5 t, cost index 30, CRZ ALT FL240 (en un toque).',w:'El FMC calcula el peso bruto con el combustible a bordo.',scr:cdu('PERF INIT',[[[' GW/CRZ CG','TRIP/CRZ ALT'],['{w}63.0/{/}','{w}FL240{/}']],[[' PLAN/FUEL',''],['{w}7.0{/}','']],[[' ZFW',''],['{w}56.0{/}','']],[[' RESERVES',''],['{w}2.5{/}','']],[[' COST INDEX',''],['{w}30{/}','']],[['',''],['{w}<INDEX{/}','{w}N1 LIMIT>{/}']]],'')},
{ph:'FMC · PERF',c:'kEXEC',t:'EXEC',d:'Ejecuta PERF INIT.',w:'Datos de ejemplo, no reales.'},
{ph:'FMC · TAKEOFF',c:'kN1',t:'N1 LIMIT',d:'Pulsa N1 LIMIT: eliges empuje (TO, TO-1, TO-2) o temperatura supuesta (SEL TEMP).',w:'Despegar con empuje reducido alarga la vida del motor.',scr:cdu('N1 LIMIT',[[[' SEL/OAT',''],['{w}--/+15°C{/}','{w}<SEL> TO{/}']],[['',''],['','{w}TO-1{/}']],[['',''],['','{w}TO-2{/}']],[['',''],['','']],[['',''],['','']],[['',''],['{w}<INDEX{/}','{w}TAKEOFF>{/}']]],'')},
{ph:'FMC · TAKEOFF',c:'kR6',t:'TAKEOFF REF: flaps 5, CG, V-speeds',d:'Pulsa R6 (TAKEOFF>): flaps 5, CG y aceptar V1/VR/V2 (ejemplo 142/145/151).',w:'Flaps 5 es muy habitual en el 737; las velocidades dependen del peso.',scr:cdu('TAKEOFF REF',[[[' FLAPS','V1 '],['{w}05°{/}','{w}142{/}']],[[' THRUST','VR '],['{w}26K N1{/}','{w}145{/}']],[[' CG','V2 '],['{w}22.0%{/}','{w}151{/}']],[['RWY/POS',''],['{w}RW30{/}','']],[['',''],['','']],[['',''],['{w}<INDEX{/}','']]],'')},
{ph:'FMC · TAKEOFF',c:'kEXEC',t:'EXEC',d:'Ejecuta. Preflight del FMC completo.',w:'Desaparece el aviso "TAKEOFF SPEEDS DELETED" si lo hubiera.'},
// MCP
{ph:'MCP',c:'baro',to:'1018 HPA',t:'Altímetro: QNH 1018',d:'Pon el QNH del METAR (ejemplo).',w:'Comprueba que el altímetro marca la elevación del aeropuerto.'},
{ph:'MCP',c:'fd',to:'ON',t:'F/D: ON',d:'Director de vuelo (primero el del piloto que vuela).',w:'El primero que se enciende es el "maestro".'},
{ph:'MCP',c:'at',to:'ARM',t:'A/T ARM',d:'Arma el autothrottle.',w:'Las palancas se moverán solas al pulsar TO/GA (N1).'},
{ph:'MCP',c:'ias',to:'151',t:'IAS: V2 (151)',d:'Velocidad V2 de ejemplo.',w:'El director mantendrá V2+20 en el ascenso inicial.'},
{ph:'MCP',c:'hdg',to:'300',t:'HDG: 300',d:'Rumbo de pista.',w:'Respaldo si no hay LNAV.'},
{ph:'MCP',c:'alt',to:'5000',t:'ALT: 5000',d:'Altitud inicial (ejemplo).',w:'El avión se nivelará ahí.'},
{ph:'MCP',c:'lnav',to:'ARM',t:'LNAV armado',d:'Pulsa LNAV.',w:'Se activará tras el despegue.'},
{ph:'MCP',c:'vnav',to:'ARM',t:'VNAV armado',d:'Pulsa VNAV.',w:'Gestionará velocidad y perfil vertical.'},
// Arranque
{ph:'Antes del arranque',c:'xpdr',to:'4721 STBY',t:'Transpondedor 4721',d:'Código del ATC (ejemplo).',w:'Te identifica en el radar.'},
{ph:'Antes del arranque',t:'Puertas y autorización',d:'Puertas cerradas (luces de puertas apagadas) y autorización de pushback y puesta en marcha.',m:'PUSH & START APPROVED'},
{ph:'Antes del arranque',c:'anti',to:'ON',t:'ANTI COLLISION: ON',d:'Luz anticolisión.',w:'Aviso al personal de tierra.'},
{ph:'Antes del arranque',c:'packs',to:'OFF',t:'PACKS: OFF',d:'Apaga los packs.',w:'Todo el aire del APU va a los arrancadores: más presión = arranque mejor.',m:'DUCT PRESS ↑ (unos 30+ psi)'},
{ph:'Arranque',c:'es2',to:'GRD',t:'ENG START 2: GRD',d:'Gira el selector del motor 2 a GRD. Se abre la válvula del arrancador y N2 empieza a subir.',w:'Habitualmente se arranca primero el motor 2.',m:'START VALVE OPEN · N2 ↑'},
{ph:'Arranque',c:'sl2',to:'IDLE',t:'START LEVER 2: IDLE (a ~25 % N2)',d:'Cuando N2 llega a ~25 % (o al máximo motoring, mínimo 20 %), sube la palanca de arranque a IDLE.',w:'Eso mete combustible y encendido. Vigila EGT: si se dispara, corta el combustible. El selector vuelve solo a OFF hacia el 56 % de N2 (NG).',later:[[['es2','OFF']],'ENG 2 estable · N1 ~20 % · N2 ~60 %','Arrancando el motor 2…']},
{ph:'Arranque',c:'es1',to:'GRD',t:'ENG START 1: GRD',d:'Ahora el motor 1.',w:'Mismo procedimiento.',m:'START VALVE OPEN · N2 ↑'},
{ph:'Arranque',c:'sl1',to:'IDLE',t:'START LEVER 1: IDLE (a ~25 % N2)',d:'A ~25 % de N2, palanca a IDLE.',w:'Vigila EGT y presión de aceite.',later:[[['es1','OFF']],'ENG 1 + ENG 2 estables','Arrancando el motor 1…']},
{ph:'Después del arranque',c:'gen',to:'ON BUS',t:'GEN 1 y 2: ON BUS',d:'Conecta los generadores de los motores.',w:'Ahora los motores alimentan el avión.'},
{ph:'Después del arranque',c:'probe',to:'ON',t:'PROBE HEAT: ON',d:'Calefacción de sondas (pitot, temperatura…).',w:'Evita que el hielo bloquee los sensores de velocidad.'},
{ph:'Después del arranque',c:'packs',to:'AUTO',t:'PACKS: AUTO',d:'Vuelve a encender el aire acondicionado.',w:'Ahora el aire viene de los motores.'},
{ph:'Después del arranque',c:'apub',to:'OFF',t:'APU BLEED: OFF',d:'Corta el aire del APU.',w:'Ya no hace falta.'},
{ph:'Después del arranque',c:'apu',to:'OFF',t:'APU: OFF',d:'Apaga el APU.',w:'Ahorra combustible.'},
{ph:'Después del arranque',c:'flaps',to:'5',t:'FLAPS: 5',d:'Flaps de despegue.',w:'Coincide con TAKEOFF REF.'},
{ph:'Rodaje',c:'taxi',to:'ON',t:'TAXI: ON',d:'Luz de rodaje.',w:'Avisa de que te mueves.'},
{ph:'Rodaje',c:'pbrk',to:'OFF',t:'PARK BRAKE: OFF',d:'Con autorización de rodaje, suelta el freno.',w:'¡Listo para rodar!',m:'<span class="gr">READY FOR TAXI</span>'}
]};

PP.courses.push({
id:"b737",title:"Boeing 737 NG / MAX",sub:"Curso completo: el clásico de Boeing, panel interactivo con arranque manual y examen",icon:"✈️",level:"full",panel:"b737",
modules:[
{id:"m1",title:"1. Conoce el 737",lessons:[
{id:"l1",title:"La familia 737",html:`${SIMNOTE}
<p>El <b>Boeing 737</b> es el reactor comercial más vendido de la historia. Su primera versión voló en 1967. Hoy vuelan sobre todo dos generaciones:</p>
<ul><li><b>737 NG</b> (Next Generation: -700, -800, -900): motores <b>CFM56-7B</b>. El 737-800 es el avión de Ryanair.</li>
<li><b>737 MAX</b> (MAX 8, MAX 9…): motores <b>CFM LEAP-1B</b>, más eficientes, pantallas más grandes y winglets nuevos.</li></ul>
<p>En el simulador, el PMDG 737 es el estudio más completo; también hay opciones gratuitas.</p>
<h3>Diferencias con Airbus</h3>
<ul><li><b>Yoke</b> y mandos de vuelo <b>convencionales</b> (cables y actuadores hidráulicos, no fly-by-wire).</li><li>Palancas de gases que <b>se mueven</b> con el autothrottle.</li><li>Arranque de motores <b>manual</b>: tú decides cuándo meter combustible (a ~25 % de N2).</li><li>No hay ECAM: hay luces de aviso (Master Caution con "six pack") y el EICAS de motores.</li></ul>`},
{id:"l2",title:"Sistemas del 737",html:`
<h3>⚡ Eléctrico</h3><p>Un generador por motor (IDG), generador del APU, corriente de tierra, batería y sistema <b>standby</b> para instrumentos esenciales.</p>
<h3>💧 Hidráulico</h3><table><tr><td><b>Sistema A</b></td><td>Bomba del motor 1 + bomba eléctrica 2.</td></tr><tr><td><b>Sistema B</b></td><td>Bomba del motor 2 + bomba eléctrica 1.</td></tr><tr><td><b>Standby</b></td><td>Bomba eléctrica de respaldo.</td></tr></table>
<h3>🌬️ Neumático</h3><p>Aire sangrado de motores o APU para dos packs, presurización, antihielo y arranque de motores. La <b>válvula de aislamiento</b> separa el lado izquierdo y el derecho.</p>
<h3>⛽ Combustible</h3><p>Tanques 1 (izquierdo), 2 (derecho) y central, cada uno con dos bombas. El central se usa primero.</p>
<h3>Flaps</h3><p>Posiciones 1, 2, 5, 10, 15, 25, 30 y 40. Despegue habitual con 1 o 5; aterrizaje con 30 o 40.</p>`}],
quiz:[
{q:"¿Qué motores lleva el 737 MAX?",o:["CFM LEAP-1B","CFM56-7B","Trent 1000"],a:0,e:"El NG lleva CFM56-7B; el 787 lleva Trent 1000 o GEnx."},
{q:"¿Qué bombas presurizan el sistema hidráulico A del 737?",o:["Bomba del motor 1 y bomba eléctrica 2","Bomba del motor 2 y bomba eléctrica 1","Solo la bomba standby"],a:0,e:"A: ENG 1 + ELEC 2. B: ENG 2 + ELEC 1."},
{q:"¿Los mandos de vuelo del 737 NG son fly-by-wire?",o:["No, son convencionales con actuadores hidráulicos","Sí, como en el A320","Solo los alerones"],a:0,e:"El 737 usa mandos convencionales (cables) con actuadores hidráulicos."},
{q:"¿Qué separa la válvula de aislamiento (ISOLATION) en el 737?",o:["El lado izquierdo y el derecho del sistema neumático","Los tanques de combustible","Los sistemas hidráulicos A y B"],a:0,e:"Es una válvula del conducto neumático entre lados."},
{q:"¿Qué ajustes de flaps son típicos para aterrizar el 737?",o:["30 o 40","1 o 2","5 o 10"],a:0,e:"Aterrizaje con flaps 30 o 40; despegue normalmente 1 o 5."},
{q:"¿Qué avión opera Ryanair principalmente?",o:["Boeing 737-800 (y 737 MAX 8-200)","Airbus A320","Boeing 787-9"],a:0,e:"Ryanair es un operador 737: -800 y MAX 8-200."}]},
{id:"m2",title:"2. FMC y MCP del 737",lessons:[
{id:"l1",title:"Programar LEVC → LEBL en el 737",html:`
<p>El FMC del 737 se parece mucho al del 787 (regla <b>I-P-R-D-P-T</b>), con dos diferencias importantes:</p>
<ul><li>En <b>POS INIT</b> hay que meter la posición en <b>SET IRS POS</b> para que los IRS terminen de alinearse.</li><li>El empuje se elige en <b>N1 LIMIT</b>.</li></ul>
<ol><li>IDENT → POS INIT (SET IRS POS) → RTE (ORIGIN, DEST, RUNWAY, VIA/TO) → ACTIVATE → EXEC.</li><li>DEP ARR: SID + pista → EXEC.</li><li>PERF INIT: ZFW, RESERVES, COST INDEX, CRZ ALT → EXEC.</li><li>N1 LIMIT (TO / TO-1 / TO-2 / SEL TEMP) → TAKEOFF REF: flaps, CG, V-speeds → EXEC.</li></ol>
<h3>MCP del 737</h3><p>Muy similar al del 787: A/T ARM, N1, SPEED, LVL CHG, VNAV, LNAV, HDG SEL, APP, VOR/LOC, ALT HOLD, V/S y CMD A / CMD B para conectar el piloto automático.</p>
${TOOL("#/p/b737","🎛️ Practicar en el panel del 737")}`}],
quiz:[
{q:"En el 737, ¿dónde introduces la posición para alinear los IRS?",o:["POS INIT → SET IRS POS","PERF INIT → ZFW","RTE → ORIGIN"],a:0,e:"SET IRS POS en POS INIT."},
{q:"¿En qué página eliges el empuje reducido de despegue en el 737?",o:["N1 LIMIT","IDENT","LEGS"],a:0,e:"N1 LIMIT: TO, TO-1, TO-2 o temperatura supuesta."},
{q:"¿Qué botones conectan el piloto automático del 737?",o:["CMD A / CMD B","AP1 / AP2","A/T ARM"],a:0,e:"CMD A o CMD B. AP1/AP2 son de Airbus; A/T es el autothrottle."},
{q:"El modo LVL CHG del 737 equivale a…",o:["El FLCH del 787: cambia de nivel manteniendo velocidad","El modo de aproximación ILS","Mantener altitud"],a:0,e:"LVL CHG (Level Change) es el equivalente a FLCH."}]},
{id:"m3",title:"3. Del cold & dark al rodaje (panel)",lessons:[
{id:"l1",title:"El flujo del 737",html:`
<ol><li>Freno, <b>BATTERY</b>, STANDBY POWER en AUTO, <b>GRD POWER</b>.</li><li>Luces POSITION y <b>IRS L y R a NAV</b>.</li><li>Bombas de combustible, <b>APU START</b>, <b>APU GEN ON BUS</b>, APU BLEED.</li><li>Bombas hidráulicas eléctricas, señales.</li><li>FMC completo y MCP.</li><li>Transpondedor, puertas, ANTI COLLISION, <b>PACKS OFF</b>.</li><li><b>Arranque manual</b>: ENG START a GRD → a ~25 % N2 START LEVER a IDLE → vigila EGT. Motor 2 y luego 1.</li><li>GEN ON BUS, PROBE HEAT, PACKS AUTO, APU BLEED OFF, APU OFF, flaps, luz de rodaje, soltar freno.</li></ol>
${TOOL("#/p/b737","🎛️ Abrir el panel del 737")}
${TIP("737 MAX","En el MAX el flujo para simulador es prácticamente el mismo; cambian pantallas, motores LEAP-1B y algunos detalles del arranque. Consulta siempre la documentación de tu avión del simulador.")}`}],
quiz:[
{q:"¿Cuándo mueves la START LEVER a IDLE en el 737 NG?",o:["A ~25 % de N2 (o máximo motoring, mínimo 20 %)","En cuanto pones el selector en GRD","Cuando N1 llega al 60 %"],a:0,e:"Primero el arrancador gira el motor; a ~25 % N2 se mete combustible."},
{q:"¿Por qué se apagan los PACKS antes del arranque en el 737?",o:["Para que llegue más presión de aire a los arrancadores","Para ahorrar combustible del APU","Porque el aire acondicionado interfiere con el transpondedor"],a:0,e:"Más presión en el conducto neumático = mejor arranque."},
{q:"¿Qué haces con los generadores tras arrancar los motores?",o:["GEN 1 y 2 a ON BUS","Nada, se conectan siempre solos","Apagar la batería"],a:0,e:"En el 737 se conectan manualmente con los interruptores GEN."},
{q:"Tras alinear los IRS en NAV, ¿qué falta en el 737?",o:["Introducir la posición en el FMC (SET IRS POS)","Arrancar el motor 1","Poner los flaps a 40"],a:0,e:"Los IRS del 737 piden la posición inicial en POS INIT."},
{q:"¿Qué indica la luz ámbar LOW PRESSURE en una bomba de combustible?",o:["Que la bomba no da presión (por ejemplo, está apagada)","Que el tanque está lleno","Que el combustible está demasiado frío"],a:0,e:"Con la bomba apagada o fallando, la presión es baja y se ilumina."}]}
],
final:{n:15,pass:75}
});
})();
