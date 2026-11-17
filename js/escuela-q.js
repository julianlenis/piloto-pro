/* Escuela v5: banco ampliado de preguntas */
(()=>{const E=PP.courses.find(c=>c.id==='escuela');const add=(id,qs)=>E.modules.find(m=>m.id===id).quiz.push(...qs.map(([q,o,e])=>({q,o,a:0,e})));
add('m1',[
["¿Qué superficie de mando controla el alabeo (inclinar las alas)?",["Los alerones","El timón de profundidad","El timón de dirección"],"Los alerones, en las puntas de las alas, suben en un lado y bajan en el otro para alabear."],
["Para subir el morro, el piloto tira de la palanca y se mueve…",["El timón de profundidad (elevador)","El timón de dirección","Los flaps"],"El elevador, en el estabilizador horizontal, controla el cabeceo."],
["¿Para qué sirven los flaps al despegar y aterrizar?",["Para dar más sustentación a baja velocidad","Para frenar el avión en el suelo únicamente","Para girar en la calle de rodaje"],"Los flaps aumentan la curvatura y la superficie del ala: más sustentación a velocidades bajas."],
["Si el ángulo de ataque es excesivo, el ala…",["Entra en pérdida y pierde sustentación bruscamente","Genera cada vez más sustentación sin límite","Aumenta la velocidad del avión automáticamente"],"Por encima del ángulo crítico el flujo se separa: pérdida (stall)."],
["¿Qué indica el variómetro (VS) en el PFD?",["La velocidad vertical en pies por minuto","La velocidad respecto al suelo","La temperatura exterior"],"Muestra cuántos pies por minuto subes o bajas."],
["Un nudo (kt) equivale a…",["Una milla náutica por hora (≈1,852 km/h)","Un kilómetro por hora","Una milla terrestre por hora"],"1 kt = 1 NM/h = 1,852 km/h."]]);
add('m2',[
["¿Cómo se dice la letra “W” en radio?",["Whiskey","Washington","Wilson"],"W = Whiskey."],
["El código de transpondedor para emergencia es…",["7700","7600","7500"],"7700 emergencia, 7600 fallo de radio, 7500 interferencia ilícita."],
["El código 7600 significa…",["Fallo de comunicaciones (radio)","Emergencia general","Vuelo VFR normal"],"7600 = fallo de radio."],
["“Readback” significa…",["Colacionar: repetir la autorización para confirmarla","Pedir que el controlador repita","Cambiar de frecuencia"],"Se colacionan autorizaciones, pistas, niveles, rumbos, frecuencias, códigos y QNH."],
["¿Cómo se pronuncia el número 9 en radio?",["NINER","NAIN","NUEVE-NUEVE"],"Se dice “niner” para no confundirlo con “nein” (no, en alemán)."],
["“Wilco” significa…",["Recibido y cumpliré","No entendido, repita","Espere"],"WILCO = will comply."]]);
add('m3',[
["En una barba de viento, un banderín (triángulo) vale…",["50 kt","10 kt","5 kt"],"Banderín 50 kt, barba entera 10 kt, media barba 5 kt."],
["Un banderín, dos barbas enteras y media barba suman…",["75 kt","65 kt","57 kt"],"50 + 10 + 10 + 5 = 75 kt."],
["El mástil de una barba de viento apunta…",["Hacia de dónde viene el viento","Hacia donde va el viento","Siempre hacia el norte"],"Como en el METAR: dirección DE la que sopla."],
["En un mapa SIGWX, “EMBD CB” significa…",["Cumulonimbos embebidos en otras nubes, difíciles de ver","Cumulonimbos aislados y bien visibles","Ausencia de tormentas"],"EMBD = embedded: escondidos dentro de otras capas, peligrosos sin radar."],
["“CAT” en un mapa significa…",["Turbulencia en aire claro","Categoría de aproximación","Nubes y techo correctos"],"Clear Air Turbulence: turbulencia sin nubes, típica cerca de la corriente en chorro."],
["La línea con triángulos azules en un mapa es…",["Un frente frío","Un frente cálido","Una corriente en chorro"],"Frente frío: triángulos azules. Cálido: semicírculos rojos."],
["“VV002” en un METAR indica…",["Visibilidad vertical de 200 ft (cielo oscurecido, p. ej. niebla)","Viento variable de 2 kt","Visibilidad de 200 m en pista"],"VV = visibilidad vertical en cientos de pies."]]);
add('m4',[
["El código Q “QMRLC” significa…",["Pista cerrada","Calle de rodaje cerrada","ILS fuera de servicio"],"MR = pista; LC = cerrada."],
["El código Q “QICAS” significa…",["ILS fuera de servicio","Pista cerrada por obras","Zona restringida activada"],"IC = ILS; AS = unserviceable (fuera de servicio)."],
["En un NOTAM, “U/S” significa…",["Fuera de servicio","Sin restricciones","Uso solo militar"],"U/S = unserviceable."],
["El campo C) de un NOTAM indica…",["La fecha y hora de fin de validez","El lugar afectado","El texto del aviso"],"A) lugar, B) inicio, C) fin, D) horario, E) texto, F/G) límites."],
["“NOTAMR” significa que el NOTAM…",["Reemplaza a otro anterior","Es nuevo","Cancela a otro anterior"],"N nuevo, R reemplaza, C cancela."],
["En la línea Q, el tráfico “IV” indica que afecta a…",["Vuelos IFR y VFR","Solo vuelos internacionales","Solo vuelos VFR"],"I = IFR, V = VFR, IV = ambos."]]);
add('m5',[
["La MSA garantiza un margen sobre obstáculos de…",["1.000 ft dentro de 25 NM","500 ft dentro de 10 NM","2.000 ft dentro de 50 NM"],"MSA: 1.000 ft (300 m) de margen en un radio de 25 NM del punto de referencia."],
["En una caja de mínimos, “DA(H) 282 (200)” significa…",["Altitud de decisión 282 ft sobre el mar, 200 ft sobre el umbral","Altitud 200 ft y altura 282 ft","Distancia de 282 m y visibilidad de 200 m"],"DA es altitud (sobre el nivel del mar); el número entre paréntesis es la altura sobre el umbral."],
["Una espera estándar tiene virajes…",["A la derecha","A la izquierda","Alternos derecha-izquierda"],"Estándar: a la derecha. Si es a la izquierda, la carta lo indica."],
["Por debajo de FL140, cada tramo de acercamiento de una espera dura…",["1 minuto","1,5 minutos","3 minutos"],"1 min hasta FL140; 1,5 min por encima."],
["En LEMD con configuración norte, se aterriza normalmente por…",["32L/32R","36L/36R","14L/14R"],"Norte: llegadas 32L/32R, salidas 36L/36R."],
["En LEMD con configuración sur, se despega normalmente por…",["14L/14R","18L/18R","32L/32R"],"Sur: llegadas 18L/18R, salidas 14L/14R."],
["La elevación aproximada de Madrid-Barajas es…",["Unos 2.000 ft","Unos 200 ft","Unos 6.000 ft"],"Unos 2.000 ft (≈610 m)."]]);
add('m6',[
["El MZFW es…",["El peso máximo sin combustible","El peso máximo al aterrizar","El peso máximo de rodaje"],"Maximum Zero Fuel Weight: limita lo que puedes cargar en pasajeros y carga."],
["Si el centro de gravedad está muy adelantado, el avión…",["Necesita más fuerza para rotar y levantar el morro","Se vuelve inestable en cabeceo","Consume menos combustible siempre"],"CG adelantado: más estable pero más pesado de mandos y más resistencia."],
["Si el CG está demasiado atrasado…",["El avión puede ser inestable y difícil de controlar","El avión es más estable","No pasa nada si va con piloto automático"],"Un CG muy atrasado reduce la estabilidad: es peligroso."],
["El “brazo” en un cálculo de centrado es…",["La distancia desde un punto de referencia","El peso de cada pasajero","La envergadura del avión"],"Momento = peso × brazo."],
["El “momento” se calcula como…",["Peso × brazo","Peso ÷ brazo","Brazo − peso"],"Sumando momentos y dividiendo por el peso total se obtiene el CG."],
["El CG suele expresarse en…",["% de la cuerda aerodinámica media (%MAC)","Grados","Kilogramos"],"Se usa %MAC."]]);
add('m7',[
["Con TAS 450 kt y 30 kt de viento en cara, la GS es…",["420 kt","480 kt","450 kt"],"GS = TAS − viento de cara = 420 kt."],
["¿Cuánto se tarda en recorrer 140 NM a 420 kt de GS?",["20 minutos","30 minutos","14 minutos"],"140 ÷ 420 × 60 = 20 min."],
["Despegas a las 10:05 UTC y tardas 48 min. ¿ETA?",["10:53 UTC","10:48 UTC","11:05 UTC"],"10:05 + 0:48 = 10:53 UTC."],
["La contingencia habitual es…",["Un 5 % del trip (con un mínimo)","Un 50 % del trip","Siempre 30 minutos fijos"],"Normalmente 5 % del trip, con un mínimo (p. ej. 5 min de espera)."],
["Consumo 2.400 kg/h y 45 min de vuelo. ¿Trip aproximado?",["1.800 kg","2.400 kg","1.200 kg"],"2.400 × 0,75 = 1.800 kg."],
["El combustible de alternativo sirve para…",["Ir del destino al aeropuerto alternativo","Rodar hasta la pista","Esperar en el destino 30 minutos"],"Cubre la frustrada en destino y el vuelo al alternativo."]]);
add('m8',[
["En el EFB se calculan normalmente…",["Las prestaciones de despegue y aterrizaje","Los códigos del transpondedor","La presión de los neumáticos"],"El EFB tiene herramientas de performance (velocidades, flaps, empuje reducido)."],
["El briefing de salida incluye…",["Pista, SID, altitud inicial, frecuencias y qué hacer en un fallo","Solo la hora de llegada","El menú de los pasajeros"],"Repasa la salida y las acciones ante un fallo de motor."],
["El ATIS es…",["Una emisión grabada con la información del aeropuerto","Un sistema anticolisión","Un tipo de NOTAM"],"Automatic Terminal Information Service: pista, viento, visibilidad, QNH… Cada versión tiene una letra."],
["Si el ATIS cambia de letra antes de despegar…",["Hay que escuchar la nueva información","Se ignora porque ya tienes autorización","Hay que cancelar el vuelo"],"Indica información nueva: escúchala y comunica la letra al ATC."],
["SimBrief sirve para…",["Generar un OFP con ruta, combustible y pesos","Pilotar el avión automáticamente","Hablar con el control real"],"Herramienta gratuita de planificación para simulador."],
["Antes de usar el EFB para el despegue necesitas…",["Pista, viento, temperatura, QNH y peso","Solo el número de vuelo","El nombre del comandante"],"Las prestaciones dependen de pista, meteo y peso."]]);
add('m9',[
["Regla del 3: ¿a cuántas NM empiezas a bajar de FL300 al nivel del mar?",["Unas 90 NM","Unas 30 NM","Unas 300 NM"],"30 × 3 = 90 NM (más un margen para reducir)."],
["Para una senda de unos 3° con 140 kt de GS, la VS es aprox…",["700 ft/min","1.400 ft/min","300 ft/min"],"VS ≈ GS × 5 = 700 ft/min."],
["¿Qué significa T/D?",["Top of descent: inicio del descenso","Take-off distance","Touchdown"],"Top of Descent."],
["¿Qué significa T/C?",["Top of climb: fin de la subida","Torre de control","Temperatura de crucero"],"Top of Climb."],
["Antes del descenso hay que preparar…",["La llegada: STAR, aproximación, mínimos y briefing","El despegue del día siguiente","La puerta de embarque de salida"],"Se prepara la llegada unos 10–15 min antes del T/D."],
["¿Por qué se añade margen a la regla del 3?",["Para reducir velocidad durante el descenso","Para gastar más combustible","Porque el FMS siempre se equivoca"],"Hay que decelerar (p. ej. 250 kt bajo FL100) y configurar el avión."]]);
})();
