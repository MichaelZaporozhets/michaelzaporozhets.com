const h1 = document.querySelector('h1');

const m = "Michael";
const z = "Zaporozhets";

let cur = 1;
let interval;

interval = setInterval(() => {
  h1.innerText = `${m.slice(0, cur)} ${z.slice(0, cur)}`;
  if(!z[cur]) clearInterval(interval);
  cur++;
}, cur * 100);