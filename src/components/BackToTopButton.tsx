import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [footerIntersecting, setFooterIntersecting] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const footer = document.getElementById('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterIntersecting(entry.isIntersecting);
      },
      { 
        threshold: 0,
        rootMargin: "-88px 0px 0px 0px" // Negative margin to create space above footer
      }
    );

    observer.observe(footer);
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className={`fixed p-3 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 hover:bg-green-500/20 transition-colors z-50 right-8 ${
            footerIntersecting ? 'absolute bottom-[88px]' : 'bottom-8'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}