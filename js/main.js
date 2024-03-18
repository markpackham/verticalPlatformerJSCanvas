// Gravity
gravity = 0.5;

// Canvas
const canvas = document.querySelector("canvas");
// Canvas context for 2d API as opposed to a 3d one
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};

const floorCollisions2D = [];

for (let i = 0; i < floorCollisions.length; i += 36) {
  // Slice 36 items of 1D floorCollisions array
  // each slice is then a sub array added to the 2D array floorCollisions2D
  floorCollisions2D.push(floorCollisions.slice(i, i + 36));
}

floorCollisions2D.forEach((row) => {
  row.forEach((symbol) => {
    // 202 is the symbol for a collision block
    if (symbol === 202) {
      // block gets drawn
    }
  });
});

// Create Player
const player = new Player({ x: 0, y: 0 });
const player2 = new Player({ x: 300, y: 100 });

// Check if keyboard key pressed down
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
};

// Background Sprite
const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./img/background.png",
});

// Animate
function animate() {
  // Recursion
  window.requestAnimationFrame(animate);
  // Recreate canvas every single time animate() is called
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  // Background
  c.save();
  // Increase size of background image
  // c.scale is a global method but here it will only target what lies within
  // c.save() and c.restore() so only the background gets a scale increase of *4
  c.scale(4, 4);
  // Use translate so first screen is bottom left corner of background image
  c.translate(0, -background.image.height + scaledCanvas.height);
  // Render background on screen
  background.update();
  c.restore();

  player.update();
  player2.update();

  player.velocity.x = 0;

  // Only move character if key pressed down
  if (keys.a.pressed) {
    player.velocity.x = -5;
  } else if (keys.d.pressed) {
    player.velocity.x = 5;
  }
}

animate();

// Keydown
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    // Move left
    case "a":
      keys.a.pressed = true;
      break;

    // Move right
    case "d":
      keys.d.pressed = true;
      break;

    // Jump
    case "w":
      keys.w.pressed = true;
      player.velocity.y = -20;
      break;

    default:
      break;
  }
});

// Keyup
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    // Move left
    case "a":
      keys.a.pressed = false;
      break;

    // Move right
    case "d":
      keys.d.pressed = false;
      break;

    default:
      break;
  }
});
