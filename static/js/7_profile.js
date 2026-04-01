function switchTab(btn,name){
  document.querySelectorAll('.p-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-'+name).classList.add('active');
}

function switchTabByName(name){
  const targetBtn=document.querySelector(`.p-tab[onclick="switchTab(this,'${name}')"]`);
  if(targetBtn){
    switchTab(targetBtn,name);
  }
}

const profileNameEl=document.getElementById('profile-name');
const profileAvatarEl=document.getElementById('profile-avatar');
const favCharNameEl=document.getElementById('fav-char-name');
const favCharEl=document.getElementById('fav-char');
const equippedSkinTopEl=document.getElementById('equipped-skin-top');
const equippedEmoteTopEl=document.getElementById('equipped-emote-top');

const editModal=document.getElementById('edit-modal');
const editCloseBtn=document.getElementById('edit-close-btn');
const editCancelBtn=document.getElementById('edit-cancel-btn');
const editSaveBtn=document.getElementById('edit-save-btn');
const editNameInput=document.getElementById('edit-name-input');
const editPreviewAvatar=document.getElementById('edit-preview-avatar');
const editPreviewName=document.getElementById('edit-preview-name');
const avatarGrid=document.getElementById('avatar-grid');
const avatarUpload=document.getElementById('avatar-upload');
const uploadNote=document.getElementById('upload-note');

const analyticsPanel=document.getElementById('analytics-panel');
const analyticsClose=document.getElementById('analytics-close');
const statActionCards=document.querySelectorAll('[data-stat-action]');
const perfChartCards=document.querySelectorAll('.perf-chart-card');
const moveFilters=document.getElementById('move-filters');
const achievementCards=document.querySelectorAll('.ach-card');

const achModal=document.getElementById('ach-modal');
const achModalClose=document.getElementById('ach-modal-close');
const achModalIcon=document.getElementById('ach-modal-icon');
const achModalName=document.getElementById('ach-modal-name');
const achModalRarity=document.getElementById('ach-modal-rarity');
const achModalDesc=document.getElementById('ach-modal-desc');
const achModalDate=document.getElementById('ach-modal-date');
const achModalProgress=document.getElementById('ach-modal-progress');
const achModalReward=document.getElementById('ach-modal-reward');
const achModalStatus=document.getElementById('ach-modal-status');
const achUnlockRow=document.getElementById('ach-unlock-row');
const achProgressRow=document.getElementById('ach-progress-row');

const collectionItems=document.querySelectorAll('.coll-item[data-type]');
const collectionPreview=document.getElementById('collection-preview');
const collectionName=document.getElementById('collection-name');
const collectionMeta=document.getElementById('collection-meta');
const collectionDesc=document.getElementById('collection-desc');
const collectionActionBtn=document.getElementById('collection-action-btn');
const collectionSecondaryBtn=document.getElementById('collection-secondary-btn');
const collectionProgressWrap=document.getElementById('collection-progress-wrap');
const collectionProgressLabel=document.getElementById('collection-progress-label');
const collectionProgressText=document.getElementById('collection-progress-text');
const collectionProgressFill=document.getElementById('collection-progress-fill');
const activeSlotsWrap=document.getElementById('active-slots');
const emoteSlots=document.querySelectorAll('.emote-slot');
const toastMsg=document.getElementById('toast-msg');
const unlockPopup=document.getElementById('unlock-popup');
const unlockIcon=document.getElementById('unlock-icon');
const unlockName=document.getElementById('unlock-name');
const unlockBtn=document.getElementById('unlock-btn');

const analyticsEls={
  winRate:document.getElementById('a-win-rate'),
  duration:document.getElementById('a-duration'),
  firstMove:document.getElementById('a-first-move'),
  counter:document.getElementById('a-counter'),
  attackPct:document.getElementById('a-attack-pct'),
  defensePct:document.getElementById('a-defense-pct'),
  clutchPct:document.getElementById('a-clutch-pct'),
  attackBar:document.getElementById('a-attack-bar'),
  defenseBar:document.getElementById('a-defense-bar'),
  clutchBar:document.getElementById('a-clutch-bar')
};

