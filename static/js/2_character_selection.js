let chosen=null;
function selectChar(card,name,emoji){
  document.querySelectorAll('.char-card').forEach(c=>c.classList.remove('selected'));
  card.classList.add('selected');
  chosen=name;
  document.getElementById('preview-emoji').textContent=emoji;
  document.getElementById('preview-name').textContent=name;
  document.getElementById('enter-btn').classList.add('ready');
  localStorage.setItem('rps_char',JSON.stringify({name,emoji}));
}
// restore
const saved=localStorage.getItem('rps_char');
if(saved){const d=JSON.parse(saved);document.getElementById('preview-emoji').textContent=d.emoji;document.getElementById('preview-name').textContent=d.name;document.getElementById('enter-btn').classList.add('ready');}
