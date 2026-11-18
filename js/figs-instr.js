/* Ilustraciones propias (SVG) de instrumentos — Piloto Pro by Julián Lenis. Simplificadas, con números y leyenda. */
const FG={};
FG.fig=(title,svg,items,note)=>`<figure class="fig"><div class="fsv" role="button" aria-label="Ampliar imagen: ${title}">${svg}</div><figcaption><b>🖼️ ${title}</b>${items&&items.length?`<ol class="fl">${items.map(i=>`<li>${i}</li>`).join('')}</ol>`:''}${note?`<p class="sm mu">${note}</p>`:''}<span class="zh">🔍 Toca la imagen para ampliarla</span></figcaption></figure>`;
FG.N=(x,y,n)=>`<g class="num"><circle cx="${x}" cy="${y}" r="9" fill="#facc15" stroke="#000" stroke-width="1"/><text x="${x}" y="${y+4}" text-anchor="middle" font-size="11" font-weight="bold" fill="#000">${n}</text></g>`;
FG.L=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#facc15" stroke-width="1.3"/>`;
FG.P=(cx,cy,r,a)=>[cx+r*Math.sin(a*Math.PI/180),cy-r*Math.cos(a*Math.PI/180)];
FG.arc=(cx,cy,r,a1,a2,col,w)=>{const [x1,y1]=FG.P(cx,cy,r,a1),[x2,y2]=FG.P(cx,cy,r,a2);return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${a2-a1>180?1:0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${col}" stroke-width="${w}"/>`;};
FG.tick=(cx,cy,r1,r2,a,col='#fff',w=1.5)=>{const [x1,y1]=FG.P(cx,cy,r1,a),[x2,y2]=FG.P(cx,cy,r2,a);return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${col}" stroke-width="${w}"/>`;};
FG.txt=(cx,cy,r,a,t,fs=10,col='#fff')=>{const [x,y]=FG.P(cx,cy,r,a);return `<text x="${x.toFixed(1)}" y="${(y+fs/3).toFixed(1)}" text-anchor="middle" font-size="${fs}" fill="${col}">${t}</text>`;};
FG.needle=(cx,cy,r,a,col='#fff',w=3)=>`<g transform="rotate(${a} ${cx} ${cy})"><polygon points="${cx-w/2},${cy+8} ${cx+w/2},${cy+8} ${cx+0.6},${cy-r} ${cx-0.6},${cy-r}" fill="${col}"/></g><circle cx="${cx}" cy="${cy}" r="4" fill="#555"/>`;
FG.bez=(cx,cy,r)=>`<circle cx="${cx}" cy="${cy}" r="${r+6}" fill="#2b2f36" stroke="#111"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#0b0b0b"/>`;
/* --- Los seis instrumentos clásicos (funciones: centro, radio) --- */
FG.g={
asi(cx,cy,r){const A=v=>-140+v*1.4;let s=FG.bez(cx,cy,r);s+=FG.arc(cx,cy,r-6,A(40),A(85),'#fff',4)+FG.arc(cx,cy,r-11,A(50),A(130),'#22c55e',5)+FG.arc(cx,cy,r-11,A(130),A(160),'#facc15',5)+FG.tick(cx,cy,r-16,r-2,A(160),'#ef4444',3);
 for(let v=40;v<=200;v+=10)s+=FG.tick(cx,cy,r-(v%20?6:10),r-1,A(v));for(let v=40;v<=200;v+=40)s+=FG.txt(cx,cy,r-22,A(v),v,r/5);s+=`<text x="${cx}" y="${cy+r/2.6}" text-anchor="middle" font-size="${r/7}" fill="#aaa">NUDOS</text>`+FG.needle(cx,cy,r-8,A(110));return s;},
ai(cx,cy,r,id,pitch=4,bank=-15){const k=r/40;let s=`<defs><clipPath id="c${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>`+FG.bez(cx,cy,r)+`<g clip-path="url(#c${id})"><g transform="rotate(${bank} ${cx} ${cy}) translate(0 ${pitch*k})"><rect x="${cx-2*r}" y="${cy-2*r}" width="${4*r}" height="${2*r}" fill="#3b82f6"/><rect x="${cx-2*r}" y="${cy}" width="${4*r}" height="${2*r}" fill="#92400e"/><line x1="${cx-2*r}" y1="${cy}" x2="${cx+2*r}" y2="${cy}" stroke="#fff" stroke-width="2"/>`;
 [-20,-10,10,20].forEach(p=>{const y=cy-p*k*1.3,w=(Math.abs(p)===10?14:22)*k;s+=`<line x1="${cx-w/2}" y1="${y}" x2="${cx+w/2}" y2="${y}" stroke="#fff" stroke-width="1.3"/><text x="${cx+w/2+3}" y="${y+3}" font-size="${7*k}" fill="#fff">${Math.abs(p)}</text>`;});s+=`</g></g>`;
 [-60,-45,-30,-20,-10,0,10,20,30,45,60].forEach(a=>s+=FG.tick(cx,cy,r-2,r-(a%30?6:11),a,'#fff',1.5));s+=`<polygon points="${cx},${cy-r+12} ${cx-5},${cy-r+20} ${cx+5},${cy-r+20}" fill="#facc15" transform="rotate(${bank} ${cx} ${cy})"/>`;
 s+=`<path d="M${cx-24*k} ${cy} h16 l4 6 l4 -6 h16" fill="none" stroke="#facc15" stroke-width="${3*k}" transform="translate(${-(4*k-4)} 0)"/><circle cx="${cx}" cy="${cy}" r="2" fill="#facc15"/>`;return s;},
alt(cx,cy,r,hp='1013',ft=4500){let s=FG.bez(cx,cy,r);for(let i=0;i<50;i++)s+=FG.tick(cx,cy,r-(i%5?5:10),r-1,i*7.2);for(let i=0;i<10;i++)s+=FG.txt(cx,cy,r-19,i*36,i,r/4.5);
 s+=`<rect x="${cx+r*0.25}" y="${cy-r*0.12}" width="${r*0.55}" height="${r*0.26}" fill="#000" stroke="#777"/><text x="${cx+r*0.525}" y="${cy+r*0.07}" text-anchor="middle" font-size="${r/6.5}" fill="#fff" font-family="monospace">${hp}</text><text x="${cx+r*0.52}" y="${cy+r*0.3}" text-anchor="middle" font-size="${r/9}" fill="#aaa">hPa</text>`;
 s+=`<text x="${cx}" y="${cy-r*0.3}" text-anchor="middle" font-size="${r/8}" fill="#aaa">ALT · x100 ft</text>`;
 s+=FG.needle(cx,cy,r*0.5,(Math.floor(ft/1000)%10)*36+(ft%1000)/1000*36,'#fff',5)+FG.needle(cx,cy,r-8,(ft%1000)/1000*360,'#fff',2.5);
 s+=`<circle cx="${cx-r*0.82}" cy="${cy+r*0.82}" r="${r*0.14}" fill="#444" stroke="#111"/>`;return s;},
tc(cx,cy,r){let s=FG.bez(cx,cy,r)+`<text x="${cx}" y="${cy-r*0.55}" text-anchor="middle" font-size="${r/6}" fill="#fff">D.C. ELEC</text><text x="${cx-r*0.75}" y="${cy+r*0.42}" font-size="${r/5}" fill="#fff">L</text><text x="${cx+r*0.62}" y="${cy+r*0.42}" font-size="${r/5}" fill="#fff">R</text>`;
 s+=FG.tick(cx,cy,r-2,r-12,-90)+FG.tick(cx,cy,r-2,r-12,90)+FG.tick(cx,cy,r-2,r-12,-110)+FG.tick(cx,cy,r-2,r-12,110);
 s+=`<g transform="rotate(20 ${cx} ${cy})"><rect x="${cx-r*0.75}" y="${cy-2}" width="${r*1.5}" height="4" fill="#fff"/><circle cx="${cx}" cy="${cy}" r="${r*0.1}" fill="#fff"/><rect x="${cx-2}" y="${cy-r*0.25}" width="4" height="${r*0.2}" fill="#fff"/></g>`;
 s+=`<path d="M${cx-r*0.45} ${cy+r*0.55} Q${cx} ${cy+r*0.72} ${cx+r*0.45} ${cy+r*0.55}" fill="none" stroke="#ddd" stroke-width="${r*0.16}" stroke-linecap="round"/><circle cx="${cx}" cy="${cy+r*0.64}" r="${r*0.07}" fill="#111"/><line x1="${cx-r*0.1}" y1="${cy+r*0.5}" x2="${cx-r*0.1}" y2="${cy+r*0.78}" stroke="#111"/><line x1="${cx+r*0.1}" y1="${cy+r*0.5}" x2="${cx+r*0.1}" y2="${cy+r*0.78}" stroke="#111"/>`;
 s+=`<text x="${cx}" y="${cy+r*0.96}" text-anchor="middle" font-size="${r/9}" fill="#aaa">2 MIN</text>`;return s;},
hi(cx,cy,r,hdg=300){let s=FG.bez(cx,cy,r)+`<g transform="rotate(${-hdg} ${cx} ${cy})">`;for(let a=0;a<360;a+=5)s+=FG.tick(cx,cy,r-1,r-(a%10?5:10),a);
 for(let a=0;a<360;a+=30){const t={0:'N',90:'E',180:'S',270:'W'}[a]||a/10;s+=FG.txt(cx,cy,r-19,a,t,r/5.5,a%90?'#fff':'#facc15');}
 s+=`</g><polygon points="${cx},${cy-r+1} ${cx-5},${cy-r-7} ${cx+5},${cy-r-7}" fill="#f97316"/>`;
 s+=`<g transform="rotate(20 ${cx} ${cy})"><line x1="${cx}" y1="${cy-r*0.7}" x2="${cx}" y2="${cy+r*0.7}" stroke="#d946ef" stroke-width="3"/><polygon points="${cx},${cy-r*0.78} ${cx-5},${cy-r*0.64} ${cx+5},${cy-r*0.64}" fill="#d946ef"/>${[-2,-1,1,2].map(d=>`<circle cx="${cx+d*r*0.16}" cy="${cy}" r="2" fill="none" stroke="#fff"/>`).join('')}<line x1="${cx+r*0.12}" y1="${cy-r*0.35}" x2="${cx+r*0.12}" y2="${cy+r*0.35}" stroke="#d946ef" stroke-width="3"/></g>`;
 s+=`<path d="M${cx} ${cy-r*0.2} l3 6 h12 v4 h-12 l-2 8 h4 v3 h-10 v-3 h4 l-2 -8 h-12 v-4 h12z" fill="#fff"/>`;return s;},
vsi(cx,cy,r){const A=v=>-90+Math.sign(v)*Math.min(Math.abs(v)<=1?Math.abs(v)*60:60+(Math.abs(v)-1)*40,170);let s=FG.bez(cx,cy,r);
 [0,0.5,1,1.5,2,4].forEach(v=>{s+=FG.tick(cx,cy,r-1,r-10,A(v));if(v)s+=FG.tick(cx,cy,r-1,r-10,A(-v));});[0,1,2,4].forEach(v=>{s+=FG.txt(cx,cy,r-20,A(v),v,r/5);if(v)s+=FG.txt(cx,cy,r-20,A(-v),v,r/5);});
 s+=`<text x="${cx-r*0.1}" y="${cy-r*0.35}" font-size="${r/7}" fill="#fff">▲ SUBE</text><text x="${cx-r*0.1}" y="${cy+r*0.45}" font-size="${r/7}" fill="#fff">▼ BAJA</text><text x="${cx+r*0.05}" y="${cy+5}" font-size="${r/9}" fill="#aaa">x1000 ft/min</text>`+FG.needle(cx,cy,r-8,A(1));return s;}};
FG.box=(w,h,inner,bg='#f8fafc')=>`<svg viewBox="0 0 ${w} ${h}" font-family="Arial"><rect width="${w}" height="${h}" rx="10" fill="${bg}"/>${inner}</svg>`;
/* figuras individuales grandes */
FG.one=(fn,title,items,extra='',args=[])=>FG.fig(title,FG.box(400,240,FG.g[fn](140,120,92,...args)+extra,'#1e293b'),items);
FG.f={};
FG.f.asi=FG.one('asi','Indicador de velocidad (anemómetro)',['<b>Aguja</b>: velocidad indicada en nudos (aquí 110 kt).','<b>Arco blanco</b>: velocidades con flaps extendidos.','<b>Arco verde</b>: margen normal de operación.','<b>Arco amarillo</b>: solo con aire en calma (precaución).','<b>Línea roja</b>: velocidad que nunca se debe superar (VNE).'],
 FG.N(140,72,1)+FG.N(30,60,2)+FG.L(39,62,68,68)+FG.N(60,16,3)+FG.L(68,20,116,42)+FG.N(262,64,4)+FG.L(253,68,215,82)+FG.N(268,118,5)+FG.L(259,116,227,111)+`<text x="262" y="170" font-size="12" fill="#cbd5e1">Ejemplo de avioneta.</text><text x="262" y="186" font-size="12" fill="#cbd5e1">En el reactor es una</text><text x="262" y="202" font-size="12" fill="#cbd5e1">cinta en el PFD.</text>`);
FG.f.ai=FG.one('ai','Horizonte artificial (indicador de actitud)',['<b>Avión símbolo</b> (amarillo): eres tú. Siempre fijo en el centro.','<b>Cielo</b> (azul) y <b>tierra</b> (marrón): se mueven al cabecear y alabear.','<b>Líneas de cabeceo</b>: grados de morro arriba/abajo (aquí ~4° arriba).','<b>Escala de alabeo</b>: marcas a 10°, 20°, 30°, 45° y 60°; el triángulo indica la inclinación (aquí 15° a la izquierda).'],
 FG.N(140,152,1)+FG.N(250,60,2)+FG.L(241,62,200,80)+FG.N(260,120,3)+FG.L(251,120,170,112)+FG.N(140,14,4),['A']);
FG.f.alt=FG.one('alt','Altímetro y ajuste QNH',['<b>Aguja larga</b>: centenares de pies (aquí 500).','<b>Aguja corta</b>: miles de pies (aquí 4 y pico → 4.500 ft).','<b>Ventanilla de presión</b> (Kollsman): el ajuste en hPa (QNH, QFE o 1013 STD).','<b>Botón de ajuste</b>: se gira para poner la presión que da el ATC o el ATIS.'],
 FG.N(250,40,1)+FG.L(241,44,180,80)+FG.N(80,92,2)+FG.L(86,98,118,108)+FG.N(260,120,3)+FG.L(251,120,226,120)+FG.N(40,208,4)+FG.L(48,204,60,200)+`<text x="268" y="170" font-size="12" fill="#cbd5e1">En el Airbus/Boeing:</text><text x="268" y="186" font-size="12" fill="#cbd5e1">botón BARO del EFIS.</text><text x="268" y="202" font-size="12" fill="#cbd5e1">Tirar/pulsar = STD.</text>`);
FG.f.tc=FG.one('tc','Coordinador de giro',['<b>Avioncito</b>: indica el régimen de viraje; en la marca L o R es un viraje estándar (360° en 2 minutos).','<b>Bola</b> (inclinómetro): si se sale del centro, el viraje está descoordinado: “pisa la bola” con el pedal del mismo lado.'],
 FG.N(260,100,1)+FG.L(251,102,200,110)+FG.N(260,190,2)+FG.L(251,188,145,178));
FG.f.hi=FG.one('hi','Indicador de rumbo / HSI',['<b>Índice de rumbo</b> (naranja, arriba): el rumbo actual (aquí 300°).','<b>Rosa de rumbos</b>: N, E, S, W y grados (30 = 300°).','<b>Aguja de curso</b> (magenta): el curso seleccionado (VOR o localizador).','<b>Barra de desviación</b> (CDI): si está a un lado, el curso está hacia ese lado.'],
 FG.N(170,14,1)+FG.N(260,60,2)+FG.L(251,64,215,80)+FG.N(260,120,3)+FG.L(251,118,170,100)+FG.N(260,170,4)+FG.L(251,168,160,140));
FG.f.vsi=FG.one('vsi','Variómetro (velocidad vertical)',['<b>Aguja</b>: cuántos pies por minuto subes o bajas (aquí +1.000 ft/min).','<b>Cero</b> a la izquierda = vuelo nivelado.','<b>Arriba</b> = subiendo; <b>abajo</b> = bajando.'],
 FG.N(250,60,1)+FG.L(241,64,170,80)+FG.N(30,120,2)+FG.L(39,120,55,120)+FG.N(250,170,3)+FG.L(241,168,180,150));
FG.f.six=FG.fig('Los seis instrumentos básicos (“six pack”)',FG.box(400,260,
 FG.g.asi(70,70,52)+FG.g.ai(200,70,52,'S6')+FG.g.alt(330,70,52)+FG.g.tc(70,190,52)+FG.g.hi(200,190,52)+FG.g.vsi(330,190,52)+FG.N(20,14,1)+FG.N(150,14,2)+FG.N(280,14,3)+FG.N(20,134,4)+FG.N(150,134,5)+FG.N(280,134,6),'#334155'),
 ['<b>Velocidad</b> (nudos).','<b>Horizonte artificial</b>: actitud.','<b>Altímetro</b> (pies).','<b>Coordinador de giro</b>.','<b>Rumbo</b> (HSI).','<b>Velocidad vertical</b>.'],'Disposición en “T”: los cuatro más importantes forman una T (velocidad – horizonte – altitud, y el rumbo debajo). En el PFD de un reactor están en el mismo orden.');
/* --- Tipos de altitud --- */
FG.f.altitudes=FG.fig('QNH, QFE, STD: altitud, altura y nivel de vuelo',`<svg viewBox="0 0 400 300" font-family="Arial" font-size="10"><rect width="400" height="300" rx="10" fill="#e0f2fe"/>
<rect x="0" y="262" width="400" height="38" fill="#1e3a8a" opacity=".55"/><text x="8" y="292" fill="#fff" font-size="10">Nivel del mar</text>
<path d="M0 262 L60 262 L110 220 L230 220 L270 250 L400 262 L400 300 L0 300Z" fill="#a16207" opacity=".85"/><rect x="120" y="215" width="100" height="5" fill="#334155"/><text x="125" y="212" font-size="9">Aeropuerto (elev. 2.000 ft)</text>
<line x1="0" y1="70" x2="400" y2="70" stroke="#dc2626" stroke-dasharray="6 4"/><text x="200" y="64" fill="#b91c1c" font-weight="bold">Nivel de transición (TL)</text>
<line x1="0" y1="110" x2="400" y2="110" stroke="#16a34a" stroke-dasharray="6 4"/><text x="200" y="124" fill="#15803d" font-weight="bold">Altitud de transición (TA)</text>
<rect x="0" y="70" width="400" height="40" fill="#fde68a" opacity=".35"/><text x="200" y="94" fill="#92400e">capa de transición</text>
<g transform="translate(176,150)"><path d="M-16 0 L16 0 L20 -3 L20 3 Z M0 0 L-6 -10 L-2 -10 L6 0 L-2 10 L-6 10 Z" fill="#0f172a"/></g>
<line x1="60" y1="262" x2="60" y2="150" stroke="#2563eb" stroke-width="2.5" marker-end="url(#ah)"/><text x="66" y="175" fill="#1d4ed8" font-weight="bold">ALTITUD</text><text x="66" y="187" fill="#1d4ed8">(QNH)</text>
<line x1="150" y1="220" x2="150" y2="152" stroke="#16a34a" stroke-width="2.5" marker-end="url(#ah)"/><text x="100" y="190" fill="#15803d" font-weight="bold">ALTURA</text><text x="100" y="202" fill="#15803d">(QFE)</text>
<line x1="330" y1="262" x2="330" y2="30" stroke="#7c3aed" stroke-width="2.5" marker-end="url(#ah)"/><text x="322" y="150" fill="#6d28d9" font-weight="bold" text-anchor="end">NIVEL DE VUELO</text><text x="322" y="162" fill="#6d28d9" text-anchor="end">(STD 1013 hPa)</text>
<g transform="translate(300,30)"><path d="M-16 0 L16 0 L20 -3 L20 3 Z M0 0 L-6 -10 L-2 -10 L6 0 L-2 10 L-6 10 Z" fill="#0f172a"/></g>
<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8z" fill="#334155"/></marker></defs>
${FG.N(70,240,1)}${FG.N(160,232,2)}${FG.N(318,250,3)}${FG.N(20,104,4)}${FG.N(20,64,5)}</svg>`,
 ['<b>QNH → altitud</b>: distancia vertical sobre el <b>nivel del mar</b>. Es lo que se usa cerca del suelo (despegue, aproximación). Con QNH, en la pista el altímetro marca la elevación del aeropuerto.','<b>QFE → altura</b>: distancia sobre el <b>aeropuerto</b>. En la pista el altímetro marca 0. Poco usado en líneas aéreas.','<b>STD (1013 hPa) → nivel de vuelo</b>: todos los aviones ponen la misma presión estándar. FL100 = 10.000 ft con 1013.','<b>Altitud de transición</b>: subiendo, al pasarla pones STD.','<b>Nivel de transición</b>: bajando, al cruzarlo pones el QNH del destino. Entre ambos está la “capa de transición”.'],'Esquema no a escala.');
/* --- Velocidades V1, VR, V2 --- */
FG.f.vspeeds=FG.fig('V1, VR y V2 en la cinta de velocidad',`<svg viewBox="0 0 400 260" font-family="Arial" font-size="11"><rect width="400" height="260" rx="10" fill="#0b0b0b"/>
<rect x="30" y="20" width="70" height="220" fill="#3f3f46"/>${[0,1,2,3,4,5,6,7,8,9,10].map(i=>`<line x1="88" y1="${30+i*20}" x2="100" y2="${30+i*20}" stroke="#fff"/>${i%2?'':`<text x="80" y="${34+i*20}" text-anchor="end" fill="#fff">${180-i*5}</text>`}`).join('')}
<polygon points="100,130 112,123 112,137" fill="#facc15"/><rect x="30" y="118" width="58" height="24" fill="#000" stroke="#facc15"/><text x="80" y="135" text-anchor="end" fill="#fff" font-size="14" font-weight="bold">150</text>
<text x="104" y="114" fill="#22d3ee" font-weight="bold">V1</text><line x1="100" y1="130" x2="100" y2="130"/><line x1="100" y1="120" x2="114" y2="120" stroke="#22d3ee" stroke-width="2"/>
<line x1="100" y1="100" x2="114" y2="100" stroke="#22d3ee" stroke-width="2"/><text x="118" y="104" fill="#22d3ee" font-weight="bold">VR</text>
<line x1="100" y1="76" x2="114" y2="76" stroke="#d946ef" stroke-width="2"/><text x="118" y="80" fill="#d946ef" font-weight="bold">V2</text>
<line x1="160" y1="220" x2="390" y2="220" stroke="#94a3b8" stroke-width="6"/><text x="165" y="240" fill="#94a3b8">pista</text>
<g fill="#fff"><circle cx="230" cy="214" r="4" fill="#22d3ee"/><text x="218" y="204" fill="#22d3ee">V1</text><circle cx="290" cy="214" r="4" fill="#22d3ee"/><text x="280" y="204" fill="#22d3ee">VR</text></g>
<path d="M290 214 Q330 205 380 160" fill="none" stroke="#d946ef" stroke-width="2" stroke-dasharray="4 3"/><circle cx="360" cy="180" r="4" fill="#d946ef"/><text x="300" y="170" fill="#d946ef">V2 (35 ft)</text>
${FG.N(140,120,1)}${FG.N(140,100,2)}${FG.N(140,76,3)}${FG.N(20,130,4)}</svg>`,
 ['<b>V1</b> (decisión): por debajo puedes abortar el despegue; por encima, sigues aunque falle un motor.','<b>VR</b> (rotación): tiras suavemente para levantar el morro.','<b>V2</b>: velocidad segura de subida con un motor parado (hay que tenerla a 35 ft).','<b>Velocidad actual</b> en la ventana (aquí 150 kt); la cinta se mueve.'],'Valores y marcas simplificados: Airbus marca V1 con “1” y VR con un círculo; Boeing con “V1”, “VR”. Las cifras son de ejemplo.');
/* --- Instrumento de reserva --- */
FG.f.standby=FG.fig('Instrumento de reserva integrado (ISIS / ISFD)',`<svg viewBox="0 0 400 260" font-family="Arial" font-size="10"><rect width="400" height="260" rx="10" fill="#1e293b"/>
<rect x="110" y="20" width="180" height="200" rx="12" fill="#2b2f36"/><rect x="122" y="32" width="156" height="150" fill="#000"/>
<defs><clipPath id="isis"><rect x="150" y="45" width="100" height="125"/></clipPath></defs><g clip-path="url(#isis)"><rect x="150" y="45" width="100" height="70" fill="#3b82f6"/><rect x="150" y="115" width="100" height="70" fill="#92400e"/><line x1="150" y1="115" x2="250" y2="115" stroke="#fff"/></g>
<path d="M180 115 h12 l3 5 l3 -5 h12" stroke="#facc15" stroke-width="3" fill="none"/>
<rect x="124" y="45" width="26" height="125" fill="#3f3f46"/><text x="126" y="112" fill="#fff" font-size="9">250</text><rect x="250" y="45" width="26" height="125" fill="#3f3f46"/><text x="251" y="112" fill="#fff" font-size="8">5000</text>
<text x="200" y="178" text-anchor="middle" fill="#22d3ee" font-size="9">1013 hPa</text>
${['BARO','ILS','RST','+','−'].map((t,i)=>`<rect x="${126+i*31}" y="192" width="26" height="18" rx="3" fill="#475569"/><text x="${139+i*31}" y="205" text-anchor="middle" fill="#fff" font-size="8">${t}</text>`).join('')}
${FG.N(100,110,1)}${FG.N(200,60,2)}${FG.N(300,110,3)}${FG.N(200,240,4)}${FG.L(200,231,200,212)}</svg>`,
 ['<b>Velocidad</b> (cinta pequeña).','<b>Actitud</b>: horizonte artificial.','<b>Altitud</b> con su propio ajuste de presión.','<b>Botones</b>: ajuste BARO, mostrar ILS, etc.'],'Pequeña pantalla independiente con su propia fuente de datos y batería: si fallan las pantallas principales, sigues teniendo lo básico. Airbus lo llama ISIS; Boeing, ISFD.');
