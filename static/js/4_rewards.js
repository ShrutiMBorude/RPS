const DAILY_KEY='rps_daily_last_claim_at';
const WIN5_PROGRESS_KEY='rps_win5_progress';
const WIN5_CLAIMED_KEY='rps_win5_claimed';
const DAY_MS=24*60*60*1000;

const coinsEl=document.getElementById('coins');
const rewardToast=document.getElementById('reward-toast');

const dailyCard=document.getElementById('daily-reward-card');
const dailyTop=document.getElementById('daily-reward-top');
const dailyBtn=document.getElementById('daily-claim-btn');

const win5Card=document.getElementById('win5-reward-card');
const win5Btn=document.getElementById('win5-claim-btn');
const win5ProgressText=document.getElementById('win5-progress-text');
const win5ProgressFill=document.getElementById('win5-progress-fill');

const dbgWinReset=document.getElementById('dbg-win-reset');
const dbgDailyReset=document.getElementById('dbg-daily-reset');
const dbgResetPerfect=document.getElementById('dbg-reset-perfect');
const dbgResetGold=document.getElementById('dbg-reset-gold');
const dbgResetStreak7=document.getElementById('dbg-reset-streak7');
const dbgResetVeteran=document.getElementById('dbg-reset-veteran');

const perfectMatchCard=document.getElementById('perfect-match-card');
const perfectMatchClaimBtn=document.getElementById('perfect-match-claim-btn');

const reachGoldCard=document.getElementById('reach-gold-card');
const goldProgressText=document.getElementById('gold-progress-text');
const goldProgressFill=document.getElementById('gold-progress-fill');
const goldClaimBtn=document.getElementById('gold-claim-btn');

const streak7Card=document.getElementById('streak7-card');
const streak7ProgressText=document.getElementById('streak7-progress-text');
const streak7ProgressFill=document.getElementById('streak7-progress-fill');
const streak7ClaimBtn=document.getElementById('streak7-claim-btn');

const veteranCard=document.getElementById('veteran-card');
const veteranProgressText=document.getElementById('veteran-progress-text');
const veteranProgressFill=document.getElementById('veteran-progress-fill');
const veteranClaimBtn=document.getElementById('veteran-claim-btn');
const referModal=document.getElementById('refer-modal');
const referClose=document.getElementById('refer-close');
const referCode=document.getElementById('refer-code');

let referTriggerBtn=null;

function showRewardToast(message){
  if(!rewardToast)return;
  rewardToast.textContent=message;
  rewardToast.classList.add('show');
  clearTimeout(showRewardToast.timer);
  showRewardToast.timer=setTimeout(()=>rewardToast.classList.remove('show'),1800);
}

function getCoins(){
  return parseInt(coinsEl.textContent.replace(/,/g,''),10)||0;
}

function addCoins(amount){
  const updated=getCoins()+amount;
  coinsEl.textContent=updated.toLocaleString();
}

function setClaimedState(card,top,btn,isClaimed){
  const existing=top.querySelector('.claimed-stamp');
  if(isClaimed){
    card.classList.add('claimed');
    btn.textContent='✓ Claimed';
    btn.className='claim-btn claimed-btn';
    btn.disabled=true;
    if(!existing){
      const stamp=document.createElement('span');
      stamp.className='claimed-stamp';
      stamp.textContent='✓ CLAIMED';
      top.insertBefore(stamp,top.firstChild);
    }
  }else{
    card.classList.remove('claimed');
    btn.textContent='Claim';
    btn.className='claim-btn';
    btn.disabled=false;
    if(existing){
      existing.remove();
    }
  }
}

function updateDailyLoginState(){
  const lastClaimAt=Number(localStorage.getItem(DAILY_KEY)||0);
  const canClaim=!lastClaimAt||(Date.now()-lastClaimAt)>=DAY_MS;
  setClaimedState(dailyCard,dailyTop,dailyBtn,!canClaim);
}

