/* Ilustraciones propias (SVG) de pantallas y paneles — Piloto Pro by Julián Lenis. Esquemas simplificados con números y leyenda (no son capturas reales). */
FG.t=(x,y,t,c='#fff',fs=10,a='start',ex='')=>`<text x="${x}" y="${y}" fill="${c}" font-size="${fs}" text-anchor="${a}" ${ex}>${t}</text>`;
FG.r=(x,y,w,h,f,rx=0,st='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${st?`stroke="${st}"`:''}/>`;
FG.nl=a=>a.map(([x,y,n,lx,ly])=>(lx!=null?FG.L(x,y,lx,ly):'')+FG.N(x,y,n)).join('');
FG.btn=(x,y,w,h,t,fs=7,col='#fff',bg='#374151')=>FG.r(x-w/2,y-h/2,w,h,bg,3,'#111')+FG.t(x,y+fs/3,t,col,fs,'middle');
FG.knob=(x,y,r=13)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#1f2937" stroke="#9ca3af" stroke-width="2"/><circle cx="${x}" cy="${y}" r="${r*.55}" fill="#374151"/><line x1="${x}" y1="${y-r+2}" x2="${x}" y2="${y-r*.5}" stroke="#fff" stroke-width="2"/>`;

/* ---------- PFD (Airbus / Boeing) ---------- */
FG.pfd=isA=>{const id=isA?'pa':'pb',cy=150,cx=180,S=v=>cy-(v-140)*2.5,AL=v=>cy-(v-2500)*0.125;
 const mag='#e879f9',sel=isA?'#22d3ee':mag;let s=`<svg viewBox="0 0 400 300" font-family="Arial" font-size="10"><rect width="400" height="300" rx="10" fill="#000"/>`;
 // FMA
 if(isA){s+=FG.r(16,4,368,34,'#000',0,'#444');[88,160,232,304].forEach(x=>s+=`<line x1="${x}" y1="6" x2="${x}" y2="36" stroke="#9ca3af"/>`);
  s+=FG.t(52,18,'SPEED','#22c55e',10,'middle')+FG.t(124,18,'G/S','#22c55e',10,'middle')+FG.t(196,18,'LOC','#22c55e',10,'middle')+FG.t(268,18,'CAT 3','#fff',9,'middle')+FG.t(268,31,'DUAL','#fff',9,'middle')+FG.t(344,14,'AP1','#fff',9,'middle')+FG.t(344,24,'1 FD 2','#fff',9,'middle')+FG.t(344,34,'A/THR','#fff',9,'middle');}
 else{s+=FG.r(95,4,170,22,'#111',0,'#444')+FG.t(123,19,'SPD','#22c55e',10,'middle')+FG.t(180,19,'LOC','#22c55e',10,'middle')+FG.t(237,19,'G/S','#22c55e',10,'middle')+[152,208].map(x=>`<line x1="${x}" y1="6" x2="${x}" y2="24" stroke="#9ca3af"/>`).join('')+FG.t(180,38,'A/P','#22c55e',10,'middle');}
 // actitud
 s+=`<defs><clipPath id="c${id}"><rect x="85" y="50" width="190" height="196" rx="${isA?4:22}"/></clipPath></defs><g clip-path="url(#c${id})"><g transform="rotate(-6 ${cx} ${cy}) translate(0 12)"><rect x="-40" y="-150" width="440" height="300" fill="#2f7fd9"/><rect x="-40" y="${cy}" width="440" height="300" fill="#8a5a2b"/><line x1="-40" y1="${cy}" x2="440" y2="${cy}" stroke="#fff" stroke-width="2"/>`;
 [-10,-5,5,10,15].forEach(p=>{const y=cy-p*4,w=p%10?20:40;s+=`<line x1="${cx-w/2}" y1="${y}" x2="${cx+w/2}" y2="${y}" stroke="#fff"/>`+(p%10?'':FG.t(cx+w/2+3,y+3,Math.abs(p),'#fff',8));});s+=`</g></g>`;
 s+=FG.arc(cx,cy,92,-45,45,'#fff',1.5)+[-45,-30,-20,-10,0,10,20,30,45].map(a=>FG.tick(cx,cy,92,a%30?86:82,a)).join('')+`<polygon points="${cx},${cy-90} ${cx-5},${cy-82} ${cx+5},${cy-82}" fill="#facc15" transform="rotate(-6 ${cx} ${cy})"/>`;
 // directores de vuelo
 const fd=isA?'#22c55e':mag;s+=`<line x1="${cx-40}" y1="${cy-4}" x2="${cx+40}" y2="${cy-4}" stroke="${fd}" stroke-width="2.5"/><line x1="${cx+3}" y1="${cy-40}" x2="${cx+3}" y2="${cy+40}" stroke="${fd}" stroke-width="2.5"/>`;
 // símbolo avión
 s+=isA?`<path d="M${cx-60} ${cy} h30 v8" stroke="#000" stroke-width="6" fill="none"/><path d="M${cx-60} ${cy} h30 v8" stroke="#facc15" stroke-width="3" fill="none"/><path d="M${cx+60} ${cy} h-30 v8" stroke="#000" stroke-width="6" fill="none"/><path d="M${cx+60} ${cy} h-30 v8" stroke="#facc15" stroke-width="3" fill="none"/><rect x="${cx-4}" y="${cy-4}" width="8" height="8" fill="#000" stroke="#facc15" stroke-width="2"/>`
  :`<path d="M${cx-62} ${cy-3} h28 v14 h-6 v-8 h-22 z" fill="#000" stroke="#fff" stroke-width="1.5"/><path d="M${cx+62} ${cy-3} h-28 v14 h6 v-8 h22 z" fill="#000" stroke="#fff" stroke-width="1.5"/><rect x="${cx-4}" y="${cy-4}" width="8" height="8" fill="#000" stroke="#fff" stroke-width="1.5"/>`;
 // ILS: escala LOC (abajo) y G/S (derecha)
 [-40,-20,20,40].forEach(d=>s+=`<circle cx="${cx+d}" cy="236" r="2.5" fill="none" stroke="#fff"/><circle cx="268" cy="${cy+d}" r="2.5" fill="none" stroke="#fff"/>`);
 s+=`<polygon points="${cx+10},229 ${cx+16},236 ${cx+10},243 ${cx+4},236" fill="${mag}"/><polygon points="268,${cy-14} 274,${cy-8} 268,${cy-2} 262,${cy-8}" fill="${mag}"/>`;
 // cinta velocidad
 s+=FG.r(20,50,52,196,'#3f3f46');for(let v=100;v<=180;v+=5){const y=S(v);if(y<50||y>246)continue;s+=`<line x1="${v%10?64:60}" y1="${y}" x2="72" y2="${y}" stroke="#fff"/>`+(v%20===0?FG.t(56,y+3,v,'#fff',10,'end'):'');}
 s+=`<rect x="66" y="50" width="6" height="${S(177)-50}" fill="url(#bp${id})"/><defs><pattern id="bp${id}" width="6" height="8" patternUnits="userSpaceOnUse"><rect width="6" height="4" fill="#ef4444"/><rect y="4" width="6" height="4" fill="#000"/></pattern></defs>`;
 s+=FG.r(68,S(130),4,S(118)-S(130),'#f59e0b');
 s+=isA?`<line x1="20" y1="${cy}" x2="78" y2="${cy}" stroke="#facc15" stroke-width="2.5"/><polygon points="78,${cy} 86,${cy-5} 86,${cy+5}" fill="#facc15"/><line x1="76" y1="${cy}" x2="76" y2="${cy-18}" stroke="#facc15" stroke-width="2"/><polygon points="76,${cy-22} 72,${cy-15} 80,${cy-15}" fill="#facc15"/>`
  :`<path d="M18 ${cy-10} h40 l8 10 l-8 10 h-40 z" fill="#000" stroke="#fff"/>${FG.t(50,cy+5,'140','#fff',13,'end')}<line x1="74" y1="${cy}" x2="74" y2="${cy-18}" stroke="#22c55e" stroke-width="2"/>`;
 s+=`<polygon points="72,${S(137)} 80,${S(137)-5} 80,${S(137)+5}" fill="${mag}"/>`+FG.t(46,262,isA?'':'137','#e879f9',11,'middle');
 // cinta altitud
 s+=FG.r(290,50,48,196,'#3f3f46');for(let a=1700;a<=3300;a+=100){const y=AL(a);if(y<50||y>246)continue;s+=`<line x1="290" y1="${y}" x2="${a%500?296:300}" y2="${y}" stroke="#fff"/>`+(a%500===0?FG.t(304,y+3,isA?a/100:a,'#fff',isA?11:9):'');}
 s+=isA?`<rect x="294" y="${cy-11}" width="42" height="22" fill="#000" stroke="#facc15" stroke-width="2"/>${FG.t(331,cy+5,'2500','#22c55e',13,'end')}`:`<path d="M286 ${cy} l8 -10 h46 v20 h-46 z" fill="#000" stroke="#fff"/>${FG.t(336,cy+5,'2500','#fff',12,'end')}`;
 s+=FG.t(314,46,'5000',sel,11,'middle')+FG.t(314,262,isA?'QNH':'1013 HPA',isA?'#22d3ee':'#22c55e',10,'middle')+(isA?FG.t(314,274,'1013','#22d3ee',10,'middle'):'');
 // velocidad vertical
 s+=`<path d="M344 60 h14 l18 50 v80 l-18 50 h-14 z" fill="#3f3f46"/>`+[[1,-30],[2,-50],[6,-80],[1,30],[2,50],[6,80]].map(([n,d])=>`<line x1="344" y1="${cy+d}" x2="350" y2="${cy+d}" stroke="#fff"/>`+FG.t(352,cy+d+3,n,'#fff',8)).join('')+`<line x1="396" y1="${cy}" x2="350" y2="${cy+21}" stroke="${isA?'#22c55e':'#fff'}" stroke-width="2.5"/>`+FG.t(372,cy+42,isA?'7':'-700',isA?'#22c55e':'#fff',10,'middle');
 // rumbo
 if(isA){s+=FG.r(95,252,170,26,'#3f3f46');for(let h=300;h<=340;h+=5){const x=cx+(h-320)*4;s+=`<line x1="${x}" y1="252" x2="${x}" y2="${h%10?256:259}" stroke="#fff"/>`+(h%10===0?FG.t(x,272,h/10,'#fff',10,'middle'):'');}s+=`<line x1="${cx}" y1="244" x2="${cx}" y2="262" stroke="#facc15" stroke-width="2.5"/><polygon points="${cx+12},252 ${cx+16},258 ${cx+8},258" fill="${mag}"/>`;}
 else{s+=`<path d="M85 300 A140 140 0 0 1 275 300" fill="#3f3f46"/>`;for(let h=290;h<=350;h+=5){const a=(h-320)*1.5;s+=FG.tick(cx,370,118,h%10?112:108,a)+(h%10===0?FG.txt(cx,370,100,a,h/10,9):'');}s+=`<polygon points="${cx},250 ${cx-5},242 ${cx+5},242" fill="#fff"/>${FG.r(cx-20,282,40,16,'#000',0,'#fff')}${FG.t(cx,294,'320 H','#fff',9,'middle')}`;}
 s+=FG.nl([[isA?8:84,isA?21:15,1,null],[12,cy-40,2,20,cy-30],[cx-20,cy-60,3,null],[388,95,5,370,110],[346,40,4,334,50],[isA?cx-40:60,286,6,isA?null:100,isA?null:284],[cx+40,226,7,cx+16,234],[isA?370:368,isA?270:262,8,isA?336:350,isA?268:262]]);
 return s+'</svg>';};

FG.f.pfdA=FG.fig('PFD de Airbus (pantalla principal de vuelo)',FG.pfd(true),
 ['<b>FMA</b>: 5 columnas con los modos activos (verde) y armados (azul): empuje · vertical · lateral · categoría de aproximación · AP/FD/A-THR.','<b>Cinta de velocidad</b>: la línea amarilla es tu velocidad; el triángulo magenta, la velocidad objetivo; la flecha amarilla, hacia dónde va (tendencia). Rojo/negro arriba = máximo; ámbar abajo = mínimo.','<b>Horizonte artificial</b> (actitud): cielo azul, tierra marrón. El avión amarillo eres tú; las barras verdes son el director de vuelo (síguelas).','<b>Cinta de altitud</b> en ventana amarilla. Arriba, en azul, la altitud seleccionada en el FCU.','<b>Velocidad vertical</b>: la aguja verde y la cifra en cientos de pies/min (7 = 700 ft/min bajando).','<b>Rumbo</b>: línea amarilla = rumbo actual; marca magenta = rumbo del ILS.','<b>ILS</b>: rombos magenta. Abajo = localizador (izquierda/derecha), derecha = senda (arriba/abajo). Centrados = perfecto.','<b>Ajuste del altímetro</b>: QNH 1013 (o STD por encima de la altitud de transición).'],
 'Ejemplo de aproximación ILS a 2.500 ft y 140 kt. Esquema simplificado, no una captura real.');
FG.f.pfdB=FG.fig('PFD de Boeing (pantalla principal de vuelo)',FG.pfd(false),
 ['<b>FMA</b>: 3 cajas (empuje · lateral · vertical) y debajo el estado del piloto automático (A/P; en el 737 aparece CMD).','<b>Cinta de velocidad</b>: la caja blanca es tu velocidad; el marcador magenta, la velocidad seleccionada (abajo, en número); la línea verde, la tendencia.','<b>Horizonte artificial</b>: el avión en blanco y negro eres tú; las barras magenta son el director de vuelo.','<b>Cinta de altitud</b>: caja blanca. Arriba, en magenta, la altitud seleccionada en el MCP.','<b>Velocidad vertical</b>: aguja blanca y cifra en ft/min.','<b>Rumbo</b>: arco de brújula con el rumbo actual (320).','<b>ILS</b>: rombos magenta del localizador y de la senda de planeo.','<b>Ajuste del altímetro</b>: 1013 HPA (o STD en crucero).'],
 'En Boeing el color clave es el <b>magenta</b>: todo lo que has seleccionado o lo que el avión te pide seguir. Esquema simplificado.');

/* ---------- ND ---------- */
FG.nd=isA=>{const ax=145,ay=268,R=200,rc=isA?'#22c55e':'#e879f9',H=320;let s=`<svg viewBox="0 0 400 300" font-family="Arial" font-size="10"><rect width="400" height="300" rx="10" fill="#000"/>`;
 s+=FG.arc(ax,ay,R,-42,42,'#fff',1.5);for(let a=-40;a<=40;a+=5){s+=FG.tick(ax,ay,R,R-(a%10?6:11),a);if(a%10===0)s+=FG.txt(ax,ay,R-20,a,((H+a+359)%360+1)/10,10);}
 s+=`<path d="M${ax-100*Math.sin(.7)} ${ay-100*Math.cos(.7)} A100 100 0 0 1 ${ax+100*Math.sin(.7)} ${ay-100*Math.cos(.7)}" fill="none" stroke="#fff" stroke-dasharray="3 4"/>`+FG.t(ax-72,ay-74,'20','#22d3ee',9);
 s+=`<line x1="${ax}" y1="${ay-R-4}" x2="${ax}" y2="${ay-R+14}" stroke="${isA?'#facc15':'#fff'}" stroke-width="3"/>`;
 // ruta
 const W=[[ax,ay],[170,170],[215,95],[205,30]];s+=`<polyline points="${W.map(p=>p.join(',')).join(' ')}" fill="none" stroke="${rc}" stroke-width="2.5"/>`;
 [[170,170,'ALFA',true],[215,95,'BRAVO'],[205,30,'CHARLI']].forEach(([x,y,n,act])=>{s+=isA?`<polygon points="${x},${y-6} ${x+6},${y} ${x},${y+6} ${x-6},${y}" fill="none" stroke="${act?'#fff':'#22c55e'}" stroke-width="2"/>`:`<path d="M${x} ${y-7} L${x+2} ${y-2} L${x+7} ${y} L${x+2} ${y+2} L${x} ${y+7} L${x-2} ${y+2} L${x-7} ${y} L${x-2} ${y-2}Z" fill="${act?'#e879f9':'none'}" stroke="${act?'#e879f9':'#fff'}"/>`;s+=FG.t(x+10,y+4,n,act&&!isA?'#e879f9':'#fff',10);});
 // T/D
 s+=isA?`<path d="M186 136 l10 0 l6 6" stroke="#fff" fill="none" stroke-width="2"/>${FG.t(160,134,'T/D','#fff',9)}`:`<circle cx="193" cy="132" r="5" fill="none" stroke="#22c55e" stroke-width="2"/>${FG.t(164,130,'T/D','#22c55e',9)}`;
 // avión
 s+=isA?`<path d="M${ax} ${ay-14} v26 M${ax-14} ${ay-4} h28 M${ax-6} ${ay+10} h12" stroke="#facc15" stroke-width="3"/>`:`<polygon points="${ax},${ay-14} ${ax-8},${ay+6} ${ax+8},${ay+6}" fill="none" stroke="#fff" stroke-width="2"/>`;
 // info arriba
 s+=FG.t(8,18,'GS','#fff',10)+FG.t(26,18,'420','#22c55e',11)+FG.t(54,18,'TAS','#fff',10)+FG.t(76,18,'435','#22c55e',11)+FG.t(8,34,'240/12',isA?'#22c55e':'#fff',11)+`<g transform="rotate(100 26 52)"><line x1="26" y1="62" x2="26" y2="42" stroke="${isA?'#22c55e':'#fff'}" stroke-width="2"/><polygon points="26,40 22,48 30,48" fill="${isA?'#22c55e':'#fff'}"/></g>`;
 s+=isA?FG.t(282,18,'ALFA','#fff',11,'end')+FG.t(282,32,'322°','#22c55e',10,'end')+FG.t(282,46,'12 NM','#22c55e',10,'end')+FG.t(282,60,'10:42','#22c55e',10,'end'):FG.t(282,18,'ALFA','#e879f9',11,'end')+FG.t(282,32,'1042.4z','#fff',10,'end')+FG.t(282,46,'12.0 NM','#fff',10,'end');
 s+=FG.t(8,292,'ARC · 40 NM',isA?'#fff':'#22c55e',10);
 // recuadros ROSE y PLAN
 s+=FG.r(292,6,104,128,'#0b1220',6,'#334155')+`<circle cx="344" cy="64" r="40" fill="none" stroke="#fff"/>`;for(let a=0;a<360;a+=30)s+=FG.tick(344,64,40,34,a);s+=FG.txt(344,64,28,0,'32',8)+`<path d="M344 56 v14 M338 61 h12" stroke="${isA?'#facc15':'#fff'}" stroke-width="2"/><line x1="344" y1="64" x2="352" y2="34" stroke="${rc}" stroke-width="2"/>`+FG.t(344,124,'ROSE','#fff',10,'middle');
 s+=FG.r(292,142,104,150,'#0b1220',6,'#334155')+`<circle cx="344" cy="212" r="40" fill="none" stroke="#fff" stroke-dasharray="3 3"/>`+FG.t(344,168,'N','#fff',10,'middle')+`<polyline points="318,240 334,218 352,200 370,188" fill="none" stroke="${rc}" stroke-width="2"/>`+[[334,218],[352,200]].map(([x,y])=>`<polygon points="${x},${y-4} ${x+4},${y} ${x},${y+4} ${x-4},${y}" fill="none" stroke="#fff"/>`).join('')+FG.t(344,282,'PLAN','#fff',10,'middle');
 s+=FG.nl([[ax-40,60,1,null],[ax-36,ay-6,2,ax-16,ay-4],[176,212,3,158,214],[256,74,4,null],[44,62,5,30,54],[110,18,6,null],[ax-92,ay-60,7,ax-74,ay-74],[212,156,8,196,140],[382,22,9,null],[382,158,10,null]]);
 return s+'</svg>';};
FG.f.ndA=FG.fig('ND: pantalla de navegación (Airbus)',FG.nd(true),
 ['<b>Escala de rumbo/derrota</b> (modo ARC): solo ves la parte de delante.','<b>Tu avión</b> (símbolo amarillo).','<b>La ruta</b> del FMS en verde; el punto activo, en blanco.','<b>Próximo punto</b>: nombre, rumbo, distancia y hora estimada.','<b>Viento</b>: 240/12 = viene del 240° a 12 kt; la flecha indica hacia dónde sopla.','<b>GS</b> (velocidad sobre el suelo) y <b>TAS</b> (velocidad verdadera).','<b>Anillo de distancia</b>: con escala 40 NM, la mitad son 20 NM.','<b>T/D</b>: punto de inicio del descenso calculado por el FMS.','<b>Modo ROSE</b>: brújula completa, el avión en el centro.','<b>Modo PLAN</b>: norte arriba, para revisar la ruta (con el MCDU).'],
 'Modo y escala se eligen en el panel EFIS del glareshield. Datos de ejemplo.');
FG.f.ndB=FG.fig('ND: pantalla de navegación (Boeing)',FG.nd(false),
 ['<b>Escala de rumbo</b> (modo MAP, vista en arco).','<b>Tu avión</b> (triángulo blanco).','<b>La ruta</b> activa en magenta.','<b>Próximo punto</b> (magenta), hora estimada y distancia.','<b>Viento</b>: dirección/velocidad y flecha.','<b>GS</b> y <b>TAS</b>.','<b>Anillo de distancia</b> (mitad de la escala elegida).','<b>T/D</b> (círculo verde): inicio del descenso.','<b>Modo APP/VOR “rosa”</b>: brújula completa.','<b>Modo PLAN</b>: norte arriba, para revisar la ruta con el CDU.'],
 'Modo y escala se eligen en el panel EFIS. Datos de ejemplo.');

/* ---------- Pantallas de motores ---------- */
FG.eng=(cx,cy,r,f,txt,col,big=1)=>{const a=-130+f*200;return FG.arc(cx,cy,r,-130,50,'#fff',2)+FG.arc(cx,cy,r,50,70,'#ef4444',3)+`<path d="M${cx} ${cy} L${FG.P(cx,cy,r,-130).join(' ')} A${r} ${r} 0 ${f*200>180?1:0} 1 ${FG.P(cx,cy,r,a).join(' ')} Z" fill="#374151" opacity=".6"/>`+`<line x1="${cx}" y1="${cy}" x2="${FG.P(cx,cy,r,a)[0]}" y2="${FG.P(cx,cy,r,a)[1]}" stroke="${col}" stroke-width="2.5"/>`+FG.r(cx+2,cy+2,big?40:32,16,'#000',2,'#9ca3af')+FG.t(cx+(big?39:31),cy+14,txt,col,big?12:10,'end');};
FG.f.ewd=FG.fig('ECAM superior (E/WD) de Airbus: motores y avisos',`<svg viewBox="0 0 400 260" font-family="Arial" font-size="10"><rect width="400" height="260" rx="10" fill="#000"/>
${FG.eng(70,70,40,.78,'84.2','#22c55e')}${FG.eng(195,70,40,.78,'84.1','#22c55e')}${FG.t(132,66,'N1','#fff',10,'middle')}${FG.t(132,78,'%','#22d3ee',9,'middle')}
${FG.eng(70,140,26,.6,'585','#22c55e',0)}${FG.eng(195,140,26,.6,'590','#22c55e',0)}${FG.t(132,142,'EGT','#fff',10,'middle')}${FG.t(132,154,'°C','#22d3ee',9,'middle')}
${FG.t(80,186,'92.1','#22c55e',12,'middle')}${FG.t(205,186,'92.0','#22c55e',12,'middle')}${FG.t(142,186,'N2 %','#fff',9,'middle')}
${FG.t(80,202,'1240','#22c55e',12,'middle')}${FG.t(205,202,'1250','#22c55e',12,'middle')}${FG.t(142,202,'FF KG/H','#fff',9,'middle')}
${FG.t(300,24,'CLB','#22d3ee',12)}${FG.t(340,24,'89.0%','#22c55e',12)}${FG.t(262,60,'FOB :','#fff',10)}${FG.t(300,60,'9800','#22c55e',13)}${FG.t(338,60,'KG','#22d3ee',9)}
${FG.t(270,100,'S','#fff',10)}${FG.t(374,100,'F','#fff',10)}<path d="M282 96 l20 8 M328 104 l30 10" stroke="#22c55e" stroke-width="4"/><path d="M300 92 h30" stroke="#fff" stroke-width="3"/>${FG.t(320,126,'1+F','#22d3ee',11,'middle')}
<line x1="10" y1="212" x2="390" y2="212" stroke="#fff"/><line x1="230" y1="216" x2="230" y2="256" stroke="#fff"/>${FG.t(16,230,'SEAT BELTS','#22c55e',10)}${FG.t(16,246,'LDG LT','#22c55e',10)}${FG.t(240,230,'(aquí salen avisos ámbar/rojo)','#94a3b8',9)}
${FG.nl([[30,40,1,44,52],[24,128,2,44,136],[14,186,3,60,183],[14,202,4,null],[248,56,5,null],[392,100,6,380,98],[110,238,7,80,240],[392,24,8,388,30]])}</svg>`,
 ['<b>N1</b>: empuje de cada motor (%).','<b>EGT</b>: temperatura de los gases de escape.','<b>N2</b>: velocidad de la turbina de alta.','<b>FF</b>: consumo de combustible.','<b>FOB</b>: combustible total a bordo.','<b>Slats y flaps</b> (S/F) y su posición.','<b>Memos y avisos</b>: verde = recordatorio; ámbar = precaución; rojo = alarma.','<b>Límite de empuje</b> activo (CLB, FLX, TOGA…).'],
 'Debajo está el SD (ECAM inferior), que muestra páginas de sistemas: combustible, eléctrico, hidráulico, puertas… Cifras de ejemplo.');
FG.f.eicas=FG.fig('EICAS de Boeing: motores y alertas',`<svg viewBox="0 0 400 260" font-family="Arial" font-size="10"><rect width="400" height="260" rx="10" fill="#000"/>
${FG.t(10,18,'TO','#22c55e',12)}${FG.t(36,18,'97.6','#22c55e',12)}${FG.t(10,34,'TAT +12c','#fff',10)}
${FG.eng(70,80,38,.86,'96.8','#fff')}${FG.eng(170,80,38,.86,'96.9','#fff')}${FG.t(120,132,'N1','#fff',10,'middle')}
${FG.eng(70,165,26,.66,'780','#fff',0)}${FG.eng(170,165,26,.66,'785','#fff',0)}${FG.t(120,212,'EGT','#fff',10,'middle')}
${FG.r(236,8,156,96,'#000',4,'#475569')}${FG.t(314,50,'zona de mensajes','#94a3b8',9,'middle')}${FG.t(314,64,'(vacía = todo normal)','#94a3b8',9,'middle')}
${FG.t(250,130,'GEAR','#fff',10)}${['L','C','R'].map((g,i)=>FG.r(248+i*44,136,40,18,'#000',2,'#22c55e')+FG.t(268+i*44,149,'DOWN','#22c55e',9,'middle')).join('')}
${FG.t(250,184,'FLAPS','#fff',10)}${FG.r(300,170,10,50,'#000',0,'#fff')}${FG.r(300,170,10,14,'#22c55e')}${FG.t(316,184,'5','#22c55e',12)}
${FG.t(10,250,'TOTAL FUEL','#fff',9)}${FG.t(72,250,'18.5','#fff',12)}${FG.t(102,250,'KG x1000','#22d3ee',8)}
${FG.nl([[90,14,1,62,16],[22,58,2,36,66],[22,172,3,44,170],[386,28,4,null],[386,145,5,382,145],[352,200,6,312,200],[164,246,7,148,246]])}</svg>`,
 ['<b>Modo y límite de empuje</b> (TO, CLB, CON…) y temperatura exterior (TAT).','<b>N1</b>: empuje de cada motor.','<b>EGT</b>: temperatura de los gases.','<b>Mensajes</b>: WARNING rojo, CAUTION ámbar, ADVISORY ámbar sangrado, MEMO blanco.','<b>Tren</b>: tres “DOWN” verdes = abajo y blocado.','<b>Flaps</b>: posición (verde = ya en su sitio).','<b>Combustible total</b>.'],
 'La disposición cambia entre 737, 777 y 787 (el 737 NG lleva el tren con luces aparte). Cifras de ejemplo en un despegue.');

/* ---------- MCDU / CDU ---------- */
FG.cdu=isA=>{let s=`<svg viewBox="0 0 400 340" font-family="Arial" font-size="10"><rect width="400" height="340" rx="10" fill="#1e293b"/>${FG.r(30,6,340,330,'#4b5563',12)}${FG.r(72,16,256,164,'#000',3)}`;
 const rows=isA?[['FROM','LEMD14R','','','#fff'],['','ALFA','10:42','250/FL120','#fff'],['','BRAVO','10:51','.78/FL350','#22c55e'],['','CHARLI','11:20','.78/FL350','#22c55e'],['','(T/D)','11:31','.78/FL350','#22c55e'],['DEST','LEBL24R','11:58','','#fff']]
  :[['320°','ALFA','','250/12000','#e879f9'],['12 NM','BRAVO','','.780/FL350','#fff'],['45 NM','CHARLI','','.780/FL350','#fff'],['60 NM','DELTA','','.780/FL350','#fff'],['','RTE 1 LEGS','','',''],['','&lt;RTE 2 LEGS','','RTE DATA&gt;','#fff']];
 s+=FG.t(200,32,isA?'FROM        LEMD-LEBL':'ACT RTE 1 LEGS','#fff',11,'middle');
 rows.forEach(([l,a,b,c,col],k)=>{const y=58+21*k;if(l)s+=FG.t(80,y-10,l,'#fff',7);if(k==4&&!isA)return;s+=FG.t(80,y,a,col,11)+FG.t(220,y,b,col,10,'middle')+FG.t(320,y,c,isA?'#22d3ee':col,10,'end');});
 s+=FG.t(80,174,isA?'':'','#fff',10)+FG.r(76,164,248,13,'#111')+FG.t(80,174,isA?'LEBL/   ← bloc de notas':'BRAVO   ← scratchpad','#94a3b8',9);
 for(let k=0;k<6;k++){s+=FG.r(42,48+21*k,22,12,'#d1d5db',2)+FG.r(336,48+21*k,22,12,'#d1d5db',2);}
 const fk=isA?[['DIR','PROG','PERF','INIT','DATA',''],['F-PLN','RAD NAV','FUEL PRED','SEC F-PLN','ATC COMM','MENU'],['AIRPORT','','','','','']]:[['INIT REF','RTE','DEP ARR','ALTN','VNAV',''],['FIX','LEGS','HOLD','FMC COMM','PROG','EXEC'],['MENU','NAV RAD','PREV PAGE','NEXT PAGE','','']];
 fk.forEach((r,i)=>r.forEach((t,j)=>{if(!t)return;const x=70+j*52,y=196+i*22;s+=t==='EXEC'?FG.r(x-22,y-8,44,16,'#e5e7eb',2)+FG.r(x-14,y-11,28,3,'#facc15')+FG.t(x,y+3,t,'#000',7,'middle'):FG.btn(x,y,46,16,t,6.5,'#fff','#111827');}));
 for(let i=0;i<3;i++)for(let j=0;j<3;j++)s+=FG.btn(68+j*24,272+i*20,20,16,i*3+j+1,8,'#fff','#111827');
 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((c,i)=>{s+=FG.btn(160+(i%7)*26,262+Math.floor(i/7)*18,22,15,c,8,'#fff','#111827');});
 s+=FG.nl([[200,13,1,null],[22,90,2,42,90],[60,186,3,78,172],[372,212,4,356,212],[372,298,5,344,298],isA?[20,196,6,46,196]:[328,234,6,326,222]]);
 return s+'</svg>';};
FG.f.mcdu=FG.fig('MCDU de Airbus (página F-PLN)',FG.cdu(true),['<b>Pantalla</b>: título de la página (aquí el plan de vuelo).','<b>Teclas laterales (LSK)</b>: 6 a cada lado, junto a cada línea. Pulsas la de la línea que quieres cambiar.','<b>Bloc de notas</b> (scratchpad): lo que tecleas aparece aquí y luego lo “subes” con una LSK.','<b>Teclas de página</b>: DIR, PROG, PERF, INIT, F-PLN, RAD NAV, FUEL PRED…','<b>Teclado</b> numérico y de letras.','<b>DIR</b>: ir directo a un punto.'],'Colores: verde = datos del FMS, azul = modificable, blanco = puntos destacados, amarillo = cambio temporal (TMPY). Ruta y horas de ejemplo.');
FG.f.cdu=FG.fig('CDU de Boeing (página LEGS)',FG.cdu(false),['<b>Pantalla</b>: título (ACT = activo).','<b>Teclas laterales (LSK)</b>: 6 a cada lado.','<b>Scratchpad</b>: escribes aquí y lo subes con una LSK.','<b>Teclas de página</b>: INIT REF, RTE, DEP ARR, LEGS, PROG, VNAV…','<b>Teclado</b>.','<b>EXEC</b>: cuando se ilumina hay cambios pendientes; púlsala para activarlos.'],'Regla de oro en Boeing: modificas → revisas → <b>EXEC</b>. Ruta de ejemplo.');

/* ---------- FCU / MCP ---------- */
FG.f.fcu=FG.fig('FCU de Airbus (piloto automático)',`<svg viewBox="0 0 400 180" font-family="Arial" font-size="10"><rect width="400" height="180" rx="10" fill="#1e293b"/>${FG.r(6,20,388,150,'#4b5563',6)}
${[[12,'SPD','---•'],[86,'HDG','---•'],[252,'ALT','25000'],[332,'V/S','-----']].map(([x,l,v])=>FG.t(x+30,34,l,'#fff',8,'middle')+FG.r(x,38,60,26,'#111',3)+FG.t(x+30,57,v,'#fb923c',13,'middle')).join('')}
${FG.knob(42,95)}${FG.knob(116,95)}${FG.knob(282,95)}${FG.knob(362,95)}${FG.btn(42,140,44,16,'SPD MACH')}${FG.btn(116,140,44,16,'HDG V/S')}${FG.btn(170,140,32,16,'LOC')}
${FG.btn(180,52,32,22,'AP1','8','#fff','#111827')}${FG.btn(220,52,32,22,'AP2','8','#fff','#111827')}${FG.r(173,59,14,3,'#22c55e')}${FG.btn(200,95,40,22,'A/THR',8,'#fff','#111827')}${FG.r(193,102,14,3,'#22c55e')}${FG.btn(230,140,32,16,'APPR')}${FG.btn(282,140,40,16,'EXPED')}${FG.btn(338,140,40,16,'METRIC')}
${FG.t(200,176,'empujar = gestionado (•)   ·   tirar = seleccionado','#e5e7eb',9,'middle')}
${FG.nl([[16,96,1,29,96],[90,110,2,104,102],[268,118,3,276,106],[386,128,4,372,104],[200,16,5,190,40],[244,95,6,220,95],[200,124,7,176,136]])}</svg>`,
 ['<b>Velocidad</b> (SPD). Rayas y punto = gestionado por el FMS.','<b>Rumbo</b> (HDG). Rayas y punto = sigue la ruta (NAV).','<b>Altitud</b> objetivo (ALT): esta siempre se ve.','<b>Velocidad vertical</b> (V/S).','<b>AP1 / AP2</b>: piloto automático (luz verde = conectado).','<b>A/THR</b>: autoempuje.','<b>LOC / APPR</b>: armar el localizador o la aproximación ILS completa.'],
 'Cada mando se <b>empuja</b> (el avión lo gestiona: punto •) o se <b>tira</b> (tú eliges el valor). En el A350 el FCU es casi igual. Distribución simplificada.');
FG.mcp=k7=>`<svg viewBox="0 0 400 180" font-family="Arial" font-size="10"><rect width="400" height="180" rx="10" fill="#1e293b"/>${FG.r(6,20,388,150,'#64748b',6)}
<rect x="14" y="40" width="16" height="30" rx="3" fill="#111"/><rect x="18" y="44" width="8" height="12" fill="#e5e7eb"/>${FG.t(22,84,'A/T','#fff',7,'middle')}${FG.t(22,93,'ARM','#fff',7,'middle')}
${[[38,'IAS/MACH','250',60],[148,'HDG','320',56],[236,'ALT','25000',62],[310,'V/S','',48]].map(([x,l,v,w])=>FG.t(x+w/2,34,l,'#fff',8,'middle')+FG.r(x,38,w,24,'#111',3)+FG.t(x+w/2,56,v,'#f8fafc',13,'middle')).join('')}
${FG.knob(68,94)}${FG.btn(50,138,30,16,k7?'N1':'CLB CON',6)}${FG.btn(86,138,30,16,k7?'SPEED':'A/T',6)}
${FG.btn(120,52,28,16,'LNAV',6.5)}${FG.btn(120,82,28,16,'VNAV',6.5)}${FG.btn(120,112,28,16,k7?'LVL CHG':'FLCH',5.5)}
${FG.knob(176,94)}${FG.btn(176,138,40,16,'HDG SEL',6.5)}${FG.btn(220,82,32,16,k7?'VOR LOC':'LOC',6)}${FG.btn(220,112,32,16,'APP',6.5)}
${FG.knob(267,94)}${FG.btn(267,138,40,16,'ALT HOLD',6)}<rect x="326" y="78" width="16" height="34" rx="3" fill="#111" stroke="#9ca3af"/>${[84,92,100,108].map(y=>`<line x1="328" y1="${y}" x2="340" y2="${y}" stroke="#6b7280"/>`).join('')}${FG.btn(334,138,30,16,'V/S',7)}
${k7?FG.btn(377,52,30,18,'CMD A',6)+FG.btn(377,82,30,18,'CMD B',6)+FG.r(368,59,18,3,'#22c55e'):FG.btn(377,52,30,18,'A/P',7)+FG.r(368,59,18,3,'#22c55e')+FG.btn(377,82,30,18,'A/T',6)}
${FG.t(200,176,'en Boeing tú eliges el modo con su botón (no hay empujar/tirar)','#e5e7eb',9,'middle')}
${FG.nl([[22,110,1,22,98],[60,118,2,64,108],[100,96,3,112,90],[176,120,4,176,108],[262,118,5,266,108],[356,118,6,340,112],[377,108,7,377,92],[220,150,8,220,120]])}</svg>`;
FG.f.mcp=FG.fig('MCP de Boeing (piloto automático)',FG.mcp(false),
 ['<b>A/T ARM</b>: armar el autoempuje.','<b>Velocidad</b> (IAS/MACH) y su mando; debajo, modos de empuje.','<b>LNAV / VNAV / FLCH</b>: seguir la ruta y el perfil vertical del FMC, o cambiar de nivel.','<b>Rumbo</b> (HDG) y HDG SEL.','<b>Altitud</b> objetivo y ALT HOLD.','<b>V/S</b>: rueda de velocidad vertical.','<b>A/P</b>: conectar el piloto automático (en el 737: CMD A / CMD B).','<b>LOC / APP</b>: localizador o aproximación ILS.'],
 'Modelo 777/787 simplificado. El 737 usa LVL CHG en vez de FLCH y VOR LOC en vez de LOC.');
FG.f.mcp737=FG.fig('MCP del Boeing 737',FG.mcp(true),
 ['<b>A/T ARM</b>.','<b>Velocidad</b> y botones N1 / SPEED.','<b>LNAV / VNAV / LVL CHG</b>.','<b>Rumbo</b> y HDG SEL.','<b>Altitud</b> y ALT HOLD.','<b>V/S</b>.','<b>CMD A / CMD B</b>: los dos pilotos automáticos.','<b>VOR LOC / APP</b>.'],'Distribución simplificada del MCP del 737 NG/MAX.');

/* ---------- Visión general de la cabina ---------- */
FG.cock=t=>{const A=t[0]==='a';let s=`<svg viewBox="0 0 400 270" font-family="Arial" font-size="9"><rect width="400" height="270" rx="10" fill="#0f172a"/>`;
 s+=`<path d="M20 4 h360 l-14 26 h-332 z" fill="#475569"/>`;for(let i=0;i<14;i++)s+=`<circle cx="${50+i*23}" cy="17" r="3" fill="#cbd5e1"/>`;
 s+=`<path d="M34 32 h332 l-10 40 h-312 z" fill="#7dd3fc" opacity=".35"/><path d="M200 32 v40 M120 32 l-6 40 M280 32 l6 40" stroke="#334155" stroke-width="5"/>`;
 s+=`<path d="M24 74 h352 l-6 18 h-340 z" fill="#1f2937"/>`+FG.r(130,77,140,12,'#4b5563',2)+FG.r(40,77,50,12,'#4b5563',2)+FG.r(310,77,50,12,'#4b5563',2);
 s+=`<path d="M30 92 h340 v110 h-340 z" fill="#334155"/>`;
 const scr=(x,y,w,h,l,c='#1d4ed8')=>FG.r(x,y,w,h,'#000',2,'#64748b')+FG.r(x+3,y+3,w-6,h-6,c,1)+FG.t(x+w/2,y+h/2+3,l,'#fff',8,'middle');
 if(t==='a320'){s+=scr(36,98,50,48,'PFD')+scr(90,98,50,48,'ND','#065f46')+scr(260,98,50,48,'ND','#065f46')+scr(314,98,50,48,'PFD')+scr(176,96,48,46,'E/WD','#111827')+scr(176,146,48,46,'SD','#111827')+FG.r(146,100,22,22,'#000',2,'#64748b');}
 else if(t==='a350'){[[36,'PFD','OIS'],[92,'ND','MFD'],[258,'ND','MFD'],[314,'PFD','OIS']].forEach(([x,u,d])=>s+=scr(x,96,52,52,u,u=='ND'?'#065f46':'#1d4ed8')+scr(x,150,52,40,d,'#374151'));s+=scr(176,96,48,52,'E/WD','#111827')+scr(176,150,48,40,'SD','#111827');}
 else if(t==='b787'){s+=scr(36,98,76,60,'PFD')+scr(116,98,76,60,'ND / EICAS','#065f46')+scr(208,98,76,60,'ND / EICAS','#065f46')+scr(288,98,76,60,'PFD')+scr(162,162,76,40,'MFD','#374151')+`<path d="M60 74 l12 -24 h30 l-6 24" fill="#94a3b8" opacity=".5"/><path d="M340 74 l-12 -24 h-30 l6 24" fill="#94a3b8" opacity=".5"/>`;}
 else{const e=t==='b737'?'MOTORES':'EICAS',l=t==='b737'?'INFERIOR':'MFD';s+=scr(36,98,50,48,'PFD')+scr(90,98,50,48,'ND','#065f46')+scr(260,98,50,48,'ND','#065f46')+scr(314,98,50,48,'PFD')+scr(176,96,48,46,e,'#111827')+scr(176,146,48,46,l,'#374151')+FG.r(146,100,22,22,'#000',2,'#64748b');}
 s+=`<path d="M150 204 h100 l14 64 h-128 z" fill="#1f2937"/>`;
 if(t==='a350')s+=FG.r(170,210,60,14,'#4b5563',2)+FG.t(200,220,'KCCU','#fff',7,'middle');else s+=FG.r(156,210,36,22,'#4b5563',2)+FG.r(208,210,36,22,'#4b5563',2)+(t==='b777'?FG.r(186,244,28,16,'#4b5563',2):'');
 s+=FG.r(186,232,10,22,'#9ca3af',2)+FG.r(204,232,10,22,'#9ca3af',2);
 if(A)s+=`<path d="M8 200 h22 v60 h-22z M370 200 h22 v60 h-22z" fill="#1f2937"/><rect x="15" y="206" width="8" height="26" rx="4" fill="#111" stroke="#94a3b8"/><rect x="377" y="206" width="8" height="26" rx="4" fill="#111" stroke="#94a3b8"/>`;
 else s+=`<path d="M70 170 q0 30 18 30 h28 q18 0 18 -30 M88 200 v60 M116 200 v60" fill="none" stroke="#e5e7eb" stroke-width="5"/><path d="M266 170 q0 30 18 30 h28 q18 0 18 -30 M284 200 v60 M312 200 v60" fill="none" stroke="#e5e7eb" stroke-width="5"/>`;
 s+=FG.nl([[392,16,1,374,16],[200,62,2,200,80],[14,120,3,36,120],[110,90,4,null],[234,110,5,224,112],[234,176,6,224,170],[270,240,7,250,240],A?[46,218,8,24,218]:[146,252,8,116,240]]);
 if(t==='b787')s+=FG.N(86,46,9);
 return s+'</svg>';};
FG.cockItems=(t)=>{const A=t[0]==='a',b7=t==='b737';return ['<b>Panel superior</b> (overhead): sistemas (eléctrico, combustible, hidráulico, luces…).',A?'<b>Glareshield</b>: FCU (piloto automático) en el centro y paneles EFIS a los lados.':'<b>Glareshield</b>: MCP (piloto automático) en el centro y paneles EFIS a los lados.','<b>PFD</b>: pantalla principal de vuelo (delante de cada piloto).','<b>ND</b>: pantalla de navegación.',A?'<b>E/WD</b> (ECAM superior): motores y avisos.':(b7?'<b>Pantalla superior central</b>: motores (N1, EGT…).':'<b>EICAS</b>: motores y alertas.'),A?(t==='a350'?'<b>SD</b>: sistemas. Debajo del PFD y del ND están OIS (documentación) y MFD (FMS).':'<b>SD</b> (ECAM inferior): páginas de sistemas.'):(b7?'<b>Pantalla inferior central</b>: sistemas o motores secundarios.':'<b>MFD</b>: pantalla multifunción (sistemas, checklist, CDU…).'),A?(t==='a350'?'<b>Pedestal</b>: KCCU (teclado y cursor), palancas de empuje, flaps…':'<b>Pedestal</b>: MCDU, palancas de empuje, flaps, radios…'):'<b>Pedestal</b>: CDU, palancas de empuje, flaps, radios…',A?'<b>Sidestick</b>: mini-palanca lateral (fly-by-wire).':'<b>Yoke</b> (cuernos) delante de cada piloto.'].concat(t==='b787'?['<b>HUD</b>: cristal donde se proyectan los datos de vuelo.']:[]);};
FG.f.cockA320=FG.fig('Cabina del A320 de un vistazo',FG.cock('a320'),FG.cockItems('a320'),'Seis pantallas iguales y el pequeño instrumento de reserva entre ellas. Vista esquemática, no a escala.');
FG.f.cockA350=FG.fig('Cabina del A350 de un vistazo',FG.cock('a350'),FG.cockItems('a350'),'Seis pantallas grandes: en las laterales, PFD/OIS y ND/MFD; en el centro, E/WD y SD. Vista esquemática.');
FG.f.cock737=FG.fig('Cabina del Boeing 737 de un vistazo',FG.cock('b737'),FG.cockItems('b737'),'Seis pantallas (737 NG). El 737 MAX lleva cuatro más grandes. Vista esquemática.');
FG.f.cock787=FG.fig('Cabina del Boeing 787 de un vistazo',FG.cock('b787'),FG.cockItems('b787'),'Cinco grandes pantallas configurables (aquí una disposición típica) y HUD para ambos pilotos. Vista esquemática.');
FG.f.cock777=FG.fig('Cabina del Boeing 777 de un vistazo',FG.cock('b777'),FG.cockItems('b777'),'Seis pantallas: PFD y ND por piloto, EICAS y MFD en el centro, y tres CDU en el pedestal. Vista esquemática.');

/* ---------- Overhead ---------- */
FG.f.overhead=FG.fig('Panel superior (overhead): dónde está cada sistema',`<svg viewBox="0 0 400 250" font-family="Arial" font-size="9"><rect width="400" height="250" rx="10" fill="#475569"/>
${[[10,10,90,60,'ADIRS / IRS',1],[105,10,190,60,'ELÉCTRICO',3],[300,10,90,60,'FUEGO MOTORES',2],[10,76,90,70,'HIDRÁULICO',4],[105,76,190,70,'COMBUSTIBLE',5],[300,76,90,70,'ANTIHIELO',6],[10,152,190,40,'AIRE / PRESURIZACIÓN',7],[205,152,185,40,'APU · ARRANQUE',8],[10,198,380,44,'LUCES EXTERIORES · SEÑALES · LIMPIAS',9]].map(([x,y,w,h,l,n])=>{let g=FG.r(x,y,w,h,'#334155',4,'#1e293b')+FG.t(x+w/2,y+12,l,'#e2e8f0',8,'middle');for(let i=0;i<Math.floor(w/26);i++)g+=FG.r(x+8+i*26,y+18,18,12,'#111',2)+FG.r(x+10+i*26,y+20,14,4,i%3?'#1e293b':'#0ea5e9');return g+FG.N(x+w-10,y+h-10,n);}).join('')}</svg>`,
 ['<b>ADIRS / IRS</b>: plataformas inerciales (posición y actitud). Se alinean al empezar.','<b>Fuego</b>: manetas de extinción de motores y APU.','<b>Eléctrico</b>: baterías, generadores, potencia externa.','<b>Hidráulico</b>: bombas.','<b>Combustible</b>: bombas de los depósitos.','<b>Antihielo</b>: alas, motores, sondas.','<b>Aire acondicionado y presurización</b> (packs, sangrado).','<b>APU</b> y arranque de motores.','<b>Luces exteriores</b>, señales de cinturones, limpiaparabrisas.'],
 'Mapa simplificado común a Airbus y Boeing (la posición exacta cambia). En Airbus rige la “cabina oscura”: si no hay luces encendidas, todo está en normal. Los botones azules representan luces de estado.');

/* ---------- Pedestal ---------- */
FG.f.pedA=FG.fig('Pedestal de Airbus: palancas de empuje, flaps y motores',`<svg viewBox="0 0 400 300" font-family="Arial" font-size="9"><rect width="400" height="300" rx="10" fill="#1f2937"/>
<path d="M130 20 v190" stroke="#111" stroke-width="10"/><path d="M270 20 v190" stroke="#111" stroke-width="10"/>${FG.r(150,20,100,190,'#374151',4)}
${[['TOGA',36],['FLX/MCT',66],['CL',96],['IDLE',150],['REV',186]].map(([l,y])=>`<line x1="150" y1="${y}" x2="250" y2="${y}" stroke="#94a3b8" stroke-dasharray="3 3"/>`+FG.t(146,y+3,l,'#fff',9,'end')).join('')}
${FG.r(170,90,22,14,'#e5e7eb',3)}${FG.r(208,90,22,14,'#e5e7eb',3)}<path d="M181 104 v80 M219 104 v80" stroke="#9ca3af" stroke-width="5"/>
${FG.r(20,30,60,120,'#374151',4)}${FG.t(50,44,'SPEED BRAKE','#fff',7,'middle')}<line x1="50" y1="52" x2="50" y2="140" stroke="#111" stroke-width="5"/>${FG.r(40,60,20,10,'#e5e7eb',2)}${FG.t(50,150,'RET → FULL','#cbd5e1',7,'middle')}
${FG.r(316,30,70,140,'#374151',4)}${FG.t(351,44,'FLAPS','#fff',8,'middle')}${['0','1','2','3','FULL'].map((l,i)=>FG.t(378,64+i*24,l,'#fff',9,'end')+`<line x1="324" y1="${60+i*24}" x2="350" y2="${60+i*24}" stroke="#94a3b8"/>`).join('')}<line x1="336" y1="52" x2="336" y2="164" stroke="#111" stroke-width="5"/>${FG.r(326,80,22,10,'#e5e7eb',2)}
${FG.r(140,222,120,70,'#374151',4)}${FG.t(200,234,'ENG MASTER','#fff',8,'middle')}${[170,230].map((x,i)=>`<circle cx="${x}" cy="256" r="11" fill="#111" stroke="#94a3b8"/><rect x="${x-4}" y="246" width="8" height="12" fill="#e5e7eb"/>`+FG.t(x,284,i+1,'#fff',9,'middle')).join('')}
${FG.knob(200,262,11)}${FG.t(200,284,'MODE','#fff',7,'middle')}
${FG.r(296,214,90,40,'#374151',4)}${FG.t(341,228,'PARKING BRK','#fff',8,'middle')}${FG.r(330,234,22,12,'#e5e7eb',6)}
${FG.r(14,214,110,76,'#374151',4)}${FG.t(69,228,'MCDU · radios','#cbd5e1',8,'middle')}${FG.r(24,234,40,48,'#000',2)}${FG.r(74,234,40,48,'#000',2)}
${FG.nl([[290,30,1,250,36],[200,74,2,190,90],[290,180,3,250,186],[50,170,4,50,152],[351,184,5,null],[126,256,6,158,256],[200,206,7,200,250],[386,244,8,null]])}</svg>`,
 ['<b>TOGA</b>: máximo empuje (despegue/motor y al aire).','<b>Palancas de empuje</b> (una por motor). Muescas: TOGA, FLX/MCT, CL (subida y todo el vuelo con A/THR), IDLE.','<b>REV</b>: reversas, solo en el suelo al aterrizar.','<b>Speedbrake</b> (aerofrenos): RET, armado para el aterrizaje, o extendidos.','<b>Flaps</b>: 0, 1, 2, 3, FULL.','<b>ENG MASTER</b> 1 y 2: abren el combustible al arrancar.','<b>ENG MODE</b>: CRANK / NORM / IGN START.','<b>Freno de aparcamiento</b>.'],
 'En el A320 las palancas no se mueven solas: con A/THR las dejas en CL. Disposición simplificada.');
FG.ped=(fl)=>`<svg viewBox="0 0 400 300" font-family="Arial" font-size="9"><rect width="400" height="300" rx="10" fill="#1f2937"/>
${FG.r(140,20,120,180,'#374151',4)}${FG.t(200,34,'EMPUJE','#fff',8,'middle')}<path d="M175 50 v140 M225 50 v140" stroke="#111" stroke-width="6"/>
${FG.r(160,60,30,16,'#e5e7eb',4)}${FG.r(210,60,30,16,'#e5e7eb',4)}${FG.r(156,64,6,8,'#111',2)}${FG.r(238,64,6,8,'#111',2)}<path d="M175 76 v20 M225 76 v20" stroke="#9ca3af" stroke-width="5"/><path d="M181 80 h8 v10 h-8 M219 80 h-8 v10 h8" stroke="#e5e7eb" stroke-width="3" fill="none"/>
${FG.t(200,180,'IDLE ↓','#cbd5e1',8,'middle')}
${FG.r(20,30,70,130,'#374151',4)}${FG.t(55,44,'SPEED BRAKE','#fff',7,'middle')}${['DOWN','ARMED','UP'].map((l,i)=>FG.t(84,66+i*40,l,'#fff',7,'end')).join('')}<line x1="34" y1="56" x2="34" y2="150" stroke="#111" stroke-width="5"/>${FG.r(24,58,20,10,'#e5e7eb',2)}
${FG.r(300,30,90,170,'#374151',4)}${FG.t(345,44,'FLAPS','#fff',8,'middle')}${fl.map((l,i)=>FG.t(384,60+i*(140/fl.length)+4,l,'#fff',8,'end')+`<line x1="324" y1="${60+i*(140/fl.length)}" x2="358" y2="${60+i*(140/fl.length)}" stroke="#94a3b8"/>`).join('')}<line x1="314" y1="52" x2="314" y2="196" stroke="#111" stroke-width="5"/>${FG.r(304,54,22,10,'#e5e7eb',2)}
${FG.r(140,210,120,80,'#374151',4)}${FG.t(200,224,'FUEL CONTROL','#fff',8,'middle')}${[170,230].map(x=>`<rect x="${x-6}" y="232" width="12" height="30" rx="4" fill="#dc2626"/>`).join('')}${FG.t(200,250,'RUN','#fff',8,'middle')}${FG.t(200,280,'CUTOFF','#fff',8,'middle')}
${FG.r(20,210,90,40,'#374151',4)}${FG.t(65,224,'PARKING BRAKE','#fff',7,'middle')}${FG.r(52,232,26,12,'#e5e7eb',6)}
${FG.r(300,210,90,80,'#374151',4)}${FG.t(345,224,'CDU · radios','#cbd5e1',8,'middle')}${FG.r(310,232,70,50,'#000',2)}
${FG.nl([[200,130,1,222,130],[132,68,2,158,68],[132,92,3,184,86],[55,176,4,55,162],[345,204,5,null],[118,250,6,164,250],[120,230,7,110,232]])}</svg>`;
FG.pedItems=['<b>Palancas de empuje</b> (una por motor). Con el autothrottle se mueven solas.','<b>TO/GA</b>: botones en las palancas para despegue o motor y al aire.','<b>Reversas</b>: palanquitas delante; solo en el suelo.','<b>Speedbrake</b>: DOWN, ARMED (para aterrizar) o UP.','<b>Flaps</b> con sus posiciones.','<b>FUEL CONTROL</b>: RUN / CUTOFF (combustible a cada motor).','<b>Freno de aparcamiento</b>.'];
FG.f.ped737=FG.fig('Pedestal del Boeing 737: empuje, flaps y combustible',FG.ped(['UP','1','2','5','10','15','25','30','40']),FG.pedItems,'Flaps del 737: UP, 1, 2, 5, 10, 15, 25, 30, 40. Disposición simplificada.');
FG.f.pedB=FG.fig('Pedestal de Boeing (787/777): empuje, flaps y combustible',FG.ped(['UP','1','5','15','20','25','30']),FG.pedItems,'Flaps del 787/777: UP, 1, 5, 15, 20, 25, 30. En el 737 los FUEL CONTROL se llaman START LEVERS (IDLE/CUTOFF). Disposición simplificada.');

/* ---------- Tren de aterrizaje ---------- */
FG.f.gear=FG.fig('Palanca del tren de aterrizaje y sus luces',`<svg viewBox="0 0 400 230" font-family="Arial" font-size="9"><rect width="400" height="230" rx="10" fill="#1e293b"/>
${FG.r(14,14,180,200,'#475569',6)}${FG.t(104,30,'Estilo Boeing','#fff',10,'middle')}${FG.t(60,58,'UP','#fff',9,'middle')}${FG.t(60,190,'DN','#fff',9,'middle')}<line x1="60" y1="70" x2="60" y2="176" stroke="#111" stroke-width="6"/><circle cx="60" cy="168" r="14" fill="#f1f5f9" stroke="#111"/><path d="M50 160 h20 M50 176 h20" stroke="#94a3b8"/>
${[['L',120,70],['N',150,46],['R',180,70]].map(([l,x,y])=>FG.r(x-17,y,30,20,'#052e16',2,'#22c55e')+FG.t(x-2,y+14,'▼','#22c55e',10,'middle')).join('')}${FG.t(150,108,'3 verdes = abajo y blocado','#e5e7eb',8,'middle')}
${FG.r(206,14,180,200,'#475569',6)}${FG.t(296,30,'Estilo Airbus','#fff',10,'middle')}${FG.t(250,58,'UP','#fff',9,'middle')}${FG.t(250,190,'DOWN','#fff',9,'middle')}<line x1="250" y1="70" x2="250" y2="176" stroke="#111" stroke-width="6"/><circle cx="250" cy="168" r="14" fill="#f1f5f9" stroke="#111"/>
${[0,1,2].map(i=>FG.r(300+i*26,60,22,40,'#000',2,'#64748b')+FG.t(311+i*26,76,'▽','#22c55e',12,'middle')+FG.t(311+i*26,94,'UNLK','#7f1d1d',6,'middle')).join('')}${FG.t(338,120,'LDG GEAR: 3 triángulos verdes','#e5e7eb',8,'middle')}
${FG.nl([[34,168,1,46,168],[150,140,2,150,112],[224,168,3,236,168],[338,140,4,338,124]])}</svg>`,
 ['<b>Palanca del tren</b> (Boeing): el pomo tiene forma de rueda. Arriba = recogido.','<b>Luces del tren</b>: tres verdes = las tres patas abajo y blocadas.','<b>Palanca del tren</b> (Airbus).','<b>Indicador LDG GEAR</b>: tres triángulos verdes. “UNLK” en rojo = pata en tránsito.'],
 'En el despegue: “positive climb” → tren arriba. En la aproximación: tren abajo y comprueba los 3 verdes. Simplificado.');
