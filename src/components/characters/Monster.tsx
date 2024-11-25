import React, { useState, useEffect } from "react";
import { Image } from "react-konva";
import useImage from "use-image";

interface MonsterProps {
  x: number;
  y: number;
  width: number;
  height: number;
  scale?: number;
}

const Monster: React.FC<MonsterProps> = ({
  x,
  y,
  width,
  height,
  scale = 1,
}) => {
  const [image] = useImage("/assets/monster-sprite.png");
  const frameWidth = 32;
  const frameHeight = 32;
  const frameCount = 2;
  const frameRate = 2; // Số frame mỗi giây

  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (!image) return;

    const animation = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % frameCount);
    }, 1000 / frameRate);

    return () => clearInterval(animation);
  }, [image, frameCount, frameRate]);

  return (
    <Image
      x={x}
      y={y}
      image={image}
      width={width}
      scaleX={scale}
      scaleY={scale}
      height={height}
      crop={{
        x: currentFrame * frameWidth,
        y: 0,
        width: frameWidth,
        height: frameHeight,
      }}
    />
  );
};

export default Monster;
