let particles = [];

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(0, 0, 0);

  // add new particles
  if (mouseIsPressed) {
    for (let i = 0; i < 2; i++) {
      particles.push(new Ellipses(mouseX, mouseY));
    }
  }
  
  // update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

class Ellipses {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.acc = createVector(0, 0);
    this.lifespan = random(50, 150);
    this.size = random(5, 15);
    this.color = color(random(360), 80, 100, this.lifespan);
  }
  
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifespan--;
    this.color = color(hue(this.color), saturation(this.color), brightness(this.color), this.lifespan);
  }
  
  draw() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
  
  isDead() {
    return this.lifespan <= 0;
  }
}
