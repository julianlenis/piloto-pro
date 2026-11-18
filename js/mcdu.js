/* Simulador didáctico de MCDU (Airbus) y CDU (Boeing) — Piloto Pro by Julián Lenis.
   Simplificado para aprender: páginas, datos y procedimientos son de EJEMPLO (no reales). */
const MC={cur:null,list:[]};
(function(){
const sp=(c,t)=>`<span class="${c}">${t}</span>`,g=t=>sp('g',t),c=t=>sp('c',t),a=t=>sp('a',t),w=t=>sp('w',t),y=t=>sp('y',t),m=t=>sp('m',t),s=t=>sp('s',t);
const clone=o=>JSON.parse(JSON.stringify(o));
// Datos de EJEMPLO
const DB={rwyD:['14L','14R','36L','36R'],sid:{ALFA1A:['ALFA'],BRAVO1A:['BRAVO']},appr:['ILS24R','RNV24L','ILS06L'],star:{ECHO1C:['ECHO','GOLF'],KILO1C:['KILO','GOLF']},
 wpt:['ALFA','BRAVO','DELTA','ECHO','GOLF','KILO','LIMA'],vor:{PPV:'114.10',PPN:'116.70'},gps:'N40°28.3 W003°34.0'};
MC.DB=DB;
const blank=mo=>({m:mo,pg:mo==='a'?'init':'ident',sp:'',msg:'',f:{},fp:null,tmp:null,lr:null,dep:{},arr:{},dsel:null,off:0,ph:0,mod:false,legs:null,done:{}});
MC.blank=blank;
/* ---------- Airbus ---------- */
const A={};
const fpBase=st=>{const [o,d]=st.f.ft.split('/');st.fp=[{n:o,k:'o'},{k:'d'},{n:d,k:'e'}];};
const fpRows=st=>st.tmp||st.fp||[];
A.init={t:st=>'INIT',arrows:1,
 r:st=>[['CO RTE',a('□□□□□□□□□□'),'FROM/TO',st.f.ft?c(st.f.ft):a('□□□□/□□□□')],['ALTN/CO RTE',st.f.altn?c(st.f.altn):c('----/----------'),'',''],['FLT NBR',st.f.flt?c(st.f.flt):a('□□□□□□□□'),'',''],['LAT','----.-','LONG','-----.-'],['COST INDEX',st.f.ci?c(st.f.ci):a('□□□'),'WIND/TEMP',w('WIND/TEMP>')],['CRZ FL/TEMP',st.f.crz?c(st.f.crz):a('□□□□□/□□□°'),'TROPO',c('36090')]],
 k:{R1:(st,v)=>{if(!/^[A-Z]{4}\/[A-Z]{4}$/.test(v))return 'FORMAT ERROR';st.f.ft=v;fpBase(st);},
  L2:(st,v)=>{if(!/^[A-Z]{4}$/.test(v))return 'FORMAT ERROR';st.f.altn=v+'/NONE';},
  L3:(st,v)=>{if(!/^[A-Z0-9]{2,8}$/.test(v))return 'FORMAT ERROR';st.f.flt=v;},
  L5:(st,v)=>{if(!/^\d{1,3}$/.test(v))return 'FORMAT ERROR';if(+v>999)return 'ENTRY OUT OF RANGE';st.f.ci=v;},
  L6:(st,v)=>{const x=v.replace(/^FL/,'');if(!/^\d{2,3}$/.test(x))return 'FORMAT ERROR';if(+x>398)return 'ENTRY OUT OF RANGE';st.f.crz='FL'+x.padStart(3,'0')+'/-55°';}}};
const tow=st=>st.f.zfw&&st.f.blk?(+st.f.zfw.split('/')[0]+(+st.f.blk)-0.2).toFixed(1):'---.-';
A.initb={t:st=>'INIT B (pesos y combustible)',arrows:1,
 r:st=>{const ok=st.f.zfw&&st.f.blk;return [['TAXI',c('0.2'),'ZFW/ZFWCG',st.f.zfw?c(st.f.zfw):a('□□.□/□□.□')],['TRIP/TIME',ok?g('4.1/0105'):'---.-/----','BLOCK',st.f.blk?c(st.f.blk):a('□□.□')],['RTE RSV/%',ok?c('0.2/5.0'):'---.-/5.0','',''],['ALTN/TIME',ok?g('1.3/0030'):'---.-/----','TOW',ok?g(tow(st)):'---.-'],['FINAL/TIME',c('1.4/0030'),'LW',ok?g((+tow(st)-4.1).toFixed(1)):'---.-'],['EXTRA/TIME',ok?g((st.f.blk-0.2-4.1-0.2-1.3-1.4).toFixed(1)+'/0040'):'---.-/----','','']];},
 k:{R1:(st,v)=>{if(!/^\d{2}(\.\d)?\/\d{2}(\.\d)?$/.test(v))return 'FORMAT ERROR';st.f.zfw=v;},
  R2:(st,v)=>{if(!/^\d{1,2}(\.\d)?$/.test(v))return 'FORMAT ERROR';if(+v<5)return 'ENTRY OUT OF RANGE';st.f.blk=v;}}};
const nm=x=>x.k==='d'?null:x.n;
A.fpln={t:st=>st.tmp?y('TMPY F-PLN'):(st.fp?'FROM':'F-PLN'),
 r:st=>{const L=fpRows(st);if(!L.length)return [['','',' ',''],['',w('NO F-PLN'),'',''],['','','',''],['','','',''],['','','',''],['','','','']];
  const col=st.tmp?y:(i=>i===1?w:g);const rows=[];for(let i=0;i<5;i++){const x=L[st.off+i];if(!x){rows.push(['',i===0||L[st.off+i-1]?w('-- END OF F-PLN --'):'','',''].map((v,j)=>j===1&&(st.off+i)!==L.length?'':v));continue;}
   if(x.k==='d'){rows.push(['',w('- F-PLN DISCONTINUITY -'),'','']);continue;}const ci=st.tmp?y:((st.off+i)===1?w:g);
   rows.push([i===0&&st.off===0?'':s(x.c||''),ci(x.n),i===0&&st.off===0?'SPD/ALT':'',ci(x.alt||'---/-----')]);}
  const d=L.find(x=>x.k==='e');rows.push(st.tmp?[a('ERASE'),a('*ERASE'),'',a('INSERT*')]:['DEST    TIME  DIST  EFOB',w((d?d.n:'----')+'  11:58  260  3.2'),'','']);return rows;},
 k:{any:(st,side,i,v)=>{const L=fpRows(st);if(i===6){if(st.tmp&&side==='R'){st.fp=st.tmp;st.tmp=null;return;}if(st.tmp&&side==='L'){st.tmp=null;return;}return;}
  const idx=st.off+i-1,x=L[idx];if(!x)return 'NOT ALLOWED';
  if(v==='CLR'){if(x.k==='d'){L.splice(idx,1);return;}if(x.k==='w'){L.splice(idx,1,{k:'d'});return;}return 'NOT ALLOWED';}
  if(v){if(!DB.wpt.includes(v))return 'NOT IN DATA BASE';const T=clone(L);T.splice(idx,0,{n:v,k:'w'});st.tmp=T;return;}
  if(side==='L'&&x.k!=='d'){st.lr=idx;st.pg='latrev';return;}return 'NOT ALLOWED';}}};
A.latrev={t:st=>{const x=fpRows(st)[st.lr]||{};return 'LAT REV FROM '+(x.n||'');},
 r:st=>{const x=fpRows(st)[st.lr]||{};return [[ '',x.k==='o'?w('<DEPARTURE'):'','',x.k==='e'?w('ARRIVAL>'):''],['',w('<HOLD'),'',''],[x.k!=='e'?'NEXT WPT':'',x.k!=='e'?c('[    ]'):'','NEW DEST',c('[    ]')],['','','',''],['','','',''],['',w('<RETURN'),'','']];},
 k:{L1:st=>{const x=fpRows(st)[st.lr];if(x.k!=='o')return 'NOT ALLOWED';st.pg='dep';st.dsel={};},
  R1:st=>{const x=fpRows(st)[st.lr];if(x.k!=='e')return 'NOT ALLOWED';st.pg='arr';st.dsel={};},
  L3:(st,v)=>{if(!v)return 'NOT ALLOWED';if(!DB.wpt.includes(v))return 'NOT IN DATA BASE';const T=clone(fpRows(st));T.splice(st.lr+1,0,{n:v,k:'w'});st.tmp=T;st.pg='fpln';},
  L6:st=>{st.pg='fpln';}}};
A.dep={t:st=>'DEPARTURES FROM '+(st.fp?st.fp[0].n.slice(0,4):''),
 r:st=>{const d=st.dsel||{},list=!d.rwy?DB.rwyD.map(r=>w('<'+r)+s(' ILS')):!d.sid?Object.keys(DB.sid).map(x=>w('<'+x)):[];const r=[['RWY  SID  TRANS',(d.rwy?y(d.rwy):'---')+'  '+(d.sid?y(d.sid):'------'),'','']];
  r.push([!d.rwy?'AVAILABLE RUNWAYS':(!d.sid?'SIDS':''),list[0]||'','','']);for(let i=1;i<4;i++)r.push(['',list[i]||'','','']);r.push(d.sid?['',a('<ERASE'),'',a('INSERT*')]:['',w('<RETURN'),'','']);return r;},
 k:{any:(st,side,i)=>{const d=st.dsel;if(i===6){if(side==='R'&&d.sid){const T=clone(st.fp);T[0].n=T[0].n.slice(0,4)+d.rwy;T.splice(1,0,...DB.sid[d.sid].map(n=>({n,k:'w'})));st.fp=T;st.dep={...d};st.dsel=null;st.pg='fpln';st.off=0;return;}st.pg='fpln';st.dsel=null;return;}
  if(side!=='L'||i<2)return 'NOT ALLOWED';const j=i-2;if(!d.rwy){if(!DB.rwyD[j])return;d.rwy=DB.rwyD[j];return;}if(!d.sid){const k=Object.keys(DB.sid)[j];if(k)d.sid=k;}}}};
A.arr={t:st=>'ARRIVAL TO '+(st.fp?st.fp.find(x=>x.k==='e').n.slice(0,4):''),
 r:st=>{const d=st.dsel||{},list=!d.appr?DB.appr.map(x=>w('<'+x)):!d.star?Object.keys(DB.star).map(x=>w('<'+x)):[];const r=[['APPR    VIA    STAR',(d.appr?y(d.appr):'------')+'  '+(d.star?y(d.star):'------'),'','']];
  r.push([!d.appr?'APPR AVAILABLE':(!d.star?'STARS':''),list[0]||'','','']);for(let i=1;i<4;i++)r.push(['',list[i]||'','','']);r.push(d.star?['',a('<ERASE'),'',a('INSERT*')]:['',w('<RETURN'),'','']);return r;},
 k:{any:(st,side,i)=>{const d=st.dsel;if(i===6){if(side==='R'&&d.star){const T=clone(st.fp),e=T.findIndex(x=>x.k==='e');T[e].n=T[e].n.slice(0,4)+d.appr.slice(-3);T.splice(e,0,...(T[e-1]&&T[e-1].k==='d'?[]:[{k:'d'}]),...DB.star[d.star].map(n=>({n,k:'w'})));st.fp=T;st.arr={...d};st.dsel=null;st.pg='fpln';st.off=0;return;}st.pg='fpln';st.dsel=null;return;}
  if(side!=='L'||i<2)return 'NOT ALLOWED';const j=i-2;if(!d.appr){if(DB.appr[j])d.appr=DB.appr[j];return;}if(!d.star){const k=Object.keys(DB.star)[j];if(k)d.star=k;}}}};
A.radnav={t:()=>'RADIO NAV',r:st=>[['VOR1/FREQ',st.f.vor1?c(st.f.vor1):c('[ ]/[  .  ]'),'FREQ/VOR2',st.f.vor2?c(st.f.vor2):c('[  .  ]/[ ]')],['CRS','[ ]','CRS','[ ]'],['ILS /FREQ',st.arr.appr?m('IBL/110.30'):c('[  ]/[  .  ]'),'',''],['CRS',st.arr.appr?m('246'):'[ ]','',''],['ADF1/FREQ',c('[ ]/[    ]'),'FREQ/ADF2',c('[    ]/[ ]')],['','','','']],
 k:{L1:(st,v)=>{if(DB.vor[v]){st.f.vor1=v+'/'+DB.vor[v];return;}if(/^1[01]\d\.\d{1,2}$/.test(v)){st.f.vor1='/'+v;return;}return /^[A-Z]{2,3}$/.test(v)?'NOT IN DATA BASE':'FORMAT ERROR';},
  R1:(st,v)=>{if(DB.vor[v]){st.f.vor2=DB.vor[v]+'/'+v;return;}return 'NOT IN DATA BASE';}}};
const PH=['TAKE OFF','CLB','CRZ','DES','APPR'];
const spd=(st,k)=>st.f[k]?c(st.f[k]):a('□□□');
A.perf={t:st=>PH[st.ph]+(st.ph===0&&st.dep.rwy?'  RWY '+st.dep.rwy:''),
 r:st=>{const nx=st.ph<4?w('NEXT PHASE>'):'',pv=st.ph>0?w('<PREV PHASE'):'';
  if(st.ph===0)return [['V1',spd(st,'v1'),'RWY',g(st.dep.rwy||'---')],['VR',spd(st,'vr'),'TO SHIFT','[M][  ]'],['V2',spd(st,'v2'),'FLAPS/THS',st.f.fl?c(st.f.fl):a('[ ]/[    ]')],['TRANS ALT',c('6000'),'FLEX TO TEMP',st.f.flex?c(st.f.flex+'°'):c('[  ]°')],['THR RED/ACC',c('1500/1500'),'ENG OUT ACC',c('1500')],['',pv,'NEXT',nx]];
  if(st.ph<4){const x=[['ACT MODE',g('MANAGED'),'',''],['CI',c(st.f.ci||'30'),'',''],['MANAGED',g(['250/.78','.78','.78/280'][st.ph-1]),'',''],['PRESEL',c('[ ]'),'',''],['','','',''],['',pv,'NEXT',nx]];return x;}
  return [['QNH',st.f.qnh?c(st.f.qnh):a('□□□□'),'',''],['TEMP',st.f.tmp?c(st.f.tmp+'°'):c('[ ]°'),'BARO',st.f.baro?c(st.f.baro):c('[    ]')],['MAG WIND',st.f.wind?c(st.f.wind):c('[ ]°/[ ]'),'RADIO',c('[    ]')],['TRANS FL',c('FL070'),'LDG CONF',st.f.conf==='3'?c('CONF3*')+' '+s('FULL'):c('FULL')+' '+s('*CONF3')],['VAPP',g('137'),'',''],['',pv,'','']];},
 k:{any:(st,side,i,v)=>{if(i===6){if(side==='R'&&st.ph<4){st.ph++;return;}if(side==='L'&&st.ph>0){st.ph--;return;}return 'NOT ALLOWED';}
  if(st.ph===0){const key=side+i;
   if(/^L[123]$/.test(key)){if(!/^\d{3}$/.test(v))return 'FORMAT ERROR';if(+v<100||+v>200)return 'ENTRY OUT OF RANGE';st.f[['v1','vr','v2'][i-1]]=v;const {v1,vr,v2}=st.f;if(v1&&vr&&+v1>+vr||vr&&v2&&+vr>+v2||v1&&v2&&+v1>+v2)return 'V1/VR/V2 DISAGREE';return;}
   if(key==='R3'){if(!/^[123]\/(UP|DN)\d\.\d$/.test(v))return 'FORMAT ERROR';st.f.fl=v;return;}
   if(key==='R4'){if(!/^\d{2}$/.test(v))return 'FORMAT ERROR';if(+v>70)return 'ENTRY OUT OF RANGE';st.f.flex=v;return;}return 'NOT ALLOWED';}
  if(st.ph===4){const key=side+i;
   if(key==='L1'){if(!/^\d{3,4}$/.test(v))return 'FORMAT ERROR';if(+v<900||+v>1100)return 'ENTRY OUT OF RANGE';st.f.qnh=v;return;}
   if(key==='L2'){if(!/^-?\d{1,2}$/.test(v))return 'FORMAT ERROR';st.f.tmp=v;return;}
   if(key==='L3'){if(!/^\d{3}\/\d{1,3}$/.test(v))return 'FORMAT ERROR';st.f.wind=v;return;}
   if(key==='R2'){if(!/^\d{3,4}$/.test(v))return 'FORMAT ERROR';st.f.baro=v;return;}
   if(key==='R4'){st.f.conf=st.f.conf==='3'?'':'3';return;}}
  return 'NOT ALLOWED';}}};
A.fuel={t:()=>'FUEL PRED',r:st=>[['AT    UTC   EFOB',g('LEBL  11:58  3.2'),'',''],['ALTN',g('LEVC  12:30  1.9'),'',''],['RTE RSV/%',c('0.2/5.0'),'ZFW/ZFWCG',c(st.f.zfw||'60.5/27.0')],['ALTN/TIME',g('1.3/0030'),'FOB',c((st.f.blk||'8.5')+'  ')],['FINAL/TIME',c('1.4/0030'),'',''],['EXTRA/TIME',g('1.6/0040'),'','']]};
A.prog={t:st=>g('CRZ')+'  '+(st.f.flt||'PP123'),r:st=>[['CRZ',m((st.f.crz||'FL350').slice(0,5)),'REC MAX',m('FL390')],['',w('<REPORT'),'',''],['BRG/DIST',g('322°/12'),'TO',c('[    ]')],['PREDICTIVE',w('<GPS'),'',''],['REQUIRED  ACCUR  ESTIMATED',g('1.0NM  HIGH  0.08NM'),'',''],['','','','']]};
A.dir={t:st=>st.tmp?y('DIR TO'):'DIR TO',r:st=>{const L=(st.fp||[]).filter(x=>x.k==='w'||x.k==='e');const r=[['WAYPOINT',st.ds?y(st.ds):c('[    ]'),'',st.ds?'':'']];for(let i=0;i<4;i++)r.push(['',L[i]?w('←'+L[i].n):'','','']);r.push(st.ds?['',a('<ERASE'),'',a('INSERT*')]:['','','','']);return r;},
 k:{any:(st,side,i,v)=>{const L=(st.fp||[]).filter(x=>x.k==='w'||x.k==='e');if(i===6){if(st.ds&&side==='R'){const idx=st.fp.findIndex(x=>x.n===st.ds);st.fp=[{n:'T-P',k:'w'},...st.fp.slice(idx)];st.fp[0].k='o';st.ds=null;st.pg='fpln';st.off=0;return;}if(st.ds&&side==='L'){st.ds=null;return;}return;}
  if(side!=='L')return 'NOT ALLOWED';if(i===1){if(!v)return;if(!L.find(x=>x.n===v))return 'NOT IN DATA BASE';st.ds=v;return;}const x=L[i-2];if(!x)return;st.ds=x.n;}}};
A.data={t:()=>'DATA INDEX',r:()=>[['',w('<POSITION MONITOR'),'',''],['',w('<IRS MONITOR'),'',''],['',w('<GPS MONITOR'),'',''],['',w('<A/C STATUS'),'',''],['',w('<CLOSEST AIRPORTS'),'',''],['','','','']],k:{L4:st=>{st.pg='acst';}}};
A.acst={t:()=>'A320 (ejemplo)',r:()=>[['ENG',g('CFM (ejemplo)'),'',''],['ACTIVE DATA BASE',c('01ENE-28ENE (ejemplo)'),'',''],['SECOND DATA BASE',c('29ENE-25FEB'),'',''],['','','',''],['CHG CODE',c('[ ]'),'',''],['IDLE/PERF',g('+0.0/+0.0'),'','']]};
/* ---------- Boeing ---------- */
const B={};
B.ident={t:()=>'IDENT',r:()=>[['MODEL',w('737-800'),'ENG RATING',w('26K')],['NAV DATA',w('AIRAC (ejemplo)'),'ACTIVE',w('01ENE28ENE')],['','','',''],['OP PROGRAM',w('(ejemplo)'),'',''],['','','',''],['',w('<INDEX'),'',w('POS INIT>')]],k:{L6:st=>{st.pg='index';},R6:st=>{st.pg='pos';}}};
B.index={t:()=>'INIT/REF INDEX',r:()=>[['',w('<IDENT'),'',w('NAV DATA>')],['',w('<POS'),'',''],['',w('<PERF'),'',''],['',w('<TAKEOFF'),'',''],['',w('<APPROACH'),'',''],['','','','']],k:{L1:st=>{st.pg='ident';},L2:st=>{st.pg='pos';},L3:st=>{st.pg='perfi';},L4:st=>{st.pg='tkof';}}};
B.pos={t:()=>'POS INIT',r:st=>[['','','LAST POS',w(DB.gps)],['REF AIRPORT',st.f.ref?w(st.f.ref):'----','',st.f.ref?w(DB.gps):''],['GATE','-----','',''],['','','SET IRS POS',st.f.irs?w(st.f.irs):a('□□□°□□.□ □□□□°□□.□')],['','','GPS POS',w(DB.gps)],['',w('<INDEX'),'',w('ROUTE>')]],
 k:{L2:(st,v)=>{if(!/^[A-Z]{4}$/.test(v))return 'INVALID ENTRY';st.f.ref=v;},R5:(st,v)=>{if(v)return 'INVALID ENTRY';st.sp=DB.gps;return 'KEEP';},R1:(st,v)=>{if(v)return 'INVALID ENTRY';st.sp=DB.gps;return 'KEEP';},R4:(st,v)=>{if(v!==DB.gps)return 'INVALID ENTRY';st.f.irs=v;},L6:st=>{st.pg='index';},R6:st=>{st.pg='rte';}}};
B.rte={t:st=>(st.mod?'MOD ':st.f.act?'ACT ':'')+'RTE 1',r:st=>[['ORIGIN',st.f.org?w(st.f.org):a('□□□□'),'DEST',st.f.dst?w(st.f.dst):a('□□□□')],['RUNWAY',st.f.rwy?w(st.f.rwy):'-----','FLT NO',st.f.flt?w(st.f.flt):'--------'],['CO ROUTE','----------','',''],['','','',''],['','','',''],['',w('<RTE 2'),'',st.f.act?w('PERF INIT>'):(st.f.org&&st.f.dst?w('ACTIVATE>'):'')]],
 k:{L1:(st,v)=>{if(!/^[A-Z]{4}$/.test(v))return 'INVALID ENTRY';st.f.org=v;},R1:(st,v)=>{if(!/^[A-Z]{4}$/.test(v))return 'INVALID ENTRY';st.f.dst=v;},R2:(st,v)=>{if(!/^[A-Z0-9]{2,8}$/.test(v))return 'INVALID ENTRY';st.f.flt=v;},
  L2:(st,v)=>{const r=v.replace(/^RW/,'');if(!DB.rwyD.includes(r))return 'NOT IN DATA BASE';st.f.rwy='RW'+r;},
  R6:st=>{if(st.f.act){st.pg='perfi';return;}if(!(st.f.org&&st.f.dst))return 'INVALID ENTRY';st.mod=true;st.pend='act';}}};
B.deparr={t:()=>'DEP/ARR INDEX',r:st=>[['',w('<DEP')+'  '+w(st.f.org||'----'),'',w('ARR>')],['',st.f.dst?'        '+w(st.f.dst):'','',st.f.dst?w('ARR>'):''],['','','',''],['','','',''],['','','',''],['','','','']],k:{L1:st=>{if(!st.f.act)return 'INVALID ENTRY';st.pg='bdep';},R2:st=>{if(!st.f.act)return 'INVALID ENTRY';st.pg='barr';},R1:st=>'NOT ALLOWED'}};
const selm=(on,t)=>on?g(t+' <SEL>'):w(t);
B.bdep={t:st=>(st.f.org||'')+' DEPARTURES',r:st=>{const S=Object.keys(DB.sid),r=[];for(let i=0;i<5;i++)r.push([i===0?'SIDS':'',S[i]?selm(st.dep.sid===S[i],S[i]):'',i===0?'RUNWAYS':'',DB.rwyD[i]?selm(st.dep.rwy===DB.rwyD[i],DB.rwyD[i]):'']);r.push(['',w('<INDEX'),'',w('ROUTE>')]);return r;},
 k:{any:(st,side,i)=>{if(i===6){st.pg=side==='L'?'deparr':'rte';return;}if(side==='R'){const r=DB.rwyD[i-1];if(!r)return;st.dep.rwy=r;st.f.rwy='RW'+r;st.mod=true;return;}const k=Object.keys(DB.sid)[i-1];if(!k)return;st.dep.sid=k;st.mod=true;st.legs=st.legs||[];st.legs=[...DB.sid[k],'#',...(st.legs.filter(x=>x!=='#'&&!Object.values(DB.sid).flat().includes(x)))];if(!st.legs.includes('RW24R')&&!st.arr.appr)st.legs=st.legs;}}};
B.barr={t:st=>(st.f.dst||'')+' ARRIVALS',r:st=>{const S=Object.keys(DB.star),r=[];for(let i=0;i<5;i++)r.push([i===0?'STARS':'',S[i]?selm(st.arr.star===S[i],S[i]):'',i===0?'APPROACHES':'',DB.appr[i]?selm(st.arr.appr===DB.appr[i],DB.appr[i]):'']);r.push(['',w('<INDEX'),'',w('ROUTE>')]);return r;},
 k:{any:(st,side,i)=>{if(i===6){st.pg=side==='L'?'deparr':'rte';return;}if(side==='R'){const r=DB.appr[i-1];if(!r)return;st.arr.appr=r;st.mod=true;}else{const k=Object.keys(DB.star)[i-1];if(!k)return;st.arr.star=k;st.mod=true;}
  if(st.arr.star&&st.arr.appr){const L=(st.legs||[]).filter(x=>!Object.values(DB.star).flat().includes(x)&&!/^RW/.test(x));while(L.length&&L[L.length-1]==='#')L.pop();st.legs=[...L,'#',...DB.star[st.arr.star],'RW'+st.arr.appr.slice(-3)];}}}};
B.legs={t:st=>(st.mod?'MOD':'ACT')+' RTE 1 LEGS',r:st=>{const L=st.legs||[],r=[];for(let i=0;i<5;i++){const x=L[st.off+i];if(x==null){r.push(['','','','']);continue;}if(x==='#'){r.push(['THEN',a('□□□□□'),'',w('ROUTE DISCONTINUITY')]);continue;}r.push([s(i?'320°  12NM':''),(st.off+i)===0&&!st.mod?m(x):w(x),'',c(i===0?'250/ 5000':'.780/FL350')]);}r.push(['',w('<RTE 2 LEGS'),'',w('RTE DATA>')]);return r;},
 k:{any:(st,side,i,v)=>{if(i===6||side==='R')return 'INVALID ENTRY';const L=st.legs||[],idx=st.off+i-1,x=L[idx];if(x==null)return 'INVALID ENTRY';
  if(v==='DELETE'){if(x==='#'){L.splice(idx,1);st.mod=true;return;}L.splice(idx,1,'#');st.mod=true;return;}
  if(v){if(!DB.wpt.includes(v))return 'NOT IN DATA BASE';if(x==='#'){L.splice(idx,0,v);}else L.splice(idx,0,v,'#');st.mod=true;return;}
  if(x!=='#'){st.sp=x;return 'KEEP';}return 'INVALID ENTRY';}}};
B.perfi={t:st=>(st.mod?'MOD ':'')+'PERF INIT',r:st=>[['GR WT',st.f.zfw?w((+st.f.zfw+8.5).toFixed(1)):'---.-','CRZ ALT',st.f.crz?w(st.f.crz):a('□□□□□')],['FUEL',w('8.5 CALC'),'',''],['ZFW',st.f.zfw?w(st.f.zfw):a('□□□.□'),'',''],['RESERVES',st.f.rsv?w(st.f.rsv):a('□□.□'),'',''],['COST INDEX',st.f.ci?w(st.f.ci):a('□□□□'),'',''],['',w('<INDEX'),'',w('TAKEOFF>')]],
 k:{L3:(st,v)=>{if(!/^\d{2,3}(\.\d)?$/.test(v))return 'INVALID ENTRY';st.f.zfw=v;st.mod=true;},L4:(st,v)=>{if(!/^\d{1,2}(\.\d)?$/.test(v))return 'INVALID ENTRY';st.f.rsv=v;st.mod=true;},L5:(st,v)=>{if(!/^\d{1,3}$/.test(v))return 'INVALID ENTRY';st.f.ci=v;st.mod=true;},
  R1:(st,v)=>{const x=v.replace(/^FL/,'');if(!/^\d{3}$/.test(x))return 'INVALID ENTRY';st.f.crz='FL'+x;st.mod=true;},L6:st=>{st.pg='index';},R6:st=>{st.pg='tkof';}}};
const sug={v1:'142',vr:'144',v2:'150'};
B.tkof={t:()=>'TAKEOFF REF',r:st=>{const can=st.f.tfl&&st.f.cg&&st.f.zfw,vv=k=>st.f[k]?w(st.f[k]):(can?s(sug[k])+' '+s('KT'):'---');const done=st.f.v1&&st.f.vr&&st.f.v2;
  return [['FLAPS',st.f.tfl?w(st.f.tfl+'°'):a('□□°'),'V1',vv('v1')],['',' ','VR',vv('vr')],['CG',st.f.cg?w(st.f.cg+'%'):a('□□.□%'),'V2',vv('v2')],['RUNWAY',w(st.f.rwy||'-----'),'',''],['',done?g('PRE-FLT COMPLETE'):'','',''],['',w('<INDEX'),'',w('POS INIT>')]];},
 k:{L1:(st,v)=>{if(!['1','5','10','15','25'].includes(v))return 'INVALID ENTRY';st.f.tfl=v;},L3:(st,v)=>{if(!/^\d{1,2}(\.\d)?$/.test(v))return 'INVALID ENTRY';st.f.cg=v;},
  any:(st,side,i,v)=>{if(side!=='R'||i>3){if(side+i==='L6'){st.pg='index';return;}if(side+i==='R6'){st.pg='pos';return;}return 'INVALID ENTRY';}const k=['v1','vr','v2'][i-1];if(v){if(!/^\d{3}$/.test(v))return 'INVALID ENTRY';st.f[k]=v;return;}if(!(st.f.tfl&&st.f.cg&&st.f.zfw))return 'INVALID ENTRY';st.f[k]=sug[k];}}};
B.vnav={t:()=>'ACT ECON CLB',r:st=>[['CRZ ALT',w(st.f.crz||'FL350'),'',''],['ECON SPD',w('280/.780'),'',''],['SPD REST',w('250/10000'),'',''],['','','',''],['','','',''],['',w('<ECON'),'',w('ENG OUT>')]]};
B.prog={t:()=>'ACT RTE 1 PROGRESS',r:()=>[['TO   DTG  ETA  FUEL',m('ALFA')+w('  12  1042Z  8.1'),'',''],['NEXT',w('BRAVO  45  1051Z  7.4'),'',''],['DEST',w('LEBL  260  1158Z  3.2'),'',''],['','','',''],['','','',''],['','','','']]};
B.n1={t:()=>'N1 LIMIT',r:()=>[['SEL/OAT',w('--/+15°C'),'',''],['',w('<TO'),'',w('CLB>')],['','','',''],['','','',''],['','','',''],['',w('<PERF INIT'),'',w('TAKEOFF>')]],k:{L6:st=>{st.pg='perfi';},R6:st=>{st.pg='tkof';}}};
/* ---------- teclas ---------- */
const PG={a:A,b:B};
const KEYS={a:[['DIR','dir'],['PROG','prog'],['PERF','perf'],['INIT','init'],['DATA','data'],['',''],['F-PLN','fpln'],['RAD NAV','radnav'],['FUEL PRED','fuel'],['SEC F-PLN',''],['ATC COMM',''],['MCDU MENU',''],['AIRPORT',''],['',''],['←','NEXT'],['↑','UP'],['→','NEXT'],['↓','DN']],
 b:[['INIT REF','iref'],['RTE','rte'],['DEP ARR','deparr'],['ALTN',''],['VNAV','vnav'],['',''],['FIX',''],['LEGS','legs'],['HOLD',''],['FMC COMM',''],['PROG','prog'],['EXEC','EXEC'],['MENU',''],['NAV RAD',''],['PREV PAGE','UP'],['NEXT PAGE','DN'],['N1 LIMIT','n1'],['','']]};
MC.KEYS=KEYS;
function press(st,k){// devuelve true si la tecla hizo algo
 k={'←':'NEXT','→':'NEXT','↑':'UP','↓':'DN'}[k]||k;
 const P=PG[st.m];
 if(/^[LR][1-6]$/.test(k)){const pg=P[st.pg];let v=st.sp;const fn=pg.k&&(pg.k[k]||pg.k.any);if(!fn){st.msg=st.m==='a'?'NOT ALLOWED':'INVALID ENTRY';return false;}
  if(st.msg){st.msg='';}
  const r=pg.k[k]?fn(st,v):fn(st,k[0],+k[1],v);if(r==='KEEP')return true;if(r){st.msg=r;return false;}if(!(st.m==='a'&&st.pg==='fpln'&&v===''&&false))st.sp='';return true;}
 if(k==='CLR'){if(st.msg){st.msg='';st.sp='';return true;}if(st.sp==='CLR'||st.sp==='DELETE'){st.sp='';return true;}if(st.sp){st.sp=st.sp.slice(0,-1);return true;}if(st.m==='a'){st.sp='CLR';return true;}return true;}
 if(k==='DEL'){if(!st.sp){st.sp='DELETE';return true;}return false;}
 if(k==='EXEC'){if(!st.mod)return false;st.mod=false;if(st.pend==='act'){st.f.act=true;st.legs=st.legs||[];}st.pend=null;return true;}
 if(k.length===1||k==='SP'){if(st.msg)return false;if(st.sp==='CLR'||st.sp==='DELETE')st.sp='';if(st.sp.length<22)st.sp+=k==='SP'?' ':k;return true;}
 if(k==='+/-'){st.sp+='-';return true;}
 if(k==='NEXT'){if(st.pg==='init'){st.pg='initb';return true;}if(st.pg==='initb'){st.pg='init';return true;}return false;}
 if(k==='UP'||k==='DN'){const L=st.m==='a'?fpRows(st):(st.legs||[]);if(!/fpln|legs/.test(st.pg))return false;st.off=Math.max(0,Math.min(Math.max(0,L.length-3),st.off+(k==='DN'?1:-1)));return true;}
 // teclas de página
 const map=Object.fromEntries(KEYS[st.m].filter(x=>x[1]).map(x=>[x[0],x[1]]));let pg=map[k]||k;
 if(pg==='iref'){pg=!st.f.irs?'ident':(!st.f.zfw?'perfi':'tkof');}
 if(!P[pg])return false;st.pg=pg;st.off=0;if(pg==='dir')st.ds=null;return true;}
MC.press=press;
function view(st){const P=PG[st.m],pg=P[st.pg];const R=pg.r(st);const sc=st.msg?(st.m==='a'?w(st.msg):w(st.msg)):(st.sp?w(st.sp):'');
 return {t:pg.t(st),R,sc,arrows:pg.arrows};}
MC.view=view;
/* ---------- render ---------- */
function html(st,id){const v=view(st);let h=`<div class="mcd ${st.m}" id="${id}"><div class="mgrid"><div class="mbg"></div><div class="mt" style="grid-row:1">${v.t}${v.arrows?'<span class="marr">←→</span>':''}</div>`;
 for(let i=0;i<6;i++){const r=v.R[i]||['','','',''];h+=`<div class="ml s" style="grid-row:${2+2*i}"><span>${r[0]||''}</span><span>${r[2]||''}</span></div><div class="ml" style="grid-row:${3+2*i}"><span>${r[1]||''}</span><span>${r[3]||''}</span></div>`;
  h+=`<button class="lsk l" data-k="L${i+1}" style="grid-row:${2+2*i}/span 2">—</button><button class="lsk r" data-k="R${i+1}" style="grid-row:${2+2*i}/span 2">—</button>`;}
 h+=`<div class="ml spd" style="grid-row:14"><span>${v.sc}</span><span></span></div></div>`;
 h+=`<div class="mfk">${KEYS[st.m].map(([t,p])=>t?`<button class="mk f${t==='EXEC'?' ex'+(st.mod?' on':''):''}${p?'':' dis'}" data-k="${t}">${t}</button>`:'<span></span>').join('')}</div>`;
 h+=`<div class="mkb"><div class="mnum">${['1','2','3','4','5','6','7','8','9','.','0','+/-'].map(x=>`<button class="mk" data-k="${x}">${x}</button>`).join('')}</div><div class="mabc">${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(x=>`<button class="mk" data-k="${x}">${x}</button>`).join('')}${(st.m==='a'?['SP','/','CLR']:['SP','DEL','/','CLR']).map(x=>`<button class="mk${x==='CLR'||x==='DEL'?' clr':''}" data-k="${x}">${x}</button>`).join('')}</div></div></div>`;return h;}
MC.html=html;
/* ---------- presets (estados de partida, datos de ejemplo) ---------- */
const run=(st,seq)=>{seq.forEach(x=>{if(typeof x==='function')x(st);else if(x.startsWith('"')){x.slice(1).split('').forEach(ch=>press(st,ch===' '?'SP':ch));}else press(st,x);});return st;};
const T=s=>'"'+s;
const SEQ={a0:[],aInitA:['INIT',T('LEMD/LEBL'),'R1',T('PP123'),'L3',T('30'),'L5',T('350'),'L6']};
SEQ.aInit=[...SEQ.aInitA,'NEXT',T('60.5/27.0'),'R1',T('8.5'),'R2','INIT'];
SEQ.aDep=[...SEQ.aInit,'F-PLN','L1','L1','L2','L2','R6'];
SEQ.aRoute=[...SEQ.aDep,'L2',T('BRAVO'),'L3','R6','F-PLN','L5','R1','L2','L2','R6',st=>{st.fp=st.fp.filter(x=>x.k!=='d');}];
SEQ.aPerf=[...SEQ.aRoute,'PERF',T('140'),'L1',T('142'),'L2',T('145'),'L3',T('1/UP0.8'),'R3',T('55'),'R4','F-PLN'];
SEQ.aFly=[...SEQ.aPerf,st=>{st.ph=2;st.fp.shift();st.fp[0].k='o';},'F-PLN'];
SEQ.b0=[];SEQ.bRte=['INIT REF','R6','R5','R4','R6',T('LEMD'),'L1',T('LEBL'),'R1',T('PP123'),'R2','R6','EXEC'];
SEQ.bLegs=[...SEQ.bRte,'DEP ARR','L1','R1','L1','EXEC','DEP ARR','R2','R1','L1','EXEC','LEGS',T('BRAVO'),'L2','DEL','L3','EXEC'];
MC.make=(name)=>{const st=blank(name[0]);run(st,SEQ[name]||[]);st.sp='';st.msg='';st.pg=st.m==='a'?(name==='a0'?'init':'fpln'):(name==='b0'?'ident':'legs');st.off=0;return st;};
MC.run=run;MC.T=T;
})();
