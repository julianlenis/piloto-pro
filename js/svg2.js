/* Dibujos propios (ficticios / esquemáticos) para la Escuela v5 */
const SV2={};
/* Barba de viento: dir = de dónde viene, kt */
SV2.barb=(x,y,dir,kt,lb)=>{let s='',p=0,r=kt;const f=[];while(r>=50){f.push('P');r-=50;}while(r>=10){f.push('F');r-=10;}if(r>=5)f.push('H');
 f.forEach((k,i)=>{const yy=-40+p;if(k==='P'){s+=`<polygon points="0,${yy} 14,${yy-4} 0,${yy+8}" fill="#0f172a"/>`;p+=10;}else if(k==='F'){s+=`<line x1="0" y1="${yy}" x2="16" y2="${yy-6}" stroke="#0f172a" stroke-width="2"/>`;p+=6;}else{s+=`<line x1="0" y1="${yy+(f.length===1?6:0)}" x2="8" y2="${yy-3+(f.length===1?6:0)}" stroke="#0f172a" stroke-width="2"/>`;p+=6;}});
 return `<g transform="translate(${x},${y}) rotate(${dir})"><line x1="0" y1="0" x2="0" y2="-40" stroke="#0f172a" stroke-width="2"/>${s}<circle r="3" fill="#0f172a"/></g><text x="${x}" y="${y+18}" text-anchor="middle" font-size="10">${lb}</text>`;};
