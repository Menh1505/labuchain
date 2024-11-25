import React, { useState, useEffect } from "react";
import { Image } from "react-konva";
import useImage from "use-image";

interface PlayerProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  scale?: number;
  onAttack?: () => void;
}

const Player: React.FC<PlayerProps> = ({
  x,
  y,
  width = 270, // Điều chỉnh kích thước hiển thị là 1/4 của frame
  height = 270,
  scale = 1.5, // điều chỉnh scale cho hình ảnh
  onAttack,
}) => {
  const [image] = useImage("/assets/Test.png");
  const frameWidth = 1080; // Kích thước thật của mỗi frame
  const frameHeight = 1080; // Kích thước thật của mỗi frame
  const frameCount = 2; // Số frame trong sprite sheet
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
      height={height}
      scaleX={scale}
      scaleY={scale}
      crop={{
        x: currentFrame * frameWidth,
        y: 0,
        width: frameWidth,
        height: frameHeight,
      }}
      onClick={onAttack}
    />
  );
};

export default Player;
