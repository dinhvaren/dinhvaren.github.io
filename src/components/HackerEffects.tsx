import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function HackerEffects() {
  const reduceMotion = useReducedMotion();
  const [glitchText, setGlitchText] = useState('ACCESS_GRANTED');

  useEffect(() => {
    if (reduceMotion) return;
    const texts = ['SYSTEM_BREACH', 'ACCESS_GRANTED', 'INIT_SEQUENCE', 'DECRYPT_DATA'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setGlitchText(texts[currentIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [reduceMotion]);

  if (reduceMotion) {
    return null;
  }

  return (
    <>
      {/* Floating Binary */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full binary-rain opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="binary-column"
              style={{
                left: `${i * 5}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              01001010
            </div>
          ))}
        </div>
      </div>

      {/* Glitch Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        className="fixed top-5 right-5 pointer-events-none z-0"
      >
        <div className="glitch-text text-4xl font-bold" data-text={glitchText}>
          {glitchText}
        </div>
      </motion.div>

      {/* Circuit Lines */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="circuit-lines opacity-10" />
      </div>
    </>
  );
}