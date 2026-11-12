import { useState, useEffect, useRef, useCallback } from 'react';
import { Party, Template } from '@/data/parties';
import { UserDetails } from '@/types';
import { FOOTER_STYLES, FooterStyle } from '../constants/footerStyles';

export interface CanvasState {
  containerRef: React.RefObject<HTMLDivElement | null>;
  scale: number;
  userImg: HTMLImageElement | null;
  bgImg: HTMLImageElement | null;
  photoPos: { x: number; y: number };
  setPhotoPos: (pos: { x: number; y: number }) => void;
  userScale: number;
  setUserScale: (s: number) => void;
  textPos: Record<string, { x: number; y: number }>;
  setTextPos: React.Dispatch<React.SetStateAction<Record<string, { x: number; y: number }>>>;
  isDraggingNode: boolean;
  setIsDraggingNode: (d: boolean) => void;
  // Footer customization
  selectedBadgeIdx: number;
  setSelectedBadgeIdx: (i: number) => void;
  cycleBadge: (total: number) => void;
  selectedStyleIdx: number;
  setSelectedStyleIdx: (i: number) => void;
  selectedStyle: FooterStyle;
}

const LOGICAL_W = 500;
const LOGICAL_H = 600;
const FOOTER_HEIGHT = 120;

export const useCanvasState = (
  canvasWidth: number,
  party: Party,
  template: Template,
  details: UserDetails,
  isThumb: boolean
): CanvasState => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [userImg, setUserImg] = useState<HTMLImageElement | null>(null);
  const [bgImg, setBgImg] = useState<HTMLImageElement | null>(null);
  const [photoPos, setPhotoPos] = useState({ x: 0, y: 0 });
  const [userScale, setUserScale] = useState(1);
  const [textPos, setTextPos] = useState<Record<string, { x: number; y: number }>>({});
  const [, setFontsLoaded] = useState(false);
  const [isDraggingNode, setIsDraggingNode] = useState(false);

  // Footer customization state — random badge on first load
  const [selectedBadgeIdx, setSelectedBadgeIdx] = useState<number>(() => {
    const total = party.footerImages?.length ?? 0;
    return total > 0 ? Math.floor(Math.random() * total) : 0;
  });
  const [selectedStyleIdx, setSelectedStyleIdx] = useState(0);

  // Reset badge index randomly when template changes
  useEffect(() => {
    const total = party.footerImages?.length ?? 0;
    setSelectedBadgeIdx(total > 0 ? Math.floor(Math.random() * total) : 0);
  }, [template.id, party.footerImages]);

  const cycleBadge = useCallback((total: number) => {
    if (total === 0) return;
    setSelectedBadgeIdx((prev) => (prev + 1) % total);
  }, []);

  // Font loading
  useEffect(() => {
    document.fonts.ready.then(() => setFontsLoaded(true));
  }, []);

  // Container responsive scaling
  useEffect(() => {
    if (isThumb) {
      setScale(1);
      return;
    }
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setScale(containerWidth / canvasWidth);
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [canvasWidth, isThumb]);

  // User photo loading
  useEffect(() => {
    if (details.photoDataUrl) {
      const img = new Image();
      img.onload = () => setUserImg(img);
      img.src = details.photoDataUrl;
    } else {
      setUserImg(null);
    }
  }, [details.photoDataUrl]);

  // Background image loading
  useEffect(() => {
    const bgSrc = template.layout?.bgImageSrc;
    if (bgSrc) {
      const img = new Image();
      img.onload = () => setBgImg(img);
      img.src = bgSrc;
    } else {
      setBgImg(null);
    }
  }, [template.layout?.bgImageSrc]);

  // Initialize positions from template config
  useEffect(() => {
    if (!template.layout) return;
    const l = template.layout;
    const isAbs = l.hasCoords;
    const initialTexts: Record<string, { x: number; y: number }> = {};

    if (isAbs) {
      const pCfg = l.photo?.config;
      setPhotoPos({ x: pCfg?.x ?? 0, y: pCfg?.y ?? 0 });
      setUserScale(pCfg?.scale ?? 1);

      if (l.text?.name) initialTexts.name = { x: l.text.name.x, y: l.text.name.y };
      if (l.text?.designation) initialTexts.designation = { x: l.text.designation.x, y: l.text.designation.y };
      if (l.text?.area) initialTexts.area = { x: l.text.area.x, y: l.text.area.y };
    } else {
      const footerY = LOGICAL_H - FOOTER_HEIGHT;
      setPhotoPos({ x: 10, y: footerY + 5 });
      setUserScale(1);

      initialTexts.name = { x: 120, y: footerY + 20 };
      initialTexts.designation = { x: 120, y: footerY + 50 };
      initialTexts.area = { x: 120, y: footerY + 72 };
    }

    setTextPos(initialTexts);
  }, [template.id, template.layout, canvasWidth]);

  return {
    containerRef,
    scale,
    userImg,
    bgImg,
    photoPos,
    setPhotoPos,
    userScale,
    setUserScale,
    textPos,
    setTextPos,
    isDraggingNode,
    setIsDraggingNode,
    selectedBadgeIdx,
    setSelectedBadgeIdx,
    cycleBadge,
    selectedStyleIdx,
    setSelectedStyleIdx,
    selectedStyle: FOOTER_STYLES[selectedStyleIdx] ?? FOOTER_STYLES[0],
  };
};
