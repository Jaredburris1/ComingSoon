// MatrixBackground.js
import React, { useRef, useEffect } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas to full screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Characters for the matrix effect
    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const chars = matrixChars.split("");

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    // Create an array of drops - one per column
    const drops = new Array(columns).fill(1);

    const draw = () => {
      // Fade the canvas slightly to create a trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.fillStyle = "#071FEC"; // Nice Blue color
      ctx.font = `${fontSize}px monospace`;

      // Loop over drops and draw characters
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop to top randomly after it passes the screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    // Start the animation loop
    const intervalId = setInterval(draw, 33);

    // Cleanup on component unmount
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1, // Ensure the canvas stays behind other content
      }}
    />
  );
};

export default MatrixBackground;
