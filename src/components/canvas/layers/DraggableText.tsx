import React, { useState } from 'react';
import { Text as KonvaText } from 'react-konva';

interface DraggableTextProps {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fill: string;
  fontFamily?: string;
  fontStyle?: string;
  letterSpacing?: number;
  align?: string;
  verticalAlign?: string;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffset?: { x: number; y: number };
  stroke?: string;
  strokeWidth?: number;
  draggable: boolean;
  onPositionChange: (pos: { x: number; y: number }) => void;
  width?: number; // ← added
  wrap?: 'word' | 'char' | 'none'; // ← added
}

const DraggableText = ({
  text,
  x,
  y,
  fontSize,
  fill,
  fontFamily = 'Noto Sans Tamil',
  fontStyle = 'bold',
  letterSpacing,
  align = 'left',
  verticalAlign = 'middle',
  shadowColor,
  shadowBlur = 0,
  shadowOffset,
  stroke,
  strokeWidth = 0,
  draggable,
  onPositionChange,
  width,
  wrap = 'word',
}: DraggableTextProps) => {
  const [isDragging, setIsDragging] = useState(false);

  if (!text) return null;

  return (
    <KonvaText
      text={text}
      x={x}
      y={y}
      width={width}
      wrap={wrap}
      fontSize={fontSize}
      fill={fill}
      fontFamily={fontFamily}
      fontStyle={fontStyle}
      letterSpacing={letterSpacing}
      align={align}
      verticalAlign={verticalAlign}
      shadowColor={isDragging ? undefined : shadowColor}
      shadowBlur={isDragging ? 0 : shadowBlur}
      shadowOffset={shadowOffset}
      stroke={stroke}
      strokeWidth={strokeWidth}
      draggable={draggable}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(e) => {
        setIsDragging(false);
        onPositionChange({ x: e.target.x(), y: e.target.y() });
      }}
    />
  );
};

export default DraggableText;
