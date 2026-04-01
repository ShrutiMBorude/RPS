const emojis=['🪨','📄','✂️'];
const p=document.getElementById('particles');
for(let i=0;i<18;i++){
  const el=document.createElement('span');
  el.textContent=emojis[i%3];
  el.style.cssText=`position:absolute;font-size:${20+Math.random()*30}px;left:${Math.random()*100}%;opacity:${0.04+Math.random()*0.07};animation-duration:${8+Math.random()*14}s;animation-delay:${Math.random()*8}s`;
  el.className='particle';
  p.appendChild(el);
}
