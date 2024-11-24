import { Group, Rect, Text } from "react-konva";

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

export default HealthBar;