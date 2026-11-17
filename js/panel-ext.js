/* Utilidades para ampliar paneles: separar interruptores agrupados, añadir secciones, insertar pasos y flujos */
const PX={
 sec(P,id){return P.sections.find(s=>s.id===id);},
 split(P,oldId,ctls,stepFn){P.sections.forEach(s=>{const i=s.ctls.findIndex(c=>c.id===oldId);if(i>=0)s.ctls.splice(i,1,...ctls);});
  const out=[];P.flow.forEach(st=>{if(st.c===oldId){ctls.forEach((c,k)=>out.push(Object.assign({},st,{c:c.id},stepFn?stepFn(st,c,k):{t:st.t+' ('+c.lb+')'},k<ctls.length-1?{m:undefined,later:undefined}:{})));}else out.push(st);});
  out.forEach(st=>{if(st.m===undefined)delete st.m;if(st.later===undefined)delete st.later;});P.flow=out;},
 addSec(P,sec,afterId){const i=P.sections.findIndex(s=>s.id===afterId);P.sections.splice(i+1,0,sec);},
 addCtl(P,secId,ctls){PX.sec(P,secId).ctls.push(...ctls);},
 after(P,pred,steps){const i=P.flow.findIndex(pred);P.flow.splice(i+1,0,...steps);},
 S:(ph,c,to,t,d,w,x)=>Object.assign({ph,c,to,t,d,w},x||{}),
 lt:{OFF:[['',''],['','']],ON:[['',''],['ON','b']]},
 bar:{OFF:[['',''],['','']],ON:[['',''],['▬','g']]},
 offw:{OFF:[['',''],['OFF','w']],ON:[['',''],['','d']]},
 offa:{OFF:[['',''],['OFF','a']],ON:[['',''],['','d']]}
};
