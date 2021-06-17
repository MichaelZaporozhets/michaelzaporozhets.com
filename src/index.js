// const h1 = document.querySelector('h1');

// const name = "Michael Zaporozhets";

// let cur = 0;
// let interval;

// interval = setInterval(() => {
//   if(name[cur]) {
//     var nameSpan = document.createElement('span');
//     nameSpan.innerText = name[cur];
//     h1.appendChild(nameSpan);
//   }

//   if(!name[cur]) clearInterval(interval);
//   cur++;
// }, cur + 100 * 10 / 10);


Array.from(document.querySelectorAll('h1 span')).map((node, i) => {
  node.style.animation = `1s infinite ${i*100}ms none test`
})

