/* Voz (Web Speech API) y sonidos de cabina sintetizados (Web Audio API) — sin archivos de audio */
const SET={d:{voice:true,sound:true,vol:0.7,teacher:true},get(){try{return Object.assign({},this.d,JSON.parse(localStorage.getItem('pp_set')||'{}'))}catch(e){return{...this.d}}},set(k,v){const s=this.get();s[k]=v;localStorage.setItem('pp_set',JSON.stringify(s));}};
const Voice={v:null,
  pick(){const vs=speechSynthesis.getVoices();this.v=vs.find(x=>x.lang==='es-ES')||vs.find(x=>/^es/i.test(x.lang))||null;},
  clean(h){const d=document.createElement('div');d.innerHTML=h;d.querySelectorAll('.fig').forEach(f=>{const b=f.querySelector('figcaption b');f.replaceWith(' Mira la imagen: '+(b?b.textContent.replace(/[^\p{L}\p{N}\s()\/,:-]/gu,'').trim():'')+'. ');});d.querySelectorAll('svg,table,pre,.btn').forEach(x=>x.remove());let t=d.textContent||'';
    return t.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu,'').replace(/\bFL\s?(\d{2,3})/g,'nivel de vuelo $1').replace(/(\d)\s?kt\b/g,'$1 nudos').replace(/(\d)\s?ft\b/g,'$1 pies').replace(/→/g,', ').replace(/\s+/g,' ').trim();},
  say(h,onend){this.stop();if(!SET.get().voice||!('speechSynthesis' in window)){if(onend)onend(false);return;}if(!this.v)this.pick();
    const parts=this.clean(h).match(/[^.!?;:]+[.!?;:]?/g)||[];if(!parts.length){onend&&onend(true);return;}
    parts.forEach((p,i)=>{const u=new SpeechSynthesisUtterance(p.trim());u.lang='es-ES';if(this.v)u.voice=this.v;u.rate=1.0;if(i===parts.length-1&&onend)u.onend=()=>onend(true);speechSynthesis.speak(u);});},
  stop(){if('speechSynthesis' in window)speechSynthesis.cancel();},
  speaking(){return 'speechSynthesis' in window&&speechSynthesis.speaking;}};
if('speechSynthesis' in window)speechSynthesis.onvoiceschanged=()=>Voice.pick();

