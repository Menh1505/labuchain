import React, { useState } from 'react';
import { Stage, Layer, Text, Rect, Group } from 'react-konva';
import { useWindowSize } from '../hooks/useWindowSize';
import Player from './characters/Player';
import Monster from './characters/Monster';
import AttackButton from './buttons/Attack.button';

const HealthBar = ({ 
    x, 
    y, 
    width, 
    height, 
    health, 
    maxHealth, 
    name 
}: { 
    x: number; 
    y: number; 
    width: number; 
    height: number; 
    health: number; 
    maxHealth: number;
    name: string;
}) => {
    const healthPercentage = health / maxHealth;
    const barWidth = width * 0.8; // Thanh máu chiếm 80% chiều rộng

    return (
        <Group x={x} y={y}>
            {/* Tên nhân vật */}
            <Text
                text={name}
                fontSize={height * 0.4}
                fill="black"
                width={width}
                align="center"
            />
            
            {/* Khung thanh máu */}
            <Rect
                y={height * 0.5}
                width={barWidth}
                height={height * 0.3}
                fill="#E5E7EB" // gray-200
                stroke="#374151" // gray-700
                strokeWidth={2}
                cornerRadius={4}
            />
            
            {/* Thanh máu */}
            <Rect
                y={height * 0.5}
                width={barWidth * healthPercentage}
                height={height * 0.3}
                fill="#EF4444" // red-500
                cornerRadius={4}
            />
            
            {/* Số máu */}
            <Text
                text={`${health}/${maxHealth}`}
                fontSize={height * 0.3}
                y={height * 0.5}
                width={barWidth}
                align="center"
                fill="white"
            />
        </Group>
    );
};

const Game: React.FC = () => {
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const [playerHealth, setPlayerHealth] = useState(100);
    const [monsterHealth, setMonsterHealth] = useState(100);

    // Tính toán kích thước game area
    const padding = 16; // 1rem = 16px
    const availableWidth = Math.min(windowWidth - padding * 2, 768);
    const availableHeight = windowHeight - padding * 2;

    // Tính toán kích thước stage để vừa với container
    let stageWidth = availableWidth;
    let stageHeight = availableHeight;

    // Điều chỉnh để giữ tỷ lệ 3:4
    if (stageHeight > stageWidth * 4/3) {
        stageHeight = stageWidth * 4/3;
    } else {
        stageWidth = stageHeight * 3/4;
    }

    const handleAttack = () => {
        setMonsterHealth((prev) => Math.max(prev - 10, 0));
        // Monster phản công
        setPlayerHealth((prev) => Math.max(prev - 5, 0));
    };

    return (
        <div className="w-full h-full flex items-center justify-center bg-white relative">
            <Stage 
                width={stageWidth} 
                height={stageHeight}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <Layer>
                    {/* Health Bars */}
                    <HealthBar 
                        x={stageWidth * 0.1}
                        y={stageHeight * 0.1}
                        width={stageWidth * 0.35}
                        height={stageWidth * 0.06}
                        health={playerHealth}
                        maxHealth={100}
                        name="Player"
                    />
                    
                    <HealthBar 
                        x={stageWidth * 0.55}
                        y={stageHeight * 0.1}
                        width={stageWidth * 0.35}
                        height={stageWidth * 0.06}
                        health={monsterHealth}
                        maxHealth={100}
                        name="Monster"
                    />

                    <Player 
                        x={stageWidth * 0.2} 
                        y={stageHeight * 0.5}
                        width={stageWidth * 0.2}
                        height={stageWidth * 0.2}
                        onAttack={handleAttack}
                    />

                    <Monster 
                        x={stageWidth * 0.7} 
                        y={stageHeight * 0.5}
                        width={stageWidth * 0.15}
                        height={stageWidth * 0.15}
                    />

                    <AttackButton 
                        x={stageWidth * 0.2}
                        y={stageHeight * 0.8}
                        width={stageWidth * 0.6}
                        onClick={handleAttack} 
                    />
                </Layer>
            </Stage>
        </div>
    );
};

export default Game;
