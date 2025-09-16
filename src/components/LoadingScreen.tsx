import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    // Reduced loading time to 800ms for faster initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('hasLoaded', 'true');
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 bg-[rgb(var(--bg-rgb))] flex items-center justify-center p-4"
    >
      <div className="space-y-3 font-mono text-green-500 text-sm sm:text-base">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2"
        >
          <span className="animate-pulse">▶</span>
          <span>initializing system...</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2"
        >
          <span className="animate-pulse">▶</span>
          <span>loading profile...</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2"
        >
          <span className="animate-pulse">▶</span>
          <span>access granted</span>
        </motion.div>
      </div>
    </motion.div>
  );
}