import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function GiftBox() {
    const controls = useAnimation();
    const [bounceControls, setBounceControls] = useState(useAnimation());
    const hasMountedRef = useRef(false);

    useEffect(() => {
        const sequence = async () => {
            await controls.start({ rotate: 15, transition: { duration: 0.3 } });
            await controls.start({ rotate: -15, transition: { duration: 0.3 } });
            await controls.start({ rotate: 0, transition: { duration: 0.3 } });
            await controls.start({ y: -10, transition: { duration: 0.3 } });
            await controls.start({ y: 0, transition: { duration: 0.3 } });
        };
        const _interval = setInterval(() => {
            sequence();
        }, 1000);

        return () => {
            clearInterval(_interval);
        };
    }, [controls]);

    useEffect(() => {
        hasMountedRef.current = true;
    }, []);

    const handleClick = () => {
        if (hasMountedRef.current) {
            bounceControls.start({
                scale: [1, 1.2, 0.9, 1.1, 1],
                transition: { duration: 0.6, times: [0, 0.2, 0.4, 0.6, 1] },
            });
        }
    };

    return (
        <>
            <motion.svg
                width="120"
                height="120"
                viewBox="0 0 120 130"
                className="absolute -bottom-1/12 left-1/2 -translate-x-1/2"
                onClick={handleClick}
                animate={bounceControls}
            >
                {/* Kotak hadiah */}
                <rect x="30" y="50" width="60" height="50" fill="#41C9E2" rx="6" />
                <rect x="55" y="50" width="10" height="50" fill="#fff" />

                {/* Tutup */}
                <motion.rect
                    x="25"
                    y="40"
                    width="70"
                    height="15"
                    fill="#008DDA"
                    rx="5"
                    animate={controls}
                />

                {/* Pita */}
                <motion.path
                    d="M60 40 Q50 20 40 40 Q50 35 60 40 Q70 35 80 40 Q70 20 60 40"
                    fill="#FFD93D"
                    animate={controls}
                />
                <text
                    x="65"
                    y="115"
                    textAnchor="middle"
                    fontSize="11"
                    fill="#41C9E2"
                    fontFamily="Comic Sans MS"
                >
                    wahh, ada hadiah nihh...
                </text>
                <text
                    x="60"
                    y="130"
                    textAnchor="middle"
                    fontSize="11"
                    fill="#41C9E2"
                    fontFamily="Comic Sans MS"
                >
                    teken ajaa raa
                </text>
            </motion.svg>
        </>
    );
}