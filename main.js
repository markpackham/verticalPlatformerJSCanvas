// Canvas
const canvas = document.querySelector("canvas");
// Canvas context for 2d API as opposed to a 3d one
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

gravity = 0.5;

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
  }

  draw() {
    c.fillStyle = "red";
    // x & y refer to those created in the constructor
    c.fillRect(this.position.x, this.position.y, 100, 100);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    // Player falls faster over time
    this.velocity.y += gravity;
  }
}

// Create Player
const player = new Player({ x: 0, y: 0 });
const player2 = new Player({ x: 300, y: 100 });

function animate() {
  // Recursion
  window.requestAnimationFrame(animate);
  // Recreate canvas every single time animate() is called
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.update();
  player2.update();
}

animate();
