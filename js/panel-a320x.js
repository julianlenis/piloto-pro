/* A320 v6: interruptores separados, sistemas extra, MCDU completo y flujo del rodaje al apagado */
(()=>{const P=PP.panels.a320,S=PX.S,FPLN=(r)=>cdu('FROM          JLN123',r,'');
const pumps=(id,lb,inf)=>pb(id,lb,'OFF',S_OFFW,inf);
PX.split(P,'fl',[pumps('fl1','L TK PUMP 1','Bomba 1 del tanque izquierdo (ala).'),pumps('fl2','L TK PUMP 2','Bomba 2 del tanque izquierdo.')],(st,c,k)=>({t:`${c.lb}: ON`,d:k?'La segunda bomba del ala izquierda.':'Pulsa L TK PUMP 1: se apaga la luz OFF.',w:k?'Hay dos bombas por tanque: si una falla, la otra sigue alimentando el motor.':st.w.replace(' (En el avión real son dos pulsadores, aquí agrupados).','')}));
PX.split(P,'fc',[pumps('fc1','CTR TK PUMP 1','Bomba 1 del tanque central.'),pumps('fc2','CTR TK PUMP 2','Bomba 2 del tanque central.')],(st,c,k)=>({t:`${c.lb}: ON`,d:k?'Segunda bomba del tanque central.':'Bomba 1 del tanque central.'}));
PX.split(P,'fr',[pumps('fr1','R TK PUMP 1','Bomba 1 del tanque derecho.'),pumps('fr2','R TK PUMP 2','Bomba 2 del tanque derecho.')],(st,c,k)=>({t:`${c.lb}: ON`,d:k?'Segunda bomba del ala derecha.':'Bomba 1 del tanque derecho.'}));
PX.addSec(P,{id:'sys',name:'Overhead · OXY, ANTI ICE, PROBES, PRESS',ctls:[
 pb('oxy','CREW SUPPLY','OFF',S_OFFW,'Oxígeno de la tripulación (máscaras de cabina). Normal ON, luz apagada.'),
 pb('probe','PROBE/WINDOW HEAT','AUTO',{AUTO:[['',''],['','d']],ON:[['',''],['ON','b']]},'Calefacción de sondas (pitot, estáticas, temperatura) y parabrisas. AUTO: se activa sola.'),
 pb('wai','WING ANTI ICE','OFF',PX.lt,'Anti-hielo de alas (aire caliente de los motores).'),pb('eai1','ENG 1 ANTI ICE','OFF',PX.lt,'Anti-hielo de la toma de aire del motor 1.'),pb('eai2','ENG 2 ANTI ICE','OFF',PX.lt,'Anti-hielo del motor 2.'),
 pb('pmode','PRESS MODE SEL','AUTO',{AUTO:[['',''],['','d']],MAN:[['',''],['MAN','w']]},'Presurización automática (normal) o manual.'),sel('ldg','LDG ELEV',['AUTO','0','2','4','6','8'],'AUTO','Elevación de aterrizaje: AUTO la toma del FMS (en miles de pies si se pone a mano).')]},'fuel');
PX.addCtl(P,'lt',[sel('strobe','STROBE',['OFF','AUTO','ON'],'OFF','Luces estroboscópicas blancas.'),sel('land','LAND',['RETR','OFF','ON'],'RETR','Luces de aterrizaje.'),tg('rwyto','RWY TURN OFF',['OFF','ON'],'OFF','Luces laterales de salida de pista.')]);
const fcu=PX.sec(P,'fcu').ctls;fcu.find(c=>c.id==='ap1').st=PX.bar;fcu.find(c=>c.id==='athr').st=PX.bar;fcu.push(pb('loc','LOC','OFF',PX.bar,'Arma solo el localizador.'),pb('appr','APPR','OFF',PX.bar,'Arma la aproximación ILS (localizador y senda).'));
PX.addSec(P,{id:'thr',name:'Pedestal · empuje, tren y frenos',ctls:[sel('thr','THRUST LEVERS',['IDLE','CL','FLX/MCT','TOGA'],'IDLE','Palancas de empuje con posiciones fijas (detents).'),lev('gear','GEAR',['DOWN','UP'],'DOWN','Palanca del tren de aterrizaje.'),sel('abrk','AUTO BRK',['OFF','LO','MED','MAX'],'OFF','Frenado automático: LO/MED para aterrizar, MAX para despegar (frenada en despegue abortado).'),sel('rev','REVERSE',['STOW','IDLE','MAX'],'STOW','Reversas de empuje (palancas sobre las de empuje).')]},'mcdu');
// ---- Flujo 1: sistemas extra (antes del APU)
PX.after(P,s=>s.c==='emer',[
 S('Sistemas','oxy','ON','CREW SUPPLY (oxígeno): ON','Pulsa CREW SUPPLY: se apaga la luz blanca OFF.','Da presión de oxígeno a las máscaras de los pilotos. Se comprueba en la preparación de cabina.'),
 S('Sistemas',null,null,'Comprobar sondas y anti-hielo','Comprueba: PROBE/WINDOW HEAT en AUTO (luz apagada) y WING / ENG ANTI ICE apagados.','Las sondas se calientan solas con un motor en marcha y en vuelo. El anti-hielo de motor se usa con engelamiento: temperatura de 10 °C o menos con humedad visible (nubes, niebla, lluvia, nieve).'),
 S('Sistemas',null,null,'Comprobar presurización en AUTO','MODE SEL en AUTO (sin luces) y LDG ELEV en AUTO.','En AUTO el sistema toma la elevación del aeropuerto de destino del FMS y presuriza la cabina él solo durante subida, crucero y descenso.')]);
// ---- Flujo 1: MCDU más completo (después de FLEX)
const cl=cdu('CLB',[[['ACT MODE','EFOB'],['{g}MANAGED{/}','{g}3.4{/}']],[['CI',''],['{c}30{/}','']],[['MANAGED',''],['{g}290/.78{/}','']],[['PRESEL',''],['{c}*[ ]{/}','']],[['',''],['','']],[['','NEXT'],['','{w}PHASE>{/}']]],'');
const cr=cdu('CRZ',[[['ACT MODE',''],['{g}MANAGED{/}','']],[['CI',''],['{c}30{/}','']],[['MANAGED',''],['{g}.78{/}','']],[['PRESEL',''],['{c}*[ ]{/}','']],[['','DES CABIN RATE'],['','{c}-350FT/MN{/}']],[['','NEXT'],['','{w}PHASE>{/}']]],'');
const ap0=cdu('APPR',[[['QNH','FINAL'],['{o}[ ]{/}','{g}ILS24R{/}']],[['TEMP','MDA'],['{c}[ ]°{/}','{c}[ ]{/}']],[['MAG WIND','DH'],['{c}[ ]°/[ ]{/}','{c}[ ]{/}']],[['TRANS FL','LDG CONF'],['{c}FL060{/}','{c}CONF3{/}']],[['VAPP','FULL'],['{g}137{/}','{c}*{/}']],[['','NEXT'],['','{w}PHASE>{/}']]],'');
PX.after(P,s=>s.c==='mR5'&&/FLEX/.test(s.t),[
 S('MCDU · PERF','mR6',null,'PERF CLB (NEXT PHASE)','Pulsa R6 NEXT PHASE: página de subida.','Aquí ves el Cost Index y la velocidad “managed” que calcula el FMS para subir (ejemplo 290 kt / M0.78). Se puede preseleccionar otra velocidad.',{scr:cl}),
 S('MCDU · PERF','mR6',null,'PERF CRZ','Otra vez NEXT PHASE: página de crucero.','Velocidad de crucero managed (ej. M0.78) y régimen de descenso de cabina. Nada que cambiar.',{scr:cr}),
 S('MCDU · PERF','mR6',null,'PERF DES y APPR','NEXT PHASE dos veces: DES y después APPR. La página APPR se rellena en crucero, con el ATIS del destino.','Revisar todas las fases antes de volar evita sorpresas. Lo veremos en el flujo 2.',{scr:ap0}),
 S('MCDU · RAD NAV','mRAD',null,'RAD NAV: radioayudas','Pulsa RAD NAV. El FMS sintoniza solo VOR y DME; el ILS de LEBL se sintonizará al acercarte (frecuencia de ejemplo).','Puedes forzar una frecuencia a mano, pero lo normal es dejar el “autotune”. En la salida algunas SID usan un VOR: compruébalo aquí.',{scr:cdu('RADIO NAV',[[['VOR1/FREQ','FREQ/VOR2'],['{c}VXX/114.00{/}','{c}[ ]/[ ]{/}']],[['CRS','CRS'],['{c}300{/}','{c}[ ]{/}']],[['LS /FREQ',''],['{c}[ ]/[ ]{/}','']],[['CRS',''],['{c}[ ]{/}','']],[['ADF1/FREQ','FREQ/ADF2'],['{c}[ ]/[ ]{/}','{c}[ ]/[ ]{/}']],[['',''],['','']]],'')})]);
// ---- Flujo 2: del rodaje al apagado
const T=[
S('Rodaje','abrk','MAX','AUTO BRK: MAX','Pon el frenado automático en MAX.','En despegue, MAX solo actúa si abortas a alta velocidad: frena al máximo sin esperar a que pises los pedales.'),
S('Rodaje',null,null,'T.O CONFIG test','Pulsa el botón T.O CONFIG del ECAM (aquí: Continuar).','Comprueba que flaps, trim, spoilers y frenos están bien para despegar. Si algo falla, suena un aviso.',{m:'<span class="gr">T.O CONFIG NORMAL</span> · memo T.O: AUTO BRK MAX, SIGNS ON, SPLRS ARM, FLAPS T.O, T.O CONFIG NORM'}),
S('Antes del despegue','strobe','ON','STROBE: ON','Con la autorización para entrar en pista, estroboscópicas ON.','Te hacen muy visible en la pista.'),
S('Antes del despegue','land','ON','LAND: ON','Luces de aterrizaje encendidas.','Se encienden al entrar en pista para despegar.'),
S('Antes del despegue','nose','T.O.','NOSE: T.O.','Luz de morro en posición de despegue.','Más potente que TAXI.'),
S('Antes del despegue','rwyto','ON','RWY TURN OFF: ON','Luces laterales encendidas.','Mejoran la visibilidad en la pista.'),
S('Antes del despegue','xpdr','4721 TA/RA','Transpondedor y TCAS: TA/RA','Pon el TCAS en TA/RA.','El TCAS avisa de tráficos cercanos y da órdenes para evitarlos (RA).'),
S('Despegue','thr','FLX/MCT','Empuje: FLX/MCT','Con “cleared for take-off”, adelanta las palancas al 50 % N1, espera a que se estabilicen y llévalas al punto FLX/MCT.','El A/THR se arma solo. En el FMA verás MAN FLEX 50 · SRS · RWY y A/THR en azul.',{m:'FMA: <span class="gr">MAN FLEX 50 | SRS | RWY</span> · <span class="cy">A/THR</span>',beep:1}),
S('Despegue',null,null,'Carrera de despegue y rotación','Mantén el eje con los pedales. “Cien nudos”… “V1”… “Rotate”: tira suave hasta unos 15° de cabeceo.','Rotar suave evita tocar el suelo con la cola. A V1 ya no se aborta.',{m:'V1 · ROTATE · ~15° cabeceo'}),
S('Despegue','gear','UP','GEAR: UP','Con velocidad vertical positiva (“positive climb”), sube el tren.','Quitar el tren reduce mucha resistencia.',{m:'GEAR UP · LDG GEAR <span class="gr">UPLOCK</span>'}),
S('Subida','thr','CL','Empuje: CL a 1.500 ft','A la altitud de reducción (THR RED, 1.500 ft en PERF), parpadea “LVR CLB”: lleva las palancas a CL.','Desde aquí el autothrust gestiona el empuje de subida.',{m:'FMA: <span class="gr">THR CLB | CLB | NAV</span>'}),
S('Subida','ap1','ON','AP1: ON','Conecta el piloto automático 1 (por encima de 100 ft se puede).','Con el AP el avión sigue la SID (NAV) y sube a la altitud del FCU.',{m:'FMA: <span class="gr">AP1 · 1FD2 · A/THR</span>'}),
S('Subida','flaps','0','FLAPS: 0','Al pasar la velocidad S (verde), recoge flaps a 0.','Despegando con 1+F, los flaps se recogen a 0 al pasar la velocidad S. Después el avión acelera hacia la velocidad de subida; la mínima limpia es “green dot”.'),
S('Subida','spdbrk','RET','GND SPLR: desarmar','Desarma los spoilers de tierra.','Ya no son necesarios hasta el aterrizaje.'),
S('Subida','nose','OFF','NOSE: OFF','Luz de morro apagada.','Se apaga tras recoger el tren.'),
S('Subida','rwyto','OFF','RWY TURN OFF: OFF','Apágalas también.','Solo sirven cerca del suelo.'),
S('Subida','baro','STD','Altímetro: STD en la altitud de transición','Al pasar la altitud de transición (6.000 ft en la carta de ejemplo), pulsa el botón BARO: STD.','Por encima se vuela en niveles de vuelo con 1013 hPa para que todos usen la misma referencia.'),
S('Subida','alt','FL240','ALT: FL240','Con la autorización “suba a nivel 240”, gira la ventana ALT a 24000 y púlsala (modo managed).','Pulsar = el FMS gestiona la subida (CLB). Tirar = subida selectada (OP CLB).',{m:'FMA: <span class="gr">THR CLB | CLB | NAV</span> · ALT <span class="cy">FL240</span>'}),
S('Subida','land','RETR','LAND: RETR por encima de FL100','Al pasar FL100, apaga y recoge las luces de aterrizaje.','Por debajo de FL100 se llevan encendidas para ser visibles. Además, a FL100 se puede acelerar por encima de 250 kt.'),
S('Crucero',null,null,'Crucero: FL240','Nivel de crucero. Vigila combustible, ruta y meteo. Es el momento de preparar la llegada.','En un vuelo corto como LEVC→LEBL el crucero dura muy poco: prepara la llegada pronto.',{m:'FMA: <span class="gr">SPEED | ALT CRZ | NAV</span>'}),
S('Llegada · MCDU','mPERF',null,'PERF → APPR','Pulsa PERF y luego NEXT PHASE hasta APPR.','Aquí se introducen los datos del ATIS de destino.',{scr:ap0}),
S('Llegada · MCDU','mL1',null,'QNH, temperatura y viento','Introduce QNH 1015 (L1), TEMP 16 (L2) y MAG WIND 240/12 (L3) del ATIS (datos de ejemplo).','Con el viento el FMS calcula la VAPP (velocidad de aproximación) con su margen.',{scr:cdu('APPR',[[['QNH','FINAL'],['{c}1015{/}','{g}ILS24R{/}']],[['TEMP','MDA'],['{c}16°{/}','{c}[ ]{/}']],[['MAG WIND','DH'],['{c}240°/12{/}','{o}[ ]{/}']],[['TRANS FL','LDG CONF'],['{c}FL060{/}','{c}CONF3{/}']],[['VAPP','FULL'],['{g}138{/}','{c}*{/}']],[['','NEXT'],['','{w}PHASE>{/}']]],'200')}),
S('Llegada · MCDU','mR3',null,'DH: 200','Introduce la DH de la carta (ejemplo: 200 ft) en R3 y elige FULL como configuración de aterrizaje.','La DH es la altura de decisión del ILS: si no ves la pista ahí, frustrada.',{scr:cdu('APPR',[[['QNH','FINAL'],['{c}1015{/}','{g}ILS24R{/}']],[['TEMP','MDA'],['{c}16°{/}','{c}[ ]{/}']],[['MAG WIND','DH'],['{c}240°/12{/}','{c}200{/}']],[['TRANS FL','LDG CONF'],['{c}FL060{/}','{c}*CONF3{/}']],[['VAPP','FULL'],['{g}135{/}','{c}FULL{/}']],[['','NEXT'],['','{w}PHASE>{/}']]],'')}),
S('Llegada · MCDU','mDIR',null,'DIR TO: el control te da un directo','ATC: “JLN123, proceda directo a SOLER”. Pulsa DIR.','DIR TO borra los puntos intermedios y vuela recto al punto elegido.',{scr:cdu('DIR TO',[[['WAYPOINT',''],['{o}[     ]{/}','']],[['F-PLN WPTS',''],['{g}MARTA{/}','']],[['',''],['{g}ROSAL{/}','']],[['',''],['{g}SOLER{/}','']],[['',''],['{g}LXX{/}','']],[['',''],['','']]],'')}),
S('Llegada · MCDU','mL4',null,'Elegir SOLER','Pulsa L4 (SOLER). En el A320 el directo se ejecuta al seleccionarlo.','Comprueba en la ND que la línea verde va directa al punto.',{scr:FPLN([[['',''],['{g}T-P{/}','{g}FL240{/}']],[['',''],['{w}SOLER{/}','{m}7000{/}']],[['',''],['{g}LXX{/}','{g}5000{/}']],[['',''],['{g}FI24R{/}','{g}3000{/}']],[['',''],['{g}LEBL24R{/}','']],[['DEST   TIME   DIST  EFOB',''],['{g}LEBL24R{/}','{g}0:22  64{/}']]])}),
S('Descenso','alt','7000','ALT: 7000 y descenso managed','En el T/D (flecha blanca en la ND), con la autorización, pon 7000 en ALT y púlsalo.','El FMS baja respetando restricciones de la STAR (DES). Si tiras, OP DES: baja sin restricciones.',{m:'FMA: <span class="gr">THR IDLE | DES | NAV</span>'}),
S('Descenso','baro','1015','Altímetro: QNH 1015 en el nivel de transición','Al cruzar el nivel de transición, pulsa BARO y pon el QNH del destino.','Bajando, cambias de STD a QNH para que el altímetro marque altitud sobre el mar.'),
S('Descenso','land','ON','LAND: ON por debajo de FL100','Luces de aterrizaje encendidas.','Bajo FL100: luces ON y máximo 250 kt.'),
S('Aproximación','appr','ON','APPR','Cuando el control te autorice el ILS, pulsa APPR.','Arma el localizador (LOC azul) y la senda (G/S azul). Al interceptarlos pasan a verde.',{m:'FMA: <span class="cy">G/S</span> · <span class="cy">LOC</span> armados'}),
S('Aproximación','flaps','1','FLAPS: 1','A green dot, flaps 1 (activa la fase de aproximación en el MCDU si no lo hizo el FMS).','Cada configuración tiene su velocidad: S, F y VAPP.'),
S('Aproximación','flaps','2','FLAPS: 2','A la velocidad S, flaps 2.','Vas frenando por etapas.',{m:'FMA: <span class="gr">SPEED | G/S | LOC</span> · AP1 + AP2 posible'}),
S('Aproximación','gear','DOWN','GEAR: DOWN','Tren abajo (normalmente cerca del FAF).','Las tres luces verdes confirman el tren abajo y blocado.',{m:'LDG GEAR <span class="gr">▼ ▼ ▼</span>'}),
S('Aproximación','flaps','3','FLAPS: 3','A la velocidad F, flaps 3.','',{}),
S('Aproximación','flaps','FULL','FLAPS: FULL','Flaps FULL, configuración de aterrizaje.','Velocidad objetivo: VAPP.'),
S('Aproximación','spdbrk','ARM','GND SPLR: ARM','Arma los spoilers para el aterrizaje.','Se despliegan solos al tocar la pista.'),
S('Aproximación','abrk','LO','AUTO BRK: LO','Frenado automático LO (o MED si la pista es corta o está mojada).','Así el avión frena de forma suave y constante tras el toque.',{m:'LDG MEMO: LDG GEAR DN · SIGNS ON · SPLRS ARM · FLAPS FULL · <span class="gr">LDG MEMO OK</span>'}),
S('Aterrizaje','ap1','OFF','AP1: OFF a la mínima','Con la pista a la vista (antes de la DH, o a 1.000 ft si prefieres practicar), desconecta el AP con el botón de la palanca.','Sigues las barras del FD. Suena el “cavalry charge” de desconexión.',{beep:1}),
S('Aterrizaje','thr','IDLE','RETARD: empuje IDLE','A 20 ft oirás “RETARD”: lleva las palancas a IDLE y haz un pequeño flare.','Si no reduces, el A/THR mantendría empuje. Toca suave con el tren principal.',{m:'TOUCHDOWN · SPOILERS <span class="gr">EXT</span> · AUTO BRK <span class="gr">LO</span>'}),
S('Aterrizaje','rev','MAX','Reversas: MAX','Tras tocar, tira de las reversas.','Ayudan a frenar sobre todo a alta velocidad.'),
S('Aterrizaje','rev','IDLE','Reversas: IDLE a 70 kt','A 70 kt, reversa a ralentí.','Por debajo de 70 kt pueden reingerir gases o suciedad.'),
S('Aterrizaje','rev','STOW','Reversas: guardar','Al salir de pista, guarda las reversas y desconecta el autobrake con los pedales.','Rueda a velocidad de rodaje.'),
S('Después del aterrizaje','spdbrk','RET','GND SPLR: RET','Spoilers retraídos.','Empieza la lista “after landing”.'),
S('Después del aterrizaje','flaps','0','FLAPS: 0','Flaps arriba.','',{}),
S('Después del aterrizaje','strobe','AUTO','STROBE: AUTO','Estroboscópicas en AUTO (se apagan en tierra).',''),
S('Después del aterrizaje','land','RETR','LAND: RETR','Luces de aterrizaje recogidas.',''),
S('Después del aterrizaje','nose','TAXI','NOSE: TAXI','Luz de rodaje.',''),
S('Después del aterrizaje','abrk','OFF','AUTO BRK: OFF','Frenado automático desconectado.',''),
S('Después del aterrizaje','xpdr','4721 STBY','Transpondedor: STBY','TCAS y transpondedor a STBY (según aeropuerto, puede pedirse dejarlo activo hasta el aparcamiento).',''),
S('Después del aterrizaje','apum','ON','APU MASTER SW: ON','Arranca el APU para tener energía al parar motores.','',{}),
S('Después del aterrizaje','apus','ON','APU START','APU START.','En 1-2 minutos aparece AVAIL.',{later:[[['apus','AVAIL']],'APU <span class="gr">AVAIL</span>','Arrancando APU…']}),
S('Aparcamiento','pbrk','ON','PARK BRK: ON','En el aparcamiento, freno de aparcamiento.','Comprueba la presión de frenos.'),
S('Aparcamiento','eng1','OFF','ENG 1 MASTER: OFF','Para el motor 1.','',{}),
S('Aparcamiento','eng2','OFF','ENG 2 MASTER: OFF','Para el motor 2.','El APU alimenta ya el avión.',{m:'ENG 1 + 2 OFF · APU GEN alimentando'}),
S('Aparcamiento','beacon','OFF','BEACON: OFF','Con los motores parados, beacon OFF: el personal de tierra puede acercarse.',''),
S('Aparcamiento','belts','OFF','SEAT BELTS: OFF','Los pasajeros pueden levantarse.',''),
S('Aparcamiento','fl1','OFF','Bombas de combustible: OFF','Apaga las seis bombas (aquí, un toque las apaga todas).','',{fx:[['fl2','OFF'],['fc1','OFF'],['fc2','OFF'],['fr1','OFF'],['fr2','OFF']]}),
S('Asegurar el avión','extpwr','ON','EXT PWR: ON','Si hay GPU, conéctalo.','Así apagas el APU sin dejar el avión sin energía.'),
S('Asegurar el avión','apum','OFF','APU MASTER SW: OFF','Apaga el APU.','',{fx:[['apus','OFF'],['apub','OFF']]}),
S('Asegurar el avión','ir1','OFF','ADIRS: OFF','IR 1, 2 y 3 a OFF (un toque los apaga todos).','',{fx:[['ir2','OFF'],['ir3','OFF']]}),
S('Asegurar el avión','oxy','OFF','CREW SUPPLY: OFF','Oxígeno de tripulación cortado.',''),
S('Asegurar el avión','emer','OFF','EMER EXIT LT: OFF','Luces de emergencia desarmadas.',''),
S('Asegurar el avión','extpwr','AVAIL','EXT PWR: desconectar','Desconecta la corriente de tierra.',''),
S('Asegurar el avión','nav','OFF','NAV & LOGO: OFF','Luces de navegación apagadas.',''),
S('Asegurar el avión','bat1','OFF','BAT 1: OFF','Baterías fuera.','',{}),
S('Asegurar el avión','bat2','OFF','BAT 2: OFF','Última: el avión vuelve a “cold & dark”.','',{m:'<span class="wh">CABINA OSCURA (COLD & DARK)</span>',scr:null})];
P.flows=[{id:'pre',name:'De cold & dark a listo para rodar',steps:P.flow,done:'¡Listo para rodar!',doneTxt:'Sigue con el flujo 2: despegue, subida, crucero, llegada, aterrizaje y apagado.'},
 {id:'vuelo',name:'Del rodaje al apagado (vuelo completo)',steps:T,done:'¡Vuelo completado y avión asegurado!',doneTxt:'Has hecho un vuelo completo LEVC→LEBL de forma simplificada. Repite en el simulador con tu avión favorito.'}];
P.snd=v=>[(v.bat1!=='OFF'||v.bat2!=='OFF')&&'hum',v.extpwr==='ON'&&'gpu',...['fl1','fl2','fc1','fc2','fr1','fr2'].map(k=>v[k]==='ON'&&'pump_'+k),v.apum==='ON'&&/ON|AVAIL/.test(v.apus)&&'apu',v.eng1==='ON'&&'eng_1',v.eng2==='ON'&&'eng_2'];
})();
