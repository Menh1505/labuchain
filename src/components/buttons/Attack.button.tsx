import React from 'react';
import { Rect, Text, Group } from 'react-konva';

interface AttackButtonProps {
    x: number;
    y: number;
    width: number;
    onClick: () => void;
}

const AttackButton: React.FC<AttackButtonProps> = ({ x, y, width, onClick }) => {
    const height = width * 0.25; // Tỷ lệ chiều cao = 1/4 chiều rộng
    const fontSize = height * 0.4; // Kích thước font tỷ lệ với chiều cao

    return (
        <Group x={x} y={y} onClick={onClick}>
            <Rect 
                width={width} 
                height={height} 
                fill="#EF4444" // Tailwind red-500
                cornerRadius={height * 0.2}
                shadowColor="black"
                shadowBlur={5}
                shadowOpacity={0.3}
            />
            <Text
                text="ATTACK"
                fontSize={fontSize}
                fontFamily="'Press Start 2P', system-ui" // Font pixel style
                fill="white"
                width={width}
                height={height}
                align="center"
                verticalAlign="middle"
            />
        </Group>
    );
};

export default AttackButton;
