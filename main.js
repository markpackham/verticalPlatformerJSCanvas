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

// Create Player
const player = new Player({ x: 0, y: 0 });
const player2 = new Player({ x: 300, y: 100 });

// Animate
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

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    // Move left
    case "a":
      player.velocity.x = -1;
      break;

    // Move right
    case "d":
      player.velocity.x = 1;
      break;

    default:
      break;
  }
});
