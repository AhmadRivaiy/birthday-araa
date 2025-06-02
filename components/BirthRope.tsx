import { motion } from 'framer-motion';

export default function BirthdayBunting() {
    return (
        <div className="w-full flex justify-center mb-8">
            <motion.svg
                width="100%"
                height="100"
                viewBox="0 0 600 100"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 2, -2, 2, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                {/* Tali */}
                <path
                    d="M 20 40 Q 150 10 300 40 Q 450 70 580 40"
                    stroke="#555"
                    strokeWidth="3"
                    fill="none"
                />

                {/* Bendera per segitiga */}
                {Array.from({ length: 9 }).map((_, i) => {
                    const x = 60 + i * 60;
                    const y = 40 + (i % 2 === 0 ? 0 : 5);
                    return (
                        <motion.polygon
                            key={i}
                            points={`${x},${y} ${x - 10},${y + 25} ${x + 10},${y + 25}`}
                            fill={['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF'][i % 4]}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                        />
                    );
                })}
            </motion.svg>
        </div>
    );
}