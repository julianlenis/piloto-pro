/* 737 v6: interruptores separados, WINDOW HEAT, YAW DAMPER, PRESURIZACIÓN, FMC más completo y flujo del rodaje al apagado */
(()=>{const P=PP.panels.b737,S=PX.S,LP={OFF:[['',''],['LOW PRESS','a']],ON:[['',''],['','d']]};
PX.split(P,'apug',[sel('apug1','APU GEN → BUS 1',['OFF','ON BUS'],'OFF','Conecta el generador del APU a la barra 1.'),sel('apug2','APU GEN → BUS 2',['OFF','ON BUS'],'OFF','Conecta el generador del APU a la barra 2.')],(st,c,k)=>({t:`${c.lb}: ON BUS`,d:k?'Ahora la barra 2.':'Interruptor de la barra 1.'}));
PX.split(P,'gen',[sel('gen1','GEN 1',['OFF','ON BUS'],'OFF','Generador del motor 1.'),sel('gen2','GEN 2',['OFF','ON BUS'],'OFF','Generador del motor 2.')],(st,c)=>({t:`${c.lb}: ON BUS`}));
PX.split(P,'f1',[pb('f1a','AFT 1','OFF',LP,'Bomba trasera del tanque 1.'),pb('f1f','FWD 1','OFF',LP,'Bomba delantera del tanque 1.')],(st,c,k)=>({t:`${c.lb}: ON`,d:k?'Segunda bomba del tanque 1.':st.d}));
PX.split(P,'f2',[pb('f2a','AFT 2','OFF',LP,'Bomba trasera del tanque 2.'),pb('f2f','FWD 2','OFF',LP,'Bomba delantera del tanque 2.')],(st,c,k)=>({t:`${c.lb}: ON`,d:k?'Segunda bomba del tanque 2.':st.d}));
PX.split(P,'fc',[pb('fcl','CTR L','OFF',{OFF:[['',''],['','']],ON:[['',''],['','d']]},'Bomba central izquierda (solo con combustible en el tanque central).'),pb('fcr','CTR R','OFF',{OFF:[['',''],['','']],ON:[['',''],['','d']]},'Bomba central derecha.')]);
PX.split(P,'heng',[tg('heng1','ENG 1 PUMP (A)',['OFF','ON'],'ON','Bomba del motor 1, sistema A.'),tg('heng2','ENG 2 PUMP (B)',['OFF','ON'],'ON','Bomba del motor 2, sistema B.')]);
PX.split(P,'helec',[tg('helec2','ELEC 2 PUMP (A)',['OFF','ON'],'OFF','Bomba eléctrica 2, sistema A.'),tg('helec1','ELEC 1 PUMP (B)',['OFF','ON'],'OFF','Bomba eléctrica 1, sistema B.')],(st,c,k)=>({t:`${c.lb}: ON`,d:k?'Ahora la del sistema B.':'Bomba eléctrica del sistema A.'}));
PX.split(P,'packs',[sel('packl','L PACK',['OFF','AUTO','HIGH'],'AUTO','Pack izquierdo.'),sel('packr','R PACK',['OFF','AUTO','HIGH'],'AUTO','Pack derecho.')],(st,c,k)=>({t:`${c.lb}: ${st.to}`,d:k?'Y el derecho.':st.d}));
PX.addSec(P,{id:'sys',name:'Overhead · WINDOW HEAT, YAW DAMPER, PRESSURIZATION',ctls:[
 tg('wh1','WINDOW HEAT L SIDE',['OFF','ON'],'OFF','Ventana lateral izquierda.'),tg('wh2','L FWD',['OFF','ON'],'OFF','Parabrisas izquierdo.'),tg('wh3','R FWD',['OFF','ON'],'OFF','Parabrisas derecho.'),tg('wh4','R SIDE',['OFF','ON'],'OFF','Ventana lateral derecha.'),
 tg('yd','YAW DAMPER',['OFF','ON'],'OFF','Amortiguador de guiñada: evita el “balanceo holandés”.'),
 disp('fltalt','FLT ALT','-----','Altitud de crucero para la presurización.'),disp('landalt','LAND ALT','-----','Elevación del aeropuerto de destino.'),sel('pmode','PRESS MODE',['AUTO','ALTN','MAN'],'AUTO','Modo de presurización.'),
 tg('wai','WING ANTI-ICE',['OFF','ON'],'OFF','Anti-hielo de alas.'),tg('eai','ENG ANTI-ICE 1/2',['OFF','ON'],'OFF','Anti-hielo de motores.')]},'apu');
PX.addCtl(P,'lt',[tg('land','LANDING',['OFF','ON'],'OFF','Luces de aterrizaje.'),tg('rwyto','RWY TURNOFF',['OFF','ON'],'OFF','Luces laterales.')]);
PX.addCtl(P,'mcp',[pb('cmd','CMD A','OFF',PX.bar,'Piloto automático A.'),pb('app','APP','OFF',PX.bar,'Modo aproximación ILS.')]);
PX.addSec(P,{id:'thr',name:'Pedestal · empuje, tren y frenos',ctls:[sel('thr','THRUST LEVERS',['IDLE','40% N1','TO/GA'],'IDLE','Palancas de empuje.'),sel('gear','GEAR',['DOWN','UP','OFF'],'DOWN','Tren: UP y después OFF.'),sel('abrk','AUTO BRAKE',['RTO','OFF','1','2','3','MAX'],'OFF','Frenado automático.'),lev('spdbrk','SPEED BRAKE',['DOWN','ARMED'],'DOWN','Speedbrake.'),sel('rev','REVERSE',['STOW','IDLE','MAX'],'STOW','Reversas.')]},'cdu');
PX.after(P,s=>s.c==='belts',[
 S('Sistemas','yd','ON','YAW DAMPER: ON','Conecta el yaw damper.','Amortigua el “balanceo holandés” (dutch roll), una oscilación de guiñada y alabeo típica de los aviones de ala en flecha.'),
 ...['wh1','wh2','wh3','wh4'].map((w,k)=>S('Sistemas',w,'ON',['WINDOW HEAT L SIDE','WINDOW HEAT L FWD','WINDOW HEAT R FWD','WINDOW HEAT R SIDE'][k]+': ON',k?'Siguiente.':'Enciende los cuatro WINDOW HEAT (luces verdes ON).',k?'':'Al menos 10 minutos antes del despegue: el cristal caliente es más resistente a impactos de aves.')),
 S('Presurización','fltalt','24000','FLT ALT: 24000','Pon la altitud de crucero en el panel de presurización.','El sistema programa la subida de la cabina según el nivel de crucero.'),
 S('Presurización','landalt','12','LAND ALT: 12','Pon la elevación del destino (LEBL ≈ 12 ft, redondeado).','Así la cabina llega a tierra con la presión del aeropuerto de destino. ¡Olvidarlo es un error clásico en el 737!',{m:'PRESS: AUTO · FLT ALT 24000 · LAND ALT 12'})]);
const i=P.flow.findIndex(s=>s.t==='N1 LIMIT');
P.flow.splice(i+1,0,S('FMC · N1 LIMIT','kL1',null,'SEL TEMP: 40 °C','Escribe 40 y pulsa L1 (temperatura supuesta, ejemplo).','Reduce el empuje como si hiciera más calor: ahorra motor.'),S('FMC · N1 LIMIT','kR2',null,'TO-1 (derate 24K)','Pulsa R2 (TO-1, ejemplo).','Derate fijo del empuje de despegue; se puede combinar con la temperatura supuesta.'));
const j=P.flow.findIndex(s=>s.t==='TAKEOFF REF: flaps 5, CG, V-speeds');
P.flow[j]=Object.assign({},P.flow[j],{t:'TAKEOFF REF: flaps 5 y CG',d:'Pulsa R6 (TAKEOFF>). Escribe 5 en L1 (flaps) y el CG en L3 (ejemplo 22 %). El FMC propone V1/VR/V2.'});
P.flow.splice(j+1,0,S('FMC · TAKEOFF','kR1',null,'Aceptar V1 (R1)','Pulsa R1.','Decisión.'),S('FMC · TAKEOFF','kR2',null,'Aceptar VR (R2)','Pulsa R2.','Rotación.'),S('FMC · TAKEOFF','kR3',null,'Aceptar V2 (R3)','Pulsa R3.','Velocidad segura con un motor.'));
const T=PX.boeingFlow({id:'b737',abrk:'abrk',strobe:['pos','STROBE','STEADY'],land:'land',rwyto:'rwyto',taxi:'taxi',thr:'thr',gear:'gear',ap:'cmd',app:'app',spd:'spdbrk',rev:'rev',apAlt:'400',flapsTO:'5',flapsRet:['1','UP'],appSeq:['1','5','GEAR','15','30'],vref:'142',gw:'62.0',
 cut:['sl1','sl2'],beacon:'anti',pumps:['f1a','f1f','f2a','f2f'],
 apuGen:[S('Después del aterrizaje','apug1','ON BUS','APU GEN: ON BUS','Al llegar al aparcamiento, conecta el APU a las barras (aquí un toque para las dos).','',{fx:[['apug2','ON BUS']]})],
 shut:[S('Asegurar el avión','helec2','OFF','ELEC PUMPS: OFF','','',{fx:[['helec1','OFF']]}),S('Asegurar el avión','wh1','OFF','WINDOW HEAT: OFF','','',{fx:[['wh2','OFF'],['wh3','OFF'],['wh4','OFF']]}),S('Asegurar el avión','probe','OFF','PROBE HEAT: OFF','',''),S('Asegurar el avión','yd','OFF','YAW DAMPER: OFF','','')],
 ext:['grd','OFF'],irs:['irsl','irsr'],nav:['pos','OFF'],bat:'bat'});
T.splice(T.findIndex(s=>s.t==='Tren: UP')+1,0,S('Despegue','gear','OFF','Tren: OFF','Tras subir, palanca a OFF.','En el 737 la posición OFF quita la presión hidráulica del sistema del tren.'));
P.flows=[{id:'pre',name:'De cold & dark a listo para rodar',steps:P.flow,done:'¡Listo para rodar!',doneTxt:'Sigue con el flujo 2: del rodaje al apagado.'},{id:'vuelo',name:'Del rodaje al apagado (vuelo completo)',steps:T,done:'¡Vuelo completado y avión asegurado!',doneTxt:'Vuelo LEVC→LEBL completo (simplificado).'}];
P.snd=v=>[v.bat==='ON'&&'hum',v.grd==='ON'&&'gpu',...['f1a','f1f','f2a','f2f'].map(k=>v[k]==='ON'&&'pump_'+k),(v.helec1==='ON'||v.helec2==='ON')&&'pump_h',v.apu&&v.apu!=='OFF'&&'apu',v.sl1==='IDLE'&&'eng_1',v.sl2==='IDLE'&&'eng_2'];
})();
