const moves={rock:'🪨',paper:'📄',scissors:'✂️'};
const beats={rock:'scissors',paper:'rock',scissors:'paper'};
const hints={rock:'Rock crushes Scissors! ✊',paper:'Paper covers Rock! 📄',scissors:'Scissors cuts Paper! ✂️'};
let sc={w:0,d:0,l:0},round=1,pHP=100,cHP=100,playing=false;

function setHP(who,val){
  document.getElementById(who+'-hp-val').textContent=val;
  document.getElementById(who+'-hp').style.width=val+'%';
}

function addHistory(r){
  const d=document.createElement('div');
  d.className='hist-dot '+r;
  d.textContent=r==='win'?'W':r==='lose'?'L':'D';
  document.getElementById('history').appendChild(d);
}

function setBtns(en){
  document.querySelectorAll('.move-btn').forEach(b=>b.disabled=!en);
}

function play(move){
  if(playing)return;
  playing=true;
  setBtns(false);
  const cpu=Object.keys(moves)[Math.floor(Math.random()*3)];
  // reveal with delay
  document.getElementById('p-emoji').textContent='⏳';
  document.getElementById('c-emoji').textContent='⏳';
  setTimeout(()=>{
    document.getElementById('p-emoji').textContent=moves[move];
    document.getElementById('c-emoji').textContent=moves[cpu];
    document.getElementById('p-choice').classList.add('revealed');
    document.getElementById('c-choice').classList.add('revealed');

    const res=document.getElementById('result-text');
    const hint=document.getElementById('result-hint');
    let outcome;
    if(move===cpu){
      outcome='draw';
      res.className='result-text draw';res.textContent='🤝 DRAW!';
      hint.textContent='Same move — try to read your opponent!';
      sc.d++;document.getElementById('sc-d').textContent=sc.d;
    } else if(beats[move]===cpu){
      outcome='win';
      res.className='result-text win';res.textContent='🎉 YOU WIN THE ROUND!';
      hint.textContent=hints[move];
      sc.w++;document.getElementById('sc-w').textContent=sc.w;
      cHP=Math.max(0,cHP-20);setHP('cpu',cHP);
    } else {
      outcome='lose';
      res.className='result-text lose';res.textContent='💥 CPU WINS THE ROUND!';
      hint.textContent='Ouch! Better luck next round.';
      sc.l++;document.getElementById('sc-l').textContent=sc.l;
      pHP=Math.max(0,pHP-20);setHP('player',pHP);
    }
    addHistory(outcome);
    round++;document.getElementById('round-num').textContent=Math.min(round,5);

    if(pHP<=0||cHP<=0||round>5){
      setTimeout(()=>endGame(),700);
    } else {
      setTimeout(()=>{
        document.getElementById('p-emoji').textContent='❓';
        document.getElementById('c-emoji').textContent='❓';
        document.getElementById('p-choice').classList.remove('revealed');
        document.getElementById('c-choice').classList.remove('revealed');
        res.className='result-text idle';res.textContent='Choose your move!';
        hint.textContent='';
        setBtns(true);playing=false;
      },1400);
    }
  },600);
}

function endGame(){
  const box=document.getElementById('gameover');
  const title=document.getElementById('go-title');
  const emoji=document.getElementById('go-emoji');
  const score=document.getElementById('go-score');
  if(sc.w>sc.l){title.className='go-title win';title.textContent='YOU WIN!';emoji.textContent='🏆';}
  else if(sc.l>sc.w){title.className='go-title lose';title.textContent='YOU LOSE!';emoji.textContent='💀';}
  else{title.className='go-title draw';title.textContent='DRAW!';emoji.textContent='🤝';}
  score.textContent=`W:${sc.w} D:${sc.d} L:${sc.l}`;
  box.classList.add('show');
}

function resetGame(){
  sc={w:0,d:0,l:0};round=1;pHP=100;cHP=100;playing=false;
  ['sc-w','sc-d','sc-l'].forEach(id=>document.getElementById(id).textContent=0);
  setHP('player',100);setHP('cpu',100);
  document.getElementById('round-num').textContent=1;
  document.getElementById('p-emoji').textContent='❓';
  document.getElementById('c-emoji').textContent='❓';
  document.getElementById('result-text').className='result-text idle';
  document.getElementById('result-text').textContent='Choose your move below!';
  document.getElementById('result-hint').textContent='';
  document.getElementById('history').innerHTML='';
  setBtns(true);
}

// load char
const saved=localStorage.getItem('rps_char');
if(saved){
  const d=JSON.parse(saved);
  document.getElementById('player-avatar').textContent=d.emoji;
  document.getElementById('player-char-name').textContent=d.name.toUpperCase();
}
