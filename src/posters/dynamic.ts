import { Party, Template } from '@/data/parties';
import { PosterLayout, UserDetails } from '@/types';
import { circ, gtxt, stxt, fitText } from '@/lib/canvasUtils';

const imageCache: Record<string, HTMLImageElement> = {};
const loadingMap: Record<string, boolean> = {};

export const drawDynamicPoster = (
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  layout: PosterLayout,
  party: Party,
  img: HTMLImageElement | null,
  d: UserDetails,
  th?: boolean,
  shape?: any
) => {
  const s = W / 630;
  const bgSrc = layout.bgImageSrc;

  // 1. Handle Background Loading
  if (bgSrc && !imageCache[bgSrc]) {
    if (!loadingMap[bgSrc]) {
      loadingMap[bgSrc] = true;
      const i = new Image();
      i.src = bgSrc;
      i.onload = () => {
        imageCache[bgSrc] = i;
        if (shape && shape.getLayer) {
          shape.getLayer().batchDraw();
        }
      };
    }
  }

  // 2. Draw generic background or placeholder if not loaded
  if (!bgSrc || !imageCache[bgSrc]) {
    ctx.fillStyle = party.cardBackground || '#000000';
    ctx.fillRect(0, 0, W, H);
    if (bgSrc) {
      stxt(ctx, 'Loading template...', W / 2, H / 2, `bold ${20 * s}px 'Catamaran'`, party.cardText);
      return; // Stop drawing until background is ready if we expect one
    }
  }

  // 3. Helper to define rendering the user photo
  const renderPhoto = () => {
    const pCfg = layout.photo?.config;
    const pX = (pCfg?.x ?? 0) * W;
    const pY = (pCfg?.y ?? 0) * H;
    const pR = pCfg?.r ? pCfg.r * W : W * 0.16;

    // Outer glow and border
    if (layout.photo?.shadow) {
      ctx.save();
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 15;
    }

    if (layout.photo?.borderWidth && layout.photo?.borderColor) {
      const bw = layout.photo.borderWidth * s;
      ctx.beginPath();
      ctx.arc(pX, pY, pR + bw, 0, Math.PI * 2);
      ctx.fillStyle = layout.photo.borderColor;
      ctx.fill();
    }

    if (layout.photo?.shadow) {
      ctx.restore();
    }

    // Draw the image
    if (layout.photo?.shape === 'circle') {
      circ(ctx, img, pX, pY, pR);
    } else {
      // For rect
      const pW = pCfg?.w ? pCfg.w * W : W * 0.3;
      const pH = pCfg?.h ? pCfg.h * H : H * 0.4;
      if (img) {
        ctx.drawImage(img, pX, pY, pW, pH);
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(pX, pY, pW, pH);
      }
    }
  };

  // 4. Render Layers
  if (layout.photo?.behindBg) {
    renderPhoto();
    if (imageCache[bgSrc]) {
      ctx.drawImage(imageCache[bgSrc], 0, 0, W, H);
    }
  } else {
    if (imageCache[bgSrc]) {
      ctx.drawImage(imageCache[bgSrc], 0, 0, W, H);
    }
    renderPhoto();
  }

  // 5. Draw text fields
  const drawTextFlow = (txtCfg: any, textData: string, defSize: number, useFitText: boolean = false) => {
    if (!txtCfg || !textData) return;

    ctx.save();
    ctx.textAlign = txtCfg.align || 'center';
    ctx.textBaseline = txtCfg.baseline || 'middle';

    const tX = txtCfg.x * W;
    const tY = txtCfg.y * H;

    let fontSize = txtCfg.baseSize * s;
    if (useFitText) {
      fontSize = fitText(ctx, textData, W * 0.55, th ? fontSize / 3 : fontSize);
    } else if (th) {
      fontSize = fontSize / 3;
    }

    const fontFamily = txtCfg.fontFamily || 'Catamaran';
    const fontWeight = txtCfg.fontWeight || 'bold';
    ctx.font = `${fontWeight} ${fontSize}px '${fontFamily}'`;

    if (txtCfg.shadowColor) {
      ctx.shadowColor = txtCfg.shadowColor;
      ctx.shadowBlur = txtCfg.shadowBlur || 8;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
    }

    // Support text stroke
    if (txtCfg.strokeColor) {
      ctx.lineWidth = (txtCfg.strokeWidth || 1) * s;
      ctx.strokeStyle = txtCfg.strokeColor;
      ctx.strokeText(textData, tX, tY);
    }

    ctx.fillStyle = txtCfg.color || '#FFFFFF';
    ctx.fillText(textData, tX, tY);
    ctx.restore();
  };

  const nm = (d.name || 'YOUR NAME').toUpperCase();
  drawTextFlow(layout.text?.name, nm, 32, true);

  const desig = (d.desig || 'Designation').toUpperCase();
  drawTextFlow(layout.text?.designation, desig, 20);

  const area = (d.area || 'Area').toUpperCase();
  drawTextFlow(layout.text?.area, area, 16);

  // 6. Draw poster watermark
  if (!th) {
    ctx.save();
    ctx.globalAlpha = 0.5;
    stxt(ctx, 'PosterTamizh.app', W - 16 * s, H - 16 * s, `${10 * s}px 'Catamaran'`, '#fff', 'right');
    ctx.restore();
  }
};
