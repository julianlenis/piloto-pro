/* Motor del simulador de panel (simplificado, didáctico) — v2: varios flujos, deshacer, voz, sonidos y modo libre */
const Panel={
  flows(P){return P.flows||[{id:'pre',name:'De cold & dark a listo para rodar',steps:P.flow}];},
  run(id,root,fi=0,mode='guiado'){
    const P=PP.panels[id]; if(!P){root.innerHTML='<p>Panel no disponible.</p>';return;}
    const FL=this.flows(P);fi=Math.min(fi,FL.length-1);const flow=FL[fi].steps;
    const S={i:0,v:{},busy:false,hist:[]};
    P.sections.forEach(s=>s.ctls.forEach(c=>S.v[c.id]=c.v));
    S.scr=P.cduStart||null; S.msg=P.ecamStart||'';
    // el flujo n empieza con el avión como lo dejaron los anteriores
    for(let k=0;k<fi;k++)FL[k].steps.forEach(st=>{if(st.to&&st.c)S.v[st.c]=st.to;(st.fx||[]).forEach(f=>S.v[f[0]]=f[1]);if(st.later)(st.later[0]||[]).forEach(f=>S.v[f[0]]=f[1]);if(st.scr)S.scr=st.scr;if(st.m!==undefined)S.msg=st.m;if(st.later&&st.later[1])S.msg=st.later[1];});
    const key='pp_panel_'+id+(fi?'_'+FL[fi].id:'');
    const save=()=>{const b=+localStorage.getItem(key)||0;if(S.i>b)localStorage.setItem(key,S.i);};
    const ALL=P.sections.flatMap(s=>s.ctls);
    const snd=()=>{const f=P.snd||SNDMAP[id];if(f)Snd.sync(f(S.v).filter(Boolean));};
    const ctlHTML=c=>{
      const v=S.v[c.id];let inner='';
      if(c.k==='pb'){const st=(c.st&&c.st[v])||[['',''],['','']];inner=`<div class="pb"><span class="${st[0][1]}">${st[0][0]}</span><span class="${st[1][1]}">${st[1][0]}</span></div>`;}
      else if(c.k==='sel'){const idx=Math.max(0,c.p.indexOf(v)),n=c.p.length,rot=n>1?(-60+120*idx/(n-1)):0;inner=`<div class="knob" style="--rot:${rot}deg"></div><div class="pos">${v}</div>`;}
      else if(c.k==='lev'){inner=`<div class="lev" style="--ly:${v===c.p[1]?'2px':'28px'}"></div><div class="pos">${v}</div>`;}
      else if(c.k==='tg'){inner=`<div class="tg" style="--ty:${v===c.p[1]?'2px':'22px'}"></div><div class="pos">${v}</div>`;}
      else if(c.k==='key'){return `<button class="ctl" data-c="${c.id}" aria-label="${c.lb}"><div class="key">${c.lb}</div></button>`;}
      else if(c.k==='disp'){inner=`<div class="pos" style="font-size:12px;padding:4px 8px;color:#fbbf24">${v}</div>`;}
      return `<button class="ctl ${c.cls||''}" data-c="${c.id}"><span class="lb">${c.lb}</span>${inner}</button>`;
    };
    const secHTML=s=>{
      if(s.cdu){const keys=s.ctls.filter(c=>!/^[LR]\d$/.test(c.lb)),L=s.ctls.filter(c=>/^L\d$/.test(c.lb)),R=s.ctls.filter(c=>/^R\d$/.test(c.lb));
        return `<div class="sec b" id="sec_${s.id}"><h4><span>${s.name}</span><span>${s.tag||''}</span></h4><div class="cdu">
        <div class="scr" id="scr">${S.scr?S.scr.join('\n'):'<span class="s">PANTALLA APAGADA</span>'}</div>
        <div class="lsk"><div class="ctls" style="grid-template-columns:repeat(3,1fr)">${L.map(ctlHTML).join('')}</div><div class="ctls" style="grid-template-columns:repeat(3,1fr)">${R.map(ctlHTML).join('')}</div></div>
        <div class="ctls" style="grid-template-columns:repeat(4,1fr)">${keys.map(ctlHTML).join('')}</div></div></div>`;}
      return `<div class="sec ${s.dark?'b':''}" id="sec_${s.id}"><h4><span>${s.name}</span><span>${s.tag||''}</span></h4><div class="ctls">${s.ctls.map(ctlHTML).join('')}</div></div>`;
    };
    const tabs=`<div class="ptabs">${FL.map((f,k)=>`<button class="pt ${mode==='guiado'&&k===fi?'on':''}" data-f="${k}">${k+1}. ${f.name}</button>`).join('')}<button class="pt ${mode==='libre'?'on':''}" data-f="libre">🕹️ Modo libre</button></div>`;
    const speakStep=()=>{const st=flow[S.i];if(mode!=='guiado')return;if(!st){Voice.say('¡Flujo completado! '+(fi+1<FL.length?'Puedes seguir con: '+FL[fi+1].name:'Has terminado todos los flujos de este avión. ¡Enhorabuena, comandante!'));return;}Voice.say(`Paso ${S.i+1}. ${st.t}. ${st.d} ${st.w?'¿Por qué? '+st.w:''}`);};
    const draw=(talk=true)=>{
      const st=flow[S.i],done=S.i>=flow.length;
      let head;
      if(mode==='libre')head=`<div class="st">MODO LIBRE</div><h3>Toca cualquier control</h3><p>Cada toque pasa a la siguiente posición y te digo para qué sirve. No hay pasos que seguir: experimenta.</p><div class="btns"><button class="btn sec" id="pRst">↺ Reiniciar panel</button></div>`;
      else if(done)head=`<div class="st">FLUJO COMPLETADO</div><h3>✅ ${FL[fi].done||'¡Flujo completado!'}</h3><p>${FL[fi].doneTxt||''}</p>
        <div class="btns">${fi+1<FL.length?`<button class="btn" id="pNextFlow">Siguiente: ${FL[fi+1].name} ›</button>`:''}<button class="btn sec" id="pUndo">‹ Paso anterior</button><button class="btn sec" id="pRe">↺ Repetir</button>${P.quiz?`<a class="btn sec" href="${P.quiz}">📝 Test</a>`:''}</div>`;
      else head=`<div class="st">PASO ${S.i+1}/${flow.length} · ${st.ph}</div><div class="bar"><i style="width:${100*S.i/flow.length}%"></i></div>
        <h3>${st.t}</h3><p>${st.d}</p>${st.w?`<div class="why">🧠 <b>¿Por qué?</b> ${st.w}</div>`:''}
        ${st.c?`<p class="hint">👉 Toca el control que parpadea en amarillo${st.to?` (→ <b>${st.to}</b>)`:''}.</p>`:''}
        <div class="btns sm3">${S.i>0?'<button class="btn sec" id="pUndo">‹ Anterior</button>':''}<button class="btn sec" id="pSay">🔁 Repetir voz</button>${st.c?'':'<button class="btn" id="pNext">Continuar ›</button>'}</div>`;
      root.innerHTML=`${tabs}<div class="pnl-head" id="ph">${head}</div>
      <div class="ecam" id="ecam">${S.msg||'<span class="wh">—</span>'}</div>
      ${P.sections.map(secHTML).join('')}
      <div class="disc">${P.disclaimer||'Panel simplificado y dibujado para estudiar en simulador. No es una réplica exacta ni un procedimiento real (FCOM/QRH).'}</div>
      ${mode==='guiado'?`<h3>Todos los pasos</h3><ol class="stepsl">${flow.map((f,j)=>`<li class="${j<S.i?'ok':j===S.i?'cur':''}">${j+1}. <b>${f.ph}</b> — ${f.t}</li>`).join('')}</ol>`:''}
      <div class="btns"><button class="btn sec" id="pRst2">🗑️ Reiniciar progreso del panel</button></div>`;
      root.querySelectorAll('.ctl').forEach(b=>b.onclick=()=>tap(b.dataset.c));
      root.querySelectorAll('.pt').forEach(b=>b.onclick=()=>{Snd.stopAll();b.dataset.f==='libre'?Panel.run(id,root,0,'libre'):Panel.run(id,root,+b.dataset.f,'guiado');});
      const on=(s,f)=>{const e=root.querySelector(s);if(e)e.onclick=f;};
      on('#pNext',()=>advance());on('#pRe',()=>{Snd.stopAll();Panel.run(id,root,fi);});on('#pUndo',undo);on('#pSay',speakStep);
      on('#pNextFlow',()=>Panel.run(id,root,fi+1));on('#pRst',()=>{Snd.stopAll();Panel.run(id,root,0,'libre');});
      on('#pRst2',()=>{if(confirm('¿Reiniciar el progreso de este panel? Se borrará qué flujos has completado.')){Object.keys(localStorage).filter(k=>k.startsWith('pp_panel_'+id)).forEach(k=>localStorage.removeItem(k));Snd.stopAll();Panel.run(id,root,0);}});
      if(mode==='guiado'){for(let j=0;j<S.i;j++){const c=flow[j].c;if(c){const e=root.querySelector(`[data-c="${c}"]`);if(e)e.classList.add('done');}}
        if(!done&&st.c){const e=root.querySelector(`[data-c="${st.c}"]`);if(e){e.classList.add('hl');e.classList.remove('done');}}}
      snd();if(talk)speakStep();
    };
    const scrollToHl=()=>{const e=root.querySelector('.ctl.hl');if(e){const ph=root.querySelector('#ph').offsetHeight;const y=e.getBoundingClientRect().top+scrollY-ph-90;scrollTo({top:Math.max(0,y-60),behavior:'smooth'});}};
    const snap=()=>({i:S.i,v:{...S.v},scr:S.scr,msg:S.msg});
    const undo=()=>{if(S.busy||!S.hist.length)return;const h=S.hist.pop();Object.assign(S,{i:h.i,v:h.v,scr:h.scr,msg:h.msg});Snd.click(false);draw();scrollToHl();};
    const advance=()=>{
      const st=flow[S.i];S.hist.push(snap());
      if(st.to&&st.c){S.v[st.c]=st.to;const c=ALL.find(x=>x.id===st.c);Snd.click(c&&c.k!=='key');}
      if(st.scr)S.scr=st.scr; if(st.m!==undefined)S.msg=st.m;
      (st.fx||[]).forEach(f=>S.v[f[0]]=f[1]);
      if(st.beep)Snd.beep();
      S.i++;save();if(S.i>=flow.length)setTimeout(()=>Snd.chime(),300);
      if(st.later){S.busy=true;draw();toast(st.later[2]||'Esperando…');setTimeout(()=>{(st.later[0]||[]).forEach(f=>S.v[f[0]]=f[1]);if(st.later[1])S.msg=st.later[1];S.busy=false;Snd.beep(1200,0.08,0.15);draw(false);scrollToHl();},2200);return;}
      draw();scrollToHl();
    };
    const tap=c=>{
      const ctl=ALL.find(x=>x.id===c);
      if(mode==='libre'){if(!ctl)return;if(ctl.p){S.v[c]=ctl.p[(ctl.p.indexOf(S.v[c])+1)%ctl.p.length];}else if(ctl.st){const ks=Object.keys(ctl.st);S.v[c]=ks[(ks.indexOf(S.v[c])+1)%ks.length];}
        Snd.click(ctl.k!=='key');const msg=`${ctl.lb}${ctl.p||ctl.st?' → '+S.v[c]:''}. ${ctl.info||''}`;toast('ℹ️ '+msg);Voice.say(msg);draw(false);return;}
      if(S.busy)return;const st=flow[S.i];if(!st)return;
      if(st.c===c){advance();return;}
      Snd.error();toast(ctl&&ctl.info?`ℹ️ ${ctl.lb}: ${ctl.info}`:(st.c?'Ese no es el paso actual: busca el control que parpadea en amarillo.':'Pulsa “Continuar” para seguir.'));
    };
    draw();
  }
};
function toast(t){let e=document.getElementById('toast');if(!e){e=document.createElement('div');e.id='toast';e.className='toast';document.body.appendChild(e);}e.textContent=t;e.style.display='block';clearTimeout(e._t);e._t=setTimeout(()=>e.style.display='none',2600);}
