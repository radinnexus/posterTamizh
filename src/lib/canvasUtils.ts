export const PI2 = Math.PI * 2;

export function circ(ctx: CanvasRenderingContext2D, img: HTMLImageElement | null, cx: number, cy: number, r: number) {
  if (!img) {
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, PI2);
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, 'rgba(255,255,255,0.12)'); g.addColorStop(1, 'rgba(255,255,255,0.04)');
    ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = r * 0.04; ctx.stroke();
    ctx.font = `${r * 0.75}px serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.fillText('👤', cx, cy + r * 0.04);
    ctx.restore(); return;
  }
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, PI2); ctx.clip();
  const sc = Math.max(r * 2 / img.width, r * 2 / img.height);
  ctx.drawImage(img, cx - img.width * sc / 2, cy - img.height * sc / 2, img.width * sc, img.height * sc);
  ctx.restore();
}

export function rays(ctx: CanvasRenderingContext2D, cx: number, cy: number, r1: number, r2: number, n: number, col: string) {
  ctx.save(); ctx.fillStyle = col;
  const step = PI2 / n;
  for (let i = 0; i < n; i++) {
    const a = i * step - Math.PI / 2, a1 = a - step * .22, a2 = a + step * .22;
    ctx.beginPath();
    ctx.moveTo(cx + r1 * Math.cos(a1), cy + r1 * Math.sin(a1));
    ctx.lineTo(cx + r2 * Math.cos(a), cy + r2 * Math.sin(a));
    ctx.lineTo(cx + r1 * Math.cos(a2), cy + r1 * Math.sin(a2));
    ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}

export function star5(ctx: CanvasRenderingContext2D, cx: number, cy: number, ir: number, or: number, rot = 0) {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const oa = rot + i * PI2 / 5 - Math.PI / 2, ia = oa + Math.PI / 5;
    i === 0 ? ctx.moveTo(cx + or * Math.cos(oa), cy + or * Math.sin(oa)) : ctx.lineTo(cx + or * Math.cos(oa), cy + or * Math.sin(oa));
    ctx.lineTo(cx + ir * Math.cos(ia), cy + ir * Math.sin(ia));
  }
  ctx.closePath(); ctx.fill();
}

export function gtxt(ctx: CanvasRenderingContext2D, txt: string, x: number, y: number, font: string, col: string, gcol: string, blur = 15) {
  ctx.save(); ctx.font = font; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.shadowColor = gcol || col; ctx.shadowBlur = blur;
  ctx.fillStyle = col; ctx.fillText(txt, x, y);
  ctx.shadowBlur = blur / 2; ctx.fillText(txt, x, y);
  ctx.shadowBlur = 0; ctx.fillText(txt, x, y);
  ctx.restore();
}

export function stxt(ctx: CanvasRenderingContext2D, txt: string, x: number, y: number, font: string, col: string, align = 'center') {
  ctx.save(); ctx.font = font; ctx.textAlign = align as any; ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 10; ctx.shadowOffsetX = 1; ctx.shadowOffsetY = 2;
  ctx.fillStyle = col; ctx.fillText(txt, x, y);
  ctx.restore();
}

export function leaves(ctx: CanvasRenderingContext2D, cx: number, cy: number, sz: number, c1: string, c2: string) {
  ctx.save();
  ctx.fillStyle = c1; ctx.beginPath();
  ctx.moveTo(cx - .05 * sz, cy + .3 * sz);
  ctx.bezierCurveTo(cx - .8 * sz, cy, cx - .8 * sz, cy - .6 * sz, cx - .05 * sz, cy - .8 * sz);
  ctx.bezierCurveTo(cx - .3 * sz, cy - .35 * sz, cx - .1 * sz, cy - .1 * sz, cx - .05 * sz, cy + .3 * sz);
  ctx.fill();
  ctx.fillStyle = c2; ctx.beginPath();
  ctx.moveTo(cx + .05 * sz, cy + .3 * sz);
  ctx.bezierCurveTo(cx + .8 * sz, cy, cx + .8 * sz, cy - .6 * sz, cx + .05 * sz, cy - .8 * sz);
  ctx.bezierCurveTo(cx + .3 * sz, cy - .35 * sz, cx + .1 * sz, cy - .1 * sz, cx + .05 * sz, cy + .3 * sz);
  ctx.fill();
  ctx.restore();
}

export function lotus(ctx: CanvasRenderingContext2D, cx: number, cy: number, sz: number, col: string) {
  ctx.save();
  for (let i = 0; i < 8; i++) {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(i * PI2 / 8);
    ctx.fillStyle = col; ctx.beginPath();
    ctx.ellipse(0, -sz * .52, sz * .18, sz * .52, 0, 0, PI2); ctx.fill();
    ctx.restore();
  }
  ctx.beginPath(); ctx.arc(cx, cy, sz * .22, 0, PI2);
  ctx.fillStyle = '#FFD700'; ctx.fill();
  ctx.restore();
}

export function ringBorder(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, col: string, lw: number, glow = false) {
  ctx.save();
  if (glow) { ctx.shadowColor = col; ctx.shadowBlur = 20; }
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, PI2);
  ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke();
  ctx.restore();
}

export function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
}

export function fitText(ctx: CanvasRenderingContext2D, txt: string, maxW: number, startSize: number) {
  let sz = startSize;
  ctx.font = `900 ${sz}px 'Catamaran'`;
  while (ctx.measureText(txt).width > maxW && sz > 8) {
    sz -= 2;
    ctx.font = `900 ${sz}px 'Catamaran'`;
  }
  return sz;
}
