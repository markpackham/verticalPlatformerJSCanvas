// Player
class Player {
  // We pass a new position (x & y Object) ever time we create a new player
  constructor(position) {
    this.position = position;
    // Since the character falls downwards by default we can ignore the "x" axis
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.height = 100;
  }

  draw() {
    c.fillStyle = "red";
    // x & y refer to those created in the constructor
    c.fillRect(this.position.x, this.position.y, 100, this.height);
  }

  update() {
    this.draw();

    // Move left & right
    this.position.x += this.velocity.x;

    // Falling
    this.position.y += this.velocity.y;

    // Keep player falling until they hit bottom of canvas
    if (this.position.y + this.height + this.velocity.y < canvas.height) {
      // Player falls faster over time
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}
