import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  History,
} from "lucide-react";

const awards = [
  {
    title: "Technology Innovation Contest - University Cluster 22",
    organization: "Van Hien University",
    period: "2025",
    location: "Van Hien University, Ho Chi Minh City",
    description:
      "Led the team to develop an AI-based voice control system for computer accessibility and won the Special Prize.",
    highlights: [
      "Team Leader of 3 members",
      "Built an AI-powered smart control system for people with disabilities",
      "Achieved the highest award: Special Prize",
    ],
    tags: ["AI", "Assistive Tech", "Innovation"],
  },
  {
    title: "Mammothon Hackathon - Celestia Viet Nam",
    organization: "Gia Dinh University",
    period: "2024",
    location: "Gia Dinh University, Ho Chi Minh City",
    description:
      "Led a 3-member team to build a decentralized video-sharing platform with NFT and DEX integration, reaching the Top 13 Finalist.",
    highlights: [
      "Team Leader in 48-hour hackathon",
      "Developed decentralized video sharing with NFT minting",
      "Top 13 out of 27 teams",
    ],
    tags: ["Blockchain", "NFT", "Hackathon", "Web3","Celestia"],
  },
  {
    title:
      "Creative Tech Product Design Contest for People with Disabilities 2025",
    organization: "Young Science and Technology Development Center",
    period: "2025",
    location: "Nguyen Tat Thanh University, Saigon Hi-Tech Park Campus",
    description:
      "Developed an AI-powered voice control assistant to improve computer accessibility for disabled users, reaching the Top 35 Semifinalist.",
    highlights: [
      "Created accessibility-focused AI control product",
      "Helped promote inclusion through assistive technology",
      "Selected as one of Top 35 semifinalists",
    ],
    tags: ["AI", "Assistive Tech", "Inclusion"],
  },
  {
    title: "17th Ho Chi Minh City Youth Innovation Ideas Contest 2025",
    organization: "Young Science and Technology Development Center",
    period: "2025",
    location: "SHTP-IC, Saigon Hi-Tech Park, Ho Chi Minh City",
    description:
      "Proposed an AI-powered voice control program to improve computer accessibility and was selected as one of the Top 50 Semifinalists.",
    highlights: [
      "Designed an innovative AI voice control solution",
      "Focused on improving accessibility and inclusion",
      "Reached the Top 50 semifinal round",
    ],
    tags: ["AI", "Assistive Tech", "Innovation", "Youth Contest"],
  },
];

export function AwardsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = awards.length - 1;
      if (next >= awards.length) next = 0;
      return next;
    });
  };

  return (
    <section id="awards" className="py-20 bg-[rgba(var(--bg-rgb),0.2)]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-4"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-8 sm:mb-12 flex items-center gap-2 sm:gap-4">
          <Award
            className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500 flex-shrink-0"
            aria-hidden="true"
          />
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
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) paginate(1);
                  else if (swipe > swipeConfidenceThreshold) paginate(-1);
                }}
                className="absolute w-full h-full"
              >
                <div className="h-full bg-[rgba(var(--bg-rgb),0.4)] rounded-xl p-4 sm:p-6 md:p-8 border border-amber-500/30 backdrop-blur-sm overflow-y-auto">
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                      <div className="flex items-center gap-2 text-amber-400 text-xs sm:text-sm">
                        <Calendar
                          className="w-3 h-3 sm:w-4 sm:h-4"
                          aria-hidden="true"
                        />
                        <span>{awards[currentIndex].period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                        <MapPin
                          className="w-3 h-3 sm:w-4 sm:h-4"
                          aria-hidden="true"
                        />
                        <span>{awards[currentIndex].location}</span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-[rgb(var(--text-rgb))] leading-tight">
                      {awards[currentIndex].title}
                    </h3>

                    <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                      {awards[currentIndex].description}
                    </p>

                    <div className="space-y-2 mb-4 sm:mb-6 hidden sm:block">
                      {awards[currentIndex].highlights.map((highlight, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-center gap-2 text-xs sm:text-sm text-gray-300"
                        >
                          <span className="text-amber-500">🏅</span>
                          {highlight}
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {awards[currentIndex].tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-amber-500/10 text-amber-400"
                          >
                            {tag}
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
              className="p-1.5 sm:p-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-colors"
              aria-label="Previous award"
            >
              <ChevronLeft
                className="w-4 h-4 sm:w-6 sm:h-6"
                aria-hidden="true"
              />
            </motion.button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {awards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-amber-500" : "bg-amber-500/20"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="p-1.5 sm:p-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-colors"
              aria-label="Next award"
            >
              <ChevronRight
                className="w-4 h-4 sm:w-6 sm:h-6"
                aria-hidden="true"
              />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
