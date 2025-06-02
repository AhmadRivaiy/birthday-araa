import { useEffect, useRef } from 'react';

export default function CanvasConfetti() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const confetti: ConfettiParticle[] = [];
        const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#FFB347', '#B19CD9'];

        for (let i = 0; i < 150; i++) {
            confetti.push(createParticle());
        }

        function createParticle(): ConfettiParticle {
            return {
                x: Math.random() * (canvas?.width || 0),
                y: Math.random() * (canvas?.height || 0),
                r: Math.random() * 6 + 4,
                d: Math.random() * 100,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.floor(Math.random() * 10) - 10,
                tiltAngle: 0,
                tiltAngleIncremental: Math.random() * 0.1 + 0.05,
            };
        }

        function draw() {
            if (!ctx) return;
            if (canvas) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }

            confetti.forEach((p, i) => {
                ctx.beginPath();
                ctx.lineWidth = p.r;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
                ctx.stroke();
            });

            update();
            requestAnimationFrame(draw);
        }

        function update() {
            confetti.forEach((p) => {
                p.tiltAngle += p.tiltAngleIncremental;
                p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
                p.x += Math.sin(p.d);
                p.tilt = Math.sin(p.tiltAngle) * 15;

                if (canvas && p.y > canvas.height) {
                    p.x = Math.random() * canvas.width;
                    p.y = -20;
                }
            });
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-50 pointer-events-none" />;
}

interface ConfettiParticle {
    x: number;
    y: number;
    r: number;
    d: number;
    color: string;
    tilt: number;
    tiltAngle: number;
    tiltAngleIncremental: number;
}
