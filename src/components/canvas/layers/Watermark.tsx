import { Text as KonvaText, Group } from 'react-konva';

interface WatermarkProps {
  canvasWidth: number;
  canvasHeight: number;
}

const Watermark = ({ canvasWidth, canvasHeight }: WatermarkProps) => {
  const brandName = "POSTERTAMIZH.APP";

  return (
    <Group listening={false}>
      {/* Main Professional Vertical Watermark */}
      {/* Positioned on the right side, reading bottom-to-top */}
      <Group x={canvasWidth - 11} y={150} opacity={0.7} rotation={-90}>
        <KonvaText
          text={brandName}
          fontSize={10}
          fontFamily="Inter, Catamaran, sans-serif"
          fontStyle="bold"
          fill="#0e0e0eff"
          shadowColor="#fbf8f8ff"
          shadowBlur={3}
          shadowOpacity={0.8}
          shadowOffsetX={0.5}
          shadowOffsetY={0.5}
          letterSpacing={2}
        />
      </Group>
    </Group>
  );
};

export default Watermark;




