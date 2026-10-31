let ghost;
let pumpkin = null;
let bat;
let score = 0;
let duration = 30;
let startTime;
let state = 'start';
let spawnEvery = 60;
let lastSpawn = 0;
let particles = [];
let stars = [];
let message = '';
let messageTimer = 0;

function setup() {
  createCanvas(480, 360);
  textFont('Georgia');

  for (let i = 0; i < 40; i++) {
    stars.push({ x: random(width), y: random(0, 250), size: random(1, 3) });
  }

  spawnGhost();
  bat = { x: 100, y: 100, vx: 2, vy: 1.5 };
}

function draw() {
  background(15, 10, 25);
  drawScene();

  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(255, 140, 0);
    textSize(38);
    text('GRAVEYARD PANIC', width / 2, 90);

    fill(255);
    textSize(15);
    text('Click the ghosts before they vanish!', width / 2, 150);
    text('Pumpkins = +3 points', width / 2, 175);
    text('Bats = -2 points (stay away!!)', width / 2, 200);

    fill(255, 240, 200);
    textSize(22);
    text('Click to start', width / 2, 260);

    drawGhost(80, 250, 255);
    drawPumpkin(400, 250);
    return;
  }

  if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill(200, 30, 30);
    textSize(36);
    text('GAME OVER', width / 2, 100);

    fill(255);
    textSize(24);
    text('Score: ' + score, width / 2, 160);

    textSize(16);
    let rating = 'The ghosts are laughing at you...';
    if (score >= 10) rating = 'Not bad, ghost hunter!';
    if (score >= 20) rating = 'Spooky good!!';
    if (score >= 30) rating = 'LEGENDARY GHOSTBUSTER';
    text(rating, width / 2, 200);

    fill(255, 240, 200);
    textSize(20);
    text('Click to retry', width / 2, 260);
    return;
  }

  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  if (timeLeft <= 0) {
    state = 'over';
    return;
  }

  spawnEvery = lerp(60, 22, elapsed / duration);

  if (frameCount - lastSpawn >= spawnEvery) {
    spawnGhost();
  }

  moveBat();

  drawBat(bat.x, bat.y);
  if (pumpkin) drawPumpkin(pumpkin.x, pumpkin.y);

  let alpha = map(sin(frameCount * 0.15), -1, 1, 150, 255);

  drawGhost(ghost.x + random(-2, 2), ghost.y + random(-2, 2), alpha);

  drawParticles();

  if (messageTimer > 0) {
    textAlign(CENTER, CENTER);
    fill(255, 220, 0);
    textSize(20);
    text(message, width / 2, 50);
    messageTimer--;
  }

  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  text('Score: ' + score, 12, 10);
  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), width - 12, 10);
}

function mousePressed() {

  if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    startTime = millis();
    particles = [];
    pumpkin = null;
    spawnGhost();
    return;
  }

  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score++;
    burst(ghost.x, ghost.y, color(220, 255, 230));
    showMessage('+1');
    spawnGhost();
    return;
  }

  if (pumpkin && dist(mouseX, mouseY, pumpkin.x, pumpkin.y) < 28) {
    score += 3;
    burst(pumpkin.x, pumpkin.y, color(255, 140, 0));
    showMessage('PUMPKIN! +3');
    pumpkin = null;
    return;
  }

  if (dist(mouseX, mouseY, bat.x, bat.y) < 28) {
    score = max(0, score - 2);
    burst(bat.x, bat.y, color(200, 30, 30));
    showMessage('OUCH! -2');
  }
}

function spawnGhost() {
  ghost = { x: random(40, width - 40), y: random(60, 270) };
  lastSpawn = frameCount;

  if (random() < 0.25) {
    pumpkin = { x: random(40, width - 40), y: random(60, 270) };
  } else {
    pumpkin = null;
  }
}

function moveBat() {
  bat.x += bat.vx;
  bat.y += bat.vy;

  if (bat.x < 30 || bat.x > width - 30) bat.vx *= -1;
  if (bat.y < 40 || bat.y > 280) bat.vy *= -1;
  bat.x = constrain(bat.x, 30, width - 30);
  bat.y = constrain(bat.y, 40, 280);
}

function showMessage(msg) {
  message = msg;
  messageTimer = 40;
}

function burst(x, y, c) {
  for (let i = 0; i < 15; i++) {
    particles.push({
      x: x,
      y: y,
      vx: random(-3, 3),
      vy: random(-3, 3),
      life: 255,
      col: c,
    });
  }
}

function drawParticles() {

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 8;
    noStroke();
    fill(red(p.col), green(p.col), blue(p.col), p.life);
    ellipse(p.x, p.y, 6, 6);
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function drawScene() {
  noStroke();

  fill(255);
  for (let s of stars) {
    ellipse(s.x, s.y, s.size, s.size);
  }

  fill(255, 200, 170);
  ellipse(400, 60, 60, 60);
  fill(230, 170, 150);
  ellipse(390, 52, 12, 12);
  ellipse(410, 70, 8, 8);

  fill(40, 30, 50);
  rect(0, 300, 480, 60);

  drawTombstone(60, 300);
  drawTombstone(200, 305);
  drawTombstone(330, 298);

  fill(200, 200, 220, 25);
  rect(0, 285, 480, 25);
}

function drawTombstone(x, y) {
  fill(90, 85, 105);
  rect(x - 15, y - 35, 30, 35);
  arc(x, y - 35, 30, 30, PI, TWO_PI);
  fill(60, 55, 75);
  rect(x - 2, y - 40, 4, 16);
  rect(x - 7, y - 35, 14, 4);
}

function drawGhost(x, y, alpha) {
  noStroke();
  fill(220, 255, 230, alpha);
  ellipse(x, y, 60, 60);

  rect(x - 30, y, 60, 22);
  fill(15, 10, 25, alpha);
  triangle(x - 30, y + 22, x - 20, y + 22, x - 25, y + 12);
  triangle(x - 10, y + 22, x, y + 22, x - 5, y + 12);
  triangle(x + 10, y + 22, x + 20, y + 22, x + 15, y + 12);

  fill(20);
  ellipse(x - 12, y - 5, 10);
  ellipse(x + 12, y - 5, 10);

  ellipse(x, y + 10, 10, 14);
}

function drawPumpkin(x, y) {
  noStroke();

  fill(255, 120, 0);
  ellipse(x, y, 52, 44);
  ellipse(x - 14, y, 28, 42);
  ellipse(x + 14, y, 28, 42);

  fill(40, 110, 40);
  rect(x - 3, y - 30, 6, 12);

  fill(255, 230, 50);
  triangle(x - 14, y - 6, x - 6, y - 6, x - 10, y - 14);
  triangle(x + 6, y - 6, x + 14, y - 6, x + 10, y - 14);
  triangle(x - 12, y + 6, x + 12, y + 6, x, y + 16);
}

function drawBat(x, y) {
  noStroke();
  fill(30, 20, 40);

  let flap = sin(frameCount * 0.4) * 10;
  triangle(x - 5, y, x - 35, y - 10 + flap, x - 20, y + 15);
  triangle(x + 5, y, x + 35, y - 10 + flap, x + 20, y + 15);

  ellipse(x, y, 20, 24);

  triangle(x - 8, y - 8, x - 4, y - 8, x - 8, y - 18);
  triangle(x + 8, y - 8, x + 4, y - 8, x + 8, y - 18);

  fill(255, 0, 0);
  ellipse(x - 4, y - 3, 4, 4);
  ellipse(x + 4, y - 3, 4, 4);
}
