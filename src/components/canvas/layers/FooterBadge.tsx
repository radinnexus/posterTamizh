import React, { useEffect, useState } from 'react';
import { Image as KonvaImage, Group, Circle } from 'react-konva';

interface FooterBadgeProps {
  imageSrc: string;
  x: number;
  y: number;
  size: number;
  borderWidth?: number;
  borderColor?: string;
}

const FooterBadge = ({
  imageSrc,
  x,
  y,
  size,
  borderWidth = 0,
  borderColor = '#FFFFFF',
}: FooterBadgeProps) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImage(img);
    img.src = imageSrc;
  }, [imageSrc]);

  return (
    <>

      {/* Circular clipped badge image */}
      <Group
        x={x + borderWidth}
        y={y + borderWidth}
        clipFunc={(ctx) =>
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, false)
        }
        listening={false}
      >
        {image && (
          <KonvaImage
            image={image}
            width={size}
            height={size}
            listening={false}
          />
        )}
      </Group>
    </>
  );
};

export default FooterBadge;
