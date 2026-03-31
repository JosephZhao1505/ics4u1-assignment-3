import { useRef, useEffect } from 'react';

type GraphProps = {
    a: number;
    b: number;
    c: number;
    d: number;
    roots: number[];
}

export const CubicGraph = ({ a, b, c, d, roots }: GraphProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        };

        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return;
        }

        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        const scale = 25;

        const centerX = width / 2;
        const centerY = height / 2;

        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 1;

        for (let x = 0; x <= width; x += scale) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        for (let y = 0; y <= height; y += scale) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "blue";

        for (let px = 0; px < width; px++) {
            const x = (px - centerX) / scale;
            const y = a * x ** 3 + b * x ** 2 + c * x + d;
            const py = centerY - y * scale;

            if (px === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }

        ctx.stroke();

        ctx.fillStyle = "red";
        for (const root of roots) {
            const px = centerX + root * scale;
            const py = centerY;

            ctx.beginPath();
            ctx.arc(px, py, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }, [a, b, c, d, roots]); // Re-run when any of these change

    return (
        <canvas width="700" height="700"></canvas>
    );
};