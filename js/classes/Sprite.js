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

    c.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}
