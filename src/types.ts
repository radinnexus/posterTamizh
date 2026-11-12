export type UserDetails = {
  name: string;
  desig: string;
  area: string;
  photoDataUrl: string | null;
};

export type PhotoShape = 'circle' | 'rect';

export interface LayoutRect {
  x: number; // 0 to 1 (Percentage of canvas width)
  y: number; // 0 to 1 (Percentage of canvas height)
  w?: number; // 0 to 1
  h?: number; // 0 to 1
  r?: number; // 0 to 1 (Percentage of canvas width)
  scale?: number;
}

export interface TextFieldLayout {
  x: number;
  y: number;
  color: string;
  align: 'left' | 'center' | 'right';
  baseline: 'top' | 'middle' | 'bottom';
  fontFamily?: string;
  fontWeight?: string;
  baseSize: number;
  fontSize?: number;
  shadowColor?: string;
  shadowBlur?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

export interface PosterLayout {
  bgImageSrc: string;
  hasCoords: boolean;
  footerImages?: string[];
  photo?: {
    shape: PhotoShape;
    config: LayoutRect;
    borderColor?: string;
    borderWidth?: number;
    shadow?: boolean;
    behindBg?: boolean;
  };
  text?: {
    name: TextFieldLayout;
    designation?: TextFieldLayout;
    area?: TextFieldLayout;
  };
}
