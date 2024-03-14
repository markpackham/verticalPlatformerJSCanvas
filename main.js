const canvas = document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 576;
// Canvas context for 2d API as opposed to a 3d one
const c = canvas.getContext("2d");

// Player
class Player {
  // We pass a new position (x & y Object) ever time we create a new player
  constructor(position) {
    this.position = position;
  }

  draw() {
    c.fillStyle = "red";
    // x & y refer to those created in the constructor
    c.fillRect(this.position.x, this.position.y, 100, 100);
  }

  update() {
    this.draw();
    this.position.y++;
  }
}

// Create Player
const player = new Player({ x: 0, y: 0 });
const player2 = new Player({ x: 0, y: 0 });

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