SV2.barbs=`<svg viewBox="0 0 400 230" font-family="Arial" font-size="10"><rect width="400" height="230" fill="#f8fafc"/>
<text x="10" y="16" font-weight="bold" font-size="12">BARBAS DE VIENTO (cómo leerlas)</text>
${SV2.barb(45,90,0,5,'000°/5 kt')}${SV2.barb(120,90,0,10,'000°/10 kt')}${SV2.barb(195,90,0,25,'000°/25 kt')}${SV2.barb(275,90,0,50,'000°/50 kt')}${SV2.barb(355,90,0,75,'000°/75 kt')}
${SV2.barb(70,190,270,15,'270°/15 kt (del oeste)')}${SV2.barb(200,190,90,35,'090°/35 kt (del este)')}${SV2.barb(330,190,225,60,'225°/60 kt (SW)')}
<text x="10" y="128" font-size="10" fill="#334155">media barba = 5 kt · barba entera = 10 kt · banderín = 50 kt · el mástil apunta DE DONDE VIENE el viento</text></svg>`;
SV2.sigwx=`<svg viewBox="0 0 400 260" font-family="Arial" font-size="10"><rect width="400" height="260" fill="#f8fafc"/>
<text x="10" y="16" font-weight="bold" font-size="12">MAPA SIGWX (ejemplo ficticio y simplificado)</text>
<path d="M30 230 C40 150 120 120 150 60 C170 30 210 40 230 70" fill="none" stroke="#0f172a" stroke-width="1" opacity=".25"/>
<path d="M60 70 q10 -12 20 0 q10 -12 20 0 q12 2 10 14 q12 6 2 16 q4 14 -10 12 q-6 12 -18 4 q-12 6 -16 -6 q-14 -2 -8 -14 q-10 -10 0 -18z" fill="#fecaca55" stroke="#dc2626" stroke-width="1.5"/>
<text x="66" y="90" fill="#b91c1c" font-weight="bold" font-size="8.5">ISOL EMBD</text><text x="80" y="101" fill="#b91c1c" font-weight="bold" font-size="8.5">CB</text><text x="68" y="112" fill="#b91c1c" font-size="8.5">XXX/080</text>
<path d="M190 150 L370 110" stroke="#2563eb" stroke-width="5"/><polygon points="370,110 356,104 358,118" fill="#2563eb"/>
<line x1="270" y1="132" x2="276" y2="118" stroke="#2563eb" stroke-width="2"/><line x1="276" y1="130" x2="282" y2="116" stroke="#2563eb" stroke-width="2"/><polygon points="285,128 291,112 295,126" fill="#2563eb"/>
<text x="230" y="160" fill="#1d4ed8" font-weight="bold">FL350 · 120 kt (corriente en chorro)</text>
<path d="M230 200 l10 -14 l10 14" fill="none" stroke="#0f172a" stroke-width="2"/><path d="M226 206 l14 -20 l14 20" fill="none" stroke="#0f172a" stroke-width="1"/>
<text x="262" y="198">Turbulencia moderada</text><text x="262" y="210">CAT 300/220 (FL300 a FL220)</text>
<path d="M60 170 l0 18 M54 176 l12 0 M52 188 l16 0" stroke="#0f172a" stroke-width="2"/><text x="76" y="182">Engelamiento</text><text x="76" y="194">moderado 140/XXX</text>
<rect x="320" y="30" width="56" height="34" fill="#fff" stroke="#0f172a"/><text x="348" y="44" text-anchor="middle">tropopausa</text><text x="348" y="58" text-anchor="middle" font-weight="bold">380</text>
<path d="M20 240 L180 240" stroke="#2563eb" stroke-width="2"/><polygon points="40,240 50,230 60,240" fill="#2563eb"/><polygon points="100,240 110,230 120,240" fill="#2563eb"/>
<path d="M200 240 L380 240" stroke="#dc2626" stroke-width="2"/><path d="M220 240 a8 8 0 0 1 16 0 M280 240 a8 8 0 0 1 16 0" fill="#dc2626"/>
<text x="60" y="255" fill="#1d4ed8">frente frío</text><text x="250" y="255" fill="#b91c1c">frente cálido</text></svg>`;
/* Carta de aproximación completa (ficticia) con MSA, espera y caja de mínimos */
SV2.iac=`<svg viewBox="0 0 400 420" font-family="Arial" font-size="9"><rect width="400" height="420" fill="#fff"/>
<rect x="4" y="4" width="392" height="30" fill="#f1f5f9" stroke="#0f172a"/><text x="10" y="18" font-weight="bold" font-size="11">LEXX · ILS Z RWY 30 (CARTA FICTICIA PARA ESTUDIO)</text><text x="10" y="29">LOC IXX 110.30 · CRS 300° · TWR 118.10 · Elev AD 82 ft · TA 6000 ft</text>
<g transform="translate(345,80)"><circle r="30" fill="none" stroke="#0f172a"/><line x1="0" y1="-30" x2="0" y2="30" stroke="#0f172a"/><line x1="0" y1="0" x2="30" y2="0" stroke="#0f172a"/><text x="-26" y="4" font-weight="bold">4600</text><text x="6" y="-8" font-weight="bold">2900</text><text x="6" y="14" font-weight="bold">3500</text><text x="-28" y="44">MSA 25 NM XX VOR</text></g>
<text x="300" y="70" font-size="8">000°</text><text x="300" y="100" font-size="8">090°</text>
<rect x="4" y="38" width="280" height="190" fill="none" stroke="#cbd5e1"/>
<line x1="40" y1="190" x2="250" y2="70" stroke="#0f172a" stroke-width="2"/><polygon points="40,190 48,182 52,190" fill="#0f172a"/>
<rect x="30" y="186" width="24" height="7" fill="#374151" transform="rotate(-30 42 190)"/><text x="20" y="210" font-weight="bold">RWY 30</text>
<polygon points="150,127 146,135 154,135" fill="#0f172a"/><text x="156" y="128" font-weight="bold">FAF XAMEX</text><text x="156" y="138">D6.0 IXX</text>
<ellipse cx="236" cy="78" rx="38" ry="14" fill="none" stroke="#0f172a" stroke-width="1.5" transform="rotate(-30 236 78)"/>
<text x="196" y="52" font-weight="bold">ESPERA en LUPAX</text>
<text x="252" y="66" font-weight="bold">LUPAX</text><text x="205" y="104">120° ← → 300°</text><text x="205" y="114">1 min · MHA 4000</text>
<path d="M60 175 L40 120 L40 70" fill="none" stroke="#0f172a" stroke-dasharray="4 3"/><text x="44" y="66">Frustrada</text>
<rect x="4" y="232" width="392" height="96" fill="none" stroke="#0f172a"/><text x="10" y="246" font-weight="bold">PERFIL</text>
<line x1="30" y1="310" x2="380" y2="310" stroke="#94a3b8"/><rect x="30" y="306" width="30" height="5" fill="#374151"/>
<path d="M370 262 L250 262 L60 306" fill="none" stroke="#0f172a" stroke-width="2"/><text x="252" y="256">XAMEX D6.0 · 2000 ft</text><text x="300" y="276">4000 →</text><text x="130" y="285">GS 3.0° · TCH 50 ft</text><text x="60" y="324">THR 82 ft</text>
<rect x="4" y="332" width="392" height="84" fill="#f8fafc" stroke="#0f172a"/><text x="10" y="346" font-weight="bold">MÍNIMOS (ejemplo ficticio)</text>
<line x1="4" y1="352" x2="396" y2="352" stroke="#0f172a"/>
<text x="10" y="366">CAT</text><text x="100" y="366">A</text><text x="170" y="366">B</text><text x="240" y="366">C</text><text x="310" y="366">D</text>
<text x="10" y="384">ILS DA(H)</text><text x="90" y="384" font-weight="bold">282 (200)</text><text x="160" y="384" font-weight="bold">282 (200)</text><text x="230" y="384" font-weight="bold">282 (200)</text><text x="300" y="384" font-weight="bold">282 (200)</text>
<text x="10" y="398">RVR</text><text x="90" y="398">550 m</text><text x="160" y="398">550 m</text><text x="230" y="398">550 m</text><text x="300" y="398">550 m</text>
<text x="10" y="411">LOC MDA(H)</text><text x="90" y="411">520 (438) 1300 m</text><text x="230" y="411">520 (438) 1500 m</text></svg>`;
SV2.hold=`<svg viewBox="0 0 400 230" font-family="Arial" font-size="10"><rect width="400" height="230" fill="#f8fafc"/>
<text x="10" y="16" font-weight="bold" font-size="12">ESPERA ESTÁNDAR (virajes a la derecha) y entradas</text>
<path d="M150 150 L280 150 A35 35 0 0 0 280 80 L150 80 A35 35 0 0 0 150 150" fill="none" stroke="#0f172a" stroke-width="2"/>
<polygon points="150,150 140,145 140,155" fill="#0f172a"/><circle cx="150" cy="150" r="5" fill="#dc2626"/><text x="130" y="170" fill="#b91c1c" font-weight="bold">FIJO</text>
<text x="185" y="166">tramo de acercamiento (1 min)</text><text x="185" y="74">tramo de alejamiento</text>
<line x1="150" y1="150" x2="40" y2="150" stroke="#2563eb" stroke-dasharray="4 3"/><text x="30" y="142" fill="#1d4ed8">rumbo de acercamiento →</text>
<path d="M150 150 L80 220" stroke="#16a34a" stroke-dasharray="3 3"/><path d="M150 150 L100 40" stroke="#16a34a" stroke-dasharray="3 3"/>
<text x="20" y="200" fill="#15803d" font-weight="bold">1 PARALELA (110°)</text><text x="20" y="60" fill="#15803d" font-weight="bold">2 GOTA / DESPLAZADA (70°)</text><text x="300" y="210" fill="#15803d" font-weight="bold">3 DIRECTA (180°)</text>
<text x="10" y="224" font-size="9" fill="#334155">Tiempo: 1 min hasta FL140 · 1,5 min por encima. Velocidad máx. OACI: 230 kt hasta 14.000 ft (170 kt cat. A/B), 240 kt hasta FL200, 265 kt hasta FL340.</text></svg>`;
/* LEMD esquema (no a escala) */
SV2.lemd=`<svg viewBox="0 0 400 300" font-family="Arial" font-size="10"><rect width="400" height="300" fill="#f8fafc"/>
<text x="10" y="16" font-weight="bold" font-size="12">LEMD Madrid-Barajas · ESQUEMA NO A ESCALA</text><text x="10" y="30" fill="#334155">Elevación ≈ 2.000 ft (≈ 610 m) · 4 pistas en 2 pares paralelos</text>
<text x="380" y="52" font-weight="bold" text-anchor="middle">N↑</text>
<rect x="260" y="50" width="14" height="210" fill="#374151"/><rect x="330" y="50" width="14" height="210" fill="#374151"/>
<text x="256" y="275" font-weight="bold">36L</text><text x="326" y="275" font-weight="bold">36R</text><text x="256" y="46" font-weight="bold">18R</text><text x="326" y="46" font-weight="bold">18L</text>
<line x1="60" y1="70" x2="200" y2="190" stroke="#374151" stroke-width="13"/><line x1="25" y1="110" x2="165" y2="230" stroke="#374151" stroke-width="13"/>
<text x="62" y="58" font-weight="bold">14L</text><text x="202" y="208" font-weight="bold">32R</text><text x="6" y="104" font-weight="bold">14R</text><text x="160" y="248" font-weight="bold">32L</text>
<rect x="210" y="232" width="190" height="62" fill="#fff" stroke="#0f172a"/><text x="216" y="246" font-weight="bold">Configuración NORTE</text><text x="216" y="260">Llegadas: 32L / 32R</text><text x="216" y="274">Salidas: 36L / 36R</text><text x="216" y="288" fill="#64748b">SUR: llegan 18L/18R, salen 14L/14R</text></svg>`;
/* Perfil de descenso T/D */
SV2.tod=`<svg viewBox="0 0 400 200" font-family="Arial" font-size="10"><rect width="400" height="200" fill="#f8fafc"/>
<text x="10" y="16" font-weight="bold" font-size="12">PUNTO DE INICIO DEL DESCENSO (T/D) — regla del 3</text>
<line x1="10" y1="40" x2="140" y2="40" stroke="#0f172a" stroke-width="2"/><path d="M140 40 L360 170" stroke="#0f172a" stroke-width="2"/><line x1="20" y1="172" x2="390" y2="172" stroke="#94a3b8"/>
<circle cx="140" cy="40" r="5" fill="#dc2626"/><text x="120" y="32" fill="#b91c1c" font-weight="bold">T/D</text><text x="20" y="34">FL350 (35.000 ft)</text>
<text x="345" y="188">Aeropuerto (≈0 ft)</text><text x="160" y="125">35.000 ÷ 1.000 × 3 ≈ 105 NM</text><text x="160" y="140">Velocidad vertical ≈ GS × 5 (≈ 3°)</text><text x="160" y="155">Ej.: 440 kt × 5 ≈ 2.200 ft/min</text></svg>`;
