'use client';

import React from 'react';
import { motion } from 'framer-motion';

const BackgroundEffects: React.FC = () => {
  // Generate random filled boxes with spacing
  const gridSize = 50; // Size of each grid cell
  const minGap = 3; // Minimum gap between filled boxes (in grid cells)
  const [filledBoxes, setFilledBoxes] = React.useState<Array<{row: number, col: number}>>([]);
  
  React.useEffect(() => {
    const boxes: Array<{row: number, col: number}> = [];
    const cols = Math.ceil(window.innerWidth / gridSize);
    const rows = Math.ceil(window.innerHeight / gridSize);
    
    // Helper function to check if a position is far enough from existing boxes
    const isFarEnough = (row: number, col: number) => {
      return boxes.every(box => {
        const distance = Math.sqrt(
          Math.pow(box.row - row, 2) + Math.pow(box.col - col, 2)
        );
        return distance >= minGap;
      });
    };
    
    // Fill boxes randomly while maintaining minimum gap
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (Math.random() < 0.12 && isFarEnough(row, col)) {
          boxes.push({ row, col });
        }
      }
    }
    setFilledBoxes(boxes);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Filled Grid Boxes */}
      <div className="absolute inset-0">
        {filledBoxes.map((box, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.03, 0.06, 0.03] }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute bg-black"
            style={{
              left: `${box.col * gridSize}px`,
              top: `${box.row * gridSize}px`,
              width: `${gridSize - 1}px`,
              height: `${gridSize - 1}px`,
            }}
          />
        ))}
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 noise opacity-40" />
    </div>
  );
};

export default BackgroundEffects;
