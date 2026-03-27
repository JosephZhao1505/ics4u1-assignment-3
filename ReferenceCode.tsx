const form = document.getElementById("cubicSolverForm") as HTMLFormElement;

const result1 = document.getElementById("result1") as HTMLInputElement;
const result2 = document.getElementById("result2") as HTMLInputElement;
const result3 = document.getElementById("result3") as HTMLInputElement;
const discriminantDisplay = document.getElementById(
  "discriminantDisplay",
) as HTMLInputElement;
const pDisplay = document.getElementById("pDisplay") as HTMLInputElement;
const qDisplay = document.getElementById("qDisplay") as HTMLInputElement;

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const a: number = Number(formData.get("a-value"));
  const b: number = Number(formData.get("b-value"));
  const c: number = Number(formData.get("c-value"));
  const d: number = Number(formData.get("d-value"));

  function equation(): string {
    let equation: string = '';

    equation += (a > 0 ? (a === 1 ? '' : a) : (Math.abs(a) === 1 ? '-' : a)) + 'x³';
    equation += (b === 0 ? '' : (b > 0 ? ' + ' + (b === 1 ? '' : b) : ' - ' + (Math.abs(b) === 1 ? '' : Math.abs(b))) + 'x²');
    equation += (c === 0 ? '' : (c > 0 ? ' + ' + (c === 1 ? '' : c) : ' - ' + (Math.abs(c) === 1 ? '' : Math.abs(c))) + 'x');
    equation += (d === 0 ? '' : (d > 0 ? ' + ' + d : ' - ' + Math.abs(d))) + ' = 0';

    return equation;
}

  (document.getElementById("equation") as HTMLParagraphElement).textContent = equation();

  const realRoots: number[] = [];

  if (a === 0) { /* Guarding against quadratics and linear equations */
    pDisplay.value = ``;
    qDisplay.value = ``;
    if (b != 0) { /* Quadratic solver */

      const discriminant = c * c - 4 * b * d;
      discriminantDisplay.value = `${discriminant.toFixed(6)}`;

      if (discriminant < 0) {
        result1.value = "No Roots";
        result2.value = "No Roots";
        result3.value = "No Roots";
      } else if (discriminant > 0) {
        const rootOne = (-c + Math.sqrt(discriminant)) / (2 * b);
        const rootTwo = (-c - Math.sqrt(discriminant)) / (2 * b);
        result1.value = `Root 1 = ${rootOne.toFixed(6)}`;
        result2.value = `Root 2 = ${rootTwo.toFixed(6)}`;
        result3.value = ``;
        realRoots.push(rootOne, rootTwo)
      } else {
        const rootOne = (-c + Math.sqrt(discriminant)) / (2 * b);
        result1.value = `Root 1 = ${rootOne.toFixed(6)}`;
        result2.value = ``;
        result3.value = ``;
        realRoots.push(rootOne)
      }
    } else if (c != 0) { /* Linear Solver */

      discriminantDisplay.value = ``;
      const rootOne = -d / c;
      result1.value = `Root 1 = ${rootOne.toFixed(6)}`;
      result2.value = ``;
      result3.value = ``;
      realRoots.push(rootOne)
    } else {
      if (d === 0) {
        discriminantDisplay.value = ``;
        result1.value = "Infinite solutions";
        result2.value = "Infinite solutions";
        result3.value = "Infinite solutions";
      } else {
        discriminantDisplay.value = ``;
        result1.value = "No solutions";
        result2.value = "No solutions";
        result3.value = "No solutions";
      }
    }
  } else { /* Cubic solver */
    const p = (3 * a * c - b * b) / (3 * a * a);
    const q = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
    const t = b / (3 * a);
    const discriminant = (q / 2) * (q / 2)  + (p / 3) * (p / 3) * (p / 3);
    discriminantDisplay.value = `${discriminant.toFixed(6)}`;
    pDisplay.value = `${p.toFixed(6)}`;
    qDisplay.value = `${q.toFixed(6)}`;

    if (discriminant < 0) { /* Trigonometric Method */
      const acosX = -q / (2 * Math.sqrt(-((p / 3) ** 3)));
      const limiter = Math.max(-1, Math.min(1, acosX));
      const theta = (1 / 3) * Math.acos(limiter);

      const g = 2 * Math.sqrt(-p / 3);

      const rootOne = g * Math.cos(theta) - t;
      const rootTwo = g * Math.cos(theta + (2 * Math.PI) / 3) - t;
      const rootThree = g * Math.cos(theta + (4 * Math.PI) / 3) - t;

      result1.value = `Root 1 = ${rootOne.toFixed(6)}`;
      result2.value = `Root 2 = ${rootTwo.toFixed(6)}`;
      result3.value = `Root 3 = ${rootThree.toFixed(6)}`;
      realRoots.push(rootOne, rootTwo, rootThree)
    } else {
      const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
      const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
      const n = -((u + v) / 2);
      const m = (Math.sqrt(3) * (u - v)) / 2;

      if (discriminant > 0) { /* Cardano's method */
        const rootOne = u + v - t;
        const cbrtOfUnity1 = n - t;
        const cbrtOfUnity2 = m;

        result1.value = `Root 1 = ${rootOne.toFixed(6)}`;
        result2.value = `Root 2 = ${cbrtOfUnity1.toFixed(6)} + ${cbrtOfUnity2.toFixed(6)}i`;
        result3.value = `Root 3 = ${cbrtOfUnity1.toFixed(6)} - ${cbrtOfUnity2.toFixed(6)}i`;
        realRoots.push(rootOne)
      } else { /* Cardano's Method */
        if (p === 0 && q === 0) {
          result1.value = `Root 1 = ${(-t).toFixed(6)}`;
          result2.value = `Root 2 = ${(-t).toFixed(6)}`;
          result3.value = `Root 3 = ${(-t).toFixed(6)}`;
          realRoots.push(-t.toFixed(6))
        } else if (p != 0) {
          const singleRoot = u + v - t;
          const doubleRoot = n - t;
          result1.value = `Root 1 = ${(u + v - t).toFixed(6)}`;
          result2.value = `Double Root 1 = ${doubleRoot.toFixed(6)}`;
          result3.value = `Double Root 2 = ${doubleRoot.toFixed(6)}`;
          realRoots.push(singleRoot, doubleRoot)
        }
      }
    }
  }
  drawGraph(a, b, c, d, realRoots);
});

function drawGraph(
  a: number,
  b: number,
  c: number,
  d: number,
  roots: number[] = []
) {
  const canvas = document.getElementById("graph") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const scale = 25;

  const centerX = width / 2;
  const centerY = height / 2;

  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;

  for (let x = 0; x <= width; x += scale) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += scale) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(width, centerY);
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, height);
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "blue";

  for (let px = 0; px < width; px++) {
    const x = (px - centerX) / scale;
    const y = a * x ** 3 + b * x ** 2 + c * x + d;
    const py = centerY - y * scale;

    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }

  ctx.stroke();

  ctx.fillStyle = "red";
  for (const root of roots) {
    const px = centerX + root * scale;
    const py = centerY;

    ctx.beginPath();
    ctx.arc(px, py, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
}