const analyticsByMove={
  all:{winRate:'71%',duration:'02:14',firstMove:'66%',counter:'58%',attack:74,defense:64,clutch:49},
  rock:{winRate:'74%',duration:'02:20',firstMove:'69%',counter:'61%',attack:78,defense:67,clutch:52},
  paper:{winRate:'68%',duration:'02:08',firstMove:'63%',counter:'56%',attack:70,defense:60,clutch:46},
  scissors:{winRate:'70%',duration:'02:11',firstMove:'64%',counter:'57%',attack:73,defense:62,clutch:48}
};

const achievementMeta={
  'First Victory':{description:'Win your very first battle.',reward:'+25 coins',status:'unlocked'},
  'On Fire':{description:'Achieve 5 win streak.',reward:'+50 coins',status:'unlocked'},
  'Rock Solid':{description:'Win 50 battles as Rock.',reward:'+40 gems',status:'unlocked'},
  'Lightning Reflexes':{description:'Win a round in under 2 seconds.',reward:'+30 coins',status:'unlocked'},
  'Social Warrior':{description:'Win 10 multiplayer matches.',reward:'+60 gems',status:'unlocked'},
  'Perfect Match':{description:'Win a best-of-5 without losing.',reward:'+100 coins + Bronze badge',status:'unlocked'},
  'Legend':{description:'Reach Legendary rank.',reward:'+500 gems + Legend badge',status:'locked',progress:'Gold II -> Legendary (about 62%)'},
  'Century Club':{description:'Play 100 battles in a row.',reward:'+300 coins + Stamina badge',status:'locked',progress:'67 / 100 battles'},
  'World Conqueror':{description:'Beat players from 50 countries.',reward:'+800 coins + World badge',status:'locked',progress:'14 / 50 countries'},
  'Destroyer':{description:'Win 500 total battles.',reward:'+1200 coins + Destroyer badge',status:'locked',progress:'142 / 500 wins'}
};

let selectedCollectionItem=null;
let audioCtx=null;

function playUiSound(kind='click'){
  try{
    const Ctx=window.AudioContext||window.webkitAudioContext;
    if(!Ctx)return;
    if(!audioCtx){
      audioCtx=new Ctx();
    }

    const osc=audioCtx.createOscillator();
    const gain=audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if(kind==='equip'){
      osc.type='triangle';
      osc.frequency.setValueAtTime(620,audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880,audioCtx.currentTime+0.08);
      gain.gain.setValueAtTime(0.0001,audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08,audioCtx.currentTime+0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001,audioCtx.currentTime+0.14);
      osc.start();
      osc.stop(audioCtx.currentTime+0.14);
      return;
    }

    osc.type='sine';
    osc.frequency.setValueAtTime(430,audioCtx.currentTime);
    gain.gain.setValueAtTime(0.0001,audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05,audioCtx.currentTime+0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001,audioCtx.currentTime+0.08);
    osc.start();
    osc.stop(audioCtx.currentTime+0.08);
  }catch(_err){
    // Ignore audio failures so UI flow is never blocked.
  }
}

function normalizeLoadout(loadout){
  const result={
    skin:loadout?.skin||'Classic Rock',
    emotes:[null,null,null]
  };
  const source=Array.isArray(loadout?.emotes)?loadout.emotes:[];
  source.slice(0,3).forEach((value,index)=>{
    result.emotes[index]=value||null;
  });
  return result;
}

function showToast(message){
  if(!toastMsg)return;
  toastMsg.textContent=message;
  toastMsg.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer=setTimeout(()=>toastMsg.classList.remove('show'),1700);
}

function showUnlockPopup(icon,name){
  if(!unlockPopup)return;
  unlockIcon.textContent=icon||'✨';
  unlockName.textContent=name||'New Skin';
  unlockPopup.classList.add('show');
  unlockPopup.setAttribute('aria-hidden','false');
}

