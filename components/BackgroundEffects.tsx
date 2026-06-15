'use client';

import React from 'react';
import { motion } from 'framer-motion';

type FilledBox = { row: number; col: number; duration: number; delay: number };

const BackgroundEffects: React.FC = () => {
    const gridSize = 50;
    const minGap = 3;
    // Start as null so nothing renders on the server (avoids SSR/client mismatch entirely)
    const [filledBoxes, setFilledBoxes] = React.useState<FilledBox[] | null>(null);

    React.useEffect(() => {
        const boxes: FilledBox[] = [];
        const cols = Math.ceil(window.innerWidth / gridSize);
        const rows = Math.ceil(window.innerHeight / gridSize);

        const isFarEnough = (row: number, col: number) =>
            boxes.every((box) => {
                const distance = Math.sqrt(
                    Math.pow(box.row - row, 2) + Math.pow(box.col - col, 2)
                );
                return distance >= minGap;
            });

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (Math.random() < 0.12 && isFarEnough(row, col)) {
                    // Pre-compute random values here (client-only) so they never run at render time
                    boxes.push({
                        row,
                        col,
                        duration: 4 + Math.random() * 3,
                        delay: Math.random() * 2,
                    });
                }
            }
        }
        setFilledBoxes(boxes);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.015]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            {/* Filled Grid Boxes — only rendered after client hydration */}
            <div className="absolute inset-0">
                {filledBoxes?.map((box, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.03, 0.06, 0.03] }}
                        transition={{
                            // Safe: these values were computed in useEffect, not at render time
                            duration: box.duration,
                            repeat: Infinity,
                            delay: box.delay,
                        }}
                        className="absolute bg-[#EF4E25]"
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
            <div className="absolute inset-0 noise opacity-50" />
        </div>
    );
};

export default BackgroundEffects;
