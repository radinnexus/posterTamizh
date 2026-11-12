import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Group } from 'react-konva';
import { Party, Template } from '@/data/parties';
import { UserDetails } from '@/types';
import { useCanvasState } from './hooks/useCanvasState';
import { FOOTER_STYLES } from './constants/footerStyles';
import DraggableText from './layers/DraggableText';
import CirclePhoto from './layers/CirclePhoto';
import FooterBackground from './layers/FooterBackground';
import FooterBadge from './layers/FooterBadge';
import Watermark from './layers/Watermark';

interface PosterCanvasProps {
  width: number;
  height: number;
  party: Party;
  template: Template;
  details: UserDetails;
  isThumb?: boolean;
  onStageReady?: (stage: any) => void;
}

const LOGICAL_W = 500;
const LOGICAL_H = 600;
const FOOTER_HEIGHT = 120;
const FOOTER_PHOTO_SIZE = 100;

// Auto-scale font size specifically tuned for Tamil character lengths
const getScaledFontSize = (text: string, baseSize: number) => {
  const len = text.length;
  if (len <= 15) return baseSize;
  if (len <= 25) return Math.round(baseSize * 0.75); // Gentle shrink
  if (len <= 40) return Math.round(baseSize * 0.55); // Medium shrink
  if (len <= 55) return Math.round(baseSize * 0.50); // Noticeable shrink
  return Math.max(11, Math.round(baseSize * 0.45)); // Max shrink (floor at 11)
};

