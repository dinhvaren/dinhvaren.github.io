import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Pointer, Type, Circle } from 'lucide-react';

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text'>('default');
  const [isTyping, setIsTyping] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const updateCursorType = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('input, textarea')) {
        setCursorType('text');
      } else if (target.closest('a, button, [role="button"]')) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('input, textarea')) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 1000);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', updateCursorType);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', updateCursorType);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="custom-cursor fixed pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        left: cursorX,
        top: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      {cursorType === 'default' && (
        <Circle className="w-4 h-4 text-cyan-400" strokeWidth={1.5} aria-hidden="true" />
      )}
      {cursorType === 'pointer' && (
        <Pointer className="w-5 h-5 text-amber-400" strokeWidth={1.5} aria-hidden="true" />
      )}
      {cursorType === 'text' && (
        <div className="relative">
          <Type className="w-5 h-5 text-green-400" strokeWidth={1.5} aria-hidden="true" />
          {isTyping && (
            <div className="absolute -right-12 top-1/2 -translate-y-1/2">
              <div className="flex gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}