export default class Player {
    constructor(src) {
        this._audio = document.createElement('audio');
        this._audio.src = src;
    }

    play() {
        this._audio.play()
    }

    pause() {
        this._audio.pause();
    }
}