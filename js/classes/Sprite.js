// Sprite for drawing background & character art
class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;

    this.image = new Image();
    // Grab image width & height as soon as it loads
    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.image.height;
    };

    this.image.src = imageSrc;
  }

  draw() {
    // Don't waste time with an image that does not exist
    if (!this.image) return;

    const cropBox = {
      position: {
        x: 0,
        y: 0,
      },
      width: 0,
      height: 0,
    };

    c.drawImage(
      this.image,
      cropBox.position.x,
      cropBox.position.y,
      cropBox.width,
      cropBox.height,
      this.position.x,
      this.position.y
    );
  }

  update() {
    this.draw();
  }
}
