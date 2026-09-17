"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const W = 400;
const H = 280;

function loss(x: number) {
  // Non-convex loss: two valleys + a bump
  return 0.5 * Math.pow(x - 2, 2) * Math.exp(-0.15 * x) + 0.3 * Math.sin(3 * x) + 0.5;
}

function lossGrad(x: number) {
  const eps = 1e-5;
  return (loss(x + eps) - loss(x - eps)) / (2 * eps);
}

const X_MIN = -2;
const X_MAX = 7;
const Y_MIN = -0.3;
const Y_MAX = 2.5;

function toCanvas(x: number, y: number) {
  return {
    cx: ((x - X_MIN) / (X_MAX - X_MIN)) * W,
    cy: H - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * H,
  };
}

export function GradientViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startX, setStartX] = useState(6.0);
  const [lr, setLr] = useState(0.1);
  const [steps, setSteps] = useState<number[]>([]);
  const [running, setRunning] = useState(false);
  const runRef = useRef(false);

  const drawCurve = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, W, H);

    // background
    ctx.fillStyle = "#fafafa";
    ctx.fillRect(0, 0, W, H);

    // zero line
    const { cy: zeroY } = toCanvas(0, 0);
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, zeroY); ctx.lineTo(W, zeroY); ctx.stroke();

    // loss curve
    ctx.beginPath();
    for (let px = 0; px <= W; px++) {
      const x = X_MIN + (px / W) * (X_MAX - X_MIN);
      const y = loss(x);
      const { cx, cy } = toCanvas(x, y);
      px === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
    }
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 2;
    ctx.stroke();

    // gradient descent path
    if (steps.length > 0) {
      for (let i = 0; i < steps.length - 1; i++) {
        const { cx: x1, cy: y1 } = toCanvas(steps[i], loss(steps[i]));
        const { cx: x2, cy: y2 } = toCanvas(steps[i + 1], loss(steps[i + 1]));
        ctx.strokeStyle = `rgba(220,38,38,${0.4 + 0.6 * (i / steps.length)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      }
      // current position
      const cur = steps[steps.length - 1];
      const { cx, cy } = toCanvas(cur, loss(cur));
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#dc2626";
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      // start dot
      const { cx, cy } = toCanvas(startX, loss(startX));
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#2563eb";
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // axis labels
    ctx.fillStyle = "#9ca3af";
    ctx.font = "11px monospace";
    ctx.fillText("x (parameter)", W - 90, H - 6);
    ctx.fillText("L(x)", 4, 14);
  }, [steps, startX]);

  useEffect(() => { drawCurve(); }, [drawCurve]);

  async function runGD() {
    setSteps([]);
    setRunning(true);
    runRef.current = true;
    let x = startX;
    const path = [x];

    for (let i = 0; i < 80; i++) {
      if (!runRef.current) break;
      const g = lossGrad(x);
      x = x - lr * g;
      x = Math.max(X_MIN, Math.min(X_MAX, x));
      path.push(x);
      setSteps([...path]);
      await new Promise((r) => setTimeout(r, 60));
      if (Math.abs(g * lr) < 1e-4) break;
    }
    setRunning(false);
    runRef.current = false;
  }

  function reset() {
    runRef.current = false;
    setRunning(false);
    setSteps([]);
  }

  const curX = steps.length > 0 ? steps[steps.length - 1] : startX;
  const curLoss = loss(curX);

  return (
    <div className="space-y-3">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="w-full max-w-[400px] border border-neutral-200 rounded-lg"
      />
      <div className="grid grid-cols-2 gap-3 max-w-[400px] text-xs font-mono">
        <div>
          <label className="text-neutral-500 block mb-1">Start x = {startX.toFixed(1)}</label>
          <input
            type="range" min={X_MIN} max={X_MAX} step={0.1}
            value={startX}
            onChange={(e) => { setStartX(parseFloat(e.target.value)); reset(); }}
            className="w-full accent-blue-600"
          />
        </div>
        <div>
          <label className="text-neutral-500 block mb-1">lr η = {lr.toFixed(2)}</label>
          <input
            type="range" min={0.01} max={0.5} step={0.01}
            value={lr}
            onChange={(e) => { setLr(parseFloat(e.target.value)); reset(); }}
            className="w-full accent-red-600"
          />
        </div>
      </div>
      <div className="flex gap-2 items-center max-w-[400px] flex-wrap">
        <button
          onClick={running ? reset : runGD}
          className="text-sm px-4 py-1.5 bg-black text-white rounded-full hover:bg-neutral-800 transition-colors"
        >
          {running ? "Stop" : steps.length > 0 ? "Restart" : "Run gradient descent"}
        </button>
        {steps.length > 0 && (
          <span className="text-xs font-mono text-neutral-500">
            step {steps.length - 1} · x = {curX.toFixed(3)} · L = {curLoss.toFixed(4)}
          </span>
        )}
      </div>
      <p className="text-xs text-neutral-400 max-w-[400px]">
        Try lr &gt; 0.4 to see divergence. Try different start positions to find different local minima.
      </p>
    </div>
  );
}
