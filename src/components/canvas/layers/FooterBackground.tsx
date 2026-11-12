import React from 'react';
import { Rect } from 'react-konva';
import { FooterStyle } from '../constants/footerStyles';

interface FooterBackgroundProps {
  canvasWidth: number;
  footerY: number;
  footerHeight: number;
  style: FooterStyle;
}

const FooterBackground = ({
  canvasWidth,
  footerY,
  footerHeight,
  style,
}: FooterBackgroundProps) => {
  const [c0, c1, c2] = style.colors;

  const flagColors = ['#000000', '#FFFFFF', '#FF0000'];

  return (
    <>
      {/* Colored gradient base */}
      <Rect
        x={0}
        y={footerY}
        width={canvasWidth}
        height={footerHeight + 40}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: 0, y: footerHeight + 40 }}
        fillLinearGradientColorStops={[0, c0, 0.5, c1, 1, c2]}
        listening={false}
      />

      {/* Semi-transparent dark overlay for text readability */}
      <Rect
        x={0}
        y={footerY - 2}
        width={canvasWidth}
        height={footerHeight + 40}
        fill={style.overlay}
        listening={false}
      />

      {/* Top accent line */}
      <Rect
        x={0}
        y={footerY - 3}
        width={canvasWidth - 10}
        height={3}
        fill={flagColors[0]}
        cornerRadius={1}
        listening={false}
      />

      {/* Middle accent line */}
      <Rect
        x={20}
        y={footerY}
        width={canvasWidth - 10}
        height={3}
        fill={flagColors[1]}
        cornerRadius={1}
        listening={false}
      />


      {/* Bottom accent line */}
      <Rect
        x={20}
        y={footerY + 3}
        width={canvasWidth - 10}
        height={3}
        fill={flagColors[2]}
        cornerRadius={1}
        listening={false}
      />
    </>
  );
};

export default FooterBackground;
