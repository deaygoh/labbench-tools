import {raid, transfer, energy, duration} from './calculations.mjs';
const form = document.querySelector('form[data-tool]');
const fmt = (n, digits=2) => n.toLocaleString('en-US', {maximumFractionDigits:digits});
if (form) {
  const result = document.querySelector('#result');
  const error = document.querySelector('#error');
  const status = document.querySelector('#status');
  const params = new URLSearchParams(location.search);
  for (const input of form.elements) if (input.name && params.has(input.name)) input.value=params.get(input.name);
  function calculate() {
    error.textContent=''; status.textContent='';
    try {
      const data = Object.fromEntries(new FormData(form));
      const tool=form.dataset.tool;
      if (tool==='energy' && !['USD','EUR','GBP','CAD','AUD','INR','JPY'].includes(data.currency)) throw new Error('Select a currency label.');
      const r = ({raid,transfer,energy})[tool](data);
      result.hidden=false;
      const set=(key,value)=>{document.querySelector(`[data-result="${key}"]`).textContent=value;};
      if(tool==='raid') {
        set('main',`${fmt(r.usable)} TB`); set('secondary',`${fmt(r.tib)} TiB before formatting`);
        set('raw',`${fmt(r.raw)} TB`); set('reserved',`${fmt(r.reserved)} TB`); set('efficiency',`${fmt(r.efficiency,1)}%`);
        document.querySelector('.capacity-fill').style.width=`${r.efficiency}%`;
        set('formula',`RAID ${data.level}: ${data.drives} × ${data.size} TB raw → ${fmt(r.usable)} TB usable.`);
        set('caveat',data.level==='0'?'No drive failure protection. One failed drive can lose the entire array.':data.level==='10'?'Survives one drive failure in each mirror pair. Two failures in the same pair lose the array.':data.level==='1'?'An N-way mirror stores one copy on each drive; usable capacity equals one drive.':`Tolerates up to ${data.level==='5'?'one':'two'} drive failure${data.level==='5'?'':'s'}; rebuilds still carry risk.`);
        const link=document.querySelector('#transfer-link'); link.href=`/transfer-time/?size=${r.usable}&unit=TB&speed=1000&efficiency=80`;
      } else if(tool==='transfer') {
        set('main',duration(r.seconds));set('secondary','Estimated one-way transfer time');
        set('ideal',duration(r.idealSeconds));set('throughput',`${fmt(r.mbps)} MB/s`);
        set('formula',`${fmt(r.bytes,0)} bytes × 8 ÷ (${data.speed} × 1,000,000 × ${data.efficiency}/100) seconds.`);
      } else {
        set('main',`${data.currency} ${fmt(r.cost)}`);set('secondary',`Estimated cost over ${data.days} days`);
        set('kwh',`${fmt(r.kwh)} kWh`);set('annual',`${data.currency} ${fmt(r.annualCost)}`);set('average',`${fmt(r.averageWatts)} W`);
        set('formula',`(${data.active} W × ${data.hours} h + ${data.idle} W × ${24-Number(data.hours)} h) ÷ 1,000 = ${fmt(r.dailyKwh,3)} kWh/day.`);
      }
      return true;
    } catch(e) {result.hidden=true;error.textContent=e.message;return false;}
  }
  form.addEventListener('submit',e=>{e.preventDefault();calculate();});
  form.addEventListener('input',calculate);form.addEventListener('change',calculate);
  form.addEventListener('reset',()=>{history.replaceState(null,'',location.pathname);setTimeout(calculate,0);});
  document.querySelector('#share').addEventListener('click',async()=>{
    if(!calculate())return;
    const url=new URL(location.pathname,location.origin);url.search=new URLSearchParams(new FormData(form));
    history.replaceState(null,'',url);
    try{await navigator.clipboard.writeText(url.href);status.textContent='Link copied. It includes your calculator inputs.';}
    catch{status.textContent='Your inputs are in the address bar. Copy the URL to share.';}
  });
  calculate();
}
