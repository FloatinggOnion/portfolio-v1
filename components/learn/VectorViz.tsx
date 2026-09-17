"use client";

import { useRef, useEffect, useState, useCallback } from "react";

type Vec2 = { x: number; y: number };

const GRID_SIZE = 40;
const ORIGIN_X = 200;
const ORIGIN_Y = 200;
const W = 400;
const H = 400;

function toCanvas(v: Vec2) {
  return { x: ORIGIN_X + v.x * GRID_SIZE, y: ORIGIN_Y - v.y * GRID_SIZE };
}

function fromCanvas(cx: number, cy: number): Vec2 {
  return { x: (cx - ORIGIN_X) / GRID_SIZE, y: (ORIGIN_Y - cy) / GRID_SIZE };
}

function dot(a: Vec2, b: Vec2) {
  return a.x * b.x + a.y * b.y;
}

function norm(v: Vec2) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function drawArrow(ctx: CanvasRenderingContext2D, from: Vec2, to: Vec2, color: string, width = 2) {
  const f = toCanvas(from);
  const t = toCanvas(to);
  const dx = t.x - f.x;
  const dy = t.y - f.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 2) return;
  const ux = dx / len;
  const uy = dy / len;
  const headLen = 10;
  const headAngle = Math.PI / 7;
  ctx.beginPath();
  ctx.moveTo(f.x, f.y);
  ctx.lineTo(t.x, t.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(t.x, t.y);
  ctx.lineTo(t.x - headLen * Math.cos(-headAngle + Math.atan2(uy, ux)), t.y - headLen * Math.sin(-headAngle + Math.atan2(uy, ux)));
  ctx.lineTo(t.x - headLen * Math.cos(headAngle + Math.atan2(uy, ux)), t.y - headLen * Math.sin(headAngle + Math.atan2(uy, ux)));
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

export function VectorViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [vecA, setVecA] = useState<Vec2>({ x: 2, y: 3 });
  const [vecB, setVecB] = useState<Vec2>({ x: 3, y: -1 });
  const [dragging, setDragging] = useState<"a" | "b" | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += GRID_SIZE) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y <= H; y += GRID_SIZE) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // axes
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, ORIGIN_Y); ctx.lineTo(W, ORIGIN_Y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ORIGIN_X, 0); ctx.lineTo(ORIGIN_X, H); ctx.stroke();

    // axis labels
    ctx.fillStyle = "#9ca3af";
    ctx.font = "11px monospace";
    ctx.fillText("x", W - 14, ORIGIN_Y - 6);
    ctx.fillText("y", ORIGIN_X + 5, 12);

    // tick labels
    for (let i = -4; i <= 4; i++) {
      if (i === 0) continue;
      const cx = ORIGIN_X + i * GRID_SIZE;
      const cy = ORIGIN_Y - i * GRID_SIZE;
      ctx.fillStyle = "#d1d5db";
      ctx.fillText(String(i), cx - 5, ORIGIN_Y + 14);
      ctx.fillText(String(i), ORIGIN_X + 4, cy + 4);
    }

    // sum vector (dashed)
    const sum = { x: vecA.x + vecB.x, y: vecA.y + vecB.y };
    const o = { x: 0, y: 0 };
    const s = toCanvas(sum);
    const f = toCanvas(o);
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = "#a3a3a3";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.lineTo(s.x, s.y); ctx.stroke();
    ctx.setLineDash([]);

    // tip-to-tail
    const tA = toCanvas(vecA);
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = "#f59e0b80";
    ctx.lineWidth = 1;
    const bEnd = toCanvas(sum);
    ctx.beginPath(); ctx.moveTo(tA.x, tA.y); ctx.lineTo(bEnd.x, bEnd.y); ctx.stroke();
    ctx.setLineDash([]);

    // vectors
    drawArrow(ctx, o, vecA, "#2563eb", 2.5);
    drawArrow(ctx, o, vecB, "#dc2626", 2.5);
    drawArrow(ctx, o, sum, "#16a34a", 2);

    // labels
    ctx.font = "bold 13px monospace";
    const lA = toCanvas({ x: vecA.x / 2, y: vecA.y / 2 });
    ctx.fillStyle = "#2563eb";
    ctx.fillText("u", lA.x + 6, lA.y - 5);
    const lB = toCanvas({ x: vecB.x / 2, y: vecB.y / 2 });
    ctx.fillStyle = "#dc2626";
    ctx.fillText("v", lB.x + 6, lB.y - 5);
    const lS = toCanvas({ x: sum.x / 2, y: sum.y / 2 });
    ctx.fillStyle = "#16a34a";
    ctx.fillText("u+v", lS.x + 6, lS.y - 5);

    // drag targets
    [
      { pos: vecA, color: "#2563eb" },
      { pos: vecB, color: "#dc2626" },
    ].forEach(({ pos, color }) => {
      const c = toCanvas(pos);
      ctx.beginPath();
      ctx.arc(c.x, c.y, 7, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [vecA, vecB]);

  useEffect(() => { draw(); }, [draw]);

  function getPos(e: React.MouseEvent | React.TouchEvent): { x: number; y: number } {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function handleMouseDown(e: React.MouseEvent) {
    const { x, y } = getPos(e);
    const cA = toCanvas(vecA);
    const cB = toCanvas(vecB);
    const dA = Math.hypot(x - cA.x, y - cA.y);
    const dB = Math.hypot(x - cB.x, y - cB.y);
    if (dA < 15) setDragging("a");
    else if (dB < 15) setDragging("b");
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!dragging) return;
    const { x, y } = getPos(e);
    const snapped = fromCanvas(
      Math.round((x - ORIGIN_X) / GRID_SIZE) * GRID_SIZE + ORIGIN_X,
      Math.round((ORIGIN_Y - y) / GRID_SIZE) * GRID_SIZE + ORIGIN_Y
    );
    const clamped = {
      x: Math.max(-4, Math.min(4, snapped.x)),
      y: Math.max(-4, Math.min(4, snapped.y)),
    };
    if (dragging === "a") setVecA(clamped);
    else setVecB(clamped);
  }

  function handleMouseUp() { setDragging(null); }

  const dotProd = dot(vecA, vecB);
  const normA = norm(vecA);
  const normB = norm(vecB);
  const cosTheta = normA > 0 && normB > 0 ? dotProd / (normA * normB) : 0;
  const angle = (Math.acos(Math.max(-1, Math.min(1, cosTheta))) * 180) / Math.PI;

  return (
    <div className="space-y-3">
      <div className="flex gap-2 text-xs font-mono text-neutral-500 flex-wrap">
        <span className="text-blue-600">u = ({vecA.x}, {vecA.y})</span>
        <span className="text-red-600">v = ({vecB.x}, {vecB.y})</span>
        <span className="text-green-700">u+v = ({vecA.x + vecB.x}, {vecA.y + vecB.y})</span>
      </div>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="w-full max-w-[400px] border border-neutral-200 rounded-lg cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <div className="grid grid-cols-3 gap-2 text-xs font-mono max-w-[400px]">
        <div className="bg-neutral-50 rounded-lg p-2 border border-neutral-200">
          <div className="text-neutral-400">dot(u,v)</div>
          <div className="font-bold text-neutral-800">{dotProd.toFixed(2)}</div>
        </div>
        <div className="bg-neutral-50 rounded-lg p-2 border border-neutral-200">
          <div className="text-neutral-400">angle</div>
          <div className="font-bold text-neutral-800">{angle.toFixed(1)}°</div>
        </div>
        <div className="bg-neutral-50 rounded-lg p-2 border border-neutral-200">
          <div className="text-neutral-400">cos θ</div>
          <div className="font-bold text-neutral-800">{cosTheta.toFixed(3)}</div>
        </div>
      </div>
      <p className="text-xs text-neutral-400 max-w-[400px]">Drag the vector tips to explore. Green = sum (parallelogram law).</p>
    </div>
  );
}
