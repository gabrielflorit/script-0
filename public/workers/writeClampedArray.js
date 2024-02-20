"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // app/canvasAPI/drawLine.ts
  function drawLine(x1, y1, x2, y2, setPixel2, color) {
    let steep = false;
    if (Math.abs(x1 - x2) < Math.abs(y1 - y2)) {
      [x1, y1] = [y1, x1];
      [x2, y2] = [y2, x2];
      steep = true;
    }
    if (x1 > x2) {
      [x1, x2] = [x2, x1];
      [y1, y2] = [y2, y1];
    }
    let dx = x2 - x1;
    let dy = y2 - y1;
    let derror = Math.abs(dy) * 2;
    let error = 0;
    let y = y1;
    for (let x = x1; x <= x2; x++) {
      if (steep) {
        setPixel2(y, x, color);
      } else {
        setPixel2(x, y, color);
      }
      error += derror;
      if (error > dx) {
        if (y2 > y1) {
          y++;
        } else {
          y--;
        }
        error -= dx * 2;
      }
    }
  }
  var init_drawLine = __esm({
    "app/canvasAPI/drawLine.ts"() {
      "use strict";
    }
  });

  // app/canvasAPI/drawRectFill.ts
  function drawRectFill(x, y, width2, height2, color, line2) {
    let left = Math.floor(x);
    let right = Math.floor(x + width2 - 1);
    let top = Math.floor(y);
    let bottom = Math.floor(y + height2 - 1);
    for (let rectX = left; rectX <= right; rectX++) {
      line2(rectX, top, rectX, bottom, color);
    }
  }
  var init_drawRectFill = __esm({
    "app/canvasAPI/drawRectFill.ts"() {
      "use strict";
    }
  });

  // app/canvasAPI/drawCircle.ts
  function drawCircle(cx, cy, radius, color, setPixel2, line2, onlyStroke) {
    let x = radius - 1;
    let y = 0;
    let dx = 1;
    let dy = 1;
    let err = dx - (radius << 1);
    const drawReflectedPair = (x2, y2) => {
      if (onlyStroke) {
        setPixel2(cx + x2, cy + y2, color);
        setPixel2(cx + x2, cy - y2, color);
      } else {
        line2(cx + x2, cy + y2, cx + x2, cy - y2, color);
      }
    };
    if (radius === 2) {
      drawReflectedPair(-1, 0);
      drawReflectedPair(0, 1);
      drawReflectedPair(1, 0);
    } else if (radius === 3) {
      drawReflectedPair(-2, 0);
      drawReflectedPair(-2, 1);
      drawReflectedPair(-1, 2);
      drawReflectedPair(-0, 2);
      drawReflectedPair(1, 2);
      drawReflectedPair(2, 1);
      drawReflectedPair(2, 0);
    } else {
      while (x >= y) {
        drawReflectedPair(x, y);
        drawReflectedPair(-x, y);
        drawReflectedPair(y, x);
        drawReflectedPair(-y, x);
        if (err <= 0) {
          y++;
          err += dy;
          dy += 2;
        }
        if (err > 0) {
          x--;
          dx += 2;
          err += dx - (radius << 1);
        }
      }
    }
  }
  var init_drawCircle = __esm({
    "app/canvasAPI/drawCircle.ts"() {
      "use strict";
    }
  });

  // app/workers/writeClampedArray.ts
  var require_writeClampedArray = __commonJS({
    "app/workers/writeClampedArray.ts"(exports, module) {
      init_drawLine();
      init_drawRectFill();
      init_drawCircle();
      onmessage = function(event) {
        let { width, height, code, state, runInit } = event.data;
        let arrayBuffer = new ArrayBuffer(width * height * 4);
        let clampedArray = new Uint8ClampedArray(arrayBuffer);
        function setPixel(x, y, color) {
          x = Math.floor(x);
          y = Math.floor(y);
          if (x < 0 || x >= width || y < 0 || y >= height)
            return;
          clampedArray[y * width * 4 + x * 4 + 0] = color ? 246 : 0;
          clampedArray[y * width * 4 + x * 4 + 1] = color ? 214 : 0;
          clampedArray[y * width * 4 + x * 4 + 2] = color ? 189 : 0;
          clampedArray[y * width * 4 + x * 4 + 3] = 255;
        }
        function line(x1, y1, x2, y2, color = 1) {
          drawLine(x1, y1, x2, y2, setPixel, color);
        }
        function rectFill(x, y, width2, height2, color = 1) {
          drawRectFill(x, y, width2, height2, color, line);
        }
        function circFill(x, y, radius, color = 1) {
          drawCircle(
            Math.floor(x),
            Math.floor(y),
            Math.floor(radius),
            color,
            setPixel,
            line,
            false
          );
        }
        let init = () => ({});
        let update = (_state) => ({});
        let draw = (_state) => {
        };
        eval(code);
        if (runInit) {
          state = init();
        }
        state = update(state);
        draw(state);
        postMessage({ clampedArray, state }, [clampedArray.buffer]);
      };
    }
  });
  require_writeClampedArray();
})();
