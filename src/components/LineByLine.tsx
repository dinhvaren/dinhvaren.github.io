import React, { useState, useRef, useEffect } from 'react';
import TypeWriter from './TypeWriter';

export interface LineByLineProps {
  lines: string[];
  onComplete?: () => void;
  speed?: 'fast' | 'normal';
}

const LineByLine: React.FC<LineByLineProps> = React.memo(
  ({ lines, onComplete, speed = 'normal' }) => {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [completedLines, setCompletedLines] = useState<string[]>([]);
    const [isLastLineComplete, setIsLastLineComplete] = useState(false);
    const mountedRef = useRef(true);

    useEffect(() => {
      mountedRef.current = true;
      return () => {
        mountedRef.current = false;
      };
    }, []);

    const handleLineComplete = () => {
      if (!mountedRef.current) return;
      if (currentLineIndex === lines.length - 1) {
        setIsLastLineComplete(true);
        onComplete?.();
      } else {
        setCompletedLines(prev => [...prev, lines[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      }
    };

    return (
      <div className="space-y-1">
        {completedLines.map((line, index) => (
          <div
            key={index}
            className="font-mono text-xs sm:text-sm md:text-base break-words"
          >
            {line}
          </div>
        ))}
        {currentLineIndex < lines.length && (
          isLastLineComplete && currentLineIndex === lines.length - 1 ? (
            <div className="font-mono text-xs sm:text-sm md:text-base break-words">
              {lines[currentLineIndex]}
            </div>
          ) : (
            <TypeWriter
              text={lines[currentLineIndex]}
              onComplete={handleLineComplete}
              showCursor={!isLastLineComplete && currentLineIndex === lines.length - 1}
              speed={speed}
            />
          )
        )}
      </div>
    );
  }
);

export default LineByLine;
