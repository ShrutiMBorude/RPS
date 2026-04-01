let coins=1250,gems=340;
function buyItem(btn,price,currency){
  const card=btn.closest('.shop-card');
  if(currency==='coin'){
    if(coins<price){alert('Not enough coins! 🪙');return;}
    coins-=price;
    document.getElementById('coins').textContent=coins.toLocaleString();
  } else {
    if(gems<price){alert('Not enough gems! 💎');return;}
    gems-=price;
  }
  card.classList.add('owned');
  const vis=card.querySelector('.card-visual');
  let tag=vis.querySelector('.owned-tag');
  if(!tag){tag=document.createElement('span');tag.className='owned-tag';tag.textContent='OWNED';vis.appendChild(tag);}
  btn.textContent='✓ Owned';
  btn.className='card-buy-btn';
  btn.onclick=null;
}
function switchTab(btn,cat){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.shop-card').forEach(c=>{
    c.style.display=(cat==='all'||c.dataset.cat===cat)?'':'none';
  });
}
