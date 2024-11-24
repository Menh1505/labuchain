import React, { useState, useEffect } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

interface PlayerProps {
    x: number;
    y: number;
    width?: number;
    height?: number;
    onAttack?: () => void;
}
const Player: React.FC<PlayerProps> = ({ x, y, onAttack }) => {
    const [image] = useImage('/assets/player-sprite.png');
    const frameWidth = 64;  // Điều chỉnh theo kích thước thực của frame
    const frameHeight = 64; // Điều chỉnh theo kích thước thực của frame
    const frameCount = 2;   // Số frame trong sprite sheet
    const frameRate = 2;    // Số frame mỗi giây

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
            width={frameWidth}
            height={frameHeight}
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

