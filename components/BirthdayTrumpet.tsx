'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BirthdayTrumpet({ dragCount = 0 }: { dragCount: number }) {
    const [confetti, setConfetti] = useState<number[]>([]);

    useEffect(() => {
        // const interval = setInterval(() => {
        //     setConfetti((prev) => [...prev, Date.now()]);
        // }, 300);
        // return () => clearInterval(interval);

        setConfetti((prev) => [...prev, dragCount]);
    }, [dragCount]);

    return (
        <div className="relative w-full h-28 flex items-center justify-start pl-10">
            {/* SVG Terompet */}
            <svg width="478" height="80" style={{ transform: 'rotate(-55deg)' }} viewBox="0 0 140 80" className="relative z-10">
                {/* Terompet badan */}
                <polygon points="0,40 100,15 100,65" fill="#FFD93D" />
                {/* Ujung bulat */}
                <circle cx="110" cy="40" r="10" fill="#FF6B6B" />
                {/* Dekorasi */}
                <line x1="30" y1="30" x2="30" y2="50" stroke="#fff" strokeWidth="2" />
                <line x1="60" y1="25" x2="60" y2="55" stroke="#fff" strokeWidth="2" />
            </svg>

            {/* Confetti */}
            <div className="absolute" style={{ left: '300px', top: '30px' }}>
                {confetti.map((id) => (
                    <motion.div
                        key={id}
                        className="w-2 h-2 rounded-full absolute"
                        style={{
                            backgroundColor: getRandomColor(),
                            left: `${Math.random() * 10 - 5}px`, // lebar pancaran
                        }}
                        initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        animate={{
                            y: -60 - Math.random() * 60,
                            x: (Math.random() - 0.5) * 100,
                            opacity: 0,
                            scale: 1.5,
                            rotate: Math.random() * 360,
                        }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        onAnimationComplete={() =>
                            setConfetti((prev) => prev.filter((item) => item !== id))
                        }
                    />
                ))}
            </div>
        </div>
    );
}

function getRandomColor() {
    const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#FFB347', '#B19CD9'];
    return colors[Math.floor(Math.random() * colors.length)];
}
