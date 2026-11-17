/* Motor del simulador de panel (simplificado, didáctico) */
const Panel={
  run(id,root){
    const P=PP.panels[id]; if(!P){root.innerHTML='<p>Panel no disponible.</p>';return;}
    const S={i:0,v:{},busy:false};
    P.sections.forEach(s=>s.ctls.forEach(c=>S.v[c.id]=c.v));
    S.scr=P.cduStart||null; S.msg=P.ecamStart||'';
    const save=()=>{const k='pp_panel_'+id,b=+localStorage.getItem(k)||0;if(S.i>b)localStorage.setItem(k,S.i);};
    const ctlHTML=c=>{
      const v=S.v[c.id];let inner='';
      if(c.k==='pb'){const st=(c.st&&c.st[v])||[['',''],['','']];inner=`<div class="pb"><span class="${st[0][1]}">${st[0][0]}</span><span class="${st[1][1]}">${st[1][0]}</span></div>`;}
      else if(c.k==='sel'){const idx=Math.max(0,c.p.indexOf(v)),n=c.p.length,rot=n>1?(-60+120*idx/(n-1)):0;inner=`<div class="knob" style="--rot:${rot}deg"></div><div class="pos">${v}</div>`;}
      else if(c.k==='lev'){inner=`<div class="lev" style="--ly:${v===c.p[1]?'2px':'28px'}"></div><div class="pos">${v}</div>`;}
      else if(c.k==='tg'){inner=`<div class="tg" style="--ty:${v===c.p[1]?'2px':'22px'}"></div><div class="pos">${v}</div>`;}
      else if(c.k==='key'){inner=`<div class="key">${c.lb}</div>`;return `<button class="ctl" data-c="${c.id}" aria-label="${c.lb}">${inner}</button>`;}
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
    const draw=()=>{
      const st=P.flow[S.i],done=S.i>=P.flow.length,ph=done?'':st.ph;
      root.innerHTML=`
      <div class="pnl-head" id="ph">${done?`<div class="st">FLUJO COMPLETADO</div><h3>✅ ¡Avión listo para rodar!</h3><p>Has configurado el ${P.name} desde cabina oscura (cold & dark) hasta listo para el rodaje.</p>
        <div class="btns"><button class="btn" id="pRe">↺ Repetir</button>${P.quiz?`<a class="btn sec" href="${P.quiz}">📝 Test del panel</a>`:''}</div>`:
       `<div class="st">PASO ${S.i+1}/${P.flow.length} · ${ph}</div><div class="bar"><i style="width:${100*S.i/P.flow.length}%"></i></div>
        <h3>${st.t}</h3><p>${st.d}</p>${st.w?`<div class="why">🧠 <b>¿Por qué?</b> ${st.w}</div>`:''}
        ${st.c?`<p class="hint">👉 Toca el control que parpadea en amarillo${st.to?` (→ <b>${st.to}</b>)`:''}.</p>`:`<div class="btns"><button class="btn" id="pNext">Continuar ›</button></div>`}`}
      </div>
      <div class="ecam" id="ecam">${S.msg||'<span class="wh">—</span>'}</div>
      ${P.sections.map(secHTML).join('')}
      <div class="disc">${P.disclaimer||'Panel simplificado y dibujado para estudiar en simulador. No es una réplica exacta ni un procedimiento real (FCOM/QRH).'}</div>
      <h3>Todos los pasos</h3><ol class="stepsl">${P.flow.map((f,j)=>`<li class="${j<S.i?'ok':j===S.i?'cur':''}">${j+1}. <b>${f.ph}</b> — ${f.t}</li>`).join('')}</ol>`;
      root.querySelectorAll('.ctl').forEach(b=>b.onclick=()=>tap(b.dataset.c));
      const n=root.querySelector('#pNext');if(n)n.onclick=()=>advance();
      const r=root.querySelector('#pRe');if(r)r.onclick=()=>Panel.run(id,root);
      for(let j=0;j<S.i;j++){const c=P.flow[j].c;if(c){const e=root.querySelector(`[data-c="${c}"]`);if(e)e.classList.add('done');}}
      if(!done&&st.c){const e=root.querySelector(`[data-c="${st.c}"]`);if(e){e.classList.add('hl');e.classList.remove('done');}}
    };
    const scrollToHl=()=>{const e=root.querySelector('.ctl.hl');if(e){const ph=root.querySelector('#ph').offsetHeight;const y=e.getBoundingClientRect().top+scrollY-ph-90;scrollTo({top:Math.max(0,y-60),behavior:'smooth'});}};
    const advance=()=>{
      const st=P.flow[S.i];
      if(st.to&&st.c)S.v[st.c]=st.to;
      if(st.scr)S.scr=st.scr; if(st.m!==undefined)S.msg=st.m;
      (st.fx||[]).forEach(f=>S.v[f[0]]=f[1]);
      S.i++;save();
      if(st.later){S.busy=true;draw();toast(st.later[2]||'Esperando…');setTimeout(()=>{(st.later[0]||[]).forEach(f=>S.v[f[0]]=f[1]);if(st.later[1])S.msg=st.later[1];S.busy=false;draw();scrollToHl();},1600);return;}
      draw();scrollToHl();
    };
    const tap=c=>{
      if(S.busy)return;const st=P.flow[S.i];if(!st)return;
      if(st.c===c){advance();return;}
      const ctl=P.sections.flatMap(s=>s.ctls).find(x=>x.id===c);
      toast(ctl&&ctl.info?`ℹ️ ${ctl.lb}: ${ctl.info}`:(st.c?'Ese no es el paso actual: busca el control que parpadea en amarillo.':'Pulsa “Continuar” para seguir.'));
    };
    draw();
  }
};
function toast(t){let e=document.getElementById('toast');if(!e){e=document.createElement('div');e.id='toast';e.className='toast';document.body.appendChild(e);}e.textContent=t;e.style.display='block';clearTimeout(e._t);e._t=setTimeout(()=>e.style.display='none',2600);}
