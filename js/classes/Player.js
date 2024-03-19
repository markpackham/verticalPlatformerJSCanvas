// Player
class Player extends Sprite {
  // We pass a new position (x & y Object) ever time we create a new player
  constructor({ position, collisionBlocks, imageSrc }) {
    super({ imageSrc });

    this.position = position;
    // Since the character falls downwards by default we can ignore the "x" axis
    this.velocity = {
      x: 0,
      y: 1,
    };

    // We need to add collision blocks to monitor for collisions
    this.collisionBlocks = collisionBlocks;
  }

  // // Rendered obsolete now that Sprite is the parent
  // draw() {
  //   c.fillStyle = "red";
  //   // x & y refer to those created in the constructor
  //   c.fillRect(this.position.x, this.position.y, this.height, this.width);
  // }

  update() {
    this.draw();

    // Move left & right
    this.position.x += this.velocity.x;

    this.checkForHorizontalCollisions();

    this.applyGravity();

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

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        collision({
          object1: this,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          this.position.x = collisionBlock.position.x - this.width - 0.01;
          break;
        }

        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + 0.01;
          break;
        }
      }
    }
  }

  applyGravity() {
    // Falling
    this.position.y += this.velocity.y;

    // Player falls faster over time
    this.velocity.y += gravity;
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      // Check if player hits a block both vertically or horizontally
      if (
        collision({
          object1: this,
          object2: collisionBlock,
        })
      ) {
        // Stop falling when hitting a floor block
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          // Make sure player falls ontop of block rather than through
          // The 0.01 is to deal with horizontal collisions to factor in bottom of player & top of collision block
          this.position.y = collisionBlock.position.y - this.height - 0.01;
          break;
        }

        // Don't allow player to jump up through a floor block
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height + 0.01;
          break;
        }
      }
    }
  }
}
