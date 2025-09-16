import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Building2, ChevronLeft, ChevronRight, History } from 'lucide-react';

const experiences = [
  {
    title: "Junior Internal Red Team Security Engineer",
    company: "MeDirect",
    period: "Jul 2025 – Present",
    description:
      "Conduct simulated cyber attacks to assess and strengthen the bank's security posture under senior guidance.",
    achievements: [
      "Executed red team exercises to uncover security gaps",
      "Collaborated with senior engineers to harden systems",
      "Documented findings to drive remediation efforts"
    ],
    technologies: ["Red Teaming", "Security Testing", "Banking"]
  },
  {
    title: "Junior Software Developer & Cybersecurity Sales Assistant",
    company: "SG Solutions",
    period: "Jan 2025 – Jul 2025",
    description:
      "Supported cybersecurity product sales (e.g., BullWall), managed document systems (e.g., DocuWare), and contributed to client solution delivery.",
    achievements: [
      "Assisted in implementing cybersecurity solutions for clients",
      "Completed the DTE course and applied it in documentation processes",
      "Improved internal documentation workflows for sales-related tools"
    ],
    technologies: ["Cybersecurity Sales", "Document Management", "Client Solutions"]
  },
  {
    title: "IT Student Worker",
    company: "Servizz.Gov",
    period: "Jan 2024 – Dec 2024",
    description: "Managed and optimized services, mentored a student in Microsoft applications, and integrated Power BI and Azure solutions.",
    achievements: [
      "Integrated Microsoft Azure with Power BI for internal service reporting",
      "Automated workflows using Microsoft Power Automate",
      "Mentored a junior student in Microsoft services and app development"
    ],
    technologies: ["Power BI", "Power Automate", "Microsoft Azure"]
  },
  {
    title: "Cybersecurity SOC Tier 1 Analyst (Internship)",
    company: "MITA",
    period: "Aug 2024 – Aug 2024",
    description: "Completed job shadowing for threat hunting and malware analysis using Microsoft cybersecurity products in a SOC environment.",
    achievements: [
      "Trained in malware analysis and threat intelligence",
      "Performed simulated threat hunting tasks in a SOC setting",
      "Used Microsoft security tools to assess real-world scenarios"
    ],
    technologies: ["Threat Intelligence", "Malware Analysis", "Microsoft Defender"]
  },
  {
    title: "Summer Club Teacher and Programming Mentor",
    company: "TCTC",
    period: "Jun 2023 – Aug 2023",
    description: "Taught Python and web development to children and mentored young students in IT fundamentals and programming basics.",
    achievements: [
      "Designed and delivered beginner-friendly Python coding lessons",
      "Mentored students in building basic websites using HTML/CSS",
      "Created engaging programming exercises for summer school participants"
    ],
    technologies: ["Python", "Web Development", "Mentorship"]
  }
];

export function ExperienceSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = experiences.length - 1;
      if (nextIndex >= experiences.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <section id="awards" className="py-20 bg-[rgba(var(--bg-rgb),0.2)]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="container mx-auto px-4"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-8 sm:mb-12 flex items-center gap-2 sm:gap-4">
          <History className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 flex-shrink-0" aria-hidden="true" />
          <span className="truncate">cat ~/awards.log</span>
        </h2>

        <div className="w-full">
          <div className="relative min-h-[400px] sm:h-[400px] overflow-hidden rounded-xl">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full h-full"
              >
                <div
                  className={`h-full bg-[rgba(var(--bg-rgb),0.4)] rounded-xl p-4 sm:p-6 md:p-8 border ${
                    currentIndex === 0
                      ? 'border-yellow-500 shadow-lg shadow-yellow-500/50'
                      : 'border-green-500/20'
                  } backdrop-blur-sm overflow-y-auto`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                      <div className="flex items-center gap-2 text-green-400 text-xs sm:text-sm">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                        <span>{experiences[currentIndex].period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                        <Building2 className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                        <span>{experiences[currentIndex].company}</span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-[rgb(var(--text-rgb))] leading-tight">
                      {experiences[currentIndex].title}
                    </h3>

                    <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                      {experiences[currentIndex].description}
                    </p>

                    <div className="space-y-2 mb-4 sm:mb-6 hidden sm:block">
                      {experiences[currentIndex].achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-center gap-2 text-xs sm:text-sm text-gray-300"
                        >
                          <span className="text-green-500">→</span>
                          {achievement}
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {experiences[currentIndex].technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-green-500/10 text-green-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-4 sm:mt-6 px-2 sm:px-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="p-1.5 sm:p-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors"
              aria-label="Previous experience"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" aria-hidden="true" />
            </motion.button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? index === 0
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                      : 'bg-green-500/20'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="p-1.5 sm:p-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors"
              aria-label="Next experience"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}