import React, { useState, useEffect, useRef } from 'react';

export interface TypeWriterProps {
  text: string;
  onComplete?: () => void;
  showCursor?: boolean;
  speed?: 'fast' | 'normal';
}

const TypeWriter: React.FC<TypeWriterProps> = React.memo(
  ({ text, onComplete, showCursor = true, speed = 'normal' }) => {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
      let currentIndex = 0;
      let mounted = true;

      const type = () => {
        if (!mounted) return;
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
          const delay = speed === 'fast' ? 1 : Math.random() * 5 + 5;
          timerRef.current = setTimeout(type, delay);
        } else {
          setIsComplete(true);
          onComplete?.();
        }
      };

      type();

      return () => {
        mounted = false;
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, [text, onComplete, speed]);

    return (
      <span className="font-mono">
        {displayText}
        {showCursor && !isComplete && <span className="terminal-cursor-blink" />}
      </span>
    );
  }
);

export default TypeWriter;
