let currentTurn = 1;
let p1HP = 30;
let p2HP = 30;

function updateHP() {
  const p1El = document.getElementById('p1hp');
  const p2El = document.getElementById('p2hp');

  p1El.textContent = p1HP;
  p2El.textContent = p2HP;

  p1El.className = 'hp-display' + (p1HP <= 8 ? ' low' : '');
  p2El.className = 'hp-display' + (p2HP <= 8 ? ' low' : '');

  document.getElementById('turnBanner').textContent =
    'Player ' + currentTurn + ' Attacks';

  checkWin();
}

function checkWin() {
  if (p1HP <= 0 || p2HP <= 0) {
    const winner = p1HP <= 0 ? 'Player 2' : 'Player 1';
    document.getElementById('winText').textContent = winner + ' Wins!';
    document.getElementById('winOverlay').style.display = 'flex';
  }
}

function changeHP(player, amount) {
  if (player === 1) p1HP = Math.max(0, p1HP + amount);
  else p2HP = Math.max(0, p2HP + amount);
  updateHP();
}

function getValues() {
  const speed = parseInt(document.getElementById('speed').value) || 0;
  const damage = parseInt(document.getElementById('damage').value) || 0;
  const blockMod = parseInt(document.getElementById('blockMod').value) || 0;
  const noBlock = document.getElementById('noBlock').checked;
  const attackZone = document.getElementById('attackZone').value;
  const blockZone = document.getElementById('blockZone').value;
  const zoneMismatch = attackZone !== blockZone;
  return { speed, damage, blockMod, noBlock, attackZone, blockZone, zoneMismatch };
}

function applyDamage(dmg) {
  if (currentTurn === 1) p2HP = Math.max(0, p2HP - dmg);
  else p1HP = Math.max(0, p1HP - dmg);
  updateHP();
}

function resolveBlock() {
  const v = getValues();
  const req = Math.max(0, v.speed + v.blockMod);
  const warn = v.zoneMismatch
    ? '<span class="result-warning">⚠ Zone mismatch</span>'
    : '';
  document.getElementById('result').innerHTML =
    '<span class="result-blocked">BLOCKED</span>' +
    ' — Check needed: <span class="result-check">' + req + '+</span>' +
    warn;
}

function resolveHalf() {
  const v = getValues();
  const half = Math.ceil(v.damage / 2);
  applyDamage(half);
  const defender = currentTurn === 1 ? 2 : 1;
  document.getElementById('result').innerHTML =
    '<span class="result-hit">HALF DAMAGE: ' + half + '</span>' +
    ' dealt to Player ' + defender;
}

function resolveHit() {
  const v = getValues();
  applyDamage(v.damage);
  const defender = currentTurn === 1 ? 2 : 1;
  document.getElementById('result').innerHTML =
    '<span class="result-hit">HIT: ' + v.damage + ' damage</span>' +
    ' dealt to Player ' + defender;
}

function nextTurn() {
  currentTurn = currentTurn === 1 ? 2 : 1;
  document.getElementById('result').innerHTML =
    '<span class="result-placeholder">— Set attack &amp; defense, then resolve —</span>';
  updateHP();
}

function resetGame() {
  p1HP = 30;
  p2HP = 30;
  currentTurn = 1;
  document.getElementById('winOverlay').style.display = 'none';
  document.getElementById('result').innerHTML =
    '<span class="result-placeholder">— Set attack &amp; defense, then resolve —</span>';
  document.getElementById('diceResult').textContent = '—';
  updateHP();
}

function rollDice() {
  const el = document.getElementById('diceResult');
  let count = 0;
  el.style.color = '#fff';
  const interval = setInterval(() => {
    el.textContent = Math.ceil(Math.random() * 6);
    count++;
    if (count >= 12) {
      clearInterval(interval);
      el.style.color = '#e8a020';
    }
  }, 55);
}

// Init
updateHP();