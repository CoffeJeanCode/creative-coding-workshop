import Reveal from "reveal.js";
import p5 from "p5";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";

let deck = new Reveal({
  plugins: [Markdown],
});
deck.initialize();

const examples = {
  example1: [
    (p) => {
      let angle = 0,
        canvas;
      p.setup = () => {
        canvas = p.createCanvas(200, 200);
        p.noLoop();
        canvas.mouseOver(() => p.loop());
        canvas.mouseOut(() => p.noLoop());
        p.rectMode(p.CENTER);
        p.stroke(0, 43, 54);
        p.strokeWeight(6);
      };

      p.draw = () => {
        p.translate(p.width / 2, p.height / 2);

        for (let i = 0; i < 60; i++) {
          p.fill(i * 10, 255 - i, 255 - i * 10);
          p.rotate(p.radians(angle));
          p.scale(0.95);
          p.rect(0, 0, 200);
        }

        angle += 0.1;
      };
    },
    document.getElementById("example1"),
  ],
  example2: [
    (p) => {
      const GAP = 12;
      const lineLength = 16;
      let canvas;
      p.setup = () => {
        canvas = p.createCanvas(200, 200);
        p.noLoop();
        canvas.mouseOver(() => p.loop());
        canvas.mouseOut(() => p.noLoop());
      };

      p.draw = () => {
        p.clear();
        p.background(0, 43, 54);

        p.strokeWeight(3);
        p.strokeCap("round");

        const radius = lineLength * 0.7;
        const horizontalGap = lineLength + GAP;
        const verticalGap = lineLength + GAP;

        for (let rows = 0; rows < p.width; rows++) {
          p.stroke(rows * 10, 255 - rows, 255 - rows * 10);
          for (let cols = 0; cols < p.height; cols++) {
            const centerX = rows * horizontalGap + horizontalGap;
            const centerY = cols * verticalGap + verticalGap;

            const deltaX = centerX - p.mouseX;
            const deltaY = centerY - p.mouseY;

            const distance = p.dist(centerX, centerY, p.mouseX, p.mouseY);

            const hypRatio = radius / distance;

            const xRatio = deltaX * hypRatio;
            const yRatio = deltaY * hypRatio;

            const dampenBy = p.constrain(p.map(distance, 300, 0, 1, 0), 0, 1);
            const p1 = {
              x: centerX - xRatio * dampenBy,
              y: centerY - yRatio * dampenBy,
            };
            const p2 = {
              x: centerX + xRatio * dampenBy,
              y: centerY + yRatio * dampenBy,
            };

            p.line(p1.x, p1.y, p2.x, p2.y);
          }
        }
      };
    },
    document.getElementById("example2"),
  ],
  example3: [
    (p) => {
      let arcSize = 100,
        yStep = 5,
        sw = 0,
        alpha = 0,
        canvas;
      p.setup = () => {
        canvas = p.createCanvas(200, 200);
        p.noLoop();
        canvas.mouseOver(() => p.loop());
        canvas.mouseOut(() => p.noLoop());
      };
      p.draw = () => {
        p.background(0, 43, 54);
        p.mouseX = p.constrain(p.mouseX, 10, p.width);
        p.mouseY = p.constrain(p.mouseY, 10, p.height);

        arcSize = p.mouseX;
        yStep = p.mouseY;

        p.noFill();
        p.stroke(255);

        for (let y = 0; y < p.height + arcSize; y += yStep) {
          sw = p.map(p.sin(p.radians(y + alpha), -1, 1, 2, yStep));
          p.stroke(y * 10, 255 - y, 255 - y * 10);
          p.strokeWeight(sw);

          for (let x1 = 0; x1 < p.width + arcSize; x1 += arcSize) {
            p.arc(x1, y, arcSize / 2, arcSize / 2, 0, p.PI);
          }

          sw = p.map(p.sin(p.radians(y - alpha), -1, 1, 2, yStep));
          p.stroke(y * 10, 255 - y, 255 - y * 10);
          p.strokeWeight(sw);

          for (let x2 = 0; x2 < p.width + arcSize; x2 += arcSize) {
            p.arc(
              x2 + arcSize / 2,
              y,
              arcSize / 2,
              arcSize / 2,
              p.PI,
              p.TWO_PI
            );
          }
        }

        alpha++;
      };
    },
    document.getElementById("example3"),
  ],
};

for (const key in examples) {
  if (Object.hasOwnProperty.call(examples, key)) {
    const [sketch, root] = examples[key];
    new p5(sketch, root);
  }
}