function closeUnlockPopup(){
  if(!unlockPopup)return;
  unlockPopup.classList.remove('show');
  unlockPopup.setAttribute('aria-hidden','true');
}

function flashEquipped(item){
  if(!item)return;
  item.classList.remove('equip-glow');
  void item.offsetWidth;
  item.classList.add('equip-glow');
}

function parseProgress(progressText){
  const match=String(progressText||'').match(/(\d+)\s*\/\s*(\d+)/);
  if(!match)return 0;
  const current=Number(match[1]);
  const total=Number(match[2]);
  if(!total)return 0;
  return Math.max(0,Math.min(100,Math.round((current/total)*100)));
}

function getEquippedLoadout(){
  const raw=localStorage.getItem('rps_loadout');
  if(!raw){
    return normalizeLoadout({skin:'Classic Rock',emotes:['😂']});
  }
  try{
    const parsed=JSON.parse(raw);
    const migratedEmotes=Array.isArray(parsed.emotes)
      ? parsed.emotes
      : (parsed.emote ? [parsed.emote] : ['😂']);
    return normalizeLoadout({
      skin:parsed.skin||'Classic Rock',
      emotes:migratedEmotes
    });
  }catch(_err){
    return normalizeLoadout({skin:'Classic Rock',emotes:['😂']});
  }
}

function saveEquippedLoadout(loadout){
  localStorage.setItem('rps_loadout',JSON.stringify(normalizeLoadout(loadout)));
}

function renderActiveEmoteSlots(loadout){
  if(!emoteSlots.length)return;
  emoteSlots.forEach((slot)=>{
    const index=Number(slot.dataset.slotIndex);
    const value=loadout.emotes[index];
    if(value){
      slot.textContent=value;
      slot.classList.add('filled');
    }else{
      slot.textContent='+';
      slot.classList.remove('filled');
    }
  });
}

function updateTopPreviewFromLoadout(loadout){
  const equippedSkinCard=document.querySelector(`.coll-item[data-type="skin"][data-name="${loadout.skin}"]`);
  const skinIcon=equippedSkinCard?.dataset.icon||favCharEl.textContent||'🪨';
  favCharEl.textContent=skinIcon;
  favCharNameEl.textContent=loadout.skin;
  favCharEl.classList.remove('top-preview-pop');
  void favCharEl.offsetWidth;
  favCharEl.classList.add('top-preview-pop');
}

function previewTopSelection(icon,name){
  if(!favCharEl||!favCharNameEl)return;
  favCharEl.textContent=icon;
  favCharNameEl.textContent=name;
  favCharEl.classList.remove('top-preview-pop');
  void favCharEl.offsetWidth;
  favCharEl.classList.add('top-preview-pop');
}

function refreshEquippedIndicators(){
  const loadout=normalizeLoadout(getEquippedLoadout());
  const equippedEmotes=loadout.emotes.filter(Boolean);
  collectionItems.forEach((item)=>{
    const type=item.dataset.type;
    const name=item.dataset.name;
    const icon=item.dataset.icon;
    const isEquipped=(type==='skin'&&name===loadout.skin)||(type==='emote'&&equippedEmotes.includes(icon));
    item.classList.toggle('equipped-item',isEquipped);
  });
  equippedSkinTopEl.textContent=loadout.skin;
  equippedEmoteTopEl.textContent=equippedEmotes.length?equippedEmotes.join(' '):'None';
  renderActiveEmoteSlots(loadout);
  updateTopPreviewFromLoadout(loadout);
}

