const canvas = document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 576;
// Canvas context for 2d API as opposed to a 3d one
const c = canvas.getContext("2d");

// Player
class Player {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
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
const player = new Player();

function animate() {
  // Recursion
  window.requestAnimationFrame(animate);
  // Recreate canvas every single time animate() is called
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.update();
}

animate();
