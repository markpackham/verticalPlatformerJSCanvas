// Gravity
gravity = 0.1;

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

// Floor & Platform block arrays
const floorCollisions2D = [];
const platformCollisions2D = [];
const collisionBlocks = [];
// Platform collision blocks behave differently from floor ones that you can't pass through
const platformCollisionBlocks = [];

for (let i = 0; i < floorCollisions.length; i += 36) {
  // Slice 36 items of 1D floorCollisions array
  // each slice is then a sub array added to the 2D array floorCollisions2D
  floorCollisions2D.push(floorCollisions.slice(i, i + 36));
}

// "y" is the index we're looping through
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    // 202 is the symbol for a collision block
    if (symbol === 202) {
      collisionBlocks.push(
        // 16 pixels is the size of the collision block so "* 16"
        new CollisionBlock({ position: { x: x * 16, y: y * 16 } })
      );
    }
  });
});

for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36));
}

platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      platformCollisionBlocks.push(
        new CollisionBlock({ position: { x: x * 16, y: y * 16 }, height: 4 })
      );
    }
  });
});

// Create Player & give them the collision blocks
const player = new Player({
  position: { x: 120, y: 0 },
  // Shorthand syntax for identical key & value
  // collisionBlocks: collisionBlocks,
  collisionBlocks,
  platformCollisionBlocks,

  // Path for images starts at root from index.html file
  // otherwise it's be imageSrc: "../img/warrior/Idle.png"
  // the idle sprite is the default animation
  imageSrc: "./img/warrior/Idle.png",
  // Idle.png has 8 frames
  frameRate: 8,

  animations: {
    Idle: {
      imageSrc: "./img/warrior/Idle.png",
      frameRate: 8,
      // Slowdown animation via buffer
      frameBuffer: 4,
    },
    Run: {
      imageSrc: "./img/warrior/Run.png",
      frameRate: 8,
      frameBuffer: 5,
    },
    Jump: {
      imageSrc: "./img/warrior/Jump.png",
      frameRate: 2,
      frameBuffer: 3,
    },
    Fall: {
      imageSrc: "./img/warrior/Fall.png",
      frameRate: 2,
      frameBuffer: 3,
    },
    FallLeft: {
      imageSrc: "./img/warrior/FallLeft.png",
      frameRate: 2,
      frameBuffer: 3,
    },
    RunLeft: {
      imageSrc: "./img/warrior/RunLeft.png",
      frameRate: 8,
      frameBuffer: 5,
    },
    IdleLeft: {
      imageSrc: "./img/warrior/IdleLeft.png",
      frameRate: 8,
      frameBuffer: 3,
    },
    JumpLeft: {
      imageSrc: "./img/warrior/JumpLeft.png",
      frameRate: 2,
      frameBuffer: 3,
    },
  },
});

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

const camera = {
  position: {
    x: 0,
    y: -backgroundImageHeight + scaledCanvas.height,
  },
};

// Animate
function animate() {
  // Recursion
  window.requestAnimationFrame(animate);
  // Recreate canvas every single time animate() is called
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  // Everything between save() & restore() gets impacted by scale
  c.save();
  // Increase size of background image
  // c.scale is a global method but here it will only target what lies within
  c.scale(4, 4);
  // Use translate so first screen is bottom left corner of background image
  c.translate(camera.position.x, camera.position.y);
  // Render background on screen
  background.update();

  // Floor collision blocks
  collisionBlocks.forEach((collisionBlock) => {
    // Render collision blocks
    collisionBlock.update();
  });

  platformCollisionBlocks.forEach((platformCollisionBlock) => {
    platformCollisionBlock.update();
  });

  player.checkForHorizontalCanvasCollision();

  player.update();

  player.velocity.x = 0;

  // Only move character if key pressed down
  if (keys.a.pressed) {
    player.switchSprite("RunLeft");
    player.velocity.x = -3;
    player.lastDirection = "left";
    player.shouldPanCameraToTheRight({ camera });
  } else if (keys.d.pressed) {
    player.switchSprite("Run");
    player.velocity.x = 3;
    player.lastDirection = "right";
    player.shouldPanCameraToTheLeft({ canvas, camera });
  } else if (player.velocity.y === 0) {
    // Idle is default state (if player not falling)
    if (player.lastDirection === "right") {
      player.switchSprite("Idle");
    } else {
      player.switchSprite("IdleLeft");
    }
  }

  // Jumping & Falling
  if (player.velocity.y < 0) {
    player.shouldPanCameraDown({ camera });
    if (player.lastDirection === "right") {
      player.switchSprite("Jump");
    } else {
      player.switchSprite("JumpLeft");
    }
  } else if (player.velocity.y > 0) {
    player.shouldPanCameraUp({ camera, canvas });
    if (player.lastDirection === "right") {
      player.switchSprite("Fall");
    } else {
      player.switchSprite("FallLeft");
    }
  }

  c.restore();
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
      player.velocity.y = -4;
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