function setCollectionPanel(item){
  playUiSound('click');
  selectedCollectionItem=item;
  collectionItems.forEach((node)=>node.classList.remove('selected-item'));
  item.classList.add('selected-item');

  const type=item.dataset.type;
  const unlocked=item.dataset.unlocked==='true';
  const name=item.dataset.name;
  const rarity=item.dataset.rarity;
  const icon=item.dataset.icon;

  collectionPreview.textContent=icon;
  collectionPreview.classList.remove('preview-bounce');
  collectionName.textContent=name;
  collectionMeta.textContent=`${rarity} - ${type==='skin'?'Skin':'Emote'}`;
  previewTopSelection(icon,name);

  if(unlocked){
    collectionProgressWrap.classList.remove('show');
    collectionSecondaryBtn.style.display=type==='emote'?'inline-flex':'none';
    if(type==='emote'){
      collectionSecondaryBtn.textContent='Add to Active Slot';
    }
    collectionActionBtn.disabled=false;
    if(type==='skin'){
      collectionDesc.textContent='Unlock complete. Equip this skin as your active fighter look.';
      collectionActionBtn.textContent='Equip Skin';
    }else{
      collectionDesc.textContent='Preview active. Equip this emote or drag it into an active slot.';
      collectionPreview.classList.add('preview-bounce');
      collectionActionBtn.textContent='Equip Emote';
    }
  }else{
    const unlockText=item.dataset.unlock||'Play more to unlock this item.';
    const progressText=item.dataset.progress||'0/100';
    const pct=parseProgress(progressText);

    collectionDesc.textContent=unlockText;
    collectionProgressWrap.classList.add('show');
    collectionProgressLabel.textContent='Unlock Progress';
    collectionProgressText.textContent=progressText;
    collectionProgressFill.style.width=`${pct}%`;

    if(type==='skin'&&pct>=100){
      collectionActionBtn.textContent='Unlock Skin';
      collectionActionBtn.disabled=false;
    }else{
      collectionActionBtn.textContent='Locked';
      collectionActionBtn.disabled=true;
    }
    collectionSecondaryBtn.style.display='inline-flex';
    collectionSecondaryBtn.textContent='Go to Battle';
  }
}

if(collectionItems.length){
  collectionItems.forEach((item)=>{
    item.addEventListener('click',()=>setCollectionPanel(item));
  });
}

if(collectionActionBtn){
  collectionActionBtn.addEventListener('click',()=>{
    if(!selectedCollectionItem)return;
    const unlocked=selectedCollectionItem.dataset.unlocked==='true';
    if(!unlocked)return;

    const type=selectedCollectionItem.dataset.type;
    const name=selectedCollectionItem.dataset.name;
    const icon=selectedCollectionItem.dataset.icon;
    const loadout=normalizeLoadout(getEquippedLoadout());

    if(type==='skin'){
      const canUnlock=selectedCollectionItem.dataset.unlocked==='false'&&parseProgress(selectedCollectionItem.dataset.progress)>=100;
      if(canUnlock){
        selectedCollectionItem.dataset.unlocked='true';
        selectedCollectionItem.classList.remove('locked-item');
        collectionDesc.textContent='Unlocked! You can now equip this skin.';
        showUnlockPopup(icon,name);
        showToast('✨ New Skin Unlocked!');
        playUiSound('equip');
        return;
      }
      loadout.skin=name;
      saveEquippedLoadout(loadout);
      refreshEquippedIndicators();
      flashEquipped(selectedCollectionItem);
      playUiSound('equip');
      showToast('✔️ Skin equipped successfully!');
    }else{
      if(!loadout.emotes.includes(icon)){
        const emptyIndex=loadout.emotes.findIndex((value)=>!value);
        if(emptyIndex!==-1){
          loadout.emotes[emptyIndex]=icon;
        }else{
          loadout.emotes[0]=icon;
        }
      }
      saveEquippedLoadout(loadout);
      refreshEquippedIndicators();
      flashEquipped(selectedCollectionItem);
      playUiSound('equip');
      showToast('✔️ Emote equipped!');
    }
  });
}

