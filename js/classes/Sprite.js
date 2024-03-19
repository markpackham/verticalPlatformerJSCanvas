// Sprite for drawing background & character art
class Sprite {
  constructor({ position, imageSrc, frameRate = 1 }) {
    this.position = position;

    this.image = new Image();
    // Grab image width & height as soon as it loads
    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.image.height;
    };

    this.image.src = imageSrc;

    // Frame rate is different for all sprites
    this.frameRate = this.frameRate;
  }

  draw() {
    // Don't waste time with an image that does not exist
    if (!this.image) return;

    const cropBox = {
      position: {
        x: 0,
        y: 0,
      },

      width: this.image.width / 8,
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
  }
}
