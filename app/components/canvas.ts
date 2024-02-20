import { action } from '@ember/object';
import Component from '@glimmer/component';

interface CanvasSignature {
  Args: {
    width: number;
    height: number;
    pixelSize: number;
    clampedArray?: Uint8ClampedArray;
  };
}

export default class CanvasComponent extends Component<CanvasSignature> {
  styleWidth = this.args.width * this.args.pixelSize;
  styleHeight = this.args.height * this.args.pixelSize;

  @action
  onUpdate(canvas: HTMLCanvasElement) {
    let ctx = canvas.getContext('2d');
    if (ctx && this.args.clampedArray) {
      let imageData = new ImageData(this.args.clampedArray, this.args.width);
      ctx.putImageData(imageData, 0, 0);
    }
  }
}
