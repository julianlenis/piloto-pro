/* ===================== AIRBUS A320 ===================== */
(function(){
const A_IR={OFF:[['',''],['','']],NAV:[['','d'],['','']]};
PP.panels.a320={
name:"Airbus A320",quiz:"#/q/a320/m4",
ecamStart:'<span class="wh">CABINA OSCURA (COLD & DARK) · sin energía</span>',
sections:[
{id:'elec',name:'Overhead · ELEC',ctls:[
 pb('bat1','BAT 1','OFF',S_OFFW,'Batería 1. Normal = AUTO (luz apagada).'),pb('bat2','BAT 2','OFF',S_OFFW,'Batería 2.'),
 pb('extpwr','EXT PWR','AVAIL',S_AVAIL,'Toma de corriente de tierra (GPU).'),pb('apugen','APU GEN','ON',{ON:[['',''],['','d']]},'Generador del APU (normal ON, luz apagada).')]},
{id:'adirs',name:'Overhead · ADIRS',ctls:[
 sel('ir1','IR 1',['OFF','NAV','ATT'],'OFF','Unidad inercial 1.'),sel('ir2','IR 3',['OFF','NAV','ATT'],'OFF','Unidad inercial 3 (reserva).'),sel('ir3','IR 2',['OFF','NAV','ATT'],'OFF','Unidad inercial 2.'),
 pb('onbat','ON BAT','OFF',{OFF:[['',''],['','']],ON:[['ON BAT','a'],['','']]},'Se enciende si alguna ADIRU funciona con batería.')]},
{id:'lt',name:'Overhead · EXT LT y SIGNS',ctls:[
 sel('nav','NAV & LOGO',['OFF','1','2'],'OFF','Luces de navegación y logo.'),sel('beacon','BEACON',['OFF','ON'],'OFF','Luz anticolisión roja: avisa de motores en marcha.'),
 sel('nose','NOSE',['OFF','TAXI','T.O.'],'OFF','Luz del tren de morro.'),
 sel('belts','SEAT BELTS',['OFF','ON'],'OFF','Señal de cinturones.'),sel('nosmk','NO SMOKING',['OFF','AUTO','ON'],'OFF','Señal de no fumar.'),sel('emer','EMER EXIT LT',['OFF','ARM','ON'],'OFF','Luces de emergencia de cabina.')]},
{id:'apu',name:'Overhead · APU y AIR',ctls:[
 pb('apum','APU MASTER SW','OFF',{OFF:[['',''],['','']],ON:[['',''],['ON','b']]},'Energiza el APU y abre su toma de aire.'),
 pb('apus','APU START','OFF',{OFF:[['',''],['','']],ON:[['',''],['ON','b']],AVAIL:[['',''],['AVAIL','g']]},'Arranca el APU.'),
 pb('apub','APU BLEED','OFF',{OFF:[['',''],['','']],ON:[['',''],['ON','b']]},'Aire del APU para aire acondicionado y arranque de motores.')]},
{id:'fuel',name:'Overhead · FUEL',ctls:[
 pb('fl','L TK PUMPS 1+2','OFF',S_OFFW,'Bombas del tanque izquierdo (dos pulsadores en el avión real).'),
 pb('fc','CTR TK PUMPS 1+2','OFF',S_OFFW,'Bombas del tanque central.'),
 pb('fr','R TK PUMPS 1+2','OFF',S_OFFW,'Bombas del tanque derecho.')]},
{id:'fcu',name:'Glareshield · EFIS y FCU',dark:true,ctls:[
 disp('baro','BARO','1013','Ajuste del altímetro (QNH).'),pb('fd','FD','OFF',{OFF:[['',''],['','']],ON:[['',''],['▬','g']]},'Director de vuelo.'),
 disp('spd','SPD','---','Ventana de velocidad.'),disp('hdg','HDG','---','Ventana de rumbo.'),disp('alt','ALT','00100','Altitud objetivo.'),
 pb('ap1','AP1','OFF',{OFF:[['',''],['','']]},'Piloto automático 1 (se conecta en el aire).'),pb('athr','A/THR','OFF',{OFF:[['',''],['','']]},'Autothrust (se arma solo al poner empuje de despegue).')]},
{id:'mcdu',name:'Pedestal · MCDU',cdu:true,tag:'MCDU 1',ctls:[...LSK('m'),key('mINIT','INIT'),key('mFPLN','F-PLN'),key('mPERF','PERF'),key('mRAD','RAD NAV'),key('mDATA','DATA'),key('mNEXT','NEXT PG'),key('mFUEL','FUEL PRED'),key('mDIR','DIR')]},
{id:'ped',name:'Pedestal · motores y otros',ctls:[
 disp('xpdr','ATC XPDR','2000 STBY','Transpondedor.'),sel('engmode','ENG MODE',['CRK','NORM','IGN/START'],'NORM','Selector de modo de motores.'),
 lev('eng1','ENG 1 MASTER',['OFF','ON'],'OFF','Interruptor de combustible/encendido del motor 1.'),lev('eng2','ENG 2 MASTER',['OFF','ON'],'OFF','Interruptor del motor 2.'),
 tg('pbrk','PARK BRK',['OFF','ON'],'OFF','Freno de aparcamiento.'),tg('spdbrk','GND SPLR',['RET','ARM'],'RET','Spoilers de tierra (palanca de speedbrake).'),
 sel('flaps','FLAPS',['0','1','2','3','FULL'],'0','Palanca de flaps.')]}
],
flow:[
// --- PREPARACIÓN
{ph:'Preparación',t:'Bienvenido a la cabina oscura',d:'El avión está "cold & dark": todo apagado. Antes de dar energía, un piloto comprueba que la palanca del tren está abajo (DOWN) y los limpiaparabrisas en OFF. Lo haremos de forma didáctica: yo te señalo cada control y tú lo accionas.',w:'Dar energía con el tren arriba o con mandos en posiciones raras podría mover sistemas en tierra.'},
{ph:'Preparación',c:'pbrk',to:'ON',t:'Freno de aparcamiento: ON',d:'Pon el freno de aparcamiento.',w:'El avión no debe moverse mientras lo preparas ni durante el arranque.'},
// --- ENERGÍA
{ph:'Energía',c:'bat1',to:'AUTO',t:'BAT 1 en AUTO',d:'Pulsa BAT 1. La luz blanca "OFF" se apaga.',w:'En Airbus rige la filosofía "cabina oscura": cuando un pulsador está en su posición normal, no tiene ninguna luz. Antes, en la página ELEC, se comprueba que el voltaje de las baterías sea suficiente (por encima de unos 25,5 V).',m:'BAT 1 <span class="cy">25.8 V</span>'},
{ph:'Energía',c:'bat2',to:'AUTO',t:'BAT 2 en AUTO',d:'Ahora BAT 2.',w:'Con las dos baterías el avión tiene energía básica: se encienden algunas pantallas y el ECAM.',m:'BAT 1 <span class="cy">25.8 V</span> · BAT 2 <span class="cy">25.8 V</span> · ECAM ON'},
{ph:'Energía',c:'extpwr',to:'ON',t:'EXT PWR: ON',d:'La luz verde "AVAIL" indica que hay un grupo de tierra conectado. Púlsalo: se ilumina "ON" en azul.',w:'Las baterías duran poco. Con corriente de tierra se alimenta todo el avión sin gastar combustible ni batería.',m:'EXT PWR ON · AC BUS 1+2 alimentados · pantallas encendidas'},
{ph:'Energía',c:'nav',to:'1',t:'NAV & LOGO: ON (1)',d:'Enciende las luces de navegación.',w:'Indican que el avión tiene energía. En muchas compañías se dejan encendidas siempre que el avión está alimentado.'},
// --- ADIRS
{ph:'ADIRS',c:'ir1',to:'NAV',t:'IR 1 en NAV',d:'Gira el selector IR 1 a NAV.',w:'Las ADIRU (Air Data Inertial Reference Units) calculan posición, actitud, rumbo, velocidad y altitud. Hay tres. Para alinearse, el avión NO debe moverse.',fx:[['onbat','ON']],m:'<span class="am">ON BAT</span> momentáneo · IR 1 ALIGN'},
{ph:'ADIRS',c:'ir3',to:'NAV',t:'IR 2 en NAV',d:'Ahora la IR 2 (el selector de la derecha).',w:'Ojo: en el panel real el orden es 1 – 3 – 2. Aquí también: la IR 3 está en el medio.',fx:[['onbat','OFF']],m:'IR 1 + IR 2 ALIGN'},
{ph:'ADIRS',c:'ir2',to:'NAV',t:'IR 3 en NAV',d:'Por último la IR 3, la del centro.',w:'La alineación tarda varios minutos (en el avión real, hasta unos 10 según la latitud). Muchos simuladores permiten acelerarla. Mientras tanto seguimos preparando.',m:'IR 1 2 3 · <span class="am">ALIGN</span> (tiempo restante en la página de estado)'},
// --- SEÑALES
{ph:'Cabina',c:'belts',to:'ON',t:'SEAT BELTS: ON',d:'Activa la señal de cinturones.',w:'Los pasajeros van a embarcar y se mantiene encendida durante rodaje, despegue y aterrizaje.'},
{ph:'Cabina',c:'nosmk',to:'AUTO',t:'NO SMOKING: AUTO',d:'Selector en AUTO.',w:'En AUTO se enciende automáticamente según la posición del tren de aterrizaje.'},
{ph:'Cabina',c:'emer',to:'ARM',t:'EMER EXIT LT: ARM',d:'Arma las luces de emergencia.',w:'Si se pierde la energía normal, se encienden solas para guiar la evacuación.'},
// --- APU
{ph:'APU',c:'apum',to:'ON',t:'APU MASTER SW: ON',d:'Pulsa el APU MASTER SW.',w:'El APU es un pequeño motor de turbina en la cola. Da electricidad y aire comprimido. Primero se energiza y se abre su toma de aire.',m:'APU · FLAP OPEN'},
{ph:'APU',c:'apus',to:'ON',t:'APU START',d:'Pulsa START. Se ilumina "ON" en azul mientras arranca.',w:'El APU necesita aire comprimido para arrancar los motores principales: sin APU (o aire de tierra) no hay arranque.',m:'APU START · N% subiendo…',later:[[['apus','AVAIL']],'<span class="gr">APU AVAIL</span> · APU GEN disponible','El APU está arrancando…']},
{ph:'APU',c:'apub',to:'ON',t:'APU BLEED: ON',d:'Con "AVAIL" en verde, conecta el aire del APU.',w:'El aire del APU alimenta el aire acondicionado ahora y los arrancadores de los motores después.',m:'<span class="gr">APU AVAIL</span> · APU BLEED ON · PACKS en funcionamiento'},
{ph:'APU',c:'extpwr',to:'AVAIL',t:'EXT PWR: desconectar',d:'Pulsa EXT PWR para dejarlo en AVAIL (el APU toma la carga).',w:'La corriente de tierra tiene prioridad sobre el APU. Al desconectarla, el generador del APU alimenta el avión y el personal de tierra puede retirar el cable.',m:'APU GEN alimentando AC BUS 1+2'},
// --- FUEL
{ph:'Combustible',c:'fl',to:'ON',t:'Bombas izquierdas: ON',d:'Bombas del tanque izquierdo: se apagan las luces OFF.',w:'Las bombas mandan combustible a presión a los motores y al APU. (En el avión real son dos pulsadores, aquí agrupados).'},
{ph:'Combustible',c:'fc',to:'ON',t:'Bombas centrales: ON',d:'Bombas del tanque central.',w:'En el A320 el combustible del tanque central se gasta primero para descargar las alas (la lógica la gestiona el avión).'},
{ph:'Combustible',c:'fr',to:'ON',t:'Bombas derechas: ON',d:'Bombas del tanque derecho.',w:'Luces apagadas = posición normal. ¡Cabina oscura!',m:'FUEL: 6 bombas ON · sin avisos'},
// --- MCDU
{ph:'MCDU · INIT A',c:'mINIT',t:'Pulsa INIT',d:'Empezamos a programar el ordenador de gestión de vuelo (FMGC) con el MCDU. Vuelo de ejemplo: Valencia (LEVC) → Barcelona (LEBL).',w:'Antes, en DATA se comprueba que la base de datos de navegación esté vigente (ciclo AIRAC).',scr:cdu('INIT',[[[' CO RTE','FROM/TO '],['{o}[][][][][][]{/}','{o}[][][][]/[][][][]{/}']],[['ALTN/CO RTE',''],['{c}----/----------{/}','']],[['FLT NBR',''],['{o}[][][][][][][][]{/}','']],[['',''],['','']],[['COST INDEX',''],['{o}[][][]{/}','']],[['CRZ FL/TEMP','TROPO'],['{o}[][][][][]/[][][]°{/}','{c}36090{/}']]],'LEVC/LEBL')},
{ph:'MCDU · INIT A',c:'mR1',t:'FROM/TO: LEVC/LEBL',d:'He escrito "LEVC/LEBL" en el scratchpad (línea de abajo). Pulsa la tecla R1 para meterlo en FROM/TO.',w:'Así el FMS sabe el origen y el destino. Si tienes una ruta guardada (CO RTE) se cargaría en L1.',scr:cdu('INIT',[[[' CO RTE','FROM/TO '],['{c}NONE{/}','{c}LEVC/LEBL{/}']],[['ALTN/CO RTE','INIT '],['{o}[][][][]{/}','{o}REQUEST*{/}']],[['FLT NBR',''],['{o}[][][][][][][][]{/}','ALIGN IRS→']],[['LAT','LONG'],['{c}3929.3N{/}','{c}00028.8W{/}']],[['COST INDEX',''],['{o}[][][]{/}','']],[['CRZ FL/TEMP','TROPO'],['{o}[][][][][]/[][][]°{/}','{c}36090{/}']]],'LEGE')},
{ph:'MCDU · INIT A',c:'mL2',t:'Alternativo: LEGE',d:'En el scratchpad pone "LEGE" (Girona, alternativo de ejemplo). Pulsa L2.',w:'El alternativo es el aeropuerto al que irías si no puedes aterrizar en destino. Debe tener buen tiempo previsto (TAF).',scr:cdu('INIT',[[[' CO RTE','FROM/TO '],['{c}NONE{/}','{c}LEVC/LEBL{/}']],[['ALTN/CO RTE','INIT '],['{c}LEGE{/}','{o}REQUEST*{/}']],[['FLT NBR',''],['{o}[][][][][][][][]{/}','ALIGN IRS→']],[['LAT','LONG'],['{c}3929.3N{/}','{c}00028.8W{/}']],[['COST INDEX',''],['{o}[][][]{/}','']],[['CRZ FL/TEMP','TROPO'],['{o}[][][][][]/[][][]°{/}','{c}36090{/}']]],'JLN123')},
{ph:'MCDU · INIT A',c:'mL3',t:'Número de vuelo',d:'Escrito "JLN123" (indicativo de ejemplo). Pulsa L3.',w:'Es el número de vuelo que aparece en tu plan de vuelo.',scr:cdu('INIT',[[[' CO RTE','FROM/TO '],['{c}NONE{/}','{c}LEVC/LEBL{/}']],[['ALTN/CO RTE','INIT '],['{c}LEGE{/}','{o}REQUEST*{/}']],[['FLT NBR',''],['{c}JLN123{/}','ALIGN IRS→']],[['LAT','LONG'],['{c}3929.3N{/}','{c}00028.8W{/}']],[['COST INDEX',''],['{o}[][][]{/}','']],[['CRZ FL/TEMP','TROPO'],['{o}[][][][][]/[][][]°{/}','{c}36090{/}']]],'30')},
{ph:'MCDU · INIT A',c:'mL5',t:'Cost Index: 30',d:'Escrito "30" (ejemplo). Pulsa L5.',w:'El Cost Index equilibra tiempo y combustible: 0 = máximo ahorro (más lento), valores altos = más rápido. Lo da el OFP.',scr:cdu('INIT',[[[' CO RTE','FROM/TO '],['{c}NONE{/}','{c}LEVC/LEBL{/}']],[['ALTN/CO RTE','INIT '],['{c}LEGE{/}','{o}REQUEST*{/}']],[['FLT NBR',''],['{c}JLN123{/}','ALIGN IRS→']],[['LAT','LONG'],['{c}3929.3N{/}','{c}00028.8W{/}']],[['COST INDEX',''],['{c}30{/}','']],[['CRZ FL/TEMP','TROPO'],['{o}[][][][][]/[][][]°{/}','{c}36090{/}']]],'FL240')},
{ph:'MCDU · INIT A',c:'mL6',t:'Nivel de crucero: FL240',d:'Escrito "FL240" (ejemplo para un vuelo corto). Pulsa L6.',w:'En vuelos cortos no compensa subir muy alto. El OFP te propone el nivel óptimo.',scr:cdu('INIT',[[[' CO RTE','FROM/TO '],['{c}NONE{/}','{c}LEVC/LEBL{/}']],[['ALTN/CO RTE','INIT '],['{c}LEGE{/}','{o}REQUEST*{/}']],[['FLT NBR',''],['{c}JLN123{/}','ALIGN IRS→']],[['LAT','LONG'],['{c}3929.3N{/}','{c}00028.8W{/}']],[['COST INDEX',''],['{c}30{/}','']],[['CRZ FL/TEMP','TROPO'],['{c}FL240/-33°{/}','{c}36090{/}']]],'')},
// F-PLN
{ph:'MCDU · F-PLN',c:'mFPLN',t:'Pulsa F-PLN',d:'Página del plan de vuelo. De momento solo hay origen, una discontinuidad y destino.',w:'"F-PLN DISCONTINUITY" significa que falta unir puntos. Vamos a meter salida, ruta y llegada.',scr:cdu('FROM          JLN123',[[['',''],['{g}LEVC{/}','{g}----{/}']],[['',''],['{w}- F-PLN DISCONTINUITY-{/}','']],[['',''],['{g}LEBL{/}','']],[['',''],['{w}------END OF F-PLN------{/}','']],[['',''],['','']],[['DEST   TIME   DIST  EFOB',''],['{g}LEBL{/}','{g}----{/}']]],'')},
{ph:'MCDU · F-PLN',c:'mL1',t:'Salida: pista 30 y SID AZAHR1A',d:'Pulsa L1 (junto a LEVC) → LAT REV → DEPARTURE. Eliges la pista 30 y la SID "AZAHR1A" (ficticia) y luego TMPY INSERT. Aquí lo resumimos en un toque.',w:'La pista y la SID te las confirma el ATC en la autorización. Lo que está en amarillo (TMPY) es temporal hasta que lo insertas.',scr:cdu('FROM          JLN123',[[['',''],['{g}LEVC30{/}','{g}----{/}']],[['C058°',''],['{g}D5{/}','{m}2500{/}']],[['',''],['{g}NARAN{/}','{m}FL070{/}']],[['',''],['{g}AZAHR{/}','{m}FL100{/}']],[['',''],['{w}- F-PLN DISCONTINUITY-{/}','']],[['DEST   TIME   DIST  EFOB',''],['{g}LEBL{/}','{g}----{/}']]],'')},
{ph:'MCDU · F-PLN',c:'mL4',t:'Ruta: aerovía UN725 hasta MARTA',d:'Pulsa L4 (AZAHR) → LAT REV → AIRWAYS: VIA "UN725" TO "MARTA" → INSERT.',w:'Así unes la SID con la llegada siguiendo la aerovía del plan de vuelo.',scr:cdu('FROM          JLN123',[[['',''],['{g}NARAN{/}','{m}FL070{/}']],[['',''],['{g}AZAHR{/}','{m}FL100{/}']],[['UN725',''],['{g}MARTA{/}','{g}FL240{/}']],[['',''],['{w}- F-PLN DISCONTINUITY-{/}','']],[['',''],['{g}LEBL{/}','']],[['DEST   TIME   DIST  EFOB',''],['{g}LEBL{/}','{g}----{/}']]],'')},
{ph:'MCDU · F-PLN',c:'mL5',t:'Llegada: STAR MARTA2B e ILS 24R',d:'Pulsa L5 (LEBL) → LAT REV → ARRIVAL: aproximación ILS24R y STAR "MARTA2B" (ficticia) → INSERT.',w:'En el avión real la llegada se suele programar en crucero, tras escuchar el ATIS del destino. Aquí lo hacemos ya para aprender.',scr:cdu('FROM          JLN123',[[['',''],['{g}MARTA{/}','{g}FL240{/}']],[['',''],['{g}ROSAL{/}','{m}FL100{/}']],[['',''],['{g}SOLER{/}','{m}7000{/}']],[['',''],['{g}LXX{/}','{g}5000{/}']],[['',''],['{w}- F-PLN DISCONTINUITY-{/}','']],[['DEST   TIME   DIST  EFOB',''],['{g}LEBL24R{/}','{g}0:47 182{/}']]],'CLR')},
{ph:'MCDU · F-PLN',c:'mL5',t:'Borrar la discontinuidad',d:'Pulsa CLR (ya en el scratchpad) y luego L5 sobre "F-PLN DISCONTINUITY".',w:'Las discontinuidades entre la STAR y la aproximación a veces se borran y a veces no: depende del procedimiento. Nunca borres una sin entender por qué está.',scr:cdu('FROM          JLN123',[[['',''],['{g}MARTA{/}','{g}FL240{/}']],[['',''],['{g}ROSAL{/}','{m}FL100{/}']],[['',''],['{g}SOLER{/}','{m}7000{/}']],[['',''],['{g}LXX{/}','{g}5000{/}']],[['',''],['{g}FI24R{/}','{g}3000{/}']],[['DEST   TIME   DIST  EFOB',''],['{g}LEBL24R{/}','{g}0:47 182{/}']]],'')},
// INIT B
{ph:'MCDU · INIT B',c:'mNEXT',t:'INIT B (pesos y combustible)',d:'Vuelve a INIT y pulsa NEXT PAGE para ir a INIT B. He escrito ZFW/ZFWCG de ejemplo "58.0/27.5".',w:'Los pesos salen de la hoja de carga (loadsheet) o del EFB. Valores de este ejemplo inventados.',scr:cdu('INIT',[[['TAXI','ZFW/ZFWCG'],['{c}0.2{/}','{o}[][][].[]/[][].[]{/}']],[['TRIP/TIME','BLOCK'],['{g}---.-/----{/}','{o}[][].[]{/}']],[['RTE RSV/%',''],['{g}---.-/5.0{/}','']],[['ALTN/TIME','TOW/LW'],['{g}---.-/----{/}','{g}---.-/---.-{/}']],[['FINAL/TIME',''],['{g}---.-/0030{/}','']],[['EXTRA/TIME',''],['{g}---.-/----{/}','']]],'58.0/27.5')},
{ph:'MCDU · INIT B',c:'mR1',t:'ZFW y CG: R1',d:'Pulsa R1 para introducir peso sin combustible 58,0 t y CG 27,5 % (ejemplo).',w:'El FMS necesita el peso para calcular velocidades, nivel óptimo y consumo.',scr:cdu('INIT',[[['TAXI','ZFW/ZFWCG'],['{c}0.2{/}','{c}58.0/27.5{/}']],[['TRIP/TIME','BLOCK'],['{g}---.-/----{/}','{o}[][].[]{/}']],[['RTE RSV/%',''],['{g}---.-/5.0{/}','']],[['ALTN/TIME','TOW/LW'],['{g}---.-/----{/}','{g}---.-/---.-{/}']],[['FINAL/TIME',''],['{g}---.-/0030{/}','']],[['EXTRA/TIME',''],['{g}---.-/----{/}','']]],'5.6')},
{ph:'MCDU · INIT B',c:'mR2',t:'Combustible BLOCK: R2',d:'Escrito "5.6" (toneladas, ejemplo del OFP). Pulsa R2.',w:'Con el block el FMS calcula trip, reservas y extra. Ver EXTRA positivo es buena señal.',scr:cdu('INIT',[[['TAXI','ZFW/ZFWCG'],['{c}0.2{/}','{c}58.0/27.5{/}']],[['TRIP/TIME','BLOCK'],['{g}2.1/0047{/}','{c}5.6{/}']],[['RTE RSV/%',''],['{g}0.1/5.0{/}','']],[['ALTN/TIME','TOW/LW'],['{g}1.2/0028{/}','{g}63.4/61.3{/}']],[['FINAL/TIME',''],['{g}1.0/0030{/}','']],[['EXTRA/TIME',''],['{g}1.0/0025{/}','']]],'')},
// PERF
{ph:'MCDU · PERF',c:'mPERF',t:'PERF TAKE OFF',d:'Pulsa PERF: aparece la página de despegue. He calculado en el EFB unas velocidades de ejemplo: V1 138, VR 140, V2 144.',w:'Las V-speeds dependen de peso, pista, viento, temperatura y flaps. ¡Nunca uses las de este ejemplo en otro vuelo!',scr:cdu('TAKE OFF          RWY 30',[[['V1','FLP RETR'],['{o}[][][]{/}','F={g}---{/}']],[['VR','SLT RETR'],['{o}[][][]{/}','S={g}---{/}']],[['V2','CLEAN'],['{o}[][][]{/}','O={g}---{/}']],[['TRANS ALT','FLAPS/THS'],['{c}6000{/}','{o}[]/[][][][]{/}']],[['THR RED/ACC','FLEX TO TEMP'],['{c}1500/1500{/}','{o}[][]°{/}']],[['','ENG OUT ACC'],['','{c}1500{/}']]],'138/140/144')},
{ph:'MCDU · PERF',c:'mL1',t:'V1 / VR / V2',d:'Pulsa L1 (en el MCDU se introducen una a una en L1, L2 y L3; aquí en un solo toque).',w:'V1 decisión, VR rotación, V2 velocidad segura de ascenso con un motor parado.',scr:cdu('TAKE OFF          RWY 30',[[['V1','FLP RETR'],['{c}138{/}','F={g}150{/}']],[['VR','SLT RETR'],['{c}140{/}','S={g}190{/}']],[['V2','CLEAN'],['{c}144{/}','O={g}215{/}']],[['TRANS ALT','FLAPS/THS'],['{c}6000{/}','{o}[]/[][][][]{/}']],[['THR RED/ACC','FLEX TO TEMP'],['{c}1500/1500{/}','{o}[][]°{/}']],[['','ENG OUT ACC'],['','{c}1500{/}']]],'1/UP0.4')},
{ph:'MCDU · PERF',c:'mR4',t:'FLAPS/THS: 1 / UP0.4',d:'Pulsa R4. Flaps 1+F para el despegue y el trim del estabilizador (THS) según el CG (ejemplo).',w:'El THS se ajusta con la rueda de trim del pedestal al valor calculado. La TRANS ALT de la página (ejemplo 6000) la da la carta SID.',scr:cdu('TAKE OFF          RWY 30',[[['V1','FLP RETR'],['{c}138{/}','F={g}150{/}']],[['VR','SLT RETR'],['{c}140{/}','S={g}190{/}']],[['V2','CLEAN'],['{c}144{/}','O={g}215{/}']],[['TRANS ALT','FLAPS/THS'],['{c}6000{/}','{c}1/UP0.4{/}']],[['THR RED/ACC','FLEX TO TEMP'],['{c}1500/1500{/}','{o}[][]°{/}']],[['','ENG OUT ACC'],['','{c}1500{/}']]],'50')},
{ph:'MCDU · PERF',c:'mR5',t:'FLEX TO TEMP: 50',d:'Pulsa R5. Temperatura flexible de ejemplo: 50 °C.',w:'El empuje FLEX "engaña" al motor con una temperatura supuesta más alta para despegar con menos empuje del máximo cuando la pista y el peso lo permiten. Ahorra desgaste del motor.',scr:cdu('TAKE OFF          RWY 30',[[['V1','FLP RETR'],['{c}138{/}','F={g}150{/}']],[['VR','SLT RETR'],['{c}140{/}','S={g}190{/}']],[['V2','CLEAN'],['{c}144{/}','O={g}215{/}']],[['TRANS ALT','FLAPS/THS'],['{c}6000{/}','{c}1/UP0.4{/}']],[['THR RED/ACC','FLEX TO TEMP'],['{c}1500/1500{/}','{c}50°{/}']],[['','ENG OUT ACC'],['','{c}1500{/}']]],'')},
// FCU
{ph:'FCU',c:'baro',to:'1018',t:'QNH 1018 en el altímetro',d:'Toca BARO para ajustar el QNH del METAR (ejemplo: Q1018).',w:'En tierra con el QNH correcto el altímetro marca la elevación del aeropuerto. Así compruebas que funciona.'},
{ph:'FCU',c:'fd',to:'ON',t:'FD: ON',d:'Directores de vuelo encendidos (barras verdes en el PFD).',w:'El director de vuelo te indica con barras hacia dónde mover el morro para seguir los modos (en despegue: SRS y RWY/NAV).'},
{ph:'FCU',c:'alt',to:'05000',t:'ALT: 5000',d:'Toca ALT para poner la altitud inicial autorizada (ejemplo de la SID: 5000).',w:'Velocidad y rumbo se dejan en guiones "---" con un punto: modo gestionado (managed). El avión seguirá al FMS.',fx:[['spd','---•'],['hdg','---•']]},
{ph:'Antes del arranque',c:'xpdr',to:'4721 AUTO',t:'Transpondedor: código 4721',d:'Toca el transpondedor para poner el código que te da el ATC (ejemplo: 4721).',w:'El código identifica tu avión en el radar. En tierra muchos aviones lo dejan en AUTO para que pase a ALT al despegar.'},
{ph:'Antes del arranque',t:'Puertas cerradas y autorización de pushback',d:'Comprueba en la página DOOR del ECAM que todas las puertas están cerradas y pide al control "pushback y puesta en marcha".',w:'No se arrancan motores sin autorización ni con personal o puertas abiertas.',m:'DOORS: todas <span class="gr">CERRADAS</span> · PUSH & START APPROVED'},
{ph:'Antes del arranque',c:'beacon',to:'ON',t:'BEACON: ON',d:'Luz anticolisión encendida.',w:'Es la señal universal para el personal de tierra: "vamos a arrancar, alejaos de los motores".'},
{ph:'Arranque',c:'engmode',to:'IGN/START',t:'ENG MODE: IGN/START',d:'Gira el selector a IGN/START.',w:'Prepara el arranque automático: el FADEC (ordenador del motor) controla todo el proceso.',m:'ECAM: página ENG en pantalla inferior'},
{ph:'Arranque',c:'eng2',to:'ON',t:'ENG 2 MASTER: ON',d:'Sube el ENG 2 MASTER. Muchas compañías arrancan primero el motor 2, y es lo habitual en tutoriales de simulador.',w:'El FADEC abre la válvula del arrancador, mete encendido y combustible en el momento justo. Tú vigilas N2, EGT y N1.',m:'ENG 2 START · N2 ↑ · IGN A · FUEL · EGT ↑',later:[[],'ENG 2 <span class="gr">AVAIL</span> · estabilizado al ralentí','Arrancando motor 2…']},
{ph:'Arranque',c:'eng1',to:'ON',t:'ENG 1 MASTER: ON',d:'Con el motor 2 estabilizado, sube el ENG 1 MASTER.',w:'Uno a uno, para concentrarse en cada arranque y vigilar parámetros.',m:'ENG 1 START · N2 ↑ · EGT ↑',later:[[],'ENG 1 + ENG 2 <span class="gr">AVAIL</span> · motores al ralentí','Arrancando motor 1…']},
{ph:'Después del arranque',c:'engmode',to:'NORM',t:'ENG MODE: NORM',d:'Vuelve a NORM.',w:'Los motores ya están en marcha; NORM deja el encendido en automático.'},
{ph:'Después del arranque',c:'apub',to:'OFF',t:'APU BLEED: OFF',d:'Ya no necesitas el aire del APU.',w:'Ahora los motores dan el aire comprimido para el aire acondicionado y presurización.'},
{ph:'Después del arranque',c:'apum',to:'OFF',t:'APU MASTER SW: OFF',d:'Apaga el APU (hace un enfriamiento antes de pararse).',w:'Los generadores de los motores ya alimentan el avión. Apagar el APU ahorra combustible (algunas compañías lo dejan para el rodaje).',fx:[['apus','OFF']]},
{ph:'Después del arranque',c:'spdbrk',to:'ARM',t:'GND SPLR: ARM',d:'Arma los spoilers de tierra.',w:'Si se aborta el despegue o al aterrizar, se despliegan solos para pegar el avión a la pista y frenar.'},
{ph:'Después del arranque',c:'flaps',to:'1',t:'FLAPS: 1',d:'Flaps para el despegue según PERF (ejemplo: 1 → "1+F").',w:'Con flaps el ala genera más sustentación a baja velocidad. Luego se ajusta el trim al valor de PERF (UP0.4).',m:'FLAPS <span class="cy">1+F</span> · PITCH TRIM UP0.4'},
{ph:'Rodaje',c:'nose',to:'TAXI',t:'NOSE: TAXI',d:'Luz de rodaje encendida.',w:'Ilumina la calle de rodaje y avisa a los demás de que te mueves.'},
{ph:'Rodaje',c:'pbrk',to:'OFF',t:'PARK BRK: OFF',d:'Con la autorización de rodaje, suelta el freno de aparcamiento (sujeta los frenos con los pedales).',w:'¡Listo! Rueda despacio (unos 20 kt en recta, menos en curvas) hasta el punto de espera.',m:'<span class="gr">T.O CONFIG TEST</span> pendiente antes de pista · ¡A rodar!'}
]};

PP.courses.push({
id:"a320",title:"Airbus A320",sub:"Curso completo desde cero: sistemas, cabina, MCDU, panel interactivo y examen",icon:"🛩️",level:"full",panel:"a320",img:"A320",
modules:[
{id:"m1",title:"1. Conoce el A320",lessons:[
{id:"l1",title:"La familia A320 y su filosofía",html:`${SIMNOTE}
<p>El <b>A320</b> es el avión de pasillo único de Airbus. Voló por primera vez en <b>1987</b> y fue el primer avión comercial de su tipo con mandos de vuelo eléctricos digitales (<b>fly-by-wire</b>) y <b>sidestick</b>.</p>
<ul><li><b>Familia</b>: A318, A319, A320 y A321. La versión <b>neo</b> (new engine option) lleva motores nuevos (CFM LEAP-1A o Pratt & Whitney GTF) y gasta menos. La original se llama <b>ceo</b>.</li>
<li>Lleva típicamente entre 150 y 180 pasajeros (según configuración).</li>
<li>Es el avión que más verás en España: Vueling, Iberia, Iberia Express…</li></ul>
<h3>Filosofía Airbus</h3>
<ul><li><b>Fly-by-wire con protecciones</b>: el ordenador no te deja salir de la envolvente de vuelo segura (en ley normal).</li>
<li><b>Cabina oscura</b>: si todo está normal, no hay luces en el overhead.</li>
<li><b>ECAM</b>: el avión vigila sus sistemas y te dice qué falla y qué hacer.</li>
<li><b>Palancas de gases que no se mueven</b> con el autothrust: se colocan en "muescas" (detents).</li></ul>
${TIP("En el simulador","El A320neo de FlyByWire (gratuito) y el Fenix A320 (de pago) son de los más completos para estudiar. Los pasos de esta app son genéricos y sirven para ambos con pequeñas diferencias.")}`},
{id:"l2",title:"Un paseo por la cabina",html:`
<table><tr><th>Zona</th><th>Qué hay</th></tr>
<tr><td><b>Overhead</b> (techo)</td><td>Electricidad, combustible, hidráulico, aire, ADIRS, APU, luces y señales.</td></tr>
<tr><td><b>Glareshield</b></td><td>FCU (panel del piloto automático) y los paneles EFIS de cada piloto.</td></tr>
<tr><td><b>Panel principal</b></td><td>PFD, ND, las dos pantallas ECAM (E/WD arriba, SD abajo), tren y autobrake.</td></tr>
<tr><td><b>Pedestal</b></td><td>MCDU, palancas de gases, ENG MASTER, flaps, speedbrake, radios, transpondedor y trim.</td></tr>
<tr><td><b>Laterales</b></td><td>Sidestick y volante de dirección (tiller) de rueda de morro.</td></tr></table>
<h3>Código de colores Airbus</h3>
<ul><li><b class="g">Verde</b>: funcionamiento normal / datos calculados.</li><li><b class="b">Azul (cian)</b>: lo seleccionado o introducido; acciones a realizar.</li><li><b>Blanco</b>: un pulsador fuera de su posición normal (p. ej. "OFF").</li><li><b class="a">Ámbar</b>: precaución, requiere atención.</li><li><b class="r">Rojo</b>: aviso, acción inmediata.</li><li><b style="color:#e879f9">Magenta</b>: restricciones del FMS (altitud, velocidad).</li></ul>`}],
quiz:[
{q:"¿Con qué se pilota el A320?",o:["Con un sidestick lateral","Con un yoke (cuernos) delante del piloto","Con una palanca central entre las piernas"],a:0,e:"Airbus usa sidestick lateral. Los Boeing de esta app usan yoke."},
{q:"¿Qué significa “neo” en A320neo?",o:["New engine option: nueva motorización","North European Operations","Una versión alargada del fuselaje"],a:0,e:"neo = new engine option (LEAP-1A o PW1100G GTF). El alargado es el A321."},
{q:"En la filosofía de “cabina oscura”, un pulsador sin luces significa…",o:["Que está en su posición normal","Que está averiado","Que no tiene corriente"],a:0,e:"Lights out = todo normal. Una luz blanca OFF indica posición anormal."},
{q:"¿Qué color usa Airbus para precauciones?",o:["Ámbar","Verde","Magenta"],a:0,e:"Ámbar = precaución; rojo = aviso; magenta = restricciones del FMS."},
{q:"¿Dónde está el MCDU?",o:["En el pedestal","En el overhead","En el glareshield"],a:0,e:"Los MCDU están en el pedestal; el FCU en el glareshield."},
{q:"¿Qué hace el ECAM?",o:["Vigila los sistemas y muestra avisos con las acciones a realizar","Controla el piloto automático","Calcula el plan de vuelo"],a:0,e:"El ECAM (Electronic Centralised Aircraft Monitor) muestra estado de motores/sistemas y procedimientos de fallo."}]},
{id:"m2",title:"2. Sistemas principales",lessons:[
{id:"l1",title:"Electricidad, hidráulico y combustible",html:`
<h3>⚡ Eléctrico</h3><ul><li>Dos generadores de motor (<b>IDG</b>), uno por motor.</li><li>Generador del <b>APU</b> y toma de tierra (<b>EXT PWR</b>).</li><li>Dos <b>baterías</b>.</li><li>Emergencia: la <b>RAT</b> (turbina de aire de impacto) sale si se pierde toda la corriente AC y, a través del sistema hidráulico azul, mueve un generador de emergencia.</li></ul>
<h3>💧 Hidráulico: tres sistemas</h3><table>
<tr><td><b class="g">Verde (Green)</b></td><td>Bomba del motor 1.</td></tr>
<tr><td><b class="b">Azul (Blue)</b></td><td>Bomba eléctrica y la RAT.</td></tr>
<tr><td><b class="a">Amarillo (Yellow)</b></td><td>Bomba del motor 2, bomba eléctrica y bomba manual (puertas de carga).</td></tr></table>
<p>La <b>PTU</b> transfiere potencia entre el verde y el amarillo sin mezclar líquido. Ese "ladrido" que oyes en tierra en un A320 es la PTU.</p>
<h3>⛽ Combustible</h3><p>Tanques en las alas (interior y exterior) y tanque central. Las bombas envían combustible a los motores; el central se gasta primero.</p>`},
{id:"l2",title:"Aire, ADIRS y mandos de vuelo",html:`
<h3>🌬️ Neumático y aire acondicionado</h3><p>El aire comprimido (<b>bleed</b>) sale de los motores o del APU. Alimenta los dos <b>packs</b> (aire acondicionado), la presurización, el antihielo de las alas y el arranque de motores.</p>
<h3>🧭 ADIRS</h3><p>Tres <b>ADIRU</b>. Cada una combina datos de aire (velocidad, altitud) y referencia inercial (posición, actitud, rumbo). Se alinean en tierra con el avión quieto.</p>
<h3>🕹️ Mandos fly-by-wire y leyes</h3>
<p>Siete ordenadores de mandos (en el A320ceo: 2 ELAC, 3 SEC y 2 FAC). Según los fallos, el avión vuela en una "ley":</p>
<ul><li><b>Ley normal</b>: todas las protecciones (ángulo de ataque, velocidad, alabeo, actitud, factor de carga).</li><li><b>Ley alternativa</b>: se pierden algunas protecciones.</li><li><b>Ley directa</b>: el sidestick mueve las superficies directamente, sin protecciones.</li></ul>
${TIP("Alpha floor","Si el ángulo de ataque llega a un valor muy alto en ley normal, el autothrust da empuje TOGA automáticamente para evitar la pérdida.")}`}],
quiz:[
{q:"¿Cuántos sistemas hidráulicos tiene el A320?",o:["Tres: verde, azul y amarillo","Dos: izquierdo y derecho","Cuatro: A, B, C y standby"],a:0,e:"Green, Blue y Yellow. Los sistemas A/B/standby son del Boeing 737."},
{q:"¿Qué hace la PTU?",o:["Transfiere potencia hidráulica entre los sistemas verde y amarillo","Genera electricidad de emergencia","Bombea combustible entre tanques"],a:0,e:"La Power Transfer Unit une hidráulicamente verde y amarillo sin mezclar fluido."},
{q:"¿Qué es la RAT?",o:["Una turbina de aire de emergencia que sale si se pierde la energía","El sistema de radar meteorológico","El ordenador de gestión de empuje"],a:0,e:"Ram Air Turbine: presuriza el sistema azul y, a través de él, mueve el generador de emergencia."},
{q:"¿Qué ley de mandos tiene todas las protecciones?",o:["Ley normal","Ley alternativa","Ley directa"],a:0,e:"Solo la ley normal incluye todas las protecciones de la envolvente."},
{q:"¿De dónde sale el aire para arrancar los motores del A320 en tierra?",o:["Del APU (o de un grupo de aire de tierra)","De las baterías","De la RAT"],a:0,e:"El arrancador neumático usa aire del APU o de una unidad de aire externa."},
{q:"¿Qué combinan las ADIRU?",o:["Datos de aire y referencia inercial","Combustible y pesos","Radio y transpondedor"],a:0,e:"Air Data + Inertial Reference = ADIRU."},
{q:"¿Qué tanque de combustible se gasta primero en el A320?",o:["El central","Los exteriores de las alas","Da igual, se gastan todos a la vez"],a:0,e:"El central se consume primero para que el peso del combustible en las alas alivie la carga estructural el mayor tiempo posible."}]},
{id:"m3",title:"3. FCU y automatismos",lessons:[
{id:"l1",title:"Gestionado vs seleccionado",html:`
<p>El <b>FCU</b> tiene mandos de velocidad (SPD), rumbo (HDG), altitud (ALT) y velocidad vertical (V/S). Cada uno se puede <b>empujar</b> o <b>tirar</b>:</p>
<ul><li><b>Empujar = gestionado (managed)</b>: el avión sigue al FMS. La ventana muestra guiones y un punto "---•".</li><li><b>Tirar = seleccionado (selected)</b>: el avión sigue el valor que tú pones.</li></ul>
<h3>Modos que leerás en el FMA</h3>
<table><tr><td><b>SRS</b></td><td>Guía de cabeceo en despegue (mantiene ~V2+10).</td></tr>
<tr><td><b>CLB / OP CLB</b></td><td>Subida gestionada (respeta restricciones) / abierta (directa a la altitud del FCU).</td></tr>
<tr><td><b>ALT / ALT*</b></td><td>Manteniendo / capturando altitud.</td></tr>
<tr><td><b>NAV</b></td><td>Sigue la ruta lateral del FMS.</td></tr>
<tr><td><b>DES / OP DES</b></td><td>Descenso gestionado / abierto.</td></tr>
<tr><td><b>LOC / G/S</b></td><td>Captura del ILS lateral / vertical (con el botón APPR).</td></tr></table>
<h3>Palancas de gases (thrust levers)</h3><p>Tienen muescas: <b>TOGA</b>, <b>FLX/MCT</b>, <b>CL</b> (subida) e <b>IDLE</b>. Con autothrust activo, las palancas van en CL y el ordenador mueve el empuje sin que se muevan.</p>`}],
quiz:[
{q:"Si empujas el mando de ALT en el FCU…",o:["El avión sube o baja en modo gestionado respetando las restricciones del FMS","El avión mantiene la altitud actual sin hacer nada más","Se desconecta el piloto automático"],a:0,e:"Empujar = gestionado (CLB/DES). Tirar = seleccionado/abierto (OP CLB/OP DES)."},
{q:"En crucero con autothrust activo, ¿dónde van las palancas de gases?",o:["En la muesca CL","En TOGA","En IDLE"],a:0,e:"El autothrust trabaja con las palancas en la muesca CL."},
{q:"¿Qué indica “---•” en la ventana de SPD?",o:["Velocidad gestionada por el FMS","Que la velocidad está averiada","Que tienes que introducir una velocidad"],a:0,e:"Guiones con punto = modo gestionado."},
{q:"¿Qué modo vertical está activo justo después del despegue?",o:["SRS","DES","G/S"],a:0,e:"SRS (Speed Reference System) guía el cabeceo en despegue y frustrada."},
{q:"¿Qué botón del FCU arma la captura del ILS (LOC y G/S)?",o:["APPR","LOC","EXPED"],a:0,e:"APPR arma LOC y G/S; LOC solo arma el localizador."}]},
{id:"m4",title:"4. Del cold & dark al rodaje (panel)",lessons:[
{id:"l1",title:"El flujo completo explicado",html:`
<p>Vas a practicar el encendido completo del A320 en el <b>panel interactivo</b>. Resumen del orden (simplificado para simulador):</p>
<ol><li>Freno de aparcamiento, <b>BAT 1 y 2</b>, <b>EXT PWR</b>.</li><li>Luces de navegación.</li><li><b>ADIRS</b> 1-3-2 en NAV (empieza la alineación).</li><li>Señales: cinturones, no fumar, luces de emergencia.</li><li><b>APU</b>: MASTER, START, BLEED; desconectar tierra.</li><li><b>Bombas de combustible</b>.</li><li><b>MCDU</b>: INIT A → F-PLN → INIT B → PERF.</li><li><b>FCU</b>: QNH, FD, altitud inicial.</li><li>Transpondedor, puertas, <b>BEACON</b>.</li><li><b>Arranque</b>: ENG MODE IGN/START, ENG 2 y ENG 1 MASTER.</li><li><b>Después</b>: ENG MODE NORM, APU BLEED y APU OFF, spoilers ARM, flaps, luz de rodaje, soltar freno.</li></ol>
${TOOL("#/p/a320","🎛️ Abrir el panel interactivo del A320")}
${WARN("Simplificado","Los procedimientos reales (FCOM y SOP de cada aerolínea) tienen más pasos y comprobaciones. Este flujo es una base didáctica para el simulador.")}`}],
quiz:[
{q:"¿Qué se enciende primero en un A320 cold & dark?",o:["Las baterías","El APU","Los motores"],a:0,e:"Primero baterías (y luego corriente de tierra o APU). El APU necesita energía para arrancar."},
{q:"¿En qué orden aparecen los selectores IR en el panel ADIRS?",o:["1 – 3 – 2","1 – 2 – 3","3 – 2 – 1"],a:0,e:"El panel real coloca la IR 3 en el centro: 1, 3, 2."},
{q:"¿Por qué no se debe mover el avión durante la alineación de las ADIRS?",o:["Porque las plataformas inerciales necesitan estar quietas para calcular su posición y el norte","Porque se gastan las baterías","Porque el APU no puede arrancar"],a:0,e:"La IR mide la rotación de la Tierra para encontrar el norte verdadero: el avión debe estar inmóvil."},
{q:"¿Qué indica la luz verde AVAIL en el pulsador APU START?",o:["Que el APU está listo para dar electricidad y aire","Que el APU está averiado","Que el APU se está apagando"],a:0,e:"AVAIL = disponible."},
{q:"¿Qué selector se pone en IGN/START antes de arrancar?",o:["ENG MODE","APU MASTER SW","NAV & LOGO"],a:0,e:"El selector ENG MODE en IGN/START prepara el arranque automático controlado por el FADEC."},
{q:"¿Qué se enciende justo antes del arranque para avisar al personal de tierra?",o:["BEACON (luz anticolisión)","Luces de aterrizaje","Luces de logo"],a:0,e:"La beacon roja indica que los motores van a arrancar o están en marcha."},
{q:"Tras el arranque, ¿qué haces con el APU BLEED?",o:["Lo apagas: ahora el aire viene de los motores","Lo dejas encendido todo el vuelo","Lo pasas a AUTO para el despegue"],a:0,e:"Con motores en marcha ya no hace falta el aire del APU."}]},
{id:"m5",title:"5. MCDU: programar LEVC → LEBL",lessons:[
{id:"l1",title:"Programación paso a paso",html:`
<p>Vamos a programar un vuelo <b>Valencia (LEVC) → Barcelona (LEBL)</b>. Ruta <b>de ejemplo con nombres ficticios</b>: <code>LEVC AZAHR1A AZAHR UN725 MARTA MARTA2B LEBL</code>.</p>
<h3>1. INIT A</h3><ul><li><b>R1 FROM/TO</b>: <code>LEVC/LEBL</code></li><li><b>L2 ALTN</b>: <code>LEGE</code> (Girona, ejemplo)</li><li><b>L3 FLT NBR</b>: tu indicativo</li><li><b>L5 COST INDEX</b>: el del OFP (ej. 30)</li><li><b>L6 CRZ FL</b>: ej. FL240</li></ul>
<p>Si usas SimBrief, el botón <b>INIT REQUEST</b> (en aviones que lo modelan) carga todo automáticamente.</p>
<h3>2. F-PLN</h3><ol><li>LEVC → LAT REV → DEPARTURE: pista <b>30</b> y SID → TMPY INSERT.</li><li>Último punto de la SID → LAT REV → AIRWAYS: VIA <code>UN725</code> TO <code>MARTA</code> → INSERT.</li><li>LEBL → LAT REV → ARRIVAL: aproximación <b>ILS24R</b>, STAR, transición → INSERT.</li><li>Revisa discontinuidades y compara con el OFP (puntos, distancias, restricciones).</li></ol>
<h3>3. RAD NAV</h3><p>Normalmente las radioayudas se sintonizan solas. Para el despegue puedes comprobar el ILS de la pista si hay.</p>
<h3>4. INIT B</h3><p>Pesos: <b>ZFW/ZFWCG</b> y <b>BLOCK</b> fuel. En aviones reales se rellena con la hoja de carga final.</p>
<h3>5. PERF</h3><ul><li>TAKE OFF: V1, VR, V2, TRANS ALT, THR RED/ACC, FLAPS/THS, FLEX TEMP.</li><li>CLB/CRZ/DES: se revisan; APPR se rellena antes del descenso (QNH, temperatura, viento, mínimos).</li></ul>
<h3>6. Comprobación cruzada</h3><p>En el ND, en modo PLAN, recorre la ruta con la tecla de desplazamiento y compárala con la carta.</p>
${TOOL("#/p/a320","🎛️ Practicarlo en el MCDU del panel")}
${WARN("Ejemplo","Velocidades, pesos y nombres de puntos son de ejemplo. Calcula los tuyos con el EFB del avión de tu simulador.")}`},
{id:"l2",title:"En vuelo: del despegue al aterrizaje",html:`
<h3>Despegue</h3><ol><li>En pista: luces (strobe, landing), transpondedor TA/RA.</li><li>Palancas a <b>FLX/MCT</b> (o TOGA). Lee el FMA: <i>MAN FLX 50 | SRS | RWY</i>, A/THR en azul (armado).</li><li>A VR rota suavemente (unos 3°/s) hasta ~15°.</li><li>Tren arriba con régimen positivo. Conecta <b>AP1</b> por encima de 100 ft.</li><li>A la altitud de reducción de empuje, "LVR CLB" parpadea: palancas a <b>CL</b>.</li><li>Recoge flaps a las velocidades F y S.</li></ol>
<h3>Crucero y descenso</h3><ol><li>Prepara la llegada: STAR, aproximación, <b>PERF APPR</b> (QNH, temperatura, viento, DA/MDA).</li><li>En el punto T/D (flecha blanca en el ND), pon la altitud que te den y empuja ALT: modo <b>DES</b>.</li><li>Por debajo de FL100, máximo 250 kt.</li></ol>
<h3>Aproximación</h3><ol><li>Activa la fase de aproximación (en el punto de deceleración o manualmente).</li><li>Flaps 1 a velocidad <b>Green Dot</b>, 2 a <b>S</b>, tren abajo, 3 y FULL a <b>F</b>.</li><li>Pulsa <b>APPR</b> para capturar el ILS (LOC y G/S) y conecta AP2.</li><li>Autobrake (LO o MED), spoilers ARM.</li><li>A la DA: con pista a la vista, desconecta el AP y aterriza. Hacia 20 ft el avión dice "RETARD": palancas a IDLE.</li></ol>`}],
quiz:[
{q:"¿En qué página del MCDU se introduce el nivel de crucero?",o:["INIT A","PERF TAKE OFF","RAD NAV"],a:0,e:"CRZ FL/TEMP está en INIT A (L6)."},
{q:"¿Cómo añades una aerovía al plan de vuelo?",o:["LAT REV en un punto → AIRWAYS → VIA y TO → INSERT","Escribiéndola en INIT B","Desde la página RAD NAV"],a:0,e:"Revisión lateral (LAT REV) en el punto de inicio → AIRWAYS."},
{q:"¿Dónde introduces ZFW y combustible?",o:["INIT B","INIT A","PERF APPR"],a:0,e:"INIT B: ZFW/ZFWCG y BLOCK."},
{q:"¿Qué datos van en PERF TAKE OFF?",o:["V1, VR, V2, flaps/THS y FLEX TEMP","QNH y viento del destino","Origen, destino y cost index"],a:0,e:"La página de despegue recoge velocidades, configuración y empuje reducido."},
{q:"Cuando “LVR CLB” parpadea en el FMA tras el despegue…",o:["Mueves las palancas de gases a la muesca CL","Subes el tren","Conectas el piloto automático"],a:0,e:"Indica que has llegado a la altitud de reducción de empuje: palancas a CL."},
{q:"¿Qué velocidad máxima se respeta por debajo de FL100 (normalmente)?",o:["250 kt","180 kt","320 kt"],a:0,e:"En la mayoría de espacios aéreos: 250 kt IAS por debajo de FL100 salvo autorización."},
{q:"¿A qué velocidad se seleccionan flaps 1 en la aproximación?",o:["Green Dot","V2","VR"],a:0,e:"Green dot es la velocidad de mejor planeo limpio; desde ahí se extienden flaps 1."},
{q:"¿Cuándo se rellena normalmente PERF APPR?",o:["En crucero, antes de iniciar el descenso","En tierra antes de arrancar","Después de aterrizar"],a:0,e:"La preparación de la llegada se hace en crucero con el ATIS/METAR del destino."}]}
],
final:{n:20,pass:75}
});
})();
