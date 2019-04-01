class Preload {
  constructor() {
    this.images = [];
    this.sounds = [];
    this.loaded = 0;
  }

  howManyToLoad() {
    return this.images.length + this.sounds.length;
  }

  loadNewImage(imgSrc, imgName) {
    var newImage = new Image();
    newImage.src = imgSrc;
    this.images.push({ name: imgName, resource: newImage });
    newImage.onload = () => {
      this.loaded++;
    };
  }

  loadNewSound(soundSrc, soundName) {
    var newSound = new Audio();
    newSound.src = soundSrc;
    this.sounds.push({ name: soundName, resource: newSound });
    newSound.onload = () => {
      this.loaded++;
    };
  }

  isLoaded() {
    return this.howManyToLoad() === this.loaded;
  }

  getImages() {
    return this.images;
  }

  getSounds() {
    return this.sounds;
  }

  getImageByName(imgName) {
    return this.images.find(image => image.name === imgName);
  }

  getSoundByName(soundName) {
    return this.sounds.find(sound => sound.name === soundName);
  }
}
