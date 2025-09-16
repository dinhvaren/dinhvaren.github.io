import { memo, type MouseEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { Terminal, ChevronDown, FileDown } from 'lucide-react';
import Typewriter from 'typewriter-effect';

export const Hero = memo(function Hero() {
  const handleDownloadCV = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = '/assets/cv_document.pdf';
    link.download = 'Daryl_Gatt_CV.pdf'; 
    link.target = '_blank'; 
    link.rel = 'noopener noreferrer';
    
    // Programmatically click the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(x, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const relativeY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    x.set(-relativeX * 10);
    y.set(relativeY * 10);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      id="home" 
      role="banner"
      aria-label="Welcome section"
      className="min-h-[100svh] flex items-center justify-center pt-[var(--header-height)]"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { delay: 0.5, duration: 0.5 }}
            className="order-2 md:order-1 max-w-2xl px-4 md:px-12 text-center md:text-left space-y-6 md:space-y-8 relative"
          >
            <div className="absolute inset-0 blur-2xl opacity-20">
              <div className="w-60 sm:w-80 h-60 sm:h-80 bg-green-500/20 rounded-full mx-auto animate-pulse"></div>
            </div>

            <h1 className="flex flex-col items-center md:items-start gap-2 md:gap-4 z-10 relative">
              <span className="block">Hello,</span>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span>I'm&nbsp;</span>
                <motion.span
                  className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-300"
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          filter: "brightness(1.5)",
                          textShadow: [
                            "0 0 20px rgba(34, 197, 94, 0.7)",
                            "0 0 35px rgba(34, 197, 94, 0.5)",
                            "0 0 50px rgba(34, 197, 94, 0.3)"
                          ].join(", ")
                        }
                  }
                  animate={
                    reduceMotion
                      ? undefined
                      : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 5, repeat: Infinity, ease: 'linear' }
                  }
                  style={{ backgroundSize: '200% 200%' }}
                >
                  Dinh
                </motion.span>
                <motion.span
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          rotate: [0, 20, 0],
                          y: [0, -10, 0]
                        }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 1.5, repeat: Infinity, repeatDelay: 1 }
                  }
                  className="text-4xl inline-flex"
                  role="img"
                  aria-label="Waving hand"
                >
                  👋
                </motion.span>
              </div>
            </h1>

            <div className="text-xl md:text-2xl text-gray-400 h-12 z-10 relative font-mono flex items-center justify-center md:justify-start">
              <span className="text-green-500 mr-2 hidden md:inline">&gt;</span>
              {reduceMotion ? (
                <span>Cybersecurity Student</span>
              ) : (
                <Typewriter
                  options={{
                    strings: [
                      'Information Security Student',
                      'Offensive Security Enthusiast',
                      'CTF Competitor',
                      'JavaScript & Java Developer',
                      'Security Researcher',
                      'Penetration Tester',
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                    delay: 80,
                    cursor: '█'
                  }}
                />
              )}
            </div>

            <p className="text-gray-400 max-w-3xl mx-auto md:mx-0 leading-relaxed font-light z-10 relative">
              Welcome to my digital workspace — built with purpose and precision. I specialize in{' '}
              <span className="text-green-400 font-medium">ethical hacking</span>,{' '}
              <span className="text-green-400 font-medium">developing exploit-driven applications</span>, and
              turning vulnerabilities into valuable insights.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 z-10 relative">
              <motion.button
                onClick={() => window.location.href = '/terminal'}
                className="cyber-button w-full sm:w-auto text-sm sm:text-base"
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                aria-label="View portfolio in terminal mode"
              >
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                <span>View Portfolio as Terminal</span>
              </motion.button>

              <motion.button
                onClick={handleDownloadCV}
                className="cyber-button w-full sm:w-auto text-sm sm:text-base bg-green-500/20"
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                aria-label="Download my CV"
              >
                <FileDown className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                <span>Click To Download CV</span>
              </motion.button>

              <motion.a
                href="#about"
                className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors group text-sm sm:text-base"
                whileHover={reduceMotion ? undefined : { y: 5 }}
                transition={reduceMotion ? undefined : { duration: 0.3 }}
                aria-label="Scroll to about section"
              >
                <span>Learn more about me</span>
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" aria-hidden="true" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 50 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={reduceMotion ? undefined : { delay: 0.7, duration: 0.6 }}
            className="order-1 md:order-2 w-full flex justify-center mb-8 md:mb-0"
          >
            <motion.div
              className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80"
              style={{ rotateX, rotateY }}
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={reduceMotion ? undefined : { scale: 1.05 }}
              onMouseMove={reduceMotion ? undefined : handleMouseMove}
              onMouseLeave={reduceMotion ? undefined : handleMouseLeave}
            >
              <div className="absolute inset-0 blur-2xl opacity-30 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full"></div>
              </div>
              <div className="profile-bubble w-full h-full">
                <img
                  src="/assets/portfolio_image.png"
                  alt="Dinh Luong"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="bubble-drop absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8"></div>
              <div className="bubble-drop absolute -bottom-4 left-1/2 -translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6"></div>
            </motion.div>
            <motion.div
              className="absolute -top-4 -right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-400/40 backdrop-blur-sm"
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={reduceMotion ? undefined : { duration: 4, repeat: Infinity }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute -bottom-6 -left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-400/40 backdrop-blur-sm"
              animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
              transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, delay: 0.5 }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
});