function claimDailyLogin(){
  const lastClaimAt=Number(localStorage.getItem(DAILY_KEY)||0);
  const canClaim=!lastClaimAt||(Date.now()-lastClaimAt)>=DAY_MS;
  if(!canClaim){
    showRewardToast('Daily reward already claimed. Try after 24 hours.');
    return;
  }
  addCoins(100);
  localStorage.setItem(DAILY_KEY,String(Date.now()));
  updateDailyLoginState();
  showRewardToast('✅ Daily +100 coins added!');
}

function getWin5Progress(){
  const fromStorage=Number(localStorage.getItem(WIN5_PROGRESS_KEY));
  if(Number.isFinite(fromStorage)&&fromStorage>=0){
    return Math.max(0,Math.min(5,fromStorage));
  }
  return 3;
}

function setWin5Progress(value){
  const clamped=Math.max(0,Math.min(5,Number(value)||0));
  localStorage.setItem(WIN5_PROGRESS_KEY,String(clamped));
}

function updateWin5State(){
  const progress=getWin5Progress();
  const pct=Math.round((progress/5)*100);
  const claimed=localStorage.getItem(WIN5_CLAIMED_KEY)==='true';

  win5ProgressText.textContent=`${progress} / 5`;
  win5ProgressFill.style.width=`${pct}%`;

  if(claimed){
    setClaimedState(win5Card,win5Card.querySelector('.card-top'),win5Btn,true);
    return;
  }

  if(progress>=5){
    win5Card.classList.remove('claimed');
    win5Btn.textContent='Claim';
    win5Btn.className='claim-btn';
    win5Btn.disabled=false;
  }else{
    win5Card.classList.remove('claimed');
    win5Btn.textContent='In Progress';
    win5Btn.className='claim-btn';
    win5Btn.disabled=false;
  }
}

function claimWin5Reward(){
  const claimed=localStorage.getItem(WIN5_CLAIMED_KEY)==='true';
  if(claimed){
    showRewardToast('Win 5 Battles reward already claimed.');
    return;
  }

  const progress=getWin5Progress();
  if(progress<5){
    showRewardToast('Complete 5 battles first.');
    return;
  }

  addCoins(500);
  localStorage.setItem(WIN5_CLAIMED_KEY,'true');
  updateWin5State();
  showRewardToast('✅ +500 coins reward claimed!');
}

function claimReward(btn){
  const card=btn.closest('.reward-card');
  card.classList.add('claimed');
  btn.textContent='✓ Claimed';
  btn.className='claim-btn claimed-btn';
  btn.disabled=true;
  const top=card.querySelector('.card-top');
  const stamp=document.createElement('span');
  stamp.className='claimed-stamp';
  stamp.textContent='✓ CLAIMED';
  top.insertBefore(stamp,top.firstChild);
  addCoins(200);
}

function removeClaimedStamp(card){
  const stamp=card.querySelector('.claimed-stamp');
  if(stamp){
    stamp.remove();
  }
}

function setCardProgress(textEl,fillEl,current,total,suffix=''){
  textEl.textContent=suffix?`${current} / ${total} ${suffix}`:`${current} / ${total}`;
  fillEl.style.width=`${Math.round((current/total)*100)}%`;
}

function markReferRewardClaimed(){
  if(!referTriggerBtn||referTriggerBtn.disabled)return;
  const card=referTriggerBtn.closest('.reward-card');
  card.classList.add('claimed');
  referTriggerBtn.textContent='✓ Claimed';
  referTriggerBtn.className='claim-btn claimed-btn';
  referTriggerBtn.disabled=true;
  const top=card.querySelector('.card-top');
  const stamp=document.createElement('span');
  stamp.className='claimed-stamp';
  stamp.textContent='✓ CLAIMED';
  top.insertBefore(stamp,top.firstChild);
  addCoins(500);
}

function getReferLink(){
  const code=(referCode?.textContent||'RPS-ARENA-142').trim();
  const base=`${window.location.origin}${window.location.pathname}`;
  return `${base}?ref=${encodeURIComponent(code)}`;
}

