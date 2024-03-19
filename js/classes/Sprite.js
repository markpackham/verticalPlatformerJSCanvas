// Sprite for drawing background & character art
class Sprite {
  constructor({
    position,
    imageSrc,
    frameRate = 1,
    frameBuffer = 5,
    scale = 1,
  }) {
    this.position = position;
    this.scale = scale;

    this.image = new Image();
    // Grab image width & height as soon as it loads
    this.image.onload = () => {
      this.width = (this.image.width / this.frameRate) * this.scale;
      this.height = this.image.height * this.scale;
    };

    this.image.src = imageSrc;

    // Frame rate is different for all sprites
    this.frameRate = frameRate;

    this.currentFrame = 0;

    // Slow down animation loop
    this.frameBuffer = frameBuffer;
    this.elapsedFrames = 0;
  }

  draw() {
    // Don't waste time with an image that does not exist
    if (!this.image) return;

    const cropBox = {
      position: {
        x: (this.currentFrame * this.image.width) / this.frameRate,
        y: 0,
      },

      width: this.image.width / this.frameRate,
      height: this.image.height,
    };

    c.drawImage(
      this.image,

      // Crop box area
      cropBox.position.x,
      cropBox.position.y,
      cropBox.width,
      cropBox.height,

      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    this.updateFrames();
  }

  updateFrames() {
    this.elapsedFrames++;

    if (this.elapsedFrames % this.frameBuffer === 0) {
      // Subtract a value of 1 from framerate (since some Sprites like the background only have 1 frame)
      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame++;
      } else {
        // Set back to the 0 point of our animation loop
        this.currentFrame = 0;
      }
    }
  }
}
