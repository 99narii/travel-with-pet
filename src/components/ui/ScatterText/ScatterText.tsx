import { useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './ScatterText.module.css';

interface ScatterTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
}

export function ScatterText({
  text,
  className = '',
  delay = 0,
  duration = 1.2,
  staggerDelay = 0.03,
}: ScatterTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });

  // Split text into lines, then words, then characters with global index
  const processedText = useMemo(() => {
    let globalIndex = 0;
    return text.split('\n').map((line) => ({
      text: line,
      words: line.split(' ').map((word) => ({
        text: word,
        chars: word.split('').map((char) => ({
          char,
          index: globalIndex++,
        })),
      })),
    }));
  }, [text]);

  // Generate random scatter values for each character
  const getScatterValues = (index: number) => {
    const seed = index * 137.5;
    return {
      x: Math.sin(seed) * 80 + Math.cos(seed * 0.7) * 60,
      y: Math.cos(seed * 1.3) * 60 + Math.sin(seed * 0.5) * 40,
      rotate: Math.sin(seed * 2) * 60,
      scale: 0.2,
    };
  };

  return (
    <span ref={containerRef} className={`${styles.container} ${className}`}>
      {processedText.map((line, lineIndex) => (
        <span key={lineIndex} className={styles.line}>
          {line.words.map((word, wordIndex) => (
            <span key={wordIndex} className={styles.word}>
              {word.chars.map((charData) => {
                const scatter = getScatterValues(charData.index);
                const charDelay = delay + charData.index * staggerDelay;

                return (
                  <motion.span
                    key={charData.index}
                    className={styles.char}
                    initial={{
                      opacity: 0,
                      x: scatter.x,
                      y: scatter.y,
                      rotate: scatter.rotate,
                      scale: scatter.scale,
                      filter: 'blur(10px)',
                    }}
                    animate={isInView ? {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      rotate: 0,
                      scale: 1,
                      filter: 'blur(0px)',
                    } : {
                      opacity: 0,
                      x: scatter.x,
                      y: scatter.y,
                      rotate: scatter.rotate,
                      scale: scatter.scale,
                      filter: 'blur(10px)',
                    }}
                    transition={{
                      duration: duration,
                      delay: charDelay,
                      ease: [0.23, 1, 0.32, 1],
                      opacity: { duration: duration * 0.7, delay: charDelay },
                      filter: { duration: duration * 0.5, delay: charDelay },
                    }}
                  >
                    {charData.char}
                  </motion.span>
                );
              })}
              {wordIndex < line.words.length - 1 && (
                <span className={styles.space}>&nbsp;</span>
              )}
            </span>
          ))}
          {lineIndex < processedText.length - 1 && <br />}
        </span>
      ))}
    </span>
  );
}
