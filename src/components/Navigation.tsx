import { useState, useEffect, useCallback, memo } from 'react';
import { motion, useAnimation, useScroll, AnimatePresence } from 'framer-motion';
import { Code2, Home, User, Briefcase, Send, Menu, X, Link } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { name: 'home', icon: Home, href: '#home', label: 'Navigate to home section' },
  { name: 'about', icon: User, href: '#about', label: 'Learn more about me' },
  { name: 'awards', icon: User, href: '#awards', label: 'List of my awards' },
  // { name: 'experience', icon: Briefcase, href: '#experience', label: 'List of my experience' },
  { name: 'projects', icon: Code2, href: '#projects', label: 'Browse my projects' },
  { name: 'portfolios', icon: Link, href: '#portfolios', label: 'View my portfolios' },
  { name: 'contact', icon: Send, href: '#contact', label: 'Contact me' }
];

export const Navigation = memo(function Navigation() {
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId.substring(1));
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      controls.start({ opacity: latest > 50 ? 0.9 : 1 });
    });

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      unsubscribe();
      document.body.style.overflow = '';
    };
  }, [controls, scrollY, isMenuOpen]);

  const menuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    closed: {
      x: 50,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 1 }}
      animate={controls}
      className="fixed top-0 w-full z-50 backdrop-blur-sm bg-[rgba(var(--bg-rgb),0.8)] border-b border-green-500/20"
      style={{ height: 'var(--header-height)' }}
    >
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="flex items-center justify-between w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <span className="font-light tracking-wider text-sm sm:text-base whitespace-nowrap">
              <span className="text-green-500">$</span>
              &nbsp;dinhvaren@portfolio:~
              <span className="terminal-cursor"></span>
            </span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="nav-item group flex items-center space-x-2 text-sm tracking-wider text-gray-300 hover:text-green-500 transition-colors duration-300"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={item.label}
                >
                  <Icon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                  <span className="hidden sm:inline">{item.name}.sh</span>
                </motion.button>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-green-500 hover:text-green-400 transition-colors z-[60] p-2"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 180, opacity: 1 }}
                  exit={{ rotate: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="w-8 h-8" aria-hidden="true" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu className="w-8 h-8" aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[rgba(var(--bg-rgb),0.98)] backdrop-blur-lg z-50 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Menu */}
      <motion.div
        className="fixed top-0 right-0 h-[90vh] w-[80vw] sm:w-80 bg-[rgba(var(--bg-rgb),0.98)] backdrop-blur-lg lg:hidden pt-16 px-4 z-50 overflow-y-auto"
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        role="dialog"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col items-center space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center justify-center space-x-3 text-[rgb(var(--text-rgb))] hover:text-green-400 transition-colors w-full text-base font-medium py-2 px-4 min-h-[44px] relative group"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                <span className="relative leading-none">
                  {item.name}.sh
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-500 origin-left transform scale-x-0 transition-transform duration-300"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                  />
                </span>
              </motion.button>
            );
          })}
          <ThemeToggle />
        </div>
      </motion.div>
    </motion.nav>
  );
});