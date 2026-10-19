export function number(value, label, min, max, integer = false) {
  if (typeof value === 'string' && !value.trim()) throw new Error(`${label} is required.`);
  const n = Number(value);
  if (!Number.isFinite(n) || n < min || n > max || (integer && !Number.isInteger(n)))
    throw new Error(`${label} must be ${integer ? 'a whole number ' : ''}between ${min} and ${max}.`);
  return n;
}
export function raid({drives, size, level}) {
  const n = number(drives, 'Drive count', 1, 100, true);
  const s = number(size, 'Drive size', .001, 1000);
  const minimum = {'0':2,'1':2,'5':3,'6':4,'10':4};
  if (!Object.hasOwn(minimum, level)) throw new Error('Select a supported RAID level.');
  if (n < minimum[level]) throw new Error(`RAID ${level} needs at least ${minimum[level]} drives.`);
  if (level === '10' && n % 2) throw new Error('RAID 10 needs an even number of drives.');
  const usable = level === '0' ? n*s : level === '1' ? s : level === '5' ? (n-1)*s : level === '6' ? (n-2)*s : n*s/2;
  return {raw:n*s, usable, reserved:n*s-usable, tib:usable*1e12/2**40, efficiency:usable/(n*s)*100};
}
export function transfer({size, unit, speed, efficiency}) {
  const s = number(size, 'Data size', 0, 1000000);
  const r = number(speed, 'Link speed', .001, 10000000);
  const e = number(efficiency, 'Link utilization', 1, 100);
  const units = {GB:1e9,TB:1e12,GiB:2**30,TiB:2**40};
  if (!Object.hasOwn(units, unit)) throw new Error('Select a supported data unit.');
  const bytes = s*units[unit];
  return {seconds:bytes*8/(r*1e6*e/100), idealSeconds:bytes*8/(r*1e6), mbps:r*e/100/8, bytes};
}
export function energy({active, idle, hours, rate, days}) {
  const a = number(active, 'Active power', 0, 100000);
  const i = number(idle, 'Idle power', 0, 100000);
  const h = number(hours, 'Active hours per day', 0, 24);
  const r = number(rate, 'Electricity rate', 0, 1000);
  const d = number(days, 'Days', 1, 366, true);
  const dailyKwh = (a*h+i*(24-h))/1000;
  return {dailyKwh, kwh:dailyKwh*d, cost:dailyKwh*d*r, annualCost:dailyKwh*365*r, averageWatts:dailyKwh*1000/24};
}
export function duration(seconds) {
  if (seconds === 0) return '0 seconds';
  if (seconds < 1) return '< 1 second';
  let s = Math.ceil(seconds);
  const d = Math.floor(s/86400); s %= 86400;
  const h = Math.floor(s/3600); s %= 3600;
  const m = Math.floor(s/60); s %= 60;
  return [[d,'day'],[h,'hour'],[m,'minute'],[s,'second']].filter(([n])=>n).slice(0,3).map(([n,l])=>`${n} ${l}${n===1?'':'s'}`).join(' ');
}
