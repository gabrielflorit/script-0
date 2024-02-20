import { drawLine } from './../canvasAPI/drawLine';
import { drawRectFill } from './../canvasAPI/drawRectFill';
import { drawCircle } from './../canvasAPI/drawCircle';

onmessage = function (event: {
  data: {
    width: number;
    height: number;
    code: string;
    state: object;
    runInit: boolean;
  };
}) {
  let { width, height, code, state, runInit } = event.data;

  let arrayBuffer = new ArrayBuffer(width * height * 4);
  let clampedArray = new Uint8ClampedArray(arrayBuffer);

  function setPixel(x: number, y: number, color: number) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    clampedArray[y * width * 4 + x * 4 + 0] = color ? 246 : 0;
    clampedArray[y * width * 4 + x * 4 + 1] = color ? 214 : 0;
    clampedArray[y * width * 4 + x * 4 + 2] = color ? 189 : 0;
    clampedArray[y * width * 4 + x * 4 + 3] = 255;
  }

  function line(x1: number, y1: number, x2: number, y2: number, color = 1) {
    drawLine(x1, y1, x2, y2, setPixel, color);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function rectFill(
    x: number,
    y: number,
    width: number,
    height: number,
    color = 1,
  ) {
    drawRectFill(x, y, width, height, color, line);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function circFill(x: number, y: number, radius: number, color = 1) {
    drawCircle(
      Math.floor(x),
      Math.floor(y),
      Math.floor(radius),
      color,
      setPixel,
      line,
      false,
    );
  }

  let init = () => ({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let update = (_state: object) => ({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let draw = (_state: object) => {};

  eval(code);

  if (runInit) {
    state = init();
  }

  state = update(state);
  draw(state);

  postMessage({ clampedArray, state }, [clampedArray.buffer]);
};