if(collectionSecondaryBtn){
  collectionSecondaryBtn.addEventListener('click',()=>{
    if(!selectedCollectionItem){
      return;
    }

    const type=selectedCollectionItem.dataset.type;
    const unlocked=selectedCollectionItem.dataset.unlocked==='true';

    if(type==='emote'&&unlocked){
      const icon=selectedCollectionItem.dataset.icon;
      const loadout=normalizeLoadout(getEquippedLoadout());
      const emptyIndex=loadout.emotes.findIndex((value)=>!value);
      if(loadout.emotes.includes(icon)){
        showToast('This emote is already active.');
        return;
      }
      if(emptyIndex!==-1){
        loadout.emotes[emptyIndex]=icon;
      }else{
        loadout.emotes[0]=icon;
      }
      saveEquippedLoadout(loadout);
      refreshEquippedIndicators();
      flashEquipped(selectedCollectionItem);
      playUiSound('equip');
      showToast('✔️ Emote equipped!');
      return;
    }

    window.location.href='3_battle_arena.html';
  });
}

collectionItems.forEach((item)=>{
  if(item.dataset.type==='emote'&&item.dataset.unlocked==='true'){
    item.addEventListener('dragstart',(event)=>{
      item.classList.add('dragging');
      event.dataTransfer.setData('text/plain',item.dataset.icon);
      event.dataTransfer.effectAllowed='copy';
    });
    item.addEventListener('dragend',()=>item.classList.remove('dragging'));
  }
});

emoteSlots.forEach((slot)=>{
  slot.addEventListener('dragover',(event)=>{
    event.preventDefault();
    slot.classList.add('drag-over');
  });
  slot.addEventListener('dragleave',()=>slot.classList.remove('drag-over'));
  slot.addEventListener('drop',(event)=>{
    event.preventDefault();
    slot.classList.remove('drag-over');
    const icon=event.dataTransfer.getData('text/plain');
    if(!icon)return;

    const loadout=normalizeLoadout(getEquippedLoadout());
    const targetIndex=Number(slot.dataset.slotIndex);
    const existingIndex=loadout.emotes.indexOf(icon);
    if(existingIndex!==-1){
      loadout.emotes[existingIndex]=null;
    }
    loadout.emotes[targetIndex]=icon;

    saveEquippedLoadout(loadout);
    refreshEquippedIndicators();
    playUiSound('equip');
    showToast('✔️ Emote equipped!');
  });
});

if(unlockBtn){
  unlockBtn.addEventListener('click',()=>{
    closeUnlockPopup();
  });
}

if(unlockPopup){
  unlockPopup.addEventListener('click',(event)=>{
    if(event.target===unlockPopup){
      closeUnlockPopup();
    }
  });
}

function openAchievementModal(){
  if(!achModal)return;
  achModal.classList.add('show');
  achModal.setAttribute('aria-hidden','false');
}

function closeAchievementModal(){
  if(!achModal)return;
  achModal.classList.remove('show');
  achModal.setAttribute('aria-hidden','true');
}

achievementCards.forEach((card)=>{
  card.addEventListener('click',()=>{
    const name=card.querySelector('.ach-name')?.textContent?.trim()||'Achievement';
    const description=card.querySelector('.ach-desc')?.textContent?.trim()||'No description available.';
    const date=card.querySelector('.ach-date')?.textContent?.trim()||'';
    const icon=card.querySelector('.ach-icon')?.textContent?.trim()||'🏆';
    const rarity=card.querySelector('.ach-rarity')?.textContent?.trim()||'Unknown';
    const isLocked=card.classList.contains('locked');

    const meta=achievementMeta[name]||{};
    const finalDesc=meta.description||description;
    const reward=meta.reward||'+0 coins';
    const status=(meta.status||(isLocked?'locked':'unlocked')).toLowerCase();
    const progress=meta.progress||(status==='locked'?'In progress':'Completed');
    const unlockDate=date||(status==='locked'?'Not unlocked yet':'Unknown');

    achModalIcon.textContent=icon;
    achModalName.textContent=name;
    achModalRarity.textContent=rarity;
    achModalDesc.textContent=finalDesc;
    achModalReward.textContent=reward;

    if(status==='locked'){
      achModalStatus.textContent='🔒 Locked';
      achModalStatus.classList.remove('unlocked');
      achModalStatus.classList.add('locked');
      achUnlockRow.style.display='none';
      achProgressRow.style.display='block';
      achModalProgress.textContent=progress;
    } else {
      achModalStatus.textContent='✅ Unlocked';
      achModalStatus.classList.remove('locked');
      achModalStatus.classList.add('unlocked');
      achUnlockRow.style.display='block';
      achProgressRow.style.display='none';
      achModalDate.textContent=unlockDate;
    }

    openAchievementModal();
  });
});

