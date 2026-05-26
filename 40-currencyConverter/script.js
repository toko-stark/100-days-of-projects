const rates = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 155, CAD: 1.36, AUD: 1.51,
  CHF: 0.88, CNY: 7.24, INR: 83.5, KRW: 1370, BRL: 5.05, MXN: 17,
  SEK: 10.4, NOK: 10.6, TRY: 32.5
};
const f = document.getElementById('from'), t = document.getElementById('to');
Object.keys(rates).forEach(k => {
  f.innerHTML += `<option>${k}</option>`;
  t.innerHTML += `<option>${k}</option>`;
});
f.value = 'USD'; t.value = 'EUR';

const calc = () => {
  const a = +amt.value || 0;
  const v = a / rates[f.value] * rates[t.value];
  document.getElementById('r').textContent = v.toFixed(2);
};
[amt, f, t].forEach(x => { x.oninput = calc; x.onchange = calc; });
calc();
