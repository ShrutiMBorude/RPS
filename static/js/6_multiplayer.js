let searching=false;let mmInterval=null;let dots=0;
function setMode(el){document.querySelectorAll('.mode-pill').forEach(p=>p.classList.remove('active'));el.classList.add('active');}
function toggleMatchmaking(){
  if(!searching){
    searching=true;
    document.getElementById('mm-btn').textContent='CANCEL';
    document.getElementById('mm-btn').classList.add('searching');
    document.getElementById('mm-icon').textContent='⏳';
    document.getElementById('mm-title').textContent='Searching...';
    mmInterval=setInterval(()=>{
      dots=(dots+1)%4;
      document.getElementById('mm-status').textContent='Finding opponent'+'.'.repeat(dots);
      if(Math.random()<.12){
        clearInterval(mmInterval);
        document.getElementById('mm-icon').textContent='⚡';
        document.getElementById('mm-title').textContent='Opponent Found!';
        document.getElementById('mm-sub').textContent='ShadowRock99 · Gold II · 2,847 pts';
        document.getElementById('mm-status').className='mm-status found';
        document.getElementById('mm-status').textContent='✓ Match found! Entering arena...';
        document.getElementById('mm-btn').textContent='ENTERING...';
        document.getElementById('mm-btn').disabled=true;
        setTimeout(()=>{window.location.href='3_battle_arena.html';},1800);
      }
    },500);
  } else {
    searching=false;clearInterval(mmInterval);
    document.getElementById('mm-btn').textContent='FIND MATCH';
    document.getElementById('mm-btn').classList.remove('searching');
    document.getElementById('mm-icon').textContent='🎮';
    document.getElementById('mm-title').textContent='Ready to Battle?';
    document.getElementById('mm-sub').textContent='Press Find Match to enter the queue';
    document.getElementById('mm-status').textContent='';
    document.getElementById('mm-status').className='mm-status';
  }
}
function createRoom(){
  const name=document.getElementById('room-name').value||'My Battle Room';
  const code=Math.random().toString(36).substr(2,6).toUpperCase();
  document.getElementById('room-code').textContent=code;
  document.getElementById('room-code-display').style.display='block';
}
function joinByCode(){
  const code=document.getElementById('join-code').value.trim().toUpperCase();
  if(code.length<4){alert('Please enter a valid room code.');return;}
  alert('Joining room: '+code+'...');
}
function joinRoom(btn){btn.textContent='Joining...';btn.disabled=true;setTimeout(()=>{window.location.href='3_battle_arena.html';},1200);}
