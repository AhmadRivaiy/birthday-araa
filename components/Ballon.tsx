'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Balloon({ countBallons,  isRandom = false, onClickedBallon, text }: {  isRandom?: boolean, text?: string, countBallons: number, onClickedBallon?: () => void }) {
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);
    type BalloonType = {
        id: string;
        startX: number;
        driftX: number;
        delay: number;
        fill: string;
        shape: string;
        text: string;
        size: number;
    };
    const [balloonsV2, setBalloonsV2] = useState<BalloonType[]>([]);

    const handleClick = (index: number) => {
        setClickedIndex(index);
        if (onClickedBallon) {
            onClickedBallon();
        }
    }

    const balloons = useMemo(() => {
        return Array.from({ length: countBallons }).map((_, i) => ({
            id: uuidv4(),
            startX: Math.random() * 100,
            driftX: (Math.random() - 0.5) * 80,
            delay: Math.random() * 4,
            fill: `hsl(${Math.random() * 360}, 70%, 60%)`,
            shape: Math.random() > 0.5 ? 'circle' : 'heart',
            text: i % 2 === 0 ? '🎉' : '💖',
            size: Math.random() * 10 + 30
        }));
    }, []);

    useEffect(() => {
        const newBalloon = {
            id: uuidv4(),
            startX: Math.random() * 100,
            driftX: (Math.random() - 0.5) * 80,
            delay: Math.random() * 4,
            fill: `hsl(${Math.random() * 360}, 70%, 60%)`,
            shape: Math.random() > 0.5 ? 'circle' : 'heart',
            text: Math.random() > 0.5 ? '🎉' : '💖',
            size: Math.random() * 10 + 30,
        };
        Array.from({ length: countBallons }).map((_, i) => {
            setBalloonsV2(prev => [...prev, newBalloon]);
        })
    }, []);

    useEffect(() => {
        const newBalloon = {
            id: uuidv4(),
            startX: Math.random() * 100,
            driftX: (Math.random() - 0.5) * 80,
            delay: Math.random() * 4,
            fill: `hsl(${Math.random() * 360}, 70%, 60%)`,
            shape: Math.random() > 0.5 ? 'circle' : 'heart',
            text: Math.random() > 0.5 ? '🎉' : '💖',
            size: Math.random() * 10 + 30,
        };
        setBalloonsV2(prev => [...prev, newBalloon]);
    }, [countBallons]);

    return (
        <div className="fixed inset-0 overflow-hidden w-full">
            {isRandom ? balloons.map((_, i) => {
                return (
                    <motion.div
                        key={_.id}
                        style={{
                            position: 'absolute',
                            left: `${_.startX}%`,
                            bottom: 0,
                            transform: 'translateX(-50%)',
                        }}
                        className="absolute pointer-events-auto cursor-pointer"
                        initial={{ y: window.innerHeight || 1000, x: 0 }}
                        animate={{ y: -1000, x: _.driftX }}
                        transition={{
                            duration: 12 + Math.random() * 5,
                            delay: _.delay,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                        onClick={() => handleClick(i)}
                    >
                        <BalloonSVG fillColor={_.fill} index={i} _text={_.text} _fontSize={_.size} />
                    </motion.div>
                );
            }) : balloonsV2.map((_, i) => {
                return (
                    <motion.div
                        key={_.id}
                        style={{
                            position: 'absolute',
                            left: `${_.startX}%`,
                            bottom: 0,
                            transform: 'translateX(-50%)',
                        }}
                        className="absolute pointer-events-auto cursor-pointer"
                        initial={{ y: window.innerHeight || 1000, x: 0 }}
                        animate={{ y: -1000, x: _.driftX }}
                        transition={{
                            duration: 12 + Math.random() * 5,
                            delay: _.delay,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                        onClick={() => handleClick(i)}
                    >
                        <BalloonSVG fillColor={_.fill} index={i} _text={_.text} _fontSize={_.size} />
                    </motion.div>
                );
            })}
        </div>
    );
}

function BalloonSVG({ fillColor, index, _text, _fontSize }: { _fontSize?: number, _text?: string, fillColor: string, index: number }) {
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);

    return (
        <svg width="60" height="140" viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg" onClick={() => setClickedIndex(index)}>
            <ellipse
                cx="50"
                cy="60"
                rx="40"
                ry="55"
                fill={clickedIndex === index ? '#FFD700' : fillColor}
            />
            <ellipse cx="35" cy="45" rx="8" ry="15" fill="#ffffff55" />
            <text
                x="50"
                y="60"
                textAnchor="middle"
                fontSize={_fontSize || 12}
                fill="white"
                fontFamily="Comic Sans MS"
                transform="rotate(-10 50 60)"
            >
                {_text || 'yeayyy!!'}
            </text>
            <rect x="45" y="110" width="10" height="10" fill="#00000055" rx="2" />
            <path
                d="M50 120 Q45 130, 50 140 Q55 150, 50 160"
                stroke="#FFD700"
                strokeWidth="2"
                fill="none"
            />
        </svg>
    );
}
