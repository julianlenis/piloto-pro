/* 787 v6: interruptores separados, WINDOW HEAT y PACKS, FMC más completo y flujo del rodaje al apagado */
(()=>{const P=PP.panels.b787,S=PX.S;
PX.split(P,'fl',[pb('lfwd','L FWD','OFF',PX.offw,'Bomba delantera del tanque izquierdo.'),pb('laft','L AFT','OFF',PX.offw,'Bomba trasera del tanque izquierdo.')],(st,c,k)=>({t:`${c.lb}: ON`,d:`Pulsa ${c.lb}: se apaga la luz OFF.`}));
PX.split(P,'fr',[pb('rfwd','R FWD','OFF',PX.offw,'Bomba delantera del tanque derecho.'),pb('raft','R AFT','OFF',PX.offw,'Bomba trasera del tanque derecho.')],(st,c,k)=>({t:`${c.lb}: ON`,d:`Pulsa ${c.lb}.`}));
PX.split(P,'fc',[pb('ctrl','CENTER L','OFF',{OFF:[['',''],['','']],ON:[['',''],['','d']]},'Bomba central izquierda (solo con combustible en el tanque central).'),pb('ctrr','CENTER R','OFF',{OFF:[['',''],['','']],ON:[['',''],['','d']]},'Bomba central derecha.')]);
const dm=(id,lb)=>sel(id,lb,['OFF','AUTO','ON'],'OFF','Bomba hidráulica de demanda '+lb.split(' ')[0]+': en AUTO ayuda cuando hace falta más caudal.');
PX.split(P,'dem',[dm('ldem','L DEMAND'),dm('c1dem','C1 DEMAND'),dm('c2dem','C2 DEMAND'),dm('rdem','R DEMAND')],(st,c,k)=>({t:`${c.lb}: AUTO`,d:k?`${c.lb} en AUTO.`:st.d,w:k?'':st.w}));
PX.addSec(P,{id:'air',name:'Overhead · WINDOW HEAT, AIR y ANTI-ICE',ctls:[
 pb('wh1','WINDOW HEAT L SIDE','OFF',PX.offw,'Calefacción de la ventana lateral izquierda.'),pb('wh2','L FWD','OFF',PX.offw,'Parabrisas izquierdo.'),pb('wh3','R FWD','OFF',PX.offw,'Parabrisas derecho.'),pb('wh4','R SIDE','OFF',PX.offw,'Ventana lateral derecha.'),
 pb('packl','PACK L','OFF',PX.offw,'Pack de aire acondicionado izquierdo (eléctrico en el 787).'),pb('packr','PACK R','OFF',PX.offw,'Pack derecho.'),
 sel('wai','WING ANTI-ICE',['AUTO','OFF','ON'],'AUTO','Anti-hielo de alas (eléctrico en el 787). AUTO: lo activa el detector de hielo.'),sel('eai','ENG ANTI-ICE L/R',['AUTO','OFF','ON'],'AUTO','Anti-hielo de motores.')]},'fuel');
PX.addCtl(P,'lt',[tg('strobe','STROBE',['OFF','ON'],'OFF','Estroboscópicas.'),tg('land','LANDING',['OFF','ON'],'OFF','Luces de aterrizaje.'),tg('rwyto','RWY TURNOFF',['OFF','ON'],'OFF','Luces laterales.')]);
PX.addCtl(P,'mcp',[pb('cmd','A/P','OFF',PX.bar,'Piloto automático.'),pb('app','APP','OFF',PX.bar,'Modo aproximación ILS.')]);
PX.addSec(P,{id:'thr',name:'Pedestal · empuje, tren y frenos',ctls:[sel('thr','THRUST LEVERS',['IDLE','40% N1','TO/GA'],'IDLE','Palancas de empuje (TO/GA = el autothrottle pone el empuje de despegue).'),lev('gear','GEAR',['DOWN','UP'],'DOWN','Tren de aterrizaje.'),sel('abrk','AUTOBRAKE',['OFF','RTO','1','2','3','4','MAX'],'OFF','Frenado automático.'),lev('spdbrk','SPEEDBRAKE',['DOWN','ARMED'],'DOWN','Speedbrake.'),sel('rev','REVERSE',['STOW','IDLE','MAX'],'STOW','Reversas.')]},'cdu');
PX.after(P,s=>s.c==='belts',[
 ...['wh1','wh2','wh3','wh4'].map((w,k)=>S('Sistemas',w,'ON',['WINDOW HEAT L SIDE','WINDOW HEAT L FWD','WINDOW HEAT R FWD','WINDOW HEAT R SIDE'][k]+': ON',k?'Siguiente ventana.':'Pulsa los cuatro WINDOW HEAT: se apagan las luces OFF.',k?'':'Calientan los cristales para que no se empañen ni se congelen y para hacerlos más resistentes a impactos de aves.')),
 S('Sistemas','packl','ON','PACK L: ON','Pack izquierdo encendido.','En el 787 los packs son eléctricos: con los generadores del APU ya enfrían la cabina. No hace falta “APU bleed”.'),
 S('Sistemas','packr','ON','PACK R: ON','Pack derecho encendido.',''),
 S('Sistemas',null,null,'Comprobar anti-hielo en AUTO','WING y ENG ANTI-ICE en AUTO.','El detector de hielo los activa solos; con engelamiento en tierra (≤ 10 °C y humedad visible) se ponen en ON a mano.')]);
// FMC: THRUST LIM y TAKEOFF REF campo a campo
const i=P.flow.findIndex(s=>s.t==='THRUST LIM → TAKEOFF REF');
P.flow[i]=Object.assign({},P.flow[i],{t:'TAKEOFF REF: flaps',d:'En THRUST LIM pulsa R6 (TAKEOFF>). Empieza por los flaps: escribe 5.'});
P.flow.splice(i,0,
 S('FMC · THRUST LIM','kR6',null,'THRUST LIM','En PERF INIT pulsa R6 (THRUST LIM>).','Aquí se elige el empuje de despegue.',{scr:cdu('THRUST LIM',[[[' SEL','OAT    TO 1 N1 '],['{o}--{/}','{w}+15°C    98.0{/}']],[['',''],['{w}<TO   <SEL>{/}','{w}CLB>{/}']],[['',''],['{w}<TO 1{/}','{w}CLB 1>{/}']],[['',''],['{w}<TO 2{/}','{w}CLB 2>{/}']],[['',''],['','']],[['',''],['{w}<INDEX{/}','{w}TAKEOFF>{/}']]],'40')}),
 S('FMC · THRUST LIM','kL1',null,'SEL: temperatura supuesta 40 °C','Escribe 40 y pulsa L1 (ejemplo).','La temperatura supuesta reduce el empuje como si hiciera más calor. Ahorra motor.'),
 S('FMC · THRUST LIM','kL3',null,'TO 1 (derate)','Pulsa L3 (TO 1, ejemplo). Se puede combinar con la temperatura supuesta.','Un derate es una reducción fija del empuje máximo.'));
const j=P.flow.findIndex(s=>s.t==='Flaps 5 y CG → aceptar V-speeds');
P.flow[j]=Object.assign({},P.flow[j],{t:'CG 24 %',d:'Pulsa L1 para flaps 5 y escribe el CG (L3, ejemplo 24 %). El FMC propone V1/VR/V2 en pequeño.'});
P.flow.splice(j+1,0,
 S('FMC · TAKEOFF','kR1',null,'Aceptar V1','Pulsa R1: V1 pasa a letra grande.','V1 es la velocidad de decisión.'),
 S('FMC · TAKEOFF','kR2',null,'Aceptar VR','Pulsa R2.','VR: rotación.'),
 S('FMC · TAKEOFF','kR3',null,'Aceptar V2','Pulsa R3.','V2: velocidad segura con un motor parado.'));
const T=PX.boeingFlow({id:'b787',abrk:'abrk',strobe:['strobe','ON','OFF'],land:'land',rwyto:'rwyto',taxi:'taxi',thr:'thr',gear:'gear',ap:'cmd',app:'app',spd:'spdbrk',rev:'rev',apAlt:'200',flapsTO:'5',flapsRet:['1','UP'],appSeq:['1','5','GEAR','20','30'],vref:'140',gw:'186.0',
 cut:['fcl','fcr'],beacon:'beacon',pumps:['lfwd','laft','rfwd','raft'],apuGen:[],
 shut:[S('Asegurar el avión','packl','OFF','PACKS: OFF','','',{fx:[['packr','OFF']]}),S('Asegurar el avión','wh1','OFF','WINDOW HEAT: OFF','','',{fx:[['wh2','OFF'],['wh3','OFF'],['wh4','OFF']]}),S('Asegurar el avión','c1','OFF','Bombas hidráulicas eléctricas: OFF','','',{fx:[['c2','OFF'],['ldem','OFF'],['c1dem','OFF'],['c2dem','OFF'],['rdem','OFF']]})],
 ext:['extl','AVAIL'],irs:['irsl','irsr'],nav:['nav','OFF'],bat:'bat'});
T.splice(T.findIndex(s=>s.c==='apu'&&s.to==='START')+1,0,S('Después del aterrizaje','apugl','ON','APU GEN L/R: comprobar ON','Comprueba los generadores del APU.','',{}));
P.flows=[{id:'pre',name:'De cold & dark a listo para rodar',steps:P.flow,done:'¡Listo para rodar!',doneTxt:'Sigue con el flujo 2: del rodaje al apagado.'},{id:'vuelo',name:'Del rodaje al apagado (vuelo completo)',steps:T,done:'¡Vuelo completado y avión asegurado!',doneTxt:'Vuelo LEVC→LEBL completo (simplificado).'}];
P.snd=v=>[v.bat==='ON'&&'hum',(v.extl==='ON'||v.extr==='ON')&&'gpu',...['lfwd','laft','rfwd','raft'].map(k=>v[k]==='ON'&&'pump_'+k),v.c1==='ON'&&'pump_c1',v.c2==='ON'&&'pump_c2',v.apu&&v.apu!=='OFF'&&'apu',v.fcl==='RUN'&&'eng_l',v.fcr==='RUN'&&'eng_r'];
})();
