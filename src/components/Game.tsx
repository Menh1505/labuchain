import React, { useState } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import { useWindowSize } from '../hooks/useWindowSize';
import Player from './characters/Player';
import Monster from './characters/Monster';
import AttackButton from './buttons/Attack.button';

const Game: React.FC = () => {
    const { width: windowWidth, height: windowHeight } = useWindowSize();
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
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <Stage 
                width={stageWidth} 
                height={stageHeight}
            >
                <Layer>
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

                    <Text
                        text={`HP: ${monsterHealth}`}
                        fontSize={stageWidth * 0.04}
                        x={stageWidth * 0.7}
                        y={stageHeight * 0.35}
                        fill="black"
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