// ─── Badge Thumbnail (small circular image for picker) ─────────
const BadgeThumbnail = ({
  src,
  isSelected,
  onClick,
}: {
  src: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    title="Select this leader"
    className={`w-14 h-14 rounded-full overflow-hidden border-2 shrink-0 snap-start transition-all duration-300 active:scale-90 ${isSelected
      ? 'border-green-600 shadow-lg shadow-green-100 scale-110 z-10 ring-2 ring-green-100'
      : 'border-slate-200 opacity-60 hover:opacity-100'
      }`}
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={src}
      alt="Leader"
      className={`w-full h-full object-cover transition-transform duration-500 ${isSelected ? 'scale-110' : 'scale-100'}`}
    />
  </button>
);

// ─── Style Swatch (gradient pill for style picker) ──────────────
const StyleSwatch = ({
  colors,
  label,
  isSelected,
  onClick,
}: {
  colors: [string, string, string];
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  // Extract Tamil name (everything before '(') for mobile conciseness
  const shortLabel = label.split('(')[0].trim();

  return (
    <button
      onClick={onClick}
      title={label}
      className={`flex flex-col items-center gap-2 transition-all duration-200 active:scale-95 shrink-0 snap-start`}
    >
      <div
        className={`w-12 h-12 rounded-full border-2 transition-all ${isSelected ? 'border-green-500 scale-110 shadow-lg shadow-green-200 ring-2 ring-green-50' : 'border-slate-200 opacity-70 hover:opacity-100'
          }`}
        style={{
          background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
        }}
      />
      <span className={`text-[11px] font-bold whitespace-nowrap transition-colors ${isSelected ? 'text-green-700' : 'text-slate-500'}`}>
        {shortLabel}
      </span>
    </button>
  );
};

// ─── Main Component ─────────────────────────────────────────────
export default function PosterCanvasImpl({
  width: canvasWidth,
  height: canvasHeight,
  party,
  template,
  details,
  isThumb = false,
  onStageReady,
}: PosterCanvasProps) {
  const state = useCanvasState(canvasWidth, party, template, details, isThumb);

  const layout = template.layout;
  if (!layout) {
    return (
      <div className="text-slate-500 p-8 text-center font-bold">
        No Layout Defined for this template.
      </div>
    );
  }

  const isAbsolute = layout.hasCoords;
  const scaleX = state.scale * (canvasWidth / LOGICAL_W);
  const scaleY = state.scale * (canvasHeight / LOGICAL_H);

  const nameTxt = (details.name || '').toUpperCase();
  const desigTxt = (details.desig || '').toUpperCase();
  const areaTxt = (details.area || '').toUpperCase();

  const footerImages = party.footerImages ?? [];
  const activeBadgeSrc = footerImages[state.selectedBadgeIdx] ?? null;

  const renderAbsoluteMode = () => {
    const isCircle = layout.photo?.shape === 'circle';
    const photoComp = (layout.photo && state.userImg) ? (
      <Group
        x={state.photoPos.x}
        y={state.photoPos.y}
        draggable={!isThumb}
        scaleX={state.userScale}
        scaleY={state.userScale}
        onDragEnd={(e) => state.setPhotoPos({ x: e.target.x(), y: e.target.y() })}
      >
        {/* Simple Square Photo with Aspect Ratio handling */}
        <Group
          clipFunc={(ctx) => {
            if (isCircle) {
              ctx.arc(75, 75, 75, 0, Math.PI * 2, false);
            } else {
              ctx.rect(0, 0, 150, 150);
            }
          }}
        >
          <KonvaImage
            image={state.userImg}
            width={state.userImg.width > state.userImg.height ? (150 * state.userImg.width / state.userImg.height) : 150}
            height={state.userImg.height > state.userImg.width ? (150 * state.userImg.height / state.userImg.width) : 150}
            x={state.userImg.width > state.userImg.height ? -(150 * state.userImg.width / state.userImg.height - 150) / 2 : 0}
            y={state.userImg.height > state.userImg.width ? -(150 * state.userImg.height / state.userImg.width - 150) / 2 : 0}
          />
        </Group>
      </Group>
    ) : null;

    return (
      <>
        {layout.photo?.behindBg && photoComp}

        <KonvaImage
          image={state.bgImg ?? undefined}
          width={LOGICAL_W}
          height={LOGICAL_H}
          listening={false}
        />

        {!layout.photo?.behindBg && photoComp}

        {layout.text &&
          [
            { key: 'name', txt: nameTxt, conf: layout.text.name },
            { key: 'designation', txt: desigTxt, conf: layout.text.designation },
            { key: 'area', txt: areaTxt, conf: layout.text.area },
          ].map((node) => {
            if (!node.conf || node.txt === '') return null;
            return (
              <DraggableText
                key={node.key}
                text={node.txt}
                x={state.textPos[node.key]?.x ?? node.conf.x}
                y={state.textPos[node.key]?.y ?? node.conf.y}
                fontSize={
                  node.key === 'name'
                    ? getScaledFontSize(node.txt, node.conf.fontSize || node.conf.baseSize)
                    : (node.conf.fontSize || node.conf.baseSize)
                }
                fontFamily={node.conf.fontFamily || 'Noto Sans Tamil'}
                fontStyle={node.conf.fontWeight || 'bold'}
                fill={node.conf.color || (node.conf as any).fill || '#FFFFFF'}
                align={node.conf.align || 'left'}
                verticalAlign={node.conf.baseline === 'top' ? 'top' : 'middle'}
                stroke={node.conf.strokeColor || (node.conf as any).stroke}
                strokeWidth={node.conf.strokeWidth || 0}
                shadowColor={node.conf.shadowColor}
                shadowBlur={node.conf.shadowBlur}
                shadowOffset={node.conf.shadowColor ? { x: 2, y: 2 } : undefined}
                draggable={!isThumb}
                onPositionChange={(pos) =>
                  state.setTextPos((prev) => ({ ...prev, [node.key]: pos }))
                }
              />
            );
          })}
      </>
    );
  };

  // ─── Mode 2: Auto-Footer Banner Mode ───────────────────────
  const renderFooterMode = () => {
    const footerY = LOGICAL_H - FOOTER_HEIGHT;
    const badgeSize = 180;

    return (
      <>
        {/* Background image (cropped above footer) */}
        <KonvaImage
          image={state.bgImg ?? undefined}
          width={LOGICAL_W}
          height={LOGICAL_H - FOOTER_HEIGHT}
          listening={false}
        />

        {/* Footer gradient + overlay + accent lines (dynamic style) */}
        <FooterBackground
          canvasWidth={LOGICAL_W}
          footerY={footerY}
          footerHeight={FOOTER_HEIGHT}
          style={state.selectedStyle}
        />

        {/* User circular photo */}
        {state.userImg && (
          <CirclePhoto
            image={state.userImg}
            x={state.photoPos.x}
            y={state.photoPos.y}
            size={FOOTER_PHOTO_SIZE}
            scale={state.userScale}
            draggable={!isThumb}
            onPositionChange={state.setPhotoPos}
          />)}

        {/* Name — Bold, prominent */}
        <DraggableText
          text={nameTxt}
          x={state.textPos.name?.x ?? 0}
          y={state.textPos.name?.y ?? 0}
          width={Math.max(50, (LOGICAL_W - badgeSize + 15) - (state.textPos.name?.x ?? 0) - 10)}
          fontSize={getScaledFontSize(nameTxt, 24)}
          fill={state.selectedStyle.textColorPrimary || "#FFFFFF"}
          fontStyle="800"
          fontFamily="Noto Sans Tamil"
          shadowColor={state.selectedStyle.textColorPrimary ? "transparent" : "rgba(212,168,67,0.6)"}
          shadowBlur={state.selectedStyle.textColorPrimary ? 0 : 8}
          shadowOffset={{ x: 0, y: state.selectedStyle.textColorPrimary ? 0 : 2 }}
          draggable={!isThumb}
          onPositionChange={(pos) => state.setTextPos((p) => ({ ...p, name: pos }))}
        />

        {/* Designation */}
        <DraggableText
          text={desigTxt}
          x={state.textPos.designation?.x ?? 0}
          y={state.textPos.designation?.y ?? 0}
          width={Math.max(50, (LOGICAL_W - badgeSize + 15) - (state.textPos.designation?.x ?? 0) - 10)}
          fontSize={15}
          fill={state.selectedStyle.textColorSecondary || "#D4D0C8"}
          fontStyle="bold"
          fontFamily="Noto Sans Tamil"
          letterSpacing={0.5}
          shadowColor={state.selectedStyle.textColorSecondary ? "transparent" : "rgba(0,0,0,0.6)"}
          shadowBlur={state.selectedStyle.textColorSecondary ? 0 : 3}
          draggable={!isThumb}
          onPositionChange={(pos) => state.setTextPos((p) => ({ ...p, designation: pos }))}
        />

        {/* Area — Accent config */}
        <DraggableText
          text={areaTxt}
          x={state.textPos.area?.x ?? 0}
          y={state.textPos.area?.y ?? 0}
          width={Math.max(50, (LOGICAL_W - badgeSize + 15) - (state.textPos.area?.x ?? 0) - 10)}
          fontSize={13}
          fill={state.selectedStyle.textColorAccent || "#F0C040"}
          fontStyle="bold"
          fontFamily="Noto Sans Tamil"
          shadowColor={state.selectedStyle.textColorAccent ? "transparent" : "rgba(255,68,68,0.3)"}
          shadowBlur={state.selectedStyle.textColorAccent ? 0 : 4}
          draggable={!isThumb}
          onPositionChange={(pos) => state.setTextPos((p) => ({ ...p, area: pos }))}
        />

        {/* Single selected leader badge — prominent floating placement */}
        {activeBadgeSrc && (
          <FooterBadge
            imageSrc={activeBadgeSrc}
            x={LOGICAL_W - badgeSize + 15}
            y={footerY - 50} // Floating above the footer line for prominence
            size={badgeSize}
          />
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col w-full items-center gap-4">
      {/* Canvas Stage */}
      <div
        ref={state.containerRef}
        className="flex justify-center items-center w-full bg-slate-100/50 rounded-2xl overflow-hidden border border-slate-200 p-4 shadow-inner"
      >
        <div
          className="shadow-2xl shadow-slate-300 relative"
          style={{ width: canvasWidth * state.scale, height: canvasHeight * state.scale }}
        >
          <Stage
            ref={(node) => { if (node && onStageReady) onStageReady(node); }}
            width={canvasWidth * state.scale}
            height={canvasHeight * state.scale}
            scaleX={scaleX}
            scaleY={scaleY}
          >
            <Layer>
              {isAbsolute ? renderAbsoluteMode() : renderFooterMode()}
              {!isThumb && <Watermark canvasWidth={LOGICAL_W} canvasHeight={LOGICAL_H} />}
            </Layer>
          </Stage>
        </div>
      </div>

      {/* Editor Controls — only visible in editor (not thumbnail) */}
      {!isThumb && (
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
          <p className="text-xs text-slate-500 font-bold tracking-wide uppercase flex items-center justify-center gap-1.5 opacity-90 select-none">
            <span>✨</span> புகைப்படம் & விவரங்கள் இழுத்து (Drag & Drop) எங்கு வேண்டுமானாலும் நகர்த்தி அமைக்கலாம்!
          </p>

          {/* Photo Zoom */}
          <div className="flex items-center gap-3 w-full bg-slate-50 rounded-lg p-2 px-3 border border-slate-100">
            <span className="text-sm font-semibold text-slate-600 whitespace-nowrap">📸 Zoom</span>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.05"
              value={state.userScale}
              onChange={(e) => state.setUserScale(parseFloat(e.target.value))}
              className="flex-1 cursor-pointer accent-green-600"
            />
            <span className="text-xs font-mono font-bold bg-white text-slate-600 shadow-sm border border-slate-200 px-2 py-1 rounded w-12 text-center">
              {state.userScale.toFixed(2)}x
            </span>
          </div>

          {/* Footer controls — only for footer-mode templates */}
          {!isAbsolute && (
            <>
              <div className="border-t border-slate-100 pt-3 flex flex-col gap-3">
                {/* Banner Style Picker */}
                <div>
                  <p className="text-xs font-black text-slate-500 uppercase tracking-wide mb-1">
                    🎨 Footer Banner வண்ணம்
                  </p>
                  <div className="flex items-start gap-4 overflow-x-auto pb-4 pt-3 px-1 hide-scrollbar snap-x snap-mandatory">
                    {FOOTER_STYLES.map((s, i) => (
                      <StyleSwatch
                        key={s.id}
                        colors={s.colors}
                        label={s.label}
                        isSelected={state.selectedStyleIdx === i}
                        onClick={() => state.setSelectedStyleIdx(i)}
                      />
                    ))}
                  </div>
                </div>

                {/* Leader Badge Picker */}
                {footerImages.length > 0 && (
                  <div>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-wide mb-1">
                      👤 Leader படம்
                    </p>
                    <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-3 px-1 hide-scrollbar snap-x snap-mandatory">
                      {footerImages.map((src, i) => (
                        <BadgeThumbnail
                          key={src}
                          src={src}
                          isSelected={state.selectedBadgeIdx === i}
                          onClick={() => state.setSelectedBadgeIdx(i)}
                        />
                      ))}
                      {/* Cycle / Random button */}
                      <button
                        onClick={() => state.cycleBadge(footerImages.length)}
                        title="Next leader"
                        className="w-12 h-12 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center text-xl hover:bg-green-100 active:scale-90 transition-all duration-150 shrink-0 snap-start shadow-sm"
                      >
                        🎲
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
