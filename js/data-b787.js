/* ===================== BOEING 787 ===================== */
(function(){
const OFFL={OFF:[['',''],['OFF','w']],ON:[['',''],['','d']]};
const RTE1=(x)=>x;
PP.panels.b787={
name:"Boeing 787 Dreamliner",quiz:"#/q/b787/m4",
ecamStart:'<span class="wh">COLD & DARK · EICAS apagado</span>',
sections:[
{id:'elec',name:'Overhead · ELECTRICAL',ctls:[
 pb('bat','BATTERY','OFF',OFFL,'Conecta las baterías principal y del APU.'),
 pb('apugl','APU GEN L','OFF',OFFL,'Generador izquierdo del APU.'),pb('apugr','APU GEN R','OFF',OFFL,'Generador derecho del APU.'),
 pb('extl','FWD EXT PWR L','AVAIL',S_AVAIL,'Corriente de tierra delantera izquierda.'),pb('extr','FWD EXT PWR R','AVAIL',S_AVAIL,'Corriente de tierra delantera derecha.'),
 sel('apu','APU',['OFF','ON','START'],'OFF','Selector del APU: START vuelve solo a ON.')]},
{id:'irs',name:'Overhead · IRS',ctls:[sel('irsl','IRS L',['OFF','ON'],'OFF','Sistema inercial izquierdo.'),sel('irsr','IRS R',['OFF','ON'],'OFF','Sistema inercial derecho.')]},
{id:'hyd',name:'Overhead · HYDRAULICS',ctls:[
 pb('hl','L ENG PRI','ON',{ON:[['',''],['','d']]},'Bomba primaria del motor izquierdo (normal ON).'),
 pb('c1','C1 ELEC','OFF',OFFL,'Bomba eléctrica primaria C1 del sistema central.'),pb('c2','C2 ELEC','OFF',OFFL,'Bomba eléctrica primaria C2 del sistema central.'),
 pb('hr','R ENG PRI','ON',{ON:[['',''],['','d']]},'Bomba primaria del motor derecho (normal ON).'),
 sel('dem','DEMAND PUMPS',['OFF','AUTO','ON'],'OFF','Bombas de demanda L, C1, C2 y R (agrupadas aquí).')]},
{id:'fuel',name:'Overhead · FUEL',ctls:[
 pb('fl','L FWD+AFT','OFF',{OFF:[['',''],['OFF','w']],ON:[['',''],['','d']]},'Bombas del tanque izquierdo.'),
 pb('fc','CENTER L+R','OFF',{OFF:[['',''],['','']],ON:[['',''],['','d']]},'Bombas del tanque central (solo si hay combustible en él).'),
 pb('fr','R FWD+AFT','OFF',{OFF:[['',''],['OFF','w']],ON:[['',''],['','d']]},'Bombas del tanque derecho.')]},
{id:'lt',name:'Overhead · LIGHTS y SIGNS',ctls:[
 tg('nav','NAV',['OFF','ON'],'OFF','Luces de navegación.'),tg('beacon','BEACON',['OFF','ON'],'OFF','Anticolisión roja.'),tg('taxi','TAXI',['OFF','ON'],'OFF','Luz de rodaje.'),
 sel('belts','SEATBELTS',['OFF','AUTO','ON'],'OFF','Señal de cinturones.')]},
{id:'mcp',name:'Glareshield · MCP y EFIS',dark:true,ctls:[
 disp('baro','BARO','29.92 IN','Ajuste del altímetro.'),tg('fd','F/D',['OFF','ON'],'OFF','Director de vuelo.'),tg('at','A/T ARM',['OFF','ARM'],'OFF','Arma el autothrottle.'),
 disp('ias','IAS','200','Velocidad seleccionada.'),disp('hdg','HDG','000','Rumbo seleccionado.'),disp('alt','ALT','10000','Altitud seleccionada.'),
 pb('lnav','LNAV','OFF',{OFF:[['',''],['','']],ARM:[['',''],['▬','g']]},'Navegación lateral del FMC.'),pb('vnav','VNAV','OFF',{OFF:[['',''],['','']],ARM:[['',''],['▬','g']]},'Navegación vertical del FMC.')]},
{id:'cdu',name:'Pedestal · CDU (FMC)',cdu:true,tag:'CDU L',ctls:[...LSK('k'),key('kINIT','INIT REF'),key('kRTE','RTE'),key('kDEP','DEP ARR'),key('kEXEC','EXEC'),key('kPREV','PREV PG'),key('kNEXT','NEXT PG'),key('kLEGS','LEGS'),key('kPROG','PROG')]},
{id:'ped',name:'Pedestal y panel inferior',ctls:[
 disp('xpdr','XPDR','2000 STBY','Transpondedor.'),
 sel('stl','ENG START L',['NORM','START'],'NORM','Selector de arranque del motor izquierdo.'),sel('str','ENG START R',['NORM','START'],'NORM','Selector de arranque del motor derecho.'),
 lev('fcl','FUEL CTRL L',['CUTOFF','RUN'],'CUTOFF','Interruptor de control de combustible izquierdo.','lv-white'),lev('fcr','FUEL CTRL R',['CUTOFF','RUN'],'CUTOFF','Interruptor de control de combustible derecho.','lv-white'),
 tg('pbrk','PARK BRAKE',['OFF','SET'],'OFF','Freno de aparcamiento.'),sel('flaps','FLAPS',['UP','1','5','15','17','18','20','25','30'],'UP','Palanca de flaps.')]}
],
flow:[
{ph:'Preparación',t:'Cabina oscura del Dreamliner',d:'Todo apagado. Antes de dar energía: palanca del tren DOWN, flaps alternos OFF y limpiaparabrisas OFF. Te iré marcando cada control.',w:'Evitas que se muevan sistemas por sorpresa al alimentar el avión.'},
{ph:'Preparación',c:'pbrk',to:'SET',t:'PARK BRAKE: SET',d:'Pon el freno de aparcamiento.',w:'El avión debe estar inmóvil (además, los IRS lo necesitan para alinearse). En el 787 los frenos son eléctricos.'},
{ph:'Energía',c:'bat',to:'ON',t:'BATTERY: ON',d:'Pulsa BATTERY: se apaga la luz OFF.',w:'Es siempre el primer interruptor. Con la batería, los ordenadores del "common core system" empiezan a arrancar (tardan un poco).',m:'BATTERY ON · pantallas iniciándose…'},
{ph:'Energía',c:'extl',to:'ON',t:'FWD EXT PWR L: ON',d:'Con AVAIL encendido, púlsalo: pasa a ON.',w:'El 787 es un avión "más eléctrico": casi todo funciona con electricidad, así que conviene darle corriente de tierra cuanto antes.'},
{ph:'Energía',c:'extr',to:'ON',t:'FWD EXT PWR R: ON',d:'Ahora el derecho.',w:'Con las dos tomas delanteras se alimentan más cargas sin desconexiones.',m:'EXT PWR L+R ON · EICAS activo'},
{ph:'Energía',c:'nav',to:'ON',t:'Luces NAV: ON',d:'Luces de navegación encendidas.',w:'Indican que el avión tiene energía.'},
{ph:'IRS',c:'irsl',to:'ON',t:'IRS L: ON',d:'Selector IRS izquierdo a ON.',w:'Los sistemas inerciales dan actitud, rumbo y posición. Se alinean solos con el avión quieto.',m:'IRS L ALIGN'},
{ph:'IRS',c:'irsr',to:'ON',t:'IRS R: ON',d:'Y el derecho.',w:'La alineación lleva varios minutos. Seguimos con lo demás mientras tanto.',m:'IRS L + R ALIGN'},
{ph:'APU',c:'apugl',to:'ON',t:'APU GEN L: ON',d:'Arma el generador izquierdo del APU.',w:'Se seleccionan antes de arrancar el APU para que se conecten solos cuando esté listo.'},
{ph:'APU',c:'apugr',to:'ON',t:'APU GEN R: ON',d:'Arma el generador derecho del APU.',w:'El APU del 787 tiene dos generadores-arrancadores.'},
{ph:'APU',c:'apu',to:'ON',t:'APU: START (vuelve a ON)',d:'Gira el selector a START; muelle de vuelta a ON. (Aquí un toque.)',w:'⚠️ El APU del 787 solo produce ELECTRICIDAD: el 787 no tiene sistema de aire sangrado (bleedless). Por eso no hay "APU BLEED".',m:'APU START…',later:[[],'<span class="gr">APU RUNNING</span> · APU GEN L+R disponibles','Arrancando el APU…']},
{ph:'Hidráulico',c:'c1',to:'ON',t:'C1 ELEC: ON',d:'Bomba eléctrica primaria C1.',w:'Presuriza el sistema hidráulico central (C), que mueve, entre otros, flaps, tren y dirección de la rueda de morro.'},
{ph:'Hidráulico',c:'c2',to:'ON',t:'C2 ELEC: ON',d:'Bomba eléctrica primaria C2.',w:'El 787 tiene tres sistemas hidráulicos (izquierdo, central y derecho) que trabajan a 5.000 psi.',m:'HYD C: presión normal'},
{ph:'Combustible',c:'fl',to:'ON',t:'Bombas izquierdas: ON',d:'Bombas delantera y trasera del tanque izquierdo.',w:'Alimentan el motor izquierdo (y el APU).'},
{ph:'Combustible',c:'fr',to:'ON',t:'Bombas derechas: ON',d:'Bombas del tanque derecho.',w:'Las bombas centrales solo se encienden si hay combustible en el tanque central. Para un vuelo corto como LEVC-LEBL suele ir vacío, así que las dejamos en OFF.'},
{ph:'Cabina',c:'belts',to:'ON',t:'SEATBELTS: ON',d:'Señal de cinturones.',w:'Durante embarque, rodaje, despegue y aterrizaje.'},
// CDU
{ph:'FMC · IDENT',c:'kINIT',t:'INIT REF → IDENT',d:'Pulsa INIT REF. Aparece la página IDENT.',w:'Compruebas el modelo de avión, los motores y que la base de datos de navegación (ACTIVE) está vigente.',scr:cdu('IDENT',[[[' MODEL','ENGINES'],['{w}787-9{/}','{w}TRENT1000{/}']],[[' NAV DATA','ACTIVE'],['{w}AIRAC{/}','{w}VIGENTE{/}']],[['',''],['','']],[[' OP PROGRAM',''],['{w}SIMULADOR{/}','']],[['',''],['','']],[['',''],['{w}<INDEX{/}','{w}POS INIT>{/}']]],'')},
{ph:'FMC · POS INIT',c:'kR6',t:'POS INIT',d:'Pulsa R6 (POS INIT>). He escrito "LEVC" en el scratchpad.',w:'Aquí se pone el aeropuerto de referencia y se comprueba la posición GPS que usan los IRS.',scr:cdu('POS INIT',[[['','LAST POS'],['','{w}N39°29.3 W000°28.8{/}']],[[' REF AIRPORT',''],['{o}[][][][]{/}','']],[[' GATE',''],['{w}-----{/}','']],[['','GPS POS'],['','{w}N39°29.3 W000°28.8{/}']],[['',''],['','']],[['',''],['{w}<INDEX{/}','{w}ROUTE>{/}']]],'LEVC')},
{ph:'FMC · POS INIT',c:'kL2',t:'REF AIRPORT: LEVC',d:'Pulsa L2.',w:'Sirve para comprobar que la posición del avión coincide con el aeropuerto donde estás.',scr:cdu('POS INIT',[[['','LAST POS'],['','{w}N39°29.3 W000°28.8{/}']],[[' REF AIRPORT',''],['{w}LEVC{/}','{w}N39°29.4 W000°28.9{/}']],[[' GATE',''],['{w}-----{/}','']],[['','GPS POS'],['','{w}N39°29.3 W000°28.8{/}']],[['',''],['','']],[['',''],['{w}<INDEX{/}','{w}ROUTE>{/}']]],'')},
{ph:'FMC · RTE',c:'kRTE',t:'RTE: origen y destino',d:'Pulsa RTE. En la página RTE 1 introducirás origen, destino, pista y número de vuelo (te lo resumo en el siguiente toque).',w:'En Boeing, la ruta se construye en RTE; la salida y llegada en DEP ARR.',scr:cdu('RTE 1          1/2',[[[' ORIGIN','DEST '],['{o}[][][][]{/}','{o}[][][][]{/}']],[[' RUNWAY','FLT NO'],['{w}-----{/}','{w}----------{/}']],[[' REQUEST','CO ROUTE'],['{w}<SEND{/}','{w}----------{/}']],[['',''],['','']],[['',''],['','']],[['',''],['{w}<RTE 2{/}','{w}ACTIVATE>{/}']]],'LEVC')},
{ph:'FMC · RTE',c:'kL1',t:'ORIGIN LEVC, DEST LEBL, RWY30',d:'Pulsa L1 (ORIGIN). Después se meten DEST en R1, RUNWAY "RW30" en L2 y FLT NO en R2; aquí en un toque.',w:'El origen debe introducirse primero: al cambiarlo se borra la ruta anterior.',scr:cdu('RTE 1          1/2',[[[' ORIGIN','DEST '],['{w}LEVC{/}','{w}LEBL{/}']],[[' RUNWAY','FLT NO'],['{w}RW30{/}','{w}JLN123{/}']],[[' REQUEST','CO ROUTE'],['{w}<SEND{/}','{w}----------{/}']],[['',''],['','']],[['',''],['','']],[['',''],['{w}<RTE 2{/}','{w}ACTIVATE>{/}']]],'')},
{ph:'FMC · RTE',c:'kNEXT',t:'Página 2: VIA y TO',d:'Pulsa NEXT PAGE. En VIA escribes la aerovía y en TO el punto final: "UN725" → "MARTA" (ejemplo ficticio). El primer punto (AZAHR) viene de la SID.',w:'Cada línea es un tramo: por dónde (VIA) y hasta dónde (TO). DIRECT significa directo.',scr:cdu('RTE 1          2/2',[[[' VIA','TO '],['{w}AZAHR1A{/}','{w}AZAHR{/}']],[['',''],['{w}UN725{/}','{w}MARTA{/}']],[['',''],['{w}-----{/}','{w}-----{/}']],[['',''],['','']],[['',''],['','']],[['',''],['{w}<RTE 2{/}','{w}ACTIVATE>{/}']]],'')},
{ph:'FMC · RTE',c:'kR6',t:'ACTIVATE',d:'Pulsa R6 (ACTIVATE>). La tecla EXEC se ilumina.',w:'Boeing usa "modificar → ejecutar": nada cambia hasta que pulsas EXEC. Así puedes revisar antes de confirmar.',scr:cdu('{o}MOD{/} RTE 1      2/2',[[[' VIA','TO '],['{w}AZAHR1A{/}','{w}AZAHR{/}']],[['',''],['{w}UN725{/}','{w}MARTA{/}']],[['',''],['{w}-----{/}','{w}-----{/}']],[['',''],['','']],[['',''],['','']],[['',''],['{w}<RTE 2{/}','{w}PERF INIT>{/}']]],'')},
{ph:'FMC · RTE',c:'kEXEC',t:'EXEC',d:'Pulsa EXEC para activar la ruta.',w:'La ruta pasa a ser ACT RTE 1 y aparece en magenta en el ND.',scr:cdu('ACT RTE 1      2/2',[[[' VIA','TO '],['{w}AZAHR1A{/}','{w}AZAHR{/}']],[['',''],['{w}UN725{/}','{w}MARTA{/}']],[['',''],['{w}-----{/}','{w}-----{/}']],[['',''],['','']],[['',''],['','']],[['',''],['{w}<RTE 2{/}','{w}PERF INIT>{/}']]],'')},
{ph:'FMC · DEP ARR',c:'kDEP',t:'DEP ARR: salida',d:'Pulsa DEP ARR → <DEP (LEVC). Elige la SID AZAHR1A y la pista 30 (ficticia).',w:'La SID que te asigne el ATC puede cambiar; se modifica aquí.',scr:cdu('LEVC DEPARTURES',[[[' SIDS','RUNWAYS '],['{w}AZAHR1A <SEL>{/}','{w}<SEL> 30{/}']],[['',''],['{w}NARAN1A{/}','{w}12{/}']],[[' TRANS',''],['{w}NONE{/}','']],[['',''],['','']],[['',''],['','']],[['',''],['{w}<ERASE{/}','{w}ROUTE>{/}']]],'')},
{ph:'FMC · DEP ARR',c:'kEXEC',t:'EXEC',d:'Ejecuta los cambios de la salida.',w:'Revisa en LEGS que no haya discontinuidades entre la SID y la aerovía.'},
{ph:'FMC · PERF',c:'kINIT',t:'PERF INIT',d:'INIT REF → PERF INIT. He preparado los datos de ejemplo del OFP: ZFW 172,0 t, reservas 4,5 t, cost index 60, crucero FL240 (todo de ejemplo).',w:'El FMC necesita el peso para calcular velocidades y consumo. El combustible lo lee de los sensores.',scr:cdu('PERF INIT',[[[' GR WT','CRZ ALT'],['{w}---.-{/}','{o}[][][][][]{/}']],[[' FUEL',''],['{w}14.0{/}','']],[[' ZFW',''],['{o}[][][].[]{/}','']],[[' RESERVES',''],['{o}[][].[]{/}','']],[[' COST INDEX',''],['{o}[][][][]{/}','']],[['',''],['{w}<INDEX{/}','{w}THRUST LIM>{/}']]],'172.0')},
{ph:'FMC · PERF',c:'kL3',t:'ZFW, RESERVES, COST INDEX, CRZ ALT',d:'Pulsa L3 (ZFW). Las demás casillas (L4 reservas, L5 cost index, R1 FL240) se rellenan igual; aquí en un toque.',w:'Con el ZFW y el combustible, el FMC calcula el peso bruto (GR WT).',scr:cdu('{o}MOD{/} PERF INIT',[[[' GR WT','CRZ ALT'],['{w}186.0{/}','{w}FL240{/}']],[[' FUEL',''],['{w}14.0{/}','']],[[' ZFW',''],['{w}172.0{/}','']],[[' RESERVES',''],['{w}4.5{/}','']],[[' COST INDEX',''],['{w}60{/}','']],[['',''],['{w}<INDEX{/}','{w}THRUST LIM>{/}']]],'')},
{ph:'FMC · PERF',c:'kEXEC',t:'EXEC',d:'Ejecuta PERF INIT.',w:'Ahora el FMC ya puede calcular la subida, el crucero y el descenso.'},
{ph:'FMC · TAKEOFF',c:'kR6',t:'THRUST LIM → TAKEOFF REF',d:'Pulsa R6 (THRUST LIM) para elegir empuje de despegue (TO, TO 1, TO 2 o temperatura supuesta) y luego TAKEOFF REF. Ejemplo: flaps 5.',w:'Despegar con empuje reducido cuando se puede alarga la vida de los motores.',scr:cdu('TAKEOFF REF',[[[' FLAPS','V1 '],['{o}[][]{/}','{w}--{/}']],[[' THRUST','VR '],['{w}TO{/}','{w}--{/}']],[[' CG','V2 '],['{o}[][].[]%{/}','{w}--{/}']],[['RWY/POS',''],['{w}RW30{/}','']],[['',''],['','']],[['',''],['{w}<INDEX{/}','{w}POS INIT>{/}']]],'5')},
{ph:'FMC · TAKEOFF',c:'kL1',t:'Flaps 5 y CG → aceptar V-speeds',d:'Pulsa L1 para poner flaps 5. Tras introducir el CG, el FMC propone V1/VR/V2 en pequeño; se aceptan pulsando R1-R3 y EXEC.',w:'Las velocidades de este ejemplo (V1 145, VR 151, V2 157) son inventadas. En el simulador usa las del FMC o del EFB.',scr:cdu('{o}MOD{/} TAKEOFF REF',[[[' FLAPS','V1 '],['{w}5°{/}','{w}145{/}']],[[' THRUST','VR '],['{w}TO{/}','{w}151{/}']],[[' CG','V2 '],['{w}24.0%{/}','{w}157{/}']],[['RWY/POS',''],['{w}RW30{/}','']],[['',''],['','']],[['',''],['{w}<INDEX{/}','{w}POS INIT>{/}']]],'')},
{ph:'FMC · TAKEOFF',c:'kEXEC',t:'EXEC',d:'Ejecuta. El preflight del FMC está completo.',w:'Las V-speeds aparecen en la cinta de velocidad del PFD.'},
// MCP
{ph:'MCP',c:'baro',to:'1018 HPA',t:'Altímetro: QNH 1018',d:'Toca BARO para poner el QNH (ejemplo 1018 hPa).',w:'Boeing puede mostrar hPa o pulgadas (IN). En Europa se usa hPa.'},
{ph:'MCP',c:'fd',to:'ON',t:'F/D: ON',d:'Director de vuelo encendido.',w:'Al encenderlo en tierra se arman los modos de despegue (TO/GA).'},
{ph:'MCP',c:'at',to:'ARM',t:'A/T ARM',d:'Arma el autothrottle.',w:'En Boeing las palancas de gases SÍ se mueven solas con el autothrottle.'},
{ph:'MCP',c:'ias',to:'157',t:'IAS: V2 (157)',d:'Pon la velocidad V2 de ejemplo en la ventana IAS.',w:'En despegue el director de vuelo mantiene unos V2+15/+25 kt.'},
{ph:'MCP',c:'hdg',to:'300',t:'HDG: rumbo de pista 300',d:'Pon el rumbo de la pista.',w:'Si algo falla con la navegación lateral, el avión seguirá el rumbo de pista.'},
{ph:'MCP',c:'alt',to:'5000',t:'ALT: 5000',d:'Altitud inicial autorizada (ejemplo).',w:'El avión no pasará de esta altitud aunque el FMC quiera subir más.'},
{ph:'MCP',c:'lnav',to:'ARM',t:'LNAV armado',d:'Pulsa LNAV.',w:'Al despegar, a partir de unos 50 ft, el avión seguirá la ruta del FMC lateralmente.'},
{ph:'MCP',c:'vnav',to:'ARM',t:'VNAV armado',d:'Pulsa VNAV.',w:'A partir de unos 400 ft el avión gestionará velocidad y altitud según el FMC.'},
// Antes del arranque
{ph:'Antes del arranque',c:'xpdr',to:'4721 XPNDR',t:'Transpondedor 4721',d:'Introduce el código del ATC (ejemplo).',w:'Te identifica en el radar.'},
{ph:'Antes del arranque',t:'Puertas cerradas y autorización',d:'Comprueba en EICAS que todas las puertas están cerradas y pide pushback y puesta en marcha.',m:'DOORS <span class="gr">CLOSED</span> · PUSH & START APPROVED'},
{ph:'Antes del arranque',c:'dem',to:'AUTO',t:'DEMAND PUMPS: AUTO',d:'Bombas de demanda a AUTO.',w:'Dan presión extra si la bomba primaria no es suficiente (p. ej. al subir el tren o si falla una bomba).'},
{ph:'Antes del arranque',c:'beacon',to:'ON',t:'BEACON: ON',d:'Luz anticolisión.',w:'Señal para el personal de tierra: los motores van a arrancar.'},
{ph:'Arranque',c:'str',to:'START',t:'ENG START R: START',d:'Selector del motor derecho a START.',w:'Los motores del 787 arrancan con sus propios generadores funcionando como motores eléctricos, alimentados por el APU o la corriente de tierra.'},
{ph:'Arranque',c:'fcr',to:'RUN',t:'FUEL CONTROL R: RUN',d:'Justo después, sube el interruptor de combustible derecho a RUN.',w:'El 787 tiene arranque automático: no esperas a un % de N2. El sistema vigila y corrige arranques fallidos. Tú vigilas el EICAS.',m:'ENG R START · N2 ↑ · EGT ↑',later:[[['str','NORM']],'ENG R estable al ralentí','Arrancando motor derecho…']},
{ph:'Arranque',c:'stl',to:'START',t:'ENG START L: START',d:'Ahora el izquierdo.',w:'Con APU puede arrancarse en paralelo; aquí lo hacemos uno a uno para aprender.'},
{ph:'Arranque',c:'fcl',to:'RUN',t:'FUEL CONTROL L: RUN',d:'Interruptor de combustible izquierdo a RUN.',w:'Igual que antes: autostart.',m:'ENG L START · N2 ↑',later:[[['stl','NORM']],'ENG L + R estables al ralentí','Arrancando motor izquierdo…']},
{ph:'Después del arranque',c:'apu',to:'OFF',t:'APU: OFF',d:'Apaga el APU.',w:'Los cuatro generadores de los motores alimentan ya el avión.'},
{ph:'Después del arranque',c:'flaps',to:'5',t:'FLAPS: 5',d:'Flaps de despegue (el que pusiste en TAKEOFF REF).',w:'El aviso de configuración de despegue saltaría si no coinciden.'},
{ph:'Rodaje',c:'taxi',to:'ON',t:'TAXI: ON',d:'Luz de rodaje.',w:'Ilumina y avisa de que te mueves.'},
{ph:'Rodaje',c:'pbrk',to:'OFF',t:'PARK BRAKE: OFF',d:'Con autorización de rodaje, suelta el freno.',w:'¡Listo para rodar! Rueda con suavidad usando el tiller.',m:'<span class="gr">READY FOR TAXI</span>'}
]};

PP.courses.push({
id:"b787",title:"Boeing 787 Dreamliner",sub:"Curso completo: el avión 'más eléctrico', FMC, MCP, panel interactivo y examen",icon:"🛫",level:"full",panel:"b787",
modules:[
{id:"m1",title:"1. Conoce el 787",lessons:[
{id:"l1",title:"El Dreamliner",html:`${SIMNOTE}
<p>El <b>Boeing 787 Dreamliner</b> es un avión de fuselaje ancho (dos pasillos) para vuelos de largo alcance. Voló por primera vez en <b>2009</b> y entró en servicio en <b>2011</b> con All Nippon Airways.</p>
<ul><li><b>Versiones</b>: 787-8, 787-9 y 787-10 (de menor a mayor).</li>
<li><b>Motores</b>: Rolls-Royce Trent 1000 o General Electric GEnx-1B.</li>
<li><b>Materiales compuestos</b>: aproximadamente la mitad de su estructura (en peso) es fibra de carbono.</li>
<li><b>Cabina de pasajeros</b>: ventanillas grandes con oscurecimiento electrónico, mayor humedad y presión de cabina equivalente a unos 6.000 ft (frente a ~8.000 ft en aviones más antiguos).</li>
<li>En España lo opera, por ejemplo, Air Europa. Microsoft Flight Simulator incluye un 787 de serie.</li></ul>
<h3>Lo más especial: avión "más eléctrico" (bleedless)</h3>
<p>Casi no usa aire sangrado de los motores. Presurización, antihielo de alas, frenos y arranque de motores son <b>eléctricos</b>. Solo el antihielo de las góndolas de los motores sigue usando aire del motor.</p>
${TIP("Boeing vs Airbus","En el 787 pilotas con <b>yoke</b> (cuernos) aunque sea fly-by-wire, y las palancas de gases se mueven solas con el autothrottle.")}`},
{id:"l2",title:"La cabina del 787",html:`
<ul><li><b>Cinco grandes pantallas</b> configurables: PFD, ND, EICAS y pantallas multifunción (MFD) donde puedes ver sistemas, checklist electrónica o mapas.</li>
<li><b>HUD</b> (head-up display) de serie para ambos pilotos.</li><li><b>EFB integrado</b> a los lados.</li>
<li><b>MCP</b> en el glareshield (piloto automático) y <b>CDU</b> en el pedestal para el FMC.</li>
<li><b>EICAS</b>: muestra motores y mensajes de alerta: <b class="r">WARNING</b> (rojo), <b class="a">CAUTION</b> y <b class="a">ADVISORY</b> (ámbar), MEMO (blanco).</li>
<li><b>Checklist electrónica (ECL)</b>: muchas casillas se marcan solas al detectar los sensores el interruptor en su sitio.</li></ul>`}],
quiz:[
{q:"¿Qué significa que el 787 sea “bleedless”?",o:["Que casi no usa aire sangrado de los motores: muchos sistemas son eléctricos","Que no tiene sistema hidráulico","Que no necesita APU"],a:0,e:"Presurización, antihielo de alas y arranque son eléctricos; el aire sangrado solo se usa para el antihielo de las góndolas de los motores."},
{q:"¿Qué motores puede llevar el 787?",o:["Trent 1000 o GEnx-1B","CFM56 o LEAP-1B","GE90 o PW4000"],a:0,e:"CFM56/LEAP-1B son del 737 y GE90/PW4000 del 777."},
{q:"¿Con qué se pilota el 787?",o:["Con yoke (cuernos)","Con sidestick","Con una palanca central"],a:0,e:"Aunque es fly-by-wire, Boeing mantiene el yoke."},
{q:"¿Qué versión del 787 es la más larga?",o:["787-10","787-8","787-9"],a:0,e:"-8 < -9 < -10 en longitud."},
{q:"La altitud de cabina del 787 equivale aproximadamente a…",o:["6.000 ft","12.000 ft","Nivel del mar"],a:0,e:"Unos 6.000 ft, más confortable que los ~8.000 ft de muchos aviones anteriores."},
{q:"¿Dónde ves los mensajes de aviso de sistemas en el 787?",o:["En el EICAS","En el MCP","En el transpondedor"],a:0,e:"EICAS = Engine Indicating and Crew Alerting System."}]},
{id:"m2",title:"2. Sistemas principales",lessons:[
{id:"l1",title:"Electricidad, hidráulico y combustible",html:`
<h3>⚡ Eléctrico (el corazón del 787)</h3><ul><li>Cada motor lleva <b>dos generadores-arrancadores</b> (VFSG): 4 en total.</li><li>El <b>APU</b> lleva otros <b>dos</b> generadores-arrancadores.</li><li><b>Tres tomas de tierra</b>: dos delanteras y una trasera.</li><li><b>Baterías</b> principal y del APU; <b>RAT</b> para emergencias.</li></ul>
<h3>💧 Hidráulico</h3><p>Tres sistemas: <b>izquierdo (L)</b>, <b>central (C)</b> y <b>derecho (R)</b>, a <b>5.000 psi</b>. L y R tienen bomba de motor; C tiene dos bombas eléctricas primarias (C1, C2). Además hay bombas de <b>demanda</b> que ayudan cuando hace falta.</p>
<h3>⛽ Combustible</h3><p>Tanques izquierdo, central y derecho con bombas delantera y trasera en cada ala. El combustible del tanque central se usa primero cuando lo hay.</p>
<h3>🌬️ Aire y presurización</h3><p>Compresores eléctricos (CAC) toman aire exterior y lo comprimen para la cabina. Por eso el APU no tiene "bleed".</p>
<h3>🧊 Antihielo</h3><p>Alas: <b>electrotérmico</b> (resistencias). Motores: aire caliente del propio motor.</p>`}],
quiz:[
{q:"¿Cuántos generadores-arrancadores tiene cada motor del 787?",o:["Dos","Uno","Cuatro"],a:0,e:"Dos VFSG por motor, cuatro en total, más dos en el APU."},
{q:"¿A qué presión trabajan los sistemas hidráulicos del 787?",o:["5.000 psi","3.000 psi","1.500 psi"],a:0,e:"El 787 usa 5.000 psi (muchos aviones anteriores usan 3.000)."},
{q:"¿Cómo se presuriza la cabina del 787?",o:["Con compresores eléctricos que toman aire exterior","Con aire sangrado de los motores","Con el aire del APU únicamente"],a:0,e:"Cabin Air Compressors eléctricos: arquitectura sin sangrado."},
{q:"¿Qué sistema hidráulico tiene bombas eléctricas primarias C1 y C2?",o:["El central (C)","El izquierdo (L)","El derecho (R)"],a:0,e:"L y R tienen bombas de motor; C tiene dos eléctricas primarias."},
{q:"¿Cómo funciona el antihielo de las alas del 787?",o:["Con resistencias eléctricas (electrotérmico)","Con aire caliente de los motores","Con líquido anticongelante"],a:0,e:"Wing ice protection electrotérmica: otra consecuencia del diseño sin bleed."}]},
{id:"m3",title:"3. MCP y modos de vuelo",lessons:[
{id:"l1",title:"El panel del piloto automático (MCP)",html:`
<table><tr><td><b>A/T ARM</b></td><td>Arma el autothrottle (las palancas se mueven solas).</td></tr>
<tr><td><b>F/D</b></td><td>Director de vuelo.</td></tr>
<tr><td><b>IAS/MACH</b></td><td>Velocidad seleccionada.</td></tr>
<tr><td><b>LNAV / VNAV</b></td><td>Navegación lateral / vertical del FMC.</td></tr>
<tr><td><b>FLCH</b></td><td>Cambio de nivel: sube o baja a la altitud del MCP manteniendo velocidad.</td></tr>
<tr><td><b>HDG/TRK SEL y HOLD</b></td><td>Rumbo/derrota seleccionados.</td></tr>
<tr><td><b>V/S – FPA</b></td><td>Velocidad vertical o ángulo de trayectoria.</td></tr>
<tr><td><b>ALT HOLD</b></td><td>Mantener altitud.</td></tr>
<tr><td><b>LOC / APP</b></td><td>Captura del localizador / aproximación completa (LOC + G/S).</td></tr>
<tr><td><b>A/P</b></td><td>Conecta el piloto automático.</td></tr></table>
<h3>Modos del autothrottle en el FMA</h3><p><b>THR REF</b> (empuje de referencia), <b>SPD</b> (mantiene velocidad), <b>HOLD</b> (palancas libres en el despegue), <b>IDLE</b>, <b>THR</b>.</p>
<h3>Despegue típico</h3><ol><li>Pulsa <b>TO/GA</b> en las palancas: THR REF.</li><li>A VR rota a ~15°. Tren arriba.</li><li>LNAV se activa a ~50 ft y VNAV a ~400 ft (si están armados).</li><li>Conecta A/P. Recoge flaps según las velocidades de la cinta.</li></ol>
<h3>Aproximación</h3><ol><li>Prepara la llegada en DEP ARR y el VREF en la página APPROACH REF (flaps 25 o 30).</li><li>Baja con VNAV o FLCH. Por debajo de FL100, 250 kt.</li><li>Pulsa <b>APP</b> para capturar el ILS. Flaps 1, 5, 15/20, tren, 25/30.</li><li>Autobrake, speedbrake ARMED y a la DA: decide.</li></ol>`}],
quiz:[
{q:"¿Qué hace el modo FLCH?",o:["Sube o baja a la altitud del MCP manteniendo la velocidad seleccionada","Mantiene la altitud actual","Sigue la ruta lateral del FMC"],a:0,e:"Flight Level Change: cambia de nivel ajustando el cabeceo para mantener la velocidad."},
{q:"¿Qué botón captura localizador y senda de planeo?",o:["APP","LOC","LNAV"],a:0,e:"APP arma LOC y G/S; LOC solo el localizador."},
{q:"En Boeing, con autothrottle activo, las palancas de gases…",o:["Se mueven solas","Se quedan quietas en una muesca","Se desconectan"],a:0,e:"A diferencia de Airbus, las palancas de Boeing se mueven físicamente."},
{q:"¿Qué inicia el empuje de despegue en Boeing?",o:["Los interruptores TO/GA de las palancas","El botón A/P","El selector de flaps"],a:0,e:"TO/GA activa THR REF y los modos de despegue del director."},
{q:"Si LNAV está armado en el despegue, se activa aproximadamente a…",o:["50 ft","5.000 ft","FL100"],a:0,e:"LNAV se activa a ~50 ft sobre la pista; VNAV a ~400 ft."}]},
{id:"m4",title:"4. Del cold & dark al rodaje (panel)",lessons:[
{id:"l1",title:"El flujo del 787 explicado",html:`
<ol><li>Freno, <b>BATTERY ON</b> (siempre lo primero).</li><li><b>FWD EXT PWR</b> L y R.</li><li>Luces NAV e <b>IRS</b> L y R en ON.</li><li><b>APU GEN</b> L y R, <b>APU START</b>.</li><li>Hidráulico: <b>C1 y C2 ELEC</b>.</li><li>Bombas de combustible (central solo si hay combustible).</li><li>Cinturones.</li><li><b>FMC</b>: IDENT → POS INIT → RTE → DEP ARR → PERF INIT → THRUST LIM → TAKEOFF REF (con EXEC).</li><li><b>MCP</b>: altímetro, F/D, A/T ARM, V2, rumbo, altitud, LNAV, VNAV.</li><li>Transpondedor, puertas, <b>bombas de demanda AUTO</b>, <b>BEACON</b>.</li><li><b>Arranque</b>: START + FUEL CONTROL RUN (autostart), un motor y luego otro.</li><li>APU OFF, flaps, luz de rodaje, soltar freno.</li></ol>
${TOOL("#/p/b787","🎛️ Abrir el panel interactivo del 787")}
${TIP("Regla Boeing del FMC","<b>I-P-R-D-P-T</b>: IDENT, POS INIT, RTE, DEP ARR, PERF INIT, TAKEOFF REF. Y siempre: si la tecla EXEC se ilumina, ¡hay algo pendiente de ejecutar!")}`}],
quiz:[
{q:"¿Cuál es el primer interruptor en un 787 cold & dark?",o:["BATTERY","APU","FUEL CONTROL"],a:0,e:"BATTERY ON siempre es el primer paso."},
{q:"¿Qué produce el APU del 787?",o:["Solo electricidad","Electricidad y aire sangrado","Solo aire sangrado"],a:0,e:"Al ser bleedless, el APU del 787 solo produce electricidad (dos generadores)."},
{q:"¿Cómo se arranca un motor del 787?",o:["Selector ENG START a START y FUEL CONTROL a RUN; el arranque es automático","Esperando a 25 % de N2 para meter combustible manualmente","Con el aire del APU y el selector en GRD"],a:0,e:"El 787 tiene autostart; la técnica de esperar un % de N2 es del 737."},
{q:"En el CDU de Boeing, ¿qué hace la tecla EXEC?",o:["Confirma y activa las modificaciones","Borra la ruta","Apaga el FMC"],a:0,e:"Los cambios quedan en MOD hasta pulsar EXEC."},
{q:"¿Cuándo se encienden las bombas del tanque central?",o:["Solo si hay combustible en el tanque central","Siempre, en todos los vuelos","Solo en vuelo de crucero"],a:0,e:"Sin combustible en el central, sus bombas se dejan apagadas."},
{q:"¿Qué orden de páginas del FMC es correcto?",o:["IDENT → POS INIT → RTE → DEP ARR → PERF INIT → TAKEOFF REF","PERF INIT → RTE → IDENT → TAKEOFF REF","TAKEOFF REF → DEP ARR → POS INIT → RTE"],a:0,e:"Regla I-P-R-D-P-T."}]},
{id:"m5",title:"5. FMC: programar LEVC → LEBL",lessons:[
{id:"l1",title:"Programación paso a paso",html:`
<p>Mismo vuelo de ejemplo: <code>LEVC AZAHR1A AZAHR UN725 MARTA MARTA2B LEBL</code> (nombres ficticios). En la realidad un 787 no haría este vuelo tan corto, pero en el simulador es perfecto para practicar.</p>
<ol><li><b>IDENT</b>: modelo, motores y base de datos vigente.</li><li><b>POS INIT</b>: REF AIRPORT LEVC, comprobar posición GPS.</li><li><b>RTE</b>: ORIGIN LEVC, DEST LEBL, RUNWAY RW30, FLT NO. Página 2: VIA UN725 TO MARTA. <b>ACTIVATE → EXEC</b>.</li><li><b>DEP ARR</b>: SID y pista → EXEC. Revisa <b>LEGS</b> y quita discontinuidades si procede.</li><li><b>PERF INIT</b>: ZFW, RESERVES, COST INDEX, CRZ ALT → EXEC.</li><li><b>THRUST LIM</b>: TO, TO 1, TO 2 o temperatura supuesta.</li><li><b>TAKEOFF REF</b>: flaps, CG, aceptar V1/VR/V2 → EXEC.</li><li>Antes del descenso: <b>ARR</b> (STAR + aproximación) y <b>APPROACH REF</b> (VREF 30).</li></ol>
${TOOL("#/p/b787","🎛️ Practicarlo en el CDU del panel")}
${WARN("Ejemplo","Pesos, velocidades y nombres de puntos son de ejemplo. Usa SimBrief y el FMC de tu simulador.")}`}],
quiz:[
{q:"¿En qué página introduces ORIGIN y DEST en Boeing?",o:["RTE","PERF INIT","IDENT"],a:0,e:"RTE 1: ORIGIN (L1) y DEST (R1)."},
{q:"¿Qué se hace tras ACTIVATE en la página RTE?",o:["Pulsar EXEC","Pulsar INIT REF","Arrancar motores"],a:0,e:"ACTIVATE + EXEC hacen activa la ruta."},
{q:"¿En qué página seleccionas la SID?",o:["DEP ARR","LEGS","PROG"],a:0,e:"DEP ARR → DEP del aeropuerto de origen."},
{q:"¿Dónde aceptas V1, VR y V2?",o:["TAKEOFF REF","POS INIT","THRUST LIM"],a:0,e:"El FMC las propone en TAKEOFF REF y las aceptas con las teclas R1-R3."},
{q:"En la página RTE 2/2, la columna VIA indica…",o:["Por dónde vas (aerovía o DIRECT)","La altitud de cada tramo","El viento previsto"],a:0,e:"VIA = aerovía o procedimiento; TO = punto final del tramo."}]}
],
final:{n:20,pass:75}
});
})();
