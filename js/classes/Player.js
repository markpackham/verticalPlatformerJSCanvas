// Player
class Player extends Sprite {
  // We pass a new position (x & y Object) ever time we create a new player
  constructor({
    position,
    collisionBlocks,
    imageSrc,
    frameRate,
    scale = 0.5,
    animations,
  }) {
    super({ imageSrc, frameRate, scale });

    this.position = position;
    // Since the character falls downwards by default we can ignore the "x" axis
    this.velocity = {
      x: 0,
      y: 1,
    };

    // We need to add collision blocks to monitor for collisions
    this.collisionBlocks = collisionBlocks;

    this.hitBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    };

    this.animations = animations;

    // keys like "Idle" or "Run"
    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;

      this.animations[key].image = image;
    }
  }

  switchSprite(key) {
    // Don't bother doing a sprite image swap/switch if we're already on the create sprite image
    if (this.image === this.animations[key].image) return;

    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
  }

  update() {
    this.updateFrames();
    this.updateHitbox();

    // Draws out player image
    c.fillStyle = "rgba(0,255,0,0.3)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // Draws out player hitbox
    c.fillStyle = "rgba(255,0,0,0.2)";
    c.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.width,
      this.hitbox.height
    );

    this.draw();

    // Move left & right
    this.position.x += this.velocity.x;

    this.updateHitbox();

    this.checkForHorizontalCollisions();

    this.applyGravity();

    // updateHitbox() twice to avoid jittering
    this.updateHitbox();

    this.checkForVerticalCollisions();

    // // Obsolete now the floor at the bottom stops the player from falling through the screen
    // // Keep player falling until they hit bottom of canvas
    // if (this.position.y + this.height + this.velocity.y < canvas.height) {
    //   // Player falls faster over time
    //   this.velocity.y += gravity;
    // } else {
    //   this.velocity.y = 0;
    // }
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 35,
        y: this.position.y + 26,
      },
      width: 14,
      height: 27,
    };
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        // Right side
        if (this.velocity.x > 0) {
          this.velocity.x = 0;

          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;

          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }

        // Left side
        if (this.velocity.x < 0) {
          this.velocity.x = 0;

          const offset = this.hitbox.position.x - this.position.x;

          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }
      }
    }
  }

  applyGravity() {
    // Player falls faster over time
    this.velocity.y += gravity;

    // Falling
    this.position.y += this.velocity.y;
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      // Check if player hits a block both vertically or horizontally
      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        // Stop falling when hitting a floor block
        if (this.velocity.y > 0) {
          this.velocity.y = 0;

          // We need an offset to stop jittering between the character image, the hitbox & the collision block
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;

          // Make sure player falls on top of block rather than through
          // The 0.01 is to deal with horizontal collisions to factor in bottom of player & top of collision block
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }

        // Don't allow player to jump up through a floor block
        if (this.velocity.y < 0) {
          this.velocity.y = 0;

          const offset = this.hitbox.position.y - this.position.y;

          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }
      }
    }
  }
}
