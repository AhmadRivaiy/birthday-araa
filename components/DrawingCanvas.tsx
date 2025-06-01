'use client';

import { useRef, useState, useEffect } from 'react';

interface DrawingCanvasProps {
    onFinishDrawing: (dataUrl: string) => void;
}

export default function DrawingCanvas({ onFinishDrawing }: DrawingCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [drawing, setDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = 300;
        canvas.height = 250;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.lineCap = 'round';
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#F564A9';

        const getXY = (e: MouseEvent | TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            if ('touches' in e) {
                return {
                    x: e.touches[0].clientX - rect.left,
                    y: e.touches[0].clientY - rect.top,
                };
            } else {
                return {
                    x: e.offsetX,
                    y: e.offsetY,
                };
            }
        };

        const start = (e: MouseEvent | TouchEvent) => {
            e.preventDefault();
            setDrawing(true);
            const { x, y } = getXY(e);
            ctx.beginPath();
            ctx.moveTo(x, y);
        };

        const draw = (e: MouseEvent | TouchEvent) => {
            if (!drawing) return;
            const { x, y } = getXY(e);
            ctx.lineTo(x, y);
            ctx.stroke();
        };

        const stop = () => {
            if (!drawing) return;
            setDrawing(false);
            ctx.closePath();
            const dataUrl = canvas.toDataURL();
            onFinishDrawing(dataUrl);
        };

        canvas.addEventListener('mousedown', start);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stop);
        canvas.addEventListener('mouseleave', stop);

        canvas.addEventListener('touchstart', start, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', stop);

        return () => {
            canvas.removeEventListener('mousedown', start);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stop);
            canvas.removeEventListener('mouseleave', stop);
            canvas.removeEventListener('touchstart', start);
            canvas.removeEventListener('touchmove', draw);
            canvas.removeEventListener('touchend', stop);
        };
    }, [drawing, onFinishDrawing]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
      
        return () => {
          // clean up canvas events, etc
        };
      }, []);

    return (
        <div className="relative">
            <canvas ref={canvasRef} className="h-[250px] w-[300px] bg-white cursor-crosshair rounded-md" />
        </div>
    );
}
