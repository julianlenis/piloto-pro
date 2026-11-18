/* Coloca las ilustraciones en las lecciones y añade el zoom — Piloto Pro by Julián Lenis */
(function(){
 const F=FG.f,L=(c,m,l)=>{const co=PP.courses.find(x=>x.id===c);const mo=co&&co.modules.find(x=>x.id===m);return mo&&mo.lessons.find(x=>x.id===l);};
 // pos: 'start' | 'end' | texto ancla (se inserta justo después; si no existe, al final)
 const ins=(k,pos,...figs)=>{const [c,m,l]=k.split('/'),ls=L(c,m,l);if(!ls)return;const h=figs.join('');
  if(pos==='start')ls.html=h+ls.html;else if(pos==='end'||ls.html.indexOf(pos)<0)ls.html+=h;else{const i=ls.html.indexOf(pos)+pos.length;ls.html=ls.html.slice(0,i)+h+ls.html.slice(i);}};
 // Escuela: lección nueva con los seis instrumentos
 const esc=PP.courses.find(x=>x.id==='escuela'),m1=esc&&esc.modules.find(x=>x.id==='m1');
 if(m1&&!m1.lessons.find(x=>x.id==='l3'))m1.lessons.push({id:'l3',title:'Los instrumentos uno a uno (con imágenes)',html:`
<p>Antes de las pantallas, los aviones llevaban <b>seis instrumentos redondos</b>: el famoso “six pack”. Hoy siguen en las avionetas y su información es la misma que verás en el PFD de un Airbus o un Boeing. Mira cada imagen: los <b>números amarillos</b> coinciden con la lista de debajo.</p>
${F.six}<h3>1. Anemómetro (velocidad)</h3><p>Te dice a qué velocidad pasa el aire por el avión, en nudos. Los arcos de colores marcan los márgenes seguros.</p>${F.asi}
<h3>2. Horizonte artificial (actitud)</h3><p>El instrumento más importante: muestra si el morro está arriba o abajo y si estás inclinado.</p>${F.ai}
<h3>3. Altímetro</h3><p>Mide la presión del aire para calcular a qué altura estás. Por eso hay que ajustarlo (QNH o STD).</p>${F.alt}
<h3>4. Coordinador de viraje</h3><p>Indica hacia dónde giras y si el viraje es “limpio” (bola centrada).</p>${F.tc}
<h3>5. Indicador de rumbo / HSI</h3><p>Una brújula estable que te dice hacia dónde apunta el morro.</p>${F.hi}
<h3>6. Variómetro (velocidad vertical)</h3><p>Cuántos pies por minuto subes o bajas.</p>${F.vsi}
<h3>Y si fallan las pantallas…</h3><p>Los reactores llevan un instrumento de reserva independiente con lo básico.</p>${F.standby}
<div class="box tip"><b>💡 Truco</b>En el PFD encontrarás todo esto junto: velocidad a la izquierda, actitud en el centro, altitud a la derecha, velocidad vertical al lado y rumbo abajo.</div>`});
 ins('escuela/m1/l2','</ul>',F.pfdA,F.pfdB);
 ins('escuela/m1/l2','con presión estándar.</p>',F.altitudes,F.alt);
 ins('escuela/m1/l2','end',F.vspeeds);
 ins('escuela/m9/l2','end',F.mcdu,F.cdu);
 ins('escuela/m9/l3','end',F.ndA);
 // A320
 ins('a320/m1/l2','start',F.cockA320);
 ins('a320/m1/l2','<h3>Código de colores Airbus</h3>',F.overhead,F.pedA);
 ins('a320/m1/l2','end',F.pfdA,F.ndA,F.ewd,F.standby);
 ins('a320/m3/l1','</p>',F.fcu);
 ins('a320/m3/l1','<h3>Modos que leerás en el FMA</h3>',F.pfdA);
 ins('a320/m3/l1','<h3>Palancas de gases (thrust levers)</h3>',F.pedA);
 ins('a320/m5/l1','</p>',F.mcdu);
 ins('a320/m5/l2','<h3>Despegue</h3>',F.vspeeds);
 ins('a320/m5/l2','<h3>Aproximación</h3>',F.gear);
 // 787
 ins('b787/m1/l2','start',F.cock787);
 ins('b787/m1/l2','end',F.pfdB,F.ndB,F.eicas,F.overhead,F.pedB);
 ins('b787/m3/l1','</p>',F.mcp);
 ins('b787/m3/l1','<h3>Modos del autothrottle en el FMA</h3>',F.pfdB);
 ins('b787/m5/l1','start',F.cdu);
 // 737
 ins('b737/m1/l1','<h3>Diferencias con Airbus</h3>',F.cock737);
 ins('b737/m1/l2','start',F.overhead);
 ins('b737/m1/l2','<h3>Flaps</h3>',F.ped737);
 ins('b737/m1/l2','end',F.gear);
 ins('b737/m2/l1','start',F.cdu);
 ins('b737/m2/l1','<h3>MCP del 737</h3>',F.mcp737);
 ins('b737/m4/l2','start',F.mcp737,F.pfdB);
 // A350
 ins('a350/m3/l1','start',F.cockA350);
 ins('a350/m3/l1','end',F.pfdA,F.fcu,F.ndA,F.ewd);
 // 777
 ins('b777/m1/l1','<h3>Cabina</h3>',F.cock777,F.eicas);
 ins('b777/m3/l1','start',F.mcp,F.pfdB);
 ins('b777/m5/l1','start',F.cdu);
 // Zoom al tocar una imagen
 if(typeof document==='undefined')return;
 let z=1,ov=null;
 const close=()=>{if(ov){ov.remove();ov=null;document.body.style.overflow='';}};
 const open=fs=>{close();z=1;const t=(fs.closest('.fig').querySelector('figcaption b')||{}).textContent||'';
  ov=document.createElement('div');ov.className='zov';ov.innerHTML=`<div class="zbar"><span>${t}</span><button data-z="-1" aria-label="Alejar">－</button><button data-z="1" aria-label="Acercar">＋</button><button data-z="0" aria-label="Cerrar">✕</button></div><div class="zsc"><div class="zin">${fs.innerHTML}</div></div>`;
  // ids únicos para que el clipPath del SVG copiado funcione
  ov.querySelectorAll('[id]').forEach(e=>{const o=e.id,n='z'+o;e.id=n;ov.querySelectorAll('[clip-path],[fill],[marker-end]').forEach(x=>['clip-path','fill','marker-end'].forEach(a=>{const v=x.getAttribute(a);if(v==='url(#'+o+')')x.setAttribute(a,'url(#'+n+')');}));});
  document.body.appendChild(ov);document.body.style.overflow='hidden';
  ov.addEventListener('click',e=>{const b=e.target.closest('button');if(!b){if(e.target===ov)close();return;}const d=+b.dataset.z;if(!d)return close();z=Math.min(4,Math.max(1,z+d*0.5));ov.querySelector('.zin').style.width=(z*100)+'%';});};
 document.addEventListener('click',e=>{const fs=e.target.closest&&e.target.closest('.fig .fsv');if(fs)open(fs);});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
 window.addEventListener('hashchange',close);
})();