function openReferFriendModal(btn){
  referTriggerBtn=btn;
  referModal.classList.add('show');
  referModal.setAttribute('aria-hidden','false');
}

function closeReferFriendModal(){
  referModal.classList.remove('show');
  referModal.setAttribute('aria-hidden','true');
}

async function shareReferOption(type){
  const link=getReferLink();
  const text='Join me in RPS Battle Arena using my invite!';

  try{
    if(type==='copy'){
      if(navigator.clipboard&&navigator.clipboard.writeText){
        await navigator.clipboard.writeText(link);
      }else{
        const tmp=document.createElement('textarea');
        tmp.value=link;
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand('copy');
        document.body.removeChild(tmp);
      }
      showRewardToast('Invite link copied. Reward claimed!');
      markReferRewardClaimed();
      closeReferFriendModal();
      return;
    }

    if(type==='whatsapp'){
      window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${link}`)}`,'_blank','noopener,noreferrer');
      showRewardToast('Shared on WhatsApp. Reward claimed!');
      markReferRewardClaimed();
      closeReferFriendModal();
      return;
    }

    if(type==='telegram'){
      window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`,'_blank','noopener,noreferrer');
      showRewardToast('Shared on Telegram. Reward claimed!');
      markReferRewardClaimed();
      closeReferFriendModal();
    }
  }catch(_err){
    showRewardToast('Unable to share right now.');
  }
}

updateDailyLoginState();
updateWin5State();

if(dbgWinReset){
  dbgWinReset.addEventListener('click',()=>{
    setWin5Progress(0);
    localStorage.removeItem(WIN5_CLAIMED_KEY);
    updateWin5State();
    showRewardToast('Debug: Win5 reward reset');
  });
}

if(dbgDailyReset){
  dbgDailyReset.addEventListener('click',()=>{
    localStorage.removeItem(DAILY_KEY);
    updateDailyLoginState();
    showRewardToast('Debug: Daily claim reset');
  });
}

if(dbgResetPerfect){
  dbgResetPerfect.addEventListener('click',()=>{
    perfectMatchCard.classList.remove('claimed');
    removeClaimedStamp(perfectMatchCard);
    perfectMatchClaimBtn.textContent='Claim';
    perfectMatchClaimBtn.className='claim-btn';
    perfectMatchClaimBtn.disabled=false;
    showRewardToast('Debug: Perfect Match reset');
  });
}

if(dbgResetGold){
  dbgResetGold.addEventListener('click',()=>{
    reachGoldCard.classList.add('locked');
    setCardProgress(goldProgressText,goldProgressFill,0,3,'wins');
    goldClaimBtn.textContent='Locked';
    goldClaimBtn.disabled=true;
    showRewardToast('Debug: Reach Gold Rank reset');
  });
}

if(dbgResetStreak7){
  dbgResetStreak7.addEventListener('click',()=>{
    streak7Card.classList.add('locked');
    setCardProgress(streak7ProgressText,streak7ProgressFill,0,7);
    streak7ClaimBtn.textContent='Keep Streak';
    streak7ClaimBtn.disabled=true;
    showRewardToast('Debug: 7-Day Streak reset');
  });
}

if(dbgResetVeteran){
  dbgResetVeteran.addEventListener('click',()=>{
    veteranCard.classList.remove('claimed');
    removeClaimedStamp(veteranCard);
    setCardProgress(veteranProgressText,veteranProgressFill,0,50);
    veteranClaimBtn.textContent='Almost!';
    veteranClaimBtn.className='claim-btn';
    veteranClaimBtn.disabled=true;
    showRewardToast('Debug: Arena Veteran reset');
  });
}

if(referClose){
  referClose.addEventListener('click',closeReferFriendModal);
}

if(referModal){
  referModal.addEventListener('click',(event)=>{
    if(event.target===referModal){
      closeReferFriendModal();
    }
  });
}

document.addEventListener('keydown',(event)=>{
  if(event.key==='Escape'&&referModal?.classList.contains('show')){
    closeReferFriendModal();
  }
});
