/* ===================== Módulos de introducción: A350 y 777 ===================== */
PP.courses.push({
id:"a350",title:"Airbus A350",sub:"Introducción: qué es, cabina, sistemas clave y test",icon:"🌍",level:"intro",
modules:[
{id:"m1",title:"1. Presentación del A350",lessons:[
{id:"l1",title:"El A350 XWB",html:`${SIMNOTE}
<p>El <b>A350 XWB</b> (eXtra Wide Body) es el bimotor de largo alcance más moderno de Airbus. Voló por primera vez en <b>2013</b> y entró en servicio en <b>2015</b> con Qatar Airways.</p>
<ul><li><b>Versiones</b>: A350-900 y A350-1000 (más largo). Motores <b>Rolls-Royce Trent XWB</b> (exclusivos).</li>
<li>Más de la mitad de su estructura es de materiales compuestos.</li><li>En España lo opera, por ejemplo, Iberia (A350-900).</li></ul>
<h3>Cabina</h3><ul><li>Seis grandes pantallas, con <b>OIS</b> (sistema de información a bordo) y teclado y cursor (KCCU) para interactuar con las pantallas.</li><li>Sidestick y filosofía Airbus: si sabes A320, la lógica del FCU, ECAM, cabina oscura y modos te sirve.</li><li>Gracias a la similitud, Airbus ofrece formación cruzada (CCQ) entre A330 y A350.</li></ul>`},
{id:"l2",title:"Sistemas clave",html:`
<ul><li><b>Hidráulico</b>: dos sistemas (verde y amarillo) a <b>5.000 psi</b>, más actuadores eléctricos (EHA/EBHA) de respaldo: arquitectura "2H/2E".</li>
<li><b>Mandos fly-by-wire</b> con leyes y protecciones como el A320.</li>
<li><b>Eléctrico</b>: generadores de frecuencia variable en los motores, APU y tomas de tierra.</li>
<li><b>FMS</b>: se maneja desde las pantallas con el KCCU además de las páginas tipo MCDU.</li></ul>
${TIP("Siguiente paso","Domina primero el A320 en esta app: la mayoría de conceptos se trasladan al A350.")}`}],
quiz:[
{q:"¿Qué motores lleva el A350?",o:["Rolls-Royce Trent XWB","CFM LEAP-1A","GE90"],a:0,e:"Trent XWB, exclusivo del A350."},
{q:"¿Qué significa XWB?",o:["eXtra Wide Body","eXtended Wing Base","eXperimental Wide Beam"],a:0,e:"eXtra Wide Body, por su fuselaje ancho."},
{q:"¿Cómo se pilota el A350?",o:["Con sidestick y la filosofía Airbus","Con yoke como el 787","Con mandos convencionales de cable"],a:0,e:"Igual que el A320: sidestick y fly-by-wire con protecciones."},
{q:"¿Cuántos sistemas hidráulicos tiene el A350?",o:["Dos (verde y amarillo) más actuadores eléctricos de respaldo","Tres (verde, azul y amarillo)","Uno solo con bombas de demanda"],a:0,e:"Arquitectura 2H/2E: dos hidráulicos y respaldo eléctrico."},
{q:"¿Qué es el KCCU del A350?",o:["Teclado y cursor para interactuar con las pantallas","El ordenador de mandos de vuelo","El sistema de combustible central"],a:0,e:"Keyboard and Cursor Control Unit."}]}
]});
PP.courses.push({
id:"b777",title:"Boeing 777",sub:"Introducción: el gran bimotor de Boeing, sistemas clave y test",icon:"🌐",level:"intro",
modules:[
{id:"m1",title:"1. Presentación del 777",lessons:[
{id:"l1",title:"El Triple Siete",html:`${SIMNOTE}
<p>El <b>Boeing 777</b> es un bimotor de largo alcance. Voló por primera vez en <b>1994</b> y entró en servicio en <b>1995</b> con United Airlines. Fue el <b>primer avión de Boeing con mandos fly-by-wire</b>.</p>
<ul><li><b>Versiones</b>: 777-200, -200ER, -300, -300ER, -200LR, 777F (carguero) y la nueva familia <b>777X</b> (777-9) con alas plegables en las puntas.</li>
<li><b>Motores</b>: GE90 (el -300ER y -200LR solo GE90-115B), Pratt & Whitney PW4000 y Rolls-Royce Trent 800 en las primeras versiones; <b>GE9X</b> en el 777X.</li>
<li>Tren principal de <b>seis ruedas</b> por pata.</li></ul>
<h3>Cabina</h3><p>Muy parecida al 787 en filosofía: yoke, MCP, CDU con regla I-P-R-D-P-T, EICAS y checklist electrónica. Si dominas el 787 de esta app, el 777 te resultará familiar. En el simulador, el PMDG 777 es una referencia.</p>`},
{id:"l2",title:"Sistemas clave",html:`
<ul><li><b>Hidráulico</b>: tres sistemas: izquierdo, central y derecho (a 3.000 psi).</li>
<li><b>Neumático</b>: a diferencia del 787, el 777 <b>sí usa aire sangrado</b> de los motores y del APU (packs, arranque, antihielo).</li>
<li><b>Eléctrico</b>: un IDG por motor, generador del APU, generadores de respaldo y RAT.</li>
<li><b>Arranque</b>: selector de arranque y FUEL CONTROL a RUN, con autostart.</li>
<li><b>ETOPS</b>: el 777 fue pionero en vuelos transoceánicos largos con solo dos motores.</li></ul>`}],
quiz:[
{q:"¿Cuál fue el primer avión de Boeing con fly-by-wire?",o:["El 777","El 737 NG","El 747-400"],a:0,e:"El 777 introdujo el fly-by-wire en Boeing (manteniendo el yoke)."},
{q:"¿Qué motor lleva el 777-300ER?",o:["GE90-115B","Trent XWB","CFM56-7B"],a:0,e:"El -300ER y el -200LR montan exclusivamente el GE90-115B."},
{q:"¿El 777 usa aire sangrado (bleed) de los motores?",o:["Sí, para packs, arranque y antihielo","No, es bleedless como el 787","Solo en tierra"],a:0,e:"El diseño bleedless es una novedad del 787; el 777 es convencional en este aspecto."},
{q:"¿Cuántas ruedas tiene cada pata del tren principal del 777?",o:["Seis","Cuatro","Dos"],a:0,e:"Boggies de seis ruedas, una seña de identidad del 777."},
{q:"¿Qué novedad visible tiene el 777X en las alas?",o:["Puntas de ala plegables","Alas de geometría variable","Hélices en las puntas"],a:0,e:"Las puntas se pliegan en tierra para caber en las puertas de embarque."}]}
]});