const Snd={ctx:null,m:null,loops:{},nb:null,
  init(){if(this.ctx)return true;const A=window.AudioContext||window.webkitAudioContext;if(!A)return false;this.ctx=new A();this.m=this.ctx.createGain();this.m.gain.value=SET.get().vol;this.m.connect(this.ctx.destination);
    const n=this.ctx.sampleRate*2,b=this.ctx.createBuffer(1,n,this.ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;this.nb=b;return true;},
  ok(){return SET.get().sound&&this.init();},
  vol(v){SET.set('vol',v);if(this.m)this.m.gain.value=v;},
  noise(){const s=this.ctx.createBufferSource();s.buffer=this.nb;s.loop=true;return s;},
  env(g,t,a,peak,dur){g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);},
  click(hard){if(!this.ok())return;const c=this.ctx,t=c.currentTime;const s=this.noise(),f=c.createBiquadFilter(),g=c.createGain();f.type='bandpass';f.frequency.value=hard?1800:3200;f.Q.value=2;
    s.connect(f).connect(g).connect(this.m);this.env(g,t,0.002,hard?0.9:0.5,0.05);s.start(t);s.stop(t+0.07);
    const o=c.createOscillator(),g2=c.createGain();o.frequency.value=hard?140:220;o.connect(g2).connect(this.m);this.env(g2,t,0.002,0.4,0.06);o.start(t);o.stop(t+0.08);},
  beep(f=880,d=0.15,v=0.25){if(!this.ok())return;const c=this.ctx,t=c.currentTime,o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=f;o.connect(g).connect(this.m);this.env(g,t,0.01,v,d);o.start(t);o.stop(t+d+0.05);},
  chime(){this.beep(988,0.6,0.25);setTimeout(()=>this.beep(784,0.9,0.22),350);},
  error(){this.beep(220,0.25,0.25);},
  /* bucles continuos */
  start(name){if(!this.ok()||this.loops[name])return;const type=name.split('_')[0];const c=this.ctx,t=c.currentTime,out=c.createGain();out.gain.value=0.0001;out.connect(this.m);const nodes=[];
    const osc=(type1,f,g)=>{const o=c.createOscillator(),gg=c.createGain();o.type=type1;o.frequency.value=f;gg.gain.value=g;o.connect(gg).connect(out);o.start();nodes.push(o);return o;};
    const nz=(ft,f,g,q=0.7)=>{const s=this.noise(),fl=c.createBiquadFilter(),gg=c.createGain();fl.type=ft;fl.frequency.value=f;fl.Q.value=q;gg.gain.value=g;s.connect(fl).connect(gg).connect(out);s.start();nodes.push(s);return fl;};
    let target=0.05;
    if(type==='hum'){osc('sine',400,0.5);osc('sine',800,0.15);osc('sine',1200,0.05);target=0.035;}
    else if(type==='gpu'){nz('lowpass',140,1.2);osc('sawtooth',32,0.25);target=0.12;}
    else if(type==='pump'){const o=osc('sawtooth',190,0.25);nz('bandpass',1100,0.3,4);const l=c.createOscillator(),lg=c.createGain();l.frequency.value=3;lg.gain.value=4;l.connect(lg).connect(o.frequency);l.start();nodes.push(l);target=0.03;}
    else if(type==='apu'){const o=osc('sine',150,0.5);o.frequency.exponentialRampToValueAtTime(2600,t+7);const f=nz('highpass',800,0.6);f.frequency.exponentialRampToValueAtTime(3500,t+7);const r=nz('lowpass',300,0.6);target=0.09;}
    else if(type==='eng'){const o=osc('sine',120,0.35);o.frequency.exponentialRampToValueAtTime(1900,t+9);const o2=osc('triangle',240,0.12);o2.frequency.exponentialRampToValueAtTime(3800,t+9);const r=nz('lowpass',90,0.2);const rg=r;rg.frequency.exponentialRampToValueAtTime(380,t+9);const h=nz('bandpass',2500,0.1,1);target=0.16;}
    out.gain.exponentialRampToValueAtTime(target,t+(type==='hum'?0.3:type==='gpu'?1.2:2));
    this.loops[name]={out,nodes};},
  stop(name){const L=this.loops[name];if(!L)return;const t=this.ctx.currentTime;L.out.gain.cancelScheduledValues(t);L.out.gain.setValueAtTime(L.out.gain.value||0.01,t);L.out.gain.exponentialRampToValueAtTime(0.0001,t+(/^(eng|apu)/.test(name)?3:0.4));
    L.nodes.forEach(n=>{try{n.stop(t+3.2)}catch(e){}});delete this.loops[name];},
  stopAll(){Object.keys(this.loops).forEach(k=>this.stop(k));},
  sync(want){if(!SET.get().sound){this.stopAll();return;}Object.keys(this.loops).forEach(k=>{if(!want.includes(k))this.stop(k);});want.forEach(k=>this.start(k));}};
/* Qué bucles suenan según el estado de cada panel */
const SNDMAP={
 a320:v=>[(v.bat1!=='OFF'||v.bat2!=='OFF')&&'hum',v.extpwr==='ON'&&'gpu',v.fl1==='ON'&&'pump_l1',v.fl2==='ON'&&'pump_l2',v.fc1==='ON'&&'pump_c1',v.fr1==='ON'&&'pump_r1',v.fl==='ON'&&'pump_l',v.fc==='ON'&&'pump_c',v.fr==='ON'&&'pump_r',v.apum==='ON'&&/ON|AVAIL/.test(v.apus)&&'apu',v.eng1==='ON'&&'eng_1',v.eng2==='ON'&&'eng_2'],
 b787:v=>[v.bat==='ON'&&'hum',(v.extl==='ON'||v.extr==='ON')&&'gpu',/ON/.test(v.fl||'')&&'pump_l',/ON/.test(v.fr||'')&&'pump_r',v.c1==='ON'&&'pump_c1',v.c2==='ON'&&'pump_c2',v.apu&&v.apu!=='OFF'&&'apu',v.fcl==='RUN'&&'eng_l',v.fcr==='RUN'&&'eng_r'],
 b737:v=>[v.bat==='ON'&&'hum',v.grd==='ON'&&'gpu',v.f1==='ON'&&'pump_1',v.f2==='ON'&&'pump_2',v.helec==='ON'&&'pump_h',v.apu&&v.apu!=='OFF'&&'apu',v.sl1==='IDLE'&&'eng_1',v.sl2==='IDLE'&&'eng_2']};
document.addEventListener('pointerdown',()=>{if(SET.get().sound)Snd.init();if(Snd.ctx&&Snd.ctx.state==='suspended')Snd.ctx.resume();},{passive:true});
