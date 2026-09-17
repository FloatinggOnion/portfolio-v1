"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const W = 400;
const H = 220;
const MARGIN = { top: 20, right: 20, bottom: 30, left: 40 };

function gaussianPDF(x: number, mu: number, sigma: number) {
  return (
    (1 / (sigma * Math.sqrt(2 * Math.PI))) *
    Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2))
  );
}

type DistType = "gaussian" | "uniform" | "bimodal";

export function ProbabilityViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);
  const [distType, setDistType] = useState<DistType>("gaussian");

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const innerW = W - MARGIN.left - MARGIN.right;
    const innerH = H - MARGIN.top - MARGIN.bottom;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#fafafa";
    ctx.fillRect(0, 0, W, H);

    const xMin = mu - 4 * sigma;
    const xMax = mu + 4 * sigma;

    function pdf(x: number): number {
      if (distType === "gaussian") return gaussianPDF(x, mu, sigma);
      if (distType === "uniform") {
        const a = mu - sigma * Math.sqrt(3);
        const b = mu + sigma * Math.sqrt(3);
        return x >= a && x <= b ? 1 / (b - a) : 0;
      }
      if (distType === "bimodal")
        return 0.5 * gaussianPDF(x, mu - 1.5, sigma * 0.7) + 0.5 * gaussianPDF(x, mu + 1.5, sigma * 0.7);
      return 0;
    }

    const N = 300;
    const xs = Array.from({ length: N }, (_, i) => xMin + (i / (N - 1)) * (xMax - xMin));
    const ys = xs.map(pdf);
    const yMax = Math.max(...ys) * 1.1 || 0.6;

    function toC(x: number, y: number) {
      return {
        cx: MARGIN.left + ((x - xMin) / (xMax - xMin)) * innerW,
        cy: MARGIN.top + (1 - y / yMax) * innerH,
      };
    }

    // shade ±1σ region
    ctx.beginPath();
    const sigStart = toC(mu - sigma, 0);
    ctx.moveTo(sigStart.cx, MARGIN.top + innerH);
    for (let i = 0; i <= N; i++) {
      const x = xMin + (i / N) * (xMax - xMin);
      if (x >= mu - sigma && x <= mu + sigma) {
        const { cx, cy } = toC(x, pdf(x));
        ctx.lineTo(cx, cy);
      }
    }
    const sigEnd = toC(mu + sigma, 0);
    ctx.lineTo(sigEnd.cx, MARGIN.top + innerH);
    ctx.closePath();
    ctx.fillStyle = "rgba(37,99,235,0.12)";
    ctx.fill();

    // curve
    ctx.beginPath();
    xs.forEach((x, i) => {
      const { cx, cy } = toC(x, ys[i]);
      i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
    });
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 2;
    ctx.stroke();

    // baseline
    const base = toC(xMin, 0);
    ctx.strokeStyle = "#d1d5db";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(MARGIN.left, base.cy);
    ctx.lineTo(W - MARGIN.right, base.cy);
    ctx.stroke();

    // μ line
    const { cx: muCx } = toC(mu, 0);
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(muCx, MARGIN.top);
    ctx.lineTo(muCx, MARGIN.top + innerH);
    ctx.stroke();
    ctx.setLineDash([]);

    // labels
    ctx.fillStyle = "#9ca3af";
    ctx.font = "11px monospace";
    // x axis ticks
    for (let i = -3; i <= 3; i++) {
      const { cx } = toC(mu + i * sigma, 0);
      if (cx < MARGIN.left || cx > W - MARGIN.right) continue;
      ctx.fillText(i === 0 ? "μ" : `${i > 0 ? "+" : ""}${i}σ`, cx - 8, MARGIN.top + innerH + 16);
    }
    ctx.fillStyle = "#dc2626";
    ctx.fillText("μ", muCx - 4, MARGIN.top + innerH + 16);

    // entropy label
    let entropy = 0;
    if (distType === "gaussian") entropy = 0.5 * Math.log(2 * Math.PI * Math.E * sigma * sigma);
    else if (distType === "uniform") entropy = Math.log(2 * sigma * Math.sqrt(3));
    else entropy = 0.5 * Math.log(2 * Math.PI * Math.E * (sigma * 0.7) ** 2) + Math.log(2) * 0.3;

    ctx.fillStyle = "#6b7280";
    ctx.font = "11px monospace";
    ctx.fillText(`H ≈ ${entropy.toFixed(3)} nats`, MARGIN.left + 4, MARGIN.top + 14);
  }, [mu, sigma, distType]);

  useEffect(() => { draw(); }, [draw]);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        {(["gaussian", "uniform", "bimodal"] as DistType[]).map((d) => (
          <button
            key={d}
            onClick={() => setDistType(d)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors font-mono ${
              distType === d ? "bg-black text-white border-black" : "border-neutral-300 text-neutral-500"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="w-full max-w-[400px] border border-neutral-200 rounded-lg"
      />
      <div className="grid grid-cols-2 gap-3 max-w-[400px] text-xs font-mono">
        <div>
          <label className="text-neutral-500 block mb-1">μ (mean) = {mu.toFixed(1)}</label>
          <input
            type="range" min={-3} max={3} step={0.1} value={mu}
            onChange={(e) => setMu(parseFloat(e.target.value))}
            className="w-full accent-red-600"
          />
        </div>
        <div>
          <label className="text-neutral-500 block mb-1">σ (std) = {sigma.toFixed(2)}</label>
          <input
            type="range" min={0.2} max={2.5} step={0.05} value={sigma}
            onChange={(e) => setSigma(parseFloat(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
      </div>
      <p className="text-xs text-neutral-400 max-w-[400px]">
        Blue shading = ±1σ region (68% of probability). H = Shannon entropy (nats).
      </p>
    </div>
  );
}
