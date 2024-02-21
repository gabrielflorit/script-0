import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

interface ScreenSignature {
  Args: { code: string };
}

export default class ScreenComponent extends Component<ScreenSignature> {
  worker = new Worker('../workers/writeClampedArray.js');
  shouldPlay = true;
  WIDTH = 64;
  HEIGHT = 64;
  pixelSize = 5;
  gameState = {};
  prevCode = '';
  isClicked = false;
  @tracked clampedArray: Uint8ClampedArray | undefined = undefined;

  constructor(owner: unknown, args: ScreenSignature['Args']) {
    super(owner, args);
    this.timer.perform();
  }

  timer = task(async () => {
    while (this.shouldPlay) {
      this.sendMessage();
      await timeout(1000 / 30);
    }
  });

  @action
  onClick() {
    this.isClicked = true;
  }

  @action
  sendMessage() {
    this.worker.postMessage({
      width: this.WIDTH,
      height: this.HEIGHT,
      code: this.args.code,
      state: this.gameState,
      runInit: this.prevCode !== this.args.code,
      isClicked: this.isClicked,
    });

    this.worker.onmessage = ({
      data,
    }: {
      data: {
        clampedArray: Uint8ClampedArray;
        state: object;
      };
    }) => {
      let { clampedArray, state } = data;

      this.clampedArray = clampedArray;
      this.gameState = state;
      this.prevCode = this.args.code;
      this.isClicked = false;
    };
  }
}