if(achModalClose){
  achModalClose.addEventListener('click',closeAchievementModal);
}

if(achModal){
  achModal.addEventListener('click',(event)=>{
    if(event.target===achModal){
      closeAchievementModal();
    }
  });
}

function openAnalyticsPanel(){
  if(!analyticsPanel)return;
  analyticsPanel.classList.add('show');
  analyticsPanel.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function applyMoveAnalytics(move){
  const data=analyticsByMove[move]||analyticsByMove.all;
  analyticsEls.winRate.textContent=data.winRate;
  analyticsEls.duration.textContent=data.duration;
  analyticsEls.firstMove.textContent=data.firstMove;
  analyticsEls.counter.textContent=data.counter;

  analyticsEls.attackPct.textContent=`${data.attack}%`;
  analyticsEls.defensePct.textContent=`${data.defense}%`;
  analyticsEls.clutchPct.textContent=`${data.clutch}%`;

  analyticsEls.attackBar.style.width=`${data.attack}%`;
  analyticsEls.defenseBar.style.width=`${data.defense}%`;
  analyticsEls.clutchBar.style.width=`${data.clutch}%`;
}

statActionCards.forEach((card)=>{
  card.addEventListener('click',()=>{
    const action=card.dataset.statAction;
    if(action==='battles'){
      switchTabByName('history');
      return;
    }
    if(action==='win-rate'){
      switchTabByName('overview');
      openAnalyticsPanel();
      applyMoveAnalytics('all');
    }
  });
});

perfChartCards.forEach((card)=>{
  card.addEventListener('click',()=>{
    switchTabByName('overview');
    openAnalyticsPanel();
    applyMoveAnalytics('all');
  });
});

if(moveFilters){
  moveFilters.addEventListener('click',(event)=>{
    const btn=event.target.closest('.move-filter');
    if(!btn)return;
    moveFilters.querySelectorAll('.move-filter').forEach((item)=>item.classList.remove('active'));
    btn.classList.add('active');
    applyMoveAnalytics(btn.dataset.move);
  });
}

if(analyticsClose){
  analyticsClose.addEventListener('click',()=>{
    analyticsPanel.classList.remove('show');
  });
}

let draftProfileState={name:'ARENA WARRIOR',avatarType:'emoji',avatarValue:'🧑'};
let beforeEditState={name:'ARENA WARRIOR',avatarType:'emoji',avatarValue:'🧑'};

function readCurrentProfileState(){
  return {
    name:profileNameEl.textContent.trim()||'ARENA WARRIOR',
    avatarType:profileAvatarEl.dataset.avatarType||'emoji',
    avatarValue:profileAvatarEl.dataset.avatarValue||profileAvatarEl.textContent.trim()||'🧑'
  };
}

function renderAvatar(targetEl,type,value){
  if(type==='image'){
    targetEl.classList.add('avatar-image');
    targetEl.style.backgroundImage=`url('${value}')`;
    targetEl.textContent='';
    return;
  }
  targetEl.classList.remove('avatar-image');
  targetEl.style.backgroundImage='';
  targetEl.textContent=value||'🧑';
}

function applyProfileState(state){
  const normalizedName=(state.name||'ARENA WARRIOR').trim();
  const displayName=normalizedName?normalizedName.toUpperCase():'ARENA WARRIOR';
  profileNameEl.textContent=displayName;
  profileAvatarEl.dataset.avatarType=state.avatarType;
  profileAvatarEl.dataset.avatarValue=state.avatarValue;
  renderAvatar(profileAvatarEl,state.avatarType,state.avatarValue);
}

function syncModalFromDraft(){
  editNameInput.value=draftProfileState.name;
  editPreviewName.textContent=(draftProfileState.name||'ARENA WARRIOR').toUpperCase();
  renderAvatar(editPreviewAvatar,draftProfileState.avatarType,draftProfileState.avatarValue);

  document.querySelectorAll('.avatar-choice').forEach((choice)=>{
    choice.classList.toggle('active',draftProfileState.avatarType==='emoji'&&choice.dataset.avatar===draftProfileState.avatarValue);
  });
}

function openEditModal(){
  beforeEditState=readCurrentProfileState();
  draftProfileState={...beforeEditState,name:beforeEditState.name};
  syncModalFromDraft();
  uploadNote.textContent='PNG/JPG up to 5MB';
  editModal.classList.add('show');
  editModal.setAttribute('aria-hidden','false');
  editNameInput.focus();
  editNameInput.select();
}

function closeEditModal(){
  editModal.classList.remove('show');
  editModal.setAttribute('aria-hidden','true');
}

function editProfile(){
  openEditModal();
}

if(editNameInput){
  editNameInput.addEventListener('input',(event)=>{
    draftProfileState.name=event.target.value||'';
    editPreviewName.textContent=(draftProfileState.name||'ARENA WARRIOR').toUpperCase();
    applyProfileState(draftProfileState);
  });
}

if(avatarGrid){
  avatarGrid.addEventListener('click',(event)=>{
    const choice=event.target.closest('.avatar-choice');
    if(!choice)return;
    draftProfileState.avatarType='emoji';
    draftProfileState.avatarValue=choice.dataset.avatar;
    syncModalFromDraft();
    applyProfileState(draftProfileState);
  });
}

if(avatarUpload){
  avatarUpload.addEventListener('change',(event)=>{
    const file=event.target.files&&event.target.files[0];
    if(!file)return;

    if(!file.type.startsWith('image/')){
      uploadNote.textContent='Please choose an image file.';
      return;
    }
    if(file.size>5*1024*1024){
      uploadNote.textContent='File too large. Max size is 5MB.';
      return;
    }

    const reader=new FileReader();
    reader.onload=()=>{
      draftProfileState.avatarType='image';
      draftProfileState.avatarValue=String(reader.result);
      uploadNote.textContent=`Loaded: ${file.name}`;
      syncModalFromDraft();
      applyProfileState(draftProfileState);
    };
    reader.readAsDataURL(file);
  });
}

if(editCancelBtn){
  editCancelBtn.addEventListener('click',()=>{
    applyProfileState(beforeEditState);
    closeEditModal();
  });
}

if(editCloseBtn){
  editCloseBtn.addEventListener('click',()=>{
    applyProfileState(beforeEditState);
    closeEditModal();
  });
}

if(editSaveBtn){
  editSaveBtn.addEventListener('click',()=>{
    const savedState={
      name:(draftProfileState.name||'ARENA WARRIOR').trim()||'ARENA WARRIOR',
      avatarType:draftProfileState.avatarType,
      avatarValue:draftProfileState.avatarValue
    };
    applyProfileState(savedState);
    localStorage.setItem('rps_profile_custom',JSON.stringify(savedState));
    closeEditModal();
  });
}

if(editModal){
  editModal.addEventListener('click',(event)=>{
    if(event.target===editModal){
      applyProfileState(beforeEditState);
      closeEditModal();
    }
  });
}

const shareBtn=document.getElementById('share-btn');
const shareMenu=document.getElementById('share-menu');
const shareNote=document.getElementById('share-note');

function getSharePayload(){
  const name=document.getElementById('profile-name').textContent.trim();
  const url=window.location.href;
  const text=`Check out ${name} on RPS Battle Arena!`;
  return {name,url,text};
}

function updateShareNote(message){
  if(shareNote){
    shareNote.textContent=message;
  }
}

async function copyShareLink(url){
  if(navigator.clipboard&&navigator.clipboard.writeText){
    await navigator.clipboard.writeText(url);
    return;
  }
  const temp=document.createElement('textarea');
  temp.value=url;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand('copy');
  document.body.removeChild(temp);
}

function openShareWindow(url){
  window.open(url,'_blank','noopener,noreferrer');
}

function toggleShareMenu(forceOpen){
  if(!shareMenu)return;
  const shouldOpen=typeof forceOpen==='boolean'?forceOpen:!shareMenu.classList.contains('show');
  shareMenu.classList.toggle('show',shouldOpen);
  shareMenu.setAttribute('aria-hidden',String(!shouldOpen));
}

if(shareBtn&&shareMenu){
  shareBtn.addEventListener('click',(event)=>{
    event.stopPropagation();
    toggleShareMenu();
  });

  shareMenu.addEventListener('click',async (event)=>{
    const item=event.target.closest('.share-item');
    if(!item)return;

    const action=item.dataset.share;
    const {url,text}=getSharePayload();

    try{
      if(action==='copy'){
        await copyShareLink(url);
        updateShareNote('Profile link copied to clipboard.');
      } else if(action==='whatsapp'){
        openShareWindow(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`);
        updateShareNote('Opened WhatsApp share.');
      } else if(action==='telegram'){
        openShareWindow(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
        updateShareNote('Opened Telegram share.');
      } else if(action==='x'){
        openShareWindow(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        updateShareNote('Opened X share.');
      } else if(action==='native'){
        if(navigator.share){
          await navigator.share({title:'RPS Battle Arena Profile',text,url});
          updateShareNote('Thanks for sharing your profile.');
        } else {
          await copyShareLink(url);
          updateShareNote('Share API not available. Link copied instead.');
        }
      }
    } catch(_err){
      updateShareNote('Unable to share right now. Please try again.');
    }
  });

  document.addEventListener('click',(event)=>{
    if(!shareMenu.contains(event.target)&&event.target!==shareBtn){
      toggleShareMenu(false);
    }
  });

  document.addEventListener('keydown',(event)=>{
    if(event.key==='Escape'){
      toggleShareMenu(false);
      closeUnlockPopup();
      closeAchievementModal();
      if(editModal&&editModal.classList.contains('show')){
        applyProfileState(beforeEditState);
        closeEditModal();
      }
    }
  });
}

// load char from selection page
const saved=localStorage.getItem('rps_char');
if(saved){
  const d=JSON.parse(saved);
  document.getElementById('fav-char').textContent=d.emoji;
  document.getElementById('fav-char-name').textContent=d.name;
  profileAvatarEl.dataset.avatarType='emoji';
  profileAvatarEl.dataset.avatarValue=d.emoji;
  renderAvatar(profileAvatarEl,'emoji',d.emoji);
}

const customProfile=localStorage.getItem('rps_profile_custom');
if(customProfile){
  try{
    const parsed=JSON.parse(customProfile);
    applyProfileState({
      name:parsed.name||profileNameEl.textContent,
      avatarType:parsed.avatarType||'emoji',
      avatarValue:parsed.avatarValue||profileAvatarEl.dataset.avatarValue||'🧑'
    });
  }catch(_err){
    localStorage.removeItem('rps_profile_custom');
  }
}else if(!profileAvatarEl.dataset.avatarType){
  profileAvatarEl.dataset.avatarType='emoji';
  profileAvatarEl.dataset.avatarValue=profileAvatarEl.textContent.trim()||'🧑';
}

refreshEquippedIndicators();

if(collectionItems.length){
  const defaultItem=document.querySelector('.coll-item[data-type="skin"][data-name="Classic Rock"]')||collectionItems[0];
  if(defaultItem){
    setCollectionPanel(defaultItem);
  }
}
