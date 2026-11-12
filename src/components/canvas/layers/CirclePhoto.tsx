import React from 'react';
import { Image as KonvaImage, Group, Circle } from 'react-konva';

interface CirclePhotoProps {
  image: HTMLImageElement;
  x: number;
  y: number;
  size: number;
  borderWidth?: number;
  borderColor?: string;
  scale: number;
  draggable: boolean;
  highlight?: boolean;
  onPositionChange: (pos: { x: number; y: number }) => void;
}

const CirclePhoto = ({
  image,
  x,
  y,
  size,
  borderWidth = 4,
  borderColor = '#FFFFFF',
  scale,
  draggable,
  onPositionChange,
  highlight = false,
}: CirclePhotoProps) => {
  const totalSize = size + borderWidth * 2;

  // Calculate image aspect ratio fitting logic
  const imgWidth = image.width;
  const imgHeight = image.height;
  const imgRatio = imgWidth / imgHeight;
  const circleRatio = 1; // It's a square/circle view

  let renderWidth = size;
  let renderHeight = size;
  let offsetX = 0;
  let offsetY = 0;

  if (imgRatio > circleRatio) {
    // Image is wider than circle
    renderWidth = size * imgRatio;
    offsetX = (renderWidth - size) / 2;
  } else {
    // Image is taller than circle
    renderHeight = size / imgRatio;
    offsetY = (renderHeight - size) / 2;
  }

  return (
    <Group
      x={x + totalSize / 2} // Position from center for better scaling
      y={y + totalSize / 2}
      offsetX={totalSize / 2} // Offset to make x,y match top-left of state
      offsetY={totalSize / 2}
      draggable={draggable}
      scaleX={scale}
      scaleY={scale}
      onDragEnd={(e) => {
        // When dragging, we update the state with the NEW top-left 
        // by subtracting the group's offset from its current position
        onPositionChange({
          x: e.target.x() - (totalSize / 2),
          y: e.target.y() - (totalSize / 2),
        });
      }}
    >
      {/* White border ring */}
      {highlight && <Circle
        x={totalSize / 2}
        y={totalSize / 2}
        radius={totalSize / 2}
        fill={borderColor}
        shadowColor="rgba(0,0,0,0.5)"
        shadowBlur={10}
        shadowOffset={{ x: 0, y: 3 }}
      />}

      {/* Circular clipped photo */}
      <Group
        x={borderWidth}
        y={borderWidth}
        clipFunc={(ctx) =>
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, false)
        }
      >
        <KonvaImage
          image={image}
          width={renderWidth}
          height={renderHeight}
          x={-offsetX}
          y={-offsetY}
        />
      </Group>
    </Group>
  );
};

export default CirclePhoto;
